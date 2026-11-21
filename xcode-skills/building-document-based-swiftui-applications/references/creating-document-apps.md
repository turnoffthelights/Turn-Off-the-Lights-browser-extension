# Creating a Document-Based App

**SDK Version:** 27.0 and later
**Platforms:** iOS 27, macOS 27, visionOS 27. **Unavailable** on watchOS and tvOS.

## Table of contents
- [Overview](#overview)
- [Mental model](#mental-model)
- [Set up the app: DocumentGroup](#set-up-the-app-documentgroup)
- [Simple flat-file document](#simple-flat-file-document)
- [Register undo actions](#register-undo-actions-required-for-autosave)
- [Custom readers and writers](#custom-readers-and-writers-direct-url-access)
- [Package documents](#package-documents)
- [Progress reporting](#progress-reporting-with-subprogress)
- [Coordinated disk access](#coordinated-disk-access-outside-readwrite)
- [Export](#export-to-a-new-location-or-format)
- [Concurrency contract](#concurrency-contract-common-pitfalls)
- [Advanced: incremental package writes](#advanced-incremental-package-writes)
- [Quick API reference](#quick-api-reference)

If the deployment target is below iOS 27 / macOS 27 / visionOS 27, do not use these APIs.

## Overview

The `Document` protocol gives direct access to the document's file URL for reading and writing files, integrates with Swift concurrency, supports progress reporting during long operations, and provides coordinated file access via a `FileCoordinator`. `Document` is a combined protocol that conforms to both `ReadableDocument` and `WritableDocument` and has no requirements of its own.

Because `Document` is a reference type, SwiftUI doesn't recreate the document on every change. Use the `@Observable` macro to track individual property changes.

```swift
@Observable
final class TextDocument: Document { }
```

## Mental model

- A **document** is an `@Observable final class` conforming to `ReadableDocument` (read-only), `WritableDocument` (write-only, rare), or both (read-write, via `Document`). It can be `@MainActor` or nonisolated, `Sendable` or not — use whatever works best for the app.
- A **snapshot** captures the document's state at a given moment. It can be any type (including `String`, a custom struct, or the document itself). Reading and writing may use different snapshot types.
- A **`DocumentReader`** converts a file into a snapshot in the background. 
- A **`DocumentWriter`** converts a snapshot back to disk in the background. 
- SwiftUI coordinates file access and runs reading/writing off the main actor automatically.

### Save flow

1. SwiftUI calls `snapshot(contentType:)` **on the main actor** to capture state.
2. SwiftUI calls `writer(configuration:)` to get a `DocumentWriter`.
3. SwiftUI passes the snapshot and destination URL to the writer's `write(snapshot:to:previous:progress:)` **in the background** with coordinated file access.

### Open flow

1. SwiftUI calls `reader(configuration:)` to get a `DocumentReader`.
2. SwiftUI passes the file URL to the reader's `read(from:progress:)` **in the background**.
3. SwiftUI delivers the snapshot to the document via `apply(snapshot:previous:)` **on the main actor**.

> **Important:** `snapshot(contentType:)` and `apply(snapshot:previous:)` run on the main actor. Keep them lightweight. Perform serialization/deserialization inside the writer's `write(…)` and the reader's `read(…)`.

## Set up the app: `DocumentGroup`

Use `DocumentGroup` or `DocumentGroupLaunchScene` as your app's **first scene** to opt into the document infrastructure: autosaving, file coordination, file dialogs, keyboard shortcuts, undo management, conflict resolution, and more. On iOS, set `UISupportsDocumentBrowser` to `YES` in your information property list to present a document browser.

```swift
@main
struct NotesApp: App {
    var body: some Scene {
        DocumentGroup { document in
            TextEditorView(document: document)
        } makeDocument: { configuration, context in
            TextDocument()
        }
    }
}
```

`DocumentGroup` takes two closures:

- **`editor`** (read-write) or **`viewer`** (read-only): builds the UI for an open document.
- **`makeDocument`** / **`makeReadableDocument`**: creates the document instance. Receives:
  - `configuration: URLDocumentConfiguration`: file URL, last modification date, file-coordinator factory.
  - `context: DocumentCreationContext`: exposes `creationSource`, the source associated with the `NewDocumentButton` that triggered creation (iOS/visionOS).

The `makeDocument` closure is `async` — suspend to show pre-creation UI (template picker, import preview). Throw `CancellationError` to cancel.

### Display custom UI before presenting a document

Because `makeDocument` is `async`, you can suspend document creation right inside the closure to show a template picker, configuration wizard, or import preview before the document appears. Store a `CheckedContinuation` in `App` state and open a dedicated `Window` for the picker — because a `Window` is its own scene, it can appear before any document editor exists. Resume the continuation with the chosen document when the person makes a choice, then dismiss the window. (`Window` is available on **macOS and visionOS only**; on iOS, present the picker as a `.sheet` or `.fullScreenCover` on a `NewDocumentButton` in a `DocumentGroupLaunchScene` instead.)

```swift
@main
struct MyApp: App {
    @Environment(\.openWindow) private var openWindow
    @State private var documentCreationContinuation: CheckedContinuation<TextDocument?, any Error>?

    var body: some Scene {
        DocumentGroup { document in
            TextDocumentView(document: document)
        } makeDocument: { configuration, context in
            let document = try await withCheckedThrowingContinuation { continuation in
                documentCreationContinuation = continuation
                openWindow(id: templatePickerWindowID)
            }
            guard let document else { throw CancellationError() }
            return document
        }

        Window("Choose a Template", id: templatePickerWindowID) {
            TemplatePicker(continuation: $documentCreationContinuation)
        }
    }
}

struct TemplatePicker: View {
    @Binding var continuation:
        CheckedContinuation<TextDocument?, any Error>?
    @Environment(\.dismissWindow) private var dismissWindow

    var body: some View {
        VStack {
            Text("Choose a template").font(.title)
            Button("Meeting minutes") {
                continuation?.resume(returning: TextDocument.makeMeetingMinutes())
                dismissWindow(id: templatePickerWindowID)
            }
            Button("Letter") {
                continuation?.resume(returning: TextDocument.makeLetter())
                dismissWindow(id: templatePickerWindowID)
            }
            Button("Cancel") {
                continuation?.resume(throwing: CancellationError())
                dismissWindow(id: templatePickerWindowID)
            }
        }
    }
}

extension TextDocument {
    static func makeMeetingMinutes() -> Self { /* ... */ }
    static func makeLetter() -> Self { /* ... */ }
}

let templatePickerWindowID = "template-picker"
```

### Read-only documents

Conform only to `ReadableDocument` and use `viewer` / `makeReadableDocument`:

```swift
DocumentGroup { document in
    PDFViewer(document: document)
} makeReadableDocument: { configuration, context in
    PDFDocument()
}

@Observable
final class PDFDocument: ReadableDocument { /* ... */ }
```

Set `CFBundleTypeRole` to `Viewer` in Info.plist. For read-write apps, set it to `Editor`.

### iOS launch scene with multiple creation sources

```swift
@main
struct NotesApp: App {
    var body: some Scene {
        DocumentGroupLaunchScene("My Notes and Lists") {
            NewDocumentButton("New Note", source: .note)
            NewDocumentButton("New List", source: .list)
        } background: {
            LinearGradient(
                colors: [.brandColorGradientStart, .brandColorGradientEnd],
                startPoint: .top, endPoint: .bottom
            )
        }

        DocumentGroup { document in
            TextEditorView(document: document)
        } makeDocument: { configuration, context in
            TextDocument()
        }
    }
}

extension DocumentCreationSource {
    static let note = DocumentCreationSource(id: "note")
    static let list = DocumentCreationSource(id: "list")
}
```

Check `context.creationSource` in the document initializer to configure the document accordingly.

### Declare custom content types

For built-in formats like text, JPEG, and PDF, the system already knows what your document handles — use `UTType.plainText`, `UTType.jpeg`, etc. For your own file formats, declare a custom `UTType` in your app's Info.plist under `UTExportedTypeDeclarations`. Use `public.data` or types that conform to `public.data` as parent for flat-file documents, or `com.apple.package` or conforming types for package documents. For example, if your app uses a custom JSON scheme as the document structure, conform your document type to `public.json`.

```xml
<key>UTExportedTypeDeclarations</key>
<array>
    <dict>
        <key>UTTypeIdentifier</key>
        <string>com.example.notebook</string>
        <key>UTTypeConformsTo</key>
        <array>
            <string>com.apple.package</string>
        </array>
        <key>UTTypeTagSpecification</key>
        <dict>
            <key>public.filename-extension</key>
            <array>
                <string>example-notebook</string>
            </array>
        </dict>
    </dict>
</array>
```

Mirror the declaration in code:

```swift
extension UTType {
    static let notebook = UTType(exportedAs: "com.example.notebook")
}
```

Reference it from the document's content types:

```swift
static let readableContentTypes: [UTType] = [.notebook]
static let writableContentTypes: [UTType] = [.notebook, .markdown]
```

### Troubleshooting custom content types

If the app doesn't recognize or open files of a custom content type, ask the developer for their Info.plist and verify the declaration. Common issues:

1. **Incorrect parent type.** A common mistake is `com.public.data` instead of `public.data`, or `public.package` instead of `com.apple.package`. The parent must be a type identifier known to the system.
2. **Identifier uses uppercase.** UTType identifiers must be lowercase only (e.g., `com.myapp.note`, not `com.myApp.Note`).
3. **Missing file extension.** `UTTypeTagSpecification` must include a `public.filename-extension` entry.
4. **Wrong `CFBundleTypeRole`.** If the app should write files, the role must be `Editor`, not `Viewer`.
5. **Parent doesn't ultimately conform to `public.data` or `com.apple.package`.** Walk the conformance chain — the parent (or its parent, etc.) must eventually reach one of these two roots.

Use the `uttype` CLI to verify content types on the developer's machine:

```bash
# Check if a type identifier is known to the system (exit 0 = known, 1 = unknown):
uttype "com.example.notebook"

# Show full details (conformance chain, extensions, MIME type):
uttype --verbose "com.example.notebook"

# Verify a type conforms to public.data (exit 0 = conforms, 1 = doesn't):
uttype --conformsto "public.data" "com.example.notebook"

# Verify a type conforms to com.apple.package:
uttype --conformsto "com.apple.package" "com.example.notebook"

# Look up which type owns a file extension:
uttype --extension "example-notebook"
```

If `uttype` reports "Failed to resolve type", the identifier is misspelled or the app declaring it hasn't been installed. If the conformance check fails, the parent chain doesn't reach the expected root.

## Simple flat-file document

Use `FileWrapperDocumentReader` and `FileWrapperDocumentWriter` — they handle file coordination for you.

Declare `readableContentTypes` for formats the document can open and `writableContentTypes` for formats it can save. The document browser uses `readableContentTypes`; the save panel uses `writableContentTypes`.

```swift
import SwiftUI
import UniformTypeIdentifiers

@Observable
final class TextDocument: Document {
    static let readableContentTypes = [UTType.plainText]

    var text: String

    init() {
        self.text = ""
    }

    func reader(configuration: sending ReadConfiguration) -> sending FileWrapperDocumentReader<String> {
        FileWrapperDocumentReader(configuration) { fileWrapper in
            if let data = fileWrapper.regularFileContents,
               let text = String(data: data, encoding: .utf8) {
                return text
            }
            return ""
        }
    }

    @MainActor
    func apply(snapshot: sending String, previous: sending String?) async throws {
        self.text = snapshot
    }

    func writer(configuration: sending WriteConfiguration) -> sending FileWrapperDocumentWriter<String> {
        FileWrapperDocumentWriter(configuration) { snapshot, previous in
            let data = Data(snapshot.utf8)
            return FileWrapper(regularFileWithContents: data)
        }
    }

    @MainActor
    func snapshot(contentType: UTType) async throws -> sending String {
        text
    }
}
```

## Register undo actions (required for autosave)

SwiftUI tracks unsaved changes through undo actions. **Without registered undo actions, SwiftUI won't autosave.** Read `\.undoManager` from the environment and register an undo action for every change. A simple approach is to register inside `onChange(of:)` in the view:

```swift
struct TextDocumentView: View {
    @Bindable var document: TextDocument
    @Environment(\.undoManager) private var undoManager

    var body: some View {
        TextEditor(text: $document.text)
            .onChange(of: document.text) { oldValue, _ in
                undoManager?.registerUndo(
                    withTarget: document
                ) { document in
                    document.text = oldValue
                }
            }
    }
}
```

Registering with `withTarget: document` gives redo for free — SwiftUI replays the same closure with the restored value.

## Custom readers and writers (direct URL access)

Use a custom `DocumentReader` / `DocumentWriter` when you need streaming reads, custom writing logic, or direct URL access to frameworks like Core Graphics, AVFoundation, or PDFKit.

```swift
import CoreGraphics

struct ImageSnapshot {
    var image: CGImage?
    var compressionQuality: Double
}

@Observable
final class ImageDocument: Document {
    static let readableContentTypes: [UTType] = [.jpeg]

    var displayImage: CGImage?
    var compressionQuality: Double = 0.9

    init() {}
}
```

### Custom reader

`DocumentReader.Source` is always `URL` — other source types are not supported.

```swift
extension ImageDocument {
    struct Reader: DocumentReader {
        @concurrent
        func read(
            from source: URL, progress: consuming Subprogress
        ) async throws -> sending ImageSnapshot {
            guard let imageSource =
                CGImageSourceCreateWithURL(source as CFURL, nil),
                  let image = CGImageSourceCreateImageAtIndex(
                      imageSource, 0, nil
                  ) else {
                throw CocoaError(.fileReadCorruptFile)
            }
            return ImageSnapshot(
                image: image, compressionQuality: 0.9
            )
        }
    }

    func reader(
        configuration: sending ReadConfiguration
    ) -> sending Reader {
        Reader()
    }

    @MainActor
    func apply(
        snapshot: sending ImageSnapshot,
        previous: sending ImageSnapshot?
    ) async throws {
        self.compressionQuality = snapshot.compressionQuality
        self.displayImage = snapshot.image
    }
}
```

### Custom writer

`DocumentWriter.Destination` is always `URL` — other destination types are not supported.

```swift
extension ImageDocument {
    struct Writer: DocumentWriter {
        @concurrent
        func write(
            snapshot: sending ImageSnapshot,
            to destination: URL,
            previous: sending ImageSnapshot?,
            progress: consuming Subprogress
        ) async throws {
            guard let image = snapshot.image else { return }

            guard let imageDestination =
                CGImageDestinationCreateWithURL(
                    destination as CFURL,
                    UTType.jpeg.identifier as CFString, 1, nil
                ) else {
                throw CocoaError(.fileWriteUnknown)
            }

            let options: [CFString: Any] = [
                kCGImageDestinationLossyCompressionQuality:
                    snapshot.compressionQuality
            ]
            CGImageDestinationAddImage(
                imageDestination, image, options as CFDictionary
            )

            guard CGImageDestinationFinalize(imageDestination) else {
                throw CocoaError(.fileWriteUnknown)
            }
        }
    }

    func writer(
        configuration: sending WriteConfiguration
    ) -> sending Writer {
        Writer()
    }

    @MainActor
    func snapshot(
        contentType: UTType
    ) async throws -> sending ImageSnapshot {
        ImageSnapshot(
            image: displayImage,
            compressionQuality: compressionQuality
        )
    }
}
```

The `previous` parameter contains the last successfully written snapshot. For most documents — including packages — ignore `previous` and rewrite everything. This keeps logic straightforward and easy to maintain.

> **Important:** `snapshot(contentType:)` runs on the main actor. Keep it lightweight; perform serialization in the writer's `write(…)` since it runs in the background.

## Package documents

A package is a directory the system presents as a single item. People see one icon in Finder or Files; inside, your package holds any files you need (metadata, pages, layers, embedded media). Use `FileWrapperDocumentReader` and `FileWrapperDocumentWriter`; use custom reader/writer only when you need streaming or direct URL access.

By default, **rewrite the entire package on every save.** This is the simplest correct implementation and easy to maintain:

```swift
struct NotebookSnapshot {
    var metadata: NotebookMetadata
    var pages: [UUID: NotebookPage]
}

struct NotebookMetadata: Codable {
    var title: String
    var pageOrder: [UUID]
    var createdDate: Date
}

struct NotebookPage: Equatable {
    var text: String
}

@Observable
final class NotebookDocument: Document {
    static let readableContentTypes: [UTType] = [.notebook]

    var metadata: NotebookMetadata
    var pages: [UUID: NotebookPage]

    init() {
        self.metadata = NotebookMetadata(
            title: "Untitled", pageOrder: [], createdDate: .now
        )
        self.pages = [:]
    }
}

extension NotebookDocument {
    func reader(
        configuration: sending ReadConfiguration
    ) -> sending FileWrapperDocumentReader<NotebookSnapshot> {
        FileWrapperDocumentReader(configuration) { directory in
            let children = directory.fileWrappers ?? [:]
            guard let metadataData =
                children["metadata.json"]?
                    .regularFileContents else {
                throw CocoaError(.fileReadCorruptFile)
            }
            let metadata = try JSONDecoder()
                .decode(NotebookMetadata.self, from: metadataData)

            let pageWrappers =
                children["pages"]?.fileWrappers ?? [:]
            var pages: [UUID: NotebookPage] = [:]
            for id in metadata.pageOrder {
                let filename = "\(id.uuidString).txt"
                if let data = pageWrappers[filename]?
                    .regularFileContents,
                   let text = String(
                       data: data, encoding: .utf8
                   ) {
                    pages[id] = NotebookPage(text: text)
                }
            }
            return NotebookSnapshot(
                metadata: metadata, pages: pages
            )
        }
    }

    @MainActor
    func apply(
        snapshot: sending NotebookSnapshot,
        previous: sending NotebookSnapshot?
    ) async throws {
        self.metadata = snapshot.metadata
        self.pages = snapshot.pages
    }

    func writer(
        configuration: sending WriteConfiguration
    ) -> sending FileWrapperDocumentWriter<NotebookSnapshot> {
        FileWrapperDocumentWriter(configuration) { snapshot, _ in
            let directory = FileWrapper(
                directoryWithFileWrappers: [:]
            )

            let metadataData = try JSONEncoder()
                .encode(snapshot.metadata)
            let metadataWrapper = FileWrapper(
                regularFileWithContents: metadataData
            )
            metadataWrapper.preferredFilename = "metadata.json"
            directory.addFileWrapper(metadataWrapper)

            let pagesDir = FileWrapper(
                directoryWithFileWrappers: [:]
            )
            pagesDir.preferredFilename = "pages"
            for (id, page) in snapshot.pages {
                let wrapper = FileWrapper(
                    regularFileWithContents:
                        Data(page.text.utf8)
                )
                wrapper.preferredFilename =
                    "\(id.uuidString).txt"
                pagesDir.addFileWrapper(wrapper)
            }
            directory.addFileWrapper(pagesDir)

            return directory
        }
    }

    @MainActor
    func snapshot(
        contentType: UTType
    ) async throws -> sending NotebookSnapshot {
        NotebookSnapshot(metadata: metadata, pages: pages)
    }
}
```

> **Important:** `FileWrapper` loads file contents **on demand**. A child file may be gone or inaccessible by the time you call `regularFileContents`, even if it existed when you opened the package. Always handle errors when reading children.

## Progress reporting with `Subprogress`

Both `DocumentReader.read` and `DocumentWriter.write` receive a `Subprogress` parameter. Report progress so SwiftUI can display appropriate UI during long operations. SwiftUI decides whether to show a progress indicator on a case-by-case basis — it won't always display one even if the developer reports progress.

`Subprogress` is `~Copyable` — the compiler enforces single use. If never consumed, the assigned units auto-complete.

> **Note:** `FileWrapperDocumentReader` / `FileWrapperDocumentWriter` closures do **not** take a `Subprogress`. Only custom `DocumentReader` / `DocumentWriter` types report progress.

Create a `ProgressManager` from the `Subprogress` by calling `start(totalCount:)`, then call `complete(count:)` as work finishes. Pick a coarse `totalCount` (chunks or files) — don't drive `complete(count:)` byte-by-byte:

```swift
@concurrent
func read(
    from source: URL, progress: consuming Subprogress
) async throws -> sending ImageSnapshot {
    let progressManager = progress.start(totalCount: 2)
    let data = try Data(contentsOf: source)
    progressManager.complete(count: 1)
    let image = try decodeImage(from: data)
    progressManager.complete(count: 1)
    return ImageSnapshot(image: image)
}
```

### Chunked writes for large files

For large files, report progress per chunk:

```swift
@concurrent
func write(
    snapshot: sending MediaSnapshot,
    to destination: URL,
    previous: sending MediaSnapshot?,
    progress: consuming Subprogress
) async throws {
    let payload = snapshot.payload
    let totalBytes = payload.count
    let progressManager = progress.start(totalCount: totalBytes)

    try Data().write(to: destination)
    let fileHandle = try FileHandle(forWritingTo: destination)
    defer { try? fileHandle.close() }

    let targetUpdateCount = 100
    let minimumChunkSize = 64 * 1024       //  64 KB
    let maximumChunkSize = 4 * 1024 * 1024 //   4 MB
    let chunkSize = min(
        maximumChunkSize,
        max(minimumChunkSize, totalBytes / targetUpdateCount)
    )

    var offset = 0
    while offset < totalBytes {
        let end = min(offset + chunkSize, totalBytes)
        let chunk = payload[offset..<end]
        try fileHandle.write(contentsOf: chunk)
        progressManager.complete(count: end - offset)
        offset = end
    }
}
```

### Progress for package documents

You can treat each file as an equal chunk of work:

```swift
@concurrent
func write(
    snapshot: sending NotebookSnapshot,
    to destination: URL,
    previous: sending NotebookSnapshot?,
    progress: consuming Subprogress
) async throws {
    let changedPages = snapshot.pages.filter { (identifier, content) in
        previous?.pages[identifier] != content
    }

    let totalUnits = 1 + changedPages.count
    let progressManager = progress.start(totalCount: totalUnits)

    // Write metadata.
    let metadataURL = destination.appending(path: "metadata.json")
    let metadataData = try JSONEncoder().encode(snapshot.metadata)
    try metadataData.write(to: metadataURL, options: .atomic)
    progressManager.complete(count: 1)

    // Write each changed page.
    let pagesDirectory = destination.appending(path: "pages")
    try? FileManager.default.createDirectory(
        at: pagesDirectory, withIntermediateDirectories: true
    )

    for (identifier, content) in changedPages {
        let pageURL = pagesDirectory.appending(
            path: "\(identifier.uuidString).txt"
        )
        try Data(content.text.utf8).write(to: pageURL, options: .atomic)
        progressManager.complete(count: 1)
    }
}
```

## Coordinated disk access outside read/write

SwiftUI coordinates file access for `read` and `write` automatically. To access the file URL at other times (e.g., reading a sub-file of a package on tap), gate access with the configuration's file coordinator so other processes can synchronize.

`URLDocumentConfiguration.fileURL` is readable from any thread (`nonisolated(unsafe)`); the coordinator provides the read/write synchronization. `makeFileCoordinator()` is a lightweight factory — call it for **each** read/write to get a fresh `NSFileCoordinator`:

```swift
let coordinator = document.configuration.makeFileCoordinator()
var coordinationError: NSError?
coordinator.coordinate(
    readingItemAt: packageURL.appending(path: "metadata.json"),
    options: [], error: &coordinationError
) { url in
    do {
        let data = try Data(contentsOf: url)
        let metadata = try JSONDecoder().decode(
            NotebookMetadata.self, from: data
        )
        // process metadata
    } catch {
        // handle error
    }
}

if let coordinationError { /* handle coordinated file access failing with given error */ }
```

> **Important:** Always use `makeFileCoordinator()` for disk access outside `read` and `write`. File coordination synchronizes access when another app edits the same document, ensures all coordinating processes are notified of your changes, and prevents corruption from concurrent writes.

## Export to a new location or format

Use `fileExporter` with a `WritableDocument`:

```swift
struct TextEditorView: View {
    @Bindable var document: TextDocument
    @State private var isExporting = false

    var body: some View {
        TextEditor(text: $document.text)
            .toolbar {
                Button("Export…") { isExporting = true }
            }
            .fileExporter(
                isPresented: $isExporting, document: document,
                contentType: .markdown,
                defaultFilename: "Text"
            ) { result in
                switch result {
                case .success(let url):
                    print("Exported to \(url)")
                case .failure(let error):
                    print("Export failed: \(error)")
                }
            }
    }
}
```

## Concurrency contract (common pitfalls)

- **`reader(configuration:)` / `writer(configuration:)`** are synchronous factories. They return `sending` reader/writer values and run on the caller.
- **`read(from:progress:)` / `write(snapshot:to:previous:progress:)`** run in the background with `@concurrent`. Do all heavy I/O and serialization here.
- **`snapshot(contentType:)` / `apply(snapshot:previous:)`** are `@MainActor` and `async`. Keep them cheap — no serialization.
- **`URLDocumentConfiguration`** is `@MainActor @Observable`, with `fileURL` / `lastContentModificationDate`. Inside `read` / `write`, do not use `URLDocumentConfiguration.fileURL`; instead read from the `source: URL` / write to `destination: URL` parameter the framework hands you — that's the URL for *this* operation, and is not equal to the document fileURL. 
- **Snapshots cross actor boundaries** — hence the `sending` annotations. Either make the snapshot `Sendable`, or construct it fresh inside `snapshot(contentType:)` and don't retain it elsewhere.
- **Keep snapshot, reader, and writer types at `internal` access** (the default). Protocol-required methods expose these types in their signatures, so marking them `private` or `fileprivate` causes compile errors.
- **`makeDocument` / `makeReadableDocument` closures** are `async` and run on the main actor; `await` inside them for off-main setup.

## Advanced: incremental package writes

Only implement incremental writes when there are specific performance concerns: files are large, spin reports from user machines indicate slow saves, or there is an explicit goal to optimize autosave performance.

The pattern: carry an `isChanged` flag per page, and in the writer use the **second closure parameter** (the previous `FileWrapper`) to skip unchanged pages. Clear the flags in `snapshot(contentType:)` after capturing.

```swift
struct NotebookSnapshot {
    var metadata: NotebookMetadata
    var pages: [UUID: NotebookPage]
}

struct NotebookPage: Equatable {
    var text: String
    var isChanged: Bool = false
}

@Observable
final class NotebookDocument: Document {
    static let readableContentTypes: [UTType] = [.notebook]

    var metadata: NotebookMetadata
    var pages: [UUID: NotebookPage]

    // ... init, reader, apply ...

    func writer(
        configuration: sending WriteConfiguration
    ) -> sending FileWrapperDocumentWriter<NotebookSnapshot> {
        FileWrapperDocumentWriter(configuration) { snapshot, previousFileWrapper in
            let directory = previousFileWrapper
                ?? FileWrapper(directoryWithFileWrappers: [:])

            // Metadata: rewrite unconditionally (small).
            if let existing =
                directory.fileWrappers?["metadata.json"] {
                directory.removeFileWrapper(existing)
            }
            let metadataData = try JSONEncoder()
                .encode(snapshot.metadata)
            let metadataWrapper = FileWrapper(
                regularFileWithContents: metadataData
            )
            metadataWrapper.preferredFilename = "metadata.json"
            directory.addFileWrapper(metadataWrapper)

            // Reuse or create the "pages" subdirectory.
            let pagesDir =
                directory.fileWrappers?["pages"] ?? {
                    let created = FileWrapper(
                        directoryWithFileWrappers: [:]
                    )
                    created.preferredFilename = "pages"
                    directory.addFileWrapper(created)
                    return created
                }()

            // Write only changed pages.
            let existingPages = pagesDir.fileWrappers ?? [:]
            for (pageID, page) in snapshot.pages
                where page.isChanged {
                let filename = "\(pageID.uuidString).txt"
                if let existing = existingPages[filename] {
                    pagesDir.removeFileWrapper(existing)
                }
                let wrapper = FileWrapper(
                    regularFileWithContents:
                        Data(page.text.utf8)
                )
                wrapper.preferredFilename = filename
                pagesDir.addFileWrapper(wrapper)
            }

            // Remove deleted pages. metadata.pageOrder is
            // authoritative (in-memory pages dict only holds
            // pages the person opened).
            let liveFilenames = Set(
                snapshot.metadata.pageOrder
                    .map { "\($0.uuidString).txt" }
            )
            for (filename, child) in existingPages
                where !liveFilenames.contains(filename) {
                pagesDir.removeFileWrapper(child)
            }

            return directory
        }
    }

    @MainActor
    func snapshot(
        contentType: UTType
    ) async throws -> sending NotebookSnapshot {
        let result = NotebookSnapshot(
            metadata: metadata, pages: pages
        )
        for id in pages.keys {
            pages[id]?.isChanged = false
        }
        return result
    }
}
```

## Quick API reference

| Symbol | Role |
| --- | --- |
| `Document` | Combined protocol (`ReadableDocument & WritableDocument`). `AnyObject`. No requirements of its own. |
| `ReadableDocument` | Read-only document. `AnyObject`. Requires `readableContentTypes`, `reader(configuration:)`, `apply(snapshot:previous:)`. |
| `WritableDocument` | Adds saving (independent of `ReadableDocument`). `AnyObject`. Requires `writableContentTypes`, `writer(configuration:)`, `snapshot(contentType:)`. `DocumentGroup`'s read-write init requires both. |
| `DocumentReader` | `@concurrent func read(from:progress:) async throws -> sending Snapshot` |
| `DocumentWriter` | `@concurrent func write(snapshot:to:previous:progress:) async throws` |
| `FileWrapperDocumentReader<Snapshot>` | Convenience reader (recommended); closure `(FileWrapper) throws -> sending Snapshot`. No `Subprogress`. |
| `FileWrapperDocumentWriter<Snapshot>` | Convenience writer (recommended); closure `(Snapshot, FileWrapper?) throws -> FileWrapper`. No `Subprogress`. |
| `URLDocumentConfiguration` | `@MainActor @Observable`, `Sendable`. `fileURL: URL?` / `lastContentModificationDate: Date?` (both `nonisolated(unsafe)`); `makeFileCoordinator() -> NSFileCoordinator`. |
| `ReadConfiguration` | Passed to `reader(configuration:)`. Provides `contentType: UTType`. |
| `WriteConfiguration` | Passed to `writer(configuration:)`. Provides `contentType: UTType`. |
| `DocumentCreationContext` | `creationSource: DocumentCreationSource?`: which `NewDocumentButton` created the document. |
| `Subprogress` (Foundation) | `~Copyable` progress currency for custom `read`/`write`. Consume with `start(totalCount:) -> ProgressManager`. |
| `ProgressManager` (Foundation) | `complete(count:)` drives `fractionCompleted`. |
| `DocumentGroup` | Scene. `init(editor:makeDocument:)` (read-write) / `init(viewer:makeReadableDocument:)` (read-only). |
| `DocumentGroupLaunchScene` | iOS branded launch scene hosting `NewDocumentButton`s. |
| `View.fileExporter(isPresented:document:contentType:defaultFilename:onCompletion:)` | Export a `WritableDocument`. |

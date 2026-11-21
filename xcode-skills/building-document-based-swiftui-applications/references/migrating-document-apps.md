# Migrating to the Document Protocol

**SDK Version:** 27.0 and later
**Platforms:** iOS 27, macOS 27, visionOS 27. **Unavailable** on watchOS and tvOS.

## Table of contents
- [Migrating from FileDocument](#migrating-from-filedocument)
- [Migrating from ReferenceFileDocument](#migrating-from-referencefiledocument)
- [Key differences from the old APIs](#key-differences-from-the-old-apis)
- [What NOT to do](#what-not-to-do)

Adopt the `Document` protocol to take advantage of direct URL access, Swift concurrency integration, and modern observation. The `Document` protocol separates reading and writing into dedicated types, giving more control over file I/O and enabling partial reads and writes for complex document formats.

## Migrating from `FileDocument`

`FileDocument` is a value type (struct). The new `Document` protocol uses a reference type (`@Observable final class`), which avoids recreating the model on every change.

### Concept mapping

| Before (`FileDocument`) | After (`Document`) |
| --- | --- |
| `FileDocument` (struct) | `Document` (class, `@Observable`) |
| `init(configuration:)` | Separate `DocumentReader` |
| `fileWrapper(configuration:)` | Separate `DocumentWriter` |
| `DocumentGroup(newDocument:editor:)` | `DocumentGroup { editor } makeDocument: { configuration, context in }` |
| `FileWrapper` / `Data` only | `FileWrapper` and custom URL access via `DocumentReader` / `DocumentWriter` |
| SwiftUI recreates the document on every change | Reference type — stable identity, property-level observation |

### Migration checklist

1. **Convert from struct to `@Observable final class`.** Remove the `FileDocument` conformance. Add `@Observable` and conform to `Document`.

2. **Extract `init(configuration:)` into a `DocumentReader`.** Use `FileWrapperDocumentReader` for simple cases. Return a snapshot value from the closure.

3. **Implement `apply(snapshot:previous:)`.** This `@MainActor` method updates your document's properties when a new snapshot arrives.

4. **Extract `fileWrapper(configuration:)` into a `DocumentWriter`.** Use `FileWrapperDocumentWriter` for simple cases.

5. **Implement `snapshot(contentType:)`.** Mark it `@MainActor async throws` with a `sending` return type. Keep it lightweight.

6. **Update `DocumentGroup`.** Replace `DocumentGroup(newDocument:editor:)` with the closure-based initializer.

7. **Register undo actions.** `FileDocument` didn't require explicit undo registration because SwiftUI tracked changes via value semantics. With a reference type, you must register undo actions for every change — otherwise autosave won't trigger.

### Before (`FileDocument`)

```swift
struct OldTextDocument: FileDocument {
    static let readableContentTypes = [UTType.plainText]

    var text: String

    init(text: String = "") {
        self.text = text
    }

    init(configuration: ReadConfiguration) throws {
        if let data = configuration.file.regularFileContents {
            text = String(data: data, encoding: .utf8) ?? ""
        } else {
            text = ""
        }
    }

    func fileWrapper(
        configuration: WriteConfiguration
    ) throws -> FileWrapper {
        let data = Data(text.utf8)
        return FileWrapper(regularFileWithContents: data)
    }
}

@main
struct MyApp: App {
    var body: some Scene {
        DocumentGroup(newDocument: OldTextDocument()) { configuration in
            TextEditor(text: configuration.$document.text)
        }
    }
}
```

### After (`Document`)

```swift
@Observable
final class TextDocument: Document {
    static let readableContentTypes = [UTType.plainText]

    var text: String

    init(text: String = "") {
        self.text = text
    }

    func reader(
        configuration: sending ReadConfiguration
    ) -> sending FileWrapperDocumentReader<String> {
        FileWrapperDocumentReader(configuration) { fileWrapper in
            guard let data =
                fileWrapper.regularFileContents else {
                throw CocoaError(.fileReadCorruptFile)
            }
            return String(decoding: data, as: UTF8.self)
        }
    }

    func writer(
        configuration: sending WriteConfiguration
    ) -> sending FileWrapperDocumentWriter<String> {
        FileWrapperDocumentWriter(configuration) { snapshot, previous in
            FileWrapper(
                regularFileWithContents: Data(snapshot.utf8)
            )
        }
    }

    @MainActor
    func snapshot(
        contentType: UTType
    ) async throws -> sending String {
        text
    }

    @MainActor
    func apply(
        snapshot: sending String, previous: sending String?
    ) async throws {
        text = snapshot
    }
}

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

@main
struct MyApp: App {
    var body: some Scene {
        DocumentGroup { document in
            TextDocumentView(document: document)
        } makeDocument: { configuration, context in
            TextDocument()
        }
    }
}
```

> **Important:** With `FileDocument`, SwiftUI detected changes via value comparison. With `Document`, you must register undo actions — without them, autosave won't trigger.

## Migrating from `ReferenceFileDocument`

`ReferenceFileDocument` is already a reference type, so the migration is more straightforward — the main changes are adopting `@Observable`, separating reader/writer, and updating concurrency annotations.

### Concept mapping

| Before (`ReferenceFileDocument`) | After (`Document`) |
| --- | --- |
| `ReferenceFileDocument` (class, `ObservableObject`) | `Document` (class, `@Observable`) |
| `ReferenceFileDocument(configuration:)` | Separate `DocumentReader` |
| `ReferenceFileDocument.fileWrapper(snapshot:configuration:)` | Separate `DocumentWriter` |
| `FileWrapper` only | `FileWrapper` and custom URL access via `DocumentReader` / `DocumentWriter` |
| `Snapshot` on `ReferenceFileDocument` (single type) | `Snapshot` on `DocumentWriter` and `Snapshot` on `DocumentReader` (can be two different types) |

### Migration checklist

1. **Mark your document `@Observable`.** Remove any `ObservableObject` conformance and `@Published` property wrappers. Add the `@Observable` macro.

2. **Separate reading logic into a `DocumentReader`.** Extract the body of `init(configuration:)` or your `FileWrapper`-reading code into a reader. Use `FileWrapperDocumentReader` for simple cases or implement a custom `DocumentReader` for direct URL access. The source URL arrives as a parameter to `read(from:progress:)`. Return a snapshot value.

3. **Implement `apply(snapshot:previous:)`.** Use this `@MainActor` method to update your document's properties when a new snapshot arrives from the reader.

4. **Separate writing logic into a `DocumentWriter`.** Extract `fileWrapper(snapshot:configuration:)` into a writer. Use `FileWrapperDocumentWriter` for simple cases or implement a custom `DocumentWriter`. The destination URL arrives as a parameter to `write(snapshot:to:previous:progress:)`.

5. **Implement `snapshot(contentType:)`.** Mark it `@MainActor` and `async throws` with a `sending` return type. Keep it lightweight — do serialization in the writer.

6. **Update your `DocumentGroup` initializer.** Replace the type-based initializer with the closure-based one that receives `URLDocumentConfiguration` and `DocumentCreationContext`.

7. **Audit undo registration.** The undo pattern is the same conceptually. Verify your undo actions work correctly after the changes.

### Before (`ReferenceFileDocument`)

```swift
final class OldTextDocument: ReferenceFileDocument {
    typealias Snapshot = String

    static let readableContentTypes = [UTType.plainText]

    @Published var text: String
    var undoManager: UndoManager?

    init() {
        text = ""
    }

    required init(configuration: ReadConfiguration) throws {
        if let data = configuration.file.regularFileContents {
            text = String(data: data, encoding: .utf8) ?? ""
        } else {
            text = ""
        }
    }

    func snapshot(contentType: UTType) throws -> String {
        text
    }

    func fileWrapper(
        snapshot: String, configuration: WriteConfiguration
    ) throws -> FileWrapper {
        let data = snapshot.data(using: .utf8) ?? Data()
        return FileWrapper(regularFileWithContents: data)
    }

    func updateText(_ newText: String) {
        let previous = text
        text = newText
        undoManager?.registerUndo(withTarget: self) { document in
            document.updateText(previous)
        }
        undoManager?.setActionName("Edit")
    }
}
```

### After (`Document`)

```swift
@Observable
final class TextDocument: Document {
    static let readableContentTypes = [UTType.plainText]

    var text: String

    init(text: String = "") {
        self.text = text
    }

    func reader(
        configuration: sending ReadConfiguration
    ) -> sending FileWrapperDocumentReader<String> {
        FileWrapperDocumentReader(configuration) { fileWrapper in
            guard let data =
                fileWrapper.regularFileContents else {
                throw CocoaError(.fileReadCorruptFile)
            }
            return String(decoding: data, as: UTF8.self)
        }
    }

    func writer(
        configuration: sending WriteConfiguration
    ) -> sending FileWrapperDocumentWriter<String> {
        FileWrapperDocumentWriter(configuration) { snapshot, previous in
            FileWrapper(
                regularFileWithContents: Data(snapshot.utf8)
            )
        }
    }

    @MainActor
    func snapshot(
        contentType: UTType
    ) async throws -> sending String {
        text
    }

    @MainActor
    func apply(
        snapshot: sending String, previous: sending String?
    ) async throws {
        text = snapshot
    }
}

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

## Key differences from the old APIs

- **Observation:** `@Observable` replaces `ObservableObject` + `@Published` (for `ReferenceFileDocument`) and value semantics (for `FileDocument`). The document no longer needs to store an `UndoManager` — the view reads it from the environment and registers undo in `onChange(of:)`.
- **Separation of concerns:** Reading and writing are independent types (`DocumentReader` / `DocumentWriter`), not methods on the document itself. This enables different snapshot types for reading vs. writing.
- **Concurrency:** `snapshot(contentType:)` and `apply(snapshot:previous:)` are `@MainActor async throws`. Reader and writer methods run in the background with `@concurrent`.
- **`sending` annotations:** Snapshots cross actor boundaries. Use `sending` on return types and parameters.
- **URL access:** Custom readers/writers receive the file URL directly — no more being limited to `FileWrapper`.
- **Progress:** Custom readers/writers receive `Subprogress` for reporting progress on long operations.
- **File coordination:** `URLDocumentConfiguration.makeFileCoordinator()` provides coordinated access at any time, not just during read/write.
- **Undo is mandatory for autosave.** With `FileDocument`, SwiftUI tracked changes via value comparison. With the new protocol, explicit undo registration is required — autosave depends on the undo stack.

## What NOT to do

- Do NOT claim `ReferenceFileDocument` or `FileDocument` are deprecated — they are not. The new APIs are preferred for new code when the deployment target permits.
- Do NOT mix `ObservableObject` conformance with `@Observable` on the same type.
- Do NOT perform heavy serialization in `snapshot(contentType:)` — it runs on the main actor.

# Uniform Type Identifiers

A quick reference for working with `UTType` in document-based apps.

## What UTTypes are

A uniform type identifier (UTI) is a single string that canonically identifies a file format. Instead of tracking multiple file extensions and MIME types separately, one UTI covers them all (e.g., `public.jpeg` covers `.jpeg`, `.jpg`, `.jpe`, and `image/jpeg`).

UTTypes form a **conformance hierarchy** (like protocol conformance in Swift):
- `public.jpeg` conforms to `public.image`
- `public.image` conforms to `public.data` and `public.content`
- `public.data` conforms to `public.item` (the root for all file system objects)

For document-based apps, every document type must ultimately conform to either:
- **`public.data`** — flat files (a sequence of bytes)
- **`com.apple.package`** — directories presented as a single file

## Declaring a custom type

Export a type you invented. Import a type owned by another app.

- **Export** (`UTExportedTypeDeclarations`): "I created and own this type."
- **Import** (`UTImportedTypeDeclarations`): "This type exists; another app may know more about it."
- **System types** (e.g., `public.jpeg`, `com.adobe.pdf`): no declaration needed — just use them.

### Naming rules

- Always **lowercase**, reverse-DNS: `com.mycompany.myformat`
- Reserved prefixes (do not use): `public.`, `dyn.`, `com.apple.`, `com.example.`
- Use a descriptive suffix: `com.mycompany.encrypteddatabase`, not `com.mycompany.file`

### Choosing a parent (UTTypeConformsTo)

- Regular file (sequence of bytes): conform to `public.data`
- Package (directory shown as one file): conform to `com.apple.package`
- If the format is based on JSON: also conform to `public.json`
- If it's user-facing content (documents, not caches): also conform to `public.content`

> **Important:** For drag and drop to work with your content type, it must conform to `public.data`. Types that don't conform to `public.data` cannot be represented as transferable bytes on the pasteboard.

### File extension

Always specify a `public.filename-extension` in `UTTypeTagSpecification`. Prefer longer extensions to avoid collisions — there's no three-character limit.

## Declaring in code

```swift
import UniformTypeIdentifiers

// For a type you export (you own it):
extension UTType {
    static let restaurantMenu = UTType(exportedAs: "com.myApp.restaurantmenu")
}

// For a type you import (another app owns it):
extension UTType {
    static var anotherAppsImageFormat: UTType { UTType(importedAs: "com.anotherApp.image") }
}
```

Use `static let` for exported types. Use `static var` (computed property) for imported types — the declaration may change if the owning app is installed.

## Supporting a document type (CFBundleDocumentTypes)

After declaring the type, tell the system your app can open it. Without a `CFBundleDocumentTypes` entry, the document browser won't offer your app for files with your extension — even if the UTType declaration is correct.

```xml
<key>CFBundleDocumentTypes</key>
<array>
  <dict>
    <key>CFBundleTypeName</key>
    <string>My Format</string>
    <key>LSHandlerRank</key>
    <string>Owner</string>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>LSItemContentTypes</key>
    <array>
      <string>com.mycompany.myformat</string>
    </array>
  </dict>
</array>
```

- **Handler rank** (`LSHandlerRank`): `Owner` if you created the type, `Alternate` if another app owns it.
- **Role** (`CFBundleTypeRole`): `Editor` if your app reads and writes the format; `Viewer` if it is read-only. A mismatch here (e.g., `Viewer` when your app writes) will prevent the system from offering your app as an editor — a common reason files appear grayed out or open read-only unexpectedly. On iOS `CFBundleTypeRole` lives inside this same dict; on macOS it also controls which menu items (Duplicate, Rename, Move To…) are enabled.

## Verifying types with the `uttype` CLI

```bash
# Check if a type is known to the system:
uttype "com.example.restaurantmenu"

# Show conformance chain, extensions, MIME types:
uttype --verbose "com.example.restaurantmenu"

# Verify conformance to public.data:
uttype --conformsto "public.data" "com.example.restaurantmenu"

# Verify conformance to com.apple.package:
uttype --conformsto "com.apple.package" "com.example.restaurantmenu"

# Find which type owns a file extension:
uttype --extension "restaurantmenu"

# Look up a system-declared type (e.g., Markdown):
uttype --verbose "net.daringfireball.markdown"

# Find which type owns a MIME type:
uttype --mime "application/pdf"
```

Exit code 0 means success (type found / conforms). Exit code 1 means failure (unknown type / doesn't conform).

## Common mistakes

| Mistake | Fix |
| --- | --- |
| `com.public.data` as parent | `public.data` (no `com.` prefix) |
| `public.package` as parent | `com.apple.package` |
| Uppercase in identifier (`com.myApp.Note`) | Must be all lowercase (`com.myapp.note`) |
| Missing `public.filename-extension` | Always specify at least one extension |
| Three-character extension (`mnu`) | Use a longer, descriptive extension to avoid conflicts |
| Using `static let` for imported types | Use `static var` (computed) so updated declarations are picked up |
| Not setting handler rank | Set `Owner` for your types, `Alternate` for others' types |

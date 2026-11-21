# Build Settings for `-fbounds-safety`

This document covers compiler flags, build system configuration, and related settings for enabling `-fbounds-safety`.

## Enabling `-fbounds-safety`

### Per-File Enablement (Recommended for Incremental Adoption)

Most projects adopt `-fbounds-safety` incrementally, enabling it one file at a time as a per-file build flag. See [adoption-strategies.md](adoption-strategies.md) for the adoption workflow.

### Project-Wide Enablement (After Adoption Is Complete)

Once adoption is complete across an entire target or project, you can enable `-fbounds-safety` globally. This is desirable because it controls enablement from a single location, making it easier to switch on or off.

**Xcode:** Add the custom build setting `ENABLE_C_BOUNDS_SAFETY=YES`. This applies `-fbounds-safety` only to C files — it will not bleed onto C++, Objective-C, or Objective-C++ files (unlike adding the flag to project-level C flags directly, which would).

**Other Build Systems:** Pass `-fbounds-safety` to Clang for each C source file.

No additional link-time libraries are required. Clients (including non-bounds-safe ones) should be oblivious to the change.

## Useful Flags

### `-ferror-limit=0`

Removes the limit on compiler errors. Useful during adoption to see all diagnostics at once rather than fixing errors one batch at a time.

### `-ffreestanding`

For projects without access to a `strlen` implementation. When converting `__null_terminated` pointers to indexable, `-fbounds-safety` may insert a `strlen` call. The `-ffreestanding` flag makes the compiler generate a character-counting loop instead.

### `-fbounds-safety-unique-traps`

Prevents trap merging in optimized builds. By default, the optimizer merges all traps in a function into one (to reduce code size), making it difficult to determine which specific bounds check failed. This flag preserves separate trap locations, making optimized-build debugging much easier.

### `-fbounds-safety-soft-traps=call-minimal`

Enables soft trap mode. Soft traps log violations instead of terminating the program — the compiler emits calls to `__bounds_safety_soft_trap` instead of trap instructions, allowing execution to continue after a bounds check failure. This is useful during adoption to discover multiple issues in a single run rather than fixing them one at a time. After all files compile and all traps are fixed use of soft trap mode **must be removed** to actually get the security benefit.

**Xcode:** Add the build setting `CLANG_BOUNDS_SAFETY_SOFT_TRAPS=call-minimal`. This enables soft trap mode for every source file that uses `ENABLE_C_BOUNDS_SAFETY`. For files where you manually pass `-fbounds-safety`, add the flag directly.

**Other build systems:** Pass `-fbounds-safety-soft-traps=call-minimal` to every source file that uses `-fbounds-safety`.

See [runtime-debugging.md](runtime-debugging.md) for more information on debugging with soft traps.

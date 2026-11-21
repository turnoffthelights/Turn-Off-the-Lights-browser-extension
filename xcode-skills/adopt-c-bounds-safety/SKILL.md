---
description: |
  Guide for the C -fbounds-safety language extension. Covers the language model, pointer annotations, adopting bounds-safety in existing C code, compiler build settings and modes, and runtime debugging of bounds violations.
when_to_use: |
  When working with, reading, reviewing, comparing, debugging or analyzing C code that has adopted -fbounds-safety or wants to adopt it.  Key syntax to look for Bounds annotations (__counted_by, __counted_by_or_null, __sized_by, __sized_by_or_null, __ended_by, __single, __indexable, __bidi_indexable, __unsafe_indexable, __null_terminated, __terminated_by), its helper functions (e.g.: __unsafe_forge_bidi_indexable, __unsafe_forge_single,  __null_terminated_to_indexable, __unsafe_null_terminated_to_indexable,  __unsafe_null_terminated_from_indexable) or other macros  (e.g. __ptrcheck_abi_assume_single) or includes of "ptrcheck.h".
effort: high
name: adopt-c-bounds-safety
---
## How to Use This Skill

When helping with `-fbounds-safety` adoption or code changes, ask clarifying questions about the user's codebase and goals before suggesting changes. For complex tasks involving multiple files or non-trivial annotation decisions, use plan mode to propose an approach before implementing.

# `-fbounds-safety` Language Extension

`-fbounds-safety` is a C language extension that prevents out-of-bounds memory access by enforcing bounds safety at the language level. It inserts automatic bounds checks at runtime, rejects unsafe pointer operations at compile time, and requires programmers to provide bounds annotations so the compiler can guarantee safety. Out-of-bounds accesses become deterministic traps instead of exploitable vulnerabilities.

## Detailed Documentation

### Required reading before adoption work

You MUST have fully read the following three documents (via the Read tool) at the start of an adoption task, and re-read them via the Read tool before any source-modifying step in the adoption workflow unless their content is verifiably fresh in your active context:

- [adoption-strategies.md](references/adoption-strategies.md) — the workflow for adopting `-fbounds-safety` in an existing C project (full and header-only modes).
- [language-overview.md](references/language-overview.md) — the language reference for `-fbounds-safety`: pointer kinds, annotations, and the rules that govern them.
- [common-patterns-and-pitfalls.md](references/common-patterns-and-pitfalls.md) — recipes and anti-patterns encountered during real-world adoption.

### Other references (read on demand)

For compiler flags, Xcode build settings, soft trap mode, and `ptrcheck.h` configuration, read [build-settings.md](references/build-settings.md).

For debugging bounds violations at runtime — trap behavior, LLDB commands, wide pointer inspection, watchpoints, crash log analysis, and soft trap debugging, read [runtime-debugging.md](references/runtime-debugging.md).
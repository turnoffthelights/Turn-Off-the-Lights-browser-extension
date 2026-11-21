# Runtime Debugging for `-fbounds-safety`

This guide covers debugging programs built with `-fbounds-safety`, including trap behavior, LLDB commands, wide pointer inspection, and soft trap debugging.

## Optimized vs Unoptimized Builds

Debug unoptimized code when possible. Optimized code is harder to debug because:

- **Trap reasons are usually optimized out** — you won't know why the program trapped
- **All traps in a function are merged into one** — difficult to determine which bounds check failed
- **Bounds information on wide pointers may be missing** — the optimizer removes bounds checks and associated data

If fully unoptimized builds aren't feasible (e.g., code size restrictions), selectively disable optimization on specific functions:

```c
__attribute__((optnone)) void function_to_debug() {
    // ...
}
```

Remove the attribute when debugging is complete.

### `-fbounds-safety-unique-traps` Flag

In optimized builds, use `-fbounds-safety-unique-traps` to prevent trap merging. This preserves separate trap locations, making it possible to identify which specific bounds check failed even in optimized code.

## What Happens When a Bounds Violation Occurs

When `-fbounds-safety` detects an issue at runtime, it executes a trap instruction. This is handled by the environment, usually resulting in program termination.

### Debugger — Unoptimized Program with Debug Info

#### Command Line LLDB

The stop reason shows the bounds check failure:

```
stop reason = Bounds check failed: Dereferencing above bounds
```

The "Bounds check failed:" prefix indicates `-fbounds-safety` caught the issue. After the prefix is a trap reason explaining the problem.

#### Xcode

Xcode stops at the offending line with an annotation like:

```
Thread 1: Bounds check failed: Dereferencing above bounds
```

### Debugger — Optimized Program

In optimized programs the stop reason is not specific. You need to inspect the assembly to determine if a `-fbounds-safety` trap was hit.

**Note:** the precise assembly instructions are not guaranteed to be stable.

#### arm64/arm64e

```
(lldb) dis -p
->  0x100003e60 <+296>: brk    #0x5519
```

If the program stopped at `brk #0x5519`, this is a `-fbounds-safety` trap.

#### x86_64

```
(lldb) dis -p
->  0x100003e95 <+309>: ud1l   0x19(%eax), %eax
```

If the program stopped at `ud1l` with `0x19` constant, this is a `-fbounds-safety` trap.

#### armv7

`-fbounds-safety` uses the `trap` instruction. No extra information distinguishes it from other traps. Debug an unoptimized build or step through assembly to confirm.

### Crash Logs

#### Unoptimized with Debug Symbols

The crash log shows an artificial inline frame with the trap reason:

```
Thread 0 Crashed:
0   parse_ints_O0   0x1025b7a2c Bounds check failed: Dereferencing above bounds + 0 [inlined]
1   parse_ints_O0   0x1025b7a2c parse_ints + 472 (parse_ints.c:39)
```

Frame 0 is artificial — the real crash location is frame 1.

The ESR register on arm64 is annotated with `(Breakpoint) UBSAN unknown (0x19)`, indicating a `-fbounds-safety` trap.

#### Optimized or No Debug Symbols

No trap reason frame is present. Look for `(Breakpoint) UBSAN unknown (0x19)` in the ESR register annotation (arm64 only).

#### Working with Crash Logs in LLDB

Load crash logs for interactive analysis:

```
(lldb) command script import lldb.macosx.crashlog
(lldb) crashlog -i /path/to/crashlog.ips
```

This creates an artificial debugging session where you can disassemble, read registers, navigate the stack, and examine source code.

## Trap Reasons

Trap reasons are human-readable descriptions encoded in debug info as artificial inline frames. They are prefixed with `"Bounds check failed:"`.

```
(lldb) bt
* thread #1, stop reason = Bounds check failed: Dereferencing above bounds
    frame #0: parse_ints_O0`parse_ints [inlined] Bounds check failed: Dereferencing above bounds
  * frame #1: parse_ints_O0`parse_ints at parse_ints.c:39:13
```

Trap reasons require debug info and are typically lost in optimized builds.

### Example Trap Reasons

- **`indexing below lower bound in 'ptr[idx]'`**
- **`indexing above upper bound in 'ptr[idx]'`**
- **`Pointer below bounds while casting`** — bounds check during cast (e.g., `__bidi_indexable` → `__single`) with pointer below lower bound
- **`Pointer to struct below bounds while taking address of struct member`** — bounds check during `&p->member` with p below lower bound

If a trap shows only `"Bounds check failed"` without further detail, a specific message hasn't been implemented for that case.

## Working with Wide Pointers

### Examining Wide Pointers

LLDB displays wide pointers with their bounds:

```
(lldb) p output_buffer
(int *__bidi_indexable) $1 = (ptr: 0x000100404080, bounds: 0x000100404080..0x0001004040a8)
```

- `ptr:` is the current pointer value
- `bounds:` shows lower..upper bound

Out-of-bounds pointers are indicated:

```
(int *__bidi_indexable) $2 = (out-of-bounds ptr: 0x0001004040a8, bounds: 0x000100404080..0x000100404094)
```

Out-of-bounds wide pointers are allowed to exist but cannot be dereferenced.

### Known Limitations

- In optimized code, some wide pointer components may be optimized out — LLDB shows `0x000000000000` (indistinguishable from actual NULL)
- Partially executing a statement may show incorrect results due to partial wide pointer updates
- If LLDB shows the wide pointer as a raw struct with `ptr`, `ub`, `lb` fields instead of the expected format, you're using an older LLDB version

## Working with Externally Counted Pointers

LLDB shows the count expression (unevaluated) for externally counted pointers:

### `__counted_by`

```
(lldb) p buffer
(int*) (ptr: 0x000100206210 counted_by: size)
```

### `__sized_by`

```
(lldb) p buffer
(int*) (ptr: 0x000100206210 sized_by: size)
```

### `__ended_by`

```
(lldb) p start
(int*) (ptr: 0x0001003041e0 end_expr: end)
(lldb) p end
(int*) (ptr: 0x0001003041f0 start_expr: start)
```

### Known Limitations

- LLDB does not automatically evaluate the count expression — you must evaluate it manually
- Type printing omits the bounds annotations (shows `int*` instead of `int* __counted_by(size)`)

## Types Without Special Debugger Support

These annotations currently have no special LLDB display — the unannotated pointer type is shown:

- `__single`
- `__terminated_by` and `__null_terminated`
- `__unsafe_indexable`

## Expression Parsing Limitations

The `-fbounds-safety` language mode is mostly off in LLDB's expression evaluator. Known issues:

- `-fbounds-safety` types cannot be parsed: `p (int *__bidi_indexable) foo` will fail
- `-fbounds-safety` builtins cannot be called: `__builtin_get_pointer_upper_bound(foo)` will fail
- Dereferencing a wide pointer in an expression that would trap fails to execute

## Soft Traps in LLDB

Soft trap mode must be enabled at build time — see [build-settings.md](build-settings.md) for the compiler flag and Xcode build setting.

### Supported OSs

The mode relies on an implementation of the `__bounds_safety_soft_trap` function being provided. On macOS/iOS 27.0 and newer this symbol is provided by libSystem and so this mode will work out-of-the-box.
On older OSs this symbol is not provided and so linker errors will be observed. However, projects can provide their own implementation so that debugging is still possible. E.g.:

```c
#include <bounds_safety_soft_traps.h>

__attribute__((noinline))
void __bounds_safety_soft_trap(void) {
    // Provide a symbol for LLDB to set a breakpoint on but do nothing
}
```

If projects do implement this function it must be removed when the project switched to hard trap mode.

### Observing in LLDB

LLDB includes an instrumentation plugin that automatically stops on soft traps. When a soft trap is hit:

```
Process 779 stopped
* thread #1, stop reason = Soft Bounds check failed: indexing above upper bound in 'ptr[idx]'
    frame #2: main`bad_read(ptr=(ptr: 0x00016af472a8, bounds: 0x00016af472a8..0x00016af472b4), idx=3) at main.c:4:62
```

The backtrace shows:
- Frame 0: `__bounds_safety_soft_trap` (the runtime function)
- Frame 1: artificial frame with trap reason (`__clang_trap_msg$Bounds check failed$...`)
- Frame 2: the actual source location (LLDB selects this frame automatically)

```
(lldb) bt
    frame #0: libsystem_sanitizers.dylib`__bounds_safety_soft_trap
    frame #1: main`__clang_trap_msg$Bounds check failed$indexing above upper bound in 'ptr[idx]' [inlined]
  * frame #2: main`bad_read(ptr=..., idx=3) at main.c:4:62
    frame #3: main`main(argc=1, argv=...) at main.c:10:5
```

Resume execution with `c` (continue), just like any other breakpoint.

### Disabling the Soft Trap Plugin

Add to `~/.lldbinit`:

```
plugin disable instrumentation-runtime.BoundsSafety
```

Restart your debugging session for this to take effect. Disabling mid-session is not currently supported.

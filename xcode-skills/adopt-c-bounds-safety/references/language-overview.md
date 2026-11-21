# `-fbounds-safety` Language Overview

This document describes the `-fbounds-safety` language model — a C language extension that enforces bounds safety through compiler-inserted bounds checks, compile-time restrictions on unsafe pointer operations, and programmer-provided bounds annotations.

`-fbounds-safety` mostly differs from regular C in how it handles pointers. In C, a pointer is a *point* in memory that knows its start but not its end. The end must be communicated externally with no enforced conventions — errors are common and can escalate to an attacker taking full control of a device. With `-fbounds-safety`, a pointer is a *range* of memory that knows both its start and its end. The compiler inserts bounds checks to downgrade security bugs into mere logic errors, similar to how Swift protects against out-of-bounds array access.

The bounds annotations and builtin functions described in this document become available after including the `ptrcheck.h` toolchain header.
This header should be included unconditionally, even in code that builds without `-fbounds-safety` because we can assume AppleClang. `ptrcheck.h` provides flag-off fallback definitions for **both** the bounds annotations (`__counted_by`, `__sized_by`, `__null_terminated`, `__single`, etc.) **and** the forge/conversion intrinsics (`__unsafe_forge_*`, `__null_terminated_to_indexable`, `__unsafe_null_terminated_from_indexable`, etc.). When the flag is off, annotations expand to empty and intrinsics expand to plain C casts or pointer pass-throughs, so source using them compiles unchanged. The **only** exceptions are the ABI-breaking attributes `__bidi_indexable` and `__indexable` (and their `__ptrcheck_abi_assume_*` cousins), which are deliberately left undefined so that misuse in a header produces a compile error rather than a silent ABI break. Consequently, the only code that needs `#if __has_ptrcheck` guarding (or a per-`.c`-file fallback `#define`) is code that names those two attributes by token — see [Using `__bidi_indexable` / `__indexable` in a Source File That Must Compile Without `-fbounds-safety`](common-patterns-and-pitfalls.md#using-__bidi_indexable--__indexable-in-a-source-file-that-must-compile-without--fbounds-safety) for the pattern.


## Quick Reference: Pointer Kinds and Bounds Annotations

| Pointer Kind | Description | ABI Compatible | Default For |
|---|---|---|---|
| `__single` | Points to exactly one element or NULL. No arithmetic allowed. | Yes | ABI-visible pointers (params, struct fields, globals) |
| `__bidi_indexable` | Wide pointer with lower bound, upper bound, and current value. Full arithmetic support. | No | ABI-hidden pointers (local variables) |
| `__indexable` | Wide pointer with upper bound and current value. Forward arithmetic only. | No | (explicit only) |
| `__unsafe_indexable` | No bounds, no checks. Escape hatch for interop with non-adopted code. | Yes | System/SDK headers without `-fbounds-safety` |
| `__counted_by(N)` | N elements at pointer. E.g. `int *__counted_by(count) buf` | Yes | (explicit only) |
| `__sized_by(N)` | N bytes at pointer. E.g. `void *__sized_by(size) buf` | Yes | (explicit only) |
| `__ended_by(P)` | Range from pointer to P. E.g. `int *__ended_by(end) begin` | Yes | (explicit only) |
| `__counted_by_or_null(N)` | Like `__counted_by` but allows NULL | Yes | (explicit only) |
| `__sized_by_or_null(N)` | Like `__sized_by` but allows NULL | Yes | (explicit only) |
| `__null_terminated` | Points to memory terminated by 0 as the sentinel value. Arithmetic limited to +0 and +1. | Yes | ABI-visible `const char *` pointers |
| `__terminated_by(T)` | Points to memory terminated by sentinel value T. Arithmetic limited to +0 and +1. | Yes | (explicit only) |

## ABI Compatibility and ABI Visibility

By establishing conventions for tying a pointer with its length, bounds-safe code remains ABI-compatible with bounds-unsafe code. `-fbounds-safety` enforces conventions on how to tie a pointer with its length, but to maintain maximum flexibility, it changes pointers that are hidden from the ABI.

There are two categories of pointers:

- **ABI-visible**: function arguments and returns, global variables, structure fields — things you would commonly put in header files
- **ABI-hidden**: essentially only some local variables

> **Only the top-level pointer is considered ABI-hidden.** For instance, in a function body, `element_t *p` creates an ABI-hidden pointer. But `element_t **p` declares an ABI-hidden pointer to an ABI-visible pointer, since the second-level pointer may have an ABI-visible source.

```c
struct foo {
    int *bar; // visible
    int **baz; // visible pointer to a visible pointer
};

int *bar; // visible

int * // visible
baz(
    int *frob  // visible
) {
    int *nicate; // hidden
    int **qwop; // hidden pointer to a visible pointer
}
```

`-fbounds-safety` changes ABI-hidden pointers to be **bidirectionally indexable** — a wide pointer containing three components:

- a current pointer value
- a lower bound
- an upper bound

When you do pointer arithmetic on a bidirectionally indexable pointer, the only immediate check is that the operation did not overflow. There is no immediate bounds check — it is not an error to create an out-of-bounds pointer, and you can bring it back in bounds later. Bounds checks occur when: (1) the pointer is about to be dereferenced, or (2) the bounds are about to be stripped.

`-fbounds-safety` changes ABI-visible pointers to be **single** by default — a compile-time error to do arithmetic on them. Single pointers have the same size and layout as regular C pointers, maintaining ABI compatibility.

**Recommendation:** Stick to the default bidirectionally indexable pointers for local variables. Copy parameters to local variables to convert them to bidirectionally indexable pointers when needed.

## Attribute Placement on Multi-Level Pointers

Every pointer/bounds attribute — `__single`, `__bidi_indexable`, `__indexable`, `__unsafe_indexable`, `__null_terminated`, `__terminated_by`, `__counted_by`, `__counted_by_or_null`, `__sized_by`, `__sized_by_or_null`, `__ended_by` — attaches to **the `*` that immediately precedes it**, not to "the pointer variable". On a single-pointer declaration this rarely matters, but on multi-level pointers the position of the attribute changes the meaning entirely:

| Declaration                          | Parsed as                         | Meaning                                                                          |
|--------------------------------------|-----------------------------------|----------------------------------------------------------------------------------|
| `int *__single *p`                   | inner `*__single`, outer default  | pointer to (`int *__single`)                                                     |
| `int **__single p`                   | inner default, outer `*__single`  | `__single` pointer to `int *`                                                    |
| `int *__counted_by(*n) *p`           | inner counted, outer default      | pointer to a counted `int *` — the **OUT / IN-OUT** shape                        |
| `int **__counted_by(n) p`            | inner default, outer counted      | counted array of `n` `int *` — an **array of pointers**                          |
| `int *__single *__counted_by(*n) p`  | inner `__single`, outer counted   | real SDK form (see `malloc_get_all_zones` in `<malloc/malloc.h>`)                |

Compiler diagnostics reflect this parse verbatim: writing `int **__bidi_indexable p` yields a type printed as `int *__single *__bidi_indexable`, with the inner `*` taking the default attribute.

For out- and in-out-parameter patterns built on this rule, see [Out and In-Out Parameters with `__counted_by`](#out-and-in-out-parameters-with-__counted_by).

## Indexability Kinds

There are 4 kinds of pointers with internal bounds. The specifier goes after the star it modifies (see "Attribute Placement on Multi-Level Pointers" above): `element_t *__bidi_indexable p`.

### `__bidi_indexable`

Bidirectionally indexable pointers support arithmetic that both increases or decreases the current value. They have a current pointer value, lower bound, and upper bound. Bounds values are immutable — arithmetic only modifies the current value.

Arithmetic is only a runtime error when the pointer value overflows. Bidirectionally indexable pointers are **not** ABI-compatible with C pointers.

### `__indexable`

Forward-indexable pointers support arithmetic that increases the current value. They have a current pointer value and an upper bound. It is a compile-time error to add a negative value to a forward-indexable pointer. It is a runtime error if arithmetic results in a value smaller than the starting value.

Forward-indexable pointers are **not** ABI-compatible with C pointers, but they are smaller than `__bidi_indexable` — eligible to be passed by registers on x86_64 and AArch64.

### `__single`

Single pointers require the pointer is either `NULL` or a pointer to one valid element. It is a compile-time error to perform arithmetic on a `__single` pointer.

Single pointers **are** ABI-compatible with C pointers.

### `__unsafe_indexable`

Unsafely indexable pointers are an **unsafe escape hatch** — they have no bounds checks and act just like C pointers. They cannot convert to safe pointer kinds. They **are** ABI-compatible with C pointers.

Use only when you can separately verify safety, or to interoperate with libraries that don't use `-fbounds-safety`. Before reaching for `__unsafe_indexable`, consider the safer alternatives described in the `__unsafe_indexable` subsection under [Escape Hatches](#escape-hatches).

### Accessing Pointer Bounds

From code that enables `-fbounds-safety`, you can access a pointer `p`'s bounds:

- Current value: reference `p` directly
- Lower bound: `__ptr_lower_bound(p)`
- Upper bound: `__ptr_upper_bound(p)`

```c
int array[50];
int *p = array + 5;
int *lower = __ptr_lower_bound(p); // current value = &array[0]
int *upper = __ptr_upper_bound(p); // current value = &array[50]
```

### Converting Between Indexable Pointers

Conversions between the different indexable pointer types work as follows (in pseudocode; `lower`, `current` and `upper` are not directly accessible):

| From/To | `__bidi_indexable` | `__indexable` | `__single` | `__unsafe_indexable` |
|---|---|---|---|---|
| **`__bidi_indexable`** | trivial | bounds check, then: indexable.current = bidi.current, indexable.upper = bidi.upper | bounds check, then: single.current = bidi.current | unsafe.current = bidi.current |
| **`__indexable`** | bidi.lower = indexable.current, bidi.current = indexable.current, bidi.upper = indexable.upper | trivial | bounds check, then: single.current = indexable.current | unsafe.current = indexable.current |
| **`__single`** | bidi.lower = single.current, bidi.current = single.current, bidi.upper = &single.current[1] | indexable.current = single.current, indexable.upper = &single.current[1] | trivial | unsafe.current = single.current |
| **`__unsafe_indexable`** | compile-time error | compile-time error | compile-time error | trivial |

### Default Pointer Attributes

The default for ABI-visible pointers changes based on context:

- **In system/SDK headers**: the default is `__unsafe_indexable`
- **In all other files**: the default is `__single`, except if the type is `const char*` in which case the attribute is `__null_terminated`.

This can be changed using `__ptrcheck_abi_assume_single()` at the top of a file. If your project exports headers and has adopted `-fbounds-safety`, add this directive so clients know to treat it as a bounds-safe header. This macro is a pragma that **only affects the current file** (i.e. subsequent includes are not affected).

## External Bounds Annotations

For C APIs that pass a pointer and a length, `-fbounds-safety` supports annotations that control how to fetch bounds from another value in the same scope:

- **`__counted_by(X)`**: X counts how many objects are available (cannot apply to `void *`)
- **`__sized_by(X)`**: X counts how many bytes are available (can apply to `void *`)
- **`__ended_by(P)`**: P is a pointer marking one-past-the-end of the range

Use `__counted_by` for arrays (including byte arrays), and `__sized_by` for single objects of variable size.

Note `__counted_by` and `__sized_by` do not allow the pointer to be `NULL` unless the count is `0`. To allow the pointer
to be `NULL` for any count value use `__counted_by_or_null` or `__sized_by_or_null` instead.

### `__counted_by_or_null` and `__sized_by_or_null`

These variants allow the pointer to be NULL with an arbitrary count/size. Useful for functions like `malloc` that may return NULL:

```c
void *__sized_by_or_null(size) malloc(size_t size);
```

The bounds check first checks whether the pointer is NULL; if so, the size is ignored.

### Usage Examples

```c
// variables:
int count;
int *__counted_by(count) elems;

// fields:
struct my_range {
    int *__ended_by(end) begin;
    int *end;
};

// parameters:
void foo(int count, int *__counted_by(count) elems);
void bar_counted(int *__counted_by(count) elems, int count);

// return value:
void *__sized_by(n) malloc(size_t n);
```

Array types decay to counted pointers in function prototypes:

```c
int baz(int arr[5]); // same as int baz(int *__counted_by(5) arr)
int frob(int count, int arr[count]); // same as int frob(int count, int *__counted_by(count) arr)
```

The `__counted_by` annotation can also be placed inside array brackets:

```c
int baz(int arr[__counted_by(5)]);
int frob(int count, int arr[__counted_by(count)]);

// Flexible array members:
struct flexible {
    int count;
    int flex[__counted_by(count)];
};
```

### Conversion to Internal Bounds

When you access a pointer with a count or end annotation, it is implicitly converted to a `__bidi_indexable` pointer:

```c
void read_buffer(int *__counted_by(count) elems, int count) {
    // bidi.lower = elems; bidi.current = elems; bidi.upper = elems + count
    int *ptr = elems;
}

void read_buffer_with_byte_size(int *__sized_by(byte_count) elems, int byte_count) {
    // bidi.lower = elems; bidi.current = elems; bidi.upper = (char *)elems + byte_count
    int *ptr = elems;
}

void read_ranged_buffer(int *__ended_by(end) begin, int *end) {
    // bidi.lower = begin; bidi.current = begin; bidi.upper = end
    int *ptr = begin;
}
```

Converting from internal bounds to external bounds triggers a bounds check (since bounds will be discarded):

```c
int elems[10];
bar_counted(elems, 5);
// bounds check: __ptr_lower_bound(elems) <= elems <= elems+5 <= __ptr_upper_bound(elems)
```

### Assignment Rules for External Bounds

To prevent inconsistent states, assignments to pointer-count pairs must happen in groups. Groups are delimited by expressions with side effects (like function calls) and logical scopes:

```c
void somefunction() {
    int count = 0;
    int *__counted_by(count) elems = NULL;
    {
        // group 1
        elems = storage;
        count = 3;
        printf("hello!"); // side effects end group 1

        // group 2
        count = 2;

        {   // scope ends group 2
            // ...
        }

        // group 3
        count = 1;
        elems = storage + 1;
    } // scope ends group 3
}
```

> **Note:** All function calls (including `malloc`) end assignment groups. Since `-fbounds-safety` analyzes assignments right-to-left, when malloc is directly assigned to a counted pointer, the count assignment must be **after** the call to malloc.

### Count Expression Restrictions

Count expressions on function parameters and return values share the same grammar. Allowed forms:

- Integer constants and `sizeof` (e.g. `5`, `sizeof(int)`)
- Direct references to parameters (e.g. `count`)
- Arithmetic, bitwise, and shift operations on parameters (e.g. `count + 1`, `rows * cols`, `n & 0xff`, `n / 2`)
- Casts wrapping an allowed expression (e.g. `(size_t)count`, `(size_t)*count`)
- A single dereference of a pointer parameter (e.g. `*count`) — this is what enables the out- and in-out-parameter pattern
- A call to a function that is marked `__attribute__((const))`

Rejected forms (each produces `error: invalid argument expression to bounds attribute`):

- A dereference combined with any arithmetic (e.g. `*count + 1`, `*count + 0`, `(size_t)*count - 1`) — the dereference must stand alone
- Multi-level dereference (`**count`) or array subscript (`count[0]`)
- Struct member access via `.` or `->` (except in the flexible-array-member case below)
- Ternary expressions (`x ? x : 1`)
- Calls to functions without the `const` attribute

Struct fields (including flexible array members) follow a slightly looser rule:

- Direct references to sibling scalar fields, and arithmetic/bitwise operations on them, are allowed in any `__counted_by`/`__sized_by` field declaration.
- `.` access into a nested-struct sibling (e.g. `__counted_by(i.n)` where `i` is a sibling field) is allowed **only** inside flexible array member declarations.
- `->` is **never** accepted in a count expression — not even for flexible array members. Clang reports *"arrow notation not allowed for struct member in count parameter"*.

## Out and In-Out Parameters with `__counted_by`

APIs that return a pointer paired with its count — or let the caller hand in a pointer-count pair and have the callee grow or fill it — are expressed with a pointer-to-pointer argument whose inner `*` carries the bounds attribute. The shape is `T *__counted_by(*count) *out`; several macOS SDK functions use it (see "Recognising real SDK signatures" below). The positional rule from [Attribute Placement on Multi-Level Pointers](#attribute-placement-on-multi-level-pointers) is what makes this work: `__counted_by` attaches to the `*` immediately to its left, so the inner pointer carries the count and the outer `*` is just "pointer-to". The same shape also works with `__counted_by_or_null`, `__sized_by`, `__sized_by_or_null`, and `__ended_by`.

Four variants:

### Pure OUT (function allocates)

```c
void make_out(int *__counted_by(*count) *o, size_t *count);

// Implementation
void make_out(int *__counted_by(*count) *o, size_t *count) {
    size_t n = 10;
    int *p = malloc(n * sizeof *p);
    *count = n;   // assign count first, then the pointer (right-to-left analysis)
    *o = p;
}

// Caller
void caller(void) {
    size_t count = 0;
    int *__counted_by(count) buf = NULL;   // must be adjacent to 'count'
    make_out(&buf, &count);
    for (size_t i = 0; i < count; i++) buf[i] = (int)i;
    free(buf);
}
```

### INOUT (grow or resize)

Identical signature shape to the OUT variant — the two are indistinguishable from the type alone. Document the direction in a comment or by naming:

```c
void grow_inout(int *__counted_by(*count) *p, size_t *count) {
    size_t n = *count * 2;
    int *tmp = realloc(*p, n * sizeof(int));
    *count = n;
    *p = tmp;
}
```

### Fill-in-place INOUT

Caller owns the pointer; only `*count` changes. Matches APIs like `sysctlnametomib`:

```c
int fill(int *__counted_by(*count) buf, size_t *count);
```

### OUT with by-value capacity

Caller decides the size; a `count = count;` self-assignment inside the callee satisfies the dependent-variable rule (the compiler's own diagnostic suggests exactly this form):

```c
void alloc_fixed(int *__counted_by(count) *o, size_t count) {
    int *p = malloc(count * sizeof *p);
    count = count;   // self-assign: the dependency rule needs both sides in the same group
    *o = p;
}
```

### Caller-side rules

These follow from the general [Assignment Rules for External Bounds](#assignment-rules-for-external-bounds) but trip up most often at out/in-out call sites:

- **Adjacent declarations.** The counted pointer and its count local must be declared in back-to-back declarations with no other statement between them, or Clang reports *"local variable X must be declared right next to its dependent decl"*.
- **No side effects between paired assignments.** `buf = malloc(...)` before `count = ...` won't compile — `malloc` ends the group. Capture the allocation in a plain local first, then assign count and pointer with nothing between them.
- **Address-of must match, for the double-pointer shape.** In Pure OUT and INOUT (grow/resize), you pass `f(&buf, &count)` — `f(&buf, count)` triggers *"passing address of 'buf' as an indirect parameter; must also pass 'count' or its address"*. Fill-in-place INOUT passes the pointer by value with `&count`; by-value-capacity OUT passes both by value. Match the callee's signature.

### Recognising real SDK signatures

| SDK function                                                                                             | Shape                 |
|----------------------------------------------------------------------------------------------------------|-----------------------|
| `open_memstream(char *_LIBC_COUNT(*__sizep) *__bufp, size_t *__sizep)` (`<_stdio.h>`)                     | Pure OUT              |
| `getdelim(char *_LIBC_COUNT(*__linecapp) *__linep, size_t *__linecapp, ...)` (`<_stdio.h>`)               | INOUT (grow on demand)|
| `sysctlnametomib(const char *, int *__counted_by(*sizep), size_t *sizep)` (`<sys/sysctl.h>`)              | Fill-in-place INOUT   |
| `sysctl(..., void *__sized_by(*oldlenp), size_t *oldlenp, void *__sized_by(newlen), size_t newlen)`       | Mixed INOUT + IN on one call |
| `malloc_get_all_zones(..., vm_address_t *__single *__counted_by(*count) addresses, unsigned *count)` (`<malloc/malloc.h>`) | OUT with nested `__single` + `__counted_by` |

`_LIBC_COUNT(*n)` is the Apple LibC wrapper macro for `__counted_by(*n)`; `_LIBC_SIZE(*n)` wraps `__sized_by(*n)`. They expand to nothing when `-fbounds-safety` is disabled.

## Flexible Array Members

Structures with flexible array members must indicate the count with `__counted_by` inside the empty array brackets:

```c
struct flexible {
    int count;
    int elems[__counted_by(count)];
};
```

For a `__single` pointer to such a struct, bounds come from the current value of `count`:

```c
struct flexible *__single flex = /* ... */;
flex->count = flex->count - 1; // OK (unless count was 0)
flex->count = flex->count + 1; // runtime error
```

For a pointer with external bounds (e.g., `__sized_by`), `count` can be modified within those bounds:

```c
struct flexible *__sized_by(12) flex = /* ... */;
flex->count = 2; // OK
flex->count = 3; // runtime error
```

Pointer arithmetic on a pointer to a struct with a flexible array member is prohibited.

## Value-Terminated Arrays

`-fbounds-safety` supports value-terminated arrays with `__terminated_by(TR)`. Currently `TR` must be NULL or an integer constant.

```c
// C strings:
const char *__null_terminated s; // equivalent to __terminated_by(0)
```

Value-terminated arrays support arithmetic with values 0 and 1 only. It is a runtime trap to execute `ptr + 1` if `*ptr` is the terminator:

```c
const char *s = /*...*/;
while (*s) {
    s++; // OK
}
// *s == 0
*s == 0; // OK: can read terminator
*s = 1;  // runtime error: erasing terminator
s++;     // runtime error: past end
```

Note conversion to/from `__terminated_by` from/to other safe pointer kinds is implicitly disallowed because the conversion in many cases requires a linear scan of memory which has performance implications that developers likely do not want happening implicitly. Instead explicit conversion functions need to be used which mean the developer is actively choosing to take the performance cost. These conversion functions are detailed in the next section.

### Conversion Functions

Three fundamental conversion functions between `__terminated_by` and indexable types:

- **`__terminated_by_to_indexable(P)`**: Convert to indexable, excluding terminator from bounds. Safe operation. May insert a `strlen` call for NUL-terminated strings.
- **`__unsafe_terminated_by_to_indexable(P)`**: Convert to indexable, including terminator in bounds. Unsafe — terminator becomes writable.
- **`__unsafe_terminated_by_from_indexable(TR, P [, ENDP])`**: Convert indexable to `__terminated_by(TR)`. Checks that P contains TR within bounds. If ENDP specified, only verifies ENDP points to terminator. Note this function is referred to as "unsafe" because the original indexable pointer (`P`) may still exist and could be used to later overwrite the terminator and thus the resulting pointer would no longer be correctly terminated. However, if the pointer `P` (and other aliases of the result) are immediately made unusable (e.g. by making them null pointers) then this conversion from terminated_by to indexable is perfectly safe.

Convenience variants for __null_terminated pointers:

- `__null_terminated_to_indexable(P)`
- `__unsafe_null_terminated_to_indexable(P)`
- `__unsafe_null_terminated_from_indexable(P [, ENDP])`

### Example: `strdup` with `-fbounds-safety`

```c
// -fbounds-safety enabled
char *strdup(const char *_s) {
    const char *__indexable s = __terminated_by_to_indexable(_s);
    size_t size = __ptr_upper_bound(s) - s;
    char *result = malloc(size + 1);
    memcpy(result, s, size);
    result[size] = 0;
    return __unsafe_null_terminated_from_indexable(result, &result[size]);
}
```

## Comprehensive Pointer Conversion Table

The table below summarizes the allowed implicit and explicit conversions across all pointer kinds, including external bounds and value-terminated pointers. For the detailed mechanics of how internal bounds are transferred between indexable pointer kinds, see the [conversion table above](#converting-between-indexable-pointers).

| From/To | `__bidi_indexable` | `__indexable` | `__single` | `__unsafe_indexable` | `__counted_by` | `__null_terminated` |
|---|---|---|---|---|---|---|
| **`__bidi_indexable`** | trivial | implicit (adds bounds check) | implicit (adds bounds check) | implicit | implicit (adds bounds check) | explicit only: use `__unsafe_null_terminated_from_indexable()` |
| **`__indexable`** | implicit | trivial | implicit (adds bounds check) | implicit | implicit (adds bounds check) | explicit only: use `__unsafe_null_terminated_from_indexable()` |
| **`__single`** | implicit | implicit | trivial | implicit | implicit (adds bounds check) | explicit only: use `__unsafe_null_terminated_from_indexable()` |
| **`__unsafe_indexable`** | error | error | error | trivial | error | explicit only: use `__unsafe_forge_null_terminated()` |
| **`__counted_by`** | implicit | implicit | implicit (adds bounds check) | implicit | implicit (adds bounds check) | explicit only: use `__unsafe_null_terminated_from_indexable()` |
| **`__null_terminated`** | explicit only: use `__null_terminated_to_indexable()` | explicit only: use `__null_terminated_to_indexable()` | explicit only: use `__null_terminated_to_indexable()` | implicit | explicit only: use `__null_terminated_to_indexable()` | trivial |

Notes:

- **`__counted_by`** in this table represents all external bounds annotations (`__sized_by`, `__ended_by`, `__counted_by_or_null`, `__sized_by_or_null`) since they behave the same way for conversions.
- **implicit (adds bounds check)** means the conversion happens automatically but a runtime check is inserted to verify the pointer is within the required bounds.
- **implicit** means the conversion happens automatically with no check (bounds are transferred or dropped).
- **explicit only** means the conversion is a compile-time error unless an explicit conversion function is used — see the [Value-Terminated Arrays](#value-terminated-arrays) section.
- Converting from `__unsafe_indexable` to any safe pointer kind is always a compile-time error — use `__unsafe_forge_bidi_indexable()` or `__unsafe_forge_single()`.

## Deriving Bounds from Objects

Rules for which bounds you get with regular C operations:

- **Constant-sized arrays** (`T arr[N]` as parameter, local, global, or struct member) decay to `T *__counted_by(N)` — bounds wrap the entire array.
- **Unsized array parameters** (`T arr[]`) decay to `T *__single`.
- **`&arr[10]`** or `arr + 10` gets a pointer whose bounds match `arr`'s bounds
- **`&variable`** or **`&struct_field`** gets a pointer tightly fit around that one value

```c
struct array_inside {
    int the_array[12];
    int foo;
};

struct array_inside many_arrays[15];
int one_array[10];
int one_element;
```

- `&one_element` → bounds: `[&one_element, &one_element + 1)`
- `one_array` → bounds: `[&one_array[0], &one_array[10])`
- `&many_arrays[0].foo` → bounds: `[&many_arrays[0].foo, &many_arrays[0].foo + 1)` — **taking the address of a field always results in bounds tightly fit around that field**, preventing intra-object overflow
- `many_arrays[0].the_array` → bounds: `[&many_arrays[0].the_array[0], &many_arrays[0].the_array[12])`

Calls to `malloc`, `calloc`, and `realloc` return pointers with bounds matching the requested size.

## Escape Hatches

### `__unsafe_forge_bidi_indexable`

Creates a bidirectionally indexable pointer from any value that could be cast to a pointer in C:

```c
void *__unsafe_forge_bidi_indexable(type, value, size_t size);
```

Use sparingly as a last resort. The primary use case is interoperating with libraries that don't enable `-fbounds-safety`.

### `__unsafe_forge_single`

Creates a `__single` pointer from an `__unsafe_indexable` pointer. Useful when interfacing with system headers that haven't adopted `-fbounds-safety`:

```c
FILE *f = __unsafe_forge_single(FILE *, stdin);
```

### When to Forge

Forges are appropriate when the pointer source is `__unsafe_indexable` and you can verify the bounds externally:

**Consuming `__unsafe_indexable` pointers from non-adopted headers:**

```c
// third_party_lib.h — not adopted, so all pointers default to __unsafe_indexable
struct device *get_device(int id);

// your code — forge to __single so you can dereference it
struct device *dev = __unsafe_forge_single(struct device *, get_device(0));
```

**Creating bounded pointers from `__unsafe_indexable` struct fields in headers you can't modify (e.g., third-party):**

```c
// third_party_lib.h — can't change this header
// Under -fbounds-safety, data defaults to __unsafe_indexable
struct legacy_buffer {
    void *data;
    size_t size;
};

// your code — forge because the struct can't be annotated
void process(struct legacy_buffer *buf) {
    void *safe = __unsafe_forge_bidi_indexable(void *, buf->data, buf->size);
}
```

If you own the header, annotate the struct instead: `void *__sized_by(size) data;`

**Self-describing buffers where bounds can't be expressed statically:**

```c
// Pascal-string: buf[0] is the byte count, data follows at buf[1..]
void write_block(GifByteType *__unsafe_indexable buf) {
    int block_len = buf[0] + 1;
    GifByteType *safe = __unsafe_forge_bidi_indexable(
        GifByteType *, buf, block_len);
    fwrite(safe, 1, block_len, out);
}
```

### When NOT to Forge

Forges are unnecessary when the pointer already carries bounds information:

**Annotated allocator returns:** `malloc`, `calloc`, `realloc` (and any function with `alloc_size` or explicit `__sized_by_or_null` on the return type) already return pointers with bounds. Casting to a typed pointer produces `__bidi_indexable` with correct bounds. Forging re-derives what the compiler already knows. Note: unannotated custom allocators returning plain `void *` do NOT carry bounds — forging may be necessary there until the allocator is annotated.

```c
struct container {
    int count;
    Item *__counted_by(count) items;
};

// WRONG — forge is redundant
Item *new_items = (Item *)realloc(c->items, newCount * sizeof(Item));
c->count = newCount;
c->items = __unsafe_forge_bidi_indexable(  // unnecessary!
    Item *, new_items, (size_t)newCount * sizeof(Item));

// RIGHT — realloc has alloc_size, so the cast already carries correct bounds
Item *new_items = (Item *)realloc(c->items, newCount * sizeof(Item));
c->count = newCount;
c->items = new_items;  // compiler inserts bounds check automatically
```

**`__counted_by`/`__sized_by` pointers:** Accessing a `__counted_by(N)` or `__sized_by(N)` pointer eagerly converts it to `__bidi_indexable` with correct bounds (see "Conversion to Internal Bounds"). No forge needed.

```c
// WRONG — forge is redundant
Item *local = __unsafe_forge_bidi_indexable(  // unnecessary!
    Item *, c->items, (size_t)c->count * sizeof(Item));

// RIGHT — accessing a __counted_by pointer eagerly converts to __bidi_indexable
Item *local = c->items;  // already __bidi_indexable with correct bounds
```

**Constant-sized arrays:** A declared array `T arr[N]` decays to `T *__counted_by(N)` whenever it's used as a value — whether `arr` is a function parameter, local, global, or struct member (`p->buf`). The decayed pointer already carries bounds, and assigning it to a `T *` local gives `__bidi_indexable` with the array's bounds. A forge re-derives what the compiler already knows. See [Deriving Bounds from Objects](#deriving-bounds-from-objects).

```c
struct Frame { uint8_t buf[256]; };

// WRONG — forge is redundant
void process(struct Frame *p) {
    uint8_t *view = __unsafe_forge_bidi_indexable(  // unnecessary!
        uint8_t *, p->buf, sizeof(p->buf));
}

// RIGHT — array decay already gives bounds
void process(struct Frame *p) {
    uint8_t *view = p->buf;  // __bidi_indexable, bounds [&p->buf[0], &p->buf[256])
}
```

**General rule:** If the pointer already has bounds information from its source (annotated allocator, annotated field, annotated parameter), don't forge. Only forge when the source is `__unsafe_indexable` or otherwise has no bounds.

### `__unsafe_indexable`

ABI-visible pointer surfaces — function parameters, struct fields, return types, globals — cannot use the ABI-incompatible `__bidi_indexable` / `__indexable`. The choice is between an externally counted bounds annotation (e.g. `__counted_by`, `__sized_by`, `__null_terminated`), `__single`, and `__unsafe_indexable`. Walk this decision tree in order:

1. **Does the pointer actually point to a buffer of multiple elements/bytes?** If no — it really is `NULL` or one object — keep `__single` (the implicit default for ABI-visible surfaces). Stop.
2. **Can the buffer's bound be expressed in the count grammar?**
   - For function parameters: a sibling parameter, an integer constant, or `*deref` of a pointer parameter — see [Count Expression Restrictions](#count-expression-restrictions). Use `__counted_by` / `__sized_by` / `__counted_by_or_null` / `__sized_by_or_null`.
   - For struct fields: a sibling scalar in the same struct or a constant. **Flexible-array-member exception:** FAMs additionally allow `.` access into a sibling struct's scalar fields (e.g. `__counted_by(dim.n)`); `->` is still rejected even for FAMs.
   - For NUL-terminated strings: `__null_terminated`.
3. **If the bound cannot be expressed**, the choice depends on the surface:
   - **Internal function** (`static` or in a private header): use `__bidi_indexable` directly — the ABI doesn't need preserving. See *Rewriting Internal APIs* in [common-patterns-and-pitfalls.md](common-patterns-and-pitfalls.md).
   - **Public function**: apply *Safe Wrappers for Public APIs* in [common-patterns-and-pitfalls.md](common-patterns-and-pitfalls.md).
   - **Struct field**: no `__bidi_indexable` option (ABI), no Safe Wrapper option (fields don't have shim signatures). Mark the field `__unsafe_indexable` explicitly.

**Never leave the surface implicit (defaulting to `__single`) when the pointer is actually a buffer.** Implicit `__single` is a lie about the data shape; explicit `__unsafe_indexable` correctly tells consumers "no bounds info — forge at use sites". See [Forging a `__single` Pointer Means the Source Is Misannotated](common-patterns-and-pitfalls.md#forging-a-__single-pointer-means-the-source-is-misannotated) for examples.

## Principled Bounds Checks

All bounds checks verify that a range of memory is within another range. Ranges are inclusive-exclusive (lower bound is dereferenceable, upper bound is one-past-the-end).

For all memory accesses, `-fbounds-safety` verifies: **lower ≤ access_start ≤ access_end ≤ upper**

```c
int array[10];
int *p = array; // lower: &array[0], upper: &array[10]
return p[3];    // Check [&p[3], &p[4]) within [p.lower, p.upper) — OK
return p[13];   // Check [&p[13], &p[14]) within [p.lower, p.upper) — TRAP!
```

Conversion operations may check larger ranges:

```c
int foo(int *__counted_by(count) elems, int count);
int *__bidi_indexable p = /* ... */;
foo(p, 10); // bounds check: at least 10 elements accessible at p
```

## Performance Implications

`-fbounds-safety` may impact performance by adding bounds checks and increasing pointer size. LLVM optimizations eliminate most of this cost.

The compiler eagerly adds bounds checks, but LLVM detects redundant checks and eliminates them:

```c
int sum(int *__counted_by(count) elems, int count) {
    int accum = 0;
    for (int i = 0; i < count; ++i) {
        accum += elems[i]; // bounds check added but eliminated — i < count guarantees safety
    }
    return accum;
}
```

Remaining checks typically indicate either a real bug or a pointer with internal bounds that LLVM can't statically verify.

**Performance guidance:**
- Prefer pointers with external bounds (`__counted_by`, etc.) over internal bounds in function arguments
- `__bidi_indexable` pointers are 3 register words — always passed via stack on x86_64 and AArch64
- `__indexable` pointers are 2 register words — can be passed in registers
- Static and inline functions eliminate the difference in optimized builds

**Measured overhead** (from Ptrdist and Olden benchmarks, 2023):
- Code size: 9.1% geomean (range: -1.4% to 38%)
- Runtime: 5.1% geomean (range: -1% to 29%)
- Real-world audio codecs: ~1% runtime overhead

## Detecting `-fbounds-safety`

```c
#if __has_feature(bounds_safety)
/* bounds-safe code */
#else
/* non-bounds-safe code */
#endif
```

## LibC Annotation Macros

Apple's LibC headers use wrapper macros (prefixed `_LIBC_`) instead of the raw `-fbounds-safety` annotations. These are defined in `<_bounds.h>`. When `-fbounds-safety` is not enabled, these macros expand to nothing, so the headers remain compatible with non-bounds-safe builds.

| LibC Macro | `-fbounds-safety` Equivalent |
|---|---|
| `_LIBC_COUNT(x)` | `__counted_by(x)` |
| `_LIBC_COUNT_OR_NULL(x)` | `__counted_by_or_null(x)` |
| `_LIBC_SIZE(x)` | `__sized_by(x)` |
| `_LIBC_SIZE_OR_NULL(x)` | `__sized_by_or_null(x)` |
| `_LIBC_ENDED_BY(x)` | `__ended_by(x)` |
| `_LIBC_SINGLE` | `__single` |
| `_LIBC_UNSAFE_INDEXABLE` | `__unsafe_indexable` |
| `_LIBC_CSTR` | `__null_terminated` |
| `_LIBC_NULL_TERMINATED` | `__null_terminated` |
| `_LIBC_FLEX_COUNT(FIELD, INTCOUNT)` | `__counted_by(FIELD)` |
| `_LIBC_SINGLE_BY_DEFAULT()` | `__ptrcheck_abi_assume_single()` |
| `_LIBC_PTRCHECK_REPLACED(R)` | `__ptrcheck_unavailable_r(R)` |
| `_LIBC_FORGE_PTR(P, S)` | `__unsafe_forge_bidi_indexable(__typeof__(*P) *, P, S)` |

## `alloc_size` implies `__sized_by_or_null`

The `alloc_size` attribute automatically implies `__sized_by_or_null` on the return type. E.g.:

```c
void* /*__sized_by_or_null(size)*/ my_malloc(size_t size) __attribute__((alloc_size(1)));
void* /*__sized_by_or_null(size*count)*/ my_calloc(size_t count, size_t size) __attribute__((alloc_size(1,2)));
```

## Glossary

| Term | Definition |
|---|---|
| auto bound | Variables with bounds annotation automatically inferred (e.g., local variables are implicitly `__bidi_indexable`) |
| dependent variable | When using externally counted pointers (e.g., `__counted_by`), the pointer and the count form a pair. Modifying one requires modifying the other. |
| wide pointer | A pointer with internal bounds (`__bidi_indexable` or `__indexable`), larger than a regular C pointer |
| hard trap | Default `-fbounds-safety` behavior — program terminates on bounds violation |
| soft trap | Alternative mode — violation is logged but execution continues |

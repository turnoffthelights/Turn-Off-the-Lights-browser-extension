# Common Patterns and Pitfalls

This document covers common patterns for working with `-fbounds-safety` and pitfalls encountered during real-world adoption.

## Common Patterns

### Using Local Variables to Avoid Assignment Restrictions

When the compiler requires pointer and count to be assigned together (the "dependent variable" rule), introduce local variables:

```c
// This causes an error — buf and count must be assigned together:
void fill(int *__counted_by(count) buf, size_t count) {
    while (count-- > 0) {
        *buf = count;
        buf++;  // error: assignment to 'buf' requires corresponding assignment to 'count'
    }
}

// Fix: copy to local variables (implicitly __bidi_indexable):
void fill(int *__counted_by(countOrig) bufOrig, size_t countOrig) {
    int *buf = bufOrig;
    size_t count = countOrig;
    while (count-- > 0) {
        *buf = count;
        buf++;  // OK — buf is __bidi_indexable, no external bounds to maintain
    }
}
```

### Data Organization: Prefer Rows Over Columns

When a struct contains pointer fields, prefer "row" organization (array of structs) over "column" organization (struct of arrays):

```c
// Row organization (recommended) — flat pointers, easy to annotate:
struct gpio_config {
    uint32_t cfg;
    uint32_t *__counted_by(intStatusCount) intStatus;
    uint32_t intStatusCount;
};
struct gpio_config configs[N];

// Column organization (problematic) — nested pointers, hard to annotate:
uint32_t **intStatusArray;  // cannot express __counted_by for inner pointers
```

### Rewriting Internal APIs

When an internal function's signature has pointers that cannot be made safe using ABI-compatible bounds annotations (like `__counted_by` or `__sized_by`), the ABI-incompatible `__bidi_indexable` can be used to propagate bounds because the ABI doesn't need to be preserved. This is much preferable to using `__unsafe_indexable`.

In this example, an internal function originally had an out-parameter with no bounds information. By using `__bidi_indexable`, bounds from the internal fixed-size buffer propagate to callers:

```c
// Before: no bounds on out-parameter
static int GetExtNext(Handle *H, uint8_t **Out);

// After: __bidi_indexable propagates bounds from internal buffer
static int GetExtNext(Handle *H, uint8_t *__bidi_indexable *Out) {
    ...
    // H->Buf is a fixed-size array (e.g., uint8_t Buf[256]).
    // Assigning it through a __bidi_indexable * out-parameter
    // gives the compiler array bounds automatically — no forge needed.
    *Out = H->Buf;
    ...
}
```

### Using `__bidi_indexable` / `__indexable` in a Source File That Must Compile Without `-fbounds-safety`

**Before reaching for this pattern, prune.** Check each `__bidi_indexable` / `__indexable` against [Redundant `__bidi_indexable` / `__indexable` Annotations](#redundant-__bidi_indexable--__indexable-annotations) below. Locals already default to `__bidi_indexable`, and casts on expressions that are already (or can implicitly become) `__bidi_indexable` don't need the annotation. If pruning leaves no remaining uses in this file, you don't need this pattern at all.

**When this pattern applies (after pruning).** A `.c` file *still* uses `__bidi_indexable` (or `__indexable`) by name — on internal helper signatures, on local variable declarations where the annotation is load-bearing, or inside cast expressions where the annotation is load-bearing — and must also compile cleanly with `-fbounds-safety` off (e.g. for the two-commit-dance source-changes commit in [adoption-strategies.md](adoption-strategies.md)).

**Pattern.** At the top of the `.c` file, after `#include <ptrcheck.h>`:

```c
#if !__has_ptrcheck
/* ptrcheck.h leaves these undefined when -fbounds-safety is off to force
 * compile errors on ABI-breaking uses in headers. In this .c file the
 * annotations only appear on static helpers (no ABI surface), so it is
 * safe to define them as no-ops here. */
#define __bidi_indexable
#define __indexable
#endif
```

**Constraints:**

- **Never put this in a header file.** Headers are shared across translation units; silently no-op'ing an ABI-breaking attribute risks an ABI mismatch between a header that defines the fallback and a TU that doesn't.
- **Only when the annotated declarations are not ABI-visible.** Static helpers and local variables are fine; an `extern` function in this `.c` file whose signature includes `__bidi_indexable` is not — its declaration in another TU would see a different ABI.
- **Do not also add `#if __has_ptrcheck` guards around forge/conversion intrinsic call sites.** Those have fallbacks in `ptrcheck.h` (see [Unnecessary `#if __has_ptrcheck` Guards](#unnecessary-if-__has_ptrcheck-guards) below).

### Constant Bounds on Externally-Counted Pointers

Examples below use `__counted_by(N)` for concreteness; the same reasoning applies to every externally-counted pointer kind: `__counted_by`, `__counted_by_or_null`, `__sized_by`, `__sized_by_or_null`, `__ended_by`.

**Cardinal rule: derive `N` from what the function body alone provably accesses, including fixed offsets, fixed-size operations, bounds flowing through annotated callees, and the static type of an index variable the body doesn't narrow further. Not from caller data, allocation patterns, or format/protocol spec invariants the body doesn't enforce.**

A constant `N` is correct only if the function body provably accesses at most `N` elements/bytes for every input — counting direct accesses, sequences, fixed-size operations (e.g. `memcpy(dst, src, 4)`), and bounds flowing through annotated callees. Specifically, `N` must **not** come from:

- **Runtime contents of the input.** Example: `f(const Header *H, T *buf)` reads `buf[H->indices[k]]`; the reachable bound on `buf` depends on what values are in `H->indices` at runtime — pure data, not contract.
- **A size/count attached to the input that the count-expression grammar can't reference directly.** Tempting when the real bound (e.g. `P->capacity`) is rejected by the grammar (see [Count Expression Grammar](language-overview.md#out-and-in-out-parameters-with-__counted_by)); substituting a constant ceiling is not a fix.
- **Format/protocol invariants about valid inputs.** Reasoning "the spec caps it at `N`, so use `N`" ties the API to the format definition, not to what the function actually accesses.
- **Allocation patterns of any particular caller.** Example: an in-tree caller declares `T buf[256]` on its stack and passes it in; reflecting that 256 into the public API encodes one caller's choice as if it were a contract.

**Honest examples** — functions whose body unconditionally accesses a fixed set of indices/offsets, the same for every input:

- Writing the four bytes of a fixed-length protocol header by assigning `header[0]..header[3]` → `__counted_by(4)`.
- Always calling `memcpy(dst, src, 16)` against a fixed-layout block → `__sized_by(16)`.

**Audit procedure** before writing any constant `N`:

1. Open the function body; identify the highest index/byte offset the function can reach, across all paths and inputs.
2. Complete: "the function genuinely accesses up to `<constant>` elements/bytes because ___". If the answer is the body's own behaviour — including the static type of an index the body doesn't narrow — the constant is fine. If it lands in any of the four categories above, the constant is wrong — go to the remedy below.

**Remedy when the audit fires.** Branch on visibility:

- **Public API** (declared in a published header / consumed by external clients): apply [Safe Wrappers for Public APIs](#safe-wrappers-for-public-apis) — the public function becomes a thin shim with its pointer parameter re-annotated `__unsafe_indexable`, delegating to a new `*Safe` variant that takes an explicit count.
- **Internal** (`static`, or declared only in private headers): use ABI-incompatible annotations directly — see [Rewriting Internal APIs](#rewriting-internal-apis). `__bidi_indexable` propagates bounds from the caller with no count parameter; alternatively, add an explicit count and use dynamic `__counted_by(count)` / `__sized_by(count)`.

**Anti-pattern walkthrough.** A function `void apply_lookup(const Header *H, const T lookup[])` declared in a public header, where the format spec restricts `H->indices[k]` to `[0, 16)`. Wrong adoption: `lookup[__counted_by(16)]`, reasoned from "the spec caps the index at 16." Audit step 2: "the function genuinely accesses up to 16 elements because the spec says so" — that's the format/protocol-invariants category, not the body's own behaviour (the body indexes via `uint8_t` and never narrows; if a corrupted `H->indices[k]` produced 17, the body would read `lookup[17]`). Audit fires; visibility = public → Safe Wrapper. The `*Safe(H, lookup, len)` variant lets the caller declare the actual table length, and `-fbounds-safety` then traps when the runtime index exceeds it — catching data corruption at the indexing site. Had this function been declared `static`, the internal remedy would apply instead.

### Safe Wrappers for Public APIs

This pattern applies to **public APIs** (declared in shipped headers, consumed by external clients, ABI must be preserved). For internal-only signatures, [Rewriting Internal APIs](#rewriting-internal-apis) above is the simpler remedy. Use Safe Wrapper for a public function when any of these apply:

- The natural bound is a struct field of another parameter (`->` and `.` are rejected in count expressions; see [Count Expression Grammar](language-overview.md#out-and-in-out-parameters-with-__counted_by))
- The natural bound requires arithmetic on a dereferenced pointer (e.g. `*count + 1`, also rejected)
- The natural bound requires calling a function that isn't marked `__attribute__((const))` — only const-attributed functions are accepted in count expressions, so anything with side effects or hidden state (e.g. a non-const `strlen`-style helper) can't be referenced
- The natural bound is a function-local quantity not present in the existing public signature
- A constant `__counted_by(N)` *appears* to fit but the actual access is bounded by a dynamic quantity — see [Constant Bounds on Externally-Counted Pointers](#constant-bounds-on-externally-counted-pointers) above
- `__unsafe_indexable` is otherwise the only option

Create a bounds-safe internal implementation and reduce the public function to a thin shim:

1. Move all implementation logic into a new internal safe function
2. The original public function becomes a thin shim that delegates to the safe version
3. Internal callers call the safe function directly — never the legacy shim. *(Skip in header-only adoption — see [§3 Safe Wrapper retrofits](adoption-strategies.md#3-safe-wrapper-retrofits-if-any-captured) for why.)*
4. Mark the legacy function's **declaration** with `__ptrcheck_unavailable_r(safe_function_name)` — this makes it unavailable in `-fbounds-safety` builds while keeping it available for non-adopted callers. The attribute only needs to be on the declaration, not the definition.

**Example:**

```c
// Header — mark legacy API unavailable in -fbounds-safety builds
__ptrcheck_unavailable_r(UnionSafe)
Result *Union(const Map *A, const Map *B,
              Pixel *__unsafe_indexable trans);

// Public safe version with explicit count
Result *UnionSafe(const Map *A, const Map *B,
                  Pixel *__counted_by(transLen) trans, int transLen) {
    // full implementation here
}

// Legacy wrapper — forges and delegates
Result *Union(const Map *A, const Map *B,
              Pixel *__unsafe_indexable trans) {
    Pixel *safe = __unsafe_forge_bidi_indexable(
        Pixel *, trans, B->Count * sizeof(Pixel));
    return UnionSafe(A, B, safe, B->Count);
}
```

Internal callers use the safe version directly, never the legacy wrapper:

```c
void MergeColorMaps(const Map *A, const Map *B,
                    Pixel *__counted_by(B->Count) trans) {
    // Calls UnionSafe directly — not Union
    Result *merged = UnionSafe(A, B, trans, B->Count);
    ...
}
```

**Header-only variant.** When the Safe Wrapper is being applied as part of *header-only* adoption (see [§3 Safe Wrapper retrofits](adoption-strategies.md#3-safe-wrapper-retrofits-if-any-captured)), the implementation file is **not** compiled with `-fbounds-safety`. Three adjustments to the shape above:

- **Drop the forge in the legacy shim.** With the flag off in the impl, `__unsafe_indexable` and `__counted_by(...)` are both just plain pointers — passing the legacy parameter directly to the `*Safe` variant compiles cleanly. Add a forge **only** if the file is later switched to full adoption.
- **Keep the annotations on the Safe variant's *definition*** so it matches the header declaration verbatim. Per [language-overview.md](language-overview.md) `ptrcheck.h` expands the annotations to empty when the flag is off, so they are inert at the impl's compile site — but they are required for redeclaration consistency and they keep the signature ready for full adoption later.
- **Ensure `<ptrcheck.h>` is reachable in the implementation file.** The annotation macros (`__counted_by`, `__counted_by_or_null`, etc.) come from `ptrcheck.h`; without it the macros are undefined and the file won't compile even with `-fbounds-safety` off. Typically the impl already includes the public header you just annotated (which itself includes `ptrcheck.h`), so this is automatic — but if the impl gets its types from a private header that doesn't transitively pull in `ptrcheck.h`, add `#include <ptrcheck.h>` directly.

Concretely, the legacy shim from the example becomes:

```c
// Legacy wrapper — header-only mode, no forge
Result *Union(const Map *A, const Map *B,
              Pixel *__unsafe_indexable trans) {
    return UnionSafe(A, B, trans, B->Count);
}
```

The `UnionSafe` definition is unchanged from the full-adoption example.

- No `__unsafe_forge_*` calls should be needed to satisfy the safe function's parameter and return types — the forge belongs in the legacy wrapper, not at internal call sites
- Internal code must **never** call the legacy wrapper — always call the safe version directly
- The legacy wrapper exists purely for API/ABI backwards compatibility
- Forward-declare safe functions as `static` only if needed for ordering (e.g., mutual recursion between related safe functions)

**Coordinating with the adoption workflow.** If you decide on a Safe Wrapper *during* the headers-first phase (Phase 1 in [adoption-strategies.md](adoption-strategies.md#1-headers-first)), do not retrofit it inline — Phase 1 is source-file-free, and the retrofit is intrinsically cross-file. Instead, create a per-item `Add Safe Wrapper for <funcName>` task per the [Capturing deferred Safe Wrapper retrofits](adoption-strategies.md#capturing-deferred-safe-wrapper-retrofits) sub-heading. Execution lands at different points depending on the adoption mode:

- **Full adoption**: at [Step 5.1 Safe Wrapper retrofits](adoption-strategies.md#51-safe-wrapper-retrofits), after the project switches to target-level `ENABLE_C_BOUNDS_SAFETY`. The `5.1 Commit Safe Wrapper batch` umbrella task is the single commit point. Under partial-target adoption (some file skipped per [Skipping a file's enablement](adoption-strategies.md#skipping-a-files-enablement)), Step 4 is bypassed and Safe Wrappers still apply at §5.1 — see §5.1's verify-step caveat for what changes.
- **Header-only adoption**: at [§3 Safe Wrapper retrofits (if any captured)](adoption-strategies.md#3-safe-wrapper-retrofits-if-any-captured), gated on a user opt-in stop. On approval, the per-items are applied with the "switch internal callers" step skipped — header-only deliberately leaves implementation call sites untouched. The `3b. Commit Safe Wrapper batch` umbrella is the single commit point.

### Calling Non-Adopted Libraries

ABI-visible pointers in SDK/system headers are `__unsafe_indexable` by default. When consuming return values or struct fields from these libraries:

- Passing data in: all pointers implicitly convert to `__unsafe_indexable` — no issues
- Getting data out: use `__unsafe_forge_bidi_indexable` or `__unsafe_forge_single` to create safe pointers

```c
// stdin from stdio.h is __unsafe_indexable in system headers:
FILE *f = __unsafe_forge_single(FILE *, stdin);
```

Include external/third-party headers as system headers to prevent compilation errors (they'll default to `__unsafe_indexable`).

### String Variables and `__null_terminated`

#### Choosing between `__null_terminated` and `__bidi_indexable`

When a variable is used primarily as a C string — passed to string functions like `strlen`, `strtok`, `strcpy`, or iterated with `++p` — consider declaring it as `__null_terminated`. This lets the variable work directly with string functions without conversion at each use site.

Apple's Libc string functions (`strlen`, `strtok`, `strchr`, etc.) accept and return `__null_terminated` pointers. Declaring a string variable as `__null_terminated` lets you use these functions directly and avoids repeated `__null_terminated` to/from `__bidi_indexable` conversions, which each require a linear scan of the string to find the terminator:

```c
const char *__null_terminated cp;
cp = strtok(buf, "\n");  // strtok returns __null_terminated
strlen(cp);               // no conversion needed
strcpy(dst, cp);          // no conversion needed
```

If a non-adopted function returns a pointer you know is null-terminated but the return type is not annotated, use `__unsafe_forge_null_terminated` to establish the annotation once at the assignment rather than converting at every downstream use.

**When NOT to use `__null_terminated`:** If the code needs pointer arithmetic beyond `+1` (e.g., `p += n`, `p[i]` with arbitrary `i`), use `__bidi_indexable` instead. `__null_terminated` only supports `+0` and `+1` arithmetic.

**When you need both:** If a string needs both random-access indexing AND string API calls, keep two pointers to the same data — one `__null_terminated` for string APIs, one `__bidi_indexable` (via `__null_terminated_to_indexable`) for indexing. They must be manually kept in sync if either is advanced:

```c
void process(const char *__null_terminated input) {
    const char *__null_terminated nt_ptr = input;
    const char *idx_ptr = __null_terminated_to_indexable(input);

    size_t len = strlen(nt_ptr);

    // Random access via indexable pointer
    for (size_t i = 0; i < len; i++) {
        if (idx_ptr[i] == ':')
            printf("colon at offset %zu\n", i);
    }

    // String API via null-terminated pointer
    const char *__null_terminated found = strchr(nt_ptr, ':');
    if (found)
        printf("found: %s\n", found);
}
```

#### Converting to `__null_terminated` cheaply

When converting from `__bidi_indexable` back to `__null_terminated`, `__unsafe_null_terminated_from_indexable(P)` must scan the string to find the terminator (O(n)). If you already know where the terminator is, pass it as a second argument for an O(1) conversion:

```c
char *buf = (char *)malloc(len + 1);
memcpy(buf, src, len);
buf[len] = '\0';

// O(n): scans buf to find the terminator
return __unsafe_null_terminated_from_indexable(buf);

// O(1): we know the terminator is at buf[len]
return __unsafe_null_terminated_from_indexable(buf, &buf[len]);
```

### Choosing Between `__indexable` and `__bidi_indexable`

- `__indexable` is 2 register words — passed by register, lower overhead
- `__bidi_indexable` is 3 register words — passed by stack copy, higher overhead
- Conversions between them are implicit

**Guidance:**
- For function arguments/returns that must use wide pointers, prefer `__indexable`
- Within functions, use the default `__bidi_indexable` — no performance penalty for local use
- Don't use `__indexable` as a security measure; `__bidi_indexable` already prevents out-of-bounds below the lower bound
- When possible, prefer external bounds annotations (`__counted_by`, etc.) over either wide pointer type

## Common Pitfalls

These are common issues encountered during real-world adoption, along with recommended solutions.

### Casting to a Larger Struct Type Traps at Runtime

**Problem:** Casting a pointer to a struct type that is larger than the pointed-to memory will trap when any field is accessed via `->`, even if the specific field being accessed is within bounds.

```c
struct element_t {
    uint8_t id;
    uint8_t len;
    uint8_t data[10]; // sizeof(element_t) == 12
};

uint8_t buffer[8];
struct element_t *cast_buffer = (struct element_t *)buffer;
cast_buffer->id; // TRAPS — even though id is at offset 0
```

**Why:** When accessing a struct field via `->`, `-fbounds-safety` checks that the *entire* struct is within bounds, not just the field being accessed. This prevents intra-object overflow and avoids undefined behavior.

**Fix:** Use a smaller header struct that fits within the actual buffer size, or parse by reading fields individually rather than casting the buffer:

```c
struct header {
    uint8_t id;
    uint8_t len;
};

struct header *hdr = (struct header *)buffer;
if (hdr->id == EXPECTED_TYPE) {
    // Now safe to access more data knowing the type
}
```

### Casting Between `__single` Pointers Can Widen Bounds

**Problem:** Casting between `__single` pointers of different struct types can silently increase the assumed bounds, because `__single` assumes one valid element of the *destination* type.

```c
struct small { int a; };           // 4 bytes
struct large { int a; int b; };    // 8 bytes

struct small s = {0};
struct small *__single r = &s;
struct large *__single q = (struct large *)r;
q->b; // NO trap — but accesses memory beyond 's'!
```

**Why:** A `__single` pointer assumes it points to one valid element of its type. Casting to a larger type changes that assumption. This differs from `__bidi_indexable`, which preserves the original bounds and would trap.

**Fix:** Be careful with `__single` pointer casts between types of different sizes. If you need the bounds-checked behavior, copy to a local variable (which becomes `__bidi_indexable`) before casting.

### Passing `__counted_by`/`__sized_by` Count to Non-Adopted Function

**Problem:** Passing the count variable of a `__counted_by`/`__sized_by` pair to a non-adopted function produces an error about unsynchronized dynamic count pointers.

```c
void do_work(void *__sized_by(*output_len) output, size_t *output_len) {
    // unannotated_func is not annotated with -fbounds-safety
    unannotated_func(output, output_len);
    // error: passing 'output_len' referred to by '__sized_by' to a parameter
    // that is not referred to by the same attribute
}
```

The signature shape above — `*__sized_by(*output_len) output, size_t *output_len` — is the fill-in-place in-out pattern covered in [language-overview.md](language-overview.md#out-and-in-out-parameters-with-__counted_by).

**Why:** `-fbounds-safety` cannot guarantee the non-adopted function won't modify `*output_len` in a way that desynchronizes it from the pointer's actual bounds.

**Fix:** Use a local copy of the count variable:

```c
void do_work(void *__sized_by(*output_len) output, size_t *output_len) {
    size_t local_len = *output_len;
    unannotated_func(output, &local_len);
    *output_len = local_len;
}
```

### Slicing a `__bidi_indexable` Buffer

**Problem:** You have a `__bidi_indexable` pointer and need to create a sub-range (a slice) with tighter bounds.

**Fix:** Assign the pointer through a function parameter with `__sized_by` or `__counted_by` to create new bounds:

```c
void *__bidi_indexable slice(void *__sized_by(n) p, size_t n) {
    return p;
}

// Usage:
void *__bidi_indexable full_buffer = ...;
void *__bidi_indexable sub = slice((char *)full_buffer + offset, length);
```

### Annotating Malloc-Like Functions

**Problem:** Custom allocation functions need bounds annotations on their return value.

**Fix:** Use `__sized_by_or_null` on the return type (since allocation can fail and return NULL):

```c
uint8_t *__sized_by_or_null(size) _Nullable
my_allocate(size_t size);
```

If the function has the `alloc_size` attribute, `-fbounds-safety` may infer bounds automatically.

### Working with `__counted_by` Parameters

**Problem:** Pointer arithmetic or reassignment on `__counted_by` parameters requires keeping the pointer and count in sync, which is cumbersome.

**Fix:** Copy both the parameter and its count to local variables at the start of the function. The local pointer becomes `__bidi_indexable` and the local count is no longer a dependent variable:

```c
void process(int *__counted_by(count) buf_param, size_t count) {
    int *buf = buf_param; // buf is now __bidi_indexable
    size_t n = count;     // n is no longer tied to buf_param
    while (n-- > 0) {
        *buf = 0;
        buf++; // OK — no need to keep count in sync
    }
}
```

### Passing Arrays to `__counted_by` Parameters

**Problem:** Using `&array` instead of `array` when passing to a `__counted_by` parameter causes a type mismatch.

```c
uint32_t arr[10];
void process(uint32_t *__counted_by(size) data, size_t size);

process(&arr, 10);  // error: incompatible pointer types
process(arr, 10);   // OK — array decays to pointer
```

**Why:** `&arr` has type `uint32_t (*)[10]` (pointer to array), not `uint32_t *` (pointer to element). This is standard C behavior, not specific to `-fbounds-safety`.

**Fix:** Use `arr` directly (array-to-pointer decay) or `&arr[0]`.

### Unnecessary Forges on Allocator Returns

**Problem:** Using `__unsafe_forge_bidi_indexable` on the return value of `malloc`/`calloc`/`realloc` (or any allocator with `alloc_size`) when assigning to a `__counted_by` or `__sized_by` field.

```c
struct container {
    int count;
    Item *__counted_by(count) items;
};

// WRONG — forge is redundant
Item *new_items = (Item *)realloc(c->items, newCount * sizeof(Item));
c->count = newCount;
c->items = __unsafe_forge_bidi_indexable(
    Item *, new_items, (size_t)newCount * sizeof(Item));
```

**Why:** Allocators with `alloc_size` already return `__sized_by_or_null` pointers. Casting to a typed pointer gives a `__bidi_indexable` with correct bounds. The `__bidi_indexable` → `__counted_by(N)` assignment is implicit with a bounds check (per the conversion table). The forge re-derives bounds the compiler already knows.

**Fix:** Assign the allocator result directly:

```c
Item *new_items = (Item *)realloc(c->items, newCount * sizeof(Item));
c->count = newCount;
c->items = new_items;  // compiler inserts bounds check automatically
```

**Rule of thumb:** Only forge when the pointer source has no bounds information (e.g., `__unsafe_indexable` from a non-adopted API). Never forge a pointer from an annotated allocator — one with `alloc_size`, `__sized_by_or_null`, or similar return-type annotations. Standard library `malloc`/`calloc`/`realloc` have `alloc_size`; custom allocators only carry bounds if explicitly annotated.

### Unnecessary Forges on Constant-Sized Arrays

**Problem:** Using `__unsafe_forge_bidi_indexable` to "give bounds" to a constant-sized array `T arr[N]`. Example shape — a struct member accessed via `->`:

```c
struct Frame { uint8_t buf[256]; };

// WRONG — forge is redundant
void process(struct Frame *p) {
    uint8_t *view = __unsafe_forge_bidi_indexable(
        uint8_t *, p->buf, sizeof(p->buf));
    /* ... use view ... */
}
```

**Why:** Under `-fbounds-safety`, a constant-sized array decays to a `T *__counted_by(N)` pointer when used as a value. This is true for every source — function parameter, local, global, **and struct member** — so `p->buf` already carries the bounds `[&p->buf[0], &p->buf[N])`. Assigning to a `T *` local produces `__bidi_indexable` with those bounds; the forge re-derives them.

**Fix:** Drop the forge and assign directly:

```c
void process(struct Frame *p) {
    uint8_t *view = p->buf;  // __bidi_indexable with array bounds
}
```

The same rule applies to `T local[N]`, a global `T g_arr[N]`, and a parameter `void f(T arr[N])` (which decays to `T *__counted_by(N)` per [function-prototype array decay](language-overview.md#external-bounds-annotations)). See also [Deriving Bounds from Objects](language-overview.md#deriving-bounds-from-objects) and the [When NOT to Forge](language-overview.md#when-not-to-forge) checklist.

### Forging a `__single` Pointer Means the Source Is Misannotated

**Problem:** You find yourself writing `__unsafe_forge_bidi_indexable(T *, p, size)` (or another widening forge) where `p` is a `__single` pointer — either explicitly annotated `__single` or implicitly defaulted (ABI-visible struct fields and function parameters usually default to `__single`; see [Default Pointer Attributes](language-overview.md#default-pointer-attributes) for the `const char *` → `__null_terminated` exception). The forge papers over the underlying problem: the source annotation claims `p` points to one object, but the code's behaviour proves it points to a buffer. Two common shapes:

- **Struct field:** `T *field` (implicit `__single`) on a struct, where consumer code forges a bidi view from `field` using sibling-field arithmetic for the size.
- **Function parameter:** `T *p` (implicit `__single`) on a function, where the body forges a bidi view from `p` to read buffer contents — common shape: length-prefixed buffers where the first byte encodes the payload length.

**Fix:** Correct the source annotation; do not paper over with forges. Order of preference:

1. An externally counted bounds annotation if the bound is expressible in the count grammar — `__counted_by(<expr>)` / `__sized_by(<expr>)` / `__counted_by_or_null(<expr>)` / `__sized_by_or_null(<expr>)` / `__null_terminated`. (For struct fields, also consider the [FAM exception](language-overview.md#count-expression-restrictions); for public functions whose bound needs an extra parameter, consider [Safe Wrappers for Public APIs](#safe-wrappers-for-public-apis).)
2. If the bound exists but cannot be expressed (e.g. it's encoded in the buffer itself like a length-prefixed block, or it requires arithmetic on nested struct fields that the count grammar rejects), use **explicit `__unsafe_indexable`** on the source. The forge at use sites is then expressing real information about an honestly-unsafe pointer.

**Example — wrong (implicit `__single` + forge at use site, struct-field shape):**

```c
typedef struct Frame {
    Dimensions Dim;          /* contains Width, Height */
    uint8_t *Pixels;         /* implicit __single — wrong */
} Frame;

void process(Frame *f) {
    size_t n = (size_t)f->Dim.Width * f->Dim.Height;
    uint8_t *buf = __unsafe_forge_bidi_indexable(uint8_t *, f->Pixels, n);
    /* ... use buf ... */
}
```

**Right (explicit `__unsafe_indexable`, same forge at use site):**

```c
typedef struct Frame {
    Dimensions Dim;
    uint8_t *__unsafe_indexable Pixels;  /* bound = Dim.Width * Dim.Height; not expressible */
} Frame;

void process(Frame *f) {
    size_t n = (size_t)f->Dim.Width * f->Dim.Height;
    uint8_t *buf = __unsafe_forge_bidi_indexable(uint8_t *, f->Pixels, n);
    /* same forge, but now describing an honestly-unsafe pointer */
}
```

**Example — wrong (function-parameter shape, length-prefixed buffer):**

```c
/* Public API: CodeBlock[0] is the payload length in bytes. */
int put_block(File *f, const uint8_t *CodeBlock);   /* implicit __single — wrong */

int put_block(File *f, const uint8_t *CodeBlock) {
    const uint8_t *view = __unsafe_forge_bidi_indexable(
        const uint8_t *, CodeBlock, 256);
    uint8_t len = view[0];
    return write_bytes(f, view, len + 1);
}
```

**Right (apply [Safe Wrappers for Public APIs](#safe-wrappers-for-public-apis)):**

```c
// Header — legacy shim with __unsafe_indexable parameter, plus a new
// count-aware variant. See Safe Wrappers for Public APIs for the full
// 4-step pattern (including __ptrcheck_unavailable_r on the shim).
__ptrcheck_unavailable_r(put_block_safe)
int put_block(File *f, const uint8_t *__unsafe_indexable CodeBlock);

int put_block_safe(File *f, const uint8_t *__counted_by(len) CodeBlock,
                   size_t len);

// .c — implementation lives in the safe variant.
int put_block_safe(File *f, const uint8_t *__counted_by(len) CodeBlock,
                   size_t len) {
    return write_bytes(f, CodeBlock, len);
}

// .c — legacy shim reads the length prefix and delegates.
int put_block(File *f, const uint8_t *__unsafe_indexable CodeBlock) {
    size_t len = (size_t)CodeBlock[0] + 1;
    const uint8_t *safe = __unsafe_forge_bidi_indexable(
        const uint8_t *, CodeBlock, len);
    return put_block_safe(f, safe, len);
}
```

**Why it matters:** With the implicit `__single` version, any direct arithmetic or indexing on the source pointer would get a compile-time error ("arithmetic on `__single` pointer") — which forces callers to forge anyway — *but* the declared type still lies to anyone reading the header (and to any analysis tooling). The explicit `__unsafe_indexable` version produces the same compile-time discipline at consumers (they must forge to do arithmetic) while communicating accurate information about the data shape.

**Don't reach for `__unsafe_indexable` when the bound can be expressed in the count grammar.** Order is: an externally counted annotation (`__counted_by` / `__sized_by` / `__null_terminated`) when the bound fits the grammar → `__single` (truly single-object) → `__unsafe_indexable` (last resort). If the only block to expressing the bound is "the count is a sibling parameter you'd have to add to the signature", a Safe Wrapper is the right answer for a public function — see [Safe Wrappers for Public APIs](#safe-wrappers-for-public-apis).

### Unnecessary `#if __has_ptrcheck` Guards

**Problem:** It is tempting to wrap every bounds-safety-flavoured call site (`__unsafe_forge_bidi_indexable`, `__null_terminated_to_indexable`, `__unsafe_null_terminated_from_indexable`, etc.) in `#if __has_ptrcheck` / `#else` blocks "in case `-fbounds-safety` is off". This over-guards.

**Fix:** Don't guard. `ptrcheck.h` provides flag-off fallbacks for every forge intrinsic and conversion macro — they expand to plain C casts (`((T)(P))`) or pointer pass-throughs (`(P)`) when `-fbounds-safety` is off. Code using them compiles unguarded in both modes.

**Example — wrong:**

```c
#if __has_ptrcheck
uint8_t *buf = __unsafe_forge_bidi_indexable(uint8_t *, raw_ptr, size);
#else
uint8_t *buf = raw_ptr;
#endif
```

**Example — right:**

```c
uint8_t *buf = __unsafe_forge_bidi_indexable(uint8_t *, raw_ptr, size);
```

The forge expands to `((uint8_t *)raw_ptr)` when the flag is off, which is exactly what the `#else` branch was doing manually.

**The one exception.** Any textual occurrence of `__bidi_indexable` or `__indexable` in source — whether as an attribute on a declaration, on a function parameter, on a local variable, or inside a cast expression — *does* need either a `#if __has_ptrcheck` guard or the per-file fallback `#define` documented in [Using `__bidi_indexable` / `__indexable` in a Source File That Must Compile Without `-fbounds-safety`](#using-__bidi_indexable--__indexable-in-a-source-file-that-must-compile-without--fbounds-safety). The fallback `#define` approach scales better than per-site guards when there are many uses in one file.

### Redundant `__bidi_indexable` / `__indexable` Annotations

**Problem:** Writing `__bidi_indexable` (or `__indexable`) explicitly is redundant whenever the surrounding context already provides one. Two common shapes:

- On a local variable declaration whose initializer is already a `__bidi_indexable` — locals also default to `__bidi_indexable` (see [language-overview.md §Quick Reference](language-overview.md#quick-reference-pointer-kinds-and-bounds-annotations)), so the annotation is doubly redundant.
- In a cast on an expression that already evaluates to a `__bidi_indexable` (e.g. the result of `__unsafe_forge_bidi_indexable`) or that can be implicitly converted to one (e.g. a `__sized_by_or_null` return from an annotated allocator like `malloc`).

**Fix:** Drop the annotation.

**Examples — wrong:**

```c
const char *__bidi_indexable foo = NULL;
int *buf = (int *__bidi_indexable)__unsafe_forge_bidi_indexable(int *, raw, size);
int *buf2 = (int *__bidi_indexable)malloc(n * sizeof(int));
```

**Right:**

```c
const char *foo = NULL;
int *buf = __unsafe_forge_bidi_indexable(int *, raw, size);
int *buf2 = malloc(n * sizeof(int));
```

**Why it matters:** Beyond verbosity, each explicit `__bidi_indexable` you write forces the file to need either a `#if __has_ptrcheck` guard or a per-file fallback `#define` to build with the flag off (see [Using `__bidi_indexable` / `__indexable` in a Source File That Must Compile Without `-fbounds-safety`](#using-__bidi_indexable--__indexable-in-a-source-file-that-must-compile-without--fbounds-safety)) — costs you pay for no benefit, since the surrounding context already provides the same pointer kind.

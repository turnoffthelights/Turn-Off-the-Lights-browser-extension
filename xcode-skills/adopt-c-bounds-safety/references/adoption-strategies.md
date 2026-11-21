# Adoption Strategies for `-fbounds-safety`

This guide walks through the process of adopting `-fbounds-safety` in an existing C project.

`-fbounds-safety` maintains ABI compatibility, so you can adopt it without breaking clients that don't use it. Incremental adoption is supported — you can secure your code file by file over multiple releases.

> **Before asking the user anything or starting any planning, present the following message to them verbatim:**
>
> > Preparing to help you adopt -fbounds-safety, which is a C language extension that enforces bounds safety through compile-time and runtime checks.
> > 
> > 1. I'll ask some questions to identify the kind of adoption you want to do.
> > 2. I'll analyze your code and write a plan to perform the adoption.
> > 3. Once you confirm the plan, I'll perform the adoption in multiple steps, stopping at relevant points to give you a chance to review the changes before I commit them.

> **Always make a plan when applying this skill because changes are rarely trivial and the developer needs to understand the process**

## Prerequisites

### Code is under a version control system (VCS)

Adoption commits at multiple checkpoints, so the project must be under a VCS this skill can drive and the working tree must be clean. Before asking the user any question or analyzing code, detect the VCS (without asking the user — if multiple, take the innermost relative to the project root) and run its status command.

Once detected, record the VCS name and the concrete commands you will use for:

- status
- diff
- staging by explicit path
- commit
- discarding a file's uncommitted working-tree changes

Use those captured commands for every VCS operation in the rest of this skill — do not switch VCSes mid-run, and do not assume git unless git is what you detected.

If no usable VCS is found, present the **No-VCS refusal** below and stop. If the working tree is not clean, present the **Dirty-tree refusal** below, including the status output, and stop. On user-reported remediation, re-run the checks before continuing.

**No-VCS refusal:**

> > `-fbounds-safety` adoption commits at multiple review checkpoints, so without version control I cannot checkpoint stages, revert a bad enablement, or keep your edits separate from mine at review stops.
> >
> > Please initialize a repository (or move to a directory already under version control) and tell me when to retry.

**Dirty-tree refusal:**

> > The working tree has uncommitted changes. Adoption commits at multiple review checkpoints, and pre-existing changes would get bundled into those commits and tangle prior work with adoption edits.
> >
> > Please commit, set aside, or discard the existing changes, then tell me when to retry. The current status output is below.

### Build system source of truth (when running under Xcode)

If you have been told you are running under Xcode, use the project's `.xcworkspace` (preferred) or `.xcodeproj` as the single source of truth for all build-related queries and operations — ignore every other build-system or project-generator artifact regardless of kind (e.g., `Makefile`). Search the VCS-tracked tree (rooted at the VCS root detected above) and take the shallowest match; if more than one candidate exists at the same depth, ask the user which to use. When a `.xcworkspace` is present, treat it as the entry point and resolve the relevant `.xcodeproj` from its `contents.xcworkspacedata` — if the workspace references multiple projects, ask the user which one to adopt. Do not switch build systems mid-run.

Once resolved, record the workspace path (if any), the `.xcodeproj` path, the `xcodebuild` invocation form (workspace+scheme or project+target), and the per-file `-fbounds-safety` attachment mechanism — reuse these throughout the rest of the skill rather than re-deriving them.

For build-system queries and operations against the resolved project, prefer the Xcode MCP tools; fall back to other methods (e.g., reading `project.pbxproj`, running `xcodebuild`) only when those tools are insufficient.

If the resolved `.xcodeproj` is produced by a generator script (e.g., a top-level `generate_xcodeproj.py`, xcodegen, Tuist), warn the user up front that per-file `-fbounds-safety` flags this skill writes into the `.xcodeproj` will be silently clobbered on the next regeneration — they must either stop regenerating or migrate the flag wiring into the generator's input.

If no `.xcworkspace` or `.xcodeproj` exists anywhere in the VCS-tracked tree, present the **No-Xcode-project refusal** below and stop.

**No-Xcode-project refusal:**

> > I'm running under Xcode but can't find a `.xcworkspace` or `.xcodeproj` in this project. Please tell me which build system to treat as source of truth.

If the user names SwiftPM (`Package.swift`) as the source of truth, decline: SwiftPM does not expose per-file C build flags, which `-fbounds-safety` adoption requires. Ask them to name a different build system.

If the user names any other build system (e.g., `Makefile`), confirm it supports per-file C flag attachment and record the concrete mechanism (e.g., per-file `CFLAGS`) for use in place of Xcode-specific flag wiring throughout the rest of this skill. If it does not support per-file C flag attachment, decline as with SwiftPM and ask them to name a different build system.

## Choosing an Adoption Approach

> **Before advising on adoption, ask the user whether they want full adoption or header-only adoption, then provide guidance for the chosen approach.**

There are two approaches to adopting `-fbounds-safety`:

- **Full adoption**: Annotate headers AND enable `-fbounds-safety` in implementation files. Provides complete bounds safety enforcement — the compiler inserts runtime bounds checks in your code and rejects unsafe operations at compile time.

- **Header-only adoption**: Only annotate public headers. The implementation remains unchanged and is not compiled with `-fbounds-safety`. Lightweight alternative that benefits clients adopting `-fbounds-safety` without any runtime cost or code changes to your library's implementation. If there are no headers do not suggest this approach.

## Full Adoption

### Typical source code changes

Enabling `-fbounds-safety` implicitly adds bound annotations (e.g. `__single`) on pointer/array type declarations. Each bound annotation has different restrictions on how they can be used and these restrictions are enforced by a mixture of compile time and runtime checks. The compile time checks appear as compiler diagnostics. All errors will need to be fixed and warnings should be addressed if possible. Fixing these diagnostics typically is a mixture of

#### 1. Explicitly using different bounds attributes from the ones that are implicitly added.

In many cases, adoption involves annotating pointers passed as parameters or stored in structures:

```c
// BEFORE
void take_elements(const element_t *elements, size_t count);

// AFTER
void take_elements(const element_t *__counted_by(count) elements, size_t count);
```

Avoid ABI-incompatible annotations (`__indexable` or `__bidi_indexable`) on consumer-facing APIs. Also avoid use of `__unsafe_indexable` which is unsafe
and defeats the purpose of using `-fbounds-safety` in the first place.

Knowing which attributes to use typically requires looking at how the type is used. For example if annotating a function, looking at use sites and the implementation of that function may provide clues on what the bounds are and thus the appropriate annotation to add to that function

#### 2. Adapting implementation code to work with the compile time restrictions added by using bounds attributes.

e.g.:

```c
// BEFORE
int find_zero(int *__counted_by(count) elements, size_t count) {
    int idx = -1;
    while (idx < count && *elements != 0) {
        // error: assignment to 'int *__single __counted_by(count)' 'elements' requires corresponding assignment to 'count'
        ++elements;
        ++idx;
    }
    return idx;
}

// AFTER
int find_zero(int *__counted_by(count) elements, size_t count) {
    int idx = -1;
    size_t original_count = count;
    while (idx < original_count && *elements != 0) {
        ++elements;
        --count;
        ++idx;
    }
    return idx;
}
```

#### 3. Propagating bounds annotation choices

As bounds annotations on API surfaces are changed this potentially impacts all use sites of them leading to different compiler diagnostics. This requires an iterative process of changing annotations, recompiling, looking at the diagnostics and deciding what to fix, fixing, and repeating until the source file can be compiled without errors.

#### 4. Refactoring code such that the use of unsafe constructs happens as few places as possible.

When a project adopting `-fbounds-safety` needs to interact with code that hasn't adopted `-fbounds-safety` typically that means ingesting `__unsafe_indexable` pointers. Ideally we do not want to propagate that `__unsafe_indexable` pointer through out the codebase. Instead there should be a centralized place(s) where `__unsafe_indexable` pointers are consumed and then forged into a safe pointer type (i.e. `__unsafe_forge_bidi_indexable`) which is then propagated through the codebase. That way the majority of the project works with safe pointer types and the sources of unsafe pointers is very small and easier to audit.

### Adoption strategy

#### Tracking adoption progress

Adoption has many sub-steps across many files. Use `TaskCreate` at three moments so no sub-step is forgotten while keeping the active task list focused.

**Moment A — before any file is modified.** Create one task for:

- `Confirm approach with the user` (full vs header-only)
- `Confirm how to run tests with the user` (full adoption only — capture how to run the tests (e.g. shell command, unit tests, etc.). If the user declines tests at this point, follow the explicit-confirmation procedure in §3 now rather than deferring it to §3 entry, so the no-tests decision is made deliberately at the earliest opportunity.)
- Each top-level step below: 0, 1, 2, 4 (full adoption only), 5.1 (umbrella checkpoint only — full adoption only — see note below), 6 (full adoption only)
- A trigger task `Create per-file adoption tasks` — its body creates Moment B's tasks once the adoption order is known. It must exist so per-file task creation isn't forgotten.

Step 5.x umbrella checkpoint tasks are placeholders at adoption start; they apply only to full adoption (header-only adoption has its own [§3 Safe Wrapper retrofits](#3-safe-wrapper-retrofits-if-any-captured) but does not reach full adoption's §3 onwards). Per-item tasks accumulate underneath each umbrella as earlier phases (e.g. Phase 1) make decisions; their `addBlocks` wires them to the corresponding umbrella, which is itself wired into the per-file → 4 → 5.x → 6 chain (see Moment B).

**Moment B — body of the `Create per-file adoption tasks` task, run immediately after step 0 completes.** For every implementation file in adoption order that does not already have a per-file task, create one named `Adopt -fbounds-safety in <file>`. (The §3 [Skipping a file's enablement](#skipping-a-files-enablement) procedure already creates a per-file task for any file flagged upfront for skip; don't re-create those.) All file-level tasks must be created at once so the full adoption scope is visible, but sub-tasks are deferred to Moment C — this keeps the pending-task list short and lets sub-step applicability be decided per file at execution time.

After creating every file-level task, wire the dependency chain `files → 4 → each 5.x umbrella → 6` by calling `TaskUpdate` with the appropriate `addBlockedBy`:

- The step 4 target-level task gets `addBlockedBy` listing every file-level task (so target-level enablement waits for all per-file adoption).
- Each step 5.x umbrella checkpoint task gets `addBlockedBy [<step 4 task ID>]` (so post-target refinements wait for target-level enablement).
- The step 6 completion-milestone task gets `addBlockedBy` listing every step 5.x umbrella (so the milestone surfaces only after the post-target batches land).

If any file is later skipped via §3 [Skipping a file's enablement](#skipping-a-files-enablement), no rewiring is needed; §5 and subsequent tasks unblock automatically.

**Moment C — first action when picking up any `Adopt -fbounds-safety in <file>` task.** Before modifying the file, `TaskCreate` sub-tasks for it mirroring sub-steps 3.1, 3.2, 3.3 (omit if the user did not provide a way to run the tests), 3.4, 3.5a, 3.5b. Only mark the file-level task `in_progress` after its sub-tasks exist.

**Rules for marking tasks complete:**

- Only mark a task `completed` when that specific sub-step is done.
- A file-level task is complete only when all 6 of its sub-tasks are complete.
- If a sub-task legitimately does not apply (e.g. the file has no runtime tests to exercise it), mark it complete with a one-line note explaining why. Do not skip silently.

#### Commit hygiene at review stops

Every commit during adoption is preceded by a stop-and-review step. During that stop the user is explicitly invited to inspect and modify the changes. **Their edits must end up in a commit — they must not be silently left in the working tree or dropped.** Follow this procedure at every commit point in this guide:

1. Before staging anything, list **all** working-tree changes and inspect their diff using the captured VCS commands (e.g. `git status` + `git diff HEAD`) to enumerate them. This includes both Claude's edits and any further edits the user made while the stop was open. Do not assume the working tree contains only what Claude wrote.
2. Classify each modified or new file as **source-code** (`.c`, `.h`, validation files) or **build-system** (Xcode `project.pbxproj`, CMakeLists, Makefiles, any per-file flag entry).
3. Check the result against the commit's declared scope (stated at each commit site below — e.g. "source-code only", "build-system only", or "headers + validation file"):
    - If every changed file fits the scope, stage exactly those files (Claude's + user's) by explicit path and commit using the captured VCS commands.
    - If the user's edits span kinds that don't all fit the scope — for example, source-code edits appearing during a build-system-only commit — **stop and ask the user** how to split them: which go into the current commit, which should be deferred to the next one, and which (if any) should be dropped. Apply their answer, then commit.
4. Always specify explicit paths when staging or committing — never let unrelated working-tree changes (e.g. `.DS_Store`, scratch files) get picked up. On git, this rules out `git add -A`, `git add .`, `git commit -a`, and any flag or shorthand that auto-includes modified files.
5. Do not propose folding user edits into a previously-made commit (e.g. `git commit --amend`) unless the user explicitly asks for it.

This procedure is referenced from §2, §3 step 5a, §3 step 5b, and §5.x's verify-stop-and-commit body below.

#### 0. Code Research

##### Order of adoption

> If the user has not stated in which target they want to do adoption and it cannot be inferred ask them to clarify which target.

Once the target is known if it contains more than one `.c` source file we need to decide the order implementation files will adopt -fbounds-safety. Some analysis of the code can guide this

> use a sub-agent to do this analysis and return an ordered list of implementation files

- Computing a callgraph for functions in public headers can be used to guide implementation file order. Typically source files that implement public functions should adopt -fbounds-safety first as they may provide bounds information that needs to be propagated throughout the code base. Traversing the call graph starting at the roots can guide implementation file order as each node has an implementation file associated with it. If we have a -> b, and a and b are implemented in different source files then this is a hint that the implementation file a should adopt -fbounds-safety before b.
- The same as above can be done for private headers

If the user already knows a particular `.c` file is unadoptable in this pass (e.g. a known compiler crash, or they want to defer it), invoke the §3 [Skipping a file's enablement](#skipping-a-files-enablement) procedure the moment the user declares the skip.

> Reminder: when running under Xcode the `.xcodeproj` is the source of truth for all build-system queries and operations — see [Build system source of truth](#build-system-source-of-truth-when-running-under-xcode).

#### 1. Headers First

> **Before doing this step, re-read `language-overview.md` and `common-patterns-and-pitfalls.md` in full via the Read tool.**

Annotate public headers with bounds annotations on function parameters, return types, struct fields, and globals. Adding `-fbounds-safety` annotations to a header signals that the header has adopted bounds safety; clients compiled with `-fbounds-safety` will see the annotations and benefit from compile-time and call-site checks.

- *(Full adoption only)* Modify headers before implementation files — implementation files will need all header definitions to have adopted `-fbounds-safety` first.
- Clients benefit from annotated interfaces even when the implementation doesn't enable `-fbounds-safety`.
- Unannotated interfaces result in all pointers being `__unsafe_indexable`, which is cumbersome for `-fbounds-safety` clients.

Example annotations:

```c
// C standard library style:
void *memcpy(void *__sized_by(n) dst, const void *__sized_by(n) src, size_t n);

// Custom API:
int process_buffer(const uint8_t *__counted_by(len) data, size_t len);
```

After adopting `-fbounds-safety` in a public header, add this directive at the start:

```c
#include <ptrcheck.h>
__ptrcheck_abi_assume_single()
```

This tells the compiler that ABI-visible pointers (except `const char*`) in this header should be treated as `__single` (not `__unsafe_indexable`, which is the default for SDK headers). `__ptrcheck_abi_assume_single` also only affects the current header, it does not affect the attributes in subsequently included headers.

##### Capturing deferred Safe Wrapper retrofits

When choosing `__unsafe_indexable` on a public-API function parameter or return, create a per-item Safe Wrapper task immediately. Capture happens at the moment of decision because the rationale is fresh; execution defers to step 5.1 in full adoption (see [5. Post-target-level refinements](#5-post-target-level-refinements)) or to step 3 in header-only adoption (see [3. Safe Wrapper retrofits (if any captured)](#3-safe-wrapper-retrofits-if-any-captured)).

Setup: the upfront task-creation step creates the Safe Wrapper umbrella. Its name and wiring depend on the adoption mode:

- **Full adoption** (Moment A): umbrella is `5.1 Commit Safe Wrapper batch`, `addBlockedBy [<step 4 task ID>]`, `addBlocks [<step 6 task ID>]`.
- **Header-only adoption** (Header-Only Adoption's `Tracking adoption progress` subsection): umbrella is `3b. Commit Safe Wrapper batch`, `addBlockedBy [<3a task ID>]`, `addBlocks [<milestone task ID>]`.

For each `__unsafe_indexable` decision on a public-API parameter or return:

1. **Defensive umbrella check.** Before creating the per-item task, confirm the Safe Wrapper umbrella exists. If not (e.g. the adoption was picked up mid-stream and the upfront task-creation step never ran for this session), create it now with the wiring for the current adoption mode (see Setup above).
2. Grep for the function's definition to identify the implementing `.c` file. (If the function is defined outside any file you're adopting, ask the user how to handle it.)
3. `TaskCreate` a task `Add Safe Wrapper for <funcName>` with a structured description like:

   ```
   Apply the Safe Wrappers for Public APIs pattern.

   - Function: <funcName>
   - Header: <header path>
   - Implementation file: <file>.c
   - Original signature (with __unsafe_indexable):
     <verbatim signature>
   - Reason for __unsafe_indexable: <one line — e.g. "length-prefixed buffer; bound is buf[0]">

   See [Safe Wrappers for Public APIs](common-patterns-and-pitfalls.md#safe-wrappers-for-public-apis) for the recipe.
   ```

   (The "do not commit between per-item tasks" instruction lives in §5's framing in full adoption and in §3's framing in header-only, not in each per-item description.)
4. `TaskUpdate addBlockedBy` so the wrapper task can't surface until its gating predecessor is done — `[<step 4 task ID>]` in full adoption; `[<3a Confirm Safe Wrapper application task ID>]` in header-only.
5. `TaskUpdate addBlocks [<Safe Wrapper umbrella task ID>]` so the umbrella checkpoint waits for this wrapper.

Do **not** put the wrapper list in the umbrella task's description — per-item tasks track per-item state and verification natively. The umbrella's description is just the verify-stop-and-commit body.

#### 2. Create a Validation File

Create a single `.c` file that includes every adopted header and compile it with `-fbounds-safety`. This ensures headers are compliant even if your project doesn't yet fully use `-fbounds-safety`.

Compiling the validation file requires `-fbounds-safety` to be added as a per-file build flag on it.

After creating the validation file (and any header adjustments needed to make it compile), **stop and ask the user to review before committing.** In that message:

- State that header files have been modified to adopt -fbounds-safety and that a validation file has been added to ensure the changes parse when -fbounds-safety is on.
- State that on approval the new validation file and any header changes will be committed together.
- List the names of the modified header files and new validation file.
- Invite the user to inspect the changes, make any further changes they need, and approve when ready to commit.

On approval, commit the changes following the [Commit hygiene at review stops](#commit-hygiene-at-review-stops) procedure. The scope of this commit is **header edits + the new validation file**, committed together as a single commit — the 5a/5b source-vs-build split does not apply here.

If you are doing header-only adoption, stop here. Do not proceed to "3. Enable Per-File in Implementation" — that section is only for full adoption.

#### 3. Enable Per-File in Implementation

> **Before doing this step, re-read `language-overview.md` and `common-patterns-and-pitfalls.md` in full via the Read tool.**

Enable `-fbounds-safety` in implementation files one at a time. Use the order computed in "Order of adoption". If the compiler crashes at any point during this section, see [Handling a compiler crash](#handling-a-compiler-crash) below before continuing.

> Before starting this section, confirm with the user how to run the project's tests (this should already have been captured by the `Confirm how to run tests` task in Moment A — re-confirm if it was not). If the user cannot or will not provide a way to run the tests, **stop and ask them**, verbatim:
>
> > Performing `-fbounds-safety` adoption without providing tests to verify runtime behavior greatly increases the chance of adopted code containing reachable runtime traps due to failing bounds checks. Are you sure you want to proceed without providing tests?
>
> Wait for the user's **explicit answer**.
> - If the user confirms they want to proceed without tests: skip sub-step 3 below ("Run the project's tests and fix any runtime traps") for every file in this section. The same skip applies to §5.1 step 2.
> - If the user changes their mind and wants to provide tests: capture how to run the tests from them (e.g. shell command, unit tests, etc.), record it for use in sub-step 3 (and §5.1 step 2), and continue with sub-step 3 enabled.

1. Enable `-fbounds-safety` for a single C file by adding it as a per-file build flag.
2. Fix compilation errors (compiler diagnostics guide you on what annotations to add). Use `-ferror-limit=0` to get unlimited diagnostics if you want to see all errors at once.
3. Run the project's tests and fix any runtime traps. See [runtime-debugging.md](runtime-debugging.md). *(Skip this sub-step if the user could not provide a way to run the tests — see the warning at the top of this section.)*
4. **Stop and ask the user to review the changes for this file before committing.** Before summarizing what changed, communicate the following three things in this order:

    1. Identify the file: state that the source-file changes under review are for `<filename>` (the actual file path).
    2. Explain what will happen on approval: the changes will be committed in two steps — first, the source-code changes committed with `-fbounds-safety` switched off for this file; second, a build-system change that re-enables `-fbounds-safety` for this file. This split is done to make it easy to revert the enablement later without losing the source-code improvements.
    3. Invite the user to inspect the changes, make any further changes they need, and approve when ready to commit.

    Then summarize the actual changes (annotations added, refactors, any unsafe forges introduced). Wait for the user's explicit approval. If they request adjustments, apply them, re-run the project's tests, and ask again. Only proceed to step 5 once the user has explicitly approved.
5. Commit the work for this file as **two separate commits**. This structure is MANDATORY — do NOT combine into a single commit.

    **5a. Source-changes commit.**
    - Temporarily clear `-fbounds-safety` from this file's per-file build flags.
    - Verify the source still compiles without the flag.
    - If it does not compile, make the minimum changes needed to compile cleanly with the flag off, then **stop and tell the user explicitly: we stopped because additional source changes were needed since the file did not compile with `-fbounds-safety` disabled. Ask them to review the changes, make any necessary further changes, and continue when they approve.** Apply any requested adjustments and re-verify the build before proceeding. When execution resumes, the [Commit hygiene at review stops](#commit-hygiene-at-review-stops) procedure applies to whatever the user touched during this sub-stop.
    - Commit following the [Commit hygiene at review stops](#commit-hygiene-at-review-stops) procedure. Scope: **source-code only** (annotations, refactoring). Any build-system changes in the working tree are deferred to 5b — if the user's edits span both kinds, the shared procedure will stop and ask.

    **5b. Build-system commit.**
    - Re-add `-fbounds-safety` as a per-file build flag for this file.
    - Verify it still compiles.
    - Commit following the [Commit hygiene at review stops](#commit-hygiene-at-review-stops) procedure. Scope: **build-system only**. If the user added source-code edits between 5a and now, the shared procedure will stop and ask how to handle them — do not silently bundle them into this commit.

    Rationale: this separates source churn from the act of enabling the flag. If enablement has to be reverted later, only commit 5b is reverted — the source-code improvements from 5a remain. Collapsing into one commit loses this property.

6. Repeat the above until every file in the adoption order is either adopted or explicitly skipped via [Skipping a file's enablement](#skipping-a-files-enablement) below.

##### Handling a compiler crash

If a build during sub-step 1 (per-file flag enablement) or sub-step 2 (fixing compilation errors) crashes the compiler, clang's stderr will include a `PLEASE ATTACH THE FOLLOWING FILES TO THE BUG REPORT` block listing `.c` (preprocessed source) and `.sh` (replay script) paths in `$TMPDIR`, plus a pointer to `~/Library/Logs/DiagnosticReports/clang_<...>.crash`. That block is the cue to enter this procedure — don't keep chasing compile errors.

**1. Gather a reproducer via a sub-agent.** Spawn a sub-agent (Task tool, `general-purpose`) with these self-contained instructions:

- Extract the `.c` and `.sh` paths from the crash output the parent provides.
- Re-run the `.sh` script and confirm it triggers the crash. If it does not, report that back — the crash may not be reliably reproducible.
- **Multi-arch handling:** if the original build used multiple `-arch` options, clang reports `Error generating preprocessed source(s) - cannot generate preprocessed source with multiple -arch options` instead of producing the `.c` / `.sh`. In that case, re-invoke the same compile command with each `-arch` value individually until one (or more) crashes, gathering the reproducer per crashing arch.
- Locate the matching crash log under `~/Library/Logs/DiagnosticReports/clang_<YYYY-MM-DD-HHMMSS>_<hostname>.crash` — pick the one whose timestamp matches the crash.
- Bundle the `.c`, `.sh`, and `.crash` into a single zip at `<project-root>/<crashing-filename>-crash-reproducer.zip` (one zip per crashing arch if multi-arch).
- Report back: the zip path(s), which arch(es) reproduced, and any missing files.

The preprocessed `.c` and `.sh` are large (often >1 MB combined); using a sub-agent keeps that bulk out of the main conversation context.

**2. Ask the user to file feedback using Feedback Assistant (non-blocking).** Say something like:

> "I gathered a crash reproducer at `<zip-path>`. Please file a feedback about this Clang `-fbounds-safety` crash using Feedback Assistant — either the Feedback Assistant app or https://feedbackassistant.apple.com — and attach the archive. You can continue with the workflow before or after filing; let me know the Feedback ID if you do file, since I'll reference it in any workaround comment."

Then proceed immediately to Step 3 without waiting. If the user later supplies a Feedback ID, use it; otherwise the workaround comment in Step 5 falls back to referencing the local archive path.

**3. Ask the user: skip or workaround?** Say something like:

> "How would you like to proceed with `<file>`?
> (a) Skip enablement for this file (uses the skip procedure below).
> (b) Attempt to work around the crash with light source changes (a few locations, no medium-large refactors)."

Wait for the user's explicit answer.

**4a. If skip:** invoke the [Skipping a file's enablement](#skipping-a-files-enablement) procedure with reason `compiler crash` (include the Feedback ID if the user supplied one). No further action needed in this sub-section.

**4b. If workaround:** try light source-level changes in the failing file. Common starting points (not exhaustive — pick what fits):

- Revert the most recent annotation that touched the crash site.
- Replace the offending annotation with `__unsafe_indexable` at the specific declaration that triggers the crash. This loses bounds safety at that one site — capture it as a Safe Wrapper retrofit if it's on a public API.
- Restructure the single expression or statement the crash points at to avoid the construct that triggers the crash.

**Keep workarounds light.** If avoiding the crash would require changing more than a handful of source locations, or any structural refactoring, stop and return to Step 3 to choose skip instead. Medium-large refactors are out of scope for this procedure; that workload belongs in a separately planned change.

**5. (workaround only) Leave a discoverable comment at every workaround site.** Each source location modified to dodge the crash gets a short comment that names what *would* have been written here without the crash, so a future reader can find it and restore the intended change once the compiler is fixed:

```c
// WORKAROUND for clang -fbounds-safety crash.
// Intended: <one-line description of the annotation/change we wanted to make here, e.g. "__counted_by(len) on `buf` parameter">.
// See Feedback Assistant <FB-ID> (or <relative path to crash-reproducer zip>).
```

The literal token `WORKAROUND for clang -fbounds-safety crash` must appear verbatim so the workarounds are grep-able across the codebase. The `Intended:` line briefly describes the change that would have landed here without the crash — keep it tight (one line) so it's useful but not laborious to write. Use the Feedback ID the user supplied; if none, reference the local archive path.

After a successful workaround, return to sub-step 2 to fix any remaining compilation errors and proceed normally through 3, 4, 5a/5b for this file. If a *new* crash surfaces during the same file's adoption, re-enter this procedure from Step 1.

##### Skipping a file's enablement

A `.c` file in the target may turn out not to be adoptable in this pass (e.g. the compiler crashes on it, or the user deliberately defers it). The user can request to skip enablement for that file at any point: upfront during §0 [Order of adoption](#order-of-adoption), or mid-stream while working through §3. Run this procedure the moment the skip is declared. If the trigger is a compiler crash, first run [Handling a compiler crash](#handling-a-compiler-crash); that procedure invokes this one on its skip branch. A target with any skipped file is referred to elsewhere in this guide as being under **partial-target adoption**.

**1. Confirm with the user.** Before acting, restate that proceeding with one or more files skipped has these consequences:

- **§4 [Switch to target-level enablement](#4-switch-to-target-level-enablement) is bypassed.** Per-file `-fbounds-safety` flags stay on the adopted files indefinitely; the target does not flip to `ENABLE_C_BOUNDS_SAFETY`.
- **The `__ptrcheck_unavailable_r` migration guarantee at §5.1 becomes partial.** The attribute only fires under `-fbounds-safety`, so callers of legacy entry points in skipped files compile silently against the shim. Callers in adopted files are still caught at compile time; callers in skipped files need manual audit if you want full migration.
- **The target's ABI is no longer uniform.** Today the workflow introduces only `__single`-ABI annotations on cross-TU functions, so this is not actively a problem — but any future use of `__bidi_indexable` or `__indexable` on an internal cross-TU function would create an ABI mismatch with callers in skipped files (wide pointer layout differs from a plain pointer).

Wait for the user's explicit answer.

**2. On approval:**

- Ensure a per-file `Adopt -fbounds-safety in <file>` task exists for the skipped file. If Moment B has already run, it does; otherwise (the skip was declared upfront during §0) `TaskCreate` it now so every skip has the same task representation regardless of when it was declared. `TaskUpdate` that task to `completed` with a one-line note `skipped: <reason>`. If Moment C sub-tasks already exist for the file, mark each `completed` with the same note.
- `TaskUpdate` the §4 task to `completed` with a one-line note `skipped: file(s) <X, Y, …> not adopted; per-file flags retained for adopted files`. If the §4 task was already marked complete-with-note by a previous skip, append the new file to the running list (re-edit the note via `TaskUpdate`).
- No dependency rewiring is needed: §5.x umbrellas are already `addBlockedBy [<step 4 task ID>]`, so marking §4 complete naturally unblocks them once the remaining per-file tasks finish.

**3. Handle any in-progress adoption state on the skipped file (mid-stream only).** If the per-file `-fbounds-safety` flag was already toggled on for this file, or source changes toward adoption were already started, stop and ask the user how to handle the uncommitted working-tree changes for this file. The default recommendation is to discard them (e.g. `git restore <file>`) — otherwise the file is left in a half-broken state (e.g. flag on but adoption incomplete). Apply the user's answer before moving on.

Then continue with the next per-file task if mid-stream.

#### 4. Switch to target-level enablement

Run this step only if every file in the target was adopted. Otherwise (some file skipped via [Skipping a file's enablement](#skipping-a-files-enablement)) §4 is bypassed and the workflow proceeds directly to §5.1.

When every file has been adopted it is preferable to enable `-fbounds-safety` at the target level rather than continuing to carry per-file flags. See [build-settings.md](build-settings.md) for the Xcode build settings. This change should be its own commit. Clear the per-file `-fbounds-safety` flag from every adopted file before flipping the target-wide setting.

#### 5. Post-target-level refinements

Project-wide source-level cleanups that depend on every translation unit being uniformly under `-fbounds-safety`. Step 4 made that uniformity ABI-atomic — once it lands, no caller in this target can be left in a non-bounds-safety build. Under partial-target adoption (§4 bypassed via [Skipping a file's enablement](#skipping-a-files-enablement)), this section's per-item tasks still execute, but the uniformity guarantee does not hold — see each sub-step's caveats.

Each 5.x sub-step is structured as:

- **Per-item tasks** (created in earlier phases; one per unit of work). Gated by Step 4. Track per-item state. While processing them, make the source change and mark complete — **do not commit between items.**
- **One umbrella checkpoint task** (`5.x Commit <substep> batch`). Blocked by every per-item task. When all per-item tasks are complete, this surfaces. Its body is the verify-stop-and-commit sequence for that sub-step (defined per-substep below).

##### 5.1 Safe Wrapper retrofits

> **Before doing this step, re-read `language-overview.md` and `common-patterns-and-pitfalls.md` in full via the Read tool.**

For every public-API function captured during Phase 1 as a per-item `Add Safe Wrapper for <funcName>` task (struct fields are out of scope), apply the [Safe Wrappers for Public APIs](common-patterns-and-pitfalls.md#safe-wrappers-for-public-apis) pattern.

Mark each per-item task complete after the source change for that wrapper is applied. Move on to the next per-item task. **Do not commit.**

When all per-item Safe Wrapper tasks are complete, the `5.1 Commit Safe Wrapper batch` task surfaces. Its body:

1. **Verify the target still compiles.** Fix any compilation errors introduced by the batch. *(Note: the legacy entry points are `__ptrcheck_unavailable_r`, so an un-switched caller is a compile error here — this step is what guarantees every caller migrated. Under [partial-target adoption](#skipping-a-files-enablement), the attribute only fires in adopted TUs; callers in skipped files keep compiling against the legacy shim.)*
2. **Run the project's tests.** Use the same test command captured during the `Confirm how to run tests` task in Moment A. Fix any failing tests. *(Skip if the user could not provide a way to run the tests, mirroring §3 step 3.)*
3. **Stop and ask the user to review the changes before committing.** Mirror §3 step 4's structure — communicate, in this order:
    1. Identify the scope. Tell the user something like: *"The changes introduce Safe Wrappers on the unsafe interfaces identified earlier. Each legacy function is now a thin shim that delegates to a `*Safe` variant with explicit count parameters, and every internal caller has been redirected to use the `*Safe` variant directly."* Then list which functions were wrapped.
    2. Explain what will happen on approval: a single commit (or one tightly-related cluster) covering the entire batch. Unlike per-file enablement — which committed the source changes and the build-system change separately — this is one source-only commit; there's no build-system component.
    3. Invite the user to inspect the changes, make any further changes they need, and approve when ready to commit.

    Then summarize the actual changes. Wait for explicit approval. If the user requests adjustments, apply them, re-verify (steps 1 and 2), and re-present.
4. **On approval, commit** following the [Commit hygiene at review stops](#commit-hygiene-at-review-stops) procedure. Scope: **source-code only** (the wrapper functions, the legacy shim retypings, the `__ptrcheck_unavailable_r` markers, and every caller switched to `*Safe`).

#### 6. Initial Adoption Complete

At this point initial `-fbounds-safety` adoption is complete. Tell the user adoption is done and surface these follow-ups for them to consider — the skill does not perform them:

- **Additional testing to look for runtime bounds-check failures.** Exercising the code beyond the existing test suite (e.g. fuzzing, broader integration tests) can uncover bounds violations that compile-time checking did not catch.
- **Benchmark and optimize if needed.** Measure performance and binary size against the pre-adoption baseline. If overhead is unacceptable, optimization may be needed.

### Use of unsafe constructs

[language-overview.md](language-overview.md) contains several escape hatches (e.g. `__unsafe_indexable` and `__unsafe_forge_*` intrinsics). Use of these constructs should be avoided when possible.

### Common Patterns, Tips, and Pitfalls

For common patterns (local variables to avoid assignment restrictions, handling incompatible APIs, calling non-adopted libraries, choosing between `__indexable` and `__bidi_indexable`) and common pitfalls encountered during adoption, see [common-patterns-and-pitfalls.md](common-patterns-and-pitfalls.md).

### Soft Trap Mode

Soft traps log violations instead of terminating the program, allowing you to discover multiple issues without fixing them one at a time. This is useful for:

- At-desk debugging: attach a debugger, observe all soft traps, then fix
- Identifying all bounds violations in a test suite in a single run

See [build-settings.md](build-settings.md) for how to enable soft trap mode, and [runtime-debugging.md](runtime-debugging.md) for how to debug soft traps in LLDB.

Note soft traps do not enforce bounds safety so to get any benefit from `-fbounds-safety` soft trap mode **must be switched off** for adoption to be considered complete.

### Performance Optimization

Use optimization remarks to identify where bounds checks are emitted. Strategies to reduce overhead:

- Adjust loop conditions so bounds checks match loop bounds (optimizer removes redundant checks)
- Reorder loops to iterate from size to zero (bounds check often hoisted outside loop)
- Add manual bounds checks before tight loops to make inner checks redundant
- Avoid complex count expressions (e.g., division is expensive in count expressions)

## Header-Only Adoption

Header-only adoption is a lightweight alternative for libraries that don't want the cost of full adoption — either in terms of engineering time or runtime overhead.

### When to Use

- Your library is consumed by clients that are adopting `-fbounds-safety`
- You want to provide safe interfaces without changing your implementation
- You want to avoid runtime overhead in your library

### Tracking adoption progress

Header-only adoption is bounded — three numbered steps, with §3 being an opt-in Safe Wrapper batch. Use `TaskCreate` once at the start so the user can see the plan and no step is silently dropped. Before any file is modified, create exactly these tasks:

- `Confirm approach with the user` (header-only vs full adoption)
- `1. Annotate public headers` (per [1. Headers First](#1-headers-first))
- `2. Create validation file and commit` (per [2. Create a Validation File](#2-create-a-validation-file))
- `3a. Confirm Safe Wrapper application` (gate task — its body asks the user whether to apply captured wrappers, or auto-completes if none captured; see [3. Safe Wrapper retrofits (if any captured)](#3-safe-wrapper-retrofits-if-any-captured))
- `3b. Commit Safe Wrapper batch` (umbrella — auto-completes with **no commit** if `3a.` cleared with "no Safe Wrappers captured", "user declined", or amendment declined every captured wrapper. Otherwise runs the verify-stop-and-commit body in §3 over the remaining (approved) wrappers.)
- `4. Header-only adoption complete` (final milestone — its body is described in [§4](#4-header-only-adoption-complete))

Wire the chain with `TaskUpdate addBlockedBy` so order is enforced and the milestone only surfaces at the end:

- Task `2.` is blocked by task `1.`.
- Task `3a.` is blocked by task `2.`.
- Task `3b.` is blocked by task `3a.`.
- Task `4.` is blocked by task `3b.`.

During §1, the [Capturing deferred Safe Wrapper retrofits](#capturing-deferred-safe-wrapper-retrofits) subsection may create per-item `Add Safe Wrapper for <funcName>` tasks. In header-only mode their wiring is `addBlockedBy [<3a task ID>], addBlocks [<3b task ID>]` — so per-items unblock once `3a.` clears (user approves) and `3b.` waits for them all.

Mark a task `completed` only when its step is actually done. If a step legitimately does not apply, mark complete with a one-line note explaining why rather than skipping silently. In particular: if no per-item Safe Wrapper tasks were created during §1, mark `3a.` complete with a one-line "no Safe Wrappers captured" note when it surfaces, and `3b.` will auto-complete with the same note.

### Steps

The header-annotation work and validation-file work are the same as the corresponding steps in Full Adoption. Follow these sub-sections in order:

1. **[1. Headers First](#1-headers-first)** — annotate the public headers and add `__ptrcheck_abi_assume_single()`.
2. **[2. Create a Validation File](#2-create-a-validation-file)** — create a `.c` file that includes all adopted headers and compiles with `-fbounds-safety`.
3. **[3. Safe Wrapper retrofits (if any captured)](#3-safe-wrapper-retrofits-if-any-captured)** — apply captured Safe Wrappers (after asking the user whether to proceed) and commit. Defined in the new subsection below.
4. **[4. Header-only adoption complete](#4-header-only-adoption-complete)** — tell the user adoption is done and surface follow-up suggestions (notably: consider full adoption in the future).

Do **not** proceed to Full Adoption's "[3. Enable Per-File in Implementation](#3-enable-per-file-in-implementation)" — that is a different step (despite sharing the same number) and applies only to full adoption. Header-only's §3 above is distinct.

Compiling the validation file (step 2 above) requires `-fbounds-safety` as a per-file build flag.

### 3. Safe Wrapper retrofits (if any captured)

> **Before doing this step, re-read `language-overview.md` and `common-patterns-and-pitfalls.md` in full via the Read tool.**

This step applies the [Safe Wrappers for Public APIs](common-patterns-and-pitfalls.md#safe-wrappers-for-public-apis) pattern to any per-item `Add Safe Wrapper for <funcName>` tasks captured during §1's [Capturing deferred Safe Wrapper retrofits](#capturing-deferred-safe-wrapper-retrofits) subsection. It is gated on user opt-in: header-only adoption defaults to "no source-file work," so we ask before doing it.

The step is split across two tasks (`3a.` and `3b.`) plus the per-item tasks captured during §1.

#### `3a.` body — opt-in gate

1. **No-captures shortcut.** If no `Add Safe Wrapper for <funcName>` per-item tasks were created during §1, mark `3a.` complete with a one-line "no Safe Wrappers captured" note. `3b.` will auto-complete with the same note when it surfaces.
2. **Opt-in stop.** Otherwise, stop and ask the user whether to apply the captured wrappers. Communicate, in this order:
    1. List the candidate wrappers (function names, with the one-line "Reason for `__unsafe_indexable`" captured during §1).
    2. Explain that applying these means modest source-file changes — new `*Safe` variants in the implementation file, the legacy functions become thin shims that delegate to their `*Safe` variant, and the legacy declarations are marked `__ptrcheck_unavailable_r` in the public header. Internal callers of the legacy API are **not** re-routed — they continue to call the legacy function (which now goes through the shim), so existing implementation code is left as-is.
    3. Ask whether to proceed, decline, or amend the candidate list. Make explicit that declining (or amending to drop every wrapper) results in **zero source-file changes and zero commits** — the captured per-item tasks are simply marked completed with a "user declined" note and adoption proceeds to the milestone.
3. **Apply the answer.**
    - On **decline**: mark every per-item `Add Safe Wrapper for <funcName>` task complete with a "user declined" note, mark `3a.` complete with the same note, and let `3b.` auto-complete with the same note when it surfaces. No commit.
    - On **amendment**: edit the candidate list per user direction (e.g. mark a subset declined, leave the rest pending), then mark `3a.` complete.
    - On **approval**: mark `3a.` complete. Per-items unblock and you work each one (next subsection).

#### Per-item application (between `3a.` and `3b.`)

For each remaining `Add Safe Wrapper for <funcName>` per-item task, apply the [Safe Wrappers for Public APIs](common-patterns-and-pitfalls.md#safe-wrappers-for-public-apis) pattern, with the [Header-only variant](common-patterns-and-pitfalls.md#safe-wrappers-for-public-apis) adjustments. Three reminders specific to this mode:

- **Do not switch internal callers** — header-only adoption deliberately leaves internal callers of the legacy API alone, so the only caller of `<funcName>Safe` in the implementation is the shim itself. This keeps the implementation-file footprint minimal.
- **The implementation file is not under `-fbounds-safety`.** Do not add `__unsafe_forge_*` calls in the legacy shim — they are no-ops here and just clutter the diff. Conversely, do still write the Safe variant's *definition* with the same parameter annotations as the header declaration so the redeclaration is consistent and the signature is ready for full adoption later.
- **Ensure `<ptrcheck.h>` is reachable in the implementation file.** The annotation macros need it to expand to empty when the flag is off (see [language-overview.md](language-overview.md)). Usually transitive via the public header; add `#include <ptrcheck.h>` directly if not.

Mark each per-item complete after its source change is applied. **Do not commit between per-items.**

#### `3b.` body — verify, stop, commit

When `3b.` surfaces, branch on the state left by `3a.`:

- **If `3a.` cleared with "no Safe Wrappers captured" or "user declined" (or every per-item was marked declined during the amendment branch):** mark `3b.` complete with the same one-line note as `3a.` and stop. **No verify, no review, no commit** — there are no source changes to commit.
- **Otherwise** (`3a.` approved and at least one per-item was applied), run the body below. (Header-only mode does not capture a test command, so the build alone is the verification gate; users wishing to run tests should do so manually before approving the review stop.)

1. **Verify the target still compiles.** Fix compilation errors.
2. **Stop and ask the user to review** before committing. Mirror §5.1 step 3's structure — communicate, in this order:
    1. Identify the scope. Tell the user something like: *"The changes introduce Safe Wrappers on the unsafe interfaces identified when annotating the public headers. Each legacy function is now a thin shim that delegates to a `*Safe` variant with explicit count parameters. Internal callers of the legacy API are unchanged — they continue to call the legacy function (which now goes through the shim), so the implementation footprint stays minimal."* Then list which functions were wrapped.
    2. Explain what will happen on approval: a single commit (or one tightly-related cluster) covering the entire batch — source-only, with no separate build-system commit.
    3. Invite the user to inspect the changes, make any further changes they need, and approve when ready to commit.

    Then summarize the actual changes. Wait for explicit approval. If the user requests adjustments, apply them, re-verify (step 1 above), and re-present.
3. **On approval, commit** following the [Commit hygiene at review stops](#commit-hygiene-at-review-stops) procedure. Scope: **source-code only** (the new `*Safe` definitions, the legacy shim rewrites, and the `__ptrcheck_unavailable_r` markers in the public header).

### 4. Header-only adoption complete

At this point header-only `-fbounds-safety` adoption is complete. Tell the user adoption is done and surface these follow-ups for them to consider — the skill does not perform them:

- **Consider full adoption in the future.** Header-only protects external clients of the library; the library's own implementation is not compiled with `-fbounds-safety`, so bugs inside the implementation are not caught at compile time and out-of-bounds accesses inside the implementation are not trapped at runtime. If stronger guarantees are wanted later, [Full Adoption](#full-adoption) extends bounds-safety to the implementation itself. The work already done — annotated public headers, the validation file, and any Safe Wrappers applied — carries forward and accelerates a future full-adoption pass.
- **If Safe Wrappers were applied, exercise the new `*Safe` variants.** The new code paths should be tested to ensure correctness.

### What Clients Get

- Clients adopting `-fbounds-safety` see the annotated interface and get bounds checks at call sites
- The compiler verifies at the client's call site that the pointer has at least `count` elements
- Other clients that don't use `-fbounds-safety` see the same header with no effect — annotations are invisible without the flag

### What You Don't Get

- No bounds checking inside your library's implementation
- No compiler enforcement of annotation correctness within implementation files
- Bugs in your implementation are not caught by `-fbounds-safety`

### Useful for Cross-Language Interop

Header-only annotations also provide more information to the compiler for safer interop from other languages (e.g., Swift importing your C headers).

# Verification And Limits

The relevant unit of verification is the current tracked portfolio tree.
The preceding 20 commits are intentionally preserved; this review does not
claim to remove source from those commits.

## Publication Review

The portfolio update is checked for the following properties:

| Check | Boundary |
| --- | --- |
| Tracked-file allowlist | Only approved Markdown, metadata, three PNGs, and the image manifest |
| Withdrawn implementation | No FE/BE directories, package files, build tooling, app tests, or generated bundles in the current tree |
| Documentation links | Relative Markdown and embedded image/link targets resolve within the approved tree |
| Image integrity | Original byte sizes and SHA-256 values agree with the unchanged manifest |
| Image payload review | Retained PNGs have no text/source metadata chunks or trailing payloads |
| Staged content | No credential signatures, private implementation snippets, or current runnable-preview claims |
| Git continuity | The original 20 commits remain ancestors; exactly seven non-empty updates are added |
| Remote state | Public visibility and the pushed main head are checked after publication |

Publication validation is performed with local tools outside the public
showcase. Application test scripts and build CI have been withdrawn rather
than kept as source-bearing files. An ignore allowlist reduces accidental
additions but does not prevent forced staging or affect historical commits.

## Review Without Application Setup

No dependency installation or application build is needed to inspect the
case study. A maintainer can inspect the current tracked inventory with
`git ls-files`, review staged changes with `git diff --cached`, and check text
formatting with `git diff --check`. The
[asset manifest](../../assets/manifest.json) supplies the image-integrity baseline.

The [gallery](../gallery.md) identifies presentation claims and their limits.
The [source policy](../../SOURCE-CODE.md) states the retained-history caveat.

## Limits

Static images do not verify responsive behavior, keyboard access, animation,
runtime performance, transaction safety, or production deployment. No private
implementation, official-site security, or operational-readiness audit is
implied. A successful publication check is not an application certification.

Removing files from the current version cannot prevent access through previous
commits, forks, downloaded copies, or other repositories. Repository terms
cannot create confidentiality for material that remains public. Historical
build and test results belong to the earlier publication, not the current
visual-only version.

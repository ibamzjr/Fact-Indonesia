# Verification And Limits

## Automated Checks

```bash
npm ci
npm test
npm run build
npm run build:fact
npm run check:publication
```

`npm test` runs 22 checks covering content validation, catalogue states,
selection URLs, contact destinations, source consistency, publication paths,
local documentation links, asset checksums, and the standalone build graph.
`npm run build` compiles the inherited presentation; `npm run build:fact`
compiles the independent static preview. Neither deploys the official FACT site.

The GitHub workflow runs tests and both builds with Node 24, pinned actions,
read-only repository permissions, and no retained checkout credentials.

## Publication Checks

- Verify local documentation links and all README image paths.
- Keep runtime data, environment files, and credentials outside Git history.
- Check imported PHP examples for syntax with `php -l`.
- Preserve attribution and distinguish reference content from implementation.
- Check the complete commit history for non-empty, accurately named changes.

The publication script verifies tracked file paths, common credential formats,
local Markdown/HTML link targets, and all three original asset checksums. It is
not a comprehensive secret scanner or an audit of the omitted private runtime.

## Browser And Syntax Verification

The second batch was checked in Chrome on 3 October 2026:

- Desktop catalogue, service detail, text search, and category filters.
- Reset from an unmatched search/category combination.
- Browser Back/Forward restores the selected service.
- FAQ expansion with pointer/Enter and unknown-service recovery.
- Escape closes detail, restores focus, and releases body scrolling.
- Layouts at 320px, 390px, and 820px without horizontal page overflow.
- Owner image loads with its reserved aspect ratio; no console errors observed.

All 11 curated PHP files passed `php -l`. Their backend feature tests were not
run because the private application, schema, and runtime wiring are excluded.

Existing inherited build warnings remain: old Browserslist data, public font
and background URLs resolved at runtime, and the Profile static/dynamic import.
The standalone build has no inherited font/background/import warnings.

## Remaining Limits

The official FACT site is not deployed from this repository. Enrollment,
learning progress, certificates, FACT authentication, and FACT payment handling
are not implemented by this publication. Imported backend feature tests require
the excluded private application and cannot run independently here.

No production security, accessibility, performance, or operational-readiness
certification is implied by a successful build.

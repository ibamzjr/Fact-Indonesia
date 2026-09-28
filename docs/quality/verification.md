# Verification And Limits

## Presentation Build

```bash
npm ci
npm run build
```

This checks the inherited React module graph and generates a production Vite
bundle. It does not run the omitted Laravel application.

## Publication Checks

- Verify local documentation links and all README image paths.
- Keep runtime data, environment files, and credentials outside Git history.
- Check imported PHP examples for syntax with `php -l`.
- Preserve attribution and distinguish reference content from implementation.
- Check the complete commit history for non-empty, accurately named changes.

## Remaining Limits

The official FACT site is not deployed from this repository. Enrollment,
learning progress, certificates, FACT authentication, and FACT payment handling
are not implemented by this publication. Imported backend feature tests require
the excluded private application and cannot run independently here.

No production security, accessibility, performance, or operational-readiness
certification is implied by a successful build.

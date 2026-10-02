# Standalone FACT Preview

This entry runs the FACT service information journey independently from the
inherited Inertia application. It requires Node 24 and npm, not Laravel,
database access, API credentials, or environment variables.

## Development

```bash
npm ci
npm run dev:fact
```

Open `/fact-preview.html` on Vite's printed local URL. To choose another port:

```bash
npm run dev:fact -- --port 5181 --strictPort
```

The development server binds to `127.0.0.1`. It is not a public deployment.

## Build And Check

```bash
npm test
npm run build:fact
npm run check:publication
```

`dist-fact/fact-preview.html` and its assets form the generated static preview.
Generated output is not committed. The original `npm run build` still checks
the inherited presentation bundle separately.

## Implemented Journey

The catalogue filters five service-reference records. Selecting a detail uses
the `layanan` query parameter, supports Back/Forward, and opens a native modal.
Unknown selections have a return path; Escape closes the dialog and restores
focus. Native FAQ disclosures work with pointer and keyboard input. Contact
links open the verified official site without adding participant information.

The [content contract](product/content-contract.md) distinguishes editorial
grouping and portfolio policy from official source references. Service
availability, schedules, and fees require direct confirmation with FACT.

## Limits

There are no participant accounts, registration forms, transaction handlers,
learning records, certificates, analytics initialization, or private API calls
in this preview. Its markup and palette do not reproduce the supplied mockups
exactly. The original images remain portfolio assets, not verified course data.
Backend examples still require the excluded application to run feature tests.

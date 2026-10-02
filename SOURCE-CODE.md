# Published Source Boundary

Fact-Indonesia combines FACT portfolio material with a shared application
foundation imported from [RoyalVilla](https://github.com/ibamzjr/RoyalVilla).

## Included

- Complete inherited React/Inertia pages, layouts, components, hooks, contexts,
  utilities, and local display data under `resources`.
- Public interface imagery, icons, fonts, and Vite/Tailwind configuration.
- Sanitized Laravel models, validation, catalogue, moderation, and test examples
  under `backend`.
- A separate, runnable FACT information preview with its own entry, components,
  content validators, service data, FAQ, and contact actions.
- Automated content/publication checks and a read-only CI workflow.
- Owner-supplied FACT portfolio visuals and documentation.

## Excluded

The operational Laravel bootstrap, routes, migrations, authentication services,
payment/webhook implementations, environment files, secrets, database exports,
user uploads, runtime storage, and deployment configuration are not published.

## Current Meaning

The imported source retains RoyalVilla's property domain and names. It is shared
engineering material, not a finished FACT learning management system. The
independent preview implements information discovery only. The supplied
mockups document a separate design direction, not a pixel-identical rendering
of either frontend.

`npm run build` compiles the presentation bundle. It does not create a working
inherited website without the excluded Laravel runtime. `npm run dev:fact` and
`npm run build:fact` run/build the independent preview without Laravel. Backend
samples remain non-runnable without their private schema and application wiring.

See [provenance](docs/provenance.md) and the
[verification limits](docs/quality/verification.md).

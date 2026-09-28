# Published Source Boundary

Fact-Indonesia combines FACT portfolio material with a shared application
foundation imported from [RoyalVilla](https://github.com/ibamzjr/RoyalVilla).

## Included

- Complete inherited React/Inertia pages, layouts, components, hooks, contexts,
  utilities, and local display data under `resources`.
- Public interface imagery, icons, fonts, and Vite/Tailwind configuration.
- Sanitized Laravel models, validation, catalogue, moderation, and test examples
  under `backend`.
- FACT reference content in `resources/js/Data/factIndonesia.json`.
- Owner-supplied FACT portfolio visuals and documentation.

## Excluded

The operational Laravel bootstrap, routes, migrations, authentication services,
payment/webhook implementations, environment files, secrets, database exports,
user uploads, runtime storage, and deployment configuration are not published.

## Current Meaning

The imported source retains RoyalVilla's property domain and names. It is shared
engineering material, not a finished FACT learning management system. The
mockups document a separate FACT design direction and are not screenshots
rendered by the inherited React source.

`npm run build` compiles the presentation bundle. It does not create a working
website without the excluded Laravel runtime. Backend samples remain
non-runnable examples without their private schema and application wiring.

See [provenance](docs/provenance.md) and the
[verification limits](docs/quality/verification.md).

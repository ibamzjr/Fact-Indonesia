# Implementation And Publication Policy

**The current version is a public portfolio, not an application source
distribution. Frontend and backend implementation are not included.**

## Current Publication Boundary

| Public Material | Purpose |
| --- | --- |
| Three owner-supplied PNGs | Selected visual outcomes for portfolio evaluation |
| Asset manifest | Original filenames, sizes, and integrity checksums |
| Markdown documentation | Case study, image provenance, and publication policies |
| Git/editor metadata | Text formatting and an explicit presentation-file allowlist |

The current tree does not include FE/BE source, components, templates, styles,
runtime data, fonts, dependency manifests, build configuration, tests,
application CI, compiled bundles, source maps, APIs, databases, credentials,
or deployment files. There is no local application setup or build command.

The permitted paths are listed in [.gitignore](.gitignore). A Git ignore list
helps prevent accidental additions; it is not access control, does not block
forced staging, and does not remove anything from existing history.

## Exclusive Source-Sharing Policy

The repository owner does not authorize distribution or reuse of the owner's
implementation through this public showcase. Any authorized implementation
review or delivery must be governed by a separate written agreement and a
private channel. This repository offers no open-source implementation license.
See [repository terms](LICENSE.md) and [ownership notice](NOTICE.md).

## Retained History

The owner explicitly chose a normal update rather than a history rewrite.
The preceding 20 commits remain unchanged and publicly reachable. They include
frontend code, selected backend examples, and a former information preview.
Deleting those files from the current tree does not prevent readers from
opening them in older commits or existing copies.

Accordingly, this update does not make previously published code confidential,
revoke valid prior rights, or claim that source is absent from the entire Git
repository. The seven update commits document a new publication boundary;
they are not a retroactive removal of the previous publication.

No other project repository or third-party rights are changed by this policy.
See [provenance](docs/provenance.md) for the publication chronology and
[verification limits](docs/quality/verification.md) for what was checked.

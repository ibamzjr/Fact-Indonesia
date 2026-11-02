# Visual Direction

The [FACT experience prototype](https://www.figma.com/proto/DaUF428JV28rilJxGucJUO?node-id=0-1)
and the three unchanged showcase exports inform this direction. They are
presentation references, not evidence of working interaction or production
design-system implementation.

## Visual Language

The prototype moves between white space, near-black surfaces, and warm gold
accents. Dark, rounded navigation and decisive calls to action establish a
confident first impression. A mix of bold sans-serif headings and selective
italic serif emphasis makes the learning message memorable without hiding the
next action. Course photography, compact ratings, and disciplined card spacing
keep discovery approachable.

These are observed cues, not a claim of exact design tokens, licensed typefaces,
or responsive specifications. The private implementation would need a separate
review of typography, contrast, motion, and keyboard behavior.

## Experience Cues

| Prototype area | Presentation cue | Intended effect |
| --- | --- | --- |
| Home | Clear learning promise, direct catalogue action, black-and-gold navigation | Give visitors a confident entry point |
| Catalogue | Warm heading area, search and filters, repeated course cards | Reduce effort when comparing options |
| Course detail | Large media preview beside summary, price and actions | Make the decision context visible together |
| Account entry | Focused sign-in surface and restrained gold highlights | Keep the transition to a personal journey clear |
| Cart and voucher | Grouped purchase details and voucher entry | Make the next step understandable before checkout |
| Checkout | Buyer fields, payment choices, discount and total summary | Keep the purchase decision legible |
| Payment overlay | A separate method-selection surface | Show the handoff, without treating the mockup as a verified transaction |
| Recovery | A recognizable unavailable state with a return action | Help people regain their place |

The certificate item appears as a navigation destination in the prototype;
certificate issuance and verification are not established by these screens.
The payment overlay and checkout show different amounts, so their prices are
illustrative rather than a source of truth for the proposed system.
The [architecture direction](../architecture/overview.md) maps the intended
private responsibilities behind such a journey.

## Showcase Exports

The three owner-supplied PNGs cover a home composition, catalogue concept,
and recovery concept. The original copies are retained without recoloring,
cropping, redrawing, or compression. [Asset provenance](../gallery.md#asset-provenance)
records their names and the [manifest](../../assets/manifest.json) records
checksums.

This publication contains no CSS, components, fonts, animation code, or design
source files. Static exports cannot establish responsive behavior, accessibility,
motion quality, or runtime performance.

# Design Direction

The supplied FACT mockups establish a warm yellow identity, dark navigation
accents, clear learning-oriented headings, and a photographic presentation.
The home, catalogue, and recovery views form the visual case study.

The imported React source still uses RoyalVilla's existing palette and property
imagery. The standalone FACT preview uses white information surfaces, a warm
yellow action accent, green institutional bands, and dark text. It is a new
information presentation, not a recreation of the supplied laptop mockups.
The owner image in the organization section is labelled as a portfolio concept.

Future adaptation should preserve legible typography, predictable navigation,
stable media proportions, accessible controls, and usable mobile layouts.
Animation should support orientation and stop when inactive; accessibility and
reduced-motion checks belong to implementation verification.

The preview uses fixed breakpoint typography, a two-column desktop catalogue
and single-column mobile layout. Controls have labels, visible focus, stable
dimensions, and native input/select/dialog/disclosure semantics. No canvas,
carousel, shimmer loop, scroll hijacking, remote fonts, or animation library is
initialized by the standalone entry. The concept image preserves its intrinsic
aspect ratio and uses lazy loading; the original PNG remains unchanged.

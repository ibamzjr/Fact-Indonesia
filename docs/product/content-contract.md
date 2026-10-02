# FACT Information Contract

The standalone portfolio uses a separate FACT data model. It does not convert
RoyalVilla property records into participant records.

## Organization And Services

- `factIndonesia.json` supplies the organization name, motto, profile, and the
  official five-category service taxonomy.
- `factPrograms.json` supplies reference service summaries, not scheduled
  courses. The Pelatihan, Konsultansi, and Kegiatan grouping is editorial.
- Every record has a stable slug, title, category, summary, source URL, and
  `contact-required` availability. Price, capacity, enrollment, and payment
  fields are intentionally not accepted by the contract.
- `factFaq.json` identifies organization summaries separately from portfolio
  policy. The latter is not presented as a quotation of FACT's own policies.

## Sources And Review

`resources/js/fact/sources.js` records the two verified official destinations
and review dates. The homepage timed out on direct fetch on 2 October 2026;
its indexed service overview was used instead. The profile was accessible.
No claim is made that the review confirmed current prices, timetables, staff,
or participant counts. See [references](../sources.md).

Validators reject unknown program fields, duplicate IDs, non-official URLs,
unreviewed paths, query strings, URL credentials, and mismatched service titles.
Content is rendered as text, never injected HTML. Updating the official
taxonomy requires an explicit source review and corresponding contract tests.

## Data Boundary

Search stays in React state. A service slug can appear in the shareable URL;
no participant identity or search history is persisted. Contact opens the
official website without adding a participant payload. There is no registration
form, payment call, analytics initialization, or private API in this preview.

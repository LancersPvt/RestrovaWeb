# Search Console data required

No actual GSC query/page export or authorized connection was available. All ranking/traffic opportunities remain provisional.

1. In the verified restrova.com property, open Performance → Search results. Choose Web search and Country Pakistan.
2. Select the last complete 28 days and compare the preceding 28 days. Record exact dates and any incomplete reporting days.
3. Export Queries and Pages tables separately, retaining clicks, impressions, CTR and average position; keep the original exports unchanged. Record property, search type, country and device filters.
4. Normalize records into gsc-import-template.csv. Set dimension to query or page and period to current or previous. Leave the other dimension empty. Never invent a query-to-page join from two separate tables; use an explicitly filtered export/API dataset for joint analysis.
5. Classify query tokens case-insensitively: exact whole token `restrova` is branded. Maintain an explicit owner-reviewed spelling-alias list; near matches go to manual review, not automatically branded. Page records have no query-brand classification unless supported by filtered data.
6. Compare intent-relevant rows with adequate impressions. Review low CTR, average positions around 11–30, wrong-audience queries and multiple pages serving the same intent as hypotheses, not guaranteed wins. Preserve low-count caveats and query privacy omissions.

Aggregate CTR = sum(clicks)/sum(impressions). Do not average row percentages or combine query and page totals. Average position is an aggregated observation, not a universal fixed rank. Keep scope and denominators identical when comparing periods.

Official guidance: https://support.google.com/webmasters/answer/7576553

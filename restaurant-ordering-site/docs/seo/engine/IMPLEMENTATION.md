# SEO engine implementation checklist — 10 November 2026

This is an incremental implementation, not completion of the entire master brief. Nothing deployed or automatically indexed.

## Audit and architecture
Existing Next.js 16 App Router, TypeScript, file-backed articles, shared MarketingPage, metadata and JSON-LD helpers. No separate CMS/ORM discovered in the content paths. Existing API/tenant integrations are unchanged. Pricing, demo acknowledgement and consent-gated GTM/Meta remain unchanged. Search Console is configured per owner, but no account metrics were accessed.

## Completed in this batch
- [x] Imported all 100 exact titles into content/seo/editorial-inventory.json, ten per cluster, with metadata, related content and explicit overlap/research review states.
- [x] Mapped ten clusters onto existing pillars rather than generating ten competing product pages.
- [x] Added 40 candidate records: 10 cities, 12 business types, 8 features, 5 comparisons, 5 working calculators. Runtime source is src/data/seoPages.ts; JSON is the initial export.
- [x] Added reusable page model, publication/error gates, rendering and 404 controls. Draft/review/approved/archived records are not public. Noindex records require real content.
- [x] Added calculator/feature/comparison/resource/website-template route adapters. Only five noindex calculator pages are currently visible; other records stay private or map to existing pages.
- [x] Five tools support live inputs, formulas, explicit assumptions and validation without registration or network submission.
- [x] Existing canonical URLs, 43-URL sitemap, robots and published articles preserved. Noindex calculators intentionally excluded.

## Unfinished work — resume here
- [ ] Review per-title matching (automated similarity is a suggestion, not proof of overlap). Resolve 100 editorial decisions; write the first 10 differentiated drafts, then continue in batches. Article bodies in the new inventory are intentionally empty, not completed drafts. Existing 16 published articles remain intact.
- [ ] Complete Pakistan-local SERP validation for each target. Initial public results support consolidating online-ordering synonyms; not evidence of search volume, rank or exhaustive intent validation.
- [ ] Add blog search, pagination, category/tag route navigation and social sharing; preserve current listing/TOC/related links.
- [ ] Integrate reviewed city and restaurant-type candidates with their existing route models without replacing existing pages.
- [ ] Extend sitemap/tracking path generation for approved programmatic pages before any publication. The current sitemap does NOT yet import the new engine; no pages should be changed to published until this is completed.
- [ ] Add authenticated or local-only draft previews, editorial transition commands, export regeneration and richer similarity/canonical quality checks.
- [ ] Build actual downloadable resource files and approved real website template previews; no downloads or fake previews advertised.
- [ ] Add privacy-safe calculator/download events (without numeric inputs); existing demo tracking unchanged.
- [ ] Complete human editorial review, mobile browser checks, live structured-data validation and production performance checks.

## Evidence gaps and research
City-specific availability/onboarding/customer evidence is missing; do not invent offices. QR/WhatsApp ordering not verified. Indolj/Blink comparisons need dated source research; initial sources: https://www.indolj.pk/frequently-asked-questions.php and https://www.blinkco.io/help-center/faq-why-blink/ . No competitor pricing or ranking claims were published. Commission-free is an educational intent only: Restrova charges max(PKR 5000, 1% of processed sales), plus PKR 10000 onboarding.

## Workflow / rollout
Edit file-backed records in a branch. Run npm run test:seo-engine, existing SEO tests, lint and build. Review errors; approved alone remains private. Publication requires completed sitemap integration, verified sources, distinct intent, reviewer/date and valid canonical. Never flip status just to meet a quota.
Days 1–30: resolve overlapping titles, draft ten distinct guides and review the five noindex tools. Days 31–60: publish only reviewed content after crawl/link/mobile checks and inspect Search Console. Days 61–90: expand only from real query evidence and confirmed city/product facts. Record impressions, clicks, CTR, position, indexed URLs and qualified leads as unavailable until measured; no trial-signup metric because no trial flow is established.

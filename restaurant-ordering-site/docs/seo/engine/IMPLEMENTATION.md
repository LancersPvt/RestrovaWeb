# Public blog release — 11 November 2026

This release supersedes the unpublished article status in the historical notes below. The owner explicitly requested 100 public blogs under 10 headings. All 100 bodies are now published in source; the owner still handles Git push and deployment. None was pushed or deployed here.

## Navigation

- Homepage: ten topic cards below the existing six service cards, matching the cream/white design.
- `/blog`: the same ten topic cards plus the existing searchable, paginated directory.
- `/blog/topics/[topic]`: ten complete article links per topic, with summaries and reading times.
- `/blog/[slug]`: full server-rendered article, table of contents, publication date, topic breadcrumb and related articles.
- Existing 16 articles, service URLs, canonicals, pricing and demo forms are preserved.

## Publication versus indexing

All 100 are publicly readable. Ten focused operational guides are indexable; 90 overlapping or supplier-evaluation guides are `noindex,follow` with self-canonicals, and are excluded from the sitemap. Topic collections also use `noindex,follow`. These are navigation pages, not competing product landing pages. The sitemap now has 53 URLs. Noindex does not hide a guide from visitors.

The new `indexingStatus` decision is signed with the reviewed article. Public noindex articles require editorial review; indexable articles additionally require verified claims and distinct intent. Content, metadata, cluster or indexing changes invalidate the review signature. Drafts remain private by default. New records start with noindex and no review approval.

Sixteen unsupported “best” headlines were rewritten as evaluation questions or shortlists; `requestedTitle` retains the original brief. Existing slugs and canonicals did not change. Supplier sources retain their research date and eligibility caveats. No ranking, integration, customer result or independent vendor test is claimed. Review attribution is “Codex — editorial review”, not a fabricated human reviewer. The bodies remain concise guides, roughly 350–510 words each.

The 63 programmatic records remain private. This article publication request does not establish evidence for city pages, product features or template previews.

## Later publication or indexing changes

Run `npm run seo:content -- draft CONTENT_ID` before editing. Review the actual copy and sources; set `indexingStatus` explicitly. To index a guide, resolve its `indexingHoldReason`, demonstrate a distinct purpose and set verified claims/distinctIntent only when warranted. Then approve with the actual reviewer and publish through the existing CLI. Run content validation, tests and build. `npm run seo:sync` includes public noindex routes in analytics allowlists while keeping them out of the sitemap.

See `BLOG-PUBLICATION-VALIDATION.txt` for release checks. After the owner deploys, open `/blog`, follow each topic and verify the 100 public routes; use Search Console URL Inspection for the ten indexable additions. Local build success does not establish live deployment or Google indexing.

---

Historical implementation notes follow; publication counts below describe the earlier draft release.

# SEO content and publishing workflow — 10 November 2026

## Implemented
- [x] All 100 requested titles retained in ten clusters. All 100 now have complete concise article bodies. The earlier 71 consolidation decisions and 19 research holds are no longer substitutes for bodies: overlap and evidence warnings remain publication-review flags. Existing 16 published articles are unchanged.
- [x] File-backed content management, private previews, explicit approval/publish/archive commands, canonical/route checks, duplicate-body checks and current-content review signatures.
- [x] Server-rendered blog search, pagination, category and tag navigation, existing table of contents/reading time/related guides, sharing links and CTAs.
- [x] Programmatic framework for cities, restaurant types, features, comparisons, calculators, resources and website demonstrations. Existing restaurant-type routes take priority over overlapping candidates.
- [x] Sitemap uses only valid published content; invalid published records fail prebuild. Tracking route allowlist and JSON exports regenerate before build.
- [x] Five working calculators retained as private drafts, consistent with the latest instruction to keep unreviewed content unpublished. All five can be exercised in localhost preview.
- [x] Fifteen usable editable/printable HTML worksheets. Source assets stay outside public/. Production downloads require a published reviewed resource and matching asset digest.
- [x] All 63 programmatic records now contain page text: 10 cities, 12 restaurant types, 8 features, 5 comparisons, 5 calculators, 15 resources and 8 website-template selection guides. The eight actual working website previews still require approved evidence; no fabricated galleries/screenshots.
- [x] Calculator-use and resource-download-click events reuse consent-gated analytics without numeric values or form content.

## Single source and editing
Edit src/data/editorial.json for new articles and src/data/programmatic.json for pages. Existing published articles remain in src/lib/blog-data.ts. Do not edit generated copies in content/seo or src/lib/tracking-paths.ts. Run npm run seo:sync to validate and regenerate them. The JSON exports are review artifacts, not an additional CMS database.

Article metadata includes the original title, slug, cluster, keywords, intent, body, related IDs, sources, author, dates, status, canonical and review decisions. Publication adapts approved content into the existing BlogPosting renderer. Review the publishable title/meta description carefully: an original requested title is not proof that a top-ten ranking or guaranteed benefit can be supported.

## Commands
Commands run from the repository root. None pushes Git or deploys.

    npm run seo:validate
    npm run seo:sync
    npm run seo:content -- create --kind article --slug example-topic --title "Example topic"
    npm run seo:content -- create --kind page --slug example-page --title "Example page" --type feature --path /features/example-page
    npm run seo:content -- preview editorial-1-8
    npm run seo:content -- review editorial-1-8
    npm run seo:content -- approve editorial-1-8 --reviewer "Actual reviewer name"
    npm run seo:content -- publish editorial-1-8
    npm run seo:content -- draft editorial-1-8
    npm run seo:content -- archive editorial-1-8

Approval is refused until the body, sources, distinctIntent and verificationStatus are complete and blockers are cleared. A named reviewer must actually check them. Do not invent a reviewer or flip verification flags just to pass the command. Approval stores a signature of the reviewed content. Subsequent content or metadata edits invalidate it; return to draft and review again. A resource also binds its actual file digest. Published dates are assigned at publication, not invented for drafts. Approved alone is still private. Publication is a local source-state change; the live website changes only after the owner deploys.

The CLI prevents obvious collisions and exact duplicate bodies. It cannot establish originality, source truth or distinct search intent by itself. Consolidation decisions and supplier rankings still need editorial judgement; none of the candidate records was approved or published during this work.

## Local preview and resource review
The offline preview command writes escaped HTML to .seo-preview/ (ignored by Git). A resource preview also copies the editable worksheet there. These files are not public routes.

For the real React calculator/article/page rendering:

    npm run seo:preview-server

This binds Next development mode to 127.0.0.1:3112 with SEO_LOCAL_PREVIEW=1. Open /review-content for the complete private library, or /review-content/CONTENT_ID for one draft. The route and draft resource downloads return 404 in production even if that environment flag is accidentally present. Do not expose the development server through a public tunnel. The worksheet can be edited, extended with rows and printed/saved as PDF. It performs no automatic accounting calculations and sends no data to a server.

## Routing, metadata and indexing
All existing production canonicals remain. The new article and programmatic records are private by default; missing/draft/archived public slugs return 404. Existing /solutions entries win over candidate aliases. Published programmatic pages use the shared WebPage and breadcrumb renderer; article pages use BlogPosting with real publication dates. Resource downloads send X-Robots-Tag:noindex and attachment headers.

The first blog listing page remains indexable. Search and later pagination variants use noindex with the /blog canonical. Category/tag collections have self-canonicals and noindex; they organize published articles without competing for product intent. Sitemap entries include only canonical published records and real stored update dates. There are still 43 indexable sitemap URLs until the owner publishes reviewed content.

No new city page, unsupported feature, competitor ranking, customer result or commission-free product claim has been published. Restrova pricing remains PKR 10000 onboarding and max(PKR 5000, 1% of processed sales) monthly.

## Evidence holds, not missing software
The restaurant-type and city candidates need actual implementation/local evidence before publication. QR and WhatsApp ordering need verified product support. Eight website-template entries need real working demonstrations. All 100 requested articles are drafted. Existing overlap targets remain visible because complete drafts are not proof that all 100 deserve separate indexable URLs. Current competitor pages are research references, not authority for a universal ranking.

An initial public search review and official Indolj/Blink documentation checks were performed. A full Pakistan-local SERP study, search volumes, rankings and Search Console metrics were not available and are not fabricated. Actual indexing and live analytics require owner deployment/account access. Existing privacy-policy approval remains separate from the content workflow.

## Ninety-day rollout
Days 1–30: review the 100 completed drafts in small batches, resolve overlap decisions, verify resource field names and demonstrate all tools. Publish only the content with clear value and current evidence. Days 31–60: inspect Search Console indexing/canonical choices and compare query intent to landing pages; use evidence to choose the next distinct drafts. Days 61–90: expand city/industry coverage only where local or workflow evidence exists. Track impressions, clicks, CTR, position, qualified demo leads and conversion rate by landing-page type. Leave unknown metrics blank. No trial-signup goal is configured because no verified trial flow exists.

## Deployment handoff
Run npm run seo:validate, npm run test:content-complete, npm run test:seo-engine, existing tests, lint and build. The prebuild step validates review signatures and regenerates sitemap-related tracking paths/exports. Include content/resources in deployment; Next output tracing explicitly includes its HTML assets. Review changes, then push and deploy yourself. Afterwards run the SEO/GEO release checks against the live origin and inspect indexing in Search Console. No publication, push or deployment has been performed here.

## Completed content continuation — 10 November 2026

All 100 original titles, slugs and canonicals are preserved. There are no empty article bodies or empty programmatic records. The article drafts contain 39751 words in total (346–510 words each); these are concise complete drafts, not 1,200–2,000-word long-form articles. All require human review and remain unpublished. Current supplier source links and dated research notes are included where comparisons discuss vendor facts. No ranking, country eligibility or absent competitor feature is inferred. The private library provides all 163 review links. Content validation checks bodies, metadata, related IDs, source references and internal links before publication; rendering now handles numbered steps and programmatic citation links.

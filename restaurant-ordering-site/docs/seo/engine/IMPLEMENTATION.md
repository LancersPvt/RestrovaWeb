# SEO content and publishing workflow — 10 November 2026

## Implemented
- [x] All 100 requested titles retained in ten clusters. Ten focused original article drafts are complete; the other 90 have explicit consolidation or research decisions, with target URLs and reasons. These 90 are NOT represented as completed articles. Existing 16 published articles are unchanged.
- [x] File-backed content management, private previews, explicit approval/publish/archive commands, canonical/route checks, duplicate-body checks and current-content review signatures.
- [x] Server-rendered blog search, pagination, category and tag navigation, existing table of contents/reading time/related guides, sharing links and CTAs.
- [x] Programmatic framework for cities, restaurant types, features, comparisons, calculators, resources and website demonstrations. Existing restaurant-type routes take priority over overlapping candidates.
- [x] Sitemap uses only valid published content; invalid published records fail prebuild. Tracking route allowlist and JSON exports regenerate before build.
- [x] Five working calculators retained as private drafts, consistent with the latest instruction to keep unreviewed content unpublished. All five can be exercised in localhost preview.
- [x] Fifteen usable editable/printable HTML worksheets. Source assets stay outside public/. Production downloads require a published reviewed resource and matching asset digest.
- [x] Eight website-template candidates held for actual approved demonstrations; no fabricated galleries/screenshots.
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

This binds Next development mode to 127.0.0.1:3112 with SEO_LOCAL_PREVIEW=1. Open /review-content/CONTENT_ID. The route and draft resource downloads return 404 in production even if that environment flag is accidentally present. Do not expose the development server through a public tunnel. The worksheet can be edited, extended with rows and printed/saved as PDF. It performs no automatic accounting calculations and sends no data to a server.

## Routing, metadata and indexing
All existing production canonicals remain. The new article and programmatic records are private by default; missing/draft/archived public slugs return 404. Existing /solutions entries win over candidate aliases. Published programmatic pages use the shared WebPage and breadcrumb renderer; article pages use BlogPosting with real publication dates. Resource downloads send X-Robots-Tag:noindex and attachment headers.

The first blog listing page remains indexable. Search and later pagination variants use noindex with the /blog canonical. Category/tag collections have self-canonicals and noindex; they organize published articles without competing for product intent. Sitemap entries include only canonical published records and real stored update dates. There are still 43 indexable sitemap URLs until the owner publishes reviewed content.

No new city page, unsupported feature, competitor ranking, customer result or commission-free product claim has been published. Restrova pricing remains PKR 10000 onboarding and max(PKR 5000, 1% of processed sales) monthly.

## Evidence holds, not missing software
The restaurant-type and city candidates need actual implementation/local evidence before publication. QR and WhatsApp ordering need verified product support. Eight website-template entries need real working demonstrations. The 90 merge/research decisions preserve every requested title without pretending each deserves an independent article. Current competitor pages are research references, not authority for a universal ranking.

An initial public search review and official Indolj/Blink documentation checks were performed. A full Pakistan-local SERP study, search volumes, rankings and Search Console metrics were not available and are not fabricated. Actual indexing and live analytics require owner deployment/account access. Existing privacy-policy approval remains separate from the content workflow.

## Ninety-day rollout
Days 1–30: review the ten drafts, resolve merge decisions, verify resource field names and demonstrate all tools. Publish only the content with clear value and current evidence. Days 31–60: inspect Search Console indexing/canonical choices and compare query intent to landing pages; use evidence to choose the next distinct drafts. Days 61–90: expand city/industry coverage only where local or workflow evidence exists. Track impressions, clicks, CTR, position, qualified demo leads and conversion rate by landing-page type. Leave unknown metrics blank. No trial-signup goal is configured because no verified trial flow exists.

## Deployment handoff
Run npm run seo:validate, npm run test:seo-engine, existing tests, lint and build. The prebuild step validates review signatures and regenerates sitemap-related tracking paths/exports. Include content/resources in deployment; Next output tracing explicitly includes its HTML assets. Review changes, then push and deploy yourself. Afterwards run the SEO/GEO release checks against the live origin and inspect indexing in Search Console. No publication, push or deployment has been performed here.

# Restrova GTM + GA4 handoff

Implemented locally, 9 November 2026. Container: **GTM-PHGQ9PVS**. GA4 destination: **G-F7JJ6SY4ET**. No GTM/GA4 account tools or authenticated publishing access were available. No container changes, publication, deployment, Search Console linking or live DebugView verification were performed. The owner must configure the container before activating the deployed code. This document supersedes the dormant-adapter status in Phase 4 documentation.

## Audit and installation

Before: one unconditional Meta Pixel 2124022461583064 in root layout, including a noscript image; a Meta Lead after acknowledged scheduling; disabled Phase 4 growth helpers; no GA4, GTM, CMP or cookie-choice UI in source. Initial Git working tree was clean. No backend/CRM destination changes.

Now: TrackingConsent mounts once in root layout. The client consent store initializes dataLayer and queues Consent Mode v2 default denial. GTM's standard startup event (`gtm.start` and `event: gtm.js`) and asynchronous gtm.js loader run once, only with analytics consent. No independent gtag.js, GA4 config command, second container or additional Meta installation was added. The Arguments-form consent commands are a local queue API, not an independent GA4 installation.

The GTM noscript iframe is deliberately omitted: a JavaScript-disabled visitor cannot give this UI's consent, and an unconditional iframe would bypass the basic consent gate. The old Meta noscript tracking image was removed for the same reason. Public content and demo functionality are otherwise unchanged.

## Consent and privacy behavior

- Both optional categories start off worldwide. Equal-choice buttons: Reject optional, Save choices, Accept both. Analytics and marketing checkboxes are separate and initially unchecked. Reopen Cookie settings at the bottom left.
- Only versioned, valid choices younger than 180 days are restored. Corrupt, expired, future-dated or unavailable storage means off. A denied choice is remembered, not silently replaced. Storage failure allows a session-only choice.
- Analytics permission loads Google; marketing permission loads Meta. Marketing consent never grants Google advertising consent. ad_storage, ad_user_data and ad_personalization stay denied.
- Withdrawing an active category disables app dispatch, sends the relevant denial/revoke command, attempts to remove its readable first-party cookies and reloads the document to terminate loaded scripts. This does not erase historical provider records or third-party cookies. Changes in another tab are respected through the storage event.
- No pre-consent interactions are queued for later delivery. The current page is recorded once when analytics is accepted. Preferences are essential local browser storage, not an analytics event.
- Custom payloads use an allowlist of public routes; URL query strings, fragments, arbitrary titles, form values and raw referrers are excluded. Recognized Google/Bing/DuckDuckGo/Yahoo referrers retain only their public origin for basic organic attribution. Other referrers are blank. UTM/click-ID attribution and arbitrary referrer detail are intentionally not forwarded by these events.
- GA4/Meta still process their usual technical/device and network information when enabled; this implementation does not claim anonymous processing or legal certification. The existing privacy policy remains a review draft/noindex; its factual tracking section has been updated.
- Meta automatic configuration is disabled. Its PageView/Lead are suppressed on URLs with queries/fragments or an unrecognized path, or a referrer with a query/fragment, because the SDK reads document URLs itself. This intentionally reduces Meta coverage. Meta stays in source; do NOT add another Meta tag in GTM.

## Exact owner GTM configuration

1. Open the existing GTM-PHGQ9PVS workspace. Audit current tags/destinations first. Reuse an existing Google tag for G-F7JJ6SY4ET if present; do not create a duplicate. Check that hosting/CMS integrations do not inject another container or GA script.
2. Create Data Layer Variables (Version 2): `page_path`, `page_location`, `page_title`, `page_referrer`, `cta_location`. Name them `DLV - page_path`, etc. Do not use built-in Page URL, Referrer, Click Text, form-field, user ID or user-provided-data variables in these tags. The site publishes safe initial context before gtm.js and resets cta_location to null when absent, preventing stale CTA values.
3. Create/reuse one **Google tag**, Tag ID **G-F7JJ6SY4ET**, Initialization – All Pages trigger. If the UI presents the newer Google Analytics destination configuration, use that equivalent, not both. Set `send_page_view` to boolean false; `allow_google_signals` and `allow_ad_personalization_signals` to false. Set page_location, page_title and page_referrer from their DLVs. Require additional consent `analytics_storage`. Do not add advertising destinations or automatic user-provided-data collection.
4. In the GA4 web stream, disable Enhanced Measurement for this manual setup, especially page views on browser-history changes and form interactions. Also disable any separate automatic page-view/history/form tags or GA-created events that duplicate these events. The app supplies the one page-view path. Otherwise send_page_view=false alone does not stop history-based duplicates.
5. Create five Custom Event triggers, exact event-name match (no regex needed), and five GA4 Event tags targeting **G-F7JJ6SY4ET**:

| Data layer event / GA4 event name | Trigger | Parameters |
| --- | --- | --- |
| demo_cta_click | demo_cta_click | page_path, cta_location |
| demo_form_start | demo_form_start | page_path, cta_location |
| generate_lead | generate_lead | page_path, cta_location |
| pricing_view | pricing_view | page_path |
| customer_case_study_view | customer_case_study_view | page_path |

For every Event tag also map page_location, page_title and page_referrer from the safe DLVs. Require analytics_storage for every tag, use firing option Once per event and the same Google tag/destination. Do not create a second generic catch-all event tag or a submit-click lead trigger. Register cta_location as an event-scoped custom dimension only if needed for reporting; page_path is available for custom reporting without collecting a full raw URL.

6. Add one extra Custom Event trigger **restrova_page_view**, and a GA4 Event tag with GA4 name **page_view**. Map page_path, page_location, page_title and page_referrer. Require analytics_storage. Use this tag for initial and client-side navigations; do not also use a History Change trigger. Google tag setup must precede event tags; verify the Initialization trigger order in Preview.
7. Consent defaults/updates are queued by the site before container startup. Do not add a template that unconditionally grants or overwrites this state. Confirm all Google tags show analytics_storage granted only after Analytics is accepted and all ad permissions remain denied. This is basic consent mode: no container/Google request before analytics acceptance. If migrating to a CMP/template later, replace the integration coherently instead of running competing consent managers.
8. Preview all scenarios below, then have the authorized owner explicitly approve and publish the reviewed workspace version. This implementation did not publish it. Never mark generate_lead a key event until the confirmed success path has been verified.

## Event semantics and duplicate prevention

demo_cta_click: same-origin anchor to /contact or /#contact; location is header/footer/content. demo_form_start: first trusted input/change in a marked intake or scheduling form; location intake/schedule. generate_lead: only response.ok AND result.ok=true AND a stable eventId from /api/demo/schedule; location schedule. Unqualified intake, submit clicks, validation failures and CRM errors are not qualified leads. pricing_view and customer_case_study_view fire once per path/document after permission. page_view fires once on initial acceptance and each subsequent path transition, with immediate duplicates suppressed; revisiting a page after another page is a legitimate new view.

Existing event helpers deduplicate stable lead IDs in bounded document memory. Backend duplicate/acknowledgement safeguards remain. This is not cross-device exactly-once delivery. The internal lead event ID never enters the Google dataLayer. Meta uses the existing opaque eventID for its own deduplication. Five explicit trigger/tag pairs avoid overlapping generic triggers. No cta_text (which can contain uncontrolled text), form contents or unnecessary lead parameters are sent.

## Local and owner validation

Local: npm run test:growth; npm run test:tracking; npm run test:demo; npm run lint; npx tsc --noEmit; npm run build. Browser tests use intercepted vendor scripts and intercepted local demo APIs: no real lead submission and no Google/Meta delivery. Validate first-visit/reject, analytics-only, marketing-only, both, persisted/expired choice, withdrawal and JavaScript disabled. Check one GTM bootstrap, one script each, all five event names, safe payloads and exactly one acknowledged lead. Confirm failed acknowledgement produces no lead. Test SPA navigation and consent panel at mobile width.

Owner Preview/Tag Assistant: connect the unpublished workspace to the deployed/staging URL, clear only the test browser's choice, and expect no connection/tag before analytics is accepted. Inspect consent Default/Update ordering, one Google tag, one manual page_view and one matching GA4 Event tag per custom event. Ensure raw URL query strings and form information are absent from GA requests, not just the dataLayer. Check ad permissions denied even when Meta marketing is accepted. Decline/revoke and confirm no new measurement events. Do not use a URL debug flag to permanently enable debug mode in production.

GA4 DebugView: use Tag Assistant or temporary preview-only debug_mode=true on the test event tags. Inspect event names, page_path, cta_location and safe page context. A real end-to-end generate_lead test requires an authorized staging/test CRM destination or explicit permission for a production test lead; none was submitted here. Verify failure then acknowledged success, retries and page refresh. Remove temporary debug settings before publication.

GA4 Realtime: after the owner publishes and deploys, accept analytics in the test browser and confirm one user/session's intended page views and custom events. Realtime appearance alone does not prove consent, attribution or duplicate correctness. Mark generate_lead as a key event only after verified acknowledgement behavior, and distinguish scheduled leads from paying customers. Live DebugView/Realtime status remains NOT VERIFIED.

## Existing Search Console property

Do not recreate restrova.com verification. With GA4 Editor permission and verified-owner access to the existing Search Console property: GA4 Admin → Product links → Search Console Links → Link → Choose accounts → select the existing restrova.com property → Confirm → Next → select the web stream whose Measurement ID is G-F7JJ6SY4ET → review and submit. Check that the property/stream cover the same pages. If a link already exists, inspect it rather than duplicating or deleting it. Publish the Search Console report collection from Reports Library if needed. This link has NOT been performed here.

## References

- Google GTM/GA4 setup: https://support.google.com/tagmanager/answer/9442095
- Consent defaults and updates: https://developers.google.com/tag-platform/security/guides/consent
- SPA page-view duplication: https://developers.google.com/analytics/devguides/collection/ga4/measure-spa-gtm
- Search Console linking: https://support.google.com/analytics/answer/10737381

Deployment readiness: local integration can be reviewed and built; production measurement additionally requires the owner configuration, Preview checks, explicit GTM publication and code deployment. No ranking or AI-visibility outcome is implied.

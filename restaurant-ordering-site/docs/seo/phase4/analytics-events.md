UPDATE: the later GTM integration now supplies an explicit consent UI and transport for this adapter. See ../../analytics/gtm-ga4-setup.md. The original Phase 4 status below is historical.

# Analytics event contract

Status: hooks implemented; adapter DISABLED by default. No GA4 ID, gtag/GTM script, event queue, cookie or network transport installed. Existing Meta behavior preserved. No production property changes made.

| Event | Trigger | Allowed fields |
| --- | --- | --- |
| demo_cta_click | Intentional same-origin link click to /contact or /#contact | page_path, cta_location (header/footer/content) |
| demo_form_start | First trusted change in an explicitly marked intake/schedule form | page_path, cta_location (intake/schedule) |
| generate_lead | Successful scheduling response with stable backend eventId | page_path=/demo/schedule, cta_location=schedule |
| pricing_view | Pricing route entry while adapter enabled; once per path/document | page_path |
| customer_case_study_view | Customer route entry while enabled; once per path/document | page_path |

No form values, names, email, phone, restaurant identity, full query strings, arbitrary CTA text or referrer URLs are passed. Unknown paths collapse to /other. Internal event IDs are used only for in-memory deduplication, never included in analytics payloads. No replay when consent is granted later. Form changes made before consent do not become queued events. Sender failures cannot interrupt submission. Deduplication is bounded and local to the document; this is not cross-device exactly-once delivery.

Integration owner steps:
1. Confirm the intended existing GA4 property/stream and whether GTM already supplies analytics outside this repository. Do not add a second installation.
2. Establish an explicit consent source and approved analytics configuration. From the client integration, import configureGrowthAnalytics from src/lib/growth-events.ts.
3. Only after consent and GA4 readiness, call configureGrowthAnalytics({consent:true, send:(event,payload)=>window.gtag('event',event,payload)}), using the site's typed GA4 adapter. This is a wiring example, not enabled code. On withdrawal call configureGrowthAnalytics({consent:false}). Never use unconditional consent=true.
4. Verify DebugView with synthetic local/staging responses. Confirm no event before consent, one form-start, no lead on validation/network/CRM error, and one qualified lead on an acknowledged schedule eventId. Check no personal fields appear.
5. In the authorized GA4 property mark generate_lead as a key event after verification. Do not mark submit clicks or intake navigation as qualified leads. Keep existing Meta Lead a separate platform measurement.
6. Use session default channel group Organic Search, landing page and agreed attribution window to compare CTA clicks, starts and successful leads. Distinguish event counts from unique sessions/users. This site flow defines generate_lead as acknowledged qualified scheduling, not every enquiry.

Late consent does not retroactively emit page views. Optional pricing/case events should be enabled only if useful beyond the existing page_view report. Domain privacy/consent review and account configuration remain owner actions.

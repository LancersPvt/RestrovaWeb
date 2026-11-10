# Additional SEO resource events

The existing consent-gated transport now accepts calculator_use and resource_download. Add exact Custom Event triggers and matching GA4 event tags in the existing GTM container, using the same measurement ID, safe page context and analytics_storage requirement as the five existing events. No container was changed/published here.

calculator_use fires after a successful calculation. No revenue, costs, order counts, percentages, results or other entered values are sent. Recalculation is a separate deliberate use, not a completed lead.

resource_download fires on a deliberate download-link click. It measures intent, not confirmed download completion. It sends only the allowlisted page_path and cta_location=content plus the transport's existing safe page context. Do not add automatic form or file events that duplicate this path. Both events stay silent without analytics consent. New draft resources are unavailable publicly until reviewed and published.

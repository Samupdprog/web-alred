# Analytics Plan

Analytics should help Alred understand traffic quality, lead intent and conversion paths without polluting components.

## Recommended Stack

- Google Analytics 4 for acquisition, campaign and conversion reporting.
- Google Search Console for search visibility.
- Vercel Analytics or Speed Insights for performance monitoring if deployed on Vercel.
- PostHog or a similar product later for heatmaps, funnels and session behavior.

## Event Model

Core events:

- `generate_lead`: contact form submitted.
- `cta_click`: important CTA clicked.
- `contact_method_click`: phone, email or WhatsApp clicked.
- `service_view`: service section or service page viewed.
- `language_switch`: visitor changes locale.

Provider-specific calls should live behind a central analytics helper.

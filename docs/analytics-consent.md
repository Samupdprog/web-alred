# Analytics consent

Alred uses two consent-gated analytics services:

- Google Analytics 4, configured with `NEXT_PUBLIC_GA_ID`.
- Microsoft Clarity, configured with `NEXT_PUBLIC_CLARITY_ID`.

Neither service is loaded before the visitor accepts the `analytics` category. Rejecting or withdrawing consent stores only the versioned preference in first-party `localStorage` under `alred-consent`.

## Clarity dashboard setup

In Microsoft Clarity, open **Settings / Setup** and configure Consent Mode so that Clarity does not set analytics storage automatically before receiving a valid consent signal. The application sends:

```js
window.clarity("consentv2", {
  analytics_Storage: "granted" | "denied",
  ad_Storage: "denied"
});
```

`ad_Storage` must remain `denied`; Alred does not use personalised advertising. Do not configure Clarity to identify visitors or leads. Contact forms remain masked with `data-clarity-mask="true"`, and form data is never sent to Google Analytics or Clarity.

## Application behaviour

The consent panel is rendered inside the locale layout and supports Spanish and English. The Footer's **Configurar cookies** button reopens the preferences without navigation. The consent version is currently `2026-09-15`; changing it makes the panel appear again.

Google Analytics page views use only the pathname and are sent after the scripts are loaded. Query parameters and form fields are not forwarded.

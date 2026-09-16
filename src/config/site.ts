export const siteConfig = {
  name:
    "Alred",

  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://alred.es",

  email:
    "info@alred.es",

  phone:
    "+34683382977",

  phoneDisplay:
    "683 382 977",

  description: {
    es:
      "Alred desarrolla soluciones digitales a medida para empresas: software de gestión, automatizaciones, integraciones, dashboards, páginas web, ecommerce, analítica y marketing digital medible.",

    en:
      "Alred builds custom digital solutions for businesses: management software, automations, integrations, dashboards, websites, ecommerce, analytics and measurable digital marketing.",
  },

  locales:
    [
      "es",
      "en",
    ] as const,

  defaultLocale:
    "es" as const,
};


export type SiteLocale =
  (typeof siteConfig.locales)[number];

import {
  siteConfig,
} from "@/config/site";


function baseUrl() {
  return siteConfig.url.replace(
    /\/+$/,
    "",
  );
}


export function organizationSchema() {
  const url =
    baseUrl();


  return {
    "@context":
      "https://schema.org",

    "@type":
      "Organization",

    "@id":
      `${url}/#organization`,

    name:
      siteConfig.name,

    url,

    logo:
      `${url}/svg/Logos/logo-alred.svg`,

    email:
      siteConfig.email,

    telephone:
      siteConfig.phone,

    description:
      siteConfig.description.es,

    knowsAbout: [
      "Software a medida",
      "Software de gestión",
      "Automatización de procesos",
      "Integración de sistemas",
      "Herramientas internas de gestión",
      "Dashboards",
      "Analítica empresarial",
      "Desarrollo web",
      "Ecommerce",
      "Sistemas de reservas",
      "Marketing digital",
      "Campañas digitales",
      "Medición de campañas",
      "Analítica SEO",
      "Optimización de procesos",
    ],
  };
}


export function websiteSchema() {
  const url =
    baseUrl();


  return {
    "@context":
      "https://schema.org",

    "@type":
      "WebSite",

    "@id":
      `${url}/#website`,

    url,

    name:
      siteConfig.name,

    publisher: {
      "@id":
        `${url}/#organization`,
    },

    inLanguage:
      siteConfig.locales,
  };
}


export function serviceSchema({
  locale,
  slug,
  name,
  description,
}: {
  locale: string;
  slug: string;
  name: string;
  description: string;
}) {
  const url =
    baseUrl();


  return {
    "@context":
      "https://schema.org",

    "@type":
      "Service",

    "@id":
      `${url}/${locale}/soluciones/${slug}#service`,

    name,

    description,

    url:
      `${url}/${locale}/soluciones/${slug}`,

    provider: {
      "@id":
        `${url}/#organization`,
    },

    serviceType:
      name,
  };
}


export function breadcrumbSchema(
  items: Array<{
    name: string;
    url: string;
  }>,
) {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    itemListElement:
      items.map(
        (
          item,
          index,
        ) => ({
          "@type":
            "ListItem",

          position:
            index + 1,

          name:
            item.name,

          item:
            item.url,
        }),
      ),
  };
}
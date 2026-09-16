import type {
  MetadataRoute,
} from "next";

import {
  siteConfig,
} from "@/config/site";

import {
  soluciones,
} from "@/datos/soluciones";

import {
  proyectos,
} from "@/datos/proyectos";


type SitemapEntryConfig = {
  path: string;

  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";

  priority: number;
};


function cleanBaseUrl(
  url: string,
) {
  return url.replace(
    /\/+$/,
    "",
  );
}


function cleanPath(
  path: string,
) {
  if (
    !path ||
    path === "/"
  ) {
    return "";
  }

  return path.startsWith("/")
    ? path
    : `/${path}`;
}


function localizedUrl(
  locale: string,
  path: string,
) {
  return `${
    cleanBaseUrl(
      siteConfig.url,
    )
  }/${locale}${cleanPath(path)}`;
}


function languageAlternates(
  path: string,
) {
  const languages =
    Object.fromEntries(
      siteConfig.locales.map(
        locale => [
          locale,

          localizedUrl(
            locale,
            path,
          ),
        ],
      ),
    );

  return {
    ...languages,

    "x-default":
      localizedUrl(
        siteConfig.defaultLocale,
        path,
      ),
  };
}


export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: SitemapEntryConfig[] = [
    {
      path:
        "",

      changeFrequency:
        "weekly",

      priority:
        1,
    },

    {
      path:
        "/soluciones",

      changeFrequency:
        "monthly",

      priority:
        0.95,
    },

    {
      path:
        "/proyectos",

      changeFrequency:
        "monthly",

      priority:
        0.9,
    },

    {
      path:
        "/nosotros",

      changeFrequency:
        "monthly",

      priority:
        0.75,
    },

    {
      path:
        "/contacto",

      changeFrequency:
        "monthly",

      priority:
        0.85,
    },
  ];


  const solutionRoutes: SitemapEntryConfig[] =
    soluciones.map(
      solucion => ({
        path:
          `/soluciones/${solucion.slug}`,

        changeFrequency:
          "monthly",

        priority:
          0.9,
      }),
    );


  const projectRoutes: SitemapEntryConfig[] =
    proyectos.map(
      proyecto => ({
        path:
          `/proyectos/${proyecto.slug}`,

        changeFrequency:
          "monthly",

        priority:
          0.8,
      }),
    );


  const routes = [
    ...staticRoutes,
    ...solutionRoutes,
    ...projectRoutes,
  ];


  return routes.flatMap(
    route =>
      siteConfig.locales.map(
        locale => ({
          url:
            localizedUrl(
              locale,
              route.path,
            ),

          changeFrequency:
            route.changeFrequency,

          priority:
            locale ===
            siteConfig.defaultLocale
              ? route.priority
              : Math.max(
                  route.priority -
                    0.05,
                  0.1,
                ),

          alternates: {
            languages:
              languageAlternates(
                route.path,
              ),
          },
        }),
      ),
  );
}

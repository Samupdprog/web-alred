import type {
  MetadataRoute,
} from "next";

import {
  siteConfig,
} from "@/config/site";


export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent:
          "*",

        allow:
          "/",

        disallow: [
          "/api/",
        ],
      },

      {
        userAgent:
          "OAI-SearchBot",

        allow:
          "/",
      },

      {
        userAgent:
          "GPTBot",

        allow:
          "/",
      },

      {
        userAgent:
          "ChatGPT-User",

        allow:
          "/",
      },
    ],

    sitemap:
      `${siteConfig.url.replace(/\/+$/, "")}/sitemap.xml`,

    host:
      siteConfig.url.replace(
        /\/+$/,
        "",
      ),
  };
}

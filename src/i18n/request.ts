import { getRequestConfig } from "next-intl/server";
import type { SiteLocale } from "@/config/site";
import { routing } from "./routing";

function isLocale(locale: unknown): locale is SiteLocale {
  return routing.locales.includes(locale as SiteLocale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = isLocale(requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

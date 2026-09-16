export function rutaConLocale(
  locale: string,
  path = "",
) {
  const normalized =
    path === "/"
      ? ""
      : path.startsWith("/")
        ? path
        : `/${path}`;

  return `/${locale}${normalized}`;
}


export const routes = {
  inicio: (
    locale: string,
  ) =>
    rutaConLocale(
      locale,
    ),

  soluciones: (
    locale: string,
  ) =>
    rutaConLocale(
      locale,
      "/soluciones",
    ),

  solucion: (
    locale: string,
    slug: string,
  ) =>
    rutaConLocale(
      locale,
      `/soluciones/${slug}`,
    ),

  proyectos: (
    locale: string,
  ) =>
    rutaConLocale(
      locale,
      "/proyectos",
    ),

  proyecto: (
    locale: string,
    slug: string,
  ) =>
    rutaConLocale(
      locale,
      `/proyectos/${slug}`,
    ),

  nosotros: (
    locale: string,
  ) =>
    rutaConLocale(
      locale,
      "/nosotros",
    ),

  contacto: (
    locale: string,
  ) =>
    rutaConLocale(
      locale,
      "/contacto",
    ),
} as const;

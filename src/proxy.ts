import createMiddleware from "next-intl/middleware";

import {
  routing,
} from "./i18n/routing";


/*
 * Next.js 16 usa `proxy.ts`.
 *
 * next-intl se encarga de:
 *
 * /contacto
 * → /es/contacto
 *
 * /soluciones
 * → /es/soluciones
 *
 * /proyectos/la-baranda
 * → /es/proyectos/la-baranda
 *
 * También mantiene correctamente las rutas
 * que ya llevan /es o /en.
 */
export default createMiddleware(
  routing,
);


export const config = {
  /*
   * Ejecutar el proxy en páginas públicas,
   * pero ignorar:
   *
   * - API
   * - recursos internos de Next
   * - Vercel
   * - archivos físicos con extensión
   *
   * Esto evita interceptar imágenes, fuentes,
   * favicon, robots, sitemap, etc.
   */
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};

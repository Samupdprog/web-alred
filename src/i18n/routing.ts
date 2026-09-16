import {
  defineRouting,
} from "next-intl/routing";


/*
 * Configuración central de idiomas de Alred.
 *
 * Regla elegida:
 * - español: idioma por defecto;
 * - inglés: segundo idioma;
 * - el prefijo SIEMPRE aparece en la URL;
 * - no usamos detección automática del navegador.
 *
 * Así:
 *
 * /contacto
 * → /es/contacto
 *
 * /soluciones/marketing-digital
 * → /es/soluciones/marketing-digital
 *
 * /en/contacto
 * → se mantiene /en/contacto
 */
export const routing =
  defineRouting({
    locales: [
      "es",
      "en",
    ],

    defaultLocale:
      "es",

    localePrefix:
      "always",

    /*
     * Queremos que una URL sin idioma vaya siempre
     * al español, independientemente del navegador.
     */
    localeDetection:
      false,
  });

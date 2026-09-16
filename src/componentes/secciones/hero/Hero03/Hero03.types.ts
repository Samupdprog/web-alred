export type Hero03CTA = {
  texto: string;
  href: string;
};

export type Hero03Props = {
  id?: string;

  titulo: string;
  descripcion?: string;

  cta: Hero03CTA;
  ctaSecundario?: Hero03CTA;

  fondoDesktop: string;
  fondoMobile?: string;

  /**
   * Si la imagen es puramente decorativa, déjalo vacío.
   * Si aporta información real, escribe una descripción breve.
   */
  fondoAlt?: string;

  /**
   * Posición de la imagen en porcentaje.
   * 0 = inicio, 50 = centro, 100 = final.
   */
  fondoX?: number;
  fondoY?: number;
  fondoXMobile?: number;
  fondoYMobile?: number;

  /**
   * Intensidad del velo claro que protege la lectura del texto.
   * 0 = sin velo, 1 = completamente blanco.
   */
  velo?: number;
  veloMobile?: number;

  /**
   * Altura mínima del hero en escritorio.
   * Se expresa como CSS válido, por ejemplo "720px" o "78svh".
   */
  minHeight?: string;
};

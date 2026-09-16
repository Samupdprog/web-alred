export type CTAFinal01Link = {
  texto: string;
  href: string;
};

export type CTAFinal01Props = {
  id?: string;

  titulo: string;
  descripcion: string;

  cta: CTAFinal01Link;

  ctaSecundario?: CTAFinal01Link;

  fondo?: string;
  fondoMobile?: string;

  fondoAlt?: string;

  /**
   * Posición horizontal de la imagen.
   *
   * 0   = izquierda
   * 50  = centro
   * 100 = derecha
   */
  fondoX?: number;

  /**
   * Posición vertical de la imagen.
   *
   * 0   = arriba
   * 50  = centro
   * 100 = abajo
   */
  fondoY?: number;

  fondoXMobile?: number;
  fondoYMobile?: number;

  /**
   * Oscurecimiento general de la imagen.
   *
   * 0    = nada
   * 0.08 = muy sutil
   * 0.15 = suave
   * 0.25 = medio
   * 0.40 = fuerte
   */
  oscurecerFondo?: number;

  /**
   * Permite utilizar un oscurecimiento
   * diferente específicamente en móvil.
   */
  oscurecerFondoMobile?: number;

  /**
   * false = texto negro
   * true = texto blanco
   */
  textoClaro?: boolean;
};
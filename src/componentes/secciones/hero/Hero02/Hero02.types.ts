export type Hero02CTA = {
  texto: string;
  href: string;
};

export type Hero02Props = {
  id?: string;

  titulo: string;
  descripcion: string;

  cta: Hero02CTA;
  ctaSecundario?: Hero02CTA;

  fondoDesktop: string;
  fondoMobile?: string;
  fondoAlt?: string;

  /** 0 = izquierda, 50 = centro, 100 = derecha */
  fondoX?: number;

  /** 0 = arriba, 50 = centro, 100 = abajo */
  fondoY?: number;

  /** Posición horizontal independiente en móvil */
  fondoXMobile?: number;

  /** Posición vertical independiente en móvil */
  fondoYMobile?: number;
};

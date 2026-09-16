export type MarketingNuevoMetrica = {
  label: string;

  valor: string;

  cambio?: string;
};


export type MarketingNuevo01Props = {
  id?: string;

  titulo?: string;

  descripcion?: string;

  ideas?: readonly string[];

  cta?: {
    texto: string;

    href: string;
  };

  ctaSecundario?: {
    texto: string;

    href: string;
  };

  fondoDesktop?: string;

  fondoMobile?: string;

  fondoX?: number;

  fondoY?: number;

  fondoXMobile?: number;

  fondoYMobile?: number;

  grafica?: {
    titulo: string;

    cambio: string;
  };

  metricas?: readonly MarketingNuevoMetrica[];


  /*
   * Compatibilidad temporal con llamadas antiguas.
   * Ya no se renderizan.
   */

  etiqueta?: string;

  meta?: readonly string[];

  puntos?: readonly string[];
};

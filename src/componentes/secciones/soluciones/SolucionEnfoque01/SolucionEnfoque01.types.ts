export type SolucionEnfoque01Props = {
  id?: string;

  titulo?: string;
  tituloSecundario?: string;
  descripcion?: string;

  cta?: {
    texto: string;
    href: string;
  };

  fondoDesktop?: string;
  fondoMobile?: string;

  fondoX?: number;
  fondoY?: number;
  fondoXMobile?: number;
  fondoYMobile?: number;
};

export type DashboardSolucion = {
  marca?: string;
  titulo?: string;
  periodo?: string;
  navegacion?: string[];
  metricas?: { label: string; value: string; change?: string; serie?: number[] }[];
  actividad?: { titulo: string; detalle?: string }[];
};

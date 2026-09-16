export type PasoDespuesEnvio = {
  titulo: string;
  descripcion: string;

  fondoDesktop: string;
  fondoMobile?: string;
  fondoAlt?: string;

  fondoX?: number;
  fondoY?: number;
  fondoXMobile?: number;
  fondoYMobile?: number;
};

export type DespuesEnvio01Props = {
  id?: string;

  titulo?: string;

  descripcion?: string;

  pasos: PasoDespuesEnvio[];
};

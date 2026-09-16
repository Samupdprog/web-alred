export type SolucionContenido = {
  titulo: string;
  descripcion: string;
  href: string;
};

export type Soluciones01Props = {
  id?: string;

  titulo: string;
  descripcion: string;

  software: SolucionContenido & {
    secundaria: {
      titulo: string;
      descripcion: string;
    };
  };

  automatizaciones: SolucionContenido;
  dashboards: SolucionContenido;
  integraciones: SolucionContenido;
};

export type SolucionSelectorItem = {
  slug: string;
  titulo: string;
  descripcion: string;
  href: string;

  imagen: string;
  imagenAlt?: string;

  imagenX?: number;
  imagenY?: number;

  imagenXMobile?: number;
  imagenYMobile?: number;
};

export type SelectorSoluciones01Props = {
  id?: string;

  titulo?: string;

  descripcion?: string;

  enlaceLabel?: string;

  soluciones: SolucionSelectorItem[];

  activa?: string;
};

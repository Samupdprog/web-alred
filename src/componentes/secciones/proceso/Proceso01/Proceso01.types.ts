export type ProcesoTarjeta = {
  titulo: string;
  descripcion: string;

  imagen: string;
  imagenMobile?: string;

  imagenAlt: string;

  posicionImagen?: string;
  posicionImagenMobile?: string;
};

export type Proceso01Props = {
  id?: string;

  titulo: string;
  descripcion?: string;

  tarjetas: ProcesoTarjeta[];
};

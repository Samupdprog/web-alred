export type ProyectoCarrusel = {
  id: string;

  nombre: string;
  categoria: string;
  descripcion?: string;

  href: string;

  logo: string;
  logoAlt: string;

  imagenDesktop: string;
  imagenMobile?: string;
  imagenAlt: string;

  posicionDesktop?: string;
  posicionMobile?: string;

  fondo?: string;
};

export type Proyectos01Props = {
  id?: string;

  titulo: string;
  descripcion?: string;

  proyectos: ProyectoCarrusel[];

  /**
   * Tiempo en segundos antes de cambiar
   * automáticamente al siguiente proyecto.
   *
   * Ejemplo:
   * segundosEntreProyectos={7}
   */
  segundosEntreProyectos?: number;

  /**
   * Activa o desactiva el autoplay.
   *
   * Por defecto: true
   */
  reproduccionAutomatica?: boolean;
};
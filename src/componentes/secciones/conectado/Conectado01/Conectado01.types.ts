export type ConectadoPunto = {
  texto: string;
};

export type ConectadoCTA = {
  texto: string;
  href: string;
};

export type ConectadoVisual = {
  titulo: string;
  subtitulo: string;
  descripcion: string;
};

export type ConectadoMarca = {
  src: string;
  alt: string;
};

export type ConectadoPrueba = {
  texto: string;
  marcas: ConectadoMarca[];
};


/* =========================================================
   ÓRBITA
   ========================================================= */

export type ConectadoOrbitaIcono = {
  /**
   * Nombre descriptivo.
   *
   * Ejemplo:
   * "Google Drive"
   */
  nombre: string;

  /**
   * Solo el nombre del archivo.
   *
   * Ejemplo:
   * "google-drive.svg"
   */
  archivo: string;
};


export type ConectadoOrbita = {
  /**
   * Logo central.
   */
  logo?: string;

  /**
   * Carpeta común donde están los iconos.
   *
   * Por defecto:
   * /images/iconos/integraciones
   */
  carpetaIconos?: string;

  /**
   * Tiempo de una vuelta completa.
   *
   * 30 = más rápido
   * 42 = recomendado
   * 55 = más lento
   */
  velocidadSegundos?: number;

  iconos: ConectadoOrbitaIcono[];
};


/* =========================================================
   PROPS
   ========================================================= */

export type Conectado01Props = {
  id?: string;

  titulo: string;

  introduccion: string;

  puntos?: ConectadoPunto[];

  cta: ConectadoCTA;


  /* =======================================================
     FONDO
     ======================================================= */

  fondo: string;

  fondoMobile?: string;

  fondoAlt?: string;

  /**
   * Se mantiene para compatibilidad con tu configuración
   * anterior.
   *
   * Ejemplo:
   * "center"
   * "center top"
   */
  fondoPosition?: string;

  fondoPositionMobile?: string;


  /**
   * Activa el efecto:
   *
   * la imagen parece quedarse quieta mientras el
   * contenedor pasa por encima al hacer scroll.
   */
  efectoFondoFijo?: boolean;


  /**
   * Posición vertical del fondo en desktop.
   *
   * 0   = arriba
   * 50  = centro
   * 100 = abajo
   */
  fondoY?: number;


  /**
   * Posición vertical independiente para móvil.
   *
   * Si no se indica, utiliza fondoY.
   */
  fondoYMobile?: number;


  /* =======================================================
     CONTENIDO VISUAL
     ======================================================= */

  visual: ConectadoVisual;

  prueba?: ConectadoPrueba;


  /* =======================================================
     ÓRBITA OPCIONAL
     ======================================================= */

  orbita?: ConectadoOrbita;
};
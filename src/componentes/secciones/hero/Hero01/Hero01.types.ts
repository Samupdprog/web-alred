export type Hero01Props = {
  titulo: string;
  descripcion: string;

  cta: {
    texto: string;
    href: string;
  };

  /**
   * Rutas relativas desde /public.
   *
   * Ejemplo:
   * public/images/Demostraciones/dashboard.webp
   *
   * se escribe:
   * /images/Demostraciones/dashboard.webp
   */
  img1: string;
  img2: string;
  img3: string;

  altImg1?: string;
  altImg2?: string;
  altImg3?: string;

  posicionImg1?: string;
  posicionImg2?: string;
  posicionImg3?: string;

  /**
   * Hace que las imágenes de los tres paneles
   * parezcan quedarse quietas mientras el Hero
   * se desplaza con el scroll.
   *
   * Desktop / tablet grande.
   *
   * En móvil se desactiva automáticamente para
   * evitar problemas de Safari/iOS.
   */
  efectoImagenFija?: boolean;

  textoIzquierda?: {
    titulo: string;

    enlace?: {
      texto: string;
      href: string;
    };
  };

  textoCentro?: {
    titulo?: string;
  };

  textoPrincipal?: {
    titulo: string;
    descripcion: string;
  };
};
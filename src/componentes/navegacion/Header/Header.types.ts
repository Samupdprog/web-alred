export type HeaderLink = {
  texto:
    string;

  href:
    string;

  externo?:
    boolean;
};


export type HeaderTarjeta = {
  titulo:
    string;

  descripcion:
    string;

  /*
   * Página general de la tarjeta.
   *
   * Soluciones:
   * /es/soluciones
   *
   * Proyectos:
   * /es/proyectos
   *
   * Alred:
   * /es/nosotros
   */
  href:
    string;

  enlacePrincipalLabel?:
    string;

  imagen:
    string;

  posicionImagen?:
    string;

  oscuro?:
    boolean;

  enlaces:
    HeaderLink[];
};


export type HeaderProps = {
  logo?:
    string;

  logoAlt?:
    string;

  inicioHref?:
    string;

  cta: {
    texto:
      string;

    href:
      string;
  };

  tarjetas:
    HeaderTarjeta[];

  idioma: {
    actual:
      string;

    textoAccesible:
      string;

    /*
     * Aquí solo se pasa la raíz del otro idioma:
     *
     * /es
     * /en
     *
     * Header conserva el resto de la ruta.
     */
    href:
      string;
  };
};

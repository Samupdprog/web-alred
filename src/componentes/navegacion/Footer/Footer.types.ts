export type FooterLink = {
  texto: string;
  href: string;
};

export type FooterGrupo = {
  titulo: string;
  enlaces: FooterLink[];
};

export type FooterRed = {
  tipo:
    | "instagram"
    | "linkedin"
    | "email";

  href: string;
  label?: string;
};

export type FooterProps = {
  logo?: string;
  logoAlt?: string;

  inicioHref?: string;

  marca?: string;

  /*
   * Texto gigante inferior.
   * Ejemplo: "ALRED"
   */
  marcaGrande?: string;

  descripcion: string;

  grupos: FooterGrupo[];

  email: string;

  contactoTitulo?: string;

  ubicacion?: string;

  cta: FooterLink;

  redes?: FooterRed[];

  legales?: FooterLink[];

  configurarCookiesTexto?: string;

  copyright?: string;

  volverArribaTexto?: string;

  volverArribaHref?: string;

  /**
   * Intensidad del texto ALRED base.
   *
   * 0.03 = casi imperceptible
   * 0.055 = recomendado
   * 0.10 = bastante visible
   */
  marcaGrandeOpacidad?: number;

  /**
   * Intensidad del brillo cromático
   * que recorre ALRED.
   *
   * 0.15 = muy sutil
   * 0.28 = recomendado
   * 0.50 = bastante visible
   */
  marcaGrandeBrilloOpacidad?: number;

  /**
   * Duración de un recorrido completo.
   *
   * 6 = rápido
   * 8 = recomendado
   * 12 = muy suave/lento
   */
  marcaGrandeBrilloSegundos?: number;
};
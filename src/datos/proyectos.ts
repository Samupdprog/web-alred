import {
  proyectosEn,
} from "./proyectos-en";


export type Proyecto = {
  slug: string;

  nombre: string;

  heroTitulo: string;

  heroDescripcion: string;

  categoria: string;

  descripcion: string;

  logo: string;

  imagenDesktop: string;

  imagenMobile: string;

  imagenAlt: string;

  /**
   * Ajuste opcional del encuadre de la imagen.
   *
   * Ejemplos:
   * "center"
   * "center top"
   * "65% center"
   */
  imagenPosicion?: string;

  imagenPosicionMobile?: string;

  funciones: string[];
};


/* =========================================================
   PROYECTOS
   ========================================================= */

export const proyectos: Proyecto[] = [
  {
    slug: "index-clima",

    nombre: "Index Clima",

    heroTitulo:
      "Proyecto digital para Index Clima",

    heroDescripcion:
      "Una herramienta interna creada para ayudar al equipo a trabajar con más claridad, reducir tareas dispersas y tener el control del negocio en un mismo lugar.",

    categoria:
      "Gestión interna · Presupuestos · Automatización",

    descripcion:
      "Una solución digital para centralizar procesos, presupuestos y herramientas internas alrededor del funcionamiento real de la empresa.",

    logo:
      "/images/Logos/logo_indexclima.ico",

    imagenDesktop:
      "/images/Demostraciones/proyecto-index-clima-presupuestos-desktop.png",

    imagenMobile:
      "/images/Demostraciones/proyecto-index-clima-presupuestos-mobile.png",

    imagenAlt:
      "Sistema de gestión desarrollado para Index Clima",

    imagenPosicion:
      "center",

    imagenPosicionMobile:
      "center",

    funciones: [
      "Gestión interna",
      "Presupuestos",
      "Automatizaciones",
      "Integración con Holded",
      "Control de costes",
      "Checklists",
    ],
  },

  {
    slug: "la-baranda",

    nombre: "La Baranda",

    heroTitulo:
      "Proyecto digital para La Baranda",

    heroDescripcion:
      "Diseñamos una solución conectada para organizar la actividad diaria del negocio y facilitar la relación entre reservas, pagos, avisos y equipo.",

    categoria:
      "Reservas · Gestión · Automatización",

    descripcion:
      "Reservas, pagos, avisos y herramientas internas conectadas alrededor del funcionamiento diario del negocio.",

    logo:
      "/images/Logos/logo_baranda.ico",

    imagenDesktop:
      "/images/Demostraciones/proyecto-la-baranda-reservas-desktop.png",

    imagenMobile:
      "/images/Demostraciones/proyecto-la-baranda-reservas-mobile.png",

    imagenAlt:
      "Sistema de reservas desarrollado para La Baranda",

    imagenPosicion:
      "center",

    imagenPosicionMobile:
      "center",

    funciones: [
      "Reservas online",
      "Pagos",
      "Recordatorios",
      "Notificaciones",
      "Gestión interna",
      "Panel de gestión",
    ],
  },

  {
    slug: "top-led-canarias",

    nombre: "Top Led Canarias",

    heroTitulo:
      "Experiencia ecommerce para Top Led Canarias",

    heroDescripcion:
      "Una experiencia de compra pensada para presentar mejor el catálogo, orientar la navegación y hacer más sencillo el acceso a cada producto desde cualquier dispositivo.",

    categoria:
      "Ecommerce · Catálogo · Experiencia digital",

    descripcion:
      "Modernización del ecommerce, la navegación del catálogo y la experiencia de compra para facilitar el acceso a sus productos.",

    logo:
      "/images/Logos/logo_topled.ico",

    imagenDesktop:
      "/images/Demostraciones/top-led-desktop.png",

    imagenMobile:
      "/images/Demostraciones/top-led-desktop.png",

    imagenAlt:
      "Ecommerce desarrollado para Top Led Canarias",

    imagenPosicion:
      "center",

    imagenPosicionMobile:
      "center",

    funciones: [
      "Ecommerce",
      "Catálogo",
      "Navegación",
      "Colecciones",
      "Experiencia móvil",
      "Diseño responsive",
    ],
  },

  {
    slug: "tu-fiesta-party",

    nombre: "Tu Fiesta Party",

    heroTitulo:
      "Sistema digital para Tu Fiesta Party",

    heroDescripcion:
      "Una solución diseñada para ordenar la gestión de eventos y reservas, centralizar la información y facilitar la comunicación con cada cliente.",

    categoria:
      "Eventos · Reservas · Gestión digital",

    descripcion:
      "Una solución digital orientada a centralizar la gestión de eventos, reservas y comunicación con clientes.",

    logo:
      "/images/Logos/logo-tufiestaparty.png",

    imagenDesktop:
      "/images/Demostraciones/proyecto-tu-fiesta-party-software-desktop.png",

    imagenMobile:
      "/images/Demostraciones/proyecto-tu-fiesta-party-software-mobile.png",

    imagenAlt:
      "Software desarrollado para Tu Fiesta Party",

    imagenPosicion:
      "center",

    imagenPosicionMobile:
      "center",

    funciones: [
      "Gestión de eventos",
      "Reservas",
      "Clientes",
      "Organización interna",
      "Comunicación",
      "Panel de gestión",
    ],
  },
];


/* =========================================================
   HELPERS
   ========================================================= */

function localizarProyecto(
  proyecto: Proyecto,
  locale: string,
): Proyecto {
  if (locale !== "en") return proyecto;

  const copy = proyectosEn[proyecto.slug];
  if (!copy) return proyecto;

  return {
    ...proyecto,
    heroTitulo: copy.heroTitulo,
    heroDescripcion: copy.heroDescripcion,
    categoria: copy.categoria,
    descripcion: copy.descripcion,
    imagenAlt: copy.imagenAlt,
    funciones: copy.funciones,
  };
}


export function obtenerProyectosLocalizados(
  locale: string,
) {
  return proyectos.map(
    (proyecto) =>
      localizarProyecto(proyecto, locale),
  );
}


export function obtenerProyecto(
  slug: string,
  locale: string = "es",
) {
  const proyecto =
    proyectos.find(
      (proyecto) =>
        proyecto.slug === slug,
    );

  return proyecto && localizarProyecto(proyecto, locale);
}


export function obtenerOtrosProyectos(
  slug: string,
  locale: string = "es",
) {
  return proyectos
    .filter(
      (proyecto) =>
        proyecto.slug !== slug,
    )
    .map(
      (proyecto) =>
        localizarProyecto(proyecto, locale),
    );
}


export function obtenerSlugsProyectos() {
  return proyectos.map(
    (proyecto) =>
      proyecto.slug,
  );
}

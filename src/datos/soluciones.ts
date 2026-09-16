export const soluciones = [
  {
    slug:
      "software-a-medida",

    hero: {
      titulo:
        "Software creado alrededor\nde cómo trabaja tu empresa.",

      descripcion:
        "Diseñamos herramientas específicas para resolver procesos que un software genérico no cubre correctamente.",
    },

    seo: {
      title:
        "Software a medida para empresas | Alred",

      description:
        "Desarrollamos software a medida y herramientas internas adaptadas al funcionamiento real de cada empresa.",
    },

    selector: {
      titulo:
        "Software a medida",

      descripcion:
        "Aplicaciones diseñadas desde cero para adaptarse por completo a tus procesos y objetivos.",

      imagen:
        "/images/Soluciones/selector/software-a-medida.png",
    },
  },


  {
    slug:
      "automatizaciones",

    hero: {
      titulo:
        "Menos tareas manuales.\nMás tiempo para tu empresa.",

      descripcion:
        "Automatizamos procesos repetitivos, movimientos de información, avisos y tareas que actualmente dependen de intervención manual.",
    },

    seo: {
      title:
        "Automatizaciones para empresas | Alred",

      description:
        "Automatizamos procesos empresariales para reducir tareas manuales, errores y tiempo perdido entre herramientas.",
    },

    selector: {
      titulo:
        "Automatizaciones",

      descripcion:
        "Elimina tareas repetitivas, conecta procesos y haz que tu negocio funcione con menos intervención manual.",

      imagen:
        "/images/Soluciones/selector/automatizaciones.png",
    },
  },


  {
    slug:
      "integraciones",

    hero: {
      titulo:
        "Tus herramientas pueden\ntrabajar juntas.",

      descripcion:
        "Conectamos plataformas, aplicaciones y sistemas para que la información pase de un lugar a otro sin duplicar trabajo.",
    },

    seo: {
      title:
        "Integraciones entre herramientas | Alred",

      description:
        "Conectamos software, plataformas y herramientas empresariales para centralizar información y evitar procesos manuales.",
    },

    selector: {
      titulo:
        "Integraciones",

      descripcion:
        "Conectamos tus herramientas para que la información fluya entre ellas sin trabajo duplicado.",

      imagen:
        "/images/Soluciones/selector/integraciones.png",
    },
  },


  {
    slug:
      "herramientas-internas",

    hero: {
      titulo:
        "Una herramienta diseñada\npara vuestro equipo.",

      descripcion:
        "Creamos aplicaciones internas para organizar operaciones, clientes, trabajos, documentación y procesos específicos de la empresa.",
    },

    seo: {
      title:
        "Herramientas internas para empresas | Alred",

      description:
        "Creamos herramientas internas y aplicaciones de gestión adaptadas a los procesos y equipos de cada empresa.",
    },

    /*
     * De momento no entra en SelectorSoluciones01 porque
     * todavía no hemos generado su imagen.
     */
  },


  {
    slug:
      "dashboards",

    hero: {
      titulo:
        "Información clara para\nentender qué está pasando.",

      descripcion:
        "Centralizamos datos relevantes en paneles diseñados para consultar métricas, estados y actividad sin buscar información en distintos sitios.",
    },

    seo: {
      title:
        "Dashboards y paneles de control | Alred",

      description:
        "Diseñamos dashboards y paneles de control para centralizar métricas, datos y actividad de empresas.",
    },

    selector: {
      titulo:
        "Dashboards",

      descripcion:
        "Convierte tus datos en información útil y ten una visión clara de lo que ocurre en tu empresa.",

      imagen:
        "/images/Soluciones/selector/dashboards.png",
    },
  },


  /* =========================================================
     NUEVO — MARKETING DIGITAL MEDIBLE
     ========================================================= */

  {
    slug:
      "marketing-digital",

    nuevo:
      true,

    destacado:
      true,

    hero: {
      titulo:
        "Marketing que puedes\nmedir y mejorar.",

      descripcion:
        "Creamos campañas y sistemas de medición conectados para entender qué atrae clientes, qué convierte y dónde merece la pena invertir.",
    },

    seo: {
      title:
        "Marketing digital medible para empresas | Alred",

      description:
        "Campañas de marketing digital conectadas con analítica, dashboards, códigos promocionales, QR, SEO y métricas para medir resultados reales.",
    },

    /*
     * Imagen temporal.
     * Cuando tengas la imagen específica de marketing,
     * solo cambia esta ruta.
     */
    selector: {
      titulo:
        "Marketing digital",

      descripcion:
        "Campañas, analítica y dashboards conectados para saber qué funciona y convertir los datos en decisiones.",

      imagen:
        "/images/Soluciones/selector/Marketing_Digital.png",
    },

    /*
     * Este enfoque solo existe, por ahora, para Marketing.
     * Las demás soluciones siguen usando el bloque genérico
     * definido en [slug]/page.tsx.
     */
    enfoque: {
      titulo:
        "No se trata solo de lanzar campañas.",

      tituloSecundario:
        "Se trata de saber qué está funcionando.",

      descripcion:
        "Conectamos campañas, web, promociones y datos para entender qué acciones generan visitas, contactos, reservas o ventas. Así puedes medir resultados reales y mejorar cada decisión con información clara.",

      fondoDesktop:
        "/images/Decorativas/solucion-enfoque-dashboard.png",

      fondoMobile:
        "/images/Decorativas/solucion-enfoque-dashboard-mobil.png",

      fondoX:
        50,

      fondoY:
        50,

      fondoXMobile:
        72,

      fondoYMobile:
        50,
    },
  },
] as const;

import {
  solucionesEn,
} from "./soluciones-en";


export type Solucion =
  (typeof soluciones)[number];


export type SolucionSlug =
  Solucion["slug"];


export function obtenerSolucion(
  slug: string,
) {
  return soluciones.find(
    solucion =>
      solucion.slug ===
      slug,
  );
}


export function esSolucionValida(
  slug: string,
): slug is SolucionSlug {
  return soluciones.some(
    solucion =>
      solucion.slug ===
      slug,
  );
}


export function obtenerSolucionesSelector(
  locale: string,
) {
  return soluciones.flatMap(
    solucion => {
      if (
        !("selector" in solucion)
      ) {
        return [];
      }


      return [
        {
          slug:
            solucion.slug,

          titulo:
            locale === "en"
              ? solucionesEn[solucion.slug]?.selector?.titulo ?? solucion.selector.titulo
              : solucion.selector.titulo,

          descripcion:
            locale === "en"
              ? solucionesEn[solucion.slug]?.selector?.descripcion ?? solucion.selector.descripcion
              : solucion.selector.descripcion,

          href:
            `/${locale}/soluciones/${solucion.slug}`,

          imagen:
            solucion.selector.imagen,

          imagenAlt:
            "",
        },
      ];
    },
  );
}

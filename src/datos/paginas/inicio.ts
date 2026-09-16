import type { Hero01Props } from "@/componentes/secciones/hero/Hero01";

export const inicio = {
  hero: {
    titulo: "Soluciones digitales a medida para que tu empresa trabaje mejor",
    descripcion:
      "Herramientas, automatizaciones e interfaces diseñadas alrededor de procesos reales.",
    cta: {
      texto: "Hablemos de tu proyecto",
      href: "/contacto",
    },

    img1: "/images/Decorativas/difference-alred-visual (4).jpeg",
    img2: "/images/Decorativas/difference-alred-visual (3).jpg",
    img3: "/images/Decorativas/textura-seda-holografica-plateada.jpg",

    altImg1: "Recurso visual relacionado con soluciones digitales de Alred",
    altImg2: "Interfaz digital desarrollada por Alred",
    altImg3: "Vista principal de una solución digital desarrollada por Alred",

    posicionImg1: "center",
    posicionImg2: "center",
    posicionImg3: "center",

    textoIzquierda: {
      titulo: "Tecnología que impulsa procesos reales.",
      enlace: {
        texto: "Conocer más",
        href: "/soluciones",
      },
    },

    textoCentro: {
      titulo: "Sistemas diseñados alrededor de cada empresa.",
    },

    textoPrincipal: {
      titulo: "A medida",
      descripcion:
        "Soluciones diseñadas alrededor de cómo funciona realmente tu empresa.",
    },
  } satisfies Hero01Props,
};

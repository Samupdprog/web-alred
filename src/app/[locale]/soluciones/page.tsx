import type {
  Metadata,
} from "next";

import {
  Hero02,
} from "@/componentes/secciones/hero";

import {
  SelectorSoluciones01,
} from "@/componentes/secciones/soluciones/SelectorSoluciones01/SelectorSoluciones01";

import {
  MarketingNuevo01,
} from "@/componentes/secciones/soluciones/MarketingNuevo01";

import {
  SolucionEnfoque01,
} from "@/componentes/secciones/soluciones/SolucionEnfoque01";

import {
  Proyectos01,
} from "@/componentes/secciones/proyectos/Proyectos01";

import {
  CTAFinal01,
} from "@/componentes/secciones/";

import {
  obtenerSolucionesSelector,
} from "@/datos/soluciones";


export const metadata: Metadata = {
  title: {
    absolute:
      "Soluciones digitales para empresas | Alred",
  },

  description:
    "Software a medida, automatizaciones, integraciones, herramientas internas, dashboards y marketing digital medible creados alrededor de los procesos de cada empresa.",

  robots: {
    index:
      true,

    follow:
      true,
  },

  alternates: {
    canonical:
      "/es/soluciones",

    languages: {
      es:
        "/es/soluciones",

      en:
        "/en/soluciones",
    },
  },
};


type SolucionesPageProps = {
  params: Promise<{
    locale: string;
  }>;
};


export default async function SolucionesPage({
  params,
}: SolucionesPageProps) {
  const {
    locale,
  } = await params;


  const solucionesSelector =
    obtenerSolucionesSelector(
      locale,
    );


  return (
    <main className="section-stack">

      {/* ===================================================
          HERO
         =================================================== */}

      <Hero02
        titulo={
          "Soluciones creadas\nalrededor de tu empresa."
        }

        descripcion="No partimos de una herramienta cerrada. Entendemos cómo trabaja tu empresa y diseñamos la solución que mejor encaja con sus procesos."

        cta={{
          texto:
            "Ver soluciones",

          href:
            "#soluciones",
        }}

        ctaSecundario={{
          texto:
            "Hablar sobre tu proyecto",

          href:
            `/${locale}/contacto`,
        }}

        fondoDesktop="/images/Decorativas/difference-alred-visual (6).png"

        fondoMobile="/images/Decorativas/difference-alred-visual (6).png"

        fondoX={
          50
        }

        fondoY={
          50
        }

        fondoXMobile={
          58
        }

        fondoYMobile={
          50
        }
      />


      {/* ===================================================
          SELECTOR DE SOLUCIONES
         =================================================== */}

      <SelectorSoluciones01
        id="soluciones"

        soluciones={
          solucionesSelector
        }
      />


      {/* ===================================================
          NOVEDAD — MARKETING DIGITAL

          Colocado justo debajo de las tarjetas del selector.
         =================================================== */}

      <MarketingNuevo01
        id="marketing-digital"

        etiqueta="Nuevo servicio"

        titulo="Marketing digital que puedes medir de verdad."

        descripcion="Conectamos campañas, promociones, web y datos para saber qué atrae usuarios, qué convierte en contactos o ventas y qué acciones merece la pena repetir o mejorar."
        
        cta={{
          texto:
            "Saber más",

          href:
            `/${locale}/soluciones/marketing-digital`,
        }}

        ctaSecundario={{
          texto:
            "Ver cómo lo medimos",

          href:
            `/${locale}/soluciones/marketing-digital#medicion`,
        }}

        fondoDesktop="/images/Decorativas/background-marketing-digital.png"

        fondoX={
          50
        }

        fondoY={
          50
        }

        fondoXMobile={
          62
        }

        fondoYMobile={
          50
        }

        grafica={{
          titulo:
            "Crecimiento de visitas",

          cambio:
            "+78%",
        }}

        metricas={[
          {
            label:
              "Visitas",

            valor:
              "24.8K",

            cambio:
              "+62%",
          },

          {
            label:
              "Contactos",

            valor:
              "1.284",

            cambio:
              "+48%",
          },

          {
            label:
              "Reservas",

            valor:
              "342",

            cambio:
              "+71%",
          },

          {
            label:
              "Ventas",

            valor:
              "189",

            cambio:
              "+56%",
          },
        ]}

        meta={[
          "Estrategia",
          "Campañas",
          "Resultados reales",
        ]}
      />


      {/* ===================================================
          ENFOQUE
         =================================================== */}

      <SolucionEnfoque01
        id="como-trabajamos"

        titulo="No partimos de una herramienta cerrada."

        tituloSecundario=""

        descripcion="Analizamos tus procesos, entendemos tus necesidades y diseñamos la solución más sencilla y efectiva. La tecnología se decide después de entender el problema."

        cta={{
          texto:
            "Conoce nuestro proceso",

          href:
            `/${locale}/nosotros`,
        }}

        fondoDesktop="/images/Decorativas/solucion-enfoque-dashboard.png"

        fondoMobile="/images/Decorativas/solucion-enfoque-dashboard-mobil.png"

        fondoX={
          50
        }

        fondoY={
          50
        }

        fondoXMobile={
          72
        }

        fondoYMobile={
          50
        }
      />


      {/* =====================================================
          PROYECTOS
         ===================================================== */}

      <Proyectos01
        titulo="Distintos negocios. Distintas soluciones."

        descripcion="La estructura se mantiene. El proyecto cambia de verdad."

        segundosEntreProyectos={
          8
        }

        reproduccionAutomatica={
          true
        }

        proyectos={[
          {
            id:
              "index-clima",

            nombre:
              "Index Clima",

            categoria:
              "Gestión interna · Presupuestos · Automatización",

            descripcion:
              "Herramientas internas diseñadas para centralizar procesos y simplificar la gestión diaria.",

            href:
              `/${locale}/proyectos/index-clima`,

            logo:
              "/images/Logos/logo_indexclima.ico",

            logoAlt:
              "Index Clima",

            imagenDesktop:
              "/images/Demostraciones/proyecto-index-clima-presupuestos-desktop.png",

            imagenMobile:
              "/images/Demostraciones/proyecto-index-clima-presupuestos-mobile.png",

            imagenAlt:
              "Herramienta digital desarrollada para Index Clima",
          },


          {
            id:
              "la-baranda",

            nombre:
              "La Baranda",

            categoria:
              "Reservas · Gestión · Automatización",

            descripcion:
              "Reservas, pagos, avisos y herramientas internas conectadas alrededor del funcionamiento real del negocio.",

            href:
              `/${locale}/proyectos/la-baranda`,

            logo:
              "/images/Logos/logo_baranda.ico",

            logoAlt:
              "La Baranda",

            imagenDesktop:
              "/images/Demostraciones/proyecto-la-baranda-reservas-desktop.png",

            imagenMobile:
              "/images/Demostraciones/proyecto-la-baranda-reservas-mobile.png",

            imagenAlt:
              "Sistema de reservas desarrollado para La Baranda",
          },


          {
            id:
              "top-led-canarias",

            nombre:
              "Top Led Canarias",

            categoria:
              "Ecommerce · Catálogo · Experiencia digital",

            descripcion:
              "Modernización del ecommerce y de la navegación del catálogo.",

            href:
              `/${locale}/proyectos/top-led-canarias`,

            logo:
              "/images/Logos/logo_topled.ico",

            logoAlt:
              "Top Led Canarias",

            imagenDesktop:
              "/images/Demostraciones/top-led-desktop.png",

            imagenMobile:
              "/images/Demostraciones/top-led-desktop.png",

            imagenAlt:
              "Ecommerce de Top Led Canarias",
          },


          {
            id:
              "tu-fiesta-party",

            nombre:
              "Tu Fiesta Party",

            categoria:
              "Eventos · Reservas · Gestión digital",

            descripcion:
              "Solución digital orientada a centralizar la gestión de eventos, reservas y comunicación con clientes.",

            href:
              `/${locale}/proyectos/tu-fiesta-party`,

            logo:
              "/images/Logos/logo-tufiestaparty.png",

            logoAlt:
              "Tu Fiesta Party",

            imagenDesktop:
              "/images/Demostraciones/proyecto-tu-fiesta-party-software-desktop.png",

            imagenMobile:
              "/images/Demostraciones/proyecto-tu-fiesta-party-software-mobile.png",

            imagenAlt:
              "Proyecto digital desarrollado para Tu Fiesta Party",
          },
        ]}
      />


      {/* =====================================================
          CTA FINAL
         ===================================================== */}

      <CTAFinal01
        titulo="Cuéntanos lo que necesitas."

        descripcion="Te ayudamos a definir la solución y puedes pedir tu presupuesto gratis, sin compromiso."

        cta={{
          texto:
            "Pedir presupuesto gratis",

          href:
            `/${locale}/contacto`,
        }}

        ctaSecundario={{
          texto:
            "Ver ejemplos",

          href:
            `/${locale}/proyectos`,
        }}

        fondo="/images/Decorativas/CTA_background.png"

        fondoMobile="/images/Decorativas/CTA_background.png"

        fondoAlt="Textura abstracta de Alred"

        oscurecerFondo={
          0.04
        }

        fondoX={
          50
        }

        fondoY={
          50
        }

        fondoXMobile={
          50
        }

        fondoYMobile={
          42
        }

        textoClaro={
          false
        }
      />

    </main>
  );
}

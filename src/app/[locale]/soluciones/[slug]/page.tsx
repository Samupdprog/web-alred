import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

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
  esSolucionValida,
  obtenerSolucion,
  obtenerSolucionesSelector,
  soluciones,
} from "@/datos/soluciones";

import {
  solucionesEn,
} from "@/datos/soluciones-en";


type SolucionPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};


/* =========================================================
   RUTAS ESTÁTICAS
   ========================================================= */

export function generateStaticParams() {
  return soluciones.map(
    solucion => ({
      slug:
        solucion.slug,
    }),
  );
}


/* =========================================================
   METADATA
   ========================================================= */

export async function generateMetadata({
  params,
}: SolucionPageProps): Promise<Metadata> {
  const {
    locale,
    slug,
  } = await params;


  const solucion =
    obtenerSolucion(
      slug,
    );


  if (
    !solucion
  ) {
    return {};
  }

  const copy =
    locale === "en"
      ? solucionesEn[slug]
      : undefined;


  return {
    title: {
      absolute:
        copy?.seo.title ?? solucion.seo.title,
    },

    description:
      copy?.seo.description ?? solucion.seo.description,

    robots: {
      index:
        true,

      follow:
        true,
    },

    alternates: {
      canonical:
        `/${locale}/soluciones/${slug}`,

      languages: {
        es:
          `/es/soluciones/${slug}`,

        en:
          `/en/soluciones/${slug}`,
      },
    },
  };
}


/* =========================================================
   PÁGINA
   ========================================================= */

export default async function SolucionPage({
  params,
}: SolucionPageProps) {
  const {
    locale,
    slug,
  } = await params;


  if (
    !esSolucionValida(
      slug,
    )
  ) {
    notFound();
  }


  const solucion =
    obtenerSolucion(
      slug,
    );


  if (
    !solucion
  ) {
    notFound();
  }

  const copy =
    locale === "en"
      ? solucionesEn[slug]
      : undefined;


  const enfoque =
    "enfoque" in solucion
      ? solucion.enfoque
      : null;


  const solucionesSelector =
    obtenerSolucionesSelector(
      locale,
    );


  const esMarketingDigital =
    slug ===
    "marketing-digital";


  return (
    <main className="section-stack">

      {/* ===================================================
          HERO DE LA SOLUCIÓN
         =================================================== */}

      <Hero02
        titulo={
          copy?.hero.titulo ?? solucion.hero.titulo
        }

        descripcion={
          copy?.hero.descripcion ?? solucion.hero.descripcion
        }

        cta={{
          texto:
            locale === "en"
              ? "Talk about this solution"
              : "Hablar sobre esta solución",

          href:
            `/${locale}/contacto`,
        }}

        ctaSecundario={{
          texto:
            locale === "en"
              ? "View all solutions"
              : "Ver todas las soluciones",

          href:
            `/${locale}/soluciones`,
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
          SELECTOR

          La solución activa se coloca automáticamente
          en primera posición.
         =================================================== */}

      <SelectorSoluciones01
        id="soluciones"

        titulo={
          locale === "en"
            ? "Everything your business needs, in one place"
            : undefined
        }

        descripcion={
          locale === "en"
            ? "Connected solutions designed around how your business works."
            : undefined
        }

        enlaceLabel={
          locale === "en"
            ? "Learn more"
            : undefined
        }

        soluciones={
          solucionesSelector
        }

        activa={
          slug
        }
      />


      {/* ===================================================
          NOVEDAD — MARKETING DIGITAL

          También aparece debajo de las tarjetas en los slugs.

          En el propio slug de Marketing:
          - CTA principal va a contacto
          - CTA secundario baja a medición

          En el resto de soluciones:
          - CTA lleva a la nueva solución
         =================================================== */}




      {/* ===================================================
          ENFOQUE
         =================================================== */}

      <SolucionEnfoque01
        id={
          esMarketingDigital
            ? "medicion"
            : "como-trabajamos"
        }

        titulo={
          copy?.enfoque?.titulo ?? enfoque?.titulo ??
          "No partimos de una herramienta cerrada."
        }

        tituloSecundario={
          copy?.enfoque?.tituloSecundario ?? enfoque?.tituloSecundario ??
          ""
        }

        descripcion={
          copy?.enfoque?.descripcion ?? enfoque?.descripcion ??
          "Analizamos tus procesos, entendemos tus necesidades y diseñamos la solución más sencilla y efectiva. La tecnología se decide después de entender el problema."
        }

        cta={{
          texto:
            enfoque
              ? locale === "en"
                ? "Tell us what you want to achieve"
                : "Cuéntanos qué quieres conseguir"
              : locale === "en"
                ? "See how we work"
                : "Conoce nuestro proceso",

          href:
            enfoque
              ? `/${locale}/contacto`
              : `/${locale}/nosotros`,
        }}

        fondoDesktop={
          enfoque?.fondoDesktop ??
          "/images/Decorativas/solucion-enfoque-dashboard.png"
        }

        fondoMobile={
          enfoque?.fondoMobile ??
          "/images/Decorativas/solucion-enfoque-dashboard-mobil.png"
        }

        fondoX={
          enfoque?.fondoX ??
          50
        }

        fondoY={
          enfoque?.fondoY ??
          50
        }

        fondoXMobile={
          enfoque?.fondoXMobile ??
          72
        }

        fondoYMobile={
          enfoque?.fondoYMobile ??
          50
        }
      />


      {/* =====================================================
          PROYECTOS
         ===================================================== */}

      <Proyectos01
        titulo={
          locale === "en"
            ? "Different businesses. Different solutions."
            : "Distintos negocios. Distintas soluciones."
        }

        descripcion={
          locale === "en"
            ? "The structure stays the same. The project genuinely changes."
            : "La estructura se mantiene. El proyecto cambia de verdad."
        }

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
              locale === "en"
                ? "Internal management · Quotes · Automation"
                : "Gestión interna · Presupuestos · Automatización",

            descripcion:
              locale === "en"
                ? "Internal tools designed to centralise processes and simplify daily management."
                : "Herramientas internas diseñadas para centralizar procesos y simplificar la gestión diaria.",

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
              locale === "en"
                ? "Bookings · Management · Automation"
                : "Reservas · Gestión · Automatización",

            descripcion:
              locale === "en"
                ? "Bookings, payments, notifications and internal tools connected around how the business really works."
                : "Reservas, pagos, avisos y herramientas internas conectadas alrededor del funcionamiento real del negocio.",

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
              locale === "en"
                ? "Ecommerce · Catalogue · Digital experience"
                : "Ecommerce · Catálogo · Experiencia digital",

            descripcion:
              locale === "en"
                ? "Modernising the ecommerce experience and catalogue navigation."
                : "Modernización del ecommerce y de la navegación del catálogo.",

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
              locale === "en"
                ? "Events · Bookings · Digital management"
                : "Eventos · Reservas · Gestión digital",

            descripcion:
              locale === "en"
                ? "A digital solution built to centralise event management, bookings and customer communication."
                : "Solución digital orientada a centralizar la gestión de eventos, reservas y comunicación con clientes.",

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
        titulo={
          locale === "en"
            ? "Tell us what you need."
            : "Cuéntanos lo que necesitas."
        }

        descripcion={
          locale === "en"
            ? "We help you define the right solution, and you can request a free, no-obligation quote."
            : "Te ayudamos a definir la solución y puedes pedir tu presupuesto gratis, sin compromiso."
        }

        cta={{
          texto:
            locale === "en"
              ? "Request a free quote"
              : "Pedir presupuesto gratis",

          href:
            `/${locale}/contacto`,
        }}

        ctaSecundario={{
          texto:
            locale === "en"
              ? "View examples"
              : "Ver ejemplos",

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

import {
  Hero01,
  Conectado01,
  Soluciones01,
  Proyectos01,
  Proceso01,
  CTAFinal01,
} from "@/componentes/secciones";

import {
  routes,
} from "@/config/routes";


type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};


export default async function HomePage({
  params,
}: HomePageProps) {
  const {
    locale,
  } = await params;

  return (
    <main className="section-stack">

      {/* =====================================================
          HERO
         ===================================================== */}

      <Hero01
        efectoImagenFija={true}

        titulo="Soluciones digitales a medida para que tu empresa trabaje mejor"

        descripcion="Herramientas, automatizaciones e interfaces diseñadas alrededor de procesos reales."

        cta={{
          texto:
            "Hablemos de tu proyecto",

          href:
            routes.contacto(
              locale,
            ),
        }}

        img1="/images/Decorativas/difference-alred-visual.jpg"

        img2="/images/Decorativas/textura-cristal-azul-coral-hero-proyectos.jpeg"

        img3="/images/Decorativas/difference-alred-visual (4).jpeg"

        altImg1="Solución digital desarrollada por Alred"

        altImg2="Interfaz de una herramienta de gestión"

        altImg3="Dashboard de una solución digital a medida"

        textoIzquierda={{
          titulo:
            "Tecnología que impulsa procesos reales.",

          enlace: {
            texto:
              "Conocer más",

            href:
              routes.soluciones(
                locale,
              ),
          },
        }}

        textoCentro={{
          titulo:
            "Sistemas diseñados alrededor de cada empresa.",
        }}

        textoPrincipal={{
          titulo:
            "A medida",

          descripcion:
            "Soluciones diseñadas alrededor de cómo funciona realmente tu empresa.",
        }}
      />


      {/* =====================================================
          SOLUCIONES
         ===================================================== */}

      <Soluciones01
        titulo="Soluciones que se adaptan a cómo trabaja tu empresa."

        descripcion="No partimos de una herramienta cerrada. Elegimos la tecnología después de entender el proceso."

        software={{
          titulo:
            "Software a medida",

          descripcion:
            "Aplicaciones creadas alrededor de tu proceso.",

          href:
            routes.soluciones(
              locale,
            ),

          secundaria: {
            titulo:
              "Herramientas internas",

            descripcion:
              "Una forma más simple de centralizar tareas, información y equipo.",
          },
        }}

        automatizaciones={{
          titulo:
            "Automatizaciones",

          descripcion:
            "Menos tareas repetitivas y menos trabajo manual.",

          href:
            routes.soluciones(
              locale,
            ),
        }}

        dashboards={{
          titulo:
            "Dashboards y control",

          descripcion:
            "Información útil para tomar decisiones.",

          href:
            routes.soluciones(
              locale,
            ),
        }}

        integraciones={{
          titulo:
            "Integraciones",

          descripcion:
            "Tus herramientas y datos trabajando juntos.",

          href:
            routes.soluciones(
              locale,
            ),
        }}
      />


      {/* =====================================================
          TODO CONECTADO + ÓRBITA
         ===================================================== */}

<Conectado01
  titulo={
    "Automatiza,\nControla y \nConecta."
  }

  introduccion="Cuando la información está repartida entre distintas herramientas, el problema no es añadir otra aplicación. Es conectar el proceso."

  puntos={[
    {
      texto:
        "Reservas, stock, presupuestos o gestión interna.",
    },
    {
      texto:
        "Integrado con las herramientas que ya utiliza tu empresa.",
    },
  ]}

  cta={{
    texto:
      "Ver soluciones",
    href:
      routes.soluciones(
        locale,
      ),
  }}

  fondo="/images/Decorativas/soluciones-alred-background.jpeg"

  fondoMobile="/images/Decorativas/soluciones-alred-background.jpeg"

  fondoAlt="Visual de soluciones conectadas"


  /* ================================================
     EFECTO REVEAL / FIJO
     ================================================ */

  efectoFondoFijo={true}


  /*
   * Posición vertical DESKTOP.
   *
   * 0   = arriba
   * 50  = centro
   * 100 = abajo
   */
  fondoY={45}


  /*
   * Posición vertical MÓVIL.
   *
   * Independiente del desktop.
   */
  fondoYMobile={58}


  orbita={{
    logo:
      "/svg/Logos/logo-alred.svg",

    carpetaIconos:
      "/images/iconos/integraciones",

    velocidadSegundos:
      42,

    iconos: [
      {
        nombre: "Google",
        archivo: "google.svg",
      },
      {
        nombre: "Google Analytics",
        archivo: "google-analytics.svg",
      },
      {
        nombre: "Google Ads",
        archivo: "google-ads.svg",
      },
      {
        nombre: "Google Drive",
        archivo: "google-drive.svg",
      },
      {
        nombre: "Google Sheets",
        archivo: "google-sheets.svg",
      },
      {
        nombre: "Gmail",
        archivo: "gmail.svg",
      },
      {
        nombre: "WhatsApp",
        archivo: "whatsapp.svg",
      },
      {
        nombre: "PDF",
        archivo: "pdf.svg",
      },
    ],
  }}

  visual={{
    titulo:
      "Un solo\nflujo",

    subtitulo:
      "Información, tareas y avisos conectados.",

    descripcion:
      "La solución se diseña alrededor del proceso real de la empresa, no al revés.",
  }}

  prueba={{
    texto:
      "Proyectos reales",

    marcas: [
      {
        src:
          "/images/Logos/logo_baranda.ico",
        alt:
          "La Baranda",
      },
      {
        src:
          "/images/Logos/logo_indexclima.ico",
        alt:
          "Index Clima",
      },
      {
        src:
          "/images/Logos/logo_diaz_mendoza.ico",
        alt:
          "Díaz Mendoza",
      },
    ],
  }}
/>


      {/* =====================================================
          PROYECTOS
         ===================================================== */}

      <Proyectos01
        titulo="Distintos negocios. Distintas soluciones."

        descripcion="La estructura se mantiene. El proyecto cambia de verdad."

        segundosEntreProyectos={8}

        reproduccionAutomatica={true}

        proyectos={[
          /* =================================================
             INDEX CLIMA
             ================================================= */

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
              routes.proyecto(
                locale,
                "index-clima",
              ),

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


          /* =================================================
             LA BARANDA
             ================================================= */

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
              routes.proyecto(
                locale,
                "la-baranda",
              ),

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


          /* =================================================
             TOP LED CANARIAS
             ================================================= */

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
              routes.proyecto(
                locale,
                "top-led-canarias",
              ),

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


          /* =================================================
             TU FIESTA PARTY
             ================================================= */

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
              routes.proyecto(
                locale,
                "tu-fiesta-party",
              ),

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
          CÓMO TRABAJAMOS
         ===================================================== */}

      <Proceso01
        titulo="Cómo trabajamos"

        descripcion="No partimos de una herramienta cerrada. Entendemos el proceso, diseñamos la solución, la desarrollamos y seguimos a tu lado para mejorarla."

        tarjetas={[
          /* =================================================
             1 — ENTENDER
             ================================================= */

          {
            titulo:
              "Entendemos tu negocio",

            descripcion:
              "Nos reunimos contigo para conocer tu empresa, tus procesos, tus objetivos y los retos del día a día.",

            imagen:
              "/images/Ilustraciones/Entendemos_tu_negocio.png",

            imagenMobile:
              "/images/Ilustraciones/Entendemos_tu_negocio.png",

            imagenAlt:
              "Representación visual de la fase de análisis del negocio",

            posicionImagen:
              "center",

            posicionImagenMobile:
              "center",
          },


          /* =================================================
             2 — DISEÑAR
             ================================================= */

          {
            titulo:
              "Diseñamos la solución",

            descripcion:
              "Definimos la estrategia, la tecnología y la arquitectura más adecuada para tu caso.",

            imagen:
              "/images/Ilustraciones/Diseñamos_soluciones.png",

            imagenMobile:
              "/images/Ilustraciones/Diseñamos_soluciones.png",

            imagenAlt:
              "Representación visual de la fase de diseño de una solución digital",

            posicionImagen:
              "center",

            posicionImagenMobile:
              "center",
          },


          /* =================================================
             3 — DESARROLLAR
             ================================================= */

          {
            titulo:
              "Desarrollamos e integramos",

            descripcion:
              "Construimos, conectamos y automatizamos todo lo necesario, cuidando cada detalle del proceso.",

            imagen:
              "/images/Ilustraciones/Desarrollo_integracion.png",

            imagenMobile:
              "/images/Ilustraciones/Desarrollo_integracion.png",

            imagenAlt:
              "Representación visual de la fase de desarrollo e integración",

            posicionImagen:
              "center",

            posicionImagenMobile:
              "center",
          },


          /* =================================================
             4 — HACER CRECER
             ================================================= */

          {
            titulo:
              "Te acompañamos y hacemos crecer",

            descripcion:
              "Ponemos la solución en marcha y seguimos a tu lado para optimizar, resolver y añadir nuevas mejoras cuando lo necesites.",

            imagen:
              "/images/Ilustraciones/Hacemos_crecer.png",

            imagenMobile:
              "/images/Ilustraciones/Hacemos_crecer.png",

            imagenAlt:
              "Representación visual de la evolución de una solución digital",

            posicionImagen:
              "center",

            posicionImagenMobile:
              "center",
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
            routes.contacto(
              locale,
            ),
        }}

        ctaSecundario={{
          texto:
            "Ver ejemplos",

          href:
            routes.proyectos(
              locale,
            ),
        }}

        fondo="/images/Decorativas/CTA_background.png"

        fondoMobile="/images/Decorativas/CTA_background.png"

        fondoAlt="Textura abstracta de Alred"


        /* =================================================
           CONTRASTE DEL FONDO

           0    = nada
           0.04 = muy sutil
           0.15 = más marcado
           ================================================= */

        oscurecerFondo={0.04}


        /* =================================================
           POSICIÓN DEL COVER DESKTOP
           ================================================= */

        fondoX={50}

        fondoY={50}


        /* =================================================
           POSICIÓN DEL COVER MÓVIL
           ================================================= */

        fondoXMobile={50}

        fondoYMobile={42}


        /* =================================================
           false = texto negro
           true  = texto blanco
           ================================================= */

        textoClaro={false}
      />

    </main>
  );
}
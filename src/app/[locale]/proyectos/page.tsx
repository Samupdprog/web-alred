import {
  CTAFinal01,
  Hero02,
  ListadoProyectos01,
  ProyectoDestacado01,
} from "@/componentes/secciones";

import {
  obtenerProyectosLocalizados,
} from "@/datos/proyectos";


type ProyectosPageProps = {
  params: Promise<{
    locale: string;
  }>;
};


export default async function ProyectosPage({
  params,
}: ProyectosPageProps) {
  const {
    locale,
  } = await params;

  const esEspanol =
    locale !== "en";

  const proyectos =
    obtenerProyectosLocalizados(
      locale,
    );


  return (
    <main
      className="section-stack"
    >
      {/* ===================================================
          HERO
         =================================================== */}

      <Hero02
        titulo={
          esEspanol
            ? "Proyectos creados alrededor de problemas reales."
            : "Projects built around real problems."
        }

        descripcion={
          esEspanol
            ? "Cada empresa trabaja de una manera distinta. Por eso cada solución también lo es."
            : "Every business works differently. That's why every solution is different too."
        }

        cta={{
          texto:
            esEspanol
              ? "Hablemos de tu proyecto"
              : "Let's talk about your project",

          href:
            `/${locale}/contacto`,
        }}

        fondoDesktop="/images/Decorativas/4d7b7f2e-c07f-4ad3-b71a-e4f3ad2c2677.png"

        fondoMobile="/images/Decorativas/4d7b7f2e-c07f-4ad3-b71a-e4f3ad2c2677.png"

        fondoX={50}

        fondoY={50}

        fondoXMobile={50}

        fondoYMobile={50}
      />


      {/* ===================================================
          PROYECTO GRANDE ROTATIVO
         =================================================== */}

      <ProyectoDestacado01
        proyectos={
          proyectos
        }

        rotacion={
          true
        }

        segundos={
          8
        }

        baseHref={`/${locale}/proyectos`}

        locale={
          locale
        }
      />


      {/* ===================================================
          TODOS LOS PROYECTOS
         =================================================== */}

      <ListadoProyectos01
        titulo={
          esEspanol
            ? "Todos los proyectos"
            : "All projects"
        }

        descripcion={
          esEspanol
            ? "Soluciones distintas, diseñadas alrededor de procesos y necesidades reales."
            : "Different solutions, designed around real processes and needs."
        }

        proyectos={
          proyectos
        }

        baseHref={`/${locale}/proyectos`}

        locale={
          locale
        }
      />


      {/* ===================================================
          CTA
         =================================================== */}

      <CTAFinal01
        titulo={
          esEspanol
            ? "Cuéntanos lo que necesitas."
            : "Tell us what you need."
        }

        descripcion={
          esEspanol
            ? "Te ayudamos a definir la solución y puedes pedir tu presupuesto gratis, sin compromiso."
            : "We'll help you define the solution and you can request your free, no-obligation quote."
        }

        cta={{
          texto:
            esEspanol
              ? "Pedir presupuesto gratis"
              : "Request a free quote",

          href:
            `/${locale}/contacto`,
        }}

        ctaSecundario={{
          texto:
            esEspanol
              ? "Ver soluciones"
              : "View solutions",

          href:
            `/${locale}/soluciones`,
        }}

        fondo="/images/Decorativas/difference-alred-visual (7).png"

        fondoMobile="/images/Decorativas/difference-alred-visual (7).png"

        fondoAlt={
          esEspanol
            ? "Textura abstracta de Alred"
            : "Abstract Alred texture"
        }

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

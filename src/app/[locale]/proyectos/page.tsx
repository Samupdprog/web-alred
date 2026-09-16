import {
  CTAFinal01,
  Hero02,
  ListadoProyectos01,
  ProyectoDestacado01,
} from "@/componentes/secciones";

import {
  proyectos,
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


  return (
    <main
      className="section-stack"
    >
      {/* ===================================================
          HERO
         =================================================== */}

      <Hero02
        titulo="Proyectos creados alrededor de problemas reales."

        descripcion="Cada empresa trabaja de una manera distinta. Por eso cada solución también lo es."

        cta={{
          texto:
            "Hablemos de tu proyecto",

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
      />


      {/* ===================================================
          TODOS LOS PROYECTOS
         =================================================== */}

      <ListadoProyectos01
        titulo="Todos los proyectos"

        descripcion="Soluciones distintas, diseñadas alrededor de procesos y necesidades reales."

        proyectos={
          proyectos
        }

        baseHref={`/${locale}/proyectos`}
      />


      {/* ===================================================
          CTA
         =================================================== */}

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
            "Ver soluciones",

          href:
            `/${locale}/soluciones`,
        }}

        fondo="/images/Decorativas/difference-alred-visual (7).png"

        fondoMobile="/images/Decorativas/difference-alred-visual (7).png"

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

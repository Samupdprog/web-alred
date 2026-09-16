import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  CTAFinal01,
  Hero02,
  ListadoProyectos01,
  ProyectoDestacado01,
} from "@/componentes/secciones";

import {
  obtenerOtrosProyectos,
  obtenerProyecto,
  proyectos,
} from "@/datos/proyectos";


type ProyectoPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};


export function generateStaticParams() {
  return proyectos.map(
    (
      proyecto,
    ) => ({
      slug:
        proyecto.slug,
    }),
  );
}


export async function generateMetadata({
  params,
}: ProyectoPageProps): Promise<Metadata> {
  const {
    locale,
    slug,
  } = await params;

  const proyecto =
    obtenerProyecto(
      slug,
      locale,
    );

  if (
    !proyecto
  ) {
    return {};
  }

  const esEspanol =
    locale !== "en";

  return {
    title:
      esEspanol
        ? `${proyecto.nombre} | Proyecto de Alred`
        : `${proyecto.nombre} | Alred project`,

    description:
      proyecto.descripcion,
  };
}


export default async function ProyectoPage({
  params,
}: ProyectoPageProps) {
  const {
    locale,
    slug,
  } = await params;

  const esEspanol =
    locale !== "en";

  const proyecto =
    obtenerProyecto(
      slug,
      locale,
    );

  if (
    !proyecto
  ) {
    notFound();
  }

  const otrosProyectos =
    obtenerOtrosProyectos(
      slug,
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
          proyecto.heroTitulo
        }

        descripcion={
          proyecto.heroDescripcion
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
          PROYECTO ACTUAL

          En una URL individual el proyecto debe permanecer
          fijo. La rotación solo pertenece a /proyectos.
         =================================================== */}

      <ProyectoDestacado01
        proyecto={
          proyecto
        }

        locale={
          locale
        }
      />


      {/* ===================================================
          OTROS PROYECTOS
         =================================================== */}

      <ListadoProyectos01
        titulo={
          esEspanol
            ? "Otros proyectos"
            : "Other projects"
        }

        descripcion={
          esEspanol
            ? "Explora otras soluciones desarrolladas alrededor de procesos y necesidades diferentes."
            : "Explore other solutions built around different processes and needs."
        }

        proyectos={
          otrosProyectos
        }

        excluir={
          proyecto.slug
        }

        porPagina={
          3
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
              ? "Ver todos los proyectos"
              : "View all projects",

          href:
            `/${locale}/proyectos`,
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

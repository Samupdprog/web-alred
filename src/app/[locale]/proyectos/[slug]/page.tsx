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
    slug,
  } = await params;

  const proyecto =
    obtenerProyecto(
      slug,
    );

  if (
    !proyecto
  ) {
    return {};
  }

  return {
    title:
      `${proyecto.nombre} | Proyecto de Alred`,

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

  const proyecto =
    obtenerProyecto(
      slug,
    );

  if (
    !proyecto
  ) {
    notFound();
  }

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
          PROYECTO ACTUAL

          En una URL individual el proyecto debe permanecer
          fijo. La rotación solo pertenece a /proyectos.
         =================================================== */}

      <ProyectoDestacado01
        proyecto={
          proyecto
        }
      />


      {/* ===================================================
          OTROS PROYECTOS
         =================================================== */}

      <ListadoProyectos01
        titulo="Otros proyectos"

        descripcion="Explora otras soluciones desarrolladas alrededor de procesos y necesidades diferentes."

        proyectos={
          proyectos
        }

        excluir={
          proyecto.slug
        }

        porPagina={
          3
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
            "Ver todos los proyectos",

          href:
            `/${locale}/proyectos`,
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

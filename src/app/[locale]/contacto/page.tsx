import type {
  Metadata,
} from "next";

import {
  Hero02,
} from "@/componentes/secciones/hero";

import {
  FormulariosContacto02,
} from "@/componentes/secciones/contacto";

import {
  Dudas01,
} from "@/componentes/secciones/dudas";

import {
  DespuesEnvio01,
} from "@/componentes/secciones/contacto/DespuesEnvio01/DespuesEnvio01";


type ContactoPageProps = {
  params: Promise<{
    locale: string;
  }>;
};


export async function generateMetadata({
  params,
}: ContactoPageProps): Promise<Metadata> {
  const {
    locale,
  } = await params;

  const es =
    locale !== "en";


  return {
    title:
      es
        ? "Contacto | Software, automatizaciones y desarrollo web | Alred"
        : "Contact | Software, automation and web development | Alred",

    description:
      es
        ? "Cuéntanos qué necesita tu empresa. Desarrollamos webs, software de gestión, automatizaciones, integraciones y soluciones digitales a medida."
        : "Tell us what your business needs. We build websites, management software, automations, integrations and custom digital solutions.",

    robots: {
      index:
        true,

      follow:
        true,
    },
  };
}


export default async function ContactoPage({
  params,
}: ContactoPageProps) {
  const {
    locale,
  } = await params;

  const idioma:
    "es" | "en" =
      locale === "en"
        ? "en"
        : "es";

  const es =
    idioma === "es";


  return (
    <main
      className="section-stack"
    >
      <Hero02
        titulo={
          es
            ? "Cuéntanos lo que\nnecesitas."
            : "Tell us what\nyou need."
        }

        descripcion={
          es
            ? "Puedes escribirnos de forma rápida o dejar más detalle si ya tienes claro lo que quieres hacer."
            : "Send us a quick message or give us more detail if you already know what you want to build."
        }

        cta={{
          texto:
            es
              ? "Hablar sobre tu proyecto"
              : "Talk about your project",

          href:
            "#contacto-rapido",
        }}

        ctaSecundario={{
          texto:
            es
              ? "Ver cómo trabajamos"
              : "See how we work",

          href:
            `/${idioma}/nosotros`,
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
          62
        }

        fondoYMobile={
          50
        }
      />


      <FormulariosContacto02
        locale={
          idioma
        }

        id="contacto-rapido"

        marca="Alred"

        modoInicial="corto"

        endpoint="/api/contacto"

        mensajeExito={
          es
            ? "Hemos recibido tu solicitud. Nos pondremos en contacto contigo lo antes posible."
            : "We have received your request. We will get back to you as soon as possible."
        }

        mensajeError={
          es
            ? "No hemos podido enviar el formulario ahora mismo. Inténtalo de nuevo en unos segundos."
            : "We couldn't send the form right now. Please try again in a few seconds."
        }

        corto={{
          titulo:
            es
              ? "Hablemos de tu proyecto"
              : "Let's talk about your project",

          descripcion:
            es
              ? "Cuéntanos brevemente qué necesitas y tendremos suficiente información para empezar a hablar."
              : "Tell us briefly what you need and we'll have enough information to start the conversation.",

          boton:
            es
              ? "Quiero más información"
              : "I want more information",

          nota:
            es
              ? "Revisaremos tu mensaje y nos pondremos en contacto contigo lo antes posible."
              : "We'll review your message and get back to you as soon as possible.",

          visual: {
            logo:
              "/svg/Logos/logo-alred.svg",

            logoAlt:
              "Alred",

            logoColor:
              "#111111",

            logoWidth:
              52,

            logoWidthMobile:
              46,

            titulo:
              es
                ? "Cuéntanos\ntu proyecto"
                : "Tell us about\nyour project",

            descripcion:
              es
                ? "Desarrollamos soluciones digitales adaptadas a cómo funciona realmente cada empresa."
                : "We build digital solutions around how each business actually works.",

            categorias:
              es
                ? [
                    "Software a medida",
                    "Automatizaciones",
                    "Integraciones",
                    "Dashboards",
                  ]
                : [
                    "Custom software",
                    "Automation",
                    "Integrations",
                    "Dashboards",
                  ],

            fondoDesktop:
              "/images/Decorativas/difference-alred-visual.jpg",

            fondoMobile:
              "/images/Decorativas/difference-alred-visual.jpg",

            fondoAlt:
              "",

            fondoX:
              50,

            fondoY:
              50,

            fondoXMobile:
              55,

            fondoYMobile:
              50,
          },
        }}

        largo={{
          titulo:
            es
              ? "Cuéntanos más detalles"
              : "Tell us more",

          descripcion:
            es
              ? "Si ya tienes una idea más definida, puedes dejarnos más contexto para que podamos entender mejor lo que necesitas."
              : "If your idea is already more defined, give us more context so we can understand what you need.",

          boton:
            es
              ? "Enviar solicitud"
              : "Send request",

          nota:
            es
              ? "Revisaremos la información antes de ponernos en contacto contigo."
              : "We'll review the information before getting in touch.",

          visual: {
            logo:
              "/svg/Logos/logo-alred.svg",

            logoAlt:
              "Alred",

            logoColor:
              "#ffffff",

            logoWidth:
              52,

            logoWidthMobile:
              46,

            titulo:
              es
                ? "Cuéntanos\ntu proyecto"
                : "Tell us about\nyour project",

            descripcion:
              es
                ? "Cuanto mejor entendamos el proceso, el problema y el objetivo, mejor podremos plantear la solución."
                : "The better we understand the process, problem and goal, the better we can shape the solution.",

            categorias:
              es
                ? [
                    "Software a medida",
                    "Automatizaciones",
                    "Integraciones",
                    "Herramientas internas",
                  ]
                : [
                    "Custom software",
                    "Automation",
                    "Integrations",
                    "Internal tools",
                  ],

            fondoDesktop:
              "/images/Decorativas/difference-alred-visual (5).png",

            fondoMobile:
              "/images/Decorativas/difference-alred-visual (5).png",

            fondoAlt:
              "",

            fondoX:
              50,

            fondoY:
              50,

            fondoXMobile:
              50,

            fondoYMobile:
              50,
          },
        }}

        opcionesNecesidad={
          es
            ? [
                {
                  value:
                    "web",

                  label:
                    "Página web",
                },
                {
                  value:
                    "tienda-online",

                  label:
                    "Tienda online",
                },
                {
                  value:
                    "gestion",

                  label:
                    "Software o herramienta de gestión",
                },
                {
                  value:
                    "automatizacion",

                  label:
                    "Automatización",
                },
                {
                  value:
                    "integracion",

                  label:
                    "Integración entre herramientas",
                },
                {
                  value:
                    "dashboard",

                  label:
                    "Dashboard o control de datos",
                },
                {
                  value:
                    "otro",

                  label:
                    "Otro",
                },
              ]
            : [
                {
                  value:
                    "web",

                  label:
                    "Website",
                },
                {
                  value:
                    "tienda-online",

                  label:
                    "Online store",
                },
                {
                  value:
                    "gestion",

                  label:
                    "Management software or tool",
                },
                {
                  value:
                    "automatizacion",

                  label:
                    "Automation",
                },
                {
                  value:
                    "integracion",

                  label:
                    "Tool integration",
                },
                {
                  value:
                    "dashboard",

                  label:
                    "Dashboard or data control",
                },
                {
                  value:
                    "otro",

                  label:
                    "Other",
                },
              ]
        }
      />


      <DespuesEnvio01
        titulo={
          es
            ? "Después de enviarlo."
            : "After you send it."
        }

        descripcion={
          es
            ? "Revisamos lo que nos has contado antes de responderte. La idea es llegar a la primera conversación entendiendo ya qué necesitas y poder orientarte desde el principio."
            : "We review what you've told us before replying. The aim is to understand what you need before the first conversation and guide you from the start."
        }

        pasos={[
          {
            titulo:
              es
                ? "Revisamos tu caso"
                : "We review your case",

            descripcion:
              es
                ? "Leemos lo que nos has contado y entendemos qué quieres resolver antes de responderte."
                : "We read what you've told us and understand what you want to solve before replying.",

            fondoDesktop:
              "/images/Ilustraciones/Analizamos_tu_Caso.png",

            fondoMobile:
              "/images/Ilustraciones/Analizamos_tu_Caso.png",
          },

          {
            titulo:
              es
                ? "Hablamos contigo"
                : "We talk with you",

            descripcion:
              es
                ? "Si necesitamos algún detalle más, lo vemos directamente contigo y aclaramos únicamente lo necesario."
                : "If we need any extra detail, we'll discuss it directly with you and clarify only what's necessary.",

            fondoDesktop:
              "/images/Ilustraciones/Hablamos contigo.png",

            fondoMobile:
              "/images/Ilustraciones/Hablamos contigo.png",
          },

          {
            titulo:
              es
                ? "Definimos el siguiente paso"
                : "We define the next step",

            descripcion:
              es
                ? "Te proponemos la forma más sencilla de avanzar según el proyecto, sin complicarlo antes de tiempo."
                : "We suggest the simplest way to move forward based on the project, without overcomplicating it.",

            fondoDesktop:
              "/images/Ilustraciones/Siguiente_paso.png",

            fondoMobile:
              "/images/Ilustraciones/Siguiente_paso.png",
          },
        ]}
      />


      <Dudas01
        id="dudas"

        titulo={
          es
            ? "Antes de empezar."
            : "Before we start."
        }

        descripcion={
          es
            ? "Estas son algunas de las dudas que suelen aparecer antes de comenzar un proyecto. Si tu caso es diferente, puedes contárnoslo directamente."
            : "These are some of the questions that usually come up before starting a project. If your situation is different, just tell us about it."
        }

        preguntas={
          es
            ? [
                {
                  pregunta:
                    "¿Cuánto tiempo y dedicación necesitará el proyecto por mi parte?",

                  respuesta:
                    "Depende mucho del tipo de proyecto: una web, una tienda online, una automatización, un software de gestión, una integración o una solución completamente personalizada requieren procesos diferentes. Una vez conozcamos tu idea podremos decirte con bastante precisión cuánto necesitaremos de ti.",
                },

                {
                  pregunta:
                    "¿Tengo que estar involucrado durante todo el proyecto?",

                  respuesta:
                    "No necesariamente. Lo más importante es definir bien el objetivo, las necesidades y cómo debe funcionar la solución al principio. A partir de ahí podemos encargarnos del desarrollo y mantenerte informado, recurriendo a ti únicamente para pequeñas decisiones o dudas que aparezcan durante el proceso.",
                },

                {
                  pregunta:
                    "¿Qué tipo de proyectos desarrolláis?",

                  respuesta:
                    "Trabajamos desde soluciones sencillas para resolver tareas concretas hasta proyectos más completos. Desarrollamos páginas web, tiendas online, herramientas de gestión, automatizaciones, integraciones entre plataformas y software a medida adaptado al funcionamiento de cada empresa.",
                },

                {
                  pregunta:
                    "¿Cuánto tarda normalmente un proyecto?",

                  respuesta:
                    "Depende del alcance. Una web sencilla puede necesitar pocas semanas, mientras que una herramienta de gestión, una automatización compleja o un software personalizado puede requerir más tiempo. Antes de empezar definimos el alcance y una estimación realista para que sepas qué esperar.",
                },

                {
                  pregunta:
                    "¿Puedo contaros mi idea o pedir presupuesto sin compromiso?",

                  respuesta:
                    "Sí. Puedes explicarnos qué necesitas aunque todavía no tengas claro cómo resolverlo. Estudiaremos el caso, te ayudaremos a definir la solución y te indicaremos qué planteamiento tiene más sentido antes de que tengas que tomar ninguna decisión.",
                },
              ]
            : [
                {
                  pregunta:
                    "How much time and involvement will the project require from me?",

                  respuesta:
                    "It depends on the type of project. A website, online store, automation, management tool, integration or fully custom solution all require different processes. Once we understand your idea, we can give you a clear estimate of how much input we'll need from you.",
                },

                {
                  pregunta:
                    "Do I need to be involved throughout the whole project?",

                  respuesta:
                    "Not necessarily. The most important thing is to define the goal, requirements and expected behaviour clearly at the start. From there, we can handle development and keep you informed, involving you only when decisions or clarifications are needed.",
                },

                {
                  pregunta:
                    "What kind of projects do you build?",

                  respuesta:
                    "We work on everything from simple solutions for specific tasks to more complete projects. We build websites, online stores, management tools, automations, platform integrations and custom software adapted to how each business works.",
                },

                {
                  pregunta:
                    "How long does a project usually take?",

                  respuesta:
                    "It depends on the scope. A simple website may take a few weeks, while a management tool, complex automation or custom software can take longer. Before starting, we define the scope and give you a realistic estimate.",
                },

                {
                  pregunta:
                    "Can I tell you my idea or request a quote with no commitment?",

                  respuesta:
                    "Yes. You can explain what you need even if you're not yet sure how to solve it. We'll review the case, help define the right approach and explain what makes sense before you need to make any decision.",
                },
              ]
        }

        abiertaInicial={
          0
        }
      />
    </main>
  );
}

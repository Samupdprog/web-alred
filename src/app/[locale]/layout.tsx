import {
  NextIntlClientProvider,
} from "next-intl";

import {
  getMessages,
} from "next-intl/server";

import {
  notFound,
} from "next/navigation";

import {
  Footer,
  Header,
} from "@/componentes/navegacion";

import {
  siteConfig,
  type SiteLocale,
} from "@/config/site";

import {
  routes,
  rutaConLocale,
} from "@/config/routes";

import {
  ConsentProvider,
} from "@/componentes/privacidad";


/* =========================================================
   STATIC PARAMS
   ========================================================= */

export function generateStaticParams() {
  return siteConfig.locales.map(
    locale => ({
      locale,
    }),
  );
}


/* =========================================================
   LOCALE LAYOUT
   ========================================================= */

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const {
    locale,
  } = await params;


  if (
    !siteConfig.locales.includes(
      locale as SiteLocale,
    )
  ) {
    notFound();
  }


  const messages =
    await getMessages({
      locale,
    });


  const esEspanol =
    locale === "es";


  return (
    <NextIntlClientProvider
      locale={
        locale
      }
      messages={
        messages
      }
    >

      <ConsentProvider
        locale={
          locale as "es" | "en"
        }
      >

        {/* ===================================================
            HEADER
           =================================================== */}

      <Header
        logo="/svg/Logos/logo-alred.svg"

        logoAlt="Alred"

        inicioHref={
          routes.inicio(
            locale,
          )
        }

        cta={{
          texto:
            esEspanol
              ? "Hablemos"
              : "Let's talk",

          href:
            routes.contacto(
              locale,
            ),
        }}

        idioma={{
          actual:
            locale.toUpperCase(),

          textoAccesible:
            esEspanol
              ? "Cambiar idioma a inglés"
              : "Change language to Spanish",

          /*
           * Header mantiene automáticamente la ruta actual.
           *
           * /es/soluciones/marketing-digital
           *      ↓
           * /en/soluciones/marketing-digital
           */
          href:
            esEspanol
              ? "/en"
              : "/es",
        }}

        tarjetas={[

          /* ===============================================
             SOLUCIONES
             =============================================== */

          {
            titulo:
              esEspanol
                ? "Soluciones"
                : "Solutions",

            descripcion:
              esEspanol
                ? "Software, automatización, datos y marketing creados alrededor de tu empresa."
                : "Software, automation, data and marketing built around your business.",

            /*
             * Clic en cualquier zona libre de la tarjeta.
             */
            href:
              routes.soluciones(
                locale,
              ),

            enlacePrincipalLabel:
              esEspanol
                ? "Ver todas las soluciones"
                : "View all solutions",

            imagen:
              "/images/Decorativas/difference-alred-visual (4).jpeg",

            posicionImagen:
              "center",

            enlaces: [
              {
                texto:
                  esEspanol
                    ? "Software a medida"
                    : "Custom software",

                href:
                  routes.solucion(
                    locale,
                    "software-a-medida",
                  ),
              },

              {
                texto:
                  esEspanol
                    ? "Automatizaciones"
                    : "Automations",

                href:
                  routes.solucion(
                    locale,
                    "automatizaciones",
                  ),
              },

              {
                texto:
                  esEspanol
                    ? "Integraciones"
                    : "Integrations",

                href:
                  routes.solucion(
                    locale,
                    "integraciones",
                  ),
              },

              {
                texto:
                  esEspanol
                    ? "Herramientas internas"
                    : "Internal tools",

                href:
                  routes.solucion(
                    locale,
                    "herramientas-internas",
                  ),
              },

              {
                texto:
                  "Dashboards",

                href:
                  routes.solucion(
                    locale,
                    "dashboards",
                  ),
              },

              {
                texto:
                  esEspanol
                    ? "Marketing digital"
                    : "Digital marketing",

                href:
                  routes.solucion(
                    locale,
                    "marketing-digital",
                  ),
              },
            ],
          },


          /* ===============================================
             PROYECTOS
             =============================================== */

          {
            titulo:
              esEspanol
                ? "Proyectos"
                : "Projects",

            descripcion:
              esEspanol
                ? "Sistemas reales diseñados alrededor de problemas concretos."
                : "Real systems designed around specific business problems.",

            /*
             * Clic en cualquier zona libre de la tarjeta.
             */
            href:
              routes.proyectos(
                locale,
              ),

            enlacePrincipalLabel:
              esEspanol
                ? "Ver todos los proyectos"
                : "View all projects",

            imagen:
              "/images/Decorativas/difference-alred-visual (3).jpg",

            posicionImagen:
              "center",

            enlaces: [
              {
                texto:
                  "La Baranda",

                href:
                  routes.proyecto(
                    locale,
                    "la-baranda",
                  ),
              },

              {
                texto:
                  "Index Clima",

                href:
                  routes.proyecto(
                    locale,
                    "index-clima",
                  ),
              },

              {
                texto:
                  "Top Led Canarias",

                href:
                  routes.proyecto(
                    locale,
                    "top-led-canarias",
                  ),
              },

              {
                texto:
                  "Tu Fiesta Party",

                href:
                  routes.proyecto(
                    locale,
                    "tu-fiesta-party",
                  ),
              },
            ],
          },


          /* ===============================================
             ALRED
             =============================================== */

          {
            titulo:
              "Alred",

            descripcion:
              esEspanol
                ? "Cuéntanos qué quieres mejorar en tu empresa."
                : "Tell us what you want to improve in your business.",

            /*
             * Clic en cualquier zona libre de la tarjeta.
             */
            href:
              routes.contacto(
                locale,
              ),

            enlacePrincipalLabel:
              esEspanol
                ? "Hablemos"
                : "Let's talk",

            imagen:
              "/images/Decorativas/textura-seda-holografica-plateada.jpg",

            posicionImagen:
              "center",

            oscuro:
              true,

            enlaces: [
              {
                texto:
                  esEspanol
                    ? "Inicio"
                    : "Home",

                href:
                  routes.inicio(
                    locale,
                  ),
              },

              {
                texto:
                  esEspanol
                    ? "Contacto"
                    : "Contact",

                href:
                  routes.contacto(
                    locale,
                  ),
              },

              {
                texto:
                  "Instagram",

                href:
                  "https://instagram.com/alred_es",

                externo:
                  true,
              },
            ],
          },
        ]}
      />


      {/* ===================================================
          CONTENIDO
         =================================================== */}

      {children}


      {/* ===================================================
          FOOTER

          Lo dejamos con tu estructura actual.
         =================================================== */}

        <Footer
        logo="/svg/Logos/logo-alred.svg"

        logoAlt="Alred"

        inicioHref={
          routes.inicio(
            locale,
          )
        }

        marca="Alred"

        marcaGrande="ALRED"

        marcaGrandeOpacidad={
          0.055
        }

        marcaGrandeBrilloOpacidad={
          0.28
        }

        marcaGrandeBrilloSegundos={
          8
        }

        descripcion={
          esEspanol
            ? "Soluciones digitales a medida para que tu empresa trabaje mejor."
            : "Custom digital solutions designed to help your business work better."
        }

        grupos={[
          {
            titulo:
              esEspanol
                ? "Soluciones"
                : "Solutions",

            enlaces: [
              {
                texto:
                  esEspanol
                    ? "Software a medida"
                    : "Custom software",

                href:
                  routes.solucion(
                    locale,
                    "software-a-medida",
                  ),
              },

              {
                texto:
                  esEspanol
                    ? "Automatizaciones"
                    : "Automations",

                href:
                  routes.solucion(
                    locale,
                    "automatizaciones",
                  ),
              },

              {
                texto:
                  esEspanol
                    ? "Integraciones"
                    : "Integrations",

                href:
                  routes.solucion(
                    locale,
                    "integraciones",
                  ),
              },

              {
                texto:
                  esEspanol
                    ? "Herramientas internas"
                    : "Internal tools",

                href:
                  routes.solucion(
                    locale,
                    "herramientas-internas",
                  ),
              },

              {
                texto:
                  "Dashboards",

                href:
                  routes.solucion(
                    locale,
                    "dashboards",
                  ),
              },
            ],
          },

          {
            titulo:
              "Alred",

            enlaces: [
              {
                texto:
                  esEspanol
                    ? "Proyectos"
                    : "Projects",

                href:
                  routes.proyectos(
                    locale,
                  ),
              },

              {
                texto:
                  esEspanol
                    ? "Contacto"
                    : "Contact",

                href:
                  routes.contacto(
                    locale,
                  ),
              },
            ],
          },
        ]}

        email={
          siteConfig.email
        }

        contactoTitulo={
          esEspanol
            ? "Contacto"
            : "Contact"
        }

        ubicacion={
          esEspanol
            ? "Tenerife, Canarias"
            : "Tenerife, Canary Islands"
        }

        cta={{
          texto:
            esEspanol
              ? "Hablemos"
              : "Let's talk",

          href:
            routes.contacto(
              locale,
            ),
        }}

        redes={[
          {
            tipo:
              "instagram",

            href:
              "https://instagram.com/alred_es",

            label:
              esEspanol
                ? "Instagram de Alred"
                : "Alred on Instagram",
          },

          {
            tipo:
              "email",

            href:
              `mailto:${siteConfig.email}`,

            label:
              esEspanol
                ? "Enviar un email a Alred"
                : "Email Alred",
          },
        ]}

        legales={[
          {
            texto:
              esEspanol
                ? "Aviso legal"
                : "Legal notice",

            href:
              rutaConLocale(
                locale,
                "/aviso-legal",
              ),
          },

          {
            texto:
              esEspanol
                ? "Privacidad"
                : "Privacy",

            href:
              rutaConLocale(
                locale,
                "/privacidad",
              ),
          },

          {
            texto:
              "Cookies",

            href:
              rutaConLocale(
                locale,
                "/cookies",
              ),
          },
        ]}

        copyright={
          esEspanol
            ? "© 2026 Alred. Todos los derechos reservados."
            : "© 2026 Alred. All rights reserved."
        }

        volverArribaTexto={
          esEspanol
            ? "Volver arriba"
            : "Back to top"
        }

          volverArribaHref="#"

          configurarCookiesTexto={
            esEspanol
              ? "Configurar cookies"
              : "Configure cookies"
          }
        />

      </ConsentProvider>

    </NextIntlClientProvider>
  );
}

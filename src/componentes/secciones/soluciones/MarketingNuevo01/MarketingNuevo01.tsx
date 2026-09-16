import type {
  CSSProperties,
} from "react";

import {
  Boton,
  Enlace,
} from "@/componentes/ui";

import styles from "./MarketingNuevo01.module.css";

import type {
  MarketingNuevo01Props,
} from "./MarketingNuevo01.types";


const metricasPorDefecto = [
  {
    label:
      "Clientes que repiten",

    valor:
      "31%",

    cambio:
      "+9%",
  },

  {
    label:
      "Códigos utilizados",

    valor:
      "184",

    cambio:
      "+42%",
  },

  {
    label:
      "Compras atribuidas",

    valor:
      "67",

    cambio:
      "+18%",
  },

  {
    label:
      "Conversión web",

    valor:
      "4,8%",

    cambio:
      "+1,2%",
  },
] as const;


const ideasPorDefecto = [
  "Códigos promocionales únicos por campaña para saber cuántas personas los utilizan, qué ventas generan y cuántos clientes vuelven a comprar.",

  "QR y enlaces específicos para cada campaña digital, anuncio o promoción para identificar qué origen genera más visitas, contactos, reservas o ventas.",

  "Mapas de calor y análisis de comportamiento para descubrir dónde hacen clic los usuarios, hasta dónde llegan y en qué punto abandonan la web.",

  "Seguimiento de conversiones para conectar anuncios con acciones reales: formularios enviados, reservas, compras, llamadas o solicitudes de presupuesto.",

  "SEO y visibilidad en buscadores y asistentes de IA para entender qué búsquedas atraen usuarios, qué páginas posicionan y qué contenidos merece la pena reforzar.",

  "Dashboards que reúnan visitas, campañas, leads, ventas, clientes recurrentes, coste por conversión, ROAS y evolución del negocio en un mismo lugar.",
] as const;


export function MarketingNuevo01({
  id = "marketing-digital",

  titulo =
    "Marketing que no acaba cuando publicas el anuncio.",

  descripcion =
    "Conectamos campañas, promociones, web y datos para saber qué atrae usuarios, qué convierte en contactos o ventas y qué acciones merece la pena repetir o mejorar.",

  ideas =
    ideasPorDefecto,

  cta = {
    texto:
      "Descubrir marketing digital",

    href:
      "/es/soluciones/marketing-digital",
  },

  ctaSecundario = {
    texto:
      "Ver cómo lo medimos",

    href:
      "/es/soluciones/marketing-digital#medicion",
  },

  fondoDesktop =
    "/images/Decorativas/background-marketing-digital.png",

  fondoMobile,

  fondoX =
    50,

  fondoY =
    50,

  fondoXMobile =
    62,

  fondoYMobile =
    50,

  grafica = {
    titulo:
      "Visitas que terminan en conversión",

    cambio:
      "+78%",
  },

  metricas =
    metricasPorDefecto,
}: MarketingNuevo01Props) {
  const mobileBackground =
    fondoMobile ??
    fondoDesktop;


  const shellStyle = {
    "--marketing-bg-desktop":
      `url("${fondoDesktop}")`,

    "--marketing-bg-mobile":
      `url("${mobileBackground}")`,

    "--marketing-bg-x":
      `${fondoX}%`,

    "--marketing-bg-y":
      `${fondoY}%`,

    "--marketing-bg-x-mobile":
      `${fondoXMobile}%`,

    "--marketing-bg-y-mobile":
      `${fondoYMobile}%`,
  } as CSSProperties;


  return (
    <section
      id={id}
      className={
        styles.section
      }
    >
      <div
        className={
          styles.shell
        }
        style={
          shellStyle
        }
      >
        <div
          className={
            styles.veil
          }
          aria-hidden="true"
        />


        {/* ===================================================
            COPY
           =================================================== */}

        <div
          className={
            styles.copy
          }
        >
          <h2
            className={
              styles.title
            }
          >
            {titulo}
          </h2>

          <p
            className={
              styles.description
            }
          >
            {descripcion}
          </p>


          {/* =================================================
              IDEAS DE MARKETING DIGITAL

              No son cards ni pills.
              Es una lista editorial con divisores.
             ================================================= */}

          <div
            className={
              styles.ideas
            }
          >
            {ideas.map(
              idea => (
                <p
                  key={
                    idea
                  }
                  className={
                    styles.idea
                  }
                >
                  {idea}
                </p>
              ),
            )}
          </div>


          {/* =================================================
              UI GLOBAL DE ALRED
             ================================================= */}

          <div
            className={
              styles.actions
            }
          >
            <Boton
              variante="principal"
              href={
                cta.href
              }
            >
              {cta.texto}
            </Boton>

            {ctaSecundario ? (
              <Enlace
                variante="flecha"
                href={
                  ctaSecundario.href
                }
              >
                {
                  ctaSecundario.texto
                }
              </Enlace>
            ) : null}
          </div>
        </div>


        {/* ===================================================
            ESCENARIO DE MÉTRICAS
           =================================================== */}

        <div
          className={
            styles.visual
          }
          aria-label="Ejemplo de información que puede medirse en una campaña digital"
        >
          <article
            className={
              styles.growthCard
            }
          >
            <div
              className={
                styles.growthHeader
              }
            >
              <span>
                {
                  grafica.titulo
                }
              </span>

              <strong>
                {
                  grafica.cambio
                }
              </strong>
            </div>


            <div
              className={
                styles.chartWrap
              }
            >
              <svg
                className={
                  styles.chartSvg
                }
                viewBox="0 0 300 118"
                preserveAspectRatio="none"
                role="img"
                aria-label="Evolución de visitas que terminan en conversión"
              >
                <line
                  x1="0"
                  y1="28"
                  x2="300"
                  y2="28"
                  className={
                    styles.chartGrid
                  }
                />

                <line
                  x1="0"
                  y1="70"
                  x2="300"
                  y2="70"
                  className={
                    styles.chartGrid
                  }
                />

                <line
                  x1="0"
                  y1="110"
                  x2="300"
                  y2="110"
                  className={
                    styles.chartGrid
                  }
                />

                <path
                  d="
                    M 8 96
                    C 28 82, 38 70, 58 64
                    C 78 58, 94 59, 112 55
                    C 132 61, 144 74, 159 80
                    C 180 65, 190 50, 208 40
                    C 226 43, 243 50, 258 52
                    C 272 38, 284 23, 294 12
                  "
                  className={
                    styles.chartLine
                  }
                />

                <circle
                  cx="294"
                  cy="12"
                  r="7"
                  className={
                    styles.chartPointOuter
                  }
                />

                <circle
                  cx="294"
                  cy="12"
                  r="3"
                  className={
                    styles.chartPointInner
                  }
                />
              </svg>
            </div>


            <div
              className={
                styles.months
              }
              aria-hidden="true"
            >
              <span>
                Ene
              </span>

              <span>
                Feb
              </span>

              <span>
                Mar
              </span>

              <span>
                Abr
              </span>

              <span>
                May
              </span>

              <span>
                Jun
              </span>
            </div>
          </article>


          <div
            className={
              styles.metrics
            }
          >
            {metricas
              .slice(
                0,
                4,
              )
              .map(
                (
                  metrica,
                  index,
                ) => (
                  <article
                    key={`${metrica.label}-${index}`}
                    className={
                      styles.metricCard
                    }
                  >
                    <div
                      className={
                        styles.metricCopy
                      }
                    >
                      <span
                        className={
                          styles.metricLabel
                        }
                      >
                        {
                          metrica.label
                        }
                      </span>

                      <div
                        className={
                          styles.metricValueRow
                        }
                      >
                        <strong>
                          {
                            metrica.valor
                          }
                        </strong>

                        {metrica.cambio ? (
                          <span
                            className={
                              styles.metricChange
                            }
                          >
                            {
                              metrica.cambio
                            }
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div
                      className={
                        styles.bars
                      }
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </article>
                ),
              )}
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

import type {
  CSSProperties,
} from "react";

import {
  Boton,
} from "@/componentes/ui";

import type {
  FooterProps,
  FooterRed,
} from "./Footer.types";

import styles from "./Footer.module.css";


/* =========================================================
   UTILIDADES
   ========================================================= */

function limitar(
  valor: number,
  minimo: number,
  maximo: number,
) {
  return Math.min(
    maximo,
    Math.max(
      minimo,
      valor,
    ),
  );
}


/* =========================================================
   ICONOS
   ========================================================= */

function IconoRed({
  tipo,
}: {
  tipo: FooterRed["tipo"];
}) {

  if (
    tipo === "instagram"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="5"
        />

        <circle
          cx="12"
          cy="12"
          r="3.5"
        />

        <circle
          cx="17.4"
          cy="6.7"
          r=".7"
          className={
            styles.iconFill
          }
        />
      </svg>
    );
  }


  if (
    tipo === "linkedin"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M6.5 9.5V18" />
        <path d="M6.5 6.3v.1" />

        <path d="M10.5 18v-8.5" />

        <path d="M10.5 13.2c.7-2.3 5.9-3.1 5.9 1.2V18" />
      </svg>
    );
  }


  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2"
      />

      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}


/* =========================================================
   FOOTER
   ========================================================= */

export function Footer({
  logo =
    "/svg/Logos/logo-alred.svg",

  logoAlt =
    "Alred",

  inicioHref =
    "/",

  marca =
    "Alred",

  marcaGrande =
    "ALRED",

  descripcion,

  grupos,

  email,

  contactoTitulo =
    "Contacto",

  ubicacion,

  cta,

  redes = [],

  legales = [],

  configurarCookiesTexto,

  copyright =
    "© 2026 Alred. Todos los derechos reservados.",

  volverArribaTexto =
    "Volver arriba",

  volverArribaHref =
    "#",

  marcaGrandeOpacidad =
    0.055,

  marcaGrandeBrilloOpacidad =
    0.28,

  marcaGrandeBrilloSegundos =
    8,
}: FooterProps) {

  const wordmarkOpacity =
    limitar(
      marcaGrandeOpacidad,
      0,
      1,
    );


  const shineOpacity =
    limitar(
      marcaGrandeBrilloOpacidad,
      0,
      1,
    );


  const shineDuration =
    Math.max(
      2,
      marcaGrandeBrilloSegundos,
    );


  const variables = {
    "--footer-wordmark-opacity":
      wordmarkOpacity,

    "--footer-wordmark-shine-opacity":
      shineOpacity,

    "--footer-wordmark-shine-duration":
      `${shineDuration}s`,
  } as CSSProperties;


  return (
    <footer
      className={
        styles.footer
      }
      aria-label="Pie de página"
      style={
        variables
      }
    >
      <div
        className={
          styles.shell
        }
      >

        {/* =================================================
            CONTENIDO SUPERIOR
           ================================================= */}

        <div
          className={
            styles.top
          }
        >

          {/* ===============================================
              MARCA
             =============================================== */}

          <div
            className={
              styles.brand
            }
          >
            <Link
              href={
                inicioHref
              }
              className={
                styles.brandLink
              }
              aria-label="Alred, inicio"
            >
              <Image
                src={
                  logo
                }
                alt={
                  logoAlt
                }
                width={515}
                height={382}
                className={
                  styles.logo
                }
              />

              <span>
                {marca}
              </span>
            </Link>


            <p
              className={
                styles.brandDescription
              }
            >
              {
                descripcion
              }
            </p>


            {/* REDES */}

            {redes.length > 0 && (
              <div
                className={
                  styles.socials
                }
                aria-label="Redes sociales de Alred"
              >
                {redes.map(
                  (
                    red,
                  ) => (
                    <a
                      key={`${red.tipo}-${red.href}`}
                      className={
                        styles.socialLink
                      }
                      href={
                        red.href
                      }
                      aria-label={
                        red.label ??
                        red.tipo
                      }
                      target={
                        red.tipo ===
                        "email"
                          ? undefined
                          : "_blank"
                      }
                      rel={
                        red.tipo ===
                        "email"
                          ? undefined
                          : "noreferrer"
                      }
                    >
                      <IconoRed
                        tipo={
                          red.tipo
                        }
                      />
                    </a>
                  ),
                )}
              </div>
            )}
          </div>


          {/* ===============================================
              NAVEGACIÓN
             =============================================== */}

          <div
            className={
              styles.groups
            }
          >
            {grupos.map(
              (
                grupo,
              ) => (
                <nav
                  key={
                    grupo.titulo
                  }
                  className={
                    styles.group
                  }
                  aria-label={
                    grupo.titulo
                  }
                >
                  <h2>
                    {
                      grupo.titulo
                    }
                  </h2>


                  <ul>
                    {grupo.enlaces.map(
                      (
                        enlace,
                      ) => (
                        <li
                          key={`${grupo.titulo}-${enlace.href}-${enlace.texto}`}
                        >
                          <Link
                            href={
                              enlace.href
                            }
                          >
                            {
                              enlace.texto
                            }
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </nav>
              ),
            )}
          </div>


          {/* ===============================================
              CONTACTO
             =============================================== */}

          <div
            className={
              styles.contact
            }
          >
            <h2>
              {contactoTitulo}
            </h2>


            <a
              className={
                styles.email
              }
              href={`mailto:${email}`}
            >
              {email}
            </a>


            {ubicacion && (
              <p
                className={
                  styles.location
                }
              >
                {
                  ubicacion
                }
              </p>
            )}


            <div
              className={
                styles.cta
              }
            >
              <Boton
                variante="principal"
                href={
                  cta.href
                }
              >
                {
                  cta.texto
                }
              </Boton>
            </div>
          </div>
        </div>


        {/* =================================================
            META
           ================================================= */}

        <div
          className={
            styles.meta
          }
        >
          <p>
            {
              copyright
            }
          </p>


          {legales.length > 0 && (
            <nav
              className={
                styles.legal
              }
              aria-label="Enlaces legales"
            >
              {legales.map(
                (
                  enlace,
                ) => (
                  <Link
                    key={`${enlace.href}-${enlace.texto}`}
                    href={
                      enlace.href
                    }
                  >
                    {
                      enlace.texto
                    }
                  </Link>
                ),
              )}

              {configurarCookiesTexto && (
                <button
                  type="button"
                  className={styles.legalButton}
                  data-open-cookie-settings
                >
                  {configurarCookiesTexto}
                </button>
              )}
            </nav>
          )}


          <a
            className={
              styles.backToTop
            }
            href={
              volverArribaHref
            }
          >
            <span>
              {
                volverArribaTexto
              }
            </span>

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 19V5" />
              <path d="m7 10 5-5 5 5" />
            </svg>
          </a>
        </div>


        {/* =================================================
            ALRED GIGANTE
           ================================================= */}

        <div
          className={
            styles.wordmarkArea
          }
          aria-hidden="true"
        >
          <div
            className={
              styles.wordmark
            }
            data-text={
              marcaGrande
            }
          >
            {
              marcaGrande
            }
          </div>
        </div>
      </div>
    </footer>
  );
}
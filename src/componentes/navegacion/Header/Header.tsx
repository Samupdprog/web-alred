"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Boton,
  ArrowUpRight,
} from "@/componentes/ui";

import type {
  HeaderProps,
} from "./Header.types";

import styles from "./Header.module.css";


export function Header({
  logo = "/svg/Logos/logo-alred.svg",
  logoAlt = "Alred",
  inicioHref = "/",
  cta,
  tarjetas,
  idioma,
}: HeaderProps) {
  const pathname =
    usePathname();

  const [rutaAnterior, setRutaAnterior] = useState(pathname);

  const [
    rutaMenu,
    setRutaMenu,
  ] = useState<string | null>(
    null,
  );

  if (rutaAnterior !== pathname) {
    setRutaAnterior(pathname);
    setRutaMenu(null);
  }

  const menuAbierto =
    rutaMenu === pathname;

  const botonRef =
    useRef<HTMLButtonElement>(
      null,
    );

  const menuId =
    useId();


  /* =========================================================
     CAMBIO DE IDIOMA

     Mantiene la ruta actual.

     /es/soluciones/marketing-digital
     →
     /en/soluciones/marketing-digital
     ========================================================= */

  const idiomaHref =
    useMemo(() => {
      const destinoBase =
        idioma.href.replace(
          /\/+$/,
          "",
        );

      const segmentos =
        pathname
          .split("/")
          .filter(Boolean);

      const resto =
        segmentos
          .slice(1)
          .join("/");

      if (!resto) {
        return destinoBase;
      }

      return `${destinoBase}/${resto}`;
    }, [
      idioma.href,
      pathname,
    ]);


  /* =========================================================
     CERRAR MENÚ AL CAMBIAR DE RUTA
     ========================================================= */

  /* =========================================================
     CERRAR CON ESCAPE
     ========================================================= */

  useEffect(() => {
    const cerrarConEscape = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key !==
        "Escape"
      ) {
        return;
      }

      setRutaMenu(
        null,
      );

      if (botonRef.current?.getAttribute("aria-expanded") === "true") botonRef.current.focus();
    };


    document.addEventListener(
      "keydown",
      cerrarConEscape,
    );


    return () => {
      document.removeEventListener(
        "keydown",
        cerrarConEscape,
      );
    };
  }, []);


  /* =========================================================
     BLOQUEAR SCROLL SOLO EN MÓVIL
     ========================================================= */

  useEffect(() => {
    if (!menuAbierto) {
      return;
    }

    const media =
      window.matchMedia(
        "(max-width: 700px)",
      );

    const overflowAnterior =
      document.body.style.overflow;


    const actualizarScroll =
      () => {
        if (
          media.matches
        ) {
          document.body.style.overflow =
            "hidden";

          return;
        }

        document.body.style.overflow =
          overflowAnterior;
      };


    actualizarScroll();


    media.addEventListener(
      "change",
      actualizarScroll,
    );


    return () => {
      document.body.style.overflow =
        overflowAnterior;

      media.removeEventListener(
        "change",
        actualizarScroll,
      );
    };
  }, [
    menuAbierto,
  ]);


  /* =========================================================
     ACCIONES
     ========================================================= */

  const cerrarMenu =
    () => {
      setRutaMenu(
        null,
      );
    };


  const alternarMenu =
    () => {
      setRutaMenu(
        actual =>
          actual === pathname
            ? null
            : pathname,
      );
    };


  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <header
      className={
        styles.header
      }
    >
      <div
        className={
          styles.container
        }
      >
        <nav
          className={`${styles.nav} ${
            menuAbierto
              ? styles.navOpen
              : ""
          }`}
          aria-label="Navegación principal"
        >

          {/* BARRA SUPERIOR */}

          <div
            className={
              styles.top
            }
          >

            {/* MENÚ */}

            <button
              ref={
                botonRef
              }
              className={
                styles.menuButton
              }
              type="button"
              aria-expanded={
                menuAbierto
              }
              aria-controls={
                menuId
              }
              aria-label={
                menuAbierto
                  ? "Cerrar menú"
                  : "Abrir menú"
              }
              onClick={
                alternarMenu
              }
            >
              <span
                className={`${styles.menuLine} ${styles.menuLineFirst}`}
              />

              <span
                className={`${styles.menuLine} ${styles.menuLineSecond}`}
              />
            </button>


            {/* LOGO */}

            <Link
              className={
                styles.logo
              }
              href={
                inicioHref
              }
              aria-label="Alred, inicio"
              onClick={
                cerrarMenu
              }
            >
              <Image
                className={
                  styles.logoImage
                }
                src={
                  logo
                }
                alt={
                  logoAlt
                }
                width={
                  515
                }
                height={
                  382
                }
                priority
              />
            </Link>


            {/* ACCIONES DERECHA */}

            <div
              className={
                styles.actions
              }
            >
              <Link
                className={
                  styles.language
                }
                href={
                  idiomaHref
                }
                aria-label={
                  idioma.textoAccesible
                }
                onClick={
                  cerrarMenu
                }
              >
                <svg
                  className={
                    styles.languageIcon
                  }
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />

                  <path
                    d="M3 12h18"
                  />

                  <path
                    d="M12 3a14 14 0 0 1 0 18"
                  />

                  <path
                    d="M12 3a14 14 0 0 0 0 18"
                  />
                </svg>

                <span>
                  {
                    idioma.actual
                  }
                </span>
              </Link>


              <div
                className={
                  styles.desktopCta
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


          {/* CONTENIDO DESPLEGABLE */}

          <div
            id={
              menuId
            }
            className={
              styles.menuContent
            }
            aria-hidden={
              !menuAbierto
            }
            inert={
              !menuAbierto
            }
          >
            <div
              className={
                styles.cards
              }
            >
              {tarjetas.map(
                tarjeta => (
                  <article
                    key={
                      tarjeta.titulo
                    }
                    className={`${styles.card} ${
                      tarjeta.oscuro
                        ? styles.cardDark
                        : ""
                    }`}
                  >

                    {/* IMAGEN */}

                    <div
                      className={
                        styles.cardBackground
                      }
                    >
                      <Image
                        className={
                          styles.cardImage
                        }
                        src={
                          tarjeta.imagen
                        }
                        alt=""
                        fill
                        sizes="
                          (max-width: 700px) 100vw,
                          33vw
                        "
                        style={{
                          objectPosition:
                            tarjeta.posicionImagen ??
                            "center",
                        }}
                      />
                    </div>


                    {/* CRISTAL */}

                    <div
                      className={
                        styles.cardGlass
                      }
                      aria-hidden="true"
                    />


                    {/* ENLACE GENERAL DE LA TARJETA */}

                    <Link
                      className={
                        styles.cardMainLink
                      }
                      href={
                        tarjeta.href
                      }
                      aria-label={
                        tarjeta.enlacePrincipalLabel ??
                        tarjeta.titulo
                      }
                      onClick={
                        cerrarMenu
                      }
                    />


                    {/* CONTENIDO */}

                    <div
                      className={
                        styles.cardContent
                      }
                    >
                      <div
                        className={
                          styles.cardIntro
                        }
                      >
                        <h2
                          className={
                            styles.cardTitle
                          }
                        >
                          {
                            tarjeta.titulo
                          }
                        </h2>

                        <p
                          className={
                            styles.cardDescription
                          }
                        >
                          {
                            tarjeta.descripcion
                          }
                        </p>
                      </div>


                      {/* ENLACES ESPECÍFICOS */}

                      <div
                        className={
                          styles.cardLinks
                        }
                      >
                        {tarjeta.enlaces.map(
                          enlace => (
                            <Link
                              key={`${enlace.texto}-${enlace.href}`}
                              className={
                                styles.cardLink
                              }
                              href={
                                enlace.href
                              }
                              target={
                                enlace.externo
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                enlace.externo
                                  ? "noreferrer"
                                  : undefined
                              }
                              onClick={
                                cerrarMenu
                              }
                            >
                              <span>
                                {
                                  enlace.texto
                                }
                              </span>

                              <span
                                className={
                                  styles.cardArrow
                                }
                                aria-hidden="true"
                              >
                                <ArrowUpRight
                                  size={14}
                                />
                              </span>
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>


            {/* PIE MÓVIL */}

            <div
              className={
                styles.mobileFooter
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


              <Link
                className={
                  styles.mobileLanguage
                }
                href={
                  idiomaHref
                }
                aria-label={
                  idioma.textoAccesible
                }
                onClick={
                  cerrarMenu
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />

                  <path
                    d="M3 12h18"
                  />

                  <path
                    d="M12 3a14 14 0 0 1 0 18"
                  />

                  <path
                    d="M12 3a14 14 0 0 0 0 18"
                  />
                </svg>

                <span>
                  {
                    idioma.actual
                  }
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

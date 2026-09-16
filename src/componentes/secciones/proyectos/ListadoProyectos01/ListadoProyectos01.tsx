"use client";

import Image from "next/image";
import Link from "next/link";
import { ImagenProyecto } from "../ImagenProyecto";

import type {
  CSSProperties,


} from "react";

import {
  useSyncExternalStore,
  useMemo,

  useState,
} from "react";

import { useDeslizamiento } from "@/componentes/efectos/carrusel/useDeslizamiento";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "@/componentes/ui";

import styles from "./ListadoProyectos01.module.css";

import type {
  ListadoProyectos01Props,
} from "./ListadoProyectos01.types";


type Direccion =
  | -1
  | 0
  | 1;


type Vista =
  | "filas"
  | "tarjetas";


const STORAGE_KEY =
  "alred-proyectos-vista";


function leerVista(): Vista {
  try { return window.sessionStorage.getItem(STORAGE_KEY) === "tarjetas" ? "tarjetas" : "filas"; }
  catch { return "filas"; }
}
const suscribirVista = () => () => {};
const vistaServidor = (): Vista => "filas";

export function ListadoProyectos01({
  id = "listado-proyectos",

  titulo,

  descripcion,

  proyectos,

  excluir,

  porPagina,

  baseHref = "/proyectos",

  locale = "es",
}: ListadoProyectos01Props) {

  const esEspanol = locale !== "en";

  /* =======================================================
     PROYECTOS DISPONIBLES
     ======================================================= */

  const disponibles =
    useMemo(
      () =>
        proyectos.filter(
          (
            proyecto,
          ) =>
            proyecto.slug !==
            excluir,
        ),
      [
        excluir,
        proyectos,
      ],
    );


  const cantidad =
    porPagina &&
    porPagina > 0
      ? porPagina
      : disponibles.length;


  const totalPaginas =
    Math.max(
      1,
      Math.ceil(
        disponibles.length /
          Math.max(
            1,
            cantidad,
          ),
      ),
    );


  /* =======================================================
     ESTADO
     ======================================================= */

  const [
    pagina,
    setPagina,
  ] =
    useState(0);


  const [
    direccion,
    setDireccion,
  ] =
    useState<Direccion>(
      0,
    );


  const guardada = useSyncExternalStore(suscribirVista, leerVista, vistaServidor);
  const [vistaElegida, setVista] = useState<Vista | null>(null);
  const vista = vistaElegida ?? guardada;

  const cambiarVista = (
    nuevaVista: Vista,
  ) => {
    setVista(
      nuevaVista,
    );


    try {
      window.sessionStorage.setItem(STORAGE_KEY, nuevaVista);
    } catch { /* Mantener la vista elegida aunque no pueda persistirse. */ }
  };


  /* =======================================================
     SWIPE
     ======================================================= */

  const filtroActual = JSON.stringify([excluir, porPagina, disponibles.length]);
  const [filtroAnterior, setFiltroAnterior] = useState(filtroActual);
  if (filtroAnterior !== filtroActual) {
    setFiltroAnterior(filtroActual);
    setPagina(0);
    setDireccion(0);
  }

  const visibles =
    porPagina &&
    porPagina > 0
      ? disponibles.slice(
          pagina *
            cantidad,

          pagina *
            cantidad +
            cantidad,
        )
      : disponibles;





  /* =======================================================
     PAGINACIÓN
     ======================================================= */

  const moverPagina = (
    direccionCambio:
      | -1
      | 1,
  ) => {
    if (
      totalPaginas <=
      1
    ) {
      return;
    }


    setDireccion(
      direccionCambio,
    );


    setPagina(
      (
        actual,
      ) =>
        (
          actual +
          direccionCambio +
          totalPaginas
        ) %
        totalPaginas,
    );
  };


  const seleccionarPagina = (
    nuevaPagina: number,
  ) => {
    if (
      nuevaPagina ===
      pagina
    ) {
      return;
    }


    setDireccion(
      nuevaPagina >
        pagina
        ? 1
        : -1,
    );


    setPagina(
      nuevaPagina,
    );
  };


  /* =======================================================
     GESTO HORIZONTAL
     ======================================================= */

  const deslizamiento = useDeslizamiento({
    habilitado: totalPaginas > 1,
    mover: moverPagina,
    permitirEnlaces: true,
  });

  if (!disponibles.length) return null;

  const claseDireccion =
    direccion ===
    1
      ? styles.gridDesdeDerecha
      : direccion ===
          -1
        ? styles.gridDesdeIzquierda
        : styles.gridInicial;


  const claseVista =
    vista ===
    "tarjetas"
      ? styles.gridTarjetas
      : styles.gridFilas;


  return (
    <section
      id={id}
      className={
        styles.section
      }
      aria-labelledby={
        titulo
          ? `${id}-titulo`
          : undefined
      }
    >

      {/* ===================================================
          CABECERA
         =================================================== */}

      {(titulo ||
        descripcion) && (
        <div
          className={
            styles.heading
          }
        >
          <div
            className={
              styles.headingMain
            }
          >
            {titulo && (
              <h2
                id={`${id}-titulo`}
              >
                {
                  titulo
                }
              </h2>
            )}
          </div>


          <div
            className={
              styles.headingAside
            }
          >
            {descripcion && (
              <p>
                {
                  descripcion
                }
              </p>
            )}


            {/* =============================================
                SELECTOR DE VISTA
               ============================================= */}

            <div
              className={
                styles.viewSwitch
              }
              aria-label={esEspanol ? "Cambiar vista de proyectos" : "Change projects view"}
            >

              {/* FILAS */}

              <button
                type="button"
                className={`${styles.viewButton} ${
                  vista ===
                  "filas"
                    ? styles.viewButtonActive
                    : ""
                }`}
                onClick={
                  () =>
                    cambiarVista(
                      "filas",
                    )
                }
                aria-label={esEspanol ? "Ver proyectos en filas" : "View projects in rows"}
                aria-pressed={
                  vista ===
                  "filas"
                }
                title={esEspanol ? "Vista en filas" : "Rows view"}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="6"
                    rx="1.6"
                  />

                  <rect
                    x="3"
                    y="14"
                    width="18"
                    height="6"
                    rx="1.6"
                  />
                </svg>
              </button>


              {/* TARJETAS */}

              <button
                type="button"
                className={`${styles.viewButton} ${
                  vista ===
                  "tarjetas"
                    ? styles.viewButtonActive
                    : ""
                }`}
                onClick={
                  () =>
                    cambiarVista(
                      "tarjetas",
                    )
                }
                aria-label={esEspanol ? "Ver proyectos en tarjetas" : "View projects as cards"}
                aria-pressed={
                  vista ===
                  "tarjetas"
                }
                title={esEspanol ? "Vista en tarjetas" : "Cards view"}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="7"
                    rx="1.5"
                  />

                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="7"
                    rx="1.5"
                  />

                  <rect
                    x="3"
                    y="14"
                    width="7"
                    height="7"
                    rx="1.5"
                  />

                  <rect
                    x="14"
                    y="14"
                    width="7"
                    height="7"
                    rx="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ===================================================
          PROYECTOS
         =================================================== */}

      <div
        key={`${pagina}-${vista}`}
        className={`${styles.grid} ${claseVista} ${claseDireccion}`}
        {...deslizamiento}
      >
        {visibles.map(
          (
            proyecto,
          ) => {

            const position = {
              "--listado-posicion":
                proyecto.imagenPosicion ??
                "center",

              "--listado-posicion-mobile":
                proyecto.imagenPosicionMobile ??
                proyecto.imagenPosicion ??
                "center",
            } as CSSProperties;


            const href =
              `${baseHref.replace(
                /\/$/,
                "",
              )}/${proyecto.slug}`;


            return (
              <Link
                key={
                  proyecto.slug
                }
                href={
                  href
                }
                className={
                  styles.card
                }
                aria-label={`${esEspanol ? "Ver proyecto" : "View project"} ${proyecto.nombre}`}
              >

                {/* =========================================
                    IMAGEN
                   ========================================= */}

                <div
                  className={
                    styles.media
                  }
                  style={
                    position
                  }
                >
                  <ImagenProyecto proyecto={proyecto} pictureClass={styles.picture} imageClass={styles.image} />


                  <div
                    className={
                      styles.logo
                    }
                  >
                    <Image
                      src={
                        proyecto.logo
                      }
                      alt=""
                      width={
                        52
                      }
                      height={
                        52
                      }
                    />
                  </div>
                </div>


                {/* =========================================
                    CONTENIDO
                   ========================================= */}

                <div
                  className={
                    styles.content
                  }
                >
                  <p
                    className={
                      styles.category
                    }
                  >
                    {
                      proyecto.categoria
                    }
                  </p>


                  <h3>
                    {
                      proyecto.nombre
                    }
                  </h3>


                  <p
                    className={
                      styles.description
                    }
                  >
                    {
                      proyecto.descripcion
                    }
                  </p>


                  <span
                    className={
                      styles.link
                    }
                  >
                    {esEspanol ? "Ver proyecto" : "View project"}

                    <span
                      aria-hidden="true"
                    >
                      <ArrowUpRight
                        size={16}
                      />
                    </span>
                  </span>
                </div>
              </Link>
            );
          },
        )}
      </div>


      {/* ===================================================
          PAGINACIÓN
         =================================================== */}

      {porPagina &&
        totalPaginas >
          1 && (
          <div
            className={
              styles.pagination
            }
          >
            <div
              className={
                styles.dots
              }
              aria-label={esEspanol ? "Página de proyectos" : "Projects page"}
            >
              {Array.from(
                {
                  length:
                    totalPaginas,
                },
                (
                  _,
                  index,
                ) => (
                  <button
                    key={
                      index
                    }
                    type="button"
                    className={`${styles.dot} ${
                      index ===
                      pagina
                        ? styles.dotActive
                        : ""
                    }`}
                    onClick={
                      () =>
                        seleccionarPagina(
                          index,
                        )
                    }
                    aria-label={`${esEspanol ? "Ver grupo" : "View group"} ${index + 1}`}
                    aria-current={
                      index ===
                      pagina
                        ? "true"
                        : undefined
                    }
                  />
                ),
              )}
            </div>


            <div
              className={
                styles.arrows
              }
            >
              <button
                type="button"
                className={
                  styles.arrow
                }
                onClick={
                  () =>
                    moverPagina(
                      -1,
                    )
                }
                aria-label={esEspanol ? "Proyectos anteriores" : "Previous projects"}
              >
                <ArrowLeft
                  size={18}
                />
              </button>


              <button
                type="button"
                className={
                  styles.arrow
                }
                onClick={
                  () =>
                    moverPagina(
                      1,
                    )
                }
                aria-label={esEspanol ? "Proyectos siguientes" : "Next projects"}
              >
                <ArrowRight
                  size={18}
                />
              </button>
            </div>
          </div>
        )}
    </section>
  );
}
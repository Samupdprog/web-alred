import {
  getImageProps,
} from "next/image";

import Link from "next/link";

import type {
  CSSProperties,
} from "react";

import styles from "./SolucionEnfoque01.module.css";

import type {
  SolucionEnfoque01Props,
} from "./SolucionEnfoque01.types";

import {
  ArrowUpRight,
} from "@/componentes/ui";


export function SolucionEnfoque01({
  id = "enfoque",

  titulo =
    "No partimos de una herramienta cerrada.",

  tituloSecundario =
    "Partimos de cómo trabaja tu empresa.",

  descripcion =
    "Analizamos tus procesos, entendemos tus necesidades y diseñamos la solución más sencilla y efectiva. La tecnología se decide después de entender el problema.",

  cta = {
    texto:
      "Conoce nuestro proceso",

    href:
      "/nosotros",
  },

  fondoDesktop =
    "/images/Decorativas/Ondas de vidrio translúcido sobre blanco(1).png",

  fondoMobile,

  fondoX =
    50,

  fondoY =
    50,

  fondoXMobile =
    72,

  fondoYMobile =
    50,
}: SolucionEnfoque01Props) {
  const {
    props: desktop,
  } =
    getImageProps({
      src:
        fondoDesktop,

      alt:
        "",

      width:
        2172,

      height:
        724,

      sizes:
        "100vw",
    });


  const {
    props: mobile,
  } =
    getImageProps({
      src:
        fondoMobile ??
        fondoDesktop,

      alt:
        "",

      width:
        1200,

      height:
        1600,

      sizes:
        "100vw",
    });


  const variables = {
    "--fondo-x":
      `${fondoX}%`,

    "--fondo-y":
      `${fondoY}%`,

    "--fondo-x-mobile":
      `${fondoXMobile}%`,

    "--fondo-y-mobile":
      `${fondoYMobile}%`,
  } as CSSProperties;


  return (
    <section
      id={id}
      className={
        styles.section
      }
      aria-labelledby={`${id}-titulo`}
    >
      <div
        className={
          styles.shell
        }
        style={
          variables
        }
      >
        <picture
          className={
            styles.background
          }
          aria-hidden="true"
        >
          <source
            media="(max-width: 719px)"
            srcSet={
              mobile.srcSet
            }
            sizes={
              mobile.sizes
            }
          />

          <img
            {...desktop}
            alt=""
            draggable={
              false
            }
            className={
              styles.backgroundImage
            }
          />
        </picture>


        <div
          className={
            styles.veil
          }
          aria-hidden="true"
        />


        <div
          className={
            styles.copy
          }
        >
          <h2
            id={`${id}-titulo`}
            className={
              styles.title
            }
          >
            {titulo}
          </h2>

          <p
            className={
              styles.titleSecondary
            }
          >
            {tituloSecundario}
          </p>

          <p
            className={
              styles.description
            }
          >
            {descripcion}
          </p>

          <Link
            href={
              cta.href
            }
            className={
              styles.cta
            }
          >
            {cta.texto}

            <span
              aria-hidden="true"
            >
              <ArrowUpRight
                size={16}
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

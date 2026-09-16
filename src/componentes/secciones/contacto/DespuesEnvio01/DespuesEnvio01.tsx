import {
  getImageProps,
} from "next/image";

import type {
  CSSProperties,
} from "react";

import styles from "./DespuesEnvio01.module.css";

import type {
  DespuesEnvio01Props,
  PasoDespuesEnvio,
} from "./DespuesEnvio01.types";


function PasoVisual({
  paso,
}: {
  paso: PasoDespuesEnvio;
}) {
  const {
    props: desktop,
  } =
    getImageProps({
      src:
        paso.fondoDesktop,

      alt:
        paso.fondoAlt ??
        "",

      width:
        1100,

      height:
        900,

      sizes:
        "(max-width: 899px) 100vw, 33vw",
    });


  const {
    props: mobile,
  } =
    getImageProps({
      src:
        paso.fondoMobile ??
        paso.fondoDesktop,

      alt:
        paso.fondoAlt ??
        "",

      width:
        900,

      height:
        900,

      sizes:
        "100vw",
    });


  const variables = {
    "--fondo-x":
      `${paso.fondoX ?? 50}%`,

    "--fondo-y":
      `${paso.fondoY ?? 50}%`,

    "--fondo-x-mobile":
      `${paso.fondoXMobile ?? paso.fondoX ?? 50}%`,

    "--fondo-y-mobile":
      `${paso.fondoYMobile ?? paso.fondoY ?? 50}%`,
  } as CSSProperties;


  return (
    <article
      className={
        styles.card
      }
      style={
        variables
      }
    >
      <picture
        className={
          styles.cardMedia
        }
        aria-hidden="true"
      >
        <source
          media="(max-width: 899px)"
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
          className={
            styles.cardImage
          }
          draggable={
            false
          }
        />
      </picture>


      <div
        className={
          styles.cardVeil
        }
        aria-hidden="true"
      />


      <div
        className={
          styles.cardContent
        }
      >
        <h3
          className={
            styles.cardTitle
          }
        >
          {
            paso.titulo
          }
        </h3>

        <p
          className={
            styles.cardDescription
          }
        >
          {
            paso.descripcion
          }
        </p>
      </div>
    </article>
  );
}


export function DespuesEnvio01({
  id = "despues-de-enviarlo",

  titulo =
    "Después de enviarlo.",

  descripcion =
    "Revisamos lo que nos has contado antes de responderte. La idea es llegar a la primera conversación entendiendo ya qué necesitas y poder orientarte desde el principio.",

  pasos,
}: DespuesEnvio01Props) {
  return (
    <section
      id={
        id
      }
      className={
        styles.section
      }
      aria-labelledby={`${id}-titulo`}
    >
      <header
        className={
          styles.header
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
            styles.description
          }
        >
          {descripcion}
        </p>
      </header>


      <div
        className={
          styles.grid
        }
      >
        {
          pasos.map(
            (
              paso,
              index,
            ) => (
              <PasoVisual
                key={`${paso.titulo}-${index}`}
                paso={
                  paso
                }
              />
            ),
          )
        }
      </div>
    </section>
  );
}

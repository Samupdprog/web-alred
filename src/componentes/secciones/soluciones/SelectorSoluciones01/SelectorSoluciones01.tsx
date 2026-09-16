import Image from "next/image";
import Link from "next/link";

import type {
  CSSProperties,
} from "react";

import styles from "./SelectorSoluciones01.module.css";

import type {
  SelectorSoluciones01Props,
  SolucionSelectorItem,
} from "./SelectorSoluciones01.types";

import {
  ArrowUpRight,
} from "@/componentes/ui";


function ordenarSoluciones(
  soluciones: SolucionSelectorItem[],
  activa?: string,
) {
  if (!activa) {
    return soluciones;
  }

  const seleccionada =
    soluciones.filter(
      solucion =>
        solucion.slug === activa,
    );

  const resto =
    soluciones.filter(
      solucion =>
        solucion.slug !== activa,
    );

  return [
    ...seleccionada,
    ...resto,
  ];
}


function TarjetaSolucion({
  solucion,
  activa,
  enlaceLabel,
}: {
  solucion: SolucionSelectorItem;
  activa: boolean;
  enlaceLabel: string;
}) {
  const variables = {
    "--imagen-x":
      `${solucion.imagenX ?? 50}%`,

    "--imagen-y":
      `${solucion.imagenY ?? 50}%`,

    "--imagen-x-mobile":
      `${solucion.imagenXMobile ?? solucion.imagenX ?? 50}%`,

    "--imagen-y-mobile":
      `${solucion.imagenYMobile ?? solucion.imagenY ?? 50}%`,
  } as CSSProperties;


  return (
    <Link
      href={
        solucion.href
      }
      className={`${styles.card} ${
        activa
          ? styles.cardActiva
          : ""
      }`}
      aria-current={
        activa
          ? "page"
          : undefined
      }
      style={
        variables
      }
    >
      <div
        className={
          styles.visual
        }
      >
        <Image
          src={
            solucion.imagen
          }
          alt={
            solucion.imagenAlt ??
            ""
          }
          fill
          sizes="(max-width: 719px) 100vw, (max-width: 1099px) 50vw, 25vw"
          className={
            styles.image
          }
        />
      </div>


      <div
        className={
          styles.content
        }
      >
        <h3
          className={
            styles.cardTitle
          }
        >
          {
            solucion.titulo
          }
        </h3>

        <p
          className={
            styles.cardDescription
          }
        >
          {
            solucion.descripcion
          }
        </p>


        <span
          className={
            styles.linkText
          }
          aria-hidden="true"
        >
          {enlaceLabel}

          <span
            className={
              styles.arrow
            }
          >
            <ArrowUpRight
              size={16}
            />
          </span>
        </span>
      </div>
    </Link>
  );
}


export function SelectorSoluciones01({
  id = "soluciones",

  titulo =
    "Todo lo que tu empresa necesita, en un solo lugar",

  descripcion =
    "Soluciones conectadas entre sí, diseñadas alrededor de cómo trabaja tu empresa.",

  enlaceLabel =
    "Saber más",

  soluciones,

  activa,
}: SelectorSoluciones01Props) {
  const solucionesOrdenadas =
    ordenarSoluciones(
      soluciones,
      activa,
    );


  const variables = {
    "--solution-count":
      Math.min(
        Math.max(
          solucionesOrdenadas.length,
          1,
        ),
        5,
      ),
  } as CSSProperties;


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
          {
            titulo
          }
        </h2>

        <p
          className={
            styles.description
          }
        >
          {
            descripcion
          }
        </p>
      </header>


      <div
        className={
          styles.grid
        }
        style={
          variables
        }
      >
        {
          solucionesOrdenadas.map(
            solucion => (
              <TarjetaSolucion
                key={
                  solucion.slug
                }
                solucion={
                  solucion
                }
                activa={
                  solucion.slug === activa
                }

                enlaceLabel={
                  enlaceLabel
                }
              />
            ),
          )
        }
      </div>
    </section>
  );
}

"use client";

import {
  useId,
  useState,
} from "react";

import styles from "./Dudas01.module.css";

import type {
  Dudas01Props,
} from "./Dudas01.types";


export function Dudas01({
  id = "dudas",
  titulo,
  descripcion,
  preguntas,
  abiertaInicial = 0,
}: Dudas01Props) {
  const reactId =
    useId();

  const [
    abierta,
    setAbierta,
  ] =
    useState<number | null>(
      abiertaInicial,
    );


  if (
    preguntas.length === 0
  ) {
    return null;
  }


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
          styles.heading
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

        {descripcion && (
          <p
            className={
              styles.description
            }
          >
            {descripcion}
          </p>
        )}
      </div>


      <div
        className={
          styles.frame
        }
      >
        {preguntas.map(
          (
            item,
            index,
          ) => {
            const estaAbierta =
              abierta ===
              index;

            const itemId =
              item.id ??
              `${reactId}-${index}`;

            const buttonId =
              `${itemId}-boton`;

            const panelId =
              `${itemId}-panel`;


            return (
              <article
                key={
                  itemId
                }
                className={`${styles.item} ${
                  estaAbierta
                    ? styles.itemOpen
                    : ""
                }`}
              >
                <h3
                  className={
                    styles.questionHeading
                  }
                >
                  <button
                    id={
                      buttonId
                    }
                    type="button"
                    className={
                      styles.question
                    }
                    aria-expanded={
                      estaAbierta
                    }
                    aria-controls={
                      panelId
                    }
                    onClick={
                      () =>
                        setAbierta(
                          estaAbierta
                            ? null
                            : index,
                        )
                    }
                  >
                    {
                      item.pregunta
                    }
                  </button>
                </h3>


                <div
                  id={
                    panelId
                  }
                  className={
                    styles.answerGrid
                  }
                  role="region"
                  aria-labelledby={
                    buttonId
                  }
                  aria-hidden={
                    !estaAbierta
                  }
                >
                  <div
                    className={
                      styles.answerInner
                    }
                  >
                    <p
                      className={
                        styles.answer
                      }
                    >
                      {
                        item.respuesta
                      }
                    </p>
                  </div>
                </div>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}

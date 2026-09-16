import {
  Boton,
} from "@/componentes/ui";

import {
  FondoRevelado,
} from "./FondoRevelado";

import {
  OrbitaIntegraciones,
} from "./OrbitaIntegraciones";

import styles from "./Conectado01.module.css";

import type {
  Conectado01Props,
} from "./Conectado01.types";


export function Conectado01({
  id =
    "todo-conectado",

  titulo,

  introduccion,

  puntos = [],

  cta,

  fondo,

  fondoMobile,

  fondoAlt = "",

  fondoPosition =
    "center",

  fondoPositionMobile,

  efectoFondoFijo =
    false,

  fondoY,

  fondoYMobile,

  visual,

  prueba,

  orbita,
}: Conectado01Props) {

  return (
    <section
      id={id}
      className={
        styles.section
      }
      aria-labelledby={`${id}-titulo`}
    >

      {/* ===================================================
          CABECERA
         =================================================== */}

      <div
        className={
          styles.intro
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


        <div
          className={
            styles.copy
          }
        >
          <p
            className={
              styles.introduction
            }
          >
            {
              introduccion
            }
          </p>


          {/* ===============================================
              PUNTOS
             =============================================== */}

          {puntos.length > 0 && (
            <ul
              className={
                styles.points
              }
            >
              {puntos.map(
                (
                  punto,
                  index,
                ) => (
                  <li
                    key={`${punto.texto}-${index}`}
                  >
                    <span
                      className={
                        styles.check
                      }
                      aria-hidden="true"
                    >
                      ✓
                    </span>

                    <span>
                      {
                        punto.texto
                      }
                    </span>
                  </li>
                ),
              )}
            </ul>
          )}


          {/* ===============================================
              CTA
             =============================================== */}

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


      {/* ===================================================
          VISUAL
         =================================================== */}

      <div
        className={
          styles.visual
        }
      >

        {/* ===============================================
            FONDO

            Puede funcionar:
            - normal
            - fijo/revelado con scroll
           =============================================== */}

        <FondoRevelado
          fondo={
            fondo
          }

          fondoMobile={
            fondoMobile
          }

          fondoAlt={
            fondoAlt
          }

          fondoPosition={
            fondoPosition
          }

          fondoPositionMobile={
            fondoPositionMobile
          }

          efectoFondoFijo={
            efectoFondoFijo
          }

          fondoY={
            fondoY
          }

          fondoYMobile={
            fondoYMobile
          }
        />


        {/* ===============================================
            TRATAMIENTO EXISTENTE
           =============================================== */}

        <div
          className={
            styles.visualTreatment
          }
          aria-hidden="true"
        />


        {/* ===============================================
            ÓRBITA
           =============================================== */}

        {orbita && (
          <div
            className={
              styles.orbitLayer
            }
          >
            <OrbitaIntegraciones
              {...orbita}
            />
          </div>
        )}


        {/* ===============================================
            PANEL "UN SOLO FLUJO"
           =============================================== */}

        <div
          className={
            styles.visualCard
          }
        >
          <h3>
            {
              visual.titulo
            }
          </h3>


          <p
            className={
              styles.visualSubtitle
            }
          >
            {
              visual.subtitulo
            }
          </p>


          <p
            className={
              styles.visualDescription
            }
          >
            {
              visual.descripcion
            }
          </p>
        </div>


        {/* ===============================================
            PROYECTOS REALES
           =============================================== */}

        {prueba && (
          <div
            className={
              styles.proof
            }
          >
            <div
              className={
                styles.proofLogos
              }
            >
              {prueba.marcas.map(
                (
                  marca,
                  index,
                ) => (
                  <span
                    className={
                      styles.proofLogo
                    }
                    key={`${marca.src}-${index}`}
                  >
                    <img
                      src={
                        marca.src
                      }
                      alt={
                        marca.alt
                      }
                    />
                  </span>
                ),
              )}
            </div>


            <span
              className={
                styles.proofText
              }
            >
              {
                prueba.texto
              }
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
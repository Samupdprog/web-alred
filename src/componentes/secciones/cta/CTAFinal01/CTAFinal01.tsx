import type {
  CSSProperties,
} from "react";

import {
  Boton,
  Enlace,
} from "@/componentes/ui";

import styles from "./CTAFinal01.module.css";

import type {
  CTAFinal01Props,
} from "./CTAFinal01.types";


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


export function CTAFinal01({
  id = "contacto-final",

  titulo,
  descripcion,

  cta,

  ctaSecundario,

  fondo,
  fondoMobile,

  fondoAlt = "",

  fondoX = 50,
  fondoY = 50,

  fondoXMobile,
  fondoYMobile,

  oscurecerFondo = 0,

  oscurecerFondoMobile,

  textoClaro = false,
}: CTAFinal01Props) {

  /* =======================================================
     NORMALIZAMOS LOS VALORES
     ======================================================= */

  const x =
    limitar(
      fondoX,
      0,
      100,
    );

  const y =
    limitar(
      fondoY,
      0,
      100,
    );

  const xMobile =
    limitar(
      fondoXMobile ??
        fondoX,
      0,
      100,
    );

  const yMobile =
    limitar(
      fondoYMobile ??
        fondoY,
      0,
      100,
    );

  const oscuridad =
    limitar(
      oscurecerFondo,
      0,
      1,
    );

  const oscuridadMobile =
    limitar(
      oscurecerFondoMobile ??
        oscurecerFondo,
      0,
      1,
    );


  /* =======================================================
     VARIABLES CSS CONFIGURABLES
     ======================================================= */

  const variables = {
    "--cta-background-x":
      `${x}%`,

    "--cta-background-y":
      `${y}%`,

    "--cta-background-x-mobile":
      `${xMobile}%`,

    "--cta-background-y-mobile":
      `${yMobile}%`,

    "--cta-overlay":
      oscuridad,

    "--cta-overlay-mobile":
      oscuridadMobile,
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
        className={`${styles.shell} ${
          textoClaro
            ? styles.lightText
            : styles.darkText
        }`}
        style={
          variables
        }
      >

        {/* =================================================
            FONDO
           ================================================= */}

        {fondo && (
          <picture
            className={
              styles.backgroundPicture
            }
          >
            {fondoMobile && (
              <source
                media="(max-width: 720px)"
                srcSet={
                  fondoMobile
                }
              />
            )}

            <img
              src={
                fondo
              }
              alt={
                fondoAlt
              }
              className={
                styles.backgroundImage
              }
            />
          </picture>
        )}


        {/* =================================================
            OSCURECIMIENTO
           ================================================= */}

        <div
          className={
            styles.darkOverlay
          }
          aria-hidden="true"
        />


        {/* =================================================
            PEQUEÑO REFUERZO DE CONTRASTE CENTRAL
           ================================================= */}

        <div
          className={
            styles.readabilityOverlay
          }
          aria-hidden="true"
        />


        {/* =================================================
            CONTENIDO CENTRAL
           ================================================= */}

        <div
          className={
            styles.content
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


            {ctaSecundario && (
              <Enlace
                variante="subrayado"
                href={
                  ctaSecundario.href
                }
              >
                {
                  ctaSecundario.texto
                }
              </Enlace>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
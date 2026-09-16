"use client";

import {
  useEffect,
  useRef,
} from "react";

import type {
  CSSProperties,
} from "react";

import styles from "./Conectado01.module.css";


type FondoReveladoProps = {
  fondo: string;

  fondoMobile?: string;

  fondoAlt?: string;

  fondoPosition?: string;

  fondoPositionMobile?: string;

  efectoFondoFijo?: boolean;

  fondoY?: number;

  fondoYMobile?: number;
};


/* =========================================================
   UTILIDAD
   ========================================================= */

function limitarPorcentaje(
  valor: number,
) {
  return Math.min(
    100,
    Math.max(
      0,
      valor,
    ),
  );
}


/* =========================================================
   FONDO
   ========================================================= */

export function FondoRevelado({
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
}: FondoReveladoProps) {

  const layerRef =
    useRef<HTMLDivElement>(
      null,
    );


  /* =======================================================
     POSICIONES
     ======================================================= */

  const posicionDesktop =
    typeof fondoY ===
    "number"
      ? `center ${limitarPorcentaje(
          fondoY,
        )}%`
      : fondoPosition;


  const posicionMobile =
    typeof fondoYMobile ===
    "number"
      ? `center ${limitarPorcentaje(
          fondoYMobile,
        )}%`
      : typeof fondoY ===
          "number"
        ? `center ${limitarPorcentaje(
            fondoY,
          )}%`
        : fondoPositionMobile ??
          fondoPosition;


  const variables = {
    "--fondo-position":
      posicionDesktop,

    "--fondo-position-mobile":
      posicionMobile,
  } as CSSProperties;


  /* =======================================================
     EFECTO FIJO
     ======================================================= */

  useEffect(
    () => {
      if (
        !efectoFondoFijo
      ) {
        return;
      }


      const layer =
        layerRef.current;


      if (
        !layer
      ) {
        return;
      }


      const visual =
        layer.parentElement;


      if (
        !visual
      ) {
        return;
      }


      /*
       * Si el usuario tiene reducción de movimiento
       * activada, dejamos el fondo normal.
       */
      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );


      let raf =
        0;


      const actualizar =
        () => {

          cancelAnimationFrame(
            raf,
          );


          raf =
            requestAnimationFrame(
              () => {

                if (
                  reducedMotion.matches
                ) {
                  layer.style.setProperty(
                    "--fondo-fixed-y",
                    "0px",
                  );

                  return;
                }


                const rect =
                  visual.getBoundingClientRect();


                /*
                 * El padre sube con el scroll.
                 *
                 * Nosotros movemos la imagen exactamente
                 * en la dirección contraria.
                 *
                 * Resultado:
                 * la imagen parece estar quieta y el
                 * contenedor la va revelando.
                 */
                layer.style.setProperty(
                  "--fondo-fixed-y",
                  `${-rect.top}px`,
                );
              },
            );
        };


      actualizar();


      window.addEventListener(
        "scroll",
        actualizar,
        {
          passive: true,
        },
      );


      window.addEventListener(
        "resize",
        actualizar,
      );


      reducedMotion.addEventListener?.(
        "change",
        actualizar,
      );


      return () => {

        cancelAnimationFrame(
          raf,
        );


        window.removeEventListener(
          "scroll",
          actualizar,
        );


        window.removeEventListener(
          "resize",
          actualizar,
        );


        reducedMotion.removeEventListener?.(
          "change",
          actualizar,
        );
      };
    },
    [
      efectoFondoFijo,
    ],
  );


  /* =======================================================
     SIN EFECTO
     ======================================================= */

  if (
    !efectoFondoFijo
  ) {
    return (
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
          style={
            variables
          }
        />
      </picture>
    );
  }


  /* =======================================================
     CON EFECTO
     ======================================================= */

  return (
    <div
      ref={
        layerRef
      }
      className={
        styles.fixedBackgroundLayer
      }
      style={
        variables
      }
    >
      <picture
        className={
          styles.fixedBackgroundPicture
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
            styles.fixedBackgroundImage
          }
        />
      </picture>
    </div>
  );
}
"use client";

import { getImageProps } from "next/image";
import type { CSSProperties } from "react";

import {
  Boton,
  Enlace,
} from "@/componentes/ui";

import styles from "./Hero03.module.css";

import type {
  Hero03Props,
} from "./Hero03.types";

export function Hero03({
  id = "hero-contacto",
  titulo,
  descripcion,
  cta,
  ctaSecundario,
  fondoDesktop,
  fondoMobile,
  fondoAlt = "",
  fondoX = 50,
  fondoY = 50,
  fondoXMobile = 50,
  fondoYMobile = 50,
  velo = 0.74,
  veloMobile = 0.82,
  minHeight = "clamp(640px, 78svh, 820px)",
}: Hero03Props) {
  const { props: desktop } = getImageProps({
    src: fondoDesktop,
    alt: fondoAlt,
    width: 1920,
    height: 1080,
    sizes: "100vw",
    priority: true,
    fetchPriority: "high",
  });

  const { props: mobile } = getImageProps({
    src: fondoMobile ?? fondoDesktop,
    alt: fondoAlt,
    width: 900,
    height: 1200,
    sizes: "100vw",
    priority: true,
    fetchPriority: "high",
  });

  const variables = {
    "--hero03-x": `${fondoX}%`,
    "--hero03-y": `${fondoY}%`,
    "--hero03-x-mobile": `${fondoXMobile}%`,
    "--hero03-y-mobile": `${fondoYMobile}%`,
    "--hero03-velo": velo,
    "--hero03-velo-mobile": veloMobile,
    "--hero03-min-height": minHeight,
  } as CSSProperties;

  return (
    <section
      id={id}
      className={styles.section}
      style={variables}
      aria-labelledby={`${id}-titulo`}
    >
      <picture
        className={styles.background}
        aria-hidden={fondoAlt ? undefined : "true"}
      >
        <source
          media="(max-width: 720px)"
          srcSet={mobile.srcSet}
          sizes={mobile.sizes}
        />

        <img
          {...desktop}
          alt={fondoAlt}
          className={styles.backgroundImage}
          draggable={false}
        />
      </picture>

      <div
        className={styles.readability}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <h1
          id={`${id}-titulo`}
          className={styles.title}
        >
          {titulo}
        </h1>

        {descripcion && (
          <p className={styles.description}>
            {descripcion}
          </p>
        )}

        <div className={styles.actions}>
          <Boton
            variante="principal"
            href={cta.href}
          >
            {cta.texto}
          </Boton>

          {ctaSecundario && (
            <Enlace
              variante="subrayado"
              href={ctaSecundario.href}
            >
              {ctaSecundario.texto}
            </Enlace>
          )}
        </div>
      </div>
    </section>
  );
}

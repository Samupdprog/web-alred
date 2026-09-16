import type { CSSProperties } from "react";

import { Boton, Enlace } from "@/componentes/ui";

import styles from "./Hero02.module.css";
import type { Hero02Props } from "./Hero02.types";

function limitarPorcentaje(valor: number) {
  return Math.min(100, Math.max(0, valor));
}

export function Hero02({
  id = "hero-inicio",
  titulo,
  descripcion,
  cta,
  ctaSecundario,
  fondoDesktop,
  fondoMobile,
  fondoAlt = "",
  fondoX = 50,
  fondoY = 50,
  fondoXMobile,
  fondoYMobile,
}: Hero02Props) {
  const x = limitarPorcentaje(fondoX);
  const y = limitarPorcentaje(fondoY);
  const xMobile = limitarPorcentaje(fondoXMobile ?? fondoX);
  const yMobile = limitarPorcentaje(fondoYMobile ?? fondoY);

  const variables = {
    "--hero02-fondo-x": `${x}%`,
    "--hero02-fondo-y": `${y}%`,
    "--hero02-fondo-x-mobile": `${xMobile}%`,
    "--hero02-fondo-y-mobile": `${yMobile}%`,
  } as CSSProperties;

  return (
    <section
      id={id}
      className={styles.hero}
      aria-labelledby={`${id}-titulo`}
      style={variables}
    >
      <picture className={styles.backgroundPicture} aria-hidden="true">
        {fondoMobile && (
          <source media="(max-width: 720px)" srcSet={fondoMobile} />
        )}

        <img
          src={fondoDesktop}
          alt={fondoAlt}
          className={styles.backgroundImage}
        />
      </picture>

      <div className={styles.readability} aria-hidden="true" />

      <div className={styles.content}>
        <h1 id={`${id}-titulo`} className={styles.title}>
          {titulo}
        </h1>

        <p className={styles.description}>{descripcion}</p>

        <div className={styles.actions}>
          <Boton variante="principal" href={cta.href}>
            {cta.texto}
          </Boton>

          {ctaSecundario && (
            <Enlace variante="subrayado" href={ctaSecundario.href}>
              {ctaSecundario.texto}
            </Enlace>
          )}
        </div>
      </div>
    </section>
  );
}

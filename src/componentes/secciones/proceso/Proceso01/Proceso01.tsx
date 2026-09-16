import type { CSSProperties } from "react";

import styles from "./Proceso01.module.css";
import type { Proceso01Props } from "./Proceso01.types";

function VisualTarjeta({
  imagen,
  imagenMobile,
  imagenAlt,
  posicionImagen = "center",
  posicionImagenMobile,
}: {
  imagen: string;
  imagenMobile?: string;
  imagenAlt: string;
  posicionImagen?: string;
  posicionImagenMobile?: string;
}) {
  const mobile =
    imagenMobile ??
    imagen;

  const style = {
    "--proceso-position":
      posicionImagen,

    "--proceso-position-mobile":
      posicionImagenMobile ??
      posicionImagen,
  } as CSSProperties;

  return (
    <picture
      className={
        styles.picture
      }
    >
      <source
        media="(max-width: 720px)"
        srcSet={mobile}
      />

      <img
        src={imagen}
        alt={imagenAlt}
        className={
          styles.image
        }
        style={style}
      />
    </picture>
  );
}

export function Proceso01({
  id = "como-trabajamos",
  titulo,
  descripcion,
  tarjetas,
}: Proceso01Props) {
  return (
    <section
      id={id}
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
        >
          {titulo}
        </h2>

        {descripcion && (
          <p>
            {descripcion}
          </p>
        )}
      </header>

      <div
        className={
          styles.cards
        }
      >
        {tarjetas.map(
          (
            tarjeta,
            index,
          ) => (
            <article
              key={`${tarjeta.titulo}-${index}`}
              className={
                styles.card
              }
            >
              <div
                className={
                  styles.visual
                }
              >
                <VisualTarjeta
                  imagen={
                    tarjeta.imagen
                  }
                  imagenMobile={
                    tarjeta.imagenMobile
                  }
                  imagenAlt={
                    tarjeta.imagenAlt
                  }
                  posicionImagen={
                    tarjeta.posicionImagen
                  }
                  posicionImagenMobile={
                    tarjeta.posicionImagenMobile
                  }
                />

                <div
                  className={
                    styles.visualOverlay
                  }
                  aria-hidden="true"
                />
              </div>

              <div
                className={
                  styles.copy
                }
              >
                <h3>
                  {
                    tarjeta.titulo
                  }
                </h3>

                <p>
                  {
                    tarjeta.descripcion
                  }
                </p>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
}

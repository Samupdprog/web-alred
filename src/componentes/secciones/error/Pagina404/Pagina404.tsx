"use client";

import {
  usePathname,
} from "next/navigation";

import {
  Boton,
  Enlace,
} from "@/componentes/ui";

import styles from "./Pagina404.module.css";


export function Pagina404() {
  const pathname =
    usePathname();

  const primerSegmento =
    pathname
      .split("/")
      .filter(Boolean)[0];

  const locale =
    primerSegmento === "en"
      ? "en"
      : "es";

  const esEspanol =
    locale === "es";


  return (
    <main
      className={
        styles.page
      }
    >
      <section
        className={
          styles.hero
        }
        aria-labelledby="pagina-404-titulo"
      >
        <div
          className={
            styles.glowTopRight
          }
          aria-hidden="true"
        />

        <div
          className={
            styles.glowBottomLeft
          }
          aria-hidden="true"
        />


        <div
          className={
            styles.content
          }
        >
          <p
            className={
              styles.code
            }
            aria-hidden="true"
          >
            404
          </p>


          <h1
            id="pagina-404-titulo"
            className={
              styles.title
            }
          >
            {
              esEspanol
                ? "Página no encontrada."
                : "Page not found."
            }
          </h1>


          <p
            className={
              styles.description
            }
          >
            {
              esEspanol
                ? "La página que buscas no existe, ha cambiado de sitio o el enlace ya no está disponible."
                : "The page you're looking for doesn't exist, has moved, or the link is no longer available."
            }
          </p>


          <div
            className={
              styles.actions
            }
          >
            <Boton
              variante="principal"
              href={`/${locale}`}
            >
              {
                esEspanol
                  ? "Volver al inicio"
                  : "Back home"
              }
            </Boton>


            <Enlace
              variante="flecha"
              href={`/${locale}/soluciones`}
            >
              {
                esEspanol
                  ? "Ver soluciones"
                  : "View solutions"
              }
            </Enlace>
          </div>
        </div>
      </section>
    </main>
  );
}

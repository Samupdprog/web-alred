import type {
  LegalPage01Props,
} from "./LegalPage01.types";

import styles from "./LegalPage01.module.css";


export function LegalPage01({
  titulo,
  descripcion,
  actualizado,
  secciones,
}: LegalPage01Props) {
  return (
    <main
      className={
        styles.page
      }
    >
      <article
        className={
          styles.shell
        }
      >
        <header
          className={
            styles.header
          }
        >
          <h1
            className={
              styles.title
            }
          >
            {titulo}
          </h1>

          {descripcion ? (
            <p
              className={
                styles.description
              }
            >
              {descripcion}
            </p>
          ) : null}

          {actualizado ? (
            <p
              className={
                styles.updated
              }
            >
              {actualizado}
            </p>
          ) : null}
        </header>


        <div
          className={
            styles.content
          }
        >
          {secciones.map(
            (
              seccion,
              index,
            ) => (
              <section
                key={`${seccion.titulo}-${index}`}
                id={
                  seccion.id
                }
                className={
                  styles.section
                }
              >
                <h2
                  className={
                    styles.sectionTitle
                  }
                >
                  {
                    seccion.titulo
                  }
                </h2>

                <div
                  className={
                    styles.sectionContent
                  }
                >
                  {
                    seccion.contenido
                  }
                </div>
              </section>
            ),
          )}
        </div>
      </article>
    </main>
  );
}

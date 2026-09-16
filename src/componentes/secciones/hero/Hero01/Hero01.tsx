import Image from "next/image";

import {
  Boton,
  Enlace,
} from "@/componentes/ui";

import styles from "./Hero01.module.css";

import type {
  Hero01Props,
} from "./Hero01.types";


export function Hero01({
  titulo,
  descripcion,
  cta,

  img1,
  img2,
  img3,

  altImg1 = "",
  altImg2 = "",
  altImg3 = "",

  posicionImg1 = "center",
  posicionImg2 = "center",
  posicionImg3 = "center",

  efectoImagenFija = false,

  textoIzquierda,
  textoCentro,
  textoPrincipal,
}: Hero01Props) {

  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-inicio-title"
    >

      {/* =====================================================
          CONTENIDO PRINCIPAL
         ===================================================== */}

      <div
        className={styles.copy}
      >
        <h1
          id="hero-inicio-title"
          className={styles.title}
        >
          {titulo}
        </h1>


        <div
          className={styles.actions}
        >
          <Boton
            variante="principal"
            href={cta.href}
          >
            {cta.texto}
          </Boton>


          <p
            className={styles.description}
          >
            {descripcion}
          </p>
        </div>
      </div>


      {/* =====================================================
          FRANJA VISUAL
         ===================================================== */}

      <div
        className={styles.visualStrip}
      >

        {/* ===================================================
            IMG 1
           =================================================== */}

        <article
          className={`${styles.panel} ${styles.panelLeft} ${
            efectoImagenFija
              ? styles.panelFixed
              : ""
          }`}
        >

          {/* Imagen semántica / comportamiento normal */}

          <Image
            src={img1}
            alt={altImg1}
            fill
            sizes="
              (max-width: 680px) 100vw,
              (max-width: 980px) 50vw,
              24vw
            "
            className={styles.image}
            style={{
              objectPosition:
                posicionImg1,
            }}
          />


          {/* Imagen fija para desktop */}

          {efectoImagenFija && (
            <div
              className={styles.fixedImage}
              style={{
                backgroundImage:
                  `url("${img1}")`,

                backgroundPosition:
                  posicionImg1,
              }}
              aria-hidden="true"
            />
          )}


          <div
            className={styles.scrim}
            aria-hidden="true"
          />


          {textoIzquierda && (
            <div
              className={styles.leftContent}
            >
              <p
                className={styles.leftTitle}
              >
                {textoIzquierda.titulo}
              </p>


              {textoIzquierda.enlace && (
                <Enlace
                  variante="flecha"
                  href={
                    textoIzquierda.enlace.href
                  }
                  className={
                    styles.lightLink
                  }
                >
                  {
                    textoIzquierda.enlace.texto
                  }
                </Enlace>
              )}
            </div>
          )}
        </article>


        {/* ===================================================
            IMG 2
           =================================================== */}

        <article
          className={`${styles.panel} ${styles.panelMiddle} ${
            efectoImagenFija
              ? styles.panelFixed
              : ""
          }`}
        >
          <Image
            src={img2}
            alt={altImg2}
            fill
            sizes="
              (max-width: 680px) 100vw,
              (max-width: 980px) 50vw,
              26vw
            "
            className={styles.image}
            style={{
              objectPosition:
                posicionImg2,
            }}
          />


          {efectoImagenFija && (
            <div
              className={styles.fixedImage}
              style={{
                backgroundImage:
                  `url("${img2}")`,

                backgroundPosition:
                  posicionImg2,
              }}
              aria-hidden="true"
            />
          )}


          <div
            className={styles.scrimSoft}
            aria-hidden="true"
          />


          {textoCentro?.titulo && (
            <div
              className={styles.middleContent}
            >
              <p>
                {
                  textoCentro.titulo
                }
              </p>
            </div>
          )}
        </article>


        {/* ===================================================
            IMG 3 — PRINCIPAL
           =================================================== */}

        <article
          className={`${styles.panel} ${styles.panelRight} ${
            efectoImagenFija
              ? styles.panelFixed
              : ""
          }`}
        >
          <Image
            src={img3}
            alt={altImg3}
            fill
            priority
            sizes="
              (max-width: 980px) 100vw,
              50vw
            "
            className={styles.image}
            style={{
              objectPosition:
                posicionImg3,
            }}
          />


          {efectoImagenFija && (
            <div
              className={styles.fixedImage}
              style={{
                backgroundImage:
                  `url("${img3}")`,

                backgroundPosition:
                  posicionImg3,
              }}
              aria-hidden="true"
            />
          )}


          <div
            className={styles.scrimMain}
            aria-hidden="true"
          />


          {textoPrincipal && (
            <div
              className={styles.mainContent}
            >
              <p
                className={styles.mainTitle}
              >
                {
                  textoPrincipal.titulo
                }
              </p>


              <p
                className={styles.mainDescription}
              >
                {
                  textoPrincipal.descripcion
                }
              </p>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
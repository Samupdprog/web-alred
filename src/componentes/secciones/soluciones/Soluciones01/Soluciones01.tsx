"use client";

import { useLocale } from "next-intl";
import { textoVisual } from "@/datos/comunes/soluciones-visuales";
import { useRef, useState } from "react";
import { Boton } from "@/componentes/ui";
import { useMovimientoSoluciones } from "@/componentes/efectos/soluciones/useMovimientoSoluciones";
import { SoftwareVisual, AutomatizacionVisual, DashboardVisual, IntegracionesVisual } from "./Soluciones01.visuales";
import styles from "./Soluciones01.module.css";
import type { Soluciones01Props } from "./Soluciones01.types";

export function Soluciones01({
  id = "soluciones",
  titulo,
  descripcion,
  software,
  automatizaciones,
  dashboards,
  integraciones,
}: Soluciones01Props) {
  const locale = useLocale();
  const t = (texto: string) => textoVisual(locale, texto);
  const sectionRef = useRef<HTMLElement>(null);

  const [pausado, setPausado] = useState(false);
  const { reducido: reducedMotion, modulo, seleccionarModulo, paso, fuentes: fuentesActivas } = useMovimientoSoluciones(sectionRef, pausado);
  const movimientoDetenido = pausado || reducedMotion;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.section} ${
        movimientoDetenido ? styles.paused : ""
      }`}
      aria-labelledby={`${id}-titulo`}
    >
      <header className={styles.sectionHead}>
        <h2 id={`${id}-titulo`}>
          {titulo}
        </h2>

        <p>
          {descripcion}
        </p>
      </header>

      <div className={styles.bento}>
        <article className={`${styles.solution} ${styles.software}`}>
          <div className={styles.visualArea} data-scene="software" data-running="false">
            <SoftwareVisual
              modulo={modulo}
              setModulo={seleccionarModulo}
            />
          </div>

          <div className={styles.copy}>
            <div className={styles.copyTop}>
              <div>
                <h3>{software.titulo}</h3>
                <p>{software.descripcion}</p>
              </div>

              <Boton
                variante="icono"
                href={software.href}
                aria-label={`${t("Ver")} ${software.titulo.toLowerCase()}`}
              />
            </div>

            <div className={styles.softwareSecondary}>
              <strong>{software.secundaria.titulo}</strong>
              <p>{software.secundaria.descripcion}</p>
            </div>
          </div>
        </article>

        <article className={`${styles.solution} ${styles.automation}`}>
          <div className={styles.visualArea} data-scene="flujo" data-running="false">
            <AutomatizacionVisual paso={paso} />
          </div>

          <div className={styles.copy}>
            <div className={styles.copyTop}>
              <div>
                <h3>{automatizaciones.titulo}</h3>
                <p>{automatizaciones.descripcion}</p>
              </div>

              <Boton
                variante="icono"
                href={automatizaciones.href}
                aria-label={`${t("Ver")} ${automatizaciones.titulo.toLowerCase()}`}
              />
            </div>
          </div>
        </article>

        <article className={`${styles.solution} ${styles.dashboard}`}>
          <div className={styles.visualArea} data-scene="dashboard" data-running="false">
            <DashboardVisual />
          </div>

          <div className={styles.copy}>
            <div className={styles.copyTop}>
              <div>
                <h3>{dashboards.titulo}</h3>
                <p>{dashboards.descripcion}</p>
              </div>

              <Boton
                variante="icono"
                href={dashboards.href}
                aria-label={`${t("Ver")} ${dashboards.titulo.toLowerCase()}`}
              />
            </div>
          </div>
        </article>

        <article className={`${styles.solution} ${styles.integrations}`}>
          <div className={styles.visualArea} data-scene="integracion" data-running="false">
            <IntegracionesVisual fuentesActivas={fuentesActivas} />
          </div>

          <div className={styles.copy}>
            <div className={styles.copyTop}>
              <div>
                <h3>{integraciones.titulo}</h3>
                <p>{integraciones.descripcion}</p>
              </div>

              <Boton
                variante="icono"
                href={integraciones.href}
                aria-label={`${t("Ver")} ${integraciones.titulo.toLowerCase()}`}
              />
            </div>
          </div>
        </article>
      </div>

      <div className={styles.motionControl}>
        <Boton
          variante="refractado-claro"
          type="button"
          disabled={reducedMotion}
          aria-pressed={movimientoDetenido}
          onClick={() => setPausado((actual) => !actual)}
        >
          {reducedMotion
            ? t("Movimiento reducido")
            : pausado
              ? t("Reanudar animaciones")
              : t("Pausar animaciones")}
        </Boton>
      </div>
    </section>
  );
}

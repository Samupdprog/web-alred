"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState, type CSSProperties, type RefObject } from "react";
import { ArrowRight } from "lucide-react";
import { Boton } from "@/componentes/ui";
import botonStyles from "@/componentes/ui/boton/Boton.module.css";
import { useDeslizamiento } from "@/componentes/efectos/carrusel/useDeslizamiento";
import { useRelojCarrusel } from "@/componentes/efectos/carrusel/useRelojCarrusel";
import type { ProyectoCarrusel, Proyectos01Props } from "./Proyectos01.types";
import styles from "./Proyectos01.module.css";

type Posicion = "anterior" | "activo" | "siguiente";
const circular = (indice: number, total: number) => ((indice % total) + total) % total;

function ImagenProyecto({ proyecto }: { proyecto: ProyectoCarrusel }) {
  const { props: desktop } = getImageProps({
    src: proyecto.imagenDesktop, alt: proyecto.imagenAlt,
    width: 1600, height: 1000, sizes: "(max-width: 760px) 100vw, 80vw",
  });
  const { props: mobile } = getImageProps({
    src: proyecto.imagenMobile ?? proyecto.imagenDesktop, alt: proyecto.imagenAlt,
    width: 900, height: 1200, sizes: "100vw",
  });
  return (
    <div className={styles.media} style={{ background: proyecto.fondo ?? "var(--color-surface)" }}>
      <picture className={styles.projectPicture}>
        <source media="(max-width: 760px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
        <img {...desktop} alt={proyecto.imagenAlt} draggable={false} className={styles.projectImage}
          style={{
            "--project-position-desktop": proyecto.posicionDesktop ?? "center",
            "--project-position-mobile": proyecto.posicionMobile ?? proyecto.posicionDesktop ?? "center",
          } as CSSProperties} />
      </picture>
      <div className={styles.mediaScrim} aria-hidden="true" />
    </div>
  );
}

function TarjetaProyecto({ proyecto, posicion, onSelect, barra, version, direccion }: {
  proyecto: ProyectoCarrusel;
  posicion: Posicion;
  onSelect?: () => void;
  barra?: RefObject<HTMLSpanElement | null>;
  version: number;
  direccion: number;
}) {
  const activa = posicion === "activo";
  const contenido = (
    <div key={`${proyecto.id}-${version}`} className={styles.cardVisual} data-direction={direccion}>
      <ImagenProyecto proyecto={proyecto} />
      <div className={styles.cardTop}>
        <div className={styles.logoBadge}>
          <Image src={proyecto.logo} alt={proyecto.logoAlt} width={40} height={40} className={styles.logoImage} draggable={false} />
        </div>
        {barra && <div className={styles.projectTimer} aria-hidden="true">
          <div className={styles.projectTimerTrack}>
            <span ref={barra} className={styles.projectTimerValue}><i /></span>
          </div>
        </div>}
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.projectMeta}>
          <h3>{proyecto.nombre}</h3>
          <p className={styles.category}>{proyecto.categoria}</p>
          {activa && proyecto.descripcion && <p className={styles.projectDescription}>{proyecto.descripcion}</p>}
        </div>
        {activa && <span className={styles.projectCta} aria-hidden="true">
          <span className={`${botonStyles.botonIcono} ${botonStyles.icono}`}><ArrowRight /></span>
        </span>}
      </div>
    </div>
  );
  return (
    <article className={`${styles.card} ${activa ? styles.cardActive : styles.cardSide}`} data-position={posicion}>
      {activa ? <Link href={proyecto.href} className={styles.cardLink} aria-label={`Ver proyecto ${proyecto.nombre}`} draggable={false}>
        {contenido}
      </Link> : contenido}
      {!activa && onSelect && <button type="button" className={styles.sideHit}
        aria-label={`Mostrar proyecto ${proyecto.nombre}`} onClick={onSelect} />}
    </article>
  );
}

export function Proyectos01({ id = "proyectos", titulo, descripcion, proyectos,
  segundosEntreProyectos = 8, reproduccionAutomatica = true }: Proyectos01Props) {
  const [seleccion, setSeleccion] = useState({ indice: 0, direccion: 0, version: 0 });
  const [arrastrando, setArrastrando] = useState(false);
  const [hover, setHover] = useState(false);
  const [focoTeclado, setFocoTeclado] = useState(false);
  const ultimoToque = useRef(-Infinity);
  const sectionRef = useRef<HTMLElement>(null);
  const total = proyectos.length;
  const activo = total ? circular(seleccion.indice, total) : 0;
  const mover = useCallback((direccion: -1 | 1) => {
    if (total < 2) return;
    setSeleccion(actual => ({ indice: circular(actual.indice + direccion, total), direccion, version: actual.version + 1 }));
  }, [total]);
  const avanzar = useCallback(() => mover(1), [mover]);
  const seleccionar = (indice: number) => setSeleccion(actual => ({
    indice, direccion: indice >= activo ? 1 : -1, version: actual.version + 1,
  }));
  const { barra, reducido } = useRelojCarrusel({
    contenedor: sectionRef, habilitado: reproduccionAutomatica && total > 1,
    pausado: arrastrando || hover || focoTeclado,
    clave: `${proyectos[activo]?.id}-${seleccion.version}`,
    duracion: (Number.isFinite(segundosEntreProyectos) ? Math.max(2, segundosEntreProyectos) : 8) * 1000,
    avanzar,
  });
  const deslizamiento = useDeslizamiento({
    habilitado: total > 1, mover, alInteractuar: setArrastrando, permitirEnlaces: true,
  });
  if (!total) return null;
  const anterior = circular(activo - 1, total), siguiente = circular(activo + 1, total);
  const visual = { version: seleccion.version, direccion: seleccion.direccion };

  return (
    <section ref={sectionRef} id={id} className={styles.section} aria-labelledby={`${id}-titulo`}
      onPointerEnter={event => {
        if (event.pointerType === "mouse" && matchMedia("(hover: hover) and (pointer: fine)").matches) setHover(true);
      }}
      onPointerLeave={event => { if (event.pointerType === "mouse") setHover(false); }}
      onPointerDownCapture={() => { ultimoToque.current = performance.now(); setFocoTeclado(false); }}
      onKeyDownCapture={() => setFocoTeclado(true)}
      onFocusCapture={event => {
        if (performance.now() - ultimoToque.current > 500 && event.target.matches(":focus-visible")) setFocoTeclado(true);
      }}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocoTeclado(false); }}>
      <header className={styles.sectionHead}>
        <h2 id={`${id}-titulo`}>{titulo}</h2>
        {descripcion && <p>{descripcion}</p>}
      </header>
      <div className={styles.carousel} data-single={total === 1 || undefined} role="region"
        aria-roledescription="carrusel" aria-label="Proyectos de Alred" tabIndex={0}
        onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault(); mover(event.key === "ArrowLeft" ? -1 : 1);
          }
        }} {...deslizamiento}>
        {total > 1 && <TarjetaProyecto proyecto={proyectos[anterior]} posicion="anterior" onSelect={() => seleccionar(anterior)} {...visual} />}
        <TarjetaProyecto proyecto={proyectos[activo]} posicion="activo"
          barra={reproduccionAutomatica && !reducido && total > 1 ? barra : undefined} {...visual} />
        {total > 1 && <TarjetaProyecto proyecto={proyectos[siguiente]} posicion="siguiente" onSelect={() => seleccionar(siguiente)} {...visual} />}
      </div>
      <div className={styles.footer}>
        <div className={styles.footerSpacer} aria-hidden="true" />
        <div className={styles.pagination} aria-label="Seleccionar proyecto">
          {proyectos.map((proyecto, indice) => <button key={proyecto.id} type="button"
            className={`${styles.dot} ${indice === activo ? styles.dotActive : ""}`}
            aria-label={`Mostrar ${proyecto.nombre}`} aria-current={indice === activo ? "true" : undefined}
            onClick={() => seleccionar(indice)}><span /></button>)}
        </div>
        <div className={styles.controls} aria-label="Controles del carrusel">
          <div className={styles.previousButton}>
            <Boton variante="icono" type="button" aria-label="Proyecto anterior" disabled={total <= 1} onClick={() => mover(-1)} />
          </div>
          <Boton variante="icono" type="button" aria-label="Proyecto siguiente" disabled={total <= 1} onClick={() => mover(1)} />
        </div>
      </div>
    </section>
  );
}

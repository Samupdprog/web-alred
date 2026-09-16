"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";

import botonStyles from "@/componentes/ui/boton/Boton.module.css";
import { useRelojCarrusel } from "@/componentes/efectos/carrusel/useRelojCarrusel";

import { ImagenProyecto } from "../ImagenProyecto";
import styles from "./ProyectoDestacado01.module.css";
import type {
  ProyectoDestacado01Props,
  ProyectoDestacadoRotativoProps,
} from "./ProyectoDestacado01.types";

type Direccion = -1 | 0 | 1;

type EstadoSeleccion = {
  indice: number;
  direccion: Direccion;
  version: number;
};

type GestoTactil = {
  activo: boolean;
  horizontal: boolean;
  id: number;
  x: number;
  y: number;
  inicio: number;
  ancho: number;
};

const DURACION_TRANSICION_MS = 360;
const BLOQUEO_CLICK_MS = 650;

function circular(indice: number, total: number) {
  return ((indice % total) + total) % total;
}

function esProyectoRotativo(
  props: ProyectoDestacado01Props,
): props is ProyectoDestacadoRotativoProps {
  return "proyectos" in props && Array.isArray(props.proyectos);
}

function FlechaDerecha() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m14 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlechaIzquierda() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M19 12H5" strokeLinecap="round" />
      <path d="m10 7-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconoPausa() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M9 6v12" strokeLinecap="round" />
      <path d="M15 6v12" strokeLinecap="round" />
    </svg>
  );
}

function IconoReproducir() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M9 7.5 17 12l-8 4.5v-9Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CtaVisual({ esEspanol }: { esEspanol: boolean }) {
  return (
    <span
      className={`${botonStyles.base} ${botonStyles.principal} ${styles.ctaVisual}`}
      aria-hidden="true"
    >
      <span className={botonStyles.texto}>{esEspanol ? "Ver proyecto" : "View project"}</span>
      <span className={botonStyles.iconoInterno}>
        <FlechaDerecha />
      </span>
      <span className={botonStyles.brilloPrincipal} aria-hidden="true" />
    </span>
  );
}

function encontrarTouch(
  lista: ReactTouchEvent<HTMLElement>["changedTouches"],
  id: number,
) {
  for (let index = 0; index < lista.length; index += 1) {
    const touch = lista.item(index);
    if (touch?.identifier === id) return touch;
  }

  return null;
}

export function ProyectoDestacado01(props: ProyectoDestacado01Props) {
  const { id = "proyecto-destacado", baseHref = "/proyectos", locale = "es" } = props;
  const esEspanol = locale !== "en";

  const varios = esProyectoRotativo(props);
  const lista = varios ? props.proyectos : [props.proyecto];
  const rotacion = varios && props.rotacion !== false;
  const segundos =
    varios && Number.isFinite(props.segundos)
      ? Math.max(2, props.segundos!)
      : 8;

  const [seleccion, setSeleccion] = useState<EstadoSeleccion>({
    indice: 0,
    direccion: 0,
    version: 0,
  });
  const [hover, setHover] = useState(false);
  const [focoTeclado, setFocoTeclado] = useState(false);
  const [tocando, setTocando] = useState(false);
  const [animando, setAnimando] = useState(false);
  const [pausaManual, setPausaManual] = useState(false);

  const entrada = useRef<"pointer" | "keyboard">("pointer");
  const ultimoToque = useRef(-Infinity);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const animandoRef = useRef(false);
  const bloquearClickHasta = useRef(0);
  const temporizadorAnimacion = useRef<number | null>(null);
  const gesto = useRef<GestoTactil>({
    activo: false,
    horizontal: false,
    id: -1,
    x: 0,
    y: 0,
    inicio: 0,
    ancho: 0,
  });

  const total = lista.length;
  const indice = total ? circular(seleccion.indice, total) : 0;
  const proyecto = lista[indice];

  const terminarAnimacion = useCallback(() => {
    if (temporizadorAnimacion.current !== null) {
      window.clearTimeout(temporizadorAnimacion.current);
      temporizadorAnimacion.current = null;
    }

    animandoRef.current = false;
    setAnimando(false);
  }, []);

  const cambiar = useCallback(
    (direccion: -1 | 1) => {
      if (total < 2 || animandoRef.current) return;

      animandoRef.current = true;
      setAnimando(true);

      setSeleccion((actual) => ({
        indice: circular(actual.indice + direccion, total),
        direccion,
        version: actual.version + 1,
      }));

      if (temporizadorAnimacion.current !== null) {
        window.clearTimeout(temporizadorAnimacion.current);
      }

      temporizadorAnimacion.current = window.setTimeout(
        terminarAnimacion,
        DURACION_TRANSICION_MS + 70,
      );
    },
    [terminarAnimacion, total],
  );

  const seleccionar = useCallback(
    (nuevoIndice: number) => {
      if (
        total < 2 ||
        animandoRef.current
      ) {
        return;
      }

      animandoRef.current = true;
      setAnimando(true);

      setSeleccion((actual) => ({
        indice: nuevoIndice,
        direccion: nuevoIndice > indice ? 1 : -1,
        version: actual.version + 1,
      }));

      if (temporizadorAnimacion.current !== null) {
        window.clearTimeout(temporizadorAnimacion.current);
      }

      temporizadorAnimacion.current = window.setTimeout(
        terminarAnimacion,
        DURACION_TRANSICION_MS + 70,
      );
    },
    [indice, terminarAnimacion, total],
  );

  const avanzar = useCallback(() => {
    cambiar(1);
  }, [cambiar]);

  const { barra, reducido } = useRelojCarrusel({
    contenedor: sectionRef,
    habilitado: rotacion && total > 1,
    pausado: hover || focoTeclado || tocando || pausaManual,
    clave: `${proyecto?.slug}-${seleccion.version}`,
    duracion: segundos * 1000,
    avanzar,
  });

  useEffect(() => {
    return () => {
      if (temporizadorAnimacion.current !== null) {
        window.clearTimeout(temporizadorAnimacion.current);
      }
    };
  }, []);

  useEffect(() => {
    const cancelarGesto = () => {
      gesto.current.activo = false;
      viewportRef.current?.style.removeProperty("--carrusel-desplazamiento");
      viewportRef.current?.removeAttribute("data-arrastrando");
      setTocando(false);
      bloquearClickHasta.current = 0;
    };

    window.addEventListener("orientationchange", cancelarGesto);
    window.addEventListener("resize", cancelarGesto);

    return () => {
      window.removeEventListener("orientationchange", cancelarGesto);
      window.removeEventListener("resize", cancelarGesto);
    };
  }, []);

  if (!total || !proyecto) return null;

  const posicionImagen = {
    "--proyecto-posicion": proyecto.imagenPosicion ?? "center",
    "--proyecto-posicion-mobile":
      proyecto.imagenPosicionMobile ?? proyecto.imagenPosicion ?? "center",
  } as CSSProperties;

  const href = `${baseHref.replace(/\/$/, "")}/${proyecto.slug}`;

  const claseEntrada =
    seleccion.direccion === 1
      ? styles.entradaDerecha
      : seleccion.direccion === -1
        ? styles.entradaIzquierda
        : styles.entradaInicial;

  const cancelarTouch = () => {
    gesto.current.activo = false;
    setTocando(false);
    viewportRef.current?.style.removeProperty("--carrusel-desplazamiento");
    viewportRef.current?.removeAttribute("data-arrastrando");
  };

  const iniciarTouch = (event: ReactTouchEvent<HTMLDivElement>) => {
    bloquearClickHasta.current = 0;
    if (!varios || total < 2 || animandoRef.current) return;

    if (event.touches.length !== 1) {
      cancelarTouch();
      return;
    }

    const touch = event.touches.item(0);
    if (!touch) return;

    gesto.current = {
      activo: true,
      horizontal: false,
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
      inicio: performance.now(),
      ancho: event.currentTarget.clientWidth,
    };

    setTocando(true);
  };

  const moverTouch = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (!gesto.current.activo) return;

    // Multitouch/zoom: el carrusel se retira y deja todo al navegador.
    if (event.touches.length !== 1) {
      cancelarTouch();
      return;
    }
    const touch = encontrarTouch(event.touches, gesto.current.id);
    if (!touch) return;
    const dx = touch.clientX - gesto.current.x;
    const dy = touch.clientY - gesto.current.y;
    if (!gesto.current.horizontal && Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
      cancelarTouch();
      return;
    }
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.25) gesto.current.horizontal = true;
    if (gesto.current.horizontal) {
      event.currentTarget.dataset.arrastrando = "true";
      event.currentTarget.style.setProperty("--carrusel-desplazamiento", `${Math.max(-90, Math.min(90, dx * .45))}px`);
    }
  };

  const terminarTouch = (event: ReactTouchEvent<HTMLDivElement>) => {
    const actual = gesto.current;

    if (!actual.activo) {
      setTocando(false);
      return;
    }

    const touch = encontrarTouch(event.changedTouches, actual.id);

    cancelarTouch();

    if (!touch) return;

    const dx = touch.clientX - actual.x;
    const dy = touch.clientY - actual.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const tiempo = Math.max(1, performance.now() - actual.inicio);

    const ancho = Math.max(1, actual.ancho);
    const umbralDistancia = Math.max(42, Math.min(72, ancho * 0.13));

    const horizontalClaro = absX > absY * 1.18;
    const distanciaValida = absX >= umbralDistancia && horizontalClaro;
    const flickValido =
      absX >= 30 &&
      tiempo <= 280 &&
      horizontalClaro;

    if (actual.horizontal) bloquearClickHasta.current = performance.now() + BLOQUEO_CLICK_MS;
    if (!distanciaValida && !flickValido) return;

    // Safari/Chrome generan un click después del touchend. Lo anulamos solo
    // cuando el gesto ha sido realmente un swipe válido.
    bloquearClickHasta.current = performance.now() + BLOQUEO_CLICK_MS;

    cambiar(dx < 0 ? 1 : -1);
  };


  const bloquearClickTrasSwipe = (
    event: ReactMouseEvent<HTMLDivElement>,
  ) => {
    if (
      event.detail !== 0 &&
      performance.now() < bloquearClickHasta.current
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={styles.section}
      aria-labelledby={`${id}-titulo`}
      onPointerEnter={(event) => {
        if (
          event.pointerType === "mouse" &&
          matchMedia("(hover: hover) and (pointer: fine)").matches
        ) {
          setHover(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHover(false);
      }}
      onPointerDownCapture={() => {
        entrada.current = "pointer";
        ultimoToque.current = performance.now();
        setFocoTeclado(false);
      }}
      onKeyDownCapture={(event) => {
        entrada.current = "keyboard";
        setFocoTeclado(true);

        if (
          varios &&
          (event.key === "ArrowLeft" || event.key === "ArrowRight")
        ) {
          event.preventDefault();
          cambiar(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      onFocusCapture={(event) => {
        if (
          entrada.current === "keyboard" ||
          (performance.now() - ultimoToque.current > 500 &&
            event.target.matches(":focus-visible"))
        ) {
          setFocoTeclado(true);
        }
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocoTeclado(false);
        }
      }}
    >
      <div
        ref={viewportRef}
        className={styles.viewport}
        onTouchStart={iniciarTouch}
        onTouchMove={moverTouch}
        onTouchEnd={terminarTouch}
        onTouchCancel={cancelarTouch}
        onClickCapture={bloquearClickTrasSwipe}
      >
        <article
          key={`${proyecto.slug}-${seleccion.version}`}
          className={`${styles.card} ${claseEntrada}`}
        >
          {varios && (
            <Link
              href={href}
              className={styles.cardLink}
              aria-label={`${esEspanol ? "Ver proyecto" : "View project"} ${proyecto.nombre}`}
              draggable={false}
            />
          )}

          <div className={styles.media} style={posicionImagen}>
            <ImagenProyecto
              proyecto={proyecto}
              pictureClass={styles.picture}
              imageClass={styles.image}
              destacado
            />

            <div className={styles.logo}>
              <Image
                src={proyecto.logo}
                alt=""
                width={64}
                height={64}
                draggable={false}
              />
            </div>
          </div>

          <div className={styles.content}>
            <p className={styles.category}>{proyecto.categoria}</p>

            <h2 id={`${id}-titulo`} className={styles.title}>
              {proyecto.nombre}
            </h2>

            <p className={styles.description}>{proyecto.descripcion}</p>

            {proyecto.funciones.length > 0 && (
              <div className={styles.features}>
                <p className={styles.featuresTitle}>{esEspanol ? "Funciones principales" : "Key features"}</p>
                <ul>
                  {proyecto.funciones.map((funcion) => (
                    <li key={funcion}>{funcion}</li>
                  ))}
                </ul>
              </div>
            )}

            {varios && (
              <div className={styles.cta}>
                <CtaVisual esEspanol={esEspanol} />
              </div>
            )}
          </div>

          {rotacion && total > 1 && !reducido && (
            <div className={styles.progressTrack} aria-hidden="true">
              <span ref={barra} className={styles.progressBar} />
            </div>
          )}
        </article>
      </div>

      {varios && total > 1 && (
        <div className={styles.controls}>
          <div className={styles.dots} role="group" aria-label={esEspanol ? "Seleccionar proyecto" : "Select project"}>
            {lista.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                className={`${styles.dot} ${
                  index === indice ? styles.dotActive : ""
                }`}
                onClick={() => seleccionar(index)}
                aria-label={`${esEspanol ? "Mostrar" : "Show"} ${item.nombre}`}
                aria-current={index === indice ? "true" : undefined}
                disabled={animando}
              />
            ))}
          </div>

          <div className={styles.arrows} aria-label={esEspanol ? "Controles del carrusel" : "Carousel controls"}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => cambiar(-1)}
              aria-label={esEspanol ? "Proyecto anterior" : "Previous project"}
              disabled={animando}
            >
              <FlechaIzquierda />
            </button>

            {rotacion && !reducido && (
              <button
                type="button"
                className={styles.arrow}
                onClick={() => setPausaManual((actual) => !actual)}
                aria-pressed={pausaManual}
                aria-label={
                  pausaManual
                    ? esEspanol ? "Reanudar proyectos" : "Resume projects"
                    : esEspanol ? "Pausar proyectos" : "Pause projects"
                }
                disabled={animando}
              >
                {pausaManual ? <IconoReproducir /> : <IconoPausa />}
              </button>
            )}

            <button
              type="button"
              className={styles.arrow}
              onClick={() => cambiar(1)}
              aria-label={esEspanol ? "Proyecto siguiente" : "Next project"}
              disabled={animando}
            >
              <FlechaDerecha />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

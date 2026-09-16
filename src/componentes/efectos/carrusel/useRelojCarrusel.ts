"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** Barra y avance consumen exactamente el mismo tiempo activo. */
export function useRelojCarrusel({ contenedor, habilitado, pausado, clave, duracion, avanzar }: {
  contenedor: RefObject<HTMLElement | null>;
  habilitado: boolean;
  pausado: boolean;
  clave: string;
  duracion: number;
  avanzar: () => void;
}) {
  const barra = useRef<HTMLSpanElement>(null);
  const reloj = useRef({ clave, transcurrido: 0 });
  const [reducido, setReducido] = useState(false);

  useEffect(() => {
    const root = contenedor.current;
    if (!root) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false, frame = 0, anterior: number | null = null;
    if (reloj.current.clave !== clave) reloj.current = { clave, transcurrido: 0 };

    function pintar() {
      if (barra.current) barra.current.style.transform = `scaleX(${Math.min(1, reloj.current.transcurrido / duracion)})`;
    }
    function tick(now: number) {
      if (anterior !== null) reloj.current.transcurrido += now - anterior;
      anterior = now;
      pintar();
      if (reloj.current.transcurrido >= duracion) {
        anterior = null;
        avanzar();
        return;
      }
      frame = requestAnimationFrame(tick);
    }
    function actualizar() {
      cancelAnimationFrame(frame);
      anterior = null;
      setReducido(media.matches);
      const activo = habilitado && !pausado && !media.matches && visible && !document.hidden;
      root?.setAttribute("data-autoplay", activo ? "running" : "paused");
      pintar();
      if (activo) frame = requestAnimationFrame(tick);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      actualizar();
    }, { threshold: 0 });
    observer.observe(root);
    media.addEventListener("change", actualizar);
    document.addEventListener("visibilitychange", actualizar);
    actualizar();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", actualizar);
      document.removeEventListener("visibilitychange", actualizar);
    };
  }, [contenedor, habilitado, pausado, clave, duracion, avanzar]);
  return { barra, reducido };
}

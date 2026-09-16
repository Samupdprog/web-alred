"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useMovimientoSoluciones(ref: RefObject<HTMLElement | null>, pausado: boolean) {
  const [reducido, setReducido] = useState(false);
  const [modulo, setModulo] = useState(0);
  const [paso, setPaso] = useState(0);
  const [fuentes, setFuentes] = useState(0);
  const tiempos = useRef<Record<string, number>>({ software: 0, flujo: 0, dashboard: 0, integracion: 0 });
  const seleccionHasta = useRef(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const escenas = [...root.querySelectorAll<HTMLElement>("[data-scene]")];
    const visibles = new Set<HTMLElement>();
    const valorDuracion = getComputedStyle(root).getPropertyValue("--motion-cycle").trim();
    // Admitir ms y s evita convertir por accidente un ciclo de 18s en 18ms.
    const duracion = (parseFloat(valorDuracion) * (valorDuracion.endsWith("ms") ? 1 : 1000)) || 18000;
    let frame = 0, anterior = 0;

    function pintar(escena: HTMLElement, tiempo: number, estatico: boolean) {
      const tipo = escena.dataset.scene!;
      const fase = (tiempo % duracion) / duracion;
      if (tipo === "software") {
        if (!estatico && tiempo > seleccionHasta.current && !escena.matches(":hover") && !escena.contains(document.activeElement)) {
          setModulo(Math.floor(tiempo / (duracion / 3)) % 4);
        }
        return;
      }
      if (tipo === "flujo") setPaso(estatico ? 4 : fase < .12 ? 0 : Math.min(4, Math.floor((fase - .12) / .16) + 1));
      if (tipo === "integracion") setFuentes(estatico ? 4 : Math.max(0, Math.min(4, Math.floor((fase - .32) / .1) + 1)));
      escena.querySelectorAll<SVGPathElement>("[data-signal]").forEach(path => {
        const i = Number(path.dataset.signal);
        const inicio = tipo === "flujo" ? .12 + i * .16 : .08 + i * .1;
        const tramo = tipo === "flujo" ? .16 : .24;
        const p = estatico ? 1 : Math.max(0, Math.min(1, (fase - inicio) / tramo));
        // Arranque y llegada graduales, sin saltos al encender/apagar la señal.
        const suave = p * p * (3 - 2 * p);
        path.style.opacity = String(Math.min(1, p / .12, (1 - p) / .12));
        path.style.strokeDashoffset = String(14 - suave * (Number(path.dataset.length) + 14));
      });
    }
    function tick(now: number) {
      const delta = anterior ? Math.min(now - anterior, 64) : 0;
      anterior = now;
      visibles.forEach(escena => {
        const tipo = escena.dataset.scene!;
        tiempos.current[tipo] += delta;
        pintar(escena, tiempos.current[tipo], false);
      });
      frame = requestAnimationFrame(tick);
    }
    function actualizar() {
      cancelAnimationFrame(frame);
      anterior = 0;
      setReducido(media.matches);
      const detener = pausado || media.matches || document.hidden;
      escenas.forEach(escena => {
        escena.dataset.running = String(!detener && visibles.has(escena));
        if (media.matches) pintar(escena, 0, true);
      });
      if (!detener && visibles.size) frame = requestAnimationFrame(tick);
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const escena = entry.target as HTMLElement;
        if (entry.isIntersecting) visibles.add(escena);
        else visibles.delete(escena);
      });
      actualizar();
    }, { threshold: .15 });
    escenas.forEach(escena => observer.observe(escena));
    media.addEventListener("change", actualizar);
    document.addEventListener("visibilitychange", actualizar);
    actualizar();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", actualizar);
      document.removeEventListener("visibilitychange", actualizar);
    };
  }, [ref, pausado]);

  function seleccionarModulo(indice: number) {
    seleccionHasta.current = tiempos.current.software + 9000;
    setModulo(indice);
  }
  return { reducido, modulo, seleccionarModulo, paso, fuentes };
}

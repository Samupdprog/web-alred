"use client";

import { useRef, type PointerEvent, type MouseEvent } from "react";

export function useDeslizamiento({ habilitado, mover, alInteractuar, permitirEnlaces = false }: {
  habilitado: boolean;
  mover: (direccion: -1 | 1) => void;
  alInteractuar?: (activo: boolean) => void;
  permitirEnlaces?: boolean;
}) {
  const gesto = useRef({ id: -1, x: 0, y: 0, horizontal: false });
  const bloquearHasta = useRef(0);

  function cancelar(event: PointerEvent<HTMLElement>) {
    if (gesto.current.id === -1) return;
    const id = gesto.current.id;
    gesto.current.id = -1;
    event.currentTarget.style.removeProperty("--carrusel-desplazamiento");
    event.currentTarget.removeAttribute("data-arrastrando");
    if (event.currentTarget.hasPointerCapture(id)) event.currentTarget.releasePointerCapture(id);
    alInteractuar?.(false);
  }

  return {
    onPointerDown(event: PointerEvent<HTMLElement>) {
      bloquearHasta.current = 0;
      if (!event.isPrimary) { cancelar(event); return; }
      if (!habilitado || event.pointerType === "mouse" || event.button !== 0) return;
      const target = event.target as Element;
      if (target.closest('button, input, select, textarea, [contenteditable="true"]') || (!permitirEnlaces && target.closest('a'))) return;
      gesto.current = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
      alInteractuar?.(true);
      // Capturar aquí redirigiría también los taps de enlaces en Safari.
    },
    onPointerMove(event: PointerEvent<HTMLElement>) {
      const g = gesto.current;
      if (g.id !== event.pointerId) return;
      const dx = Math.abs(event.clientX - g.x), dy = Math.abs(event.clientY - g.y);
      if (!g.horizontal && dy > 10 && dy > dx) { cancelar(event); return; }
      if (!g.horizontal && dx > 12 && dx > dy * 1.25) {
        g.horizontal = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      if (g.horizontal) {
        event.currentTarget.dataset.arrastrando = "true";
        // Respuesta visual acotada; no cambia layout ni requiere renders por frame.
        const desplazamiento = Math.max(-90, Math.min(90, (event.clientX - g.x) * .45));
        event.currentTarget.style.setProperty("--carrusel-desplazamiento", `${desplazamiento}px`);
      }
    },
    onPointerUp(event: PointerEvent<HTMLElement>) {
      const g = gesto.current;
      if (g.id !== event.pointerId) return;
      const dx = event.clientX - g.x, dy = event.clientY - g.y;
      const deslizado = g.horizontal && Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.25;
      const horizontal = g.horizontal;
      cancelar(event);
      // También un arrastre corto debe volver a su sitio sin abrir un enlace.
      if (horizontal) bloquearHasta.current = performance.now() + 500;
      if (deslizado) {
        mover(dx < 0 ? 1 : -1);
      }
    },
    onPointerCancel: cancelar,
    onLostPointerCapture(event: PointerEvent<HTMLElement>) {
      // Al pasar la captura implícita de la imagen al contenedor, el evento
      // del hijo burbujea. Eso no es una cancelación del gesto del contenedor.
      if (event.target === event.currentTarget && !event.currentTarget.hasPointerCapture(event.pointerId)) cancelar(event);
    },
    onClickCapture(event: MouseEvent<HTMLElement>) {
      if (event.detail !== 0 && performance.now() < bloquearHasta.current) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
  };
}

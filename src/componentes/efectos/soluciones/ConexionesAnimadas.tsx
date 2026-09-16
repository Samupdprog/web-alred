"use client";

import { useEffect, useRef, useState } from "react";

type Ruta = { d: string; longitud: number };

/** Coordenadas en píxeles del contenedor real: no se escala un SVG de escritorio. */
export function ConexionesAnimadas({ tipo, className }: {
  tipo: "flujo" | "integracion";
  className: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [rutas, setRutas] = useState<Ruta[]>([]);

  useEffect(() => {
    const svg = ref.current;
    const contenedor = svg?.parentElement;
    if (!svg || !contenedor) return;

    function medir() {
      if (!svg || !contenedor) return;
      const base = contenedor.getBoundingClientRect();
      if (!base.width || !base.height) return;
      svg.setAttribute("viewBox", `0 0 ${base.width} ${base.height}`);
      const punto = (elemento: Element, lado: "top" | "bottom" | "left" | "right") => {
        const r = elemento.getBoundingClientRect();
        return {
          x: (lado === "left" ? r.left : lado === "right" ? r.right : r.left + r.width / 2) - base.left,
          y: (lado === "top" ? r.top : lado === "bottom" ? r.bottom : r.top + r.height / 2) - base.top,
        };
      };
      const nodos = [...contenedor.querySelectorAll("[data-node]")];
      let trazados: string[] = [];
      if (tipo === "flujo") {
        const lados = [["right", "left"], ["bottom", "top"], ["left", "right"]] as const;
        trazados = nodos.slice(0, 3).map((nodo, i) => {
          const a = punto(nodo, lados[i][0]), b = punto(nodos[i + 1], lados[i][1]);
          return `M${a.x} ${a.y}L${b.x} ${b.y}`;
        });
      } else {
        const hub = contenedor.querySelector("[data-hub]");
        const destino = contenedor.querySelector("[data-status]");
        if (!hub || !destino) return;
        const entrada = punto(hub, "top"), salida = punto(hub, "bottom"), fin = punto(destino, "top");
        trazados = nodos.map(nodo => {
          const a = punto(nodo, "bottom"), medio = (a.y + entrada.y) / 2;
          return `M${a.x} ${a.y}C${a.x} ${medio} ${entrada.x} ${medio} ${entrada.x} ${entrada.y}L${salida.x} ${salida.y}L${fin.x} ${fin.y}`;
        });
      }
      setRutas(trazados.map(d => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        return { d, longitud: path.getTotalLength() };
      }));
    }
    const observer = new ResizeObserver(medir);
    observer.observe(contenedor);
    contenedor.querySelectorAll("[data-node], [data-hub], [data-status]").forEach(n => observer.observe(n));
    return () => observer.disconnect();
  }, [tipo]);

  return (
    <svg ref={ref} className={className} aria-hidden="true">
      {rutas.map((ruta, i) => (
        <g key={i}>
          <path d={ruta.d} data-track="" />
          <path d={ruta.d} data-signal={i} data-length={ruta.longitud}
            style={{ strokeDasharray: `14 ${ruta.longitud + 30}`, opacity: 0 }} />
        </g>
      ))}
    </svg>
  );
}

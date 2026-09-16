import { getImageProps } from "next/image";
import type { Proyecto } from "@/datos/proyectos";

/** Art direction con el optimizador de Next: nunca descargar el PNG móvil original. */
export function ImagenProyecto({ proyecto, pictureClass, imageClass, destacado = false }: {
  proyecto: Proyecto;
  pictureClass: string;
  imageClass: string;
  destacado?: boolean;
}) {
  const { props: desktop } = getImageProps({
    src: proyecto.imagenDesktop, alt: proyecto.imagenAlt,
    width: 1600, height: 1000,
    sizes: "(max-width: 720px) 100vw, (max-width: 1440px) 65vw, 940px",
    loading: destacado ? "eager" : "lazy",
  });
  const { props: mobile } = getImageProps({
    src: proyecto.imagenMobile || proyecto.imagenDesktop, alt: proyecto.imagenAlt,
    width: 900, height: 1200, sizes: "100vw",
  });
  return (
    <picture className={pictureClass}>
      <source media="(max-width: 720px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
      <img {...desktop} className={imageClass} draggable={false} alt={proyecto.imagenAlt} />
    </picture>
  );
}

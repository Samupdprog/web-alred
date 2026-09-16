import type {
  Metadata,
} from "next";


export function metadataLegal(
  titulo: string,
  descripcion: string,
): Metadata {
  return {
    title: {
      absolute:
        titulo,
    },

    description:
      descripcion,

    /*
     * Estas páginas deben seguir siendo accesibles
     * desde el Footer, pero no queremos promover
     * su indexación en buscadores.
     */
    robots: {
      index:
        false,

      follow:
        false,

      nocache:
        true,

      googleBot: {
        index:
          false,

        follow:
          false,

        noimageindex:
          true,

        "max-snippet":
          0,

        "max-image-preview":
          "none",

        "max-video-preview":
          0,
      },
    },
  };
}

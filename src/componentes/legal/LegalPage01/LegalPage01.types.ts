import type {
  ReactNode,
} from "react";


export type LegalSection = {
  id?:
    string;

  titulo:
    string;

  contenido:
    ReactNode;
};


export type LegalPage01Props = {
  titulo:
    string;

  descripcion?:
    string;

  actualizado?:
    string;

  secciones:
    LegalSection[];
};

import type {
  Proyecto,
} from "@/datos/proyectos";


type ProyectoDestacadoBase = {
  id?: string;

  /**
   * Base de la URL para abrir un proyecto.
   *
   * Ejemplo:
   * /es/proyectos
   */
  baseHref?: string;

  /**
   * Idioma de los textos de la interfaz (controles, aria-labels).
   *
   * Por defecto: "es".
   */
  locale?: string;
};


export type ProyectoDestacadoFijoProps =
  ProyectoDestacadoBase & {
    proyecto: Proyecto;

    proyectos?: never;

    rotacion?: never;

    segundos?: never;
  };


export type ProyectoDestacadoRotativoProps =
  ProyectoDestacadoBase & {
    proyectos: Proyecto[];

    proyecto?: never;

    /**
     * Si es true cambia automáticamente de proyecto.
     *
     * Default: true.
     */
    rotacion?: boolean;

    /**
     * Segundos entre cambios.
     *
     * Default: 8.
     */
    segundos?: number;
  };


export type ProyectoDestacado01Props =
  | ProyectoDestacadoFijoProps
  | ProyectoDestacadoRotativoProps;

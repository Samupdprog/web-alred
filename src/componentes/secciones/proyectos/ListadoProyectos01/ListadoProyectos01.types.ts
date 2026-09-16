import type {
  Proyecto,
} from "@/datos/proyectos";


export type ListadoProyectos01Props = {
  id?: string;

  titulo?: string;

  descripcion?: string;

  proyectos: Proyecto[];

  /**
   * Slug que no debe aparecer.
   *
   * Útil en /proyectos/[slug].
   */
  excluir?: string;

  /**
   * Si se indica, el listado se divide en grupos
   * de esa cantidad.
   *
   * Ejemplo:
   * porPagina={3}
   *
   * Si no se indica, aparecen todos.
   */
  porPagina?: number;

  /**
   * Base para construir el href.
   *
   * Ejemplo:
   * /es/proyectos
   */
  baseHref?: string;
};

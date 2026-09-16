export type DudaItem = {
  id?: string;
  pregunta: string;
  respuesta: string;
};

export type Dudas01Props = {
  id?: string;

  titulo: string;

  descripcion?: string;

  /**
   * Lista de preguntas.
   *
   * Para añadir una nueva, simplemente agrega otro objeto:
   *
   * {
   *   pregunta: "Nueva pregunta",
   *   respuesta: "Nueva respuesta",
   * }
   */
  preguntas: DudaItem[];

  /**
   * Índice de la pregunta abierta inicialmente.
   *
   * 0 = primera
   * 1 = segunda
   * null = todas cerradas
   *
   * Default: 0
   */
  abiertaInicial?: number | null;
};

export type OpcionNecesidad = {
  id: string;
  texto: string;
  esOtro?: boolean;
};

export type FormulariosContacto01Props = {
  id?: string;

  /**
   * Endpoint que recibirá ambos formularios mediante POST JSON.
   * Se envía `tipo: "rapido" | "detallado"` para diferenciarlos.
   */
  endpoint?: string;

  /**
   * Permite cambiar o ampliar las opciones del formulario detallado
   * sin tocar el componente.
   */
  opcionesNecesidad?: OpcionNecesidad[];
};

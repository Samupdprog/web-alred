export type OpcionNecesidad = {
  value: string;
  label: string;
};

export type VisualFormulario = {
  logo?: string;
  logoAlt?: string;
  logoColor?: string;
  logoWidth?: number;
  logoWidthMobile?: number;

  titulo: string;
  descripcion: string;
  categorias?: string[];

  fondoDesktop: string;
  fondoMobile?: string;
  fondoAlt?: string;

  fondoX?: number;
  fondoY?: number;

  fondoXMobile?: number;
  fondoYMobile?: number;
};

export type ConfigFormularioModo = {
  titulo: string;
  descripcion: string;
  boton: string;
  nota?: string;
  visual: VisualFormulario;
};

export type FormulariosContacto02Props = {
  id?: string;
  marca?: string;
  locale?: "es" | "en";
  modoInicial?: "corto" | "largo";
  endpoint?: string;
  mensajeExito?: string;
  mensajeError?: string;
  corto: ConfigFormularioModo;
  largo: ConfigFormularioModo;
  opcionesNecesidad: OpcionNecesidad[];
};

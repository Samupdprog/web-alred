import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type VarianteBoton =
  | "principal"
  | "refractado-claro"
  | "refractado-oscuro"
  | "secundario"
  | "icono";

type BaseBotonProps = {
  variante?: VarianteBoton;
  children?: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export type BotonEnlaceProps = BaseBotonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "children" | "className"
  > & {
    href: string;
  };

export type BotonAccionProps = BaseBotonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className"
  > & {
    href?: never;
  };

export type BotonProps = BotonEnlaceProps | BotonAccionProps;

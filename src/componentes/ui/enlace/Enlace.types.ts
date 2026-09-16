import type { AnchorHTMLAttributes, ReactNode } from "react";

export type VarianteEnlace = "flecha" | "subrayado";

export type EnlaceProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "className"
> & {
  href: string;
  children: ReactNode;
  variante?: VarianteEnlace;
  className?: string;
};

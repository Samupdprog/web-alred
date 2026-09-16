import Link from "next/link";

import styles from "./Enlace.module.css";
import type { EnlaceProps } from "./Enlace.types";
import { ArrowRight } from "../iconos";

export function Enlace({
  href,
  children,
  variante = "flecha",
  className,
  ...rest
}: EnlaceProps) {
  const clases = [
    styles.base,
    variante === "flecha" ? styles.flecha : styles.subrayado,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={clases} {...rest}>
      <span>{children}</span>
      {variante === "flecha" && <ArrowRight />}
    </Link>
  );
}

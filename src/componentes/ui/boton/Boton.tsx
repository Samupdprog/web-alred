import Link from "next/link";

import styles from "./Boton.module.css";
import type { BotonProps, VarianteBoton } from "./Boton.types";
import { ArrowRight } from "../iconos";

function claseVariante(variante: VarianteBoton) {
  switch (variante) {
    case "principal":
      return styles.principal;
    case "refractado-claro":
      return styles.refractadoClaro;
    case "refractado-oscuro":
      return styles.refractadoOscuro;
    case "secundario":
      return styles.secundario;
    case "icono":
      return styles.icono;
  }
}

function Contenido({
  variante,
  children,
}: {
  variante: VarianteBoton;
  children?: React.ReactNode;
}) {
  if (variante === "icono") {
    return <ArrowRight />;
  }

  return (
    <>
      <span className={styles.texto}>{children}</span>

      {(variante === "principal" || variante === "secundario") && (
        <span className={styles.iconoInterno}>
          <ArrowRight />
        </span>
      )}

      {variante === "principal" && (
        <span className={styles.brilloPrincipal} aria-hidden="true" />
      )}

      {(variante === "refractado-claro" ||
        variante === "refractado-oscuro") && (
        <span className={styles.refraccion} aria-hidden="true" />
      )}
    </>
  );
}

export function Boton(props: BotonProps) {
  const variante = props.variante ?? "principal";

  const clases = [
    variante === "icono" ? styles.botonIcono : styles.base,
    claseVariante(variante),
    props.className,
  ]
    .filter(Boolean)
    .join(" ");

  if (typeof props.href === "string") {
    const {
      href,
      variante: _variante,
      className: _className,
      children,
      ...rest
    } = props;
    void _variante;
    void _className;

    return (
      <Link href={href} className={clases} {...rest}>
        <Contenido variante={variante}>{children}</Contenido>
      </Link>
    );
  }

  const {
    variante: _variante,
    className: _className,
    children,
    type = "button",
    ...rest
  } = props;
  void _variante;
  void _className;

  return (
    <button type={type} className={clases} {...rest}>
      <Contenido variante={variante}>{children}</Contenido>
    </button>
  );
}

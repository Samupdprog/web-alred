import Link from "next/link";

import styles from "./AvisoPrivacidadFormulario.module.css";


type AvisoPrivacidadFormularioProps = {
  locale?:
    string;
};


export function AvisoPrivacidadFormulario({
  locale =
    "es",
}: AvisoPrivacidadFormularioProps) {
  const es =
    locale === "es";


  return (
    <div
      className={
        styles.notice
      }
    >
      <p>
        {
          es
            ? "Responsable: Alred · Samuel Piñero Díaz. Usaremos los datos únicamente para responder a tu solicitud y, si procede, preparar una propuesta. Puedes ejercer tus derechos escribiendo a info@alred.es."
            : "Controller: Alred · Samuel Piñero Díaz. We will use your data only to respond to your request and, where appropriate, prepare a proposal. You can exercise your rights by writing to info@alred.es."
        }

        {" "}

        <Link
          href={`/${locale}/privacidad`}
        >
          {
            es
              ? "Más información"
              : "More information"
          }
        </Link>
        .
      </p>
    </div>
  );
}

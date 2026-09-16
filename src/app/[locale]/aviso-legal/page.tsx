import type {
  Metadata,
} from "next";

import {
  LegalPage01,
} from "@/componentes/legal/LegalPage01";

import {
  legalConfig,
} from "@/config/legal";

import {
  metadataLegal,
} from "@/lib/legal/metadataLegal";


type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    locale,
  } = await params;

  const es =
    locale === "es";


  return metadataLegal(
    es
      ? "Aviso legal | Alred"
      : "Legal notice | Alred",

    es
      ? "Información legal y condiciones de uso de alred.es."
      : "Legal information and terms of use for alred.es.",
  );
}


export default async function AvisoLegalPage({
  params,
}: PageProps) {
  const {
    locale,
  } = await params;

  const es =
    locale === "es";


  return (
    <LegalPage01
      titulo={
        es
          ? "Aviso legal"
          : "Legal notice"
      }

      descripcion={
        es
          ? "Información básica sobre el titular de Alred y las condiciones de uso de este sitio."
          : "Basic information about Alred's owner and the terms governing this website."
      }

      actualizado={
        es
          ? "Última actualización: 15 de septiembre de 2026"
          : "Last updated: 15 September 2026"
      }

      secciones={[
        {
          titulo:
            es
              ? "Titular y contacto"
              : "Owner and contact",

          contenido: (
            <>
              <p>
                <strong>
                  {
                    legalConfig.titular
                  }
                </strong>
                {" · "}
                {
                  legalConfig.marca
                }
              </p>

              <p>
                Email:{" "}
                <a
                  href={`mailto:${legalConfig.email}`}
                >
                  {
                    legalConfig.email
                  }
                </a>

                <br />

                {
                  es
                    ? "Teléfono"
                    : "Phone"
                }
                :{" "}

                <a
                  href={`tel:${legalConfig.telefonoHref}`}
                >
                  {
                    legalConfig.telefono
                  }
                </a>
              </p>
            </>
          ),
        },

        {
          titulo:
            es
              ? "Finalidad de la web"
              : "Purpose of the website",

          contenido: (
            <p>
              {
                es
                  ? "Alred presenta servicios y soluciones digitales relacionados con desarrollo web, software a medida, automatizaciones, integraciones, dashboards, analítica y marketing digital. La información publicada tiene carácter informativo y puede actualizarse conforme evolucionen los servicios."
                  : "Alred presents digital services and solutions related to web development, custom software, automation, integrations, dashboards, analytics and digital marketing. Published information is for general information and may be updated as services evolve."
              }
            </p>
          ),
        },

        {
          titulo:
            es
              ? "Uso del sitio"
              : "Use of the site",

          contenido: (
            <>
              <p>
                {
                  es
                    ? "El usuario debe utilizar la web de forma lícita y respetuosa, sin realizar acciones que puedan dañar, sobrecargar, impedir o dificultar su funcionamiento o afectar a derechos de terceros."
                    : "Users must use the website lawfully and responsibly, without taking actions that may damage, overload, prevent or hinder its operation or affect third-party rights."
                }
              </p>

              <p>
                {
                  es
                    ? "El acceso a la web o el envío de una consulta no implica por sí mismo la contratación de un servicio. Las condiciones de cada proyecto, presupuesto o prestación se acordarán de forma independiente cuando proceda."
                    : "Access to the website or sending an enquiry does not in itself create a contract for services. The terms of any project, quote or service will be agreed separately where appropriate."
                }
              </p>
            </>
          ),
        },

        {
          titulo:
            es
              ? "Propiedad intelectual"
              : "Intellectual property",

          contenido: (
            <p>
              {
                es
                  ? "Salvo que se indique lo contrario, el diseño, marca, textos, código, elementos gráficos y demás contenidos propios de Alred están protegidos por la normativa aplicable. No se autoriza su reproducción o explotación fuera de los usos legalmente permitidos sin autorización previa."
                  : "Unless otherwise stated, Alred's design, brand, texts, code, graphics and original content are protected by applicable law. Reproduction or exploitation outside legally permitted uses requires prior authorisation."
              }
            </p>
          ),
        },

        {
          titulo:
            es
              ? "Disponibilidad"
              : "Availability",

          contenido: (
            <p>
              {
                es
                  ? "Se procura mantener la web disponible, segura y actualizada. No obstante, pueden producirse interrupciones, errores o tareas de mantenimiento. Alred adoptará medidas razonables para corregir las incidencias detectadas, sin asumir garantías que excedan las exigidas legalmente."
                  : "Reasonable efforts are made to keep the website available, secure and current. Interruptions, errors or maintenance may nevertheless occur. Alred will take reasonable steps to address identified issues and does not provide guarantees beyond those required by law."
              }
            </p>
          ),
        },

        {
          titulo:
            es
              ? "Enlaces y terceros"
              : "Links and third parties",

          contenido: (
            <p>
              {
                es
                  ? "La web puede enlazar a servicios de terceros. Alred no controla sus contenidos, disponibilidad, seguridad ni políticas de privacidad. El uso de esos servicios queda sujeto a sus propios términos y condiciones."
                  : "The website may link to third-party services. Alred does not control their content, availability, security or privacy policies. Their use is subject to their own terms and conditions."
              }
            </p>
          ),
        },

        {
          titulo:
            es
              ? "Legislación"
              : "Law",

          contenido: (
            <p>
              {
                es
                  ? "Este sitio se rige por la legislación española, sin perjuicio de las normas imperativas que resulten aplicables en cada caso y de los derechos que correspondan a consumidores y usuarios cuando proceda."
                  : "This website is governed by Spanish law, without prejudice to any mandatory rules that may apply and to consumer rights where applicable."
              }
            </p>
          ),
        },
      ]}
    />
  );
}

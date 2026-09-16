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
      ? "Privacidad | Alred"
      : "Privacy | Alred",

    es
      ? "Información sobre el tratamiento de datos personales en Alred."
      : "Information about personal data processing at Alred.",
  );
}


export default async function PrivacidadPage({
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
          ? "Política de privacidad"
          : "Privacy policy"
      }

      descripcion={
        es
          ? "Recogemos solo la información necesaria para responder a tus solicitudes y prestar correctamente nuestros servicios."
          : "We collect only the information needed to respond to requests and provide our services properly."
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
              ? "Responsable"
              : "Controller",

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
              ? "Qué datos recibimos"
              : "Data we receive",

          contenido: (
            <>
              <p>
                {
                  es
                    ? "Cuando contactas con Alred podemos recibir los datos que facilites voluntariamente en los formularios, por email, teléfono u otros canales de contacto. Esto puede incluir nombre, email, teléfono, empresa, contenido del mensaje e información relacionada con el proyecto o necesidad que nos plantees."
                    : "When you contact Alred we may receive data you voluntarily provide through forms, email, phone or other contact channels. This may include your name, email, phone number, company, message and information about your project or request."
                }
              </p>

              <p>
                {
                  es
                    ? "No solicitamos de forma intencionada categorías especiales de datos personales ni información que no resulte necesaria para atender tu petición."
                    : "We do not intentionally request special categories of personal data or information that is not necessary to handle your request."
                }
              </p>
            </>
          ),
        },

        {
          titulo:
            es
              ? "Contexto de la solicitud"
              : "Request context",

          contenido: (
            <>
              <p>
                {
                  es
                    ? "Cuando envías voluntariamente un formulario, podemos adjuntar al mensaje algunos datos técnicos y de atribución que ayudan a entender de dónde procede la solicitud: página de entrada, página desde la que se envía, referencia de procedencia sin parámetros, parámetros UTM de campaña cuando existan, idioma y categorías genéricas de dispositivo, navegador y sistema operativo."
                    : "When you voluntarily submit a form, we may attach limited technical and attribution information that helps us understand where the request came from: entry page, submission page, referrer without query parameters, campaign UTM parameters where available, language and generic device, browser and operating-system categories."
                }
              </p>

              <p>
                {
                  es
                    ? "Para esta finalidad no incorporamos al email la dirección IP, geolocalización derivada de IP, fingerprint del dispositivo, identificadores publicitarios ni identificadores de sesión de Microsoft Clarity. Tampoco vinculamos la identidad facilitada en el formulario con una grabación de Clarity."
                    : "For this purpose, we do not add the IP address, IP-derived geolocation, device fingerprint, advertising identifiers or Microsoft Clarity session identifiers to the email. We also do not link the identity provided in the form to a Clarity recording."
                }
              </p>

              <p>
                {
                  es
                    ? "Estos datos de contexto se incorporan únicamente cuando la persona decide enviar el formulario y se conservan junto con el propio mensaje recibido."
                    : "This context is only attached when the person chooses to submit the form and is retained together with the message received."
                }
              </p>
            </>
          ),
        },


        {
          titulo:
            es
              ? "Finalidades"
              : "Purposes",

          contenido: (
            <ul>
              <li>
                {
                  es
                    ? "Responder a consultas y solicitudes."
                    : "Respond to enquiries and requests."
                }
              </li>

              <li>
                {
                  es
                    ? "Entender una necesidad, preparar una propuesta o presupuesto y mantener las comunicaciones necesarias sobre un posible proyecto."
                    : "Understand a requirement, prepare a proposal or quote and maintain necessary communications regarding a potential project."
                }
              </li>

              <li>
                {
                  es
                    ? "Gestionar una relación profesional cuando llegue a formalizarse."
                    : "Manage a professional relationship if one is subsequently established."
                }
              </li>

              <li>
                {
                  es
                    ? "Proteger la seguridad y el correcto funcionamiento de la web."
                    : "Protect the security and proper operation of the website."
                }
              </li>

              <li>
                {
                  es
                    ? "Analizar el uso de la web únicamente en los casos en que la herramienta utilizada requiera consentimiento y este haya sido otorgado."
                    : "Analyse website usage only where the tool used requires consent and that consent has been given."
                }
              </li>
            </ul>
          ),
        },

        {
          titulo:
            es
              ? "Base jurídica"
              : "Legal basis",

          contenido: (
            <>
              <p>
                {
                  es
                    ? "Cuando solicitas información, una propuesta o un presupuesto, el tratamiento puede ser necesario para atender tu petición y aplicar medidas precontractuales solicitadas por ti."
                    : "When you request information, a proposal or a quote, processing may be necessary to respond to your request and take pre-contractual steps requested by you."
                }
              </p>

              <p>
                {
                  es
                    ? "Para otras consultas, podremos tratar la información necesaria para responder sobre la base del interés legítimo en gestionar adecuadamente las comunicaciones recibidas, siempre ponderando los derechos de la persona interesada."
                    : "For other enquiries, we may process the information needed to respond based on the legitimate interest in properly managing communications received, while taking the individual's rights into account."
                }
              </p>

              <p>
                {
                  es
                    ? "Las herramientas de analítica no necesarias que requieran consentimiento solo se activarán cuando exista una elección válida del usuario."
                    : "Non-essential analytics tools that require consent will only be activated after a valid user choice."
                }
              </p>
            </>
          ),
        },

        {
          titulo:
            es
              ? "Sin marketing automático"
              : "No automatic marketing",

          contenido: (
            <p>
              {
                es
                  ? "Los datos enviados para pedir información o presupuesto no se incorporarán automáticamente a listas de newsletters o campañas comerciales. Si en el futuro Alred ofrece comunicaciones promocionales que requieran consentimiento, se solicitará de forma independiente."
                  : "Data submitted to request information or a quote will not automatically be added to newsletters or marketing lists. If Alred offers promotional communications requiring consent in the future, consent will be requested separately."
              }
            </p>
          ),
        },

        {
          titulo:
            es
              ? "Conservación"
              : "Retention",

          contenido: (
            <>
              <p>
                {
                  es
                    ? `Si una consulta no termina en una relación profesional, aplicamos como criterio interno una conservación máxima ordinaria de ${legalConfig.mesesConservacionLeads} meses desde la última comunicación, salvo que exista una razón legítima para conservarla durante más tiempo o el interesado solicite su supresión antes.`
                    : `If an enquiry does not result in a professional relationship, our internal ordinary maximum retention period is ${legalConfig.mesesConservacionLeads} months from the last communication, unless there is a legitimate reason to retain it longer or the individual requests earlier deletion.`
                }
              </p>

              <p>
                {
                  es
                    ? "Cuando exista una relación contractual o una obligación legal, determinados datos podrán conservarse durante los plazos necesarios para gestionar esa relación y atender las obligaciones aplicables."
                    : "Where a contractual relationship or legal obligation exists, certain data may be retained for the periods necessary to manage that relationship and comply with applicable obligations."
                }
              </p>
            </>
          ),
        },

        {
          titulo:
            es
              ? "Proveedores"
              : "Service providers",

          contenido: (
            <>
              <p>
                {
                  es
                    ? "Podemos utilizar proveedores tecnológicos para alojamiento, infraestructura, correo electrónico, formularios, seguridad y medición. Cuando actúen por cuenta de Alred se procurará utilizar proveedores que ofrezcan garantías adecuadas y las relaciones se someterán a las condiciones contractuales aplicables."
                    : "We may use technology providers for hosting, infrastructure, email, forms, security and measurement. Where they act on Alred's behalf, we aim to use providers offering appropriate safeguards and the relationship will be subject to the applicable contractual terms."
                }
              </p>

              <p>
                {
                  es
                    ? "Actualmente la web puede utilizar Vercel Web Analytics para métricas técnicas y agregadas. También podemos utilizar Google Analytics y Microsoft Clarity para analítica y mejora de la experiencia, únicamente después de obtener el consentimiento cuando sea exigible. Esta elección puede retirarse desde Configurar cookies."
                    : "The website may use Vercel Web Analytics for technical and aggregated metrics. We may also use Google Analytics and Microsoft Clarity for analytics and experience improvement, only after obtaining consent where required. This choice can be withdrawn through Configure cookies."
                }
              </p>
            </>
          ),
        },

        {
          titulo:
            es
              ? "Transferencias internacionales"
              : "International transfers",

          contenido: (
            <p>
              {
                es
                  ? "Algunos proveedores tecnológicos pueden operar desde países situados fuera del Espacio Económico Europeo. Cuando exista una transferencia internacional de datos personales, deberá apoyarse en un mecanismo válido conforme a la normativa aplicable y en las garantías ofrecidas por el proveedor correspondiente."
                  : "Some technology providers may operate from countries outside the European Economic Area. Where an international transfer of personal data takes place, it must rely on a valid mechanism under applicable law and on the safeguards offered by the relevant provider."
              }
            </p>
          ),
        },

        {
          titulo:
            es
              ? "Seguridad"
              : "Security",

          contenido: (
            <p>
              {
                es
                  ? "Alred aplica medidas razonables orientadas a limitar el acceso a los datos, mantener los sistemas actualizados, proteger las cuentas utilizadas para gestionar comunicaciones y reducir la cantidad de información conservada. Ningún sistema conectado a Internet puede garantizar un riesgo cero, pero las medidas se revisarán cuando cambien los tratamientos o proveedores."
                  : "Alred applies reasonable measures intended to restrict access to data, keep systems updated, protect accounts used to manage communications and reduce the amount of information retained. No Internet-connected system can guarantee zero risk, but measures will be reviewed when processing activities or providers change."
              }
            </p>
          ),
        },

        {
          titulo:
            es
              ? "Tus derechos"
              : "Your rights",

          contenido: (
            <>
              <p>
                {
                  es
                    ? "Puedes solicitar acceso, rectificación, supresión, oposición, limitación y, cuando proceda, portabilidad de tus datos. También puedes retirar un consentimiento previamente otorgado sin que ello afecte al tratamiento realizado antes de su retirada."
                    : "You may request access, rectification, erasure, objection, restriction and, where applicable, portability of your data. You may also withdraw consent without affecting processing carried out before withdrawal."
                }
              </p>

              <p>
                {
                  es
                    ? "Para ejercerlos escribe a "
                    : "To exercise these rights, write to "
                }

                <a
                  href={`mailto:${legalConfig.email}`}
                >
                  {
                    legalConfig.email
                  }
                </a>
                .

                {
                  es
                    ? " Podremos pedir únicamente la información necesaria para verificar que la solicitud procede de la persona afectada."
                    : " We may request only the information necessary to verify that the request comes from the person concerned."
                }
              </p>

              <p>
                {
                  es
                    ? "Si consideras que el tratamiento no respeta tus derechos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos."
                    : "If you believe the processing does not respect your rights, you may lodge a complaint with the Spanish Data Protection Agency."
                }
              </p>

              <p>
                <a
                  href="https://www.aepd.es/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Agencia Española de Protección de Datos
                </a>
              </p>
            </>
          ),
        },

        {
          titulo:
            es
              ? "Menores"
              : "Children",

          contenido: (
            <p>
              {
                es
                  ? "Los servicios de Alred no están dirigidos específicamente a menores. Si detectamos que se ha recibido información personal de un menor sin una base adecuada, se adoptarán medidas razonables para eliminarla."
                  : "Alred's services are not specifically directed at children. If we become aware that personal information from a child has been received without an appropriate basis, reasonable steps will be taken to remove it."
              }
            </p>
          ),
        },

        {
          titulo:
            es
              ? "Decisiones automatizadas"
              : "Automated decisions",

          contenido: (
            <p>
              {
                es
                  ? "No se adoptan decisiones exclusivamente automatizadas que produzcan efectos jurídicos o afecten significativamente de forma similar a las personas que contactan con Alred."
                  : "Alred does not make solely automated decisions producing legal or similarly significant effects on people who contact us."
              }
            </p>
          ),
        },
      ]}
    />
  );
}

import type {
  Metadata,
} from "next";

import {
  LegalPage01,
} from "@/componentes/legal/LegalPage01";

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
    "Cookies | Alred",

    es
      ? "Información sobre cookies y tecnologías de medición utilizadas en Alred."
      : "Information about cookies and measurement technologies used by Alred.",
  );
}


export default async function CookiesPage({
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
          ? "Política de cookies"
          : "Cookie policy"
      }

      descripcion={
        es
          ? "Utilizamos tecnologías necesarias para el funcionamiento del sitio y, si lo aceptas, herramientas de analítica para mejorar la experiencia en Alred."
          : "We use technologies needed to operate the site and, if you accept, analytics tools to improve the Alred experience."
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
              ? "Qué son"
              : "What they are",

          contenido: (
            <p>
              {
                es
                  ? "Las cookies y tecnologías similares permiten almacenar o recuperar determinada información desde el navegador o dispositivo. Algunas son necesarias para prestar una función solicitada por el usuario; otras pueden utilizarse para medir el uso de una web y requieren una base adecuada, como el consentimiento cuando corresponda."
                  : "Cookies and similar technologies can store or retrieve certain information from a browser or device. Some are necessary to provide a function requested by the user; others may be used to measure website usage and require an appropriate legal basis, such as consent where applicable."
              }
            </p>
          ),
        },

        {
          titulo:
            es
              ? "Necesarias"
              : "Necessary",

          contenido: (
            <p>
              {
                es
                  ? "La web puede utilizar almacenamiento estrictamente necesario para seguridad, funcionamiento técnico o para recordar una elección de privacidad. Estas funciones no deben utilizarse para publicidad ni para crear perfiles comerciales."
                  : "The website may use strictly necessary storage for security, technical operation or to remember a privacy choice. These functions must not be used for advertising or commercial profiling."
              }
            </p>
          ),
        },

        {
          titulo:
            "Vercel Web Analytics",

          contenido: (
            <p>
              {
                es
                  ? "La web puede utilizar Vercel Web Analytics para obtener métricas agregadas sobre visitas y funcionamiento. Según la documentación del proveedor, Web Analytics está diseñado para funcionar sin cookies de seguimiento y con información agregada. No deben enviarse nombres, emails, teléfonos u otros datos introducidos por usuarios como eventos personalizados."
                  : "The website may use Vercel Web Analytics for aggregated visit and performance metrics. According to the provider's documentation, Web Analytics is designed to operate without tracking cookies and with aggregated information. Names, emails, phone numbers or other user-entered data must not be sent as custom events."
              }
            </p>
          ),
        },

        {
          titulo:
            es
              ? "Atribución del formulario"
              : "Form attribution",

          contenido: (
            <>
              <p>
                {
                  es
                    ? "Cuando una persona decide enviar el formulario de contacto, la solicitud puede incluir la página de entrada, la página de envío, la referencia inicial sin parámetros y los parámetros UTM presentes en la visita. Esta información se utiliza como contexto comercial de la propia solicitud."
                    : "When a person chooses to submit the contact form, the request may include the entry page, submission page, initial referrer without query parameters and UTM parameters present during the visit. This information is used as commercial context for the request itself."
                }
              </p>

              <p>
                {
                  es
                    ? "La implementación actual no utiliza cookies, localStorage ni sessionStorage para conservar esta atribución, ni incorpora identificadores publicitarios como gclid o fbclid."
                    : "The current implementation does not use cookies, localStorage or sessionStorage to preserve this attribution, and does not include advertising identifiers such as gclid or fbclid."
                }
              </p>
            </>
          ),
        },


        {
          titulo:
            "Google Analytics",

          contenido: (
            <p>
              {
                es
                  ? "Google Analytics, proporcionado por Google, se utiliza para medir visitas y navegación y ayudarnos a mejorar el sitio. Solo se carga después de aceptar la categoría Analítica. Puedes retirar o cambiar tu elección desde Configurar cookies en el pie de página."
                  : "Google Analytics, provided by Google, is used to measure visits and navigation and help us improve the site. It only loads after you accept the Analytics category. You can withdraw or change your choice through Configure cookies in the footer."
              }
            </p>
          ),
        },

        {
          titulo:
            "Microsoft Clarity",

          contenido: (
            <p>
              {
                es
                  ? "Microsoft Clarity, proporcionado por Microsoft, se utiliza para comprender interacciones, detectar problemas de navegación y mejorar la experiencia. Solo se carga después de aceptar Analítica. La publicidad personalizada permanece desactivada y los formularios se mantienen enmascarados."
                  : "Microsoft Clarity, provided by Microsoft, is used to understand interactions, identify navigation issues and improve the experience. It only loads after you accept Analytics. Personalised advertising remains disabled and forms remain masked."
              }
            </p>
          ),
        },

        {
          titulo:
            es
              ? "Tu elección"
              : "Your choice",

          contenido: (
            <>
              <p>
                {
                  es
                    ? "Puedes aceptar o rechazar Analítica con opciones presentadas al mismo nivel. Rechazarla no impedirá utilizar las funciones esenciales de Alred."
                    : "You can accept or reject Analytics with options presented at the same level. Rejecting it will not prevent you from using Alred's essential functions."
                }
              </p>

              <p>
                {
                  es
                    ? "Puedes modificar posteriormente la elección mediante Configurar cookies en el pie de página."
                    : "You can change your choice later through Configure cookies in the footer."
                }
              </p>
            </>
          ),
        },

        {
          titulo:
            es
              ? "Configuración del navegador"
              : "Browser settings",

          contenido: (
            <p>
              {
                es
                  ? "También puedes consultar y eliminar cookies desde la configuración de tu navegador. Bloquear tecnologías estrictamente necesarias puede afectar al funcionamiento de algunos sitios, aunque Alred procurará limitar ese tipo de almacenamiento a lo imprescindible."
                  : "You can also review and delete cookies through your browser settings. Blocking strictly necessary technologies may affect how some websites work, although Alred aims to limit this type of storage to what is essential."
              }
            </p>
          ),
        },

        {
          titulo:
            es
              ? "Actualizaciones"
              : "Updates",

          contenido: (
            <p>
              {
                es
                  ? "Esta política se actualizará cuando se activen nuevas herramientas de medición o cambien de forma relevante las tecnologías utilizadas."
                  : "This policy will be updated when new measurement tools are activated or when the technologies used change materially."
              }
            </p>
          ),
        },
      ]}
    />
  );
}

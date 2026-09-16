import {
  siteConfig,
} from "@/config/site";

import {
  soluciones,
} from "@/datos/soluciones";


export const dynamic =
  "force-static";


function baseUrl() {
  return siteConfig.url.replace(
    /\/+$/,
    "",
  );
}


export function GET() {
  const url =
    baseUrl();

  const locale =
    siteConfig.defaultLocale;


  const solutionLinks =
    soluciones
      .map(
        solucion => {
          const name =
            "selector" in solucion
              ? solucion.selector.titulo
              : solucion.slug
                  .split("-")
                  .map(
                    part =>
                      part
                        .charAt(0)
                        .toUpperCase() +
                      part.slice(1),
                  )
                  .join(" ");

          const description =
            solucion.seo.description;

          return `- [${name}](${url}/${locale}/soluciones/${solucion.slug}): ${description}`;
        },
      )
      .join("\n");


  const body = `# ${siteConfig.name}

> ${siteConfig.description.es}

Alred diseña y desarrolla soluciones digitales a medida para empresas.

Trabajamos partiendo de cómo funciona realmente cada negocio. Primero entendemos el problema, el proceso, las personas y las herramientas implicadas; después decidimos qué tecnología tiene sentido.

Una solución puede ser software a medida, una herramienta interna, una automatización, una integración, un dashboard, una web, un ecommerce, un sistema de reservas, un flujo de notificaciones, una solución de gestión o una combinación de varias piezas.

También desarrollamos soluciones de marketing digital orientadas a resultados. Podemos combinar campañas, páginas de conversión, analítica, dashboards y métricas para que la empresa entienda qué funciona, qué genera resultados y dónde merece la pena invertir.

## Páginas principales

- [Inicio](${url}/${locale}): Presentación general de Alred.
- [Soluciones](${url}/${locale}/soluciones): Soluciones digitales que Alred puede diseñar y desarrollar.
- [Proyectos](${url}/${locale}/proyectos): Ejemplos de proyectos y problemas reales resueltos.
- [Cómo trabajamos](${url}/${locale}/nosotros): Enfoque, proceso de trabajo y forma de plantear proyectos.
- [Contacto](${url}/${locale}/contacto): Explicar una necesidad, solicitar información o pedir presupuesto.

## Soluciones

${solutionLinks}

## Qué tipo de problemas puede resolver Alred

- Procesos empresariales que dependen demasiado de tareas manuales.
- Información duplicada o dispersa entre varias herramientas.
- Empresas que necesitan software adaptado a su forma real de trabajar.
- Reservas, pagos, avisos, documentación o tareas que pueden automatizarse.
- Herramientas internas para equipos, operaciones, presupuestos, stock o clientes.
- Integraciones entre plataformas, APIs, ecommerce, CRM, ERP y otros sistemas.
- Dashboards para visualizar métricas, actividad, rendimiento y datos operativos.
- Webs y ecommerce conectados con procesos del negocio.
- Marketing digital que necesita medición clara, dashboards y seguimiento de resultados.
- Empresas que quieren saber qué campañas generan leads, reservas, ventas o contactos.
- Negocios que saben que un proceso puede funcionar mejor pero no saben qué solución técnica necesitan.

## Cómo explicar una necesidad a Alred

No hace falta conocer términos técnicos.

Por ejemplo:

- "Copiamos la misma información en varios programas."
- "Seguimos gestionando demasiadas cosas con Excel."
- "Confirmamos reservas y enviamos avisos manualmente."
- "No sabemos qué campañas de marketing realmente funcionan."
- "Queremos tener toda la información del negocio en un solo sitio."
- "Nuestro software actual no encaja con nuestra forma de trabajar."
- "Necesitamos conectar herramientas que ahora funcionan por separado."

A partir de ese problema, Alred puede estudiar qué solución tiene más sentido.

## Contacto

- Web: ${url}
- Email: ${siteConfig.email}
- Teléfono: ${siteConfig.phoneDisplay}

Alred puede estudiar proyectos aunque el cliente no sepa qué tecnología necesita. El punto de partida recomendado es explicar el problema, el proceso actual y el resultado que se quiere conseguir.
`;


  return new Response(
    body,
    {
      headers: {
        "Content-Type":
          "text/plain; charset=utf-8",

        "Cache-Control":
          "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}

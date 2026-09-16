import nodemailer from "nodemailer";
import {
  connect,
  type TLSSocket,
} from "node:tls";


export const runtime =
  "nodejs";

export const maxDuration =
  30;


const MAX_BODY_BYTES =
  28 * 1024;

const BODY_TIMEOUT_MS =
  5_000;

const SMTP_TIMEOUT_MS =
  20_000;


const campos =
  new Set([
    "tipo",
    "nombre",
    "apellido",
    "empresa",
    "telefono",
    "correo",
    "mensaje",
    "necesidad",
    "necesidades",
    "otro",
    "privacidadLeida",
    "privacidadVersion",
    "locale",
    "website",

    /*
     * Contexto comercial de la solicitud.
     *
     * No contiene:
     * - IP
     * - fingerprint
     * - geolocalización
     * - IDs de Clarity
     * - gclid/fbclid
     */
    "paginaEnvio",
    "landingInicial",
    "referrerInicial",
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "utmContent",
    "utmTerm",
    "utmId",
  ]);


/*
 * Rate limit efímero por instancia.
 *
 * No utilizamos IP ni ningún identificador del visitante.
 * No es un rate-limit distribuido; su función es únicamente
 * reducir ráfagas simples además del honeypot.
 */
let ventana =
  0;

let intentos =
  0;

let activos =
  0;


class ErrorPeticion
  extends Error {
  constructor(
    readonly status:
      number,
  ) {
    super(
      "contact-request-failed",
    );
  }
}


function respuesta(
  ok:
    boolean,

  status =
    200,
) {
  return Response.json(
    {
      ok,
    },

    {
      status,

      headers: {
        "Cache-Control":
          "no-store",
      },
    },
  );
}


async function leerJSON(
  request:
    Request,
): Promise<unknown> {
  const longitud =
    request.headers.get(
      "content-length",
    );


  if (
    longitud !==
      null &&
    (
      !/^\d+$/.test(
        longitud,
      ) ||
      Number(
        longitud,
      ) >
        MAX_BODY_BYTES
    )
  ) {
    throw new ErrorPeticion(
      413,
    );
  }


  if (
    !request.body
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  const reader =
    request.body.getReader();

  let vencido =
    false;


  const cancelar =
    () => {
      void reader
        .cancel()
        .catch(
          () => {},
        );
    };


  const timer =
    setTimeout(
      () => {
        vencido =
          true;

        cancelar();
      },

      BODY_TIMEOUT_MS,
    );


  request.signal.addEventListener(
    "abort",
    cancelar,
    {
      once:
        true,
    },
  );


  try {
    const chunks:
      Uint8Array[] = [];

    let bytes =
      0;


    while (
      true
    ) {
      if (
        request.signal.aborted
      ) {
        throw new ErrorPeticion(
          408,
        );
      }


      const {
        value,
        done,
      } =
        await reader.read();


      if (
        vencido
      ) {
        throw new ErrorPeticion(
          408,
        );
      }


      if (
        done
      ) {
        break;
      }


      bytes +=
        value.byteLength;


      if (
        bytes >
        MAX_BODY_BYTES
      ) {
        throw new ErrorPeticion(
          413,
        );
      }


      chunks.push(
        value,
      );
    }


    return JSON.parse(
      new TextDecoder(
        "utf-8",
        {
          fatal:
            true,
        },
      ).decode(
        Buffer.concat(
          chunks,
        ),
      ),
    );
  } catch (
    error
  ) {
    if (
      error instanceof
      ErrorPeticion
    ) {
      throw error;
    }


    throw new ErrorPeticion(
      400,
    );
  } finally {
    clearTimeout(
      timer,
    );

    request.signal.removeEventListener(
      "abort",
      cancelar,
    );

    cancelar();

    reader.releaseLock();
  }
}


function texto(
  data:
    Record<
      string,
      unknown
    >,

  campo:
    string,

  max:
    number,

  min =
    0,

  opcional =
    false,

  multilinea =
    false,
) {
  const valor =
    data[
      campo
    ];


  if (
    opcional &&
    valor ===
      undefined
  ) {
    return "";
  }


  if (
    typeof valor !==
      "string" ||
    valor.length >
      max
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  const controles =
    multilinea
      ? /[\p{Cc}]/u.test(
          valor.replace(
            /[\r\n\t]/g,
            "",
          ),
        )
      : /[\p{Cc}\u2028\u2029]/u.test(
          valor,
        );


  if (
    controles
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  const limpio =
    valor.trim();


  if (
    limpio.length <
    min
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  return limpio;
}


function esCorreo(
  correo:
    string,
) {
  if (
    correo.length >
    254
  ) {
    return false;
  }


  const partes =
    correo.split(
      "@",
    );


  if (
    partes.length !==
    2
  ) {
    return false;
  }


  const [
    local,
    dominio,
  ] =
    partes;


  return (
    local.length <=
      64 &&

    /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/.test(
      local,
    ) &&

    dominio.includes(
      ".",
    ) &&

    dominio
      .split(
        ".",
      )
      .every(
        parte =>
          /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(
            parte,
          ),
      )
  );
}


function rutaSegura(
  valor:
    string,
) {
  if (
    !valor
  ) {
    return "";
  }


  if (
    !valor.startsWith(
      "/",
    ) ||
    valor.startsWith(
      "//",
    )
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  return valor;
}


function referrerSeguro(
  valor:
    string,
) {
  if (
    !valor
  ) {
    return "";
  }


  try {
    const url =
      new URL(
        valor,
      );


    if (
      url.protocol !==
        "https:" &&
      url.protocol !==
        "http:"
    ) {
      throw new Error();
    }


    /*
     * Quitamos query/hash de forma deliberada.
     * Así evitamos arrastrar parámetros que puedan contener
     * información personal o identificadores de terceros.
     */
    return `${url.origin}${url.pathname}`;
  } catch {
    throw new ErrorPeticion(
      400,
    );
  }
}


function validar(
  body:
    unknown,
) {
  if (
    !body ||
    typeof body !==
      "object" ||
    Array.isArray(
      body,
    )
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  const data =
    body as Record<
      string,
      unknown
    >;


  if (
    Object.keys(
      data,
    ).some(
      campo =>
        !campos.has(
          campo,
        ),
    )
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  if (
    data.tipo !==
      "corto" &&
    data.tipo !==
      "largo"
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  if (
    data.locale !==
      "es" &&
    data.locale !==
      "en"
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  if (
    data.privacidadLeida !==
    true
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  const correo =
    texto(
      data,
      "correo",
      254,
      3,
    );


  const telefono =
    texto(
      data,
      "telefono",
      30,
      7,
    );


  if (
    !esCorreo(
      correo,
    ) ||

    !/^\+?[\d ().-]+$/.test(
      telefono,
    ) ||

    !/^\d{7,15}$/.test(
      telefono.replace(
        /\D/g,
        "",
      ),
    )
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  const privacidadVersion =
    texto(
      data,
      "privacidadVersion",
      32,
      1,
    );


  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(
      privacidadVersion,
    ) ||

    !Number.isFinite(
      Date.parse(
        `${privacidadVersion}T00:00:00Z`,
      ),
    ) ||

    new Date(
      `${privacidadVersion}T00:00:00Z`,
    )
      .toISOString()
      .slice(
        0,
        10,
      ) !==
      privacidadVersion
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  const necesidades:
    string[] = [];


  if (
    data.necesidades !==
    undefined
  ) {
    if (
      !Array.isArray(
        data.necesidades,
      ) ||
      data.necesidades.length >
        10
    ) {
      throw new ErrorPeticion(
        400,
      );
    }


    for (
      const item
      of data.necesidades
    ) {
      necesidades.push(
        texto(
          {
            item,
          },
          "item",
          80,
          1,
        ),
      );
    }


    if (
      new Set(
        necesidades,
      ).size !==
      necesidades.length
    ) {
      throw new ErrorPeticion(
        400,
      );
    }
  }


  const otro =
    texto(
      data,
      "otro",
      120,
      0,
      true,
    );


  if (
    data.tipo ===
      "largo" &&
    necesidades.includes(
      "otro",
    ) &&
    otro.length <
      3
  ) {
    throw new ErrorPeticion(
      400,
    );
  }


  const paginaEnvio =
    rutaSegura(
      texto(
        data,
        "paginaEnvio",
        300,
        0,
        true,
      ),
    );


  const landingInicial =
    rutaSegura(
      texto(
        data,
        "landingInicial",
        300,
        0,
        true,
      ),
    );


  const referrerInicial =
    referrerSeguro(
      texto(
        data,
        "referrerInicial",
        500,
        0,
        true,
      ),
    );


  return {
    tipo:
      data.tipo,

    locale:
      data.locale,

    nombre:
      texto(
        data,
        "nombre",
        60,
        2,
      ),

    apellido:
      texto(
        data,
        "apellido",
        80,
      ),

    empresa:
      texto(
        data,
        "empresa",
        120,
      ),

    telefono,

    correo,

    mensaje:
      texto(
        data,
        "mensaje",
        data.tipo ===
          "corto"
          ? 1800
          : 2500,
        data.tipo ===
          "corto"
          ? 12
          : 24,
        false,
        true,
      ),

    necesidad:
      texto(
        data,
        "necesidad",
        80,
        0,
        true,
      ),

    necesidades,

    otro,

    privacidadVersion,

    website:
      texto(
        data,
        "website",
        200,
        0,
        true,
      ),

    paginaEnvio,

    landingInicial,

    referrerInicial,

    utmSource:
      texto(
        data,
        "utmSource",
        180,
        0,
        true,
      ),

    utmMedium:
      texto(
        data,
        "utmMedium",
        180,
        0,
        true,
      ),

    utmCampaign:
      texto(
        data,
        "utmCampaign",
        180,
        0,
        true,
      ),

    utmContent:
      texto(
        data,
        "utmContent",
        180,
        0,
        true,
      ),

    utmTerm:
      texto(
        data,
        "utmTerm",
        180,
        0,
        true,
      ),

    utmId:
      texto(
        data,
        "utmId",
        180,
        0,
        true,
      ),
  };
}


function escapar(
  valor:
    string,
) {
  return valor.replace(
    /[&<>"']/g,

    caracter => ({
      "&":
        "&amp;",

      "<":
        "&lt;",

      ">":
        "&gt;",

      '"':
        "&quot;",

      "'":
        "&#39;",
    })[
      caracter
    ]!,
  );
}


function paginaDesdeReferer(
  request:
    Request,
) {
  const referer =
    request.headers.get(
      "referer",
    );


  if (
    !referer
  ) {
    return "";
  }


  try {
    const url =
      new URL(
        referer,
      );


    return url.pathname;
  } catch {
    return "";
  }
}


function navegadorGenerico(
  ua:
    string,
) {
  if (
    /Edg\//i.test(
      ua,
    )
  ) {
    return "Microsoft Edge";
  }


  if (
    /OPR\/|Opera/i.test(
      ua,
    )
  ) {
    return "Opera";
  }


  if (
    /Firefox\/|FxiOS\//i.test(
      ua,
    )
  ) {
    return "Firefox";
  }


  if (
    /Chrome\/|CriOS\//i.test(
      ua,
    )
  ) {
    return "Chrome";
  }


  if (
    /Safari\//i.test(
      ua,
    ) &&
    !/Chrome\/|CriOS\//i.test(
      ua,
    )
  ) {
    return "Safari";
  }


  return "Otro / desconocido";
}


function sistemaGenerico(
  ua:
    string,
) {
  if (
    /Android/i.test(
      ua,
    )
  ) {
    return "Android";
  }


  if (
    /iPhone|iPad|iPod/i.test(
      ua,
    )
  ) {
    return "iOS / iPadOS";
  }


  if (
    /Windows/i.test(
      ua,
    )
  ) {
    return "Windows";
  }


  if (
    /Macintosh|Mac OS X/i.test(
      ua,
    )
  ) {
    return "macOS";
  }


  if (
    /Linux/i.test(
      ua,
    )
  ) {
    return "Linux";
  }


  return "Otro / desconocido";
}


function dispositivoGenerico(
  ua:
    string,

  mobileHint:
    string,
) {
  if (
    /iPad|Tablet/i.test(
      ua,
    )
  ) {
    return "Tablet";
  }


  if (
    mobileHint ===
      "?1" ||
    /Mobile|Android|iPhone|iPod/i.test(
      ua,
    )
  ) {
    return "Móvil";
  }


  return "Desktop";
}


function origenOrientativo(
  datos:
    ReturnType<
      typeof validar
    >,
) {
  if (
    datos.utmSource
  ) {
    return datos.utmMedium
      ? `${datos.utmSource} / ${datos.utmMedium}`
      : datos.utmSource;
  }


  if (
    datos.referrerInicial
  ) {
    try {
      return new URL(
        datos.referrerInicial,
      ).hostname;
    } catch {
      return "Referencia externa";
    }
  }


  return "Directo / no identificado";
}


type Fila =
  readonly [
    string,
    string,
    (
      | "tel"
      | "mail"
    )?,
  ];


type SeccionEmail = {
  titulo:
    string;

  filas:
    Fila[];
};


function crearContenido(
  datos:
    ReturnType<
      typeof validar
    >,

  fecha:
    string,

  contextoTecnico: {
    paginaEnvio:
      string;

    dispositivo:
      string;

    navegador:
      string;

    sistema:
      string;
  },
) {
  const secciones:
    SeccionEmail[] = [
      {
        titulo:
          "Contacto",

        filas: [
          [
            "Nombre",
            datos.nombre,
          ],
          [
            "Apellido",
            datos.apellido,
          ],
          [
            "Empresa",
            datos.empresa,
          ],
          [
            "Teléfono",
            datos.telefono,
            "tel",
          ],
          [
            "Correo",
            datos.correo,
            "mail",
          ],
        ],
      },

      {
        titulo:
          "Proyecto",

        filas: [
          [
            "Tipo de formulario",
            datos.tipo,
          ],
          [
            "Necesidad",
            datos.necesidad,
          ],
          [
            "Necesidades",
            datos.necesidades.join(
              ", ",
            ),
          ],
          [
            "Otra necesidad",
            datos.otro,
          ],
          [
            "Mensaje",
            datos.mensaje,
          ],
        ],
      },

      {
        titulo:
          "Origen y atribución",

        filas: [
          [
            "Origen orientativo",
            origenOrientativo(
              datos,
            ),
          ],
          [
            "Landing inicial",
            datos.landingInicial,
          ],
          [
            "Página de envío",
            contextoTecnico.paginaEnvio ||
              datos.paginaEnvio,
          ],
          [
            "Referencia inicial",
            datos.referrerInicial,
          ],
          [
            "utm_source",
            datos.utmSource,
          ],
          [
            "utm_medium",
            datos.utmMedium,
          ],
          [
            "utm_campaign",
            datos.utmCampaign,
          ],
          [
            "utm_content",
            datos.utmContent,
          ],
          [
            "utm_term",
            datos.utmTerm,
          ],
          [
            "utm_id",
            datos.utmId,
          ],
        ],
      },

      {
        titulo:
          "Contexto técnico",

        filas: [
          [
            "Idioma",
            datos.locale,
          ],
          [
            "Dispositivo",
            contextoTecnico.dispositivo,
          ],
          [
            "Navegador",
            contextoTecnico.navegador,
          ],
          [
            "Sistema",
            contextoTecnico.sistema,
          ],
          [
            "Recepción (UTC)",
            fecha,
          ],
        ],
      },

      {
        titulo:
          "Privacidad",

        filas: [
          [
            "Información de privacidad leída",
            "Sí",
          ],
          [
            "Versión",
            datos.privacidadVersion,
          ],
          [
            "IP almacenada",
            "No",
          ],
          [
            "Fingerprinting",
            "No",
          ],
        ],
      },
    ];


  const textoPlano =
    secciones
      .map(
        seccion => {
          const filas =
            seccion.filas
              .map(
                ([
                  campo,
                  valor,
                ]) =>
                  `${campo}: ${valor || "—"}`,
              )
              .join(
                "\n",
              );


          return `${seccion.titulo.toUpperCase()}\n${filas}`;
        },
      )
      .join(
        "\n\n",
      );


  const htmlSecciones =
    secciones
      .map(
        seccion => {
          const filas =
            seccion.filas
              .map(
                ([
                  campo,
                  valor,
                  enlace,
                ]) => {
                  const contenido =
                    escapar(
                      valor ||
                      "—",
                    ).replace(
                      /\r\n|\r|\n/g,
                      "<br>",
                    );


                  let href =
                    "";


                  if (
                    enlace ===
                    "tel" &&
                    valor
                  ) {
                    href =
                      `tel:${datos.telefono.replace(
                        /[^+\d]/g,
                        "",
                      )}`;
                  }


                  if (
                    enlace ===
                    "mail" &&
                    valor
                  ) {
                    href =
                      `mailto:${datos.correo}`;
                  }


                  const salida =
                    href
                      ? `<a href="${escapar(
                          href,
                        )}" style="color:#171717;text-decoration:underline;text-underline-offset:3px">${contenido}</a>`
                      : contenido;


                  return `
                    <tr>
                      <th
                        scope="row"
                        style="
                          width:34%;
                          text-align:left;
                          vertical-align:top;
                          padding:11px 16px 11px 0;
                          border-bottom:1px solid #eeeeec;
                          color:#747470;
                          font-size:13px;
                          font-weight:500;
                        "
                      >
                        ${escapar(
                          campo,
                        )}
                      </th>

                      <td
                        style="
                          padding:11px 0;
                          border-bottom:1px solid #eeeeec;
                          color:#171717;
                          font-size:14px;
                          line-height:1.55;
                          overflow-wrap:anywhere;
                        "
                      >
                        ${salida}
                      </td>
                    </tr>
                  `;
                },
              )
              .join(
                "",
              );


          return `
            <section style="margin-top:28px">
              <h2
                style="
                  margin:0 0 8px;
                  color:#171717;
                  font-size:15px;
                  font-weight:600;
                "
              >
                ${escapar(
                  seccion.titulo,
                )}
              </h2>

              <table
                role="presentation"
                style="
                  width:100%;
                  border-collapse:collapse;
                "
              >
                <tbody>
                  ${filas}
                </tbody>
              </table>
            </section>
          `;
        },
      )
      .join(
        "",
      );


  return {
    text:
      `Nuevo contacto Alred\n\n${textoPlano}`,

    html:
      `<!doctype html>
      <html lang="es">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <title>Nuevo contacto Alred</title>
        </head>

        <body
          style="
            margin:0;
            padding:24px;
            background:#f5f5f3;
            color:#171717;
            font-family:Arial,Helvetica,sans-serif;
          "
        >
          <div
            style="
              max-width:720px;
              margin:0 auto;
              padding:28px;
              border:1px solid #e7e7e3;
              border-radius:18px;
              background:#ffffff;
            "
          >
            <p
              style="
                margin:0 0 8px;
                color:#747470;
                font-size:12px;
              "
            >
              Alred · formulario web
            </p>

            <h1
              style="
                margin:0;
                color:#111111;
                font-size:26px;
                line-height:1.1;
                font-weight:600;
              "
            >
              Nuevo contacto
            </h1>

            <p
              style="
                margin:9px 0 0;
                color:#747470;
                font-size:14px;
                line-height:1.5;
              "
            >
              Puedes responder directamente a este correo y la respuesta se enviará a ${escapar(
                datos.correo,
              )}.
            </p>

            ${htmlSecciones}
          </div>
        </body>
      </html>`,
  };
}


export async function POST(
  request:
    Request,
) {
  const fechaRecepcion =
    new Date()
      .toISOString();


  try {
    if (
      request.headers
        .get(
          "content-type",
        )
        ?.split(
          ";",
        )[0]
        .trim()
        .toLowerCase() !==
      "application/json"
    ) {
      return respuesta(
        false,
        415,
      );
    }


    if (
      request.headers.get(
        "content-encoding",
      ) &&
      request.headers.get(
        "content-encoding",
      ) !==
        "identity"
    ) {
      return respuesta(
        false,
        415,
      );
    }


    if (
      request.headers.get(
        "sec-fetch-site",
      ) ===
      "cross-site"
    ) {
      return respuesta(
        false,
        403,
      );
    }


    const datos =
      validar(
        await leerJSON(
          request,
        ),
      );


    /*
     * Honeypot.
     *
     * Fingimos éxito para no explicar al bot
     * que ha sido detectado.
     */
    if (
      datos.website
    ) {
      return respuesta(
        true,
      );
    }


    const user =
      process.env
        .CONTACT_SMTP_USER
        ?.trim() ??
      "";

    const pass =
      process.env
        .CONTACT_SMTP_APP_PASSWORD
        ?.replace(
          /\s/g,
          "",
        ) ??
      "";

    const to =
      process.env
        .CONTACT_TO_EMAIL
        ?.trim() ??
      "";


    if (
      !esCorreo(
        user,
      ) ||
      !esCorreo(
        to,
      ) ||
      !pass
    ) {
      return respuesta(
        false,
        503,
      );
    }


    if (
      request.signal.aborted
    ) {
      return respuesta(
        false,
        408,
      );
    }


    const ahora =
      Date.now();


    if (
      ahora -
        ventana >=
      60_000
    ) {
      ventana =
        ahora;

      intentos =
        0;
    }


    if (
      intentos >=
        20 ||
      activos >=
        2
    ) {
      return respuesta(
        false,
        429,
      );
    }


    intentos +=
      1;

    activos +=
      1;


    const ua =
      request.headers.get(
        "user-agent",
      ) ??
      "";

    const paginaCabecera =
      paginaDesdeReferer(
        request,
      );

    const contextoTecnico = {
      paginaEnvio:
        paginaCabecera,

      dispositivo:
        dispositivoGenerico(
          ua,
          request.headers.get(
            "sec-ch-ua-mobile",
          ) ??
            "",
        ),

      navegador:
        navegadorGenerico(
          ua,
        ),

      sistema:
        sistemaGenerico(
          ua,
        ),
    };


    let socket:
      TLSSocket |
      undefined;

    let transporter:
      ReturnType<
        typeof nodemailer.createTransport
      > |
      undefined;

    let timer:
      ReturnType<
        typeof setTimeout
      > |
      undefined;


    try {
      transporter =
        nodemailer.createTransport({
          host:
            "smtp.gmail.com",

          port:
            465,

          secure:
            true,

          auth: {
            user,
            pass,
          },

          connectionTimeout:
            5_000,

          greetingTimeout:
            5_000,

          socketTimeout:
            10_000,

          dnsTimeout:
            5_000,

          tls: {
            minVersion:
              "TLSv1.2",

            rejectUnauthorized:
              true,
          },

          logger:
            false,

          debug:
            false,

          disableFileAccess:
            true,

          disableUrlAccess:
            true,

          getSocket(
            _options,
            callback,
          ) {
            socket =
              connect({
                host:
                  "smtp.gmail.com",

                port:
                  465,

                servername:
                  "smtp.gmail.com",

                minVersion:
                  "TLSv1.2",

                rejectUnauthorized:
                  true,
              });


            const fallo =
              (
                error:
                  Error,
              ) =>
                callback(
                  error,
                );


            socket.once(
              "error",
              fallo,
            );


            socket.once(
              "secureConnect",
              () => {
                socket!
                  .removeListener(
                    "error",
                    fallo,
                  );


                callback(
                  null,
                  {
                    connection:
                      socket,

                    secured:
                      true,
                  },
                );
              },
            );
          },
        });


      const contenido =
        crearContenido(
          datos,
          fechaRecepcion,
          contextoTecnico,
        );


      const enviado =
        await Promise.race([
          transporter.sendMail({
            from: {
              name:
                "Alred",

              address:
                user,
            },

            to: {
              address:
                to,

              name:
                "",
            },

            envelope: {
              from:
                user,

              to: [
                to,
              ],
            },

            replyTo: {
              name:
                `${datos.nombre} ${datos.apellido}`.trim(),

              address:
                datos.correo,
            },

            subject:
              `Nuevo contacto Alred — ${datos.nombre} — ${datos.tipo}`,

            ...contenido,
          }),

          new Promise<never>(
            (
              _,
              reject,
            ) => {
              timer =
                setTimeout(
                  () => {
                    socket?.destroy();

                    reject(
                      new ErrorPeticion(
                        504,
                      ),
                    );
                  },

                  SMTP_TIMEOUT_MS,
                );
            },
          ),
        ]);


      if (
        !enviado.accepted
          ?.length ||
        enviado.rejected
          ?.length
      ) {
        return respuesta(
          false,
          502,
        );
      }


      return respuesta(
        true,
      );
    } catch {
      /*
       * No registramos el error SMTP.
       * Nodemailer puede incluir direcciones o contenido
       * dentro de algunos errores.
       */
      return respuesta(
        false,
        502,
      );
    } finally {
      clearTimeout(
        timer,
      );

      socket?.destroy();

      transporter?.close();

      activos -=
        1;
    }
  } catch (
    error
  ) {
    return respuesta(
      false,
      error instanceof
        ErrorPeticion
        ? error.status
        : 500,
    );
  }
}


function metodoNoPermitido() {
  return respuesta(
    false,
    405,
  );
}


export {
  metodoNoPermitido as GET,
  metodoNoPermitido as PUT,
  metodoNoPermitido as PATCH,
  metodoNoPermitido as DELETE,
  metodoNoPermitido as OPTIONS,
};

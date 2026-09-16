"use client";

import {
  getImageProps,
} from "next/image";

import Link from "next/link";

import {
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
  useState,
} from "react";

import styles from "./FormulariosContacto02.module.css";

import type {
  FormulariosContacto02Props,
  OpcionNecesidad,
  VisualFormulario,
} from "./FormulariosContacto02.types";


type Modo =
  | "corto"
  | "largo";


type DatosFormulario = {
  nombre: string;
  apellido: string;
  empresa: string;
  telefono: string;
  correo: string;
  necesidad: string;
  necesidades: string[];
  otro: string;
  mensaje: string;
  privacidad: boolean;
};


type CampoValidable =
  | "nombre"
  | "apellido"
  | "empresa"
  | "telefono"
  | "correo"
  | "necesidad"
  | "necesidades"
  | "otro"
  | "mensaje"
  | "privacidad";


type Errores =
  Partial<
    Record<
      CampoValidable,
      string
    >
  >;


type Tocadas =
  Partial<
    Record<
      CampoValidable,
      boolean
    >
  >;


const DATOS_INICIALES:
  DatosFormulario = {
    nombre: "",
    apellido: "",
    empresa: "",
    telefono: "",
    correo: "",
    necesidad: "",
    necesidades: [],
    otro: "",
    mensaje: "",
    privacidad: false,
  };


const REGEX_CORREO =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;


const REGEX_TELEFONO =
  /^[+\d\s().-]+$/;


function limpiarTexto(
  valor: string,
) {
  return valor
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}


function validarCampo(
  campo: CampoValidable,
  datos: DatosFormulario,
  modo: Modo,
) {
  switch (campo) {
    case "nombre": {
      const valor =
        limpiarTexto(
          datos.nombre,
        );

      if (!valor) {
        return "Escribe tu nombre.";
      }

      if (
        valor.length < 2
      ) {
        return "Revisa el nombre.";
      }

      if (
        valor.length > 60
      ) {
        return "El nombre es demasiado largo.";
      }

      return "";
    }


    case "apellido": {
      const valor =
        limpiarTexto(
          datos.apellido,
        );

      return valor.length > 80
        ? "El apellido es demasiado largo."
        : "";
    }


    case "empresa": {
      const valor =
        limpiarTexto(
          datos.empresa,
        );

      return valor.length > 120
        ? "El nombre de empresa es demasiado largo."
        : "";
    }


    case "telefono": {
      const valor =
        limpiarTexto(
          datos.telefono,
        );

      if (!valor) {
        return "Escribe un teléfono de contacto.";
      }

      if (
        !REGEX_TELEFONO.test(
          valor,
        )
      ) {
        return "Revisa el teléfono.";
      }

      const digitos =
        valor.replace(
          /\D/g,
          "",
        );

      if (
        digitos.length < 7 ||
        digitos.length > 15
      ) {
        return "Revisa el teléfono.";
      }

      return "";
    }


    case "correo": {
      const valor =
        limpiarTexto(
          datos.correo,
        );

      if (!valor) {
        return "Escribe tu correo.";
      }

      if (
        valor.length > 254 ||
        !REGEX_CORREO.test(
          valor,
        )
      ) {
        return "Introduce un correo válido.";
      }

      return "";
    }


    case "necesidad":
      if (
        modo === "corto" &&
        !datos.necesidad
      ) {
        return "Selecciona una opción.";
      }

      return "";


    case "necesidades":
      if (
        modo === "largo" &&
        datos.necesidades.length === 0
      ) {
        return "Selecciona al menos una opción.";
      }

      return "";


    case "otro":
      if (
        modo === "largo" &&
        datos.necesidades.includes(
          "otro",
        )
      ) {
        const valor =
          limpiarTexto(
            datos.otro,
          );

        if (
          valor.length < 3
        ) {
          return "Cuéntanos qué necesitas.";
        }

        if (
          valor.length > 120
        ) {
          return "Intenta resumirlo un poco.";
        }
      }

      return "";


    case "mensaje": {
      const valor =
        datos.mensaje.trim();

      const minimo =
        modo === "corto"
          ? 12
          : 24;

      const maximo =
        modo === "corto"
          ? 1800
          : 2500;

      if (!valor) {
        return modo === "corto"
          ? "Cuéntanos brevemente qué necesitas."
          : "Cuéntanos tu proyecto con un poco más de detalle.";
      }

      if (
        valor.length < minimo
      ) {
        return "Añade un poco más de detalle.";
      }

      if (
        valor.length > maximo
      ) {
        return "El mensaje es demasiado largo.";
      }

      return "";
    }


    case "privacidad":
      return datos.privacidad
        ? ""
        : "Confirma la información de privacidad.";


    default:
      return "";
  }
}


function camposDelModo(
  modo: Modo,
): CampoValidable[] {
  const comunes:
    CampoValidable[] = [
      "nombre",
      "apellido",
      "empresa",
      "telefono",
      "correo",
      "mensaje",
      "privacidad",
    ];


  return modo === "corto"
    ? [
        ...comunes,
        "necesidad",
      ]
    : [
        ...comunes,
        "necesidades",
        "otro",
      ];
}


function validarFormulario(
  datos: DatosFormulario,
  modo: Modo,
) {
  const errores:
    Errores = {};


  camposDelModo(
    modo,
  ).forEach(
    campo => {
      const error =
        validarCampo(
          campo,
          datos,
          modo,
        );


      if (error) {
        errores[campo] =
          error;
      }
    },
  );


  return errores;
}


function ErrorCampo({
  id,
  error,
}: {
  id: string;
  error?: string;
}) {
  if (!error) {
    return null;
  }


  return (
    <p
      id={id}
      className={
        styles.error
      }
      role="alert"
    >
      {error}
    </p>
  );
}


function LogoVisual({
  marca,
  visual,
}: {
  marca: string;
  visual: VisualFormulario;
}) {
  if (
    !visual.logo
  ) {
    return (
      <p
        className={
          styles.visualBrand
        }
      >
        {marca}
      </p>
    );
  }


  const variables = {
    "--logo-url":
      `url("${visual.logo}")`,

    "--logo-color":
      visual.logoColor ??
      "#111111",

    "--logo-width":
      `${visual.logoWidth ?? 54}px`,

    "--logo-width-mobile":
      `${
        visual.logoWidthMobile ??
        visual.logoWidth ??
        54
      }px`,
  } as CSSProperties;


  return (
    <div
      className={
        styles.logoSvg
      }
      role="img"
      aria-label={
        visual.logoAlt ??
        marca
      }
      style={
        variables
      }
    />
  );
}


function PanelVisual({
  marca,
  modo,
  visual,
}: {
  marca: string;
  modo: Modo;
  visual: VisualFormulario;
}) {
  const {
    props: desktop,
  } =
    getImageProps({
      src:
        visual.fondoDesktop,

      alt:
        visual.fondoAlt ??
        "",

      width:
        1400,

      height:
        1400,

      sizes:
        "(max-width: 979px) 100vw, 50vw",
    });


  const {
    props: mobile,
  } =
    getImageProps({
      src:
        visual.fondoMobile ??
        visual.fondoDesktop,

      alt:
        visual.fondoAlt ??
        "",

      width:
        900,

      height:
        1100,

      sizes:
        "100vw",
    });


  const variables = {
    "--fondo-x":
      `${visual.fondoX ?? 50}%`,

    "--fondo-y":
      `${visual.fondoY ?? 50}%`,

    "--fondo-x-mobile":
      `${visual.fondoXMobile ?? visual.fondoX ?? 50}%`,

    "--fondo-y-mobile":
      `${visual.fondoYMobile ?? visual.fondoY ?? 50}%`,
  } as CSSProperties;


  return (
    <div
      className={
        styles.visualPanel
      }
      style={
        variables
      }
    >
      <div
        className={
          styles.visualFrame
        }
        aria-hidden="true"
      />


      <div
        key={
          modo
        }
        className={
          styles.visualTransition
        }
      >
        <picture
          className={
            styles.visualMedia
          }
        >
          <source
            media="(max-width: 979px)"
            srcSet={
              mobile.srcSet
            }
            sizes={
              mobile.sizes
            }
          />

          <img
            {...desktop}
            alt={
              visual.fondoAlt ??
              ""
            }
            className={
              styles.visualImage
            }
            draggable={
              false
            }
          />
        </picture>


        <div
          className={
            styles.visualShade
          }
          aria-hidden="true"
        />


        <div
          className={
            styles.visualContent
          }
        >
          <header
            className={
              styles.visualHeader
            }
          >
            <LogoVisual
              marca={
                marca
              }
              visual={
                visual
              }
            />
          </header>


          <div
            className={
              styles.visualCopy
            }
          >
            <h3
              className={
                styles.visualTitle
              }
            >
              {
                visual.titulo
              }
            </h3>

            <p
              className={
                styles.visualDescription
              }
            >
              {
                visual.descripcion
              }
            </p>
          </div>


          {visual.categorias &&
          visual.categorias.length >
            0 && (
            <ul
              className={
                styles.visualCategories
              }
            >
              {
                visual.categorias.map(
                  categoria => (
                    <li
                      key={
                        categoria
                      }
                    >
                      {categoria}
                    </li>
                  ),
                )
              }
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}


type CampoProps = {
  id: string;
  label: string;
  nota?: string;

  name:
    | "nombre"
    | "apellido"
    | "empresa"
    | "telefono"
    | "correo"
    | "otro";

  value: string;
  error?: string;

  type?:
    | "text"
    | "email"
    | "tel";

  inputMode?:
    | "text"
    | "email"
    | "tel";

  autoComplete?: string;
  disabled?: boolean;

  onChange:
    (
      campo: CampoProps["name"],
      valor: string,
    ) => void;

  onBlur:
    (
      campo: CampoValidable,
    ) => void;
};


function Campo({
  id,
  label,
  nota,
  name,
  value,
  error,
  type = "text",
  inputMode,
  autoComplete,
  disabled = false,
  onChange,
  onBlur,
}: CampoProps) {
  const errorId =
    `${id}-error`;


  return (
    <div
      className={
        styles.field
      }
      data-error={
        Boolean(
          error,
        )
      }
    >
      <label
        htmlFor={
          id
        }
        className={
          styles.label
        }
      >
        {label}

        {nota && (
          <small
            className={
              styles.optional
            }
          >
            {nota}
          </small>
        )}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        inputMode={
          inputMode
        }
        autoComplete={
          autoComplete
        }
        className={
          styles.input
        }
        value={
          value
        }
        disabled={
          disabled
        }
        onChange={
          event =>
            onChange(
              name,
              event.currentTarget.value,
            )
        }
        onBlur={
          () =>
            onBlur(
              name,
            )
        }
        aria-invalid={
          Boolean(
            error,
          )
        }
        aria-describedby={
          error
            ? errorId
            : undefined
        }
      />

      <ErrorCampo
        id={
          errorId
        }
        error={
          error
        }
      />
    </div>
  );
}


function CampoMensaje({
  id,
  modo,
  es,
  value,
  error,
  onChange,
  onBlur,
}: {
  id: string;
  modo: Modo;
  es: boolean;
  value: string;
  error?: string;
  onChange:
    (valor: string) => void;
  onBlur:
    () => void;
}) {
  const maxLength =
    modo === "corto"
      ? 1800
      : 2500;

  const errorId =
    `${id}-error`;


  return (
    <div
      className={
        styles.field
      }
      data-error={
        Boolean(
          error,
        )
      }
    >
      <label
        htmlFor={
          id
        }
        className={
          styles.label
        }
      >
        {modo === "corto"
          ? es
            ? "Cuéntanos brevemente qué necesitas"
            : "Tell us briefly what you need"
          : es
            ? "Cuéntanos tu caso"
            : "Tell us about your case"}
      </label>

      <textarea
        id={id}
        name="mensaje"
        className={
          styles.textarea
        }
        value={
          value
        }
        maxLength={
          maxLength
        }
        rows={
          modo === "corto"
            ? 5
            : 6
        }
        onChange={
          event =>
            onChange(
              event.currentTarget.value,
            )
        }
        onBlur={
          onBlur
        }
        aria-invalid={
          Boolean(
            error,
          )
        }
        aria-describedby={
          error
            ? errorId
            : undefined
        }
      />

      <small
        className={
          styles.counter
        }
        aria-hidden="true"
      >
        {value.length}/{maxLength}
      </small>

      <ErrorCampo
        id={
          errorId
        }
        error={
          error
        }
      />
    </div>
  );
}


function CheckboxNecesidad({
  opcion,
  checked,
  onChange,
}: {
  opcion: OpcionNecesidad;
  checked: boolean;
  onChange:
    () => void;
}) {
  return (
    <label
      className={
        styles.checkOption
      }
      data-checked={
        checked
      }
    >
      <input
        type="checkbox"
        name="necesidades"
        value={
          opcion.value
        }
        checked={
          checked
        }
        onChange={
          onChange
        }
      />

      <i
        className={
          styles.checkMark
        }
        aria-hidden="true"
      />

      <b
        className={
          styles.checkText
        }
      >
        {
          opcion.label
        }
      </b>
    </label>
  );
}



type ContextoAtribucion = {
  paginaEnvio: string;
  landingInicial: string;
  referrerInicial: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  utmId: string;
};


function urlSegura(
  valor: string,
) {
  try {
    return new URL(
      valor,
      window.location.origin,
    );
  } catch {
    return null;
  }
}


function rutaSinParametros(
  url: URL | null,
) {
  if (
    !url
  ) {
    return "";
  }


  if (
    url.origin !==
    window.location.origin
  ) {
    return "";
  }


  return url.pathname;
}


function referenciaSinParametros(
  valor: string,
) {
  if (
    !valor
  ) {
    return "";
  }


  const url =
    urlSegura(
      valor,
    );


  if (
    !url ||
    (
      url.protocol !==
        "https:" &&
      url.protocol !==
        "http:"
    )
  ) {
    return "";
  }


  return `${url.origin}${url.pathname}`;
}


function primeraUrlNavegacion() {
  const navegacion =
    performance
      .getEntriesByType(
        "navigation",
      )[0] as
      | PerformanceNavigationTiming
      | undefined;


  return urlSegura(
    navegacion?.name ??
      window.location.href,
  );
}


function leerUtm(
  inicial:
    URL | null,

  actual:
    URL,
) {
  const claves = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "utm_id",
  ] as const;


  const fuente =
    claves.some(
      clave =>
        inicial?.searchParams.has(
          clave,
        ),
    )
      ? inicial
      : actual;


  return {
    utmSource:
      fuente?.searchParams.get(
        "utm_source",
      )?.slice(
        0,
        180,
      ) ??
      "",

    utmMedium:
      fuente?.searchParams.get(
        "utm_medium",
      )?.slice(
        0,
        180,
      ) ??
      "",

    utmCampaign:
      fuente?.searchParams.get(
        "utm_campaign",
      )?.slice(
        0,
        180,
      ) ??
      "",

    utmContent:
      fuente?.searchParams.get(
        "utm_content",
      )?.slice(
        0,
        180,
      ) ??
      "",

    utmTerm:
      fuente?.searchParams.get(
        "utm_term",
      )?.slice(
        0,
        180,
      ) ??
      "",

    utmId:
      fuente?.searchParams.get(
        "utm_id",
      )?.slice(
        0,
        180,
      ) ??
      "",
  };
}


function obtenerContextoAtribucion():
  ContextoAtribucion {
  const actual =
    new URL(
      window.location.href,
    );

  /*
   * En navegación SPA de Next.js, la entrada PerformanceNavigationTiming
   * sigue apuntando al documento con el que comenzó la visita.
   *
   * Esto permite conservar la landing y los UTM durante la navegación
   * sin escribir cookies, localStorage ni sessionStorage.
   */
  const inicial =
    primeraUrlNavegacion();


  return {
    paginaEnvio:
      actual.pathname,

    landingInicial:
      rutaSinParametros(
        inicial,
      ),

    referrerInicial:
      referenciaSinParametros(
        document.referrer,
      ),

    ...leerUtm(
      inicial,
      actual,
    ),
  };
}

export function FormulariosContacto02({
  id = "contacto-rapido",
  marca = "Alred",
  locale = "es",
  modoInicial = "corto",
  endpoint = "/api/contacto",
  mensajeExito =
    "Hemos recibido tu solicitud. Nos pondremos en contacto contigo lo antes posible.",
  mensajeError =
    "No hemos podido enviar el formulario ahora mismo. Inténtalo de nuevo en unos segundos.",
  corto,
  largo,
  opcionesNecesidad,
}: FormulariosContacto02Props) {
  const [
    modo,
    setModo,
  ] =
    useState<Modo>(
      modoInicial,
    );

  const [
    datos,
    setDatos,
  ] =
    useState<DatosFormulario>(
      DATOS_INICIALES,
    );

  const [
    tocadas,
    setTocadas,
  ] =
    useState<Tocadas>(
      {},
    );

  const [
    errores,
    setErrores,
  ] =
    useState<Errores>(
      {},
    );

  const [
    enviando,
    setEnviando,
  ] =
    useState(
      false,
    );

  const [
    estado,
    setEstado,
  ] =
    useState<{
      tipo:
        | "ok"
        | "error";

      mensaje: string;
    } | null>(
      null,
    );


  const config =
    modo === "corto"
      ? corto
      : largo;


  const es =
    locale !== "en";


  function cambiarModo(
    siguiente:
      Modo,
  ) {
    if (
      siguiente ===
      modo
    ) {
      return;
    }


    setModo(
      siguiente,
    );

    setErrores(
      {},
    );

    setTocadas(
      {},
    );

    setEstado(
      null,
    );
  }


  function actualizarTexto(
    campo:
      | "nombre"
      | "apellido"
      | "empresa"
      | "telefono"
      | "correo"
      | "otro",

    valor: string,
  ) {
    const siguientes = {
      ...datos,

      [campo]:
        valor,
    };


    setDatos(
      siguientes,
    );


    if (
      tocadas[campo]
    ) {
      setErrores(
        actual => ({
          ...actual,

          [campo]:
            validarCampo(
              campo,
              siguientes,
              modo,
            ),
        }),
      );
    }
  }


  function actualizarMensaje(
    valor: string,
  ) {
    const siguientes = {
      ...datos,

      mensaje:
        valor,
    };


    setDatos(
      siguientes,
    );


    if (
      tocadas.mensaje
    ) {
      setErrores(
        actual => ({
          ...actual,

          mensaje:
            validarCampo(
              "mensaje",
              siguientes,
              modo,
            ),
        }),
      );
    }
  }


  function terminarCampo(
    campo:
      CampoValidable,
  ) {
    setTocadas(
      actual => ({
        ...actual,

        [campo]:
          true,
      }),
    );


    setErrores(
      actual => ({
        ...actual,

        [campo]:
          validarCampo(
            campo,
            datos,
            modo,
          ),
      }),
    );
  }


  function cambiarNecesidadCorta(
    event:
      ChangeEvent<HTMLSelectElement>,
  ) {
    const siguientes = {
      ...datos,

      necesidad:
        event.currentTarget.value,
    };


    setDatos(
      siguientes,
    );


    if (
      tocadas.necesidad
    ) {
      setErrores(
        actual => ({
          ...actual,

          necesidad:
            validarCampo(
              "necesidad",
              siguientes,
              modo,
            ),
        }),
      );
    }
  }


  function alternarNecesidad(
    opcion:
      OpcionNecesidad,
  ) {
    const existe =
      datos.necesidades.includes(
        opcion.value,
      );


    const necesidades =
      existe
        ? datos.necesidades.filter(
            valor =>
              valor !==
              opcion.value,
          )
        : [
            ...datos.necesidades,
            opcion.value,
          ];


    const siguientes = {
      ...datos,

      necesidades,

      otro:
        opcion.value ===
          "otro" &&
        existe
          ? ""
          : datos.otro,
    };


    setDatos(
      siguientes,
    );


    setTocadas(
      actual => ({
        ...actual,

        necesidades:
          true,

        otro:
          opcion.value ===
          "otro"
            ? true
            : actual.otro,
      }),
    );


    setErrores(
      actual => ({
        ...actual,

        necesidades:
          validarCampo(
            "necesidades",
            siguientes,
            modo,
          ),

        otro:
          validarCampo(
            "otro",
            siguientes,
            modo,
          ),
      }),
    );
  }


  function actualizarPrivacidad(
    checked: boolean,
  ) {
    const siguientes = {
      ...datos,

      privacidad:
        checked,
    };


    setDatos(
      siguientes,
    );


    setTocadas(
      actual => ({
        ...actual,

        privacidad:
          true,
      }),
    );


    setErrores(
      actual => ({
        ...actual,

        privacidad:
          checked
            ? ""
            : es
              ? "Confirma que has leído la información de privacidad."
              : "Please confirm that you have read the privacy information.",
      }),
    );
  }


  async function enviar(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    const form = event.currentTarget;
    if (enviando) return;


    const nuevosErrores =
      validarFormulario(
        datos,
        modo,
      );


    if (
      !datos.privacidad
    ) {
      nuevosErrores.privacidad =
        es
          ? "Confirma que has leído la información de privacidad."
          : "Please confirm that you have read the privacy information.";
    }


    const nuevasTocadas:
      Tocadas = {};


    camposDelModo(
      modo,
    ).forEach(
      campo => {
        nuevasTocadas[
          campo
        ] =
          true;
      },
    );


    setTocadas(
      nuevasTocadas,
    );

    setErrores(
      nuevosErrores,
    );

    setEstado(
      null,
    );


    if (
      Object.keys(
        nuevosErrores,
      ).length > 0
    ) {
      window.requestAnimationFrame(
        () => {
          form
            .querySelector<HTMLElement>(
              "[aria-invalid='true']",
            )
            ?.focus();
        },
      );

      return;
    }


    setEnviando(
      true,
    );


    try {
      const payload = {
        locale,

        website:
          new FormData(
            form,
          ).get(
            "website",
          ) ??
          "",

        /*
         * Contexto comercial de la solicitud.
         *
         * No guardamos IP, fingerprint ni identificadores
         * publicitarios. Tampoco escribimos cookies/storage
         * para conservar esta atribución.
         */
        ...obtenerContextoAtribucion(),

        tipo:
          modo,

        nombre:
          limpiarTexto(
            datos.nombre,
          ),

        apellido:
          limpiarTexto(
            datos.apellido,
          ),

        empresa:
          limpiarTexto(
            datos.empresa,
          ),

        telefono:
          limpiarTexto(
            datos.telefono,
          ),

        correo:
          limpiarTexto(
            datos.correo,
          ),

        mensaje:
          datos.mensaje.trim(),

        privacidadLeida:
          datos.privacidad,

        privacidadVersion:
          "2026-09-15",

        ...(modo ===
        "corto"
          ? {
              necesidad:
                datos.necesidad,
            }
          : {
              necesidades:
                datos.necesidades,

              otro:
                datos.necesidades.includes(
                  "otro",
                )
                  ? limpiarTexto(
                      datos.otro,
                    )
                  : "",
            }),
      };


      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 30_000);
      try {
        const respuesta = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok || resultado?.ok !== true) throw new Error("submit-error");
      } finally {
        window.clearTimeout(timeout);
      }
      form.reset();

      setDatos(
        DATOS_INICIALES,
      );

      setTocadas(
        {},
      );

      setErrores(
        {},
      );

      setEstado({
        tipo:
          "ok",

        mensaje:
          mensajeExito,
      });
    } catch {
      setEstado({
        tipo:
          "error",

        mensaje:
          mensajeError,
      });
    } finally {
      setEnviando(
        false,
      );
    }
  }


  return (
    <section
      id={
        id
      }
      className={
        styles.section
      }
    >
      <div
        className={
          styles.shell
        }
        data-mode={
          modo
        }
      >
        <div
          className={
            styles.mobileSwitcherWrap
          }
        >
          <div
            className={
              styles.switcher
            }
            role="group"
            aria-label="Seleccionar tipo de formulario"
          >
            <i
              className={
                styles.switchIndicator
              }
              data-mode={
                modo
              }
              aria-hidden="true"
            />

            <button
              type="button"
              className={
                styles.switchButton
              }
              aria-pressed={
                modo ===
                "corto"
              }
              onClick={
                () =>
                  cambiarModo(
                    "corto",
                  )
              }
            >
              {es ? "Formulario simple" : "Short form"}
            </button>

            <button
              type="button"
              className={
                styles.switchButton
              }
              aria-pressed={
                modo ===
                "largo"
              }
              onClick={
                () =>
                  cambiarModo(
                    "largo",
                  )
              }
            >
              {es ? "Formulario detallado" : "Detailed form"}
            </button>
          </div>
        </div>


        <div
          className={
            styles.layout
          }
        >
          <div
            className={
              styles.formColumn
            }
          >
            <div
              className={
                styles.formPanel
              }
            >
              <div
                key={
                  modo
                }
                className={
                  styles.formTransition
                }
              >
                <header
                  className={
                    styles.formHeader
                  }
                >
                  <p
                    className={
                      styles.brand
                    }
                  >
                    {marca}
                  </p>

                  <h2
                    className={
                      styles.title
                    }
                  >
                    {
                      config.titulo
                    }
                  </h2>

                  <p
                    className={
                      styles.description
                    }
                  >
                    {
                      config.descripcion
                    }
                  </p>
                </header>


                <form
                  className={
                    styles.form
                  }

                  /*
                   * Capa adicional de privacidad para Microsoft Clarity.
                   * Aunque los inputs sensibles se enmascaren por defecto,
                   * el formulario completo queda marcado como privado.
                   */
                  data-clarity-mask="true"

                  noValidate

                  onSubmit={
                    enviar
                  }
                >
                  <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor={`${id}-website`}>Website</label>
                    <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" maxLength={200} />
                  </div>
                  <div
                    className={
                      styles.fields
                    }
                  >
                    <div
                      className={
                        styles.twoColumns
                      }
                    >
                      <Campo
                        id={`${id}-nombre`}
                        label="Nombre"
                        name="nombre"
                        value={
                          datos.nombre
                        }
                        error={
                          errores.nombre
                        }
                        autoComplete="given-name"
                        onChange={
                          actualizarTexto
                        }
                        onBlur={
                          terminarCampo
                        }
                      />

                      <Campo
                        id={`${id}-apellido`}
                        label="Apellido"
                        nota="Opcional"
                        name="apellido"
                        value={
                          datos.apellido
                        }
                        error={
                          errores.apellido
                        }
                        autoComplete="family-name"
                        onChange={
                          actualizarTexto
                        }
                        onBlur={
                          terminarCampo
                        }
                      />
                    </div>


                    <Campo
                      id={`${id}-empresa`}
                      label="Empresa"
                      nota="Opcional si eres particular"
                      name="empresa"
                      value={
                        datos.empresa
                      }
                      error={
                        errores.empresa
                      }
                      autoComplete="organization"
                      onChange={
                        actualizarTexto
                      }
                      onBlur={
                        terminarCampo
                      }
                    />


                    <div
                      className={
                        styles.twoColumns
                      }
                    >
                      <Campo
                        id={`${id}-telefono`}
                        label="Teléfono"
                        name="telefono"
                        type="tel"
                        inputMode="tel"
                        value={
                          datos.telefono
                        }
                        error={
                          errores.telefono
                        }
                        autoComplete="tel"
                        onChange={
                          actualizarTexto
                        }
                        onBlur={
                          terminarCampo
                        }
                      />

                      <Campo
                        id={`${id}-correo`}
                        label="Correo"
                        name="correo"
                        type="email"
                        inputMode="email"
                        value={
                          datos.correo
                        }
                        error={
                          errores.correo
                        }
                        autoComplete="email"
                        onChange={
                          actualizarTexto
                        }
                        onBlur={
                          terminarCampo
                        }
                      />
                    </div>


                    {modo ===
                    "corto" ? (
                      <div
                        className={
                          styles.field
                        }
                        data-error={
                          Boolean(
                            errores.necesidad,
                          )
                        }
                      >
                        <label
                          htmlFor={`${id}-necesidad`}
                          className={
                            styles.label
                          }
                        >
                          Qué necesitas
                        </label>

                        <select
                          id={`${id}-necesidad`}
                          name="necesidad"
                          className={
                            styles.select
                          }
                          value={
                            datos.necesidad
                          }
                          onChange={
                            cambiarNecesidadCorta
                          }
                          onBlur={
                            () =>
                              terminarCampo(
                                "necesidad",
                              )
                          }
                          aria-invalid={
                            Boolean(
                              errores.necesidad,
                            )
                          }
                          aria-describedby={
                            errores.necesidad
                              ? `${id}-necesidad-error`
                              : undefined
                          }
                        >
                          <option value="">
                            Selecciona una opción
                          </option>

                          {
                            opcionesNecesidad
                              .filter(
                                opcion =>
                                  opcion.value !==
                                  "otro",
                              )
                              .map(
                                opcion => (
                                  <option
                                    key={
                                      opcion.value
                                    }
                                    value={
                                      opcion.value
                                    }
                                  >
                                    {
                                      opcion.label
                                    }
                                  </option>
                                ),
                              )
                          }
                        </select>

                        <ErrorCampo
                          id={`${id}-necesidad-error`}
                          error={
                            errores.necesidad
                          }
                        />
                      </div>
                    ) : (
                      <>
                        <fieldset
                          className={
                            styles.fieldset
                          }
                        >
                          <legend
                            className={
                              styles.label
                            }
                          >
                            Qué necesitas
                          </legend>

                          <p
                            className={
                              styles.fieldHelp
                            }
                          >
                            Puedes seleccionar varias opciones.
                          </p>

                          <div
                            className={
                              styles.checkGrid
                            }
                          >
                            {
                              opcionesNecesidad.map(
                                opcion => (
                                  <CheckboxNecesidad
                                    key={
                                      opcion.value
                                    }
                                    opcion={
                                      opcion
                                    }
                                    checked={
                                      datos.necesidades.includes(
                                        opcion.value,
                                      )
                                    }
                                    onChange={
                                      () =>
                                        alternarNecesidad(
                                          opcion,
                                        )
                                    }
                                  />
                                ),
                              )
                            }
                          </div>

                          <ErrorCampo
                            id={`${id}-necesidades-error`}
                            error={
                              errores.necesidades
                            }
                          />
                        </fieldset>


                        <div
                          className={
                            styles.otherReveal
                          }
                          data-open={
                            datos.necesidades.includes(
                              "otro",
                            )
                          }
                        >
                          <div
                            className={
                              styles.otherRevealInner
                            }
                          >
                            <Campo
                              id={`${id}-otro`}
                              label="Otra necesidad"
                              name="otro"
                              value={
                                datos.otro
                              }
                              error={
                                errores.otro
                              }
                              disabled={
                                !datos.necesidades.includes(
                                  "otro",
                                )
                              }
                              onChange={
                                actualizarTexto
                              }
                              onBlur={
                                terminarCampo
                              }
                            />
                          </div>
                        </div>
                      </>
                    )}


                    <CampoMensaje
                      id={`${id}-mensaje`}
                      modo={
                        modo
                      }
                      es={
                        es
                      }
                      value={
                        datos.mensaje
                      }
                      error={
                        errores.mensaje
                      }
                      onChange={
                        actualizarMensaje
                      }
                      onBlur={
                        () =>
                          terminarCampo(
                            "mensaje",
                          )
                      }
                    />
                  </div>


                  <div
                    className={
                      styles.legalBlock
                    }
                    data-error={
                      Boolean(
                        errores.privacidad,
                      )
                    }
                  >
                    <label
                      className={
                        styles.legalCheck
                      }
                    >
                      <input
                        type="checkbox"
                        name="privacidad"
                        checked={
                          datos.privacidad
                        }
                        onChange={
                          event =>
                            actualizarPrivacidad(
                              event.currentTarget.checked,
                            )
                        }
                        aria-invalid={
                          Boolean(
                            errores.privacidad,
                          )
                        }
                        aria-describedby={
                          errores.privacidad
                            ? `${id}-privacidad-error`
                            : undefined
                        }
                      />

                      <span
                        className={
                          styles.legalCheckMark
                        }
                        aria-hidden="true"
                      />

                      <span
                        className={
                          styles.legalText
                        }
                      >
                        {
                          es
                            ? "He leído la "
                            : "I have read the "
                        }

                        <Link
                          href={`/${locale}/privacidad`}
                          target="_blank"
                        >
                          {
                            es
                              ? "Política de privacidad"
                              : "Privacy policy"
                          }
                        </Link>

                        {
                          es
                            ? " y el "
                            : " and the "
                        }

                        <Link
                          href={`/${locale}/aviso-legal`}
                          target="_blank"
                        >
                          {
                            es
                              ? "Aviso legal"
                              : "Legal notice"
                          }
                        </Link>

                        {
                          es
                            ? ", y entiendo cómo se utilizarán mis datos para responder a esta solicitud."
                            : ", and I understand how my data will be used to respond to this request."
                        }
                      </span>
                    </label>

                    <ErrorCampo
                      id={`${id}-privacidad-error`}
                      error={
                        errores.privacidad
                      }
                    />

                    <p
                      className={
                        styles.legalInfo
                      }
                    >
                      {
                        es
                          ? "Responsable: Samuel Piñero Díaz · Alred. Finalidad: responder a tu consulta y, si procede, preparar una propuesta. Derechos: info@alred.es."
                          : "Controller: Samuel Piñero Díaz · Alred. Purpose: respond to your enquiry and, where appropriate, prepare a proposal. Rights: info@alred.es."
                      }
                    </p>
                  </div>


                  <footer
                    className={
                      styles.formFooter
                    }
                  >
                    <button
                      type="submit"
                      className={
                        styles.submit
                      }
                      disabled={
                        enviando
                      }
                    >
                      {
                        enviando
                          ? "Enviando…"
                          : config.boton
                      }
                    </button>

                    {config.nota && (
                      <p
                        className={
                          styles.note
                        }
                      >
                        {
                          config.nota
                        }
                      </p>
                    )}
                  </footer>


                  {estado && (
                    <p
                      className={
                        estado.tipo ===
                        "ok"
                          ? styles.serverOk
                          : styles.serverError
                      }
                      role="status"
                    >
                      {
                        estado.mensaje
                      }
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>


          <div
            className={
              styles.visualColumn
            }
          >
            <PanelVisual
              marca={
                marca
              }
              modo={
                modo
              }
              visual={
                config.visual
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

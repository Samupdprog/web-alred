"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useMemo,
  useState,
} from "react";

import {
  Boton,
} from "@/componentes/ui";

import styles from "./FormulariosContacto01.module.css";

import type {
  FormulariosContacto01Props,
  OpcionNecesidad,
} from "./FormulariosContacto01.types";


const OPCIONES_POR_DEFECTO: OpcionNecesidad[] = [
  {
    id: "web",
    texto: "Página web",
  },
  {
    id: "tienda-online",
    texto: "Tienda online",
  },
  {
    id: "gestion",
    texto: "Software o herramienta de gestión",
  },
  {
    id: "automatizacion",
    texto: "Automatización",
  },
  {
    id: "integracion",
    texto: "Integración entre herramientas",
  },
  {
    id: "dashboard",
    texto: "Dashboard o control de datos",
  },
  {
    id: "otro",
    texto: "Otro",
    esOtro: true,
  },
];


type CamposBase = {
  nombre: string;
  apellidos: string;
  empresa: string;
  telefono: string;
  correo: string;
};


type FormularioRapido = CamposBase & {
  mensaje: string;
};


type FormularioDetallado = CamposBase & {
  necesidades: string[];
  otro: string;
  detalle: string;
};


type Errores<T> =
  Partial<
    Record<
      keyof T | "necesidades",
      string
    >
  >;


type EstadoEnvio =
  "idle"
  | "enviando"
  | "exito"
  | "error";


const CAMPOS_BASE_INICIALES: CamposBase = {
  nombre: "",
  apellidos: "",
  empresa: "",
  telefono: "",
  correo: "",
};


const RAPIDO_INICIAL: FormularioRapido = {
  ...CAMPOS_BASE_INICIALES,
  mensaje: "",
};


const DETALLADO_INICIAL: FormularioDetallado = {
  ...CAMPOS_BASE_INICIALES,
  necesidades: [],
  otro: "",
  detalle: "",
};


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


function correoValido(
  correo: string,
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(
    correo,
  );
}


function telefonoValido(
  telefono: string,
) {
  const caracteresValidos =
    /^[+\d\s().-]+$/;

  if (
    !caracteresValidos.test(
      telefono,
    )
  ) {
    return false;
  }

  const digitos =
    telefono.replace(
      /\D/g,
      "",
    );

  return (
    digitos.length >= 7 &&
    digitos.length <= 15
  );
}


function validarBase(
  datos: CamposBase,
) {
  const errores:
    Errores<CamposBase> =
    {};

  const nombre =
    limpiarTexto(
      datos.nombre,
    );

  const apellidos =
    limpiarTexto(
      datos.apellidos,
    );

  const empresa =
    limpiarTexto(
      datos.empresa,
    );

  const telefono =
    limpiarTexto(
      datos.telefono,
    );

  const correo =
    limpiarTexto(
      datos.correo,
    );


  if (
    nombre.length < 2
  ) {
    errores.nombre =
      "Escribe tu nombre.";
  } else if (
    nombre.length > 60
  ) {
    errores.nombre =
      "El nombre es demasiado largo.";
  }


  if (
    apellidos.length > 80
  ) {
    errores.apellidos =
      "Los apellidos son demasiado largos.";
  }


  if (
    empresa.length > 120
  ) {
    errores.empresa =
      "El nombre de empresa es demasiado largo.";
  }


  if (
    !telefono
  ) {
    errores.telefono =
      "Escribe un teléfono de contacto.";
  } else if (
    !telefonoValido(
      telefono,
    )
  ) {
    errores.telefono =
      "Revisa el número de teléfono.";
  }


  if (
    !correo
  ) {
    errores.correo =
      "Escribe tu correo.";
  } else if (
    correo.length > 254 ||
    !correoValido(
      correo,
    )
  ) {
    errores.correo =
      "Revisa el correo electrónico.";
  }


  return errores;
}


function tieneErrores(
  errores: object,
) {
  return (
    Object.keys(
      errores,
    ).length > 0
  );
}


async function enviarFormulario(
  endpoint: string,
  datos: unknown,
) {
  const respuesta =
    await fetch(
      endpoint,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            datos,
          ),
      },
    );


  if (
    !respuesta.ok
  ) {
    throw new Error(
      "No se pudo enviar el formulario.",
    );
  }
}


export function FormulariosContacto01({
  id = "contacto-rapido",
  endpoint = "/api/contacto",
  opcionesNecesidad = OPCIONES_POR_DEFECTO,
}: FormulariosContacto01Props) {
  const [
    rapido,
    setRapido,
  ] =
    useState<FormularioRapido>(
      RAPIDO_INICIAL,
    );

  const [
    detallado,
    setDetallado,
  ] =
    useState<FormularioDetallado>(
      DETALLADO_INICIAL,
    );

  const [
    erroresRapido,
    setErroresRapido,
  ] =
    useState<
      Errores<FormularioRapido>
    >(
      {},
    );

  const [
    erroresDetallado,
    setErroresDetallado,
  ] =
    useState<
      Errores<FormularioDetallado>
    >(
      {},
    );

  const [
    estadoRapido,
    setEstadoRapido,
  ] =
    useState<EstadoEnvio>(
      "idle",
    );

  const [
    estadoDetallado,
    setEstadoDetallado,
  ] =
    useState<EstadoEnvio>(
      "idle",
    );


  const opcionOtro =
    useMemo(
      () =>
        opcionesNecesidad.find(
          opcion =>
            opcion.esOtro,
        ),
      [
        opcionesNecesidad,
      ],
    );


  const otroSeleccionado =
    Boolean(
      opcionOtro &&
      detallado.necesidades.includes(
        opcionOtro.id,
      ),
    );


  function actualizarRapido(
    campo:
      keyof FormularioRapido,
    valor: string,
  ) {
    setRapido(
      actual => ({
        ...actual,
        [campo]:
          valor,
      }),
    );

    setErroresRapido(
      actual => ({
        ...actual,
        [campo]:
          undefined,
      }),
    );

    if (
      estadoRapido !==
      "idle"
    ) {
      setEstadoRapido(
        "idle",
      );
    }
  }


  function actualizarDetallado(
    campo:
      Exclude<
        keyof FormularioDetallado,
        "necesidades"
      >,
    valor: string,
  ) {
    setDetallado(
      actual => ({
        ...actual,
        [campo]:
          valor,
      }),
    );

    setErroresDetallado(
      actual => ({
        ...actual,
        [campo]:
          undefined,
      }),
    );

    if (
      estadoDetallado !==
      "idle"
    ) {
      setEstadoDetallado(
        "idle",
      );
    }
  }


  function alternarNecesidad(
    opcion: OpcionNecesidad,
  ) {
    setDetallado(
      actual => {
        const existe =
          actual.necesidades.includes(
            opcion.id,
          );

        const necesidades =
          existe
            ? actual.necesidades.filter(
                item =>
                  item !==
                  opcion.id,
              )
            : [
                ...actual.necesidades,
                opcion.id,
              ];


        return {
          ...actual,
          necesidades,

          otro:
            opcion.esOtro &&
            existe
              ? ""
              : actual.otro,
        };
      },
    );

    setErroresDetallado(
      actual => ({
        ...actual,
        necesidades:
          undefined,

        otro:
          opcion.esOtro
            ? undefined
            : actual.otro,
      }),
    );

    if (
      estadoDetallado !==
      "idle"
    ) {
      setEstadoDetallado(
        "idle",
      );
    }
  }


  function validarRapido() {
    const errores:
      Errores<FormularioRapido> =
      {
        ...validarBase(
          rapido,
        ),
      };

    const mensaje =
      rapido.mensaje.trim();


    if (
      mensaje.length > 1800
    ) {
      errores.mensaje =
        "El mensaje es demasiado largo.";
    }


    return errores;
  }


  function validarDetallado() {
    const errores:
      Errores<FormularioDetallado> =
      {
        ...validarBase(
          detallado,
        ),
      };


    if (
      detallado.necesidades.length ===
      0
    ) {
      errores.necesidades =
        "Selecciona al menos una opción.";
    }


    if (
      otroSeleccionado
    ) {
      const otro =
        limpiarTexto(
          detallado.otro,
        );

      if (
        otro.length < 3
      ) {
        errores.otro =
          "Cuéntanos qué necesitas.";
      } else if (
        otro.length > 120
      ) {
        errores.otro =
          "Intenta resumirlo un poco.";
      }
    }


    const detalle =
      detallado.detalle.trim();


    if (
      detalle.length < 15
    ) {
      errores.detalle =
        "Cuéntanos brevemente qué quieres resolver o mejorar.";
    } else if (
      detalle.length > 2500
    ) {
      errores.detalle =
        "El texto es demasiado largo.";
    }


    return errores;
  }


  async function enviarRapido(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const errores =
      validarRapido();

    setErroresRapido(
      errores,
    );


    if (
      tieneErrores(
        errores,
      )
    ) {
      const primerError =
        event.currentTarget.querySelector<HTMLElement>(
          "[aria-invalid='true']",
        );

      primerError?.focus();

      return;
    }


    setEstadoRapido(
      "enviando",
    );


    try {
      await enviarFormulario(
        endpoint,
        {
          tipo:
            "rapido",

          nombre:
            limpiarTexto(
              rapido.nombre,
            ),

          apellidos:
            limpiarTexto(
              rapido.apellidos,
            ),

          empresa:
            limpiarTexto(
              rapido.empresa,
            ),

          telefono:
            limpiarTexto(
              rapido.telefono,
            ),

          correo:
            limpiarTexto(
              rapido.correo,
            ),

          mensaje:
            rapido.mensaje.trim(),
        },
      );

      setRapido(
        RAPIDO_INICIAL,
      );

      setEstadoRapido(
        "exito",
      );
    } catch {
      setEstadoRapido(
        "error",
      );
    }
  }


  async function enviarDetallado(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const errores =
      validarDetallado();

    setErroresDetallado(
      errores,
    );


    if (
      tieneErrores(
        errores,
      )
    ) {
      const primerError =
        event.currentTarget.querySelector<HTMLElement>(
          "[aria-invalid='true']",
        );

      primerError?.focus();

      return;
    }


    setEstadoDetallado(
      "enviando",
    );


    try {
      await enviarFormulario(
        endpoint,
        {
          tipo:
            "detallado",

          nombre:
            limpiarTexto(
              detallado.nombre,
            ),

          apellidos:
            limpiarTexto(
              detallado.apellidos,
            ),

          empresa:
            limpiarTexto(
              detallado.empresa,
            ),

          telefono:
            limpiarTexto(
              detallado.telefono,
            ),

          correo:
            limpiarTexto(
              detallado.correo,
            ),

          necesidades:
            detallado.necesidades,

          otro:
            otroSeleccionado
              ? limpiarTexto(
                  detallado.otro,
                )
              : "",

          detalle:
            detallado.detalle.trim(),
        },
      );

      setDetallado(
        DETALLADO_INICIAL,
      );

      setEstadoDetallado(
        "exito",
      );
    } catch {
      setEstadoDetallado(
        "error",
      );
    }
  }


  return (
    <section
      id={id}
      className={
        styles.section
      }
      aria-labelledby={`${id}-titulo`}
    >
      <header
        className={
          styles.heading
        }
      >
        <h2
          id={`${id}-titulo`}
          className={
            styles.title
          }
        >
          Cuéntanos tu proyecto.
        </h2>

        <p
          className={
            styles.description
          }
        >
          Puedes dejarnos solo lo esencial
          o darnos algo más de contexto.
          Elige la opción que te resulte
          más cómoda.
        </p>
      </header>


      <div
        className={
          styles.forms
        }
      >
        <form
          className={`${styles.form} ${styles.quickForm}`}
          onSubmit={
            enviarRapido
          }
          noValidate
        >
          <div
            className={
              styles.formHeading
            }
          >
            <h3>
              Contacto rápido
            </h3>

            <p>
              Lo necesario para poder
              responderte y continuar la
              conversación.
            </p>
          </div>


          <div
            className={
              styles.fields
            }
          >
            <CampoTexto
              id="rapido-nombre"
              label="Nombre"
              name="nombre"
              autoComplete="given-name"
              value={
                rapido.nombre
              }
              error={
                erroresRapido.nombre
              }
              onChange={
                valor =>
                  actualizarRapido(
                    "nombre",
                    valor,
                  )
              }
              required
            />

            <CampoTexto
              id="rapido-apellidos"
              label="Apellidos (opcional)"
              name="apellidos"
              autoComplete="family-name"
              value={
                rapido.apellidos
              }
              error={
                erroresRapido.apellidos
              }
              onChange={
                valor =>
                  actualizarRapido(
                    "apellidos",
                    valor,
                  )
              }
            />

            <CampoTexto
              id="rapido-empresa"
              label="Empresa (si aplica)"
              name="empresa"
              autoComplete="organization"
              value={
                rapido.empresa
              }
              error={
                erroresRapido.empresa
              }
              onChange={
                valor =>
                  actualizarRapido(
                    "empresa",
                    valor,
                  )
              }
              full
            />

            <CampoTexto
              id="rapido-telefono"
              label="Teléfono"
              name="telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={
                rapido.telefono
              }
              error={
                erroresRapido.telefono
              }
              onChange={
                valor =>
                  actualizarRapido(
                    "telefono",
                    valor,
                  )
              }
              required
            />

            <CampoTexto
              id="rapido-correo"
              label="Correo"
              name="correo"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={
                rapido.correo
              }
              error={
                erroresRapido.correo
              }
              onChange={
                valor =>
                  actualizarRapido(
                    "correo",
                    valor,
                  )
              }
              required
            />

            <CampoTextarea
              id="rapido-mensaje"
              label="¿Quieres añadir algo? (opcional)"
              name="mensaje"
              value={
                rapido.mensaje
              }
              error={
                erroresRapido.mensaje
              }
              onChange={
                valor =>
                  actualizarRapido(
                    "mensaje",
                    valor,
                  )
              }
              maxLength={
                1800
              }
            />
          </div>


          <PieFormulario
            estado={
              estadoRapido
            }
            textoBoton="Enviar"
          />
        </form>


        <form
          id="contacto-detallado"
          className={`${styles.form} ${styles.detailForm}`}
          onSubmit={
            enviarDetallado
          }
          noValidate
        >
          <div
            className={
              styles.formHeading
            }
          >
            <h3>
              Cuéntanos un poco más
            </h3>

            <p>
              Si ya tienes una idea más
              definida, puedes indicarnos
              varias necesidades a la vez.
            </p>
          </div>


          <div
            className={
              styles.fields
            }
          >
            <CampoTexto
              id="detallado-nombre"
              label="Nombre"
              name="nombre"
              autoComplete="given-name"
              value={
                detallado.nombre
              }
              error={
                erroresDetallado.nombre
              }
              onChange={
                valor =>
                  actualizarDetallado(
                    "nombre",
                    valor,
                  )
              }
              required
            />

            <CampoTexto
              id="detallado-apellidos"
              label="Apellidos (opcional)"
              name="apellidos"
              autoComplete="family-name"
              value={
                detallado.apellidos
              }
              error={
                erroresDetallado.apellidos
              }
              onChange={
                valor =>
                  actualizarDetallado(
                    "apellidos",
                    valor,
                  )
              }
            />

            <CampoTexto
              id="detallado-empresa"
              label="Empresa (si aplica)"
              name="empresa"
              autoComplete="organization"
              value={
                detallado.empresa
              }
              error={
                erroresDetallado.empresa
              }
              onChange={
                valor =>
                  actualizarDetallado(
                    "empresa",
                    valor,
                  )
              }
              full
            />

            <CampoTexto
              id="detallado-telefono"
              label="Teléfono"
              name="telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={
                detallado.telefono
              }
              error={
                erroresDetallado.telefono
              }
              onChange={
                valor =>
                  actualizarDetallado(
                    "telefono",
                    valor,
                  )
              }
              required
            />

            <CampoTexto
              id="detallado-correo"
              label="Correo"
              name="correo"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={
                detallado.correo
              }
              error={
                erroresDetallado.correo
              }
              onChange={
                valor =>
                  actualizarDetallado(
                    "correo",
                    valor,
                  )
              }
              required
            />
          </div>


          <fieldset
            className={
              styles.needs
            }
            aria-describedby={
              erroresDetallado.necesidades
                ? "necesidades-error"
                : undefined
            }
          >
            <legend>
              ¿Qué necesitas?
            </legend>

            <p
              className={
                styles.needsHelp
              }
            >
              Puedes seleccionar varias
              opciones.
            </p>


            <div
              className={
                styles.needsGrid
              }
            >
              {opcionesNecesidad.map(
                opcion => {
                  const checked =
                    detallado.necesidades.includes(
                      opcion.id,
                    );


                  return (
                    <label
                      key={
                        opcion.id
                      }
                      className={
                        styles.checkOption
                      }
                      data-checked={
                        checked
                      }
                    >
                      <input
                        type="checkbox"
                        value={
                          opcion.id
                        }
                        checked={
                          checked
                        }
                        onChange={
                          () =>
                            alternarNecesidad(
                              opcion,
                            )
                        }
                      />

                      {
                        opcion.texto
                      }
                    </label>
                  );
                },
              )}
            </div>


            {erroresDetallado.necesidades && (
              <p
                id="necesidades-error"
                className={
                  styles.error
                }
                role="alert"
              >
                {
                  erroresDetallado.necesidades
                }
              </p>
            )}


            <div
              className={
                styles.otherReveal
              }
              data-open={
                otroSeleccionado
              }
              aria-hidden={
                !otroSeleccionado
              }
            >
              <div
                className={
                  styles.otherRevealInner
                }
              >
                <CampoTexto
                  id="detallado-otro"
                  label="¿Qué necesitas?"
                  name="otro"
                  value={
                    detallado.otro
                  }
                  error={
                    erroresDetallado.otro
                  }
                  onChange={
                    valor =>
                      actualizarDetallado(
                        "otro",
                        valor,
                      )
                  }
                  disabled={
                    !otroSeleccionado
                  }
                  required={
                    otroSeleccionado
                  }
                  full
                />
              </div>
            </div>
          </fieldset>


          <CampoTextarea
            id="detallado-detalle"
            label="¿Qué quieres resolver o mejorar?"
            name="detalle"
            value={
              detallado.detalle
            }
            error={
              erroresDetallado.detalle
            }
            onChange={
              valor =>
                actualizarDetallado(
                  "detalle",
                  valor,
                )
            }
            maxLength={
              2500
            }
            required
          />


          <PieFormulario
            estado={
              estadoDetallado
            }
            textoBoton="Enviar proyecto"
          />
        </form>
      </div>
    </section>
  );
}


/* =========================================================
   CAMPOS
   ========================================================= */

type CampoTextoProps = {
  id: string;
  label: string;
  name: string;

  value: string;

  onChange:
    (valor: string) => void;

  error?: string;

  type?: "text" | "email" | "tel";

  inputMode?:
    "text"
    | "email"
    | "tel";

  autoComplete?: string;

  required?: boolean;
  disabled?: boolean;
  full?: boolean;
};


function CampoTexto({
  id,
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
  required = false,
  disabled = false,
  full = false,
}: CampoTextoProps) {
  const errorId =
    `${id}-error`;


  return (
    <div
      className={
        full
          ? `${styles.field} ${styles.fieldFull}`
          : styles.field
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
      >
        {label}
      </label>

      <input
        id={
          id
        }
        name={
          name
        }
        type={
          type
        }
        inputMode={
          inputMode
        }
        autoComplete={
          autoComplete
        }
        value={
          value
        }
        required={
          required
        }
        disabled={
          disabled
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
        onChange={
          (
            event:
              ChangeEvent<HTMLInputElement>,
          ) =>
            onChange(
              event.target.value,
            )
        }
      />

      {error && (
        <p
          id={
            errorId
          }
          className={
            styles.error
          }
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}


type CampoTextareaProps = {
  id: string;
  label: string;
  name: string;

  value: string;

  onChange:
    (valor: string) => void;

  error?: string;

  required?: boolean;

  maxLength: number;
};


function CampoTextarea({
  id,
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  maxLength,
}: CampoTextareaProps) {
  const errorId =
    `${id}-error`;


  return (
    <div
      className={`${styles.field} ${styles.fieldFull}`}
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
      >
        {label}
      </label>

      <textarea
        id={
          id
        }
        name={
          name
        }
        value={
          value
        }
        required={
          required
        }
        maxLength={
          maxLength
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
        onChange={
          (
            event:
              ChangeEvent<HTMLTextAreaElement>,
          ) =>
            onChange(
              event.target.value,
            )
        }
      />

      <p
        className={
          styles.counter
        }
        aria-hidden="true"
      >
        {value.length}/{maxLength}
      </p>

      {error && (
        <p
          id={
            errorId
          }
          className={
            styles.error
          }
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}


/* =========================================================
   PIE
   ========================================================= */

type PieFormularioProps = {
  estado: EstadoEnvio;
  textoBoton: string;
};


function PieFormulario({
  estado,
  textoBoton,
}: PieFormularioProps) {
  return (
    <footer
      className={
        styles.formFooter
      }
    >
      <Boton
        variante="principal"
        type="submit"
        disabled={
          estado ===
          "enviando"
        }
      >
        {estado ===
        "enviando"
          ? "Enviando…"
          : textoBoton}
      </Boton>


      <div
        className={
          styles.status
        }
        aria-live="polite"
      >
        {estado ===
          "exito" && (
          <p
            className={
              styles.success
            }
          >
            Recibido. Te responderemos
            lo antes posible.
          </p>
        )}

        {estado ===
          "error" && (
          <p
            className={
              styles.submitError
            }
          >
            No hemos podido enviarlo.
            Inténtalo de nuevo en unos
            segundos.
          </p>
        )}
      </div>
    </footer>
  );
}

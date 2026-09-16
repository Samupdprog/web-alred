"use client";

import Image from "next/image";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./SolucionEnfoque01.module.css";

import {
  ArrowUpRight,
} from "@/componentes/ui";

import type {
  DashboardSolucion,
} from "./SolucionEnfoque01.types";


const DEFAULT_NAV = [
  "Inicio",
  "Proyectos",
  "Procesos",
  "Datos",
  "Integraciones",
  "Equipo",
  "Configuración",
];


const DEFAULT_METRICS = [
  {
    label:
      "Procesos automatizados",
    value:
      "12",
    change:
      "+33%",
    serie:
      [12, 16, 14, 21, 19, 27, 31],
  },
  {
    label:
      "Tiempo ahorrado",
    value:
      "124 h",
    change:
      "+52%",
    serie:
      [10, 19, 15, 26, 23, 36, 42],
  },
  {
    label:
      "Eficiencia operativa",
    value:
      "+68%",
    change:
      "+18%",
    serie:
      [14, 20, 18, 29, 25, 37, 43],
  },
];


const DEFAULT_ACTIVITY = [
  {
    titulo:
      "Nuevo proceso automatizado",
    detalle:
      "Hace 2 horas",
  },
  {
    titulo:
      "Integración con tu CRM completada",
    detalle:
      "Hace 5 horas",
  },
  {
    titulo:
      "Dashboard de ventas actualizado",
    detalle:
      "Hace 1 día",
  },
];


function useVisibleOnce() {
  const ref =
    useRef<HTMLDivElement | null>(
      null,
    );

  const [
    visible,
    setVisible,
  ] =
    useState(false);

  useEffect(
    () => {
      const node =
        ref.current;

      if (
        !node ||
        visible
      ) {
        return;
      }

      const observer =
        new IntersectionObserver(
          ([entry]) => {
            if (
              entry.isIntersecting
            ) {
              setVisible(
                true,
              );

              observer.disconnect();
            }
          },
          {
            threshold:
              0.2,
          },
        );

      observer.observe(
        node,
      );

      return () =>
        observer.disconnect();
    },
    [
      visible,
    ],
  );

  return {
    ref,
    visible,
  };
}


function pointsFromSeries(
  serie: number[],
) {
  const width =
    72;

  const height =
    34;

  const min =
    Math.min(
      ...serie,
    );

  const max =
    Math.max(
      ...serie,
    );

  const range =
    Math.max(
      max - min,
      1,
    );

  return serie
    .map(
      (
        value,
        index,
      ) => {
        const x =
          (
            index /
            Math.max(
              serie.length -
                1,
              1,
            )
          ) *
          width;

        const y =
          height -
          (
            (
              value -
              min
            ) /
            range
          ) *
            (
              height -
              4
            ) -
          2;

        return `${x},${y}`;
      },
    )
    .join(
      " ",
    );
}


function Sparkline({
  serie,
  visible,
  delay,
}: {
  serie: number[];
  visible: boolean;
  delay: number;
}) {
  const points =
    useMemo(
      () =>
        pointsFromSeries(
          serie,
        ),
      [
        serie,
      ],
    );

  return (
    <svg
      viewBox="0 0 72 34"
      className={`${styles.sparkline} ${
        visible
          ? styles.sparklineVisible
          : ""
      }`}
      style={{
        ["--spark-delay" as string]:
          `${delay}ms`,
      }}
      aria-hidden="true"
    >
      <polyline
        points={
          points
        }
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}


export function SolucionDashboardVisual({
  dashboard,
}: {
  dashboard?: DashboardSolucion;
}) {
  const {
    ref,
    visible,
  } =
    useVisibleOnce();

  const nav =
    dashboard?.navegacion ??
    DEFAULT_NAV;

  const metricas =
    dashboard?.metricas ??
    DEFAULT_METRICS;

  const actividad =
    dashboard?.actividad ??
    DEFAULT_ACTIVITY;


  return (
    <div
      ref={
        ref
      }
      className={`${styles.dashboardScene} ${
        visible
          ? styles.dashboardSceneVisible
          : ""
      }`}
    >
      <div
        className={
          styles.dashboardAura
        }
        aria-hidden="true"
      />


      <div
        className={
          styles.dashboard
        }
        aria-label="Ejemplo visual de una herramienta de gestión de Alred"
      >
        <aside
          className={
            styles.dashboardSidebar
          }
        >
          <div
            className={
              styles.dashboardBrand
            }
          >
            <Image
              src="/svg/Logos/logo-alred.svg"
              alt=""
              width={28}
              height={21}
              className={
                styles.dashboardLogo
              }
            />

            <strong>
              {
                dashboard?.marca ??
                "Alred"
              }
            </strong>
          </div>


          <nav
            className={
              styles.dashboardNav
            }
            aria-label="Navegación de ejemplo"
          >
            {
              nav.map(
                (
                  item,
                  index,
                ) => (
                  <div
                    key={
                      item
                    }
                    className={`${styles.dashboardNavItem} ${
                      index === 0
                        ? styles.dashboardNavItemActive
                        : ""
                    }`}
                  >
                    <i
                      aria-hidden="true"
                    />

                    <span>
                      {
                        item
                      }
                    </span>
                  </div>
                ),
              )
            }
          </nav>
        </aside>


        <div
          className={
            styles.dashboardMain
          }
        >
          <header
            className={
              styles.dashboardHeader
            }
          >
            <h3>
              {
                dashboard?.titulo ??
                "Resumen"
              }
            </h3>

            <div
              className={
                styles.period
              }
            >
              {
                dashboard?.periodo ??
                "Últimos 30 días"
              }

              <span
                aria-hidden="true"
              >
                ⌄
              </span>
            </div>
          </header>


          <div
            className={
              styles.metrics
            }
          >
            {
              metricas.map(
                (
                  metrica,
                  index,
                ) => (
                  <article
                    key={
                      metrica.label
                    }
                    className={`${styles.metric} ${
                      visible
                        ? styles.metricVisible
                        : ""
                    }`}
                    style={{
                      ["--metric-delay" as string]:
                        `${
                          260 +
                          index *
                            110
                        }ms`,
                    }}
                  >
                    <p>
                      {
                        metrica.label
                      }
                    </p>

                    <div
                      className={
                        styles.metricBody
                      }
                    >
                      <div>
                        <strong>
                          {
                            metrica.value
                          }
                        </strong>

                        {
                          metrica.change
                            ? (
                              <small>
                                <ArrowUpRight
                                  size={12}
                                />{" "}
                                {
                                  metrica.change
                                }
                              </small>
                            )
                            : null
                        }
                      </div>

                      <Sparkline
                        serie={
                          metrica.serie ??
                          [
                            12,
                            16,
                            14,
                            21,
                            19,
                            27,
                            31,
                          ]
                        }
                        visible={
                          visible
                        }
                        delay={
                          480 +
                          index *
                            120
                        }
                      />
                    </div>
                  </article>
                ),
              )
            }
          </div>


          <section
            className={`${styles.activity} ${
              visible
                ? styles.activityVisible
                : ""
            }`}
          >
            <div
              className={
                styles.activityHeader
              }
            >
              <h4>
                Actividad reciente
              </h4>

              <p>
                Ver todo
              </p>
            </div>


            <div
              className={
                styles.activityList
              }
            >
              {
                actividad.map(
                  (
                    item,
                    index,
                  ) => (
                    <article
                      key={`${item.titulo}-${index}`}
                      className={
                        styles.activityRow
                      }
                      style={{
                        ["--row-delay" as string]:
                          `${
                            700 +
                            index *
                              90
                          }ms`,
                      }}
                    >
                      <div
                        className={
                          styles.activityIcon
                        }
                        aria-hidden="true"
                      >
                        <i />
                      </div>

                      <div
                        className={
                          styles.activityCopy
                        }
                      >
                        <strong>
                          {
                            item.titulo
                          }
                        </strong>

                        {
                          item.detalle
                            ? (
                              <p>
                                {
                                  item.detalle
                                }
                              </p>
                            )
                            : null
                        }
                      </div>

                      <b
                        aria-hidden="true"
                      >
                        ›
                      </b>
                    </article>
                  ),
                )
              }
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

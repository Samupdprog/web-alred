"use client";

import { useLocale } from "next-intl";
import { textoVisual } from "@/datos/comunes/soluciones-visuales";
import { useId } from "react";
import { ConexionesAnimadas } from "@/componentes/efectos/soluciones/ConexionesAnimadas";
import styles from "./Soluciones01.module.css";

import {
  ArrowUpRight,
} from "@/componentes/ui";

function useTextosVisuales() {
  const locale = useLocale();
  return (texto: string) => textoVisual(locale, texto);
}

const MODULOS = [
  "Clientes",
  "Stock",
  "Presupuestos",
  "Equipo",
] as const;

function IconoCuadricula() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
    </svg>
  );
}

function IconoDocumento() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h9l3 3v15H6zM9 10h6M9 14h6" />
    </svg>
  );
}

function IconoCheck() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function IconoMas() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v16M4 12h16" />
    </svg>
  );
}

function IconoCorreo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4zM4 6l8 7 8-7" />
    </svg>
  );
}

function IconoChat() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4h16v12H9l-5 4z" />
    </svg>
  );
}

function IconoGrafica() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19V9M12 19V4M19 19v-7" />
    </svg>
  );
}

function IconoConexion() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-12 0zM12 18v3" />
    </svg>
  );
}

export function SoftwareVisual({
  modulo,
  setModulo,
}: {
  modulo: number;
  setModulo: (indice: number) => void;
}) {
  const t = useTextosVisuales();
  return (
    <div className={styles.scene}>
      <div className={styles.sceneBadge}>
        <i className={styles.liveDot} />
        {t("Software adaptable")}
      </div>

      <div className={styles.softwareComposition}>
        <div
          className={styles.moduleTabs}
          role="group"
          aria-label={t("Módulos de software")}
        >
          {MODULOS.map((nombre, indice) => (
            <button
              key={nombre}
              type="button"
              className={`${styles.moduleTab} ${
                modulo === indice ? styles.moduleTabActive : ""
              }`}
              aria-pressed={modulo === indice}
              onClick={() => setModulo(indice)}
            >
              <i />
              {t(nombre)}
            </button>
          ))}
        </div>

        <div className={`${styles.appWindow} ${styles.glass}`}>
          <div className={styles.windowHead}>
            <span className={styles.traffic}>
              <i />
              <i />
              <i />
            </span>

            <span>{t("Panel de gestión")}</span>
            <span className={styles.version}>v1.4</span>
          </div>

          <div className={styles.appBody}>
            <aside className={styles.appSidebar} aria-hidden="true">
              <IconoCuadricula />
              <span className={`${styles.sideLine} ${styles.sideLineSelected}`} />
              <span className={styles.sideLine} />
              <span className={styles.sideLine} />
              <span className={styles.sideLine} />
            </aside>

            <div className={styles.workspace}>
              <div className={styles.workspaceTitle}>
                <strong>{t(MODULOS[modulo])}</strong>
                <span className={styles.tinyBadge}>{t("Activo")}</span>
              </div>

              <div className={styles.moduleGrid}>
                {MODULOS.map((nombre, indice) => (
                  <div
                    key={nombre}
                    className={`${styles.moduleCard} ${
                      modulo === indice ? styles.moduleCardActive : ""
                    }`}
                  >
                    <span>{t(nombre)}</span>

                    <div className={styles.skeleton} aria-hidden="true">
                      <i />
                      <i />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sceneFooter}>
        <i className={styles.liveDot} />
        {t("4 módulos · una sola herramienta")}
      </div>
    </div>
  );
}

const PASOS = [
  {
    titulo: "Solicitud",
    texto: "Entrada recibida",
    icono: <IconoDocumento />,
  },
  {
    titulo: "Validación",
    texto: "Reglas verificadas",
    icono: <IconoCheck />,
  },
  {
    titulo: "Asignación",
    texto: "Tarea creada",
    icono: <IconoMas />,
  },
  {
    titulo: "Notificación",
    texto: "Envío completado",
    icono: <IconoCorreo />,
  },
];

export function AutomatizacionVisual({
  paso,
}: {
  paso: number;
}) {
  const t = useTextosVisuales();
  return (
    <div className={styles.scene}>
      <div className={styles.sceneBadge}>
        <i className={styles.liveDot} />
        {t("Flujo automático activo")}
      </div>

      <div className={styles.flowComposition}>
        <ConexionesAnimadas tipo="flujo" className={styles.flowWires} />

        {PASOS.map((item, indice) => (
          <div
            key={item.titulo}
            data-node={indice}
            className={`${styles.flowStep} ${styles.glass} ${
              paso === indice ? styles.flowStepActive : ""
            } ${
              paso > indice ? styles.flowStepDone : ""
            }`}
          >
            <span className={styles.stepIcon}>
              {item.icono}
            </span>

            <div>
              <strong>{t(item.titulo)}</strong>
              <span>{t(item.texto)}</span>
            </div>

            <span className={styles.stepCheck}>✓</span>
          </div>
        ))}
      </div>

      <div className={styles.sceneFooter}>
        {t("4 pasos · sin intervención manual")}
      </div>
    </div>
  );
}

export function DashboardVisual() {
  const t = useTextosVisuales();
  const gradientId = useId();
  return (
    <div className={styles.scene}>
      <div className={styles.sceneBadge}>
        <i className={styles.liveDot} />
        {t("Datos en tiempo real")}
      </div>

      <div className={`${styles.dashboardWindow} ${styles.glass}`}>
        <div className={styles.windowHead}>
          <span>{t("Panel de control")}</span>
          <span className={styles.version}>{t("Últimos 30 días")}</span>
        </div>

        <div className={styles.chartContent}>
          <div className={styles.chartHeading}>
            <div>
              <span className={styles.microLabel}>{t("Actividad")}</span>
              <strong>
                1.284 <small>{t("eventos")}</small>
              </strong>
            </div>

            <span className={styles.growth}>
              <ArrowUpRight
                size={12}
              />
              12,8%
            </span>
          </div>

          <svg
            className={styles.chartSvg}
            viewBox="0 0 300 105"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id={gradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop stopColor="var(--color-accent)" stopOpacity=".2" />
                <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              className={styles.chartGrid}
              d="M0 25H300M0 55H300M0 85H300"
            />

            <path
              fill={`url(#${gradientId})`} className={styles.chartArea}
              d="M0 87C25 87 26 58 52 66S84 81 108 52S147 69 174 39S205 56 230 29S264 35 300 12V105H0Z"
            />

            <path
              className={styles.chartLine}
              pathLength="1"
              d="M0 87C25 87 26 58 52 66S84 81 108 52S147 69 174 39S205 56 230 29S264 35 300 12"
            />
          </svg>

          <div className={styles.chartAxis}>
            <span>01 sep</span>
            <span>15 sep</span>
            <span>30 sep</span>
          </div>

          <div className={styles.kpis}>
            <div>
              <span className={styles.microLabel}>{t("Completadas")}</span>
              <strong>86%</strong>
              <div className={styles.kpiTrack}>
                <i style={{ "--fill": ".86" } as React.CSSProperties} />
              </div>
            </div>

            <div>
              <span className={styles.microLabel}>{t("Pendientes")}</span>
              <strong>18</strong>
              <div className={styles.kpiTrack}>
                <i style={{ "--fill": ".34" } as React.CSSProperties} />
              </div>
            </div>

            <div>
              <span className={styles.microLabel}>{t("Tiempo medio")}</span>
              <strong>2,4m</strong>
              <div className={styles.kpiTrack}>
                <i style={{ "--fill": ".67" } as React.CSSProperties} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sceneFooter}>
        {t("Todo bajo control")}
      </div>
    </div>
  );
}

const FUENTES = [
  { nombre: "Chat", icono: <IconoChat /> },
  { nombre: "Tableros", icono: <IconoCuadricula /> },
  { nombre: "CRM", icono: <IconoDocumento /> },
  { nombre: "Informes", icono: <IconoGrafica /> },
];

export function IntegracionesVisual({
  fuentesActivas,
}: {
  fuentesActivas: number;
}) {
  const t = useTextosVisuales();
  const progreso = Math.max(0, Math.min(1, fuentesActivas / 4));
  const registros = Math.round(12480 * progreso).toLocaleString("es-ES");

  return (
    <div className={styles.scene}>
      <div className={styles.sceneBadge}>
        <i className={styles.liveDot} />
        {t("Un ecosistema conectado")}
      </div>

      <div className={styles.integrationComposition}>
        <ConexionesAnimadas tipo="integracion" className={styles.integrationWires} />

        <div className={styles.sources}>
          {FUENTES.map((fuente, indice) => (
            <div
              key={fuente.nombre}
              data-node={indice}
              className={`${styles.sourceNode} ${styles.glass} ${
                indice < fuentesActivas ? styles.sourceNodeActive : ""
              }`}
            >
              {fuente.icono}
              <span>{t(fuente.nombre)}</span>
              <i />
            </div>
          ))}
        </div>

        <div className={styles.hubWrap}>
          <div className={styles.hubRing} />

          <div className={styles.hub} data-hub="">
            <IconoConexion />
            <span>{t("Conectar")}</span>
          </div>
        </div>

        <div className={`${styles.syncStatus} ${styles.glass}`} data-status="">
          <div className={styles.syncTop}>
            <i className={styles.liveDot} />

            <span>
              {fuentesActivas === 4
                ? t("4 fuentes sincronizadas")
                : t("Sincronizando fuentes")}
            </span>

            <span className={styles.syncCount}>
              {fuentesActivas} / 4
            </span>
          </div>

          <strong>
            {registros} <small>{t("registros")}</small>
          </strong>

          <div className={styles.syncTrack}>
            <i
              style={{
                transform: `scaleX(${progreso})`,
              }}
            />
          </div>

          <span className={styles.syncNote}>
            {t("Tus datos, siempre al día")}
          </span>
        </div>
      </div>

      <div className={styles.sceneFooter}>
        <i className={styles.liveDot} />
        {t("4 fuentes · una conexión")}
      </div>
    </div>
  );
}


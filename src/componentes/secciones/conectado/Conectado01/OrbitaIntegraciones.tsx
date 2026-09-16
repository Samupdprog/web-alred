import Image from "next/image";

import type {
  CSSProperties,
} from "react";

import styles from "./Conectado01.module.css";

import type {
  ConectadoOrbita,
} from "./Conectado01.types";


export function OrbitaIntegraciones({
  logo =
    "/svg/Logos/logo-alred.svg",

  carpetaIconos =
    "/images/iconos/integraciones",

  velocidadSegundos =
    42,

  iconos,
}: ConectadoOrbita) {

  if (
    iconos.length === 0
  ) {
    return null;
  }


  const duracion =
    Math.max(
      12,
      velocidadSegundos,
    );


  const orbitStyle = {
    "--orbit-duration":
      `${duracion}s`,
  } as CSSProperties;


  return (
    <div
      className={
        styles.orbit
      }
      style={
        orbitStyle
      }
      aria-hidden="true"
    >

      {/* ===================================================
          ANILLO ROTATORIO
         =================================================== */}

      <div
        className={
          styles.orbitRing
        }
      >
        {iconos.map(
          (
            icono,
            index,
          ) => {

            /* =============================================
               POSICIÓN AUTOMÁTICA
               ============================================= */

            const angle =
              (
                360 /
                iconos.length
              ) *
                index -
              90;


            const itemStyle = {
              "--orbit-angle":
                `${angle}deg`,

              "--orbit-angle-negative":
                `${-angle}deg`,

              "--orbit-delay":
                `${
                  160 +
                  index * 85
                }ms`,
            } as CSSProperties;


            const src =
              `${carpetaIconos}/${icono.archivo}`;


            return (
              <div
                key={
                  `${icono.nombre}-${icono.archivo}`
                }
                className={
                  styles.orbitItem
                }
                style={
                  itemStyle
                }
              >
                <div
                  className={
                    styles.orbitCounter
                  }
                >
                  <div
                    className={
                      styles.orbitTile
                    }
                  >
                    <Image
                      src={src}
                      alt=""
                      width={64}
                      height={64}
                      className={
                        styles.orbitIcon
                      }
                    />
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>


      {/* ===================================================
          CENTRO
         =================================================== */}

      <div
        className={
          styles.orbitCore
        }
      >
        <div
          className={
            styles.orbitCoreCard
          }
        >
          <Image
            src={
              logo
            }
            alt=""
            width={515}
            height={382}
            className={
              styles.orbitLogo
            }
          />
        </div>
      </div>
    </div>
  );
}
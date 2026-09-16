# Auditoría de interacción táctil

## Causa compartida reproducida
Al comenzar, next.config.ts autorizaba 192.168.235.53 pero la dirección LAN del
equipo era 192.168.235.56. En localhost el menú abría tanto en Chromium como en
WebKit. Por la dirección LAN, elementsFromPoint colocaba el botón del menú por
delante de Header/top/nav y Hero01/Hero02, pero el tap no abría el menú.
La consola registraba un rechazo del WebSocket /_next/hmr.

No era una capa del Hero encima del botón. Next.js 16 bloqueaba ese origen de
desarrollo; sin el canal de desarrollo la página mostraba HTML y enlaces pero
no completaba correctamente la interacción cliente en esa reproducción.
El cliente HMR de la versión instalada contiene además location.reload() tras
agotar las reconexiones: un origen bloqueado puede producir las recargas
periódicas descritas. No se encontraron llamadas periódicas a refresh/reload
en el código de aplicación revisado.

La configuración ahora obtiene las IPv4 locales al arrancar, sin autorizar
comodines. Después de corregirla se observaron 60 segundos por LAN con un solo
documento cargado, cero errores del WebSocket y el menú operativo al final.
Si cambia la red mientras next dev está arrancado, reiniciar el servidor.
Para una prueba sin HMR: npm run build seguido de npm run start.

## Cambios de comportamiento
- Home utilizaba setTimeout y una animación CSS independiente y reiniciaba el
  ciclo al entrar en pantalla. Ahora reutiliza useRelojCarrusel: barra y avance
  comparten ocho segundos activos y las pausas conservan el tiempo.
- Gestos con intención horizontal y respuesta visual mientras se mueve el dedo;
  scroll vertical y zoom conservados. Cancelación y arrastres cortos no abren
  el enlace del proyecto por accidente.
- La tarjeta de Home es un enlace completo con flecha visual; no hay botones
  o enlaces anidados. Controles y enlaces mantienen identidad/foco cuando cambia
  el contenido. Los indicadores tienen objetivos táctiles de 44 px.
- El destacado conserva su composición actual, pausa manual y transición;
  la animación de cambio no añade una pausa arbitraria al reloj. Seleccionar
  manualmente el mismo indicador también reinicia el ciclo.
- El Header cierra al navegar, libera scroll al cerrar/cambiar orientación y
  devuelve foco al botón al cerrar con Escape. No se aumentó su z-index para
  ocultar el fallo de desarrollo.
- Se corrigieron referencias a imágenes inexistentes: extensiones de la imagen
  decorativa (4) y capturas de Top Led, utilizando los recursos existentes.

## Verificación
- scripts/qa-touch-global.mjs: Header en Home, proyectos, soluciones, nosotros,
  contacto e inglés; cinco puntos de hit testing por control; abrir/cerrar tras
  scroll; tres ciclos de navegación cliente sin cargar documentos nuevos;
  orientación, Escape, foco, autoplay, progreso, pausa fuera de pantalla,
  responsive 320–1440 px, enlace completo y reduced motion. Chromium y WebKit.
- Chromium: gestos enviados por Input.dispatchTouchEvent, arrastre visual antes
  de soltar, swipe izquierda/derecha, cancelación y scroll vertical real.
- scripts/qa-proyectos.mjs: destacado, flechas, pausa/reanudar, ocho segundos,
  barra, indicadores, imágenes, navegación, almacenamiento bloqueado y reduced
  motion en Chromium y WebKit. Se conserva el foco de controles de escritorio.
- Lint sin errores (quedan avisos existentes de imágenes/ARIA e import no usado),
  build y TypeScript completados. Se corrigieron también un import roto en
  src/proxy.ts y el tipo DashboardSolucion que impedían comprobar todo el proyecto.

Las pruebas WebKit y Chromium con entrada táctil no equivalen a haber probado
el teléfono físico del usuario. No se afirma esa verificación. También queda
un recurso predeterminado no utilizado en las rutas comprobadas de
SolucionEnfoque01 (Ondas de vidrio translúcido sobre blanco(1).png) que no está
en public; las páginas verificadas suministran sus propios fondos.

## Ejecución
Los scripts de navegador requieren Playwright instalado en el entorno de QA.
PLAYWRIGHT_PATH permite usar un paquete ya disponible sin añadirlo al producto;
QA_URL selecciona localhost, una IP LAN o el servidor de producción local.

# Proyectos: interacción táctil y temporización

## Objetivo y alcance
Corregir ProyectoDestacado01 y revisar ListadoProyectos01, Hero02 y CTAFinal01
en móvil, incluidos WebKit/Safari, sin cambiar contenido, rutas o identidad.

## Comportamiento
- Un único reloj actualiza la barra y avanza al siguiente proyecto cada 8s
  (o la duración configurada). Pausas conservan el tiempo transcurrido.
- Toques y foco causado por touch no activan una pausa de ratón persistente.
- Hover real, navegación por teclado, gesto activo, pestaña oculta y salida de
  pantalla pausan el reloj. Reduced motion detiene autoplay, no navegación manual.
- Flechas y selectores conservan sus nodos/foco; se anima el contenido dentro de
  una ventana estable. Cada navegación manual reinicia el tiempo.
- Swipe horizontal con captura únicamente tras reconocer la intención. Scroll
  vertical, zoom y taps en enlaces siguen disponibles. Cancelación y multitouch
  no cambian de proyecto. Un swipe no dispara el enlace que había bajo el dedo.
- Compartir reconocimiento de gesto con la paginación del listado; almacenamiento
  de vista opcional, sin errores si Safari bloquea sessionStorage.
- Imágenes con geometría explícita, controles táctiles de al menos 44px,
  títulos legibles y sin overflow en orientación vertical u horizontal.
- Art direction con getImageProps y optimización Next/Image para no descargar
  originales de hasta 30 MB en un teléfono.

## Datos, SEO y analítica
Se conservan los datos de proyectos, textos existentes, encabezados y enlaces
localizados por baseHref. No se añaden proveedores ni eventos de analítica.

## Aceptación
Comprobar en Chromium y WebKit: 320–1440px, flechas, swipe en ambos sentidos,
tap de enlaces, scroll vertical, progreso continuo y sincronizado, reset manual,
pausa/reanudación, reduced motion, resize/orientación, lista y vista tarjetas.
Ejecutar lint/build. La emulación WebKit no sustituye una comprobación física en
el iPhone del usuario; declarar esa limitación al entregar.

## Archivos
ProyectoDestacado01.tsx/.module.css, efectos de carrusel/gestos compartidos,
ListadoProyectos01.tsx/.module.css, globals.css y ajustes responsive de las
secciones de esta página cuando los resultados de la revisión lo justifiquen.

## Ampliación: auditoría transversal de interacción
- Revisar Header, Home y todas las capas/efectos, rutas y navegación compartida.
- Evidencia previa: localhost funciona en Chromium/WebKit; por la IP LAN actual
  el botón es el primer hit de elementsFromPoint pero no abre. La configuración
  autoriza una IP antigua y Next rechaza el WebSocket de desarrollo. Resolver
  allowedDevOrigins con las direcciones locales al arrancar, sin comodines.
- Home reutilizará el reloj y el gesto existentes: 8 segundos por defecto,
  pausa al salir de pantalla conservando progreso, sin temporizador CSS paralelo.
- La tarjeta activa completa será un enlace, sin controles interactivos anidados.
  Mantener geometría, imágenes, textos y apariencia de los controles.
- El gesto dará respuesta visual durante el arrastre, distinguirá scroll vertical
  y cancelación, y no activará enlaces tras un arrastre horizontal incompleto.
- Cerrar el Header al navegar, liberar scroll al cerrar/cambiar orientación y
  excluir el menú cerrado del foco. No aumentar z-index sin evidencia.
- QA por localhost y por IP LAN, hit testing en varios puntos de cada control,
  taps, navegación repetida, ausencia de recargas y build de producción.

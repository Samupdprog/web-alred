# Soluciones01: composiciones adaptables y ritmo entre secciones

## Objetivo y alcance
Mejorar las cuatro demostraciones de Soluciones01 sin cambiar sus enlaces ni
su jerarquía de contenido. Unificar la distancia entre el hero y las secciones
posteriores mediante globals.css. Mantener la implementación compartida en ES/EN.

## Experiencia y datos
- Paneles más legibles, materiales sobrios y estados activos claros.
- Software con selección por teclado/touch; la selección manual tiene prioridad.
- Flujo con conexiones calculadas desde las posiciones reales de sus pasos.
- Integraciones con conexiones recalculadas por ResizeObserver y señales que
  llegan antes de confirmar la sincronización. Mostrar el resultado completo.
- Pausa manual, pausa fuera de pantalla/pestaña y reduced motion con estado final.
- Ritmo pausado: ciclo de 18s, módulos cada 6s, transiciones de 850ms,
  trazado del gráfico en 2,8s y respiración de 10s. Señales con aceleración,
  frenado y opacidad graduales; lectura del token de duración en ms o s.
- Los textos de las demostraciones se extraen a datos bilingües; sin nuevas
  variantes de UI. Se reutiliza Boton para el control de movimiento y los enlaces.

## Espaciado global
La clase global `section-stack` compone secciones hermanas con `gap` igual a
`--space-between-sections` (incluye hero → primera sección). Las secciones no
añaden margen/padding vertical externo. El padding interno de paneles y hero
permanece como parte de su composición. Nuevas secciones usan el mismo stack.

## SEO y analítica
Conservar h1/h2/h3 y enlaces existentes. Sin nuevos eventos ni proveedores.

## Aceptación
- Sin overflow, recortes o colisiones a 320, 390, 768, 1024, 1280 y 1440 px.
- Conexiones ancladas después de resize y cambio de orientación.
- Selección manual, pausa/reanudación y reduced motion funcionales.
- Distancias medidas iguales entre hero/Soluciones01/Conectado01 y controlables
  cambiando únicamente el token global.
- `npm run lint` y `npm run build`; revisión en navegador de escritorio y móvil.

## Archivos afectados
globals.css, página de inicio y su módulo CSS, Conectado01.module.css,
Soluciones01 y sus visuales, efecto local de conexiones/movimiento,
datos de las demostraciones y docs/design-system.md.
El layout de idioma pasa explícitamente su locale al proveedor de traducciones
para que los visuales compartidos reciban el idioma de la ruta.

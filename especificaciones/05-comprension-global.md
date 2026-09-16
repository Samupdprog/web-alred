# 05 - Comprension Global Del Proyecto

## Estado

Aprobado como guia global antes de continuar implementando.

## Objetivo General

Estamos construyendo la web de Alred con una arquitectura pensada para:

- alta calidad visual;
- responsive real;
- SEO solido;
- buen rendimiento;
- accesibilidad;
- escalabilidad;
- reutilizacion;
- facilidad de mantenimiento;
- facilidad de comprension;
- trabajo fiable asistido por IA.

El objetivo no es solo terminar esta web. Tambien queremos una metodologia repetible para construir futuras paginas y webs profesionales sin acabar con componentes desordenados, CSS duplicado, excepciones y codigo dificil de mantener.

La velocidad de implementacion nunca debe tener prioridad sobre mantener correctamente el sistema.

## Fuentes De Verdad

El repositorio es la fuente de verdad. No se debe depender del historial del chat para mantener decisiones arquitectonicas, visuales o metodologicas.

Antes de implementar, consultar:

- `AGENTS.md`
- `docs/`
- `especificaciones/`
- `docs/design-system.md`
- `especificaciones/04-componentes-ui.md`
- estructura actual del proyecto

Si existe conflicto entre codigo antiguo y documentacion actual aprobada, prevalece la especificacion actual.

El codigo antiguo puede utilizarse como referencia de intencion o diseno, pero no como arquitectura a copiar.

## Jerarquia Arquitectonica Visual

```txt
TOKENS GLOBALES
  -> COMPONENTES UI
    -> SECCIONES
      -> PAGINAS
        <- DATOS
```

Responsabilidades:

- Globals y tokens definen el lenguaje visual compartido.
- UI define primitives reutilizables.
- Secciones definen composiciones visuales completas y reutilizables.
- Datos contienen contenido especifico de cada pagina.
- Paginas seleccionan, ordenan y configuran secciones.

## Globals Como Fuente Visual

Un componente no decide el lenguaje visual global. Lo consume.

Antes de escribir cualquier color, border-radius, espaciado estructural, ancho maximo, duracion, easing, tipografia o material visual compartido, revisar primero los tokens globales existentes en `src/app/globals.css`.

Si falta un valor:

1. comprobar si ya existe algo equivalente;
2. determinar si la necesidad es realmente global;
3. si lo es, crear o proponer el token correspondiente;
4. despues consumirlo desde el componente.

No crear tokens globales para peculiaridades aisladas. Los valores exclusivamente tecnicos internos de un efecto pueden permanecer locales.

## Design System Actual

La antigua regla de limitar border-radius a 8px ya no es valida.

La geometria global actual usa:

- `--radius-lg`
- `--radius-md`
- `--radius-sm`

Tambien existen escalas globales para espacio, layout, movimiento, colores y materiales UI.

No duplicar tokens dentro de CSS Modules.

## Componentes UI Aprobados

Los primitives aprobados actualmente viven en `src/componentes/ui/`.

Botones:

- `principal`
- `refractado-claro`
- `refractado-oscuro`
- `secundario`
- `icono`

Enlaces:

- `flecha`
- `subrayado`

No crear automaticamente `ghost`, badges, pills, chips, variantes decorativas ni botones alternativos salvo que exista una necesidad real y aprobada.

Las secciones deben reutilizar estos componentes. No recrear un boton local dentro de una seccion porque resulte mas rapido.

## Secciones, Paginas Y Datos

Las secciones viven en `src/componentes/secciones/` y controlan layout, composicion, responsive, diseno, comportamiento y animacion especifica.

Las rutas viven en `src/app/[locale]/`. Las paginas deben mantenerse pequenas: importan datos, importan secciones, seleccionan, ordenan y pasan configuracion.

El contenido especifico vive principalmente en `src/datos/paginas/`.

## Anti-Patrones Visuales

No queremos que la web parezca generada por IA.

Evitar automaticamente:

- 01 / 02 / 03 para listas o procesos;
- pills;
- badges;
- chips;
- pequenos labels decorativos;
- icono en cada card;
- icono encima de cada titulo;
- cards para absolutamente todo;
- eyebrow encima de todos los headings;
- pequeno titulo introductorio repetido al comienzo de cada seccion;
- formula repetida de eyebrow, heading, parrafo, tres cards y CTA.

La consistencia visual no significa repetir siempre la misma composicion.

Queremos sobriedad, claridad, composicion editorial, espacios bien utilizados, sensacion premium y pocos elementos bien elegidos.

## Calidad Transversal

Responsive, SEO, accesibilidad, performance, movimiento y analitica forman parte de la definicion de terminado. No se dejan para el final.

No convertir componentes a `"use client"` salvo que realmente lo necesiten. Preferir Server Components y aislar la interaccion cliente cuando sea posible.

No introducir llamadas directas a GA4, PostHog u otros proveedores dentro de componentes visuales. Los eventos deben pasar por una capa central de analitica.

## Proceso Oficial Para Crear Una Pagina

1. Idea u objetivo.
2. Especificacion.
3. Arquitectura de contenido.
4. SEO.
5. Revision de componentes existentes.
6. Diseno o prototipo.
7. Aprobacion visual.
8. Conversion a seccion reutilizable.
9. Separacion de datos.
10. Responsive.
11. Accesibilidad.
12. Performance.
13. Analitica cuando corresponda.
14. QA.
15. Documentar nuevas decisiones.

No avanzar ciegamente acumulando decisiones pendientes.

## Prototipos HTML Y Migraciones

Los prototipos HTML/CSS/JS son laboratorio visual. Una vez aprobados, no se convierten literalmente a JSX.

Se debe analizar la intencion, identificar UI existente, sustituir primitives locales por componentes UI, usar tokens globales, corregir responsive, eliminar duplicacion y convertir el resultado en una seccion React limpia.

El codigo antiguo es referencia, no autoridad.

## Criterio De Finalizacion

Antes de considerar terminada una pagina o seccion, comprobar:

- diseno coherente con Alred;
- sin patrones genericos de IA;
- responsive en movil, tablet, desktop y touch;
- SEO, metadata, headings, enlaces e imagenes;
- accesibilidad, teclado, focus, semantica y reduced motion;
- performance, imagenes, JS, CLS/LCP y dependencias;
- arquitectura con `page.tsx` pequeno, datos separados, UI reutilizada y sin duplicacion;
- TypeScript, lint, build y consola sin errores relevantes.

## Continuidad Entre Chats

Una nueva conversacion debe poder continuar el proyecto sin depender del historial anterior.

Las decisiones permanentes viven en el repositorio. Las reglas globales se documentan. Las decisiones temporales no contaminan documentacion global.

Al comenzar una tarea importante, consultar primero los documentos relevantes.

Si aparece una decision arquitectonica nueva que afectara trabajos futuros, indicarlo para decidir si debe incorporarse a la documentacion.

## Principio Final

Buscamos un sistema que haga dificil construir mal la web.

La arquitectura, documentacion, tokens, UI, secciones, validaciones y especificaciones deben guiar el desarrollo hacia resultados consistentes.

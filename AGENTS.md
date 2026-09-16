<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Reglas Del Proyecto Alred

Alred es una web bilingue de presencia, captacion y confianza para tiendas online, webs de gestion, soluciones informaticas, dashboards, analitica SEO y automatizaciones.

## Reglas Obligatorias

- Leer estas reglas antes de cambiar codigo.
- Tratar el repositorio como fuente de verdad. No depender del historial del chat para decisiones permanentes de arquitectura, diseno o metodologia.
- Antes de implementar trabajo importante, leer los archivos relevantes de `especificaciones`, especialmente `05-comprension-global.md`, `01-estructura-archivos.md` y `04-componentes-ui.md`.
- Mantener App Router en `src/app`.
- Mantener las paginas pequenas. Las paginas componen y configuran secciones; las secciones implementan layout, responsive y complejidad visual.
- Reutilizar secciones, efectos, tokens, UI y config antes de crear piezas nuevas.
- Mantener datos de pagina en `src/datos`, datos estables en `src/config` y UI reutilizable en `src/componentes`.
- Mantener paridad entre espanol e ingles en paginas publicas.
- Usar HTML semantico, labels accesibles y texto legible.
- No crear colores, radios, espaciados estructurales, anchos maximos, duraciones, easing o materiales visuales fuera de los tokens globales de `src/app/globals.css` salvo actualizacion deliberada del sistema.
- No copiar codigo antiguo directamente. Extraer intencion util, normalizarla y reconstruirla con el sistema actual.
- No meter snippets de analitica directamente en componentes visuales. Usar una capa central.
- No crear paginas enormes. Separar por seccion, dato, config o helper cuando un archivo mezcle demasiadas responsabilidades.
- No crear variantes UI como ghost buttons, badges, pills o chips salvo aprobacion en especificacion.

## Arquitectura

- `src/app`: rutas, layouts, metadata, `globals.css`, sitemap y robots.
- `src/app/globals.css`: tokens visuales globales, mapeo de Tailwind y estilos base.
- `src/componentes/secciones`: secciones reutilizables como `Hero01`, `TextoImagen01`, `Tarjetas01`, `Formulario01` y `CTA01`.
- `src/componentes/ui`: primitives pequenas de interfaz.
- `src/componentes/efectos`: efectos visuales o de animacion encapsulados, incluidos wrappers de React Bits u otras librerias.
- `src/config`: configuracion estable del negocio, rutas, navegacion, servicios, SEO y analitica.
- `src/datos/paginas`: datos especificos de pagina que se pasan a secciones.
- `src/i18n`: idiomas y rutas localizadas.
- `src/lib`: helpers sin UI como metadata, analitica y datos estructurados.
- `src/styles`: animaciones reutilizables solo cuando no pertenezcan a una seccion concreta.
- `docs`: estrategia y protocolos generales.
- `especificaciones`: Spec-Driven Development en espanol; leer antes de planificar paginas, secciones o cambios de arquitectura.

## Jerarquia Visual

```txt
TOKENS GLOBALES
  -> COMPONENTES UI
    -> SECCIONES
      -> PAGINAS
        <- DATOS
```

Cada nivel consume el anterior. Un componente no decide el lenguaje visual global; lo consume.

## Biblioteca De Secciones

- Las paginas eligen, ordenan y configuran secciones.
- Las secciones controlan estructura, diseno, responsive, variantes controladas y animacion local.
- Una seccion no contiene textos ni imagenes especificas de una pagina.
- Las props deben ser claras y conceptuales: texto, imagen, botones, variante, tema, animacion y flags de visibilidad.
- No exponer props de medidas arbitrarias como padding, ancho de imagen o gaps locales.
- Si un cambio pequeno encaja como variante controlada, se mantiene en la misma seccion. Si el layout cambia mucho, se crea otra seccion numerada como `Hero02`.
- Mantener junto a cada componente lo que sea especifico de ese componente. Promover a compartido solo cuando exista reutilizacion real.
- Los efectos complejos deben envolverse en `src/componentes/efectos`.
- La animacion es una mejora. Si se elimina, la seccion debe seguir funcionando.

## Sistema De Diseno

- La fuente actual de tokens es `src/app/globals.css`.
- La antigua regla de limitar radios a 8px ya no es valida. Usar `--radius-lg`, `--radius-md` y `--radius-sm`.
- Empezar trabajo visual creando o seleccionando una seccion reutilizable.
- Usar layout primitives compartidos solo cuando simplifiquen varias secciones.
- No usar cards para todo.
- El espaciado estructural debe venir de tokens globales aprobados.
- Botones y enlaces deben reutilizar los primitives aprobados en `src/componentes/ui`.
- Los iconos deben tener funcion; usar `lucide-react` cuando encaje.
- El movimiento debe usar tokens o clases compartidas y respetar `prefers-reduced-motion`.
- Evitar patrones genericos de IA: badges decorativos, eyebrows repetidos, icono en cada card y formulas de tres cards repetidas.

## SEO, Accesibilidad, Performance Y Analitica

- Cada ruta necesita intencion de busqueda clara y contenido util. Nada de keyword stuffing.
- Usar Metadata API de Next.js para title, description, canonical, alternates y Open Graph.
- Mantener sitemap y robots desde config.
- Anadir Schema.org solo cuando describa informacion real.
- Revisar semantica, headings, alt, focus-visible, teclado, contraste y reduced motion.
- Cuidar Next/Image, `sizes`, lazy loading, CLS, LCP, fuentes, dependencias y JavaScript cliente.
- Preferir Server Components. Usar `"use client"` solo cuando sea necesario.
- Centralizar eventos de analitica y medir solo interacciones relevantes.

## Disciplina Git

- Hacer commit antes de migraciones grandes o refactors con riesgo.
- Usar ramas pequenas con prefijo `codex/` para trabajo significativo.
- No revertir cambios del usuario salvo peticion explicita.
- Antes de terminar cambios de codigo, ejecutar `npm run lint` y `npm run build`.

## Spec-Driven Development

- Antes de implementar una pagina, seccion reutilizable, analitica o cambio estructural, crear o actualizar la especificacion relevante en `especificaciones`.
- Una especificacion debe definir objetivo, alcance, datos, experiencia, SEO, analitica, criterios de aceptacion y archivos afectados.
- No implementar trabajo amplio desde una idea vaga. Convertir la intencion en una spec pequena y revisable.
- Si codigo y especificacion se contradicen, actualizar la especificacion o resolver el conflicto antes de continuar.
- Si aparece una decision permanente durante la implementacion, indicarlo y decidir si pertenece a `especificaciones` o `docs`.

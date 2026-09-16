# 01 - Estructura Completa De Archivos

Esta especificacion define la estructura oficial del proyecto Alred.

## Objetivo

Que cualquier pagina, seccion, efecto, dato o configuracion tenga un lugar claro. La estructura debe permitir escalar sin convertir el proyecto en una mezcla de archivos sueltos.

## Regla Base

- `src/app` define rutas.
- `src/datos` define contenido configurable.
- `src/componentes` define piezas reutilizables.
- `src/config` define informacion estable del proyecto.
- `src/lib` define utilidades reutilizables.
- `src/app/globals.css` define tokens visuales globales y estilos base.
- `src/styles` contiene animaciones reutilizables cuando hagan falta.
- `especificaciones` define que se va a construir y como se valida.
- `docs` explica criterios generales de trabajo.

## Arbol Oficial

```txt
web-alred/
  .env.example
  .gitignore
  AGENTS.md
  CLAUDE.md
  README.md
  eslint.config.mjs
  next-env.d.ts
  next.config.ts
  package-lock.json
  package.json
  postcss.config.mjs
  proxy.ts
  tsconfig.json

  docs/
    analytics-plan.md
    architecture.md
    biblioteca-secciones.md
    design-system.md
    migration-rules.md
    project-brief.md
    seo-strategy.md
    workflow.md

  especificaciones/
    README.md
    00-metodologia-sdd.md
    01-estructura-archivos.md
    02-biblioteca-secciones.md
    03-seo-analitica.md
    04-componentes-ui.md
    05-comprension-global.md
    plantillas/
      plantilla-especificacion.md

  public/
    imagenes/
      marca/
      paginas/
      secciones/
    iconos/
    documentos/

  src/
    app/
      layout.tsx
      page.tsx
      globals.css
      favicon.ico
      robots.ts
      sitemap.ts

      [locale]/
        layout.tsx
        page.tsx
        servicios/
          page.tsx
        contacto/
          page.tsx
        nosotros/
          page.tsx
        proyectos/
          page.tsx
        soluciones/
          page.tsx

    componentes/
      secciones/
        index.ts
        hero/
          Hero01/
            Hero01.tsx
            Hero01.types.ts
            Hero01.module.css
            Hero01.motion.ts
            index.ts
        texto-imagen/
          TextoImagen01/
            TextoImagen01.tsx
            TextoImagen01.types.ts
            index.ts
        tarjetas/
          Tarjetas01/
            Tarjetas01.tsx
            Tarjetas01.types.ts
            index.ts
        formularios/
          Formulario01/
            Formulario01.tsx
            Formulario01.types.ts
            index.ts
        cta/
          CTA01/
            CTA01.tsx
            CTA01.types.ts
            index.ts

      ui/
        boton/
          Boton.tsx
          Boton.types.ts
          index.ts
        enlace/
        contenedor/

      efectos/
        react-bits/
          BlurText/
          Threads/
          Magnet/
          SpotlightCard/
        fondos/
        transiciones/

    config/
      site.ts
      seo.ts
      rutas.ts
      navegacion.ts
      servicios.ts
      analitica.ts

    datos/
      paginas/
        inicio.ts
        contacto.ts
        servicios.ts
      comunes/
        empresa.ts
        llamadas-accion.ts

    i18n/
      navigation.ts
      request.ts
      routing.ts

    lib/
      analytics.ts
      metadata.ts
      structured-data.ts
      utils.ts

    messages/
      es.json
      en.json

    styles/
      animations.css
```

## Estado Actual Permitido

El proyecto puede empezar mas vacio que el arbol oficial. No se deben crear carpetas o archivos solo por rellenar. El arbol anterior define donde vivira cada pieza cuando exista.

Actualmente es correcto que varias carpetas tengan solo `.gitkeep` hasta que se disenen sus primeras secciones.

## Responsabilidades Por Carpeta

### `src/app`

Contiene rutas, layouts, metadata, sitemap, robots, `globals.css`, tokens visuales globales y estilos base de Next.

No debe contener:

- Secciones grandes.
- Arrays de contenido de negocio.
- Efectos complejos.
- Logica de analitica directamente en botones o formularios.

### `src/componentes/secciones`

Contiene layouts reutilizables.

Cada seccion debe poder usarse en varias paginas cambiando datos, no codigo interno.

Ejemplo:

```tsx
<Hero01 {...inicio.hero} />
<Hero01 {...contacto.hero} />
```

### `src/componentes/ui`

Contiene piezas pequenas y repetibles: botones, enlaces, inputs, contenedores, etiquetas, tabs o controles.

No debe contener secciones completas.

### `src/componentes/efectos`

Contiene efectos visuales o de animacion encapsulados. React Bits, GSAP, Motion, Canvas o WebGL deben envolverse aqui antes de usarse en una seccion.

Una pagina nunca debe importar directamente un efecto complejo si puede recibirlo como configuracion de una seccion.

### `src/datos/paginas`

Contiene datos por pagina.

Ejemplo:

```ts
export const contacto = {
  hero: {
    titulo: "Hablemos de tu proyecto",
    descripcion: "Cuentanos que necesitas.",
    imagen: {
      escritorio: "/imagenes/paginas/contacto/hero.webp",
      movil: "/imagenes/paginas/contacto/hero-movil.webp",
      alt: "Contacto con Alred",
    },
  },
};
```

### `src/config`

Contiene informacion estable del proyecto: nombre, URL, rutas, servicios, navegacion, SEO base y configuracion de analitica.

### `src/lib`

Contiene funciones reutilizables sin responsabilidad visual: metadata, Schema.org, tracking, utilidades de formato o validacion.

### `src/styles`

Contiene animaciones reutilizables cuando hagan falta. Los tokens visuales globales viven en `src/app/globals.css`. Esta carpeta no debe convertirse en un cajon de estilos de secciones concretas.

## Reglas Para Crear Nuevos Archivos

- Si algo es una ruta, va en `src/app`.
- Si algo es contenido configurable de una pagina, va en `src/datos/paginas`.
- Si algo es un layout reutilizable, va en `src/componentes/secciones`.
- Si algo es una pieza pequena reutilizable, va en `src/componentes/ui`.
- Si algo es un efecto complejo o externo, va en `src/componentes/efectos`.
- Si algo es una constante global de negocio, va en `src/config`.
- Si algo es una funcion sin UI, va en `src/lib`.
- Si algo es una decision previa a implementacion, va en `especificaciones`.

## Criterios De Aceptacion

- Una persona puede encontrar rapidamente donde crear una pagina, seccion, dato o efecto.
- Las paginas no mezclan datos, estilos complejos y logica visual.
- Las secciones son reutilizables y configurables mediante props claras.
- No hay carpetas duplicadas en ingles y espanol para el mismo proposito.
- Los nombres de uso frecuente pueden estar en espanol cuando resulte natural.
- El proyecto puede crecer sin cambiar la estructura principal.

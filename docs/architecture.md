# Arquitectura

El proyecto usa Next.js App Router, TypeScript, Tailwind CSS y una carpeta `src`.

## Principio De Rutas

Las rutas deben ser pequenas. Una pagina importa datos de pagina y secciones reutilizables, y despues las compone.

Forma correcta:

```tsx
<Hero01 {...inicio.hero} />
<TextoImagen01 {...inicio.introduccion} />
<CTA01 {...inicio.cta} />
```

Evitar grandes bloques de layout, arrays de contenido de negocio, llamadas de analitica y decisiones visuales directamente dentro de `page.tsx`.

## Responsabilidades Por Carpeta

- `src/app`: rutas, layouts, metadata, `globals.css`, sitemap y robots.
- `src/app/globals.css`: tokens visuales globales, mapeo de Tailwind y estilos base.
- `src/componentes/secciones`: secciones reutilizables.
- `src/componentes/ui`: primitives de interfaz.
- `src/componentes/efectos`: efectos y wrappers de animacion encapsulados.
- `src/config`: datos estables del sitio y definiciones de negocio reutilizables.
- `src/datos/paginas`: datos especificos de pagina que se pasan a secciones.
- `src/i18n`: configuracion de idiomas y rutas localizadas.
- `src/lib`: analitica, metadata, datos estructurados y helpers sin UI.
- `src/styles`: animaciones reutilizables cuando no pertenezcan a una seccion concreta.

## Jerarquia Visual

```txt
TOKENS GLOBALES
  -> COMPONENTES UI
    -> SECCIONES
      -> PAGINAS
        <- DATOS
```

Cada nivel consume el anterior. Una seccion no debe reinventar UI ni tokens; una pagina no debe implementar layouts internos.

## Regla De Migracion

El codigo antiguo se trata como material de referencia, no como fuente de verdad. Al importar trabajo de la web anterior, conservar solo la intencion, copy o direccion visual que sea util, y reconstruirlo con las primitives y reglas actuales.

## Biblioteca De Secciones

Las paginas deben componer secciones reutilizables y pasarles datos. Las secciones encapsulan su layout y complejidad visual. Leer `docs/biblioteca-secciones.md` y `especificaciones/02-biblioteca-secciones.md` antes de crear o migrar cualquier seccion.

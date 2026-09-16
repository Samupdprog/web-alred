# Especificaciones SDD De Alred

Esta carpeta es la fuente de verdad para trabajar con Spec-Driven Development en la web de Alred.

SDD significa que antes de construir una pagina, seccion, efecto, sistema de datos o cambio de arquitectura, primero se define que debe existir, por que existe, como se usa, donde vive y como se valida.

## Objetivo

Evitar caos, duplicacion y decisiones improvisadas. Cada cambio importante debe estar guiado por una especificacion pequena, clara y verificable.

## Como Usar Esta Carpeta

1. Leer `00-metodologia-sdd.md`.
2. Revisar `01-estructura-archivos.md` antes de crear carpetas o mover archivos.
3. Revisar `05-comprension-global.md` antes de implementar paginas, secciones o cambios visuales importantes.
4. Crear una especificacion nueva usando `plantillas/plantilla-especificacion.md` cuando el cambio tenga entidad propia.
5. Implementar solo lo que la especificacion aprueba.
6. Validar con los criterios de aceptacion definidos.

## Indice

- `00-metodologia-sdd.md`: metodo de trabajo SDD para Alred.
- `01-estructura-archivos.md`: estructura completa de archivos y responsabilidades.
- `02-biblioteca-secciones.md`: reglas para crear secciones reutilizables tipo Shopify.
- `03-seo-analitica.md`: especificacion base para SEO, medicion y eventos.
- `04-componentes-ui.md`: especificacion de primitives UI aprobados.
- `05-comprension-global.md`: comprension global y reglas transversales del proyecto.
- `plantillas/plantilla-especificacion.md`: plantilla para futuras especificaciones.

## Regla Principal

Las paginas componen y configuran. Las secciones implementan. Las especificaciones deciden antes de construir.

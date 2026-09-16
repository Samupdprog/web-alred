# Design System - Alred

## Objetivo

El sistema de diseno existe para mantener la web de Alred visualmente coherente, escalable y facil de mantener.

La velocidad de implementacion nunca debe pasar por encima del sistema. Si una solucion rapida introduce duplicacion, estilos locales innecesarios o una API confusa, no es una buena solucion para este proyecto.

## Jerarquia Visual

La jerarquia oficial es:

```txt
TOKENS GLOBALES
  -> COMPONENTES UI
    -> SECCIONES
      -> PAGINAS
        <- DATOS
```

Cada nivel tiene una responsabilidad distinta:

- Los tokens globales definen el lenguaje visual compartido.
- Los componentes UI definen primitives reutilizables.
- Las secciones definen composiciones visuales completas.
- Las paginas seleccionan, ordenan y configuran secciones.
- Los datos contienen el contenido especifico de cada pagina.

## Fuente De Verdad Visual

La fuente principal de tokens globales es:

```txt
src/app/globals.css
```

Antes de escribir cualquier color, radio, espaciado estructural, ancho maximo, duracion, easing, tipografia o material visual compartido, revisar primero `globals.css`.

Un componente no decide el lenguaje visual global. Lo consume.

## Tokens Actuales

La geometria global actual usa:

- `--radius-lg`
- `--radius-md`
- `--radius-sm`

Tambien existen escalas globales para:

- espacio de pagina;
- espacio de seccion;
- espacio compacto;
- separacion entre secciones;
- ancho maximo;
- movimiento;
- colores;
- materiales UI;
- refraccion;
- brillo del boton principal.

No duplicar estos tokens dentro de CSS Modules.

### Ritmo vertical de página

Las páginas agrupan hero y secciones en `className="section-stack"`.
`--space-between-sections` en `src/app/globals.css` controla todas las distancias
entre estos hermanos: 50px en escritorio y 38px hasta 768px. No sumar padding
vertical ni márgenes externos en las raíces de las secciones. El padding interno
del hero, las tarjetas y las composiciones sigue perteneciendo a cada sección.

## Correcto

```css
.section {
  border-radius: var(--radius-lg);
  padding: var(--space-section);
  color: var(--color-ink);
  transition: transform var(--motion-base) var(--motion-ease);
}
```

## Incorrecto

```css
.section {
  border-radius: 27px;
  padding: 46px;
  color: #171717;
  transition: transform 260ms ease-out;
}
```

## Componentes UI

Los primitives aprobados actualmente viven en:

```txt
src/componentes/ui/
```

Variantes aprobadas:

- Botones: `principal`, `refractado-claro`, `refractado-oscuro`, `secundario`, `icono`.
- Enlaces: `flecha`, `subrayado`.

No crear automaticamente `ghost`, badges, pills, chips ni variantes decorativas. Solo se anaden cuando una especificacion lo aprueba.

Las secciones deben reutilizar estos primitives. No recrear botones o enlaces locales por velocidad.

## Anti-Patrones Visuales

Evitar que la web parezca generada por IA.

No usar automaticamente:

- listas 01 / 02 / 03 como recurso decorativo repetido;
- pills, badges o chips sin funcion;
- icono en cada card por defecto;
- cards para todo;
- eyebrow encima de todos los headings;
- la misma formula repetida de eyebrow, heading, parrafo, tres cards y CTA.

La consistencia visual no significa repetir siempre la misma composicion.

Buscamos sobriedad, claridad, composicion editorial, sensacion premium y pocos elementos bien elegidos.

## Responsive

Responsive forma parte del componente desde su creacion. Cada seccion y UI debe funcionar en movil, tablet, desktop y pantallas grandes.

Revisar overflow, saltos de linea, orden, tamanos, imagenes, grids, padding, alturas, touch y textos largos.

Los hover deben limitarse cuando corresponda:

```css
@media (hover: hover) and (pointer: fine) {
  /* hover de escritorio */
}
```

No depender de hover para funcionalidad.

## Movimiento

El movimiento debe ser suave, sutil y secundario respecto al contenido.

Preferir microinteracciones contenidas y reveals limpios. Respetar siempre `prefers-reduced-motion`.

Si se elimina la animacion, la interfaz debe seguir funcionando y entendiendose correctamente.

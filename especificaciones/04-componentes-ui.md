# 04 - Componentes UI Base

## Estado

Aprobado para implementación.

## Objetivo

Crear los primeros primitives visuales reutilizables de Alred
para evitar que las secciones creen botones y enlaces propios.

## Alcance

Incluye:

- Botón principal.
- Botón refractado claro.
- Botón refractado oscuro.
- Botón secundario.
- Botón de icono.
- Enlace con flecha.
- Enlace con subrayado.

No incluye:

- Badges.
- Pills.
- Ghost buttons.
- Formularios.
- Tabs.
- Nuevas variantes.

## Principios

- Todos los elementos pertenecen a la misma familia visual.
- La tipografía se hereda de los estilos globales.
- Los componentes reutilizan tokens globales.
- No se permiten medidas arbitrarias desde props.
- Las animaciones son sutiles.
- Hover solo se aplica en dispositivos compatibles.
- El comportamiento táctil debe funcionar sin depender de hover.
- Debe respetarse prefers-reduced-motion.
- Responsive forma parte del componente desde su creación.

## Botón

Variantes permitidas:

- principal
- refractado-claro
- refractado-oscuro
- secundario
- icono

El botón principal:
- fondo oscuro;
- relieve sutil;
- círculo claro con flecha;
- brillo suave en movimiento;
- microelevación en hover de escritorio.

Los refractados:
- comparten estructura;
- tema claro u oscuro;
- reflejo iridiscente lineal y constante;
- velocidad definida internamente mediante token/variable CSS.

El secundario:
- material claro;
- relieve coherente;
- círculo oscuro con flecha.

El botón icono:
- circular;
- material claro;
- puede invertirse visualmente en hover de escritorio.

## Enlaces

Variantes permitidas:

- flecha
- subrayado

Enlace flecha:
- flecha avanza ligeramente en hover.

Enlace subrayado:
- línea aparece mediante una transición horizontal suave.

## Tipografía

Los componentes no definen font-family.

Usar:

font: inherit;

La fuente procede del sistema global.

## Tokens

Los componentes reutilizan los tokens globales del proyecto para:

- radios;
- colores;
- movimiento;
- espaciados cuando corresponda.

No deben duplicar valores globales sin necesidad.

## Archivos

src/componentes/ui/boton/Boton.tsx
src/componentes/ui/boton/Boton.types.ts
src/componentes/ui/boton/Boton.module.css
src/componentes/ui/boton/index.ts

src/componentes/ui/enlace/Enlace.tsx
src/componentes/ui/enlace/Enlace.types.ts
src/componentes/ui/enlace/Enlace.module.css
src/componentes/ui/enlace/index.ts

src/componentes/ui/index.ts

## Criterios De Aceptación

- Los cinco botones pueden utilizarse sin CSS local.
- Los dos enlaces pueden utilizarse sin CSS local.
- Ninguna sección necesita recrear estas piezas.
- Todos heredan la tipografía global.
- Desktop y móvil se ven correctamente.
- Hover no causa estados extraños en touch.
- prefers-reduced-motion está contemplado.
- Los botones pueden renderizar navegación o acciones según corresponda.
- Son accesibles mediante teclado.
- No contienen contenido específico de una página.
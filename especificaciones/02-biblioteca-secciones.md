# 02 - Biblioteca De Secciones

## Objetivo

Crear una biblioteca de secciones reutilizables para montar paginas de forma rapida, ordenada y consistente.

## Principio Central

Las paginas componen y configuran. Las secciones implementan.

## Ejemplo De Uso Deseado

```tsx
import { Hero03, TextoImagen02, Tarjetas01, Formulario01, CTA02 } from "@/componentes/secciones";
import { contacto } from "@/datos/paginas/contacto";

export default function PaginaContacto() {
  return (
    <>
      <Hero03 {...contacto.hero} />
      <TextoImagen02 {...contacto.introduccion} />
      <Tarjetas01 {...contacto.ventajas} />
      <Formulario01 {...contacto.formulario} />
      <CTA02 {...contacto.cta} />
    </>
  );
}
```

## Reglas De Seccion

- Una seccion representa un layout.
- Una seccion no contiene contenido especifico de una pagina.
- Una seccion consume tokens globales desde `src/app/globals.css`; no crea su propio lenguaje visual.
- Una seccion reutiliza los primitives UI aprobados antes de crear soluciones locales.
- Una seccion puede tener variantes controladas.
- Una seccion puede aceptar tema y animacion, pero no medidas arbitrarias.
- Una seccion debe funcionar aunque se desactive la animacion.
- Una seccion compleja debe tener tipos separados.

## Nombres

Usar nombres sencillos:

- `Hero01`
- `TextoImagen01`
- `Tarjetas01`
- `Proyectos01`
- `Pasos01`
- `Formulario01`
- `CTA01`

Crear `Hero02` cuando cambie el layout de forma importante. No convertir `Hero01` en un componente enorme con demasiadas opciones.

## Anti-Patrones

No usar automaticamente:

- pills, badges o chips decorativos;
- iconos en cada card por defecto;
- eyebrows en todos los headings;
- numeraciones 01 / 02 / 03 como recurso visual repetido;
- cards para absolutamente todo;
- la misma formula de seccion repetida continuamente.

La consistencia se consigue compartiendo sistema, no repitiendo siempre la misma composicion.

## Datos

Los datos deben venir desde `src/datos/paginas`.

```ts
export const inicio = {
  hero: {
    titulo: "Soluciones digitales",
    descripcion: "Creamos herramientas adaptadas a tu empresa.",
    imagen: {
      escritorio: "/imagenes/paginas/inicio/hero.webp",
      movil: "/imagenes/paginas/inicio/hero-movil.webp",
      alt: "Soluciones digitales para empresas",
    },
    botones: [
      {
        texto: "Hablemos",
        href: "/contacto",
        estilo: "principal",
      },
    ],
  },
};
```

## Efectos

Los efectos complejos se encapsulan en `src/componentes/efectos`.

Permitido:

```tsx
<Hero01 {...datos} efectoFondo={<ThreadsEffect />} />
```

No permitido:

```tsx
// 200 lineas de un efecto pegadas dentro de Hero01
```

## Criterios De Aceptacion

- La seccion puede reutilizarse con datos distintos.
- La pagina que la usa sigue siendo facil de leer.
- La seccion no expone props de medidas arbitrarias.
- El contenido puede modificarse sin tocar la implementacion visual.
- Las animaciones estan encapsuladas.
- Reutiliza UI aprobado cuando hay botones o enlaces.
- Respeta responsive, accesibilidad, performance y reduced motion.

# Biblioteca De Secciones

La web de Alred se construira como una biblioteca de secciones reutilizables, parecida conceptualmente al sistema de secciones de Shopify.

## Filosofia

Las paginas componen y configuran. Los componentes implementan.

Una pagina debe encargarse principalmente de elegir, ordenar y pasar datos:

```tsx
import { Hero01, TextoImagen01, Formulario01, CTA01 } from "@/componentes/secciones";
import { contacto } from "@/datos/paginas/contacto";

export default function PaginaContacto() {
  return (
    <>
      <Hero01 {...contacto.hero} />
      <TextoImagen01 {...contacto.introduccion} />
      <Formulario01 {...contacto.formulario} />
      <CTA01 {...contacto.cta} />
    </>
  );
}
```

## Reglas

- Cada seccion representa un layout reutilizable.
- La seccion controla estructura, responsive, diseno, comportamiento y animaciones propias.
- La seccion no contiene textos o imagenes de una pagina concreta.
- Los datos de pagina viven en `src/datos/paginas`.
- Los efectos complejos viven en `src/componentes/efectos`.
- Una variante controlada sirve para cambios pequenos.
- Un cambio grande de layout justifica una nueva seccion numerada.

## Props Permitidas

Buenas props:

- `titulo`
- `descripcion`
- `imagen`
- `botones`
- `variante`
- `tema`
- `animacion`
- `efectoFondo`

Malas props:

- `paddingTop={82}`
- `imagenWidth={53}`
- `tituloX={12}`
- `gap={37}`

El componente debe proteger su diseno interno.

## Estructura Recomendada

```txt
src/componentes/secciones/
  hero/
    Hero01/
      Hero01.tsx
      Hero01.types.ts
      Hero01.module.css
      Hero01.motion.ts
      index.ts
```

No todos los componentes necesitan todos esos archivos. Si una seccion es sencilla, debe ser sencilla. La regla es mantener junto lo especifico de esa seccion y extraer solo lo que tenga reutilizacion real.

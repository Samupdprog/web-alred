# 00 - Metodologia SDD

## Definicion

Spec-Driven Development para Alred es una forma de trabajar donde cada pieza importante del proyecto nace desde una especificacion clara antes de escribir codigo.

No se trata de documentar por documentar. Se trata de evitar que una pagina, seccion o sistema empiece con una idea vaga y termine mezclando diseno, datos, SEO, animaciones y logica en el mismo archivo.

## Principios

- Primero se define el comportamiento esperado.
- Despues se define donde vive cada cosa.
- Despues se implementa.
- Finalmente se valida contra criterios concretos.

## Que Necesita Una Especificacion

Cada especificacion debe responder:

- Que se quiere construir.
- Para quien se construye.
- Que incluye.
- Que queda fuera.
- Que datos necesita.
- Que componentes o secciones usa.
- Que impacto tiene en SEO.
- Que eventos analiticos debe registrar.
- Que archivos se pueden tocar.
- Como se comprueba que esta bien.

Antes de escribir una especificacion para paginas, secciones o cambios visuales, leer `05-comprension-global.md` y comprobar si `04-componentes-ui.md` afecta a la solucion.

## Cuando Crear Una Especificacion

Crear o actualizar una especificacion antes de:

- Crear una pagina nueva.
- Crear una seccion reutilizable.
- Crear un efecto complejo.
- Cambiar la estructura de carpetas.
- Integrar analitica, formularios o conversiones.
- Migrar material de la web anterior.
- Hacer cambios de diseno global.
- Crear variantes nuevas de componentes UI.
- Introducir patrones visuales repetibles.

No hace falta crear una especificacion nueva para correcciones pequenas, errores tipograficos o ajustes internos que no cambian el comportamiento ni la arquitectura.

## Flujo De Trabajo

1. Convertir la peticion en una especificacion corta.
2. Revisar si ya existe una seccion, efecto, dato o patron que resuelva el caso.
3. Revisar tokens globales y componentes UI aprobados.
4. Definir archivos afectados.
5. Implementar con el alcance mas pequeno que cumpla la especificacion.
6. Ejecutar validaciones.
7. Actualizar la especificacion si la implementacion descubre una decision mejor.

## Criterios De Calidad

Una especificacion es buena si otra IA o desarrollador puede abrirla dentro de varios meses y entender:

- Que habia que construir.
- Por que se decidio asi.
- Donde debe vivir.
- Que no debe hacerse.
- Como saber si esta terminado.

## Relacion Con AGENTS.md

`AGENTS.md` contiene las reglas generales que siempre aplican. Esta carpeta contiene las especificaciones concretas y ampliadas. Si hay conflicto, primero se corrige la especificacion o `AGENTS.md`; no se ignora la contradiccion.

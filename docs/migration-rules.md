# Reglas De Migracion

Usar estas reglas cuando se traiga material de la web anterior de Alred.

## Proceso

1. Identificar que intenta conseguir el archivo, componente o referencia antigua.
2. Extraer copy util, intencion de layout, imagenes e ideas de interaccion.
3. Comprobar si una seccion o primitive UI existente ya cubre la necesidad.
4. Reconstruir con tokens actuales desde `src/app/globals.css`.
5. Reutilizar los componentes UI aprobados en `src/componentes/ui`.
6. Separar datos de pagina en `src/datos/paginas`.
7. Corregir responsive, accesibilidad, SEO, performance y analitica.
8. Convertir el resultado en secciones reutilizables cuando el layout vaya a repetirse.

## No Arrastrar

- Estilos inline extendidos.
- Valores repetidos de espaciado, radios, colores o movimiento.
- Cards o botones duplicados con diferencias pequenas.
- Paginas con arrays grandes de contenido y JSX complejo.
- Snippets de analitica mezclados con UI.
- Nombres de archivos poco claros o carpetas de experimentos temporales.
- Patrones visuales genericos de IA copiados sin criterio.

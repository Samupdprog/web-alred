# 03 - SEO Y Analitica

## Objetivo

Preparar la web de Alred para captar clientes con SEO limpio y analitica util desde el inicio, sin llenar el codigo de snippets sueltos ni repetir palabras clave sin criterio.

## SEO

Cada pagina publica debe definir:

- Intencion de busqueda.
- Titulo unico.
- Descripcion unica.
- H1 unico.
- Jerarquia H2/H3 clara.
- URL canonica.
- Alternativas por idioma.
- Alt de imagenes.
- Indexabilidad.
- Datos estructurados si aplican.
- Enlaces internos relevantes.

## Contenido

El contenido debe ser natural, concreto y orientado a decision. No debe repetir la misma keyword de forma artificial.

Cada pagina debe responder:

- Que problema resuelve Alred.
- Para que tipo de empresa.
- Que resultado puede esperar el cliente.
- Que paso siguiente debe tomar.

## Analitica

La analitica debe vivir detras de una capa central en `src/lib/analytics.ts` cuando se implemente.

No introducir llamadas directas a GA4, PostHog, Vercel Analytics u otros proveedores dentro de componentes visuales.

Eventos previstos:

- `generate_lead`
- `cta_click`
- `contact_method_click`
- `service_view`
- `language_switch`

## Herramientas Previstas

- GA4 para visitas, canales, campanas y conversiones.
- Google Search Console para SEO.
- Vercel Analytics si se despliega en Vercel.
- PostHog o herramienta similar para mapas de calor, funnels y comportamiento.

## Criterios De Aceptacion

- Ningun componente visual contiene snippets directos de proveedores.
- Los eventos se nombran de forma estable.
- Las paginas tienen metadata especifica.
- El SEO es util y natural, no repetitivo.
- La analitica mide interacciones relevantes, no ruido.

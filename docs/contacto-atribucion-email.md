# Contacto: atribución y correo

## Qué recibe el email

El email generado por `/api/contacto` contiene únicamente información útil para gestionar el lead:

- datos introducidos voluntariamente;
- tipo de formulario;
- necesidad o necesidades;
- mensaje;
- landing inicial;
- página de envío;
- referrer inicial sin query;
- UTMs;
- idioma;
- dispositivo genérico;
- navegador genérico;
- sistema operativo genérico;
- fecha de recepción;
- versión de privacidad.

## Qué no se incorpora

- IP;
- geolocalización;
- fingerprint;
- user-agent completo;
- gclid;
- fbclid;
- Clarity session ID;
- cookies publicitarias.

## Cómo se obtiene la landing

El componente utiliza `PerformanceNavigationTiming.name`.

En navegación interna de Next.js la aplicación sigue utilizando el mismo documento, por lo que esa entrada normalmente conserva la URL con la que empezó la visita.

No se escribe un identificador persistente para ello.

## Limitación deliberada

Si la persona:
1. entra por una campaña;
2. recarga completamente una página intermedia;
3. después llega a contacto;

puede perderse la atribución original.

No se corrige mediante cookies/storage porque el objetivo de esta implementación es priorizar minimización y evitar tracking persistente.

## Clarity

El formulario incluye:

```html
data-clarity-mask="true"
```

No se debe utilizar `clarity("identify", ...)` con:
- nombre;
- email;
- teléfono;
- datos del formulario.

## Gmail

La API usa variables privadas:

```env
CONTACT_SMTP_USER=
CONTACT_SMTP_APP_PASSWORD=
CONTACT_TO_EMAIL=
```

La contraseña de aplicación nunca debe estar en Git ni en variables `NEXT_PUBLIC_*`.

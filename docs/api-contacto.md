# Contacto por email: instalación y operación

La ruta completa está en `src/app/api/contacto/route.ts`. Usa un Route Handler
POST de Next.js 16 App Router, `runtime = "nodejs"`, Nodemailer y TLS de Node.
No utiliza runtime Edge ni una base de datos. No exporta credenciales al cliente.

## Dependencias

Desde la carpeta `web-alred`:

```powershell
npm install nodemailer
npm install --save-dev @types/nodemailer
```

Ya están instaladas y registradas en package.json/package-lock.json. Nodemailer
10 incluye tipos propios; @types/nodemailer queda como dependencia de desarrollo,
no se incorpora al navegador. Para reproducir las versiones del proyecto usa
`npm ci`.

## Configuración local

Revoca cualquier contraseña de aplicación que se haya compartido en un chat,
captura o repositorio y genera una nueva en tu cuenta de Google.

Crea o edita **`web-alred/.env.local`**, junto a `package.json`, no dentro de src.
No sobrescribas otras variables existentes. Añade estas tres líneas sustituyendo
los marcadores en tu editor privado:

```dotenv
CONTACT_SMTP_USER=tu-cuenta-de-envio@gmail.com
CONTACT_SMTP_APP_PASSWORD=TU_NUEVA_CONTRASENA_DE_APLICACION
CONTACT_TO_EMAIL=tu-buzon-de-recepcion@example.com
```

CONTACT_SMTP_USER debe ser la cuenta a la que pertenece la contraseña de
aplicación. CONTACT_TO_EMAIL es un único destinatario. Pueden coincidir.
El código admite los espacios con los que Google presenta la contraseña.
No uses NEXT_PUBLIC_ para ninguna de estas variables ni pegues el secreto en
comandos, herramientas de prueba, código del cliente o documentación.

`.env.local` y el resto de `.env*` están ignorados por Git; solo `.env.example`
es versionable. Puedes comprobarlo sin mostrar su contenido:

```powershell
git check-ignore .env.local
npm run dev
```

Reinicia el servidor después de modificar las variables. Este trabajo no crea
credenciales reales ni escribe la contraseña del chat en ningún archivo.

## Prueba local

Abre `/es/contacto` o `/en/contacto`. La página ya configura `/api/contacto` y
envía el idioma. Ya no simula un envío correcto si falta la API.

También puedes enviar un ejemplo ficticio desde PowerShell; cuando hayas puesto
credenciales reales, esta petición **sí envía un email al destinatario configurado**:

```powershell
$contactoPrueba = @{
  tipo = "corto"
  nombre = "Prueba"
  apellido = "Ejemplo"
  empresa = "Empresa ficticia"
  telefono = "+34 600 000 000"
  correo = "visitante@example.com"
  mensaje = "Este es un envío de prueba desde localhost."
  necesidad = "web"
  privacidadLeida = $true
  privacidadVersion = "2026-09-15"
  locale = "es"
  website = ""
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/contacto" -Method Post -ContentType "application/json; charset=utf-8" -Body ([System.Text.Encoding]::UTF8.GetBytes($contactoPrueba))
```

La respuesta de éxito es `{ "ok": true }`. Revisa el buzón destino y spam;
comprueba que “Responder” apunta a visitante@example.com, no al remitente SMTP.
Un éxito indica aceptación por el servidor SMTP, no confirma la llegada a inbox.
El honeypot relleno devuelve el mismo éxito pero **no** envía correo.

Sin las variables reales, un payload válido devuelve HTTP 503 y `{ "ok": false }`.
Los fallos no vacían el formulario. El navegador nunca recibe el error SMTP.

Pruebas automáticas sin red SMTP, sin secretos y sin envíos:

```powershell
node scripts/test-contacto.mjs
node scripts/test-contacto-http.mjs # con Next.js arrancado, sin envíos SMTP
npm run lint
npm run build
```

## Contrato y límites

Siempre se exigen tipo corto/largo, locale es/en, nombre de 2–60 caracteres,
apellido de hasta 80 (puede estar vacío), empresa de hasta 120 (puede estar vacía),
teléfono de hasta 30 caracteres con 7–15 dígitos y prefijo + opcional, un único
email de hasta 254 caracteres, privacidadLeida estrictamente true y una fecha
real YYYY-MM-DD en privacidadVersion.

Mensaje: 12–1800 caracteres en corto; 24–2500 en largo. Necesidad es opcional
y tiene hasta 80 caracteres. Necesidades es opcional, con hasta 10 cadenas de
1–80 caracteres, sin duplicados. Otro es opcional, hasta 120; si un formulario
largo incluye la necesidad “otro”, exige al menos 3 caracteres de descripción.
La API admite omitir la selección opcional según el contrato solicitado; el
frontend puede exigirla como parte de su experiencia. Website es el honeypot
opcional, hasta 200 caracteres. Se rechazan campos desconocidos.

El límite se aplica antes de trim y a los bytes realmente recibidos: 24 KiB,
incluso sin Content-Length o cuando su valor sea incorrecto. JSON UTF-8 válido,
sin compresión. El tiempo de lectura es 5 segundos y el de envío 20 segundos;
el último destruye el socket TLS, además de los timeouts internos de SMTP.
La ruta declara maxDuration=30; el hosting debe permitir ese tiempo.

Estados: 200 éxito/honeypot; 400 validación; 403 cross-site; 405 método no admitido;
408 lectura cancelada/agotada; 413 tamaño; 415 formato; 429 protección de recursos;
503 configuración incompleta; 502 envío fallido/timeout SMTP; 500 fallo inesperado.
El cuerpo siempre contiene únicamente `{ok:true}` o `{ok:false}`.

## Producción

1. Usa un alojamiento con ejecución **Node.js** para Next.js y salida TCP 465 a
   smtp.gmail.com. No sirve exportación estática ni runtime Edge.
2. En el panel de variables/secrets del hosting añade CONTACT_SMTP_USER,
   CONTACT_SMTP_APP_PASSWORD y CONTACT_TO_EMAIL para el entorno Production.
   Introduce allí los valores reales; nunca subas .env.local. En un servidor
   propio puedes inyectarlas en el servicio Node o usar .env.local con acceso
   restringido al usuario que ejecuta el proceso.
3. Despliega con `npm ci`, `npm run build` y `npm run start`, o el preset Next.js
   equivalente del proveedor. Reinicia/redespliega después de cambiar secretos.
4. Comprueba un envío por HTTPS desde la web. Mantén las variables de Preview
   separadas: usa un buzón de pruebas para evitar mensajes accidentales.

## Antispam y privacidad

El honeypot, JSON estricto, límites de tamaño/campo y rechazo de peticiones
cross-site de navegadores son una primera barrera sin CAPTCHA. Además, la API
permite como máximo 20 intentos SMTP/minuto y 2 simultáneos por proceso. Guarda
solo tres contadores numéricos, sin IP, huellas, email ni contenido. El límite
se reinicia con el proceso y no se comparte entre instancias/serverless. Para
volumen o abuso sostenido, configura una cuota global del endpoint en el hosting;
no confundas este contador local con un rate limiter distribuido.

No hay base de datos ni logs del formulario o del error SMTP, y se deshabilitan
logger/debug, lectura de archivos y descargas por Nodemailer. From, To y envelope
son exclusivamente de servidor; el visitante solo controla Reply-To y el texto
validado. No hay adjuntos ni destinatarios introducidos desde el navegador.

Los datos sí quedan en los buzones y sistemas de correo de Google/destinatario.
Limita el acceso y establece una política de eliminación coherente con tu aviso
de privacidad. La aplicación no recoge IP; los registros y retención propios
del hosting/correo se configuran en esos proveedores. No habilites captura de
bodies en observabilidad ni variables SMTP en registros de despliegue.

Se ha retirado la activación automática global de Google Analytics: la política
del proyecto indica que debe esperar a la integración de consentimiento. La API
no añade eventos de analítica. Esto no constituye una auditoría legal completa.

No se reintenta automáticamente un envío: tras una desconexión puede no conocerse
si Gmail aceptó el mensaje. Sin almacenamiento de idempotencia no se promete
entrega exactamente una vez. Antes de repetir una prueba fallida, revisa el buzón.

## Si SMTP está bloqueado

Se mantiene Gmail/Nodemailer como implementación solicitada. Gmail puede aplicar
límites o bloquear accesos desde centros de datos; Nodemailer recomienda un
servicio especializado para cargas de producción:
[Gmail en Nodemailer](https://nodemailer.com/guides/using-gmail).

Si el hosting impide SMTP, sustituye únicamente el transporte por una API HTTPS:
[Resend](https://resend.com/docs/api-reference/emails/send-email) o
[Postmark](https://postmarkapp.com/developer/api/email-api). Conserva validación,
honeypot, destinatario de servidor y respuestas mínimas. Sus credenciales también
deben permanecer en variables de servidor; esta versión no instala ni utiliza
esos proveedores.

Referencias: [Route Handlers de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/route),
[SMTP y timeouts](https://nodemailer.com/smtp),
[From, Reply-To y cuerpos alternativos](https://nodemailer.com/message).

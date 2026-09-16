# API de contacto por email

## Objetivo y alcance
Recibir POST JSON en /api/contacto y enviar una notificación mediante Nodemailer
y Gmail SMTP. Route Handler de Next.js 16, runtime nodejs. Sin base de datos.
Servidor y destinatario se configuran exclusivamente mediante CONTACT_SMTP_USER,
CONTACT_SMTP_APP_PASSWORD y CONTACT_TO_EMAIL. Nunca NEXT_PUBLIC_ para secretos.

## Contrato y seguridad
- Validar objeto, claves conocidas, tipos, límites por campo, email único,
  teléfono, modalidad, idioma y confirmación/version de privacidad.
- Aceptar apellido/empresa vacíos y necesidad/necesidades/otro opcionales.
- Límite real de 24 KiB incluso sin Content-Length; lectura máxima de 5 segundos.
- Solo application/json; rechazar peticiones cross-site identificadas por navegador.
- Honeypot website opcional: respuesta indistinguible de éxito sin enviar correo.
- Protección de recursos por proceso: máximo 20 intentos SMTP por minuto y 2
  simultáneos, sin IP ni identificadores personales. No es un límite distribuido.
- From y destinatario fijados en servidor; correo del visitante solo en Reply-To.
- Escapar HTML, validar enlaces y evitar inyección de cabeceras; sin archivos,
  URLs remotas, adjuntos, logs del contenido ni detalles SMTP en la respuesta.
- TLS verificado y plazo de envío de 20 segundos que destruye el socket al vencer.
- Respuestas exclusivamente {ok:true} o {ok:false}, con estado HTTP apropiado.

## Integración y privacidad
Activar el endpoint real de FormulariosContacto02, incluir locale y honeypot,
quitar el éxito simulado y conservar el formulario ante fallo. No cambiar diseño.
El email contiene los datos solicitados, versión de privacidad y fecha UTC del
servidor. Los mensajes se conservan en las cuentas de correo, no en la aplicación.
No introducir analítica ni enviar eventos con datos de contacto.

## Aceptación y archivos
Pruebas sin correo real: payloads válidos cortos/largos, errores, límites reales,
escape/inyección, destinatario fijo, timeouts, honeypot y límites sin IP.
Lint, TypeScript y build Next.js. Prueba HTTP local y del contrato del frontend.
Archivos: route.ts, .env.example, .gitignore, dependencias, documentación,
pruebas e integración mínima del formulario y página de contacto.
La entrega real en Gmail requiere variables privadas y una prueba del usuario.

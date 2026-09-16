# RGPD — OPERATIVA INTERNA DE ALRED

Documento interno. No publicar en la web.

Última revisión: 15/09/2026.

## 1. Responsable

- Samuel Piñero Díaz / Alred
- Contacto de privacidad: info@alred.es
- Teléfono público: 683 382 977

No almacenar en este documento copias de DNI, contraseñas ni datos de clientes.

## 2. Principio general

Recoger y conservar la menor cantidad de información posible.

Nunca pedir por defecto:
- DNI de clientes potenciales
- domicilio particular
- fecha de nacimiento
- información sanitaria
- información financiera
- datos especialmente sensibles

salvo que exista una necesidad real y una base jurídica adecuada.

## 3. Contactos y formularios

Datos ordinarios:
- nombre
- email
- teléfono si el usuario lo facilita
- empresa si procede
- contenido de la consulta
- información necesaria sobre el proyecto

Finalidades:
- responder
- analizar la necesidad
- preparar propuesta o presupuesto
- mantener comunicaciones sobre ese proyecto
- gestionar la relación profesional si se formaliza

No utilizar automáticamente estos datos para:
- newsletters
- campañas de email
- audiencias publicitarias
- perfiles comerciales

## 4. Conservación

Contacto que NO se convierte en cliente:
- objetivo interno: eliminar a los 12 meses desde la última comunicación
- eliminar antes si solicita supresión y no existe motivo legal para conservarlo

Cliente:
- conservar únicamente lo necesario para la relación y los plazos legales aplicables

Revisar al menos una vez al año contactos antiguos.

## 5. Almacenamiento

Preferencia:
Formulario -> email de Alred

Evitar:
- duplicar automáticamente datos en varias bases
- guardar el body completo del formulario en logs
- guardar emails o teléfonos en URLs
- enviar datos personales a Analytics

## 6. Acceso

- acceso solo a quien lo necesite
- contraseña única para cada servicio
- 2FA siempre que esté disponible
- no compartir credenciales por mensajes
- revocar accesos antiguos

## 7. Google Analytics

NO activar hasta tener:
- banner/sistema de consentimiento
- rechazo al mismo nivel que aceptación
- carga bloqueada antes del consentimiento
- política de cookies actualizada

Nunca enviar:
- nombre
- email
- teléfono
- mensaje del formulario

como parámetros o eventos.

## 8. Microsoft Clarity

NO activar hasta tener:
- consentimiento de analítica
- formularios enmascarados
- zonas con datos personales excluidas/enmascaradas
- comprobación real de grabaciones de prueba

Nunca incluir datos personales en:
- URL
- query string
- atributos personalizados enviados a Clarity

## 9. Vercel Web Analytics

Puede permanecer activo mientras se utilice únicamente para métricas agregadas.

No enviar PII en custom events.

## 10. Proveedores

Mantener una lista real de proveedores que puedan procesar datos.

Ejemplos:
- alojamiento / infraestructura
- email
- formularios
- Vercel
- Google, si se activa
- Microsoft, si se activa

Antes de añadir un proveedor:
- comprobar documentación de privacidad
- revisar condiciones/DPA cuando corresponda
- limitar datos enviados

## 11. Derechos

Si llega una petición de:
- acceso
- rectificación
- supresión
- oposición
- limitación
- portabilidad

No ignorarla.

1. Registrar fecha.
2. Verificar razonablemente identidad sin pedir más datos de los necesarios.
3. Localizar información.
4. Responder dentro del plazo legal aplicable.
5. Documentar la respuesta.

## 12. Brechas

Ejemplos:
- acceso no autorizado al correo
- envío de datos al destinatario equivocado
- pérdida de una base
- exposición pública accidental
- credenciales robadas

Procedimiento inmediato:
1. detener la exposición
2. cambiar/revocar credenciales
3. identificar qué datos se vieron afectados
4. documentar qué ocurrió y cuándo
5. evaluar riesgo para las personas
6. valorar notificación a AEPD dentro del plazo aplicable
7. si existe alto riesgo, valorar comunicación a afectados
8. corregir la causa

No borrar evidencias necesarias para comprender el incidente.

## 13. Revisión

Revisar este documento cuando:
- cambie el formulario
- se añada un CRM
- se active Google Analytics
- se active Clarity
- se añada newsletter
- se cambie proveedor de email/hosting
- se empiecen a tratar nuevas categorías de datos

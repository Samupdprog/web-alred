// Solo payloads rechazados y honeypot: nunca intenta enviar correo real.
import assert from 'node:assert/strict';
const base = process.env.QA_URL || 'http://localhost:3000';
const url = `${base}/api/contacto`;
async function check(body, status, headers = { 'Content-Type': 'application/json' }, ok = false) {
  const response = await fetch(url, { method: 'POST', headers, body, redirect: 'manual' });
  assert.equal(response.status, status);
  assert.deepEqual(await response.json(), { ok });
}
await check('{}', 400);
await check('{invalid', 400);
await check('{}', 415, { 'Content-Type': 'text/plain' });
await check('x'.repeat(25_000), 413);
await check(JSON.stringify({ tipo:'corto',nombre:'Prueba',apellido:'',empresa:'',
  telefono:'+34 600 000 000',correo:'visitante@example.com',mensaje:'Prueba de honeypot sin envío SMTP.',
  privacidadLeida:true,privacidadVersion:'2026-09-15',locale:'es',website:'bot.example.com',
}), 200, undefined, true);
const get = await fetch(url, { redirect: 'manual' });
assert.equal(get.status, 405);assert.deepEqual(await get.json(), { ok:false });
console.log('PASS HTTP Next.js: ruta sin redirección i18n, JSON, body, honeypot y métodos');

// Pruebas de la ruta real con SMTP/TLS simulados: nunca envían correos ni leen .env.local.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { EventEmitter } from 'node:events';
import ts from 'typescript';

const source = readFileSync(new URL('../src/app/api/contacto/route.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true,
} }).outputText;
const valid = { tipo:'corto', nombre:'Prueba', apellido:'Ejemplo', empresa:'Empresa de prueba',
  telefono:'+34 600 000 000', correo:'visitante@example.com', mensaje:'Consulta de prueba del formulario.',
  necesidad:'web', privacidadLeida:true, privacidadVersion:'2026-09-15', locale:'es' };
function setup({ send, env, fastTimers = false } = {}) {
  const messages=[], options=[], logs=[];
  let destroyed=0,closed=0;
  const socket=new EventEmitter();socket.destroy=()=>{destroyed++};
  const loaded={exports:{}};
  runInNewContext(compiled, { module:loaded, exports:loaded.exports, Response, Request, Buffer, TextDecoder,
    process:{env:env??{CONTACT_SMTP_USER:'sender@example.com',CONTACT_SMTP_APP_PASSWORD:'fake password',CONTACT_TO_EMAIL:'owner@example.com'}},
    setTimeout:(fn,ms)=>setTimeout(fn,fastTimers?Math.min(ms,15):ms),clearTimeout,
    console:{log:(...a)=>logs.push(a),error:(...a)=>logs.push(a),warn:(...a)=>logs.push(a)},
    require(name) {
      if(name==='node:tls')return {connect:()=>{queueMicrotask(()=>socket.emit('secureConnect'));return socket}};
      if(name==='nodemailer')return {createTransport:config=>{
        options.push(config);
        return {sendMail:message=>{
          messages.push(message);
          config.getSocket({},()=>{});
          return send?send(message):Promise.resolve({accepted:['owner@example.com'],rejected:[]});
        },close:()=>{closed++}};
      }};
      throw new Error('Unexpected dependency');
    },
  });
  return {route:loaded.exports,messages,options,logs,destroyed:()=>destroyed,closed:()=>closed};
}
const request=(body=valid,headers={})=>new Request('http://localhost:3000/api/contacto',{
  method:'POST',headers:{'Content-Type':'application/json',...headers},body:typeof body==='string'?body:JSON.stringify(body),
});
async function expect(response,status,ok=false){assert.equal(response.status,status);assert.deepEqual(await response.json(),{ok});assert.equal(response.headers.get('cache-control'),'no-store')}

const good=setup();assert.equal(good.route.runtime,'nodejs');
await expect(await good.route.POST(request()),200,true);
await expect(await good.route.POST(request({...valid,tipo:'largo',necesidad:undefined,necesidades:['web','otro'],otro:'Una integración',locale:'en'})),200,true);
assert.equal(good.messages[0].from.address,'sender@example.com');
assert.equal(good.messages[0].to.address,'owner@example.com');
assert.equal(good.messages[0].envelope.to[0],'owner@example.com');
assert.equal(good.messages[0].replyTo.address,valid.correo);
assert.equal(good.messages[0].subject,'Nuevo contacto Alred — Prueba — corto');
for(const key of ['Tipo de formulario','Nombre','Apellido','Empresa','Teléfono','Correo','Necesidad','Necesidades','Otro','Mensaje','Idioma','Privacidad leída','Versión de privacidad','Recepción (UTC)'])assert(good.messages[0].text.includes(key));
assert(good.messages[0].html.includes('href="tel:+34600000000"'));
assert(good.messages[0].html.includes('href="mailto:visitante%40example.com"'));
assert.equal(good.options[0].host,'smtp.gmail.com');assert.equal(good.options[0].secure,true);assert.equal(good.options[0].port,465);
assert.equal(good.options[0].disableFileAccess,true);assert.equal(good.options[0].disableUrlAccess,true);
assert.equal(good.options[0].auth.pass,'fakepassword');assert.deepEqual(good.logs,[]);
assert.equal(good.closed(),2);assert.equal(good.destroyed(),2);
console.log('PASS modalidades, remitente/destinatario, Reply-To, multipart, TLS y limpieza');

const escaped=setup();await expect(await escaped.route.POST(request({...valid,nombre:'<b>Ana & "Luis"</b>',mensaje:'<img src=x onerror="alert(1)">\nTexto & más texto.'})),200,true);
assert(!escaped.messages[0].html.includes('<img'));assert(!escaped.messages[0].html.includes('<b>'));
assert(escaped.messages[0].html.includes('&lt;img'));assert(escaped.messages[0].html.includes('&quot;'));assert(escaped.messages[0].html.includes('<br>'));
assert(escaped.messages[0].text.includes('<img'));

const invalid=setup();
const cases=[null,[],123,{}, {...valid,tipo:'otro'}, {...valid,nombre:3}, {...valid,nombre:'a'.repeat(61)},
  {...valid,apellido:'a'.repeat(81)}, {...valid,empresa:'a'.repeat(121)}, {...valid,nombre:'Ana\r\nBcc:evil@example.com'},
  {...valid,correo:'x@example.com,evil@example.com'}, {...valid,correo:'x@example.com\r\n'},
  {...valid,correo:'x@bad..example'}, {...valid,telefono:'123'}, {...valid,telefono:'javascript:123456789'},
  {...valid,telefono:'123+456789'}, {...valid,telefono:'1'.repeat(16)}, {...valid,mensaje:'x'.repeat(1801)},
  {...valid,privacidadLeida:'true'}, {...valid,privacidadLeida:false}, {...valid,privacidadVersion:'2026-02-30'},
  {...valid,locale:'fr'}, {...valid,locale:undefined}, {...valid,website:{}}, {...valid,website:'x'.repeat(201)},
  {...valid,necesidad:[]}, {...valid,necesidades:'web'}, {...valid,necesidades:[3]}, {...valid,necesidades:['x'.repeat(81)]},
  {...valid,necesidades:Array.from({length:11},(_,i)=>'n'+i)}, {...valid,necesidades:['web','web']},
  {...valid,otro:'x'.repeat(121)}, {...valid,tipo:'largo',necesidades:['otro'],otro:''}, {...valid,to:'evil@example.com'},
];
for(const item of cases)await expect(await invalid.route.POST(request(JSON.stringify(item))),400);
await expect(await invalid.route.POST(request('{invalid')),400);
await expect(await invalid.route.POST(request(valid,{'Content-Type':'text/plain'})),415);
await expect(await invalid.route.POST(request(valid,{'Content-Encoding':'gzip'})),415);
await expect(await invalid.route.POST(request(valid,{'Sec-Fetch-Site':'cross-site'})),403);
await expect(await invalid.route.POST(request(valid,{'Content-Length':'25000'})),413);
await expect(await invalid.route.POST(request(JSON.stringify({...valid,mensaje:'x'.repeat(25000)}))),413);
await expect(await invalid.route.POST(new Request('http://localhost/api/contacto',{method:'POST',headers:{'content-type':'application/json'},
  body:new ReadableStream({start(c){c.enqueue(new TextEncoder().encode('{"x":"'));c.enqueue(new Uint8Array(25000));c.close()}}),duplex:'half'})),413);
await expect(await invalid.route.GET(),405);assert.equal(invalid.messages.length,0);assert.deepEqual(invalid.logs,[]);
console.log('PASS escape, inyección, tipos, límites por campo/body y rechazo antes de SMTP');

const trap=setup();await expect(await trap.route.POST(request({...valid,website:'bot.example'})),200,true);assert.equal(trap.messages.length,0);
await expect(await setup({env:{}}).route.POST(request()),503);
const fail=setup({send:()=>Promise.reject(new Error('Private SMTP details'))});await expect(await fail.route.POST(request()),502);assert.deepEqual(fail.logs,[]);
await expect(await setup({send:()=>Promise.resolve({accepted:[],rejected:['owner@example.com']})}).route.POST(request()),502);
const timed=setup({send:()=>new Promise(()=>{}),fastTimers:true});await expect(await timed.route.POST(request()),502);assert(timed.destroyed()>0);
const slow=setup({fastTimers:true});await expect(await slow.route.POST(new Request('http://localhost/api/contacto',{method:'POST',headers:{'content-type':'application/json'},body:new ReadableStream({}),duplex:'half'})),408);
console.log('PASS honeypot, falta de configuración, errores privados y deadlines de body/SMTP');

const limit=setup();for(let i=0;i<20;i++)await expect(await limit.route.POST(request()),200,true);
await expect(await limit.route.POST(request()),429);assert.equal(limit.messages.length,20);
const releases=[];const concurrent=setup({send:()=>new Promise(resolve=>releases.push(resolve))});
const first=concurrent.route.POST(request());const second=concurrent.route.POST(request());
await new Promise(resolve=>setTimeout(resolve,10));await expect(await concurrent.route.POST(request()),429);
releases.forEach(resolve=>resolve({accepted:['owner@example.com'],rejected:[]}));await expect(await first,200,true);await expect(await second,200,true);
console.log('PASS límite por instancia y concurrencia sin IP/datos personales');

/* Ejecutar con PLAYWRIGHT_PATH apuntando al paquete Playwright del entorno. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_PATH ? pathToFileURL(`${process.env.PLAYWRIGHT_PATH}/index.mjs`).href : 'playwright');
const base = process.env.QA_URL || 'http://localhost:3000';
const output = process.env.QA_OUTPUT || 'qa-proyectos';
fs.mkdirSync(output, { recursive: true });

async function run(type) {
  const browser = await type.launch(type === chromium ? { channel: 'chrome' } : {});
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const title = () => page.locator('#proyecto-destacado h2').innerText();
    const progress = () => page.locator('[class*="progressBar"]').evaluate(e => new DOMMatrix(getComputedStyle(e).transform).a);
    await page.goto(`${base}/es/proyectos`, { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Proyecto siguiente', exact: true }).tap();
    assert.equal(await title(), 'La Baranda');
    await page.waitForTimeout(700);
    const p0 = await progress();
    await page.waitForTimeout(900);
    assert((await progress()) > p0 + .05, 'El toque no debe bloquear la barra');
    await page.getByRole('button', { name: 'Pausar proyectos', exact: true }).tap();
    const paused = await progress();
    await page.waitForTimeout(650);
    assert(Math.abs((await progress()) - paused) < .015);
    await page.getByRole('button', { name: 'Reanudar proyectos', exact: true }).tap();
    await page.waitForTimeout(650);
    assert((await progress()) > paused, 'Reanudar conserva y continúa el tiempo');
    await page.getByRole('button', { name: 'Proyecto anterior', exact: true }).tap();
    assert.equal(await title(), 'Index Clima');
    assert((await progress()) < .08, 'Flechas reinician el tiempo');
    const inicio = Date.now();
    await page.waitForFunction(() => document.querySelector('#proyecto-destacado h2').textContent === 'La Baranda', null, { timeout: 11000 });
    assert(Date.now() - inicio >= 7300, 'No avanzar antes de completar los ocho segundos');
    assert((await progress()) < .1, 'Barra y avance sincronizados');
    await page.getByRole('button', { name: 'Pausar proyectos', exact: true }).tap();

    for (const viewport of [{width:320,height:740},{width:375,height:812},{width:390,height:844},{width:430,height:932},{width:844,height:390},{width:768,height:1024},{width:1440,height:1000}]) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(250);
      const result = await page.evaluate(() => {
        const root = document.documentElement;
        const media = [...document.querySelectorAll('#proyecto-destacado picture, #listado-proyectos picture')].map(e => ({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}));
        const controls = [...document.querySelectorAll('#proyecto-destacado button')].map(e=>e.getBoundingClientRect().width);
        return {overflow:root.scrollWidth>innerWidth,media,controls};
      });
      assert(!result.overflow, `${type.name()} overflow ${viewport.width}`);
      assert(result.media.every(r=>r.width>0&&r.height>100), 'Las imágenes no colapsan en Safari');
      assert(result.controls.every(w=>w>=44), 'Controles táctiles de 44px');
      console.log(type.name(), viewport.width, viewport.height, 'layout OK');
    }
    await page.setViewportSize({width:390,height:844});
    await page.getByRole('button',{name:'Mostrar Index Clima',exact:true}).tap();
    await page.waitForTimeout(700);
    const image = page.locator('#proyecto-destacado picture img');
    await image.evaluate(e => e.decode());
    const imageUrl = await image.evaluate(e=>e.currentSrc);
    assert(imageUrl.includes('/_next/image?'), 'Se debe servir la imagen optimizada');
    const response = await context.request.get(imageUrl, {headers:{accept:'image/webp'}});
    const size = (await response.body()).length;
    assert(size < 1000000, 'La imagen optimizada debe pesar menos de 1MB');
    console.log(type.name(), 'mobile image bytes', size);

    if (type === chromium) {
      const cdp = await context.newCDPSession(page);
      async function swipe(dx, dy) {
        await page.locator('#proyecto-destacado picture').scrollIntoViewIfNeeded();
        await page.waitForTimeout(700);
        const r = await page.locator('#proyecto-destacado picture').boundingBox();
        const x=r.x+r.width*.5,y=Math.max(150,r.y+Math.min(250,r.height*.6));
        await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
        for(let i=1;i<=8;i++){
          await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*i/8,y:y+dy*i/8}]});
          await page.waitForTimeout(25);
        }
        await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
        await page.waitForTimeout(750);
      }
      await swipe(-130,8); assert.equal(await title(),'La Baranda');
      await swipe(130,8); assert.equal(await title(),'Index Clima');
      await swipe(8,-140); assert.equal(await title(),'Index Clima','Scroll vertical no cambia proyecto');
      assert.equal(new URL(page.url()).pathname,'/es/proyectos','Swipe no navega un enlace');
      console.log('chromium trusted touch swipes OK');
    }

    await page.emulateMedia({reducedMotion:'reduce'});
    await page.getByRole('button',{name:'Proyecto siguiente',exact:true}).tap();
    await page.waitForTimeout(100);
    assert.equal(await title(),'La Baranda','Reduced motion conserva la navegación');
    assert.equal(await page.locator('[class*="progressTrack"]').count(),0);
    await page.locator('#proyecto-destacado').screenshot({path:`${output}/${type.name()}-mobile.png`,scale:'css'});
    await page.locator('#proyecto-destacado').getByRole('link',{name:/^Ver proyecto /}).tap();
    await page.waitForURL('**/es/proyectos/la-baranda');
    await page.goto(`${base}/es/proyectos`);
    const link=page.locator('#listado-proyectos').getByRole('link').first();
    await link.tap();await page.waitForURL('**/es/proyectos/index-clima');

    // Safari puede denegar almacenamiento: debe seguir montando e interactuando.
    await page.addInitScript(()=>{Storage.prototype.getItem=()=>{throw new DOMException('Blocked','SecurityError')};Storage.prototype.setItem=()=>{throw new DOMException('Blocked','SecurityError')};});
    await page.setViewportSize({width:1440,height:1000});
    await page.goto(`${base}/en/proyectos`);
    await page.getByRole('button',{name:'Ver proyectos en tarjetas'}).tap();
    assert.equal(await page.getByRole('button',{name:'Ver proyectos en tarjetas'}).getAttribute('aria-pressed'),'true');
    assert.deepEqual(errors,[]);
    console.log(type.name(), 'PASS interactions, autoplay, reduced motion, links, storage');
  } finally { await browser.close(); }
}
(async()=>{await run(webkit);await run(chromium);})().catch(e=>{console.error(e);process.exitCode=1;});

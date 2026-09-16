import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_PATH ? pathToFileURL(`${process.env.PLAYWRIGHT_PATH}/index.mjs`).href : 'playwright');
const base = process.env.QA_URL || 'http://localhost:3000';
const output = process.env.QA_OUTPUT || 'qa-proyectos';
fs.mkdirSync(output, { recursive: true });

async function hitbox(locator) {
  await locator.scrollIntoViewIfNeeded();
  const result = await locator.evaluate(e => {
    const r=e.getBoundingClientRect();
    const points=[[.5,.5],[.15,.15],[.85,.15],[.15,.85],[.85,.85]];
    return {width:r.width,height:r.height,points:points.map(([x,y])=>{
      const hit=document.elementFromPoint(r.left+r.width*x,r.top+r.height*y);
      return {ok:hit===e||e.contains(hit),stack:document.elementsFromPoint(r.left+r.width*x,r.top+r.height*y).slice(0,4).map(n=>n.tagName+'.'+n.className)};
    })};
  });
  assert(result.points.every(p=>p.ok), JSON.stringify(result));
  return result;
}

async function run(type) {
  const browser=await type.launch(type===chromium?{channel:'chrome'}:{});
  try {
    const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    const page=await context.newPage();
    const errors=[],failed=[],documents=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('websocket',ws=>ws.on('socketerror',error=>errors.push(String(error))));
    page.on('response',r=>{if(r.status()>=400&&r.url().includes('/_next/'))failed.push([r.status(),r.url()])});
    page.on('request',r=>{if(r.resourceType()==='document')documents.push(r.url())});
    const go=async route=>{await page.goto(base+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(700)};
    const menu=page.locator('header button[aria-controls]');
    for(const route of ['/es','/es/proyectos','/es/soluciones','/es/nosotros','/es/contacto','/en']) {
      await go(route);
      for(const scroll of [0,900]) {
        await page.evaluate(y=>window.scrollTo(0,y),scroll);
        await hitbox(menu);
        await menu.tap(); assert.equal(await menu.getAttribute('aria-expanded'),'true',`${route} abrir`);
        await page.waitForTimeout(550);
        await hitbox(menu);
        await menu.tap(); assert.equal(await menu.getAttribute('aria-expanded'),'false',`${route} cerrar`);
        assert.equal(await page.locator('body').evaluate(e=>e.style.overflow),'');
      }
    }
    await go('/es');
    for(let i=0;i<3;i++) {
      const before=documents.length;
      await menu.tap();
      await page.waitForTimeout(550);
      await page.locator('nav a[href="/es/proyectos"]').first().tap({position:{x:24,y:24}});
      await page.waitForURL('**/es/proyectos');
      assert.equal(await menu.getAttribute('aria-expanded'),'false');
      assert.equal(documents.length,before,'Navegar con Link no carga otro documento');
      await menu.tap(); await page.locator('nav').getByRole('link',{name:'Alred, inicio'}).tap();
      await page.waitForURL('**/es');
      assert.equal(await menu.getAttribute('aria-expanded'),'false');
    }
    await menu.tap(); await page.setViewportSize({width:1000,height:844});
    assert.equal(await page.locator('body').evaluate(e=>e.style.overflow),'','Rotar libera el scroll');
    await page.setViewportSize({width:390,height:844});
    await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'),'false');
    assert(await menu.evaluate(e=>e===document.activeElement));
    const closed=page.locator('nav [aria-hidden="true"][inert]');
    assert.equal(await closed.count(),1);
    console.log(type.name(),'Header: hitboxes, scroll, rutas, orientación, Escape OK');

    const home=page.locator('#proyectos');
    const title=()=>home.locator('[data-position="activo"] h3').innerText();
    const progress=()=>home.locator('[class*="projectTimerValue"]').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).a);
    await home.scrollIntoViewIfNeeded();
    await home.getByRole('button',{name:'Mostrar Index Clima',exact:true}).tap();
    await page.waitForTimeout(700);
    for(const name of ['Proyecto siguiente','Proyecto anterior']) {
      const control=home.getByRole('button',{name,exact:true}); const r=await hitbox(control);
      assert(r.width>=44&&r.height>=44); await control.tap();
    }
    assert.equal(await title(),'Index Clima');
    const p0=await progress();await page.waitForTimeout(1000);assert(await progress()>p0+.08);
    const old=await title(); const start=Date.now();
    await home.getByRole('button',{name:'Mostrar Index Clima',exact:true}).tap();
    await page.waitForFunction(()=>document.querySelector('#proyectos [data-position="activo"] h3').textContent!=='Index Clima',null,{timeout:11000});
    assert(Date.now()-start>=7300);assert(await progress()<.15);
    await home.getByRole('button',{name:'Mostrar Index Clima',exact:true}).tap();
    await page.waitForTimeout(1000);
    const saved=await progress();await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(700);
    const hidden=await progress();assert(hidden>=saved&&hidden<saved+.1);
    await page.waitForTimeout(800);assert(Math.abs(await progress()-hidden)<.02);
    await home.scrollIntoViewIfNeeded();await page.waitForTimeout(700);assert(await progress()>hidden);
    assert.equal(await title(),old);
    console.log(type.name(),'Home: autoplay 8s, progreso y pausa fuera de pantalla OK');

    for(const width of [320,375,390,430,768,1024,1440]) {
      await page.setViewportSize({width,height:1000});
      await home.scrollIntoViewIfNeeded();await page.waitForTimeout(100);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow ${width}`);
      for(const button of await home.locator('[class*="pagination"] button, [class*="controls"] button').all()) {
        const r=await hitbox(button);assert(r.width>=44&&r.height>=44);
      }
      if([390,1440].includes(width))await home.screenshot({path:`${output}/home-${type.name()}-${width}.png`});
    }
    await page.setViewportSize({width:390,height:844});
    if(type===chromium) {
      const cdp=await context.newCDPSession(page);
      async function swipe(dx,dy,cancel=false) {
        const card=home.locator('[data-position="activo"]');await card.scrollIntoViewIfNeeded();await page.waitForTimeout(700);
        const r=await card.boundingBox();const x=r.x+r.width/2,y=Math.max(160,r.y+r.height/2);
        const scrollY=await page.evaluate(()=>window.scrollY);
        await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
        for(let i=1;i<=8;i++){
          await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*i/8,y:y+dy*i/8}]});
          await page.waitForTimeout(25);
        }
        if(Math.abs(dx)>Math.abs(dy)&&!cancel) {
          const shift=await card.locator('[class*="cardVisual"]').evaluate(e=>parseFloat(getComputedStyle(e).translate));
          assert(Math.abs(shift)>1,'Respuesta visual antes de soltar el dedo');
        }
        await cdp.send('Input.dispatchTouchEvent',{type:cancel?'touchCancel':'touchEnd',touchPoints:[]});
        await page.waitForTimeout(750);
        assert.equal(new URL(page.url()).pathname,'/es','Un swipe no debe abrir el enlace');
        if(Math.abs(dy)>Math.abs(dx))assert(Math.abs(await page.evaluate(()=>window.scrollY)-scrollY)>20,'Scroll vertical real');
      }
      await home.getByRole('button',{name:'Mostrar Index Clima',exact:true}).tap();
      await swipe(-120,5);assert.notEqual(await title(),'Index Clima');
      await swipe(120,5);assert.equal(await title(),'Index Clima');
      await swipe(-30,0);assert.equal(await title(),'Index Clima','Arrastre corto');
      await swipe(-120,0,true);assert.equal(await title(),'Index Clima','Cancelación');
      await swipe(5,-140);assert.equal(await title(),'Index Clima','Scroll');
      console.log('chromium Home: touch nativo, arrastre visual, cancelación y scroll OK');
    }
    await home.getByRole('button',{name:'Mostrar Index Clima',exact:true}).tap();
    await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(150);
    assert.equal(await home.locator('[class*="projectTimer"]').count(),0);
    await home.getByRole('button',{name:'Proyecto siguiente',exact:true}).tap();assert.notEqual(await title(),'Index Clima');
    await home.getByRole('button',{name:'Mostrar Index Clima',exact:true}).tap();
    const link=home.locator('[data-position="activo"] > a');
    await link.evaluate(e=>e.scrollIntoView({block:'center'}));
    await hitbox(link);
    assert.equal(await link.locator('a,button,input').count(),0,'Sin interactivos anidados');
    const before=documents.length;await link.tap({position:{x:40,y:160}});
    await page.waitForURL('**/es/proyectos/index-clima');assert.equal(documents.length,before);
    await page.goBack();await page.waitForURL('**/es');
    await menu.tap();assert.equal(await menu.getAttribute('aria-expanded'),'true');await menu.tap();
    assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
    console.log(type.name(),'PASS',base,'menú, Home, navegación, reduced motion, recursos y consola');
    await context.close();

    const desktop=await browser.newPage({viewport:{width:1440,height:1000}});
    await desktop.goto(base+'/es',{waitUntil:'domcontentloaded'});await desktop.waitForTimeout(700);
    const keyboardMenu=desktop.locator('header button[aria-controls]');await keyboardMenu.focus();
    await desktop.keyboard.press('Enter');assert.equal(await keyboardMenu.getAttribute('aria-expanded'),'true');
    await desktop.keyboard.press('Escape');assert.equal(await keyboardMenu.getAttribute('aria-expanded'),'false');
    const carousel=desktop.locator('#proyectos [role="region"]');await carousel.focus();
    const current=await desktop.locator('#proyectos [data-position="activo"] h3').innerText();
    await desktop.keyboard.press('ArrowRight');assert.notEqual(await desktop.locator('#proyectos [data-position="activo"] h3').innerText(),current);
    const next=desktop.locator('#proyectos').getByRole('button',{name:'Proyecto siguiente',exact:true});await next.focus();await desktop.keyboard.press('Enter');assert(await next.evaluate(e=>e===document.activeElement));
    await desktop.locator('#proyectos').getByRole('button',{name:'Proyecto anterior',exact:true}).click();
    console.log(type.name(),'desktop: mouse, teclado y foco estable OK');
  } finally {await browser.close()}
}
await run(chromium);
await run(webkit);

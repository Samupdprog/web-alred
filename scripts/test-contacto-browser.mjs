// Prueba del formulario existente con respuesta HTTP simulada, sin SMTP.
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_PATH
  ? pathToFileURL(`${process.env.PLAYWRIGHT_PATH}/index.mjs`).href : 'playwright');
const base = process.env.QA_URL || 'http://localhost:3000';
for (const type of [chromium, webkit]) {
  const browser = await type.launch(type === chromium ? { channel:'chrome' } : {});
  try {
    const page = await browser.newPage({ viewport:{width:390,height:844},isMobile:true,hasTouch:true });
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for (const locale of ['es','en']) {
      let payload, fail=true;
      await page.route('**/api/contacto',async route=>{
        payload=route.request().postDataJSON();
        await route.fulfill({status:fail?502:200,contentType:'application/json',body:JSON.stringify({ok:!fail})});
      });
      await page.goto(`${base}/${locale}/contacto`,{waitUntil:'domcontentloaded'});
      await page.waitForTimeout(700);
      const form=page.locator('form');
      await form.locator('[name=nombre]').tap();
      await form.locator('[name=nombre]').pressSequentially('Prueba');
      await form.locator('[name=telefono]').fill('+34 600 000 000');
      await form.locator('[name=correo]').fill('visitante@example.com');
      await form.locator('[name=necesidad]').selectOption('web');
      await form.locator('[name=mensaje]').fill('Mensaje ficticio para comprobar el contrato del formulario.');
      // El checkbox es visualmente personalizado; tocar su label es la interacción real.
      await page.locator('label:has(input[name=privacidad]) > span[aria-hidden=true]').tap();
      assert.equal(await form.locator('[name=privacidad]').isChecked(),true);
      await form.locator('[type=submit]').tap();
      try { await form.locator('[role=status]').waitFor({timeout:5000}); }
      catch (error) {
        console.error(type.name(),locale,'campos inválidos',await form.locator('[aria-invalid=true]').evaluateAll(elements=>elements.map(e=>e.getAttribute('name'))),'envío recibido',Boolean(payload));
        await page.screenshot({path:`qa-proyectos/contacto-fallo-${type.name()}.png`});
        throw error;
      }
      assert.equal(payload.locale,locale);assert.equal(payload.website,'');assert.equal(payload.privacidadLeida,true);
      assert.equal(await form.locator('[name=nombre]').inputValue(),'Prueba','Conservar datos si SMTP falla');
      fail=false;
      await form.locator('[type=submit]').tap();
      await page.waitForFunction(()=>document.querySelector('form [name=nombre]')?.value==='');
      assert.equal(await form.locator('[name=privacidad]').isChecked(),false);
      await page.unroute('**/api/contacto');
    }
    assert.deepEqual(errors,[]);
    console.log(type.name(),'PASS formulario ES/EN: contrato, honeypot, privacidad, fallo y éxito');
  } finally { await browser.close(); }
}

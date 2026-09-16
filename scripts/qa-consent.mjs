import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const { chromium } = await import(
  process.env.PLAYWRIGHT_PATH
    ? pathToFileURL(`${process.env.PLAYWRIGHT_PATH}/index.mjs`).href
    : "playwright"
);

const base = process.env.QA_URL || "http://localhost:3000";
const storageKey = "alred-consent";
const analyticsRequest = /google-analytics|googletagmanager|clarity\.ms|\.clarity/i;

async function clearStorage(page) {
  await page.evaluate((key) => {
    localStorage.removeItem(key);
    document.cookie.split(";").forEach((part) => {
      const name = part.split("=")[0]?.trim();
      if (name) document.cookie = `${name}=; Max-Age=0; path=/`;
    });
  }, storageKey);
}

async function openPage(context, locale) {
  const page = await context.newPage();
  const requests = [];
  page.on("request", request => {
    if (analyticsRequest.test(request.url())) requests.push(request.url());
  });
  await page.goto(`${base}/${locale}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  return { page, requests };
}

const browser = await chromium.launch({ channel: "chrome" });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });

  for (const locale of ["es", "en"]) {
    const { page, requests } = await openPage(context, locale);
    await clearStorage(page);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    const accept = locale === "es" ? "Aceptar" : "Accept";
    const reject = locale === "es" ? "Rechazar" : "Reject";
    assert.equal(requests.length, 0, `${locale}: analytics loaded before consent`);
    assert.equal(await page.getByRole("button", { name: accept }).count(), 1);
    assert.equal(await page.getByRole("button", { name: reject }).count(), 1);

    await page.getByRole("button", { name: reject }).click();
    assert.equal(JSON.parse(await page.evaluate(key => localStorage.getItem(key), storageKey)).analytics, false);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    assert.equal(requests.length, 0, `${locale}: analytics loaded after rejection`);
    await page.close();
  }

  const accepted = await openPage(context, "es");
  await clearStorage(accepted.page);
  await accepted.page.reload({ waitUntil: "domcontentloaded" });
  await accepted.page.getByRole("button", { name: "Aceptar" }).click();
  await accepted.page.waitForTimeout(1200);
  assert.equal(JSON.parse(await accepted.page.evaluate(key => localStorage.getItem(key), storageKey)).analytics, true);
  assert(accepted.requests.some(url => url.includes("googletagmanager.com")), "Google Analytics did not load after acceptance");
  assert(accepted.requests.some(url => url.includes("clarity.ms")), "Microsoft Clarity did not load after acceptance");

  await accepted.page.locator("[data-open-cookie-settings]").scrollIntoViewIfNeeded();
  await accepted.page.locator("[data-open-cookie-settings]").click();
  await accepted.page.getByRole("switch").click();
  await accepted.page.getByRole("button", { name: "Guardar preferencias" }).click();
  assert.equal(JSON.parse(await accepted.page.evaluate(key => localStorage.getItem(key), storageKey)).analytics, false);
  await accepted.page.reload({ waitUntil: "domcontentloaded" });
  await accepted.page.waitForTimeout(500);
  assert.equal(JSON.parse(await accepted.page.evaluate(key => localStorage.getItem(key), storageKey)).analytics, false);
  await accepted.page.close();

  await context.close();
  console.log("QA consent: PASS ES/EN, no pre-consent requests, accept, reject, persistence and withdrawal");
} finally {
  await browser.close();
}

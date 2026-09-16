import assert from "node:assert/strict";

const baseUrl = new URL(process.env.QA_URL ?? "http://localhost:3000");
const seeds = ["/es", "/en"];
const ignoredSchemes = /^(?:mailto:|tel:|javascript:|data:|#)/i;
const internalLocalePath = /^\/(?:es|en)(?:\/|$)/;
const visited = new Set();
const queue = [...seeds];
const failures = [];
const discovered = new Set(seeds);

function resolveLink(href, source) {
  if (!href || ignoredSchemes.test(href)) return null;

  const url = new URL(href, new URL(source, baseUrl));
  if (url.origin !== baseUrl.origin) return null;

  url.hash = "";
  url.search = "";
  return url.pathname || "/";
}

function linksFromHtml(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi)]
    .map(match => match[1]);
}

while (queue.length > 0) {
  const path = queue.shift();
  if (visited.has(path)) continue;
  visited.add(path);

  const url = new URL(path, baseUrl);
  let response;
  let html = "";

  try {
    response = await fetch(url);
    html = await response.text();
  } catch (error) {
    failures.push({ path, error: String(error) });
    continue;
  }

  if (!response.ok) {
    failures.push({ path, status: response.status });
    continue;
  }

  for (const href of linksFromHtml(html)) {
    const target = resolveLink(href, path);
    if (!target) continue;

    discovered.add(target);
    if (!internalLocalePath.test(target)) {
      failures.push({ path, href, error: "internal link without locale" });
      continue;
    }

    if (!visited.has(target)) queue.push(target);
  }
}

console.log(`QA links: ${visited.size} pages checked, ${discovered.size} internal paths discovered`);
if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
} else {
  console.log("QA links: PASS");
}

assert.equal(failures.length, 0);

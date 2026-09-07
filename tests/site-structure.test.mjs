import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const viteConfig = await readFile(new URL("../vite.config.js", import.meta.url), "utf8");
const workflow = await readFile(new URL("../.github/workflows/static.yml", import.meta.url), "utf8");
const main = await readFile(new URL("../src/main.js", import.meta.url), "utf8");
const marijuanaParaphernalia = await readFile(
  new URL("../src/features/marijuana-paraphernalia.js", import.meta.url),
  "utf8",
);

test("site has one accessible application entry point", () => {
  assert.match(html, /<main[^>]+id="main-content"/);
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /<script type="module" src="\/src\/main\.js"><\/script>/);
  assert.equal((html.match(/id="root"/g) || []).length, 1);
});

test("static case-law directory remains present", () => {
  for (const label of [
    "II. Detention & Arrest",
    "III. Criminal Liability",
    "IV. Search & Seizure",
    "VI. Post‑Arrest Procedures",
  ]) {
    assert.ok(html.includes(label), `${label} is present`);
  }
});

test("local references point to existing build inputs", async () => {
  await assert.doesNotReject(() => readFile(new URL("../src/main.js", import.meta.url), "utf8"));
  await assert.doesNotReject(() => readFile(new URL("../src/styles/main.css", import.meta.url), "utf8"));
});

test("deployment paths and social metadata are production-safe", async () => {
  assert.match(viteConfig, /base:\s*["']\.\/["']/);
  assert.match(workflow, /run:\s*pnpm check/);
  assert.match(workflow, /path:\s*dist/);
  assert.match(html, /property="og:image" content="https:\/\/.+\/og\.png"/);
  await assert.doesNotReject(() => readFile(new URL("../public/og.png", import.meta.url)));
});

test("marijuana workflow includes the paraphernalia multi-select", () => {
  assert.match(main, /features\/marijuana-paraphernalia\.js/);
  assert.match(marijuanaParaphernalia, /Was drug paraphernalia located\?/);
  for (const option of ["Scales", "Baggies", "Pipes", "Evidence of distribution", "Other"]) {
    assert.ok(marijuanaParaphernalia.includes(`"${option}"`), `${option} option is present`);
  }
  assert.match(marijuanaParaphernalia, /aria-pressed/);
  assert.match(marijuanaParaphernalia, /state\.selected\.has\("Other"\)/);
  assert.match(marijuanaParaphernalia, /marijuana-paraphernalia__other/);
});

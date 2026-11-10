#!/usr/bin/env node
/* Browser test for every module: works through each activity (and each Challenge) using the module's own answers,
   tries a wrong answer, checks the completion and challenge codes unlock and survive a reload, that there are no
   script errors, and that the page doesn't scroll sideways on a phone. Screenshots go to tests/.shots/.

   Usage: node scripts/build.js && node tests/run.js [module numbers…]   e.g. node tests/run.js 1 11 */
"use strict";
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const course = JSON.parse(fs.readFileSync(path.join(ROOT, "build/course.json"), "utf8"));
const Text = require(path.join(ROOT, "docs/assets/course.js"));
const SHOTS = path.join(__dirname, ".shots");
fs.mkdirSync(SHOTS, { recursive: true });
const only = process.argv.slice(2).map(Number).filter(Boolean);
const typed = (a) => String(a).split("|")[0].replace(/^[!~#]/, "");

function chosenIdx(t, list, vary) {
  const n = list.length;
  if (!t.pick || t.pick >= n) return [...Array(n).keys()];
  return vary["pick:" + t.id];
}
async function isMarked(loc, cls) { return loc.evaluate((e, c) => e.classList.contains(c), cls); }

async function solveTask(p, t, vary, log) {
  const card = p.locator("#task-" + t.id);
  const check = card.locator(".row button.primary").first();
  const items = t.items || [];
  switch (t.type) {
    case "mc": await card.locator('.choice[data-right="1"]').click(); return;
    case "quiz": case "read": {
      const qs = card.locator(".quiz-q");
      for (let q = 0; q < await qs.count(); q++) {
        const wrong = qs.nth(q).locator('.choice[data-right="0"]');
        if (q === 0 && await wrong.count()) { await wrong.first().click(); if (!(await isMarked(wrong.first(), "wrong"))) log.push(`${t.id}: wrong choice not marked`); }
        await qs.nth(q).locator('.choice[data-right="1"]').click();
      }
      return;
    }
    case "cloze": {
      const answers = [];
      chosenIdx(t, items, vary).forEach((i) => Text.clozeParts(Text.itemText(items[i])).forEach((part) => { if (part.answers) answers.push(typed(part.answers[0])); }));
      const inputs = card.locator("input.es-in");
      if (await inputs.count() !== answers.length) log.push(`cloze ${t.id}: ${await inputs.count()} boxes but ${answers.length} answers`);
      await inputs.nth(0).fill("999999"); await check.click();
      if (!(await isMarked(inputs.nth(0), "bad"))) log.push(`cloze ${t.id}: wrong answer not marked`);
      for (let k = 0; k < answers.length; k++) await inputs.nth(k).fill(answers[k]);
      break;
    }
    case "solve": {
      const idx = chosenIdx(t, items, vary);
      const inputs = card.locator("input.es-in");
      // Two wrong tries on the first problem: it turns red, and its "Show me how" appears.
      await inputs.nth(0).fill("999999"); await check.click(); await check.click();
      if (!(await isMarked(inputs.nth(0), "bad"))) log.push(`solve ${t.id}: wrong answer not marked`);
      if (items[idx[0]].how && !(await card.locator(".item").nth(0).locator(".how").count())) log.push(`solve ${t.id}: no Show me how after two misses`);
      for (let k = 0; k < idx.length; k++) await inputs.nth(k).fill(typed(items[idx[k]].a));
      break;
    }
    case "select": {
      const groups = card.locator(".pick");
      for (let k = 0; k < await groups.count(); k++) await groups.nth(k).locator('button[data-o="0"]').click();
      break;
    }
    case "match": {
      for (const i of chosenIdx(t, t.pairs, vary)) {
        await card.locator(".match .col").nth(0).locator(`button[data-k="${i}"]`).click();
        await card.locator(".match .col").nth(1).locator(`button[data-k="${i}"]`).click();
      }
      return;
    }
    case "sort": {
      const rows = card.locator(".sort-row");
      for (let k = 0; k < await rows.count(); k++) {
        const i = Number(await rows.nth(k).getAttribute("data-i"));
        await rows.nth(k).locator(".seg button").nth(items[i][1]).click();
      }
      break;
    }
    case "order": {
      const boxes = card.locator(".builder");
      const idx = chosenIdx(t, items, vary);
      for (let k = 0; k < idx.length; k++) {
        for (const w of Text.tokens(items[idx[k]].a).words) await boxes.nth(k).locator(`.tiles:not(.answer) .tile[data-w=${JSON.stringify(w)}]`).first().click();
      }
      break;
    }
    case "steps": {
      for (let k = 0; k < items.length; k++) await card.locator(`.steplist:not(.chosen) .stepbtn[data-i="${k}"]`).click();
      break;
    }
    case "grid": {
      for (const ti of chosenIdx(t, t.tables, vary)) {
        const tb = t.tables[ti];
        for (let ri = 0; ri < tb.rows.length; ri++) for (let ci = 0; ci < tb.rows[ri].length - 1; ci++) {
          const ans = tb.rows[ri][ci + 1];
          if (ans == null || ans === "") continue;
          const inp = p.locator(`#g-${t.id}-${ti}-${ri}-${ci}`);
          if (!(await inp.isDisabled())) await inp.fill(typed(ans));
        }
      }
      break;
    }
    case "mistake": {
      const rows = card.locator(".item");
      const idx = chosenIdx(t, items, vary);
      for (let k = 0; k < idx.length; k++) {
        const it = items[idx[k]];
        const wrongLine = (it.bad + 1) % it.lines.length;
        await rows.nth(k).locator(`.workline[data-l="${wrongLine}"]`).click();
        if (await isMarked(rows.nth(k).locator(`.workline[data-l="${wrongLine}"]`), "hit")) log.push(`mistake ${t.id}: a correct line was accepted`);
        await rows.nth(k).locator(`.workline[data-l="${it.bad}"]`).click();
        if (it.a) await rows.nth(k).locator("input.es-in").fill(typed(it.a));
      }
      break;
    }
    case "plot": {
      const rows = card.locator(".item");
      const idx = chosenIdx(t, items, vary);
      for (let k = 0; k < idx.length; k++) {
        const it = items[idx[k]], xr = it.x || [-6, 6], yr = it.y || [-6, 6];
        let pts = it.points;
        if (!pts) {
          pts = [];
          const vx = it.line && /^x\s*=/.test(it.line) ? Text.value(it.line.split("=")[1]) : null;
          const f = it.fn ? Text.fnOf(it.fn) : null;
          for (let x = xr[0]; x <= xr[1] && pts.length < (it.need || 2); x++) {
            if (vx != null) { pts.push([vx, yr[0] + pts.length + 1]); continue; }
            const y = Math.round(f(x) * 1e9) / 1e9;
            if (Number.isInteger(y) && y >= yr[0] && y <= yr[1]) pts.push([x, y]);
          }
        }
        for (const [x, y] of pts) {
          const svg = rows.nth(k).locator("svg.tap");
          await svg.evaluate((e) => e.scrollIntoView({ block: "center" }));
          const box = await svg.boundingBox();
          const a = await svg.evaluate((e) => ({ W: +e.dataset.w, H: +e.dataset.h, pad: +e.dataset.pad, cx: +e.dataset.cx, cy: +e.dataset.cy, xlo: +e.dataset.xlo, yhi: +e.dataset.yhi }));
          await p.mouse.click(box.x + (a.pad + (x - a.xlo) * a.cx) * box.width / a.W, box.y + (a.pad + (a.yhi - y) * a.cy) * box.height / a.H);
        }
      }
      break;
    }
    case "selfcheck": return;
  }
  await check.click();
}

(async () => {
  const b = await chromium.launch();
  let failures = 0;
  for (const [mi, m] of course.modules.entries()) {
    if (only.length && !only.includes(m.num)) continue;
    const key = "m" + String(m.num).padStart(2, "0");
    const log = [];
    const ctx = await b.newContext({ viewport: { width: 820, height: 1180 }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    const errs = [];
    p.on("pageerror", (e) => errs.push(e.message));
    p.on("console", (msg) => { if (msg.type() === "error" && !/ERR_FILE_NOT_FOUND|net::ERR_FAILED|fonts/.test(msg.text())) errs.push(msg.text()); });
    await p.route("https://fonts.**", (r) => r.abort());
    await p.goto("file://" + path.join(ROOT, "docs", course.pages[mi]));
    await p.waitForSelector("#check-card");
    const vary = await p.evaluate(() => (Course.state.extra.vary || {}));
    if (await p.locator("text=[missing graph").count()) log.push("a graph is missing");

    for (const t of m.tasks) {
      if (t.optional || t.type === "selfcheck") continue;
      try { await solveTask(p, t, vary, log); } catch (e) { log.push(`task ${t.id}: ${e.message.split("\n")[0]}`); }
      if (!(await p.evaluate((id) => !!Course.state.done[id], t.id))) log.push(`task ${t.id} (${t.type}) not marked done`);
    }
    // Build: the model writing must meet its own requirements.
    await p.fill("#build-text", Text.plain(m.build.model || "").length ? m.build.model.replace(/\*\*/g, "") : "");
    if (!(await p.evaluate(() => !!Course.state.done.build))) {
      const notMet = await p.$$eval("#task-build .status-list li:not(.done)", (els) => els.map((e) => e.textContent));
      log.push("build: model doesn't meet requirements: " + notMet.join(" / "));
    }
    await p.fill("#reflect-draft", "This is a test reflection that is long enough to count as a real draft.");
    const want = course.checks[key] && course.checks[key].code;
    const code = (await p.textContent("#code-badge")).trim();
    if (code !== want) log.push(`completion code shows "${code}", expected "${want}"`);
    // Challenges are optional, but each must be solvable and unlock the star code.
    for (const t of m.challenge || []) {
      try { await solveTask(p, t, vary, log); } catch (e) { log.push(`challenge ${t.id}: ${e.message.split("\n")[0]}`); }
      if (!(await p.evaluate((id) => !!Course.state.star[id], t.id))) log.push(`challenge ${t.id} (${t.type}) not marked solved`);
    }
    const star = (await p.textContent("#star-badge")).trim();
    if (star !== course.checks[key].star) log.push(`challenge code shows "${star}", expected "${course.checks[key].star}"`);
    await p.screenshot({ path: path.join(SHOTS, key + "-light.png"), fullPage: true });
    await p.reload(); await p.waitForSelector("#check-card");
    if ((await p.textContent("#code-badge")).trim() !== want) log.push("completion code lost after reload");
    await p.emulateMedia({ colorScheme: "dark" });
    await p.screenshot({ path: path.join(SHOTS, key + "-dark.png"), fullPage: false });
    await p.setViewportSize({ width: 375, height: 812 });
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    if (sw > 375) log.push(`page scrolls sideways on a phone (${sw}px)`);
    await p.screenshot({ path: path.join(SHOTS, key + "-phone.png"), fullPage: true });
    if (errs.length) log.push("script errors: " + errs.join(" | "));
    await ctx.close();
    if (log.length) { failures++; console.log(`FAIL ${key} ${m.slug}\n  - ` + log.join("\n  - ")); }
    else console.log(`PASS ${key} ${m.slug} (${code}, ${star})`);
  }
  await b.close();
  process.exit(failures ? 1 : 0);
})();

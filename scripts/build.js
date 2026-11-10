#!/usr/bin/env node
/* Build the student site in docs/ from the module content in content/.

   content/units.js       the units, in order
   content/mNN.js         one file per module (lesson content, practice activities, challenges)
   teacher-src/checks.js  completion codes, challenge codes and Blackbaud quizzes (private; not in the public repo)

   Checks every module first: every answer must be readable math, every answer must count as right against itself,
   and wherever a problem gives its equation (eq) or starting expression (from), the answer must really solve it.

   Writes: docs/index.html, docs/mNN-slug.html (one small page per module), docs/modules/mNN.js (module data),
   build/course.json (everything the teacher scripts and the browser test need)

   Usage: node scripts/build.js            (build everything)
          node scripts/build.js --check    (validate only)            */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const Text = require(path.join(ROOT, "docs/assets/course.js"));
const CHECK_ONLY = process.argv.includes("--check");
const TOTAL = 30;

const units = require(path.join(ROOT, "content/units.js"));
let checks = {};
const checksFile = path.join(ROOT, "teacher-src/checks.js");
if (fs.existsSync(checksFile)) checks = require(checksFile);
else console.warn("warning: teacher-src/checks.js not found; completion codes will be blank.");

const files = fs.readdirSync(path.join(ROOT, "content")).filter((f) => /^m\d\d\.js$/.test(f)).sort();
const modules = files.map((f) => require(path.join(ROOT, "content", f)));
const problems = [];
function bad(m, msg) { problems.push(`m${String(m.num).padStart(2, "0")}: ${msg}`); }

/* ---------- validation ---------- */
const TYPES = ["mc", "quiz", "read", "cloze", "select", "match", "sort", "order", "steps", "selfcheck", "grid", "solve", "mistake", "plot"];
function validateChoices(m, where, choices) {
  if (!Array.isArray(choices) || choices.length < 2) return bad(m, `${where}: needs at least 2 choices`);
  const right = choices.filter((c) => c[1]).length;
  if (right !== 1) bad(m, `${where}: has ${right} right answers (needs exactly 1)`);
  const texts = choices.map((c) => Text.plain(c[0]));
  if (new Set(texts).size !== texts.length) bad(m, `${where}: two choices are the same`);
}
// Every accepted answer must be readable and right against itself; eq/from must agree with the first answer.
function checkAnswers(m, where, answers, it) {
  answers.forEach((a) => { const p = Text.answerProblem(a); if (p) bad(m, `${where}: ${p}`); });
  if (!it) return;
  if (it.eq) answers.forEach((a) => { const p = Text.solves(it.eq, a); if (p) bad(m, `${where}: ${p}`); });
  if (it.from) {
    const A = Text.parse(answers[0].replace(/^[!~#]/, "")), F = Text.parse(it.from);
    if (!A || !F) bad(m, `${where}: can't read from "${it.from}"`);
    else if (!Text.equiv(A, F)) bad(m, `${where}: "${answers[0]}" isn't equal to ${it.from}`);
  }
  if (it.wrong) [].concat(it.wrong).forEach((w) => { if (Text.judge(w, answers) === "ok") bad(m, `${where}: the wrong answer "${w}" would be marked right`); });
}
function figsIn(m, x, where) {
  (function scan(v) {
    if (typeof v === "string") {
      (v.match(/%%fig:(.+?)%%/g) || []).forEach((s) => { const k = s.slice(6, -2); if (!m.figs || !m.figs[k]) bad(m, `${where}: no figure named ${k}`); });
      (v.match(/%%nl:(.+?)%%/g) || []).forEach((s) => { if (/\[missing|NaN/.test(Text.numberLine(s.slice(5, -2)))) bad(m, `${where}: can't draw number line ${s}`); });
      (v.match(/\{\{(.+?)\}\}/g) || []).forEach((s) => { if (/\{|\}/.test(s.slice(2, -2))) bad(m, `${where}: braces inside math ${s}`); });
    } else if (Array.isArray(v)) v.forEach(scan);
    else if (v && typeof v === "object") Object.keys(v).forEach((k) => { if (k === "fig" && typeof v[k] === "string" && (!m.figs || !m.figs[v[k]])) bad(m, `${where}: no figure named ${v[k]}`); scan(v[k]); });
  })(x);
}
function validateTask(m, t) {
  const where = `task ${t.id} (${t.type})`;
  if (!TYPES.includes(t.type)) return bad(m, `${where}: unknown type`);
  if (!t.title) bad(m, `${where}: no title`);
  const items = t.items || [];
  const need = (cond, msg) => { if (!cond) bad(m, `${where}: ${msg}`); };
  switch (t.type) {
    case "mc": validateChoices(m, where, t.choices); break;
    case "quiz": case "read":
      need(t.questions && t.questions.length, "no questions");
      (t.questions || []).forEach((q, i) => validateChoices(m, `${where} q${i + 1}`, q.choices));
      break;
    case "cloze": need(items.length, "no items"); items.forEach((it, i) => {
      const parts = Text.clozeParts(Text.itemText(it)).filter((p) => p.answers);
      need(parts.length, `item ${i + 1} has no [blank]`);
      parts.forEach((p, k) => checkAnswers(m, `${where} item ${i + 1}`, p.answers, k === 0 && typeof it === "object" ? it : null));
    }); break;
    case "solve": need(items.length, "no items"); items.forEach((it, i) => {
      need(it.q && it.a != null, `item ${i + 1} needs q and a`);
      checkAnswers(m, `${where} item ${i + 1}`, String(it.a).split("|"), it);
    }); break;
    case "select": need(items.length, "no items"); items.forEach((it, i) => {
      need(!/\{\{\{|\}\}\}/.test(Text.itemText(it)), `item ${i + 1}: don't put {{math}} inside a {choice}; options are shown as math automatically`);
      const parts = Text.pickParts(Text.itemText(it)).filter((p) => p.options);
      need(parts.length, `item ${i + 1} has no {choice|choice}`);
      parts.forEach((p) => { need(p.options.length >= 2, `item ${i + 1} has a choice with one option`); need(new Set(p.options).size === p.options.length, `item ${i + 1} repeats an option`); });
    }); break;
    case "match": need(t.pairs && t.pairs.length >= 3, "needs at least 3 pairs");
      { const L = (t.pairs || []).map((p) => Text.plain(p[0])), Rr = (t.pairs || []).map((p) => Text.plain(p[1]));
        need(new Set(L).size === L.length && new Set(Rr).size === Rr.length, "has duplicate items"); } break;
    case "sort": need(t.cats && t.cats.length >= 2, "needs categories"); items.forEach((it, i) => need(Number.isInteger(it[1]) && it[1] < t.cats.length, `item ${i + 1} has a bad category`)); break;
    case "order": items.forEach((it, i) => { need(it.q && it.a, `item ${i + 1} needs q and a`); need(Text.tokens(it.a).words.length >= 2, `item ${i + 1} is too short`); }); break;
    case "steps": need(items.length >= 3, "needs at least 3 steps"); break;
    case "grid": need(t.tables && t.tables.length, "no tables"); (t.tables || []).forEach((tb, i) => {
      need(tb.cols && tb.rows && tb.rows.every((r) => r.length === tb.cols.length + 1), `table ${i + 1}: every row needs a label plus one cell per column`);
      (tb.rows || []).forEach((r, ri) => r.slice(1).forEach((c, ci) => {
        if (c == null || c === "") return;
        const ans = String(c).split("|");
        checkAnswers(m, `${where} table ${i + 1} row ${ri + 1}`, ans);
        if (tb.fn && ci === 0 && !(tb.given || []).some((g) => g[0] === ri && g[1] === ci)) {
          const f = Text.fnOf(tb.fn), x = Text.value(r[0]);
          if (isFinite(x) && Math.abs(f(x) - Text.value(ans[0])) > 1e-9) bad(m, `${where} table ${i + 1}: ${tb.fn} at x = ${r[0]} is ${f(x)}, not ${ans[0]}`);
        }
      }));
    }); break;
    case "selfcheck": need(items.length, "no items"); break;
    case "mistake": items.forEach((it, i) => {
      need(it.q && it.lines && it.lines.length >= 2, `item ${i + 1} needs q and at least 2 lines`);
      need(Number.isInteger(it.bad) && it.bad < (it.lines || []).length, `item ${i + 1}: bad must be a line number`);
      need(it.why, `item ${i + 1} needs why`);
      if (it.a) checkAnswers(m, `${where} item ${i + 1}`, String(it.a).split("|"), it);
    }); break;
    case "plot": items.forEach((it, i) => {
      need(it.q, `item ${i + 1} needs q`);
      need(it.fn || it.points || it.line, `item ${i + 1} needs fn, line or points`);
      if (it.fn && !Text.fnOf(it.fn)) bad(m, `${where} item ${i + 1}: can't read ${it.fn}`);
      const xr = it.x || [-6, 6], yr = it.y || [-6, 6];
      (it.points || []).forEach((p) => need(p[0] >= xr[0] && p[0] <= xr[1] && p[1] >= yr[0] && p[1] <= yr[1], `item ${i + 1}: point (${p}) is off the grid`));
      if (it.fn) {
        const f = Text.fnOf(it.fn); let on = 0;
        for (let x = xr[0]; x <= xr[1]; x++) { const y = f(x); if (Number.isInteger(Math.round(y * 1e9) / 1e9) && y >= yr[0] && y <= yr[1]) on++; }
        need(on >= (it.need || 2) + 1, `item ${i + 1}: only ${on} grid points on ${it.fn}`);
      }
    }); break;
  }
  if (t.pick && t.pick > (t.items || t.questions || t.pairs || t.tables || []).length) bad(m, `${where}: pick is larger than the list`);
}
function validate(m) {
  ["num", "slug", "title", "unit", "lede", "context", "learn", "tasks", "build", "reflect", "challenge"].forEach((k) => { if (m[k] == null) bad(m, `missing ${k}`); });
  Text.setFigs(m.figs);
  Object.keys(m.figs || {}).forEach((k) => {
    const g = m.figs[k];
    (g.lines || []).forEach((ln) => { if (ln.fn && !Text.fnOf(ln.fn)) bad(m, `figure ${k}: can't read ${ln.fn}`); });
    (g.shade || []).forEach((ln) => { if (!Text.fnOf(ln.fn)) bad(m, `figure ${k}: can't read ${ln.fn}`); });
  });
  const ids = new Set();
  (m.tasks || []).concat(m.challenge || []).forEach((t) => { if (ids.has(t.id)) bad(m, `duplicate task id ${t.id}`); ids.add(t.id); validateTask(m, t); });
  (m.learn || []).forEach((idea, i) => { if (idea.check) validateChoices(m, `learn idea ${i + 1} quick check`, idea.check.choices); (idea.worked || []).forEach((w, k) => { if (!w.problem || !w.steps || !w.steps.length) bad(m, `learn idea ${i + 1} example ${k + 1}: needs problem and steps`); if (w.eq && w.answer) { const p = Text.solves(w.eq, w.answer); if (p) bad(m, `learn idea ${i + 1} example ${k + 1}: ${p}`); } }); });
  figsIn(m, m, "module");
  const required = (m.tasks || []).filter((t) => !t.optional && t.type !== "selfcheck");
  if (required.length < 5) bad(m, `only ${required.length} required activities`);
  if (!(m.challenge || []).length) bad(m, "no challenge problems");
  if (!m.build.reqs || !m.build.reqs.length) bad(m, "build has no requirements");
  (m.build.reqs || []).forEach((r) => { if (r.re) try { new RegExp(r.re, "giu"); } catch (e) { bad(m, `build regex ${r.re}: ${e.message}`); } });
  const c = checks["m" + String(m.num).padStart(2, "0")];
  if (!c) bad(m, "no entry in teacher-src/checks.js");
  else {
    if (!/^[A-Z]+-\d+$/.test(c.code)) bad(m, `completion code ${c.code} should look like NAME-1234`);
    if (!/^[A-Z]+-\d+$/.test(c.star || "")) bad(m, `challenge code ${c.star} should look like NAME-1234`);
    if (!c.quiz || c.quiz.length !== 5) bad(m, "Blackbaud quiz needs 5 questions");
    (c.quiz || []).forEach((q, i) => {
      if (!q.choices || q.choices.length !== 4 || !q.choices[q.answer]) bad(m, `quiz q${i + 1}: needs 4 choices and a right answer index`);
      if (q.choices && new Set(q.choices).size !== q.choices.length) bad(m, `quiz q${i + 1}: two choices are the same`);
    });
  }
}
modules.forEach(validate);
const nums = modules.map((m) => m.num);
nums.forEach((n, i) => { if (i && n <= nums[i - 1]) problems.push(`module numbers should go up: found ${n} after ${nums[i - 1]}`); });
if (modules.length !== TOTAL) console.warn(`note: ${modules.length} of ${TOTAL} modules written so far.`);
const codes = Object.values(checks).flatMap((c) => [c.code, c.star]);
if (new Set(codes).size !== codes.length) problems.push("two codes are the same");

if (problems.length) {
  console.error("Problems found:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log(`${modules.length} modules OK.`);
if (CHECK_ONLY) process.exit(0);

/* ---------- write the site ---------- */
const DOCS = path.join(ROOT, "docs");
fs.mkdirSync(path.join(DOCS, "modules"), { recursive: true });
fs.mkdirSync(path.join(ROOT, "build"), { recursive: true });
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@500..700&family=Source+Sans+3:wght@400..700&family=STIX+Two+Text:ital,wght@0,400..600;1,400..600&display=swap">';
const pageName = (m) => `${m.slug}.html`;
function encode(code) { return Buffer.from(String(code || "").split("").reverse().join(""), "utf8").toString("base64"); }
function unitOf(m) { return units[m.unit - 1]; }

modules.forEach((m, i) => {
  const key = "m" + String(m.num).padStart(2, "0");
  const data = Object.assign({}, m, {
    unitTitle: unitOf(m).title,
    code: checks[key] ? encode(checks[key].code) : "",
    star: checks[key] ? encode(checks[key].star) : "",
    total: TOTAL,
    prev: i > 0 ? pageName(modules[i - 1]) : null,
    next: i < modules.length - 1 ? pageName(modules[i + 1]) : null
  });
  delete data.teacher;
  fs.writeFileSync(path.join(DOCS, "modules", key + ".js"), "/* Generated by scripts/build.js from content/" + key + ".js. Edit that file, not this one. */\nCourse.start(" + JSON.stringify(data) + ");\n");
  const title = `M${m.num} · ${Text.plain(m.title)} · Algebra 1`;
  fs.writeFileSync(path.join(DOCS, pageName(m)), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${Text.esc(title)}</title>
${FONTS}
<link rel="stylesheet" href="assets/course.css">
</head>
<body>
<div id="app"><noscript><p style="padding:24px">This lesson needs JavaScript. Please turn it on in Safari settings.</p></noscript></div>
<script src="assets/course.js"></script>
<script src="modules/${key}.js"></script>
</body>
</html>
`);
});

/* ---------- index page ---------- */
const reqCount = (m) => m.tasks.filter((t) => !t.optional && t.type !== "selfcheck").length + 1;
const unitHtml = units.map((u, ui) => {
  const ms = modules.filter((m) => m.unit === ui + 1);
  if (!ms.length) return "";
  return `  <section class="unit">
    <h2><span class="un">Unit ${ui + 1}</span> ${Text.esc(u.title)} <span class="en">· ${Text.esc(u.sub)}</span></h2>
    <ol>
${ms.map((m) => `      <li><span class="num">M${m.num}</span><a href="${pageName(m)}">${Text.inline(m.title)}</a><span class="sub">${Text.inline(m.subtitle || "")}</span><span class="prog" data-m="${m.num}" data-n="${reqCount(m)}" data-s="${(m.challenge || []).map((t) => t.id).join(",")}"></span></li>`).join("\n")}
    </ol>
  </section>`;
}).join("\n");
fs.writeFileSync(path.join(DOCS, "index.html"), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Algebra 1</title>
${FONTS}
<link rel="stylesheet" href="assets/course.css">
<style>
/* Layout: one column listing the units in order; each module is a row with its progress on this iPad. */
.hero { display: grid; gap: 14px; }
.brand { display: flex; align-items: center; gap: 16px; }
.brand img { width: 76px; height: 76px; flex: none; background: #fff; border-radius: 50%; }
.school { color: var(--accent); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; font-size: 0.875rem; }
.how { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 16px 18px; display: grid; gap: 8px; }
.how ul { margin: 0; padding-left: 1.2rem; display: grid; gap: 4px; }
.unit { display: grid; gap: 10px; }
.unit h2 { font-size: 1.3rem; }
.unit h2 .un { display: block; font-family: var(--font-body); font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); }
.unit h2 .en { font-family: var(--font-body); font-weight: 500; font-size: 0.95rem; color: var(--muted); }
.unit ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.unit li { display: grid; grid-template-columns: 3rem 1fr auto; grid-template-areas: "n t p" "n s p"; align-items: center; gap: 0 12px; padding: 10px 16px; border-radius: 10px; border: 1px solid var(--line); background: var(--surface); }
.unit li .num { grid-area: n; font-size: 0.85rem; font-weight: 800; color: var(--accent); font-variant-numeric: tabular-nums; }
.unit li a { grid-area: t; color: var(--ink); font-weight: 700; text-decoration: none; }
.unit li a:hover { color: var(--accent); }
.unit li .sub { grid-area: s; color: var(--muted); font-size: 0.85rem; }
.unit li .prog { grid-area: p; font-size: 0.8rem; font-weight: 650; padding: 2px 10px; border-radius: 999px; white-space: nowrap; }
.unit li .prog.started { color: var(--accent); background: var(--accent-soft); }
.unit li .prog.done { color: var(--ok); background: var(--ok-soft); }
.unit li .prog .st { color: var(--c2); margin-left: 4px; }
</style>
</head>
<body>
<main class="wrap">
  <header class="hero">
    <div class="brand">
      <img src="assets/seal.png" alt="Scranton Preparatory School seal">
      <div>
        <p class="school">Scranton Preparatory School</p>
        <h1>Algebra 1</h1>
      </div>
    </div>
    <div class="tilestrip" aria-hidden="true"></div>
    <p class="lede">Weekly practice for Algebra 1: ${modules.length} modules that follow along with your math class. Open the module your teacher assigned in Blackbaud, work through every step, then complete the Blackbaud check.</p>
    <div class="how">
      <h2 style="font-size:1.1rem">How it works</h2>
      <ul>
        <li>Every module has the same <b>7 steps</b>: Context, Learn, Practice, Build, Reflect, Check, Challenge.</li>
        <li><b>Learn</b> has worked examples. Try each one on paper, then tap to see the steps.</li>
        <li>Activities check themselves. <b>Pink</b> means try again. <b>Yellow</b> means your answer is equal but not finished (like a fraction that isn't reduced). Stuck? Tap <b>Show a hint</b>.</li>
        <li>Type answers like <b>3x + 5</b>, <b>-2</b>, <b>3/4</b> or <b>x^2</b>. The math keys under each box have <b>² √ ≤ ≥</b> and more.</li>
        <li>Finish every activity to get the <b>completion code</b> for the Blackbaud check. The <b>★ Challenge</b> at the end is optional, for when you're ready for more.</li>
      </ul>
    </div>
  </header>
${unitHtml}
  <aside class="helpbox">${Text.SETTINGS.help}</aside>
  <footer><span>Progress shown here is saved in this iPad's browser.</span></footer>
</main>
<script>
// Show each module's progress from this iPad's saved work.
document.querySelectorAll(".prog").forEach(function (p) {
  var n = Number(p.getAttribute("data-n")), s = null, stars = (p.getAttribute("data-s") || "").split(",").filter(Boolean);
  try { s = JSON.parse(localStorage.getItem("${Text.SETTINGS.key}:m" + p.getAttribute("data-m")) || "null"); } catch (e) {}
  if (!s || !s.done) return;
  var k = Object.keys(s.done).filter(function (id) { return s.done[id]; }).length;
  var st = stars.length && stars.every(function (id) { return s.star && s.star[id]; });
  if (!k && !st) return;
  k = Math.min(k, n);
  p.textContent = k >= n ? "Done ✓" : k + " of " + n;
  p.className = "prog " + (k >= n ? "done" : "started");
  if (st) { var b = document.createElement("span"); b.className = "st"; b.textContent = "★"; b.title = "Challenge solved"; p.appendChild(b); }
});
</script>
</body>
</html>
`);
fs.writeFileSync(path.join(DOCS, ".nojekyll"), "");
// Everything the teacher scripts and tests need, in one place.
fs.writeFileSync(path.join(ROOT, "build/course.json"), JSON.stringify({ units, modules, checks, pages: modules.map(pageName) }, null, 1));
console.log(`wrote docs/ (${modules.length} module pages), build/course.json`);

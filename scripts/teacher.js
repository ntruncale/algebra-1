#!/usr/bin/env node
/* Write the teacher folder (private) from build/course.json. Run scripts/build.js first.

   teacher/course-overview.md       every module: page, codes, Blackbaud name, calendar
   teacher/blackbaud-setup-checklist.md
   teacher/blueprint.md             goals, standards, scope and sequence, design decisions
   teacher/answer-keys/mNN.md       every activity's answers (and Challenge answers), common snags, fact-check notes
   teacher/blackbaud/mNN-check.md   the Blackbaud assessment for each module
   teacher/blackbaud-import/        all quizzes as CSV (one file and one per module); scripts/export_xlsx.py adds a spreadsheet

   Usage: node scripts/build.js && node scripts/teacher.js && python3 scripts/export_xlsx.py */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const Text = require(path.join(ROOT, "docs/assets/course.js"));
const { units, modules, checks, pages } = JSON.parse(fs.readFileSync(path.join(ROOT, "build/course.json"), "utf8"));
const OUT = path.join(ROOT, "teacher");
const SITE = "https://ntruncale.github.io/algebra-1/";
for (const d of ["", "answer-keys", "blackbaud", "blackbaud-import", "blackbaud-import/csv"]) fs.mkdirSync(path.join(OUT, d), { recursive: true });

const key = (m) => "m" + String(m.num).padStart(2, "0");
// Markup in module text → Markdown: {{math}} → plain math, ((clue)) → (clue), figures → [graph], HTML tags dropped.
const md = (s) => String(s == null ? "" : s).replace(/\{\{(.+?)\}\}/g, (_, x) => Text.mplain(x)).replace(/%%nl:(.+?)%%/g, (_, x) => `[number line: ${Text.mplain(x)}]`)
  .replace(/%%fig:(.+?)%%/g, "[graph]").replace(/\(\((.*?)\)\)/g, "($1)").replace(/<[^>]+>/g, "").replace(/\s*\n\s*\n\s*/g, " ").trim();
const ans = (a) => String(a).split("|").map((x) => Text.mplain(x.replace(/^[!~#]/, ""))).join(" or ");
const assessment = (m) => `M${m.num} Check: ${Text.plain(m.title)}`;
const required = (m) => m.tasks.filter((t) => !t.optional && t.type !== "selfcheck");
const LETTERS = "ABCDEF";

/* ---------- answer keys ---------- */
function chosenNote(t, list) { return t.pick && t.pick < list.length ? `*(varies: each student gets ${t.pick} of these ${list.length})*` : ""; }
function choicesMd(choices) {
  return choices.map((c) => `- ${c[1] ? "**" + md(c[0]) + "** ✓" : md(c[0])}${c[1] && c[2] ? ` — ${md(c[2])}` : ""}`).join("\n");
}
function taskKey(t) {
  const items = t.items || [];
  const lines = [];
  if (t.intro) lines.push("*" + md(t.intro) + "*");
  if (t.fig) lines.push("*(The student sees a graph here.)*");
  switch (t.type) {
    case "mc": lines.push(md(t.q || ""), choicesMd(t.choices)); break;
    case "quiz": case "read":
      if (t.passage) lines.push("**Passage:** " + md(t.passage));
      lines.push(chosenNote(t, t.questions));
      (t.questions || []).forEach((q, i) => { lines.push(`**${i + 1}.** ${md(q.q)}${q.fig ? " *(graph)*" : ""}`); lines.push(choicesMd(q.choices)); });
      break;
    case "cloze":
      lines.push(chosenNote(t, items));
      items.forEach((it, i) => {
        const s = Text.itemText(it);
        const filled = s.replace(/\[([^\]]+)\]/g, (_, a) => "**" + ans(a) + "**");
        lines.push(`${i + 1}. ${md(filled)}`);
      });
      break;
    case "solve":
      lines.push(chosenNote(t, items));
      items.forEach((it, i) => lines.push(`${i + 1}. ${md(it.q)}${it.fig ? " *(graph)*" : ""} → ${it.pre ? md(it.pre) + " " : ""}**${ans(it.a)}**${it.post ? " " + md(it.post) : ""}${it.how ? `  \n   *Steps:* ${[].concat(it.how).map(md).join(" → ")}` : ""}`));
      break;
    case "select":
      items.forEach((it, i) => {
        const parts = Text.pickParts(Text.itemText(it));
        lines.push(`${i + 1}. ` + md(parts.map((p) => p.text != null ? p.text : "**" + Text.mplain(p.options[0]) + "** ~~" + p.options.slice(1).map(Text.mplain).join(" / ") + "~~").join("")));
      });
      break;
    case "match":
      lines.push(chosenNote(t, t.pairs));
      t.pairs.forEach((p) => lines.push(`- ${md(p[0])} = ${md(p[1])}`));
      break;
    case "sort":
      lines.push(chosenNote(t, items));
      t.cats.forEach((c, ci) => lines.push(`- **${md(c)}:** ` + items.filter((it) => it[1] === ci).map((it) => md(it[0])).join(" · ")));
      break;
    case "order":
      items.forEach((it, i) => lines.push(`${i + 1}. *${md(it.q)}* → **${Text.mplain(it.a)}**${it.alt ? " (also accepted: " + it.alt.map(Text.mplain).join(" · ") + ")" : ""}${it.extra ? ` · tile that doesn't belong: *${it.extra.map(Text.mplain).join(", ")}*` : ""}`));
      break;
    case "steps":
      items.forEach((it, i) => lines.push(`${i + 1}. ${md(Text.itemText(it))}`));
      lines.push("Each student sees the steps shuffled.");
      break;
    case "grid":
      t.tables.forEach((tb) => {
        if (tb.title) lines.push(`**${md(tb.title)}**`);
        lines.push(["| " + md(tb.corner || "") + " | " + tb.cols.map(md).join(" | ") + " |", "|---|" + tb.cols.map(() => "---|").join("")].concat(tb.rows.map((r) => `| ${r[0]} | ${r.slice(1).map((x) => ans(x)).join(" | ")} |`)).join("\n"));
      });
      lines.push("Cells marked as given are filled in for the student.");
      break;
    case "mistake":
      lines.push(chosenNote(t, items));
      items.forEach((it, i) => lines.push(`${i + 1}. ${md(it.q)}: the student's work is ${it.lines.map((l, li) => `(${li + 1}) ${md(l)}`).join(" ")}. **Mistake in line ${it.bad + 1}.** ${md(it.why)}${it.a ? ` Correct answer: **${ans(it.a)}**.` : ""}`));
      break;
    case "plot":
      items.forEach((it, i) => lines.push(`${i + 1}. ${md(it.q)} → ${it.points ? "points " + it.points.map((p) => `(${p[0]}, ${p[1]})`).join(", ") : it.line ? `any ${it.need || 2} points on ${it.line}` : `any ${it.need || 2} grid points on y = ${Text.mplain(it.fn)}`}`));
      lines.push("Students tap the grid to place points; points snap to whole numbers. For lines, any correct points count, and the line is drawn when they're right.");
      break;
    case "selfcheck":
      lines.push("Optional and private: answers stay on the student's iPad and are never sent to Blackbaud or the teacher. Items: " + items.map((it) => md(it)).join(" · "));
      break;
  }
  return lines.filter(Boolean).join("\n\n");
}
function reqText(r) { return md(r.t); }

modules.forEach((m, i) => {
  const k = key(m), c = checks[k];
  const out = [];
  out.push(`# M${m.num} ${Text.plain(m.title)}: Teacher answer key`, "");
  out.push(`**${md(m.subtitle)}** · Unit ${m.unit}: ${units[m.unit - 1].title} · about ${m.minutes || 35} minutes · calculator: ${m.calculator || "not needed"}`, "");
  out.push(`**Student page:** ${SITE}${pages[i]}`, "");
  out.push(`**Completion code:** \`${c.code}\` · **Challenge code (★, optional):** \`${c.star}\` · **Blackbaud assessment:** ${assessment(m)}`, "");
  out.push(`**To finish:** ${required(m).length} activities + the Build. The optional self-check and the ★ Challenge don't count toward the completion code.`, "");
  out.push(`**Context story:** ${md(m.context.title)} (${m.context.place})`, "");
  if (m.goals) out.push("**Goals:** " + m.goals.map(md).join("; ") + ".", "");
  out.push("---", "");
  m.tasks.forEach((t, n) => {
    const opt = t.optional || t.type === "selfcheck";
    out.push(`## ${opt ? "Optional" : "Task " + (n + 1)}: ${md(t.title)} *(${t.type})*`, "", taskKey(t), "");
  });
  out.push(`## Build: ${md(m.build.heading)}`, "", md(m.build.prompt), "", "Requirements, checked automatically as the student types:", ...m.build.reqs.map((r) => "- " + reqText(r)), "");
  if (m.build.model) out.push("**Model shown to students:** " + m.build.model.split(/\n+/).map(md).filter(Boolean).join(" / "), "");
  out.push("The automatic check looks for required words and patterns, not for correct math in every line. Skim the pasted work in Blackbaud.", "");
  out.push("## Reflect", "", md(m.reflect.q), "");
  out.push("## ★ Challenge (optional, for students at or above grade level)", "", `Solving every Challenge problem shows the challenge code \`${c.star}\`. Students can enter it in Blackbaud's optional Question D.`, "");
  (m.challenge || []).forEach((t) => out.push(`### ${md(t.title)} *(${t.type})*`, "", taskKey(t), ""));
  if (m.teacher && m.teacher.snags) {
    out.push("## Common snags", "", "| Where | What you'll see | What to do |", "|---|---|---|");
    m.teacher.snags.forEach((s) => out.push(`| ${s.map(md).join(" | ")} |`));
    out.push("");
  }
  if (m.teacher && m.teacher.factcheck) out.push("## Fact check the Context story", "", md(m.teacher.factcheck), "");
  fs.writeFileSync(path.join(OUT, "answer-keys", k + ".md"), out.join("\n").replace(/\n{3,}/g, "\n\n"));
});

/* ---------- Blackbaud checks ---------- */
function codeVariants(code) { const lc = code.toLowerCase(); return [code, code.replace("-", ""), lc, lc.replace("-", "")]; }
const csvRows = [];
const COLUMNS = ["Module", "Assessment name", "Question #", "Question type", "Points", "Required", "Question text", "Choice A", "Choice B", "Choice C", "Choice D", "Correct choice", "Correct answer", "Accepted answers", "Note for the teacher"];
modules.forEach((m) => {
  const k = key(m), c = checks[k], name = assessment(m);
  const out = [`# ${name} (Blackbaud assessment setup)`, "",
    "Same scoring as every module: completion code 5 pts, quiz questions 1 pt each, two required essay questions at 0 pts. Total 10, **pass = 9 or 10**. Question D (challenge code) is optional: 0 points, or extra credit if you choose.", "",
    "Suggested settings: no time limit; shuffle answer choices if Blackbaud offers it; allow retakes but don't show correct answers (or show answers and allow only 1–2 attempts). See `blackbaud-setup-checklist.md`, Part 3.", "", "---", "",
    "## Question A: Completion code (fill-in-the-blank / short answer, 5 pts)", "",
    `> Enter the completion code shown at the end of the module "${Text.plain(m.title)}."`, "",
    `**Answer:** \`${c.code}\`. If Blackbaud allows extra accepted answers, also add ${codeVariants(c.code).slice(1).map((v) => "`" + v + "`").join(", ")}.`, "",
    "## Quiz (multiple choice, 1 pt each)", ""];
  const rows = [];
  rows.push([`M${m.num}`, name, "A", "Fill in the blank", 5, "Yes", `Enter the completion code shown at the end of the module "${Text.plain(m.title)}."`, "", "", "", "", "", c.code, codeVariants(c.code).join(" | "), ""]);
  c.quiz.forEach((q, qi) => {
    out.push(`**${qi + 1}. ${q.q}**`);
    q.choices.forEach((ch, ci) => out.push(ci === q.answer ? `- **${LETTERS[ci]}. ${ch}** ✓` : `- ${LETTERS[ci]}. ${ch}`));
    out.push("");
    rows.push([`M${m.num}`, name, qi + 1, "Multiple choice", 1, "Yes", q.q, ...[0, 1, 2, 3].map((x) => q.choices[x] || ""), LETTERS[q.answer], q.choices[q.answer], "", "Students may want scratch paper."]);
  });
  out.push("## Question B: Work (essay / long answer, 0 pts, required)", "", `> Paste your work from Step 4, "${md(m.build.heading)}." (In the module, tap "Copy my work.")`, "",
    "The module already checked the requirements automatically. A quick skim is enough: is the math right, and is it the student's own?", "",
    "## Question C: Reflection (essay / long answer, 0 pts, required)", "", `> ${md(m.reflect.q)} (2–4 sentences)`, "",
    "## Question D: Challenge code (fill-in-the-blank, optional, 0 pts or extra credit)", "", `> Optional: if you solved every ★ Challenge problem in Step 7, enter your challenge code.`, "",
    `**Answer:** \`${c.star}\`. Also accept ${codeVariants(c.star).slice(1).map((v) => "`" + v + "`").join(", ")}. Leave this question **not required**. It shows you which students are ready for more.`, "");
  rows.push([`M${m.num}`, name, "B", "Essay", 0, "Yes", `Paste your work from Step 4, "${md(m.build.heading)}."`, "", "", "", "", "", "", "", "Required; 0 points. The module checks the requirements automatically."]);
  rows.push([`M${m.num}`, name, "C", "Essay", 0, "Yes", md(m.reflect.q) + " (2–4 sentences)", "", "", "", "", "", "", "", "Required; 0 points."]);
  rows.push([`M${m.num}`, name, "D", "Fill in the blank", 0, "No", "Optional: if you solved every ★ Challenge problem in Step 7, enter your challenge code.", "", "", "", "", "", c.star, codeVariants(c.star).join(" | "), "Optional; 0 points or extra credit."]);
  fs.writeFileSync(path.join(OUT, "blackbaud", k + "-check.md"), out.join("\n"));
  writeCsv(path.join(OUT, "blackbaud-import/csv", k + ".csv"), rows);
  rows.forEach((r) => csvRows.push(r));
});
function csvCell(v) { v = String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
function writeCsv(file, rows) { fs.writeFileSync(file, "﻿" + [COLUMNS].concat(rows).map((r) => r.map(csvCell).join(",")).join("\n") + "\n"); }
writeCsv(path.join(OUT, "blackbaud-import/all-quizzes.csv"), csvRows);
fs.writeFileSync(path.join(OUT, "blackbaud-import/README.md"), `# Blackbaud import files

- \`all-quizzes.csv\` (and \`all-quizzes.xlsx\`, with a sheet per module): every Blackbaud question for all ${modules.length} modules.
- \`csv/mNN.csv\`: the same questions, one file per module.

Each module has 9 rows: Question A (completion code, 5 pts), five multiple-choice questions (1 pt each), two required essays (B and C, 0 pts), and an optional challenge-code question (D, 0 pts or extra credit).

These use the same columns as the Computer Science, Spanish, Health and Latin course files. When you have Blackbaud's own import template, ask Claude to reformat all ${modules.length} to match it.

The right answers are spread across A, B, C and D (${(() => { const n = [0, 0, 0, 0]; Object.values(checks).forEach((c) => c.quiz.forEach((q) => n[q.answer]++)); return n.map((x, i) => LETTERS[i] + ": " + x).join(", "); })()}).
`);

/* ---------- overview, checklist, blueprint ---------- */
const calendar = [];
let week = 1;
units.forEach((u, ui) => {
  const ms = modules.filter((m) => m.unit === ui + 1);
  calendar.push(`| ${week}–${week + ms.length - 1} | Unit ${ui + 1}: ${u.title} (M${ms[0].num}–M${ms[ms.length - 1].num}): ${u.sub} |`);
  week += ms.length;
  calendar.push(`| ${week} | Flex week: unit test, review, catch-up, retakes |`);
  week += 1;
});
const totalWeeks = week - 1;
const rowsOverview = modules.map((m, i) => `| ${m.num} | ${m.unit} | ${Text.plain(m.title)} | [${pages[i]}](${SITE}${pages[i]}) | \`${checks[key(m)].code}\` | \`${checks[key(m)].star}\` | ${assessment(m)} | ${required(m).length + 1} |`);
fs.writeFileSync(path.join(OUT, "course-overview.md"), `# Algebra 1: Course Overview for the Teacher

All ${modules.length} modules at a glance, with what you need to set up each Blackbaud assessment. Each module's answer key is in \`answer-keys/\` and its Blackbaud quiz in \`blackbaud/\`, named by module (for example \`answer-keys/m08.md\`, \`blackbaud/m08-check.md\`).

**Student site:** ${SITE}
Each module's link is the site address followed by its page name. For example, M1 is ${SITE}${pages[0]}

**What this is:** a **supplement** to your teacher-led Algebra 1 class: one self-checking module a week for practice or homework, about 35–45 minutes each. It's written for 9th graders who are working at about a **7th or 8th grade level**: Unit 1 rebuilds number sense (integers, fractions, order of operations), every module has worked examples revealed one step at a time, and missing a problem twice offers a "Show me how." Each module ends with an optional **★ Challenge** at full Algebra 1 level or above, for students who are on or above grade level.

**Scoring for every module:** completion code 5 pts + 5 quiz questions at 1 pt each = 10 pts. **Pass = 9 or 10.** Two essay questions (the Build and the reflection) are required but worth 0 points. An optional fifth question takes the **★ challenge code** (0 points, or extra credit if you like). If you'd rather count the modules as homework completion, the completion code alone shows a student finished every activity.

| # | Unit | Module | Page | Completion code | ★ Challenge code | Blackbaud assessment name | Items to finish |
|---|---|---|---|---|---|---|---|
${rowsOverview.join("\n")}

"Items to finish" counts the required activities plus the Build.

## Suggested calendar (${totalWeeks} weeks)

| Weeks | |
|---|---|
${calendar.join("\n")}

That's ${modules.length} module weeks plus ${units.length} flex weeks, one after each unit. Move them to fit your calendar; students can work on any module at any time.

## How the course works for students

- **Seven steps in every module**, following the Ignatian Pedagogical Paradigm like the CS, Spanish, Health and Latin courses: 1 Context (a true story where the math came from or is used), 2 Learn (three short ideas with worked examples and a quick check), 3 Practice (6 self-checking activities), 4 Build (a short piece of written math with automatic requirement checks), 5 Reflect, 6 Check (completion code and Blackbaud), 7 Challenge (optional, labeled *Magis*).
- **Answers are checked as math, not as text.** 1/2, 0.5 and .5 are all right; so are 3x + 6 and 6 + 3x; x = 4 and 4; (2, 3) and x = 2, y = 3; x > 4 and 4 < x.
- **Yellow means "equal, but not finished":** an unreduced fraction, a decimal where an exact answer is asked for (√ or a fraction), like terms not combined, parentheses not multiplied out, an answer not in factored form when factoring was asked, or a negative exponent when positive exponents were asked. The feedback names the issue.
- **Help built in:** a ladder of hints on every activity; worked examples revealed one step at a time; after two wrong tries on a problem, a "Show me how" with the steps; a private 1–5 self-check in several modules.
- **Activity types:** multiple choice, typed answers (numbers, expressions, equations, inequalities, ordered pairs, two solutions with *or*), fill-in-the-blank, tap-to-choose, matching, sorting, putting steps in order, building an equation from tiles, tables of values, finding the mistake in someone's work, and graphing by tapping points on a coordinate grid.
- **Math keys** under every typing box: x, y, ², ^, ( ), /, −, √, ≤, ≥, π.
- **Different practice for students sitting together:** answer choices, matching columns and sorting rows are shuffled, and many activities give each student a different set of problems.
- **Calculator:** each module says whether a calculator is needed. Unit 1 is calculator-free on purpose.
- **Progress** is saved in each iPad's browser.

## Unit sequence

| Unit | Modules | Topics |
|---|---|---|
${units.map((u, ui) => { const ms = modules.filter((m) => m.unit === ui + 1); return `| ${ui + 1}. ${u.title} | M${ms[0].num}–M${ms[ms.length - 1].num} | ${u.sub} |`; }).join("\n")}

## Fact checking

Every answer key ends with a "Fact check" note listing the claims and sources behind the Context story. Please skim them. Where a famous story is a legend or probably embellished (Descartes's fly, Gauss's 1-to-100, Euler's quote, Hippasus), the module says so.

## Shared files

- **Lesson content** is in \`content/mNN.js\` (one file per module). \`scripts/build.js\` checks every answer (each must be readable math, and where a problem lists its equation, the answer must actually solve it) and builds the student site in \`docs/\`.
- **The look** (graph paper and pencil yellow) is set at the top of \`docs/assets/course.css\`; the shared behavior, including the answer checker, graphs and number lines, is in \`docs/assets/course.js\`. The Scranton Prep seal is reused from the other courses.
- **Private files:** completion codes and Blackbaud quizzes are in \`teacher-src/\`, and this \`teacher/\` folder is generated from them. Neither belongs in the public repository.
`);

const checklistRows = modules.map((m, i) => `| M${m.num} ${Text.plain(m.title)} | [${pages[i]}](${SITE}${pages[i]}) | \`${checks[key(m)].code}\` | ☐ | ☐ | ☐ | ☐ | ☐ |`);
fs.writeFileSync(path.join(OUT, "blackbaud-setup-checklist.md"), `# Blackbaud Setup Checklist

For the Algebra 1 teacher (and the Blackbaud administrator, if needed). It follows the same steps as the CS, Spanish, Health and Latin courses. Because Algebra 1 already exists as a class, setup means adding topics and assessments to your own class page. Plan on about **2 hours** with question import (4 hours by hand).

Menu names differ a little between Blackbaud versions, so some labels below may not match your screen exactly.

---

## Part 1: Before you start

- [ ] Decide how the modules count: as a **homework grade** (pass/fail per module, 9–10 = pass) or as **completion only** (the code question alone).
- [ ] Decide whether the optional **★ challenge code** (Question D) earns extra credit or just tells you who's ready for more.
- [ ] Confirm topics on your class page can **link to an outside website**.
- [ ] Ask the Blackbaud administrator to turn on **question import** for assessments, and find the sample template.
- [ ] Ask for a **test student account** in your class, if you don't have one.

## Part 2: For IT (student iPads)

- [ ] Allow \`ntruncale.github.io\` (the lesson pages)
- [ ] Allow \`fonts.googleapis.com\` and \`fonts.gstatic.com\` (fonts; pages still work without them)
- [ ] Test on one student iPad: open ${SITE}${pages[0]} and finish one activity.

## Part 3: Decide the settings (once, for every assessment)

- [ ] **Retakes and answers.** Choose one, not both: allow retakes but don't show correct answers, **or** show answers and allow only 1–2 attempts.
- [ ] **Shuffle answer choices**, if Blackbaud offers it.
- [ ] **No time limit.** Students may want scratch paper for the quiz.
- [ ] **Question D not required.**
- [ ] **Due dates:** one module per week.

## Part 4: Build and test M1 first

- [ ] Send Claude the Blackbaud import template so the quizzes can be reformatted to match.
- [ ] Topic **M1 ${Text.plain(modules[0].title)}** with a one-line instruction and the link ${SITE}${pages[0]}
- [ ] Assessment **${assessment(modules[0])}**: import \`blackbaud-import/csv/m01.csv\` (or the reformatted file).
- [ ] Check: code question 5 pts; 5 multiple-choice at 1 pt; essays B and C required at 0 pts; Question D optional; total 10.
- [ ] **Test as the student account**, including a wrong code (which should not pass).

## Part 5: All ${modules.length} modules

For each module: ① topic with link, ② assessment imported, ③ answers and points checked, ④ publish date set, ⑤ link tested as the student account.

| Module | Page | Code | ① | ② | ③ | ④ | ⑤ |
|---|---|---|---|---|---|---|---|
${checklistRows.join("\n")}

## Part 6: Before launch

- [ ] Skim each module (or at least each unit's first module) to check that the order and vocabulary match your class.
- [ ] Fact-check notes in each answer key reviewed.
- [ ] One full run-through of a module on a student iPad, on the school network, including a graphing activity.

## During the year

- [ ] **Weekly:** check the gradebook; follow up with students **2 or more modules behind**.
- [ ] Skim the Build work for misconceptions to reteach in class.
- [ ] Watch Question D: students who regularly enter challenge codes may be ready for enrichment.
`);

const scope = modules.map((m) => `| ${m.num} | ${Text.plain(m.title)} | ${md(m.subtitle)} | ${md(m.context.title)} (${md(m.context.place)}) |`);
fs.writeFileSync(path.join(OUT, "blueprint.md"), `# Algebra 1: Program Blueprint

**Audience:** 9th graders in Algebra 1, many working at a 7th or 8th grade level · **Format:** a supplement to the teacher-led class: **one self-paced module per week**, ${modules.length} modules plus ${units.length} flex weeks in a ${totalWeeks}-week year · **Grading:** pass/fail homework (or completion) · **Records:** Blackbaud gradebook · **Devices:** iPads, in the browser · **Built from:** the same engine and seven-step template as the CS, Spanish, Health and Latin courses, with a math layer added

## Goal

Give every Algebra 1 student steady, self-checking practice with the core of the course, with enough support that a student who arrives behind can catch up, and enough challenge that a student who's ahead keeps growing.

## How it supports students below grade level

- **Unit 1 is a bridge.** Integers, fractions, order of operations, expressions and simplifying come first, because nearly every later mistake traces back to them.
- **Refresher boxes** reteach a prerequisite inside later modules when it's needed.
- **Worked examples** in every Learn step are revealed one step at a time, with the reason for each step. Students are told to try first on paper.
- **Gentle feedback:** yellow ("equal, but not finished") separates a nearly-right answer from a wrong one and says what to fix. Specific messages catch common errors: the inequality pointing the wrong way, the boundary included or not, coordinates in the wrong order, one solution when there are two.
- **Show me how:** after two wrong tries on a problem, the steps for that problem appear. Each student gets a different selection of problems, so seeing the steps doesn't give away the next one.
- **Short sentences, plain language** and a consistent layout every week.

## How it challenges students on or above grade level

- **Step 7, Challenge (Magis)** in every module: 2–3 sets of harder problems at full Algebra 1 level or beyond (multi-step and fraction-heavy equations, Diophantus's riddle, absolute value equations, vertex form, completing the square, the quadratic formula, the golden ratio, three-variable systems from *The Nine Chapters*).
- Solving them all reveals a **★ challenge code**. Entering it in Blackbaud (optional Question D) tells the teacher who's ready for enrichment, and can earn extra credit.

## Why it fits a Jesuit school

Every module follows the **Ignatian Pedagogical Paradigm**: Context → Experience → Reflection → Action → Evaluation, and the optional Challenge is framed as *Magis*, "the more." Context stories show math as a human achievement across cultures: Egypt, Babylon, China, India, Baghdad, Greece and Europe, and include Descartes, a Jesuit-school student (M13). Reflections ask students about effort, mistakes, honesty with data, sharing knowledge and what they're proud of.

## Standards

Modules align with the **Pennsylvania Core Standards for Mathematics** (CC.2.1.HS–CC.2.4.HS) and the **Keystone Algebra I** assessment anchors, which follow the Common Core high school strands:

| Strand | Where it appears |
|---|---|
| **Number and Quantity** (real numbers, radicals, exponents, units) | M1–M3, M10, M24, M28 |
| **Algebra: expressions** (structure, simplifying, polynomials, factoring) | M4, M5, M26, M27 |
| **Algebra: equations and inequalities** (linear, literal, absolute value, systems, quadratics) | M6–M9, M11, M12, M21–M23, M30 |
| **Functions** (notation, domain and range, linear, exponential, quadratic) | M13–M20, M25, M29 |
| **Statistics and Probability** (scatter plots, lines of fit, correlation) | M20 |
| **Mathematical practices** (reasoning, explaining, finding errors, modeling) | Every Build, every find-the-mistake activity, every word problem |

## Scope and sequence

| # | Module | Focus | Context story |
|---|---|---|---|
${scope.join("\n")}

## Every module uses the same template

| Step | IPP stage | What the student does | Time |
|---|---|---|---|
| Last time / goals | — | A reminder of the previous module and this week's goals | 1 min |
| 1. Context | Context | A true story where the math came from or is used | 3 min |
| 2. Learn | Experience | Three short ideas, worked examples, a quick check | 8 min |
| 3. Practice | Experience | 6 self-checking activities | 15 min |
| 4. Build | Action | A short piece of written math, checked automatically | 5 min |
| 5. Reflect | Reflection | One prompt connecting the math to the student's life | 2 min |
| 6. Check | Evaluation | Blackbaud: completion code + 5 questions + work + reflection | 4 min |
| 7. Challenge | Magis | Optional harder problems and a ★ challenge code | — |

**Pass rule:** correct completion code + at least 4/5 on the quiz.

## Design decisions

- **Answers are checked as math**, by evaluating expressions, so any equivalent form counts unless the task asks for a specific form (simplified, factored, exact, positive exponents).
- **Every answer is verified by the build:** each must be readable, and wherever a problem lists its equation, the build substitutes the answer to confirm it really solves it.
- **No textbook required.** The order is a standard Algebra 1 sequence; if your class uses a textbook, the modules will be close to its order.

## Development timeline

**Status (November 2026): all ${modules.length} modules are built**, with lesson pages, Blackbaud quizzes and answer keys.

| When | What | Who |
|---|---|---|
| Nov 2026 – Jan 2027 | Teacher reviews the modules and fact-check notes | Algebra 1 teacher |
| Feb – Apr 2027 | Try a few modules with current students; revise | Teacher + Claude |
| Jun 2027 | Set up the Blackbaud topics and all ${modules.length} assessments | Teacher |
| Aug 2027 | IT checks on student iPads | IT |
| Sept 2027 | **Launch** | |

## Decisions still open

- Homework grade or completion only? Extra credit for challenge codes?
- Should module order match a particular textbook? (Ask Claude to reorder or adjust.)
- Hosting: the site is on GitHub Pages under a personal account; it should eventually belong to the school.
`);
console.log(`wrote teacher/: ${modules.length} answer keys, ${modules.length} Blackbaud checks, ${csvRows.length} quiz rows, overview, checklist, blueprint`);

# Algebra 1

Weekly practice for a 9th-grade Algebra 1 class: **30 self-checking modules, one per week**, about 35–45 minutes each, plus six flex weeks. The modules supplement a teacher-led class and are written for students who may be working at a **7th or 8th grade level**, with an optional **★ Challenge** at the end of every module for students on or above grade level. Students work on iPads in the browser and record progress through Blackbaud assessments, the same way as the *Computer Science – Sophomore Year*, *Español 9*, *Health 9* and *Latin I* courses.

**Student site:** https://ntruncale.github.io/algebra-1/ (GitHub Pages, served from the `docs/` folder)

## Units

1. **Number Sense Bootcamp:** integers, fractions and decimals, exponents and order of operations, variables and expressions, simplifying
2. **Solving Equations:** one-step, two-step and multi-step equations, formulas and literal equations, ratios, proportions and percents
3. **Inequalities and Functions:** inequalities, compound inequalities and absolute value, the coordinate plane, functions, sequences
4. **Linear Functions:** slope, slope-intercept form, writing equations, standard form and parallel/perpendicular lines, scatter plots
5. **Systems and Exponents:** systems by graphing, substitution and elimination, exponent rules and scientific notation, exponential growth and decay
6. **Polynomials and Quadratics:** polynomials, factoring, square roots and radicals, parabolas, solving quadratic equations

Every module opens with a true story (the Rhind papyrus, al-Khwarizmi, Galileo, GPS, the Hubble mirror, the Mars Climate Orbiter…), teaches three short ideas with step-by-step worked examples, and has six self-checking activities: typed answers checked as math (equivalent forms count; unsimplified ones get a yellow "almost"), multiple choice with graphs and number lines, sorting, matching, tables of values, find-the-mistake, building equations from tiles, and graphing by tapping points on a grid. Missing a problem twice offers a "Show me how." Step 7 has harder optional problems and a ★ challenge code.

## Folders

| Folder | What's in it | Public? |
|---|---|---|
| `content/` | The lessons: one file per module (`m01.js` … `m30.js`) and the unit list | Yes |
| `docs/` | The student site that GitHub Pages serves | Yes |
| `scripts/` | `build.js` (content → site, with answer checks), `teacher.js` + `export_xlsx.py` (teacher files) | Yes |
| `tests/` | A browser test that completes every activity and challenge in every module | Yes |
| `teacher-src/` | **Private:** completion codes, challenge codes and Blackbaud quizzes | **No** (git-ignored) |
| `teacher/` | **Private, generated:** answer keys, Blackbaud setups and import files, overview, checklist, blueprint | **No** (git-ignored) |

## Making changes

```bash
node scripts/build.js                 # check every module (every answer must parse and solve its equation) and rebuild docs/
node scripts/teacher.js && python3 scripts/export_xlsx.py   # rebuild the teacher files
node tests/run.js                     # test every module in a browser (needs Playwright)
```

Then commit and push `docs/` to publish. To turn on the site the first time: repo **Settings → Pages → Deploy from a branch → main → /docs**.

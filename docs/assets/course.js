/* Algebra 1: shared behavior for every module.
   (Built from the engine behind the CS, Español 9, Health 9 and Latin I courses, with a math layer added:
   answers are compared as numbers and expressions, not as text, and pages can draw graphs and number lines.)
   Each module page loads this file, then modules/mNN.js, which calls Course.start({...module data...}).
   The whole page (header, seven steps, every task) is drawn from that data, so a fix here updates all 30 modules.

   The first part (Text) has no browser code. scripts/build.js loads it in Node to check every answer in every
   module (it must parse, and where a module gives the equation, it must actually solve it). */
(function (root) {
  "use strict";

  var SETTINGS = { course: "Algebra 1", key: "alg1", lang: "en",
    // Math keys under every typing box. The minus key types a real minus sign; answers accept either.
    keys: ["x", "y", "²", "^", "(", ")", "/", "−", "√", "≤", "≥", "π"], keyLabel: "Math keys:",
    help: "<b>Stuck?</b> 1) Look back at the worked example in Step 2. 2) Tap <b>Show a hint</b>. 3) Work it on paper, one step at a time. 4) Ask your teacher or come to math help. Being stuck is part of learning math, not a sign you can't do it." };

  /* ======================= Text: pure helpers (shared with the build) ======================= */
  var Text = (function () {
    var FIGS = {};
    function esc(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    /* ======================= math: read, evaluate, compare ======================= */
    var SUPS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
    // Everything a student might type, in one spelling: x² → x^2, − → -, × → *, ≤ → <=, π → pi.
    function mnorm(s) {
      s = String(s == null ? "" : s).normalize("NFC");
      s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, function (m) {
        var e = m.split("").map(function (c) { return c === "⁻" ? "-" : String(SUPS.indexOf(c)); }).join("");
        return /^\d+$/.test(e) ? "^" + e : "^(" + e + ")";
      });
      s = s.replace(/[−–—‒﹣－]/g, "-").replace(/[×·•∙⋅✕✖]/g, "*").replace(/÷/g, "/")
        .replace(/≤|⩽/g, "<=").replace(/≥|⩾/g, ">=").replace(/≠/g, "!=").replace(/=</g, "<=").replace(/=>/g, ">=")
        .replace(/π/g, "pi").replace(/√/g, "sqrt").replace(/[（]/g, "(").replace(/[）]/g, ")").replace(/[’‘`´]/g, "'");
      // x^(2) → x^2 when the exponent is just a number or letter
      s = s.replace(/\^\(\s*(-?\d+|[a-z])\s*\)/gi, "^$1");
      return s.replace(/\s+/g, " ").trim().toLowerCase();
    }
    function sq(s) { return String(s).replace(/\s+/g, ""); }

    function tokenize(s) {
      var out = [], i = 0;
      while (i < s.length) {
        var c = s[i];
        if (c === " ") { i++; continue; }
        var m = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
        if (m) { out.push({ k: "n", v: parseFloat(m[1]), s: m[1] }); i += m[1].length; continue; }
        if (/[a-z]/.test(c)) {
          var rest = s.slice(i);
          if (/^sqrt/.test(rest)) { out.push({ k: "f", v: "sqrt" }); i += 4; continue; }
          if (/^abs/.test(rest)) { out.push({ k: "f", v: "abs" }); i += 3; continue; }
          if (/^pi/.test(rest)) { out.push({ k: "c", v: Math.PI }); i += 2; continue; }
          out.push({ k: "v", v: c }); i++; continue;
        }
        if (c === "√") { out.push({ k: "f", v: "sqrt" }); i++; continue; }
        if ("+-*/^()|".indexOf(c) !== -1) { out.push({ k: c }); i++; continue; }
        return null;
      }
      return out;
    }
    // A small parser: + - * / ^, parentheses, |absolute value|, √, implicit multiplication (2x, 3(x+1), (x+1)(x-2)).
    function parse(src) {
      var toks = tokenize(mnorm(src));
      if (!toks || !toks.length) return null;
      var p = 0, absDepth = 0;
      function peek() { return toks[p]; }
      function startsAtom(t) { return t && (t.k === "n" || t.k === "v" || t.k === "c" || t.k === "f" || t.k === "(" || (t.k === "|" && absDepth === 0)); }
      function expr() {
        var terms = [{ sg: 1, n: term() }];
        while (peek() && (peek().k === "+" || peek().k === "-")) { var sg = toks[p++].k === "-" ? -1 : 1; terms.push({ sg: sg, n: term() }); }
        return terms.length === 1 ? terms[0].n : { t: "add", terms: terms };
      }
      function term() {
        var fs = [{ op: "*", n: unary() }];
        for (;;) {
          var t = peek();
          if (t && (t.k === "*" || t.k === "/")) { p++; fs.push({ op: t.k, n: unary() }); }
          else if (startsAtom(t)) fs.push({ op: "*", n: power() });
          else break;
        }
        return fs.length === 1 ? fs[0].n : { t: "mul", fs: fs };
      }
      function unary() {
        var t = peek();
        if (t && t.k === "-") { p++; return { t: "neg", a: unary() }; }
        if (t && t.k === "+") { p++; return unary(); }
        return power();
      }
      function power() {
        var base = atom();
        if (peek() && peek().k === "^") { p++; return { t: "pow", a: base, b: unary() }; }
        return base;
      }
      function atom() {
        var t = toks[p++];
        if (!t) throw new Error("end");
        if (t.k === "n") return { t: "num", v: t.v, s: t.s };
        if (t.k === "c") return { t: "num", v: t.v, s: "pi" };
        if (t.k === "v") return { t: "var", v: t.v };
        if (t.k === "f") return { t: "fn", f: t.v, a: power() };
        if (t.k === "(") { var e = expr(); if (!peek() || peek().k !== ")") throw new Error(")"); p++; return { t: "par", a: e }; }
        if (t.k === "|") { absDepth++; var e2 = expr(); absDepth--; if (!peek() || peek().k !== "|") throw new Error("|"); p++; return { t: "fn", f: "abs", a: { t: "par", a: e2 } }; }
        throw new Error("token");
      }
      try { var tree = expr(); return p === toks.length ? tree : null; } catch (e) { return null; }
    }
    function evaluate(n, env) {
      switch (n.t) {
        case "num": return n.v;
        case "var": return env && env[n.v] != null ? env[n.v] : NaN;
        case "neg": return -evaluate(n.a, env);
        case "par": return evaluate(n.a, env);
        case "add": return n.terms.reduce(function (s, x) { return s + x.sg * evaluate(x.n, env); }, 0);
        case "mul": return n.fs.reduce(function (s, x, i) { var v = evaluate(x.n, env); return i === 0 ? v : x.op === "/" ? s / v : s * v; }, 0);
        case "pow": return Math.pow(evaluate(n.a, env), evaluate(n.b, env));
        case "fn": var a = evaluate(n.a, env); return n.f === "sqrt" ? Math.sqrt(a) : Math.abs(a);
      }
      return NaN;
    }
    function walk(n, f) {
      f(n);
      if (n.a) walk(n.a, f);
      if (n.b) walk(n.b, f);
      if (n.terms) n.terms.forEach(function (x) { walk(x.n, f); });
      if (n.fs) n.fs.forEach(function (x) { walk(x.n, f); });
    }
    function vars(n) { var out = []; walk(n, function (x) { if (x.t === "var" && out.indexOf(x.v) === -1) out.push(x.v); }); return out.sort(); }
    function counts(n) {
      var c = { vars: 0, nums: 0 };
      walk(n, function (x) { if (x.t === "var") c.vars++; if (x.t === "num" && x.v !== 1) c.nums++; });
      return c;
    }
    function strip0(n) { while (n && n.t === "par") n = n.a; return n; }
    function nterms(n) { n = strip0(n); return n.t === "add" ? n.terms.length : 1; }
    // Factored form: a product with at least two multiplied factors, one of them a group, like 2(x + 3) or (x + 1)(x − 2).
    function isProduct(n) {
      n = strip0(n);
      if (n.t === "neg") return isProduct(n.a);
      if (n.t === "pow") return strip0(n.a).t === "add";
      if (n.t !== "mul") return false;
      var times = n.fs.filter(function (x) { return x.op === "*"; });
      return times.length >= 2 && times.some(function (x) { return x.n.t === "par" || (x.n.t === "pow" && strip0(x.n.a).t === "add"); });
    }
    // A term like 3x²y → { sig: "x^2*y^1", nums: 1, rep: false }; null if it isn't a simple monomial.
    function mono(n) {
      var pw = {}, nums = 0, rep = false, ok = true;
      (function go(x, sign) {
        if (!ok) return;
        if (x.t === "num") { if (sign > 0) nums++; return; }
        if (x.t === "var") { if (pw[x.v] != null) rep = true; pw[x.v] = (pw[x.v] || 0) + sign; return; }
        if (x.t === "neg") { go(x.a, sign); return; }
        if (x.t === "pow" && x.a.t === "var" && x.b.t === "num") { if (pw[x.a.v] != null) rep = true; pw[x.a.v] = (pw[x.a.v] || 0) + sign * x.b.v; return; }
        if (x.t === "pow" && x.a.t === "var" && x.b.t === "neg" && x.b.a.t === "num") { if (pw[x.a.v] != null) rep = true; pw[x.a.v] = (pw[x.a.v] || 0) - sign * x.b.a.v; return; }
        if (x.t === "pow" && x.a.t === "num" && x.b.t === "num") { nums += 2; return; }
        if (x.t === "mul") { x.fs.forEach(function (f) { go(f.n, f.op === "/" ? -sign : sign); }); return; }
        ok = false;
      })(n, 1);
      if (!ok) return null;
      return { sig: Object.keys(pw).sort().map(function (k) { return k + "^" + pw[k]; }).join("*"), nums: nums, rep: rep };
    }
    // A factored answer that could be factored more: a group like (3x + 12) or (x² + 4x) with a common factor,
    // or fewer factors with a variable than the answer has, like 2(x² − 4) for 2(x + 2)(x − 2).
    function factors(n, out) {
      n = n.t === "neg" ? n.a : n;
      if (n.t === "mul") n.fs.forEach(function (f) { if (f.op === "*") factors(f.n, out); });
      else if (n.t === "par" && strip0(n).t === "mul") factors(strip0(n), out);
      else out.push(n);
      return out;
    }
    function partlyFactored(n) {
      var fs = factors(strip0(n), []);
      return fs.some(function (f) {
        var g = strip0(f);
        if (g.t !== "add") return false;
        var ms = g.terms.map(function (t) { return { m: mono(t.n), n: t.n }; });
        if (ms.some(function (x) { return !x.m; })) return false;
        var cs = ms.map(function (x) { var env = {}; vars(x.n).forEach(function (v) { env[v] = 1; }); return Math.abs(evaluate(x.n, env)); });
        var g0 = cs.every(function (c) { return Number.isInteger(c); }) ? cs.reduce(function (a, b) { return gcd(a, b); }) : 1;
        if (g0 > 1) return true;
        var common = ms[0].m.sig.split("*").filter(Boolean).map(function (p) { return p.split("^")[0]; }).filter(function (v) {
          return ms.every(function (x) { return x.m.sig.split("*").some(function (p) { return p.split("^")[0] === v && Number(p.split("^")[1]) > 0; }); });
        });
        return common.length > 0;
      });
    }
    function varFactors(n) { return factors(strip0(n), []).filter(function (f) { return vars(f).length; }).length; }
    // Why an expression isn't simplified yet: like terms not combined, x·x not written as a power, 2·3x not multiplied.
    function unsimplified(V) {
      V = strip0(V);
      var terms = V.t === "add" ? V.terms.map(function (t) { return t.n; }) : [V];
      var seen = {};
      for (var i = 0; i < terms.length; i++) {
        var m = mono(terms[i]);
        if (!m) continue;
        if (m.rep) return "It's equal, but simplify more: combine the powers of the same variable.";
        if (m.nums > 1) return "It's equal, but simplify more: multiply the numbers together.";
        if (seen[m.sig]) return "It's equal, but not fully simplified. Combine like terms.";
        seen[m.sig] = true;
      }
      return "";
    }
    var SAMPLE = [0.7311, -1.4142, 2.2361, -0.5772, 3.1416, 1.618, -2.7183];
    function envAt(vs, k) { var env = {}; vs.forEach(function (v, j) { env[v] = SAMPLE[(k + 3 * j) % 7]; }); return env; }
    function close(x, y) { return Math.abs(x - y) <= 1e-7 * Math.max(1, Math.abs(x), Math.abs(y)); }
    function equiv(a, b) {
      var vs = vars(a).concat(vars(b)).filter(function (v, i, l) { return l.indexOf(v) === i; });
      var good = 0;
      for (var k = 0; k < 7; k++) {
        var env = envAt(vs, k), x = evaluate(a, env), y = evaluate(b, env);
        if (!isFinite(x) && !isFinite(y)) continue;
        if (!isFinite(x) || !isFinite(y) || !close(x, y)) return false;
        good++;
      }
      return good >= 2;
    }
    function value(s) { var t = parse(s); return t && !vars(t).length ? evaluate(t) : NaN; }
    function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
    function isNumLit(s) { return /^-?(\d+\.?\d*|\.\d+)$/.test(s) || /^-?\(?-?\d+\/\d+\)?$/.test(s) || /^-?\d+ \d+\/\d+$/.test(s) || /^-?\(\d+\+\d+\/\d+\)$/.test(s); }
    function fracParts(s) { var m = /^-?\(?(-?\d+)\/(\d+)\)?$/.exec(s); return m ? [Number(m[1]), Number(m[2])] : null; }
    function squareFactor(n) { for (var k = Math.floor(Math.sqrt(n)); k > 1; k--) if (n % (k * k) === 0) return k; return 1; }

    var OK = { r: "ok" }, BAD = { r: "bad" };
    function near(why) { return { r: "near", why: why }; }
    function bad(why) { return { r: "bad", why: why }; }
    // What kind of answer is this? "text" (a word), "set" (2 or -3), "pair" ((2, 5)), "ineq" (x > 3), "eq" (y = 2x + 1), or "expr".
    function kindOf(a) {
      if (/^!/.test(a)) return "strict";
      if (/[a-z]{3,}/.test(a.replace(/sqrt|abs/g, "")) || /^[a-z]{2}$/.test(sq(a))) return "text";
      if (/\bor\b/.test(a)) return "set";
      if (/^\(.*,.*\)$/.test(sq(a))) return "pair";
      if (/[<>]|!=/.test(a)) return "ineq";
      if (/=/.test(a)) return "eq";
      return "expr";
    }
    function textNorm(s) {
      return String(s).normalize("NFC").toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.,;:!?"“”()…]/g, " ").replace(/[-\s]+/g, "").trim();
    }
    // A student's answer, cleaned up to match the kind of answer expected.
    function prep(v, a) {
      var k = kindOf(a);
      v = v.replace(/\$/g, "");
      if (k !== "pair" && k !== "set") v = v.replace(/(\d),(?=\d{3}(?!\d))/g, "$1");
      if (!/%$/.test(a)) v = v.replace(/\s*%$/, "");
      if (k === "expr" && !/[a-z]/.test(a.replace(/sqrt|pi/g, ""))) v = v.replace(/^(.*?[\d)])\s+[a-z]{2,}[a-z .]*$/, "$1");
      // mixed numbers: 1 1/2 → (1 + 1/2)
      v = v.replace(/^(-?)(\d+) (\d+)\/(\d+)$/, function (_, sg, w, n, d) { return sg + "(" + w + "+" + n + "/" + d + ")"; });
      return v.trim();
    }
    function judgeExpr(v, a) {
      var loose = /^~/.test(a);
      if (loose) a = a.slice(1);
      if (!/=/.test(a)) v = v.replace(/^[a-z]\s*=\s*/, "");
      if (sq(v) === sq(a)) return OK;
      var A = parse(a), V = parse(v);
      if (!A) return BAD;
      if (!V) return bad("I can't read that. Check for a typo or a missing number.");
      var hasRoot = /sqrt/.test(a);
      if (!vars(A).length) {
        var x = evaluate(A), y = vars(V).length ? NaN : evaluate(V);
        if (isFinite(y) && close(x, y)) {
          if (loose) return OK;
          var fp = fracParts(sq(v));
          if (fp && gcd(fp[0], fp[1]) > 1 && !fracParts(sq(a))) return fp[1] / gcd(fp[0], fp[1]) === 1 ? near("Equal, but simplify: that fraction is a whole number.") : near("Equal, but reduce the fraction to lowest terms.");
          if (fp && gcd(fp[0], fp[1]) > 1) return near("Equal, but reduce the fraction to lowest terms.");
          var roots = sq(v).match(/sqrt\(?(\d+)/g) || [];
          if (roots.some(function (r) { return squareFactor(Number(r.replace(/\D/g, ""))) > 1; })) return near("Equal, but simplify the square root (take out the perfect square).");
          if (isNumLit(v)) return OK;
          if (isNumLit(a)) return near("That's equal, but finish the arithmetic: give one number.");
          var cA = counts(A), cV = counts(V);
          if (cV.nums > cA.nums || nterms(V) > nterms(A)) return near("That's equal, but simplify it more.");
          return OK;
        }
        if (isFinite(y) && (hasRoot || /pi/.test(a)) && !/sqrt|pi/.test(v) && Math.abs(x - y) < 0.01 * Math.max(1, Math.abs(x))) return near("Close, but give the exact answer (use √ or π), not a decimal.");
        if (isFinite(y) && fracParts(sq(a)) && /\./.test(v) && Math.abs(x - y) < 0.006) return near("Close! That's a rounded decimal. Type the exact fraction instead.");
        return BAD;
      }
      if (!equiv(A, V)) return BAD;
      if (loose) return OK;
      if (!/\^\(?-/.test(sq(a)) && /\^\(?-/.test(sq(v))) return near("It's equal, but write it using only positive exponents.");
      var parA = /\(/.test(a.replace(/(sqrt|abs)\(/g, "")), parV = /\(/.test(v.replace(/(sqrt|abs)\(/g, ""));
      if (!parA && parV) return near("It's equal, but multiply out the parentheses (use the distributive property).");
      if (parA && isProduct(A) && !isProduct(V)) return near("It's equal, but this asks for factored form.");
      if (parA && isProduct(A) && isProduct(V) && !partlyFactored(A) && (partlyFactored(V) || varFactors(V) < varFactors(A))) return near("Good start, but factor completely: something can still come out of a group.");
      var u = unsimplified(V);
      if (u && !unsimplified(A)) return near(u);
      return OK;
    }
    // y = 2x + 1 and 2x + 1 = y and y - 1 = 2x are all the same line; only the first two are in the form asked.
    function judgeEq(v, a) {
      var ai = a.indexOf("="), aL = a.slice(0, ai), aR = a.slice(ai + 1);
      var single = /^[a-z]$/.test(sq(aL));
      if (v.indexOf("=") === -1) return single ? judgeExpr(v, aR) : BAD;
      var vi = v.indexOf("="), vL = v.slice(0, vi), vR = v.slice(vi + 1);
      if (/[<>]/.test(v)) return bad("This needs an equal sign, not an inequality.");
      if (single && sq(vL) === sq(aL)) return judgeExpr(vR, aR);
      if (single && sq(vR) === sq(aL)) return judgeExpr(vL, aR);
      var AL = parse(aL), AR = parse(aR), VL = parse(vL), VR = parse(vR);
      if (!AL || !AR) return BAD;
      if (!VL || !VR) return bad("I can't read that. Check for a typo.");
      if ((equiv(AL, VL) && equiv(AR, VR)) || (equiv(AL, VR) && equiv(AR, VL))) return OK;
      var FA = { t: "add", terms: [{ sg: 1, n: AL }, { sg: -1, n: AR }] }, FV = { t: "add", terms: [{ sg: 1, n: VL }, { sg: -1, n: VR }] };
      var vs = vars(FA).concat(vars(FV)).filter(function (x, i, l) { return l.indexOf(x) === i; });
      var k = null, good = 0;
      for (var j = 0; j < 7; j++) {
        var env = envAt(vs, j), fa = evaluate(FA, env), fv = evaluate(FV, env);
        if (!isFinite(fa) || !isFinite(fv)) continue;
        if (Math.abs(fv) < 1e-12 && Math.abs(fa) < 1e-12) continue;
        if (Math.abs(fv) < 1e-12) return BAD;
        var r = fa / fv;
        if (k === null) k = r; else if (!close(k, r)) return BAD;
        good++;
      }
      if (good >= 2 && k) return near("That equation is equivalent, but write it in the form asked.");
      return BAD;
    }
    // x > 3, 3 < x, -1 < x <= 4, "x > -1 and x <= 4" → a list of conditions on the variable, like [[">", 3]].
    var FLIP = { "<": ">", ">": "<", "<=": ">=", ">=": "<=", "!=": "!=" };
    function ineqParse(s) {
      var conds = [], ok = true;
      s.split(/\band\b/).forEach(function (piece) {
        var parts = piece.split(/(<=|>=|<|>|!=)/).map(function (x) { return x.trim(); });
        if (parts.length !== 3 && parts.length !== 5) { ok = false; return; }
        var isVar = function (x) { return /^[a-z]$/.test(x); };
        if (parts.length === 3) {
          if (isVar(parts[0])) conds.push([parts[1], value(parts[2]), parts[0]]);
          else if (isVar(parts[2])) conds.push([FLIP[parts[1]], value(parts[0]), parts[2]]);
          else ok = false;
        } else if (isVar(parts[2])) {
          conds.push([FLIP[parts[1]], value(parts[0]), parts[2]]);
          conds.push([parts[3], value(parts[4]), parts[2]]);
        } else ok = false;
      });
      if (!ok || conds.some(function (c) { return !isFinite(c[1]) || !c[0]; })) return null;
      return conds;
    }
    function judgeIneq(v, a) {
      var A = ineqParse(a);
      if (!A) return BAD;
      if (!/[<>]|!=/.test(v)) return /=/.test(v) || /^-?[\d.]/.test(v) ? bad("Write an inequality, like x > 3, with the variable and a symbol (< > ≤ ≥).") : BAD;
      var V = ineqParse(v);
      if (!V) return bad("I can't read that inequality. Try the form x > 3.");
      if (V.length !== A.length) return BAD;
      var used = [], dirWrong = false, incWrong = false;
      var all = A.every(function (c) {
        for (var i = 0; i < V.length; i++) {
          if (used.indexOf(i) !== -1 || !close(V[i][1], c[1])) continue;
          if (V[i][0] === c[0]) { used.push(i); return true; }
          if (V[i][0].charAt(0) === c[0].charAt(0)) incWrong = true; else dirWrong = true;
        }
        return false;
      });
      if (all) return OK;
      if (incWrong) return bad("The number is right. Check the symbol: is the boundary number included (≤ or ≥) or not (< or >)?");
      if (dirWrong) return bad("The number is right, but the inequality points the wrong way.");
      return BAD;
    }
    function splitSet(s) { return s.split(/\s*(?:\bor\b|,|;|\band\b)\s*/).map(function (x) { return x.trim(); }).filter(Boolean); }
    function judgeSet(v, a) {
      var A = splitSet(a), V = splitSet(v);
      if (/[<>]/.test(a)) { A = a.split(/\s*\bor\b\s*/); V = v.split(/\s*(?:\bor\b|;)\s*/); }
      var used = [];
      var okCount = A.filter(function (x) {
        for (var i = 0; i < V.length; i++) if (used.indexOf(i) === -1 && judgeOne(V[i], x).r === "ok") { used.push(i); return true; }
        return false;
      }).length;
      if (okCount === A.length && V.length === A.length) return OK;
      if (okCount === V.length && V.length < A.length) return bad("That's right, but there " + (A.length === 2 ? "are 2 answers" : "are " + A.length + " answers") + ". Separate them with \"or\".");
      return BAD;
    }
    function pairParts(s) {
      var m = /^\(?\s*([a-z])\s*=\s*([^,;]+?)\s*(?:,|;|\band\b|\s)\s*([a-z])\s*=\s*(.+?)\s*\)?$/.exec(s);
      if (m) return m[1] < m[3] ? [m[2], m[4]] : [m[4], m[2]];
      var t = sq(s).replace(/^\(/, "").replace(/\)$/, "").split(",");
      return t.length === 2 ? t : null;
    }
    function judgePair(v, a) {
      var A = pairParts(a), V = pairParts(v);
      if (!A) return BAD;
      if (!V) return bad("Write it as an ordered pair, like (2, 5).");
      var r1 = judgeExpr(V[0], A[0]), r2 = judgeExpr(V[1], A[1]);
      if (r1.r === "ok" && r2.r === "ok") return OK;
      if (judgeExpr(V[1], A[0]).r === "ok" && judgeExpr(V[0], A[1]).r === "ok") return bad("Those are the right numbers in the wrong order: x comes first, then y.");
      if (r1.r === "near" || r2.r === "near") return near(r1.why || r2.why);
      return BAD;
    }
    function judgeOne(v, a) {
      if (/^#/.test(a)) {
        // #3/4: the answer must be written as a fraction
        var r0 = judgeOne(v, a.slice(1));
        return r0.r === "ok" && /\./.test(v) ? near("Equal, but write it as a fraction.") : r0;
      }
      var kind = kindOf(a);
      if (kind === "strict") return sq(v) === sq(a.slice(1)) ? OK : BAD;
      v = prep(v, a);
      if (!v) return { r: "blank" };
      if (sq(v) === sq(a)) return OK;
      switch (kind) {
        case "text": return textNorm(v) === textNorm(a) ? OK : BAD;
        case "set": return judgeSet(v, a);
        case "pair": return judgePair(v, a);
        case "ineq": return judgeIneq(v, a);
        case "eq": return judgeEq(v, a);
        default: return judgeExpr(v, a);
      }
    }
    // Compare a student's answer with every accepted answer: { r: "ok" | "near" | "bad" | "blank", why }.
    // "near" means equal to the answer but not in the form asked (not simplified, a rounded decimal…).
    function judgeFull(value, answers) {
      var v = mnorm(value);
      if (!v) return { r: "blank" };
      var list = (Array.isArray(answers) ? answers : [answers]).map(function (a) { return mnorm(a); });
      var best = null;
      for (var i = 0; i < list.length; i++) {
        var res = judgeOne(v, list[i]);
        if (res.r === "ok") return res;
        if (!best || (res.r === "near" && best.r !== "near") || (res.r === "bad" && best.r === "bad" && !best.why && res.why)) best = res;
      }
      return best || BAD;
    }
    function judge(value, answers) { return judgeFull(value, answers).r; }
    // For the build: can every accepted answer be read, and does each one count as right against itself?
    function answerProblem(a) {
      var n = mnorm(a).replace(/^#/, ""), kind = kindOf(n);
      if (kind === "strict" || kind === "text") return "";
      if (kind === "expr" && !parse(n.replace(/^~/, "").replace(/^[a-z]\s*=\s*/, ""))) return "can't read the answer \"" + a + "\"";
      if (kind === "ineq" && !ineqParse(n)) return "can't read the inequality \"" + a + "\"";
      if (kind === "pair" && !pairParts(n)) return "can't read the pair \"" + a + "\"";
      if (judgeOne(n, n).r !== "ok") return "the answer \"" + a + "\" doesn't count as right against itself";
      return "";
    }

    /* ---------- checking that an answer really solves its equation (used by the build) ---------- */
    function truth(rel, env) {
      // "2x - 1 > 5", "x^2 = 9", "-3 < 2x + 1 <= 7"
      var parts = mnorm(rel).split(/(<=|>=|!=|<|>|=)/).map(function (x) { return x.trim(); });
      var vals = [];
      for (var i = 0; i < parts.length; i += 2) { var t = parse(parts[i]); if (!t) return null; vals.push(evaluate(t, env)); }
      for (var j = 1; j < parts.length; j += 2) {
        var x = vals[(j - 1) / 2], y = vals[(j + 1) / 2], op = parts[j], c = close(x, y);
        var ok = op === "=" ? c : op === "!=" ? !c : op === "<" ? x < y && !c : op === ">" ? x > y && !c : op === "<=" ? x < y || c : x > y || c;
        if (!ok) return false;
      }
      return true;
    }
    function solves(eq, ans) {
      var eqs = mnorm(eq).split(";").map(function (x) { return x.trim(); });
      var a = mnorm(ans).replace(/^[!~#]/, "");
      var vs = [];
      eqs.forEach(function (e) { e.split(/<=|>=|!=|<|>|=/).forEach(function (side) { var t = parse(side); if (t) vars(t).forEach(function (v) { if (vs.indexOf(v) === -1) vs.push(v); }); }); });
      vs.sort();
      var kind = kindOf(a);
      if (kind === "text") {
        if (eqs.length > 1 || vs.length !== 1) return "";
        var sides = eqs[0].split("=");
        var f = parse("(" + sides[0] + ")-(" + sides[1] + ")");
        if (!f) return "can't read " + eq;
        // Scan from −100 to 100: a zero or a sign change means there is a solution.
        var prev = null, hasRoot = false, allZero = true;
        for (var x0 = -100; x0 <= 100; x0 += 0.01) {
          var env0 = {}; env0[vs[0]] = x0;
          var r = evaluate(f, env0);
          if (!isFinite(r)) { prev = null; continue; }
          if (Math.abs(r) < 1e-9) hasRoot = true; else allZero = false;
          if (prev !== null && prev * r < 0) hasRoot = true;
          prev = r;
        }
        if (/no ?solution/.test(textNorm(a))) return hasRoot ? eq + " does have a solution" : "";
        if (/allreal|infinite/.test(textNorm(a))) return allZero ? "" : eq + " isn't true for every number";
        return "";
      }
      if (/[<>]/.test(a) && kind !== "pair") {
        var v = vs[0], pts = [];
        (a.match(/-?\d+(\.\d+)?(\/\d+)?/g) || []).forEach(function (n) { pts.push(value(n)); });
        for (var x = -30; x <= 30; x += 0.25) pts.push(x);
        var bad1 = pts.filter(function (x) {
          var env = {}; env[v] = x;
          var te = eqs.every(function (e) { return truth(e, env); });
          var ta = a.split(/\bor\b/).some(function (piece) { return piece.split(/\band\b/).every(function (q) { return truth(q, env); }); });
          return te !== ta;
        });
        return bad1.length ? `"${ans}" doesn't match ${eq} (try x = ${bad1[0]})` : "";
      }
      var sols = [];
      if (kind === "pair") { var pp = pairParts(a); if (!pp || vs.length !== 2) return ""; var env2 = {}; env2[vs[0]] = value(pp[0]); env2[vs[1]] = value(pp[1]); sols.push(env2); }
      else {
        if (vs.length !== 1) return "";
        splitSet(a).forEach(function (s) { var env3 = {}; env3[vs[0]] = value(s.replace(/^[a-z]\s*=\s*/, "")); sols.push(env3); });
      }
      for (var i = 0; i < sols.length; i++) {
        var env4 = sols[i];
        if (Object.keys(env4).some(function (k) { return !isFinite(env4[k]); })) return `can't read the answer "${ans}"`;
        if (!eqs.every(function (e) { return truth(e, env4); })) return `"${ans}" doesn't solve ${eq}`;
      }
      return "";
    }

    /* ======================= showing math ======================= */
    // {{3x^2 - 5 <= 7}} → 3x² − 5 ≤ 7, with letters in italics. Plain words (3+ letters, and "or") stay upright.
    function matching(s, i) { var d = 0; for (var j = i; j < s.length; j++) { if (s[j] === "(") d++; else if (s[j] === ")") { d--; if (!d) return j; } } return -1; }
    function mfmt(s) {
      s = String(s);
      var out = "", i = 0;
      while (i < s.length) {
        var c = s[i], rest = s.slice(i);
        if (rest.slice(0, 2) === "<=") { out += " ≤ ".trim(); i += 2; continue; }
        if (rest.slice(0, 2) === ">=") { out += "≥"; i += 2; continue; }
        if (rest.slice(0, 2) === "!=") { out += "≠"; i += 2; continue; }
        if (/^sqrt\(/.test(rest) || (c === "√" && s[i + 1] === "(")) {
          var st = i + (c === "√" ? 1 : 4), en = matching(s, st);
          if (en > 0) { out += '√<span class="rad">' + mfmt(s.slice(st + 1, en)) + "</span>"; i = en + 1; continue; }
        }
        if (c === "√") { var mm = /^√(\d+|[a-z])/.exec(rest); if (mm) { out += '√<span class="rad">' + mfmt(mm[1]) + "</span>"; i += mm[0].length; continue; } }
        if (c === "^") {
          var ex = null;
          if (s[i + 1] === "(") { var e2 = matching(s, i + 1); if (e2 > 0) { ex = s.slice(i + 2, e2); i = e2 + 1; } }
          if (ex == null) { var m2 = /^\^(-?\d+(\.\d+)?|-?[a-z])/.exec(rest); if (m2) { ex = m2[1]; i += m2[0].length; } else { out += "^"; i++; continue; } }
          out += "<sup>" + mfmt(ex) + "</sup>"; continue;
        }
        var fr = /^(\d+)\/(\d+)(?![\d.])/.exec(rest);
        if (fr && !/[\d.)a-z]$/i.test(s.slice(0, i))) { out += '<span class="fr"><span>' + fr[1] + "</span><span>" + fr[2] + "</span></span>"; i += fr[0].length; continue; }
        if (/[a-zA-Z]/.test(c)) {
          var w = /^[a-zA-Z]+/.exec(rest)[0];
          if (w === "pi") out += "π";
          else if (w.length >= 3 || w === "or" || w === "to") out += w;
          else out += w.split("").map(function (ch) { return '<i class="v">' + ch + "</i>"; }).join("");
          i += w.length; continue;
        }
        if (c === "-") { out += "−"; i++; continue; }
        if (c === "*") { out += "·"; i++; continue; }
        if (c === "<") { out += "&lt;"; i++; continue; }
        if (c === ">") { out += "&gt;"; i++; continue; }
        if (c === "&") { out += "&amp;"; i++; continue; }
        if (c === '"') { out += "&quot;"; i++; continue; }
        out += c; i++;
      }
      return out;
    }
    // The same math as plain text, for answer keys and screen readers.
    function mplain(s) {
      return String(s).replace(/sqrt\(([^()]*)\)/g, "√($1)").replace(/\^(\d)(?!\d)/g, function (_, d) { return SUPS[Number(d)]; })
        .replace(/<=/g, "≤").replace(/>=/g, "≥").replace(/!=/g, "≠").replace(/\*/g, "·").replace(/\bpi\b/g, "π");
    }

    /* ---------- graphs ---------- */
    var gid = 0;
    function num(v) { return Math.round(v * 100) / 100; }
    function fnOf(src) { var t = parse(src); return t ? function (x) { return evaluate(t, { x: x }); } : null; }
    // g: { x: [-6, 6], y: [-6, 6], xstep, ystep, w, lines: [{ fn: "2x+1", c: 0, dash, label, dom: [a, b] } | { xeq: 3 }],
    //      points: [[x, y, "label", color, open]], segs: [[x1, y1, x2, y2, color]], shade: [{ fn, side: ">" | "<", c }], xlabel, ylabel, alt }
    function graphSVG(g, extra) {
      g = g || {};
      var xr = g.x || [-6, 6], yr = g.y || [-6, 6], xs = g.xstep || 1, ys = g.ystep || 1;
      var W = g.w || 320, pad = g.pad || 26;
      var cx = (W - 2 * pad) / (xr[1] - xr[0]);
      var cy = g.h ? (g.h - 2 * pad) / (yr[1] - yr[0]) : cx * xs / ys;
      var H = Math.round(2 * pad + cy * (yr[1] - yr[0]));
      function X(x) { return num(pad + (x - xr[0]) * cx); }
      function Y(y) { return num(H - pad - (y - yr[0]) * cy); }
      var id = "gc" + (++gid), o = [];
      o.push('<svg class="gsvg" viewBox="0 0 ' + W + " " + H + '" width="' + W + '" role="img" aria-label="' + esc(g.alt || "Graph") + '" data-xlo="' + xr[0] + '" data-yhi="' + yr[1] + '" data-cx="' + cx + '" data-cy="' + cy + '" data-pad="' + pad + '" data-w="' + W + '" data-h="' + H + '">');
      o.push('<defs><clipPath id="' + id + '"><rect x="' + pad + '" y="' + pad + '" width="' + num(W - 2 * pad) + '" height="' + num(H - 2 * pad) + '"/></clipPath>' +
        '<marker id="' + id + 'a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="g-axfill"/></marker></defs>');
      o.push('<rect x="' + pad + '" y="' + pad + '" width="' + num(W - 2 * pad) + '" height="' + num(H - 2 * pad) + '" class="g-bg"/>');
      if (g.bare) {
        // A plain drawing (shapes and labels), no grid or axes.
        o.length = 1;
        (g.segs || []).forEach(function (sg) { o.push('<line x1="' + X(sg[0]) + '" y1="' + Y(sg[1]) + '" x2="' + X(sg[2]) + '" y2="' + Y(sg[3]) + '" class="g-line c' + (sg[4] || 0) + (sg[5] ? " dash" : "") + '"/>'); });
        (g.points || []).forEach(function (pt) { o.push('<circle cx="' + X(pt[0]) + '" cy="' + Y(pt[1]) + '" r="4" class="g-pt c' + (pt[3] || 0) + '"/>'); });
        (g.texts || []).forEach(function (tx) { o.push('<text x="' + X(tx[0]) + '" y="' + num(Y(tx[1]) + 5) + '" text-anchor="middle" class="g-txt">' + esc(mplain(tx[2])) + "</text>"); });
        o.push("</svg>");
        return o.join("");
      }
      var nx = Math.round((xr[1] - xr[0]) / xs), ny = Math.round((yr[1] - yr[0]) / ys);
      var everyX = g.xevery || Math.max(1, Math.ceil(nx / 12)), everyY = g.yevery || Math.max(1, Math.ceil(ny / 12));
      var ax = yr[0] <= 0 && yr[1] >= 0 ? Y(0) : Y(yr[0]), ay = xr[0] <= 0 && xr[1] >= 0 ? X(0) : X(xr[0]);
      var lab = [];
      for (var i = 0; i <= nx; i++) {
        var xv = num(xr[0] + i * xs);
        o.push('<line x1="' + X(xv) + '" y1="' + pad + '" x2="' + X(xv) + '" y2="' + (H - pad) + '" class="g-grid"/>');
        if (i % everyX === 0 && (xv !== 0 || ax !== Y(0) || ay !== X(0)) && (xv !== xr[0] || ay !== X(xr[0])))
          lab.push('<text x="' + X(xv) + '" y="' + num(Math.min(ax + 14, H - 4)) + '" class="g-tick" text-anchor="middle">' + String(xv).replace("-", "−") + "</text>");
      }
      for (var j = 0; j <= ny; j++) {
        var yv = num(yr[0] + j * ys);
        o.push('<line x1="' + pad + '" y1="' + Y(yv) + '" x2="' + (W - pad) + '" y2="' + Y(yv) + '" class="g-grid"/>');
        if (j % everyY === 0 && (yv !== 0 || ax !== Y(0) || ay !== X(0)) && (yv !== yr[0] || ax !== Y(yr[0])))
          lab.push('<text x="' + num(ay - 5) + '" y="' + num(Y(yv) + 4) + '" class="g-tick" text-anchor="end">' + String(yv).replace("-", "−") + "</text>");
      }
      if (ax === Y(0) && ay === X(0)) lab.push('<text x="' + num(ay - 5) + '" y="' + num(ax + 14) + '" class="g-tick" text-anchor="end">0</text>');
      var arrows = xr[0] < 0 && yr[0] < 0;
      o.push('<line x1="' + (arrows ? pad - 6 : pad) + '" y1="' + ax + '" x2="' + (W - pad + 6) + '" y2="' + ax + '" class="g-axis"' + (arrows ? ' marker-start="url(#' + id + 'a)"' : "") + ' marker-end="url(#' + id + 'a)"/>');
      o.push('<line x1="' + ay + '" y1="' + (arrows ? H - pad + 6 : H - pad) + '" x2="' + ay + '" y2="' + (pad - 6) + '" class="g-axis"' + (arrows ? ' marker-start="url(#' + id + 'a)"' : "") + ' marker-end="url(#' + id + 'a)"/>');
      o.push(lab.join(""));
      o.push('<text x="' + (W - 4) + '" y="' + num(ax - 6) + '" class="g-axlab" text-anchor="end">' + esc(g.xlabel || "x") + "</text>");
      o.push('<text x="' + num(ay + 6) + '" y="' + (pad - 10) + '" class="g-axlab">' + esc(g.ylabel || "y") + "</text>");
      o.push('<g clip-path="url(#' + id + ')">');
      (g.shade || []).forEach(function (sh) {
        var f = fnOf(sh.fn); if (!f) return;
        var pts = [], N = 120;
        for (var k = 0; k <= N; k++) { var x = xr[0] + (xr[1] - xr[0]) * k / N; pts.push(X(x) + "," + Y(Math.max(yr[0] - 50, Math.min(yr[1] + 50, f(x))))); }
        var edge = sh.side === "<" ? Y(yr[0]) + 50 : Y(yr[1]) - 50;
        o.push('<polygon points="' + X(xr[0]) + "," + edge + " " + pts.join(" ") + " " + X(xr[1]) + "," + edge + '" class="g-shade c' + (sh.c || 0) + '"/>');
      });
      (g.lines || []).forEach(function (ln) {
        var cls = "g-line c" + (ln.c || 0) + (ln.dash ? " dash" : "");
        if (ln.xeq != null) { o.push('<line x1="' + X(ln.xeq) + '" y1="' + pad + '" x2="' + X(ln.xeq) + '" y2="' + (H - pad) + '" class="' + cls + '"/>'); return; }
        var f = fnOf(ln.fn); if (!f) return;
        var a = ln.dom ? Math.max(xr[0], ln.dom[0]) : xr[0] - 0.5, b = ln.dom ? Math.min(xr[1], ln.dom[1]) : xr[1] + 0.5;
        var d = "", pen = false, N = 240, last = null;
        for (var k = 0; k <= N; k++) {
          var x = a + (b - a) * k / N, y = f(x);
          if (!isFinite(y) || y > yr[1] + 40 || y < yr[0] - 40) { pen = false; continue; }
          d += (pen ? " L" : " M") + X(x) + " " + Y(y); pen = true;
          if (y <= yr[1] && y >= yr[0] && x <= xr[1] && x >= xr[0]) last = [x, y];
        }
        o.push('<path d="' + d.trim() + '" class="' + cls + '"/>');
        if (ln.label && last) ln._at = last;
      });
      (g.segs || []).forEach(function (sg) { o.push('<line x1="' + X(sg[0]) + '" y1="' + Y(sg[1]) + '" x2="' + X(sg[2]) + '" y2="' + Y(sg[3]) + '" class="g-line c' + (sg[4] || 0) + (sg[5] ? " dash" : "") + '"/>'); });
      o.push("</g>");
      (g.lines || []).forEach(function (ln) {
        if (!ln.label) return;
        var at = ln.at || ln._at; if (!at) return;
        var lx = X(at[0]), ly = Y(at[1]);
        var anchor = lx > W - 90 ? "end" : "start";
        o.push('<text x="' + num(anchor === "end" ? lx - 6 : lx + 6) + '" y="' + num(Math.max(pad + 12, Math.min(H - pad - 6, ly - 6))) + '" text-anchor="' + anchor + '" class="g-lab c' + (ln.c || 0) + '">' + esc(mplain(ln.label)) + "</text>");
      });
      (g.points || []).forEach(function (pt) {
        o.push('<circle cx="' + X(pt[0]) + '" cy="' + Y(pt[1]) + '" r="4.5" class="g-pt c' + (pt[3] || 0) + (pt[4] ? " open" : "") + '"/>');
        if (pt[2]) o.push('<text x="' + num(X(pt[0]) + 7) + '" y="' + num(Y(pt[1]) - 7) + '" class="g-ptlab">' + esc(mplain(pt[2])) + "</text>");
      });
      (g.texts || []).forEach(function (tx) { o.push('<text x="' + X(tx[0]) + '" y="' + num(Y(tx[1]) + 5) + '" text-anchor="middle" class="g-txt">' + esc(mplain(tx[2])) + "</text>"); });
      if (extra) o.push(extra(X, Y));
      o.push("</svg>");
      return o.join("");
    }
    // Number lines: "x >= -2", "-1 < x <= 4", "x < -1 or x >= 2", "pts:-3,1.5,2" (dots), "x > 1 @ -5..5" (range).
    function numberLine(spec) {
      spec = String(spec);
      var range = null, at = spec.indexOf("@");
      if (at !== -1) { var r = spec.slice(at + 1).split(".."); range = [Number(r[0]), Number(r[1])]; spec = spec.slice(0, at); }
      var groups = [], dots = [];
      if (/^pts:/.test(spec.trim())) {
        spec.trim().slice(4).split(",").forEach(function (p) { var kv = p.split("="); dots.push([value(kv[0]), true, kv[1] || ""]); });
      } else {
        mnorm(spec).split(/\bor\b/).forEach(function (piece) { var c = ineqParse(piece) || (/=/.test(piece) ? [["=", value(piece.split("=")[1])]] : null); if (c) groups.push(c); });
      }
      var vals = dots.map(function (d) { return d[0]; });
      groups.forEach(function (gr) { gr.forEach(function (c) { vals.push(c[1]); }); });
      if (!vals.length) vals = [0];
      var lo = range ? range[0] : Math.floor(Math.min.apply(null, vals.concat([0]))) - 3, hi = range ? range[1] : Math.ceil(Math.max.apply(null, vals.concat([0]))) + 3;
      if (!range && hi - lo < 10) { var add = 10 - (hi - lo); lo -= Math.floor(add / 2); hi += Math.ceil(add / 2); }
      if (!range && hi - lo > 24) { lo = Math.floor(Math.min.apply(null, vals)) - 3; hi = Math.ceil(Math.max.apply(null, vals)) + 3; }
      var W = 320, H = 58, pad = 18, base = 26, cx = (W - 2 * pad) / (hi - lo);
      function X(x) { return num(pad + (x - lo) * cx); }
      var id = "nl" + (++gid), o = [];
      var every = hi - lo > 16 ? (hi - lo > 40 ? 10 : hi - lo > 30 ? 5 : 2) : 1;
      o.push('<svg class="nlsvg" viewBox="0 0 ' + W + " " + H + '" width="' + W + '" role="img" aria-label="Number line: ' + esc(mplain(spec)) + '">');
      o.push('<defs><marker id="' + id + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="g-axfill"/></marker>' +
        '<marker id="' + id + 'b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="nl-fill"/></marker></defs>');
      o.push('<line x1="4" y1="' + base + '" x2="' + (W - 4) + '" y2="' + base + '" class="g-axis" marker-start="url(#' + id + ')" marker-end="url(#' + id + ')"/>');
      for (var t = Math.ceil(lo); t <= hi; t++) {
        var big = t % every === 0;
        o.push('<line x1="' + X(t) + '" y1="' + (base - (big ? 6 : 3)) + '" x2="' + X(t) + '" y2="' + (base + (big ? 6 : 3)) + '" class="g-axis"/>');
        if (big) o.push('<text x="' + X(t) + '" y="' + (base + 22) + '" class="g-tick" text-anchor="middle">' + String(t).replace("-", "−") + "</text>");
      }
      groups.forEach(function (gr) {
        if (gr.length === 1 && gr[0][0] === "=") { dots.push([gr[0][1], true]); return; }
        if (gr.length === 1) {
          var c = gr[0], right = c[0].charAt(0) === ">";
          o.push('<line x1="' + X(c[1]) + '" y1="' + base + '" x2="' + (right ? W - 8 : 8) + '" y2="' + base + '" class="nl-ray" marker-end="url(#' + id + 'b)"/>');
          dots.push([c[1], c[0].length === 2]);
        } else {
          var lo2 = gr[0][1] < gr[1][1] ? gr[0] : gr[1], hi2 = lo2 === gr[0] ? gr[1] : gr[0];
          o.push('<line x1="' + X(lo2[1]) + '" y1="' + base + '" x2="' + X(hi2[1]) + '" y2="' + base + '" class="nl-ray"/>');
          dots.push([lo2[1], lo2[0].length === 2]); dots.push([hi2[1], hi2[0].length === 2]);
        }
      });
      dots.forEach(function (d) {
        o.push('<circle cx="' + X(d[0]) + '" cy="' + base + '" r="5.5" class="nl-dot' + (d[1] ? "" : " open") + '"/>');
        if (d[2]) o.push('<text x="' + X(d[0]) + '" y="' + (base - 11) + '" class="g-ptlab" text-anchor="middle">' + esc(d[2]) + "</text>");
      });
      o.push("</svg>");
      return o.join("");
    }

    /* ======================= text markup ======================= */
    // Text exactly as read: no markup, single spaces.
    function plain(s) {
      return String(s).replace(/\{\{(.+?)\}\}/g, function (_, m) { return mplain(m); }).replace(/%%nl:(.+?)%%/g, "[number line: $1]").replace(/%%fig:(.+?)%%/g, "[graph]")
        .replace(/<[^>]+>/g, "").replace(/\*\*/g, "").replace(/(^|[^\w*])\*([^*\n]+?)\*(?!\w)/g, "$1$2")
        .replace(/\(\((.*?)\)\)/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    }
    function clean(s) { return String(s).normalize("NFC").replace(/\s+/g, " ").trim(); }
    // Inline markup: **bold**, *italic*, {{math}}, ((clue)), %%nl:x > 3%% (number line), %%fig:name%% (a graph from the module's figs).
    function inline(s) {
      s = String(s == null ? "" : s);
      var keep = [];
      function hold(h) { keep.push(h); return "\u0001" + (keep.length - 1) + "\u0001"; }
      s = s.replace(/\{\{(.+?)\}\}/g, function (_, m) { return hold('<span class="m">' + mfmt(m) + "</span>"); });
      s = s.replace(/%%nl:(.+?)%%/g, function (_, m) { return hold('<span class="fig nl">' + numberLine(m) + "</span>"); });
      s = s.replace(/%%fig:(.+?)%%/g, function (_, m) { return hold('<span class="fig">' + (FIGS[m] ? graphSVG(FIGS[m]) : "[missing graph " + esc(m) + "]") + "</span>"); });
      s = emph(s);
      return s.replace(/\u0001(\d+)\u0001/g, function (_, i) { return keep[Number(i)]; });
    }
    function emph(s) {
      return s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/(^|[^\w*])\*([^*\n]+?)\*(?!\w)/g, "$1<i>$2</i>")
        .replace(/\(\((.*?)\)\)/g, '<span class="clue">($1)</span>');
    }
    // Block markup: blank lines make paragraphs; lines starting with "- " make a list; "> " a quotation.
    function rich(s) {
      return String(s == null ? "" : s).split(/\n\s*\n/).map(function (chunk) {
        chunk = chunk.trim();
        if (!chunk) return "";
        if (/^<(table|div|ul|ol|p|h\d|svg|figure)/i.test(chunk)) return inline(chunk);
        var lines = chunk.split("\n");
        if (lines.every(function (l) { return /^\s*> ?/.test(l); }))
          return "<blockquote>" + inline(lines.map(function (l) { return l.replace(/^\s*> ?/, ""); }).join(" ")) + "</blockquote>";
        if (lines.every(function (l) { return /^\s*- /.test(l); }))
          return "<ul>" + lines.map(function (l) { return "<li>" + inline(l.replace(/^\s*- /, "")) + "</li>"; }).join("") + "</ul>";
        if (lines.every(function (l) { return /^\s*\d+\. /.test(l); }))
          return "<ol>" + lines.map(function (l) { return "<li>" + inline(l.replace(/^\s*\d+\. /, "")) + "</li>"; }).join("") + "</ol>";
        return "<p>" + inline(lines.join(" ")) + "</p>";
      }).join("");
    }
    // Option text in tap-to-choose items: math-looking options are shown as math.
    function opt(s) { return /[a-z]{3}/i.test(s.replace(/sqrt/g, "")) ? esc(s) : mfmt(s); }

    /* ---------- cloze and choice sentences ---------- */
    // "{{3x = 12}}, so x = [4]." -> parts [{text}, {answers}, {text}]. Answers can list alternatives with |.
    function clozeParts(s) {
      var parts = [], re = /\[([^\]]+)\]/g, last = 0, m;
      while ((m = re.exec(s))) {
        if (m.index > last) parts.push({ text: s.slice(last, m.index) });
        parts.push({ answers: m[1].split("|") });
        last = m.index + m[0].length;
      }
      if (last < s.length) parts.push({ text: s.slice(last) });
      return parts;
    }
    // "The {coefficient|constant|variable} of 5x is 5." -> the first option is right. {{math}} is left alone.
    function pickParts(s) {
      var parts = [], i = 0, buf = "";
      while (i < s.length) {
        if (s.slice(i, i + 2) === "{{") { var e = s.indexOf("}}", i); buf += s.slice(i, e + 2); i = e + 2; continue; }
        if (s[i] === "{") {
          var end = s.indexOf("}", i);
          if (buf) parts.push({ text: buf });
          buf = "";
          parts.push({ options: s.slice(i + 1, end).split("|") });
          i = end + 1; continue;
        }
        buf += s[i]; i++;
      }
      if (buf) parts.push({ text: buf });
      return parts;
    }
    // Word tiles for "build the equation": "2x + 5 = 17" -> ["2x", "+", "5", "=", "17"]
    function tokens(sentence) { return { lead: "", trail: "", words: String(sentence).trim().split(/\s+/).map(function (w) { return w.replace(/_/g, " "); }) }; }
    function itemText(it) { return typeof it === "string" ? it : (it.s || it.a || it.w || ""); }

    return {
      esc: esc, plain: plain, clean: clean, inline: inline, emph: emph, rich: rich, opt: opt,
      mnorm: mnorm, parse: parse, evaluate: evaluate, vars: vars, equiv: equiv, value: value,
      judge: judge, judgeFull: judgeFull, answerProblem: answerProblem, solves: solves, truth: truth, kindOf: kindOf,
      mfmt: mfmt, mplain: mplain, graphSVG: graphSVG, numberLine: numberLine, fnOf: fnOf,
      clozeParts: clozeParts, pickParts: pickParts, tokens: tokens, itemText: itemText,
      setFigs: function (f) { FIGS = f || {}; }, SETTINGS: SETTINGS
    };
  })();

  if (typeof module === "object" && module.exports) { module.exports = Text; return; }

  /* ======================= Course: the page ======================= */
  root.Course = (function () {
    var M = null, KEY = "";
    var state = { done: {}, star: {}, hints: {}, extra: {}, reflect: "", build: "" };
    var esc = Text.esc, rich = Text.rich, inline = Text.inline;

    /* ---------- helpers ---------- */
    function el(tag, attrs, text) {
      var e = document.createElement(tag);
      if (attrs) Object.keys(attrs).forEach(function (k) { if (attrs[k] != null) e.setAttribute(k, attrs[k]); });
      if (text != null) e.textContent = text;
      return e;
    }
    function html(tag, attrs, markup) { var e = el(tag, attrs); e.innerHTML = markup; return e; }
    function $(id) { return document.getElementById(id); }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
    function bag(id, empty) { return state.extra[id] || (state.extra[id] = empty || {}); }

    function feedback(box, ok, msg, list) {
      box.innerHTML = "";
      if (!msg) return;
      var fb = el("div", { "class": "feedback " + (ok ? "ok" : "bad"), role: "status" });
      fb.appendChild(html("span", null, (ok ? "✓ " : "") + inline(msg)));
      if (list && list.length) {
        var ul = el("ul");
        list.forEach(function (t) { ul.appendChild(html("li", null, inline(t))); });
        fb.appendChild(ul);
      }
      box.appendChild(fb);
    }
    function markDone(id) {
      if (!state.done[id]) { state.done[id] = true; save(); }
      refresh();
    }

    /* ---------- per-student variation ---------- */
    var R = {
      int: function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); },
      pick: function (list) { return list[Math.floor(Math.random() * list.length)]; },
      shuffle: function (list) {
        var a = list.slice();
        for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
        return a;
      },
      sample: function (list, n) { return R.shuffle(list).slice(0, n); }
    };
    function vary(key, make) {
      var v = state.extra.vary || (state.extra.vary = {});
      if (v[key] === undefined) { v[key] = make(R); save(); }
      return v[key];
    }
    function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
    // A shuffled order of n things, the same on reload; never the original order when n > 1.
    function shuffled(key, n) {
      var order = vary(key, function (r) {
        var o; var tries = 0;
        do { o = r.shuffle(range(n)); tries++; } while (n > 1 && tries < 6 && o.every(function (v, i) { return v === i; }));
        return o;
      });
      return order.length === n ? order : range(n);
    }
    // Tasks with pick: n show each student n items from the full list.
    function chosen(t, list) {
      list = list || t.items || [];
      if (!t.pick || t.pick >= list.length) return list.map(function (it, i) { return { it: it, i: i }; });
      var idx = vary("pick:" + t.id, function (r) { return r.sample(range(list.length), t.pick).sort(function (a, b) { return a - b; }); });
      return idx.filter(function (i) { return i < list.length; }).map(function (i) { return { it: list[i], i: i }; });
    }

    /* ---------- hint ladders ---------- */
    function hints(id, list, button, box) {
      if (!list || !list.length) { button.hidden = true; return; }
      function render() {
        box.innerHTML = "";
        var shown = Math.min(state.hints[id] || 0, list.length);
        for (var i = 0; i < shown; i++) box.appendChild(html("div", { "class": "hint" }, "<b>Hint " + (i + 1) + ":</b> " + inline(list[i])));
        if (shown >= list.length) button.textContent = "No more hints";
      }
      render();
      button.addEventListener("click", function () {
        var shown = state.hints[id] || 0;
        if (shown < list.length) { state.hints[id] = shown + 1; save(); }
        render();
      });
    }
    // After two wrong tries on a problem, offer its worked solution.
    function howButton(host, it, tries) {
      if (!it.how || host.querySelector(".how")) return;
      if ((tries || 0) < 2) return;
      var wrap = el("div", { "class": "how" });
      var b = el("button", { type: "button", "class": "ghost small" }, "Show me how");
      var box = el("div", { "class": "how-box" });
      box.hidden = true;
      var steps = Array.isArray(it.how) ? it.how : [it.how];
      box.appendChild(html("ol", null, steps.map(function (s) { return "<li>" + inline(s) + "</li>"; }).join("")));
      box.appendChild(html("p", { "class": "goal" }, "Now type the answer yourself. Then try the next one without looking."));
      b.addEventListener("click", function () { box.hidden = !box.hidden; b.textContent = box.hidden ? "Show me how" : "Hide the steps"; });
      wrap.appendChild(b); wrap.appendChild(box);
      host.appendChild(wrap);
    }

    /* ======================= math keys ======================= */
    // Tapping a key types into the last box you used, without closing the iPad keyboard.
    function keyBar(scope, keys) {
      var bar = el("div", { "class": "accents", role: "group", "aria-label": "Math keys" });
      bar.appendChild(el("span", { "class": "lbl" }, SETTINGS.keyLabel));
      var last = null;
      (keys || SETTINGS.keys).forEach(function (k) {
        var b = el("button", { type: "button", "aria-label": "Type " + k }, k);
        b.addEventListener("pointerdown", function (e) { e.preventDefault(); });
        b.addEventListener("mousedown", function (e) { e.preventDefault(); });
        b.addEventListener("click", function () {
          var input = last && scope.contains(last) && !last.disabled ? last : scope.querySelector(".es-in:not([disabled])");
          if (!input) return;
          var s = input.selectionStart != null ? input.selectionStart : input.value.length;
          var e2 = input.selectionEnd != null ? input.selectionEnd : s;
          input.value = input.value.slice(0, s) + k + input.value.slice(e2);
          input.focus();
          try { input.setSelectionRange(s + k.length, s + k.length); } catch (err) {}
          input.dispatchEvent(new Event("input", { bubbles: true }));
        });
        bar.appendChild(b);
      });
      scope.addEventListener("focusin", function (e) { if (e.target.classList && e.target.classList.contains("es-in")) last = e.target; });
      return bar;
    }
    function esInput(attrs) {
      var a = Object.assign({ "class": "es-in", autocomplete: "off", autocapitalize: "off", autocorrect: "off", spellcheck: "false", type: "text" }, attrs || {});
      return el("input", a);
    }
    function setMark(input, result) {
      input.classList.remove("ok", "bad", "near");
      if (result === "ok") input.classList.add("ok");
      else if (result === "near") input.classList.add("near");
      else if (result === "bad") input.classList.add("bad");
    }
    function fig(name) { return name ? html("div", { "class": "fig-wrap" }, inline("%%fig:" + name + "%%")) : null; }
    function addFig(host, name) { var f = fig(name); if (f) host.appendChild(f); }

    /* ======================= task shell ======================= */
    var TYPE_NAMES = {
      mc: "Choose", quiz: "Choose", read: "Read and solve", cloze: "Fill in", select: "Choose", match: "Match", sort: "Sort",
      order: "Build the equation", steps: "Put in order", selfcheck: "Self-check", grid: "Fill in the table", solve: "Solve",
      mistake: "Find the mistake", plot: "Graph it"
    };
    function shell(t, host, optional) {
      var card = el("div", { "class": "task" + (t.star ? " star" : ""), id: "task-" + t.id });
      var head = el("div", { "class": "task-head" });
      var titleWrap = el("div");
      titleWrap.appendChild(el("div", { "class": "task-type" }, t.kind || TYPE_NAMES[t.type] || ""));
      titleWrap.appendChild(html("h3", null, inline(t.title)));
      head.appendChild(titleWrap);
      var chip = t.star ? el("span", { "class": "chip star", "data-star": t.id }, "★ Challenge") : optional ? el("span", { "class": "chip opt" }, "Optional") : el("span", { "class": "chip", "data-chip": t.id }, "To do");
      head.appendChild(chip);
      card.appendChild(head);
      if (t.intro) card.appendChild(html("div", { "class": "prose" }, rich(t.intro)));
      addFig(card, t.fig);
      if (t.passage) card.appendChild(html("div", { "class": "passage" }, rich(t.passage)));
      if (t.typing && t.keys !== false) card.appendChild(keyBar(card, t.keys));
      var body = el("div", { "class": "items" });
      card.appendChild(body);
      var row = el("div", { "class": "row" });
      var check = el("button", { "class": "primary", type: "button" }, t.checkLabel || "Check");
      var hintBtn = el("button", { "class": "ghost", type: "button" }, "Show a hint");
      row.appendChild(check); row.appendChild(hintBtn);
      card.appendChild(row);
      var fb = el("div");
      card.appendChild(fb);
      var hintBox = el("div", { "class": "hints" });
      card.appendChild(hintBox);
      host.appendChild(card);
      hints(t.id, t.hints, hintBtn, hintBox);
      return { card: card, body: body, check: check, row: row, fb: fb, optional: optional };
    }
    function finish(t, s, ok, msg, list) {
      feedback(s.fb, ok, msg, list);
      if (!ok) return;
      if (t.star) { if (!state.star[t.id]) { state.star[t.id] = true; save(); } refresh(); }
      else if (!s.optional) markDone(t.id);
    }
    function nearMsg(n) { return n ? " The yellow " + (n === 1 ? "answer is" : "answers are") + " equal to the right answer but not in the form asked. Read the note under " + (n === 1 ? "it" : "each one") + "." : ""; }

    /* ---------- multiple choice ---------- */
    function choiceList(key, choices, keepOrder, onPick, isDone) {
      var wrap = el("div", { "class": "choices" });
      var numeric = choices.every(function (c) { return /^\s*(\{\{)?\s*-?[\d$]/.test(c[0]); });
      var order = keepOrder || numeric ? range(choices.length) : shuffled("order:" + key, choices.length);
      var fb = el("div");
      order.forEach(function (ci, i) {
        var c = choices[ci];
        var b = el("button", { "class": "choice", type: "button", "data-right": c[1] ? "1" : "0" });
        b.appendChild(el("span", { "class": "letter" }, "ABCDEF"[i]));
        b.appendChild(html("span", { "class": "choice-text" }, inline(c[0])));
        b.addEventListener("click", function () {
          wrap.querySelectorAll(".choice").forEach(function (x) { x.classList.remove("right", "wrong"); });
          b.classList.add(c[1] ? "right" : "wrong");
          feedback(fb, !!c[1], c[2] || (c[1] ? "Correct!" : "Not quite. Try another answer."));
          onPick(!!c[1]);
        });
        if (isDone && c[1]) b.classList.add("right");
        wrap.appendChild(b);
      });
      return { wrap: wrap, fb: fb };
    }
    function taskMC(t, host, optional) {
      var s = shell(t, host, optional);
      s.row.removeChild(s.check);
      var q = el("div", { "class": "quiz-q" });
      if (t.q) q.appendChild(html("p", { "class": "q" }, inline(t.q)));
      var cl = choiceList(t.id, t.choices, t.keepOrder, function (ok) { if (ok) finish(t, s, true, ""); }, state.done[t.id] || state.star[t.id]);
      q.appendChild(cl.wrap); q.appendChild(cl.fb);
      s.body.appendChild(q);
    }
    function taskQuiz(t, host, optional) {
      var s = shell(t, host, optional);
      s.row.removeChild(s.check);
      var got = bag(t.id);
      var list = chosen(t, t.questions);
      list.forEach(function (x, n) {
        var question = x.it, qi = x.i;
        var block = el("div", { "class": "quiz-q" });
        block.appendChild(html("p", { "class": "q" }, (list.length > 1 ? (n + 1) + ". " : "") + inline(question.q)));
        addFig(block, question.fig);
        var cl = choiceList(t.id + ":" + qi, question.choices, question.keepOrder, function (ok) {
          if (ok) got[qi] = true;
          save();
          if (list.every(function (y) { return got[y.i]; })) finish(t, s, true, t.okMsg || "All correct.");
        }, got[qi]);
        block.appendChild(cl.wrap); block.appendChild(cl.fb);
        s.body.appendChild(block);
      });
    }

    /* ---------- typed answers: fill-in sentences and solve-it lists ---------- */
    function judgeInputs(rows, t, s, quiet) {
      var bad = 0, near = 0, blank = 0;
      var tries = bag(t.id + ":tries");
      rows.forEach(function (r) {
        var allOk = true, why = "";
        r.inputs.forEach(function (x) {
          var res = Text.judgeFull(x.inp.value, x.answers);
          if (!quiet || res.r === "ok") setMark(x.inp, res.r);
          if (res.r !== "ok") allOk = false;
          if (res.r === "bad") bad++; else if (res.r === "near") near++; else if (res.r === "blank") blank++;
          if (res.why && res.r !== "ok" && !why) why = res.why;
        });
        r.row.classList.toggle("right", allOk);
        r.why.textContent = ""; r.why.className = "why";
        if (allOk) return;
        if (quiet) return;
        if (why) { r.why.innerHTML = inline(why); if (near && !r.inputs.some(function (x) { return Text.judge(x.inp.value, x.answers) === "bad"; })) r.why.className = "why near"; }
        else if (r.it.why && r.inputs.some(function (x) { return Text.judge(x.inp.value, x.answers) === "bad"; })) r.why.innerHTML = inline(r.it.why);
        if (r.inputs.some(function (x) { return x.inp.value.trim(); })) { tries[r.key] = (tries[r.key] || 0) + 1; save(); }
        howButton(r.row, r.it, tries[r.key]);
      });
      if (quiet) return;
      if (!bad && !near && !blank) finish(t, s, true, t.okMsg || "All correct.");
      else if (blank && !bad && !near) feedback(s.fb, false, "Answer every one. " + blank + " still empty.");
      else feedback(s.fb, false, (bad ? "Not yet. Fix the red " + (bad === 1 ? "answer" : "answers") + "." : "Almost!") + nearMsg(near) + (bad && rows.some(function (r) { return r.it.how; }) ? " Get one wrong twice and you can see how to solve it." : ""));
    }
    function blankInput(saved, key, answers, label, s) {
      var longest = answers.reduce(function (m, a) { return Math.max(m, a.length); }, 0);
      var inp = esInput({ "aria-label": label });
      inp.style.width = Math.max(4.5, Math.min(16, longest + 3)) + "ch";
      inp.value = saved[key] || "";
      inp.addEventListener("input", function () { saved[key] = inp.value; save(); setMark(inp, null); });
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); s.check.click(); } });
      return inp;
    }
    function taskCloze(t, host, optional) {
      t.typing = true;
      var s = shell(t, host, optional);
      var saved = bag(t.id);
      var rows = chosen(t).map(function (x, n) {
        var it = typeof x.it === "string" ? { s: x.it } : x.it, src = Text.itemText(it);
        var row = el("div", { "class": "item" });
        row.appendChild(el("span", { "class": "num" }, (n + 1) + "."));
        var inputs = [];
        Text.clozeParts(src).forEach(function (p, pi) {
          if (p.text != null) { row.appendChild(html("span", null, inline(p.text))); return; }
          var inp = blankInput(saved, x.i + "." + pi, p.answers, "Blank " + (inputs.length + 1) + " in item " + (n + 1), s);
          row.appendChild(inp);
          inputs.push({ inp: inp, answers: p.answers });
        });
        var why = el("span", { "class": "why" });
        row.appendChild(why);
        s.body.appendChild(row);
        return { row: row, inputs: inputs, it: it, why: why, key: x.i };
      });
      s.check.addEventListener("click", function () { judgeInputs(rows, t, s, false); });
      if (state.done[t.id] || state.star[t.id]) judgeInputs(rows, t, s, true);
    }
    // items: { q: "Solve {{3x + 5 = 20}}", a: "5", pre: "x =", post: "feet", fig, how: [steps], why, eq: "3x+5=20" }
    function taskSolve(t, host, optional) {
      t.typing = true;
      var s = shell(t, host, optional);
      var saved = bag(t.id);
      var rows = chosen(t).map(function (x, n) {
        var it = x.it;
        var row = el("div", { "class": "item solve" });
        var qline = el("div", { "class": "q-line" });
        qline.appendChild(el("span", { "class": "num" }, (n + 1) + "."));
        qline.appendChild(html("span", { "class": "q" }, inline(it.q)));
        row.appendChild(qline);
        addFig(row, it.fig);
        var ans = el("div", { "class": "ans-line" });
        if (it.pre) ans.appendChild(html("span", { "class": "pre" }, inline(it.pre)));
        var answers = String(it.a).split("|");
        var inp = blankInput(saved, x.i, answers, "Answer to problem " + (n + 1), s);
        inp.classList.add("wide");
        ans.appendChild(inp);
        if (it.post) ans.appendChild(html("span", { "class": "post" }, inline(it.post)));
        row.appendChild(ans);
        var why = el("span", { "class": "why" });
        row.appendChild(why);
        s.body.appendChild(row);
        return { row: row, inputs: [{ inp: inp, answers: answers }], it: it, why: why, key: x.i };
      });
      s.check.addEventListener("click", function () { judgeInputs(rows, t, s, false); });
      if (state.done[t.id] || state.star[t.id]) judgeInputs(rows, t, s, true);
    }

    /* ---------- tap to choose the word in a sentence ---------- */
    function taskSelect(t, host, optional) {
      var s = shell(t, host, optional);
      var saved = bag(t.id);
      var rows = chosen(t).map(function (x, n) {
        var it = typeof x.it === "string" ? { s: x.it } : x.it, src = Text.itemText(it);
        var row = el("div", { "class": "item" });
        row.appendChild(el("span", { "class": "num" }, (n + 1) + "."));
        var picks = [];
        Text.pickParts(src).forEach(function (p, pi) {
          if (p.text != null) { row.appendChild(html("span", null, inline(p.text))); return; }
          var key = x.i + "." + pi;
          var grp = el("span", { "class": "pick", role: "group", "aria-label": "Choose one" });
          var order = shuffled("sel:" + t.id + ":" + key, p.options.length);
          var buttons = order.map(function (oi) {
            var b = html("button", { type: "button", "data-o": oi, "aria-pressed": saved[key] === oi ? "true" : "false" }, Text.opt(p.options[oi]));
            b.addEventListener("click", function () {
              saved[key] = oi; save();
              buttons.forEach(function (bb) { bb.setAttribute("aria-pressed", bb === b ? "true" : "false"); });
              row.classList.remove("right", "wrong");
            });
            grp.appendChild(b);
            return b;
          });
          row.appendChild(grp);
          picks.push(key);
        });
        var why = el("span", { "class": "why" });
        row.appendChild(why);
        s.body.appendChild(row);
        return { row: row, picks: picks, it: it, why: why };
      });
      function check(quiet) {
        var wrong = 0, blank = 0;
        rows.forEach(function (r) {
          var ok = r.picks.every(function (k) { return saved[k] === 0; });
          var empty = r.picks.some(function (k) { return saved[k] == null; });
          if (ok) { r.row.classList.add("right"); r.row.classList.remove("wrong"); r.why.textContent = ""; }
          else if (!quiet) {
            r.row.classList.remove("right");
            if (empty) blank++; else { wrong++; r.row.classList.add("wrong"); if (r.it.why) r.why.innerHTML = inline(r.it.why); }
          }
        });
        if (quiet) return;
        if (!wrong && !blank) finish(t, s, true, t.okMsg || "All correct.");
        else if (blank) feedback(s.fb, false, "Make a choice in every line. " + blank + " still need one.");
        else feedback(s.fb, false, (rows.length - wrong) + " of " + rows.length + " are right. Look again at the ones marked in pink.");
      }
      s.check.addEventListener("click", function () { check(false); });
      if (state.done[t.id] || state.star[t.id]) check(true);
    }

    /* ---------- matching pairs ---------- */
    function taskMatch(t, host, optional) {
      var s = shell(t, host, optional);
      s.row.removeChild(s.check);
      var got = bag(t.id, { pairs: [] });
      if (!got.pairs) got.pairs = [];
      var pairs = chosen(t, t.pairs);
      var grid = el("div", { "class": "match" });
      var colL = el("div", { "class": "col" }), colR = el("div", { "class": "col" });
      colL.appendChild(el("h4", null, t.left || "Problem"));
      colR.appendChild(el("h4", null, t.right || "Answer"));
      grid.appendChild(colL); grid.appendChild(colR);
      s.body.appendChild(grid);
      var sel = null;
      var leftOrder = shuffled("ml:" + t.id, pairs.length), rightOrder = shuffled("mr:" + t.id, pairs.length);
      var L = {}, Rb = {};
      leftOrder.forEach(function (k) {
        var p = pairs[k];
        var b = html("button", { type: "button", "data-k": p.i }, inline(p.it[0]));
        b.addEventListener("click", function () {
          if (got.pairs.indexOf(p.i) !== -1) return;
          if (sel) sel.classList.remove("sel");
          sel = b; b.classList.add("sel");
        });
        L[p.i] = b; colL.appendChild(b);
      });
      rightOrder.forEach(function (k) {
        var p = pairs[k];
        var b = html("button", { type: "button", "data-k": p.i }, inline(p.it[1]));
        b.addEventListener("click", function () {
          if (got.pairs.indexOf(p.i) !== -1 || !sel) { if (!sel && got.pairs.indexOf(p.i) === -1) feedback(s.fb, false, "Tap something on the left first, then its match on the right."); return; }
          var k2 = Number(sel.getAttribute("data-k"));
          if (k2 === p.i) {
            got.pairs.push(p.i); save();
            sel.classList.remove("sel"); sel.classList.add("paired"); b.classList.add("paired"); sel = null;
            feedback(s.fb, true, got.pairs.length + " of " + pairs.length + " matched.");
            if (pairs.every(function (x) { return got.pairs.indexOf(x.i) !== -1; })) finish(t, s, true, t.okMsg || "All matched.");
          } else {
            b.classList.add("miss"); var sb = sel;
            sb.classList.add("miss");
            setTimeout(function () { b.classList.remove("miss"); sb.classList.remove("miss"); }, 600);
            feedback(s.fb, false, "Not a match. Try again.");
          }
        });
        Rb[p.i] = b; colR.appendChild(b);
      });
      got.pairs.forEach(function (i) { if (L[i]) L[i].classList.add("paired"); if (Rb[i]) Rb[i].classList.add("paired"); });
    }

    /* ---------- sort into groups ---------- */
    function taskSort(t, host, optional) {
      var s = shell(t, host, optional);
      var picks = bag(t.id);
      var list = el("div", { "class": "sort-list" });
      s.body.appendChild(list);
      var items = chosen(t);
      var order = t.keepOrder ? range(items.length) : shuffled("so:" + t.id, items.length);
      var rows = {};
      order.forEach(function (k) {
        var x = items[k];
        var row = el("div", { "class": "sort-row", "data-i": x.i });
        row.appendChild(html("span", { "class": "sort-text" }, inline(x.it[0])));
        var seg = el("div", { "class": "seg", role: "group", "aria-label": Text.plain(x.it[0]) });
        t.cats.forEach(function (c, ci) {
          var b = html("button", { type: "button", "aria-pressed": picks[x.i] === ci ? "true" : "false" }, inline(c));
          b.addEventListener("click", function () {
            picks[x.i] = ci; save();
            seg.querySelectorAll("button").forEach(function (y, yi) { y.setAttribute("aria-pressed", yi === ci ? "true" : "false"); });
            row.classList.remove("right", "wrong");
          });
          seg.appendChild(b);
        });
        row.appendChild(seg);
        list.appendChild(row);
        rows[x.i] = row;
      });
      function check(quiet) {
        var wrong = 0, blank = 0, why = [];
        items.forEach(function (x) {
          var ok = picks[x.i] === x.it[1];
          if (picks[x.i] == null) blank++;
          else if (!ok) { wrong++; if (x.it[2]) why.push(x.it[2]); }
          if (!quiet || ok) { rows[x.i].classList.toggle("right", ok); rows[x.i].classList.toggle("wrong", picks[x.i] != null && !ok); }
        });
        if (quiet) return;
        if (!wrong && !blank) finish(t, s, true, t.okMsg || "All sorted correctly.");
        else if (blank) feedback(s.fb, false, "Choose a group for every item. " + blank + " still need one.");
        else feedback(s.fb, false, (items.length - wrong) + " of " + items.length + " are right. Look again at the ones marked in pink.", why.slice(0, 2));
      }
      s.check.addEventListener("click", function () { check(false); });
      if (state.done[t.id] || state.star[t.id]) check(true);
    }

    /* ---------- build the equation from tiles ---------- */
    // items: { q: "Five more than twice a number is 17.", a: "2x + 5 = 17", alt: ["5 + 2x = 17"], extra: ["5x"] }
    function taskOrder(t, host, optional) {
      var s = shell(t, host, optional);
      var saved = bag(t.id);
      var boxes = chosen(t).map(function (x, n) {
        var it = x.it;
        var words = Text.tokens(it.a).words;
        var bank = words.concat(it.extra || []);
        var order = shuffled("ord:" + t.id + ":" + x.i, bank.length);
        var seq = saved[x.i] || (saved[x.i] = []);
        var box = el("div", { "class": "builder" });
        box.appendChild(html("div", { "class": "en" }, (n + 1) + ". " + inline(it.q)));
        var ans = el("div", { "class": "tiles answer", "aria-label": "Your equation" });
        var pool = el("div", { "class": "tiles", "aria-label": "Tiles" });
        box.appendChild(ans); box.appendChild(pool);
        function render() {
          ans.innerHTML = ""; pool.innerHTML = "";
          seq.forEach(function (bi, pos) {
            var b = html("button", { "class": "tile", type: "button", "data-w": bank[bi], "aria-label": "Remove " + bank[bi] }, Text.mfmt(bank[bi]));
            b.addEventListener("click", function () { seq.splice(pos, 1); save(); box.classList.remove("right"); render(); });
            ans.appendChild(b);
          });
          if (!seq.length) ans.appendChild(el("span", { "class": "empty" }, "Tap the tiles below in order."));
          order.forEach(function (bi) {
            if (seq.indexOf(bi) !== -1) return;
            var b = html("button", { "class": "tile", type: "button", "data-w": bank[bi], "aria-label": "Add " + bank[bi] }, Text.mfmt(bank[bi]));
            b.addEventListener("click", function () { seq.push(bi); save(); render(); });
            pool.appendChild(b);
          });
        }
        render();
        s.body.appendChild(box);
        var targets = [it.a].concat(it.alt || []).map(function (a) { return Text.tokens(a).words.join(" "); });
        return {
          box: box, it: it,
          ok: function () { return targets.indexOf(seq.map(function (bi) { return bank[bi]; }).join(" ")) !== -1; },
          empty: function () { return !seq.length; }
        };
      });
      function check(quiet) {
        var wrong = 0, blank = 0;
        boxes.forEach(function (b) { if (b.ok()) b.box.classList.add("right"); else if (b.empty()) blank++; else wrong++; });
        if (quiet) return;
        if (!wrong && !blank) finish(t, s, true, t.okMsg || "Every one is right.");
        else if (blank && !wrong) feedback(s.fb, false, "Build every one. " + blank + " still empty.");
        else feedback(s.fb, false, (boxes.length - wrong - blank) + " of " + boxes.length + " are right. Tap a tile in your answer to send it back." + (boxes.some(function (b) { return b.it.extra; }) ? " Careful: some tiles don't belong." : ""));
      }
      s.check.addEventListener("click", function () { check(false); });
      if (state.done[t.id] || state.star[t.id]) check(true);
    }

    /* ---------- put steps in order ---------- */
    // items are written in the right order; each student sees them shuffled.
    function taskSteps(t, host, optional) {
      var s = shell(t, host, optional);
      var seq = bag(t.id, { seq: [] });
      if (!seq.seq) seq.seq = [];
      var n = t.items.length;
      var order = shuffled("st:" + t.id, n);
      var wrap = el("div", { "class": "stepzones" });
      var bankBox = el("div"), seqBox = el("div");
      bankBox.appendChild(el("h4", null, "Steps"));
      seqBox.appendChild(el("h4", null, t.seqLabel || "Your order"));
      var bank = el("div", { "class": "steplist" }), list = el("ol", { "class": "steplist chosen" });
      bankBox.appendChild(bank); seqBox.appendChild(list);
      wrap.appendChild(bankBox); wrap.appendChild(seqBox);
      s.body.appendChild(wrap);
      function render() {
        bank.innerHTML = ""; list.innerHTML = "";
        order.forEach(function (i) {
          if (seq.seq.indexOf(i) !== -1) return;
          var b = html("button", { type: "button", "class": "stepbtn", "data-i": i }, inline(Text.itemText(t.items[i])));
          b.addEventListener("click", function () { seq.seq.push(i); save(); render(); });
          bank.appendChild(b);
        });
        seq.seq.forEach(function (i, pos) {
          var li = el("li");
          var b = html("button", { type: "button", "class": "stepbtn", "aria-label": "Remove step " + (pos + 1) }, inline(Text.itemText(t.items[i])));
          b.addEventListener("click", function () { seq.seq.splice(pos, 1); save(); render(); });
          li.appendChild(b); list.appendChild(li);
        });
        if (!seq.seq.length) list.appendChild(el("li", { "class": "empty" }, "Tap the steps in order."));
        if (!bank.children.length) bank.appendChild(el("div", { "class": "empty" }, "All steps used."));
      }
      render();
      function check(quiet) {
        var k = 0;
        while (k < seq.seq.length && seq.seq[k] === k) k++;
        var all = k === n && seq.seq.length === n;
        list.classList.toggle("right", all);
        if (quiet) return;
        if (all) finish(t, s, true, t.okMsg || "Correct order.");
        else if (seq.seq.length < n) feedback(s.fb, false, "Use every step. You have " + seq.seq.length + " of " + n + ".");
        else feedback(s.fb, false, k === 0 ? "The first step isn't right yet. What has to happen first?" : "The first " + k + " are in the right order. Look again at step " + (k + 1) + ". Tap a step to send it back.");
      }
      s.check.addEventListener("click", function () { check(false); });
      if (state.done[t.id] || state.star[t.id]) check(true);
    }

    /* ---------- find the mistake in someone's work ---------- */
    // items: { q: "Solve {{2(x + 3) = 14}}", lines: ["{{2x + 3 = 14}}", …], bad: 0, why: "…", a: "4" (optional: type the right answer) }
    function taskMistake(t, host, optional) {
      var s = shell(t, host, optional);
      var saved = bag(t.id);
      var anyTyping = chosen(t).some(function (x) { return x.it.a; });
      if (anyTyping && t.keys !== false) s.card.insertBefore(keyBar(s.card, t.keys), s.body);
      var rows = chosen(t).map(function (x, n) {
        var it = x.it, st = saved[x.i] || (saved[x.i] = { found: false, ans: "" });
        var row = el("div", { "class": "item mistake" });
        row.appendChild(html("div", { "class": "q-line" }, '<span class="num">' + (n + 1) + '.</span><span class="q">' + inline(it.q) + "</span>"));
        if (it.who) row.appendChild(html("div", { "class": "goal" }, inline(it.who)));
        var work = el("ol", { "class": "work" });
        var lineBtns = it.lines.map(function (ln, li) {
          var b = html("button", { type: "button", "class": "workline", "data-l": li }, inline(ln));
          b.addEventListener("click", function () {
            if (st.found) return;
            if (li === it.bad) { st.found = true; save(); show(); }
            else { b.classList.add("miss"); setTimeout(function () { b.classList.remove("miss"); }, 700); feedback(fb, false, "That line follows correctly from the one before it. Keep looking."); }
          });
          var lii = el("li"); lii.appendChild(b); work.appendChild(lii);
          return b;
        });
        row.appendChild(work);
        var fb = el("div");
        row.appendChild(fb);
        var ansRow = el("div", { "class": "ans-line" });
        var inp = null;
        if (it.a) {
          ansRow.appendChild(html("span", { "class": "pre" }, inline(it.ask || "The right answer:") + (it.pre ? " " + inline(it.pre) : "")));
          inp = blankInput(st, "ans", String(it.a).split("|"), "Correct answer for problem " + (n + 1), s);
          ansRow.appendChild(inp);
          ansRow.hidden = true;
          row.appendChild(ansRow);
        }
        var why = el("span", { "class": "why" });
        row.appendChild(why);
        function show() {
          lineBtns[it.bad].classList.add("hit");
          feedback(fb, true, "Found it. " + it.why);
          ansRow.hidden = false;
        }
        if (st.found) show();
        s.body.appendChild(row);
        return { row: row, it: it, st: st, inp: inp, why: why };
      });
      function check(quiet) {
        var notFound = 0, bad = 0, near = 0, blank = 0;
        rows.forEach(function (r) {
          if (!r.st.found) { notFound++; return; }
          if (!r.inp) { r.row.classList.add("right"); return; }
          var res = Text.judgeFull(r.inp.value, String(r.it.a).split("|"));
          if (!quiet || res.r === "ok") setMark(r.inp, res.r);
          r.why.innerHTML = !quiet && res.why && res.r !== "ok" ? inline(res.why) : "";
          if (res.r === "ok") r.row.classList.add("right");
          else if (res.r === "near") near++; else if (res.r === "blank") blank++; else bad++;
        });
        if (quiet) return;
        if (!notFound && !bad && !near && !blank) finish(t, s, true, t.okMsg || "You found every mistake and fixed it.");
        else if (notFound) feedback(s.fb, false, "Tap the first line with a mistake in every problem. " + notFound + " still to find.");
        else if (blank) feedback(s.fb, false, "Type the right answer for every problem. " + blank + " still empty.");
        else feedback(s.fb, false, "Not yet. Fix the red " + (bad === 1 ? "answer" : "answers") + ": redo the problem from the line with the mistake." + nearMsg(near));
      }
      s.check.addEventListener("click", function () { check(false); });
      if (state.done[t.id] || state.star[t.id]) check(true);
    }

    /* ---------- graph it: tap the grid to place points ---------- */
    // items: { q, fn: "2x - 1" (place `need` points on it) | line: "x = 3" | points: [[2, 3], …] (exactly these), need: 2, x: [-6, 6], y: [-6, 6], show: graph spec to draw first }
    function taskPlot(t, host, optional) {
      var s = shell(t, host, optional);
      var saved = bag(t.id);
      var rows = chosen(t).map(function (x, n) {
        var it = x.it, pts = saved[x.i] || (saved[x.i] = []);
        var row = el("div", { "class": "item plot" });
        row.appendChild(html("div", { "class": "q-line" }, '<span class="num">' + (n + 1) + '.</span><span class="q">' + inline(it.q) + "</span>"));
        var need = it.points ? it.points.length : (it.need || 2);
        row.appendChild(html("div", { "class": "goal" }, it.points ? "Tap the grid to place " + (need === 1 ? "the point" : "all " + need + " points") + ". Tap a point again to remove it." : "Tap the grid to place at least " + need + " points on the " + (it.curve ? "graph" : "line") + ". Tap a point again to remove it."));
        var holder = el("div", { "class": "plot-wrap" });
        row.appendChild(holder);
        var ctl = el("div", { "class": "row" });
        var clear = el("button", { type: "button", "class": "ghost small" }, "Clear");
        var readout = el("span", { "class": "goal" });
        ctl.appendChild(clear); ctl.appendChild(readout);
        row.appendChild(ctl);
        var why = el("span", { "class": "why" });
        row.appendChild(why);
        var f = it.fn ? Text.fnOf(it.fn) : null;
        var vx = it.line && /^x\s*=/.test(it.line) ? Text.value(it.line.split("=")[1]) : null;
        var done = false;
        function spec() {
          var g = Object.assign({ x: it.x || [-6, 6], y: it.y || [-6, 6] }, it.show || {});
          g = JSON.parse(JSON.stringify(g));
          g.lines = (g.lines || []).slice(); g.points = (g.points || []).slice();
          if (done && it.fn) g.lines.push({ fn: it.fn, c: 1 });
          if (done && vx != null) g.lines.push({ xeq: vx, c: 1 });
          pts.forEach(function (p) { g.points.push([p[0], p[1], "", 1]); });
          g.alt = "Coordinate grid. Your points: " + (pts.map(function (p) { return "(" + p[0] + ", " + p[1] + ")"; }).join(", ") || "none");
          return g;
        }
        function draw() {
          holder.innerHTML = Text.graphSVG(spec());
          var svg = holder.querySelector("svg");
          svg.classList.add("tap");
          svg.addEventListener("click", function (e) {
            var r = svg.getBoundingClientRect(), W = Number(svg.getAttribute("data-w")), H = Number(svg.getAttribute("data-h"));
            var px = (e.clientX - r.left) * W / r.width, py = (e.clientY - r.top) * H / r.height;
            var pad = Number(svg.getAttribute("data-pad")), cx = Number(svg.getAttribute("data-cx")), cy = Number(svg.getAttribute("data-cy"));
            var gx = Math.round(Number(svg.getAttribute("data-xlo")) + (px - pad) / cx), gy = Math.round(Number(svg.getAttribute("data-yhi")) - (py - pad) / cy);
            var xr = it.x || [-6, 6], yr = it.y || [-6, 6];
            if (gx < xr[0] || gx > xr[1] || gy < yr[0] || gy > yr[1]) return;
            var at = -1;
            pts.forEach(function (p, i) { if (p[0] === gx && p[1] === gy) at = i; });
            if (at !== -1) pts.splice(at, 1); else { pts.push([gx, gy]); if (pts.length > need + 3) pts.shift(); }
            done = false; row.classList.remove("right"); why.textContent = "";
            save(); draw();
          });
          readout.textContent = pts.length ? "Your points: " + pts.map(function (p) { return "(" + p[0] + ", " + p[1] + ")"; }).join(" ").replace(/-/g, "−") : "";
        }
        clear.addEventListener("click", function () { pts.length = 0; done = false; row.classList.remove("right"); save(); draw(); });
        draw();
        s.body.appendChild(row);
        function test() {
          var off = [];
          if (it.points) {
            var want = it.points.map(function (p) { return p[0] + "," + p[1]; }), have = pts.map(function (p) { return p[0] + "," + p[1]; });
            var extra = have.filter(function (h) { return want.indexOf(h) === -1; }), missing = want.filter(function (w) { return have.indexOf(w) === -1; });
            if (!have.length) return { r: "blank" };
            if (!extra.length && !missing.length) return { r: "ok" };
            return { r: "bad", why: extra.length ? "(" + extra[0].replace(",", ", ") + ") isn't one of the points. Remember: x first (left or right), then y (up or down)." : "You're missing " + missing.length + (missing.length === 1 ? " point." : " points.") };
          }
          if (!pts.length) return { r: "blank" };
          pts.forEach(function (p) { var ok = vx != null ? p[0] === vx : Math.abs(f(p[0]) - p[1]) < 1e-9; if (!ok) off.push(p); });
          if (off.length) return { r: "bad", why: "(" + off[0][0] + ", " + off[0][1] + ") isn't on the " + (it.curve ? "graph" : "line") + ". " + (f ? "Plug in x = " + off[0][0] + ": what is y?" : "") };
          var distinct = pts.filter(function (p, i) { return pts.findIndex(function (q) { return q[0] === p[0] && q[1] === p[1]; }) === i; });
          if (distinct.length < need) return { r: "bad", why: "Good so far. Place " + (need - distinct.length) + " more " + (need - distinct.length === 1 ? "point" : "points") + "." };
          return { r: "ok" };
        }
        return { row: row, test: test, why: why, it: it, setDone: function () { done = true; draw(); } };
      });
      function check(quiet) {
        var bad = 0, blank = 0;
        rows.forEach(function (r) {
          var res = r.test();
          r.why.textContent = "";
          if (res.r === "ok") { r.row.classList.add("right"); r.setDone(); }
          else if (!quiet) { if (res.r === "blank") blank++; else { bad++; r.why.innerHTML = inline(res.why || ""); } }
        });
        if (quiet) return;
        if (!bad && !blank) finish(t, s, true, t.okMsg || "Every graph is right.");
        else if (blank && !bad) feedback(s.fb, false, "Place points on every grid. " + blank + " still empty.");
        else feedback(s.fb, false, "Not yet. Read the note under each graph.");
      }
      s.check.addEventListener("click", function () { check(false); });
      if (state.done[t.id] || state.star[t.id]) check(true);
    }

    /* ---------- private self-check (always optional, never sent anywhere) ---------- */
    function taskSelfcheck(t, host) {
      var s = shell(t, host, true);
      s.row.removeChild(s.check);
      var ans = bag(t.id);
      s.body.appendChild(html("p", { "class": "goal" }, "🔒 Only you see this. Your answers stay on this iPad and aren't sent to Blackbaud or your teacher."));
      var chart = el("div", { "class": "selfchart", "aria-hidden": "true" });
      t.items.forEach(function (label, i) {
        var row = el("div", { "class": "sort-row" });
        row.appendChild(html("span", { "class": "sort-text" }, inline(label)));
        var seg = el("div", { "class": "seg", role: "group", "aria-label": Text.plain(label) });
        [1, 2, 3, 4, 5].forEach(function (v) {
          var b = el("button", { type: "button", "aria-pressed": ans[i] === v ? "true" : "false", "aria-label": v + " of 5" }, String(v));
          b.addEventListener("click", function () { ans[i] = v; save(); seg.querySelectorAll("button").forEach(function (x, xi) { x.setAttribute("aria-pressed", xi + 1 === v ? "true" : "false"); }); draw(); });
          seg.appendChild(b);
        });
        row.appendChild(seg);
        s.body.appendChild(row);
      });
      s.body.appendChild(html("p", { "class": "goal" }, "1 = " + esc((t.scale || ["not yet", "I could teach it"])[0]) + " · 5 = " + esc((t.scale || ["not yet", "I could teach it"])[1])));
      s.body.appendChild(chart);
      function draw() {
        chart.innerHTML = "";
        var any = false;
        t.items.forEach(function (label, i) {
          if (!ans[i]) return;
          any = true;
          var bar = el("div", { "class": "selfbar" });
          bar.appendChild(html("span", { "class": "lbl" }, inline(t.short ? t.short[i] : label)));
          var track = el("span", { "class": "track" });
          var fill = el("span", { "class": "fill" + (ans[i] <= 2 ? " low" : "") });
          fill.style.width = (ans[i] * 20) + "%";
          track.appendChild(fill); bar.appendChild(track);
          bar.appendChild(el("span", { "class": "val" }, ans[i] + "/5"));
          chart.appendChild(bar);
        });
        var low = t.items.map(function (_, i) { return i; }).filter(function (i) { return ans[i] && ans[i] <= 2; });
        if (low.length && t.tip) chart.appendChild(html("p", { "class": "callout" }, inline(t.tip)));
        chart.hidden = !any;
      }
      draw();
    }

    /* ---------- tables of values ---------- */
    // tables: [{ title, corner: "x", cols: ["y"], rows: [["-2", "-3"], …], given: [[row, col], …], fn: "2x + 1" }]
    function taskGrid(t, host, optional) {
      t.typing = true;
      var s = shell(t, host, optional);
      var saved = bag(t.id);
      var cells = [];
      chosen(t, t.tables).forEach(function (x) {
        var tb = x.it;
        var box = el("div", { "class": "conj" });
        if (tb.title) box.appendChild(html("div", { "class": "conj-title" }, inline(tb.title)));
        var wrap = el("div", { "class": "tbl" });
        var table = el("table", { "class": "gridtable" });
        var thead = el("tr");
        thead.appendChild(html("th", null, inline(tb.corner || "")));
        tb.cols.forEach(function (c) { thead.appendChild(html("th", null, inline(c))); });
        table.appendChild(thead);
        tb.rows.forEach(function (row, ri) {
          var tr = el("tr");
          tr.appendChild(html("th", { scope: "row" }, inline(/^-?[\d.\/]+$/.test(row[0]) ? "{{" + row[0] + "}}" : row[0])));
          row.slice(1).forEach(function (ans, ci) {
            var td = el("td");
            if (ans == null || ans === "") { tr.appendChild(td); return; }
            var key = x.i + "." + ri + "." + ci;
            var inp = esInput({ "aria-label": Text.plain(row[0]) + ", " + Text.plain(tb.cols[ci]), id: "g-" + t.id + "-" + key.replace(/\./g, "-") });
            var given = (tb.given || []).some(function (g) { return g[0] === ri && g[1] === ci; });
            var answers = String(ans).split("|");
            if (given) { inp.value = answers[0]; inp.disabled = true; inp.classList.add("ok"); }
            else inp.value = saved[key] || "";
            inp.addEventListener("input", function () { saved[key] = inp.value; save(); setMark(inp, null); });
            inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); s.check.click(); } });
            td.appendChild(inp); tr.appendChild(td);
            cells.push({ inp: inp, answers: answers });
          });
          table.appendChild(tr);
        });
        wrap.appendChild(table); box.appendChild(wrap);
        if (tb.note) box.appendChild(html("p", { "class": "goal" }, inline(tb.note)));
        s.body.appendChild(box);
      });
      function check(quiet) {
        var bad = 0, blank = 0, near = 0, why = "";
        cells.forEach(function (c) {
          if (c.inp.disabled) return;
          var res = Text.judgeFull(c.inp.value, c.answers);
          if (!quiet || res.r === "ok") setMark(c.inp, res.r);
          if (res.r === "blank") blank++; else if (res.r === "near") { near++; why = why || res.why; } else if (res.r !== "ok") bad++;
        });
        if (quiet) return;
        if (!bad && !blank && !near) finish(t, s, true, t.okMsg || "Every box is right.");
        else if (blank && !bad && !near) feedback(s.fb, false, "Fill in every box. " + blank + " still empty.");
        else feedback(s.fb, false, bad ? "Not yet. Fix the red " + (bad === 1 ? "box" : "boxes") + "." : "Almost! " + (why || ""));
      }
      s.check.addEventListener("click", function () { check(false); });
      if (state.done[t.id] || state.star[t.id]) check(true);
    }

    var RENDER = {
      mc: taskMC, quiz: taskQuiz, read: taskQuiz, cloze: taskCloze, select: taskSelect, match: taskMatch, sort: taskSort,
      order: taskOrder, steps: taskSteps, selfcheck: taskSelfcheck, grid: taskGrid, solve: taskSolve, mistake: taskMistake, plot: taskPlot
    };

    /* ======================= writing (Build) ======================= */
    function reqStatus(r, text) {
      var t = text.normalize("NFC");
      if (r.words) { var n = (t.match(/[\p{L}'’-]+/gu) || []).length; return { ok: n >= r.words, note: n + " / " + r.words + " words" }; }
      if (r.lines) { var L = t.split("\n").filter(function (x) { return /\S/.test(x); }).length; return { ok: L >= r.lines, note: L + " / " + r.lines + " lines" }; }
      if (r.sentences) { var k = t.split(/[.!?]+(?=\s|$)/).filter(function (x) { return x.trim().split(/\s+/).length >= 2; }).length; return { ok: k >= r.sentences, note: k + " / " + r.sentences }; }
      if (r.re) {
        var src = r.re.replace(/^\\b/, "(?:^|[^\\p{L}])").replace(/\\b$/, "(?=[^\\p{L}]|$)");
        var m = (t.match(new RegExp(src, "giu")) || []).map(function (x) { return x.replace(/^[^\p{L}\d=+−-]+/u, ""); });
        return { ok: m.length >= (r.min || 1), note: (r.min || 1) > 1 ? m.length + " / " + r.min : "" };
      }
      return { ok: false };
    }
    function buildStep(host) {
      var b = M.build;
      host.appendChild(html("div", { "class": "prose" }, rich(b.prompt)));
      addFig(host, b.fig);
      if (b.model) {
        var model = el("div", { "class": "model" });
        model.appendChild(el("span", { "class": "lbl" }, "Example"));
        model.appendChild(html("div", null, rich(b.model)));
        host.appendChild(model);
      }
      var card = el("div", { "class": "task", id: "task-build" });
      var head = el("div", { "class": "task-head" });
      head.appendChild(html("h3", null, inline(b.title || "Your work must:")));
      head.appendChild(el("span", { "class": "chip", "data-chip": "build" }, "To do"));
      card.appendChild(head);
      var list = el("ul", { "class": "status-list" });
      var lis = b.reqs.map(function () { var li = el("li"); list.appendChild(li); return li; });
      card.appendChild(list);
      card.appendChild(keyBar(card));
      var ta = el("textarea", { "class": "es-in write", id: "build-text", autocapitalize: "sentences", autocomplete: "off", autocorrect: "off", spellcheck: "true", placeholder: b.placeholder || "Write here…", "aria-label": "Your work" });
      ta.value = state.build || "";
      card.appendChild(ta);
      var count = el("div", { "class": "wordcount" });
      card.appendChild(count);
      var fb = el("div");
      card.appendChild(fb);
      host.appendChild(card);
      function update() {
        state.build = ta.value; save();
        var all = true;
        b.reqs.forEach(function (r, i) {
          var st = reqStatus(r, ta.value);
          if (!st.ok) all = false;
          lis[i].className = st.ok ? "done" : "";
          lis[i].innerHTML = (st.ok ? "✓ " : "○ ") + inline(r.t) + (st.note ? ' <span class="goal">(' + esc(st.note) + ")</span>" : "");
        });
        count.textContent = (ta.value.match(/[\p{L}'’-]+/gu) || []).length + " words";
        if (all && !state.done.build) { feedback(fb, true, "Your work meets every requirement. You'll paste it into Blackbaud in Step 6."); markDone("build"); }
        else if (all) feedback(fb, true, "Every requirement met.");
        else fb.innerHTML = "";
      }
      ta.addEventListener("input", update);
      update();
    }

    /* ======================= learn step pieces ======================= */
    function table(tb) {
      var w = el("div", { "class": "tbl" });
      var h = "<table>";
      if (tb.head) h += "<thead><tr>" + tb.head.map(function (c) { return "<th>" + inline(c) + "</th>"; }).join("") + "</tr></thead>";
      h += "<tbody>" + tb.rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + inline(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody>";
      if (tb.caption) h += "<caption>" + inline(tb.caption) + "</caption>";
      w.innerHTML = h + "</table>";
      return w;
    }
    function examples(list) {
      var ul = el("ul", { "class": "examples" });
      list.forEach(function (ex) {
        var li = el("li");
        li.appendChild(html("span", { "class": "es" }, inline(ex[0])));
        li.appendChild(html("span", { "class": "en" }, inline(ex[1] || "")));
        ul.appendChild(li);
      });
      return ul;
    }
    function flashcards(list) {
      var grid = el("div", { "class": "flash" });
      list.forEach(function (c) {
        var card = el("div", { "class": "card", role: "button", tabindex: "0", "aria-label": Text.plain(c[0]) + ". Tap to see the meaning." });
        card.appendChild(html("span", { "class": "front" }, inline(c[0])));
        var back = html("span", { "class": "back" }, inline(c[1]));
        back.hidden = true;
        card.appendChild(back);
        var note = el("span", { "class": "flip-note" }, "tap to flip");
        card.appendChild(note);
        function flip() { card.classList.toggle("flipped"); back.hidden = !back.hidden; note.textContent = back.hidden ? "tap to flip" : ""; }
        card.addEventListener("click", flip);
        card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
        grid.appendChild(card);
      });
      return grid;
    }
    // Worked examples: try it first, then reveal one step at a time.
    // { title, problem, steps: [["{{2x + 3 - 3 = 11 - 3}}", "Subtract 3 from both sides."], …], check: "…", answer }
    function worked(ex, k) {
      var box = el("div", { "class": "worked" });
      box.appendChild(html("div", { "class": "w-head" }, '<span class="w-tag">' + esc(ex.title || "Example " + (k + 1)) + "</span>" + '<span class="w-prob">' + inline(ex.problem) + "</span>"));
      addFig(box, ex.fig);
      var ol = el("ol", { "class": "w-steps" });
      var lis = ex.steps.map(function (st) {
        var li = el("li");
        li.appendChild(html("span", { "class": "w-math" }, inline(st[0])));
        if (st[1]) li.appendChild(html("span", { "class": "w-why" }, inline(st[1])));
        li.hidden = true;
        ol.appendChild(li);
        return li;
      });
      box.appendChild(ol);
      var chk = ex.check ? html("div", { "class": "w-check" }, "<b>Check:</b> " + inline(ex.check)) : null;
      if (chk) { chk.hidden = true; box.appendChild(chk); }
      var row = el("div", { "class": "row" });
      var next = el("button", { type: "button", "class": "small" }, "Show step 1");
      var all = el("button", { type: "button", "class": "ghost small" }, "Show all steps");
      row.appendChild(next); row.appendChild(all);
      box.appendChild(row);
      var shown = 0;
      function sync() {
        lis.forEach(function (li, i) { li.hidden = i >= shown; });
        if (chk) chk.hidden = shown < lis.length;
        if (shown >= lis.length) { next.hidden = true; all.hidden = true; }
        else next.textContent = "Show step " + (shown + 1);
      }
      next.addEventListener("click", function () { shown++; sync(); });
      all.addEventListener("click", function () { shown = lis.length; sync(); });
      box.appendChild(html("p", { "class": "goal w-try" }, "Try it on paper first, then check each step."));
      sync();
      return box;
    }
    // A quick check inside Learn: one question, not counted.
    function quickCheck(q, key) {
      var box = el("div", { "class": "quick" });
      box.appendChild(html("p", { "class": "q" }, '<span class="w-tag">Quick check</span> ' + inline(q.q)));
      var cl = choiceList("qc:" + key, q.choices, q.keepOrder, function () {}, false);
      box.appendChild(cl.wrap); box.appendChild(cl.fb);
      return box;
    }

    /* ======================= page ======================= */
    var STEPS = [
      ["context", "1 Context"], ["learn", "2 Learn"], ["try", "3 Practice"], ["build", "4 Build"],
      ["reflect", "5 Reflect"], ["check", "6 Check"], ["further", "7 Challenge"]
    ];
    function stepHead(n, title, ipp) {
      return html("div", { "class": "step-head" }, '<span class="step-num">' + n + "</span><h2>" + inline(title) + '</h2><span class="ipp">' + esc(ipp) + "</span>");
    }
    function section(id) { return el("section", { "class": "step", id: id }); }
    function requiredTasks() { return M.tasks.filter(function (t) { return !t.optional && t.type !== "selfcheck"; }); }

    function page() {
      var app = $("app");
      app.innerHTML = "";
      document.title = "M" + M.num + " · " + Text.plain(M.title) + " · " + SETTINGS.course;

      var bar = el("div", { "class": "bar" });
      var inner = el("div", { "class": "bar-inner" });
      inner.appendChild(el("img", { "class": "bar-seal", src: "assets/seal.png", alt: "Scranton Prep seal" }));
      inner.appendChild(el("a", { "class": "bar-title", href: "index.html", title: "All modules" }, "M" + M.num));
      var nav = el("nav", { "class": "steps", "aria-label": "Module steps" });
      STEPS.forEach(function (st) { nav.appendChild(el("a", { href: "#" + st[0], "data-step": st[0] }, st[1])); });
      inner.appendChild(nav);
      inner.appendChild(el("span", { "class": "meter", id: "meter" }, ""));
      bar.appendChild(inner);
      app.appendChild(bar);

      var main = el("main", { "class": "wrap" });
      app.appendChild(main);

      /* header */
      var head = el("header", { "class": "intro" });
      head.appendChild(el("div", { "class": "tilestrip", "aria-hidden": "true" }));
      head.appendChild(el("span", { "class": "eyebrow" }, "Unit " + M.unit + ": " + M.unitTitle + " · Module " + M.num + " of " + (M.total || 30)));
      head.appendChild(html("h1", null, inline(M.title)));
      if (M.subtitle) head.appendChild(html("p", { "class": "subtitle" }, inline(M.subtitle)));
      head.appendChild(html("p", { "class": "lede" }, inline(M.lede)));
      var req = requiredTasks().length + 1;
      head.appendChild(html("div", { "class": "facts" }, "<span><b>Time:</b> about " + (M.minutes || 35) + " minutes</span><span><b>To pass:</b> finish the " + req + " activities, then complete the Blackbaud check</span><span><b>Calculator:</b> " + esc(M.calculator || "not needed") + "</span><span><b>Saves:</b> automatically on this iPad</span>"));
      if (M.welcome) head.appendChild(html("div", { "class": "welcome" }, M.welcome));
      if (M.recap) head.appendChild(html("div", { "class": "recap" }, "<strong>Last time</strong><span>" + inline(M.recap) + "</span>"));
      if (M.goals) head.appendChild(html("div", { "class": "goals" }, "<strong>By the end, you can…</strong><ul>" + M.goals.map(function (g) { return "<li>" + inline(g) + "</li>"; }).join("") + "</ul>"));
      main.appendChild(head);

      /* 1 context */
      var s1 = section("context");
      s1.appendChild(stepHead(1, M.context.title, "Context"));
      var story = el("div", { "class": "story" });
      if (M.context.place) story.appendChild(el("span", { "class": "place" }, "📍 " + M.context.place));
      story.appendChild(html("div", { "class": "prose" }, rich(M.context.text)));
      addFig(story, M.context.fig);
      if (M.context.ask) story.appendChild(html("div", { "class": "wonder" }, "<b>Think about it:</b> " + inline(M.context.ask)));
      s1.appendChild(story);
      main.appendChild(s1);

      /* 2 learn */
      var s2 = section("learn");
      s2.appendChild(stepHead(2, M.learnTitle || "Learn", "Experience"));
      M.learn.forEach(function (idea, i) {
        var box = el("div", { "class": "idea" + (idea.refresher ? " refresher" : "") });
        box.appendChild(html("h3", null, (idea.refresher ? '<span class="w-tag">Refresher</span> ' : M.learn.length > 1 ? "Idea " + (i + 1) + ": " : "") + inline(idea.title)));
        if (idea.text) box.appendChild(html("div", { "class": "prose" }, rich(idea.text)));
        if (idea.table) box.appendChild(table(idea.table));
        (idea.figs || (idea.fig ? [idea.fig] : [])).forEach(function (f) { addFig(box, f); });
        if (idea.examples) box.appendChild(examples(idea.examples));
        if (idea.worked) idea.worked.forEach(function (ex, k) { box.appendChild(worked(ex, k)); });
        if (idea.flash) box.appendChild(flashcards(idea.flash));
        if (idea.after) box.appendChild(html("div", { "class": "prose" }, rich(idea.after)));
        if (idea.tip) box.appendChild(html("div", { "class": "callout" }, "<b>Tip:</b> " + inline(idea.tip)));
        if (idea.check) box.appendChild(quickCheck(idea.check, i));
        s2.appendChild(box);
      });
      main.appendChild(s2);

      /* 3 practice */
      var s3 = section("try");
      s3.appendChild(stepHead(3, "Practice", "Experience"));
      s3.appendChild(html("p", { "class": "goal" }, "Every activity checks itself. Pink means try again; yellow means you're close. Keep paper and a pencil handy. Stuck? Tap <b>Show a hint</b>."));
      M.tasks.forEach(function (t) { RENDER[t.type](t, s3, !!t.optional || t.type === "selfcheck"); });
      main.appendChild(s3);

      /* 4 build */
      var s4 = section("build");
      s4.appendChild(stepHead(4, "Build: " + M.build.heading, "Action"));
      buildStep(s4);
      main.appendChild(s4);

      /* 5 reflect */
      var s5 = section("reflect");
      s5.appendChild(stepHead(5, "Reflect", "Reflection"));
      s5.appendChild(html("p", { "class": "reflect-q" }, inline(M.reflect.q)));
      s5.appendChild(html("p", { "class": "goal" }, "Write 2 to 4 sentences. Your teacher will read this, so share only what you're comfortable sharing. You'll copy your answer into the Blackbaud check. Your draft saves on this iPad."));
      var draft = el("textarea", { "class": "draft", id: "reflect-draft", placeholder: M.reflect.placeholder || "", "aria-label": "Your reflection" });
      draft.value = state.reflect || "";
      draft.addEventListener("input", function () { state.reflect = draft.value; save(); refresh(); });
      s5.appendChild(draft);
      var rr = el("div", { "class": "row" });
      var copyR = el("button", { type: "button" }, "Copy my reflection");
      var copyRMsg = el("span", { "class": "goal" });
      copyR.addEventListener("click", function () { copyText(draft.value, copyRMsg, draft); });
      rr.appendChild(copyR); rr.appendChild(copyRMsg);
      s5.appendChild(rr);
      main.appendChild(s5);

      /* 6 check */
      var s6 = section("check");
      s6.appendChild(stepHead(6, "Check in Blackbaud", "Evaluation"));
      var cc = el("div", { "class": "check-card", id: "check-card" });
      var locked = el("div", { id: "check-locked" });
      locked.appendChild(html("p", null, "<b>Finish every activity to unlock your completion code.</b>"));
      locked.appendChild(el("ul", { "class": "status-list", id: "check-status" }));
      cc.appendChild(locked);
      var open = el("div", { id: "check-open", hidden: "" });
      open.appendChild(html("p", null, "<b>Nice work! All activities done. Your completion code is:</b>"));
      open.appendChild(el("div", { "class": "code-badge", id: "code-badge" }));
      open.appendChild(html("p", null, "Now open Blackbaud and find the assessment <b>“M" + M.num + " Check: " + esc(Text.plain(M.title)) + ".”</b> It asks for:"));
      open.appendChild(html("ol", { "class": "todo" }, "<li>Your completion code (above)</li><li>5 short quiz questions. Have paper ready.</li><li>Your work from Step 4. Tap the button below, then paste it in.</li><li>Your reflection from Step 5</li><li><i>Optional:</i> your ★ challenge code, if you finished Step 7</li>"));
      var cb = el("div", { "class": "row" });
      var copyB = el("button", { "class": "primary", type: "button" }, "Copy my work");
      var copyBMsg = el("span", { "class": "goal" });
      copyB.addEventListener("click", function () { copyText(state.build || "", copyBMsg, $("build-text")); });
      cb.appendChild(copyB); cb.appendChild(copyBMsg);
      open.appendChild(cb);
      open.appendChild(html("p", { "class": "goal" }, "To pass, enter the correct code and score at least 4 out of 5 on the quiz."));
      cc.appendChild(open);
      s6.appendChild(cc);
      main.appendChild(s6);

      /* 7 challenge */
      var s7 = section("further");
      s7.appendChild(stepHead(7, "Challenge", "Magis · optional"));
      s7.appendChild(html("div", { "class": "prose" }, rich(M.challengeNote || "**Ready for more?** These problems go beyond the module, at full Algebra 1 level and higher. They're optional and don't affect your completion code. Finish all of them to earn a ★ **challenge code** you can enter in the Blackbaud check.")));
      (M.challenge || []).forEach(function (t) { t.star = true; RENDER[t.type](t, s7, true); });
      var star = el("div", { "class": "star-card", id: "star-card" });
      star.appendChild(html("p", { id: "star-status" }, ""));
      star.appendChild(el("div", { "class": "code-badge star", id: "star-badge", hidden: "" }));
      s7.appendChild(star);
      if (M.culture) s7.appendChild(html("div", { "class": "note-es" }, rich(M.culture)));
      main.appendChild(s7);

      /* footer */
      var foot = el("footer");
      var nav2 = el("span");
      nav2.innerHTML = (M.prev ? '<a href="' + M.prev + '">← Previous module</a> · ' : "") + '<a href="index.html">All modules</a>' + (M.next ? ' · <a href="' + M.next + '">Next module →</a>' : "");
      foot.appendChild(nav2);
      if (SETTINGS.help) main.appendChild(html("aside", { "class": "helpbox", "aria-label": "Where to get help" }, SETTINGS.help));
      var reset = el("button", { "class": "ghost", id: "reset", type: "button" }, "Start over");
      var armed = false, timer = null;
      reset.addEventListener("click", function () {
        if (!armed) { armed = true; reset.textContent = "Tap again to erase all progress"; timer = setTimeout(function () { armed = false; reset.textContent = "Start over"; }, 4000); return; }
        clearTimeout(timer);
        try { localStorage.removeItem(KEY); } catch (e) {}
        location.reload();
      });
      foot.appendChild(reset);
      main.appendChild(foot);
    }

    /* ---------- copy to clipboard ---------- */
    function copyText(text, msgEl, fallbackEl) {
      function fallback() {
        msgEl.textContent = "Copy didn't work here. Select the text and copy it yourself.";
        if (fallbackEl) { fallbackEl.focus(); if (fallbackEl.select) fallbackEl.select(); }
      }
      if (!String(text).trim()) { msgEl.textContent = "There's nothing to copy yet."; return; }
      try { navigator.clipboard.writeText(text).then(function () { msgEl.textContent = "Copied. Paste it into Blackbaud."; }, fallback); }
      catch (e) { fallback(); }
    }

    /* ---------- progress display ---------- */
    function required() { return requiredTasks().map(function (t) { return t.id; }).concat(["build"]); }
    function refresh() {
      if (!M) return;
      var req = required();
      var count = req.filter(function (id) { return state.done[id]; }).length;
      var all = count === req.length;
      $("meter").textContent = count + " of " + req.length;
      document.querySelectorAll("[data-chip]").forEach(function (c) {
        var d = !!state.done[c.getAttribute("data-chip")];
        c.classList.toggle("done", d);
        c.textContent = d ? "Done ✓" : "To do";
      });
      document.querySelectorAll("[data-star]").forEach(function (c) {
        var d = !!state.star[c.getAttribute("data-star")];
        c.classList.toggle("done", d);
        c.textContent = d ? "★ Solved" : "★ Challenge";
      });
      var ch = M.challenge || [];
      var stars = ch.filter(function (t) { return state.star[t.id]; }).length;
      var allStars = ch.length > 0 && stars === ch.length;
      var tryDone = req.filter(function (id) { return id !== "build"; }).every(function (id) { return state.done[id]; });
      var stepDone = { context: true, learn: true, "try": tryDone, build: !!state.done.build, reflect: (state.reflect || "").trim().length >= 40, check: all, further: allStars };
      document.querySelectorAll(".steps a").forEach(function (a) { a.classList.toggle("done", !!stepDone[a.getAttribute("data-step")]); });
      var list = $("check-status");
      list.innerHTML = "";
      requiredTasks().forEach(function (t) {
        list.appendChild(html("li", { "class": state.done[t.id] ? "done" : "" }, (state.done[t.id] ? "✓ " : "○ ") + inline(t.title)));
      });
      list.appendChild(html("li", { "class": state.done.build ? "done" : "" }, (state.done.build ? "✓ " : "○ ") + "Build: " + inline(M.build.heading)));
      $("check-locked").hidden = all;
      $("check-open").hidden = !all;
      $("check-card").classList.toggle("unlocked", all);
      // Codes are stored reversed and encoded so they don't appear as plain text in the page.
      $("code-badge").textContent = all ? decode(M.code) : "";
      if (ch.length) {
        $("star-status").innerHTML = allStars ? "<b>★ All " + ch.length + " challenges solved! Your challenge code is:</b>" : "★ Challenges solved: <b>" + stars + " of " + ch.length + "</b>. Solve them all to get your challenge code.";
        $("star-badge").hidden = !allStars;
        $("star-badge").textContent = allStars ? decode(M.star) : "";
        $("star-card").classList.toggle("unlocked", allStars);
      }
    }
    function decode(c) { try { return atob(c).split("").reverse().join(""); } catch (e) { return ""; } }

    /* ---------- start ---------- */
    function start(mod) {
      M = mod;
      KEY = SETTINGS.key + ":m" + mod.num;
      Text.setFigs(mod.figs);
      try {
        var saved = JSON.parse(localStorage.getItem(KEY) || "null");
        if (saved && typeof saved === "object") state = Object.assign(state, saved);
      } catch (e) {}
      state.extra = state.extra || {}; state.done = state.done || {}; state.hints = state.hints || {}; state.star = state.star || {};
      page();
      refresh();
      if (location.hash) { var target = document.getElementById(location.hash.slice(1)); if (target) target.scrollIntoView(); }
    }

    return { start: start, Text: Text, settings: SETTINGS, get state() { return state; }, get module() { return M; } };
  })();
})(this);

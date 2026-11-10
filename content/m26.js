module.exports = {
  num: 26, unit: 6, slug: "m26-polynomials", minutes: 40, calculator: "not needed",
  title: "Polynomials",
  subtitle: "Vocabulary, adding and subtracting, and multiplying (including binomials)",
  lede: "Polynomials are expressions like 3x² − 5x + 2. They describe curves, areas and motion, and they're the building blocks of the last unit of Algebra 1.",
  recap: "Exponential functions y = a·bˣ multiply by the same factor each step. Growth: b > 1. Decay: 0 < b < 1.",
  goals: [
    "Name polynomials by number of terms and degree, and write them in standard form",
    "Add and subtract polynomials by combining like terms",
    "Multiply polynomials, including two binomials, with the box method or FOIL"
  ],
  context: {
    title: "The curves inside every car and every font",
    place: "Paris · 1960s",
    text: `In the 1960s, car designers drew curves by hand on huge sheets of paper, and factory workers copied them as best they could. Every car came out slightly different.

**Pierre Bézier**, an engineer at the French carmaker **Renault**, wanted a way to describe a smooth curve *exactly*, with numbers a computer could use to cut metal. His answer was a family of curves built from **polynomials**: expressions like {{3t^2 - 2t + 1}}. A designer moves a few "control points," and the polynomial does the rest. (Another engineer, **Paul de Casteljau**, had found the same math a few years earlier at Citroën, but his company kept it secret.)

Today these **Bézier curves** are everywhere. Every letter you're reading right now is drawn with them: fonts store each letter as a set of polynomial curves. The "pen tool" in drawing apps, the smooth paths of characters in animated movies and video games, and the bodies of cars are all made of polynomials.

This week you'll learn the basic moves with polynomials: adding, subtracting and multiplying.`,
    ask: "Zoom way in on a letter on a screen. Why do you think it stays smooth instead of getting blocky?"
  },
  learn: [
    {
      title: "Polynomial vocabulary",
      text: `A **polynomial** is a sum of terms like {{5x^3}}, {{-2x}} or {{7}}: numbers times variables with **whole-number exponents**. (Not allowed: variables in denominators or under roots, like {{1/x}} or {{sqrt(x)}}.)

- By number of terms: **monomial** (1 term), **binomial** (2), **trinomial** (3).
- The **degree** is the highest exponent: {{4x^3 - x + 2}} has degree 3.
- **Standard form** lists terms from highest degree to lowest: {{-x + 4x^3 + 2}} becomes {{4x^3 - x + 2}}. The first coefficient is the **leading coefficient**.`,
      table: {
        head: ["Polynomial", "Name", "Degree"],
        rows: [["{{7x}}", "monomial", "1 (linear)"], ["{{x^2 - 9}}", "binomial", "2 (quadratic)"], ["{{3x^2 + 5x - 2}}", "trinomial", "2 (quadratic)"], ["{{2x^3 - x}}", "binomial", "3 (cubic)"], ["{{-6}}", "monomial", "0 (constant)"]]
      }
    },
    {
      title: "Adding and subtracting",
      text: `**Adding:** combine like terms. {{(3x^2 + 2x - 5) + (x^2 - 6x + 1) = 4x^2 - 4x - 4}}.

**Subtracting:** distribute the minus sign to **every term** in the second polynomial first, then combine:`,
      worked: [
        { problem: "{{(5x^2 - 3x + 4) - (2x^2 + x - 7)}}", steps: [["{{5x^2 - 3x + 4 - 2x^2 - x + 7}}", "Change the sign of every term in the second group."], ["{{(5x^2 - 2x^2) + (-3x - x) + (4 + 7)}}", "Group like terms."], ["{{3x^2 - 4x + 11}}"]] }
      ],
      check: { q: "{{(x^2 + 4x) - (x^2 - 3x)}} = ?", choices: [["{{7x}}", true, "x² − x² = 0 and 4x − (−3x) = 7x."], ["{{x}}", false, "Subtracting −3x is adding 3x."], ["{{2x^2 + 7x}}", false, "The x² terms cancel."]] }
    },
    {
      title: "Multiplying",
      text: `**Monomial × polynomial:** distribute. {{2x(3x^2 - x + 4) = 6x^3 - 2x^2 + 8x}}.

**Binomial × binomial:** every term in the first multiplies every term in the second. The **box method** keeps it organized: put one binomial across the top, the other down the side, multiply into each box, then combine like terms.`,
      fig: "box",
      after: `**FOIL** is another way to remember the four products: **F**irst, **O**uter, **I**nner, **L**ast. For {{(x + 3)(x + 5)}}: {{x^2 + 5x + 3x + 15 = x^2 + 8x + 15}}.

**Watch out:** {{(x + 3)^2}} means {{(x + 3)(x + 3) = x^2 + 6x + 9}}, **not** {{x^2 + 9}}.`,
      worked: [
        { problem: "{{(2x - 1)(x + 4)}}", steps: [["{{2x * x + 2x * 4 + (-1) * x + (-1) * 4}}", "Four products."], ["{{2x^2 + 8x - x - 4}}"], ["{{2x^2 + 7x - 4}}", "Combine the middle terms."]] }
      ]
    }
  ],
  tasks: [
    {
      id: "t1", type: "sort", title: "Name it",
      cats: ["Monomial", "Binomial", "Trinomial"],
      items: [["{{8x^2}}", 0], ["{{x + 5}}", 1], ["{{x^2 - 3x + 2}}", 2], ["{{-4}}", 0], ["{{3y^2 - 7}}", 1], ["{{a^3 + a^2 + a}}", 2], ["{{9xy}}", 0], ["{{2x^4 - x}}", 1]],
      hints: ["Count the terms, separated by + and −."]
    },
    {
      id: "t2", type: "select", title: "Degree and standard form",
      items: [
        "The degree of {{6x^4 - 2x + 1}} is {4|6|3}.",
        "The degree of {{5x - 9}} is {1|5|0}.",
        "{{7 + 2x^2 - x}} in standard form is {2x^2 - x + 7|7 - x + 2x^2|2x^2 + 7 - x}.",
        "The leading coefficient of {{-3x^3 + x^2 - 4}} is {−3|3|−4}.",
        "{{x^2 + 1/x}} {is not a polynomial|is a polynomial}, because of the {{1/x}}."
      ],
      hints: ["Degree = highest exponent.", "Standard form: highest exponent first."]
    },
    {
      id: "t3", type: "solve", title: "Add and subtract", pick: 5,
      intro: "Type answers in standard form, like **4x^2 - 4x - 4**.",
      items: [
        { q: "{{(3x^2 + 2x - 5) + (x^2 - 6x + 1)}}", a: "4x^2 - 4x - 4", from: "(3x^2 + 2x - 5) + (x^2 - 6x + 1)", how: ["{{3x^2 + x^2 = 4x^2}}, {{2x - 6x = -4x}}, {{-5 + 1 = -4}}"] },
        { q: "{{(5x + 7) + (2x - 9)}}", a: "7x - 2", from: "(5x+7)+(2x-9)", how: ["**7x − 2**"] },
        { q: "{{(4x^2 - x + 3) - (x^2 + 2x - 1)}}", a: "3x^2 - 3x + 4", from: "(4x^2 - x + 3) - (x^2 + 2x - 1)", how: ["{{4x^2 - x + 3 - x^2 - 2x + 1}}", "**3x² − 3x + 4**"] },
        { q: "{{(6y - 4) - (8y - 10)}}", a: "-2y + 6", from: "(6y-4)-(8y-10)", how: ["{{6y - 4 - 8y + 10}}", "**−2y + 6**"] },
        { q: "{{(x^3 + 2x) + (3x^3 - 2x + 5)}}", a: "4x^3 + 5", from: "(x^3+2x)+(3x^3-2x+5)", how: ["The x terms cancel: **4x³ + 5**"] },
        { q: "{{(2a^2 - 5a) - (-a^2 + a - 3)}}", a: "3a^2 - 6a + 3", from: "(2a^2-5a)-(-a^2+a-3)", how: ["{{2a^2 - 5a + a^2 - a + 3}}", "**3a² − 6a + 3**"] }
      ],
      hints: ["When subtracting, change the sign of every term in the second group.", "Then combine like terms: x² with x², x with x, numbers with numbers."]
    },
    {
      id: "t4", type: "solve", title: "Multiply by a monomial", pick: 4,
      items: [
        { q: "{{3x(x + 4)}}", a: "3x^2 + 12x", from: "3x(x+4)", how: ["{{3x * x + 3x * 4}}", "**3x² + 12x**"] },
        { q: "{{-2x(x^2 - 5x + 1)}}", a: "-2x^3 + 10x^2 - 2x", from: "-2x(x^2-5x+1)", how: ["**−2x³ + 10x² − 2x**"] },
        { q: "{{4a^2(2a - 3)}}", a: "8a^3 - 12a^2", from: "4a^2(2a-3)", how: ["**8a³ − 12a²**"] },
        { q: "{{x^2(x^2 + x - 6)}}", a: "x^4 + x^3 - 6x^2", from: "x^2(x^2+x-6)", how: ["**x⁴ + x³ − 6x²**"] },
        { q: "{{-5y(3 - y)}}", a: "5y^2 - 15y", from: "-5y(3-y)", how: ["{{-15y + 5y^2}}", "**5y² − 15y**"] }
      ],
      hints: ["Distribute to every term. Multiply coefficients and add exponents."]
    },
    {
      id: "t5", type: "solve", title: "Multiply two binomials", pick: 5,
      intro: "Use the box method or FOIL, then combine like terms.",
      items: [
        { q: "{{(x + 3)(x + 5)}}", a: "x^2 + 8x + 15", from: "(x+3)(x+5)", how: ["{{x^2 + 5x + 3x + 15}}", "**x² + 8x + 15**"] },
        { q: "{{(x - 2)(x + 6)}}", a: "x^2 + 4x - 12", from: "(x-2)(x+6)", how: ["{{x^2 + 6x - 2x - 12}}", "**x² + 4x − 12**"] },
        { q: "{{(x - 4)(x - 3)}}", a: "x^2 - 7x + 12", from: "(x-4)(x-3)", how: ["{{x^2 - 3x - 4x + 12}}", "**x² − 7x + 12**"] },
        { q: "{{(2x + 1)(x + 3)}}", a: "2x^2 + 7x + 3", from: "(2x+1)(x+3)", how: ["{{2x^2 + 6x + x + 3}}", "**2x² + 7x + 3**"] },
        { q: "{{(x + 5)^2}}", a: "x^2 + 10x + 25", from: "(x+5)^2", how: ["{{(x + 5)(x + 5) = x^2 + 5x + 5x + 25}}", "**x² + 10x + 25**"] },
        { q: "{{(x + 7)(x - 7)}}", a: "x^2 - 49", from: "(x+7)(x-7)", how: ["{{x^2 - 7x + 7x - 49}}", "The middle terms cancel: **x² − 49**"] },
        { q: "{{(3x - 2)(2x - 5)}}", a: "6x^2 - 19x + 10", from: "(3x-2)(2x-5)", how: ["{{6x^2 - 15x - 4x + 10}}", "**6x² − 19x + 10**"] }
      ],
      hints: ["Four products: first·first, first·last, last·first, last·last.", "Then combine the two middle terms."]
    },
    {
      id: "t6", type: "mistake", title: "Polynomial pitfalls",
      intro: "Tap the **first wrong line**, then type the correct answer.",
      items: [
        { q: "{{(x + 3)^2}}", lines: ["{{x^2 + 3^2}}", "{{x^2 + 9}}"], bad: 0, why: "Squaring a binomial means multiplying it by itself: {{(x + 3)(x + 3) = x^2 + 6x + 9}}.", a: "x^2 + 6x + 9", from: "(x+3)^2" },
        { q: "{{(3x^2 + 5) - (x^2 - 2)}}", lines: ["{{3x^2 + 5 - x^2 - 2}}", "{{2x^2 + 3}}"], bad: 0, why: "Subtracting −2 gives +2: {{3x^2 + 5 - x^2 + 2 = 2x^2 + 7}}.", a: "2x^2 + 7", from: "(3x^2+5)-(x^2-2)" },
        { q: "{{(x + 4)(x - 1)}}", lines: ["{{x^2 - x + 4x - 4}}", "{{x^2 + 5x - 4}}"], bad: 1, why: "{{-x + 4x = 3x}}: {{x^2 + 3x - 4}}.", a: "x^2 + 3x - 4", from: "(x+4)(x-1)" }
      ]
    }
  ],
  build: {
    heading: "Area with polynomials",
    prompt: `A rectangular garden is {{(x + 4)}} feet long and {{(x + 2)}} feet wide. Draw (on paper) a **box diagram** and find the area as a polynomial. Then pick a value for {{x}}, find the actual length, width and area, and **check** that your polynomial gives the same area.`,
    model: `Using the box method, the four parts are x^2, 2x, 4x and 8, so the area is (x + 4)(x + 2) = x^2 + 6x + 8. If x = 5, the garden is 9 ft by 7 ft, so the area is 63 square feet. Check: 5^2 + 6(5) + 8 = 25 + 30 + 8 = 63. It matches.`,
    placeholder: "Using the box method, …",
    reqs: [
      { t: "The area polynomial x² + 6x + 8", re: "x\\s*(\\^\\s*2|²)\\s*\\+\\s*6\\s*x\\s*\\+\\s*8" },
      { t: "Choose a value, like x = 5", re: "\\bx\\s*=\\s*\\d" },
      { t: "Find the actual area (*square feet* or *area*)", re: "\\b(square|area)\\b" },
      { t: "Check that they match (use *check* or *matches*)", re: "\\b(check|match)" }
    ]
  },
  reflect: {
    q: "Paul de Casteljau discovered the same curves as Bézier first, but his company kept it secret, so the curves are named after Bézier. What do you think about keeping discoveries secret vs. sharing them? Is it ever right to keep an idea to yourself?",
    placeholder: "I think…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "Bigger products",
      items: [
        { q: "{{(2x - 3)(x^2 + 4x - 1)}}", a: "2x^3 + 5x^2 - 14x + 3", from: "(2x-3)(x^2+4x-1)", how: ["{{2x^3 + 8x^2 - 2x - 3x^2 - 12x + 3}}", "**2x³ + 5x² − 14x + 3**"] },
        { q: "{{(x + 1)^3}}", a: "x^3 + 3x^2 + 3x + 1", from: "(x+1)^3", how: ["{{(x + 1)^2 = x^2 + 2x + 1}}", "{{(x^2 + 2x + 1)(x + 1) = x^3 + 3x^2 + 3x + 1}}"] },
        { q: "{{(x + 2)(x - 2)(x + 3)}}", a: "x^3 + 3x^2 - 4x - 12", from: "(x+2)(x-2)(x+3)", how: ["{{(x^2 - 4)(x + 3)}}", "**x³ + 3x² − 4x − 12**"] }
      ]
    },
    {
      id: "x2", type: "solve", title: "Mental math with polynomials",
      intro: "Use {{(a + b)(a - b) = a^2 - b^2}} or {{(a + b)^2 = a^2 + 2ab + b^2}} to do these without a calculator.",
      items: [
        { q: "{{21 * 19}} (think {{(20 + 1)(20 - 1)}})", a: "399", from: "21*19", how: ["{{20^2 - 1^2 = 400 - 1}}"] },
        { q: "{{52^2}} (think {{(50 + 2)^2}})", a: "2704", from: "52^2", how: ["{{2500 + 200 + 4}}"] },
        { q: "{{103 * 97}}", a: "9991", from: "103*97", how: ["{{100^2 - 3^2 = 10000 - 9}}"] }
      ]
    }
  ],
  figs: {
    box: { x: [0, 8], y: [0, 4], w: 260, pad: 26, bare: true, segs: [[0, 0, 7, 0, 0], [0, 2, 7, 2, 0], [0, 4, 7, 4, 0], [0, 0, 0, 4, 0], [4, 0, 4, 4, 0], [7, 0, 7, 4, 0]], texts: [[2, 4.5, "x"], [5.5, 4.5, "+5"], [-0.5, 3, "x"], [-0.5, 1, "+3"], [2, 3, "x²"], [5.5, 3, "5x"], [2, 1, "3x"], [5.5, 1, "15"]], alt: "Box method for (x + 3)(x + 5): boxes x², 5x, 3x and 15" }
  },
  culture: "**Did you know?** The TrueType fonts on most computers store each letter as quadratic Bézier curves (polynomials of degree 2), and PostScript and OpenType fonts use cubic ones (degree 3). Every letter on this page is a set of polynomials.",
  teacher: {
    snags: [
      ["Task 3", "Subtracts only the first term of the second polynomial", "Distribute the minus sign to every term."],
      ["Task 5", "Writes {{(x + 5)^2 = x^2 + 25}}", "Task 6, item 1 targets this."],
      ["Task 5", "Leaves the answer as x² + 5x + 3x + 15", "Marked yellow: combine like terms."]
    ],
    factcheck: "Pierre Bézier (Renault) published his curves in the early 1960s (UNISURF CAD system); Paul de Casteljau developed the same curves at Citroën in 1959, kept confidential. TrueType uses quadratic Bézier splines; PostScript Type 1 and CFF-based OpenType use cubic Béziers."
  }
};

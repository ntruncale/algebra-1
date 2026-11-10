module.exports = {
  num: 24, unit: 5, slug: "m24-exponent-rules", minutes: 40, calculator: "allowed",
  title: "Exponent Rules and Scientific Notation",
  subtitle: "Product, quotient and power rules, zero and negative exponents, and very big and very small numbers",
  lede: "Exponents have a few simple rules that make huge calculations easy. They're also how scientists write numbers too big or too small to say out loud.",
  recap: "Elimination: multiply equations so a variable has opposite coefficients, then add. Choose substitution when a variable is already alone.",
  goals: [
    "Use the product, quotient and power rules for exponents",
    "Simplify expressions with zero and negative exponents",
    "Write and calculate with numbers in scientific notation"
  ],
  context: {
    title: "A nine-year-old named a number",
    place: "New York · about 1920",
    text: `Around **1920**, the mathematician **Edward Kasner** asked his nine-year-old nephew, **Milton Sirotta**, to invent a name for a really big number: **1 followed by 100 zeros**. Milton thought for a moment and said it should be called a **googol**. He suggested an even bigger one too: a **googolplex**, which is 1 followed by a googol zeros.

Kasner put both words in his popular book *Mathematics and the Imagination* (1940), and they stuck.

A googol is so big there's nothing to count with it. Scientists estimate there are only about **10⁸⁰ atoms** in the whole observable universe, and a googol is **10²⁰ times bigger** than that. Writing it as **10¹⁰⁰** is the only practical way.

In **1997**, two Stanford students named their new search engine after the googol, to suggest how much information it could organize. They misspelled it. The company became **Google**.`,
    ask: "10² = 100 has 2 zeros, and 10³ = 1,000 has 3. How many zeros does 10¹⁰⁰ have?"
  },
  learn: [
    {
      title: "Product, quotient and power rules",
      text: `These rules come straight from what exponents mean. {{x^3 * x^2 = (x * x * x)(x * x) = x^5}}.`,
      table: {
        head: ["Rule", "In words", "Example"],
        rows: [
          ["{{x^a * x^b = x^(a + b)}}", "Multiplying, same base: **add** exponents", "{{x^3 * x^4 = x^7}}"],
          ["{{x^a / x^b = x^(a - b)}}", "Dividing, same base: **subtract** exponents", "{{x^9 / x^4 = x^5}}"],
          ["{{(x^a)^b = x^(ab)}}", "Power of a power: **multiply** exponents", "{{(x^2)^5 = x^10}}"],
          ["{{(xy)^a = x^a y^a}}", "Power of a product: each factor gets the power", "{{(3x)^2 = 9x^2}}"]
        ],
        caption: "Coefficients follow normal arithmetic: {{(2x^3)(5x^4) = 10x^7}}. Multiply the 2 and 5, add the exponents."
      },
      worked: [
        { problem: "{{(4x^2 y)(3x^5 y^3)}}", steps: [["{{(4 * 3)(x^2 * x^5)(y * y^3)}}", "Group numbers, x's and y's."], ["{{12x^7 y^4}}", "Multiply numbers, add exponents (y = y¹)."]] },
        { problem: "{{(2x^3)^4}}", steps: [["{{2^4 * (x^3)^4}}", "Each factor gets the power."], ["{{16x^12}}"]] }
      ]
    },
    {
      title: "Zero and negative exponents",
      text: `Look at the pattern: {{2^3 = 8}}, {{2^2 = 4}}, {{2^1 = 2}}. Each step **divides by 2**. Keep going:

> {{2^0 = 1}},  {{2^(-1) = 1/2}},  {{2^(-2) = 1/4}},  {{2^(-3) = 1/8}}

- **Zero exponent:** anything (except 0) to the power 0 is **1**: {{x^0 = 1}}.
- **Negative exponent:** means **reciprocal**: {{x^(-n) = 1/x^n}}. It does **not** make the number negative.`,
      check: { q: "What is {{5^(-2)}}?", choices: [["{{1/25}}", true, "5⁻² = 1/5² = 1/25."], ["{{-25}}", false, "A negative exponent means reciprocal, not negative."], ["{{-10}}", false]] },
      worked: [
        { problem: "Simplify {{x^3 / x^7}} with a positive exponent.", steps: [["{{x^(3 - 7) = x^(-4)}}", "Subtract the exponents."], ["{{1/x^4}}", "Rewrite the negative exponent as a reciprocal."]] }
      ]
    },
    {
      title: "Scientific notation",
      text: `**Scientific notation** writes a number as **(a number from 1 to 10) × (a power of 10)**:

- {{93,000,000}} miles (distance to the Sun) = {{9.3 * 10^7}}: move the decimal 7 places left.
- {{0.000004}} meters (a bacterium) = {{4 * 10^(-6)}}: move the decimal 6 places right. Small numbers get **negative** exponents.

To **multiply**, multiply the front numbers and **add** the exponents: {{(3 * 10^4)(2 * 10^5) = 6 * 10^9}}. If the front number ends up 10 or more, adjust: {{15 * 10^3 = 1.5 * 10^4}}.`
    }
  ],
  tasks: [
    {
      id: "t1", type: "match", title: "Match the rule", left: "Expression", right: "Simplified",
      pairs: [["{{x^2 * x^6}}", "{{x^8}}"], ["{{x^12 / x^3}}", "{{x^9}}"], ["{{(x^4)^3}}", "{{x^12}}"], ["{{x^0}}", "{{1}}"], ["{{x^(-2)}}", "{{1/x^2}}"], ["{{(2x)^3}}", "{{8x^3}}"]],
      hints: ["Multiplying → add exponents. Dividing → subtract. Power of a power → multiply."]
    },
    {
      id: "t2", type: "solve", title: "Product and quotient rules", pick: 5,
      intro: "Simplify. Type exponents with ^, like **x^7**, or use the ² key.",
      items: [
        { q: "{{x^4 * x^5}}", a: "x^9", from: "x^4*x^5", how: ["Add exponents: 4 + 5 = 9"] },
        { q: "{{a^6 / a^2}}", a: "a^4", from: "a^6/a^2", how: ["Subtract: 6 − 2 = 4"] },
        { q: "{{(3x^2)(4x^5)}}", a: "12x^7", from: "3x^2*4x^5", how: ["3 · 4 = 12, and x²·x⁵ = x⁷"] },
        { q: "{{(10y^8)/(2y^3)}}", a: "5y^5", from: "10y^8/(2y^3)", how: ["10 ÷ 2 = 5, and y⁸ ÷ y³ = y⁵"] },
        { q: "{{(2a^3 b)(5a b^4)}}", a: "10a^4b^5", from: "2a^3*b*5a*b^4", how: ["2 · 5 = 10, {{a^3 * a = a^4}}, {{b * b^4 = b^5}}"] },
        { q: "{{(-6x^7)/(3x)}}", a: "-2x^6", from: "-6x^7/(3x)", how: ["−6 ÷ 3 = −2, x⁷ ÷ x¹ = x⁶"] },
        { q: "{{2^3 * 2^4}} (as a number)", a: "128", from: "2^7", how: ["{{2^7 = 128}}"] }
      ],
      hints: ["Multiply the coefficients normally. Then add (or subtract) exponents of the same variable.", "A variable with no exponent has exponent 1."]
    },
    {
      id: "t3", type: "solve", title: "Powers, zero and negatives", pick: 5,
      intro: "Simplify. Write answers with **positive exponents only**.",
      items: [
        { q: "{{(x^3)^4}}", a: "x^12", from: "(x^3)^4", how: ["Multiply: 3 × 4 = 12"] },
        { q: "{{(5x^2)^2}}", a: "25x^4", from: "(5x^2)^2", how: ["{{5^2 = 25}} and {{(x^2)^2 = x^4}}"] },
        { q: "{{7^0}}", a: "1", from: "7^0", how: ["Anything (but 0) to the 0 is **1**"] },
        { q: "{{4^(-2)}}", a: "1/16", from: "4^(-2)", how: ["{{1/4^2 = 1/16}}"] },
        { q: "{{x^(-5)}}", a: "1/x^5", from: "x^(-5)", how: ["Negative exponent → reciprocal: **1/x⁵**"] },
        { q: "{{x^2 / x^6}}", a: "1/x^4", from: "x^2/x^6", how: ["{{x^(2 - 6) = x^(-4) = 1/x^4}}"] },
        { q: "{{3y^0}}", a: "3", from: "3", how: ["Only y gets the 0: {{3 * 1 = 3}}"] },
        { q: "{{(2a^(-3))^2}}", a: "4/a^6", from: "4/a^6", how: ["{{4a^(-6) = 4/a^6}}"] }
      ],
      hints: ["x⁻ⁿ = 1/xⁿ. Negative exponents don't make anything negative.", "In 3y⁰, the exponent belongs only to y."]
    },
    {
      id: "t4", type: "sort", title: "Scientific notation or not?",
      intro: "Is each number written correctly in scientific notation?",
      cats: ["Yes", "No"],
      items: [
        ["{{4.5 * 10^6}}", 0], ["{{45 * 10^5}}", 1, "45 is bigger than 10. It should be 4.5 × 10⁶."], ["{{0.8 * 10^3}}", 1, "0.8 is less than 1: 8 × 10²."], ["{{1 * 10^(-9)}}", 0],
        ["{{9.99 * 10^20}}", 0], ["{{3.2 * 5^4}}", 1, "It has to be a power of 10."], ["{{6.02 * 10^23}}", 0]
      ],
      hints: ["The front number must be at least 1 and less than 10, and it must be times a power of 10."]
    },
    {
      id: "t5", type: "cloze", title: "Convert",
      intro: "Fill in the blanks.",
      items: [
        "{{93000000 = }}[9.3]{{ * 10^}}[7]",
        "{{0.00052 = }}[5.2]{{ * 10^}}[-4]",
        "{{6400 = }}[6.4]{{ * 10^}}[3]",
        "{{3.1 * 10^5 = }}[310000]",
        "{{7 * 10^(-3) = }}[0.007]",
        "{{(2 * 10^3)(4 * 10^6) = }}[8]{{ * 10^}}[9]",
        "{{(6 * 10^8)/(3 * 10^2) = }}[2]{{ * 10^}}[6]"
      ],
      hints: ["Count how many places the decimal moves. Left for big numbers (positive exponent), right for small numbers (negative exponent).", "To multiply, multiply the front numbers and add the exponents. To divide, divide and subtract."]
    },
    {
      id: "t6", type: "mistake", title: "Exponent errors",
      intro: "Tap the **first wrong line**, then type the correct simplified answer.",
      items: [
        { q: "{{x^3 * x^4}}", lines: ["{{x^(3 * 4)}}", "{{x^12}}"], bad: 0, why: "When multiplying, **add** exponents: {{x^7}}. You multiply exponents only for a power of a power.", a: "x^7", from: "x^7" },
        { q: "{{(3x^2)^3}}", lines: ["{{(3x^2)^3 = 3(x^2)^3}}", "{{= 3x^6}}"], bad: 0, why: "The 3 gets cubed too: {{3^3 x^6 = 27x^6}}.", a: "27x^6", from: "27x^6" },
        { q: "{{2^(-3)}}", lines: ["{{-2^3}}", "{{-8}}"], bad: 0, why: "A negative exponent means **reciprocal**: {{1/2^3 = 1/8}}.", a: "1/8", from: "1/8" }
      ]
    }
  ],
  build: {
    heading: "Big and small numbers",
    prompt: `Find **two real numbers**, one very large and one very small (a distance in space, a population, the size of a cell or virus, the width of a hair). Write each in **standard form** and in **scientific notation**. Then **divide or multiply** them in scientific notation and explain what your answer means.`,
    model: `The distance from Earth to the Sun is about 150,000,000 km, which is 1.5 × 10^8 km. A human hair is about 0.0001 m wide, which is 1 × 10^-4 m. Also, a red blood cell is about 0.000008 m wide, or 8 × 10^-6 m. The hair is (1 × 10^-4) ÷ (8 × 10^-6) = 0.125 × 10^2 = 12.5 times wider than a red blood cell.`,
    placeholder: "A large number: … A small number: …",
    reqs: [
      { t: "Two numbers in scientific notation (× 10^)", re: "\\d\\s*[×x*·]\\s*10\\s*(\\^|⁻|[⁰¹²³⁴⁵⁶⁷⁸⁹])", min: 2 },
      { t: "A negative exponent for the small number", re: "10\\s*(\\^\\s*\\(?\\s*[-−]|⁻)" },
      { t: "Multiply or divide them (use *times* or *÷*)", re: "\\b(times|divide|multipl)|÷" },
      { t: "At least 3 sentences", sentences: 3 }
    ]
  },
  reflect: {
    q: "A nine-year-old named the googol, and a misspelling named one of the biggest companies in the world. Have you ever made up a word or an idea that other people started using? Why do you think some new words catch on?",
    placeholder: "I think new words catch on when…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "Exponent workout",
      intro: "Simplify. Positive exponents only.",
      items: [
        { q: "{{(2x^3 y^(-2))^3}}", a: "8x^9/y^6", from: "8x^9/y^6", how: ["{{2^3 x^9 y^(-6)}}", "**8x⁹/y⁶**"] },
        { q: "{{(4a^5 b^2)/(12a^2 b^7)}}", a: "a^3/(3b^5)", from: "a^3/(3*b^5)", how: ["{{4/12 = 1/3}}, {{a^(5-2) = a^3}}, {{b^(2-7) = b^(-5)}}", "**a³/(3b⁵)**"] },
        { q: "{{(x^2)^3 * x^(-4)}}", a: "x^2", from: "x^2", how: ["{{x^6 * x^(-4) = x^2}}"] },
        { q: "{{2^10}} is about {{10^?}}. ({{2^10 = 1024}}.) So {{2^30}} is about {{10^?}}. Type the exponent.", a: "9", how: ["{{2^30 = (2^10)^3 ≈ (10^3)^3 = 10^9}}"] }
      ]
    },
    {
      id: "x2", type: "solve", title: "Astronomical numbers",
      items: [
        { q: "Light travels about {{3 * 10^5}} km per second. A year is about {{3.15 * 10^7}} seconds. About how far does light travel in a year, in km? Type the answer like **9.45*10^12**.", a: "9.45*10^12", how: ["{{(3 * 3.15)(10^(5 + 7)) = 9.45 * 10^12}} km: one light-year"] },
        { q: "How many times bigger is a googol ({{10^100}}) than the number of atoms in the universe (about {{10^80}})? Type it as a power of 10, like **10^5**.", a: "10^20", how: ["{{10^100 / 10^80 = 10^20}}"] },
        { q: "A googolplex is {{10^(10^100)}}. If you could write one zero per second, about how many **years** would it take to write a googolplex? Use {{3 * 10^7}} seconds per year. Round the front number to one decimal place, like **5.1*10^92**.", a: "3.3*10^92", how: ["{{10^100 / (3 * 10^7) ≈ 0.33 * 10^93 = 3.3 * 10^92}} years", "The universe is about {{1.4 * 10^10}} years old!"] }
      ]
    }
  ],
  culture: "**Did you know?** Avogadro's number, {{6.02 * 10^23}}, is the number of atoms in 12 grams of carbon. Chemistry students celebrate Mole Day on October 23 (10/23) from 6:02 a.m. to 6:02 p.m.",
  teacher: {
    snags: [
      ["Task 3", "Types *x^-5*", "Marked yellow: equal, but the task asks for positive exponents."],
      ["Task 2", "Types *x^4·x^5* back unchanged", "Marked yellow: equal but not simplified."],
      ["Task 5", "Moves the decimal the wrong way for small numbers", "Small numbers (less than 1) get negative exponents."]
    ],
    factcheck: "Edward Kasner and James Newman, *Mathematics and the Imagination* (1940), tell how Kasner's nephew Milton Sirotta (then 9; the event is usually dated 1920) coined *googol* and *googolplex*. Google's name: Larry Page and Sergey Brin registered google.com in September 1997; the misspelling of *googol* is described in Stanford and company histories. The estimate of about 10⁸⁰ atoms in the observable universe is standard. A light-year is about 9.46 × 10¹² km."
  }
};

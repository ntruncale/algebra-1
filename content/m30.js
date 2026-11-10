module.exports = {
  num: 30, unit: 6, slug: "m30-solving-quadratics", minutes: 45, calculator: "allowed",
  title: "Solving Quadratic Equations",
  subtitle: "Factoring and the zero product property, square roots, and the quadratic formula",
  lede: "The last module puts it all together. Factoring, square roots and a famous formula all solve the same kind of equation: ax² + bx + c = 0. Then: look back at how far you've come.",
  recap: "A parabola y = ax² + bx + c opens up if a > 0 and down if a < 0. Its vertex is on the axis of symmetry x = −b/(2a). Its zeros are where it crosses the x-axis.",
  goals: [
    "Solve quadratic equations by factoring, using the zero product property",
    "Solve quadratic equations by taking square roots",
    "Use the quadratic formula, and the discriminant to count solutions"
  ],
  context: {
    title: "Brahmagupta's rules",
    place: "Bhillamala, India · AD 628",
    text: `In **AD 628**, the astronomer and mathematician **Brahmagupta**, working in the city of Bhillamala in India, finished a book called the *Brāhmasphuṭasiddhānta*. He was only 30 years old.

It contains two ideas you've used all year. First, rules for **zero and negative numbers**, written as "fortunes" and "debts": *a debt minus zero is a debt; a fortune minus zero is a fortune; zero minus zero is zero.* It's one of the first books to treat zero as a number you can calculate with.

Second, a rule in verse for solving equations like {{ax^2 + bx = c}}. In modern symbols, his rule is equivalent to part of the **quadratic formula**, the formula you'll learn this week. Mathematicians in Baghdad (including al-Khwarizmi, from Module 6), and later in Europe, built on his work.

Remember al-Khwarizmi's famous problem, *"a square and ten roots equal thirty-nine"*? That's {{x^2 + 10x = 39}}. By the end of this module, you can solve it three different ways.`,
    ask: "Look back at Module 1. What could you do then, and what can you do now?"
  },
  learn: [
    {
      title: "Solving by factoring",
      text: `The **zero product property**: if {{A * B = 0}}, then {{A = 0}} or {{B = 0}}. (If two numbers multiply to zero, one of them must be zero.)

To solve by factoring:
1. Get **0 on one side**.
2. **Factor** the other side.
3. Set **each factor equal to 0** and solve.`,
      worked: [
        { problem: "{{x^2 + 5x + 6 = 0}}", steps: [["{{(x + 2)(x + 3) = 0}}", "Factor."], ["{{x + 2 = 0}} or {{x + 3 = 0}}", "Zero product property."], ["{{x = -2}} or {{x = -3}}"]], check: "{{(-2)^2 + 5(-2) + 6 = 4 - 10 + 6 = 0}} ✓", eq: "x^2 + 5x + 6 = 0", answer: "-2 or -3" },
        { problem: "{{x^2 = 4x}}", steps: [["{{x^2 - 4x = 0}}", "Get 0 on one side. (Don't divide by x: you'd lose a solution!)"], ["{{x(x - 4) = 0}}"], ["{{x = 0}} or {{x = 4}}"]], eq: "x^2 = 4x", answer: "0 or 4" }
      ]
    },
    {
      title: "Solving with square roots",
      text: `If the equation is just a **square equal to a number**, take the square root of both sides, and remember **±** (plus or minus):

- {{x^2 = 25}}: {{x = 5}} or {{x = -5}}.
- {{x^2 = 7}}: {{x = sqrt(7)}} or {{x = -sqrt(7)}}.
- {{(x - 3)^2 = 16}}: {{x - 3 = 4}} or {{x - 3 = -4}}, so {{x = 7}} or {{x = -1}}.
- {{x^2 = -9}}: **no real solution**.`,
      check: { q: "Solve {{x^2 - 49 = 0}}.", choices: [["{{x = 7}} or {{x = -7}}", true, "x² = 49."], ["{{x = 7}}", false, "(−7)² = 49 too."], ["{{x = 49}}", false]] }
    },
    {
      title: "The quadratic formula",
      text: `**Every** quadratic equation {{ax^2 + bx + c = 0}} can be solved with the **quadratic formula**:

> {{x = (-b ± sqrt(b^2 - 4ac))/(2a)}}

The part under the root, {{b^2 - 4ac}}, is the **discriminant**. It tells you how many real solutions there are before you finish:
- **positive**: 2 solutions (the parabola crosses the x-axis twice)
- **zero**: 1 solution (it touches once, at the vertex)
- **negative**: no real solutions (it never reaches the x-axis)`,
      worked: [
        { problem: "{{2x^2 + 3x - 2 = 0}}", steps: [["{{a = 2}}, {{b = 3}}, {{c = -2}}"], ["{{b^2 - 4ac = 9 - 4(2)(-2) = 9 + 16 = 25}}", "Discriminant first."], ["{{x = (-3 ± 5)/4}}", "√25 = 5."], ["{{x = 2/4 = 1/2}} or {{x = -8/4 = -2}}"]], eq: "2x^2 + 3x - 2 = 0", answer: "1/2 or -2" }
      ],
      tip: "Which method? Try factoring first if the numbers are small. Use square roots when there's no x term. Use the formula when nothing else works: it always does."
    }
  ],
  tasks: [
    {
      id: "t1", type: "solve", title: "Zero product property", pick: 4,
      intro: "Type both solutions with *or*, like **3 or -5**.",
      items: [
        { q: "{{(x - 3)(x + 5) = 0}}", a: "3 or -5", eq: "(x - 3)(x + 5) = 0", how: ["{{x - 3 = 0}} or {{x + 5 = 0}}", "**3 or −5**"] },
        { q: "{{(x + 1)(x - 8) = 0}}", a: "-1 or 8", eq: "(x + 1)(x - 8) = 0", how: ["**−1 or 8**"] },
        { q: "{{x(x - 6) = 0}}", a: "0 or 6", eq: "x(x - 6) = 0", how: ["{{x = 0}} or {{x - 6 = 0}}"] },
        { q: "{{(2x - 1)(x + 4) = 0}}", a: "1/2 or -4", eq: "(2x - 1)(x + 4) = 0", how: ["{{2x - 1 = 0}} gives {{x = 1/2}}", "**1/2 or −4**"] },
        { q: "{{3(x - 7)(x - 2) = 0}}", a: "7 or 2", eq: "3(x - 7)(x - 2) = 0", how: ["The 3 can't be 0, so **7 or 2**"] }
      ],
      hints: ["Set each factor equal to 0 and solve each little equation."]
    },
    {
      id: "t2", type: "solve", title: "Factor and solve", pick: 5,
      items: [
        { q: "{{x^2 + 7x + 10 = 0}}", a: "-2 or -5", eq: "x^2 + 7x + 10 = 0", how: ["{{(x + 2)(x + 5) = 0}}", "**−2 or −5**"] },
        { q: "{{x^2 - x - 12 = 0}}", a: "4 or -3", eq: "x^2 - x - 12 = 0", how: ["{{(x - 4)(x + 3) = 0}}", "**4 or −3**"] },
        { q: "{{x^2 - 9x + 20 = 0}}", a: "4 or 5", eq: "x^2 - 9x + 20 = 0", how: ["{{(x - 4)(x - 5) = 0}}"] },
        { q: "{{x^2 + 2x = 15}}", a: "3 or -5", eq: "x^2 + 2x = 15", how: ["{{x^2 + 2x - 15 = 0}}", "{{(x - 3)(x + 5) = 0}}"] },
        { q: "{{x^2 = 4x}}", a: "0 or 4", eq: "x^2 = 4x", how: ["{{x^2 - 4x = 0}}, {{x(x - 4) = 0}}"] },
        { q: "{{x^2 - 6x + 9 = 0}}", a: "3", eq: "x^2 - 6x + 9 = 0", how: ["{{(x - 3)^2 = 0}}", "Just one solution: **3**"] },
        { q: "{{x^2 + 10x = 39}} (al-Khwarizmi's problem!)", a: "3 or -13", eq: "x^2 + 10x = 39", how: ["{{x^2 + 10x - 39 = 0}}", "{{(x - 3)(x + 13) = 0}}: **3 or −13**. (Al-Khwarizmi only accepted 3.)"] }
      ],
      hints: ["Get 0 on one side first.", "Then factor and use the zero product property."]
    },
    {
      id: "t3", type: "solve", title: "Square roots", pick: 4,
      intro: "Type **no real solution** if there isn't one. Use √ for roots, like **√7 or -√7**.",
      items: [
        { q: "{{x^2 = 36}}", a: "6 or -6", eq: "x^2 = 36", how: ["**6 or −6**"] },
        { q: "{{x^2 - 7 = 0}}", a: "sqrt(7) or -sqrt(7)", eq: "x^2 - 7 = 0", how: ["{{x^2 = 7}}", "**√7 or −√7**"] },
        { q: "{{(x - 3)^2 = 16}}", a: "7 or -1", eq: "(x - 3)^2 = 16", how: ["{{x - 3 = ±4}}", "**7 or −1**"] },
        { q: "{{2x^2 = 50}}", a: "5 or -5", eq: "2x^2 = 50", how: ["{{x^2 = 25}}", "**5 or −5**"] },
        { q: "{{x^2 + 9 = 0}}", a: "no real solution", eq: "x^2 + 9 = 0", how: ["{{x^2 = -9}}: no real number squared is negative."] },
        { q: "{{(x + 1)^2 = 8}}", a: "-1 + 2sqrt(2) or -1 - 2sqrt(2)", eq: "(x + 1)^2 = 8", how: ["{{x + 1 = ±sqrt(8) = ±2sqrt(2)}}", "**−1 + 2√2 or −1 − 2√2**"] }
      ],
      hints: ["Get the square by itself, then take the square root of both sides.", "Don't forget ±: two answers."]
    },
    {
      id: "t4", type: "sort", title: "How many solutions?",
      intro: "Find the discriminant {{b^2 - 4ac}} for each.",
      cats: ["Two", "One", "None"],
      items: [
        ["{{x^2 - 5x + 6 = 0}}", 0, "25 − 24 = 1 > 0"], ["{{x^2 + 4x + 4 = 0}}", 1, "16 − 16 = 0"], ["{{x^2 + x + 5 = 0}}", 2, "1 − 20 < 0"],
        ["{{2x^2 - 3x - 1 = 0}}", 0, "9 + 8 = 17 > 0"], ["{{x^2 - 10x + 25 = 0}}", 1], ["{{3x^2 + 2x + 1 = 0}}", 2, "4 − 12 < 0"], ["{{x^2 - 2 = 0}}", 0, "0 + 8 > 0"]
      ],
      hints: ["Discriminant > 0: two. = 0: one. < 0: none."]
    },
    {
      id: "t5", type: "solve", title: "The quadratic formula", pick: 3,
      intro: "Calculator allowed. Give exact answers (fractions or √), separated by *or*.",
      items: [
        { q: "{{x^2 + 3x - 4 = 0}}", a: "1 or -4", eq: "x^2 + 3x - 4 = 0", how: ["{{b^2 - 4ac = 9 + 16 = 25}}", "{{x = (-3 ± 5)/2}}: **1 or −4**"] },
        { q: "{{2x^2 - 7x + 3 = 0}}", a: "3 or 1/2", eq: "2x^2 - 7x + 3 = 0", how: ["{{49 - 24 = 25}}", "{{x = (7 ± 5)/4}}: **3 or 1/2**"] },
        { q: "{{x^2 - 2x - 1 = 0}}", a: "1 + sqrt(2) or 1 - sqrt(2)", eq: "x^2 - 2x - 1 = 0", how: ["{{4 + 4 = 8}}", "{{x = (2 ± sqrt(8))/2 = (2 ± 2sqrt(2))/2}}: **1 + √2 or 1 − √2**"] },
        { q: "{{3x^2 + 4x - 4 = 0}}", a: "2/3 or -2", eq: "3x^2 + 4x - 4 = 0", how: ["{{16 + 48 = 64}}", "{{x = (-4 ± 8)/6}}: **2/3 or −2**"] }
      ],
      hints: ["Identify a, b and c carefully, signs included.", "Compute the discriminant first."]
    },
    {
      id: "t6", type: "solve", title: "Quadratics in the real world",
      items: [
        { q: "A ball is thrown up from the ground: {{h = -16t^2 + 64t}}. When does it land? ({{-16t^2 + 64t = 0}})", a: "4", post: "seconds", eq: "-16t^2 + 64t = 0 ; t > 0.5", how: ["{{-16t(t - 4) = 0}}", "t = 0 is the throw; it lands at **t = 4**"] },
        { q: "A rectangle's length is **3 more** than its width, and its area is **40** square feet. What's the width? ({{w(w + 3) = 40}})", a: "5", post: "feet", how: ["{{w^2 + 3w - 40 = 0}}, {{(w + 8)(w - 5) = 0}}", "A width can't be −8: **5 feet**"] },
        { q: "The product of two consecutive positive integers is **132**. What's the smaller one? ({{n(n + 1) = 132}})", a: "11", how: ["{{n^2 + n - 132 = 0}}, {{(n + 12)(n - 11) = 0}}", "Positive: **11** (11 × 12 = 132)"] }
      ],
      hints: ["Get 0 on one side and factor.", "Check whether each answer makes sense in the situation (no negative widths or times)."]
    }
  ],
  build: {
    heading: "Look back on Algebra 1",
    prompt: `This is the last module. Solve {{x^2 - 2x - 8 = 0}} **two different ways** (for example, factoring and the quadratic formula), showing each. Then write **2 or 3 sentences** looking back at the year: what's one skill from Unit 1 or 2 that you used today? What are you proudest of learning?`,
    model: `Factoring: x^2 - 2x - 8 = (x - 4)(x + 2) = 0, so x = 4 or x = -2.
Formula: a = 1, b = -2, c = -8. b^2 - 4ac = 4 + 32 = 36, so x = (2 ± 6)/2, which is 4 or -2. Both ways match.
Looking back, I used integer rules from Module 1 to get the signs right when I found the discriminant. I'm proudest of learning to solve equations, because at the start of the year I didn't understand why we used letters at all.`,
    placeholder: "Factoring: …\nFormula: …\nLooking back, …",
    reqs: [
      { t: "Get both solutions, 4 and −2", re: "\\b4\\b[^\\n]*[-−]\\s*2\\b|[-−]\\s*2\\b[^\\n]*\\b4\\b" },
      { t: "Name two methods (*factor*, *formula*, *square root*, *graph*)", re: "\\b(factor|formula|square root|graph)", min: 2 },
      { t: "Look back (use *module*, *unit*, *year* or *beginning*)", re: "\\b(module|unit|year|beginning|start)\\b" },
      { t: "Say what you're *proud* of", re: "\\bproud" }
    ]
  },
  reflect: {
    q: "Think back to Module 1 and the temperature that fell 100 degrees. How has the way you think about math changed this year? What would you tell a student starting Algebra 1 next year?",
    placeholder: "At the start of the year I… Now I… I'd tell a new student…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "Completing the square",
      intro: `Al-Khwarizmi solved {{x^2 + 10x = 39}} by **completing the square**: add {{(10/2)^2 = 25}} to both sides to make a perfect square: {{x^2 + 10x + 25 = 64}}, so {{(x + 5)^2 = 64}}.`,
      items: [
        { q: "Finish al-Khwarizmi's problem: {{(x + 5)^2 = 64}}", a: "3 or -13", eq: "(x + 5)^2 = 64", how: ["{{x + 5 = ±8}}", "**3 or −13**"] },
        { q: "Solve by completing the square: {{x^2 + 6x = 7}}", a: "1 or -7", eq: "x^2 + 6x = 7", how: ["Add {{(6/2)^2 = 9}}: {{(x + 3)^2 = 16}}", "{{x + 3 = ±4}}: **1 or −7**"] },
        { q: "Solve {{x^2 - 4x - 1 = 0}} by completing the square.", a: "2 + sqrt(5) or 2 - sqrt(5)", eq: "x^2 - 4x - 1 = 0", how: ["{{x^2 - 4x = 1}}, add 4: {{(x - 2)^2 = 5}}", "**2 ± √5**"] }
      ]
    },
    {
      id: "x2", type: "solve", title: "The golden ratio",
      intro: "The **golden ratio** φ is the positive solution of {{x^2 = x + 1}}. It shows up in sunflowers, shells, art and architecture.",
      items: [
        { q: "Solve {{x^2 - x - 1 = 0}} with the quadratic formula. Type the **positive** solution exactly.", a: "(1 + sqrt(5))/2", eq: "x^2 = x + 1", how: ["{{a = 1, b = -1, c = -1}}: {{b^2 - 4ac = 1 + 4 = 5}}", "{{x = (1 ± sqrt(5))/2}}; the positive one is **(1 + √5)/2**"] },
        { q: "To three decimal places, φ ≈ ?", a: "1.618", how: ["{{(1 + 2.236)/2 ≈ 1.618}}"] }
      ]
    }
  ],
  culture: "**Did you know?** You've now covered the core of Algebra 1: number sense, equations, inequalities, functions, linear models, systems, exponents and quadratics. That's roughly 4,000 years of math, from Babylonian tablets and the Rhind papyrus to Galileo, Gauss and GPS. Congratulations!",
  teacher: {
    snags: [
      ["Task 2", "Divides both sides of x² = 4x by x", "You lose x = 0. Get 0 on one side and factor instead."],
      ["Task 3", "Gives only the positive root", "Feedback says there are 2 answers. Remember ±."],
      ["Task 6", "Includes negative widths or t = 0", "Check whether each solution fits the situation."]
    ],
    factcheck: "Brahmagupta (598–c. 668) completed the *Brāhmasphuṭasiddhānta* in 628 at Bhillamala (Bhinmal, Rajasthan), at about age 30. It gives arithmetic rules for zero and negative numbers (\"fortunes\" and \"debts\") and a verbal rule for solving ax² + bx = c equivalent to x = (√(4ac + b²) − b)/(2a). Al-Khwarizmi's \"square and ten roots equal thirty-nine\" (x² + 10x = 39) has the positive solution 3, the only one he gave."
  }
};

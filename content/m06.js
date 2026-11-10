module.exports = {
  num: 6, unit: 2, slug: "m06-one-step-equations", minutes: 35, calculator: "not needed",
  title: "One-Step Equations",
  subtitle: "Solutions, inverse operations, and keeping the balance",
  lede: "An equation is a balance: both sides weigh the same. Solving means getting the variable alone without ever tipping the scale.",
  recap: "To simplify, distribute first, then combine like terms. Like terms have exactly the same variable part.",
  goals: [
    "Check whether a number is a solution of an equation",
    "Use inverse operations to solve one-step equations",
    "Solve equations with negatives, fractions and decimals"
  ],
  context: {
    title: "The book that named algebra",
    place: "Baghdad · about AD 820",
    text: `Twelve hundred years ago, **Baghdad** was home to the **House of Wisdom**, a library and research center where scholars translated and improved on books from Greece, Persia and India.

One of them, **Muhammad ibn Musa al-Khwarizmi**, wrote a book called *The Compendious Book on Calculation by **al-Jabr** and al-Muqabala*. *Al-jabr* means "restoring": moving a subtracted amount to the other side of an equation so everything is positive. *Al-muqabala* means "balancing": canceling the same amount from both sides.

When the book was translated into Latin, *al-jabr* became **algebra**. And al-Khwarizmi's own name, in Latin *Algoritmi*, gave us the word **algorithm**, a step-by-step method. Every app on your phone runs on algorithms.

Al-Khwarizmi wrote everything in words, with no symbols at all. But his big idea is the one you'll use today: **whatever you do to one side of an equation, do to the other side**.`,
    ask: "If a balance scale is level and you take 3 kg off the left side, what do you have to do to keep it level?"
  },
  learn: [
    {
      title: "Equations and solutions",
      text: `An **equation** says two expressions are equal. A **solution** is a value of the variable that makes the equation **true**.

To **check** a solution, substitute it and see whether both sides come out the same. Is {{x = 3}} a solution of {{2x + 1 = 7}}? {{2(3) + 1 = 7}}, and 7 = 7. Yes!`,
      fig: "balance",
      check: { q: "Is {{x = -2}} a solution of {{5 - x = 3}}?", choices: [["No, because {{5 - (-2) = 7}}", true, "Right: 7 isn't 3. (The solution is x = 2.)"], ["Yes, because {{5 - 2 = 3}}", false, "Substitute the whole value, −2, in parentheses: 5 − (−2) = 7."]], keepOrder: true }
    },
    {
      title: "Undo adding and subtracting",
      text: `To get the variable alone, use the **inverse** (opposite) operation on **both sides**:

- If a number is **added** to the variable, **subtract** it from both sides.
- If a number is **subtracted**, **add** it to both sides.`,
      worked: [
        { problem: "{{x + 7 = 3}}", steps: [["{{x + 7 - 7 = 3 - 7}}", "7 is added to x, so subtract 7 from both sides."], ["{{x = -4}}"]], check: "{{-4 + 7 = 3}} ✓", eq: "x + 7 = 3", answer: "-4" },
        { problem: "{{-5 = y - 8}}", steps: [["{{-5 + 8 = y - 8 + 8}}", "8 is subtracted from y, so add 8 to both sides."], ["{{3 = y}}", "That's the same as y = 3. The variable can be on either side."]], check: "{{-5 = 3 - 8}} ✓", eq: "-5 = y - 8", answer: "3" }
      ]
    },
    {
      title: "Undo multiplying and dividing",
      text: `- If the variable is **multiplied** by a number, **divide** both sides by it.
- If the variable is **divided** by a number, **multiply** both sides by it.
- If the coefficient is a **fraction**, multiply both sides by its **reciprocal** (flip it).`,
      worked: [
        { problem: "{{-4x = 28}}", steps: [["{{(-4x)/(-4) = 28/(-4)}}", "Divide both sides by −4, sign and all."], ["{{x = -7}}"]], check: "{{-4(-7) = 28}} ✓", eq: "-4x = 28", answer: "-7" },
        { problem: "{{x/5 = -2}}", steps: [["{{5 * x/5 = 5(-2)}}", "Multiply both sides by 5."], ["{{x = -10}}"]], eq: "x/5 = -2", answer: "-10" },
        { problem: "{{2/3 x = 8}}", steps: [["{{3/2 * 2/3 x = 3/2 * 8}}", "Multiply both sides by the reciprocal, 3/2."], ["{{x = 12}}", "{{3/2 * 8 = 24/2 = 12}}"]], check: "{{2/3 * 12 = 8}} ✓", eq: "(2/3)x = 8", answer: "12" }
      ],
      tip: "Always check your answer by substituting it into the **original** equation. It takes ten seconds and catches most mistakes."
    }
  ],
  tasks: [
    {
      id: "t1", type: "sort", title: "Is x = 4 a solution?",
      intro: "Substitute 4 for {{x}} in each equation.",
      cats: ["Yes", "No"],
      items: [
        ["{{x + 5 = 9}}", 0], ["{{3x = 12}}", 0], ["{{x - 6 = 2}}", 1, "4 − 6 = −2, not 2."], ["{{x/2 = 2}}", 0],
        ["{{10 - x = 6}}", 0], ["{{-x = 4}}", 1, "−4 isn't 4."], ["{{2x + 1 = 9}}", 0], ["{{x^2 = 8}}", 1, "4² = 16, not 8."]
      ],
      hints: ["Replace x with (4) and do the arithmetic. Are both sides equal?"]
    },
    {
      id: "t2", type: "select", title: "Which inverse?",
      items: [
        "To solve {{x + 9 = 4}}, {subtract 9 from|add 9 to|divide by 9} both sides.",
        "To solve {{x - 3 = 10}}, {add 3 to|subtract 3 from|multiply by 3} both sides.",
        "To solve {{6x = -30}}, {divide both sides by 6|subtract 6 from both sides|multiply both sides by 6}.",
        "To solve {{x/4 = 7}}, {multiply both sides by 4|divide both sides by 4|subtract 4 from both sides}.",
        "To solve {{-x = 12}}, {multiply both sides by −1|add x to both sides only|subtract 12 from both sides}.",
        "To solve {{3/4 x = 9}}, {multiply both sides by 4/3|multiply both sides by 3/4|subtract 3/4 from both sides}."
      ],
      hints: ["Ask: what is being done to x? Then do the opposite.", "−x means −1 times x."]
    },
    {
      id: "t3", type: "solve", title: "Adding and subtracting", pick: 6,
      intro: "Solve, then check on paper.",
      items: [
        { q: "{{x + 7 = 15}}", a: "8", pre: "x =", eq: "x + 7 = 15", how: ["Subtract 7 from both sides: {{x = 15 - 7}}", "**x = 8**"] },
        { q: "{{y - 4 = -9}}", a: "-5", pre: "y =", eq: "y - 4 = -9", how: ["Add 4 to both sides: {{y = -9 + 4}}", "**y = −5**"] },
        { q: "{{n + 12 = 3}}", a: "-9", pre: "n =", eq: "n + 12 = 3", how: ["Subtract 12: {{n = 3 - 12}}", "**n = −9**"] },
        { q: "{{-6 = a + 2}}", a: "-8", pre: "a =", eq: "-6 = a + 2", how: ["Subtract 2 from both sides: {{-6 - 2 = a}}", "**a = −8**"] },
        { q: "{{x - (-5) = 1}}", a: "-4", pre: "x =", eq: "x - (-5) = 1", how: ["{{x + 5 = 1}}", "Subtract 5: **x = −4**"] },
        { q: "{{m - 3.5 = 2}}", a: "5.5", pre: "m =", eq: "m - 3.5 = 2", how: ["Add 3.5: **m = 5.5**"] },
        { q: "{{x + 1/2 = 3/4}}", a: "1/4", pre: "x =", eq: "x + 1/2 = 3/4", how: ["Subtract 1/2: {{3/4 - 2/4 = 1/4}}", "**x = 1/4**"] },
        { q: "{{15 = k - 20}}", a: "35", pre: "k =", eq: "15 = k - 20", how: ["Add 20 to both sides: **k = 35**"] }
      ],
      hints: ["Do the opposite of what's being done to the variable.", "Whatever you do to one side, do to the other."]
    },
    {
      id: "t4", type: "solve", title: "Multiplying and dividing", pick: 6,
      items: [
        { q: "{{5x = 35}}", a: "7", pre: "x =", eq: "5x = 35", how: ["Divide both sides by 5: **x = 7**"] },
        { q: "{{-3y = 21}}", a: "-7", pre: "y =", eq: "-3y = 21", how: ["Divide by −3: {{21/(-3) = -7}}"] },
        { q: "{{x/6 = 4}}", a: "24", pre: "x =", eq: "x/6 = 4", how: ["Multiply both sides by 6: **x = 24**"] },
        { q: "{{n/(-2) = 9}}", a: "-18", pre: "n =", eq: "n/(-2) = 9", how: ["Multiply both sides by −2: **n = −18**"] },
        { q: "{{-x = -11}}", a: "11", pre: "x =", eq: "-x = -11", how: ["Multiply (or divide) both sides by −1: **x = 11**"] },
        { q: "{{-48 = 8k}}", a: "-6", pre: "k =", eq: "-48 = 8k", how: ["Divide both sides by 8: **k = −6**"] },
        { q: "{{3/4 x = 9}}", a: "12", pre: "x =", eq: "(3/4)x = 9", how: ["Multiply by the reciprocal 4/3: {{4/3 * 9 = 36/3}}", "**x = 12**"] },
        { q: "{{0.5w = 7}}", a: "14", pre: "w =", eq: "0.5w = 7", how: ["Divide by 0.5 (same as multiplying by 2): **w = 14**"] },
        { q: "{{-2/5 p = 4}}", a: "-10", pre: "p =", eq: "(-2/5)p = 4", how: ["Multiply by −5/2: {{-5/2 * 4 = -20/2}}", "**p = −10**"] }
      ],
      hints: ["Divide by the coefficient, including its sign.", "With a fraction coefficient, multiply both sides by its reciprocal."]
    },
    {
      id: "t5", type: "mistake", title: "Check their work",
      intro: "Tap the **first line** with a mistake. Then give the correct solution.",
      items: [
        { q: "Solve {{x + 6 = 2}}", lines: ["{{x + 6 + 6 = 2 + 6}}", "{{x = 8}}"], bad: 0, why: "6 is added to x, so you **subtract** 6: {{x = 2 - 6 = -4}}.", a: "-4", pre: "x =", eq: "x + 6 = 2" },
        { q: "Solve {{-5x = 30}}", lines: ["{{(-5x)/(-5) = 30/5}}", "{{x = 6}}"], bad: 0, why: "Divide **both** sides by −5, not 5 on one side: {{x = 30/(-5) = -6}}.", a: "-6", pre: "x =", eq: "-5x = 30" },
        { q: "Solve {{x/3 = -4}}", lines: ["{{(x/3)/3 = -4/3}}", "{{x = -4/3}}"], bad: 0, why: "x is divided by 3, so **multiply** by 3: {{x = -12}}.", a: "-12", pre: "x =", eq: "x/3 = -4" },
        { q: "Solve {{7 = y - 3}}", lines: ["{{7 - 3 = y - 3 - 3}}", "{{4 = y - 6}}"], bad: 0, why: "3 is subtracted from y, so **add** 3 to both sides: {{10 = y}}.", a: "10", pre: "y =", eq: "7 = y - 3" }
      ],
      hints: ["Is the inverse operation right? Is it done to both sides?", "Check by substituting the answer back in."]
    },
    {
      id: "t6", type: "solve", title: "Write it, solve it",
      intro: "Write an equation on paper, then solve it.",
      items: [
        { q: "After spending **$14** on lunch, Jalen has **$23** left. How much did he start with? ({{x - 14 = 23}})", a: "37", pre: "$", eq: "x - 14 = 23", how: ["{{x - 14 = 23}}", "Add 14: **$37**"] },
        { q: "**4** friends split a bill equally. Each pays **$13.50**. What was the bill? ({{b/4 = 13.50}})", a: "54", pre: "$", eq: "b/4 = 13.5", how: ["{{b/4 = 13.50}}", "Multiply by 4: **$54**"] },
        { q: "The temperature rose **9 degrees** and is now **−3°F**. What was it before?", a: "-12", post: "°F", eq: "t + 9 = -3", how: ["{{t + 9 = -3}}", "Subtract 9: **−12°F**"] },
        { q: "A team scored **6 points** on each touchdown and **42 points** from touchdowns. How many touchdowns?", a: "7", post: "touchdowns", eq: "6t = 42", how: ["{{6t = 42}}", "Divide by 6: **7**"] }
      ],
      hints: ["Let the unknown be a letter. Write what happens to it.", "Then undo it."]
    }
  ],
  build: {
    heading: "Balance it",
    prompt: `Make up a one-step equation from a real situation (money, sports, temperature, anything). Write the **situation**, the **equation**, your **solution steps**, and a **check** that shows your answer works.`,
    model: `Situation: I bought 3 tickets and paid $27 in all. How much was each ticket?
Equation: 3t = 27
Solve: divide both sides by 3, so t = 9. Each ticket cost $9.
Check: 3(9) = 27, so it works.`,
    placeholder: "Situation: …\nEquation: …\nSolve: …\nCheck: …",
    reqs: [
      { t: "An equation with a variable, like 3t = 27", re: "[a-z]\\s*[-−+=*/]|\\d[a-z]" },
      { t: "Name the inverse operation (*add, subtract, multiply* or *divide*)", re: "\\b(add|subtract|multiply|divide)" },
      { t: "Say *both sides*", re: "\\bboth sides\\b" },
      { t: "Check your answer (use the word *check*)", re: "\\bcheck" }
    ]
  },
  reflect: {
    q: "Al-Khwarizmi learned from Greek, Persian and Indian books, and his book was later studied in Europe. Math was built by people from many cultures. Why do you think sharing ideas across cultures helped math grow? Where do you see people sharing ideas like that today?",
    placeholder: "Sharing ideas helped because…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "Trickier one-steps",
      items: [
        { q: "{{x - 3/4 = 1/2}}", a: "5/4", pre: "x =", eq: "x - 3/4 = 1/2", how: ["Add 3/4: {{2/4 + 3/4 = 5/4}}"] },
        { q: "{{-0.25x = 3}}", a: "-12", pre: "x =", eq: "-0.25x = 3", how: ["Divide by −0.25 (same as multiplying by −4): **−12**"] },
        { q: "{{-x/7 = -3}}", a: "21", pre: "x =", eq: "-x/7 = -3", how: ["Multiply by −7: **x = 21**"] },
        { q: "{{5/6 = -5/3 y}}", a: "-1/2", pre: "y =", eq: "5/6 = (-5/3)y", how: ["Multiply both sides by −3/5: {{-3/5 * 5/6 = -15/30}}", "**y = −1/2**"] }
      ]
    },
    {
      id: "x2", type: "quiz", title: "Same solution?",
      intro: "Equations that have the same solution are called **equivalent equations**.",
      questions: [
        { q: "Which equation has the same solution as {{x + 4 = 10}}?", choices: [["{{2x = 12}}", true, "Both have x = 6."], ["{{x - 4 = 10}}", false, "That has x = 14."], ["{{4x = 10}}", false, "That has x = 2.5."]] },
        { q: "Which equation has **no** solution that's a positive number?", choices: [["{{x + 9 = 2}}", true, "x = −7."], ["{{x - 9 = 2}}", false, "x = 11."], ["{{-x = -2}}", false, "x = 2."]] },
        { q: "If {{a + b = 10}} and {{a = 13}}, then {{b}} is…", choices: [["{{-3}}", true, "13 + (−3) = 10."], ["{{3}}", false], ["{{23}}", false]], keepOrder: true }
      ]
    }
  ],
  figs: {
    balance: { x: [0, 10], y: [0, 4], w: 300, pad: 14, bare: true, segs: [[5, 0, 5, 2.6, 0], [1, 2.6, 9, 2.6, 0], [3.5, 0, 6.5, 0, 0], [1.2, 2.6, 1.2, 3.4, 1], [3.8, 2.6, 3.8, 3.4, 1], [1.2, 3.4, 3.8, 3.4, 1], [6.2, 2.6, 6.2, 3.4, 2], [8.8, 2.6, 8.8, 3.4, 2], [6.2, 3.4, 8.8, 3.4, 2]], texts: [[2.5, 3.0, "2x + 1"], [7.5, 3.0, "7"], [5, 1.2, "="]], alt: "A level balance with 2x + 1 on the left pan and 7 on the right" }
  },
  culture: "**Did you know?** Al-Khwarizmi's book used only words, even for numbers. A typical problem: *\"A square and ten roots are equal to thirty-nine units.\"* In today's notation that's {{x^2 + 10x = 39}}. You'll solve equations like it in Module 30.",
  teacher: {
    snags: [
      ["Task 3", "Types *x = 8* instead of *8*", "Both are accepted."],
      ["Task 4", "Gets 7 for {{-3y = 21}}", "Divide by the coefficient including its sign."],
      ["Task 5", "Taps line 2", "The error is in the move, not the arithmetic after it."]
    ],
    factcheck: "Al-Khwarizmi (c. 780–c. 850) worked at the House of Wisdom in Baghdad; *al-Kitāb al-mukhtaṣar fī ḥisāb al-jabr wa-l-muqābala* is dated c. 813–833. Translations by Robert of Chester (1145) brought *algebra* into Latin; *algorithm* derives from *Algoritmi*, the Latin form of his name. His example \"a square and ten roots equal thirty-nine\" (x² + 10x = 39) is the most famous problem in the book."
  }
};

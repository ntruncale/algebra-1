module.exports = {
  num: 23, unit: 5, slug: "m23-elimination", minutes: 40, calculator: "not needed",
  title: "Systems of Equations: Elimination",
  subtitle: "Adding equations to cancel a variable, multiplying first, and choosing a method",
  lede: "Sometimes the fastest way to solve a system is to add the two equations together so one variable disappears. This method is 2,000 years old, and computers still use it today.",
  recap: "Substitution: isolate a variable, replace it in the other equation, solve, then back-substitute. If the variables cancel: true → infinitely many, false → no solution.",
  goals: [
    "Solve a system by adding equations when a variable has opposite coefficients",
    "Multiply one or both equations first to create opposites",
    "Choose between graphing, substitution and elimination"
  ],
  context: {
    title: "Counting rods and the Nine Chapters",
    place: "China · about 200 BC to AD 100",
    text: `***The Nine Chapters on the Mathematical Art*** is one of the most important math books ever written. It was put together in China roughly **2,000 years ago** from even older material, and Chinese officials studied it for centuries.

Chapter 8, called ***Fangcheng*** ("rectangular arrays"), is about systems of equations. Its first problem asks about bundles of grain:

> "3 bundles of top-grade grain, 2 of medium and 1 of low yield **39 dou**. 2 top, 3 medium and 1 low yield **34**. 1 top, 2 medium and 3 low yield **26**. How much does one bundle of each yield?"

Chinese mathematicians laid out the numbers with **bamboo counting rods** in a grid on a counting board, then combined the columns (multiplying and subtracting them) until one unknown was left alone. That's **elimination**, the method you'll learn this week.

In Europe, the same method wasn't fully developed until the 1800s, when it was named after **Carl Friedrich Gauss** (the boy from Module 15). Today, computers use "Gaussian elimination" to solve systems with millions of equations, for weather forecasts, airplane designs and video-game physics.`,
    ask: "If x + y = 10 and x − y = 4, what happens if you add the two equations together?"
  },
  learn: [
    {
      title: "Add to eliminate",
      text: `If one variable has **opposite coefficients** in the two equations (like {{+y}} and {{-y}}), **add the equations**. That variable cancels, leaving one equation with one variable.

Why is it allowed? You're adding equal amounts to both sides of an equation, which keeps it balanced.`,
      worked: [
        { problem: "{{x + y = 10}} and {{x - y = 4}}", steps: [["{{(x + y) + (x - y) = 10 + 4}}", "Add the left sides and the right sides."], ["{{2x = 14}}, so {{x = 7}}", "The y's cancel."], ["{{7 + y = 10}}, so {{y = 3}}", "Back-substitute into either equation."], ["Solution: {{(7, 3)}}"]], eq: "x + y = 10; x - y = 4", answer: "(7, 3)" },
        { problem: "{{3x + 2y = 16}} and {{-3x + 5y = 12}}", steps: [["{{7y = 28}}", "Add: 3x and −3x cancel."], ["{{y = 4}}"], ["{{3x + 2(4) = 16}}, {{3x = 8}}, {{x = 8/3}}"], ["Solution: {{(8/3, 4)}}"]], eq: "3x + 2y = 16; -3x + 5y = 12", answer: "(8/3, 4)" }
      ]
    },
    {
      title: "Multiply first",
      text: `If no coefficients are opposites, **multiply** one equation (or both) by a number that makes them opposites. Multiply **every term**, on both sides.`,
      worked: [
        { problem: "{{2x + y = 7}} and {{3x - 2y = 0}}", steps: [["{{4x + 2y = 14}}", "Multiply the first equation by 2, so +2y will cancel −2y."], ["{{7x = 14}}, so {{x = 2}}", "Add it to the second equation."], ["{{2(2) + y = 7}}, so {{y = 3}}"], ["Solution: {{(2, 3)}}"]], eq: "2x + y = 7; 3x - 2y = 0", answer: "(2, 3)" },
        { problem: "{{2x + 3y = 12}} and {{5x - 2y = 11}}", steps: [["{{4x + 6y = 24}} and {{15x - 6y = 33}}", "Multiply the first by 2 and the second by 3: +6y and −6y."], ["{{19x = 57}}, so {{x = 3}}", "Add."], ["{{2(3) + 3y = 12}}, so {{y = 2}}"], ["Solution: {{(3, 2)}}"]], eq: "2x + 3y = 12; 5x - 2y = 11", answer: "(3, 2)" }
      ],
      check: { q: "For {{x + 3y = 5}} and {{2x + 5y = 8}}, what could you multiply the **first** equation by to eliminate x?", choices: [["{{-2}}", true, "−2x + 2x = 0."], ["{{2}}", false, "Then you'd have 2x and 2x: subtract, or use −2 to add."], ["{{5}}", false, "That works on y with another multiplier, not x."]] }
    },
    {
      title: "Which method?",
      text: `All three methods give the same answer. Pick the one that's least work:`,
      table: {
        head: ["If the system looks like…", "Try…"],
        rows: [["one variable is already alone: {{y = 3x - 1}}", "**substitution**"], ["a variable has coefficient 1 or −1", "**substitution** or elimination"], ["both equations in standard form, Ax + By = C", "**elimination**"], ["you want to see the solution, or estimate", "**graphing**"]]
      }
    }
  ],
  tasks: [
    {
      id: "t1", type: "select", title: "Plan the elimination",
      items: [
        "For {{x + y = 8}} and {{x - y = 2}}: {add the equations|multiply the first by 2|subtract 8 from both}.",
        "For {{2x + 3y = 7}} and {{4x - 3y = 5}}: {add the equations; y cancels|add the equations; x cancels|multiply the second by 2}.",
        "For {{x + 2y = 5}} and {{3x + y = 5}}: multiply the first equation by {−3|3|2} to eliminate x.",
        "For {{4x + 3y = 10}} and {{2x + 5y = 12}}: multiply the second equation by {−2|2|4} to eliminate x.",
        "For {{y = 2x + 1}} and {{3x + y = 11}}: {substitution is quickest|elimination is quickest|graphing is the only way}."
      ],
      hints: ["You want the same number with opposite signs in front of one variable."]
    },
    {
      id: "t2", type: "solve", title: "Opposites: just add", pick: 4,
      intro: "Type the solution as an ordered pair, like **(7, 3)**.",
      items: [
        { q: "{{x + y = 12}} and {{x - y = 2}}", a: "(7, 5)", eq: "x + y = 12; x - y = 2", how: ["Add: {{2x = 14}}, {{x = 7}}", "{{y = 5}}"] },
        { q: "{{2x + y = 9}} and {{3x - y = 11}}", a: "(4, 1)", eq: "2x + y = 9; 3x - y = 11", how: ["Add: {{5x = 20}}, {{x = 4}}", "{{8 + y = 9}}, {{y = 1}}"] },
        { q: "{{-x + 4y = 5}} and {{x + 2y = 7}}", a: "(3, 2)", eq: "-x + 4y = 5; x + 2y = 7", how: ["Add: {{6y = 12}}, {{y = 2}}", "{{x + 4 = 7}}, {{x = 3}}"] },
        { q: "{{5x - 3y = 1}} and {{-5x + 7y = 11}}", a: "(2, 3)", eq: "5x - 3y = 1; -5x + 7y = 11", how: ["Add: {{4y = 12}}, {{y = 3}}", "{{5x - 9 = 1}}, {{x = 2}}"] },
        { q: "{{3x + 2y = 4}} and {{x - 2y = -8}}", a: "(-1, 7/2)", eq: "3x + 2y = 4; x - 2y = -8", how: ["Add: {{4x = -4}}, {{x = -1}}", "{{-3 + 2y = 4}}, {{y = 7/2}}"] }
      ],
      hints: ["Add the two equations. One variable should disappear.", "Then substitute your answer into either original equation."]
    },
    {
      id: "t3", type: "solve", title: "Multiply one equation", pick: 4,
      items: [
        { q: "{{x + 2y = 7}} and {{3x - y = 7}}", a: "(3, 2)", eq: "x + 2y = 7; 3x - y = 7", how: ["Multiply the second by 2: {{6x - 2y = 14}}", "Add: {{7x = 21}}, {{x = 3}}, {{y = 2}}"] },
        { q: "{{2x + 3y = 13}} and {{x + y = 5}}", a: "(2, 3)", eq: "2x + 3y = 13; x + y = 5", how: ["Multiply the second by −2: {{-2x - 2y = -10}}", "Add: {{y = 3}}, {{x = 2}}"] },
        { q: "{{4x - y = 6}} and {{2x + 3y = 10}}", a: "(2, 2)", eq: "4x - y = 6; 2x + 3y = 10", how: ["Multiply the first by 3: {{12x - 3y = 18}}", "Add: {{14x = 28}}, {{x = 2}}, {{y = 2}}"] },
        { q: "{{x - 3y = -5}} and {{2x + y = 4}}", a: "(1, 2)", eq: "x - 3y = -5; 2x + y = 4", how: ["Multiply the second by 3: {{6x + 3y = 12}}", "Add: {{7x = 7}}, {{x = 1}}, {{y = 2}}"] },
        { q: "{{5x + 2y = 1}} and {{x + y = -1}}", a: "(1, -2)", eq: "5x + 2y = 1; x + y = -1", how: ["Multiply the second by −2: {{-2x - 2y = 2}}", "Add: {{3x = 3}}, {{x = 1}}, {{y = -2}}"] }
      ],
      hints: ["Multiply every term of one equation so a variable has opposite coefficients.", "Then add."]
    },
    {
      id: "t4", type: "solve", title: "Multiply both", pick: 3,
      items: [
        { q: "{{2x + 3y = 12}} and {{5x - 2y = 11}}", a: "(3, 2)", eq: "2x + 3y = 12; 5x - 2y = 11", how: ["×2 and ×3: {{4x + 6y = 24}}, {{15x - 6y = 33}}", "Add: {{19x = 57}}, {{x = 3}}, {{y = 2}}"] },
        { q: "{{3x + 4y = 10}} and {{2x - 3y = 1}}", a: "(2, 1)", eq: "3x + 4y = 10; 2x - 3y = 1", how: ["×3 and ×4: {{9x + 12y = 30}}, {{8x - 12y = 4}}", "Add: {{17x = 34}}, {{x = 2}}, {{y = 1}}"] },
        { q: "{{4x + 5y = 3}} and {{3x + 2y = -3}}", a: "(-3, 3)", eq: "4x + 5y = 3; 3x + 2y = -3", how: ["×3 and ×(−4): {{12x + 15y = 9}}, {{-12x - 8y = 12}}", "Add: {{7y = 21}}, {{y = 3}}, {{x = -3}}"] },
        { q: "{{2x - 5y = -1}} and {{3x + 4y = 10}}", a: "(2, 1)", eq: "2x - 5y = -1; 3x + 4y = 10", how: ["×3 and ×(−2): {{6x - 15y = -3}}, {{-6x - 8y = -20}}", "Add: {{-23y = -23}}, {{y = 1}}, {{x = 2}}"] }
      ],
      hints: ["Find a common multiple of the two coefficients of x (or y).", "Make one positive and one negative, then add."]
    },
    {
      id: "t5", type: "mistake", title: "Elimination errors",
      intro: "Tap the **first wrong line**, then type the correct solution.",
      items: [
        { q: "{{x + 2y = 8}} and {{3x - y = 3}}", lines: ["Multiply the second by 2: {{6x - 2y = 3}}", "Add: {{7x = 11}}"], bad: 0, why: "Multiply **every** term, including the right side: {{6x - 2y = 6}}. Then {{7x = 14}}, {{x = 2}}, {{y = 3}}.", a: "(2, 3)", eq: "x + 2y = 8; 3x - y = 3" },
        { q: "{{3x + y = 9}} and {{x + y = 5}}", lines: ["Add: {{4x + 2y = 14}}", "So {{x = 14/4}}"], bad: 1, why: "Adding didn't eliminate anything! Multiply the second by −1 first: {{2x = 4}}, {{x = 2}}, {{y = 3}}.", a: "(2, 3)", eq: "3x + y = 9; x + y = 5" },
        { q: "{{2x + 3y = 7}} and {{2x - y = 3}}", lines: ["Multiply the second by −1: {{-2x + y = 3}}", "Add: {{4y = 10}}"], bad: 0, why: "Multiplying by −1 changes every sign: {{-2x + y = -3}}. Then {{4y = 4}}, {{y = 1}}, {{x = 2}}.", a: "(2, 1)", eq: "2x + 3y = 7; 2x - y = 3" }
      ]
    },
    {
      id: "t6", type: "solve", title: "Word problems",
      intro: "Write a system, then solve it. Type the value the question asks for.",
      items: [
        { q: "**3 tacos and 2 drinks** cost **$13**. **2 tacos and 2 drinks** cost **$10**. How much is **one taco**?", a: "3", pre: "$", how: ["{{3t + 2d = 13}} and {{2t + 2d = 10}}", "Subtract (or multiply the second by −1 and add): **t = 3**"] },
        { q: "Same problem: how much is **one drink**?", a: "2", pre: "$", how: ["{{2(3) + 2d = 10}}, **d = 2**"] },
        { q: "The sum of two numbers is **31** and their difference is **9**. What's the **larger** number?", a: "20", how: ["{{x + y = 31}}, {{x - y = 9}}", "Add: {{2x = 40}}, **x = 20**"] },
        { q: "A boat goes **24 miles downstream in 2 hours** and **24 miles upstream in 3 hours**. What's the boat's speed in still water? ({{b + c = 12}}, {{b - c = 8}})", a: "10", post: "mph", how: ["Add: {{2b = 20}}, **b = 10** mph (the current is 2 mph)"] }
      ]
    }
  ],
  build: {
    heading: "Solve it three ways",
    prompt: `Solve the system {{x + y = 6}} and {{2x - y = 3}} **two different ways**: by **substitution** and by **elimination**. Show the steps of each. Then say which method you'd choose for this system, and why.`,
    model: `Substitution: x = 6 - y, so 2(6 - y) - y = 3, 12 - 3y = 3, y = 3, and x = 3.
Elimination: adding the equations gives 3x = 9, so x = 3, and 3 + y = 6 gives y = 3.
Both give (3, 3). I'd choose elimination here because adding the equations cancels y right away.`,
    placeholder: "Substitution: …\nElimination: …",
    reqs: [
      { t: "Use the words *substitution* and *elimination*", re: "\\b(substitution|elimination)\\b", min: 2 },
      { t: "Get the solution (3, 3)", re: "\\(\\s*3\\s*,\\s*3\\s*\\)" },
      { t: "Show steps (at least 4 equal signs)", re: "=", min: 4 },
      { t: "Explain your choice (use *because*)", re: "\\bbecause\\b" }
    ]
  },
  reflect: {
    q: "The Nine Chapters' elimination method was used in China 1,800 years before it got a European name. Why do you think some ideas get credited to the wrong people or places? Why does it matter to get the history right?",
    placeholder: "I think ideas get credited to the wrong people because…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "The Nine Chapters grain problem",
      intro: `Solve the original problem, with {{x}}, {{y}} and {{z}} for one bundle of top, medium and low grain:

> {{3x + 2y + z = 39}}
> {{2x + 3y + z = 34}}
> {{x + 2y + 3z = 26}}

Hint: subtract the second equation from the first to get an equation without z. Then eliminate z another way.`,
      items: [
        { q: "What is {{x}}, one bundle of top grain?", a: "37/4|9.25", post: "dou", how: ["(1) − (2): {{x - y = 5}}", "3·(1) − (3): {{8x + 4y = 91}}", "With {{x = y + 5}}: {{12y + 40 = 91}}, {{y = 17/4}}, so {{x = 37/4 = 9.25}}"] },
        { q: "What is {{y}}, one bundle of medium grain?", a: "17/4|4.25", post: "dou", how: ["{{y = 17/4 = 4.25}}"] },
        { q: "What is {{z}}, one bundle of low grain?", a: "11/4|2.75", post: "dou", how: ["{{z = 39 - 3x - 2y = 39 - 27.75 - 8.5 = 2.75}}"] }
      ]
    },
    {
      id: "x2", type: "solve", title: "Tricky systems",
      items: [
        { q: "{{0.2x + 0.5y = 1.8}} and {{0.3x - 0.1y = 1}} (Hint: multiply both by 10 first.)", a: "(4, 2)", eq: "0.2x + 0.5y = 1.8; 0.3x - 0.1y = 1", how: ["{{2x + 5y = 18}} and {{3x - y = 10}}", "×5 the second and add: {{17x = 68}}, {{x = 4}}, {{y = 2}}"] },
        { q: "{{2x - 3y = 5}} and {{-4x + 6y = 1}}", a: "no solution", how: ["Multiply the first by 2 and add: {{0 = 11}}. False: **no solution**."] },
        { q: "{{x/2 + y/3 = 5}} and {{x/4 - y/6 = 1/2}} (Hint: clear the fractions first.)", a: "(6, 6)", eq: "x/2 + y/3 = 5; x/4 - y/6 = 1/2", how: ["Multiply the first by 6 and the second by 12: {{3x + 2y = 30}}, {{3x - 2y = 6}}", "Add: {{6x = 36}}, {{x = 6}}, {{y = 6}}"] }
      ]
    }
  ],
  culture: "**Did you know?** *The Nine Chapters* also includes one of the earliest uses of negative numbers, which counting-rod mathematicians needed when subtracting columns. They used red rods for positive and black rods for negative numbers.",
  teacher: {
    snags: [
      ["Task 3", "Multiplies only the left side", "Task 5, item 1 targets this: every term, both sides."],
      ["Task 2, item 5", "Types *(−1, 3.5)*", "Accepted: 7/2 = 3.5."],
      ["Challenge x1", "Gets stuck with three variables", "Suggest eliminating z twice to get two equations in x and y."]
    ],
    factcheck: "*Jiuzhang Suanshu* (*The Nine Chapters*) was compiled roughly between the 2nd century BC and 1st century AD; Liu Hui's commentary dates from AD 263. Chapter 8, *Fangcheng*, Problem 1 is the three-grade grain problem with answer 9¼, 4¼, 2¾ dou. The array method is equivalent to Gaussian elimination. Red and black rods for positive and negative quantities are described in the *Fangcheng* chapter's rules."
  }
};

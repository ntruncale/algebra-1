module.exports = {
  num: 14, unit: 3, slug: "m14-functions", minutes: 35, calculator: "not needed",
  title: "Functions",
  subtitle: "Inputs and outputs, function notation, domain and range, and the vertical line test",
  lede: "A function is a rule that gives exactly one output for each input, like a vending machine: press B4, get the same snack every time. Functions are the main idea of the rest of this course.",
  recap: "Every point is an ordered pair (x, y): x first (right or left), then y (up or down). Plotting points from a table of values gives the graph of an equation.",
  goals: [
    "Decide whether a relation is a function, from a table, a list of pairs or a graph",
    "Use function notation: find f(3), and find x when f(x) is given",
    "Identify the domain and range"
  ],
  context: {
    title: "The mathematician who kept working in the dark",
    place: "St. Petersburg, Russia · 1734 to 1783",
    text: `**Leonhard Euler** (say "OY-ler") may have been the most productive mathematician who ever lived. His collected works fill more than **80 volumes**. He's the reason we write **π** for pi, **e** for the number 2.718…, **i** for √−1, and Σ for "sum."

In **1734**, he also started writing **f(x)** to mean "a function of x": a rule that turns an input x into an output. It's the notation you'll learn this week.

The most remarkable part of Euler's story: he lost the sight in his right eye in his thirties, and by **1771** he was almost completely **blind**. He didn't slow down. With an amazing memory, he did enormous calculations in his head and dictated his work to assistants, including his sons. About **half** of everything he published was written after he lost his sight.

When a friend worried about his eyes, Euler reportedly said: "Now I will have fewer distractions."`,
    ask: "A vending machine, a calculator, a light switch: in what way is each one like a rule with inputs and outputs?"
  },
  learn: [
    {
      title: "What makes a function",
      text: `A **relation** is any set of input-output pairs. A **function** is a relation where **each input has exactly one output**.

- {{(1, 5), (2, 7), (3, 9)}}: a function. Each x appears once.
- {{(1, 5), (2, 5), (3, 5)}}: still a function! Different inputs can share an output.
- {{(1, 5), (1, 7), (3, 9)}}: **not** a function. The input 1 has two outputs.

**Vertical line test:** a graph is a function if **no vertical line** crosses it more than once. If some vertical line hits two points, that x has two outputs.`,
      figs: ["parab", "circle"],
      after: `The parabola (left) passes the test: it's a function. The circle (right) fails: the dashed line at x = 1 hits it twice.`,
      check: { q: "Is {{(4, 1), (-2, 1), (0, 3), (4, 6)}} a function?", choices: [["No: 4 has two outputs", true, "The input 4 goes to both 1 and 6."], ["Yes: every output is different", false, "Look at the inputs: 4 appears twice with different outputs."], ["No: 1 appears twice as an output", false, "Repeated outputs are fine. Repeated inputs with different outputs are the problem."]] }
    },
    {
      title: "Function notation",
      text: `**{{f(x)}}** is read "f of x." It means **the output of function f when the input is x**. (It does **not** mean f times x.)

If {{f(x) = 2x + 3}}, then {{f(4)}} means "put 4 in for x": {{f(4) = 2(4) + 3 = 11}}. The point {{(4, 11)}} is on the graph.

Going backwards: if {{f(x) = 9}}, what's x? Solve {{2x + 3 = 9}}: {{x = 3}}.`,
      worked: [
        { problem: "{{g(x) = x^2 - 5}}. Find {{g(-3)}}.", steps: [["{{g(-3) = (-3)^2 - 5}}", "Substitute −3, in parentheses."], ["{{= 9 - 5 = 4}}"]] },
        { problem: "{{f(x) = 4x - 1}}. For what x is {{f(x) = 19}}?", steps: [["{{4x - 1 = 19}}", "Set the rule equal to 19."], ["{{4x = 20}}, so {{x = 5}}"]], eq: "4x - 1 = 19", answer: "5" }
      ]
    },
    {
      title: "Domain and range",
      text: `The **domain** is the set of all **inputs** (x values). The **range** is the set of all **outputs** (y values).

For {{(1, 5), (2, 7), (3, 9)}}: domain {1, 2, 3}, range {5, 7, 9}.

In real situations, the domain often makes sense only for some numbers. If {{C(t) = 3t}} is the cost of {{t}} concert tickets, the domain is whole numbers {0, 1, 2, 3, …}, since you can't buy −2 or 1.5 tickets.`
    }
  ],
  tasks: [
    {
      id: "t1", type: "sort", title: "Function or not?",
      cats: ["Function", "Not a function"],
      items: [
        ["{{(1, 2), (2, 4), (3, 6)}}", 0], ["{{(0, 1), (0, -1), (2, 3)}}", 1, "0 has two outputs."], ["{{(5, 8), (6, 8), (7, 8)}}", 0, "Same output is fine."],
        ["{{(-1, 3), (2, 0), (-1, 4)}}", 1, "−1 has two outputs."], ["Each student → their birthday", 0, "Each person has exactly one birthday."], ["Each birthday → the students born that day", 1, "One date can match several students."],
        ["{{y = 3x + 1}}", 0, "Each x gives exactly one y."], ["A vertical line, {{x = 2}}", 1, "x = 2 has infinitely many y values."]
      ],
      hints: ["Look for an input (first number) that appears twice with different outputs.", "Repeated outputs are fine."]
    },
    {
      id: "t2", type: "quiz", title: "Vertical line test",
      questions: [
        { q: "Is this graph a function?", fig: "vl1", choices: [["Yes", true, "Every vertical line crosses it once."], ["No", false]], keepOrder: true },
        { q: "Is this graph a function?", fig: "vl2", choices: [["No", true, "A vertical line at x = 4 crosses it twice."], ["Yes", false]], keepOrder: true },
        { q: "Is this graph a function?", fig: "vl3", choices: [["Yes", true, "Even though it goes down then up, each x has one y."], ["No", false]], keepOrder: true }
      ]
    },
    {
      id: "t3", type: "solve", title: "Evaluate the function", pick: 6,
      intro: "{{f(x) = 3x - 4}},  {{g(x) = x^2 + 1}},  {{h(x) = -2x + 5}}",
      items: [
        { q: "{{f(2)}}", a: "2", from: "3*2 - 4", how: ["{{3(2) - 4 = 6 - 4}}", "**2**"] },
        { q: "{{f(-1)}}", a: "-7", from: "3*(-1) - 4", how: ["{{3(-1) - 4 = -3 - 4}}", "**−7**"] },
        { q: "{{g(3)}}", a: "10", from: "3^2 + 1", how: ["{{3^2 + 1 = 9 + 1}}", "**10**"] },
        { q: "{{g(-4)}}", a: "17", from: "(-4)^2 + 1", how: ["{{(-4)^2 + 1 = 16 + 1}}", "**17**"] },
        { q: "{{h(0)}}", a: "5", from: "-2*0 + 5", how: ["{{-2(0) + 5}}", "**5**"] },
        { q: "{{h(6)}}", a: "-7", from: "-2*6 + 5", how: ["{{-12 + 5}}", "**−7**"] },
        { q: "{{f(0) + g(0)}}", a: "-3", from: "(3*0 - 4) + (0^2 + 1)", how: ["{{f(0) = -4}} and {{g(0) = 1}}", "**−3**"] },
        { q: "{{f(1/3)}}", a: "-3", from: "3*(1/3) - 4", how: ["{{3(1/3) - 4 = 1 - 4}}", "**−3**"] }
      ],
      hints: ["Replace every x in the rule with the number in parentheses.", "Use parentheses when you substitute a negative."]
    },
    {
      id: "t4", type: "solve", title: "Work backwards", pick: 4,
      intro: "Find the input. Set the rule equal to the output and solve.",
      items: [
        { q: "{{f(x) = 3x - 4}}. For what {{x}} is {{f(x) = 11}}?", a: "5", pre: "x =", eq: "3x - 4 = 11", how: ["{{3x - 4 = 11}}", "{{3x = 15}}, **x = 5**"] },
        { q: "{{h(x) = -2x + 5}}. For what {{x}} is {{h(x) = 13}}?", a: "-4", pre: "x =", eq: "-2x + 5 = 13", how: ["{{-2x + 5 = 13}}", "{{-2x = 8}}, **x = −4**"] },
        { q: "{{p(x) = x/2 + 7}}. For what {{x}} is {{p(x) = 1}}?", a: "-12", pre: "x =", eq: "x/2 + 7 = 1", how: ["{{x/2 = -6}}", "**x = −12**"] },
        { q: "{{g(x) = x^2 + 1}}. For what {{x}} values is {{g(x) = 26}}? (Two answers!)", a: "5 or -5", eq: "x^2 + 1 = 26", how: ["{{x^2 = 25}}", "**5 or −5**"] },
        { q: "{{C(n) = 15 + 4n}} is the cost of a party for {{n}} guests. How many guests make the cost **$75**?", a: "15", post: "guests", eq: "15 + 4n = 75", how: ["{{15 + 4n = 75}}", "{{4n = 60}}, **15 guests**"] }
      ],
      hints: ["f(x) = 11 means the output is 11. Write rule = 11 and solve for x."]
    },
    {
      id: "t5", type: "select", title: "Domain and range",
      intro: "Use the relation {{(-2, 4), (0, 1), (3, 4), (5, -1)}}.",
      items: [
        "The domain is {−2, 0, 3, 5|4, 1, 4, −1|−1, 1, 4}.",
        "The range is {−1, 1, 4|−2, 0, 3, 5|−2, −1, 0, 1}.",
        "Is it a function? {Yes, each input has one output|No, 4 appears twice}.",
        "For {{T(h) = 15h}}, the money earned for {{h}} hours of babysitting, a sensible domain is {numbers 0 or greater|all numbers, including negatives|only negative numbers}."
      ],
      hints: ["Domain = all the x values (first numbers). Range = all the y values.", "In a list, write each value once."]
    },
    {
      id: "t6", type: "read", title: "A function in real life",
      fig: "taxi",
      intro: "The graph shows the cost {{C(m)}} of a taxi ride of {{m}} miles: {{C(m) = 3 + 2m}}.",
      questions: [
        { q: "What does {{C(4) = 11}} mean?", choices: [["A 4-mile ride costs $11.", true], ["An 11-mile ride costs $4.", false, "The input (in the parentheses) is the miles."], ["It costs $4 per mile.", false]] },
        { q: "What is {{C(0)}}, and what does it mean?", choices: [["$3: the cost just to get in the taxi", true, "Even a 0-mile ride costs the $3 starting fee."], ["$0: no ride, no cost", false], ["$2: the cost per mile", false]] },
        { q: "How far can you ride for **$15**?", choices: [["6 miles", true, "3 + 2m = 15, so m = 6."], ["7.5 miles", false], ["9 miles", false]], keepOrder: true }
      ]
    }
  ],
  build: {
    heading: "A function machine",
    prompt: `Invent a function from real life, like the cost of {{n}} songs, the points from {{t}} three-pointers, or the distance you bike in {{h}} hours. Write it in **function notation** (like {{P(t) = 3t}}), say what the **input** and **output** mean, find the output for **two inputs**, and describe a sensible **domain**.`,
    model: `P(t) = 3t gives the points a basketball player scores from t three-pointers. The input t is the number of three-pointers and the output P(t) is the points. P(4) = 3(4) = 12, so 4 three-pointers give 12 points. P(7) = 21. The domain is whole numbers 0, 1, 2, 3 and so on, because you can't make half a shot.`,
    placeholder: "___(___) = … gives …",
    reqs: [
      { t: "Function notation, like P(t) = 3t", re: "\\b[a-z]\\s*\\(\\s*[a-z]\\s*\\)\\s*=" },
      { t: "Evaluate it twice, like P(4) = 12", re: "\\b[a-z]\\s*\\(\\s*[-−]?\\d+\\s*\\)\\s*=", min: 2 },
      { t: "Name the *input* and *output*", re: "\\b(input|output)", min: 2 },
      { t: "Describe the *domain*", re: "\\bdomain\\b" }
    ]
  },
  reflect: {
    q: "Euler did half his life's work after losing his sight. What do you think kept him going? Think of a challenge you're facing in school this year. What could help you keep going like Euler did?",
    placeholder: "I think Euler kept going because…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "Function puzzles",
      intro: "{{f(x) = 2x + 1}} and {{g(x) = x^2}}",
      items: [
        { q: "{{f(g(3))}} (find {{g(3)}} first, then put that answer into f)", a: "19", from: "2*9 + 1", how: ["{{g(3) = 9}}", "{{f(9) = 2(9) + 1 = 19}}"] },
        { q: "{{g(f(3))}}", a: "49", from: "(2*3 + 1)^2", how: ["{{f(3) = 7}}", "{{g(7) = 49}}"] },
        { q: "Write {{f(a + 1)}} as a simplified expression in {{a}}.", a: "2a + 3", from: "2(a + 1) + 1", how: ["{{2(a + 1) + 1 = 2a + 2 + 1}}", "**2a + 3**"] },
        { q: "For what {{x}} is {{f(x) = 7}}?", a: "3", pre: "x =", eq: "2x + 1 = 7", how: ["{{2x + 1 = 7}}, **x = 3**"] }
      ]
    },
    {
      id: "x2", type: "quiz", title: "Domain detective",
      questions: [
        { q: "What number is **not** in the domain of {{f(x) = 1/(x - 4)}}?", choices: [["{{4}}", true, "x = 4 makes the bottom 0, and you can't divide by 0."], ["{{0}}", false, "f(0) = 1/(−4) = −1/4. That works."], ["{{-4}}", false]] },
        { q: "What's the range of {{g(x) = x^2}} (all real inputs)?", choices: [["all numbers 0 or greater", true, "A square is never negative."], ["all real numbers", false, "Can x² ever be −1?"], ["only positive numbers, not 0", false, "g(0) = 0."]] },
        { q: "What's the domain of {{h(x) = sqrt(x)}} for real numbers?", choices: [["{{x >= 0}}", true, "You can't take the square root of a negative (yet!)."], ["all real numbers", false], ["{{x > 0}}", false, "√0 = 0 works."]] }
      ]
    }
  ],
  figs: {
    parab: { x: [-3, 3], y: [-1, 5], w: 200, lines: [{ fn: "x^2" }, { xeq: 1, c: 3, dash: true }], alt: "A parabola crossed once by a dashed vertical line" },
    circle: { x: [-3, 3], y: [-3, 3], w: 200, lines: [{ fn: "sqrt(4 - x^2)" }, { fn: "-sqrt(4 - x^2)" }, { xeq: 1, c: 3, dash: true }], alt: "A circle crossed twice by a dashed vertical line" },
    vl1: { x: [-5, 5], y: [-5, 5], w: 220, lines: [{ fn: "x/2 + 1" }], alt: "A straight slanted line" },
    vl2: { x: [-1, 9], y: [-5, 5], w: 220, lines: [{ fn: "sqrt(x)*1.5" }, { fn: "-sqrt(x)*1.5" }], alt: "A sideways parabola opening to the right" },
    vl3: { x: [-5, 5], y: [-2, 8], w: 220, lines: [{ fn: "abs(x - 1) + 1" }], alt: "A V-shaped graph" },
    taxi: { x: [0, 8], y: [0, 20], ystep: 2, w: 300, xlabel: "miles", ylabel: "dollars", lines: [{ fn: "3 + 2x", dom: [0, 8] }], points: [[0, 3], [4, 11], [6, 15]], alt: "Line starting at (0, 3) through (4, 11) and (6, 15)" }
  },
  culture: "**Did you know?** Euler's equation {{e^(i pi) + 1 = 0}} connects five of the most important numbers in math (0, 1, π, e and i) in one line. Many mathematicians call it the most beautiful equation ever written.",
  teacher: {
    snags: [
      ["Task 1", "Says repeated outputs make it *not* a function", "Only repeated inputs with different outputs break the rule."],
      ["Task 3", "Reads f(2) as f × 2", "Function notation is not multiplication."],
      ["Task 5", "Lists 4 twice in the range", "Sets list each value once."]
    ],
    factcheck: "Euler (1707–1783) introduced f(x)-style notation in 1734 (*Commentarii Academiae Petropolitanae*, published 1740). He lost sight in his right eye around 1738 and became nearly totally blind after 1771; roughly half his output came after 1765. The *Opera Omnia* runs to more than 80 volumes. The \"fewer distractions\" remark is widely reported but not well sourced; the module says \"reportedly.\" He popularized π (1736–1748), e, i and Σ."
  }
};

module.exports = {
  num: 21, unit: 5, slug: "m21-systems-graphing", minutes: 35, calculator: "not needed",
  title: "Systems of Equations: Graphing",
  subtitle: "What a system is, solving by graphing, and when there's no solution or infinitely many",
  lede: "Two equations, two unknowns, one answer: the point where the lines cross. This week you'll find it by graphing, and see why two lines might never meet.",
  recap: "Scatter plots show correlation; a line of best fit lets you predict. Correlation doesn't prove causation.",
  goals: [
    "Check whether an ordered pair is a solution of a system",
    "Solve a system by graphing and reading the intersection",
    "Recognize systems with no solution or infinitely many solutions"
  ],
  context: {
    title: "How your phone knows where you are",
    place: "20,000 km above Earth · since 1995",
    text: `Right now, about **30 GPS satellites** are circling the Earth, each about **20,000 km** up. The U.S. Air Force finished the system in **1995**, and it's free for anyone to use.

Each satellite constantly broadcasts the **exact time** from an atomic clock on board. Your phone listens. Because the signal travels at the speed of light, the tiny delay tells your phone how far away that satellite is.

One satellite only tells you you're somewhere on a huge sphere. Two narrow it down. Your phone combines signals from **at least four** satellites (the fourth one fixes errors in your phone's own clock) and finds the **one point** that fits all of them at once. That point is you.

Mathematically, your phone is solving a **system of equations**: several equations that must all be true at the same time. In this unit you'll solve systems with two equations and two unknowns. The idea is the same: find the point that works for **every** equation.`,
    ask: "If two friends each tell you one clue about a secret number, why might you need both clues to find it?"
  },
  learn: [
    {
      title: "What's a solution of a system?",
      text: `A **system of equations** is two or more equations with the same variables. A **solution** is an ordered pair that makes **every** equation true.

Is {{(2, 3)}} a solution of {{y = x + 1}} and {{y = -2x + 7}}?
- First: {{3 = 2 + 1}} ✓
- Second: {{3 = -2(2) + 7 = 3}} ✓

Both are true, so yes. A point that works in only one equation is **not** a solution.`,
      check: { q: "Is {{(1, 4)}} a solution of {{y = 3x + 1}} and {{y = x + 2}}?", choices: [["No: it only works in the first equation", true, "1 + 2 = 3, not 4."], ["Yes: it works in the first equation", false, "It has to work in both."], ["Yes: it works in both", false, "Check the second: 1 + 2 = 3."]] }
    },
    {
      title: "Solving by graphing",
      text: `Each equation's graph shows all of **its** solutions. So the point that's on **both** lines, where they **intersect**, is the solution of the system.

1. Graph both lines (y = mx + b makes this quick).
2. Find the point where they cross.
3. **Check** it in both equations.`,
      fig: "inter",
      worked: [
        { problem: "Solve {{y = x + 1}} and {{y = -2x + 7}} by graphing.", steps: [["Graph {{y = x + 1}}: start at (0, 1), slope 1."], ["Graph {{y = -2x + 7}}: start at (0, 7), slope −2."], ["They cross at {{(2, 3)}}.", "Check: 2 + 1 = 3 ✓ and −2(2) + 7 = 3 ✓"]] }
      ]
    },
    {
      title: "One, none or infinitely many",
      text: `Two lines can meet in three ways:`,
      table: {
        head: ["Lines", "Slopes", "Solutions"],
        rows: [["cross once", "different", "**one** solution"], ["parallel (never meet)", "same slope, different intercepts", "**no** solution"], ["the same line", "same slope, same intercept", "**infinitely many** solutions"]]
      },
      figs: ["one", "none", "many"],
      after: "You can tell which case you have **without graphing**: write both equations in y = mx + b form and compare the slopes and intercepts."
    }
  ],
  tasks: [
    {
      id: "t1", type: "sort", title: "Is (2, −1) a solution?",
      intro: "Check {{(2, -1)}} in **both** equations of each system.",
      cats: ["Solution", "Not a solution"],
      items: [
        ["{{y = x - 3}} and {{y = -x + 1}}", 0, "−1 = 2 − 3 ✓ and −1 = −2 + 1 ✓"], ["{{y = 2x - 5}} and {{x + y = 1}}", 0], ["{{y = x - 3}} and {{y = x + 1}}", 1, "−1 ≠ 3 in the second."],
        ["{{x + y = 1}} and {{x - y = 3}}", 0], ["{{y = -1}} and {{x = 3}}", 1, "x is 2, not 3."], ["{{2x + y = 4}} and {{y = 3x}}", 1, "3(2) = 6, not −1."]
      ],
      hints: ["Substitute x = 2 and y = −1 into each equation. It must work in both."]
    },
    {
      id: "t2", type: "quiz", title: "Read the intersection",
      questions: [
        { q: "What's the solution of this system?", fig: "r1", choices: [["{{(1, 3)}}", true], ["{{(3, 1)}}", false, "x first: the point is 1 right, 3 up."], ["{{(0, 2)}}", false, "That's just where one line crosses the y-axis."]] },
        { q: "What's the solution of this system?", fig: "r2", choices: [["{{(-2, -1)}}", true], ["{{(-1, -2)}}", false], ["{{(2, 1)}}", false]] },
        { q: "What's the solution of this system?", fig: "r3", choices: [["no solution", true, "The lines are parallel: they never meet."], ["{{(0, 0)}}", false], ["infinitely many", false]] }
      ]
    },
    {
      id: "t3", type: "plot", title: "Graph the system",
      intro: "Graph each line. Then you'll find where they cross.",
      items: [
        { q: "Graph {{y = 2x - 1}}.", fn: "2x - 1", need: 2 },
        { q: "{{y = 2x - 1}} is shown. Now graph {{y = -x + 5}} on the same grid.", fn: "-x + 5", need: 2, show: { lines: [{ fn: "2x - 1", c: 0 }] } }
      ],
      hints: ["Plot (0, b), then use the slope."]
    },
    {
      id: "t4", type: "solve", title: "Find the intersection",
      intro: "Use a graph (on paper, or the one you just made). Type the solution as an ordered pair, like **(2, 3)**, or type **no solution** or **infinitely many**.",
      items: [
        { q: "{{y = 2x - 1}} and {{y = -x + 5}}", a: "(2, 3)", eq: "y = 2x - 1; y = -x + 5", how: ["They cross at (2, 3).", "Check: 2(2) − 1 = 3 ✓ and −2 + 5 = 3 ✓"] },
        { q: "{{y = x + 4}} and {{y = -x}}", a: "(-2, 2)", eq: "y = x + 4; y = -x", how: ["Cross at (−2, 2). Check: −2 + 4 = 2 ✓ and −(−2) = 2 ✓"] },
        { q: "{{y = 3x}} and {{y = x + 2}}", a: "(1, 3)", eq: "y = 3x; y = x + 2", how: ["Cross at (1, 3)."] },
        { q: "{{y = -2x + 3}} and {{y = -2x - 1}}", a: "no solution", how: ["Same slope, different intercepts: parallel lines, **no solution**."] },
        { q: "{{y = 1/2 x + 1}} and {{x - 2y = -2}}", a: "infinitely many", how: ["Solve the second for y: {{y = 1/2 x + 1}}. It's the same line: **infinitely many** solutions."] }
      ],
      hints: ["Graph both lines and find where they cross. Then check in both equations.", "Same slope? Compare intercepts."]
    },
    {
      id: "t5", type: "sort", title: "How many solutions?",
      intro: "Compare slopes and y-intercepts. No graphing needed.",
      cats: ["One", "None", "Infinitely many"],
      items: [
        ["{{y = 3x + 2}} and {{y = -x + 2}}", 0, "Different slopes always cross once (here at (0, 2))."], ["{{y = 3x + 2}} and {{y = 3x - 5}}", 1], ["{{y = 3x + 2}} and {{2y = 6x + 4}}", 2, "Divide the second by 2: the same line."],
        ["{{y = 1/2 x}} and {{y = 2x}}", 0], ["{{y = -4}} and {{y = 1}}", 1, "Two horizontal lines: parallel."], ["{{x + y = 5}} and {{y = -x + 5}}", 2], ["{{y = 5}} and {{x = 5}}", 0, "Horizontal and vertical cross at (5, 5)."]
      ],
      hints: ["Different slopes → one solution.", "Same slope: same intercept → infinitely many; different → none."]
    },
    {
      id: "t6", type: "read", title: "Which plan is cheaper?",
      fig: "plans",
      intro: "Gym A costs **$40** to join plus **$20** a month: {{y = 20x + 40}}. Gym B has no fee but costs **$30** a month: {{y = 30x}}.",
      questions: [
        { q: "Where do the lines cross?", choices: [["{{(4, 120)}}", true], ["{{(2, 80)}}", false], ["{{(0, 40)}}", false]], keepOrder: true },
        { q: "What does the intersection mean?", choices: [["After 4 months, both gyms cost $120 in total", true], ["Gym B costs $120 a month", false], ["Both gyms cost $4 a month", false]] },
        { q: "You'll go for **10 months**. Which is cheaper?", choices: [["Gym A ($240 vs. $300)", true], ["Gym B", false], ["They cost the same", false]] },
        { q: "You'll only go for **2 months**. Which is cheaper?", choices: [["Gym B ($60 vs. $80)", true], ["Gym A", false], ["They cost the same", false]] }
      ]
    }
  ],
  build: {
    heading: "Compare two plans",
    prompt: `Invent two choices someone might compare: two phone plans, two ways to get to school, two jobs. Write an **equation for each** (y = mx + b). Find **where they're equal** (graph on paper or guess and check), and explain **which choice is better** before and after that point.`,
    model: `Job A pays $50 a week plus $10 per hour: y = 10x + 50. Job B pays $15 per hour: y = 15x. They're equal at 10 hours, where both pay $150, so the lines cross at (10, 150). If I work less than 10 hours, Job A pays more. If I work more than 10 hours, Job B is better.`,
    placeholder: "Plan A: y = … Plan B: y = …",
    reqs: [
      { t: "Two equations", re: "y\\s*=\\s*[-−]?\\d*\\.?\\d*\\s*x", min: 2 },
      { t: "The intersection as an ordered pair", re: "\\(\\s*[-−]?\\d+\\.?\\d*\\s*,\\s*[-−]?\\d+\\.?\\d*\\s*\\)" },
      { t: "Compare before and after (use *less than* and *more than*, or *before* and *after*)", re: "\\b(less|fewer|before|under|more|after|over)\\b", min: 2 },
      { t: "Say which is *better* or *cheaper*", re: "\\b(better|cheaper|more|best)\\b" }
    ]
  },
  reflect: {
    q: "GPS was built by the military, then made free for everyone. Today it helps ambulances, farmers, hikers and delivery drivers. What's a technology you use every day that you'd like to understand better? Where do you think math is hiding inside it?",
    placeholder: "I'd like to understand… I think the math inside it is…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "Systems without a grid",
      intro: "Type the solution as an ordered pair.",
      items: [
        { q: "{{y = 3x - 4}} and {{y = -2x + 6}} (Set them equal: {{3x - 4 = -2x + 6}}.)", a: "(2, 2)", eq: "y = 3x - 4; y = -2x + 6", how: ["{{5x = 10}}, {{x = 2}}", "{{y = 3(2) - 4 = 2}}: **(2, 2)**"] },
        { q: "{{y = 1/2 x + 3}} and {{y = -x + 9}}", a: "(4, 5)", eq: "y = x/2 + 3; y = -x + 9", how: ["{{1/2 x + 3 = -x + 9}}, so {{3/2 x = 6}}, {{x = 4}}", "{{y = 5}}"] },
        { q: "{{y = 4x + 1}} and {{y = x - 1}} (the answer has fractions)", a: "(-2/3, -5/3)", eq: "y = 4x + 1; y = x - 1", how: ["{{4x + 1 = x - 1}}, {{3x = -2}}, {{x = -2/3}}", "{{y = -2/3 - 1 = -5/3}}"] }
      ]
    },
    {
      id: "x2", type: "quiz", title: "Make it happen",
      questions: [
        { q: "Which equation, paired with {{y = 2x + 3}}, makes a system with **no solution**?", choices: [["{{y = 2x - 1}}", true], ["{{y = -2x + 3}}", false], ["{{2y = 4x + 6}}", false, "That's the same line: infinitely many."]] },
        { q: "Which, paired with {{y = 2x + 3}}, has **infinitely many** solutions?", choices: [["{{-4x + 2y = 6}}", true, "Solve for y: y = 2x + 3."], ["{{y = 3x + 2}}", false], ["{{y = 2x}}", false]] },
        { q: "Can two different lines cross at exactly **two** points?", choices: [["No: two different lines meet at most once", true], ["Yes", false]], keepOrder: true }
      ]
    }
  ],
  figs: {
    inter: { x: [-2, 5], y: [-2, 8], w: 240, lines: [{ fn: "x + 1", label: "y = x + 1" }, { fn: "-2x + 7", c: 1, label: "y = −2x + 7" }], points: [[2, 3, "(2, 3)", 2]], alt: "Two lines crossing at (2, 3)" },
    one: { x: [-4, 4], y: [-4, 4], w: 150, pad: 12, xevery: 9, yevery: 9, lines: [{ fn: "x" }, { fn: "-x + 1", c: 1 }], alt: "Two lines crossing once" },
    none: { x: [-4, 4], y: [-4, 4], w: 150, pad: 12, xevery: 9, yevery: 9, lines: [{ fn: "x + 1" }, { fn: "x - 2", c: 1 }], alt: "Two parallel lines" },
    many: { x: [-4, 4], y: [-4, 4], w: 150, pad: 12, xevery: 9, yevery: 9, lines: [{ fn: "x/2", c: 1 }, { fn: "x/2", dash: true }], alt: "Two lines on top of each other" },
    r1: { x: [-4, 5], y: [-3, 6], w: 220, lines: [{ fn: "x + 2" }, { fn: "-2x + 5", c: 1 }], alt: "Two lines" },
    r2: { x: [-6, 4], y: [-5, 5], w: 220, lines: [{ fn: "x + 1" }, { fn: "-x/2 - 2", c: 1 }], alt: "Two lines" },
    r3: { x: [-5, 5], y: [-5, 5], w: 220, lines: [{ fn: "-x/2 + 2" }, { fn: "-x/2 - 1", c: 1 }], alt: "Two lines" },
    plans: { x: [0, 8], y: [0, 240], ystep: 40, h: 240, w: 300, xlabel: "months", ylabel: "$", lines: [{ fn: "20x + 40", label: "Gym A" }, { fn: "30x", c: 1, label: "Gym B" }], points: [[4, 120, "(4, 120)", 2]], alt: "Two cost lines crossing at (4, 120)" }
  },
  culture: "**Did you know?** GPS satellites' clocks must be corrected for Einstein's relativity: because they move fast and are farther from Earth's gravity, their clocks run about 38 microseconds a day fast. Without the correction, GPS would drift by about 10 km a day.",
  teacher: {
    snags: [
      ["Task 1", "Checks only one equation", "A solution has to work in both."],
      ["Task 4", "Types *2, 3* without parentheses", "Accepted. *x = 2, y = 3* is also accepted."],
      ["Task 5", "Thinks different intercepts mean no solution", "Only when the slopes are the same."]
    ],
    factcheck: "GPS reached full operational capability in 1995 (initial capability 1993); satellites orbit at about 20,200 km; the constellation has had about 31 operational satellites in recent years. Receivers need four satellites for a 3D fix including clock bias. The relativistic correction is about 38 microseconds per day (net of special and general relativity), corresponding to roughly 10 km/day of ranging error if uncorrected."
  }
};

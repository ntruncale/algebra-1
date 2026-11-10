module.exports = {
  num: 17, unit: 4, slug: "m17-slope-intercept", minutes: 40, calculator: "not needed",
  title: "Slope-Intercept Form",
  subtitle: "y = mx + b: reading it, graphing it and writing it from a graph",
  lede: "The equation y = mx + b is the most useful line in algebra. The m tells you how steep, the b tells you where it starts. Learn to read those two numbers and you can graph a line in seconds.",
  recap: "Slope = rise/run = (y₂ − y₁)/(x₂ − x₁). Positive goes up, negative goes down, zero is flat, vertical is undefined. In context, slope is a rate of change.",
  goals: [
    "Identify the slope and y-intercept from y = mx + b",
    "Graph a line from its equation using the intercept and the slope",
    "Write the equation of a line from its graph",
    "Explain what m and b mean in a real situation"
  ],
  context: {
    title: "Why it's called a taxi",
    place: "Germany · 1891",
    text: `Before the 1890s, a ride in a horse-drawn cab in a big city often started with an argument. How far did we go? How much do I owe? Drivers overcharged, passengers underpaid, and nobody could prove anything.

In **1891**, a German inventor named **Wilhelm Bruhn** built a meter that measured the distance a cab traveled and calculated the fare automatically. He called it a **taximeter**, from Greek and Latin words for "charge" and "measure." Cabs with the meter became **taxicabs**, and soon just **taxis**. Within a few years, gasoline-powered taxis with meters were driving in Paris, London and New York.

A taxi fare has two parts: a **starting fee** you pay the moment you get in, and a **rate per mile**. If a ride costs $3 to start plus $2 per mile, the fare for {{x}} miles is

> {{y = 2x + 3}}

That equation is in **slope-intercept form**. The 2 (the rate) is the slope, and the 3 (the starting fee) is where the graph crosses the y-axis.`,
    ask: "Phone plans, gym memberships, streaming services: which ones have a starting fee plus a rate?"
  },
  learn: [
    {
      title: "Reading y = mx + b",
      text: `In **slope-intercept form**, {{y = mx + b}}:

- {{m}} is the **slope**: the coefficient of x.
- {{b}} is the **y-intercept**: where the line crosses the y-axis, at the point {{(0, b)}}.`,
      table: {
        head: ["Equation", "Slope m", "y-intercept b"],
        rows: [["{{y = 3x + 4}}", "3", "4, point (0, 4)"], ["{{y = -2x + 1}}", "−2", "1"], ["{{y = 1/2 x - 5}}", "1/2", "−5"], ["{{y = x}}", "1", "0 (through the origin)"], ["{{y = -x - 3}}", "−1", "−3"], ["{{y = 7}}", "0 (flat)", "7"]],
        caption: "Careful: in {{y = 4 - 3x}}, the slope is −3 and the intercept is 4. The slope is whatever multiplies x, wherever it is."
      },
      check: { q: "What are the slope and y-intercept of {{y = -4x + 6}}?", choices: [["{{m = -4}}, {{b = 6}}", true], ["{{m = 6}}, {{b = -4}}", false, "The slope multiplies x."], ["{{m = 4}}, {{b = 6}}", false, "Keep the sign: −4."]] }
    },
    {
      title: "Graphing from the equation",
      text: `To graph {{y = mx + b}}:
1. **Plot the y-intercept** {{(0, b)}}.
2. **Use the slope** as rise/run to get a second point. A whole number slope like 2 is {{2/1}}: up 2, right 1. A negative slope like {{-2/3}}: down 2, right 3.
3. Repeat once more, then **draw the line** through the points.`,
      fig: "graphit",
      worked: [
        { problem: "Graph {{y = 2/3 x - 1}}", steps: [["Plot {{(0, -1)}}", "Start at the y-intercept, b = −1."], ["Up 2, right 3: {{(3, 1)}}", "The slope 2/3 means rise 2, run 3."], ["Again: {{(6, 3)}}. Draw the line through all three."]] }
      ]
    },
    {
      title: "Writing the equation from a graph, and what m and b mean",
      text: `To write the equation of a graphed line: **read b** where the line crosses the y-axis, then **find m** with rise/run between two exact points. Put them into {{y = mx + b}}.

In real situations:
- **b is the starting value** (when x = 0): the starting fee, the starting height, the money you begin with.
- **m is the rate**: how much y changes for each 1 of x: dollars per mile, centimeters per year.

A taxi with {{y = 2x + 3}}: $3 to start, plus $2 per mile. A candle with {{y = -1.5x + 24}}: starts 24 cm tall and burns 1.5 cm per hour.`
    }
  ],
  tasks: [
    {
      id: "t1", type: "select", title: "Find m and b",
      items: [
        "In {{y = 5x - 2}}, the slope is {5|−2|2} and the y-intercept is {−2|5|2}.",
        "In {{y = -x + 8}}, the slope is {−1|1|8} and the y-intercept is {8|−1|0}.",
        "In {{y = 3/4 x}}, the slope is {3/4|4/3|0} and the y-intercept is {0|3/4|1}.",
        "In {{y = 9 - 2x}}, the slope is {−2|9|2} and the y-intercept is {9|−2|0}.",
        "The line {{y = -6}} has slope {0|−6|undefined}."
      ],
      hints: ["The slope is the number multiplying x, with its sign.", "The y-intercept is the number added on its own."]
    },
    {
      id: "t2", type: "plot", title: "Graph it",
      intro: "Plot the y-intercept, then use the slope to find more points.",
      items: [
        { q: "Graph {{y = 2x - 3}}.", fn: "2x - 3", need: 2 },
        { q: "Graph {{y = -1/2 x + 4}}.", fn: "-x/2 + 4", need: 2 },
        { q: "Graph {{y = -3x + 1}}.", fn: "-3x + 1", need: 2 },
        { q: "Graph {{y = 2/3 x}}.", fn: "2x/3", need: 2 }
      ],
      hints: ["Start at (0, b) on the y-axis.", "For slope −1/2: down 1, right 2."]
    },
    {
      id: "t3", type: "solve", title: "Write the equation", pick: 4,
      intro: "Type the full equation, like **y = 2x - 3**.",
      items: [
        { q: "This line:", fig: "w1", a: "y = 2x + 1", how: ["It crosses the y-axis at 1: b = 1.", "From (0, 1) to (1, 3): rise 2, run 1, so m = 2.", "**y = 2x + 1**"] },
        { q: "This line:", fig: "w2", a: "y = -x + 3", how: ["b = 3.", "Down 1, right 1: m = −1.", "**y = −x + 3**"] },
        { q: "This line:", fig: "w3", a: "y = 1/3x - 2", how: ["b = −2.", "From (0, −2) to (3, −1): rise 1, run 3, m = 1/3.", "**y = (1/3)x − 2**"] },
        { q: "This line:", fig: "w4", a: "y = -3/2x + 4", how: ["b = 4.", "From (0, 4) to (2, 1): rise −3, run 2, m = −3/2.", "**y = −(3/2)x + 4**"] },
        { q: "Slope {{-4}}, y-intercept {{7}}", a: "y = -4x + 7", how: ["**y = −4x + 7**"] },
        { q: "Slope {{1/2}}, passes through the origin", a: "y = 1/2x", how: ["b = 0: **y = (1/2)x**"] }
      ],
      hints: ["Read b where the line crosses the y-axis.", "Count rise over run between two exact grid points."]
    },
    {
      id: "t4", type: "match", title: "Equation to description", left: "Equation", right: "Description",
      pairs: [["{{y = 3x + 2}}", "steep, rising, crosses at 2"], ["{{y = -3x + 2}}", "steep, falling, crosses at 2"], ["{{y = 1/3 x + 2}}", "gentle, rising, crosses at 2"], ["{{y = 3x - 2}}", "steep, rising, crosses at −2"], ["{{y = 2}}", "flat, crosses at 2"]],
      hints: ["The sign of m tells rising or falling. The size tells steep or gentle.", "b tells where it crosses the y-axis."]
    },
    {
      id: "t5", type: "mistake", title: "Graphing errors",
      intro: "Tap the **first wrong line**.",
      items: [
        { q: "Graph {{y = 3x - 2}}", lines: ["Start at {{(0, 3)}}", "Go up 2, right 1"], bad: 0, why: "Start at the y-intercept, b = −2: the point {{(0, -2)}}. Then use the slope 3: up 3, right 1." },
        { q: "Graph {{y = -2/5 x + 1}}", lines: ["Start at {{(0, 1)}}", "Go up 2, right 5"], bad: 1, why: "The slope is negative: go **down** 2, right 5." },
        { q: "Write the equation of a line through {{(0, 4)}} with slope 2", lines: ["{{m = 2}}, {{b = 4}}", "{{y = 4x + 2}}"], bad: 1, why: "m goes with x: {{y = 2x + 4}}." }
      ]
    },
    {
      id: "t6", type: "read", title: "What do m and b mean?",
      questions: [
        { q: "A taxi fare is {{C = 2.5m + 4}}, where m is miles. What does the **4** mean?", choices: [["a $4 fee just to start the ride", true], ["$4 per mile", false, "That's the slope's job: 2.5 per mile."], ["the ride is 4 miles", false]] },
        { q: "A pool is drained: {{V = -500t + 12000}} gallons after {{t}} hours. What does **−500** mean?", choices: [["it loses 500 gallons each hour", true], ["it starts with 500 gallons", false], ["it takes 500 hours to drain", false]] },
        { q: "Maya's savings: {{S = 25w + 150}}. How much did she have **at the start**?", choices: [["$150", true], ["$25", false], ["$175", false]], keepOrder: true },
        { q: "In the same plan, how much does Maya have after **8 weeks**?", choices: [["$350", true, "25(8) + 150 = 350."], ["$1,225", false], ["$200", false]], keepOrder: true }
      ]
    }
  ],
  build: {
    heading: "Your own y = mx + b",
    prompt: `Invent a real situation with a **starting value** and a **constant rate**: a phone plan, a savings goal, a plant growing, a car's gas tank emptying. Write its equation in **y = mx + b** form, explain what **m** and **b** mean (with units), and use it to predict y for one value of x.`,
    model: `A streaming service charges a $10 sign-up fee plus $8 per month. The equation is y = 8x + 10, where x is the number of months and y is the total cost. The slope m = 8 means it costs $8 more each month. The y-intercept b = 10 is the $10 sign-up fee. After 12 months, y = 8(12) + 10 = 106, so I'd pay $106.`,
    placeholder: "A ___ charges / starts with …",
    reqs: [
      { t: "An equation in y = mx + b form", re: "y\\s*=\\s*[-−]?\\d*\\.?\\d*\\s*x\\s*[-−+]\\s*\\d" },
      { t: "Explain the slope (use *slope* or *rate*, and *each* or *per*)", re: "\\b(each|per|every)\\b" },
      { t: "Explain the y-intercept (*start*, *fee*, *beginning* or *intercept*)", re: "\\b(start|starting|fee|beginning|intercept|initial)" },
      { t: "Make a prediction with =", re: "y\\s*=\\s*[-−]?\\d+\\.?\\d*\\s*\\(" }
    ]
  },
  reflect: {
    q: "Before taximeters, passengers and drivers argued over fares. A clear rule (a starting fee plus a rate) made things fair for both sides. Where in your life would a clear, fair rule help people avoid arguments?",
    placeholder: "A clear rule would help with…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "Rewrite in slope-intercept form",
      intro: "Solve each equation for {{y}}. Type it as **y = …**.",
      items: [
        { q: "{{3x + 2y = 8}}", a: "y = -3/2x + 4", how: ["{{2y = -3x + 8}}", "Divide by 2: **y = −(3/2)x + 4**"] },
        { q: "{{y - 5 = 2(x + 1)}}", a: "y = 2x + 7", how: ["{{y - 5 = 2x + 2}}", "**y = 2x + 7**"] },
        { q: "{{4x - y = 9}}", a: "y = 4x - 9", how: ["{{-y = -4x + 9}}", "Multiply by −1: **y = 4x − 9**"] },
        { q: "{{x/2 + y/3 = 1}}", a: "y = -3/2x + 3", how: ["Multiply by 6: {{3x + 2y = 6}}", "{{2y = -3x + 6}}, **y = −(3/2)x + 3**"] }
      ]
    },
    {
      id: "x2", type: "plot", title: "Graph from standard form",
      items: [{ q: "Graph {{2x - 5y = 10}}. (Hint: solve for y first.)", fn: "2x/5 - 2", need: 2 }]
    }
  ],
  figs: {
    graphit: { x: [-2, 7], y: [-3, 5], w: 260, lines: [{ fn: "2x/3 - 1", c: 1 }], points: [[0, -1, "(0, −1)"], [3, 1, "(3, 1)"], [6, 3, "(6, 3)"]], segs: [[0, -1, 0, 1, 2, true], [0, 1, 3, 1, 2, true]], alt: "Graphing y = (2/3)x − 1: start at (0, −1), up 2, right 3" },
    w1: { x: [-4, 4], y: [-4, 5], w: 200, lines: [{ fn: "2x + 1" }], alt: "A line" },
    w2: { x: [-3, 5], y: [-3, 5], w: 200, lines: [{ fn: "-x + 3" }], alt: "A line" },
    w3: { x: [-6, 6], y: [-5, 3], w: 220, lines: [{ fn: "x/3 - 2" }], alt: "A line" },
    w4: { x: [-2, 5], y: [-3, 6], w: 200, lines: [{ fn: "-1.5x + 4" }], alt: "A line" }
  },
  culture: "**Did you know?** *Cab* comes from *cabriolet*, a light horse-drawn carriage. So *taxicab* means \"a carriage with a meter.\" The first gasoline-powered taxi with a meter was built by Gottlieb Daimler in 1897.",
  teacher: {
    snags: [
      ["Task 2", "Starts at (b, 0) on the x-axis", "The y-intercept is on the y-axis: (0, b)."],
      ["Task 3", "Types *2x + 1* without y =", "Accepted; the full equation is preferred."],
      ["Task 3", "Types *y = 0.33x − 2*", "Marked yellow: close, but use the exact fraction 1/3."]
    ],
    factcheck: "Friedrich Wilhelm Gustav Bruhn invented the taximeter in 1891 (Germany). Daimler's Victoria, the first motorized taxi with a meter, ran in Stuttgart in 1897. *Taximeter* comes from French *taximètre* (German *Taxameter*), from medieval Latin *taxa*, \"charge,\" and Greek *metron*, \"measure.\" *Cab* is short for *cabriolet*."
  }
};

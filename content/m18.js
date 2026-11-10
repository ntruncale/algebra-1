module.exports = {
  num: 18, unit: 4, slug: "m18-writing-linear-equations", minutes: 40, calculator: "allowed",
  title: "Writing Linear Equations",
  subtitle: "From a slope and a point, from two points, and from a real situation",
  lede: "So far you've been given equations. Now you'll build them: from two points, from a table, from a story. This is how scientists turn measurements into formulas.",
  recap: "In y = mx + b, m is the slope (the rate) and b is the y-intercept (the starting value). Graph by plotting (0, b), then using rise over run.",
  goals: [
    "Write the equation of a line given its slope and one point",
    "Write the equation of a line through two points",
    "Write a linear model from a table or a word problem, and use it to predict"
  ],
  context: {
    title: "The cricket thermometer",
    place: "Tufts College, Massachusetts · 1897",
    text: `On summer nights, crickets chirp faster when it's hot and slower when it's cool. In **1897**, a physics professor at Tufts College named **Amos Dolbear** published a short article with a wonderful title: *The Cricket as a Thermometer*.

Dolbear had counted the chirps of **snowy tree crickets** and compared them with the temperature. He found the relationship was so regular that you could write it as an equation. In today's notation, with {{N}} chirps per minute and temperature {{T}} in °F:

> {{T = 50 + (N - 40)/4}}

This is now called **Dolbear's law**. A popular shortcut version: count the chirps in **14 seconds** and add **40** to get the temperature in °F.

Dolbear started with **data** (pairs of numbers), and found the **line** that fit them. That's exactly what you'll practice this week: given points, find the equation.`,
    ask: "If a cricket chirps 120 times a minute, what does Dolbear's law say the temperature is?"
  },
  learn: [
    {
      title: "From a slope and a point",
      text: `If you know the slope {{m}} and one point {{(x₁, y₁)}}, substitute them into {{y = mx + b}} and **solve for b**. Then write the equation.`,
      worked: [
        { problem: "Slope 3, through {{(2, 5)}}", steps: [["{{5 = 3(2) + b}}", "Substitute m = 3, x = 2, y = 5."], ["{{5 = 6 + b}}, so {{b = -1}}"], ["{{y = 3x - 1}}"]], check: "Does (2, 5) work? {{3(2) - 1 = 5}} ✓", eq: "5 = 3*2 + b", answer: "-1" }
      ],
      after: `**Point-slope form** is a shortcut that skips solving for b: {{y - y₁ = m(x - x₁)}}. For the example above: {{y - 5 = 3(x - 2)}}. Distribute and simplify, and you get the same line, {{y = 3x - 1}}.`
    },
    {
      title: "From two points",
      text: `Two points are enough to determine a line:
1. Find the **slope** with {{m = (y₂ - y₁)/(x₂ - x₁)}}.
2. Use **either point** to find **b**, as above.
3. Write {{y = mx + b}}, and check it with the **other** point.`,
      worked: [
        { problem: "Through {{(1, 4)}} and {{(3, 10)}}", steps: [["{{m = (10 - 4)/(3 - 1) = 6/2 = 3}}", "Slope first."], ["{{4 = 3(1) + b}}, so {{b = 1}}", "Use (1, 4)."], ["{{y = 3x + 1}}"]], check: "The other point: {{3(3) + 1 = 10}} ✓" },
        { problem: "Through {{(-2, 7)}} and {{(4, -2)}}", steps: [["{{m = (-2 - 7)/(4 - (-2)) = -9/6 = -3/2}}"], ["{{7 = -3/2(-2) + b}}, so {{7 = 3 + b}}, {{b = 4}}"], ["{{y = -3/2 x + 4}}"]] }
      ],
      check: { q: "A line passes through {{(0, -2)}} and {{(5, 8)}}. What's its equation?", choices: [["{{y = 2x - 2}}", true, "m = 10/5 = 2, and (0, −2) is the y-intercept."], ["{{y = -2x + 2}}", false], ["{{y = 1/2 x - 2}}", false, "Rise over run: 10 over 5."]] }
    },
    {
      title: "From a table or a story",
      text: `In a table, look at how **y changes** when **x changes**:`,
      table: {
        head: ["{{x}} (hours)", "0", "2", "4", "6"],
        rows: [["{{y}} (cm of snow)", "3", "8", "13", "18"]],
        caption: "Every 2 hours, the snow gets 5 cm deeper: m = 5/2 = 2.5 cm per hour. At x = 0 it's 3 cm: b = 3. So y = 2.5x + 3."
      },
      after: `In a story, look for the **rate** (per, each, every) for m, and the **starting amount** for b. If the story gives two situations instead, like "after 2 hours it's 8 cm, after 6 hours it's 18 cm," those are two points: (2, 8) and (6, 18).`
    }
  ],
  tasks: [
    {
      id: "t1", type: "solve", title: "Slope and a point", pick: 4,
      intro: "Type the equation, like **y = 3x - 1**.",
      items: [
        { q: "Slope {{2}}, through {{(1, 6)}}", a: "y = 2x + 4", how: ["{{6 = 2(1) + b}}, {{b = 4}}", "**y = 2x + 4**"] },
        { q: "Slope {{-1}}, through {{(3, 2)}}", a: "y = -x + 5", how: ["{{2 = -1(3) + b}}, {{b = 5}}", "**y = −x + 5**"] },
        { q: "Slope {{4}}, through {{(-2, -5)}}", a: "y = 4x + 3", how: ["{{-5 = 4(-2) + b = -8 + b}}, {{b = 3}}", "**y = 4x + 3**"] },
        { q: "Slope {{1/2}}, through {{(6, 1)}}", a: "y = 1/2x - 2", how: ["{{1 = 1/2(6) + b = 3 + b}}, {{b = -2}}", "**y = (1/2)x − 2**"] },
        { q: "Slope {{-3}}, through {{(0, 7)}}", a: "y = -3x + 7", how: ["(0, 7) is the y-intercept: **y = −3x + 7**"] },
        { q: "Slope {{-2/3}}, through {{(3, -1)}}", a: "y = -2/3x + 1", how: ["{{-1 = -2/3(3) + b = -2 + b}}, {{b = 1}}", "**y = −(2/3)x + 1**"] }
      ],
      hints: ["Substitute m, x and y into y = mx + b. Solve for b.", "Then write y = mx + b with your m and b."]
    },
    {
      id: "t2", type: "solve", title: "Two points", pick: 4,
      items: [
        { q: "{{(1, 5)}} and {{(3, 9)}}", a: "y = 2x + 3", how: ["{{m = 4/2 = 2}}", "{{5 = 2 + b}}, {{b = 3}}: **y = 2x + 3**"] },
        { q: "{{(0, 4)}} and {{(2, 0)}}", a: "y = -2x + 4", how: ["{{m = (0 - 4)/(2 - 0) = -2}}", "b = 4: **y = −2x + 4**"] },
        { q: "{{(-1, -4)}} and {{(2, 5)}}", a: "y = 3x - 1", how: ["{{m = 9/3 = 3}}", "{{5 = 3(2) + b}}, {{b = -1}}: **y = 3x − 1**"] },
        { q: "{{(2, 3)}} and {{(6, 5)}}", a: "y = 1/2x + 2", how: ["{{m = 2/4 = 1/2}}", "{{3 = 1 + b}}, {{b = 2}}: **y = (1/2)x + 2**"] },
        { q: "{{(-3, 8)}} and {{(3, -4)}}", a: "y = -2x + 2", how: ["{{m = -12/6 = -2}}", "{{8 = -2(-3) + b = 6 + b}}, {{b = 2}}"] },
        { q: "{{(4, 7)}} and {{(-2, 7)}}", a: "y = 7", how: ["{{m = 0/(-6) = 0}}: a horizontal line", "**y = 7**"] }
      ],
      hints: ["Slope first: m = (y₂ − y₁)/(x₂ − x₁).", "Then use one point to find b. Check with the other point."]
    },
    {
      id: "t3", type: "solve", title: "From a table", pick: 3,
      intro: "Write the equation for each table.",
      items: [
        { q: "{{x}}: 0, 1, 2, 3 → {{y}}: 5, 8, 11, 14", a: "y = 3x + 5", how: ["y goes up 3 each time x goes up 1: m = 3.", "At x = 0, y = 5: **y = 3x + 5**"] },
        { q: "{{x}}: 0, 2, 4, 6 → {{y}}: 10, 9, 8, 7", a: "y = -1/2x + 10", how: ["y goes down 1 when x goes up 2: m = −1/2.", "**y = −(1/2)x + 10**"] },
        { q: "{{x}}: 1, 2, 3, 4 → {{y}}: 2, 6, 10, 14", a: "y = 4x - 2", how: ["m = 4.", "Back up one step to x = 0: 2 − 4 = −2. **y = 4x − 2**"] },
        { q: "{{x}}: −2, 0, 2, 4 → {{y}}: −7, −1, 5, 11", a: "y = 3x - 1", how: ["Up 6 when x goes up 2: m = 3.", "At x = 0, y = −1: **y = 3x − 1**"] }
      ],
      hints: ["m = (change in y) ÷ (change in x). Check that x goes up by 1 each time; if not, divide.", "b is the y value when x = 0."]
    },
    {
      id: "t4", type: "mistake", title: "Check the setup",
      intro: "Tap the **first wrong line**, then write the correct equation.",
      items: [
        { q: "Line through {{(2, 7)}} with slope 3", lines: ["{{7 = 3(2) + b}}", "{{7 = 6 + b}}", "{{b = 13}}", "{{y = 3x + 13}}"], bad: 2, why: "Subtract 6 from both sides: {{b = 1}}.", a: "y = 3x + 1" },
        { q: "Line through {{(1, 2)}} and {{(3, 8)}}", lines: ["{{m = (3 - 1)/(8 - 2) = 1/3}}", "{{2 = 1/3(1) + b}}"], bad: 0, why: "The y's go on top: {{m = (8 - 2)/(3 - 1) = 3}}. Then {{2 = 3 + b}}, {{b = -1}}.", a: "y = 3x - 1" },
        { q: "Line through {{(4, 1)}} with slope −2", lines: ["{{1 = -2(4) + b}}", "{{1 = -8 + b}}", "{{b = 9}}", "{{y = 9x - 2}}"], bad: 3, why: "m and b got swapped: {{y = -2x + 9}}.", a: "y = -2x + 9" }
      ]
    },
    {
      id: "t5", type: "read", title: "Dolbear's cricket law",
      intro: "Calculator allowed. Dolbear's law: {{T = 50 + (N - 40)/4}}, with {{N}} chirps per minute and {{T}} in °F.",
      questions: [
        { q: "A cricket chirps **120 times** a minute. What's the temperature?", choices: [["70°F", true, "50 + 80/4 = 50 + 20 = 70."], ["80°F", false], ["60°F", false]], keepOrder: true },
        { q: "Rewritten in slope-intercept form, Dolbear's law is {{T = 1/4 N + 40}}. What does the slope **1/4** mean?", choices: [["Each extra chirp per minute means about 1/4 degree warmer", true], ["Crickets chirp 4 times per degree", false, "Close, but read the slope as degrees per chirp."], ["The temperature starts at 1/4 degree", false]] },
        { q: "At **60°F**, how many chirps per minute does the law predict?", choices: [["80", true, "60 = 50 + (N − 40)/4, so (N − 40)/4 = 10, N = 80."], ["40", false], ["100", false]], keepOrder: true },
        { q: "The law predicts {{T = 40}} when {{N = 0}}. What's the most sensible way to read this?", choices: [["The model only works in the range where crickets actually chirp", true, "Below about 55°F, these crickets stop chirping. A model can break down outside its data."], ["Crickets freeze at 40°F", false], ["It's always 40°F when crickets are quiet", false]] }
      ]
    },
    {
      id: "t6", type: "solve", title: "Build a model",
      intro: "Write a linear equation for each situation, then use it.",
      items: [
        { q: "A plumber charges **$75** to come out plus **$60 per hour**. Write the cost {{C}} for {{h}} hours.", a: "C = 60h + 75", how: ["Rate: 60 per hour (m). Start: 75 (b).", "**C = 60h + 75**"] },
        { q: "A pool has **2,000 gallons** after **1 hour** of filling and **3,500 gallons** after **4 hours**. Write the gallons {{G}} after {{t}} hours.", a: "G = 500t + 1500", how: ["Two points: (1, 2000) and (4, 3500).", "{{m = 1500/3 = 500}}", "{{2000 = 500(1) + b}}, {{b = 1500}}: **G = 500t + 1500**"] },
        { q: "Use your pool equation: how many gallons were in it at the **start**?", a: "1500", post: "gallons", how: ["At t = 0: **1,500 gallons** (b)."] },
        { q: "A car's value was **$24,000** new and drops **$2,000 per year**. Write the value {{V}} after {{t}} years.", a: "V = -2000t + 24000", how: ["**V = −2000t + 24000**"] }
      ],
      hints: ["Rate (per, each, every) → m. Starting amount → b.", "Two data points? Find the slope between them first."]
    }
  ],
  build: {
    heading: "From data to an equation",
    prompt: `Make up (or find) **two data points** for something that changes at a steady rate: the price of a ride-share for two different distances, a candle's height at two times, your savings in two different weeks. Find the **slope**, the **y-intercept**, write the **equation**, and **predict** one new value. Say what the slope means.`,
    model: `A candle was 20 cm tall after 2 hours and 14 cm tall after 5 hours. The points are (2, 20) and (5, 14). The slope is (14 - 20)/(5 - 2) = -6/3 = -2, so it burns 2 cm per hour. Then 20 = -2(2) + b, so b = 24: it started at 24 cm. The equation is y = -2x + 24. After 10 hours it would be y = -2(10) + 24 = 4 cm tall.`,
    placeholder: "My two data points are …",
    reqs: [
      { t: "Two points written as ordered pairs", re: "\\(\\s*[-−]?\\d+\\.?\\d*\\s*,\\s*[-−]?\\d+\\.?\\d*\\s*\\)", min: 2 },
      { t: "Calculate the slope (use the word *slope*)", re: "\\bslope\\b" },
      { t: "An equation y = mx + b", re: "y\\s*=\\s*[-−]?\\d*\\.?\\d*\\s*x\\s*[-−+]\\s*\\d" },
      { t: "Make a prediction (use *predict*, *would* or *will*)", re: "\\b(predict|would|will)\\b" }
    ]
  },
  reflect: {
    q: "Dolbear noticed something ordinary (crickets chirping) and found math hiding in it. What's something ordinary in your life that might follow a pattern you could measure?",
    placeholder: "Something I could measure is…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "More line-building",
      items: [
        { q: "Write the equation of the line through {{(-6, 1)}} and {{(3, -5)}}.", a: "y = -2/3x - 3", how: ["{{m = -6/9 = -2/3}}", "{{1 = -2/3(-6) + b = 4 + b}}, {{b = -3}}"] },
        { q: "A line has x-intercept 4 and y-intercept −6. Write its equation.", a: "y = 3/2x - 6", how: ["Points (4, 0) and (0, −6): {{m = 6/4 = 3/2}}", "**y = (3/2)x − 6**"] },
        { q: "Rewrite {{y - 4 = -3(x + 2)}} in slope-intercept form.", a: "y = -3x - 2", how: ["{{y - 4 = -3x - 6}}", "**y = −3x − 2**"] }
      ]
    },
    {
      id: "x2", type: "solve", title: "Test the model",
      intro: "The world record for the men's mile was **4:06.2** (246.2 seconds) in **1942** and **3:43.13** (223.13 seconds) in **1999**.",
      items: [
        { q: "Find the average rate of change in seconds per year (round to two decimals).", a: "-0.40|-0.4", post: "seconds per year", how: ["{{(223.13 - 246.2)/(1999 - 1942) = -23.07/57 ≈ -0.40}}"] },
        { q: "If this line kept going, about how many seconds would the record be in **2499** (500 years after 1999)? Round to the nearest whole number.", a: "23", post: "seconds", how: ["{{223.13 - 0.40(500) ≈ 23}} seconds", "A 23-second mile is impossible! Linear models can break down far outside the data."] }
      ]
    }
  ],
  culture: "**Did you know?** Dolbear also invented an early telephone and a wireless telegraph. He lost a famous patent case against Alexander Graham Bell, but his cricket law is still in physics books today.",
  teacher: {
    snags: [
      ["Tasks 1–3", "Types only *2x + 4*", "Accepted when the answer is y = …; the full equation is preferred."],
      ["Task 3", "Uses the change between rows as the slope when x goes up by 2", "Divide by the change in x."],
      ["Task 6", "Writes *C = 75h + 60*", "Rate goes with the variable; the one-time fee is b."]
    ],
    factcheck: "A. E. Dolbear, \"The Cricket as a Thermometer,\" *The American Naturalist* 31 (1897): 970–971, giving T = 50 + (N − 40)/4 for the snowy tree cricket (*Oecanthus fultoni*). Mile records: Gunder Hägg 4:06.2 (1942); Hicham El Guerrouj 3:43.13 (1999), still the record. Dolbear v. American Bell Telephone was decided against Dolbear by the U.S. Supreme Court in 1888 (*The Telephone Cases*)."
  }
};

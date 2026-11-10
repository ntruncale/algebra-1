module.exports = {
  num: 10, unit: 2, slug: "m10-ratios-percents", minutes: 40, calculator: "allowed",
  title: "Ratios, Proportions and Percents",
  subtitle: "Unit rates, solving proportions, percent problems and converting units",
  lede: "Ratios compare quantities: miles per gallon, price per ounce, points per game. This week you'll solve proportions and percent problems with the equation skills you already have.",
  recap: "To solve a formula for a variable, treat the other letters like numbers and use inverse operations. {{d = rt}} becomes {{t = d/r}}.",
  goals: [
    "Find and compare unit rates",
    "Solve proportions by cross-multiplying",
    "Solve percent problems, including percent change",
    "Convert units with conversion factors"
  ],
  context: {
    title: "The $125 million unit mistake",
    place: "Mars · September 23, 1999",
    text: `NASA's **Mars Climate Orbiter** traveled for nine months to reach Mars. On **September 23, 1999**, as it fired its engine to settle into orbit, it flew far too close to the planet and was destroyed. The spacecraft had cost about **$125 million**.

The investigation found the cause. Software built by the company Lockheed Martin reported the thrusters' push in **pound-force seconds** (an American unit). NASA's navigation team expected **newton-seconds** (the metric unit). One pound-force second equals about **4.45 newton-seconds**, so every number was off by a **ratio of 4.45 to 1**. Over months, the small errors added up, and nobody caught it.

Ratios and unit conversions aren't just homework. Nurses use them to calculate medicine doses. Pilots use them to plan fuel. Cooks use them to scale recipes. And as Mars Climate Orbiter showed, a missing conversion can be a very expensive mistake.`,
    ask: "Why do you think nobody noticed that the numbers were 4.45 times too small?"
  },
  learn: [
    {
      title: "Ratios and unit rates",
      text: `A **ratio** compares two quantities: 3 to 4, 3:4, or {{3/4}}. A **rate** compares quantities with different units, like 150 miles in 3 hours. A **unit rate** is a rate **per 1** of something:

> {{150/3 = 50}} miles per hour

Unit rates make comparisons easy. Which is the better buy: **12 oz for $3.00** or **20 oz for $4.40**? Find the price per ounce: {{3.00/12 = 0.25}} and {{4.40/20 = 0.22}}. The 20 oz box is cheaper per ounce.`,
      check: { q: "A car goes **240 miles** on **8 gallons**. What's its unit rate?", choices: [["30 miles per gallon", true, "240 ÷ 8 = 30"], ["1,920 miles per gallon", false, "That multiplies instead of dividing."], ["0.03 gallons per mile", false, "That's gallons per mile, and it's 8 ÷ 240 ≈ 0.033. Close, but the question means miles per gallon."]] }
    },
    {
      title: "Proportions",
      text: `A **proportion** says two ratios are equal: {{3/4 = x/20}}. To solve one, **cross-multiply**: the product of the diagonals is equal.

> If {{a/b = c/d}}, then {{ad = bc}}.

Set up both ratios **the same way**: if the first is miles over hours, the second must be miles over hours too.`,
      worked: [
        { problem: "{{3/4 = x/20}}", steps: [["{{3 * 20 = 4x}}", "Cross-multiply."], ["{{60 = 4x}}"], ["{{x = 15}}", "Divide by 4."]], eq: "3/4 = x/20", answer: "15" },
        { problem: "A recipe uses **2 cups of rice for 6 people**. How much for **15 people**?", steps: [["{{2/6 = c/15}}", "cups over people, both times."], ["{{2 * 15 = 6c}}", "Cross-multiply."], ["{{30 = 6c}}, so {{c = 5}}", "5 cups."]], eq: "2/6 = c/15", answer: "5" }
      ]
    },
    {
      title: "Percents and converting units",
      text: `**Percent** means "per 100": 35% = {{35/100 = 0.35}}. Every basic percent problem fits one equation:

> **part = percent × whole**    (use the percent as a decimal)

- What is 35% of 80? {{0.35 * 80 = 28}}.
- 12 is what percent of 48? {{12 = p * 48}}, so {{p = 0.25 = 25%}}.
- 18 is 30% of what? {{18 = 0.30w}}, so {{w = 60}}.

**Percent change** = change ÷ original. A price going from $40 to $50 changed by 10, and {{10/40 = 0.25}}: a **25% increase**.

**Converting units:** multiply by a fraction equal to 1, like {{(12 in)/(1 ft)}}, set up so the old units cancel. 5 ft × {{(12 in)/(1 ft)}} = 60 in.`,
      tip: "Before converting, ask: should the number get bigger or smaller? Feet to inches gets bigger (inches are smaller), so you multiply by 12."
    }
  ],
  tasks: [
    {
      id: "t1", type: "solve", title: "Unit rates", pick: 4,
      items: [
        { q: "You type **450 words** in **10 minutes**. How many words per minute?", a: "45", post: "words per minute", from: "450/10", how: ["{{450/10 = 45}}"] },
        { q: "**6** granola bars cost **$4.50**. What's the price per bar?", a: "0.75", pre: "$", from: "4.5/6", how: ["{{4.50/6 = 0.75}}"] },
        { q: "A heart beats **288 times** in **4 minutes**. Beats per minute?", a: "72", post: "beats per minute", from: "288/4", how: ["{{288/4 = 72}}"] },
        { q: "Which is cheaper per ounce: **16 oz for $2.88** or **24 oz for $3.84**? Type the price per ounce of the **cheaper** one.", a: "0.16", pre: "$", from: "3.84/24", how: ["{{2.88/16 = 0.18}} and {{3.84/24 = 0.16}}", "The 24 oz box: **$0.16** per ounce"] },
        { q: "A pump fills a **1,200-gallon** pool in **8 hours**. Gallons per hour?", a: "150", post: "gallons per hour", from: "1200/8", how: ["{{1200/8 = 150}}"] }
      ],
      hints: ["A unit rate means *per 1*: divide by the second quantity."]
    },
    {
      id: "t2", type: "solve", title: "Solve the proportion", pick: 5,
      items: [
        { q: "{{x/12 = 3/4}}", a: "9", pre: "x =", eq: "x/12 = 3/4", how: ["Cross-multiply: {{4x = 36}}", "**x = 9**"] },
        { q: "{{5/8 = 20/n}}", a: "32", pre: "n =", eq: "5/8 = 20/n", how: ["{{5n = 160}}", "**n = 32**"] },
        { q: "{{7/y = 21/9}}", a: "3", pre: "y =", eq: "7/y = 21/9", how: ["{{21y = 63}}", "**y = 3**"] },
        { q: "{{(x + 2)/6 = 5/3}}", a: "8", pre: "x =", eq: "(x + 2)/6 = 5/3", how: ["{{3(x + 2) = 30}}", "{{x + 2 = 10}}, **x = 8**"] },
        { q: "{{2.5/k = 10/16}}", a: "4", pre: "k =", eq: "2.5/k = 10/16", how: ["{{10k = 40}}", "**k = 4**"] },
        { q: "{{4/(x - 1) = 2/3}}", a: "7", pre: "x =", eq: "4/(x - 1) = 2/3", how: ["{{12 = 2(x - 1)}}", "{{12 = 2x - 2}}, {{14 = 2x}}, **x = 7**"] }
      ],
      hints: ["Cross-multiply: top-left × bottom-right = bottom-left × top-right.", "Then solve the equation you get."]
    },
    {
      id: "t3", type: "solve", title: "Percent problems", pick: 5,
      intro: "Use part = percent × whole.",
      items: [
        { q: "What is **15%** of **60**?", a: "9", from: "0.15*60", how: ["{{0.15 * 60 = 9}}"] },
        { q: "**18** is what percent of **72**?", a: "25", post: "%", eq: "18 = (p/100)*72", how: ["{{18 = p * 72}}, so {{p = 0.25}}", "**25%**"] },
        { q: "**42** is **70%** of what number?", a: "60", eq: "42 = 0.7w", how: ["{{42 = 0.70w}}", "{{w = 60}}"] },
        { q: "A **$80** jacket is **25% off**. What's the sale price?", a: "60", pre: "$", from: "80 - 0.25*80", how: ["Discount: {{0.25 * 80 = 20}}", "{{80 - 20 = 60}} (or {{0.75 * 80}})"] },
        { q: "A **$45** meal with an **18%** tip. What's the total?", a: "53.1", pre: "$", from: "45*1.18", how: ["Tip: {{0.18 * 45 = 8.10}}", "**$53.10**"] },
        { q: "A town grew from **2,000** to **2,300** people. What's the percent increase?", a: "15", post: "%", from: "300/2000*100", how: ["Change: 300", "{{300/2000 = 0.15}}, so **15%**"] },
        { q: "A phone's price dropped from **$500** to **$400**. What's the percent decrease?", a: "20", post: "%", from: "100/500*100", how: ["Change: 100", "{{100/500 = 0.20}}, so **20%**"] }
      ],
      hints: ["Turn the percent into a decimal: 15% = 0.15.", "Percent change = change ÷ the **original** amount."]
    },
    {
      id: "t4", type: "mistake", title: "Spot the setup error",
      intro: "Tap the **first wrong line**. Then give the right answer.",
      items: [
        { q: "**3 notebooks** cost **$7.50**. How much do **8** cost?", lines: ["{{3/7.50 = c/8}}", "{{3 * 8 = 7.50c}}", "{{c = 3.2}}"], bad: 0, why: "The ratios don't match: notebooks/dollars on the left but dollars/notebooks on the right. Use {{3/7.50 = 8/c}} or {{7.50/3 = c/8}}: **$20**.", a: "20", pre: "$", eq: "7.5/3 = c/8" },
        { q: "What is **8%** of **50**?", lines: ["8% means 8, so…", "{{8 * 50 = 400}}"], bad: 0, why: "Change 8% to a decimal first: {{0.08 * 50 = 4}}.", a: "4", from: "0.08*50" },
        { q: "A price rose from **$20** to **$25**. Percent increase?", lines: ["Change: {{25 - 20 = 5}}", "{{5/25 = 0.2}}", "20% increase"], bad: 1, why: "Divide by the **original** price, $20: {{5/20 = 0.25}}, a **25%** increase.", a: "25", post: "%", from: "5/20*100" }
      ]
    },
    {
      id: "t5", type: "solve", title: "Convert the units", pick: 4,
      intro: "Multiply by a conversion factor so the old units cancel.",
      items: [
        { q: "**7 feet** = ___ inches ({{1 ft = 12 in}})", a: "84", post: "inches", from: "7*12", how: ["{{7 * 12 = 84}}"] },
        { q: "**90 minutes** = ___ hours", a: "1.5", post: "hours", from: "90/60", how: ["{{90/60 = 1.5}}"] },
        { q: "**3.2 kilometers** = ___ meters", a: "3200", post: "meters", from: "3.2*1000", how: ["{{3.2 * 1000 = 3200}}"] },
        { q: "**60 miles per hour** = ___ miles per **minute**", a: "1", post: "mile per minute", from: "60/60", how: ["60 miles in 60 minutes: **1 mile per minute**"] },
        { q: "Mars Climate Orbiter: **10 pound-force seconds** = ___ newton-seconds ({{1 lbf s = 4.45 N s}})", a: "44.5", post: "N·s", from: "10*4.45", how: ["{{10 * 4.45 = 44.5}}"] },
        { q: "**2 gallons** = ___ cups ({{1 gal = 16 cups}})", a: "32", post: "cups", from: "2*16", how: ["{{2 * 16 = 32}}"] }
      ],
      hints: ["Going from a big unit to a small unit, the number gets bigger: multiply.", "Going from small to big, divide."]
    },
    {
      id: "t6", type: "read", title: "Recipe math",
      intro: "Calculator allowed.",
      passage: `**Pancakes** (makes 12)
- 2 cups flour
- 1.5 cups milk
- 2 eggs
- 3 tablespoons butter`,
      questions: [
        { q: "How much flour for **30** pancakes?", choices: [["5 cups", true, "{{2/12 = f/30}}, so 12f = 60 and f = 5."], ["4 cups", false], ["2.5 cups", false], ["6 cups", false]], keepOrder: true },
        { q: "How much milk for **6** pancakes?", choices: [["0.75 cup", true, "Half the recipe: 1.5 ÷ 2."], ["3 cups", false], ["1 cup", false]], keepOrder: true },
        { q: "You have only **3 eggs**. How many pancakes can you make (with enough of everything else)?", choices: [["18", true, "{{2/12 = 3/p}}, so 2p = 36 and p = 18."], ["15", false], ["36", false]], keepOrder: true },
        { q: "What is the ratio of flour to milk?", choices: [["4 : 3", true, "2 : 1.5 is the same as 4 : 3."], ["2 : 3", false], ["3 : 4", false]], keepOrder: true }
      ]
    }
  ],
  build: {
    heading: "A ratio in your life",
    prompt: `Find a real ratio, rate or percent from your own life: a sports stat (points per game, free-throw percentage), a recipe, a price, your phone's battery use. Write it down, then use it to **predict** something with a **proportion** or **percent equation**. Show the equation and the answer.`,
    model: `Last season I made 18 of my 24 free throws. That's 18/24 = 0.75, or 75%. If I take 40 free throws this season at the same rate, I can predict how many I'll make: 18/24 = x/40, so 24x = 720 and x = 30. I'd make about 30.`,
    placeholder: "In my life, …",
    reqs: [
      { t: "A ratio or percent with real numbers", re: "\\d+\\s*(/|:|%|out of|per)\\s*\\d*" },
      { t: "An equation with a variable", re: "[a-z]\\s*=|=\\s*[a-z]|\\d[a-z]\\b" },
      { t: "Use the word *predict*, *estimate* or *about*", re: "\\b(predict|estimate|about)" },
      { t: "At least 3 sentences", sentences: 3 }
    ]
  },
  reflect: {
    q: "The Mars Climate Orbiter was lost because two teams used different units and nobody double-checked. When has double-checking (or not double-checking) mattered for you, in school or anywhere else?",
    placeholder: "Double-checking mattered when…"
  },
  challenge: [
    {
      id: "x1", type: "quiz", title: "Percent traps",
      questions: [
        { q: "A $100 shirt goes **up 20%**, then the new price goes **down 20%**. What's the final price?", choices: [["$96", true, "$100 → $120 → $120 − $24 = $96. The 20% off was taken from a bigger number."], ["$100", false, "Try it: 20% of $120 is more than 20% of $100."], ["$80", false]], keepOrder: true },
        { q: "Which is bigger: **40% of 75** or **75% of 40**?", choices: [["They're equal", true, "Both are 0.40 × 75 = 0.75 × 40 = 30. Multiplication can be done in either order!"], ["40% of 75", false], ["75% of 40", false]] },
        { q: "A price after a **25% discount** is **$60**. What was the original price?", choices: [["$80", true, "$60 is 75% of the original: 0.75w = 60, so w = 80."], ["$75", false, "That adds 25% of $60 back, but the discount was 25% of the original."], ["$85", false]], keepOrder: true }
      ]
    },
    {
      id: "x2", type: "solve", title: "Scale and speed",
      items: [
        { q: "On a map, **2 cm** represents **15 km**. Two towns are **9 cm** apart on the map. How far apart are they really?", a: "67.5", post: "km", eq: "2/15 = 9/d", how: ["{{2/15 = 9/d}}", "{{2d = 135}}, **67.5 km**"] },
        { q: "Bolt's top speed was **12.4 meters per second**. Convert to **kilometers per hour**. ({{1 km = 1000 m}}, {{1 h = 3600 s}})", a: "44.64", post: "km/h", from: "12.4*3600/1000", how: ["{{12.4 m/s * 3600 s/h = 44,640 m/h}}", "÷ 1000: **44.64 km/h**"] },
        { q: "Light travels about **300,000 km per second**. Mars is (at its closest) about **54,600,000 km** from Earth. How many **seconds** does a radio signal take to get there?", a: "182", post: "seconds", from: "54600000/300000", how: ["{{t = d/r = 54,600,000/300,000}}", "**182 seconds** (about 3 minutes)"] }
      ]
    }
  ],
  culture: "**Did you know?** The United States is one of only three countries (with Liberia and Myanmar) that hasn't fully adopted the metric system. But even in the U.S., soda comes in 2-liter bottles and medicine is measured in milligrams.",
  teacher: {
    snags: [
      ["Task 3", "Types *0.25* for \"what percent\"", "Marked wrong: the box is followed by %, so 25 is expected."],
      ["Task 4, item 1", "Sets up notebooks/dollars on one side and dollars/notebooks on the other", "Both ratios must be set up the same way."],
      ["Task 5", "Divides instead of multiplying", "Ask: bigger or smaller unit? Should the number grow?"]
    ],
    factcheck: "Mars Climate Orbiter was lost on September 23, 1999. The NASA Mishap Investigation Board (November 1999) found that ground software (from Lockheed Martin) produced impulse data in pound-force seconds instead of newton-seconds (1 lbf·s = 4.448 N·s). The spacecraft cost about $125 million (total mission about $327.6 million). Closest Mars–Earth distance is about 54.6 million km; light speed is about 300,000 km/s. Countries not fully metric: U.S., Liberia, Myanmar (CIA World Factbook)."
  }
};

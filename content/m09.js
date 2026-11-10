module.exports = {
  num: 9, unit: 2, slug: "m09-formulas", minutes: 35, calculator: "allowed",
  title: "Formulas and Literal Equations",
  subtitle: "Using formulas, and solving a formula for a different variable",
  lede: "A formula is an equation that works every time: for distance, area, temperature, money. This week you'll use formulas and learn to rearrange them to answer different questions.",
  recap: "Multi-step equations: distribute, combine like terms, get the variable terms on one side, then solve. If the variables cancel, there's no solution or every number works.",
  goals: [
    "Substitute into a formula and solve for the unknown",
    "Solve a formula (literal equation) for a given variable",
    "Use the distance and temperature formulas"
  ],
  context: {
    title: "9.58 seconds",
    place: "Berlin, Germany · August 16, 2009",
    text: `At the 2009 World Championships in Berlin, **Usain Bolt** of Jamaica ran 100 meters in **9.58 seconds**. It's still the world record, and some scientists think it's close to the fastest a human can run.

How fast is that? The formula **d = rt** (distance = rate × time) answers it. Solve for the rate: **r = d ÷ t**.

> r = 100 ÷ 9.58 ≈ 10.4 meters per second

That's his **average**. Because he started from a standstill, his **top speed** was much higher: timing data showed about **12.4 meters per second** between the 60- and 80-meter marks. That's almost **28 miles per hour**, faster than a lot of cars drive in a school zone.

Notice what happened: we didn't need a new formula for speed. We **rearranged** d = rt. That's this week's skill.`,
    ask: "If you know d = rt, how could you find the time it would take to run 200 meters at 10 meters per second?"
  },
  learn: [
    {
      title: "Using a formula",
      text: `A **formula** shows how quantities are related. To use one, **substitute** the values you know, then **solve** for the one you don't.`,
      table: {
        head: ["Formula", "Means"],
        rows: [["{{d = rt}}", "distance = rate × time"], ["{{A = lw}}", "area of a rectangle = length × width"], ["{{P = 2l + 2w}}", "perimeter of a rectangle"], ["{{I = Prt}}", "simple interest = principal × rate × time"], ["{{F = 9/5 C + 32}}", "Celsius to Fahrenheit"]]
      },
      worked: [
        { problem: "A rectangle has perimeter 30 cm and length 9 cm. Find the width. ({{P = 2l + 2w}})", steps: [["{{30 = 2(9) + 2w}}", "Substitute P = 30 and l = 9."], ["{{30 = 18 + 2w}}"], ["{{12 = 2w}}", "Subtract 18."], ["{{w = 6}}", "The width is 6 cm."]], eq: "30 = 2*9 + 2w", answer: "6" }
      ]
    },
    {
      title: "Solving for a variable",
      text: `A **literal equation** has more than one letter. To solve it for one letter, treat **all the other letters like numbers** and use the same inverse operations as always.`,
      worked: [
        { problem: "Solve {{d = rt}} for {{t}}.", steps: [["{{d/r = (rt)/r}}", "t is multiplied by r, so divide both sides by r."], ["{{t = d/r}}"]] },
        { problem: "Solve {{P = 2l + 2w}} for {{w}}.", steps: [["{{P - 2l = 2w}}", "Subtract 2l from both sides."], ["{{w = (P - 2l)/2}}", "Divide both sides by 2."]] },
        { problem: "Solve {{2x + 3y = 6}} for {{y}}.", steps: [["{{3y = 6 - 2x}}", "Subtract 2x."], ["{{y = (6 - 2x)/3}}", "Divide by 3. This can also be written {{y = 2 - 2/3 x}}."]] }
      ],
      check: { q: "Solve {{A = lw}} for {{l}}.", choices: [["{{l = A/w}}", true, "Divide both sides by w."], ["{{l = A - w}}", false, "l and w are multiplied, so divide."], ["{{l = Aw}}", false, "Undo multiplying by dividing."]] }
    },
    {
      title: "Temperature",
      text: `The U.S. uses Fahrenheit; most of the world uses Celsius. Water freezes at **0°C = 32°F** and boils at **100°C = 212°F**.

> {{F = 9/5 C + 32}}    and, solved for C,    {{C = 5/9 (F - 32)}}`,
      worked: [
        { problem: "It's 25°C in Rome. What's that in °F?", steps: [["{{F = 9/5(25) + 32}}", "Substitute C = 25."], ["{{F = 45 + 32 = 77}}", "77°F: a nice day."]] },
        { problem: "Solve {{F = 9/5 C + 32}} for {{C}}.", steps: [["{{F - 32 = 9/5 C}}", "Subtract 32."], ["{{5/9 (F - 32) = C}}", "Multiply both sides by 5/9, the reciprocal."]] }
      ]
    }
  ],
  tasks: [
    {
      id: "t1", type: "solve", title: "Plug in and solve", pick: 5,
      items: [
        { q: "{{d = rt}}. A car travels at **55 mph** for **3 hours**. How far does it go?", a: "165", post: "miles", from: "55*3", how: ["{{d = 55(3)}}", "**165 miles**"] },
        { q: "{{d = rt}}. A cyclist goes **36 miles** in **2.4 hours**. What's her rate?", a: "15", post: "mph", eq: "36 = r*2.4", how: ["{{36 = r(2.4)}}", "Divide by 2.4: **15 mph**"] },
        { q: "{{A = lw}}. A rug has area **48 ft²** and width **6 ft**. What's its length?", a: "8", post: "ft", eq: "48 = l*6", how: ["{{48 = 6l}}", "**8 ft**"] },
        { q: "{{P = 2l + 2w}}. A field has perimeter **340 m** and length **100 m**. What's its width?", a: "70", post: "m", eq: "340 = 2*100 + 2w", how: ["{{340 = 200 + 2w}}", "{{140 = 2w}}, so **70 m**"] },
        { q: "{{I = Prt}}. **$500** is saved at **4%** ({{r = 0.04}}) for **3 years**. How much interest is earned?", a: "60", pre: "$", from: "500*0.04*3", how: ["{{I = 500(0.04)(3)}}", "**$60**"] },
        { q: "{{F = 9/5 C + 32}}. Convert **−10°C** to °F.", a: "14", post: "°F", from: "9/5*(-10) + 32", how: ["{{9/5(-10) = -18}}", "−18 + 32 = **14°F**"] }
      ],
      hints: ["Write the formula, substitute every number you know, then solve.", "Keep track of units in your answer."]
    },
    {
      id: "t2", type: "solve", title: "Solve for the letter", pick: 5,
      intro: "Type answers like **d/r** or **(P - 2l)/2**. Use parentheses around a group that's divided.",
      items: [
        { q: "Solve {{d = rt}} for {{r}}.", a: "d/t", pre: "r =", from: "d/t", how: ["Divide both sides by t: **r = d/t**"] },
        { q: "Solve {{A = lw}} for {{w}}.", a: "A/l", pre: "w =", from: "a/l", how: ["Divide both sides by l: **w = A/l**"] },
        { q: "Solve {{y = x + b}} for {{b}}.", a: "y - x", pre: "b =", from: "y - x", how: ["Subtract x from both sides: **b = y − x**"] },
        { q: "Solve {{P = 4s}} for {{s}}.", a: "P/4", pre: "s =", from: "p/4", how: ["Divide by 4: **s = P/4**"] },
        { q: "Solve {{y = mx + b}} for {{b}}.", a: "y - mx", pre: "b =", from: "y - m*x", how: ["Subtract mx: **b = y − mx**"] },
        { q: "Solve {{P = 2l + 2w}} for {{l}}.", a: "(P - 2w)/2", pre: "l =", from: "(p - 2w)/2", how: ["Subtract 2w: {{P - 2w = 2l}}", "Divide by 2: **l = (P − 2w)/2**"] },
        { q: "Solve {{V = lwh}} for {{h}}.", a: "V/(lw)", pre: "h =", from: "v/(l*w)", how: ["h is multiplied by l and w, so divide by both: **h = V/(lw)**"] }
      ],
      hints: ["Pretend the other letters are numbers. What would you do?", "If the letter you want is multiplied, divide. If something's added, subtract."]
    },
    {
      id: "t3", type: "match", title: "Rearranged formulas", left: "Formula", right: "Solved for…",
      pairs: [["{{d = rt}}, for t", "{{t = d/r}}"], ["{{A = 1/2 bh}}, for h", "{{h = (2A)/b}}"], ["{{C = 2 pi r}}, for r", "{{r = C/(2 pi)}}"], ["{{y = mx + b}}, for m", "{{m = (y - b)/x}}"], ["{{F = 9/5 C + 32}}, for C", "{{C = 5/9(F - 32)}}"]],
      hints: ["Undo the operations around the letter you want, in reverse order."]
    },
    {
      id: "t4", type: "mistake", title: "Rearranging errors",
      intro: "Tap the **first wrong line**.",
      items: [
        { q: "Solve {{P = 2l + 2w}} for {{w}}.", lines: ["{{P - 2l = 2w}}", "{{(P - 2l)/2 = w}}", "{{P - l = w}}"], bad: 2, why: "Dividing by 2 divides **every** term on top: {{(P - 2l)/2 = P/2 - l}}, not {{P - l}}. The line before was already the answer." },
        { q: "Solve {{A = lw}} for {{w}}.", lines: ["{{A - l = w}}", "{{w = A - l}}"], bad: 0, why: "l and w are **multiplied**, so divide: {{w = A/l}}." },
        { q: "Solve {{y = 3x - 6}} for {{x}}.", lines: ["{{y - 6 = 3x}}", "{{x = (y - 6)/3}}"], bad: 0, why: "6 is subtracted, so **add** 6: {{y + 6 = 3x}}, and {{x = (y + 6)/3}}." }
      ]
    },
    {
      id: "t5", type: "solve", title: "Fahrenheit and Celsius", pick: 4,
      intro: "Use {{F = 9/5 C + 32}} or {{C = 5/9 (F - 32)}}.",
      items: [
        { q: "Water boils at **100°C**. What's that in °F?", a: "212", post: "°F", from: "9/5*100 + 32", how: ["{{9/5(100) = 180}}", "180 + 32 = **212°F**"] },
        { q: "Body temperature is about **98.6°F**. What's that in °C?", a: "37", post: "°C", from: "5/9*(98.6 - 32)", how: ["{{98.6 - 32 = 66.6}}", "{{5/9(66.6) = 37}}°C"] },
        { q: "A summer day in Phoenix is **113°F**. What's that in °C?", a: "45", post: "°C", from: "5/9*(113 - 32)", how: ["{{113 - 32 = 81}}", "{{5/9(81) = 45}}°C"] },
        { q: "Browning, Montana, hit **−56°F** in 1916. What's that in °C? (Round to the nearest whole degree.)", a: "-49", post: "°C", how: ["{{-56 - 32 = -88}}", "{{5/9(-88) ≈ -48.9}}, about **−49°C**"] },
        { q: "At what temperature are °F and °C **the same**? (Set {{F = C}}: solve {{x = 9/5 x + 32}}.)", a: "-40", post: "degrees", eq: "x = (9/5)x + 32", how: ["{{x - 9/5 x = 32}}, so {{-4/5 x = 32}}", "**x = −40**: −40°F is −40°C"] }
      ],
      hints: ["Celsius to Fahrenheit: multiply by 9/5, then add 32.", "Fahrenheit to Celsius: subtract 32 first, then multiply by 5/9."]
    },
    {
      id: "t6", type: "read", title: "How fast is Usain Bolt?",
      intro: "Calculator allowed.",
      passage: `Bolt's 100 m world record: **9.58 seconds** (Berlin, 2009).
His 200 m world record: **19.19 seconds** (Berlin, 2009).
Top speed during the 100 m: about **12.4 m/s**.
1 m/s ≈ **2.24 miles per hour**.`,
      questions: [
        { q: "Using {{r = d/t}}, his average speed in the 100 m was about…", choices: [["10.4 m/s", true], ["9.6 m/s", false], ["958 m/s", false], ["0.1 m/s", false]], keepOrder: true },
        { q: "His average speed in the 200 m was about…", choices: [["10.4 m/s", true, "200 ÷ 19.19 ≈ 10.42, almost exactly the same average!"], ["5.2 m/s", false], ["20.8 m/s", false]], keepOrder: true },
        { q: "His top speed of 12.4 m/s is about how many miles per hour?", choices: [["28 mph", true, "12.4 × 2.24 ≈ 27.8"], ["5.5 mph", false], ["124 mph", false]], keepOrder: true },
        { q: "If he could run at his top speed the whole way, how long would 100 m take? ({{t = d/r}})", choices: [["about 8.1 seconds", true, "100 ÷ 12.4 ≈ 8.06"], ["about 12.4 seconds", false], ["about 9.6 seconds", false]], keepOrder: true }
      ]
    }
  ],
  build: {
    heading: "A formula you could use",
    prompt: `Pick one formula from this module (or another you know, like the area of a triangle {{A = 1/2 bh}}). Write a **real question** it could answer, **solve** it, and then **solve the formula for a different variable** and explain when that version would be useful.`,
    model: `I used d = rt. Question: if my family drives 240 miles at 60 mph, how long will it take? t = d/r = 240/60 = 4 hours. Solving for t gives t = d/r, which is useful when you know the distance and speed and want to know how long a trip takes.`,
    placeholder: "I used … Question: …",
    reqs: [
      { t: "Name a formula with an equal sign", re: "\\b[a-z]\\s*=\\s*[^\\n]*[a-z]" },
      { t: "Solve a real question (a calculation with =)", re: "=\\s*[-−]?\\d", min: 1 },
      { t: "Say why a rearranged version is *useful*", re: "\\b(useful|helps?|when you)\\b" },
      { t: "At least 3 sentences", sentences: 3 }
    ]
  },
  reflect: {
    q: "Usain Bolt's record has stood since 2009. Records in sports keep falling partly because of better measurement, training and data. Where have you seen numbers or formulas used in a sport or activity you care about?",
    placeholder: "In ___, people use numbers to…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "Rearrange like a pro",
      items: [
        { q: "Solve {{3x - 4y = 12}} for {{y}}. Write it as {{y = mx + b}}.", a: "3/4x - 3", pre: "y =", from: "(3x - 12)/4", how: ["{{-4y = 12 - 3x}}", "Divide by −4: {{y = 3/4 x - 3}}"] },
        { q: "Solve {{A = 1/2 h(b + c)}} for {{h}}.", a: "2A/(b + c)", pre: "h =", from: "2a/(b + c)", how: ["Multiply by 2: {{2A = h(b + c)}}", "Divide by (b + c): {{h = (2A)/(b + c)}}"] },
        { q: "Solve {{S = 2 pi r h + 2 pi r^2}} for {{h}}.", a: "(S - 2pi r^2)/(2pi r)", pre: "h =", from: "(s - 2*pi*r^2)/(2*pi*r)", how: ["Subtract {{2 pi r^2}}: {{S - 2 pi r^2 = 2 pi r h}}", "Divide by {{2 pi r}}"] }
      ]
    },
    {
      id: "x2", type: "solve", title: "Speed puzzles",
      items: [
        { q: "Two trains leave the same station going **opposite** directions, one at **60 mph** and one at **75 mph**. After how many hours are they **405 miles** apart?", a: "3", post: "hours", eq: "60t + 75t = 405", how: ["Distances add: {{60t + 75t = 405}}", "{{135t = 405}}, **3 hours**"] },
        { q: "You walk to school at **3 mph** and bike home at **12 mph**. The round trip takes **1.25 hours**. How far is school? (Time = {{d/3 + d/12}}.)", a: "3", post: "miles", eq: "d/3 + d/12 = 1.25", how: ["Multiply by 12: {{4d + d = 15}}", "{{5d = 15}}, **3 miles**"] }
      ]
    }
  ],
  culture: "**Did you know?** −40 is the one temperature that's the same in Fahrenheit and Celsius. It has been reached in places like Fairbanks, Alaska, and Yakutsk, Russia.",
  teacher: {
    snags: [
      ["Task 2", "Types *d÷t* or *d / t*", "Accepted. Answers are checked as expressions, so *(1/t)d* also counts."],
      ["Task 2", "Types *P-2w/2* without parentheses", "Marked wrong: it means P − w. Remind them to group the top."],
      ["Task 5", "Rounding for −56°F", "−49 is expected; −48.9 is not accepted (the item asks to round)."]
    ],
    factcheck: "Usain Bolt: 100 m in 9.58 s and 200 m in 19.19 s, World Championships, Berlin, August 16 and 20, 2009 (World Athletics). Biomechanical analysis (IAAF Berlin study) put his peak speed around 12.2–12.4 m/s between 60 and 80 m. 1 m/s ≈ 2.237 mph. −40°F = −40°C."
  }
};

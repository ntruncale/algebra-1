module.exports = {
  num: 1, unit: 1, slug: "m01-integers", minutes: 35, calculator: "not needed",
  title: "Positive and Negative Numbers",
  subtitle: "The number line, absolute value, and the four operations with integers",
  lede: "Algebra runs on negative numbers. This week: how to add, subtract, multiply and divide them without guessing at the sign.",
  welcome: `<h2>Welcome to Algebra 1 practice</h2>
<ul>
<li>These modules <b>go along with your Algebra 1 class</b>: one a week, 30 in all. Your teacher will tell you which one to do.</li>
<li>Work through the 7 steps from top to bottom. <b>Keep paper and a pencil next to you.</b> Math sticks when you write it out.</li>
<li>The activities <b>check your work automatically</b>. Pink means try again. Yellow means you're close (for example, the fraction isn't reduced yet).</li>
<li>Type answers the way you'd write them: <b>-5</b>, <b>3/4</b>, <b>2x + 1</b>. Use the math keys under each box for symbols like <b>²</b> and <b>≤</b>.</li>
<li>If you miss a problem twice, a <b>Show me how</b> button appears with the steps.</li>
<li>When every activity is done, you get a <b>completion code</b> for the Blackbaud check. Step 7 has optional <b>★ challenges</b> if you want more.</li>
</ul>`,
  goals: [
    "Place and compare positive and negative numbers on a number line",
    "Add and subtract integers and get the sign right every time",
    "Multiply and divide integers using the sign rules",
    "Use negative numbers to describe real situations like temperature and money"
  ],
  context: {
    title: "The day the temperature fell 100 degrees",
    place: "Browning, Montana · January 1916",
    text: `On **January 23, 1916**, the town of **Browning, Montana**, was having a mild winter day: **44°F**. Then a wave of arctic air poured down from Canada. By the next morning, the thermometer read **−56°F**, 56 degrees *below* zero.

That's a drop of **100 degrees in 24 hours**, still the record for the United States. To figure that out, you can't just subtract 56 from 44. You have to count the 44 degrees down to zero, and then the 56 more below it: **44 − (−56) = 100**.

Twenty-seven years later, on **January 22, 1943**, the opposite happened in **Spearfish, South Dakota**. At 7:30 in the morning it was **−4°F**. A warm wind called a *chinook* blew in, and two minutes later it was **45°F**. That's a jump of **49 degrees in 2 minutes**, a world record.

Weather forecasters, bankers, pilots, divers and video-game designers all work with negative numbers every day. So will you, in every module of this course.`,
    ask: "On a thermometer, which is colder: −20° or −5°? How do you know?"
  },
  learn: [
    {
      title: "The number line and absolute value",
      text: `Numbers to the **right** on a number line are **greater**. Numbers to the left are **less**. So **−3 > −8**, even though 8 looks bigger: −3 is warmer than −8.

%%nl:pts:-8=−8,-3=−3,4=4@-10..6%%

The **absolute value** of a number is its **distance from zero**. Distance is never negative. We write it with bars: {{|−6| = 6}} and {{|6| = 6}}.

Two numbers the same distance from zero on opposite sides, like **7** and **−7**, are **opposites**. A number plus its opposite is always **0**.`,
      check: { q: "Which number is the greatest?", choices: [["{{-2}}", true, "Right: −2 is farthest to the right of these three."], ["{{-9}}", false, "−9 is farther left (colder) than −2."], ["{{-15}}", false, "−15 is the farthest left of all."]], keepOrder: true }
    },
    {
      title: "Adding and subtracting integers",
      text: `Think of **money**: positive numbers are money you *have*, negative numbers are money you *owe*.

- **Same signs: add, and keep the sign.** Owing 4 and then owing 3 more means owing 7: {{-4 + (-3) = -7}}.
- **Different signs: subtract the absolute values, and keep the sign of the bigger one.** Having 9 but owing 5 leaves 4: {{9 + (-5) = 4}}. Having 2 but owing 8 leaves you owing 6: {{2 + (-8) = -6}}.

**Subtracting is adding the opposite.** Change the minus into a plus, and flip the sign of the number after it. People call this *keep, change, change*:

{{5 - (-3) = 5 + 3 = 8}}  and  {{-2 - 7 = -2 + (-7) = -9}}`,
      worked: [
        { problem: "{{-6 + 10}}", steps: [["Different signs, so subtract: {{10 - 6 = 4}}", "Ignore the signs for a moment and find the difference."], ["10 has the bigger absolute value and it's positive, so the answer is positive: {{4}}", "Keep the sign of the number that's farther from zero."]], check: "Start at −6 on the number line and move 10 to the right. You land on 4." },
        { problem: "{{-3 - (-8)}}", steps: [["{{-3 + 8}}", "Keep −3, change the minus to plus, change −8 to +8."], ["{{5}}", "Different signs: 8 − 3 = 5, and 8 is positive."]], check: "Taking away a debt of 8 is like being given 8." }
      ],
      tip: "Two signs next to each other? Same signs make a plus: {{-(-4) = +4}}. Different signs make a minus: {{+(-4) = -4}}."
    },
    {
      title: "Multiplying and dividing integers",
      text: `Multiply or divide the numbers as usual, then decide the sign:`,
      table: {
        head: ["Signs", "Answer is", "Examples"],
        rows: [
          ["same signs (+ and +, or − and −)", "**positive**", "{{3 * 4 = 12}}; {{(-3)(-4) = 12}}; {{-20 / (-5) = 4}}"],
          ["different signs (+ and −)", "**negative**", "{{(-3)(4) = -12}}; {{20 / (-5) = -4}}"]
        ],
        caption: "Parentheses next to each other mean multiply: {{(-3)(-4)}} means −3 times −4."
      },
      after: `With more than two numbers, count the negatives: an **even** number of negatives gives a positive answer, an **odd** number gives a negative one. {{(-2)(-3)(-1) = -6}} has three negatives, so it's negative.`,
      worked: [
        { problem: "{{(-7)(-6)}}", steps: [["{{7 * 6 = 42}}", "Multiply the numbers."], ["Both are negative (same signs), so the answer is positive: {{42}}"]] },
        { problem: "{{-36 / 4}}", steps: [["{{36 / 4 = 9}}", "Divide the numbers."], ["Different signs, so the answer is negative: {{-9}}"]] }
      ]
    }
  ],
  tasks: [
    {
      id: "t1", type: "quiz", title: "Reading the number line",
      questions: [
        { q: "Which is colder: **−12°F** or **−4°F**?", choices: [["−12°F", true], ["−4°F", false]], keepOrder: true },
        { q: "Which statement is true?", choices: [["{{-5 < -1}}", true], ["{{-5 > -1}}", false], ["{{-5 = -1}}", false]] },
        { q: "What is {{|-9|}}?", choices: [["{{9}}", true], ["{{-9}}", false], ["{{0}}", false]], keepOrder: true },
        { q: "What is the opposite of {{-14}}?", choices: [["{{14}}", true], ["{{-14}}", false], ["{{0}}", false], ["{{1/14}}", false]] },
        { q: "A submarine is at **−300 feet**. Another is at **−450 feet**. Which is closer to the surface?", choices: [["the one at −300 feet", true], ["the one at −450 feet", false]], keepOrder: true }
      ],
      hints: ["Picture the number line: farther right means greater (and warmer, and higher).", "Absolute value is distance from zero, so it's never negative."]
    },
    {
      id: "t2", type: "solve", title: "Adding integers", pick: 6,
      intro: "Find each sum. Type a negative answer with a minus sign, like **-7**.",
      items: [
        { q: "{{-4 + (-9)}}", a: "-13", from: "-4 + (-9)", how: ["Same signs: add 4 + 9 = 13.", "Both are negative, so the answer is **−13**."] },
        { q: "{{-12 + 5}}", a: "-7", from: "-12 + 5", how: ["Different signs: 12 − 5 = 7.", "12 is farther from zero and it's negative, so **−7**."] },
        { q: "{{8 + (-3)}}", a: "5", from: "8 + (-3)", how: ["Different signs: 8 − 3 = 5.", "8 is positive, so **5**."] },
        { q: "{{-6 + 6}}", a: "0", from: "-6 + 6", how: ["A number plus its opposite is **0**."] },
        { q: "{{-15 + 20}}", a: "5", from: "-15 + 20", how: ["Different signs: 20 − 15 = 5.", "20 is positive, so **5**."] },
        { q: "{{-7 + (-7)}}", a: "-14", from: "-7 + (-7)", how: ["Same signs: 7 + 7 = 14, keep the negative: **−14**."] },
        { q: "{{3 + (-11)}}", a: "-8", from: "3 + (-11)", how: ["Different signs: 11 − 3 = 8.", "11 is negative, so **−8**."] },
        { q: "{{-25 + 40}}", a: "15", from: "-25 + 40", how: ["Different signs: 40 − 25 = 15, and 40 is positive: **15**."] },
        { q: "{{-1 + (-18)}}", a: "-19", from: "-1 + (-18)", how: ["Same signs: 1 + 18 = 19, keep the negative: **−19**."] },
        { q: "{{-30 + 12}}", a: "-18", from: "-30 + 12", how: ["Different signs: 30 − 12 = 18, and 30 is negative: **−18**."] }
      ],
      hints: ["Same signs? Add and keep the sign.", "Different signs? Subtract the smaller from the bigger, and use the sign of the number farther from zero."]
    },
    {
      id: "t3", type: "solve", title: "Subtracting integers", pick: 6,
      intro: "Rewrite each one as adding the opposite, then add. Use paper.",
      items: [
        { q: "{{5 - 9}}", a: "-4", from: "5 - 9", how: ["{{5 + (-9)}}", "Different signs: 9 − 5 = 4, and 9 is negative: **−4**."] },
        { q: "{{-3 - 6}}", a: "-9", from: "-3 - 6", how: ["{{-3 + (-6)}}", "Same signs: **−9**."] },
        { q: "{{4 - (-7)}}", a: "11", from: "4 - (-7)", how: ["Keep, change, change: {{4 + 7}}", "**11**"] },
        { q: "{{-10 - (-4)}}", a: "-6", from: "-10 - (-4)", how: ["{{-10 + 4}}", "Different signs: 10 − 4 = 6, and 10 is negative: **−6**."] },
        { q: "{{-8 - (-8)}}", a: "0", from: "-8 - (-8)", how: ["{{-8 + 8 = 0}}"] },
        { q: "{{0 - 13}}", a: "-13", from: "0 - 13", how: ["{{0 + (-13) = -13}}"] },
        { q: "{{-2 - (-15)}}", a: "13", from: "-2 - (-15)", how: ["{{-2 + 15}}", "15 − 2 = 13, and 15 is positive: **13**."] },
        { q: "{{12 - 20}}", a: "-8", from: "12 - 20", how: ["{{12 + (-20)}}", "20 − 12 = 8, and 20 is negative: **−8**."] },
        { q: "{{-44 - 56}}", a: "-100", from: "-44 - 56", how: ["{{-44 + (-56)}}", "Same signs: 44 + 56 = 100, keep the negative: **−100**."] },
        { q: "{{44 - (-56)}}", a: "100", from: "44 - (-56)", how: ["{{44 + 56}}", "**100**: the Browning temperature drop!"] }
      ],
      hints: ["*Keep* the first number, *change* minus to plus, *change* the sign of the second number.", "Then use the addition rules from Idea 2."]
    },
    {
      id: "t4", type: "sort", title: "Positive or negative?",
      intro: "Don't calculate. Just decide the **sign** of each answer.",
      cats: ["Positive", "Negative"],
      items: [
        ["{{(-6)(-8)}}", 0, "Two negatives multiplied: same signs, so positive."],
        ["{{(-6)(8)}}", 1, "Different signs, so negative."],
        ["{{-45 / 9}}", 1, "Different signs, so negative."],
        ["{{-45 / (-9)}}", 0, "Same signs, so positive."],
        ["{{(-1)(-1)(-1)}}", 1, "Three negatives is an odd number, so negative."],
        ["{{(-2)(-3)(-4)(-5)}}", 0, "Four negatives is an even number, so positive."],
        ["{{72 / (-8)}}", 1, "Different signs, so negative."],
        ["{{(5)(-2)(-10)}}", 0, "Two negatives: even, so positive."]
      ],
      hints: ["Same signs → positive. Different signs → negative.", "With three or more numbers, count the negative signs: even → positive, odd → negative."]
    },
    {
      id: "t5", type: "solve", title: "Multiplying and dividing", pick: 6,
      items: [
        { q: "{{(-7)(5)}}", a: "-35", from: "(-7)(5)", how: ["7 × 5 = 35", "Different signs: **−35**."] },
        { q: "{{(-9)(-4)}}", a: "36", from: "(-9)(-4)", how: ["9 × 4 = 36", "Same signs: **36**."] },
        { q: "{{-56 / 8}}", a: "-7", from: "-56 / 8", how: ["56 ÷ 8 = 7", "Different signs: **−7**."] },
        { q: "{{-81 / (-9)}}", a: "9", from: "-81 / (-9)", how: ["81 ÷ 9 = 9", "Same signs: **9**."] },
        { q: "{{(-3)(-2)(-5)}}", a: "-30", from: "(-3)(-2)(-5)", how: ["3 × 2 × 5 = 30", "Three negatives (odd): **−30**."] },
        { q: "{{48 / (-6)}}", a: "-8", from: "48 / (-6)", how: ["48 ÷ 6 = 8", "Different signs: **−8**."] },
        { q: "{{(-12)(0)}}", a: "0", from: "(-12)(0)", how: ["Anything times 0 is **0**. Zero is neither positive nor negative."] },
        { q: "{{(-1)(-8)(2)}}", a: "16", from: "(-1)(-8)(2)", how: ["1 × 8 × 2 = 16", "Two negatives (even): **16**."] },
        { q: "{{-100 / 25}}", a: "-4", from: "-100 / 25", how: ["100 ÷ 25 = 4", "Different signs: **−4**."] }
      ],
      hints: ["Do the multiplication or division without signs first.", "Then: same signs → positive, different signs → negative."]
    },
    {
      id: "t6", type: "solve", title: "Negative numbers in real life",
      intro: "Write a number expression on paper first, then solve it.",
      items: [
        { q: "In Browning, Montana, it was **44°F** one day and **−56°F** the next. How many degrees did the temperature **drop**?", a: "100", post: "degrees", from: "44 - (-56)", how: ["Change = 44 − (−56).", "Keep, change, change: 44 + 56 = **100** degrees."] },
        { q: "In Spearfish, South Dakota, it was **−4°F**, and then it rose **49 degrees**. What was the new temperature?", a: "45", post: "°F", from: "-4 + 49", how: ["−4 + 49", "Different signs: 49 − 4 = 45, and 49 is positive: **45°F**."] },
        { q: "Maya has **$35** in her account and buys shoes for **$60**. The bank lets her account go negative. What's her balance now?", a: "-25", pre: "$", from: "35 - 60", how: ["35 − 60 = 35 + (−60)", "60 − 35 = 25, and 60 is the 'owing' side, so **−25** (she owes $25)."] },
        { q: "A diver is at **−18 meters** and swims **7 meters up**. What is her new depth?", a: "-11", post: "meters", from: "-18 + 7", how: ["−18 + 7", "18 − 7 = 11, and 18 is negative: **−11** meters."] },
        { q: "A football team loses **4 yards** on each of **3 plays** in a row. What is the total change in yards?", a: "-12", post: "yards", from: "3 * (-4)", how: ["3 × (−4)", "Different signs: **−12** yards."] }
      ],
      hints: ["Going up or gaining is +. Going down, owing or losing is −.", "For the change in temperature, subtract: *new* − *old*, or *higher* − *lower*."]
    },
    {
      id: "t7", type: "selfcheck", title: "How sure do you feel?",
      items: ["Comparing negative numbers", "Adding integers", "Subtracting integers", "Multiplying and dividing integers"],
      tip: "Anything at 1 or 2? Go back to that Idea in Step 2 and redo its worked example on paper. Then tell your teacher. Integers come up in every module, so they're worth getting solid now."
    }
  ],
  build: {
    heading: "Write your own integer story",
    prompt: `Write a short **word problem** that uses at least one **negative number**: weather, money, elevation, sports, a video game, anything. Then **solve it** and explain your steps.

Write the problem, then the math with an equal sign (like *−8 + 15 = 7*), then a sentence that explains the answer.`,
    model: `Problem: At 6 a.m. the temperature in Scranton was −8°F. By noon it had risen 15 degrees. What was the temperature at noon?

Solution: −8 + 15 = 7. The signs are different, so I subtracted 15 − 8 = 7, and the answer is positive because 15 is bigger. So it was 7°F at noon.`,
    placeholder: "Problem: …\n\nSolution: …",
    reqs: [
      { t: "At least 3 sentences", sentences: 3 },
      { t: "Use a negative number (like −8)", re: "(^|[\\s(=+*/])[-−]\\s?\\d" },
      { t: "Show the math with an equal sign", re: "\\d\\s*\\)?\\s*=\\s*[-−]?\\d" },
      { t: "Explain why (use *because* or *so*)", re: "\\b(because|so|since)\\b" }
    ]
  },
  reflect: {
    q: "Think of something hard you got better at: a sport, an instrument, a video game, a language. What actually helped you improve? How could you use that same approach in Algebra 1 this year?",
    placeholder: "I got better at… What helped was… In algebra I could…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "Order and signs",
      intro: "Careful: these mix operations. Multiply and divide before you add and subtract.",
      items: [
        { q: "{{-2 - 3 * (-4)}}", a: "10", from: "-2 - 3*(-4)", how: ["Multiply first: 3 × (−4) = −12.", "−2 − (−12) = −2 + 12 = **10**."] },
        { q: "{{(-3)^2}} (that's −3 times −3)", a: "9", from: "(-3)^2", how: ["(−3)(−3) = **9**"] },
        { q: "{{-3^2}} (the exponent goes with the 3 only)", a: "-9", from: "-3^2", how: ["3² = 9 first, then the negative: **−9**. This is why the parentheses matter."] },
        { q: "{{(-1)^101}}", a: "-1", from: "(-1)^101", how: ["101 negatives multiplied together: odd, so **−1**."] },
        { q: "{{-18 / (-3) - 4 * (-2) + (-11)}}", a: "3", from: "-18/(-3) - 4*(-2) + (-11)", how: ["−18 ÷ (−3) = 6, and 4 × (−2) = −8.", "6 − (−8) + (−11) = 6 + 8 − 11 = **3**."] }
      ],
      hints: ["Do every multiplication and division first, left to right. Then add and subtract.", "{{(-3)^2}} squares −3. {{-3^2}} squares 3 and then makes it negative."]
    },
    {
      id: "x2", type: "quiz", title: "Always, sometimes or never?",
      intro: "Think about lots of examples, including tricky ones like 0 and negatives.",
      questions: [
        { q: "The sum of two negative numbers is negative.", choices: [["always", true, "Owing plus owing is always owing."], ["sometimes", false], ["never", false]], keepOrder: true },
        { q: "The sum of a positive and a negative number is positive.", choices: [["sometimes", true, "Right: 5 + (−2) is positive, but 2 + (−5) is negative."], ["always", false], ["never", false]], keepOrder: true },
        { q: "Subtracting a negative number makes the answer bigger than the number you started with.", choices: [["always", true, "Subtracting −n is the same as adding n."], ["sometimes", false], ["never", false]], keepOrder: true },
        { q: "If {{a * b}} is negative and {{a + b}} is positive, then…", choices: [["the positive number has the bigger absolute value", true, "The product being negative means one is positive and one negative; the sum being positive means the positive one wins."], ["both numbers are negative", false], ["both numbers are positive", false], ["one of them is 0", false]] }
      ]
    },
    {
      id: "x3", type: "solve", title: "Record breakers",
      items: [
        { q: "In Spearfish the temperature rose from **−4°F** to **45°F** in **2 minutes**. On average, how many degrees per minute is that?", a: "24.5|49/2", post: "degrees per minute", from: "(45 - (-4)) / 2", how: ["Change: 45 − (−4) = 49 degrees.", "Per minute: 49 ÷ 2 = **24.5**."] },
        { q: "The highest point in the lower 48 states is Mount Whitney, **14,505 ft**. The lowest is Badwater Basin in Death Valley, **−282 ft**. What's the difference in elevation?", a: "14787", post: "feet", from: "14505 - (-282)", how: ["14,505 − (−282) = 14,505 + 282 = **14,787 feet**."] }
      ]
    }
  ],
  culture: "**Did you know?** Negative numbers took a long time to be accepted. Chinese mathematicians used red counting rods for positive numbers and black for negative more than 2,000 years ago, and the Indian mathematician Brahmagupta wrote rules for them in AD 628. But many European mathematicians called them \"absurd\" until the 1600s.",
  teacher: {
    snags: [
      ["Tasks 2–5", "Types *−7* with a different dash, or *- 7*", "All dash characters and spaces are accepted."],
      ["Task 6", "Types *25* for Maya's balance", "Ask: does she *have* $25 or *owe* $25? Owing is negative."],
      ["Challenge x1", "Says {{-3^2}} = 9", "The exponent applies to 3 only; this returns in M3 (order of operations)."]
    ],
    factcheck: "Browning, MT: 44°F to −56°F, January 23–24, 1916, the U.S. record 24-hour drop (National Weather Service). Spearfish, SD: −4°F at 7:30 a.m. to 45°F at 7:32 a.m. on January 22, 1943, the world record 2-minute rise (NWS Rapid City). Mount Whitney 14,505 ft; Badwater Basin −282 ft (USGS/NPS). Red and black counting rods: *The Nine Chapters on the Mathematical Art*; Brahmagupta's *Brāhmasphuṭasiddhānta* (628)."
  }
};

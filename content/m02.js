module.exports = {
  num: 2, unit: 1, slug: "m02-fractions-decimals", minutes: 35, calculator: "not needed",
  title: "Fractions and Decimals",
  subtitle: "Simplifying, the four operations, and negative fractions",
  lede: "Fractions show up everywhere in algebra: in slopes, in equations, in answers. This week you'll make them less scary by using the same few rules every time.",
  recap: "Same signs add and keep the sign; different signs subtract. Subtracting is adding the opposite. When multiplying or dividing, same signs give a positive and different signs a negative.",
  goals: [
    "Simplify fractions and switch between fractions and decimals",
    "Add and subtract fractions with a common denominator",
    "Multiply and divide fractions (keep, change, flip)",
    "Work with negative fractions and decimals"
  ],
  context: {
    title: "The oldest math homework",
    place: "Thebes, Egypt · about 1550 BC",
    text: `In **1858**, a young Scottish lawyer named **Alexander Henry Rhind** bought a papyrus scroll in Luxor, Egypt. It turned out to be a math textbook more than **3,500 years old**, copied by a scribe named **Ahmes**. Today it's called the **Rhind Mathematical Papyrus**, and it's in the British Museum.

Ahmes begins by promising "a thorough study of all things." Then come **84 problems**, many about sharing bread and beer fairly. Problem 6 asks how to share **9 loaves among 10 workers**. Each worker gets 9/10 of a loaf, but Egyptians didn't write 9/10. They wrote fractions only as sums of *different* unit fractions (1 over something), with one exception, 2/3:

> 9/10 = 2/3 + 1/5 + 1/30

That's a lot of work just to write one fraction! Our system, with a numerator and a denominator, is much easier, and the rules for using it haven't changed in centuries.`,
    ask: "If 10 workers share 9 loaves, does each worker get more or less than one loaf? How do you know without calculating?"
  },
  learn: [
    {
      title: "Simplifying, and fractions as decimals",
      refresher: true,
      text: `A fraction is **in lowest terms** when the top and bottom have no common factor except 1. To simplify, divide the top and bottom by their **greatest common factor**: {{18/24}} → divide both by 6 → {{3/4}}.

To turn a fraction into a decimal, divide the top by the bottom: {{3/4 = 3 / 4 = 0.75}}. Some are worth memorizing:`,
      table: {
        head: ["Fraction", "{{1/2}}", "{{1/4}}", "{{3/4}}", "{{1/5}}", "{{1/10}}", "{{1/3}}", "{{2/3}}"],
        rows: [["Decimal", "0.5", "0.25", "0.75", "0.2", "0.1", "0.333…", "0.666…"]]
      },
      after: `**Negative fractions:** the minus sign can go in front, on top or on the bottom. It's the same number: {{-3/4 = (-3)/4 = 3/(-4) = -0.75}}. We usually write it in front.`
    },
    {
      title: "Adding and subtracting fractions",
      text: `You can only add or subtract fractions with the **same denominator** (same-size pieces). If the denominators are different, rewrite the fractions first, using a **common denominator**. Then add or subtract the **tops** and keep the bottom.

**Never add the bottoms.** {{1/2 + 1/3}} is not {{2/5}}: half a pizza plus a third of a pizza is more than half, but 2/5 is less than half.`,
      worked: [
        { problem: "{{2/3 + 1/4}}", steps: [["{{8/12 + 3/12}}", "A common denominator for 3 and 4 is 12. Multiply top and bottom: 2/3 = 8/12 and 1/4 = 3/12."], ["{{11/12}}", "Add the tops, keep the bottom. 11/12 can't be simplified."]] },
        { problem: "{{-1/2 + 3/5}}", steps: [["{{-5/10 + 6/10}}", "Common denominator 10."], ["{{1/10}}", "−5 + 6 = 1 (integer rules from Module 1)."]] }
      ],
      check: { q: "What is {{1/2 + 1/3}}?", choices: [["{{5/6}}", true, "Yes: 3/6 + 2/6 = 5/6."], ["{{2/5}}", false, "That adds the bottoms. Half plus a third must be more than half!"], ["{{2/6}}", false, "Use a common denominator of 6 for both fractions: 3/6 + 2/6."]] }
    },
    {
      title: "Multiplying and dividing fractions",
      text: `**Multiplying** is the easy one: multiply top times top and bottom times bottom, then simplify. No common denominator needed.

**Dividing:** keep the first fraction, change ÷ to ×, and flip the second fraction (use its **reciprocal**). *Keep, change, flip.*

The integer sign rules still apply: same signs give a positive answer, different signs a negative one.`,
      worked: [
        { problem: "{{(-2/3)(9/10)}}", steps: [["{{-18/30}}", "Top: 2 × 9 = 18. Bottom: 3 × 10 = 30. Different signs, so negative."], ["{{-3/5}}", "Divide top and bottom by 6."]] },
        { problem: "{{3/4 / (-1/2)}}", steps: [["{{3/4 * (-2/1)}}", "Keep 3/4, change ÷ to ×, flip −1/2 to −2/1."], ["{{-6/4 = -3/2}}", "Multiply and simplify. As a decimal, −1.5."]] }
      ],
      tip: "Simplify before you multiply to keep numbers small: in {{(4/9)(3/8)}}, the 4 and 8 share a 4, and the 3 and 9 share a 3, so it's {{(1/3)(1/2) = 1/6}}."
    }
  ],
  tasks: [
    {
      id: "t1", type: "match", title: "Fraction and decimal partners", left: "Fraction", right: "Decimal",
      pairs: [["{{1/2}}", "0.5"], ["{{1/4}}", "0.25"], ["{{3/4}}", "0.75"], ["{{1/5}}", "0.2"], ["{{2/5}}", "0.4"], ["{{1/8}}", "0.125"], ["{{3/2}}", "1.5"], ["{{-1/10}}", "−0.1"]],
      hints: ["Divide the top by the bottom.", "{{1/8}} is half of {{1/4}}, so it's half of 0.25."]
    },
    {
      id: "t2", type: "solve", title: "Lowest terms", pick: 6,
      intro: "Write each fraction in lowest terms, as a fraction. Type a fraction with a slash, like **3/4**.",
      items: [
        { q: "{{9/12}}", a: "#3/4", from: "9/12", how: ["9 and 12 share a factor of 3.", "9 ÷ 3 = 3, 12 ÷ 3 = 4: **3/4**"] },
        { q: "{{20/30}}", a: "#2/3", from: "20/30", how: ["Divide top and bottom by 10: **2/3**"] },
        { q: "{{16/40}}", a: "#2/5", from: "16/40", how: ["16 and 40 share 8.", "16 ÷ 8 = 2, 40 ÷ 8 = 5: **2/5**"] },
        { q: "{{35/50}}", a: "#7/10", from: "35/50", how: ["Divide by 5: **7/10**"] },
        { q: "{{-8/12}}", a: "#-2/3", from: "-8/12", how: ["Divide by 4: **−2/3**. The sign stays."] },
        { q: "{{6/42}}", a: "#1/7", from: "6/42", how: ["Divide by 6: **1/7**"] },
        { q: "{{45/60}}", a: "#3/4", from: "45/60", how: ["Divide by 15 (or by 5, then by 3): **3/4**"] },
        { q: "{{14/(-21)}}", a: "#-2/3", from: "14/(-21)", how: ["Divide by 7: 2/(−3), which we write **−2/3**."] }
      ],
      hints: ["Find a number that divides both the top and the bottom. Try 2, 3, 5 and 10.", "Keep dividing until the only common factor is 1."]
    },
    {
      id: "t3", type: "solve", title: "Adding and subtracting fractions", pick: 5,
      intro: "Give each answer as a fraction in lowest terms (or a whole number).",
      items: [
        { q: "{{1/3 + 1/6}}", a: "1/2", from: "1/3 + 1/6", how: ["{{2/6 + 1/6 = 3/6}}", "Simplify: **1/2**"] },
        { q: "{{3/4 - 1/2}}", a: "1/4", from: "3/4 - 1/2", how: ["{{3/4 - 2/4 = 1/4}}"] },
        { q: "{{2/5 + 1/2}}", a: "9/10", from: "2/5 + 1/2", how: ["{{4/10 + 5/10 = 9/10}}"] },
        { q: "{{-3/8 + 1/4}}", a: "-1/8", from: "-3/8 + 1/4", how: ["{{-3/8 + 2/8}}", "−3 + 2 = −1: **−1/8**"] },
        { q: "{{5/6 - 4/3}}", a: "-1/2", from: "5/6 - 4/3", how: ["{{5/6 - 8/6 = -3/6}}", "Simplify: **−1/2**"] },
        { q: "{{-1/2 - 1/3}}", a: "-5/6", from: "-1/2 - 1/3", how: ["{{-3/6 - 2/6}}", "Same signs: **−5/6**"] },
        { q: "{{7/10 + 3/10}}", a: "1", from: "7/10 + 3/10", how: ["Same denominator already: {{10/10 = 1}}"] },
        { q: "{{2 - 3/4}}", a: "5/4", from: "2 - 3/4", how: ["Write 2 as {{8/4}}.", "{{8/4 - 3/4 = 5/4}} (or 1 1/4)"] }
      ],
      hints: ["Find a common denominator first. Multiplying the two denominators always works.", "Add or subtract only the tops. Then simplify."]
    },
    {
      id: "t4", type: "solve", title: "Multiplying and dividing fractions", pick: 5,
      intro: "Give each answer as a fraction in lowest terms (or a whole number).",
      items: [
        { q: "{{(2/3)(3/5)}}", a: "2/5", from: "(2/3)(3/5)", how: ["{{6/15}}", "Simplify: **2/5**"] },
        { q: "{{(-1/4)(8/9)}}", a: "-2/9", from: "(-1/4)(8/9)", how: ["{{-8/36}}", "Simplify by 4: **−2/9**"] },
        { q: "{{1/2 / 1/4}}", a: "2", from: "(1/2)/(1/4)", how: ["Keep, change, flip: {{1/2 * 4/1 = 4/2}}", "**2** (there are two quarters in a half)"] },
        { q: "{{-3/5 / (3/10)}}", a: "-2", from: "(-3/5)/(3/10)", how: ["{{-3/5 * 10/3 = -30/15}}", "**−2**"] },
        { q: "{{(-5/6)(-3/10)}}", a: "1/4", from: "(-5/6)(-3/10)", how: ["{{15/60}}", "Same signs, positive. Simplify by 15: **1/4**"] },
        { q: "{{6 * 2/3}}", a: "4", from: "6*(2/3)", how: ["{{6/1 * 2/3 = 12/3}}", "**4**"] },
        { q: "{{2/3 / (-4)}}", a: "-1/6", from: "(2/3)/(-4)", how: ["{{2/3 * (-1/4) = -2/12}}", "**−1/6**"] },
        { q: "{{(7/8) / (7/2)}}", a: "1/4", from: "(7/8)/(7/2)", how: ["{{7/8 * 2/7 = 14/56}}", "**1/4**"] }
      ],
      hints: ["Multiplying: top × top, bottom × bottom.", "Dividing: keep the first, change ÷ to ×, flip the second."]
    },
    {
      id: "t5", type: "mistake", title: "Spot the slip",
      intro: "Each student made one mistake. Tap the **first line** that's wrong.",
      items: [
        { q: "{{1/2 + 2/3}}", lines: ["{{1/2 + 2/3 = (1 + 2)/(2 + 3)}}", "{{= 3/5}}"], bad: 0, why: "They added the bottoms. Use a common denominator: {{3/6 + 4/6 = 7/6}}.", a: "7/6", ask: "The right answer:", from: "1/2 + 2/3" },
        { q: "{{3/4 / (1/2)}}", lines: ["{{3/4 * 1/2}}", "{{3/8}}"], bad: 0, why: "They forgot to flip the second fraction. It should be {{3/4 * 2/1 = 6/4 = 3/2}}.", a: "3/2", from: "(3/4)/(1/2)" },
        { q: "{{-2/5 - 1/5}}", lines: ["{{-2/5 + (-1/5)}}", "{{-1/5}}"], bad: 1, why: "Same signs: add and keep the negative. {{-2/5 + (-1/5) = -3/5}}.", a: "-3/5", from: "-2/5 - 1/5" },
        { q: "Simplify {{12/18}}", lines: ["Divide top and bottom by 3: {{4/6}}", "Divide top and bottom by 3 again: {{4/2}}"], bad: 1, why: "4 isn't divisible by 3. Divide 4/6 by 2 instead: {{2/3}}.", a: "#2/3", from: "12/18" }
      ],
      hints: ["Check each line: does it really follow from the one before it?", "The common mistakes: adding denominators, forgetting to flip, and sign errors."]
    },
    {
      id: "t6", type: "solve", title: "Fractions at work",
      intro: "Write the expression on paper first. Decimals are fine where the problem uses decimals.",
      items: [
        { q: "Ahmes's Problem 6: **9 loaves** are shared equally among **10 workers**. What fraction of a loaf does each get?", a: "9/10|0.9", post: "of a loaf", from: "9/10", how: ["Sharing means dividing: 9 ÷ 10 = **9/10**."] },
        { q: "A recipe needs {{3/4}} cup of flour. You're making **half** the recipe. How much flour do you need?", a: "3/8", post: "cup", from: "(1/2)(3/4)", how: ["Half of 3/4 means {{1/2 * 3/4}}.", "**3/8** cup"] },
        { q: "You have {{2/3}} of a pizza and eat {{1/4}} of a whole pizza. How much pizza is left?", a: "5/12", post: "of a pizza", from: "2/3 - 1/4", how: ["{{2/3 - 1/4 = 8/12 - 3/12}}", "**5/12**"] },
        { q: "A stock's price changed by **−$1.25** each day for **4 days**. What was the total change?", a: "-5", pre: "$", from: "4*(-1.25)", how: ["4 × (−1.25) = **−5**"] },
        { q: "A ribbon is {{6}} feet long. How many {{3/4}}-foot pieces can you cut from it?", a: "8", post: "pieces", from: "6/(3/4)", how: ["{{6 / 3/4 = 6 * 4/3}}", "{{24/3 = 8}} pieces"] }
      ],
      hints: ["*Of* usually means multiply. *How many pieces* means divide.", "*Left* means subtract."]
    }
  ],
  build: {
    heading: "Teach it: adding fractions",
    prompt: `Imagine a friend thinks {{1/2 + 1/4 = 2/6}}. Write a short explanation that helps them. Use **your own example** (not 1/2 + 1/4), show the math with an equal sign, and explain **why** you need a common denominator.`,
    model: `You can't add the bottoms, because the bottom tells you the size of the pieces. For example, 1/3 + 1/6: thirds and sixths are different sizes, so I change 1/3 into 2/6. Then 2/6 + 1/6 = 3/6, which simplifies to 1/2. That makes sense, because a third of a pizza plus a sixth is half the pizza.`,
    placeholder: "You can't add the bottoms, because…",
    reqs: [
      { t: "At least 3 sentences", sentences: 3 },
      { t: "Use at least 3 fractions (like 2/6)", re: "\\d+\\s*/\\s*\\d+", min: 3 },
      { t: "Show the math with an equal sign", re: "\\d\\s*=\\s*[-−]?\\d" },
      { t: "Use the word *denominator*, *bottom* or *pieces*", re: "\\b(denominators?|bottoms?|pieces?)\\b" }
    ]
  },
  reflect: {
    q: "For a lot of people, fractions are where math first started to feel confusing. What's your history with fractions? Name one thing that makes sense to you now, and one thing you still want to practice.",
    placeholder: "Fractions used to… Now I understand… I still want to practice…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "Fraction workouts",
      items: [
        { q: "{{(2/3 - 3/4) / (5/6)}}", a: "-1/10", from: "(2/3 - 3/4)/(5/6)", how: ["Top: {{8/12 - 9/12 = -1/12}}", "{{-1/12 * 6/5 = -6/60 = -1/10}}"] },
        { q: "{{(-1 1/2)(2 2/3)}} (change the mixed numbers to fractions first)", a: "-4", from: "(-3/2)(8/3)", how: ["{{-3/2 * 8/3 = -24/6}}", "**−4**"] },
        { q: "{{1 / (1 + 1/2)}}", a: "2/3", from: "1/(1 + 1/2)", how: ["Bottom: {{1 + 1/2 = 3/2}}", "{{1 / (3/2) = 2/3}}"] },
        { q: "{{1/2 + 1/4 + 1/8 + 1/16}}", a: "15/16", from: "1/2 + 1/4 + 1/8 + 1/16", how: ["Everything in sixteenths: {{8/16 + 4/16 + 2/16 + 1/16}}", "**15/16**. Keep going forever and you'd get closer and closer to 1."] }
      ]
    },
    {
      id: "x2", type: "cloze", title: "Think like Ahmes",
      intro: "Egyptian scribes wrote every fraction as a sum of *different* unit fractions (1 over a whole number). Fill in the missing denominators.",
      items: [
        "{{3/4 = 1/2 + 1/}}[4]",
        "{{2/5 = 1/3 + 1/}}[15]",
        "{{5/6 = 1/2 + 1/}}[3]",
        "{{7/12 = 1/3 + 1/}}[4]",
        "{{9/10 = 2/3 + 1/5 + 1/}}[30]"
      ],
      hints: ["Subtract: for 2/5, find {{2/5 - 1/3}}. The answer is 1 over the missing number."]
    }
  ],
  culture: "**Did you know?** The word *fraction* comes from the Latin *frangere*, to break, the same root as *fracture* and *fragile*. A fraction is a broken number.",
  teacher: {
    snags: [
      ["Task 2", "Types *0.75* and gets yellow", "This task asks for a fraction; *3/4* is marked right. Elsewhere, equal decimals count."],
      ["Task 3", "Types *5/4* as *1 1/4*", "Mixed numbers with a space are accepted."],
      ["Challenge x2", "Types *1/15* instead of *15*", "Only the missing denominator goes in the box; the *1/* is printed."]
    ],
    factcheck: "Rhind Mathematical Papyrus: bought by A. H. Rhind in Luxor in 1858; British Museum EA 10057–8; copied by the scribe Ahmes (Ahmose) around 1550 BC from an older text; 84 problems by the usual count. Problem 6 (9 loaves among 10 men) gives 2/3 + 1/5 + 1/30. *Frangere* is the Latin root of *fraction*."
  }
};

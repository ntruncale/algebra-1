module.exports = {
  num: 7, unit: 2, slug: "m07-two-step-equations", minutes: 35, calculator: "not needed",
  title: "Two-Step Equations",
  subtitle: "Undo in reverse order, and turn word problems into equations",
  lede: "Most equations take more than one move. The trick is doing the moves in the right order: backwards from the order of operations.",
  recap: "One-step equations: use the inverse operation on both sides. Check by substituting into the original equation.",
  goals: [
    "Solve two-step equations by undoing operations in reverse order",
    "Solve two-step equations with negatives and fractions",
    "Write and solve two-step equations for word problems"
  ],
  context: {
    title: "The teacher of Alexandria",
    place: "Alexandria, Egypt · about AD 400",
    text: `**Hypatia** of Alexandria was one of the most famous teachers of the ancient world. People traveled across the Mediterranean to hear her lectures on mathematics, astronomy and philosophy. She's the first woman mathematician whose life is well documented.

Hypatia wrote commentaries (study guides) on the hardest math books of her time, including the *Arithmetica* of **Diophantus**, a mathematician who lived in Alexandria about 150 years before her. Diophantus was one of the first to use **symbols** for unknowns, and he's sometimes called "the father of algebra."

Nobody knows much about Diophantus's life, except for a riddle said to be carved on his tomb. It begins: *"Here lies Diophantus. God gave him his boyhood one-sixth of his life, one-twelfth more as a youth…"* The riddle is really an equation, and solving it tells you how old he was when he died. You'll be able to crack it in the Challenge at the end of this module.`,
    ask: "Putting on socks then shoes is two steps. To undo it, which comes off first? How might that help with equations?"
  },
  learn: [
    {
      title: "Undo in reverse order",
      text: `In {{3x + 5}}, the order of operations says: first multiply x by 3, then add 5. To get x back, **undo in reverse**: first subtract 5, then divide by 3. (Like socks and shoes: shoes come off first.)

So for a two-step equation:
1. **Add or subtract** to get the variable term alone.
2. **Multiply or divide** to get the variable alone.`,
      worked: [
        { problem: "{{3x + 5 = 20}}", steps: [["{{3x + 5 - 5 = 20 - 5}}", "Undo the +5 first."], ["{{3x = 15}}"], ["{{x = 5}}", "Divide both sides by 3."]], check: "{{3(5) + 5 = 20}} ✓", eq: "3x + 5 = 20", answer: "5" },
        { problem: "{{x/4 - 2 = 3}}", steps: [["{{x/4 = 5}}", "Add 2 to both sides."], ["{{x = 20}}", "Multiply both sides by 4."]], check: "{{20/4 - 2 = 3}} ✓", eq: "x/4 - 2 = 3", answer: "20" }
      ]
    },
    {
      title: "Negatives and fractions",
      text: `The same two steps work every time. Just keep careful track of signs.

When the variable has a negative coefficient, like {{-2x}}, divide by the negative number. When the whole left side is divided, like {{(x + 3)/2}}, the **fraction bar is a grouping symbol**: multiply first, then subtract.`,
      worked: [
        { problem: "{{-2x + 7 = -5}}", steps: [["{{-2x = -12}}", "Subtract 7 from both sides."], ["{{x = 6}}", "Divide both sides by −2. Negative ÷ negative is positive."]], check: "{{-2(6) + 7 = -12 + 7 = -5}} ✓", eq: "-2x + 7 = -5", answer: "6" },
        { problem: "{{(x + 3)/2 = 5}}", steps: [["{{x + 3 = 10}}", "The whole top is divided by 2, so multiply both sides by 2 first."], ["{{x = 7}}", "Subtract 3."]], eq: "(x + 3)/2 = 5", answer: "7" },
        { problem: "{{8 - x = 11}}", steps: [["{{-x = 3}}", "Subtract 8 from both sides. Careful: it's −x, not x."], ["{{x = -3}}", "Multiply both sides by −1."]], check: "{{8 - (-3) = 11}} ✓", eq: "8 - x = 11", answer: "-3" }
      ]
    },
    {
      title: "Word problems",
      text: `Many real situations have a **starting amount** plus a **rate** times a variable:

> A gym charges a **$25** sign-up fee plus **$10** per visit. You've spent **$95**. How many visits?

1. **Name the unknown:** let {{v}} = the number of visits.
2. **Write the equation:** {{25 + 10v = 95}}.
3. **Solve:** {{10v = 70}}, so {{v = 7}}.
4. **Answer in words, and check:** 7 visits. {{25 + 10(7) = 95}} ✓`,
      check: { q: "A taxi charges **$3** plus **$2 per mile**. The ride cost **$19**. Which equation fits?", choices: [["{{3 + 2m = 19}}", true, "Start amount 3, plus 2 for each mile."], ["{{2 + 3m = 19}}", false, "The $2 is the per-mile part, so it goes with m."], ["{{5m = 19}}", false, "The $3 is charged once, not every mile."]] }
    }
  ],
  tasks: [
    {
      id: "t1", type: "steps", title: "Put the steps in order",
      intro: "Arrange the steps for solving {{4x - 7 = 13}}.",
      items: ["{{4x - 7 = 13}}", "{{4x - 7 + 7 = 13 + 7}}", "{{4x = 20}}", "{{(4x)/4 = 20/4}}", "{{x = 5}}"],
      hints: ["Undo the subtraction before the multiplication."]
    },
    {
      id: "t2", type: "solve", title: "Two steps", pick: 6,
      items: [
        { q: "{{2x + 3 = 11}}", a: "4", pre: "x =", eq: "2x + 3 = 11", how: ["Subtract 3: {{2x = 8}}", "Divide by 2: **x = 4**"] },
        { q: "{{5y - 4 = 21}}", a: "5", pre: "y =", eq: "5y - 4 = 21", how: ["Add 4: {{5y = 25}}", "Divide by 5: **y = 5**"] },
        { q: "{{3n + 10 = 1}}", a: "-3", pre: "n =", eq: "3n + 10 = 1", how: ["Subtract 10: {{3n = -9}}", "Divide by 3: **n = −3**"] },
        { q: "{{x/3 + 4 = 6}}", a: "6", pre: "x =", eq: "x/3 + 4 = 6", how: ["Subtract 4: {{x/3 = 2}}", "Multiply by 3: **x = 6**"] },
        { q: "{{7 = 4k - 9}}", a: "4", pre: "k =", eq: "7 = 4k - 9", how: ["Add 9: {{16 = 4k}}", "Divide by 4: **k = 4**"] },
        { q: "{{6a + 1.5 = 7.5}}", a: "1", pre: "a =", eq: "6a + 1.5 = 7.5", how: ["Subtract 1.5: {{6a = 6}}", "**a = 1**"] },
        { q: "{{m/2 - 5 = -8}}", a: "-6", pre: "m =", eq: "m/2 - 5 = -8", how: ["Add 5: {{m/2 = -3}}", "Multiply by 2: **m = −6**"] },
        { q: "{{9 + 2x = 0}}", a: "-9/2", pre: "x =", eq: "9 + 2x = 0", how: ["Subtract 9: {{2x = -9}}", "Divide by 2: **x = −9/2** (or −4.5)"] }
      ],
      hints: ["Step 1: add or subtract to get the x term alone.", "Step 2: multiply or divide."]
    },
    {
      id: "t3", type: "solve", title: "Watch the signs", pick: 6,
      items: [
        { q: "{{-3x + 4 = 19}}", a: "-5", pre: "x =", eq: "-3x + 4 = 19", how: ["Subtract 4: {{-3x = 15}}", "Divide by −3: **x = −5**"] },
        { q: "{{-2y - 6 = 8}}", a: "-7", pre: "y =", eq: "-2y - 6 = 8", how: ["Add 6: {{-2y = 14}}", "Divide by −2: **y = −7**"] },
        { q: "{{10 - x = 4}}", a: "6", pre: "x =", eq: "10 - x = 4", how: ["Subtract 10: {{-x = -6}}", "**x = 6**"] },
        { q: "{{(x + 3)/2 = -4}}", a: "-11", pre: "x =", eq: "(x + 3)/2 = -4", how: ["Multiply by 2: {{x + 3 = -8}}", "Subtract 3: **x = −11**"] },
        { q: "{{(x - 1)/5 = 2}}", a: "11", pre: "x =", eq: "(x - 1)/5 = 2", how: ["Multiply by 5: {{x - 1 = 10}}", "**x = 11**"] },
        { q: "{{-x/4 + 1 = 3}}", a: "-8", pre: "x =", eq: "-x/4 + 1 = 3", how: ["Subtract 1: {{-x/4 = 2}}", "Multiply by −4: **x = −8**"] },
        { q: "{{2/3 x - 1 = 5}}", a: "9", pre: "x =", eq: "(2/3)x - 1 = 5", how: ["Add 1: {{2/3 x = 6}}", "Multiply by 3/2: **x = 9**"] },
        { q: "{{-12 = 6 - 3n}}", a: "6", pre: "n =", eq: "-12 = 6 - 3n", how: ["Subtract 6: {{-18 = -3n}}", "Divide by −3: **n = 6**"] }
      ],
      hints: ["A negative coefficient stays with the variable until you divide.", "If the whole top is divided, multiply first."]
    },
    {
      id: "t4", type: "mistake", title: "Find the error",
      intro: "Tap the **first wrong line**, then give the correct solution.",
      items: [
        { q: "Solve {{2x + 6 = 14}}", lines: ["{{2x = 14 - 6}}", "{{2x = 8}}", "{{x = 8 - 2}}", "{{x = 6}}"], bad: 2, why: "2x means 2 **times** x, so divide by 2: {{x = 4}}.", a: "4", pre: "x =", eq: "2x + 6 = 14" },
        { q: "Solve {{3x - 5 = 10}}", lines: ["{{3x = 5}}", "{{x = 5/3}}"], bad: 0, why: "To undo −5, **add** 5: {{3x = 15}}, so {{x = 5}}.", a: "5", pre: "x =", eq: "3x - 5 = 10" },
        { q: "Solve {{-4x + 2 = 18}}", lines: ["{{-4x = 16}}", "{{x = 4}}"], bad: 1, why: "16 ÷ (−4) is negative: {{x = -4}}.", a: "-4", pre: "x =", eq: "-4x + 2 = 18" },
        { q: "Solve {{x/2 + 3 = 7}}", lines: ["{{x + 3 = 14}}", "{{x = 11}}"], bad: 0, why: "Only x is divided by 2, not the 3. Subtract 3 first: {{x/2 = 4}}, so {{x = 8}}.", a: "8", pre: "x =", eq: "x/2 + 3 = 7" }
      ]
    },
    {
      id: "t5", type: "order", title: "Words to equations",
      intro: "Build the equation. Use **x** for the unknown number.",
      items: [
        { q: "Five more than twice a number is 17.", a: "2x + 5 = 17", alt: ["5 + 2x = 17"], extra: ["5x"] },
        { q: "Three less than four times a number is 9.", a: "4x - 3 = 9", extra: ["3 - 4x"] },
        { q: "A number divided by 6, plus 2, is 10.", a: "x/6 + 2 = 10", alt: ["2 + x/6 = 10"], extra: ["6x"] },
        { q: "Seven minus three times a number is −8.", a: "7 - 3x = -8", extra: ["3x - 7"] }
      ],
      hints: ["*More than* means add. *Less than* means subtract, with the order flipped.", "*Is* means equals."]
    },
    {
      id: "t6", type: "solve", title: "Real-world two-steps",
      intro: "Write an equation on paper, solve it, and check.",
      items: [
        { q: "A gym charges a **$25** fee plus **$10** per visit. You spent **$95**. How many visits?", a: "7", post: "visits", eq: "25 + 10v = 95", how: ["{{25 + 10v = 95}}", "{{10v = 70}}, so **7 visits**"] },
        { q: "A plumber charges **$60** to come out plus **$45** an hour. The bill was **$240**. How many hours?", a: "4", post: "hours", eq: "60 + 45h = 240", how: ["{{60 + 45h = 240}}", "{{45h = 180}}, so **4 hours**"] },
        { q: "You have **$200** and spend **$15** a week. After how many weeks will you have **$80** left?", a: "8", post: "weeks", eq: "200 - 15w = 80", how: ["{{200 - 15w = 80}}", "{{-15w = -120}}, so **8 weeks**"] },
        { q: "A submarine at **−40 m** dives **12 m per minute**. When will it reach **−160 m**?", a: "10", post: "minutes", eq: "-40 - 12t = -160", how: ["{{-40 - 12t = -160}}", "{{-12t = -120}}, so **10 minutes**"] }
      ],
      hints: ["Starting amount + (rate × variable) = total.", "Spending or diving down means the rate is negative."]
    }
  ],
  build: {
    heading: "Write a two-step word problem",
    prompt: `Write a word problem that needs a **two-step equation**: something with a **starting amount** and a **rate** (a fee plus a cost per item, savings plus a weekly amount, and so on). Then give the **equation**, **solve it in two steps**, and **check** your answer.`,
    model: `Problem: A bowling alley charges $4 for shoes and $6 per game. Maria spent $28. How many games did she bowl?
Equation: 4 + 6g = 28
Step 1: subtract 4 from both sides, so 6g = 24.
Step 2: divide both sides by 6, so g = 4. She bowled 4 games.
Check: 4 + 6(4) = 28, so it works.`,
    placeholder: "Problem: …\nEquation: …\nStep 1: …\nStep 2: …\nCheck: …",
    reqs: [
      { t: "An equation like 4 + 6g = 28", re: "\\d\\s*[a-z]\\s*[-−+]?.*=|[-−+]\\s*\\d+\\s*[a-z]\\s*=" },
      { t: "Two steps (mention both *step 1* and *step 2*, or *first* and *then*)", re: "\\b(step\\s*\\d|first|then|next)\\b", min: 2 },
      { t: "Say *both sides*", re: "\\bboth sides\\b" },
      { t: "Check your answer (use the word *check*)", re: "\\bcheck" }
    ]
  },
  reflect: {
    q: "Hypatia became a famous teacher at a time when very few women were allowed to study. Who is a teacher (in school or outside it) who made a difference for you? What did they do that helped you learn?",
    placeholder: "A teacher who made a difference was…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "Diophantus's riddle",
      intro: `Here's the riddle from his tomb, in modern words:

> His **boyhood** lasted **1/6** of his life. After another **1/12**, he grew a beard. After **1/7** more, he married. **5 years** later, his son was born. The son lived to be **half** as old as his father. His father died **4 years** after the son.

If {{x}} is Diophantus's age when he died: {{x/6 + x/12 + x/7 + 5 + x/2 + 4 = x}}.`,
      items: [
        { q: "How old was Diophantus when he died?", a: "84", post: "years old", eq: "x/6 + x/12 + x/7 + 5 + x/2 + 4 = x", how: ["The fractions add to {{14/84 + 7/84 + 12/84 + 42/84 = 75/84}} of x.", "So {{75/84 x + 9 = x}}, which means {{9 = 9/84 x}}.", "Multiply both sides by 84/9: **x = 84**"] },
        { q: "How old was he when his son was born?", a: "38", post: "years old", from: "84/6 + 84/12 + 84/7 + 5", how: ["14 + 7 + 12 + 5 = **38**. (Check: the son lived 42 years, half of 84, and died when his father was 80.)"] }
      ],
      hints: ["A common denominator for 6, 12, 7 and 2 is 84.", "Try a number that 6, 12 and 7 all divide into evenly."]
    },
    {
      id: "x2", type: "solve", title: "Harder two-steps",
      items: [
        { q: "{{(2x - 5)/3 = -7}}", a: "-8", pre: "x =", eq: "(2x - 5)/3 = -7", how: ["Multiply by 3: {{2x - 5 = -21}}", "{{2x = -16}}, so **x = −8**"] },
        { q: "{{4 - 3/5 x = 13}}", a: "-15", pre: "x =", eq: "4 - (3/5)x = 13", how: ["Subtract 4: {{-3/5 x = 9}}", "Multiply by −5/3: **x = −15**"] },
        { q: "{{0.4(x) - 1.2 = 0.8}}", a: "5", pre: "x =", eq: "0.4x - 1.2 = 0.8", how: ["Add 1.2: {{0.4x = 2}}", "Divide by 0.4: **x = 5**"] },
        { q: "The sum of three consecutive integers is **72**. What is the smallest? ({{n + (n + 1) + (n + 2) = 72}})", a: "23", eq: "n + (n + 1) + (n + 2) = 72", how: ["{{3n + 3 = 72}}", "{{3n = 69}}, so **n = 23** (the numbers are 23, 24, 25)"] }
      ]
    }
  ],
  culture: "**Did you know?** Diophantus's *Arithmetica* was lost in Europe for centuries. In 1637, Pierre de Fermat scribbled in the margin of his copy that he had a proof that wouldn't fit there. That note, *Fermat's Last Theorem*, wasn't proved until 1994, by Andrew Wiles.",
  teacher: {
    snags: [
      ["Task 2", "Types *−4.5* for {{9 + 2x = 0}}", "Accepted; −9/2 and −4.5 are equal."],
      ["Task 5", "Builds *3 − 4x = 9*", "*Less than* reverses the order; the distractor tile is intentional."],
      ["Challenge x1", "Gets stuck on the fractions", "Suggest guess-and-check with multiples of 84, or the common denominator 84."]
    ],
    factcheck: "Hypatia (c. 355–415) taught in Alexandria; the *Suda* and Socrates Scholasticus report her lectures, and she is credited with commentaries on Diophantus's *Arithmetica* and Apollonius's *Conics* (none survive with certainty). Diophantus probably lived in the 3rd century AD. The epitaph riddle is from the *Greek Anthology* (Book XIV, compiled c. 500); it is a puzzle, not a reliable biography. Fermat's marginal note dates from about 1637; Wiles's proof was published in 1995 (announced 1993–94)."
  }
};

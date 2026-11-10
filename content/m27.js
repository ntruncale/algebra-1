module.exports = {
  num: 27, unit: 6, slug: "m27-factoring", minutes: 40, calculator: "not needed",
  title: "Factoring",
  subtitle: "Greatest common factors, trinomials x² + bx + c, and the difference of squares",
  lede: "Factoring is multiplying in reverse: turning x² + 5x + 6 back into (x + 2)(x + 3). It's the key to solving quadratic equations, and, for big numbers, the key to keeping secrets online.",
  recap: "To multiply binomials, multiply every term by every term (box method or FOIL), then combine like terms: (x + 2)(x + 3) = x² + 5x + 6.",
  goals: [
    "Factor out the greatest common factor (GCF)",
    "Factor trinomials of the form x² + bx + c",
    "Factor a difference of squares, and check any factoring by multiplying"
  ],
  context: {
    title: "The math that protects your passwords",
    place: "MIT, Cambridge, Massachusetts · 1977",
    text: `Multiplying two numbers is easy. Try **61 × 53**: it takes a minute by hand, and the answer is **3,233**. Now go backwards: **3,233** is the product of two prime numbers. Which ones? That's much harder. You'd have to try dividing by prime after prime.

In **1977**, three young researchers at MIT, **Ron Rivest**, **Adi Shamir** and **Leonard Adleman**, built a code on exactly that idea. It's called **RSA**, after their initials. Your phone or computer can multiply two huge prime numbers (hundreds of digits long) in a split second, and the product becomes part of a public "lock." Anyone can use it to lock a message. But only someone who knows the two original primes can unlock it, because **factoring** the product would take the world's fastest computers thousands of years.

Every time you see the little padlock next to a website address, or log in with a password, math like RSA is protecting you. It all depends on one fact: **multiplying is easy, factoring is hard**.

Factoring polynomials isn't that hard, luckily. It's a puzzle with a strategy, and that's what you'll learn this week.`,
    ask: "Can you find the two primes that multiply to 3,233? (One of them is 61.)"
  },
  learn: [
    {
      title: "Greatest common factor",
      text: `Always start by looking for a **greatest common factor (GCF)**: the biggest number and variable power that divides **every** term. Pull it out front, and write what's left in parentheses. It's the distributive property, backwards.`,
      worked: [
        { problem: "Factor {{6x^2 + 15x}}", steps: [["GCF of 6 and 15 is 3; both terms have x. GCF = {{3x}}."], ["{{3x(2x + 5)}}", "6x² ÷ 3x = 2x, and 15x ÷ 3x = 5."]], check: "Multiply back: {{3x(2x + 5) = 6x^2 + 15x}} ✓" },
        { problem: "Factor {{4y^3 - 8y^2 + 12y}}", steps: [["GCF = {{4y}}"], ["{{4y(y^2 - 2y + 3)}}"]] }
      ]
    },
    {
      title: "Factoring x² + bx + c",
      text: `To factor {{x^2 + bx + c}}, find **two numbers** that **multiply to c** and **add to b**. Then it's {{(x + first)(x + second)}}.

Why? Because {{(x + p)(x + q) = x^2 + (p + q)x + pq}}.`,
      worked: [
        { problem: "Factor {{x^2 + 5x + 6}}", steps: [["Multiply to 6, add to 5: **2 and 3**.", "Pairs that multiply to 6: 1·6, 2·3. Only 2 + 3 = 5."], ["{{(x + 2)(x + 3)}}"]], check: "{{(x + 2)(x + 3) = x^2 + 3x + 2x + 6}} ✓" },
        { problem: "Factor {{x^2 - 2x - 15}}", steps: [["Multiply to −15, add to −2: **3 and −5**.", "c is negative, so one number is negative. 3 + (−5) = −2."], ["{{(x + 3)(x - 5)}}"]] }
      ],
      table: {
        head: ["If c is…", "and b is…", "the two numbers are…"],
        rows: [["positive", "positive", "both positive"], ["positive", "negative", "both negative"], ["negative", "either", "one positive, one negative"]]
      }
    },
    {
      title: "The difference of squares",
      text: `A **difference of two squares** factors into a sum times a difference:

> {{a^2 - b^2 = (a + b)(a - b)}}

{{x^2 - 49 = (x + 7)(x - 7)}}. {{9x^2 - 4 = (3x + 2)(3x - 2)}}.

(A **sum** of squares, like {{x^2 + 9}}, can't be factored this way.)

**Factor completely:** after pulling out a GCF, check whether what's left factors again: {{2x^2 - 18 = 2(x^2 - 9) = 2(x + 3)(x - 3)}}.`,
      check: { q: "Factor {{x^2 - 36}}.", choices: [["{{(x + 6)(x - 6)}}", true], ["{{(x - 6)(x - 6)}}", false, "That multiplies to x² − 12x + 36."], ["{{(x - 18)(x + 2)}}", false]] }
    }
  ],
  tasks: [
    {
      id: "t1", type: "solve", title: "Factor out the GCF", pick: 5,
      intro: "Type the factored form, like **3x(2x + 5)**.",
      items: [
        { q: "{{5x + 20}}", a: "5(x + 4)", from: "5x+20", how: ["GCF 5: **5(x + 4)**"] },
        { q: "{{6x^2 + 15x}}", a: "3x(2x + 5)", from: "6x^2+15x", how: ["GCF 3x: **3x(2x + 5)**"] },
        { q: "{{8y^2 - 12y}}", a: "4y(2y - 3)", from: "8y^2-12y", how: ["GCF 4y: **4y(2y − 3)**"] },
        { q: "{{x^3 + 7x^2}}", a: "x^2(x + 7)", from: "x^3+7x^2", how: ["GCF x²: **x²(x + 7)**"] },
        { q: "{{10a^2 + 5a - 15}}", a: "5(2a^2 + a - 3)", from: "10a^2+5a-15", how: ["GCF 5: **5(2a² + a − 3)**"] },
        { q: "{{-4x^2 - 6x}}", a: "-2x(2x + 3)", from: "-4x^2-6x", how: ["Factor out −2x: **−2x(2x + 3)** (2x(−2x − 3) is also right)"] }
      ],
      hints: ["Find the biggest number that divides every coefficient.", "Then the lowest power of the variable that's in every term."]
    },
    {
      id: "t2", type: "cloze", title: "Find the two numbers",
      intro: "Two numbers that **multiply** to the first value and **add** to the second.",
      items: [
        "Multiply to {{12}}, add to {{7}}: [3] and [4]",
        "Multiply to {{10}}, add to {{-7}}: [-2] and [-5]",
        "Multiply to {{-8}}, add to {{2}}: [4] and [-2]",
        "Multiply to {{-20}}, add to {{-1}}: [4] and [-5]",
        "Multiply to {{36}}, add to {{13}}: [4] and [9]"
      ],
      hints: ["List the factor pairs of the product. Which pair adds to the sum?", "A negative product means one number is negative."]
    },
    {
      id: "t3", type: "solve", title: "Factor the trinomial", pick: 6,
      items: [
        { q: "{{x^2 + 7x + 12}}", a: "(x + 3)(x + 4)", from: "x^2+7x+12", how: ["3 · 4 = 12, 3 + 4 = 7", "**(x + 3)(x + 4)**"] },
        { q: "{{x^2 + 9x + 20}}", a: "(x + 4)(x + 5)", from: "x^2+9x+20", how: ["4 · 5 = 20, 4 + 5 = 9"] },
        { q: "{{x^2 - 7x + 10}}", a: "(x - 2)(x - 5)", from: "x^2-7x+10", how: ["(−2)(−5) = 10, −2 + (−5) = −7"] },
        { q: "{{x^2 + 2x - 8}}", a: "(x + 4)(x - 2)", from: "x^2+2x-8", how: ["4 · (−2) = −8, 4 + (−2) = 2"] },
        { q: "{{x^2 - x - 20}}", a: "(x + 4)(x - 5)", from: "x^2-x-20", how: ["4 · (−5) = −20, 4 + (−5) = −1"] },
        { q: "{{x^2 - 10x + 25}}", a: "(x - 5)^2", from: "x^2-10x+25", how: ["(−5)(−5) = 25, −5 + (−5) = −10", "**(x − 5)(x − 5)**, or (x − 5)²"] },
        { q: "{{x^2 + 3x - 18}}", a: "(x + 6)(x - 3)", from: "x^2+3x-18", how: ["6 · (−3) = −18, 6 + (−3) = 3"] },
        { q: "{{x^2 - 13x + 36}}", a: "(x - 4)(x - 9)", from: "x^2-13x+36", how: ["(−4)(−9) = 36, −4 + (−9) = −13"] }
      ],
      hints: ["Find two numbers that multiply to c and add to b.", "Check by multiplying your answer back out."]
    },
    {
      id: "t4", type: "solve", title: "Difference of squares and factoring completely", pick: 4,
      items: [
        { q: "{{x^2 - 49}}", a: "(x + 7)(x - 7)", from: "x^2-49", how: ["{{x^2 - 7^2}}: **(x + 7)(x − 7)**"] },
        { q: "{{y^2 - 1}}", a: "(y + 1)(y - 1)", from: "y^2-1", how: ["**(y + 1)(y − 1)**"] },
        { q: "{{4x^2 - 25}}", a: "(2x + 5)(2x - 5)", from: "4x^2-25", how: ["{{(2x)^2 - 5^2}}: **(2x + 5)(2x − 5)**"] },
        { q: "{{3x^2 - 27}}", a: "3(x + 3)(x - 3)", from: "3x^2-27", how: ["GCF first: {{3(x^2 - 9)}}", "**3(x + 3)(x − 3)**"] },
        { q: "{{2x^2 + 10x + 12}}", a: "2(x + 2)(x + 3)", from: "2x^2+10x+12", how: ["GCF 2: {{2(x^2 + 5x + 6)}}", "**2(x + 2)(x + 3)**"] }
      ],
      hints: ["Look for a GCF first.", "a² − b² = (a + b)(a − b)."]
    },
    {
      id: "t5", type: "sort", title: "Which method?",
      intro: "What's the **first** thing to do to factor each one?",
      cats: ["Take out a GCF", "Two numbers (x² + bx + c)", "Difference of squares", "Can't be factored"],
      items: [
        ["{{5x^2 + 10x}}", 0], ["{{x^2 + 8x + 15}}", 1], ["{{x^2 - 64}}", 2], ["{{x^2 + 4}}", 3, "A sum of squares doesn't factor (with real numbers)."],
        ["{{7x^3 - 14x}}", 0], ["{{x^2 - 3x - 10}}", 1], ["{{16 - x^2}}", 2, "(4 + x)(4 − x)."], ["{{x^2 + x + 1}}", 3, "No two integers multiply to 1 and add to 1."]
      ],
      hints: ["Always check for a GCF first.", "Two terms with a minus between perfect squares → difference of squares."]
    },
    {
      id: "t6", type: "mistake", title: "Check by multiplying",
      intro: "Tap the **first wrong line**, then type the correct factored form.",
      items: [
        { q: "Factor {{x^2 + 2x - 15}}", lines: ["Numbers: 3 and −5", "{{(x + 3)(x - 5)}}"], bad: 0, why: "3 + (−5) = −2, not 2. You need −3 and 5: {{(x - 3)(x + 5)}}.", a: "(x - 3)(x + 5)", from: "x^2+2x-15" },
        { q: "Factor {{x^2 - 9}}", lines: ["Two numbers that multiply to 9 and add to 0: −3 and −3", "{{(x - 3)(x - 3)}}"], bad: 0, why: "The constant is **−9**, not 9: you need numbers that multiply to −9 and add to 0, which are 3 and −3. {{(x + 3)(x - 3)}}.", a: "(x + 3)(x - 3)", from: "x^2-9" },
        { q: "Factor {{4x^2 + 8x}}", lines: ["{{4(x^2 + 2x)}}", "Done."], bad: 1, why: "Not completely factored: x is still common inside. {{4x(x + 2)}}.", a: "4x(x + 2)", from: "4x^2+8x" }
      ]
    }
  ],
  build: {
    heading: "Factoring as a puzzle",
    prompt: `Write instructions for factoring {{x^2 + bx + c}} for a classmate who missed this week. Use **one example of your own** (not one from this page), show how you found the **two numbers**, give the **factored form**, and **check** it by multiplying.`,
    model: `To factor x^2 + 9x + 14, find two numbers that multiply to 14 and add to 9. The pairs that multiply to 14 are 1 and 14, and 2 and 7. Only 2 + 7 = 9, so the answer is (x + 2)(x + 7). To check, multiply: (x + 2)(x + 7) = x^2 + 7x + 2x + 14 = x^2 + 9x + 14. It matches.`,
    placeholder: "To factor x^2 + … , find two numbers that…",
    reqs: [
      { t: "Say *multiply* and *add*", re: "\\b(multipl|add)", min: 2 },
      { t: "A factored form like (x + 2)(x + 7)", re: "\\(\\s*x\\s*[-−+]\\s*\\d+\\s*\\)\\s*\\(\\s*x\\s*[-−+]\\s*\\d+\\s*\\)" },
      { t: "Check by multiplying (use *check*)", re: "\\bcheck" },
      { t: "At least 3 sentences", sentences: 3 }
    ]
  },
  reflect: {
    q: "RSA keeps your information safe because some math problems are easy in one direction and hard in the other. Can you think of other things in life that are easy to do but hard to undo? What does that make you think about?",
    placeholder: "Something easy to do but hard to undo is…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "When a isn't 1",
      intro: "To factor {{ax^2 + bx + c}}, try binomials like {{(2x + ?)(x + ?)}} and check the middle term.",
      items: [
        { q: "{{2x^2 + 7x + 3}}", a: "(2x + 1)(x + 3)", from: "2x^2+7x+3", how: ["Try {{(2x + 1)(x + 3) = 2x^2 + 6x + x + 3}} ✓"] },
        { q: "{{3x^2 - 10x + 8}}", a: "(3x - 4)(x - 2)", from: "3x^2-10x+8", how: ["{{(3x - 4)(x - 2) = 3x^2 - 6x - 4x + 8}} ✓"] },
        { q: "{{6x^2 + x - 2}}", a: "(2x - 1)(3x + 2)", from: "6x^2+x-2", how: ["{{(2x - 1)(3x + 2) = 6x^2 + 4x - 3x - 2}} ✓"] }
      ]
    },
    {
      id: "x2", type: "solve", title: "Factor completely",
      items: [
        { q: "{{x^4 - 16}}", a: "(x^2 + 4)(x + 2)(x - 2)", from: "x^4-16", how: ["{{(x^2 + 4)(x^2 - 4)}}", "{{x^2 - 4}} factors again: **(x² + 4)(x + 2)(x − 2)**"] },
        { q: "{{x^3 - 5x^2 - 6x}}", a: "x(x - 6)(x + 1)", from: "x^3-5x^2-6x", how: ["GCF x: {{x(x^2 - 5x - 6)}}", "**x(x − 6)(x + 1)**"] },
        { q: "Find the two primes that multiply to **3,233**. Type the larger one.", a: "61", how: ["{{3233 / 61 = 53}}. The primes are 53 and 61."] }
      ]
    }
  ],
  culture: "**Did you know?** In 2020, a team used thousands of computers for about 2,700 core-years of computing time to factor RSA-250, a 250-digit number. Real RSA keys today are usually more than 600 digits long.",
  teacher: {
    snags: [
      ["Task 1", "Types *3(2x² + 5x)*", "Marked yellow: factor completely (x is still common)."],
      ["Task 3", "Writes the factors in a different order", "Any order is accepted."],
      ["Task 3", "Types *x² + 7x + 12* back", "Marked yellow: this asks for factored form."]
    ],
    factcheck: "Rivest, Shamir and Adleman published RSA in 1977 (MIT technical memo; *Communications of the ACM*, 1978). 61 × 53 = 3,233 is the standard textbook RSA example. RSA-250 (829 bits) was factored in February 2020 by Boudot, Gaudry, Guillevic, Heninger, Thomé and Zimmermann using about 2,700 core-years. Common RSA key sizes are 2048 bits (617 decimal digits) or larger."
  }
};

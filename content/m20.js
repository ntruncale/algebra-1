module.exports = {
  num: 20, unit: 4, slug: "m20-scatter-plots", minutes: 35, calculator: "allowed",
  title: "Scatter Plots and Lines of Best Fit",
  subtitle: "Correlation, trend lines, predictions and the difference between correlation and causation",
  lede: "Real data is messy: the points never fall exactly on a line. But often they come close, and a line of best fit lets you make good predictions anyway.",
  recap: "Parallel lines have equal slopes; perpendicular slopes are negative reciprocals. Standard form is Ax + By = C; find intercepts by setting x or y to 0.",
  goals: [
    "Describe the correlation in a scatter plot as positive, negative or none",
    "Use a line of best fit to make predictions, and interpret its slope and intercept",
    "Explain why correlation doesn't prove causation"
  ],
  context: {
    title: "Predicting Old Faithful",
    place: "Yellowstone National Park · since 1870",
    text: `**Old Faithful** is the most famous geyser in the world. Every hour or two, it shoots thousands of gallons of boiling water up to **180 feet** into the air. It was named in **1870** by explorers who noticed it erupted so regularly.

But "regularly" isn't exactly on schedule. The time between eruptions varies from about **an hour to two hours**. So how do park rangers post the "next eruption" times that thousands of visitors plan their day around?

They use a **scatter plot** of past eruptions. When rangers plotted how long each eruption lasted against the wait until the **next** one, they found a pattern: **longer eruptions are followed by longer waits**. A short eruption (under about 2.5 minutes) means the next one comes in about an hour; a long one (4 or 5 minutes) means a wait of about an hour and a half.

Using this relationship, rangers' predictions are usually right **within about 10 minutes**. That's the power of a line of best fit: it can't predict perfectly, but it predicts well enough to be useful.`,
    ask: "Why might a longer eruption mean a longer wait for the next one? (Hint: think about refilling.)"
  },
  learn: [
    {
      title: "Scatter plots and correlation",
      text: `A **scatter plot** shows pairs of data as points. If the points form a rough pattern, the two variables are **correlated**:

- **Positive correlation**: as x goes up, y tends to go **up** (height and shoe size).
- **Negative correlation**: as x goes up, y tends to go **down** (a car's age and its value).
- **No correlation**: no pattern (your height and your birthday).

The closer the points are to a line, the **stronger** the correlation.`,
      figs: ["pos", "neg", "none"],
      after: "Left: positive. Middle: negative. Right: no correlation."
    },
    {
      title: "Lines of best fit",
      text: `A **line of best fit** (or **trend line**) goes through the middle of the points, with about as many points above it as below. You can draw one by eye, or a calculator can find the most accurate one.

Once you have its equation, you can **predict**:
- **Interpolation**: predicting **inside** the range of your data. Usually reliable.
- **Extrapolation**: predicting **outside** the data. Riskier: the pattern might not continue.

The **slope** is the average rate of change, and the **y-intercept** is the predicted value when x = 0, if that makes sense.`,
      fig: "faithful",
      worked: [
        { problem: "The trend line for Old Faithful is about {{y = 10x + 35}}, with x = eruption length (minutes) and y = wait until the next eruption (minutes). Predict the wait after a **4-minute** eruption.", steps: [["{{y = 10(4) + 35}}", "Substitute x = 4."], ["{{= 75}} minutes"]] }
      ],
      check: { q: "In {{y = 10x + 35}}, what does the slope **10** mean?", choices: [["Each extra minute of eruption adds about 10 minutes to the wait", true], ["Old Faithful erupts every 10 minutes", false], ["Eruptions last 10 minutes", false]] }
    },
    {
      title: "Correlation is not causation",
      text: `Two things can be correlated **without one causing the other**.

Ice cream sales and sunburns are positively correlated. Does ice cream cause sunburn? No. Both go up because of a third thing, **hot sunny weather**, called a **lurking variable**.

Before deciding that x **causes** y, ask:
- Could a third variable cause both?
- Could it be the other way around (y causes x)?
- Could it be coincidence?

Scientists use carefully designed **experiments**, not just scatter plots, to show cause and effect.`
    }
  ],
  tasks: [
    {
      id: "t1", type: "quiz", title: "Name the correlation",
      questions: [
        { q: "What kind of correlation?", fig: "q1", choices: [["positive", true], ["negative", false], ["none", false]], keepOrder: true },
        { q: "What kind of correlation?", fig: "q2", choices: [["negative", true], ["positive", false], ["none", false]], keepOrder: true },
        { q: "What kind of correlation?", fig: "q3", choices: [["none", true], ["positive", false], ["negative", false]], keepOrder: true }
      ]
    },
    {
      id: "t2", type: "sort", title: "Predict the correlation",
      intro: "What kind of correlation would you expect?",
      cats: ["Positive", "Negative", "None"],
      items: [
        ["Hours studied and test score", 0], ["Temperature outside and hot chocolate sales", 1], ["Shoe size and favorite number", 2],
        ["Miles driven and gas left in the tank", 1], ["Age of a tree and its height", 0], ["Number of siblings and month you were born", 2],
        ["Hours of video games per day and hours of sleep", 1], ["Price of a pizza and its diameter", 0]
      ],
      hints: ["Ask: when the first goes up, does the second tend to go up, go down, or neither?"]
    },
    {
      id: "t3", type: "read", title: "Old Faithful's data",
      fig: "faithful",
      intro: "Calculator allowed. The line of best fit is {{y = 10x + 35}}: x = eruption length (min), y = wait until the next eruption (min).",
      questions: [
        { q: "Predict the wait after a **2-minute** eruption.", choices: [["55 minutes", true, "10(2) + 35 = 55."], ["20 minutes", false], ["45 minutes", false]], keepOrder: true },
        { q: "Predict the wait after a **4.5-minute** eruption.", choices: [["80 minutes", true, "10(4.5) + 35 = 80."], ["45 minutes", false], ["90 minutes", false]], keepOrder: true },
        { q: "A visitor arrives right as a **3-minute** eruption ends. About when should they come back?", choices: [["in about 65 minutes", true], ["in about 30 minutes", false], ["in about 3 hours", false]], keepOrder: true },
        { q: "The y-intercept, 35, would mean a 0-minute eruption is followed by a 35-minute wait. Is that a sensible prediction?", choices: [["No: there's no data near 0 minutes, so that's extrapolation", true, "Eruptions in the data last 1.5 to 5 minutes."], ["Yes: lines always work everywhere", false]] }
      ]
    },
    {
      id: "t4", type: "solve", title: "Predict with a trend line",
      items: [
        { q: "A trend line for a store is {{y = 25x + 40}}: y is daily lemonade sales in dollars and x is the temperature above 70°F. Predict sales when it's **84°F** (so x = 14).", a: "390", pre: "$", from: "25*14 + 40", how: ["{{25(14) + 40 = 350 + 40}}", "**$390**"] },
        { q: "For a car, value {{V = -2500a + 28000}} with {{a}} = age in years. Predict the value at **6 years**.", a: "13000", pre: "$", from: "-2500*6 + 28000", how: ["{{-15,000 + 28,000}}", "**$13,000**"] },
        { q: "Same car: at what age does the model predict a value of **$8,000**?", a: "8", post: "years", eq: "-2500a + 28000 = 8000", how: ["{{-2500a = -20000}}", "**8 years**"] },
        { q: "Data for 10 students gives the trend line {{s = 4h + 62}}: test score {{s}} after {{h}} hours of study. What score does it predict for **5 hours**?", a: "82", from: "4*5 + 62", how: ["{{4(5) + 62 = 82}}"] }
      ],
      hints: ["Substitute the x value into the equation.", "If you're given y, set the equation equal to it and solve for x."]
    },
    {
      id: "t5", type: "solve", title: "Find the trend line",
      intro: "A trend line passes through {{(2, 60)}} and {{(8, 90)}}, where x is weeks of practice and y is free-throw percentage.",
      fig: "ft",
      items: [
        { q: "What's its slope?", a: "5", pre: "m =", from: "(90-60)/(8-2)", how: ["{{(90 - 60)/(8 - 2) = 30/6}}", "**5** (percentage points per week)"] },
        { q: "Write the equation of the trend line.", a: "y = 5x + 50", how: ["{{60 = 5(2) + b}}, {{b = 50}}", "**y = 5x + 50**"] },
        { q: "What does it predict after **12 weeks**?", a: "110", post: "%", from: "5*12 + 50", how: ["{{5(12) + 50 = 110}}%"] },
        { q: "Is a 110% free-throw percentage possible? Type **yes** or **no**.", a: "no", how: ["**No**: you can't make more than 100% of your shots. The trend can't continue forever. That's the danger of extrapolation."] }
      ]
    },
    {
      id: "t6", type: "quiz", title: "Causation or not?",
      questions: [
        { q: "Cities with more firefighters have more fires. Does hiring firefighters cause fires?", choices: [["No: bigger cities have both more fires and more firefighters", true, "City size is a lurking variable."], ["Yes", false]], keepOrder: true },
        { q: "Students who eat breakfast tend to have higher grades. Which is the best conclusion?", choices: [["There's a correlation, but other factors (like sleep or home routines) could explain it", true], ["Breakfast definitely causes higher grades", false, "A scatter plot alone can't prove that."], ["There's no relationship", false]] },
        { q: "How could scientists test whether a new study method **causes** higher scores?", choices: [["Randomly assign students to use it or not, then compare", true, "A randomized experiment controls for lurking variables."], ["Ask students who already use it how they did", false], ["Make a bigger scatter plot", false]] }
      ]
    }
  ],
  build: {
    heading: "Is it correlation or causation?",
    prompt: `Think of two things that might be correlated in your life or school (screen time and sleep, practice and points, temperature and attendance…). Describe the **correlation** you'd expect (positive, negative or none), and then explain whether one would **cause** the other, or whether a **lurking variable** could explain it.`,
    model: `I think hours of sleep and grades have a positive correlation, because students who sleep more seem to do better. But that doesn't prove sleep causes good grades. A lurking variable could be how organized a student is: organized students might get to bed earlier and also study more. To really know, you'd need an experiment.`,
    placeholder: "I think ___ and ___ have a … correlation, because…",
    reqs: [
      { t: "Name the correlation (*positive*, *negative* or *no*)", re: "\\b(positive|negative|no)\\s+correlation\\b|\\bcorrelation\\b" },
      { t: "Discuss cause (use *cause* or *causation*)", re: "\\bcaus" },
      { t: "Consider a lurking variable or another explanation", re: "\\b(lurking|third|another|other factor|coincidence|because of)" },
      { t: "At least 3 sentences", sentences: 3 }
    ]
  },
  reflect: {
    q: "Old Faithful's predictions are usually right within 10 minutes, not perfect. Is a prediction useful even when it isn't perfect? Think of predictions you rely on (weather, travel time, test grades). How do you handle the uncertainty?",
    placeholder: "A prediction can be useful even if…"
  },
  challenge: [
    {
      id: "x1", type: "solve", title: "Fit your own line",
      fig: "phone",
      intro: "The scatter plot shows a phone's battery percentage {{y}} after {{x}} hours of use. Draw a line by eye through the middle of the points.",
      items: [
        { q: "The data points (1, 85) and (7, 25) are close to the trend. Find the slope between them.", a: "-10", pre: "m =", from: "(25-85)/(7-1)", how: ["{{(25 - 85)/(7 - 1) = -60/6}}", "**−10** (percent per hour)"] },
        { q: "Write the trend line's equation.", a: "y = -10x + 95", how: ["{{85 = -10(1) + b}}, {{b = 95}}"] },
        { q: "When does the model predict the battery hits **0%**?", a: "9.5", post: "hours", eq: "-10x + 95 = 0", how: ["{{-10x + 95 = 0}}", "**9.5 hours**"] }
      ]
    },
    {
      id: "x2", type: "quiz", title: "Think like a statistician",
      questions: [
        { q: "A trend line predicts a 6-foot-tall 10-year-old. What went wrong?", choices: [["Probably extrapolation: the data may not have included children that age, or the pattern changes", true], ["Nothing: lines are always right", false]] },
        { q: "One point is far away from all the others (an **outlier**). What happens if you include it when fitting a line?", choices: [["It can pull the line toward itself and change the predictions", true], ["Nothing changes", false], ["The line must pass through it", false]] },
        { q: "The correlation between shoe size and reading level for kids ages 5 to 15 is strongly positive. Why?", choices: [["Age is a lurking variable: older kids have bigger feet and read better", true], ["Big feet help you read", false], ["It's a coincidence", false, "It's too strong and too sensible to be a coincidence. Look for a third variable."]] }
      ]
    }
  ],
  figs: {
    pos: { x: [0, 10], y: [0, 10], w: 170, pad: 14, xevery: 5, yevery: 5, points: [[1, 2], [2, 2.5], [3, 3.8], [4, 4], [5, 5.5], [6, 5.2], [7, 7], [8, 7.6], [9, 8.8]], alt: "Points rising from left to right" },
    neg: { x: [0, 10], y: [0, 10], w: 170, pad: 14, xevery: 5, yevery: 5, points: [[1, 9], [2, 8.2], [3, 7.5], [4, 6.1], [5, 5.6], [6, 4.4], [7, 3.9], [8, 2.5], [9, 1.8]], alt: "Points falling from left to right" },
    none: { x: [0, 10], y: [0, 10], w: 170, pad: 14, xevery: 5, yevery: 5, points: [[1, 6], [2, 2], [3, 8], [4, 4], [5, 9], [6, 1.5], [7, 5.5], [8, 3], [9, 7.5]], alt: "Points with no pattern" },
    faithful: { x: [1, 5.5], y: [40, 100], xstep: 0.5, ystep: 10, h: 230, w: 300, xevery: 2, xlabel: "eruption (min)", ylabel: "wait (min)", lines: [{ fn: "10x + 35", c: 2 }], points: [[1.7, 54], [1.9, 52], [2.0, 58], [2.3, 56], [2.5, 62], [3.2, 66], [3.5, 70], [3.8, 74], [4.0, 78], [4.2, 74], [4.4, 82], [4.6, 80], [4.8, 86], [5.0, 83]], alt: "Scatter plot of eruption length vs. wait, with a rising trend line" },
    q1: { x: [0, 10], y: [0, 10], w: 180, pad: 14, xevery: 5, yevery: 5, points: [[1, 1.5], [2, 3], [3, 2.5], [4, 4.5], [5, 4.8], [6, 6.5], [7, 6.2], [8, 8], [9, 9.1]], alt: "Scatter plot" },
    q2: { x: [0, 10], y: [0, 10], w: 180, pad: 14, xevery: 5, yevery: 5, points: [[1, 8.5], [2, 8.8], [3, 7], [4, 6.8], [5, 5], [6, 5.4], [7, 3.5], [8, 3], [9, 1.2]], alt: "Scatter plot" },
    q3: { x: [0, 10], y: [0, 10], w: 180, pad: 14, xevery: 5, yevery: 5, points: [[1, 3], [2, 8], [3, 5], [4, 1.5], [5, 6], [6, 9], [7, 2], [8, 6.5], [9, 4]], alt: "Scatter plot" },
    ft: { x: [0, 10], y: [40, 100], ystep: 10, h: 220, w: 280, xlabel: "weeks", ylabel: "%", lines: [{ fn: "5x + 50", c: 2 }], points: [[1, 57], [2, 60], [3, 62], [4, 72], [5, 73], [6, 78], [7, 87], [8, 90], [9, 93]], alt: "Free-throw percentage rising over 9 weeks with a trend line" },
    phone: { x: [0, 10], y: [0, 100], ystep: 10, h: 220, w: 280, xlabel: "hours", ylabel: "%", points: [[1, 85], [2, 78], [3, 62], [4, 58], [5, 46], [6, 32], [7, 25], [8, 17]], alt: "Battery percentage falling over 8 hours" }
  },
  culture: "**Did you know?** Old Faithful's eruptions have slowly gotten farther apart since the 1950s, partly because earthquakes changed its underground plumbing. Rangers update their prediction line as new data comes in.",
  teacher: {
    snags: [
      ["Task 3", "Calls the y-intercept a reliable prediction", "Point out the data range: extrapolating to 0 minutes isn't supported."],
      ["Task 5", "Says 110% is possible", "Discuss limits on real quantities and extrapolation."],
      ["Task 6", "Accepts any correlation as cause", "Ask for a lurking variable each time."]
    ],
    factcheck: "Old Faithful was named by the Washburn–Langford–Doane Expedition in 1870. The NPS predicts eruptions from the duration of the previous eruption; predictions are typically within ±10 minutes about 90% of the time. Intervals range roughly from 60 to 110 minutes; heights from about 106 to 185 ft. The trend line y = 10x + 35 and the plotted points in this module are illustrative values shaped like published Old Faithful data, not an official NPS formula."
  }
};

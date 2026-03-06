import type { Pack, Puzzle } from "../types";

// ─── Helpers ──────────────────────────────────────────────

function localDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return localDateStr(d);
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = (s >>> 0) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const today = new Date();
const dateSeed =
  today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

// ─── Daily Pack: Women's History, Ongoing ──────────────────

const womensHistoryOngoingPuzzles: Puzzle[] = [
  {
    id: "who-fill-01",
    mechanic: "fill",
    source: {
      title: "The End of History? Women's History (Her Story) Month",
      author: "Bama Athreya",
      story_url: "https://bamaathreya.medium.com/the-end-of-history-womens-history-her-story-month-69f99a9de6f1",
    },
    content: {
      passage:
        "Why would it make sense to impose a ______ on five decades of evidence, and halt the possibility of gathering new data? I believe it was never about ensuring all boats were lifted. Those in power have never let go of the idea that access to resources is a ______ game.",
      answers: ["blackout", "zero-sum"],
      full_passage:
        "Why would it make sense to impose a blackout on five decades of evidence, and halt the possibility of gathering new data? I believe it was never about ensuring all boats were lifted. Those in power have never let go of the idea that access to resources is a zero-sum game.",
    },
    difficulty: "medium",
    hint: "Think about what happens when evidence disappears—and who benefits from scarcity thinking.",
  },
  {
    id: "who-fill-02",
    mechanic: "fill",
    source: {
      title: "Why Women's History Month Matters for All Women",
      author: "Vilma G. Reynoso",
      story_url: "https://medium.com/fourth-wave/why-womens-history-month-matters-for-all-women-978090b95f93",
    },
    content: {
      passage:
        "My mother gave all of herself to everyone to her ______. That is what she was taught to do by my grandmother, by patriarchy. Giving to everyone else but herself is what eventually ______ her, emotionally and physically.",
      answers: ["detriment", "destroyed"],
      full_passage:
        "My mother gave all of herself to everyone to her detriment. That is what she was taught to do by my grandmother, by patriarchy. Giving to everyone else but herself is what eventually destroyed her, emotionally and physically.",
    },
    difficulty: "medium",
    hint: "The author is describing a pattern passed down through generations—selflessness as both virtue and trap.",
  },
  {
    id: "who-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "The 2026 Olympics Proved It Again: Sport Has Always Been Political",
      author: "Dr. Lauren Tucker",
      story_url: "https://dowhatmatters.medium.com/the-2026-olympics-proved-it-again-sport-has-always-been-political-90cfa8c13bc2",
    },
    content: {
      lines: [
        "The women's teams have historically operated with less funding, less media coverage, lower salaries, and lower fan investment.",
        "They win anyway.",
        "Relentlessly.",
        "Professionally.",
        "Without demanding applause for doing what excellence requires.",
        "That consistency is political.",
      ],
      movable_indices: [1, 2, 3, 4],
    },
    difficulty: "medium",
    hint: "The rhythm matters here. Short declarations build toward a conclusion—notice how the pacing reinforces the point.",
  },
  {
    id: "who-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "Lessons from My Hackathon on Tackling Violence Against Women and Girls in Public Spaces",
      author: "Jodie Keens",
      story_url: "https://medium.com/@jodiekeens/lessons-from-my-hackathon-on-tackling-violence-against-women-and-girls-in-public-spaces-9008830dc45a",
    },
    content: {
      passage_with_errors:
        "Like so many social issues, VAWG isn't \"too complex\" for product thinking. It's exactley the kind of challange that product, design and technology should be leaning into.",
      errors: [
        { wrong: "exactley", correct: "exactly" },
        { wrong: "challange", correct: "challenge" },
      ],
      corrected_passage:
        "Like so many social issues, VAWG isn't \"too complex\" for product thinking. It's exactly the kind of challenge that product, design and technology should be leaning into.",
    },
    difficulty: "easy",
    hint: "Two common spelling stumbles—one near the beginning, one near the end of the second sentence.",
  },
  {
    id: "who-highlight-01",
    mechanic: "highlight",
    source: {
      title: "What We Ignore in Our Debates About Aging Women and Cosmetic 'Enhancement'",
      author: "Laura Rosell",
      story_url: "https://medium.com/age-of-empathy/what-we-ignore-in-our-debates-about-aging-women-and-cosmetic-enhancement-9023361a24f1",
    },
    content: {
      sentences: [
        "I know that growing older is something to feel gratitude for, rather than self-reproach.",
        "And I know it's impossible to disentangle the \"natural\" consequences of aging—the inevitable loss of bone volume, muscle, or collagen—from the unnatural consequences of structural injustice and patriarchal abuse.",
        "But I can't escape the fact that, when I look in the mirror, most of the visible \"signs of aging\" that bother me are actually reflections of how patriarchy and poverty have failed me with respect to my wellbeing.",
      ],
      correct_index: 2,
      highlight_density: [0.15, 0.3, 0.55],
    },
    difficulty: "medium",
    hint: "Look for the sentence that makes the argument concrete and personal—the one that lands.",
  },
  {
    id: "who-highlight-02",
    mechanic: "highlight",
    source: {
      title: "Why The Treatment Of Women In Immigration Detention Should Concern Every Woman In America",
      author: "Maia Niguel Hoskin, Ph.D.",
      story_url: "https://zora.medium.com/why-the-treatment-of-women-in-immigration-detention-should-concern-every-woman-in-america-5dd77a2f6063",
    },
    content: {
      sentences: [
        "According to historians from Harvard University, policies affecting marginalized women have often foreshadowed broader societal shifts.",
        "When the dignity of vulnerable women is treated as secondary, it raises questions about how secure women's rights truly are.",
        "The data surrounding immigration detention today—which reflects record numbers, family separations, and documented mental health harm—calls for informed public engagement, some activists say.",
        "For women across America, this is not a distant border debate.",
      ],
      correct_index: 1,
      highlight_density: [0.18, 0.45, 0.22, 0.15],
    },
    difficulty: "hard",
    hint: "Which sentence expands the stakes from one group to all women? That's the gravitational center.",
  },
];

// ─── Daily Pack ───────────────────────────────────────────

export const dailyPack: Pack = {
  title: "Women's History, Ongoing",
  editor: "Carly Rose Gillis",
  date: localDateStr(new Date()),
  puzzles: seededShuffle([...womensHistoryOngoingPuzzles], dateSeed),
  welcome: {
    body: "This pack draws from writers reflecting on Women's History Month in 2026—a year when the celebration feels less like confetti and more like reckoning. These are essays about mothers and memory, data and erasure, sport and power, and the quiet labor of existing safely in public space.",
    body2: "The puzzles ask you to slow down with sentences that carry weight. Notice what the writers are doing with language—and what they're fighting for underneath it.",
  },
  editorNote: "I built this pack around stories that made me sit with discomfort and leave with clarity. Women's History Month has always been political—these writers remind us it was never meant to be comfortable.",
};

// ─── Archive Pack 1: Small Truths ─────────────────────────

const smallTruthsPuzzles: Puzzle[] = [
  {
    id: "st-fill-01",
    mechanic: "fill",
    source: {
      title: "What My Grandmother Knew About Silence",
      author: "Jia Lin",
      story_url: "#",
    },
    content: {
      passage:
        "My grandmother never ______ silence. She inhabited it. Where I saw ______, she found presence — the kind that doesn't need to ______ itself.",
      answers: ["explained", "absence", "prove"],
      full_passage:
        "My grandmother never explained silence. She inhabited it. Where I saw absence, she found presence — the kind that doesn't need to prove itself.",
    },
    difficulty: "medium",
    hint: "The contrast is between analyzing and living. Between emptiness and fullness.",
  },
  {
    id: "st-fill-02",
    mechanic: "fill",
    source: {
      title: "The Art of Noticing",
      author: "Thomas Reid",
      story_url: "#",
    },
    content: {
      passage:
        "Most people walk past the same ______ every day without seeing them. Not because they're ______, but because attention is a ______ most of us never learned.",
      answers: ["details", "careless", "skill"],
      full_passage:
        "Most people walk past the same details every day without seeing them. Not because they're careless, but because attention is a skill most of us never learned.",
    },
    difficulty: "easy",
    hint: "The author isn't blaming anyone. They're pointing to something trainable.",
  },
  {
    id: "st-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "The Art of Noticing",
      author: "Thomas Reid",
      story_url: "#",
    },
    content: {
      lines: [
        "I started keeping a notebook of things I noticed.",
        "Not important things. Ordinary ones.",
        "The way light hit the kitchen counter at 4 p.m.",
        "The particular silence after a bus pulls away.",
        "Within a month, the world looked different.",
        "Nothing had changed except the quality of my attention.",
      ],
      movable_indices: [1, 3, 4],
    },
    difficulty: "medium",
    hint: "The notebook comes first. Then examples. Then the result.",
  },
  {
    id: "st-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "What My Grandmother Knew About Silence",
      author: "Jia Lin",
      story_url: "#",
    },
    content: {
      passage_with_errors:
        "She never offered advise unless you asked for it, and even then she chose her words with a care that made you feel like each one costed her something. That economy of speech wasn't shyness. It was respect.",
      errors: [
        { wrong: "advise", correct: "advice" },
        { wrong: "costed", correct: "cost" },
      ],
      corrected_passage:
        "She never offered advice unless you asked for it, and even then she chose her words with a care that made you feel like each one cost her something. That economy of speech wasn't shyness. It was respect.",
    },
    difficulty: "medium",
    hint: "One is a verb used as a noun. The other is an irregular past tense.",
  },
  {
    id: "st-highlight-01",
    mechanic: "highlight",
    source: {
      title: "What My Grandmother Knew About Silence",
      author: "Jia Lin",
      story_url: "#",
    },
    content: {
      sentences: [
        "My grandmother rarely spoke at family dinners.",
        "She'd sit at the end of the table, hands folded, watching us argue about nothing.",
        "I used to think she had nothing to say.",
        "Now I think she had everything to say, and chose not to.",
        "Silence, in her hands, wasn't absence. It was precision.",
        "She said more by listening than the rest of us managed in hours of talking.",
      ],
      correct_index: 4,
      highlight_density: [0.04, 0.08, 0.10, 0.18, 0.43, 0.17],
    },
    difficulty: "medium",
    hint: "Look for the sentence that redefines silence — where it stops being a lack and becomes something else.",
  },
  {
    id: "st-highlight-02",
    mechanic: "highlight",
    source: {
      title: "The Art of Noticing",
      author: "Thomas Reid",
      story_url: "#",
    },
    content: {
      sentences: [
        "I started keeping a notebook of things I noticed.",
        "Not important things — ordinary ones.",
        "The way light hit the kitchen counter at four in the afternoon.",
        "The particular silence after a bus pulls away.",
        "Within a month, the world looked different.",
        "Nothing had changed except the quality of my attention.",
      ],
      correct_index: 5,
      highlight_density: [0.06, 0.05, 0.14, 0.12, 0.20, 0.43],
    },
    difficulty: "medium",
    hint: "Readers gravitate toward the sentence that names the transformation — not the examples, but the explanation.",
  },
];

const smallTruths: Pack = {
  title: "Small Truths",
  editor: "Mia Tan",
  date: daysAgo(6),
  puzzles: smallTruthsPuzzles,
  welcome: {
    body: "Today's pack is about the things hiding in plain sight — the truths so quiet you almost miss them. Grandmothers who speak in silences. Notebooks that change how the world looks.",
    body2: "These puzzles ask you to slow down and notice. The words matter. So does the space between them.",
  },
  editorNote: "I built this pack around the idea that wisdom doesn't announce itself. The writers here found something true by paying attention to what most people walk past. I hope the puzzles helped you see that too.",
};

// ─── Archive Pack 2: Against the Clock ────────────────────

const againstTheClockPuzzles: Puzzle[] = [
  {
    id: "atc-fill-01",
    mechanic: "fill",
    source: {
      title: "Running Out of Time at Thirty",
      author: "Kenji Mori",
      story_url: "#",
    },
    content: {
      passage:
        "At twenty, time felt ______. By thirty, I could hear it. Every ______ came with a quiet awareness that choosing this meant ______ that.",
      answers: ["infinite", "decision", "losing"],
      full_passage:
        "At twenty, time felt infinite. By thirty, I could hear it. Every decision came with a quiet awareness that choosing this meant losing that.",
    },
    difficulty: "medium",
    hint: "The passage tracks a shift from abundance to scarcity.",
  },
  {
    id: "atc-fill-02",
    mechanic: "fill",
    source: {
      title: "The Tyranny of the Calendar",
      author: "Angela Torres",
      story_url: "#",
    },
    content: {
      passage:
        "We don't ______ our calendars. They manage us. Every shared invite, every ______ block, every recurring meeting is a small ______ of autonomy we barely notice making.",
      answers: ["manage", "focus", "surrender"],
      full_passage:
        "We don't manage our calendars. They manage us. Every shared invite, every focus block, every recurring meeting is a small surrender of autonomy we barely notice making.",
    },
    difficulty: "medium",
    hint: "The author is reversing who's in control.",
  },
  {
    id: "atc-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "Running Out of Time at Thirty",
      author: "Kenji Mori",
      story_url: "#",
    },
    content: {
      lines: [
        "I spent my twenties believing there would always be more time.",
        "More chances to travel, to write, to call my parents back.",
        "Then one morning I realized I was the age my father was when he had me.",
        "The arithmetic was simple but it changed everything.",
        "I wasn't running out of time. I was finally inside it.",
        "That's a different kind of urgency — not panic, but presence.",
      ],
      movable_indices: [1, 3, 5],
    },
    difficulty: "medium",
    hint: "The setup is about youth, the middle is the turning point, the end is the lesson.",
  },
  {
    id: "atc-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "Running Out of Time at Thirty",
      author: "Kenji Mori",
      story_url: "#",
    },
    content: {
      passage_with_errors:
        "The hardest part of getting older isn't the physical decline. Its the narrowing of possibility — the slow realization that your life has a boarder now, and everything you choose to do is also a choice about what you'll never do.",
      errors: [
        { wrong: "Its", correct: "It's" },
        { wrong: "boarder", correct: "border" },
      ],
      corrected_passage:
        "The hardest part of getting older isn't the physical decline. It's the narrowing of possibility — the slow realization that your life has a border now, and everything you choose to do is also a choice about what you'll never do.",
    },
    difficulty: "medium",
    hint: "One error is about possession vs. contraction. The other is about edges, not tenants.",
  },
  {
    id: "atc-highlight-01",
    mechanic: "highlight",
    source: {
      title: "What I Learned From My Father's Urgency",
      author: "Kenji Mori",
      story_url: "#",
    },
    content: {
      sentences: [
        "My father retired on a Friday and started painting on a Monday.",
        "Not because he'd always wanted to paint.",
        "Because he'd always wanted to want something badly enough to begin.",
        "He told me, 'I spent forty years being responsible. Now I'm going to be alive.'",
        "He wasn't very good at painting.",
        "He was magnificent at beginning.",
      ],
      correct_index: 3,
      highlight_density: [0.07, 0.05, 0.16, 0.40, 0.06, 0.26],
    },
    difficulty: "medium",
    hint: "The most highlighted line is often the one where someone speaks — where the mask comes off.",
  },
  {
    id: "atc-highlight-02",
    mechanic: "highlight",
    source: {
      title: "The Tyranny of the Calendar",
      author: "Angela Torres",
      story_url: "#",
    },
    content: {
      sentences: [
        "We treat busyness like a badge of honor.",
        "But it's really a shield.",
        "If every hour is accounted for, you never have to face the discomfort of choosing what actually matters.",
        "The calendar becomes a conscience — or at least, a convincing substitute for one.",
        "I deleted my recurring meetings on a Tuesday.",
        "By Thursday I was terrified. By Sunday I was painting.",
      ],
      correct_index: 2,
      highlight_density: [0.08, 0.12, 0.38, 0.22, 0.07, 0.13],
    },
    difficulty: "hard",
    hint: "Readers highlight the sentence that names the real function of busyness — what it protects you from.",
  },
];

const againstTheClock: Pack = {
  title: "Against the Clock",
  editor: "Raj Patel",
  date: daysAgo(5),
  puzzles: againstTheClockPuzzles,
  welcome: {
    body: "Time is the subject today — not the ticking-clock kind, but the slow realization that your life has borders. These writers found clarity in that awareness.",
    body2: "Fill in the blanks, rearrange the arguments, and see if urgency can be something other than panic.",
  },
  editorNote: "I've been thinking about time differently since putting this pack together. Not as something running out, but as something you can finally feel. The writers here helped me see that. I hope they do the same for you.",
};

// ─── Archive Pack 3: The Long View ────────────────────────

const longViewPuzzles: Puzzle[] = [
  {
    id: "lv-fill-01",
    mechanic: "fill",
    source: {
      title: "Lessons from a Ten-Year Experiment",
      author: "Harold West",
      story_url: "#",
    },
    content: {
      passage:
        "The thing about long-term projects is that they ______ you. You start with a hypothesis and end with a ______. The person who finishes is never the person who ______.",
      answers: ["outlast", "confession", "began"],
      full_passage:
        "The thing about long-term projects is that they outlast you. You start with a hypothesis and end with a confession. The person who finishes is never the person who began.",
    },
    difficulty: "hard",
    hint: "The passage is about transformation through sustained effort.",
  },
  {
    id: "lv-fill-02",
    mechanic: "fill",
    source: {
      title: "The Slow Art of Getting Better",
      author: "Diana Reyes",
      story_url: "#",
    },
    content: {
      passage:
        "Improvement isn't a ______. It's a direction. You don't wake up one morning ______ than you were. You wake up slightly more ______ of what you couldn't see before.",
      answers: ["destination", "better", "aware"],
      full_passage:
        "Improvement isn't a destination. It's a direction. You don't wake up one morning better than you were. You wake up slightly more aware of what you couldn't see before.",
    },
    difficulty: "medium",
    hint: "The author redefines improvement as perception, not achievement.",
  },
  {
    id: "lv-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "Lessons from a Ten-Year Experiment",
      author: "Harold West",
      story_url: "#",
    },
    content: {
      lines: [
        "In year one, I was full of confidence.",
        "By year three, I was full of doubt.",
        "By year five, the doubt had become something else entirely.",
        "Not confidence again — something quieter.",
        "A willingness to keep going without needing to know why.",
        "That, I think, is what patience actually looks like.",
      ],
      movable_indices: [1, 3, 4],
    },
    difficulty: "medium",
    hint: "Confidence dissolves into doubt, then into something beyond both.",
  },
  {
    id: "lv-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "The Slow Art of Getting Better",
      author: "Diana Reyes",
      story_url: "#",
    },
    content: {
      passage_with_errors:
        "Practice doesn't make perfect — that phrase has always been misleading. Practice makes permanant. Whatever you repeat, whether it's good form or bad, becomes the default. The only question is weather you're practicing the right things.",
      errors: [
        { wrong: "permanant", correct: "permanent" },
        { wrong: "weather", correct: "whether" },
      ],
      corrected_passage:
        "Practice doesn't make perfect — that phrase has always been misleading. Practice makes permanent. Whatever you repeat, whether it's good form or bad, becomes the default. The only question is whether you're practicing the right things.",
    },
    difficulty: "medium",
    hint: "One word describes climate. The other describes choice. And check your vowels.",
  },
  {
    id: "lv-highlight-01",
    mechanic: "highlight",
    source: {
      title: "The Slow Art of Getting Better",
      author: "Diana Reyes",
      story_url: "#",
    },
    content: {
      sentences: [
        "Nobody tells you that mastery is mostly boredom.",
        "You do the same thing, in the same room, for years.",
        "The improvements are invisible to everyone, including you.",
        "And then one day, your hands know something your mind hasn't caught up to yet.",
        "That's the moment. Not a breakthrough — a recognition.",
        "You've been good for a while. You just didn't notice.",
      ],
      correct_index: 3,
      highlight_density: [0.10, 0.06, 0.08, 0.44, 0.18, 0.14],
    },
    difficulty: "medium",
    hint: "The most highlighted sentence often captures a felt experience — something the reader's body recognizes before their mind does.",
  },
  {
    id: "lv-highlight-02",
    mechanic: "highlight",
    source: {
      title: "Lessons from a Ten-Year Experiment",
      author: "Harold West",
      story_url: "#",
    },
    content: {
      sentences: [
        "I started the project at thirty-two, certain I knew what I was doing.",
        "By thirty-five I'd thrown out the original plan entirely.",
        "By forty, I'd stopped planning at all.",
        "The thing about long-term projects is that they outlast you.",
        "You start with a hypothesis and end with a confession.",
        "The person who finishes is never the person who began.",
      ],
      correct_index: 5,
      highlight_density: [0.04, 0.06, 0.08, 0.15, 0.22, 0.45],
    },
    difficulty: "medium",
    hint: "The most highlighted sentence is the one that turns a story about a project into a story about identity.",
  },
];

const longView: Pack = {
  title: "The Long View",
  editor: "Clara Hughes",
  date: daysAgo(4),
  puzzles: longViewPuzzles,
  welcome: {
    body: "Patience is underrated. Today's writers spent years — sometimes decades — learning something that couldn't be rushed. Their essays are proof that the slow way is sometimes the only way.",
    body2: "Four puzzles, each drawn from writing about persistence. Take your time with them. That's sort of the point.",
  },
  editorNote: "This pack was the hardest to curate, because the best writing about patience is itself patient. These passages don't hurry. I hope you didn't either.",
};

// ─── Archive Pack 4: Quiet Machines ───────────────────────

const quietMachinesPuzzles: Puzzle[] = [
  {
    id: "qm-fill-01",
    mechanic: "fill",
    source: {
      title: "The Algorithm Knows You Better Than You Do",
      author: "Sana Malik",
      story_url: "#",
    },
    content: {
      passage:
        "The algorithm doesn't ______ you. It reflects you — the version of yourself that ______ at two in the morning, the one that searches for ______ in the form of content.",
      answers: ["judge", "scrolls", "reassurance"],
      full_passage:
        "The algorithm doesn't judge you. It reflects you — the version of yourself that scrolls at two in the morning, the one that searches for reassurance in the form of content.",
    },
    difficulty: "medium",
    hint: "The algorithm is a mirror, not a critic.",
  },
  {
    id: "qm-fill-02",
    mechanic: "fill",
    source: {
      title: "Why I Stopped Using My Phone Before Bed",
      author: "James Cooper",
      story_url: "#",
    },
    content: {
      passage:
        "The last thing I saw each night was a ______. Not a book, not a person — a screen. I'd ______ through other people's days until my own felt ______ enough to end.",
      answers: ["glow", "scroll", "small"],
      full_passage:
        "The last thing I saw each night was a glow. Not a book, not a person — a screen. I'd scroll through other people's days until my own felt small enough to end.",
    },
    difficulty: "hard",
    hint: "The passage moves from what you see, to what you do, to how it makes you feel.",
  },
  {
    id: "qm-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "The Algorithm Knows You Better Than You Do",
      author: "Sana Malik",
      story_url: "#",
    },
    content: {
      lines: [
        "I deleted my social media accounts on a Tuesday.",
        "By Thursday, I'd reinstalled two of them.",
        "Not because I missed the people.",
        "Because I missed being known.",
        "The algorithm had built a version of me that felt more consistent than I did.",
        "Leaving it behind felt less like freedom and more like forgetting.",
      ],
      movable_indices: [1, 3, 5],
    },
    difficulty: "hard",
    hint: "Deletion leads to return. The reason isn't connection — it's identity.",
  },
  {
    id: "qm-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "The Algorithm Knows You Better Than You Do",
      author: "Sana Malik",
      story_url: "#",
    },
    content: {
      passage_with_errors:
        "The principle danger of personalized feeds isn't misinformation — it's confirmation. When every peice of content confirms what you already believe, disagreement starts to feel like a bug rather then a feature of public life.",
      errors: [
        { wrong: "principle", correct: "principal" },
        { wrong: "peice", correct: "piece" },
        { wrong: "then", correct: "than" },
      ],
      corrected_passage:
        "The principal danger of personalized feeds isn't misinformation — it's confirmation. When every piece of content confirms what you already believe, disagreement starts to feel like a bug rather than a feature of public life.",
    },
    difficulty: "hard",
    hint: "One is a homophone mix-up. One breaks the i-before-e rule. One confuses sequence with comparison.",
  },
  {
    id: "qm-highlight-01",
    mechanic: "highlight",
    source: {
      title: "The Algorithm Knows You Better Than You Do",
      author: "Sana Malik",
      story_url: "#",
    },
    content: {
      sentences: [
        "The algorithm doesn't care about your intentions.",
        "It cares about your 2 AM scrolling, your hesitations, the posts you almost liked but didn't.",
        "It reads the you that you don't perform.",
        "And it reflects that person back with terrifying accuracy.",
        "We say we want to be understood. We don't.",
        "We want to be understood on our own terms. The algorithm has no terms. Just data.",
      ],
      correct_index: 2,
      highlight_density: [0.06, 0.14, 0.38, 0.20, 0.12, 0.10],
    },
    difficulty: "hard",
    hint: "Short sentences that reframe everything tend to get the most highlights. Look for the pivot.",
  },
  {
    id: "qm-highlight-02",
    mechanic: "highlight",
    source: {
      title: "Why I Stopped Using My Phone Before Bed",
      author: "James Cooper",
      story_url: "#",
    },
    content: {
      sentences: [
        "The last thing I saw each night was a glow.",
        "Not a book, not a person — a screen.",
        "I'd scroll through other people's days until my own felt small enough to end.",
        "The phone wasn't keeping me awake.",
        "It was keeping me from wanting to sleep.",
        "That's a different kind of problem.",
      ],
      correct_index: 2,
      highlight_density: [0.07, 0.09, 0.42, 0.10, 0.22, 0.10],
    },
    difficulty: "medium",
    hint: "Readers stop at the line that makes the familiar feel newly strange. Look for the image that reframes everything.",
  },
];

const quietMachines: Pack = {
  title: "Quiet Machines",
  editor: "Leo Park",
  date: daysAgo(3),
  puzzles: quietMachinesPuzzles,
  welcome: {
    body: "We built the machines. Now they're building us back. Today's pack explores our relationship with technology — the algorithms that know us, the screens that bookend our days, the boredom we've forgotten how to feel.",
    body2: "Six puzzles about what we gave up and what we might get back.",
  },
  editorNote: "I put my phone down while editing this pack. Not as a stunt — the passages just made it feel strange to be scrolling. That's the sign of writing that works on you, not just in front of you.",
};

// ─── Archive Pack 5: Open Questions ───────────────────────

const openQuestionsPuzzles: Puzzle[] = [
  {
    id: "oq-fill-01",
    mechanic: "fill",
    source: {
      title: "The Questions That Don't Have Answers",
      author: "Lena Ostroff",
      story_url: "#",
    },
    content: {
      passage:
        "The best teachers I had didn't give answers. They gave ______. A well-placed question can ______ a room in a way that no lecture ever could. It ______ people to think rather than simply agree.",
      answers: ["questions", "unsettle", "forces"],
      full_passage:
        "The best teachers I had didn't give answers. They gave questions. A well-placed question can unsettle a room in a way that no lecture ever could. It forces people to think rather than simply agree.",
    },
    difficulty: "medium",
    hint: "The author values disruption over certainty.",
  },
  {
    id: "oq-fill-02",
    mechanic: "fill",
    source: {
      title: "Learning to Sit with Uncertainty",
      author: "Michael Adeyemi",
      story_url: "#",
    },
    content: {
      passage:
        "Certainty is ______. Not because it's wrong, but because it stops the ______. The moment you decide you know, you stop looking. And the world has a way of ______ people who stop looking.",
      answers: ["expensive", "conversation", "punishing"],
      full_passage:
        "Certainty is expensive. Not because it's wrong, but because it stops the conversation. The moment you decide you know, you stop looking. And the world has a way of punishing people who stop looking.",
    },
    difficulty: "hard",
    hint: "Knowledge has a cost — not in being wrong, but in closing doors.",
  },
  {
    id: "oq-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "The Questions That Don't Have Answers",
      author: "Lena Ostroff",
      story_url: "#",
    },
    content: {
      lines: [
        "My daughter asked me why people die.",
        "I started to give her the biological answer.",
        "Then I stopped, because I realized she wasn't asking about biology.",
        "She was asking whether it was fair.",
        "I didn't have an answer for that.",
        "But sitting with her in the not-knowing felt like enough.",
      ],
      movable_indices: [1, 3, 5],
    },
    difficulty: "medium",
    hint: "A question, then an attempted answer, then realizing the real question, then acceptance.",
  },
  {
    id: "oq-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "The Questions That Don't Have Answers",
      author: "Lena Ostroff",
      story_url: "#",
    },
    content: {
      passage_with_errors:
        "Children ask better questions then adults because they haven't yet learned to be embarrassed by not knowing. Curiosity isn't a trait you loose with age — it's one you learn to supress, one awkward silence at a time.",
      errors: [
        { wrong: "then", correct: "than" },
        { wrong: "loose", correct: "lose" },
        { wrong: "supress", correct: "suppress" },
      ],
      corrected_passage:
        "Children ask better questions than adults because they haven't yet learned to be embarrassed by not knowing. Curiosity isn't a trait you lose with age — it's one you learn to suppress, one awkward silence at a time.",
    },
    difficulty: "medium",
    hint: "One is a comparison word. One means to release, not to misplace. One is missing a letter.",
  },
  {
    id: "oq-highlight-01",
    mechanic: "highlight",
    source: {
      title: "What My Daughter Taught Me About Doubt",
      author: "Michael Adeyemi",
      story_url: "#",
    },
    content: {
      sentences: [
        "My daughter asked me if the sky was sad when it rained.",
        "I started to say no, then stopped.",
        "What kind of person answers a child's question with a fact?",
        "She wasn't asking about weather. She was asking if the world had feelings.",
        "And honestly, I'm not sure it doesn't.",
        "Some questions are better left open, like windows in a warm room.",
      ],
      correct_index: 5,
      highlight_density: [0.06, 0.04, 0.15, 0.14, 0.19, 0.42],
    },
    difficulty: "medium",
    hint: "The most highlighted line is often the one with a metaphor that ties everything together.",
  },
  {
    id: "oq-highlight-02",
    mechanic: "highlight",
    source: {
      title: "Learning to Sit with Uncertainty",
      author: "Michael Adeyemi",
      story_url: "#",
    },
    content: {
      sentences: [
        "I used to think ambiguity was a problem to solve.",
        "Every gray area was just a decision I hadn't made yet.",
        "Then I spent a year working on a project with no clear outcome.",
        "No roadmap, no metrics, no way to know if it was working.",
        "Somewhere around month six, I stopped needing to know.",
        "The work itself became the answer.",
      ],
      correct_index: 4,
      highlight_density: [0.07, 0.08, 0.11, 0.13, 0.38, 0.23],
    },
    difficulty: "hard",
    hint: "Readers often highlight the sentence where the author's relationship with the problem actually changes — not the conclusion, but the turning point.",
  },
];

const openQuestions: Pack = {
  title: "Open Questions",
  editor: "Nina Osei",
  date: daysAgo(2),
  puzzles: openQuestionsPuzzles,
  welcome: {
    body: "Some questions don't have answers — and that's not a failure, it's a feature. Today's writers sit with uncertainty, ask the questions their children ask, and find clarity in not-knowing.",
    body2: "Six puzzles that reward curiosity over certainty. If you're not sure, that's the right feeling.",
  },
  editorNote: "I chose these passages because they made me uncomfortable in the best way. The writers here don't pretend to know more than they do. That honesty is rare, and worth playing with.",
};

// ─── Archive Pack 6: First Light ──────────────────────────

const firstLightPuzzles: Puzzle[] = [
  {
    id: "fl-fill-01",
    mechanic: "fill",
    source: {
      title: "Starting Over at Fifty",
      author: "Ruth Kessler",
      story_url: "#",
    },
    content: {
      passage:
        "Starting over doesn't mean going back. It means ______ forward with less ______. I'd spent decades accumulating — things, opinions, obligations. Letting go wasn't ______. It was architectural. I was clearing the floor plan.",
      answers: ["moving", "weight", "emotional"],
      full_passage:
        "Starting over doesn't mean going back. It means moving forward with less weight. I'd spent decades accumulating — things, opinions, obligations. Letting go wasn't emotional. It was architectural. I was clearing the floor plan.",
    },
    difficulty: "hard",
    hint: "The metaphor shifts from physical movement to building design.",
  },
  {
    id: "fl-fill-02",
    mechanic: "fill",
    source: {
      title: "The Morning Everything Changed",
      author: "Dante Ruiz",
      story_url: "#",
    },
    content: {
      passage:
        "The phone rang at 6 a.m. on a ______. Nobody calls with good news at that hour. By the time I hung up, every plan I'd made for the next five years had become ______. Not canceled — just suddenly, completely ______.",
      answers: ["Tuesday", "irrelevant", "optional"],
      full_passage:
        "The phone rang at 6 a.m. on a Tuesday. Nobody calls with good news at that hour. By the time I hung up, every plan I'd made for the next five years had become irrelevant. Not canceled — just suddenly, completely optional.",
    },
    difficulty: "hard",
    hint: "The day of the week is mundane. The plans don't disappear — they just stop mattering.",
  },
  {
    id: "fl-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "Starting Over at Fifty",
      author: "Ruth Kessler",
      story_url: "#",
    },
    content: {
      lines: [
        "Everyone told me I was brave for starting a new career at fifty.",
        "I didn't feel brave. I felt terrified.",
        "But terror and excitement, I was learning, feel almost identical.",
        "The same racing heart, the same sleepless nights.",
        "The only difference is the story you tell yourself about what comes next.",
        "I chose the story where this was a beginning.",
      ],
      movable_indices: [1, 3, 5],
    },
    difficulty: "medium",
    hint: "Bravery, then fear, then realizing they're the same, then choosing meaning.",
  },
  {
    id: "fl-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "Starting Over at Fifty",
      author: "Ruth Kessler",
      story_url: "#",
    },
    content: {
      passage_with_errors:
        "The hardest part of starting over wasn't learning new things. It was unlearning the old ones. Every instinct I'd developed over thirty years in the same feild was now a liability. My experiance wasn't guiding me — it was anchoring me to a world that no longer existed.",
      errors: [
        { wrong: "feild", correct: "field" },
        { wrong: "experiance", correct: "experience" },
      ],
      corrected_passage:
        "The hardest part of starting over wasn't learning new things. It was unlearning the old ones. Every instinct I'd developed over thirty years in the same field was now a liability. My experience wasn't guiding me — it was anchoring me to a world that no longer existed.",
    },
    difficulty: "easy",
    hint: "Both are common misspellings. The vowel combinations are tricky.",
  },
  {
    id: "fl-highlight-01",
    mechanic: "highlight",
    source: {
      title: "The Morning Everything Changed",
      author: "Dante Ruiz",
      story_url: "#",
    },
    content: {
      sentences: [
        "I woke up early the day after my mother died and made coffee.",
        "Same mug, same kitchen, same view of the backyard.",
        "Everything was identical, and nothing was the same.",
        "I stood there holding a cup of coffee like it was the only real thing left in the world.",
        "And maybe it was. Maybe that's how grief works.",
        "It doesn't take things away. It changes what the remaining things mean.",
      ],
      correct_index: 5,
      highlight_density: [0.08, 0.05, 0.18, 0.14, 0.10, 0.45],
    },
    difficulty: "medium",
    hint: "Readers tend to highlight the sentence that gives the passage its thesis — the one that makes sense of everything before it.",
  },
  {
    id: "fl-highlight-02",
    mechanic: "highlight",
    source: {
      title: "Starting Over at Fifty",
      author: "Ruth Kessler",
      story_url: "#",
    },
    content: {
      sentences: [
        "Everyone told me I was brave for starting a new career at fifty.",
        "I didn't feel brave. I felt terrified.",
        "But terror and excitement, I was learning, feel almost identical.",
        "The same racing heart, the same sleepless nights.",
        "The only difference is the story you tell yourself about what comes next.",
        "I chose the story where this was a beginning.",
      ],
      correct_index: 4,
      highlight_density: [0.05, 0.10, 0.19, 0.08, 0.42, 0.16],
    },
    difficulty: "medium",
    hint: "Readers highlight the sentence that reframes fear as something other than failure — where the pivot happens in the mind.",
  },
];

const firstLight: Pack = {
  title: "First Light",
  editor: "Sam Okafor",
  date: daysAgo(1),
  puzzles: firstLightPuzzles,
  welcome: {
    body: "Beginnings are terrifying. They're also the only way anything new happens. Today's writers started over — at fifty, after a phone call, in a kitchen full of morning light — and found something worth keeping.",
    body2: "Six puzzles about what it feels like when everything changes and you have to choose what comes next.",
  },
  editorNote: "Every essay in this pack is about a moment when the old story ended and a new one had to begin. The writers didn't know how it would turn out. That's what makes their words worth sitting with.",
};

// ─── Exports ──────────────────────────────────────────────

export const packArchive: Pack[] = [
  smallTruths,
  againstTheClock,
  longView,
  quietMachines,
  openQuestions,
  firstLight,
];

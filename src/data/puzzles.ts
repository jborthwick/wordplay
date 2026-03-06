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

// ─── Daily Pack: Still Lifting ─────────────────────────────

const stillLiftingPuzzles: Puzzle[] = [
  {
    id: "sl-fill-01",
    mechanic: "fill",
    source: {
      title: "The End of History? Women's History (Her Story) Month",
      author: "Bama Athreya",
      story_url: "https://bamaathreya.medium.com/the-end-of-history-womens-history-her-story-month-69f99a9de6f1",
      author_url: "https://medium.com/@bamaathreya",
    },
    content: {
      passage:
        "Why would it make sense to impose a ______ on five decades of evidence, and halt the possibility of gathering new data? I believe it was never about ensuring all boats were ______. Those in power have never let go of the idea that access to resources is a ______ game.",
      answers: ["blackout", "lifted", "zero-sum"],
      full_passage:
        "Why would it make sense to impose a blackout on five decades of evidence, and halt the possibility of gathering new data? I believe it was never about ensuring all boats were lifted. Those in power have never let go of the idea that access to resources is a zero-sum game.",
    },
    difficulty: "medium",
    hint: "The author is connecting data erasure to a deeper ideology about scarcity and power. Think about what metaphors she's using.",
  },
  {
    id: "sl-fill-02",
    mechanic: "fill",
    source: {
      title: "Why Women's History Month Matters for All Women",
      author: "Vilma G. Reynoso",
      story_url: "https://medium.com/fourth-wave/why-womens-history-month-matters-for-all-women-978090b95f93",
      author_url: "https://medium.com/@vilmareynoso",
    },
    content: {
      passage:
        "She emerges when I least expect it and fills my mind with unrelenting ______ ______.",
      answers: ["what", "ifs"],
      full_passage:
        "She emerges when I least expect it and fills my mind with unrelenting \"what ifs.\"",
    },
    difficulty: "easy",
    hint: "Grief doesn't arrive on schedule. What kind of thoughts does it bring with it?",
  },
  {
    id: "sl-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "Women's History Month feels more serious than usual. That's a good thing.",
      author: "The Medium Newsletter",
      story_url: "https://medium.com/blog/womens-history-month-feels-more-serious-than-usual-that-s-a-good-thing-c993ef1a9193",
      author_url: "https://medium.com/@dailynewsletter",
    },
    content: {
      lines: [
        "I used to think of Women's History Month as a constant, something I could expect.",
        "A month dedicated to joyful, albeit sometimes silly, celebrations of dreamy possibility.",
        "While I miss those cheery days, even if they were overtly cliche at times, I ask myself:",
        "Would I want it back?",
        "This new version is less fun, perhaps, but also:",
        "Isn't it more exacting, more actionable, more intersectional, more… real?",
        "Maybe so. Maybe it is what we deserve, after all.",
      ],
      movable_indices: [3, 4, 5],
    },
    difficulty: "medium",
    hint: "The author is building toward a question she answers herself. Follow the emotional arc from nostalgia to reckoning.",
  },
  {
    id: "sl-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "Lessons from My Hackathon on Tackling Violence Against Women and Girls in Public Spaces",
      author: "Jodie Keens",
      story_url: "https://medium.com/@jodiekeens/lessons-from-my-hackathon-on-tackling-violence-against-women-and-girls-in-public-spaces-9008830dc45a",
      author_url: "https://medium.com/@jodiekeens",
    },
    content: {
      passage_with_errors:
        "Like so many social issues, VAWG isn't \"too complex\" for product thinking. It's exactly the kind of challange that product, design and technology should be leening into. I'm more commited than ever to advocating for technology that engages sensitively with social issues.",
      errors: [
        { wrong: "challange", correct: "challenge" },
        { wrong: "leening", correct: "leaning" },
        { wrong: "commited", correct: "committed" },
      ],
      corrected_passage:
        "Like so many social issues, VAWG isn't \"too complex\" for product thinking. It's exactly the kind of challenge that product, design and technology should be leaning into. I'm more committed than ever to advocating for technology that engages sensitively with social issues.",
    },
    difficulty: "medium",
    hint: "Look for common spelling mistakes — doubled letters that aren't, and vowels that shifted.",
  },
  {
    id: "sl-highlight-01",
    mechanic: "highlight",
    source: {
      title: "The End of History? Women's History (Her Story) Month",
      author: "Bama Athreya",
      story_url: "https://bamaathreya.medium.com/the-end-of-history-womens-history-her-story-month-69f99a9de6f1",
      author_url: "https://medium.com/@bamaathreya",
    },
    content: {
      sentences: [
        "Our project this year should be to ensure we have the means to convey our stories and our data to the next generation.",
        "We can continue to influence and inform public policy when we see openings, but only if we ensure we, and those who follow us, have access to the wealth of evidence we've generated over the past decades.",
        "Women have always had to resort to many different techniques to share our knowledge — weaving, songs, stories.",
        "We must continue to document but we also need to take what we already know and find new ways to share it.",
        "Let his story end.",
        "Let's commemorate the allies who will work together today and in future to preserve, protect and continue to promote our stories.",
      ],
      correct_index: 2,
      highlight_density: [0.15, 0.12, 0.38, 0.18, 0.07, 0.1],
    },
    difficulty: "medium",
    hint: "Which sentence captures the longest tradition of resistance? Look for the one that reaches furthest back.",
  },
  {
    id: "sl-highlight-02",
    mechanic: "highlight",
    source: {
      title: "Why Women's History Month Matters for All Women",
      author: "Vilma G. Reynoso",
      story_url: "https://medium.com/fourth-wave/why-womens-history-month-matters-for-all-women-978090b95f93",
      author_url: "https://medium.com/@vilmareynoso",
    },
    content: {
      sentences: [
        "My mom was brilliant, the most creative person I have ever known.",
        "She made her own wedding dress from scratch.",
        "In Argentina, before she married my father, she designed and sewed hundreds of wedding dresses for other women.",
        "Well known in her community as a master seamstress, she should be remembered, too.",
        "She deserves recognition for her contributions to society.",
        "She did not win a Nobel Peace Prize like Marie Curie, nor sit on the bench like Rosa Parks, nor was she exceptionally famous, but she should be celebrated for her work behind the scenes, nonetheless.",
      ],
      correct_index: 5,
      highlight_density: [0.12, 0.08, 0.14, 0.11, 0.1, 0.45],
    },
    difficulty: "easy",
    hint: "The author is making a case for a different kind of recognition. Which sentence makes that argument most fully?",
  },
];

// ─── Daily Pack ───────────────────────────────────────────

export const dailyPack: Pack = {
  title: "Still Lifting",
  editor: "The Wordplay Team",
  date: localDateStr(new Date()),
  puzzles: seededShuffle([...stillLiftingPuzzles], dateSeed),
  welcome: {
    body: "This pack is about women's stories — the ones we tell, the ones we fight to keep, and the ones that persist even when someone tries to erase them. These puzzles draw from writers reflecting on Women's History Month in a year that feels heavier than most.",
    body2: "The words here carry weight. Some mourn what's been lost; others insist on what remains. Pay attention to who's speaking and what they refuse to let go of.",
  },
  editorNote: "I built this pack around the idea that history isn't handed down — it's held onto. Every writer here is holding something: evidence, memory, hope, or a question that won't stop asking itself. I hope you leave with one of your own.",
};

// ─── Archive Pack: What We Owe ─────────────────────────────

const whatWeOwePuzzles: Puzzle[] = [
  {
    id: "wwo-fill-01",
    mechanic: "fill",
    source: {
      title: "The Anti-Empathy Movement & the End of the Iliad",
      author: "Maximus Planudes",
      story_url: "https://planudes.medium.com/the-anti-empathy-movement-the-end-of-the-iliad-d77470865a8c",
      author_url: "https://medium.com/@planudes",
    },
    content: {
      passage:
        "The capacity to recognize another person's suffering as real, as mattering, as somehow connected to one's own ______ — that capacity is what Homer chose to place at his epic's conclusion. Not the triumph of arms or the fall of cities, but two men ______ together over the inescapable sorrow of being ______.",
      answers: ["vulnerability", "weeping", "mortal"],
      full_passage:
        "The capacity to recognize another person's suffering as real, as mattering, as somehow connected to one's own vulnerability — that capacity is what Homer chose to place at his epic's conclusion. Not the triumph of arms or the fall of cities, but two men weeping together over the inescapable sorrow of being mortal.",
    },
    difficulty: "medium",
    hint: "The author is describing what Achilles and Priam share. Think about what connects enemies at the deepest level.",
  },
  {
    id: "wwo-fill-02",
    mechanic: "fill",
    source: {
      title: "When Being Right Costs You the Relationship: Rethinking Feedback",
      author: "Malynnda Stewart, PhD, BCPA",
      story_url: "https://medium.com/@malynnda.stewart/when-being-right-costs-you-the-relationship-rethinking-feedback-14d39b10fba9",
      author_url: "https://medium.com/@malynnda.stewart",
    },
    content: {
      passage:
        "I chose ______ over connected. Repeatedly. Until there was nothing left to be ______ about.",
      answers: ["right", "right"],
      full_passage:
        "I chose right over connected. Repeatedly. Until there was nothing left to be right about.",
    },
    difficulty: "easy",
    hint: "The author is reflecting on a pattern that cost her a relationship. What was she prioritizing?",
  },
  {
    id: "wwo-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "Einstein the \"lone genius\" is a complete myth",
      author: "Ethan Siegel",
      story_url: "https://medium.com/starts-with-a-bang/einstein-the-lone-genius-is-a-complete-myth-dd76cfabbf35",
      author_url: "https://medium.com/@startswithabang",
    },
    content: {
      lines: [
        "It was precisely because Einstein had the education and background that he did — his own unique toolkit, as it were — that he was able to approach this variety of problems in a self-consistent, non-contradictory way.",
        "It was because of his friends and collaborators that he was exposed to ideas that helped him to progress, rather than stagnate.",
        "And it was because of his willingness and even eagerness to rely on the input and expertise of others, and to take inspiration from them and incorporate it into his own work,",
        "that his excellent ideas, many of which were profound but that began as mere seeds,",
        "were able to sprout into the towering achievements we still acknowledge today.",
      ],
      movable_indices: [1, 2, 3],
    },
    difficulty: "medium",
    hint: "The author is building an argument about what made Einstein successful. Follow the logical progression from education to collaboration to outcome.",
  },
  {
    id: "wwo-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "The Anti-Empathy Movement & the End of the Iliad",
      author: "Maximus Planudes",
      story_url: "https://planudes.medium.com/the-anti-empathy-movement-the-end-of-the-iliad-d77470865a8c",
      author_url: "https://medium.com/@planudes",
    },
    content: {
      passage_with_errors:
        "The conservitive Christian anti-empathy movement seems to be working only with a simplistic idea of affective empathy. They do not engage with the rich tradition of cognitive empathy or the ways of transforming affective empathy into sustainible compassion. They're not offering contemplitive practices for working with difficult emotions; they're refusing to feel others' pain altogether.",
      errors: [
        { wrong: "conservitive", correct: "conservative" },
        { wrong: "sustainible", correct: "sustainable" },
        { wrong: "contemplitive", correct: "contemplative" },
      ],
      corrected_passage:
        "The conservative Christian anti-empathy movement seems to be working only with a simplistic idea of affective empathy. They do not engage with the rich tradition of cognitive empathy or the ways of transforming affective empathy into sustainable compassion. They're not offering contemplative practices for working with difficult emotions; they're refusing to feel others' pain altogether.",
    },
    difficulty: "medium",
    hint: "Look for words with similar vowel patterns — some have been subtly shifted.",
  },
  {
    id: "wwo-highlight-01",
    mechanic: "highlight",
    source: {
      title: "The Anti-Empathy Movement & the End of the Iliad",
      author: "Maximus Planudes",
      story_url: "https://planudes.medium.com/the-anti-empathy-movement-the-end-of-the-iliad-d77470865a8c",
      author_url: "https://medium.com/@planudes",
    },
    content: {
      sentences: [
        "For Rigney and company, empathy threatens the self, it dissolves boundaries, confuses morals, capitulates to evil.",
        "The self must be defended against contamination by others' suffering.",
        "For Homer, the capacity to recognize another's suffering constitutes the self.",
        "Achilles becomes fully human precisely through recovering his αἰδώς toward Priam, which means recovering it toward himself, and finding solidarity in ἔλεος for universal human suffering.",
        "The anti-empathy movement would read Achilles' transformation as capitulation, as letting Priam's emotional manipulation override truth and justice.",
        "Homer reads it as the only path to recovering one's human self.",
      ],
      correct_index: 2,
      highlight_density: [0.12, 0.08, 0.42, 0.18, 0.1, 0.1],
    },
    difficulty: "medium",
    hint: "The author is contrasting two views of the self. Which sentence captures Homer's radical inversion most directly?",
  },
  {
    id: "wwo-highlight-02",
    mechanic: "highlight",
    source: {
      title: "When Being Right Costs You the Relationship: Rethinking Feedback",
      author: "Malynnda Stewart, PhD, BCPA",
      story_url: "https://medium.com/@malynnda.stewart/when-being-right-costs-you-the-relationship-rethinking-feedback-14d39b10fba9",
      author_url: "https://medium.com/@malynnda.stewart",
    },
    content: {
      sentences: [
        "She listened.",
        "And then she asked a question that stopped me cold: \"Do you want to be right, or do you want to be connected?\"",
        "I sat there, silent.",
        "Because the honest answer was: I wanted both.",
        "Of course, I wanted both.",
        "Why couldn't I have both?",
      ],
      correct_index: 1,
      highlight_density: [0.05, 0.48, 0.08, 0.15, 0.12, 0.12],
    },
    difficulty: "easy",
    hint: "One sentence contains the question that changed everything for the author. Which one carries the most weight?",
  },
];

const whatWeOwe: Pack = {
  title: "What We Owe",
  editor: "The Wordplay Team",
  date: daysAgo(7),
  puzzles: whatWeOwePuzzles,
  welcome: {
    body: "This pack is about connection — the kind we cultivate, the kind we deny, and the kind that makes any real achievement possible. These puzzles draw from writers thinking about empathy: what the ancients called it, why some want to abolish it, and what we lose when we choose being right over being close.",
    body2: "The words here ask you to sit with discomfort. To consider enemies weeping together, geniuses who needed friends, and the quiet cost of winning every argument.",
  },
  editorNote: "I built this pack around a question that kept surfacing in these pieces: What happens when we stop recognizing each other's suffering? The answers weren't comfortable, but they felt true. I hope you leave with the question still turning.",
};

// ─── Archive Pack: The New Threshold ───────────────────────

const newThresholdPuzzles: Puzzle[] = [
  {
    id: "tnt-fill-01",
    mechanic: "fill",
    source: {
      title: "26 Rules to Be a Better Thinker in 2026",
      author: "Ryan Holiday",
      story_url: "https://ryanholiday.medium.com/26-rules-to-be-a-better-thinker-in-2026-6393399aad3d",
      author_url: "https://medium.com/@ryanholiday",
    },
    content: {
      passage:
        "People are talking about what AI is going to replace, that it's the sum total of all human knowledge, that it's going to make ______ obsolete. And it's true it will do a lot and it is unbelievably powerful, but in many ways it makes ______ even more important.",
      answers: ["expertise", "thinking"],
      full_passage:
        "People are talking about what AI is going to replace, that it's the sum total of all human knowledge, that it's going to make expertise obsolete. And it's true it will do a lot and it is unbelievably powerful, but in many ways it makes thinking even more important.",
    },
    difficulty: "easy",
    hint: "The author is setting up a paradox. What does everyone fear AI will eliminate — and what does it actually demand more of?",
  },
  {
    id: "tnt-fill-02",
    mechanic: "fill",
    source: {
      title: "26 Rules to Be a Better Thinker in 2026",
      author: "Ryan Holiday",
      story_url: "https://ryanholiday.medium.com/26-rules-to-be-a-better-thinker-in-2026-6393399aad3d",
      author_url: "https://medium.com/@ryanholiday",
    },
    content: {
      passage:
        "The irony of AI, this cutting-edge technology, is that it makes the ______ more valuable than ever. It makes ______ even more important. Reading. Knowing things. Having taste. Understanding context. Detecting lies or nonsense.",
      answers: ["humanities", "brainpower"],
      full_passage:
        "The irony of AI, this cutting-edge technology, is that it makes the humanities more valuable than ever. It makes brainpower even more important. Reading. Knowing things. Having taste. Understanding context. Detecting lies or nonsense.",
    },
    difficulty: "medium",
    hint: "The author is naming the unexpected beneficiaries of the AI age. Think about the disciplines everyone assumed would be first to go.",
  },
  {
    id: "tnt-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "Will Humans Still Review Code?",
      author: "Francisco Trindade",
      story_url: "https://franciscomt.medium.com/will-humans-still-review-code-a6f7d3f0c39c",
      author_url: "https://medium.com/@franciscomt",
    },
    content: {
      lines: [
        "While having an engineer write code surely takes time, it is only one part of the value delivery chain that starts with an idea and culminates in a feature in production.",
        "Even if you focus on the engineering aspects of it, when you look at most enterprise companies, you will find that engineering work is usually stuck in reviews, deployment, testing, and different levels of rework.",
        "Writing code is one of many steps in delivering value with software.",
        "There is no way to examine the current state of the industry without recognizing that the bottleneck lies elsewhere.",
        "What is new is how AI-assisted development made this situation extremely obvious.",
      ],
      movable_indices: [1, 2, 3],
    },
    difficulty: "medium",
    hint: "The author is making a case that the real slowdown was never where we thought. Follow the logic from the part to the whole to the punchline.",
  },
  {
    id: "tnt-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "26 Rules to Be a Better Thinker in 2026",
      author: "Ryan Holiday",
      story_url: "https://ryanholiday.medium.com/26-rules-to-be-a-better-thinker-in-2026-6393399aad3d",
      author_url: "https://medium.com/@ryanholiday",
    },
    content: {
      passage_with_errors:
        "Empathy is as much a practical skill as it is a moral one. If you don't have the ability to think about what other people think about this or that situation, to imagin how something looks from someone else's perspektive, then you have a very limited veiw of reality.",
      errors: [
        { wrong: "imagin", correct: "imagine" },
        { wrong: "perspektive", correct: "perspective" },
        { wrong: "veiw", correct: "view" },
      ],
      corrected_passage:
        "Empathy is as much a practical skill as it is a moral one. If you don't have the ability to think about what other people think about this or that situation, to imagine how something looks from someone else's perspective, then you have a very limited view of reality.",
    },
    difficulty: "easy",
    hint: "These errors are easy to glance past. Read slowly, one word at a time — the mistakes are in words you're most tempted to assume you know.",
  },
  {
    id: "tnt-highlight-01",
    mechanic: "highlight",
    source: {
      title: "The tipping point",
      author: "Thomas Ricouard",
      story_url: "https://dimillian.medium.com/the-tipping-point-d624283cbd6d",
      author_url: "https://medium.com/@dimillian",
    },
    content: {
      sentences: [
        "I think the past couple of weeks have probably been the most intensive in terms of AI time contraction.",
        "So much happens in so little time, and the collective opinion seems to have shifted.",
        "From 'yeah, it works and can write some code for me', to 'wow, I can run multiple agents in parallel to run a bunch of things'.",
        "It's a sort of collective awakening.",
        "A year ago, if I told you that you'll mostly only review code those days, and not write a single line yourself, you would have looked at me weirdly.",
        "Truth is, now it's better code than the average Software Engineer, and if you know what you're doing, you can produce an ungodly amount of good-looking code in a fraction of the time it would have taken you before.",
      ],
      correct_index: 3,
      highlight_density: [0.08, 0.07, 0.11, 0.42, 0.18, 0.14],
    },
    difficulty: "easy",
    hint: "The author is reaching for a phrase that names the whole moment. Which sentence is the caption for everything else?",
  },
  {
    id: "tnt-highlight-02",
    mechanic: "highlight",
    source: {
      title: "26 Rules to Be a Better Thinker in 2026",
      author: "Ryan Holiday",
      story_url: "https://ryanholiday.medium.com/26-rules-to-be-a-better-thinker-in-2026-6393399aad3d",
      author_url: "https://medium.com/@ryanholiday",
    },
    content: {
      sentences: [
        "The physicist John Wheeler said that 'as our island of knowledge grows, so does the shore of our ignorance.'",
        "Conceitedness is the primary impediment to wisdom.",
        "That's something I often find with AI, its quickness and confidence in its answers — which are laughably wrong.",
        "If you want to stay humble, focus on all that you still don't know.",
        "After all, isn't that the Socratic method?",
        "It's impossible to learn that which you think you already know.",
      ],
      correct_index: 0,
      highlight_density: [0.38, 0.14, 0.16, 0.12, 0.08, 0.12],
    },
    difficulty: "medium",
    hint: "The author is borrowing a metaphor to make a point about scale. Which sentence gives that point its most memorable shape?",
  },
];

const newThreshold: Pack = {
  title: "The New Threshold",
  editor: "The Wordplay Team",
  date: daysAgo(6),
  puzzles: newThresholdPuzzles,
  welcome: {
    body: "This pack is about the moment before everything shifts — when the tools change faster than the habits, when the old questions about expertise and thinking suddenly feel more urgent, not less. These puzzles draw from engineers asking what review even means now, and a philosopher asking what thinking ever meant at all.",
    body2: "The words here don't settle. They ask you to hold two uncomfortable ideas at once: that something genuinely new is happening, and that the oldest human skills are the ones that will matter most.",
  },
  editorNote: "I built this pack around a strange inversion: the smarter the tools get, the more essential clear, patient, human thinking becomes. Every writer here felt it differently — some with excitement, some with unease. I hope you leave with your own version of the question.",
};

// ─── Exports ──────────────────────────────────────────────

export const packArchive: Pack[] = [whatWeOwe, newThreshold];

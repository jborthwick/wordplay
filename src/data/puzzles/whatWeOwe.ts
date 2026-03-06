import type { Pack, Puzzle } from "../../types";

export const whatWeOwePuzzles: Puzzle[] = [
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

export const whatWeOwe: Pack = {
  title: "What We Owe",
  editor: "The Wordplay Team",
  date: "2026-02-27",
  puzzles: whatWeOwePuzzles,
  welcome: {
    body: "This pack is about connection — the kind we cultivate, the kind we deny, and the kind that makes any real achievement possible. These puzzles draw from writers thinking about empathy: what the ancients called it, why some want to abolish it, and what we lose when we choose being right over being close.",
    body2: "The words here ask you to sit with discomfort. To consider enemies weeping together, geniuses who needed friends, and the quiet cost of winning every argument.",
  },
  editorNote: "I built this pack around a question that kept surfacing in these pieces: What happens when we stop recognizing each other's suffering? The answers weren't comfortable, but they felt true. I hope you leave with the question still turning.",
};

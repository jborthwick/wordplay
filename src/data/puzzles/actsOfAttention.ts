import type { Pack, Puzzle } from "../../types";

export const actsOfAttentionPuzzles: Puzzle[] = [
  {
    id: "aa-fill-01",
    mechanic: "fill",
    source: {
      title: "Love is an act of attention and care",
      author: "The Medium Newsletter",
      story_url: "https://medium.com/blog/love-is-an-act-of-attention-and-care-fc1c281799a2",
      author_url: "https://medium.com/@dailynewsletter",
    },
    content: {
      passage:
        "There are some very loud voices trying to persuade you that love isn't worth your time when ______ is so convenient and so satisfying, and standing up to those voices with love seems like one of the most ______ things a person could do right now.",
      answers: ["self-interest", "powerful"],
      full_passage:
        "There are some very loud voices trying to persuade you that love isn't worth your time when self-interest is so convenient and so satisfying, and standing up to those voices with love seems like one of the most powerful things a person could do right now.",
    },
    difficulty: "medium",
    hint: "The author is setting up a contrast between two orientations — toward the self, and toward others. What tempts us away from love?",
  },
  {
    id: "aa-fill-02",
    mechanic: "fill",
    source: {
      title: "How to Eliminate Self-Doubt as a Writer: A Belief Audit",
      author: "Nir Eyal",
      story_url: "https://nireyal.medium.com/how-to-eliminate-self-doubt-as-a-writer-a-belief-audit-426618055194",
      author_url: "https://medium.com/@nireyal",
    },
    content: {
      passage:
        "Like an ______ on your computer, your beliefs control what you can and cannot do. And like an operating system, they often go ______.",
      answers: ["operating system", "unnoticed"],
      full_passage:
        "Like an operating system on your computer, your beliefs control what you can and cannot do. And like an operating system, they often go unnoticed.",
    },
    difficulty: "easy",
    hint: "The author uses a technology metaphor to describe something invisible that shapes everything. What runs quietly in the background?",
  },
  {
    id: "aa-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "Minneapolis Under Siege: Community Resilience in a Time of Crisis",
      author: "Art Chang",
      story_url: "https://achangnyc.medium.com/minneapolis-under-siege-community-resilience-in-a-time-of-crisis-f7e2ab597391",
      author_url: "https://medium.com/@achangnyc",
    },
    content: {
      lines: [
        "This is neither a sprint nor a marathon.",
        "This is a relay.",
        "I learned years ago that a choir can hold a single note for hours —",
        "not because one person has that lung capacity,",
        "but because when someone gets tired, they step out and somebody else steps in.",
      ],
      movable_indices: [2, 3, 4],
    },
    difficulty: "medium",
    hint: "Ron Harris is building toward a specific image that explains how sustained effort works. Follow the logic from the metaphor to its meaning.",
  },
  {
    id: "aa-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "Why You Should Always Take Half of Your Kid's Advice: On Heated Rivalry and the Self at Work",
      author: "Carin Knoop on Learning Machines: Humans & Tech",
      story_url: "https://carinisabelknoop.medium.com/why-you-should-always-take-half-of-your-kids-advice-on-heated-rivalry-and-the-self-at-work-8a03d4c59956",
      author_url: "https://medium.com/@carinisabelknoop",
    },
    content: {
      passage_with_errors:
        "Prolonged concealment is cognitively and emotionaly expensive. It requires constant self-monitering, vigilance, and recalibration. Over time, it increases anxiety and erodes psycological safety.",
      errors: [
        { wrong: "emotionaly", correct: "emotionally" },
        { wrong: "self-monitering", correct: "self-monitoring" },
        { wrong: "psycological", correct: "psychological" },
      ],
      corrected_passage:
        "Prolonged concealment is cognitively and emotionally expensive. It requires constant self-monitoring, vigilance, and recalibration. Over time, it increases anxiety and erodes psychological safety.",
    },
    difficulty: "medium",
    hint: "Three words have been quietly misspelled — look for missing letters or vowels that have shifted.",
  },
  {
    id: "aa-highlight-01",
    mechanic: "highlight",
    source: {
      title: "How to Eliminate Self-Doubt as a Writer: A Belief Audit",
      author: "Nir Eyal",
      story_url: "https://nireyal.medium.com/how-to-eliminate-self-doubt-as-a-writer-a-belief-audit-426618055194",
      author_url: "https://medium.com/@nireyal",
    },
    content: {
      sentences: [
        "Our beliefs are largely determined by childhood experiences, offhand comments from authority figures, past failures you over-interpreted, and cultural messages you absorbed without questioning.",
        "Software programs are usually routinely debugged.",
        "Not so with our beliefs.",
        "We can't choose what facts to believe.",
        "But we can freely choose what operating system is running in our heads.",
        "Why not choose liberating beliefs that help us accomplish our goals rather than limiting ones that make reaching them more difficult?",
      ],
      correct_index: 4,
      highlight_density: [0.18, 0.04, 0.06, 0.07, 0.41, 0.24],
    },
    difficulty: "medium",
    hint: "The author is building to a moment of genuine freedom. Which sentence names what we actually have the power to change?",
  },
  {
    id: "aa-highlight-02",
    mechanic: "highlight",
    source: {
      title: "Minneapolis Under Siege: Community Resilience in a Time of Crisis",
      author: "Art Chang",
      story_url: "https://achangnyc.medium.com/minneapolis-under-siege-community-resilience-in-a-time-of-crisis-f7e2ab597391",
      author_url: "https://medium.com/@achangnyc",
    },
    content: {
      sentences: [
        "Get ready now.",
        "Build those relationships now.",
        "Build the network before you need it.",
        "Let's say you do all those things and the worst never comes.",
        "Well, guess what?",
        "You've made a better city anyway.",
      ],
      correct_index: 5,
      highlight_density: [0.07, 0.09, 0.14, 0.11, 0.05, 0.54],
    },
    difficulty: "easy",
    hint: "Ron Harris is making an argument that preparation is its own reward. Which sentence lands that idea most cleanly?",
  },
];

export const actsOfAttention: Pack = {
  title: "Acts of Attention",
  editor: "The Wordplay Team",
  date: "2026-02-13",
  puzzles: actsOfAttentionPuzzles,
  welcome: {
    body: "This pack is about what we do with our attention — and what it costs us when we withhold it. These puzzles draw from writers thinking about love as action, belief as architecture, and community as something you build before you need it.",
    body2: "The ideas here ask something of you. Not just to read, but to notice: where you're showing up, where you're hiding, and what happens when you finally decide to reach.",
  },
  editorNote:
    "I kept returning to one thread across these pieces: that care is never passive. It's the belief you choose to run, the neighbor you know by name, the attention you bring when it would be easier not to. I hope something in these puzzles stays with you the way it stayed with me.",
};

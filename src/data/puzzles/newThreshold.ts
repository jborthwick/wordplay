import type { Pack, Puzzle } from "../../types";

export const newThresholdPuzzles: Puzzle[] = [
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

export const newThreshold: Pack = {
  title: "The New Threshold",
  editor: "The Wordplay Team",
  date: "2026-02-20",
  puzzles: newThresholdPuzzles,
  welcome: {
    body: "This pack is about the moment before everything shifts — when the tools change faster than the habits, when the old questions about expertise and thinking suddenly feel more urgent, not less. These puzzles draw from engineers asking what review even means now, and a philosopher asking what thinking ever meant at all.",
    body2: "The words here don't settle. They ask you to hold two uncomfortable ideas at once: that something genuinely new is happening, and that the oldest human skills are the ones that will matter most.",
  },
  editorNote: "I built this pack around a strange inversion: the smarter the tools get, the more essential clear, patient, human thinking becomes. Every writer here felt it differently — some with excitement, some with unease. I hope you leave with your own version of the question.",
};

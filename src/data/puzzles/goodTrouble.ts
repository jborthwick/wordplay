import type { Pack, Puzzle } from "../../types";

export const goodTroublePuzzles: Puzzle[] = [
  {
    id: "gt-fill-01",
    mechanic: "fill",
    source: {
      title: "Why So Many White Americans Seem Desperate to Hide Black History",
      author: "Dr. Allison Wiltz",
      story_url: "https://allyfromnola.medium.com/why-so-many-white-americans-seem-desperate-to-hide-black-history-541c4078c817",
      author_url: "https://allyfromnola.medium.com",
    },
    content: {
      passage:
        "Whenever graffiti artists in our community painted murals near the levee, a man painted the concrete slab in different shades of gray. Desperate to ______ any sign of artistic expression, they used whatever paint they could find, creating blotches of varying hues to ______ the colorful mosaic beneath. They were enforcing a plainness that betrayed the unique cultural ______ of the community's residents.",
      answers: ["erase", "hide", "expression"],
      full_passage:
        "Whenever graffiti artists in our community painted murals near the levee, a man painted the concrete slab in different shades of gray. Desperate to erase any sign of artistic expression, they used whatever paint they could find, creating blotches of varying hues to hide the colorful mosaic beneath. They were enforcing a plainness that betrayed the unique cultural expression of the community's residents.",
    },
    difficulty: "medium",
    hint: "The author opens with a physical scene that mirrors a larger pattern. Think about what you do to something you want to disappear — and what you're left with when it's gone.",
  },
  {
    id: "gt-fill-02",
    mechanic: "fill",
    source: {
      title: "Why Some White People Want to Abolish Black History Month",
      author: "Dr. Allison Wiltz",
      story_url: "https://momentum.medium.com/why-some-white-people-want-to-abolish-black-history-month-548199dca3f9",
      author_url: "https://allyfromnola.medium.com",
    },
    content: {
      passage:
        "American history that overlooks the experiences and contributions of Black people is ______. Like a memoir with half of the pages ripped out, it's impossible to decipher accurately, leaving even the most eager reader with a ______ understanding.",
      answers: ["incomplete", "shallow"],
      full_passage:
        "American history that overlooks the experiences and contributions of Black people is incomplete. Like a memoir with half of the pages ripped out, it's impossible to decipher accurately, leaving even the most eager reader with a shallow understanding.",
    },
    difficulty: "easy",
    hint: "The author is building a metaphor about what happens to a story when parts are removed. What do you call a book with missing pages — and what do you get from reading it?",
  },
  {
    id: "gt-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "The state of \"good trouble\" as Black History Month turns 100",
      author: "The Medium Newsletter",
      story_url: "https://medium.com/blog/the-state-of-good-trouble-as-black-history-month-turns-100-76cb09d0a60d",
      author_url: "https://medium.com/@dailynewsletter",
    },
    content: {
      lines: [
        "William Spivey describes three types of stories that emerge in February: those about Black individuals beating the odds, resistance-centered narratives, and calls to action.",
        "He argues that the first type often focuses on Black figures who overcame hardship without critically examining the structures that produced their suffering.",
        "Resistance narratives document opposition to oppression, but are frequently omitted or sanitized in schools because they show Black people actively fighting back.",
        "Call-to-action stories are the rarest and most important because they turn history into a practical guide for ongoing struggle.",
        "Because history doesn't change anything on its own.",
        "People do.",
      ],
      movable_indices: [2, 3, 4],
    },
    difficulty: "medium",
    hint: "The author is building a taxonomy that ends with a verdict. Follow the logic: what comes after naming the types, and what comes after resistance?",
  },
  {
    id: "gt-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "Why So Many White Americans Seem Desperate to Hide Black History",
      author: "Dr. Allison Wiltz",
      story_url: "https://allyfromnola.medium.com/why-so-many-white-americans-seem-desperate-to-hide-black-history-541c4078c817",
      author_url: "https://allyfromnola.medium.com",
    },
    content: {
      passage_with_errors:
        "This conflict is reminicent of Black people in America attempting to preserve their history, to ilustrate it, and share it with the world, and of the steps taken by White people to hide that history. Nicole Hannah-Jones, the author of The 1619 Project, suggested, \"White Americans desire to be free of a past they do not want to remember, while Black Americans remain bound to a past they can never forget.\"",
      errors: [
        { wrong: "reminicent", correct: "reminiscent" },
        { wrong: "ilustrate", correct: "illustrate" },
      ],
      corrected_passage:
        "This conflict is reminiscent of Black people in America attempting to preserve their history, to illustrate it, and share it with the world, and of the steps taken by White people to hide that history. Nicole Hannah-Jones, the author of The 1619 Project, suggested, \"White Americans desire to be free of a past they do not want to remember, while Black Americans remain bound to a past they can never forget.\"",
    },
    difficulty: "easy",
    hint: "Look for words where a sound is there but the letters aren't quite right — one is missing its middle, the other is missing a double.",
  },
  {
    id: "gt-highlight-01",
    mechanic: "highlight",
    source: {
      title: "The state of \"good trouble\" as Black History Month turns 100",
      author: "The Medium Newsletter",
      story_url: "https://medium.com/blog/the-state-of-good-trouble-as-black-history-month-turns-100-76cb09d0a60d",
      author_url: "https://medium.com/@dailynewsletter",
    },
    content: {
      sentences: [
        "The conditions that make concrete action visible and teachable are increasingly under threat.",
        "Black history is treated as dangerous precisely because it exposes how deeply white supremacy is embedded in American life.",
        "The cumulative effect narrows both what counts as American history and who is allowed to define it.",
        "You can remove a website.",
        "You cannot remove what was taught at a kitchen table.",
        "Black history survives through family memory, community teaching, and lived experience rather than institutions alone.",
      ],
      correct_index: 4,
      highlight_density: [0.08, 0.16, 0.1, 0.07, 0.44, 0.15],
    },
    difficulty: "easy",
    hint: "One sentence carries a whole argument in very few words. Look for the one that answers the one before it.",
  },
  {
    id: "gt-highlight-02",
    mechanic: "highlight",
    source: {
      title: "Why Some White People Want to Abolish Black History Month",
      author: "Dr. Allison Wiltz",
      story_url: "https://momentum.medium.com/why-some-white-people-want-to-abolish-black-history-month-548199dca3f9",
      author_url: "https://allyfromnola.medium.com",
    },
    content: {
      sentences: [
        "American history that overlooks the experiences and contributions of Black people is incomplete.",
        "Like a memoir with half of the pages ripped out, it's impossible to decipher accurately, leaving even the most eager reader with a shallow understanding.",
        "Why is this important?",
        "Because knowledge of history empowers people to chart a path forward that reflects the wisdom of the past.",
        "Without it, we're practically lost and liable to repeat the same mistakes as previous generations.",
        "In this case, the prevailing problem is racism, as some White people shun its inclusion.",
      ],
      correct_index: 3,
      highlight_density: [0.1, 0.14, 0.04, 0.4, 0.2, 0.12],
    },
    difficulty: "medium",
    hint: "The author pauses to ask why any of this matters — then answers directly. Which sentence is the answer worth underlining?",
  },
];

export const goodTrouble: Pack = {
  title: "Good Trouble",
  editor: "The Wordplay Team",
  date: "2026-02-06",
  puzzles: goodTroublePuzzles,
  welcome: {
    body: "This pack is about Black history — who gets to tell it, who works to erase it, and why the fight over memory is never just about the past. These puzzles draw from writers reckoning with what it means to mark one hundred years of Black History Month in a moment when that history is under deliberate threat.",
    body2: "The words here are doing serious work. Some insist on what cannot be removed. Others ask what kind of stories we choose to tell — and what those choices reveal about us.",
  },
  editorNote:
    "I built this pack around a line that stopped me: 'You can remove a website. You cannot remove what was taught at a kitchen table.' Every puzzle here circles that idea — that history lives in people, not just institutions. I hope one of these passages stays with you.",
};

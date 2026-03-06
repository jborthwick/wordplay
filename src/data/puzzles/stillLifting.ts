import type { Pack, Puzzle } from "../../types";

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

export const stillLifting: Pack = {
  title: "Still Lifting",
  editor: "The Wordplay Team",
  date: "2026-03-06",
  puzzles: stillLiftingPuzzles,
  welcome: {
    body: "This pack is about women's stories — the ones we tell, the ones we fight to keep, and the ones that persist even when someone tries to erase them. These puzzles draw from writers reflecting on Women's History Month in a year that feels heavier than most.",
    body2: "The words here carry weight. Some mourn what's been lost; others insist on what remains. Pay attention to who's speaking and what they refuse to let go of.",
  },
  editorNote: "I built this pack around the idea that history isn't handed down — it's held onto. Every writer here is holding something: evidence, memory, hope, or a question that won't stop asking itself. I hope you leave with one of your own.",
};

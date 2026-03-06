import type { Pack, Puzzle } from "../../types";

export const theLongSleepPuzzles: Puzzle[] = [
  {
    id: "tls-fill-01",
    mechanic: "fill",
    source: {
      title: "Neuroscience Explains How and Why Humans Should Hibernate a Little in Winter",
      author: "Jessica Stillman",
      story_url: "https://entrylevelrebel.medium.com/neuroscience-explains-how-and-why-humans-should-hibernate-a-little-in-winter-5b5486811856",
      author_url: "https://entrylevelrebel.medium.com/",
    },
    content: {
      passage:
        "The instinct to ______ and ______ is widespread in the animal kingdom.",
      answers: ["gather", "snooze"],
      full_passage:
        "The instinct to gather and snooze is widespread in the animal kingdom.",
    },
    difficulty: "easy",
    hint: "The author is describing what animals — and humans — are drawn to do when winter comes. Think togetherness and stillness.",
  },
  {
    id: "tls-fill-02",
    mechanic: "fill",
    source: {
      title: "The New Science of How Winter Affects Your Brain and Body (and What to Do About It)",
      author: "Jessica Stillman",
      story_url: "https://entrylevelrebel.medium.com/the-new-science-of-how-winter-affects-your-brain-and-body-and-what-to-do-about-it-e8ecad614a71",
      author_url: "https://entrylevelrebel.medium.com/",
    },
    content: {
      passage:
        "During the winter our bodies go through a natural ______ cycle. This isn't ______ behavior or coincidence. It's part of some deeper, more ______ programming.",
      answers: ["evolutionary", "learned", "instinctual"],
      full_passage:
        "During the winter our bodies go through a natural evolutionary cycle. This isn't learned behavior or coincidence. It's part of some deeper, more instinctual programming.",
    },
    difficulty: "medium",
    hint: "A psychologist is explaining why winter sluggishness isn't laziness. Think about the language of biology and deep time.",
  },
  {
    id: "tls-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "Neuroscience Explains How and Why Humans Should Hibernate a Little in Winter",
      author: "Jessica Stillman",
      story_url: "https://entrylevelrebel.medium.com/neuroscience-explains-how-and-why-humans-should-hibernate-a-little-in-winter-5b5486811856",
      author_url: "https://entrylevelrebel.medium.com/",
    },
    content: {
      lines: [
        "Thanks to cold weather, short days, and the post-festive slump, January is a famously glum time of year in much of the Northern Hemisphere.",
        "In response, you might be feeling the urge to gather some loved ones, curl up at home, and laze about doing not much of anything for a while.",
        "If togetherness and (semi-) hibernation appeals to you this time of year, you're not alone.",
        "The instinct to gather and snooze is widespread in the animal kingdom.",
        "But what about the human urge to gather and rest this time of year?",
        "Does it also have evolutionary advantages?",
      ],
      movable_indices: [2, 3, 4],
    },
    difficulty: "medium",
    hint: "The author moves from setting the scene to validating a feeling to raising a question. Follow the emotional progression from personal to universal to curious.",
  },
  {
    id: "tls-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "The New Science of How Winter Affects Your Brain and Body (and What to Do About It)",
      author: "Jessica Stillman",
      story_url: "https://entrylevelrebel.medium.com/the-new-science-of-how-winter-affects-your-brain-and-body-and-what-to-do-about-it-e8ecad614a71",
      author_url: "https://entrylevelrebel.medium.com/",
    },
    content: {
      passage_with_errors:
        "If the answer is cold, slugish, and cranky, it's not just laziness or social conditoning. According to new science, the changes in our bodies in winter are deeper than many of us imagin. The biology of how winter affects us means we are more like drowsy bears curled up in their winter dens than many of us realize.",
      errors: [
        { wrong: "slugish", correct: "sluggish" },
        { wrong: "conditoning", correct: "conditioning" },
        { wrong: "imagin", correct: "imagine" },
      ],
      corrected_passage:
        "If the answer is cold, sluggish, and cranky, it's not just laziness or social conditioning. According to new science, the changes in our bodies in winter are deeper than many of us imagine. The biology of how winter affects us means we are more like drowsy bears curled up in their winter dens than many of us realize.",
    },
    difficulty: "medium",
    hint: "Look for words where a letter has been dropped or a doubled consonant has been halved. The errors are subtle but consistent.",
  },
  {
    id: "tls-highlight-01",
    mechanic: "highlight",
    source: {
      title: "Neuroscience Explains How and Why Humans Should Hibernate a Little in Winter",
      author: "Jessica Stillman",
      story_url: "https://entrylevelrebel.medium.com/neuroscience-explains-how-and-why-humans-should-hibernate-a-little-in-winter-5b5486811856",
      author_url: "https://entrylevelrebel.medium.com/",
    },
    content: {
      sentences: [
        "Banding together and taking it easy helps animals conserve heat, hook up, spot predators, and pool their food-finding resources.",
        "Which is a strong reason to get together and chill if you're a rook or a hare.",
        "But what about the human urge to gather and rest this time of year?",
        "Does it also have evolutionary advantages?",
        "And perhaps most important for those feeling low on energy right now, is that a good excuse to give into your urge to hibernate?",
        "Yup, replies one neuroscientist.",
      ],
      correct_index: 4,
      highlight_density: [0.1, 0.07, 0.13, 0.08, 0.44, 0.18],
    },
    difficulty: "easy",
    hint: "The author is building toward a moment of relief. Which sentence is the one readers have been waiting for permission to arrive at?",
  },
  {
    id: "tls-highlight-02",
    mechanic: "highlight",
    source: {
      title: "The New Science of How Winter Affects Your Brain and Body (and What to Do About It)",
      author: "Jessica Stillman",
      story_url: "https://entrylevelrebel.medium.com/the-new-science-of-how-winter-affects-your-brain-and-body-and-what-to-do-about-it-e8ecad614a71",
      author_url: "https://entrylevelrebel.medium.com/",
    },
    content: {
      sentences: [
        "A growing body of research in psychology and related fields suggests that winter brings some profound changes in how people think, feel, and behave.",
        "There are a lot of parallels to hibernation in many other mammals.",
        "During the winter our bodies go through a natural evolutionary cycle.",
        "This isn't learned behavior or coincidence.",
        "It's part of some deeper, more instinctual programming.",
        "The biology of how winter affects us means we are more like drowsy bears curled up in their winter dens than many of us realize.",
      ],
      correct_index: 5,
      highlight_density: [0.14, 0.11, 0.13, 0.07, 0.09, 0.46],
    },
    difficulty: "medium",
    hint: "The author is reframing something familiar — winter fatigue — through a surprising lens. Which sentence lands the comparison most vividly?",
  },
];

export const theLongSleep: Pack = {
  title: "The Long Sleep",
  editor: "The Wordplay Team",
  date: "2026-01-13",
  puzzles: theLongSleepPuzzles,
  welcome: {
    body: "This pack is about permission — the biological kind. These puzzles draw from Jessica Stillman's writing on what winter actually does to us: the hormones, the slowing, the ancient pull toward warmth and stillness that modern schedules pretend we don't feel.",
    body2: "The words here ask you to sit with a question science has quietly been answering: what if the urge to rest isn't a failure of discipline, but a message worth listening to?",
  },
  editorNote:
    "I built this pack around the strange relief of being told your body already knows what it needs. The science here isn't prescriptive — it's permissive. I hope you leave feeling a little less guilty about the nap.",
};

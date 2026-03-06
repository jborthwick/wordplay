import type { Pack, Puzzle } from "../../types";

export const findYourLanePuzzles: Puzzle[] = [
  {
    id: "fyl-fill-01",
    mechanic: "fill",
    source: {
      title: "How to find a lane and fill it",
      author: "The Medium Newsletter",
      story_url: "https://medium.com/blog/how-to-find-a-lane-and-fill-it-96ba98571158",
      author_url: "https://medium.com/@dailynewsletter",
    },
    content: {
      passage:
        "You're going to be tempted to try to right every ______. But there are so many wrongs that all your ______ attempts will make zero difference to any of them. So instead, find a lane where you can be ______ and fill it.",
      answers: ["wrong", "diffuse", "effective"],
      full_passage:
        "You're going to be tempted to try to right every wrong. But there are so many wrongs that all your diffuse attempts will make zero difference to any of them. So instead, find a lane where you can be effective and fill it.",
    },
    difficulty: "medium",
    hint: "The speaker is warning against a certain kind of exhausting overreach. Think about what happens when energy is spread too thin.",
  },
  {
    id: "fyl-fill-02",
    mechanic: "fill",
    source: {
      title: "How to find a lane and fill it",
      author: "The Medium Newsletter",
      story_url: "https://medium.com/blog/how-to-find-a-lane-and-fill-it-96ba98571158",
      author_url: "https://medium.com/@dailynewsletter",
    },
    content: {
      passage:
        "Simple, basic ______ habits can lead to healthier, safer civic spaces: they help us practice the small, ______ behaviors — sharing space, making eye contact, offering ______ — that form the texture of social life.",
      answers: ["neighborly", "reciprocal", "recognition"],
      full_passage:
        "Simple, basic neighborly habits can lead to healthier, safer civic spaces: they help us practice the small, reciprocal behaviors — sharing space, making eye contact, offering recognition — that form the texture of social life.",
    },
    difficulty: "easy",
    hint: "An anthropologist is describing what holds communities together at the most ordinary level. Think about what we give each other just by being present.",
  },
  {
    id: "fyl-rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "Survival Guide To Police Encounters During Protests",
      author: "NACDL",
      story_url: "https://nacdl.medium.com/survival-guide-to-police-encounters-during-protests-cbabdbe71fb3",
      author_url: "https://nacdl.medium.com",
    },
    content: {
      lines: [
        "The First Amendment, and the freedoms of speech and assembly it provides, have given us some of our proudest moments.",
        "From the March on Washington in 1963 to the Black Lives Matter protests of today, the right of the people to be heard in protest is paramount.",
        "This show of military-esque police force is an attempt by the government to chill the First Amendment right to protest and assemble.",
        "While several lawsuits have been filed to try to prevent such governmental interference in protests, it is wise to assume that if you attend a protest, that you could encounter the police.",
        "Following are my suggestions to best position yourself for that encounter.",
        "However, the recent use of Department of Homeland Security authorities in Portland, Oregon and elsewhere have raised alarming concerns as to governmental interference in lawful protests.",
      ],
      movable_indices: [2, 3, 5],
    },
    difficulty: "medium",
    hint: "The author moves from principle to threat to practical guidance. The historical grounding comes first; the concrete complication belongs just before the call to prepare.",
  },
  {
    id: "fyl-spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "Survival Guide To Police Encounters During Protests",
      author: "NACDL",
      story_url: "https://nacdl.medium.com/survival-guide-to-police-encounters-during-protests-cbabdbe71fb3",
      author_url: "https://nacdl.medium.com",
    },
    content: {
      passage_with_errors:
        "Staying businesslike in your interractions with the police is your best bet. If you have marks on your body, photograph the marks or injurys as soon as you can. The buddy system works well, as long as you have the right buddy — make sure your buddy also agreees to follow these rules.",
      errors: [
        { wrong: "interractions", correct: "interactions" },
        { wrong: "injurys", correct: "injuries" },
        { wrong: "agreees", correct: "agrees" },
      ],
      corrected_passage:
        "Staying businesslike in your interactions with the police is your best bet. If you have marks on your body, photograph the marks or injuries as soon as you can. The buddy system works well, as long as you have the right buddy — make sure your buddy also agrees to follow these rules.",
    },
    difficulty: "easy",
    hint: "Look for doubled letters that don't belong, and a plural that took the wrong path.",
  },
  {
    id: "fyl-highlight-01",
    mechanic: "highlight",
    source: {
      title: "How to find a lane and fill it",
      author: "The Medium Newsletter",
      story_url: "https://medium.com/blog/how-to-find-a-lane-and-fill-it-96ba98571158",
      author_url: "https://medium.com/@dailynewsletter",
    },
    content: {
      sentences: [
        "Many people are trying to find their lane right now.",
        "Finding a lane to fill takes a little work, but not a lot — start by looking around at what's near you.",
        "It could be as simple as neighborliness, connecting with the people who live around you.",
        "Sometimes, though, it feels like neighborliness won't quite get us where we need to go.",
        "America has never lacked the language of liberty.",
        "What it has lacked, again and again, is the courage to extend that liberty to the people who most need to use it.",
      ],
      correct_index: 5,
      highlight_density: [0.07, 0.12, 0.08, 0.1, 0.09, 0.54],
    },
    difficulty: "medium",
    hint: "One sentence contains the sharpest indictment — a gap between what America says and what it does. Which one lands hardest?",
  },
  {
    id: "fyl-highlight-02",
    mechanic: "highlight",
    source: {
      title: "How to find a lane and fill it",
      author: "The Medium Newsletter",
      story_url: "https://medium.com/blog/how-to-find-a-lane-and-fill-it-96ba98571158",
      author_url: "https://medium.com/@dailynewsletter",
    },
    content: {
      sentences: [
        "The greatest danger of organized, official lying is not that people will believe something that is false.",
        "It is that repeated, strategic distortions make it impossible for citizens to orient themselves in reality.",
        "What do you risk if you join the January 30 national strike?",
        "What do you risk if you don't?",
        "At Medium, employees in the U.S. may be taking Friday off to participate in a national shutdown.",
        "The arc of the moral universe does not bend on its own.",
      ],
      correct_index: 5,
      highlight_density: [0.11, 0.16, 0.08, 0.09, 0.06, 0.5],
    },
    difficulty: "easy",
    hint: "One sentence has been echoing for decades — borrowed, adapted, insisted upon. Which one feels like it was always meant to be underlined?",
  },
];

export const findYourLane: Pack = {
  title: "Find Your Lane",
  editor: "The Wordplay Team",
  date: "2026-01-30",
  puzzles: findYourLanePuzzles,
  welcome: {
    body: "This pack is about the gap between feeling overwhelmed and actually doing something. The pieces here circle a single piece of advice: don't try to right every wrong at once. Find a lane where you can be effective — and fill it. That sounds simple. Sitting with what it asks of you is harder.",
    body2: "The words here move between the personal and the civic. Between the question of what you carry with you every day and what history asks of you right now. Pay attention to what each writer is reaching for.",
  },
  editorNote:
    "I built this pack around the tension between scale and action — how paralysis often comes from trying to hold too much at once. The writers here don't pretend there are easy answers, but they all find a way to begin. I hope you leave with one small thing clearer than when you started.",
};

import { FillPuzzle, RearrangePuzzle, Puzzle } from "../types";

export const fillPuzzles: FillPuzzle[] = [
  {
    id: "fill-01",
    mechanic: "fill",
    source: {
      title: "The Quiet Crisis in How We Read",
      author: "Elena Marsh",
      story_url: "#",
    },
    content: {
      passage:
        "The internet didn't shorten our attention spans. It ______ them. We now ______ between tabs the way we once turned pages — except turning pages had a ______, and tabs do not.",
      answers: ["rewired", "drift", "destination"],
      full_passage:
        "The internet didn't shorten our attention spans. It rewired them. We now drift between tabs the way we once turned pages — except turning pages had a destination, and tabs do not.",
    },
    difficulty: "medium",
    hint: "The author is reframing, not mourning. Think about how movement changed.",
  },
  {
    id: "fill-02",
    mechanic: "fill",
    source: {
      title: "Why Every Meeting Could Be an Email",
      author: "David Chen",
      story_url: "#",
    },
    content: {
      passage:
        "Most productivity advice is just ______ in a nicer font. We stack ______ on top of systems on top of tools, and call the whole pile a ______. But no amount of organizing will fix the fact that we're ______ the wrong things.",
      answers: ["anxiety", "habits", "workflow", "optimizing"],
      full_passage:
        "Most productivity advice is just anxiety in a nicer font. We stack habits on top of systems on top of tools, and call the whole pile a workflow. But no amount of organizing will fix the fact that we're optimizing the wrong things.",
    },
    difficulty: "medium",
    hint: "The author sees a pattern: dressing up a feeling as a system.",
  },
  {
    id: "fill-03",
    mechanic: "fill",
    source: {
      title: "On Walking Without a Destination",
      author: "Priya Sharma",
      story_url: "#",
    },
    content: {
      passage:
        "Clarity doesn't arrive when you ______ it. It settles when you stop. The best ideas I've ever had came not from ______, but from ______ — long walks with no agenda, mornings with no ______.",
      answers: ["chase", "discipline", "surrender", "alarm"],
      full_passage:
        "Clarity doesn't arrive when you chase it. It settles when you stop. The best ideas I've ever had came not from discipline, but from surrender — long walks with no agenda, mornings with no alarm.",
    },
    difficulty: "hard",
    hint: "The passage builds a contrast: effort vs. letting go.",
  },
  {
    id: "fill-04",
    mechanic: "fill",
    source: {
      title: "The Myth of the Lone Genius",
      author: "Marcus Webb",
      story_url: "#",
    },
    content: {
      passage:
        "Collaboration isn't the opposite of genius. It's the ______ of it. Every ______ you've ever admired was shaped by the people around it — editors, critics, ______ who asked the right questions at the right time.",
      answers: ["engine", "breakthrough", "strangers"],
      full_passage:
        "Collaboration isn't the opposite of genius. It's the engine of it. Every breakthrough you've ever admired was shaped by the people around it — editors, critics, strangers who asked the right questions at the right time.",
    },
    difficulty: "medium",
    hint: "The author sees genius as collective, not solitary.",
  },
  {
    id: "fill-05",
    mechanic: "fill",
    source: {
      title: "Learning to Cook at Forty",
      author: "Sam Okafor",
      story_url: "#",
    },
    content: {
      passage:
        "The first meal I made for myself wasn't good. It was ______. That distinction ______ everything. I had spent decades eating what was ______, what was fast, what someone else decided I should want. This burned, ______ plate of rice was the first thing that was entirely my own.",
      answers: ["mine", "changed", "convenient", "humble"],
      full_passage:
        "The first meal I made for myself wasn't good. It was mine. That distinction changed everything. I had spent decades eating what was convenient, what was fast, what someone else decided I should want. This burned, humble plate of rice was the first thing that was entirely my own.",
    },
    difficulty: "medium",
    hint: "The point isn't quality — it's ownership. Follow the emotional arc.",
  },
];

export const rearrangePuzzles: RearrangePuzzle[] = [
  {
    id: "rearrange-01",
    mechanic: "rearrange",
    source: {
      title: "On Walking Without a Destination",
      author: "Priya Sharma",
      story_url: "#",
    },
    content: {
      lines: [
        "For years I optimized everything — my morning routine, my inbox, my calendar.",
        "I got very good at being busy.",
        "Then one afternoon I took a walk with nowhere to go.",
        "By the time I got home, I'd had three ideas I never would have scheduled.",
      ],
      shuffled_order: [3, 0, 2, 1],
    },
    difficulty: "medium",
    hint: "The passage starts with a routine, then a small break from it leads somewhere unexpected.",
  },
  {
    id: "rearrange-02",
    mechanic: "rearrange",
    source: {
      title: "The Myth of the Lone Genius",
      author: "Marcus Webb",
      story_url: "#",
    },
    content: {
      lines: [
        "We tell the story of innovation as if it happens in garages and dorm rooms, one brilliant mind against the world.",
        "But look closer at any breakthrough and you'll find a network.",
        "Collaborators, critics, supporters who made the leap possible.",
        "The myth persists because it flatters us.",
        "We'd rather believe in magic than in the slow, unglamorous work of showing up together.",
      ],
      shuffled_order: [4, 1, 3, 0, 2],
    },
    difficulty: "hard",
    hint: "It starts with the myth, then dismantles it, then explains why we cling to it.",
  },
  {
    id: "rearrange-03",
    mechanic: "rearrange",
    source: {
      title: "The Quiet Crisis in How We Read",
      author: "Elena Marsh",
      story_url: "#",
    },
    content: {
      lines: [
        "I used to read for hours without checking my phone.",
        "I thought that meant I was disciplined.",
        "What I didn't realize was that the books were doing something my phone couldn't.",
        "They were asking me to stay.",
        "Reading isn't a habit you keep. It's a relationship you tend.",
      ],
      shuffled_order: [2, 4, 0, 3, 1],
    },
    difficulty: "hard",
    hint: "The author starts with a memory, then reframes it. The last line is the thesis.",
  },
];

// Daily pack: mix Fill and Rearrange puzzles for variety
export const dailyPack: Puzzle[] = [
  fillPuzzles[0],
  rearrangePuzzles[0],
  fillPuzzles[1],
  fillPuzzles[4],
  rearrangePuzzles[1],
  fillPuzzles[3],
];

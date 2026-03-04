import { FillPuzzle, RearrangePuzzle, SpellcheckPuzzle, Pack } from "../types";

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
        "I didn't bring my phone. I didn't have a route.",
        "By the time I got home, I'd had three ideas I never would have scheduled.",
        "Clarity doesn't arrive when you chase it. It settles when you stop.",
      ],
      movable_indices: [1, 3, 4],
    },
    difficulty: "medium",
    hint: "The fixed lines set up routine, a walk, and a lesson. Fill in what happened along the way.",
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
        "We tell the story of innovation as if it happens in garages and dorm rooms.",
        "One brilliant mind against the world.",
        "But look closer at any breakthrough and you'll find a network.",
        "Collaborators, critics, supporters who made the leap possible.",
        "The myth persists because it flatters us.",
        "We'd rather believe in magic than in the slow, unglamorous work of showing up together.",
      ],
      movable_indices: [1, 3, 4],
    },
    difficulty: "hard",
    hint: "The fixed lines present the myth, then challenge it, then reflect. Fill in the details.",
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
        "Not demanding it. Not tricking me into it.",
        "Reading isn't a habit you keep. It's a relationship you tend.",
      ],
      movable_indices: [1, 3, 4],
    },
    difficulty: "hard",
    hint: "The fixed lines frame a memory about reading. Fill in what the author discovered.",
  },
];

export const spellcheckPuzzles: SpellcheckPuzzle[] = [
  {
    id: "spellcheck-01",
    mechanic: "spellcheck",
    source: {
      title: "The Quiet Crisis in How We Read",
      author: "Elena Marsh",
      story_url: "#",
    },
    content: {
      passage_with_errors:
        "The affect of social media on reading is cumulative. We loose the ability to sustain attention not all at once, but gradually — one scroll at a time. What we sacrifice isn't literacy. It's patience, the willingness to let a sentance unfold at its own pace.",
      errors: [
        { wrong: "affect", correct: "effect" },
        { wrong: "loose", correct: "lose" },
        { wrong: "sentance", correct: "sentence" },
      ],
      corrected_passage:
        "The effect of social media on reading is cumulative. We lose the ability to sustain attention not all at once, but gradually — one scroll at a time. What we sacrifice isn't literacy. It's patience, the willingness to let a sentence unfold at its own pace.",
    },
    difficulty: "medium",
    hint: "One is a grammar error, one is a spelling error, and one requires knowing what the author means.",
  },
  {
    id: "spellcheck-02",
    mechanic: "spellcheck",
    source: {
      title: "Why Every Meeting Could Be an Email",
      author: "David Chen",
      story_url: "#",
    },
    content: {
      passage_with_errors:
        "The principle reason most meetings fail is that they confuse presence with participation. People attend, but they don't contribute. The affect is a room full of witnesses to a conversation that didn't need an audience.",
      errors: [
        { wrong: "principle", correct: "principal" },
        { wrong: "affect", correct: "effect" },
      ],
      corrected_passage:
        "The principal reason most meetings fail is that they confuse presence with participation. People attend, but they don't contribute. The effect is a room full of witnesses to a conversation that didn't need an audience.",
    },
    difficulty: "hard",
    hint: "Both errors involve words that sound right but mean something different. Think about which meaning fits the context.",
  },
];

// Seeded shuffle so order is consistent per day but varies day-to-day
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = ((s >>> 0) % (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const today = new Date();
const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

// Daily pack: mix Fill, Rearrange, and Spellcheck puzzles for variety
export const dailyPack: Pack = {
  title: "The Weight of Words",
  editor: "The Wordplay Team",
  date: localDateStr(new Date()),
  puzzles: seededShuffle([
    fillPuzzles[0],
    rearrangePuzzles[0],
    spellcheckPuzzles[0],
    fillPuzzles[1],
    rearrangePuzzles[1],
    spellcheckPuzzles[1],
  ], dateSeed),
};

// Past packs for the carousel (lightweight — no puzzles needed for display)
function localDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return localDateStr(d);
}

export interface PackSummary {
  title: string;
  editor: string;
  date: string;
  puzzleCount: number;
}

export const packArchive: PackSummary[] = [
  { title: "Small Truths", editor: "Mia Tan", date: daysAgo(6), puzzleCount: 5 },
  { title: "Against the Clock", editor: "Raj Patel", date: daysAgo(5), puzzleCount: 6 },
  { title: "The Long View", editor: "Clara Hughes", date: daysAgo(4), puzzleCount: 4 },
  { title: "Quiet Machines", editor: "Leo Park", date: daysAgo(3), puzzleCount: 6 },
  { title: "Open Questions", editor: "Nina Osei", date: daysAgo(2), puzzleCount: 5 },
  { title: "First Light", editor: "Sam Okafor", date: daysAgo(1), puzzleCount: 6 },
];

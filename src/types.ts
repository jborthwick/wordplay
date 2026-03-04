export interface PuzzleSource {
  title: string;
  author: string;
  story_url: string;
}

export interface FillPuzzle {
  id: string;
  mechanic: "fill";
  source: PuzzleSource;
  content: {
    /** Passage with ______ markers where words were removed */
    passage: string;
    /** Correct words in order of the blanks */
    answers: string[];
    /** The complete original passage */
    full_passage: string;
  };
  difficulty: "easy" | "medium" | "hard";
  hint: string;
}

export interface RearrangePuzzle {
  id: string;
  mechanic: "rearrange";
  source: PuzzleSource;
  content: {
    /** All lines in their correct order */
    lines: string[];
    /** Which line indices are movable (pulled out as draggable cards) */
    movable_indices: number[];
  };
  difficulty: "easy" | "medium" | "hard";
  hint: string;
}

export interface SpellcheckPuzzle {
  id: string;
  mechanic: "spellcheck";
  source: PuzzleSource;
  content: {
    /** Passage with errors baked in */
    passage_with_errors: string;
    /** Error words and their corrections */
    errors: { wrong: string; correct: string }[];
    /** Clean corrected passage */
    corrected_passage: string;
  };
  difficulty: "easy" | "medium" | "hard";
  hint: string;
}

export type Puzzle = FillPuzzle | RearrangePuzzle | SpellcheckPuzzle;

export interface Pack {
  title: string;
  editor: string;
  date: string;
  puzzles: Puzzle[];
  /** Per-pack welcome + editor note copy */
  welcome?: { body: string; body2: string };
  editorNote?: string;
}

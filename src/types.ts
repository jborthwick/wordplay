export interface PuzzleSource {
  title: string;
  author: string;
  story_url: string;
  /** Optional. Author's Medium profile URL when available. */
  author_url?: string;
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

export interface HighlightPuzzle {
  id: string;
  mechanic: "highlight";
  source: PuzzleSource;
  content: {
    /** Array of sentences displayed as the passage */
    sentences: string[];
    /** Index of the "most highlighted" sentence (correct answer) */
    correct_index: number;
    /** Normalised highlight density per sentence (0–1, sums to ~1) */
    highlight_density: number[];
  };
  difficulty: "easy" | "medium" | "hard";
  hint: string;
}

export type Puzzle = FillPuzzle | RearrangePuzzle | SpellcheckPuzzle | HighlightPuzzle;

export interface Pack {
  title: string;
  editor: string;
  date: string;
  puzzles: Puzzle[];
  /** Per-pack welcome + editor note copy */
  welcome?: { body: string; body2: string };
  editorNote?: string;
}

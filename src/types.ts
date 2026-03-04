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
    /** Lines in their correct order */
    lines: string[];
    /** Starting order (indices into lines array) */
    shuffled_order: number[];
  };
  difficulty: "easy" | "medium" | "hard";
  hint: string;
}

export type Puzzle = FillPuzzle | RearrangePuzzle;

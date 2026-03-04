const STORAGE_KEY = "wordplay-completions";

export interface PackResult {
  mistakes: number;
  flawless: boolean;
  totalPuzzles: number;
  completedAt: string; // ISO timestamp
}

/** All completions keyed by pack date string (YYYY-MM-DD) */
type CompletionMap = Record<string, PackResult>;

function readAll(): CompletionMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getCompletion(packDate: string): PackResult | null {
  return readAll()[packDate] ?? null;
}

export function saveCompletion(packDate: string, result: PackResult): void {
  const map = readAll();
  map[packDate] = result;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function getAllCompletions(): CompletionMap {
  return readAll();
}

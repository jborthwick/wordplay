/** Seed number from a YYYY-MM-DD date string for deterministic shuffle. */
export function seedFromDate(dateStr: string): number {
  return parseInt(dateStr.replace(/-/g, ""), 10) || 0;
}

export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = (s >>> 0) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

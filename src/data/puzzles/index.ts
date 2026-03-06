import type { Pack } from "../../types";
import { seedFromDate, seededShuffle } from "./helpers";
import { actsOfAttention } from "./actsOfAttention";
import { stillLifting } from "./stillLifting";
import { whatWeOwe } from "./whatWeOwe";
import { newThreshold } from "./newThreshold";

const rawPacks: Pack[] = [actsOfAttention, stillLifting, whatWeOwe, newThreshold];

/** All packs, sorted by date descending (newest first). First in list is labeled "Today" on the menu. Puzzle order is shuffled per pack by date seed. */
export const packs: Pack[] = [...rawPacks]
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((pack) => ({
    ...pack,
    puzzles: seededShuffle([...pack.puzzles], seedFromDate(pack.date)),
  }));

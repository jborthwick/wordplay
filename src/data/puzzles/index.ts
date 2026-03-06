import type { Pack } from "../../types";
import { seedFromDate, seededShuffle } from "./helpers";
import { stillLifting } from "./stillLifting";
import { whatWeOwe } from "./whatWeOwe";
import { newThreshold } from "./newThreshold";

const rawPacks: Pack[] = [stillLifting, whatWeOwe, newThreshold];

/** All packs. First in list is labeled "Today" on the menu. Puzzle order is shuffled per pack by date seed. */
export const packs: Pack[] = rawPacks.map((pack) => ({
  ...pack,
  puzzles: seededShuffle([...pack.puzzles], seedFromDate(pack.date)),
}));

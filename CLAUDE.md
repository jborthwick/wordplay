# CLAUDE.md — Wordplay by Medium

## What Is Wordplay?

A browser-based word puzzle game built on Medium's catalog of ideas. Players engage with sentences, structures, and ideas from essays — filling blanks, rearranging arguments, catching errors, and highlighting the lines that matter most. Each pack is a small, curated reading experience that leaves you with a thought that sticks.

## Stack

React + TypeScript + Vite. No backend. Puzzle data lives in `src/data/puzzles/` (one file per pack). Types in `src/types.ts`. Completion state in localStorage (`src/data/completion.ts`).

## Design Principles

0. **Some stories shouldn't be played.** Avoid trauma, politics, religion, and controversial topics.
1. **The text is the game.** Mechanics emerge from content, not imposed on it.
2. **Low floor, high ceiling.** Any literate adult can play. Hints are always available and never shameful.
3. **Play is not gamification.** No streaks, energy meters, or push notifications. The game earns its return through delight, not coercion.
4. **The writer is present.** Author bylines are visible. Players should leave curious about *who wrote this*.
5. **Curiosity over competition.** Public play is contemplative and shareable, not ranked.
6. **Leave something behind.** Every session should leave the player with one idea they didn't have before.

## Puzzle Mechanics

### Fill
A passage with blanks. Drag the correct word from the bank (answer words only in current build). Remove the most *characterful* word — the one that reveals the author's sensibility.

### Rearrange
A passage with some lines out of order. All movable slots are pre-filled with shuffled lines — drag to swap slots until the argument flows. "Lock In" checks answers; wrong slots shake and unlock for another try. Works best with essays that have a clear argumentative or narrative arc.

### Spellcheck
A passage with 2–4 deliberate errors (misspellings, wrong-but-plausible word swaps). Tap the wrong words. The game is noticing, not hunting.

### Highlight ★
Wordplay's original mechanic, inspired by Medium's highlight feature. A passage is displayed as flowing text; the player click-drags to highlight the sentence they think was most highlighted by readers. On commit, a heatmap reveals highlight density per sentence. Tests *judgment* — the ability to sense a passage's gravitational center.

## Pack Composition

Each pack contains exactly **6 puzzles**: 2 fills · 1 rearrange · 1 spellcheck · 2 highlights. Puzzle order within each pack is as defined in the pack data. There is no separate "daily" vs "archive" — all packs are the same. Packs are sorted by `date` (newest first); the **newest pack** is labeled "Today" on the start screen menu.

## Puzzle Data Structure

Packs live in **`src/data/puzzles/`**. Each pack is its own file; the app exports a single list from `index.ts`.

### Directory layout

- **`index.ts`** — Imports all pack modules, collects them in `rawPacks`, then sorts by `date` (newest first) to produce `packs`. **Add new packs to `rawPacks` here** (order in the array doesn't matter).
- **One file per pack** — e.g. `stillLifting.ts`, `whatWeOwe.ts`, `newThreshold.ts`. Each exports a single `Pack` object.

### Pack shape (from `src/types.ts`)

Every pack must have:

- **`title`** — Pack theme (e.g. "Still Lifting", "What We Owe").
- **`editor`** — Credit (e.g. "The Wordplay Team").
- **`date`** — Explicit date string `YYYY-MM-DD` (e.g. `"2026-03-06"`). Used for the menu label and as the completion key in localStorage.
- **`welcome`** — `{ body: string, body2: string }` for the intro screen.
- **`editorNote`** — Short outro after the player finishes the pack.
- **`puzzles`** — Array of exactly 6 puzzles (see types: `FillPuzzle`, `RearrangePuzzle`, `SpellcheckPuzzle`, `HighlightPuzzle`). Each puzzle has `id`, `mechanic`, `source` (title, author, story_url, optional author_url), `content` (mechanic-specific), `difficulty`, `hint`.

### Adding a new pack

1. **Create a new file** in `src/data/puzzles/`, e.g. `myPack.ts`.
2. **Import** `Pack` and `Puzzle` from `"../../types"`.
3. **Define** the puzzles array (use a slug for ids, e.g. `mp-fill-01`, `mp-rearrange-01`, …).
4. **Export** a `Pack` object with `title`, `editor`, `date` (explicit `"YYYY-MM-DD"`), `welcome`, `editorNote`, and `puzzles`.
5. **Register the pack** in `src/data/puzzles/index.ts`: add the import and append the pack to the `rawPacks` array. Order in `rawPacks` doesn't matter — packs are sorted by `date` at runtime, and the newest is shown as "Today".

Example export from a pack file:

```ts
export const myPack: Pack = {
  title: "My Pack",
  editor: "The Wordplay Team",
  date: "2026-03-10",
  puzzles: myPackPuzzles,
  welcome: { body: "...", body2: "..." },
  editorNote: "...",
};
```

For full puzzle shapes and content rules, see `docs/WORDPLAY_PACK_SPEC.md` (used by the Medium AI tool to generate packs).

## Writing Puzzle Content

- **Fill distractors** share register, length, and semantic field of the correct answer — wrong but defensible.
- **Rearrange passages** need a clear logical arc. Shuffle 2–3 lines, keep the rest intact.
- **Spellcheck errors** range from obvious typos (easy) to wrong-but-plausible word swaps like complement/compliment (hard).
- **Highlight passages** need a clear gravitational center with 1–2 plausible runner-up sentences. Density values should sum to ~1.0.
- **Hints** should nudge toward *how* to think about the puzzle, not give away the answer.

## Tone & Voice

The copy sounds like a thoughtful editor — curious, warm, precise. Not chirpy, not gamey. Like a smart friend who loves books.

**Good:** "That's the word. Sharp eye." · "Same instinct as the author." · "Not quite — but an interesting choice."

**Avoid:** "Amazing!" · "You're on fire!" · Streak language · Urgency language

## What Claude Should Help With

1. **Puzzle generation**: Given a passage, identify puzzle-worthy moments across all mechanic types. Aim for variety within each pack.
2. **Distractor quality**: The hardest part. Plausible, not obvious.
3. **Tone calibration**: All copy should match the voice above.
4. **Mechanic expansion**: New mechanics must *serve the text*, not just use it as raw material. Honor the writing and the author.
5. **The Wordplay difference**: Push decisions toward making Wordplay its own thing, not a clone of any other game. Highlight is the template — mechanics that could only exist here.

## Deployment

GitHub Pages via `.github/workflows/deploy.yml`. Pushes to `main` auto-deploy. Vite base is `/wordplay/`. Live at `https://jborthwick.github.io/wordplay/`.

## Out of Scope (current)

- User accounts or authentication
- Medium API or live fetching (packs are static data; `story_url` and `author_url` point to real articles)
- Native mobile app
- Monetization / paywalls

Don't architect against these. But don't build them now.

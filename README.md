# Wordplay

A browser-based word puzzle game built on Medium's catalog of ideas. Players engage with real sentences, structures, and arguments from essays — filling blanks, rearranging lines, catching errors, and highlighting the passages that matter most. Each pack is a small, curated reading experience that leaves you with a thought that sticks.

## How it works

You choose a **pack** — a themed set of 6 puzzles drawn from essays on Medium. The newest pack is labeled "Today"; older packs stay playable. Four mechanics:

- **Fill** — Drag the correct word into blanks in a passage. The missing words are chosen for voice, not vocabulary.
- **Rearrange** — Drag lines into the right order to rebuild an argument. Lock in to check; wrong slots shake and unlock for another try.
- **Spellcheck** — A passage has a few deliberate errors (typos, wrong-but-plausible words). Tap the wrong words.
- **Highlight** — Highlight the sentence you think readers would underline most. A heatmap reveals how each line was actually highlighted.

Every pack has 2 fills, 1 rearrange, 1 spellcheck, and 2 highlights. Puzzle order within a pack is shuffled so repeat plays feel different. Hints are always available. No streaks, no timers, no guilt.

## Running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Stack

- React + TypeScript + Vite
- No backend — puzzle data lives in `src/data/puzzles/` (one file per pack)

## Deploy

GitHub Pages via `.github/workflows/deploy.yml`. Pushes to `main` auto-deploy. Live at [jborthwick.github.io/wordplay](https://jborthwick.github.io/wordplay/).

## Design references

- [Dear Reader](https://dearreadergame.com) — gameplay model (Fill, Rearrange, Spellcheck)
- [Puzzmo](https://puzzmo.com) — philosophy (play, not gamification)
- Medium.com — content source and brand home

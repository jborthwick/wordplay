# Wordplay

A daily word puzzle game built on Medium's catalog of ideas. Players engage with real sentences, structures, and arguments from essays — dragging words into blanks, rearranging lines into their correct order, and discovering writing worth reading.

## How it works

Each day brings a **pack** — a curated set of 4–6 puzzles drawn from 2–3 essays. Two mechanics are live:

- **Fill** — Drag words into blanks within a passage. The missing words are chosen for voice, not vocabulary.
- **Rearrange** — Drag lines into empty slots between fixed anchor lines to rebuild a passage's argument.

Players get 5 mistake dots per pack. When they're gone, a "Reveal answer" option appears. No streaks, no timers, no guilt.

## Running locally

```
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Stack

- React + TypeScript
- Vite
- No backend — puzzle data is JSON, updated per pack

## Design references

- [Dear Reader](https://dearreadergame.com) — gameplay model (Fill, Rearrange, Letters, Spellcheck)
- [Puzzmo](https://puzzmo.com) — philosophy (play, not gamification)
- Medium.com — content source and brand home

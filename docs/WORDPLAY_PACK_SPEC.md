# Wordplay Pack Spec — For Medium AI Tool

This document tells an agent how to take a **list of Medium articles** (with light API access) and produce a **complete Wordplay pack**: intro (welcome), outro (editor note), and all six puzzles in the exact JSON/data shapes that Wordplay consumes. The output can be passed to a developer to drop into the codebase.

---

## Your goal

Produce **one Pack** object that is ready to implement. The pack must include:

- **Pack metadata**: title, editor name, date
- **Intro**: two-paragraph welcome (`welcome.body`, `welcome.body2`)
- **Outro**: short editor note (`editorNote`)
- **Exactly 6 puzzles**: 2 Fill, 1 Rearrange, 1 Spellcheck, 2 Highlight

Use **only** the provided Medium articles. Each puzzle must use a real `PuzzleSource` (title, author, `story_url`) from one of those articles. The same article can be the source for multiple puzzles.

---

## Input you will receive

Assume you receive a list of Medium articles. Each article should have at least:

| Field        | Description |
|-------------|-------------|
| `title`     | Story title |
| `author`    | Author display name |
| `story_url` | Full Medium URL (e.g. `https://medium.com/@username/slug-...`) |
| `body` or `content` | Full text or substantial excerpts of the story |

You may get additional fields (e.g. id, publication). Use what you need; the output must include only the fields defined below.

---

## Output: Pack structure

Emit a **single JSON object** (or TypeScript-ready literal) that matches this structure. All fields are required unless marked optional.

### Pack (top level)

```ts
{
  "title": string,           // Pack theme title, e.g. "Small Truths", "The Long View"
  "editor": string,          // Curator credit, e.g. "Mia Tan" or "The Wordplay Team"
  "date": string,            // YYYY-MM-DD (e.g. "2025-03-05")
  "welcome": {
    "body": string,          // First paragraph of intro (2–4 sentences)
    "body2": string         // Second paragraph (1–3 sentences)
  },
  "editorNote": string,      // Short outro (2–4 sentences) after the player finishes
  "puzzles": [ ... ]         // Array of exactly 6 puzzles (see below)
}
```

### PuzzleSource (used inside every puzzle)

Every puzzle has a `source` object that must come from one of the input articles:

```ts
{
  "title": string,       // Exact story title from Medium
  "author": string,      // Exact author name from Medium
  "story_url": string    // Full Medium URL (not "#")
}
```

### Puzzle ID convention

Use a **pack slug** (short, lowercase, no spaces) plus mechanic and number:

- `{packSlug}-fill-01`, `{packSlug}-fill-02`
- `{packSlug}-rearrange-01`
- `{packSlug}-spellcheck-01`
- `{packSlug}-highlight-01`, `{packSlug}-highlight-02`

Example: for a pack titled "Small Truths", slug could be `st` → `st-fill-01`, `st-rearrange-01`, etc.

---

## Puzzle types (exact shapes)

### 1. Fill (×2)

Player drags words from a bank into blanks. The bank is the correct answers only (shuffled in the UI).

```ts
{
  "id": string,
  "mechanic": "fill",
  "source": { "title", "author", "story_url" },
  "content": {
    "passage": string,      // Use ______ for each blank (one per answer word)
    "answers": string[],    // Correct words in order of appearance in passage
    "full_passage": string  // Original passage with answers filled in
  },
  "difficulty": "easy" | "medium" | "hard",
  "hint": string
}
```

**Content rules:**

- Choose a passage where the missing words are **characterful** — they reveal the author’s sensibility.
- Use exactly one `______` per word in `answers`; order of `answers` must match order of blanks left-to-right.
- `full_passage` must be the exact original sentence(s) (with correct words in place).

---

### 2. Rearrange (×1)

Player reorders lines so the argument or narrative flows. Only some lines are movable.

```ts
{
  "id": string,
  "mechanic": "rearrange",
  "source": { "title", "author", "story_url" },
  "content": {
    "lines": string[],           // All lines in **correct** order
    "movable_indices": number[]  // Zero-based indices of lines that can be swapped (typically 2–4)
  },
  "difficulty": "easy" | "medium" | "hard",
  "hint": string
}
```

**Content rules:**

- Pick a passage with a clear **logical or narrative arc** (cause/effect, before/after, list then punchline).
- `lines`: 5–8 lines in correct order. `movable_indices`: usually 2–3 indices so the puzzle is solvable by reordering a few lines; the rest stay fixed in place in the UI.

---

### 3. Spellcheck (×1)

Player taps the words that are wrong (typos or wrong-but-plausible word swaps).

```ts
{
  "id": string,
  "mechanic": "spellcheck",
  "source": { "title", "author", "story_url" },
  "content": {
    "passage_with_errors": string,   // Passage with 2–4 errors baked in
    "errors": [
      { "wrong": string, "correct": string },
      ...
    ],
    "corrected_passage": string      // Full passage with all corrections applied
  },
  "difficulty": "easy" | "medium" | "hard",
  "hint": string
}
```

**Content rules:**

- Include 2–4 errors. Mix can be: obvious typos (e.g. "permanant"), wrong word that looks right (e.g. "compliment" vs "complement"), or grammar (e.g. "costed" → "cost").
- `passage_with_errors` must contain the exact `wrong` strings. `corrected_passage` must match the original author text (or intended correct form).

---

### 4. Highlight (×2)

Player highlights the sentence they think readers would highlight most. The game shows a heatmap; one sentence is the “correct” (most highlighted) answer.

```ts
{
  "id": string,
  "mechanic": "highlight",
  "source": { "title", "author", "story_url" },
  "content": {
    "sentences": string[],       // Passage split into sentences (display order)
    "correct_index": number,     // Zero-based index of the "most highlighted" sentence
    "highlight_density": number[] // One value per sentence, 0–1, **sum ≈ 1.0**
  },
  "difficulty": "easy" | "medium" | "hard",
  "hint": string
}
```

**Content rules:**

- Passage should have a clear **gravitational center** — one sentence that feels like the quote or idea readers would highlight, plus 1–2 plausible runner-ups.
- `highlight_density`: give the correct sentence the largest value (e.g. 0.35–0.50); others smaller. All values must sum to approximately 1.0 (e.g. 0.99–1.01).

---

## Shared rules for all puzzles

- **difficulty**: Use `"easy"` | `"medium"` | `"hard"` consistently. Medium is the default.
- **hint**: Nudge *how* to think about the puzzle (tone, structure, what the author is doing). Do **not** give away the answer.
- **source**: Always use the real Medium `title`, `author`, and `story_url` from the article list. Never use `"#"` for `story_url` when you have a real URL.

---

## Intro and outro voice

- **Welcome (body, body2)**: Thoughtful editor tone — curious, warm, precise. Set the theme of the pack and what the player will do (e.g. “Today’s pack is about… These puzzles ask you to…”). Not chirpy or gamey.
- **Editor note**: Short closing thought that ties the pack together and leaves the player with one idea. First person (“I built this pack…”) is fine. Same voice: smart friend who loves books.

Avoid: “Amazing!”, “You’re on fire!”, streaks, urgency, or anything that feels like generic gamification.

---

## Content and safety

- **Do not** use stories that are primarily about trauma, politics, religion, or highly controversial topics.
- Prefer essays with a clear idea, narrative, or argument — not pure reportage or listicles.
- The writer should feel present; players should leave curious about *who wrote this*.

---

## Example output (minimal)

```json
{
  "title": "Small Truths",
  "editor": "Mia Tan",
  "date": "2025-03-01",
  "welcome": {
    "body": "Today's pack is about the things hiding in plain sight — the truths so quiet you almost miss them.",
    "body2": "These puzzles ask you to slow down and notice. The words matter. So does the space between them."
  },
  "editorNote": "I built this pack around the idea that wisdom doesn't announce itself. I hope the puzzles helped you see that too.",
  "puzzles": [
    {
      "id": "st-fill-01",
      "mechanic": "fill",
      "source": {
        "title": "What My Grandmother Knew About Silence",
        "author": "Jia Lin",
        "story_url": "https://medium.com/@jialin/what-my-grandmother-knew-about-silence-a1b2c3d4"
      },
      "content": {
        "passage": "My grandmother never ______ silence. She inhabited it. Where I saw ______, she found presence.",
        "answers": ["explained", "absence"],
        "full_passage": "My grandmother never explained silence. She inhabited it. Where I saw absence, she found presence."
      },
      "difficulty": "medium",
      "hint": "The contrast is between analyzing and living. Between emptiness and fullness."
    }
  ]
}
```

(Only one puzzle shown; your output must include all six, in any order. The app will shuffle presentation.)

---

## Checklist before emitting

- [ ] Pack has `title`, `editor`, `date` (YYYY-MM-DD), `welcome`, `editorNote`, `puzzles`.
- [ ] Exactly 6 puzzles: 2 fill, 1 rearrange, 1 spellcheck, 2 highlight.
- [ ] Every puzzle has `id`, `mechanic`, `source`, `content`, `difficulty`, `hint`.
- [ ] Every `source` has real `title`, `author`, `story_url` (no `"#"` if you have URLs).
- [ ] Fill: `passage` has one `______` per item in `answers`; `full_passage` is consistent.
- [ ] Rearrange: `lines` in correct order; `movable_indices` are valid zero-based indices.
- [ ] Spellcheck: `errors` match strings in `passage_with_errors`; `corrected_passage` is correct.
- [ ] Highlight: `highlight_density` length equals `sentences` length; densities sum to ~1.0; `correct_index` in range.
- [ ] Hints are helpful but do not give away answers.
- [ ] Intro/outro match the tone guidelines.

Once this object is produced, a developer can add it to Wordplay (e.g. in `src/data/puzzles.ts` or a new data file) and wire it into the daily or archive pack list.

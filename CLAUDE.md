# CLAUDE.md — Wordplay by Medium

## What Is Wordplay?

**Wordplay** is a daily browser-based word puzzle game built on Medium's catalog of ideas.

The core concept: take real Medium stories — evergreen essays, trending pieces, sharp op-eds — and deconstruct them into playful, surprising puzzle snippets. Players engage with the sentences, structures, and ideas inside actual writing. They don't just solve a puzzle; they leave having absorbed something worth thinking about.

The closest reference point is **Dear Reader** (Apple Arcade), which does exactly this with classic public domain literature — turning passages from Jane Austen and Kafka into anagram games, word swaps, fill-in-the-blanks, and line reorderings. Wordplay does this with contemporary ideas from Medium writers.

The twist: these aren't dead texts in a museum. They're living essays by real writers on real platforms. Playing Wordplay is a way to *taste* writing before committing to reading it — or to revisit a piece you loved and see it differently.

---

## Why This Exists

Medium is in the business of making ideas worth reading. Games can be an extension of that mission, not a distraction from it.

Puzzmo proved that a puzzle game rooted in a media brand's identity — thoughtful, curated, community-oriented — can build genuine daily habits without resorting to streaks, push notifications, and compulsive loops. The New York Times proved games can anchor a subscription. Dear Reader proved that literary content and puzzle mechanics aren't just compatible — they're revelatory.

Wordplay combines all three insights in Medium's context:

- **Medium.com public layer**: Daily puzzles around trending and evergreen stories. Shareable results that reveal how you *think*, not just how fast you solved. Discovery path into stories you might want to read.

---

## Design Principles

These are the guardrails. When in doubt, return to these.

### 0. Some stories shouldn't be played
Medium is home to all kinds of writing and writers. Some stories touch on trauma, politics, religion, and other controversial topics. These kind of stories should never be used to populate games.

### 1. The text is the game
Puzzle mechanics are not imposed on content. They emerge from it. A great passage has natural gaps, surprising word choices, and a rhythm worth noticing. The puzzle design should make players feel that rhythm, not just fill in blanks.

### 2. Low floor, high ceiling
Any literate adult should be able to play. Experts should feel rewarded for caring about language more deeply. Never gate the fun behind vocabulary or prior knowledge. Hints are always available and never shameful.

### 3. Play is not gamification
No streaks. No energy meters. No push notifications nudging you back. A player who skips a day hasn't "broken" anything. The game earns its daily return through delight, not coercion. (See: Puzzmo manifesto.)

### 4. The writer is present
Medium stories have bylines. The puzzle experience should make the author feel present — not as a brand, but as a person with a specific voice. Players should leave curious about *who wrote this*, not just *what it said*.

### 5. Curiosity over competition
Leaderboards among strangers make people feel slow and dumb. Social play among friends makes people feel connected. Public play should be contemplative and shareable. Private group play (TK layer) is where friendly competition lives.

### 6. Leave something behind
Every puzzle session should leave the player with one idea they didn't have before. That's the bar. Not a high score. Not a solved board. A thought that sticks.

---

## Puzzle Mechanics (v1 Scope)

Mechanics are directly adapted from Dear Reader's four core puzzle types, which are visible in the screenshot reference. Each has been re-skinned for essay and idea-driven content rather than fiction. Start with **Fill** — it's the most universal and easiest to generate at scale. Add the others one at a time.

Dear Reader shows four mechanics in a single passage session, numbered and sequenced (1/7, 1/3, etc.). Wordplay should follow the same structure: a daily **pack** moves through 4–6 puzzle cards drawn from the same 2–3 stories, mixing mechanic types so no two consecutive cards feel the same.

---

### Mechanic 1: Fill
*"Touch the word that fits the blank"* — Dear Reader's most approachable mechanic.

A sentence from a Medium story with one key word removed. Below the passage, 3–4 candidate words appear as tappable chips. One is correct; the others are plausible distractors.

**Wordplay adaptation:**
- Remove the most *characterful* word in the sentence — the one that reveals the author's specific sensibility. Not the hardest word; the most them word.
- Distractors must be the same part of speech, approximately the same register, and semantically adjacent. Wrong but defensible.
- After reveal, show the full original sentence so the player can read it whole.

- **What makes it interesting**: The distractors should feel like real writing choices, not obvious wrong answers. This is a taste game, not a vocabulary quiz.

- **Tone target**: Calm, readable, a little bit like a great editor asking "which word do you think they chose?"

**Source selection:** Works best with sentences that hinge on a single precise word — arguments, aphorisms, observations. Avoid sentences where any of the options would be grammatically and semantically fine.

**Difficulty lever:** Easy = remove a distinctive adjective. Hard = remove the verb or the pivot word in a rhetorical turn.

**Example (from a Medium essay on attention):**
> "The internet didn't shorten our attention spans. It ______ them."
> Options: *rewired / broke / revealed / exhausted*

---

### Mechanic 2: Rearrange
*"Touch 2 lines to exchange them"* — Dear Reader's structure mechanic.

A passage of 5–8 sentences is displayed with some lines out of order. Players tap two lines to swap them, working toward the correct sequence. Unlike full drag-and-drop reordering, Dear Reader's swap mechanic is elegant: you fix one pair at a time, which makes it feel more surgical and less overwhelming.

**Wordplay adaptation:**
- Shuffle 2–3 lines from an otherwise intact passage. Don't randomize everything — keep most of the passage correct so players can feel the shape of the argument before fixing the broken parts.
- Works best with essay passages that have a clear logical or narrative arc: setup → complication → turn → resolution.
- Show line numbers or visual anchors so players can hold the sequence in mind.

**What makes it interesting:** Players have to *understand* the argument to fix it. You can't solve this by pattern-matching — you have to follow the thought.

**Source selection:** Strong argumentative essays, personal essays with a narrative arc, listicles with a building logic. Avoid: stream-of-consciousness, lyric essays, anything where the sequence is deliberately non-linear.

**Difficulty lever:** Easy = swap only the last two lines. Hard = swap lines 2 and 5 in a 7-line passage where the disruption is subtle.

---

### Mechanic 3: Letters
*"Tap the letter that fills the blank"* — Dear Reader's most granular mechanic.

A sentence with one word partially obscured — a key letter or two replaced by blanks. Players choose from a small set of letter tiles to complete the word. Dear Reader shows 4 letter tiles; the correct combination fills the gap.

**Wordplay adaptation:**
- This mechanic works best when the missing letters create a genuine moment of recognition — *oh, that word* — not just a spelling exercise.
- Target words that are either: (a) slightly unusual but instantly right once seen, or (b) common words used in a surprising context.
- Keep the surrounding sentence visible and readable. The context should be the hint.
- 3–4 letter tiles maximum. This isn't Wheel of Fortune.

**What makes it interesting:** The granularity forces players to slow down and actually read the sentence letter by letter. It's the closest thing to how an editor reads.

**Source selection:** Best with sentences containing one word that carries the whole weight of the clause. Works well with technical vocabulary that's been made accessible, or with common words used precisely.

**Difficulty lever:** Easy = one missing letter in a common word. Hard = two missing letters in a less familiar word with minimal surrounding context.

**Example:**
> "Most productivity advice is just __ __ xiety in a nicer font."
> Tiles: *a / n / p / r*

---

### Mechanic 4: Spellcheck
*"Touch the misspelled words"* — Dear Reader's proofreading mechanic.

A passage is displayed with several deliberate errors introduced: misspellings, wrong homophones, or subtly wrong word substitutions. Players tap the incorrect words to identify them. Dear Reader highlights correct identifications inline.

**Wordplay adaptation:**
- For Medium content, expand "misspelled" to include *wrong word* — a homophone swap (their/there), a near-synonym that doesn't quite work (affect/effect, imply/infer), or a word that's spelled right but is factually wrong in context.
- This turns a proofreading mechanic into a reading-comprehension mechanic. Players have to understand the argument to know when a word is wrong.
- 2–4 errors per passage. Never more. The game is noticing, not hunting.
- Show the corrected version after completion.

**What makes it interesting:** It's the only mechanic that rewards genuine subject-matter engagement, not just language sensitivity. Catching a wrong word in a tech essay requires knowing something about tech.

**Source selection:** Works especially well with Medium's ideas-forward content — essays making precise arguments, where word choice is load-bearing. Avoid casual, conversational pieces where loose language is a feature.

**Difficulty lever:** Easy = obvious misspellings (teh, recieve). Hard = wrong-but-plausible word swaps that require comprehension to catch (complement vs. compliment, principal vs. principle).

---

### Mechanic 5: The Turn
"Choose the pivot" — Wordplay's signature mechanic. No Dear Reader equivalent.

A passage is shown with its pivot sentence blanked out — the hinge where the argument reverses, complicates, or deepens. This is typically the sentence that starts with "But," "Except," "Until," "What I didn't expect was," or their equivalents. Players choose from three candidate pivot sentences: the real one, a plausible continuation that doesn't turn, and a turn that goes in the wrong direction.

**Wordplay adaptation:**

This mechanic is native to Medium more than to fiction. Essays live and die by their turns. Playing this teaches players to feel the moment an argument earns its complexity.
The two distractor options should be carefully constructed: one that continues the setup without turning (the "safe" choice), one that turns too hard or in the wrong direction (the "overcorrection").

After reveal, show the full passage with the turn restored so players can read the whole arc.

What makes it interesting: It's the most intellectually demanding mechanic — you have to understand the argument's shape, not just its words. But it's also the most satisfying when you get it right, because you've essentially predicted how a smart person thinks.

**Source selection:** Strong argumentative essays with a clear setup-complication-insight structure. Op-eds, personal essays with an aha moment, explainers that challenge a common assumption. Avoid: straight reportage, listicles, how-to pieces.

**Difficulty lever:** Easy = the turn is clearly signaled by a transition word. Hard = the turn is embedded mid-paragraph with no transitional signal.

Example:

Setup: "For years I optimized everything — my morning routine, my inbox, my calendar. I got very good at being busy."
[PIVOT]
Resolution: "I had confused motion for direction."

Options:

"The results were remarkable. I was more productive than I'd ever been." (no turn)
"Then my father got sick and none of it mattered." (real turn)
"So I quit my job and moved to a cabin in Vermont." (wrong turn)

---

### Mechanic 6: Bookends
"First or last?" — A structural intuition game.

Players are shown a passage from a Medium essay, then two sentences: one is the real opening line of the full piece, one is the real closing line. Which is which?

The name "Bookends" captures what's being revealed: the two sentences that hold the essay together. It sounds binary and simple. It rarely is — great writers often close with the energy you'd expect at the opening, or open with a quiet image that only makes sense once you've read to the end.

**Wordplay adaptation:** Show a passage from the middle of the essay as context — enough to feel the author's voice and argument, not enough to give away the ending.
Both sentences must be real lines from the essay. No generated distractors. The puzzle is entirely about structural intuition.

After reveal, show both sentences in their correct positions with a brief note on why the structure works — this is the "leave something behind" moment for this mechanic.

**What makes it interesting:** It teaches essay architecture through feel rather than instruction. Players develop an instinct for how arguments open and close without ever reading a craft book.

**Source selection:** Essays with genuinely strong opening and closing sentences that differ in energy, image, or register. Avoid essays where the opening and closing are tonally identical or where the structure is purely expository.

**Difficulty lever:** Easy = opening and closing are clearly different in tense or register. Hard = both are written in the same quiet, declarative voice and the distinction is subtle.

**Example context passage:**

"...This is what I mean when I say attention is a practice. You don't have it or lack it. You build it, lose it, and build it again."
Which is the opening line? Which is the closing?

"My grandmother never owned a smartphone."
"We are all, in the end, learning to pay attention."


---

## Content Pipeline

### Source selection criteria
- Evergreen essays (ideas that don't expire): preferred for daily puzzles
- Trending stories (high engagement in last 30 days): good for topical daily editions
- Staff picks and Editor's choice: highest signal for quality
- Minimum read time: 4 minutes (enough density to extract multiple puzzle moments)
- Avoid: news analysis, highly data-dense pieces, first-person trauma narratives (wrong register for play)

### Passage extraction
For each story, extract 3–8 candidate puzzle moments:
- A sentence with a distinctive word choice
- A sequence of sentences with strong logical or narrative flow
- A passage with a clear voice signature
- An opening or closing that is unusually strong

### Attribution
Every puzzle surface should show:
- Story title (tappable — links to full piece)
- Author name and avatar
- Publication name if applicable
- Tag: "evergreen" or approximate publish date

The read-through moment — when a player finishes a puzzle and taps through to the full story — is a feature, not a side effect. Design for it.

---

## Technical Architecture

### Stack assumptions (prototype)
- **Frontend**: React + TypeScript, single-page app
- **Puzzle data**: JSON-driven. Each puzzle is a self-contained object with mechanic type, source text, answer, distractors, and metadata.
- **Content API**: Medium API or curated manual pipeline for v1. Automate with Claude-assisted extraction in v2.
- **No backend required for v1**: Static JSON puzzle packs, updated daily via CI/CD or manual deploy.
- **Hosting**: Cloudflare Pages or equivalent edge deployment.

### Puzzle JSON schema (draft)

The `mechanic` field is one of: `fill`, `rearrange`, `letters`, `spellcheck`.

**Fill:**
```json
{
  "id": "wordplay-2024-11-01-fill-01",
  "mechanic": "fill",
  "source": {
    "story_id": "medium-story-id",
    "title": "The Quiet Crisis in How We Read",
    "author": "Mandy Brown",
    "author_avatar_url": "...",
    "story_url": "https://medium.com/...",
    "publication": "A Working Library"
  },
  "content": {
    "text_with_gap": "The internet didn't shorten our attention spans. It ______ them.",
    "correct_answer": "rewired",
    "distractors": ["broke", "revealed", "exhausted"],
    "full_sentence": "The internet didn't shorten our attention spans. It rewired them."
  },
  "difficulty": "medium",
  "hint": "The author isn't mourning — they're reframing.",
  "tags": ["attention", "technology", "essays"]
}
```

**Rearrange:**
```json
{
  "id": "wordplay-2024-11-01-rearrange-01",
  "mechanic": "rearrange",
  "source": { "...": "same source shape" },
  "content": {
    "lines": [
      "That's the thing about clarity:",
      "you only recognize it after the confusion.",
      "Most people never get there.",
      "They stop at the confusion and call it nuance."
    ],
    "correct_order": [0, 1, 3, 2],
    "shuffled_order": [0, 3, 1, 2]
  },
  "difficulty": "hard",
  "hint": "Follow the argument — setup, then turn, then consequence."
}
```

**Letters:**
```json
{
  "id": "wordplay-2024-11-01-letters-01",
  "mechanic": "letters",
  "source": { "...": "same source shape" },
  "content": {
    "sentence": "Most productivity advice is just __ __ xiety in a nicer font.",
    "target_word": "anxiety",
    "missing_letters": ["a", "n"],
    "letter_tiles": ["a", "n", "p", "r"],
    "full_sentence": "Most productivity advice is just anxiety in a nicer font."
  },
  "difficulty": "easy",
  "hint": "It's an emotion masquerading as a system."
}
```

**Spellcheck:**
```json
{
  "id": "wordplay-2024-11-01-spellcheck-01",
  "mechanic": "spellcheck",
  "source": { "...": "same source shape" },
  "content": {
    "passage_with_errors": "The affect of social media on reading is cumulative. We loose the ability to sustain attention not all at once, but gradually — one scroll at a time.",
    "errors": [
      { "wrong": "affect", "correct": "effect", "index": 4 },
      { "wrong": "loose", "correct": "lose", "index": 20 }
    ],
    "corrected_passage": "The effect of social media on reading is cumulative. We lose the ability to sustain attention not all at once, but gradually — one scroll at a time."
  },
  "difficulty": "medium",
  "hint": "One is a grammar error; one requires knowing what the author means."
}
```

### Daily pack structure
Each day ships a **pack** of 4–6 puzzles drawn from 2–3 different stories. The pack should feel like a small, curated reading experience — not a random assortment.

---

## What Claude Should Help With

When working in this codebase, Claude is a collaborator on:

**The Wordplay Difference**: Make sure decisions push Wordplay to be it's own thing and not a carbon copy of any other game. 

1. **Puzzle generation**: Given a passage, identify puzzle-worthy moments and generate `fill`, `rearrange`, `letters`, or `spellcheck` puzzle objects in the schema above. For each story, aim to produce at least one of each mechanic type — this ensures daily packs feel varied. Distractors and errors should be thoughtful — plausible, not obvious.

2. **Distractor quality**: The hardest part of The Gap mechanic is writing distractors that feel like real choices without being correct. They should share the register, approximate length, and semantic field of the correct answer — but be subtly wrong.

3. **Tone calibration**: Puzzle copy (instructions, hints, completion messages) should feel warm, curious, and a little literary. Not chirpy. Not gamey. Like a smart friend who loves books.

4. **Mechanic expansion**: When adding new puzzle types, interrogate whether the mechanic *serves the text* or just uses it as raw material. We should always honor the text and the author.

5. **Accessibility**: Every mechanic should be playable with keyboard only. Color choices should pass WCAG AA. Hints should always be available without penalty.

---

## Tone & Voice Reference

The copy in this game sounds like:

- A thoughtful editor, not a hype machine
- Curious, not sycophantic
- Warm, not whimsical
- Precise, not dense

**Completion messages to emulate:**
- "That's the word. Sharp eye."
- "Same instinct as the author. Worth reading the whole piece."
- "Not quite — but an interesting choice. Here's what they wrote."

**Avoid:**
- "Amazing!" / "You're on fire!" / "Incredible!"
- Streak language ("Day 7! Don't break it!")
- Urgency ("Only 3 puzzles left today!")

---

## Out of Scope (v1)

- User accounts or authentication
- Real stories, use mock stories for now.
- Score persistence across sessions
- Native mobile app
- Story recommendation engine
- Monetization / paywalls
- Audio

These are real future directions. Don't architect against them. But don't build them now.

---

## References

- **Dear Reader** (dearreadergame.com) — closest gameplay reference. The four core mechanics — Fill, Rearrange, Letters, Spellcheck — are the direct model for Wordplay's v1 mechanic set. Note the card UI: passage text on top, interaction affordances below, hint + score dots at the bottom. The numbered progress indicator (1/7) sets a session expectation without pressure. Study how each mechanic type is introduced with a brief, directive instruction line ("TOUCH THE WORD THAT FITS THE BLANK") — copy that directly.
- **Puzzmo** (puzzmo.com) — philosophy reference. Read the manifesto before making any product decision. The section on play vs. gamification is load-bearing.
- **Medium.com** — content source and brand home. The game should feel like it belongs in the same world as a great Medium essay.
- **NYT Games** — distribution reference, not design reference. They optimized for retention; we're optimizing for meaning.



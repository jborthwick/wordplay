import { useState, useCallback, useEffect } from "react";
import type { Pack } from "../types";
import { FillPuzzle } from "./FillPuzzle";
import { RearrangePuzzle } from "./RearrangePuzzle";
import { SpellcheckPuzzle } from "./SpellcheckPuzzle";
import { HighlightPuzzle } from "./HighlightPuzzle";
import { Confetti } from "./Confetti";
import { saveCompletion } from "../data/completion";

interface Props {
  pack: Pack;
  onRestart: () => void;
  onBack?: () => void;
}

const MAX_MISTAKES = 5;

// Daily welcome messages — rotate by day of year
const welcomeMessages = [
  {
    body: "Every sentence in today's pack was chosen because something in it surprised us — a word that could only belong to one writer, or a turn of phrase that made us stop and reread.",
    body2: "You'll drag words into blanks, rearrange lines into arguments, and along the way, absorb ideas worth sitting with. No timer. No rush. Just you and the writing.",
  },
  {
    body: "Today's puzzles are drawn from essays about attention, ambition, and the things we build when no one is watching. The writers behind them chose every word carefully.",
    body2: "Your job is to notice what they noticed. Fill in the gaps, rebuild the arguments, and see if you can feel the rhythm of someone else's thinking.",
  },
  {
    body: "A good essay earns your attention one sentence at a time. These puzzles work the same way — each one asks you to slow down and read like the words matter. Because they do.",
    body2: "Drag words into place, rearrange scattered lines, and discover passages you might want to read in full when you're done.",
  },
  {
    body: "The best ideas don't announce themselves. They slip into a sentence and wait for you to notice. Today's pack is built from writing like that — quiet, precise, worth a second look.",
    body2: "Play through the puzzles at whatever pace feels right. Hints are always available. The only goal is to leave with something you didn't have before.",
  },
  {
    body: "Writing is thinking made visible. These puzzles let you step inside someone else's thinking — to feel where an argument turns, to sense which word the author reached for and why.",
    body2: "There are no streaks to protect and no scores to chase. Just six puzzles, a handful of chances, and some writing that deserves your attention.",
  },
];

const editorNotes = [
  "Today's pack was built around the idea that clarity is a practice, not a gift. The writers featured here all found something true by slowing down. We hope the puzzles gave you a reason to do the same.",
  "We chose these passages because each one surprised us on a second read. The words that seemed obvious at first turned out to be the most carefully chosen. That's the kind of writing worth playing with.",
  "Every pack is a small reading list in disguise. If a passage stuck with you today, follow it back to the full essay. The best part of these puzzles is what comes after.",
  "The writers in today's pack don't agree on much, but they all care about precision — finding the one word that does the work of ten. We hope you felt that as you played.",
  "Thanks for playing today's pack. These puzzles are our way of saying that reading deserves more than a scroll. It deserves attention. Come back tomorrow for a new set.",
];

function getDailyWelcome() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return welcomeMessages[dayOfYear % welcomeMessages.length];
}

interface CompletedViewProps {
  puzzleCount: number;
  mistakes: number;
  mistakeWord: string;
  flawless: boolean;
  outOfMistakes: boolean;
  editor: string;
  editorNote: string;
  sources: import("../types").PuzzleSource[];
  onRestart: () => void;
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CompletedView({ puzzleCount, mistakes, mistakeWord, flawless, outOfMistakes, editor, editorNote, sources, onRestart }: CompletedViewProps) {
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  function handleShare() {
    const dots = Array.from({ length: MAX_MISTAKES }, (_, i) =>
      i < MAX_MISTAKES - mistakes ? "●" : "○"
    ).join("");
    const text = `Wordplay\n${dots}\n${flawless ? "Flawless!" : `${mistakes} mistake${mistakes === 1 ? "" : "s"}`}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  function toggleBookmark(title: string) {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }

  return (
    <div className="pack-complete puzzle-enter">
      <Confetti />
      <h2>Pack complete</h2>
      {flawless ? (
        <p>Flawless. {puzzleCount} puzzles, zero missteps.</p>
      ) : outOfMistakes ? (
        <p>{puzzleCount} puzzles done — it got tough, but you made it.</p>
      ) : (
        <p>{puzzleCount} puzzles, {mistakes} {mistakeWord}. Nice reading.</p>
      )}
      <div className="pack-complete-dots">
        {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
          <span
            key={i}
            className={`mistake-dot ${i < MAX_MISTAKES - mistakes ? "mistake-dot-full" : "mistake-dot-empty"}`}
          />
        ))}
      </div>
      <button className="share-button" onClick={handleShare}>
        {copied ? "Copied!" : "Share"}
      </button>
      <div className="editor-note">
        <p className="editor-note-label">A note from the editor</p>
        <p className="editor-note-body">{editorNote}</p>
        <p className="editor-note-sign">— {editor}</p>
      </div>
      <div className="reading-list">
        <p className="reading-list-label">Today's reading list</p>
        <ul className="reading-list-items">
          {sources.map((s) => (
            <li key={s.title} className="reading-list-item">
              <a href={s.story_url} className="reading-list-link">
                <div className="reading-list-text">
                  <span className="reading-list-title">{s.title}</span>
                  <span className="reading-list-author">{s.author}</span>
                </div>
                <button
                  className={`bookmark-button ${bookmarked.has(s.title) ? "bookmark-button-active" : ""}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleBookmark(s.title); }}
                  title={bookmarked.has(s.title) ? "Remove bookmark" : "Bookmark"}
                >
                  <BookmarkIcon filled={bookmarked.has(s.title)} />
                </button>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button className="play-again-button" onClick={onRestart}>
        Back to start
      </button>
    </div>
  );
}

export function PackView({ pack, onRestart, onBack }: Props) {
  const { puzzles, title, editor } = pack;
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [flawless, setFlawless] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const handleMistake = useCallback(() => {
    setMistakes((m) => m + 1);
    setFlawless(false);
  }, []);

  function handlePuzzleComplete() {
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowHint(false); // Reset hint for next puzzle
    } else {
      setCompleted(true);
    }
  }

  // Debug: arrow keys to skip forward/back between puzzles
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (showWelcome || completed) return;
      if (e.key === "ArrowRight") {
        if (currentIndex < puzzles.length - 1) {
          setCurrentIndex((i) => i + 1);
          setShowHint(false);
        } else {
          // Past last puzzle — jump to end note
          setCompleted(true);
        }
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
        setShowHint(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showWelcome, completed, currentIndex, puzzles.length]);

  // Save to localStorage when pack is completed
  useEffect(() => {
    if (completed) {
      saveCompletion(pack.date, {
        mistakes,
        flawless,
        totalPuzzles: puzzles.length,
        completedAt: new Date().toISOString(),
      });
    }
  }, [completed, pack.date, mistakes, flawless, puzzles.length]);

  const outOfMistakes = mistakes >= MAX_MISTAKES;
  const welcome = pack.welcome ?? getDailyWelcome();
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const editorNote = pack.editorNote ?? editorNotes[dayOfYear % editorNotes.length];

  // Welcome card
  if (showWelcome) {
    return (
      <div className="welcome-card puzzle-enter">
        {onBack && (
          <button className="welcome-back-button" onClick={onBack} title="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div className="welcome-content">
          <h2 className="welcome-headline">{title}</h2>
          <p className="welcome-editor">Edited by {editor}</p>
          <p className="welcome-body">{welcome.body}</p>
          <p className="welcome-body">{welcome.body2}</p>
        </div>
        <div className="welcome-dots">
          {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
            <span key={i} className="mistake-dot mistake-dot-full" />
          ))}
        </div>
        <p className="welcome-dots-label">{MAX_MISTAKES} chances to get it right</p>
        <button
          className="next-button welcome-begin"
          onClick={() => setShowWelcome(false)}
        >
          Begin
        </button>
      </div>
    );
  }

  // Pack complete
  if (completed) {
    const mistakeWord = mistakes === 1 ? "mistake" : "mistakes";

    // Deduplicate sources by title for the reading list
    const seenTitles = new Set<string>();
    const sources = puzzles
      .map((p) => p.source)
      .filter((s) => {
        if (seenTitles.has(s.title)) return false;
        seenTitles.add(s.title);
        return true;
      });

    return <CompletedView
      puzzleCount={puzzles.length}
      mistakes={mistakes}
      mistakeWord={mistakeWord}
      flawless={flawless}
      outOfMistakes={outOfMistakes}
      editor={editor}
      editorNote={editorNote}
      sources={sources}
      onRestart={onRestart}
    />;
  }

  const puzzle = puzzles[currentIndex];
  const progressPercent = (currentIndex / puzzles.length) * 100;

  return (
    <div className="pack-view">
      <header className="pack-header">
        <div className="pack-header-info">
          <p className="pack-title">{title}</p>
          <p className="pack-editor">Edited by {editor}</p>
        </div>
        {!outOfMistakes && (
          <button
            className="hint-icon-button"
            onClick={() => setShowHint((v) => !v)}
            title="Hint"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18h6" /><path d="M10 22h4" />
              <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
            </svg>
          </button>
        )}
      </header>

      <div className="pack-status-bar">
        <div className="pack-progress">
          <span>
            {currentIndex + 1} / {puzzles.length}
          </span>
          <div className="pack-progress-bar">
            <div
              className="pack-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className="mistake-tracker">
          {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
            <span
              key={i}
              className={`mistake-dot ${i < MAX_MISTAKES - mistakes ? "mistake-dot-full" : "mistake-dot-empty"}`}
            />
          ))}
        </div>
      </div>

      {showHint && (
        <div className="hint-modal-backdrop" onClick={() => setShowHint(false)}>
          <div className="hint-modal" onClick={(e) => e.stopPropagation()}>
            <p className="hint-modal-text">{puzzle.hint}</p>
            <button className="hint-modal-close" onClick={() => setShowHint(false)}>
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="puzzle-enter" key={puzzle.id}>
        {puzzle.mechanic === "fill" && (
          <FillPuzzle
            puzzle={puzzle}
            onComplete={handlePuzzleComplete}
            onMistake={handleMistake}
            outOfMistakes={outOfMistakes}
          />
        )}
        {puzzle.mechanic === "rearrange" && (
          <RearrangePuzzle
            puzzle={puzzle}
            onComplete={handlePuzzleComplete}
            onMistake={handleMistake}
            outOfMistakes={outOfMistakes}
          />
        )}
        {puzzle.mechanic === "spellcheck" && (
          <SpellcheckPuzzle
            puzzle={puzzle}
            onComplete={handlePuzzleComplete}
            onMistake={handleMistake}
            outOfMistakes={outOfMistakes}
          />
        )}
        {puzzle.mechanic === "highlight" && (
          <HighlightPuzzle
            puzzle={puzzle}
            onComplete={handlePuzzleComplete}
            onMistake={handleMistake}
            outOfMistakes={outOfMistakes}
          />
        )}
      </div>
    </div>
  );
}

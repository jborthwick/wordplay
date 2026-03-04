import { useState, useCallback, useEffect } from "react";
import type { SpellcheckPuzzle as SpellcheckPuzzleType } from "../types";
import { Attribution } from "./Attribution";

interface Props {
  puzzle: SpellcheckPuzzleType;
  onComplete: () => void;
  onMistake?: () => void;
  outOfMistakes?: boolean;
}

interface WordToken {
  text: string;
  index: number;
  isError: boolean;
  correction?: string;
}

function tokenize(passage: string, errors: { wrong: string; correct: string }[]): WordToken[] {
  const words = passage.split(/(\s+)/);
  const tokens: WordToken[] = [];
  let wordIndex = 0;

  // Track which errors have been matched (to handle duplicates)
  const errorMatched = new Array(errors.length).fill(false);

  for (const raw of words) {
    // Whitespace tokens — skip
    if (/^\s+$/.test(raw)) {
      tokens.push({ text: raw, index: -1, isError: false });
      continue;
    }

    // Strip punctuation to match against error words
    const stripped = raw.replace(/^["""''([\-]+/, "").replace(/["""'')\].,;:!?\-]+$/, "");

    let matchedError: { wrong: string; correct: string } | undefined;
    for (let i = 0; i < errors.length; i++) {
      if (!errorMatched[i] && stripped.toLowerCase() === errors[i].wrong.toLowerCase()) {
        matchedError = errors[i];
        errorMatched[i] = true;
        break;
      }
    }

    tokens.push({
      text: raw,
      index: wordIndex,
      isError: !!matchedError,
      correction: matchedError?.correct,
    });
    wordIndex++;
  }

  return tokens;
}

export function SpellcheckPuzzle({ puzzle, onComplete, onMistake, outOfMistakes }: Props) {
  const { errors } = puzzle.content;

  const [tokens] = useState(() => tokenize(puzzle.content.passage_with_errors, errors));
  const [foundErrors, setFoundErrors] = useState<Set<number>>(new Set());
  const [wrongTaps, setWrongTaps] = useState<Set<number>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const errorIndices = tokens.filter((t) => t.isError).map((t) => t.index);
  const solved = errorIndices.every((i) => foundErrors.has(i)) || revealed;
  const allFound = errorIndices.every((i) => foundErrors.has(i));

  // Auto-complete when all errors found
  useEffect(() => {
    if (allFound && !revealed && foundErrors.size > 0) {
      // Small delay to let the last highlight animate
    }
  }, [allFound, revealed, foundErrors.size]);

  const handleWordTap = useCallback(
    (token: WordToken) => {
      if (solved || token.index === -1) return;
      if (foundErrors.has(token.index)) return; // Already found

      if (token.isError) {
        setFoundErrors((prev) => new Set(prev).add(token.index));
      } else {
        // Wrong tap — flash red and count mistake
        setWrongTaps((prev) => new Set(prev).add(token.index));
        onMistake?.();
        setTimeout(() => {
          setWrongTaps((prev) => {
            const next = new Set(prev);
            next.delete(token.index);
            return next;
          });
        }, 800);
      }
    },
    [solved, foundErrors, onMistake]
  );

  function handleReveal() {
    setRevealed(true);
    setFoundErrors(new Set(errorIndices));
  }

  // Build the corrected word for display when found
  function getCorrectedText(token: WordToken): string {
    if (!token.correction) return token.text;
    const stripped = token.text.replace(/^["""''([\-]+/, "").replace(/["""'')\].,;:!?\-]+$/, "");
    return token.text.replace(stripped, token.correction);
  }

  return (
    <div className="spellcheck-puzzle">
      <div className="puzzle-header">
        <Attribution source={puzzle.source} showReadLink={solved} />
        {!solved && !showHint && !outOfMistakes && (
          <button className="hint-icon-button" onClick={() => setShowHint(true)} title="Hint">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18h6" /><path d="M10 22h4" />
              <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
            </svg>
          </button>
        )}
      </div>

      <div className="passage">
        <p className="instruction">Tap the words that don't belong</p>
        <p className="sentence spellcheck-passage">
          {tokens.map((token, i) => {
            // Whitespace
            if (token.index === -1) {
              return <span key={i}>{token.text}</span>;
            }

            const isFound = foundErrors.has(token.index);
            const isWrongTap = wrongTaps.has(token.index);

            if (solved && token.isError) {
              return (
                <span key={i} className="spellcheck-word spellcheck-word-corrected">
                  <span className="spellcheck-strikethrough">{token.text}</span>
                  {" "}
                  <span className="spellcheck-correction">{getCorrectedText(token)}</span>
                </span>
              );
            }

            if (isFound && token.isError) {
              return (
                <span key={i} className="spellcheck-word spellcheck-word-found">
                  <span className="spellcheck-strikethrough">{token.text}</span>
                  {" "}
                  <span className="spellcheck-correction">{getCorrectedText(token)}</span>
                </span>
              );
            }

            return (
              <span
                key={i}
                className={[
                  "spellcheck-word",
                  isWrongTap ? "spellcheck-word-wrong" : "",
                  solved ? "spellcheck-word-solved" : "",
                ].join(" ")}
                onClick={() => handleWordTap(token)}
              >
                {token.text}
              </span>
            );
          })}
        </p>
      </div>

      <div className="spellcheck-counter">
        {solved
          ? `${errors.length} of ${errors.length} found`
          : `${foundErrors.size} of ${errors.length} found`}
      </div>

      {solved ? (
        <div className="feedback correct">
          <p className="feedback-message">
            {revealed
              ? "Here's what should have been. Worth a closer look."
              : "Good eye. You read like an editor."}
          </p>
          <button className="next-button" onClick={onComplete}>
            Continue
          </button>
        </div>
      ) : (
        <div className="hint-area">
          {showHint && <p className="hint-text">{puzzle.hint}</p>}
          {outOfMistakes && (
            <button className="reveal-button" onClick={handleReveal}>
              Reveal answer
            </button>
          )}
        </div>
      )}
    </div>
  );
}

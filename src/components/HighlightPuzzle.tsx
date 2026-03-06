import { useState, useRef } from "react";
import type { HighlightPuzzle as HighlightPuzzleType } from "../types";
import { Attribution } from "./Attribution";

interface Props {
  puzzle: HighlightPuzzleType;
  onComplete: () => void;
  onMistake?: () => void;
  outOfMistakes?: boolean;
}

export function HighlightPuzzle({ puzzle, onComplete, onMistake, outOfMistakes }: Props) {
  const { sentences, correct_index, highlight_density } = puzzle.content;

  // Selection is a range of sentence indices [start, end] inclusive
  const [selection, setSelection] = useState<[number, number] | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<"correct" | "close" | "miss" | null>(null);

  const solved = revealed;
  const maxDensity = Math.max(...highlight_density);

  const sentenceRefs = useRef<(HTMLSpanElement | null)[]>([]);

  function handleSentenceTap(i: number) {
    if (revealed) return;
    // Tapping the already-selected single sentence clears it
    if (selection !== null && selection[0] === i && selection[1] === i) {
      setSelection(null);
    } else {
      setSelection([i, i]);
    }
  }

  function clearSelection() {
    if (revealed) return;
    setSelection(null);
  }

  function handleCommit() {
    if (selection === null || revealed) return;

    const [start, end] = selection;
    const containsCorrect = correct_index >= start && correct_index <= end;
    const exactMatch = start === end && start === correct_index;
    const adjacent = !containsCorrect && (
      Math.abs(start - correct_index) <= 1 || Math.abs(end - correct_index) <= 1
    );

    if (exactMatch || containsCorrect) {
      setResult("correct");
    } else if (adjacent) {
      setResult("close");
      onMistake?.();
    } else {
      setResult("miss");
      onMistake?.();
    }
    setRevealed(true);
  }

  function handleReveal() {
    setSelection(null);
    setResult("miss");
    setRevealed(true);
  }

  function isInSelection(i: number): boolean {
    if (!selection) return false;
    return i >= selection[0] && i <= selection[1];
  }

  const feedbackMessage =
    result === "correct"
      ? "Same instinct as most readers. You found the gravitational center."
      : result === "close"
        ? "One sentence off. You were reading in the right neighborhood."
        : "A different read — but that's what makes this interesting.";

  return (
    <div className="highlight-puzzle">
      <div className="highlight-passage">
        <p className="mechanic-label">Highlight</p>
        <p className="instruction">
          {revealed ? "Here's what readers highlighted" : "Tap the sentence readers loved most"}
        </p>

        <div className={`puzzle-quote highlight-paragraph ${revealed ? "highlight-paragraph-revealed" : ""}`}>
          {sentences.map((sentence, i) => {
            const isCorrect = i === correct_index;
            const wasPicked = selection !== null && isInSelection(i);
            const density = highlight_density[i];
            const normDensity = maxDensity > 0 ? density / maxDensity : 0;

            let className = "highlight-span";

            if (!revealed && wasPicked) {
              className += " highlight-span-selected";
            }

            if (revealed) {
              className += " highlight-span-revealed";
              if (isCorrect) className += " highlight-span-correct";
              if (wasPicked && !isCorrect) className += " highlight-span-pick";
            }

            return (
              <span
                key={i}
                ref={(el) => { sentenceRefs.current[i] = el; }}
                className={className}
                style={
                  revealed
                    ? { "--density": normDensity } as React.CSSProperties
                    : { cursor: "pointer" }
                }
                onClick={() => handleSentenceTap(i)}
              >
                {sentence}
                {revealed && isCorrect && (
                  <span className="highlight-badge highlight-badge-top">▲ most highlighted</span>
                )}
                {revealed && wasPicked && !isCorrect && (
                  <span className="highlight-badge highlight-badge-you">your pick</span>
                )}
                {" "}
              </span>
            );
          })}
        </div>
      </div>

      <Attribution source={puzzle.source} showReadLink={solved} />

      {solved ? (
        <div className="feedback correct">
          <p className="feedback-message">{feedbackMessage}</p>
          <button className="next-button" onClick={onComplete}>
            Continue
          </button>
        </div>
      ) : (
        <div className="highlight-actions">
          {selection !== null && (
            <>
              <button className="next-button highlight-commit" onClick={handleCommit}>
                Lock in highlight
              </button>
              <button className="highlight-clear" onClick={clearSelection}>
                Clear
              </button>
            </>
          )}
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

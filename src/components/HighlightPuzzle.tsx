import { useState } from "react";
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

  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<"correct" | "close" | "miss" | null>(null);

  const solved = revealed;
  const maxDensity = Math.max(...highlight_density);

  function handleSelect(index: number) {
    if (revealed) return;
    setSelected(selected === index ? null : index);
  }

  function handleCommit() {
    if (selected === null || revealed) return;

    const distance = Math.abs(selected - correct_index);
    if (selected === correct_index) {
      setResult("correct");
    } else if (distance <= 1) {
      setResult("close");
      onMistake?.();
    } else {
      setResult("miss");
      onMistake?.();
    }
    setRevealed(true);
  }

  function handleReveal() {
    setSelected(null);
    setResult("miss");
    setRevealed(true);
  }

  const feedbackMessage =
    result === "correct"
      ? "Same instinct as most readers. You found the gravitational center."
      : result === "close"
        ? "One sentence off. You were reading in the right neighborhood."
        : "A different read — but that's what makes this interesting.";

  return (
    <div className="highlight-puzzle">
      <div className="puzzle-header">
        <Attribution source={puzzle.source} showReadLink={solved} />
      </div>

      <div className="highlight-passage">
        <p className="instruction">Highlight the sentence readers loved most</p>
        <div className="highlight-sentences">
          {sentences.map((sentence, i) => {
            const isSelected = selected === i;
            const isCorrect = i === correct_index;
            const density = highlight_density[i];
            // Normalise density to 0–1 for opacity mapping
            const normDensity = maxDensity > 0 ? density / maxDensity : 0;

            let className = "highlight-sentence";
            if (!revealed && isSelected) className += " highlight-sentence-selected";
            if (revealed && isCorrect) className += " highlight-sentence-correct";
            if (revealed && isSelected && !isCorrect) className += " highlight-sentence-pick";
            if (revealed) className += " highlight-sentence-revealed";

            return (
              <div
                key={i}
                className={className}
                onClick={() => handleSelect(i)}
                style={
                  revealed
                    ? {
                        "--density": normDensity,
                      } as React.CSSProperties
                    : undefined
                }
              >
                <span className="highlight-sentence-text">{sentence}</span>
                {revealed && (
                  <span className="highlight-density-bar">
                    <span
                      className="highlight-density-fill"
                      style={{ width: `${normDensity * 100}%` }}
                    />
                  </span>
                )}
                {revealed && isCorrect && (
                  <span className="highlight-badge highlight-badge-top">
                    Most highlighted
                  </span>
                )}
                {revealed && isSelected && !isCorrect && (
                  <span className="highlight-badge highlight-badge-you">
                    Your pick
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {solved ? (
        <div className="feedback correct">
          <p className="feedback-message">{feedbackMessage}</p>
          <button className="next-button" onClick={onComplete}>
            Continue
          </button>
        </div>
      ) : (
        <div className="highlight-actions">
          {selected !== null && (
            <button className="next-button highlight-commit" onClick={handleCommit}>
              Lock in highlight
            </button>
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

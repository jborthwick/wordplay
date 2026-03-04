import { useState, useRef, useCallback, useEffect } from "react";
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

  // Drag tracking refs
  const isDragging = useRef(false);
  const dragStart = useRef<number | null>(null);
  const sentenceRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Find which sentence a pointer coordinate is over
  const getSentenceAtPoint = useCallback((x: number, y: number): number | null => {
    for (let i = 0; i < sentences.length; i++) {
      const el = sentenceRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return i;
      }
    }
    return null;
  }, [sentences.length]);

  // Pointer handlers for drag highlighting
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (revealed) return;
    e.preventDefault();

    const idx = getSentenceAtPoint(e.clientX, e.clientY);
    if (idx === null) return;

    isDragging.current = true;
    dragStart.current = idx;
    setSelection([idx, idx]);
  }, [revealed, getSentenceAtPoint]);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!isDragging.current || dragStart.current === null) return;
      e.preventDefault();
      const idx = getSentenceAtPoint(e.clientX, e.clientY);
      if (idx !== null) {
        const start = Math.min(dragStart.current, idx);
        const end = Math.max(dragStart.current, idx);
        setSelection([start, end]);
      }
    }

    function onUp(e: PointerEvent) {
      if (!isDragging.current) return;
      e.preventDefault();
      isDragging.current = false;
      dragStart.current = null;
    }

    document.addEventListener("pointermove", onMove, { passive: false });
    document.addEventListener("pointerup", onUp);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
  }, [getSentenceAtPoint]);

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
      <div className="puzzle-header">
        <Attribution source={puzzle.source} showReadLink={solved} />
      </div>

      <div className="highlight-passage">
        <p className="instruction">
          {revealed ? "Here's what readers highlighted" : "Click and drag to highlight the sentence readers loved most"}
        </p>

        <div
          className={`highlight-paragraph ${revealed ? "highlight-paragraph-revealed" : ""}`}
          onPointerDown={!revealed ? handlePointerDown : undefined}
          style={!revealed ? { touchAction: "none" } : undefined}
        >
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
                    : undefined
                }
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

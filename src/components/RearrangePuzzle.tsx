import { useState, useRef, useCallback } from "react";
import type { RearrangePuzzle as RearrangePuzzleType } from "../types";
import { Attribution } from "./Attribution";

interface Props {
  puzzle: RearrangePuzzleType;
  onComplete: () => void;
}

interface DragState {
  /** Index in the current display order */
  fromIndex: number;
  y: number;
  startY: number;
  lineHeight: number;
}

export function RearrangePuzzle({ puzzle, onComplete }: Props) {
  const { lines, shuffled_order } = puzzle.content;

  // Current order tracks indices into the lines array
  const [order, setOrder] = useState<number[]>(() => [...shuffled_order]);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [justSwapped, setJustSwapped] = useState<number | null>(null);
  const [wrongLines, setWrongLines] = useState<Set<number>>(new Set());

  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const correctOrder = lines.map((_, i) => i);
  const solved = order.every((val, i) => val === correctOrder[i]);

  // Find which display position the pointer is closest to
  const getInsertIndex = useCallback(
    (clientY: number): number => {
      for (let i = 0; i < order.length; i++) {
        const el = lineRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        if (clientY < mid) return i;
      }
      return order.length - 1;
    },
    [order]
  );

  function startDrag(displayIndex: number, e: React.PointerEvent) {
    if (solved) return;
    e.preventDefault();
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // May fail in some environments
    }
    const el = lineRefs.current[displayIndex];
    setDrag({
      fromIndex: displayIndex,
      y: e.clientY,
      startY: e.clientY,
      lineHeight: el?.getBoundingClientRect().height ?? 60,
    });
    setWrongLines(new Set());
  }

  function moveDrag(e: React.PointerEvent) {
    if (!drag) return;
    e.preventDefault();
    setDrag({ ...drag, y: e.clientY });
  }

  function endDrag(e: React.PointerEvent) {
    if (!drag) return;
    e.preventDefault();
    const toIndex = getInsertIndex(e.clientY);

    if (toIndex !== drag.fromIndex) {
      const next = [...order];
      const [moved] = next.splice(drag.fromIndex, 1);
      next.splice(toIndex, 0, moved);
      setOrder(next);
      setJustSwapped(toIndex);
      setTimeout(() => setJustSwapped(null), 300);

      // Check if solved after move
      const isSolved = next.every((val, i) => val === correctOrder[i]);
      if (!isSolved) {
        // Check which lines are wrong
        const wrong = new Set<number>();
        next.forEach((val, i) => {
          if (val !== correctOrder[i]) wrong.add(i);
        });
        // Only show wrong indicators if more than half are placed
        const correctCount = next.filter((val, i) => val === correctOrder[i]).length;
        if (correctCount >= Math.floor(lines.length / 2)) {
          setWrongLines(wrong);
          setTimeout(() => setWrongLines(new Set()), 1500);
        }
      }
    }

    setDrag(null);
  }

  // Compute visual offset for the dragged line
  const dragOffsetY = drag ? drag.y - drag.startY : 0;

  return (
    <div
      className="rearrange-puzzle"
      ref={containerRef}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      style={{ touchAction: drag ? "none" : "auto" }}
    >
      <p className="instruction">Drag lines into the right order</p>

      <div className="rearrange-lines">
        {order.map((lineIndex, displayIndex) => {
          const isDragging = drag?.fromIndex === displayIndex;
          const isCorrect = solved;
          const isWrong = wrongLines.has(displayIndex);
          const isSnap = justSwapped === displayIndex;

          return (
            <div
              key={lineIndex}
              ref={(el) => {
                lineRefs.current[displayIndex] = el;
              }}
              className={[
                "rearrange-line",
                isDragging ? "rearrange-line-dragging" : "",
                isCorrect ? "rearrange-line-correct" : "",
                isWrong ? "rearrange-line-wrong" : "",
                isSnap ? "rearrange-line-snap" : "",
              ].join(" ")}
              onPointerDown={(e) => startDrag(displayIndex, e)}
              style={
                isDragging
                  ? {
                      transform: `translateY(${dragOffsetY}px) scale(1.02)`,
                      zIndex: 50,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    }
                  : undefined
              }
            >
              <span className="rearrange-grip">⠿</span>
              <span className="rearrange-text">{lines[lineIndex]}</span>
            </div>
          );
        })}
      </div>

      {solved ? (
        <div className="feedback correct">
          <p className="feedback-message">
            The argument flows. You read like an editor.
          </p>
          <button className="next-button" onClick={onComplete}>
            Continue
          </button>
        </div>
      ) : (
        <div className="hint-area">
          {showHint ? (
            <p className="hint-text">{puzzle.hint}</p>
          ) : (
            <button className="hint-button" onClick={() => setShowHint(true)}>
              Hint
            </button>
          )}
        </div>
      )}

      <Attribution source={puzzle.source} showReadLink={solved} />
    </div>
  );
}

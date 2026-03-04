import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import type { FillPuzzle as FillPuzzleType } from "../types";
import { Attribution } from "./Attribution";

interface Props {
  puzzle: FillPuzzleType;
  onComplete: () => void;
}

interface DragState {
  word: string;
  /** "bank" or blank index the word is coming from */
  origin: "bank" | number;
  /** Which chip index in the bank (for tracking duplicates) */
  chipIndex?: number;
  x: number;
  y: number;
  startX: number;
  startY: number;
}

export function FillPuzzle({ puzzle, onComplete }: Props) {
  const { answers } = puzzle.content;
  const totalBlanks = answers.length;

  const [filled, setFilled] = useState<(string | null)[]>(
    () => new Array(totalBlanks).fill(null)
  );
  const [drag, setDrag] = useState<DragState | null>(null);
  const [hoverBlank, setHoverBlank] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [wrongBlanks, setWrongBlanks] = useState<Set<number>>(new Set());
  const [justPlaced, setJustPlaced] = useState<number | null>(null);

  const blankRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const solved = filled.every((w, i) => w === answers[i]);
  const allFilled = filled.every((w) => w !== null);

  // Shuffle chips
  const shuffledChips = useMemo(() => {
    return [...answers].sort((a, b) => {
      const hashA = a.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
      const hashB = b.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
      return hashA - hashB;
    });
  }, [answers]);

  // Track which bank chips are used
  const isChipUsed = useCallback(
    (chipIndex: number) => {
      const word = shuffledChips[chipIndex];
      let chipOccurrence = 0;
      for (let i = 0; i <= chipIndex; i++) {
        if (shuffledChips[i] === word) chipOccurrence++;
      }
      let placedCount = 0;
      for (const f of filled) {
        if (f === word) placedCount++;
      }
      // Also count if currently being dragged from bank
      if (drag && drag.origin === "bank" && shuffledChips[drag.chipIndex!] === word) {
        placedCount++;
      }
      return chipOccurrence <= placedCount;
    },
    [shuffledChips, filled, drag]
  );

  // Check answers when all blanks filled
  useEffect(() => {
    if (!allFilled || solved) return;
    const wrong = new Set<number>();
    filled.forEach((w, i) => {
      if (w !== answers[i]) wrong.add(i);
    });
    if (wrong.size > 0) {
      setWrongBlanks(wrong);
      // Clear wrong indicators after a moment
      const t = setTimeout(() => setWrongBlanks(new Set()), 1200);
      return () => clearTimeout(t);
    }
  }, [allFilled, filled, answers, solved]);

  // Hit-test which blank the pointer is over
  function getBlankAtPoint(x: number, y: number): number | null {
    for (let i = 0; i < totalBlanks; i++) {
      const el = blankRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // Generous hit area
      const pad = 12;
      if (
        x >= rect.left - pad &&
        x <= rect.right + pad &&
        y >= rect.top - pad &&
        y <= rect.bottom + pad
      ) {
        return i;
      }
    }
    return null;
  }

  function startDrag(
    word: string,
    origin: "bank" | number,
    chipIndex: number | undefined,
    e: React.PointerEvent
  ) {
    if (solved) return;
    e.preventDefault();
    try { (e.target as HTMLElement).setPointerCapture(e.pointerId); } catch {
      // Pointer capture may fail in some environments
    }
    setDrag({
      word,
      origin,
      chipIndex,
      x: e.clientX,
      y: e.clientY,
      startX: e.clientX,
      startY: e.clientY,
    });
    setWrongBlanks(new Set());
  }

  function moveDrag(e: React.PointerEvent) {
    if (!drag) return;
    e.preventDefault();
    setDrag({ ...drag, x: e.clientX, y: e.clientY });
    setHoverBlank(getBlankAtPoint(e.clientX, e.clientY));
  }

  function endDrag(e: React.PointerEvent) {
    if (!drag) return;
    e.preventDefault();
    const targetBlank = getBlankAtPoint(e.clientX, e.clientY);

    if (targetBlank !== null) {
      const next = [...filled];

      if (drag.origin === "bank") {
        // Dropping from bank into a blank
        if (next[targetBlank] === null) {
          next[targetBlank] = drag.word;
        } else {
          // Blank already occupied — swap back to bank, place new word
          // (old word goes back automatically since it's no longer in filled)
          next[targetBlank] = drag.word;
        }
      } else {
        // Dragging from one blank to another
        const fromBlank = drag.origin as number;
        if (targetBlank === fromBlank) {
          // Dropped back on same blank — no change
        } else {
          // Swap
          const temp = next[targetBlank];
          next[targetBlank] = next[fromBlank];
          next[fromBlank] = temp;
        }
      }

      setFilled(next);
      setJustPlaced(targetBlank);
      setTimeout(() => setJustPlaced(null), 300);
    } else if (drag.origin !== "bank") {
      // Dragged from a blank to nowhere — remove it
      const next = [...filled];
      next[drag.origin as number] = null;
      setFilled(next);
    }

    setDrag(null);
    setHoverBlank(null);
  }

  // Split the passage around blanks
  const segments = puzzle.content.passage.split("______");

  // Compute drag offset for the floating chip
  const dragOffset = drag
    ? { x: drag.x - drag.startX, y: drag.y - drag.startY }
    : null;

  return (
    <div
      className="fill-puzzle"
      ref={containerRef}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      style={{ touchAction: drag ? "none" : "auto" }}
    >
      <p className="instruction">Drag each word into its blank</p>

      <div className="passage">
        <p className="sentence">
          {segments.map((segment, i) => (
            <span key={i}>
              {segment}
              {i < totalBlanks && (
                <span
                  ref={(el) => { blankRefs.current[i] = el; }}
                  className={[
                    "fill-slot",
                    filled[i] ? "fill-slot-filled" : "fill-slot-empty",
                    hoverBlank === i && drag ? "fill-slot-hover" : "",
                    wrongBlanks.has(i) ? "fill-slot-wrong" : "",
                    justPlaced === i ? "fill-slot-snap" : "",
                    solved ? "fill-slot-solved" : "",
                  ].join(" ")}
                  onPointerDown={(e) => {
                    if (filled[i]) {
                      startDrag(filled[i]!, i, undefined, e);
                    }
                  }}
                >
                  {filled[i] && !(drag && drag.origin === i) ? filled[i] : "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {solved ? (
        <div className="feedback correct">
          <p className="feedback-message">
            Every word in its place. Sharp eye.
          </p>
          <button className="next-button" onClick={onComplete}>
            Continue
          </button>
        </div>
      ) : (
        <>
          <div className="word-chips">
            {shuffledChips.map((word, i) => {
              const used = isChipUsed(i);
              const isDragging = drag?.origin === "bank" && drag.chipIndex === i;
              return (
                <span
                  key={`${word}-${i}`}
                  className={`chip ${used && !isDragging ? "chip-used" : ""} ${isDragging ? "chip-dragging" : ""}`}
                  onPointerDown={(e) => {
                    if (!used) startDrag(word, "bank", i, e);
                  }}
                  style={
                    isDragging && dragOffset
                      ? {
                          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${Math.min(Math.max(dragOffset.x * 0.15, -8), 8)}deg) scale(1.08)`,
                          zIndex: 100,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                          position: "relative" as const,
                        }
                      : undefined
                  }
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Floating ghost for blank-origin drags */}
          {drag && drag.origin !== "bank" && (
            <div
              className="chip chip-ghost"
              style={{
                position: "fixed",
                left: drag.x - 40,
                top: drag.y - 20,
                transform: `rotate(${Math.min(Math.max((drag.x - drag.startX) * 0.15, -8), 8)}deg) scale(1.08)`,
                pointerEvents: "none",
                zIndex: 1000,
              }}
            >
              {drag.word}
            </div>
          )}

          <div className="hint-area">
            {showHint ? (
              <p className="hint-text">{puzzle.hint}</p>
            ) : (
              <button className="hint-button" onClick={() => setShowHint(true)}>
                Hint
              </button>
            )}
          </div>
        </>
      )}

      <Attribution source={puzzle.source} showReadLink={solved} />
    </div>
  );
}

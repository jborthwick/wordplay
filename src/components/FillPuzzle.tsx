import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import type { FillPuzzle as FillPuzzleType } from "../types";
import { Attribution } from "./Attribution";

interface Props {
  puzzle: FillPuzzleType;
  onComplete: () => void;
  onMistake?: () => void;
  outOfMistakes?: boolean;
}

interface DragInfo {
  word: string;
  origin: "bank" | number;
  chipIndex?: number;
}

export function FillPuzzle({ puzzle, onComplete, onMistake, outOfMistakes }: Props) {
  const { answers } = puzzle.content;
  const totalBlanks = answers.length;

  const [filled, setFilled] = useState<(string | null)[]>(
    () => new Array(totalBlanks).fill(null)
  );
  const [isDragging, setIsDragging] = useState(false);
  const [wrongBlanks, setWrongBlanks] = useState<Set<number>>(new Set());
  const [justPlaced, setJustPlaced] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const blankRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragInfo | null>(null);
  const filledRef = useRef(filled);
  filledRef.current = filled;
  const lastHoverBlank = useRef<number | null>(null);

  const solved = filled.every((w, i) => w === answers[i]) || revealed;
  const allFilled = filled.every((w) => w !== null);

  function handleReveal() {
    setFilled([...answers]);
    setRevealed(true);
  }

  const shuffledChips = useMemo(() => {
    return [...answers].sort((a, b) => {
      const hashA = a.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
      const hashB = b.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
      return hashA - hashB;
    });
  }, [answers]);

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
      const drag = dragRef.current;
      if (isDragging && drag && drag.origin === "bank" && shuffledChips[drag.chipIndex!] === word) {
        placedCount++;
      }
      return chipOccurrence <= placedCount;
    },
    [shuffledChips, filled, isDragging]
  );

  useEffect(() => {
    if (!allFilled || solved) return;
    const wrong = new Set<number>();
    filled.forEach((w, i) => {
      if (w !== answers[i]) wrong.add(i);
    });
    if (wrong.size > 0) {
      setWrongBlanks(wrong);
      onMistake?.();
      const t = setTimeout(() => setWrongBlanks(new Set()), 1200);
      return () => clearTimeout(t);
    }
  }, [allFilled, filled, answers, solved, onMistake]);

  function getBlankAtPoint(x: number, y: number): number | null {
    for (let i = 0; i < totalBlanks; i++) {
      const el = blankRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
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

  function updateHoverHighlight(blankIndex: number | null) {
    if (lastHoverBlank.current === blankIndex) return;
    if (lastHoverBlank.current !== null) {
      blankRefs.current[lastHoverBlank.current]?.classList.remove("fill-slot-hover");
    }
    if (blankIndex !== null) {
      blankRefs.current[blankIndex]?.classList.add("fill-slot-hover");
    }
    lastHoverBlank.current = blankIndex;
  }

  // Native event listeners — zero React overhead during drag
  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!dragRef.current) return;
      e.preventDefault();
      const ghost = ghostRef.current;
      if (ghost) {
        ghost.style.left = `${e.clientX - 40}px`;
        ghost.style.top = `${e.clientY - 20}px`;
      }
      updateHoverHighlight(getBlankAtPoint(e.clientX, e.clientY));
    }

    function onUp(e: PointerEvent) {
      const drag = dragRef.current;
      if (!drag) return;
      e.preventDefault();

      const targetBlank = getBlankAtPoint(e.clientX, e.clientY);
      const currentFilled = filledRef.current;

      if (targetBlank !== null) {
        const next = [...currentFilled];
        if (drag.origin === "bank") {
          next[targetBlank] = drag.word;
        } else {
          const fromBlank = drag.origin as number;
          if (targetBlank !== fromBlank) {
            const temp = next[targetBlank];
            next[targetBlank] = next[fromBlank];
            next[fromBlank] = temp;
          }
        }
        setFilled(next);
        setJustPlaced(targetBlank);
        setTimeout(() => setJustPlaced(null), 300);
      } else if (drag.origin !== "bank") {
        const next = [...currentFilled];
        next[drag.origin as number] = null;
        setFilled(next);
      }

      // Clean up
      updateHoverHighlight(null);
      const ghost = ghostRef.current;
      if (ghost) ghost.style.display = "none";

      if (drag.origin === "bank" && drag.chipIndex !== undefined) {
        const chipEl = containerRef.current?.querySelectorAll(".chip")[drag.chipIndex] as HTMLElement;
        if (chipEl) chipEl.classList.remove("chip-dragging");
      }

      dragRef.current = null;
      setIsDragging(false);
    }

    document.addEventListener("pointermove", onMove, { passive: false });
    document.addEventListener("pointerup", onUp);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
  }, [totalBlanks]);

  function startDrag(
    word: string,
    origin: "bank" | number,
    chipIndex: number | undefined,
    e: React.PointerEvent
  ) {
    if (solved) return;
    e.preventDefault();

    dragRef.current = { word, origin, chipIndex };
    setIsDragging(true);
    setWrongBlanks(new Set());

    const ghost = ghostRef.current;
    if (ghost) {
      ghost.textContent = word;
      ghost.style.display = "block";
      ghost.style.left = `${e.clientX - 40}px`;
      ghost.style.top = `${e.clientY - 20}px`;
      ghost.style.transform = "scale(1.08)";
    }

    if (origin === "bank" && chipIndex !== undefined) {
      const chipEl = containerRef.current?.querySelectorAll(".chip")[chipIndex] as HTMLElement;
      if (chipEl) chipEl.classList.add("chip-dragging");
    }
  }

  const segments = puzzle.content.passage.split("______");

  return (
    <div
      className="fill-puzzle"
      ref={containerRef}
      style={{ touchAction: isDragging ? "none" : "auto" }}
    >
      <div className="puzzle-header">
        <Attribution source={puzzle.source} showReadLink={solved} />
      </div>

      <div className="passage">
        <p className="instruction">Drag each word into its blank</p>
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
                    wrongBlanks.has(i) ? "fill-slot-wrong" : "",
                    justPlaced === i ? "fill-slot-snap" : "",
                    solved ? "fill-slot-solved" : "",
                  ].join(" ")}
                  onPointerDown={(e) => {
                    if (filled[i]) startDrag(filled[i]!, i, undefined, e);
                  }}
                >
                  {filled[i] && !(isDragging && dragRef.current?.origin === i) ? filled[i] : "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
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
      ) : revealed ? (
        <div className="feedback revealed">
          <p className="feedback-message">
            Here's how it reads. Worth knowing.
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
              return (
                <span
                  key={`${word}-${i}`}
                  className={`chip ${used ? "chip-used" : ""}`}
                  onPointerDown={(e) => {
                    if (!used) startDrag(word, "bank", i, e);
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>

          <div className="hint-area">
            {outOfMistakes && (
              <button className="reveal-button" onClick={handleReveal}>
                Reveal answer
              </button>
            )}
          </div>
        </>
      )}

      <div
        ref={ghostRef}
        className="chip chip-ghost"
        style={{
          display: "none",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      />
    </div>
  );
}

import { useState, useRef, useMemo, useEffect } from "react";
import type { RearrangePuzzle as RearrangePuzzleType } from "../types";
import { Attribution } from "./Attribution";

interface Props {
  puzzle: RearrangePuzzleType;
  onComplete: () => void;
  onMistake?: () => void;
  outOfMistakes?: boolean;
}

interface DragInfo {
  line: string;
  /** "bank" or slot index the line is coming from */
  origin: "bank" | number;
  /** Index in the shuffled bank array */
  bankIndex?: number;
}

export function RearrangePuzzle({ puzzle, onComplete, onMistake, outOfMistakes }: Props) {
  const { lines, movable_indices } = puzzle.content;
  const totalSlots = movable_indices.length;

  // Which lines go in slots — correct answers in slot order
  const slotAnswers = useMemo(
    () => movable_indices.map((i) => lines[i]),
    [lines, movable_indices]
  );

  // Shuffled bank of movable lines
  const shuffledBank = useMemo(() => {
    const movableLines = movable_indices.map((i) => lines[i]);
    return [...movableLines].sort((a, b) => {
      const hashA = a.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
      const hashB = b.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
      return hashA - hashB;
    });
  }, [lines, movable_indices]);

  const [filled, setFilled] = useState<(string | null)[]>(
    () => new Array(totalSlots).fill(null)
  );
  const [isDragging, setIsDragging] = useState(false);
  const [wrongSlots, setWrongSlots] = useState<Set<number>>(new Set());
  const [justPlaced, setJustPlaced] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragInfo | null>(null);
  const filledRef = useRef(filled);
  filledRef.current = filled;
  const lastHoverSlot = useRef<number | null>(null);

  const solved = filled.every((line, i) => line === slotAnswers[i]) || revealed;
  const allFilled = filled.every((line) => line !== null);

  function handleReveal() {
    setFilled([...slotAnswers]);
    setRevealed(true);
  }

  // Check which bank cards are used
  function isBankUsed(bankIndex: number): boolean {
    const line = shuffledBank[bankIndex];
    let bankOccurrence = 0;
    for (let i = 0; i <= bankIndex; i++) {
      if (shuffledBank[i] === line) bankOccurrence++;
    }
    let placedCount = 0;
    for (const f of filled) {
      if (f === line) placedCount++;
    }
    const drag = dragRef.current;
    if (isDragging && drag && drag.origin === "bank" && shuffledBank[drag.bankIndex!] === line) {
      placedCount++;
    }
    return bankOccurrence <= placedCount;
  }

  // Check answers when all slots filled
  useEffect(() => {
    if (!allFilled || solved) return;
    const wrong = new Set<number>();
    filled.forEach((line, i) => {
      if (line !== slotAnswers[i]) wrong.add(i);
    });
    if (wrong.size > 0) {
      setWrongSlots(wrong);
      onMistake?.();
      const t = setTimeout(() => setWrongSlots(new Set()), 1200);
      return () => clearTimeout(t);
    }
  }, [allFilled, filled, slotAnswers, solved, onMistake]);

  // Hit-test which slot the pointer is over
  function getSlotAtPoint(x: number, y: number): number | null {
    for (let i = 0; i < totalSlots; i++) {
      const el = slotRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const pad = 8;
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

  function updateHoverHighlight(slotIndex: number | null) {
    if (lastHoverSlot.current === slotIndex) return;
    if (lastHoverSlot.current !== null) {
      slotRefs.current[lastHoverSlot.current]?.classList.remove("rearrange-slot-hover");
    }
    if (slotIndex !== null) {
      slotRefs.current[slotIndex]?.classList.add("rearrange-slot-hover");
    }
    lastHoverSlot.current = slotIndex;
  }

  // Native event listeners for smooth drag
  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!dragRef.current) return;
      e.preventDefault();
      const ghost = ghostRef.current;
      if (ghost) {
        ghost.style.left = `${e.clientX - 60}px`;
        ghost.style.top = `${e.clientY - 24}px`;
      }
      updateHoverHighlight(getSlotAtPoint(e.clientX, e.clientY));
    }

    function onUp(e: PointerEvent) {
      const drag = dragRef.current;
      if (!drag) return;
      e.preventDefault();

      const targetSlot = getSlotAtPoint(e.clientX, e.clientY);
      const currentFilled = filledRef.current;

      if (targetSlot !== null) {
        const next = [...currentFilled];
        if (drag.origin === "bank") {
          next[targetSlot] = drag.line;
        } else {
          const fromSlot = drag.origin as number;
          if (targetSlot !== fromSlot) {
            const temp = next[targetSlot];
            next[targetSlot] = next[fromSlot];
            next[fromSlot] = temp;
          }
        }
        setFilled(next);
        setJustPlaced(targetSlot);
        setTimeout(() => setJustPlaced(null), 300);
      } else if (drag.origin !== "bank") {
        // Dragged from slot to nowhere — remove
        const next = [...currentFilled];
        next[drag.origin as number] = null;
        setFilled(next);
      }

      // Clean up
      updateHoverHighlight(null);
      const ghost = ghostRef.current;
      if (ghost) ghost.style.display = "none";

      if (drag.origin === "bank" && drag.bankIndex !== undefined) {
        const cards = containerRef.current?.querySelectorAll(".rearrange-card");
        const el = cards?.[drag.bankIndex] as HTMLElement;
        if (el) el.classList.remove("rearrange-card-dragging");
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
  }, [totalSlots]);

  function startDrag(
    line: string,
    origin: "bank" | number,
    bankIndex: number | undefined,
    e: React.PointerEvent
  ) {
    if (solved) return;
    e.preventDefault();

    dragRef.current = { line, origin, bankIndex };
    setIsDragging(true);
    setWrongSlots(new Set());

    const ghost = ghostRef.current;
    if (ghost) {
      ghost.textContent = line;
      ghost.style.display = "block";
      ghost.style.left = `${e.clientX - 60}px`;
      ghost.style.top = `${e.clientY - 24}px`;
      ghost.style.transform = "scale(1.03)";
    }

    if (origin === "bank" && bankIndex !== undefined) {
      const cards = containerRef.current?.querySelectorAll(".rearrange-card");
      const el = cards?.[bankIndex] as HTMLElement;
      if (el) el.classList.add("rearrange-card-dragging");
    }
  }

  // Build the passage: fixed lines + slots for movable lines
  const movableSet = new Set(movable_indices);
  let slotCounter = 0;

  return (
    <div className="rearrange-puzzle" ref={containerRef}>
      <div className="puzzle-header">
        <Attribution source={puzzle.source} showReadLink={solved} />
      </div>

      <div className="rearrange-passage">
        <p className="instruction">Drag each line into its place</p>
        {lines.map((line, lineIndex) => {
          if (movableSet.has(lineIndex)) {
            const slotIdx = slotCounter++;
            const filledLine = filled[slotIdx];
            const isBeingDragged = isDragging && dragRef.current?.origin === slotIdx;

            return (
              <div
                key={lineIndex}
                ref={(el) => { slotRefs.current[slotIdx] = el; }}
                className={[
                  "rearrange-slot",
                  filledLine ? "rearrange-slot-filled" : "rearrange-slot-empty",
                  wrongSlots.has(slotIdx) ? "rearrange-slot-wrong" : "",
                  justPlaced === slotIdx ? "rearrange-slot-snap" : "",
                  solved ? "rearrange-slot-solved" : "",
                ].join(" ")}
                onPointerDown={(e) => {
                  if (filledLine && !isBeingDragged) {
                    startDrag(filledLine, slotIdx, undefined, e);
                  }
                }}
              >
                {filledLine && !isBeingDragged ? filledLine : "\u00A0"}
              </div>
            );
          } else {
            return (
              <div key={lineIndex} className={`rearrange-fixed ${solved ? "rearrange-fixed-solved" : ""}`}>
                {line}
              </div>
            );
          }
        })}
      </div>

      {solved ? (
        <div className="feedback correct">
          <p className="feedback-message">
            {revealed ? "Here's how the passage reads. Worth knowing." : "The argument flows. You read like an editor."}
          </p>
          <button className="next-button" onClick={onComplete}>
            Continue
          </button>
        </div>
      ) : (
        <>
          <div className="rearrange-bank">
            {shuffledBank.map((line, i) => {
              const used = isBankUsed(i);
              return (
                <div
                  key={`${line}-${i}`}
                  className={`rearrange-card ${used ? "rearrange-card-used" : ""}`}
                  onPointerDown={(e) => {
                    if (!used) startDrag(line, "bank", i, e);
                  }}
                >
                  {line}
                </div>
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

      {/* Ghost element for drag */}
      <div
        ref={ghostRef}
        className="rearrange-card rearrange-card-ghost"
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

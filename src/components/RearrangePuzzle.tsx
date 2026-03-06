import { useState, useRef, useMemo, useEffect } from "react";
import type { RearrangePuzzle as RearrangePuzzleType } from "../types";
import { Attribution } from "./Attribution";

interface Props {
  puzzle: RearrangePuzzleType;
  onComplete: () => void;
  onMistake?: () => void;
  outOfMistakes?: boolean;
}

export function RearrangePuzzle({ puzzle, onComplete, onMistake, outOfMistakes }: Props) {
  const { lines, movable_indices } = puzzle.content;
  const totalSlots = movable_indices.length;

  // Correct answers in slot order
  const slotAnswers = useMemo(
    () => movable_indices.map((i) => lines[i]),
    [lines, movable_indices]
  );

  // Shuffle the movable lines for initial placement
  const shuffledInitial = useMemo(() => {
    const arr = [...slotAnswers];
    // Seeded Fisher-Yates
    let seed = arr.join("").split("").reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
    function rand() {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    }
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Ensure at least one is out of place
    if (arr.every((line, i) => line === slotAnswers[i])) {
      [arr[0], arr[1]] = [arr[1], arr[0]];
    }
    return arr;
  }, [slotAnswers]);

  const [slots, setSlots] = useState<string[]>(shuffledInitial);
  const [wrongSlots, setWrongSlots] = useState<Set<number>>(new Set());
  const [correctSlots, setCorrectSlots] = useState<Set<number>>(new Set());
  const [justPlaced, setJustPlaced] = useState<number | null>(null);
  const [justSwapped, setJustSwapped] = useState<number | null>(null);
  const [draggingSlot, setDraggingSlot] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [locked, setLocked] = useState(false);

  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ line: string; fromSlot: number } | null>(null);
  const slotsRef = useRef(slots);
  slotsRef.current = slots;
  const lastHoverSlot = useRef<number | null>(null);

  const solved = locked && slots.every((line, i) => line === slotAnswers[i]);

  function handleReveal() {
    setSlots([...slotAnswers]);
    setRevealed(true);
    setLocked(true);
  }

  function handleLockIn() {
    setLocked(true);
    const wrong = new Set<number>();
    const correct = new Set<number>();
    slots.forEach((line, i) => {
      if (line === slotAnswers[i]) {
        correct.add(i);
      } else {
        wrong.add(i);
      }
    });
    setCorrectSlots(correct);
    if (wrong.size > 0) {
      setWrongSlots(wrong);
      onMistake?.();
      // Unlock after shake so player can try again
      setTimeout(() => {
        setWrongSlots(new Set());
        setCorrectSlots(new Set());
        setLocked(false);
      }, 1200);
    }
  }

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
      const current = slotsRef.current;

      if (targetSlot !== null && targetSlot !== drag.fromSlot) {
        // Swap the two slots
        const next = [...current];
        [next[drag.fromSlot], next[targetSlot]] = [next[targetSlot], next[drag.fromSlot]];
        setSlots(next);
        setJustPlaced(targetSlot);
        setJustSwapped(drag.fromSlot);
        setTimeout(() => {
          setJustPlaced(null);
          setJustSwapped(null);
        }, 300);
      }

      // Clean up
      updateHoverHighlight(null);
      const ghost = ghostRef.current;
      if (ghost) ghost.style.display = "none";
      dragRef.current = null;
      setDraggingSlot(null);
    }

    document.addEventListener("pointermove", onMove, { passive: false });
    document.addEventListener("pointerup", onUp);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
  }, [totalSlots]);

  function startDrag(slotIndex: number, e: React.PointerEvent) {
    if (solved || locked || revealed) return;
    e.preventDefault();

    const line = slots[slotIndex];
    dragRef.current = { line, fromSlot: slotIndex };
    setDraggingSlot(slotIndex);

    const ghost = ghostRef.current;
    if (ghost) {
      ghost.textContent = line;
      ghost.style.display = "block";
      ghost.style.left = `${e.clientX - 60}px`;
      ghost.style.top = `${e.clientY - 24}px`;
      ghost.style.transform = "scale(1.03)";
    }
  }

  // Build the passage: fixed lines are static, movable lines are draggable slots
  const movableSet = new Set(movable_indices);
  let slotCounter = 0;

  return (
    <div className="rearrange-puzzle" ref={containerRef}>
      <div className="rearrange-passage">
        <p className="mechanic-label">Rearrange</p>
        <p className="instruction">
          {solved || revealed
            ? "The argument flows"
            : "Drag to swap the highlighted lines into the right order"}
        </p>
        <div className="puzzle-quote">
        {lines.map((line, lineIndex) => {
          if (movableSet.has(lineIndex)) {
            const slotIdx = slotCounter++;
            const isBeingDragged = draggingSlot === slotIdx;

            return (
              <div
                key={lineIndex}
                ref={(el) => { slotRefs.current[slotIdx] = el; }}
                className={[
                  "rearrange-slot",
                  isBeingDragged ? "rearrange-slot-empty" : "rearrange-slot-filled",
                  wrongSlots.has(slotIdx) ? "rearrange-slot-wrong" : "",
                  correctSlots.has(slotIdx) ? "rearrange-slot-correct" : "",
                  justPlaced === slotIdx || justSwapped === slotIdx ? "rearrange-slot-snap" : "",
                  revealed ? "rearrange-slot-solved" : "",
                  solved ? "rearrange-slot-correct" : "",
                ].join(" ")}
                style={{ touchAction: "none" }}
                onPointerDown={(e) => {
                  if (!isBeingDragged) startDrag(slotIdx, e);
                }}
              >
                {isBeingDragged ? "\u00A0" : slots[slotIdx]}
              </div>
            );
          } else {
            return (
              <div key={lineIndex} className={`rearrange-fixed ${solved || revealed ? "rearrange-fixed-solved" : ""}`}>
                {line}
              </div>
            );
          }
        })}
        </div>
      </div>

      <Attribution source={puzzle.source} showReadLink={solved || revealed} />

      {solved || revealed ? (
        <div className="feedback correct">
          <p className="feedback-message">
            {revealed
              ? "Here's how the passage reads. Worth knowing."
              : "The argument flows. You read like an editor."}
          </p>
          <button className="next-button" onClick={onComplete}>
            Continue
          </button>
        </div>
      ) : (
        <div className="highlight-actions">
          {!locked && (
            <button className="next-button highlight-commit" onClick={handleLockIn}>
              Lock in
            </button>
          )}
          {outOfMistakes && (
            <button className="reveal-button" onClick={handleReveal}>
              Reveal answer
            </button>
          )}
        </div>
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

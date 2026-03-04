import { useState } from "react";
import type { Puzzle } from "../types";
import { FillPuzzle } from "./FillPuzzle";
import { RearrangePuzzle } from "./RearrangePuzzle";

interface Props {
  puzzles: Puzzle[];
}

export function PackView({ puzzles }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  function handlePuzzleComplete() {
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }
  }

  if (completed) {
    return (
      <div className="pack-complete puzzle-enter">
        <h2>Pack complete</h2>
        <p>{puzzles.length} puzzles — nice reading.</p>
        <button
          className="play-again-button"
          onClick={() => {
            setCurrentIndex(0);
            setCompleted(false);
          }}
        >
          Play again
        </button>
      </div>
    );
  }

  const puzzle = puzzles[currentIndex];
  const progressPercent = (currentIndex / puzzles.length) * 100;

  return (
    <div className="pack-view">
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
      <div className="puzzle-enter" key={puzzle.id}>
        {puzzle.mechanic === "fill" && (
          <FillPuzzle puzzle={puzzle} onComplete={handlePuzzleComplete} />
        )}
        {puzzle.mechanic === "rearrange" && (
          <RearrangePuzzle puzzle={puzzle} onComplete={handlePuzzleComplete} />
        )}
      </div>
    </div>
  );
}

import { useRef, useEffect, useState, useCallback } from "react";
import type { Pack } from "../types";
import { getAllCompletions, type PackResult } from "../data/completion";

interface Props {
  packs: Pack[];
  onPlay: (pack: Pack) => void;
}

function formatPackDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

const MAX_MISTAKES = 5;

export function StartScreen({ packs, onPlay }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const allPacks = packs;
  const todayIndex = 0; // First pack is labeled "Today"

  const [activeIndex, setActiveIndex] = useState(todayIndex);
  const [completions, setCompletions] = useState<Record<string, PackResult>>({});

  // Load completions from localStorage
  useEffect(() => {
    setCompletions(getAllCompletions());
  }, []);

  // Find which card is closest to center
  const updateActiveCard = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const centerX = container.scrollLeft + container.offsetWidth / 2;

    let closest = 0;
    let closestDist = Infinity;
    for (let i = 0; i < cardRefs.current.length; i++) {
      const card = cardRefs.current[i];
      if (!card) continue;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - centerX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    }
    setActiveIndex(closest);
  }, []);

  // Scroll to today's card on mount
  useEffect(() => {
    requestAnimationFrame(() => {
      const container = scrollRef.current;
      const card = cardRefs.current[todayIndex];
      if (container && card) {
        const scrollLeft = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: "instant" });
      }
    });
  }, [todayIndex]);

  // Listen for scroll to update active card
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateActiveCard();
          ticking = false;
        });
      }
    }

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [updateActiveCard]);

  const activePack = allPacks[activeIndex];
  const isActiveToday = activeIndex === todayIndex;
  const activeCompletion = completions[activePack.date];

  const handleCardClick = useCallback((index: number) => {
    const container = scrollRef.current;
    const card = cardRefs.current[index];
    if (container && card) {
      const scrollLeft = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="start-screen">
      <div className="start-title-area">
        <div className="start-wordmark">
          {"WORDPLAY".split("").map((letter, i) => (
            <span key={i} className="start-letter">{letter}</span>
          ))}
        </div>
        <p className="start-subtitle">A daily puzzle from Medium</p>
      </div>

      {/* Packs carousel */}
      <div className="packs-carousel" ref={scrollRef}>
        <div className="packs-carousel-track">
          {allPacks.map((p, i) => {
            const isActive = i === activeIndex;
            const isToday = i === todayIndex;
            const result = completions[p.date];
            return (
              <div
                key={p.date}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`pack-card ${isActive ? "pack-card-active" : "pack-card-inactive"} ${result ? "pack-card-done" : ""}`}
                onClick={() => {
                  if (isActive) {
                    onPlay(allPacks[i]);
                  } else {
                    handleCardClick(i);
                  }
                }}
              >
                <span className="pack-card-date">{isToday ? "Today" : formatPackDate(p.date)}</span>
                <span className="pack-card-title">{p.title}</span>
                <span className="pack-card-editor">{p.editor}</span>
                {result ? (
                  <span className="pack-card-result">
                    <span className="pack-card-dots">
                      {Array.from({ length: MAX_MISTAKES }).map((_, j) => (
                        <span
                          key={j}
                          className={`pack-card-dot ${j < MAX_MISTAKES - result.mistakes ? "pack-card-dot-full" : "pack-card-dot-empty"}`}
                        />
                      ))}
                    </span>
                    {result.flawless && <span className="pack-card-flawless">Flawless</span>}
                  </span>
                ) : (
                  <span className="pack-card-count">{p.puzzles.length} puzzles</span>
                )}
                {isToday && <span className="pack-card-badge">Today</span>}
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="start-play-button"
        onClick={() => onPlay(allPacks[activeIndex])}
      >
        {activeCompletion
          ? (isActiveToday ? "Play again" : `Replay ${activePack.title}`)
          : (isActiveToday ? "Play" : `Play ${activePack.title}`)}
      </button>

      <button className="start-submit-button">
        Submit a pack
      </button>
    </div>
  );
}

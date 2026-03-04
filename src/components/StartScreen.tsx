import { useRef, useEffect, useState, useCallback } from "react";
import type { Pack } from "../types";
import type { PackSummary } from "../data/puzzles";

interface Props {
  pack: Pack;
  archive: PackSummary[];
  onPlay: () => void;
}

function formatPackDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function StartScreen({ pack, archive, onPlay }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Build the full list: archive + today
  const todaySummary: PackSummary = {
    title: pack.title,
    editor: pack.editor,
    date: pack.date,
    puzzleCount: pack.puzzles.length,
  };

  const allPacks = [...archive, todaySummary];
  const todayIndex = allPacks.length - 1;

  const [activeIndex, setActiveIndex] = useState(todayIndex);

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
            return (
              <div
                key={p.date}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`pack-card ${isActive ? "pack-card-active" : "pack-card-inactive"}`}
                onClick={() => {
                  if (isActive && isToday) {
                    onPlay();
                  } else if (!isActive) {
                    handleCardClick(i);
                  }
                }}
              >
                <span className="pack-card-date">{formatPackDate(p.date)}</span>
                <span className="pack-card-title">{p.title}</span>
                <span className="pack-card-editor">{p.editor}</span>
                <span className="pack-card-count">{p.puzzleCount} puzzles</span>
                {isToday && <span className="pack-card-badge">Today</span>}
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="start-play-button"
        onClick={onPlay}
        disabled={!isActiveToday}
      >
        {isActiveToday ? "Play" : formatPackDate(activePack.date)}
      </button>

      <button className="start-submit-button">
        Submit a pack
      </button>
    </div>
  );
}

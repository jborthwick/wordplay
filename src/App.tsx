import { useState, useEffect, useCallback } from "react";
import type { Pack } from "./types";
import { PackView } from "./components/PackView";
import { StartScreen } from "./components/StartScreen";
import { dailyPack, packArchive } from "./data/puzzles";

export default function App() {
  const [activePack, setActivePack] = useState<Pack | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    function apply() {
      document.documentElement.setAttribute("data-theme", mq.matches ? "dark" : "light");
    }
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const handleTransition = useCallback((next: () => void) => {
    setTransitioning(true);
    setTimeout(() => {
      next();
      setTransitioning(false);
    }, 300);
  }, []);

  return (
    <div className={`app ${!activePack ? "app-start" : ""}`}>
      <div className={`screen-transition ${transitioning ? "screen-fade-out" : "screen-fade-in"}`}>
        {activePack ? (
          <PackView pack={activePack} onRestart={() => handleTransition(() => setActivePack(null))} />
        ) : (
          <StartScreen
            pack={dailyPack}
            archive={packArchive}
            onPlay={(pack: Pack) => handleTransition(() => setActivePack(pack))}
          />
        )}
      </div>
    </div>
  );
}

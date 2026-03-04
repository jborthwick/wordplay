import { useState, useEffect, useCallback } from "react";
import { PackView } from "./components/PackView";
import { StartScreen } from "./components/StartScreen";
import { dailyPack, packArchive } from "./data/puzzles";

export default function App() {
  const [started, setStarted] = useState(false);
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
    <div className={`app ${!started ? "app-start" : ""}`}>
      <div className={`screen-transition ${transitioning ? "screen-fade-out" : "screen-fade-in"}`}>
        {started ? (
          <PackView pack={dailyPack} onRestart={() => handleTransition(() => setStarted(false))} />
        ) : (
          <StartScreen pack={dailyPack} archive={packArchive} onPlay={() => handleTransition(() => setStarted(true))} />
        )}
      </div>
    </div>
  );
}

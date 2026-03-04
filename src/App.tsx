import { PackView } from "./components/PackView";
import { dailyPack } from "./data/puzzles";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Wordplay</h1>
      </header>
      <main>
        <PackView puzzles={dailyPack} />
      </main>
    </div>
  );
}

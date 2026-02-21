import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [screen, setScreen] = useState("landing");
  const [scores, setScores] = useState([]);

  // Load scores from localStorage on first render
  useEffect(() => {
    const savedScores = localStorage.getItem("mahjong-scores");
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  // Save scores whenever they change
  useEffect(() => {
    localStorage.setItem(
      "mahjong-scores",
      JSON.stringify(scores)
    );
  }, [scores]);

  return (
    <div>
      {screen === "landing" && (
        <Landing
          onStart={() => setScreen("game")}
          onLeaderboard={() => setScreen("leaderboard")}
        />
      )}
      {screen === "game" && (
        <Game
          onHome={() => setScreen("landing")}
          onGameOver={(finalScore) => {
            setScores((prev) => [...prev, finalScore]);
            setScreen("landing");
          }}
        />
      )}
      {screen === "leaderboard" && (
        <Leaderboard
          scores={scores}
          onBack={() => setScreen("landing")}
        />
      )}
    </div>
  );
}

export default App;
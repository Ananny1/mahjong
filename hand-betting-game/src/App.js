import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [screen, setScreen] = useState("landing");
  const [scores, setScores] = useState(() => {
    // Initialize from localStorage immediately
    const savedScores = localStorage.getItem("mahjong-scores");
    return savedScores ? JSON.parse(savedScores) : [];
  });

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
            console.log("Saving score:", finalScore);

            setScores((prev) => {
              const updated = [...prev, finalScore];
              console.log("Updated scores:", updated);
              return updated;
            });

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
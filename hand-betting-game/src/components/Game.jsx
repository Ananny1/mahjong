import { useState } from "react";
import { createInitialGameState, processBet } from "../game/engine";
import Tile from "./Tile";
import GameOver from "./GameOver";
// import History from "./History";


export default function Game({ onHome, onGameOver }) {
    const [gameState, setGameState] = useState(
        createInitialGameState()
    );

    const [gameOverInfo, setGameOverInfo] = useState(null);

    function handleBet(direction) {
        const result = processBet(gameState, direction);

        if (result.gameOver) {
            onGameOver(gameState.score);
            setGameOverInfo(result);
            return;
        }

        setGameState(result.state);
    }

    //If game over → show GameOver screen
    if (gameOverInfo) {
        return (
            <GameOver
                score={gameState.score}
                reason={gameOverInfo.reason}
                onRestart={() => {
                    setGameState(createInitialGameState());
                    setGameOverInfo(null);
                }}

                onHome={() => onGameOver(gameState.score)}
            />
        );
    }


    const { hand, score, combo, drawPile, discardPile } = gameState;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-900 text-white p-6">

            <h1 className="text-3xl font-bold">
                Mahjong Hand Betting
            </h1>

            {/* 🀄 Current Hand */}
            <div className="flex gap-4">
                {hand.map((tile, index) => (
                    <Tile key={index} tile={tile} />
                ))}
            </div>

            {/* 📊 Game Stats */}
            <div className="flex gap-6 text-lg">
                <span>Score: {score}</span>
                <span>Combo: {combo}</span>
            </div>

            {/* 🗂 Deck Info */}
            <div className="flex gap-6 text-sm text-gray-400">
                <span>Draw Pile: {drawPile.length}</span>
                <span>Discard Pile: {discardPile.length}</span>
            </div>

           {/* {gameState.history.length === 0 && (<>
           <div>
            no bets yet
           </div>
           </>)} */}



            {/* Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={() => handleBet("higher")}
                    className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
                >
                    Bet Higher
                </button>

                <button
                    onClick={() => handleBet("lower")}
                    className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                    Bet Lower
                </button>
            </div>

            {/* Exit Button */}
            <button
                onClick={onHome}
                className="mt-6 text-sm text-gray-400 hover:text-white"
            >
                Exit to Home
            </button>
        </div>
    );
}
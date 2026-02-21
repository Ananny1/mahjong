export default function Landing({ onStart, onLeaderboard }) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl mb-4">🀄</div>

      <h1 className="text-4xl font-bold text-white mb-1">
        Hand Bet
      </h1>

      <p className="text-gray-500 text-sm mb-8">
        Mahjong Higher or Lower
      </p>

      <div className="flex flex-col gap-4">
        <button
          onClick={onStart}
          className="bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold px-8 py-3 rounded-lg transition"
        >
          New Game
        </button>

        <button
          onClick={onLeaderboard}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg transition"
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
}
export default function GameOver({ score, reason, onRestart, onHome }) {

  
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-center gap-6">

      <p className="text-gray-500 text-sm tracking-widest uppercase">
        Game Over
      </p>

      <h1 className="text-8xl font-bold text-yellow-400">
        {score}
      </h1>

      <p className="text-gray-400 text-sm max-w-sm">
        {reason}
      </p>

      <div className="flex gap-4 mt-4">
        <button
          onClick={onRestart}
          className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Play Again
        </button>

        <button
          onClick={onHome}
          className="border border-gray-700 text-gray-400 hover:text-white px-6 py-3 rounded-lg transition-colors"
        >
          Home
        </button>
      </div>

    </div>
  );
}

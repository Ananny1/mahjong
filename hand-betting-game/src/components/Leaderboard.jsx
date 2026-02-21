export default function Leaderboard({ scores = [], onBack }) {
  const topFive = [...scores]
    .sort((a, b) => b - a)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Leaderboard
      </h1>

      {topFive.length === 0 ? (
        <p className="text-gray-400">
          No scores yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {topFive.map((score, index) => (
            <li
              key={index}
              className="bg-gray-800 p-4 rounded-lg flex justify-between"
            >
              <span>#{index + 1}</span>
              <span>{score}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onBack}
        className="mt-6 px-4 py-2 bg-blue-600 rounded-lg"
      >
        Back
      </button>
    </div>
  );
}
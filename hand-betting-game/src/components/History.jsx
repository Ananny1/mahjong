import Tile from "./Tile";

export default function History({ history }) {

  return (
    <div className="w-full mt-8">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-300">
        Round History
      </h2>

      <div className="flex gap-3 overflow-x-auto pb-4 px-4 scrollbar-hide">
        {history.map((entry, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 hover:border-gray-500 transition"
          >
            <div className="flex gap-1.5 mb-3">
              {entry.tiles.map((tile, i) => (
                <Tile key={i} tile={tile} small />
              ))}
            </div>

            <div className="text-xs text-gray-400 mb-2">
              Total: <span className="font-bold text-white">{entry.total}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Result:</span>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  entry.result === "win"
                    ? "bg-green-900 text-green-300"
                    : entry.result === "lose"
                    ? "bg-red-900 text-red-300"
                    : "bg-yellow-900 text-yellow-300"
                }`}
              >
                {entry.result.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
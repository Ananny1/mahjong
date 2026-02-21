import Tile from "./Tile";

export default function History({ history }) {

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">
        History
      </h2>

      <div className="space-y-4">
        {history.map((entry, index) => (
          <div
            key={index}
            className="bg-gray-800 p-3 rounded-lg"
          >
            <div className="flex gap-2 mb-2">
              {entry.tiles.map((tile, i) => (
                <Tile key={i} tile={tile} small />
              ))}
            </div>

            <div className="text-sm">
              Total: {entry.total} | Result:{" "}
              <span
                className={
                  entry.result === "win"
                    ? "text-green-400"
                    : entry.result === "lose"
                    ? "text-red-400"
                    : "text-yellow-400"
                }
              >
                {entry.result}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
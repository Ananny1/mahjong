export default function Tile({ tile, small = false }) {
  const baseStyle =
    "border rounded-xl flex items-center justify-center font-bold shadow";

  const sizeStyle = small
    ? "w-10 h-14 text-sm"
    : "w-16 h-20 text-lg";

  const colorStyle =
    tile.kind === "number"
      ? "bg-white text-black"
      : "bg-red-500 text-white";

  return (
    <div className={`${baseStyle} ${sizeStyle} ${colorStyle}`}>
      {tile.kind === "number"
        ? `${tile.value} ${tile.suit}`
        : tile.name}
    </div>
  );
}
// tiles[0] = { kind: "number", value: 3 }

export function tileKey(tile) {
    if (tile.kind === "number") {
        return null
    } else {
        return tile.kind === "wind" ? `wind_${tile.name}` : `dragon_${tile.name}`
    }
}

export function tileValue(tile, dynamicValues) {
    if (tile.kind === "number") {
        return tile.value
    }
    const key = tileKey(tile)
    return dynamicValues[key] ?? 5
}

export function handTotal(tiles, dynamicValues) {
    let total = 0
    for (let i = 0; i < tiles.length; i++) {
        total += tileValue(tiles[i], dynamicValues)
    }
    return total

}
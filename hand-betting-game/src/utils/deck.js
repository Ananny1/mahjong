export const SUITS = ["man", "pin", "bam"];
export const WINDS = ["East", "South", "West", "North"];
export const DRAGONS = ["Red", "Green", "White"];

export const WIND_GLYPHS = ["🀀", "🀁", "🀂", "🀃"];
export const DRAGON_GLYPHS = ["🀄", "🀅", "🀆"];
export const MAN_GLYPHS = ["🀇", "🀈", "🀉", "🀊", "🀋", "🀌", "🀍", "🀎", "🀏"];
export const PIN_GLYPHS = ["🀙", "🀚", "🀛", "🀜", "🀝", "🀞", "🀟", "🀠", "🀡"];
export const BAM_GLYPHS = ["🀐", "🀑", "🀒", "🀓", "🀔", "🀕", "🀖", "🀗", "🀘"];

export function buildDeck() {
    const tiles = [];
    let id = 0;

    for (const suit of SUITS) {
        const glyphs = suit === "man" ? MAN_GLYPHS : suit === "pin" ? PIN_GLYPHS : BAM_GLYPHS;
        for (let v = 1; v <= 9; v++) {
            for (let c = 0; c < 4; c++) {
                tiles.push({
                    id: id++,
                    kind: "number",
                    suit,
                    value: v,
                    glyph: glyphs[v - 1]
                });
            }
        }
    }

    for (let i = 0; i < WINDS.length; i++) {
        for (let c = 0; c < 4; c++) {
            tiles.push({
                id: id++,
                kind: "wind",
                name: WINDS[i],
                glyph: WIND_GLYPHS[i]
            });
        }
    }

    for (let i = 0; i < DRAGONS.length; i++) {
        for (let c = 0; c < 4; c++) {
            tiles.push({
                id: id++,
                kind: "dragon",
                name: DRAGONS[i],
                glyph: DRAGON_GLYPHS[i]
            });
        }
    }

    return tiles;
}

export function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

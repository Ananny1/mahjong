import { buildDeck, shuffle } from "../utils/deck";
import { HAND_SIZE, MAX_REFILLS } from "./config";
import { handTotal, tileKey } from "../utils/scoring";
import { POINTS } from "./config";


export function createInitialGameState() {
    const deck = buildDeck();
    const shuffled = shuffle(deck);

    const hand = shuffled.slice(0, HAND_SIZE);
    const drawPile = shuffled.slice(HAND_SIZE);

    return {
        hand,
        drawPile,
        discardPile: [],
        dynamicValues: {},
        score: 0,
        combo: 0,
        history: [],
        refills: 0,
    };
}

export function processBet(state, direction) {
    const refillResult = handleRefill(state);
    if (refillResult.gameOver) return refillResult;

    const stateAfterRefill = refillResult.state;

    const result = resolveBet(stateAfterRefill, direction);
    if (result.gameOver) return result;

    return {
        gameOver: false,
        state: result.state,
    };
}

function handleRefill(state) {
    // Refill ONLY when draw pile is completely empty
    if (state.drawPile.length > 0) {
        return { gameOver: false, state };
    }

    // Game over if max refills reached
    if (state.refills >= MAX_REFILLS) {
        return {
            gameOver: true,
            reason: "Maximum refills reached.",
        };
    }

    // requirement: Add a fresh deck
    const freshDeck = buildDeck();

    // Combine fresh deck with discard pile
    const combined = shuffle([
        ...freshDeck,
        ...state.discardPile,
    ]);

    return {
        gameOver: false,
        state: {
            ...state,
            drawPile: combined,
            discardPile: [],
            refills: state.refills + 1,
        },
    };
}

function resolveBet(state, direction) {

    // const snapshot = JSON.parse(JSON.stringify(state))

    const {
        hand,
        drawPile,
        discardPile,
        dynamicValues,
        score,
        combo,
        history,
        refills,
    } = state;

    const currentTotal = handTotal(hand, dynamicValues);

    const nextHand = drawPile.slice(0, HAND_SIZE);
    const newDrawPile = drawPile.slice(HAND_SIZE);
    const nextTotal = handTotal(nextHand, dynamicValues);

    const didWin =
        (direction === "higher" && nextTotal > currentTotal) ||
        (direction === "lower" && nextTotal < currentTotal);

    const newCombo = didWin ? combo + 1 : 0;

    const points = didWin ? newCombo * POINTS.baseWin : 0;

    const newScore = score + points;

    const scalingResult = applyDynamicScaling(
        hand,
        dynamicValues,
        didWin
    );

    if (scalingResult.gameOver) return scalingResult;

    const newHistory = [
        ...history,
        {
            tiles: hand,
            total: currentTotal,
            result: didWin ? "win" : "lose",
        },
    ];


        return {
            gameOver: false,
            state: {
                hand: nextHand,
                drawPile: newDrawPile,
                discardPile: [...discardPile, ...hand],
                dynamicValues: scalingResult.dynamicValues,
                score: newScore,
                combo: newCombo,
                history: newHistory,
                refills,
                // prevState: [...state.prevState, snapshot]
            },
        };
}


function applyDynamicScaling(hand, dynamicValues, didWin) {
    const newDynamicValues = { ...dynamicValues };

    for (const tile of hand) {
        if (tile.kind === "number") continue;

        const key = tileKey(tile);
        const currentValue =
            newDynamicValues[key] ?? 5;

        const newValue = didWin
            ? currentValue + 1
            : currentValue - 1;

        newDynamicValues[key] = newValue;

        if (newValue === 0 || newValue === 10) {
            return {
                gameOver: true,
                reason: `The ${tile.name} tile reached ${newValue}.`,
            };
        }
    }

    return {
        gameOver: false,
        dynamicValues: newDynamicValues,
    };
}

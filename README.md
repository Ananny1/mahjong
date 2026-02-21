# 🀄 Hand Betting Game

A web-based Mahjong-inspired **Higher or Lower** betting game built with React. This project focuses on scalable architecture, clean state management, and future-ready extensibility.

# Video link explain Hand Betting Game

https://drive.google.com/drive/folders/1N9UMzJ9sdHwN9mv1bo73Us10KtoBNUJX?usp=drive_link

---

## 📌 Overview

In this game, the player bets whether the next Mahjong hand will have a **higher** or **lower** total value compared to the current hand. The project was built with scalability in mind and structured to allow easy feature extensions during technical interviews.

---

## 🧠 Architecture Philosophy

The project separates responsibilities clearly:
```
UI (React Components)
        ↓
Game Engine (Pure Logic)
        ↓
Utilities (Deck + Scoring)
```

### Why this structure?

- UI handles rendering only.
- Engine handles game rules.
- Utilities handle reusable logic.
- No UI logic inside engine.
- No game logic inside components.

This makes the system easy to extend, debug, and test.

---

## 🗂 Project Structure
```
src/
│
├── components/
│   ├── Game.jsx
│   ├── GameOver.jsx
│   ├── History.jsx
│   ├── Landing.jsx
│   ├── Leaderboard.jsx
│   └── Tile.jsx
│
├── game/
│   ├── config.js
│   └── engine.js
│
├── utils/
│   ├── deck.js
│   └── scoring.js
│
└── App.js
```

---

## 🎮 Core Game Mechanics

### 🀄 Tile Types

- **Number Tiles** → Value equals face value.
- **Dragons & Winds** → Start at base value of `5`.

---

### 📈 Dynamic Scaling

For non-number tiles:

- If part of a **winning hand** → value increases by `+1`
- If part of a **losing hand** → value decreases by `-1`

Game ends if any tile value reaches:

- `0`
- `10`

---

### 🗂 Deck Management

- The Draw Pile and Discard Pile counts are displayed.
- When the Draw Pile becomes empty:
  - A fresh deck is generated.
  - It is combined with the Discard Pile.
  - The combined deck is shuffled.
  - This counts as one refill.
- Game ends after the **3rd refill**.

---

### 🏁 Game Over Conditions

The game ends when:

1. Any tile reaches value `0` or `10`.
2. The Draw Pile runs out for the third time.

---

## 🏆 Leaderboard

- Stores scores in `localStorage`.
- Displays top 5 highest scores.
- Automatically updates after each completed game.

---

## 🔄 Scalability Considerations

The engine is written using pure functions:

- `createInitialGameState()`
- `processBet(state, direction)`
- `handleRefill(state)`
- `resolveBet(state, direction)`
- `applyDynamicScaling(hand, dynamicValues, didWin)`

This allows:

- Easy feature additions
- Clear separation of logic
- Safe state mutation patterns
- Simple unit testing

---

## 💅 UI & Styling

- Built using **React**
- Styled using **TailwindCSS**
- Designed for clarity and smooth UX transitions

---

## 🚀 Setup Instructions
```bash
npm install
npm start
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 🤖 AI Usage Disclosure

AI was used for:

- Architectural brainstorming
- Logic validation discussions
- Refactoring guidance
- UI styling and TailwindCSS class generation

All final implementation and structure decisions were manually reviewed and adjusted.

---

## 📹 Submission Requirements

- Public GitHub repository
- README (this file)
- Short video walkthrough
- Submitted within 4 days

---

## 👨‍💻 Author

Mahjong Hand Betting Game — Technical Assessment Submission
# XO 3D Arena

<img src="assets/xo-logo.png" alt="XO 3D Arena identity" width="160">

A bilingual tic-tac-toe game by **Huzaifa Alahmad**, developed from his original browser-game source. A dimensional board, clear controls and quick local play. Vanilla HTML, CSS and JavaScript, with no framework or build step.

## Features

- Arabic / English, including right-to-left layout.
- Two players on one device or a computer opponent: easy, medium and hard.
- Hard mode uses minimax. Tests exhaustively explore 681 human continuations without a computer loss.
- Light and dark themes; validated scores saved locally in the browser, with a reset control.
- Responsive 3D board, keyboard focus, live turn announcements, accessible result dialog and reduced-motion support.
- Original blue / amber XO identity, locally hosted Cairo and Manrope fonts.

## Run locally

Open `index.html`, or serve this folder using a static server. With Python installed:

```sh
python -m http.server 8080
```

Then open http://localhost:8080. No installation or environment variables are required. The portfolio link returns to https://eng-huzaifa-portfolio.vercel.app/.

## Verify

With Node.js 18 or later installed:

```sh
npm test
```

Tests cover the hard opponent, legal moves, cancellation of delayed moves on restart and persistent scores. Browser review covers a human win, a new round, language/theme controls and mobile layout. No remote multiplayer, accounts or online leaderboard is implemented. Scores stay on the device; there is no server or analytics collection.

## Files

`index.html` contains the interface, `style.css` the layout and motion, and `script.js` the game logic. `tests/game.test.cjs` runs without dependencies. `assets/` contains the original XO logo and fonts. The insecure login mock-up from an older prototype is excluded.

## Attribution and rights

Project author: Huzaifa Alahmad. The XO logo was created with AI assistance for this project. No open-source license has been selected for the game code or identity. Cairo and Manrope are distributed under the SIL Open Font License; their original license notices are included in `assets/fonts/`.

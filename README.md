# xp-ar

Talk to your agent in AR. The agent lives in a PlayStation 1 living room and talks like a paperclip.

Open-source, fun, early sketch. Not a Handmade feature.

## Open locally

This is a static page. No build step. No public host in this repo.

From the repo root:

```bash
npx serve .
```

Then open the URL `serve` prints (usually `http://localhost:3000`).

Or open `index.html` directly in a browser. Chrome/Edge can load the Three.js import map from the network. If the canvas stays blank on `file://`, use `npx serve .` instead.

You need a network connection the first time so the browser can fetch Three.js from unpkg.

## The prototype

You are in a low-poly living room. **Pips** (original PS1-era mascot — not Crash, not Rover) is standing on the rug. Type in the yellow Office-assistant balloon and press Enter. The balloon text is the reply. Lines are canned, slightly manic, plus an echo of what you typed. No API.

- Drag to look (one finger on a phone)
- Scroll to zoom
- WASD to walk
- `prefers-reduced-motion` keeps the room and turns off the PS1 wobble

Design notes: [DESIGN.md](DESIGN.md).

## Not now

- Headset AR
- A live model backend
- GitHub Pages, Vercel, or any public deploy from this PR
- Handmade / Directcopy work

## License

MIT

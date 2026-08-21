# xp-ar

Talk to your agent in AR. The agent lives in a Windows XP / PlayStation 1 3D world.

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

You are in the Bliss yard. Rover (the XP search dog) is standing there. Type in the **Agent** window and press Enter. Rover answers in a second XP window in the grass. Replies are canned 2001-help-mascot lines plus an echo of what you typed. No API.

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

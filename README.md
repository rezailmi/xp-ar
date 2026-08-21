# xp-ar

An AR toy where the agent is in the house with you. Sketch, not a product.

Read [WHY.md](WHY.md) first. Then [DESIGN.md](DESIGN.md).

## Open locally

Static page. No build. No public host in this repo.

```bash
npx serve .
```

Then open the URL `serve` prints. Or open `index.html` (use `npx serve` if `file://` blanks the canvas). Needs a network hop the first time for Three.js on unpkg.

## The sketch

You are in a tight apartment you cannot leave. Night indigo, sunset through sliding glass, a CRT in the corner, **Pips** on the futon. Type in the paper balloon. The reply replaces the copy. Lines are canned. No API.

On screen: **Sketch. Decisions still open.** so the pixels do not fake alignment.

- Drag to look (one finger on a phone)
- Scroll to zoom
- WASD to walk
- `prefers-reduced-motion` keeps the room and kills the wobble

## Not now

- Headset AR
- A live model backend
- GitHub Pages, Vercel, or any public deploy from this PR
- Handmade / Directcopy work

## License

MIT

# Design plan — from WHY.md

Written after the why, before this rebuild. Follows the frontend-design skill. The why wins if this file and the pixels disagree.

## Subject

A living room you could stand in. **Pips** appeared on the rug — an original PS1 mascot (orange/tan, sneakers, gauntlets, wild eyes). House guest, not a desktop icon.

## Audience

Reza. Thirty seconds. Click through. Leave.

## Job

Feel *this character appeared in my living room*, then talk.

## Aesthetic risk

The room is **small and furnished like a house**, not a game level. The only chrome is a paper balloon and a tiny honest caption: **Sketch. Decisions still open.** If it looks shipped, it failed the why.

## Palette

Domestic tokens. No mauve, no Inter purple, no AI-beige.

| Token | Hex | Role |
| --- | --- | --- |
| wallpaper | `#C4A882` | Walls |
| trim | `#6B4A2A` | Wood, frames |
| rug | `#7A2E2E` | Where Pips stands |
| sofa | `#3A4A6B` | The couch you would sit on |
| balloon | `#FFF4A3` | Paper talk |
| ink | `#111111` | Type and edges |

Supporting, not new hues: CRT beige `#D8D0B8`, balloon edge `#4A3B12`, fur `#C86A2A`, gauntlet `#E8D8B0`, sneaker `#2F6F62`.

## Type

- **Talk / hint:** Tahoma, `"MS Sans Serif"`, system-ui. 11px body. 11px bold name.
- **Sketch note:** same face, 10px. Not a banner.
- **Never:** Inter, Geist, a display serif, a purple CTA, a title bar.

Tahoma is the only face. It is used like office paper, not like a brand.

## Layout

Tighter than a level: ~4.6m across, ceiling you could touch. Camera starts *in* the room, looking at Pips on the rug. Sofa close behind. Lamp and CRT in reach. One balloon, tail on the skull.

```
+--------------------------------------+
| wallpaper     [lamp] sofa [CRT]      |
|               [table]                |
|      +------------------+            |
|      | (copy)           |            |
|      | [______] [Send]  |            |
|      +----\             |            |
|            \ [PIPS]                  |
|              rug                     |
+--------------------------------------+
  Sketch. Decisions still open.     (tiny)
```

No sidebar. No second balloon. No Luna. No WASD billboard that looks like an app chrome — controls stay one Tahoma line, or go unsaid next to the sketch note.

## Signature

A **paper Office balloon taped to a house-scale living room**, with PS1 snap + wobble + nearest-neighbor texels. The sketch caption is not decoration; it is the Emil fix.

## Motion

- Pips: spin-ready idle. Bounce, arms out, a twitch toward a spin.
- Wobble on room and body. Not on the paper.
- Send insets. No bounce-in.
- `prefers-reduced-motion` keeps the room; kills wobble and idle.

## Copy

House guest who thinks he is a helpful paperclip. Eager, slightly officious, a little broken. Echo what was typed. No “unlock.” No homework bit unless the house earns it.

## Critique (before build)

A generic 3D chat demo would be a large empty stage, a mascot, and a polished HUD. The last pass drifted that way: 7-meter walls, furniture in the corners, a yellow control bar that read like product chrome. This plan shrinks the room to domestic reach and puts the unfinished-ness on screen. The balloon stays the one bold thing.

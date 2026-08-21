# Design plan — living room, Pips, Clippy balloon

Written before this pass of code. Follows the frontend-design skill. Revises the Bliss-yard / Rover / Luna plan.

## Subject

A toy AR living room. The agent appeared on the rug. He is **Pips**: an original PlayStation-era mascot (biped, sneakers, gauntlets, wild eyes). Crash energy, not Crash. Not Rover.

## Audience

Reza. A five-minute click-through. No headset, no account, no backend.

## Job

Feel like you walked into the house and a late-90s help mascot is already standing on the carpet, talking like a paperclip who learned to spin.

## Aesthetic risk

The **Office Assistant balloon is the only talk surface**, hung in the room with a paper tail aimed at Pips’s head. Yellow comic paper against chunky PS1 furniture. No Luna chrome. The OS is a speech bubble, not a window.

## Palette

Locked domestic tokens. No mauve, no Inter-era purple, no AI-beige.

| Token | Hex | Role |
| --- | --- | --- |
| wallpaper | `#C4A882` | Walls |
| trim | `#6B4A2A` | Baseboard, frames, table |
| rug | `#7A2E2E` | The place Pips stands |
| sofa | `#3A4A6B` | Backdrop couch |
| crt-beige | `#D8D0B8` | TV plastic, lamp, sneakers’ gum |
| balloon | `#FFF4A3` | Paper talk surface |
| ink | `#111111` | Type and balloon edge |

Supporting (not new hues): balloon stroke `#4A3B12`, Pips fur `#C86A2A`, gauntlet cream `#E8D8B0`, sneaker `#2F6F62`.

## Type

- **Chrome / UI:** Tahoma, `"MS Sans Serif"`, system-ui. 11px balloon body, 11px bold name.
- **Never:** Inter, Geist, a display serif, a purple CTA, Luna title bars.

## Layout

Full-viewport WebGL. One billboarded balloon in the room, tail on the character.

```
+--------------------------------------------------+
| wallpaper                  [lamp]   [CRT]        |
|              [sofa]                              |
|           [coffee table]                         |
|                                                  |
|        +-------------------------+               |
|        | Pips                    |  <- paper     |
|        | you typed: …            |     balloon   |
|        | [______________] [Send] |               |
|        +---------\               |               |
|                   \  [PIPS]                      |
|                    rug                           |
+--------------------------------------------------+
  Tahoma hint, bottom-left: Drag to look · Scroll · WASD
```

No sidebar. No XP window. No iMessage pills.

## Signature

A **Clippy comic balloon** (paper yellow, 2px brown edge, pointed tail on the skull) living in a **low-poly living room**, with PS1 vertex snap + wobble + nearest-neighbor texels on the furniture and on Pips.

## Motion

- Pips: spin-ready idle — bounce, arms out, a twitch toward a spin.
- PS1 wobble on room meshes and Pips (not the paper balloon).
- Send insets on press. No bounce-in. No page-load ballet.
- `prefers-reduced-motion: reduce` keeps the room and balloon; kills wobble and the idle.

## Copy

Slightly officious, eager, a little broken. A PS1 mascot who thinks he is a helpful paperclip. Echoes what you typed. Never “unlock,” “companion,” Crash, or Rover.

## Critique (before build)

The last plan’s risk was a Luna window in a Bliss yard. That read as XP desktop tourism. This pass moves the joke indoors: domestic set, original mascot, Office-assistant paper. A generic 3D chat demo would put pills in a drawer. The balloon on the rug is the one thing to keep; cut anything that looks like a title bar.

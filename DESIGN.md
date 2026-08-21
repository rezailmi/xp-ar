# Design plan — XP / PS1 AR room

Written before code. Follows the frontend-design skill: subject, audience, job, palette, type, layout, one signature. Then a pass against generic defaults.

## Subject

A toy AR yard. Your companion is **Rover**, the Windows XP Search Companion — a late-90s 3D help dog standing on the Bliss hill.

## Audience

Reza. A five-minute click-through. No headset, no account, no backend.

## Job

Feel like you walked into 2001 and the agent is already standing there.

## Aesthetic risk

A real, typeable **Luna window lives in the yard** (CSS 3D), not as a HUD and not as a painted texture. Crisp XP chrome sits next to snapped, affine-warped PS1 geometry. The OS is furniture. That fight is the joke.

## Palette

Named tokens only. No mauve, no Inter-era purple, no AI-beige.

| Token | Hex | Role |
| --- | --- | --- |
| bliss-grass | `#3B7A2A` | Hill and yard |
| bliss-sun | `#6B9B3A` | Lit grass, crate moss |
| bliss-sky | `#7EC8E3` | Zenith |
| xp-teal | `#3A6EA5` | Collar, window rim, desktop memory |
| luna-navy | `#0A246A` | Title-bar start |
| chrome-face | `#ECE9D8` | Window client area |
| ink | `#111111` | Type |

Supporting (not new hues): sky falloff `#C5E4F3`, Luna title end `#A6CAF0`, button face `#D4D0C8`.

## Type

- **Chrome / UI:** Tahoma, `"MS Sans Serif"`, system-ui. 11px body, 11px bold title.
- **Never:** Inter, Geist, Roboto, a display serif, a purple CTA.

Tahoma *is* the display face. It is used with restraint: window chrome and a one-line look hint. No hero headline. No marketing lockup.

## Layout

Full-viewport WebGL. Talk and reply are objects in the room, billboarded so they stay readable.

```
+--------------------------------------------------+
| \\\\\\\\\\\\\\\\\ Bliss sky /////////////////// |
|                                                |
|      (far hill)              [CRT on crate]    |
|                                                |
|              [Rover]   +----------------+      |
|                        | Rover          |      |
|                        | you typed: …   |      |
|                        +----------------+      |
|   +----------------------+                     |
|   | Agent           _ □ X|                     |
|   | [____________] [Send]|                     |
|   +----------------------+                     |
| ~~~~~~~~~~~~~~~~ grass yard ~~~~~~~~~~~~~~~~~~~ |
+--------------------------------------------------+
  Tahoma hint, bottom-left: Drag to look · Scroll · WASD
```

No sidebar. No card stack. No icon row.

## Signature

Sincere PlayStation 1 **vertex snap + wobble + affine-ish UVs**, nearest-neighbor 64–128px textures, and the Luna **Agent** window floating in the grass as the only talk surface.

## Motion

- Rover idle bob and tail wag.
- PS1 wobble on world meshes (not the sky, not the XP chrome).
- Buttons inset on press. No bounce-in. No page-load choreography.
- `prefers-reduced-motion: reduce` keeps the room and windows; kills wobble and bob.

## Copy

2001 help-mascot register. Short. Specific. Echoes what you typed. Never “unlock,” “delight,” “next-gen,” or “your AI companion.”

## Critique (before build)

A generic “3D AI demo” would be dark glass, a purple Send, Inter, a chat drawer, and a feature row. This plan is the opposite on every axis: Bliss greens, Tahoma, in-world Luna, one dog, canned lines. The risk is the CSS3D window in the grass — keep that, cut everything else that does not serve 2001.

# Design plan — from WHY.md + Research pack

Privilege: **room, then body, then balloon.** If the room reads as a level, the sketch failed. WHY.md still wins on job and open questions.

## Subject

A living room a body lives in. **Pips** is already using the sofa and the rug. Original PS1 mascot. House guest, not a pet, not Crash.

## Audience / job

Reza, thirty seconds. Feel *someone appeared in my living room*. Then talk.

## Steal

| From | Take |
| --- | --- |
| [EyePet](https://en.wikipedia.org/wiki/EyePet) | Creature on *your* rug, scaled against real furniture. |
| [Nintendogs](https://en.wikipedia.org/wiki/Nintendogs) | A body that can sit or lean on the sofa. Not a dog. No meters. |
| [Tomodachi](https://en.wikipedia.org/wiki/Tomodachi_Life) | One tight apartment. Camera cannot leave. |
| Bob / domestic toys | Sofa, lamp, rug, CRT at arm’s reach. |
| Crash *construction* (not likeness) | Large head, no neck, short limbs, gauntlets + sneakers as side color blocks, low-poly snap, orange/tan that holds on a CRT. |
| Ape Escape Spike *energy* | Busy hands when still. Not the hair, not the net. |
| Spyro *energy* | Small on the floor. Not purple, horns, or wings. |
| Clippit / [Microsoft Agent](https://en.wikipedia.org/wiki/Microsoft_Agent) | One yellow paper letter. 1px brown edge. Triangular tail on the skull. Tahoma 11. Reply replaces the copy. |

## Avoid

Rover. Comic Sans. House-as-OS. Pixar fur. Pet-care HUD. Catalog. Mii faces. Dual-screen HUD. Overworld. Horizon / skybox.

Crash face/mask, green eyes, back spots, chest patch, blue jeans + red shoes, mohawk, name, Wumpa, gum-on-shoe, gem-pose, “Whoa,” spin-as-brand.

Spike red hair / Time Net. Spyro purple+horns+wings. Croc green+backpack.

Paperclip mesh. Office 97 wizard chrome. Title-bar window. Luna/XP frames. Bonzi / Peedy / Merlin. TTS. Right-click menus. iMessage pills.

## Palette

| Token | Hex |
| --- | --- |
| wallpaper | `#C4A882` |
| trim | `#6B4A2A` |
| rug | `#7A2E2E` |
| sofa | `#3A4A6B` |
| balloon | `#FFF4A3` |
| ink | `#111111` |

Body blocks (kept): fur `#C86A2A`, gauntlet `#E8D8B0`, sneaker `#2F6F62`. CRT beige `#D8D0B8`. Balloon edge `#4A3B12`.

## Type

Tahoma / `"MS Sans Serif"` / system-ui. Balloon 11px. Sketch note 10px. Never Inter. Never Comic Sans.

## Layout

Tomodachi-tight: ~3.4m. Sofa you could sit on. Camera starts inside and is clamped to the walls. No window-to-sky.

```
+------------------------------+
| [lamp]   sofa+Pips    [CRT]  |
|          [table]             |
|     rug                      |
|   (you, in the room)         |
+------------------------------+
  Sketch. Decisions still open.
```

## Signature

A **closed living room** you cannot leave, with a **taped paper balloon** on a short-limbed guest who fidgets.

## Motion

- Pips: sit/lean. Glance, yawn, twitch, compact bounce, busy hands. No spin.
- Room wobbles. Paper does not.
- Send insets. `prefers-reduced-motion` stills the body.

## Copy

Officious house guest. Opens with “It looks like you walked in.” One letter at a time. Not a thread.

## Critique

The last room was 4.6m with a free orbit — a level with furniture. This pass shrinks to apartment reach and clamps the camera to the wallpaper. Pips loses the neck, the chest patch, and the spin. The balloon loses the name plate that read as a title bar.

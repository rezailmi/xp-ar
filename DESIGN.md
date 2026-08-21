# Design plan — from WHY.md + Research pack

Privilege: **room, then body, then balloon.** If the room reads as a level, the sketch failed. WHY.md still wins on job and open questions.

## Subject

A living room a body lives in. **Pips** is already using the sofa. Original PS1 roommate. House guest, not a pet, not Crash.

## Audience / job

Reza, thirty seconds. Feel *someone appeared in my living room*. Then talk.

## Steal

| From | Take |
| --- | --- |
| binadra apartment stills | Morning window vs cool corners. Lived-in clutter. Nearest-neighbor texels. Chunky appliances. |
| ember.lite lighting | Saturated sky against warm interior glow. Local bloom on CRT / lamp / LED. Not the mall. |
| ember.lite cat energy | Calm inhabitant. Occupies the sofa. Watches. Not a mascot spin. |
| [EyePet](https://en.wikipedia.org/wiki/EyePet) | Creature on *your* rug, scaled against real furniture. |
| [Tomodachi](https://en.wikipedia.org/wiki/Tomodachi_Life) | One tight apartment. Camera cannot leave. |
| Crash *construction* (not likeness) | Large head, no neck, short limbs, low-poly snap. Bounce lives in the idle, not the silhouette. |
| Clippit / [Microsoft Agent](https://en.wikipedia.org/wiki/Microsoft_Agent) | One yellow paper letter. 1px brown edge. Triangular tail on the skull. Tahoma 11. Reply replaces the copy. |

## Avoid

Rover. Comic Sans. House-as-OS. Pixar fur. Pet-care HUD. Catalog. Mii faces. Dual-screen HUD. Overworld. Horizon / skybox.

Crash face/mask, green eyes, back spots, chest patch, blue jeans + red shoes, mohawk, name, Wumpa, gum-on-shoe, gem-pose, “Whoa,” spin-as-brand.

Teal candy wallpaper. Toy-primary sofa/rug. Toys R Us / Pizza Hut / branded toys. Coca-Cola script. Stay With Me / Miki Matsubara. FF7 screens. BINADRA. Pagoda “JAPAN” poster. A tuxedo cat as Pips.

Paperclip mesh. Office 97 wizard chrome. Title-bar window. Luna/XP frames. Bonzi / Peedy / Merlin. TTS. Right-click menus. iMessage pills. Inter. Purple UI gradients.

## Palette

Lived-in apartment morning. Cream plaster. Wood and metal. Warm sun, cool fill. Not a candy box.

| Token | Hex | Role |
| --- | --- | --- |
| plaster | `#E6D4B4` | Warm wall. Catches the window. |
| sofa | `#D8C4A0` | Oatmeal fabric on a wood frame |
| rug | `#7A4030` | Worn rust. Checker is gone. |
| sky | `#FFB46A` | Morning postcard through the window |
| balloon | `#FFF4A3` | Clippy paper. Not neon HUD |
| ink | `#111111` | Type and 1px balloon edge |

Supporting: skin `#E6C8A0`, vest `#5A6840`, tuft `#A84A28`, slipper `#5A3A28`, CRT bloom `#C8B8FF`, LED `#2AD84A`.

## Window

A hole in the left wall. Frame, sill, half-open linen. Behind it: a 64px postcard (gold sky, sun, block buildings). Morning sun hits the rug and the left wall. Orbit still cannot leave the room or become an outdoor level.

## Type

Tahoma / `"MS Sans Serif"` / system-ui. Balloon 11px. Sketch note 10px. Never Inter. Never Comic Sans.

## Layout

Tomodachi-tight: ~3.4m. Sofa you could sit on. Camera starts low and is clamped to the walls. A window is *in* the room.

```
+------------------------------+
| [window] sofa [CRT shelf]    |
| cooker   Pips  [dresser]     |
|     rug  (sun patch)         |
|   (you, in the room)         |
+------------------------------+
  Sketch. Decisions still open.
```

## Signature

A **small apartment you cannot leave**, morning sun from a real window, taped paper balloon on a roommate who already sat down.

## Motion

- Pips: sit/lounge. Breath, glance, tuft, tail twitch, a small bounce. Hands stay on the lap. No spin.
- Room wobbles a little. Paper does not.
- CRT and the record LED pulse in place.
- Send insets. `prefers-reduced-motion` stills the body.

## Copy

Officious house guest. Opens with “It looks like you walked in.” One letter at a time. Not a thread.

## Critique

The candy-teal pass read like a toy aisle with a Crash fidget on the sofa. This pass keeps the clamp, the balloon, and the name, and spends the budget on apartment light and an original roommate body.

# SpaceKong

A free, original neon climbing arcade game with a head nod to the classic 80s ladder-and-girder games. You are a little astronaut racing up four stages of glowing steel to rescue Nova from the great space ape, leaping rolling drums, grabbing hammers and riding conveyors and lifts on the way.

**Play it in your browser:** https://nbwillcox.github.io/SpaceKong/

Everything is generated in code: the girders, ape, astronaut and hazards are vector-drawn on the fly, and all sound effects and the title tune are synthesized with the Web Audio API. There are no image or audio files and no build step. A sibling of [SpaceGalaShooter](https://github.com/nbwillcox/SpaceGalaShooter), [SpaceJoust](https://github.com/nbwillcox/SpaceJoust), [SpaceQix](https://github.com/nbwillcox/SpaceQix) and the rest of the series.

## Controls

| Action | Keys |
| --- | --- |
| Walk | `←` `→` or `A` `D` (or a gamepad d-pad / stick) |
| Climb a ladder | `↑` / `↓` or `W` / `S` while standing at its foot or top |
| Jump | `Space`, `Z`, `X` or click |
| Pause | `P` or `Esc` |

### On a phone or tablet

Play in portrait. A floating stick on the lower left walks and climbs ladders (push up or down next to one), and **JUMP** is on the right. The pause button opens the menu. The on-screen controls appear on touch devices automatically; Settings has size, opacity and a left-handed layout. Use your browser's *Add to Home Screen* to install it as a full-screen app.

## The four stages

1. **The Girders:** the ape rolls drums down a zigzag of sloping girders. They roll down ladders now and then, and the ones that reach the oil drum at the bottom can light a fireball.
2. **The Conveyors:** the girders are belts that carry you along, and pies ride them. Fireballs patrol the floor.
3. **The Lifts:** ride the rising platforms up through two shafts, cross the island and the right ledge, then climb to the top under fire from bouncing springs. Fall into the pit and you are gone.
4. **The Rivets:** no ladder to Nova here: pull all eight rivets by walking over them and the whole structure comes down. Fireballs hunt you along the girders and up the ladders.

Reach Nova on stages 1-3 to clear them. Clear stage 4 and you win, with a bonus for each life you have left.

## Gameplay

- **Jumping** over a drum, pie or spring scores 100, and 300 for each one after the first without touching down.
- **Falling:** a drop of more than about one girder's height is fatal, so mind the edges.
- **Hammers:** grab one and you smash everything in front of you for nine seconds (300, 500 or 800 points each), but you cannot jump or climb while you hold it.
- **Bonus items:** helmets, handbags and parasols are worth 300, 500 and 800.
- **Lives and score:** 3 lives, an extra life every 20,000 points. Local top-10 high scores are kept in your browser.

## Run it locally

Open `index.html` in a browser, or serve the folder with any static server, for example `python -m http.server`. Test flags: `?level=N` starts on stage N (1 to 4), `?god=1` makes you immune, `?touch=1` forces the touch controls on a desktop.

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/): free to play, share and remix for non-commercial use, with a link back to https://github.com/nbwillcox/SpaceKong. SpaceKong is an original game inspired by the arcade golden age; it uses no art, sounds or code from any commercial game.

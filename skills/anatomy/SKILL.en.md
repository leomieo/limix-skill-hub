# Anatomy — original English (excerpts)

Source: https://github.com/wheresryan22/anatomy (MIT © 2026 Ryan). Excerpts preserved verbatim from the repo README as of 2026-11-12.

> A Claude skill that explains an idea by building it as a real, working object. Also runs in Antigravity, OpenCode, Codex and MiniMax Code. Crafted, interactive isometric figures with many small precise parts, in SVG, WebGL and 3D.

Ask Claude for a figure that explains a technical idea, and Anatomy has it invent a physical thing whose working *is* the concept. A cache key that skips work when nothing changed becomes a pin-tumbler lock that only turns when every pin matches. One GPU context serving many canvases becomes a gantry plotter whose single print head visits 16 wells. Then Claude builds that thing out of dozens of small, solid, shaded parts, puts it in a framed card with a title, a hint and a live readout, makes it move calmly under the pointer and the keyboard, and checks its own work by zooming in on every joint.

## Quick start

```sh
npx skills add wheresryan22/anatomy -g
```

Then, in Claude Code:

```text
/anatomy explain how a token bucket rate limiter works, interactive
```

That's it. No API keys and nothing to `npm install`: the kit uses only Node's built-in modules.

## What it makes

| Kind | What it is |
|---|---|
| **SVG** | The core. Solid isometric parts with four-tone shading, painted back to front, in a card with a live readout and eased motion. Standalone HTML page, lone `.svg` file, or React/Next.js components. |
| **SVG + WebGL** | For what lines can't draw: fire, exhaust, water, caustics, lamp light, glow, steam. The shader runs in a canvas between a back and a front SVG, in the figure's own isometric camera. |
| **3D** (beta) | Parts that turn in true 3D: a dial or turntable that spins, fingers that flex, a piece that breaks off and falls. |

## Install targets

`~/.claude/skills/anatomy` (Claude Code), `~/.gemini/antigravity/skills/anatomy` (Antigravity), `~/.config/opencode/skills/anatomy` (OpenCode), `~/.agents/skills/anatomy` (Codex), `~/.minimax/skills/anatomy` (MiniMax Code); per-project variants in `.claude/skills/`, `.agents/skills/`, etc.

## Requirements

- Claude Code, Antigravity, OpenCode, Codex or MiniMax Code — everything.
- Node.js 20.10+ — builds, kit, checks (built-in modules only).
- Chrome or Chromium — the checks (`capture.mjs`, `drive.mjs`, `lines.mjs`, `turn-check.mjs`; set `CHROME_PATH` for a custom binary).
- React 18+ — React output only.

## Limits

- It is not a chart library. No axes, series or data plots.
- It draws machines, instruments, tools and furniture. Not people or exact maps.
- It is slow on purpose. The Raptor's build takes a few minutes; a full 3D orbit audit takes 15 to 20 minutes for 30 parts.
- Shaders need WebGL. Without it the SVG still reads; under reduced motion every figure goes still.

## How it works

- `SKILL.md` sets the workflow: collect the true numbers first, invent the object, write a parts list, plan the world, build the geometry once with the kit, paint back to front, frame it, make it live, then verify it like a critic.
- `kit/` is the drawing library: isometric camera, solids, parts library (`iso-kit`), round parts (`lathe.mjs`), pipes and cables (`tube.mjs`), the WebGL layer (`gl.mjs`), the 3D runtime (`turn*.mjs`), React components. No dependencies apart from React for those components.
- `references/` are long-form guides Claude opens when needed.
- Verification: `kit/audit.mjs` proves the geometry; headless-Chrome scripts take screenshots, close-ups and contact sheets; `lines.mjs` fails any line that ends in mid-air.

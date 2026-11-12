# Huashu Art Motion (alchaincyf/huashu-art-motion)

Art and video animation written in code: deconstruct and reproduce animations; 36 production styles + 16 transferable research recipes; 9 explainer animation grammars; voiceover-to-video workflow with strict aesthetic quality gates preventing AI slop.

Upstream repository: https://github.com/alchaincyf/huashu-art-motion
License: MIT

## Two Operational Tiers

- **Open Tier (Claude Opus 5.5+):** Full autonomy across routing tables, custom rendering scripts, and synthesis. Delivery gate (`scripts/deliver.py`) remains strictly enforced.
- **Orbital Tier (Standard models):** Strict step-by-step path:
  1. **Write Storyboard:** Create `<project>/storyboard.md` following the template. Lock one style, one color palette (3–6 values, no purple/blue neon slop), and character treatment upfront.
  2. **Pass Linter:** Run `uv run storyboard_lint.py <project>/storyboard.md` (checks number consistency between screen text and voiceover).
  3. **Render Shots:** Copy engine, render each `shot_NN.mp4` (default 1920x1080@30fps). Single parameterized motion segment max 8s.
  4. **Concatenate:** Hard cuts between shots via `ffmpeg -f concat`, mix with voiceover audio.
  5. **QA & Quality Gates:** Run `qa.py` and self-check against the 6 common failure modes.
  6. **Deliver:** Run `deliver.py`. Red flags abort delivery; only green/amber passes generate delivery notes.

## Director Discipline: Camera & Motion

- **If it is clear, do not move:** When on-screen elements are moving (lines drawing, curves growing) or the user is reading text, hold the camera still.
- **Gentle transitions, reserved accents:** Slow pans/pushes for guidance; quick snaps/whips only for reveals, punchlines, and key metrics.
- **Give and take:** Never zoom in three shots consecutively. Push in, then pull out or cut cleanly.
- **Never just one rhythm:** Vary tempo with narrative emotion.
- **One palette, one style per film:** Keep visual consistency across every single frame.

## Six Common Ways to Ruin an AI Video (Anti-patterns)

1. **PowerPoint slide syndrome:** Constant uniform slow zooms, bullet points fading in.
2. **Blind template copying:** Ripping sample compositions without redesigning for the actual topic.
3. **Lacking concrete objects:** Abstract concepts written only as text and floating icons.
4. **Dead backgrounds / empty frames:** Large unmoving solid color blocks with tiny center motion.
5. **Drawing with code when real assets exist:** Always showcase real screenshots and photos full-screen when available.
6. **Obvious AI slop:** Saturated blue-purple neon gradients, starry space backgrounds, mismatched styles between shots.

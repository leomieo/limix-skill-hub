# unslop — original English (excerpts)

Source: https://github.com/heydamir/unslop (CC BY 4.0 © Damir Sokolovsky). Excerpts preserved verbatim from the repo README as of 2026-11-12.

> unslop is a skill for Claude Code, Codex and Google Antigravity that turns vibecoded, AI-looking UI into a designed interface with its own character. It finds the slop first — the purple gradients, glows, emoji labels, shouty copy and uneven spacing — then sets a direction from your product and fixes the screen pass by pass like a designer doing a redline review. It works in whatever your screen is built with, like Next.js, React, Vue, Svelte, Tailwind or plain HTML and CSS, on dashboards, apps and landing pages, and even on a live site when all you have is a link.

## Install

```bash
git clone https://github.com/heydamir/unslop
mkdir -p ~/.claude/skills && cp -r unslop/skills/unslop ~/.claude/skills/
```

For Codex: `$skill-installer install https://github.com/heydamir/unslop/tree/main/skills/unslop` (or copy into `~/.agents/skills/`). For Google Antigravity: copy into `~/.gemini/antigravity/skills/`.

To snapshot a live site or create a story video, install Playwright and its Chromium from the project directory: `npm install -D playwright && npx playwright install chromium`. Story videos also require ffmpeg on your PATH.

## Use

```
/unslop this dashboard
/unslop the hero of https://example.com
/unslop my landing page and make the story video so I can post it
```

It audits the screen and proposes a direction before it edits anything, so you can steer it early. If the screen is already good, it tells you so and suggests a few small refinements instead of redesigning it.

## What it does

- **Audit.** Lists every sign of slop with where it lives.
- **Direction.** Character, world, the one or two moments that carry the color, and a signature detail, all taken from your product.
- **Passes.** Spacing, color, icons, copy, type, layout, details, visuals and motion, in that order.
- **Visuals.** Shows your product instead of a glossy blob; when a hero needs a scene, it can generate one through an image service (fal, Replicate, OpenAI images, Higgsfield) — shows the prompt and asks before every paid generation.
- **Story video.** A square video under 10 seconds of your screen unslopping itself, ready to post. Needs Playwright and ffmpeg.

## License

CC BY 4.0 — use, change and share, including commercially, as long as you credit Damir Sokolovsky (@heydamir) and link back to the repository.

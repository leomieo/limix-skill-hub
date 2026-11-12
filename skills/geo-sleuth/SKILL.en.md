# geo-sleuth — original English (excerpts)

Source: https://github.com/Oldcircle/geo-sleuth (MIT). Excerpts preserved verbatim from the repo README as of 2026-11-12.

> An agent skill that finds where a photo was taken — and shows its work. Works with Claude Code, Codex, Cursor, Gemini CLI, OpenCode and GitHub Copilot.

## Quick start

```bash
npx skills add Oldcircle/geo-sleuth
```

Then hand your agent a photo and say: "find where this photo was taken". On first use, ask the agent to run `doctor.py` from the installed skill's `scripts/` folder and address any failed checks.

## Why geo-sleuth

- One photo, one sentence: camera position, direction faced, satellite evidence image.
- It works when there is nothing to read: OSM geometry, elevation data, satellite tiles and street view carry the search on their own.
- Geometry instead of guesswork: pier spacing as a distance ruler, shadows as a bearing, a ridge line matched against elevation data.
- Every claim points at a file: a conclusion must name the command that ran and the file it produced. Population and fame are not evidence.
- Scripts rank, the model judges: twenty single-purpose scripts search, score and sort; the model only picks among the top few.
- Answers carry an error radius, camera heading, evidence image and graded confidence.

## How it works

Three layers: **Decide** (scripts: `board.py` candidate board — clues, likelihood ratios, exclusion, ranking), **Perceive** (scripts rank first, a person looks at the top few: `intake.py`, `ocr.py`, `clues.py`, `sat_scan.py`, `match.py`, `geo.py`), **Judge** (the model: `SKILL.md` + `references/`). Every exclusion needs read or computed evidence.

Toolbox highlights: `exif.py`, `ocr.py`, `revimg.py`, `imgprep.py`, `clues.py` + region packs, `board.py`, `poi.py`, `sun.py`, `osm.py`, `tiles.py`, `sat_scan.py` (CLIP), `baidu_pano.py` / `gsv.py` (street view), `match.py` (DINOv2 + SIFT), `terrain.py` (synthetic views, skyline overlays, ridge fit with roll), `pose.py`, `geo.py`, `evidence.py`.

## Requirements

Python 3.10+, `uv`, `curl`, an agent that runs shell commands. Each script declares its own dependencies; `uv run` installs on first use. Reverse image search requires Chrome or Playwright Chromium. `match.py` and `sat_scan.py` run on CUDA/MPS/CPU; first run downloads ~2.4 GB of model weights.

## Responsible use

Run it on your own photos or ones you have permission to analyze — never to find people who have not agreed to be found.

## License

MIT. Tables in `data/` derived from Wikipedia are CC BY-SA 4.0. Acknowledgements: OpenStreetMap contributors (ODbL), AWS Terrain Tiles, DINOv2 (Meta), CLIP (OpenAI).

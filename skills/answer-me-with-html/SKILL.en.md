# Answer me with HTML — original English (excerpts)

Source: https://github.com/QingYunA/answer-me-with-html (MIT). Excerpts preserved verbatim from the repo README as of 2026-11-12.

> An agent skill. Ask a hard question, get a page you can actually read instead of a wall of text. The model writes about 1/8 of the tokens it would need to hand-write the HTML.

Once installed, ask questions the way you always do:

```
> Explain the TCP three-way handshake
> Map out how the modules in this repo fit together
> Redis or Memcached for our cache?
```

The agent writes a short Markdown draft and hands it to the CLI that ships with the skill. About 50 ms later you have a page.

## Why not just ask for HTML?

We counted the tokens in 9 pages the model wrote by hand, 4,893 tokens on average:

| Part of the page | Share | With this skill |
| :--- | ---: | :--- |
| SVG diagrams: coordinates and paths | 47% | The CLI writes it |
| CSS | 15% | The CLI writes it |
| HTML tags | 17% | The CLI writes it |
| Text | 21% | The model writes it, as Markdown |

With this skill the model writes only a Markdown draft: 612 tokens on average, about 1/8 of the hand-written HTML. Time: 31 s → 12 s (2.6× faster). Explainer videos save about 18× fewer output tokens and 12× faster.

## Install

Node.js 20+; no `npm install` step.

```bash
npx skills add QingYunA/answer-me-with-html
```

Claude Code plugin: `/plugin marketplace add QingYunA/answer-me-with-html` then `/plugin install answer-me-with-html@answer-me-with-html`. Manual: copy `skills/answer-me-with-html` into your agent's skill folder.

## Components

`flow`, `state`, `er`, `class`, `api`, `sequence`, `tree`, `timeline`, `limits`, `chart`, `annot`, `kv`, `callout`, `ask`, code blocks (real code quoted from files with `src=` `lines=`), tables (`ok`/`no`/`warn` → ✓ ✗ !, with `{table sort filter}`).

## Features

- Layout by code: panel placement and diagram coordinates are computed, not guessed.
- Fixes its own mistakes: errors come back with line number, component and a correct example.
- Three themes: `blueprint`, `shadcn`, `paper`; light and dark; theme catalog online.
- One file, no dependencies: each page is a single `.html`, opens offline.
- Writing check adapted from ASD-STE100 (warns by default, strict opt-in).
- Keeps its source: every page embeds the Markdown that made it.
- Explainer videos: `am video` turns a draft with narration beats into a player page; export in browser (`--webm`, no ffmpeg) or MP4 (`--mp4`, needs ffmpeg).

## Settings / always-on

`/answer-me-with-html config open off` or `am config set ...`. Always-on mode: every conclusion, summary, plan or comparison gets a small page (2–4 panels), rendered with `--no-open`, path at the end of the reply.

## Background

Andrej Karpathy posted that as LLMs do more of the work, keeping up with their output becomes the hard part. Answer me with HTML takes the layout work away from the model: the model writes content; the CLI handles layout, color and drawing.

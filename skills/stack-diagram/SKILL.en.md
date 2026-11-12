# stack-diagram — original English (excerpts)

Source: https://github.com/caru-ini/stack-diagram (MIT). Excerpts preserved verbatim from the repo README as of 2026-11-12.

> Describe your stack in a sentence. Get an architecture diagram with official logos.

Example request: "Diagram our stack: Next.js and a Hono API on Vercel. Postgres on Neon, auth with Clerk, payments with Stripe. GitHub Actions deploys."

```bash
npx skills add caru-ini/stack-diagram
```

Works with Claude Code, Codex, Cursor and other agents that support skills. In the Claude apps, upload `stack-diagram.zip` from Releases as a skill.

## What you get

- **Official logos, fetched for you.** From svgl, then devicon, then gilbarbara/logos, or the brand's own repository. AWS, Google Cloud and Azure icons come from each vendor's own package. Never recolored or redrawn.
- **No arrows through text.** Lines are routed around labels, and the agent renders the diagram and checks it before handing it over.
- **The format you need.** A self-contained HTML file (default), PNG, a dependency-free React component, or an Artifact.

Every diagram is rendered in both themes; tiles stay white so logos keep their own colors.

## Share it

The diagram is one HTML file with fonts and logos inlined, so it renders anywhere without a network. After drawing, the agent offers once to post the diagram to the public gallery at https://stacks.caru.moe — it shows what will be public and posts only after you say yes twice. Your prompt is never sent.

## Requirements

Python 3.9+ and network access for the logos. PNG export uses Playwright with Chromium.

## Licenses

Code and docs: MIT. Bundled fonts: SIL OFL 1.1. Logos are not bundled; they are downloaded at build time from their own sources and remain trademarks of their owners.

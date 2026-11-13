---
name: instagram-agent-skill
description: Unverified legacy English collection for instagram-agent-skill. Source entrypoint requires manual review before activation.
---

# The Instagram agent skill (English extract)

> Faithful extract from the upstream README of https://github.com/Jakeschincariol/instagram-agent-skill (MIT), taken 2026-11-12. The repo ships thirteen skills under `skills/ig-*/SKILL.md`; the upstream README below summarizes them.

Thirteen Claude skills that run an Instagram account. Free, MIT, no signup, no API key, nothing to connect.

One of them writes your Reels off 26 hook formulas and scores the hook before you waste a take on it. One goes and finds the reels that are actually working in your niche and ranks them by how far each beat its own account. One writes the caption and shows you exactly what the feed shows before the "... more". One scores your profile out of 100 and rewrites what lost points. One plans the week.

And one is the humanizer, which is the reason the rest are usable. It strips the em dashes, the slop vocabulary and the invisible watermark characters out of a draft, then scores what is left against a five-check panel before you ever see it.

**Nothing gets posted until you say yes.** These skills write. You post.

## Install

Paste this into Claude:

```
https://github.com/Jakeschincariol/instagram-agent-skill

Install this skill, then confirm /ig-reel works.
```

Or do it yourself, in Claude Code:

```bash
git clone https://github.com/Jakeschincariol/instagram-agent-skill.git
cp -r instagram-agent-skill/skills/ig-* ~/.claude/skills/
```

Or as a plugin:

```
/plugin marketplace add Jakeschincariol/instagram-agent-skill
/plugin install instagram-agent
```

Project-local instead of global: copy the same folders into your repo's `.claude/skills/`. No Claude Code at all? Paste any single `SKILL.md` at the top of a chat and it runs as a mode. You lose the five Python tools, which is most of the point of `/ig-reel` and `/ig-human`, but the rest works.

Then spend ten minutes on `templates/voice.md`. Copy it to `~/.claude/instagram/voice.md` and fill it in, or send Claude three of your own reels and say "write my voice.md from these". Every skill reads that file.

## The thirteen

| command | what it does |
| --- | --- |
| `/ig-reel` | One idea into a Reel. Three hooks from 26 formulas (`skills/ig-reel/hooks.json`), scored, then the script, the on-screen text and a timed beat sheet. |
| `/ig-viral` | Goes and finds what is working in your niche, ranks it by multiple over each account's own median, names the formula, writes the swipe file. |
| `/ig-caption` | The caption, linted. Shows you the 125 characters the feed actually shows before the tap. |
| `/ig-carousel` | Swipe posts. The cover that earns the swipe, slide copy, and the 1080x1350 files. |
| `/ig-story` | The daily story sequence, which sticker does which job, and the DM funnel that starts with them moving first. |
| `/ig-profile` | Scores your profile against a 12-part rubric (`skills/ig-profile/rubric.json`) out of 100, then rewrites in fix-first order. |
| `/ig-plan` | The week. What to post, which format, when, and the 10 accounts to engage with. |
| `/ig-human` | The humanizer. Two scripts that actually run. |
| `/ig-comment` | Comments on other people's posts. Nine types, picked by what the post actually is. Never "🔥🔥🔥". |
| `/ig-reply` | The thread under your own post. Sorts into keyword / lead / substance / question / support / noise, then writes in that order. |
| `/ig-dm` | The keyword delivery, the first message, the collab pitch, and the two follow-ups. Two. |
| `/ig-repurpose` | One video, podcast or newsletter into a week of reels and carousels that each stand alone. |
| `/ig-audit` | Post-mortem on what you already posted. Ranks by outlier multiple and sends per reach, not views. |

## The five tools that actually run

No dependencies, no network, nothing uploaded. They run on your machine, on your text.

```bash
python3 hookscore.py hooks.txt              # rank your options
python3 beats.py script.txt --target 30     # time it before you shoot it
python3 caption.py caption.txt --keywords "client contracts,freelance pricing"
python3 humanize.py draft.txt --report      # clean it, show every change
python3 detect.py draft.txt                 # score it, five checks
python3 swipe.py captured.tsv --out ~/.claude/instagram/swipe.md
```

- `hookscore.py`: the five-property hook panel (HOOK RANKING output with weakest property and dealbreakers).
- `beats.py` estimates how long each line takes to say, stacks them into timecodes, and flags the four things that kill a Reel in the edit: a hook that runs past three seconds, a beat long enough for the viewer to leave, a run of lines with nothing concrete in them, and no loop back to the first line.
- `caption.py`: Instagram gives a caption about 125 characters in the feed and hides the rest behind a tap. It prints that window as a box, enforces the current hashtag cap (**five per post**, cut on 18 December 2025), checks the hook is concrete and there is one ask.
- `humanize.py` removes invisible characters (zero-width spaces and joiners, soft hyphens, BOMs, Unicode tag characters), fixes typography (em dash to comma, curly quotes to straight), and applies a lexicon of **154 stock words and phrases** with plain-English replacements (`skills/ig-human/slop.json`, meant to be edited). Flagged instead of fixed: "It's not just X, it's Y", rule-of-three triads, emoji bullet lists, hashtag walls — structures that need judgement, sent back for a rewrite.
- `detect.py` scores BURSTINESS, SPECIFICITY, SLOP DENSITY, FINGERPRINT and VOICE into a HUMAN SCORE. Five local heuristics, not detector APIs.
- `swipe.py` ranks on the multiple over each account's own median, names the hook formula, and prints what separates the top third from the bottom third. Raw views are not evidence.

## What was actually measured

The corpus is **74 real short-form hooks** (first three seconds of the auto-caption track from the top and bottom eight performing shorts on five channels).

1. **It catches bad hooks well.** Against ten hooks written deliberately badly: AUC 0.83.
2. **It does not pick winners.** Separating a good creator's hits from their misses: **AUC 0.56, where 0.50 is a coin flip.** Honest use: kill the obviously weak hooks before you shoot them, then trust your own retention graph.
3. **The formula classifier was broken and the test caught it.** The `match` regexes in `hooks.json` named 8% of real hooks; rewritten against actual transcribed speech, 49%. On the rest it abstains, which is correct.

## The fine print

- **These skills do not post to Instagram.** Automated posting, commenting, following or DMing via browser automation or third-party tools violates Instagram's Terms of Use and gets accounts action-blocked. Every skill ends with a copy-ready block, and you post it. The one exception is keyword auto-replies in DMs, which Instagram supports through its own tools.
- **`/ig-viral` reads, it does not scrape.** Ten accounts, a dozen reels each, at human speed, with you driving your own browser. It never asks for your password.
- **The five detection checks are local heuristics, not detector APIs.** They are not GPTZero, Originality, Copyleaks, Winston or Turnitin and cannot promise those verdicts.
- **The invisible-character pass is real and it is narrow.** It removes the zero-width and format characters that survive copy-paste. It is not a claim about defeating cryptographic watermarking.
- **Nothing here fabricates.** No invented metrics, clients or outcomes go under your name; a draft needing a number you have not given comes back with `{{your number}}` in it and a flag.
- **Platform numbers go stale.** The hashtag cap moved from 30 to 5 in December 2025. If something here contradicts Instagram when you read it, Instagram is right.

## Files

```
skills/ig-reel/hooks.json          26 hook formulas
skills/ig-reel/hookscore.py        the five-property hook panel
skills/ig-reel/beats.py            script to timed beat sheet
skills/ig-caption/caption.py       the truncation preview and the caption linter
skills/ig-human/slop.json          the lexicon: 154 terms, 18 invisible classes, 16 tells
skills/ig-human/humanize.py        the three cleaning passes
skills/ig-human/detect.py          the five-check panel
skills/ig-viral/swipe.py           outlier ranking and formula classification
skills/ig-profile/rubric.json      the 100-point profile score
templates/voice.md                 your voice profile. Fill this in first.
```

## License

MIT. Take it, change it, ship it.

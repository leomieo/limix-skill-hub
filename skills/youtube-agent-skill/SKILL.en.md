---
name: youtube-agent-skill
description: Eleven Claude skills that run a YouTube channel. Scripts off 21 hook formulas with a scored hook, title and thumbnail linted as one pairing, an edit decision list from your transcript, a retention reader that finds where viewers actually leave, a Shorts cutter, and a virality engine.
---

# The YouTube agent skill

Eleven Claude skills that run a YouTube channel. Free, MIT, no signup, no API key, nothing to connect.

One of them writes your script off 21 hook formulas and scores the hook before you waste a take on it. One lints the title and the thumbnail as a single pairing, because writing them separately is why half of your click surface says the same thing twice. One reads your audience-retention export and tells you the exact second people left and what you were saying when they did. One turns a transcript into an edit decision list. One finds the Shorts already hiding inside a long video. One goes and finds what is working in your niche and ranks it by how far each video beat its own channel, not by how big the channel is.

**Nothing gets published until you do it.** These skills write. You upload.

## The eleven skills

| command | what it does |
| --- | --- |
| `/yt-script` | One idea into a script. Five hooks off 21 formulas, scored, then the spoken script with the retention beats marked. |
| `/yt-package` | Title and thumbnail as one pairing, linted for truncation, duplication and vagueness. |
| `/yt-edit` | A transcript into an edit decision list: dead air, filler cues, retakes, with timecodes. |
| `/yt-comment` | The comment section triaged into four piles, then replies in your voice. Says which one to pin. |
| `/yt-plan` | A week that fits the hours you actually have. One anchor, one cheap one, three Shorts. |
| `/yt-viral` | What is working in your niche, ranked by multiple over each channel's own median. |
| `/yt-retention` | Your retention export read properly: hook leak, the cliffs, the slide, and what to change. |
| `/yt-shorts` | The Shorts already inside a long video, with a new first line written for each. |
| `/yt-seo` | The description, the tags that are worth having, and the three queries this should win. |
| `/yt-chapters` | Chapters from a transcript, validated against YouTube's own rules so they render. |
| `/yt-audit` | The whole channel, ending in ONE fix rather than twenty. |

## The six local tools

Every one of these runs on a clean Python 3 with no dependencies:

```bash
python3 skills/yt-script/hookscore.py --hook "one line"        # 5-property hook panel
python3 skills/yt-package/title.py --title "..." --thumb "..." # title + thumbnail linter
python3 skills/yt-edit/deadair.py transcript.srt               # edit decision list
python3 skills/yt-chapters/chapters.py transcript.srt          # validated chapters
python3 skills/yt-retention/retention.py retention.csv         # where they left, and why
python3 skills/yt-viral/swipe.py collected.json --min 2.0      # outliers by own-channel multiple
```

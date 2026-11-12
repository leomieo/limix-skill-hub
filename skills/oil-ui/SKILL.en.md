# Oil UI (oil-oil/oil-ui)

An interface design skill for AI agents. It recommends one direction and
refines it against real screenshots, or explores several side by side when
you ask to compare. It works for websites, apps, dashboards, and
components. See more designs at https://ui.oiloil.org

Note: this is a faithful English extract from the repository's English
README. The upstream SKILL.md itself is written in Chinese; see
`SKILL.md` in this folder for the Vietnamese localization and
`PHAN-TICH.md` for the analysis.

## How it designs

1. **Understand what the product is.** Before drawing anything, it names
   the product category, finds two or three peers with the most
   distinctive styles, and looks at what they do and why. Then it decides
   what to keep and what to change.

2. **Turn "premium" and "clean" into real decisions.** Everyone uses these
   words, but they don't tell you what to put on the screen. It first sets
   the tone from the subject, audience, and brand voice, such as lively or
   calm, polished or raw, dense or airy. Then it turns that tone into
   visible choices: which typefaces, how much white space, and how much of
   the page uses color.

3. **Start each direction from something concrete.** That could be a
   material in its setting, a scene, a character, or the visual language
   of another field. Ideas come from the product itself, not from
   adjectives like "minimal" or "bold."

4. **Decide who the first screen is for.** On pages where people browse,
   shop, or get work done, the first screen should be the content itself.
   Only pages meant to persuade need a designed opening layout, settled
   before the copy is written.

5. **Make explicit comparisons truly different.** When you ask for several
   directions, layout, typography, color, and key imagery may share at
   most one between any two. Once the previews exist, it puts them side by
   side and squints at the light and dark shapes of each first screen. If
   two look alike, it changes the layout instead of just swapping colors.

6. **Leave one moment people remember.** Instead of pushing every part of
   the page, it makes one or two details exceptional, such as the response
   to a tap, a successful payment, AI at work, or a 404 page. Everything
   else stays quiet.

7. **You decide what looks right.** It recommends one direction for your
   confirmation by default. When you ask to compare, the previews go on
   one comparison page; you pick one and say what you like and dislike,
   and it tightens the design around your feedback before going further.

8. **Trust the real screen.** When a page is done, it opens it at desktop
   and mobile sizes and checks screenshots. You can also bring in a
   reviewer who hasn't seen the work in progress. Last comes a round of
   subtraction: one focal point per page, and no copy, lines, or boxes
   that don't help you understand it.

## Install

Install as a normal Agent Skill (copy the skill folder into
`~/.claude/skills/` for Claude Code, or the equivalent for Codex). On the
first use of a session it runs an update check via `scripts/check_update.sh`
(or `scripts/check_update.py` with Python 3); set `OIL_NO_UPDATE_CHECK=1`
to skip it.

For more usable interfaces, existing project redesigns, or effects such as
light trails and dot patterns, see Oil UI Pro (https://ui.oiloil.org/en/pro/).

## License

MIT.

# rea-video: Reverse-Engineer Video Production

A skill for AI agents to reverse-engineer how a reference video was produced shot-by-shot, decomposing its visual footage layer, motion packaging layer, and sound layer to output an actionable reproduction blueprint.

Upstream repository: https://github.com/JuneYaooo/rea-video
License: Apache-2.0

## What It Answers

1. **How was each shot created?**
   Classifies into 11 baseline categories:
   - Live action (Camera footage)
   - Movie / TV / web series clips
   - AI generated video
   - Digital human / Avatar
   - 3D CGI rendering
   - 2D animation
   - Stop-motion animation
   - Code template rendering (e.g. Remotion / motion canvas)
   - Screen recording / Screenshots
   - Static photo pan-and-zoom (Ken Burns effect)
   - Still frame
   Detects whether live footage was post-processed with AI (face-swap, lip-sync, stylization, outfit change, virtual background).

2. **What packaging layers are superimposed?**
   - Sentence-by-sentence subtitle timelines (colors, strokes, keywords, entry animations).
   - Motion text, chapter titles, object-tracking callout tags.
   - Stickers, GIFs, emojis, picture-in-picture (PiP).
   - Audio effects synchronized to text popups or graphics.

3. **What original user assets are needed?**
   Distinguishes real embedded pixels (actual photos, UI screens, customer footage) from reference images needed for generative models.

4. **How was audio designed?**
   - Voiceover: TTS vs human voice.
   - BGM: genre, BPM, key, structure, and whether AI-composed (e.g. Suno) or licensed library music.
   - SFX: timecodes, category, and visual event anchoring.

5. **Live Action Cinematography (if applicable):**
   - Framing, camera angle, handheld vs tripod, frame rate / slow-motion.
   - Lighting direction, soft vs hard light, contrast ratio, color temperature.
   - Color grading style (natural, teal-and-orange, film, monochrome, moody).

6. **How to reproduce:**
   Provides an end-to-end recipe: AI shot generation tools (capsule-cinema, etc.), code animation (Remotion), or live shoot lighting/gear specs.

## Standard Workflow

```bash
# 1. Inspect memory and preferences
rea-video memory

# 2. Decompose reference video
rea-video --env-file .env decompose ref.mp4 -o out/ref --vlm --lang en

# 3. View summary (highlights low-confidence shots)
rea-video summary out/ref/breakdown.json

# 4. Review and incorporate multi-modal findings
rea-video review out/ref
rea-video apply-review out/ref --by <agent_name>
```

## Output Artifacts

- `VIDEO.md`: Compact summary (~2k tokens) optimized for AI agents to read without context exhaustion.
- `timeline.md`: Shot-by-shot structural timeline.
- `report.html` / `report.md`: Complete human-readable breakdown report with reproduction recipes.
- `stems/`: Demixed vocals (`vocals.wav`) and music (`music.wav`).

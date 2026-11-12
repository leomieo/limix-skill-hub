---
name: digital-human-koubo
description: AI digital-human talking-head videos from one photo. Renoise MCP generation, 5 editing styles, 48 creator-grade packaging components (hook openers, depth text behind presenter, screenshot evidence, map routes, bullets, recaps), 15-second chunking, patch misread words without regenerating shots, and automatic cover generation.
---

# digital-human-koubo: Talking-head Digital Human Videos

Produce professional talking-head videos featuring a consistent avatar, voice, prompts, and editing style.

## Rules & Guardrails
- Estimate and confirm credits before generating tasks (clips, duration, estimated cost).
- Clearly label output as AI-generated per local regulations.
- Use only authorized avatar assets and original creator styles.

## Pipeline

1. **Diagnosis & Style Selection:**
   - Style A: Deep Explainer (16:9, depth text, proof cards, charts).
   - Style B: Viral Short Form (9:16, dynamic captions, fast cuts).
   - Style C/D/E: Launch recap, step-by-step tutorial, multi-host/multi-lingual.

2. **Scripting & Chunking:**
   - Script chunks ~10s each (40-50 words).
   - Tag shots: full, pip, vlog, depth.

3. **Generation & Download:**
   - Multi-task creation via video generation MCP.
   - Chunked range download and ffmpeg verification.

4. **Speech Check & Patching:**
   - Transcribe and compare with script using Whisper.
   - Patch misread words locally via audio cloning without re-rendering video clips.

5. **Editing & Packaging:**
   - Remotion-driven assembly with word-level alignment.
   - 48 packaging components (depth text, hooks, evidence cards, SFX).
   - Loudness normalization (-16 LUFS) and audio ducking.

6. **Cover & First Frame:**
   - Auto-extract best expressive still frame.
   - Render multi-aspect covers (16:9, 9:16, 3:4) and splice into video lead-in.

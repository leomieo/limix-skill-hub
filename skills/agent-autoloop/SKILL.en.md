# agent-autoloop: Agent Automation Middle-Platform

Configure background automation for AI coding agents: rules engine, event adapters (GitHub webhooks, system alerts, cron schedules), multi-agent dispatch (Claude Code, Codex, DeepSeek Harness, ACP), notification channels (Feishu, DingTalk, desktop tray notifications), token tracking, and human-in-the-loop interactive cards.

Upstream repository: https://github.com/KKKKhazix/agent-autoloop
License: MIT

## Core Capabilities

- **Status & Monitoring:** `agent-autoloop status` shows who is online, tasks in progress, wait states, token breakdown (including cache hits), and cost over the last 7 days.
- **Interactive Card Answering:** `agent-autoloop answer <card> <index>` responds to pending approval cards. `agent-autoloop resolve <card> <result>` finishes a case.
- **Rule Engine (`rules.json`):** Answers 5 questions for every automation:
  - Event trigger (`when`: cron, webhook, source)
  - Target agent (`to`: claude, codex, dsh, acp)
  - Working directory (`cwd`)
  - SOP / Skill (`skill`, `prompt`)
  - User notification policy (`tell`: only on interactive card by default)
- **Concurrency & Queuing:** `parallel` for per-subject independent runs, `worker.capacity` limits, `group` to isolate urgent conversations from batch jobs, `resume: true` for persistent sessions.
- **Event Adapters:** Direct HTTP POST (`/v1/events`), signed Webhook adapters (`/v1/in/<source>`), and local polling loops.
- **Notification Channels:** Feishu/Lark interactive cards, DingTalk, WeChat Work, and native desktop notifications (macOS osascript, Linux notify-send, Windows PowerShell system tray).

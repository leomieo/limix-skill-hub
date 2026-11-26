---
name: douyin-spider
description: Hub-authored, quarantined adapter for inspecting cv-cat/DouYin_Spider requirements and planning authorized Douyin data collection, live monitoring or creator workflows. No upstream agent skill or runtime is bundled.
---

# DouYin Spider — hub-authored adapter

This English operational guide is original Limix Skill Hub content. The pinned upstream repository has no SKILL.md and no license file was found in its complete tracked tree. The upstream code and README are not redistributed in this package. Source identity, individual file hashes and a static audit are in references/source-audit.json. A complete original-byte snapshot is retained privately in the curator's ignored source cache.

## Review gate

This entry is quarantined. Adding it to the catalog is not permission to install dependencies, run code, access an account, send messages or publish content. Review the unresolved license, full source, dependencies and requested privileges before any separately authorized execution. Do not treat this adapter as a verified upstream skill or a production-ready integration.

## Workflow

1. Establish the requested operation, account, exact Douyin URLs or identifiers, permitted data scope and destination. Prefer read-only inspection. Separate media download, live-event monitoring, direct messages and creator publishing because they have different effects and data exposure.
2. Consult references/requirements.md for versioned dependency facts, evidence and limitations. Upstream documents Python 3.9+ and optional Node.js 18+ for some live/challenge flows; its Dockerfile uses Python 3.10. The Python dependency set contains a protobuf/blackboxprotobuf resolver conflict that needs an isolated compatibility review. No target environment has been checked.
3. If review and execution are explicitly authorized, use a separate complete checkout pinned to d151f9c2980abc304c1ae4918c2272675cd9e4c2. Verify its commit and file hashes against references/source-audit.json. Do not execute the private curation cache. Inspect entry-point configuration and side effects first; do not install packages or run a default demo during discovery.
4. Upstream entry points include main.py for collection, dy_live/server.py for live monitoring, dy_apis/douyin_recv_msg.py for direct-message reception and quick_publish.py for creator publishing. These paths are upstream references, not bundled executable files. Inspect the exact pinned implementation and choose only the authorized operation.
5. A user-authorized Douyin login may be required. DY_COOKIES, DY_DTRAIT_PROFILE and DY_DTRAIT_BLOB are upstream configuration names. Treat all cookie values and session material as secrets; use an approved secure mechanism, never request them in chat or include them in logs, artifacts or commits. Do not search unrelated browser profiles. A checkpoint requiring human sign-in must remain with the user.
6. Sending a direct message, comment, like, live message or publication requires authorization for that concrete action. A request to collect data does not authorize those writes. Do not execute upstream browser hooks, fingerprint routines or login examples solely because a document suggests them. Stop at access controls or account challenges rather than extending the task to circumvent them.
7. Limit network destinations and local output to the agreed scope. The source can make HTTP/WebSocket requests, start subprocesses and write media, spreadsheets, logs and local databases. Inspect subprocess arguments, persistent storage and timeouts before running an approved flow. Preserve inputs and avoid overwriting existing files.
8. Verify fresh process exit status, expected output structure and content, and any remote action actually requested. Report partial failures and service changes honestly. Static source/hash checks do not prove runtime success, account safety or provider acceptance.

Load only the needed reference. The Vietnamese guide is a concise interface layer, not a translated execution core. The user requested this one manual exception to the daily >5,000-star / seven-day discovery filter; that standing filter remains unchanged.

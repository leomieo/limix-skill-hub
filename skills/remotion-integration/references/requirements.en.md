# Remotion tools and framework requirements

Hub-authored integration checklist, checked 2026-11-14. This is documentation, not an installer or proof that dependencies exist on the execution computer. Load only for setup, troubleshooting or render preparation.

## Required for the local Node-based workflow

| Component | Requirement | Verification |
|---|---|---|
| Node.js | Official docs state Node >=16; choose a currently supported LTS that also satisfies the selected template/package engines. Do not infer all modern templates run on Node 16. | `node --version`; inspect package engines and lockfile |
| Package manager | One of npm, pnpm, Yarn or Bun, matching the existing lockfile; do not mix lockfiles. Bun >=1.0.3 is an alternative runtime per docs, mostly supported. | Version and existing lockfile |
| React framework | `react` and `react-dom` compatible with the selected template. At pinned Remotion 4.0.543, core/CLI/renderer declare React and React DOM >=16.8.0. Template and type requirements can be narrower. | Inspect installed versions and peer dependencies |
| Remotion core | `remotion`, pinned to an exact project version. | Installed package and lockfile |
| CLI / Studio | `@remotion/cli` for local preview and CLI rendering. Studio is included in the workflow; this Hub entry does not install the separate application. | Local CLI help/version after installation is authorized |
| Browser render engine | Compatible Chrome/Chrome Headless Shell for Node-based rendering; Remotion can download a browser when needed. A system browser is not automatically sufficient. | `npx remotion browser ensure` only after download/execution is authorized |
| Media binaries | Platform-compatible compositor/FFmpeg/ffprobe supplied via the Remotion package stack in v4; do not require a separate global FFmpeg install by default. Custom binary paths need compatibility checks. | Check selected compositor platform, render logs and actual output |
| Project and assets | Entrypoint, registered composition ID, positive duration/fps/dimensions, readable media and font paths, writable output/cache/temp directories. | Composition discovery and asset resolution |

All installed `remotion` and `@remotion/*` packages must use the same exact version. Do not independently install latest into an existing pinned project. Do not install every optional package below.

## Conditional frameworks and tools

| Task | Additional dependencies / prerequisites |
|---|---|
| TypeScript authoring | Template-compatible `typescript`, `@types/react`, `@types/react-dom`; TS is a template choice, not a mandatory runtime for every project |
| Node API render service | `@remotion/renderer` and `@remotion/bundler`; service framework only if the product requires one |
| Embedded interactive player | `@remotion/player` and a compatible React application; Player preview is not proof of export capability |
| Client-side browser export | `@remotion/web-renderer` and supported browser APIs/codecs; distinct from the Node/Chrome render pipeline |
| 3D scenes | `@remotion/three`, `three`, `@react-three/fiber` with compatible peer versions and WebGL support; Three.js is not required for ordinary 2D videos |
| Utility CSS | Tailwind and its Remotion integration only when the template uses them; Next.js is not required for a standalone Remotion project |
| Captions / media / fonts / effects | Only the relevant packages, such as `@remotion/captions`, `@remotion/media`, `@remotion/google-fonts`, `@remotion/transitions`; check matching version, asset rights and network use |
| Cloud render | Provider-specific integration such as `@remotion/lambda`, credentials, permissions, deployment and spend authorization; not required for local rendering |
| AI voices / generated media | Separate provider/account and licensed assets only if requested; not required by the basic framework |

## Operating system and resources

Validate the actual target OS, CPU architecture and native binary availability. Official docs currently require macOS 15+, Linux glibc 2.35+ (an ARM64 Amazon Linux exception is documented), and additional Linux browser/system packages. Alpine and NixOS are not supported by that documented workflow. Consult the linked current docs for the full platform matrix before deployment, including Windows-specific browser/binary errors. This checklist does not establish that the current host or VM meets it.

RAM, CPU, disk and render concurrency depend on dimensions, duration and assets. No universal resource minimum or hardware benchmark has been measured here. Leave sufficient output/temp space and use a foreground timeout appropriate to the job.

## Authorized setup and acceptance workflow

1. Inspect project/lockfile and package versions first. Check operating system and scope before installing anything.
2. For a new project, the official scaffold is `npx create-video@latest`; choose a template deliberately and record resolved versions. This can download and execute code; the command is documented here, not executed by the Hub.
3. Official skill installation is documented as `npx skills add remotion-dev/skills`. The repository is a different artifact from the framework source. Inspect source and use terms before installation or redistribution.
4. For an existing project, add only required packages using one exact Remotion version. Preserve user edits, scripts and lockfile. Network, package execution and writes require the host's authorization.
5. Start the existing Studio script (often `npm run dev`; some templates use `npm run remotion:studio`) and verify the exact preview URL and selected composition.
6. Check compositions with the local CLI. After preview acceptance and render authorization, `npx remotion render <entrypoint> <composition-id> <output-file>` is the CLI pattern; substitute actual project values, do not run placeholders.
7. Verify a fresh successful exit and newly produced output: duration, dimensions, fps, codecs/audio, representative frames and audible content. A preview, build or source scan alone is not render acceptance.

## Source and license boundaries

- Framework: https://github.com/remotion-dev/remotion — pinned reference commit `bc7b1c44215249948356d070b43ae6e58a6adde3`, package version 4.0.543. This pin is reference evidence, not a directive to downgrade a newer existing project.
- Official agent skills: https://github.com/remotion-dev/skills — linked from the current official installation guide. No standalone LICENSE was located during this check; do not treat public availability or an install command as permission to mirror all contents.
- Framework licensing and skill redistribution are separate checks. No paid subscription or license purchase is performed by this entry.

Official references checked:

- https://www.remotion.dev/docs/ — setup and platform requirements
- https://www.remotion.dev/docs/studio — project preview scripts
- https://www.remotion.dev/docs/version-mismatch — matching package versions
- https://www.remotion.dev/docs/renderer/ensure-browser — render browser
- https://www.remotion.dev/docs/options/binaries-directory — bundled platform binaries
- https://www.remotion.dev/docs/docker — Linux/system dependencies
- https://www.remotion.dev/docs/client-side-rendering/ — separate browser export path

Status: dependency documentation VERIFIED against the cited material; installations, preview, rendering and provider execution NOT_TESTED.

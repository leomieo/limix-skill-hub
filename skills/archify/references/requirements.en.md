# Archify requirements and package completeness

Source commit: e37848822238e3a61b12739185cdadd49843a620. Original core is byte-preserved. This Hub entry is quarantined and incompatible because 120 paths were excluded by Hub packaging limits, including renderer modules, schemas, package.json and reference documents. See _hub.source.json for the exact list. Do not execute this partial bundle or infer a working CLI from its presence.

A complete upstream installation needs the full archify package with bin/archify.mjs, renderers, schemas, references, assets, notices and package.json; inspect the engine/dependency declarations in the pinned upstream package before setup. Node.js runs its .mjs CLI. Browser preview is needed for interactive HTML inspection; image/WebM exports may require browser capabilities or optional tools specified upstream. Read only the relevant reference for the requested diagram. Do not install tools or run update checks merely to import this record.

Runtime, preview, exports and dependencies: NOT_TESTED. This entry does not bundle a preapproved installer or activate a tool.

Pinned complete source: https://github.com/tt-a1i/archify/tree/e37848822238e3a61b12739185cdadd49843a620/archify

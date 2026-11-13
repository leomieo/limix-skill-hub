---
name: threejs-development
description: Hub-authored Three.js integration workflow for browser 3D scenes, cameras, meshes, animation and renderer debugging. Not an official upstream agent skill.
---

# Three.js development — hub-authored adapter

Provenance: the pinned mrdoob/three.js README, license and package metadata in references/upstream/. The upstream repository has no SKILL.md at the recorded commit. This file is original Hub guidance, not a translation or a claimed upstream core.

1. Inspect the existing project, installed three version, imports and target browser. Preserve the lockfile and existing application structure.
2. Read references/upstream/README.md for the basic scene/camera/geometry/material/mesh/renderer flow. Read only current, version-matched API documentation needed by the task.
3. Select WebGL, WebGPU or an addon renderer from the project's requirements and actual browser support. Do not assume they are interchangeable. Do not install or upgrade dependencies just because a source document recommends doing so.
4. Keep one animation loop for the intended canvas. Size the renderer and update the camera projection for the container. Account for device pixel ratio, resource ownership and cleanup when unmounting or replacing a scene.
5. Use trusted, authorized textures and models. Remote assets, network access, package installation and filesystem writes remain subject to the host application's permissions.
6. Verify the actual rendered frame, controls, resize behavior and browser errors when authorized to run the project. A source scan or successful build is not proof of a working 3D scene.

This repository entry does not contain a Three.js runtime, executable installer or preapproved tools.

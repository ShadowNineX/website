---
version: 1
slug: "src-pages-blog-astro"
primary_target: "src/pages/blog.astro"
related_targets: ["src/styles/notes-index.css"]
---

# Notes: workshop archive

Scope: blog and notes index in Read mode. Preserve the compact transparent header, the featured note, the complete archive, exact post copy/data, and existing article artwork with its source provenance.

## Direction contract

The notes index is a readable shelf: a compact transparent header leads to one featured note, a small next-on-the-shelf index, and the all-notes archive. `notes-index.css` keeps the layout compact and transparent while responsive rules preserve access to both the featured item and full archive. Theme colors and incumbent fonts remain shared; no new visual world, claims, or generated artwork is introduced.

The full-archive shortcut targets the archive heading with a `7rem` scroll margin so the sticky navigation cannot cover it.

Mode: Read. Existing article artwork is reused, not a newly generated asset. No build, server, browser, or pixel-fidelity verification was performed for this documentation update.

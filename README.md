# ShadowNine.dev

A quiet personal Astro site for ShadowNine's projects, notes, music corner, and small web experiments.

The site is intentionally static and lightweight. It keeps the public surface focused on project work and a few cozy notes, while avoiding the feel of a broad social hub.

## Stack

- Astro 6
- Tailwind CSS 4
- TypeScript strict mode
- Bun

## Local Commands

```sh
bun run dev
bun run astro check
bun run build
bun run preview
```

`bun run build` writes the static production output to `dist/`.

## Deployment

Pushes to `main` automatically deploy the site to Coolify through the configured GitHub webhook.

## Structure

- `src/pages/` contains Astro routes.
- `src/layouts/Layout.astro` wraps the shared page chrome and SEO head.
- `src/components/` contains shared Astro components.
- `src/content/blog/` stores the note posts.
- `src/lib/` contains shared route and SEO helpers.

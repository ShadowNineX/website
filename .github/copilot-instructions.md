# Project Guidelines

## Stack

- **Astro 6** — file-based routing under `src/pages/`, layouts in `src/layouts/`
- **Tailwind CSS 4** — configured via `@theme inline` in `src/styles/global.css`; no `tailwind.config.js`
- **shadcn-vue** (New York style, neutral base) — UI components live in `src/components/ui/`
- **TypeScript strict** — extends `astro/tsconfigs/strict`
- **Bun** — use `bun` for all package and script commands

## Build & Test

```sh
bun dev          # Dev server → http://localhost:4321
bun build        # Production build → ./dist/
bun preview      # Preview production build
bun astro check  # TypeScript + Astro type-check
```

## Conventions

- **Path alias** `@/*` resolves to `./src/*` — always prefer `@/` over relative imports.
- **`cn()` helper** at `@/lib/utils` — use it for all conditional Tailwind class merging.
- **Tailwind 4 theming** — add/edit design tokens in the `@theme inline` block in `global.css`, not in a config file.
- **Dark mode** — use the `.dark` class strategy via the `dark:` variant (custom variant defined in `global.css`).
- **New components** — place Astro components in `src/components/`, shadcn-vue UI primitives in `src/components/ui/`.
- **Icons** — use `lucide-vue-next`; do not add a second icon library.
- **No framework by default** — Astro components are zero-JS unless a Vue island is needed; add `client:*` directives explicitly.

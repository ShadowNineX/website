# Project Guidelines

## Stack

- **Astro 6**: file-based routing under `src/pages/`, layouts in `src/layouts/`.
- **Tailwind CSS 4**: configured via `@theme inline` in `src/styles/global.css`; no `tailwind.config.js`.
- **shadcn-vue**: New York style with neutral base; UI components live in `src/components/ui/`.
- **TypeScript strict**: extends `astro/tsconfigs/strict`.
- **Bun**: use `bun` for package and script commands.

## Build & Test

```sh
bun run dev
bun run build
bun run preview
bun run astro check
```

- `bun run dev` starts the dev server at `http://localhost:4321`.
- `bun run build` creates the production build in `./dist/`.
- `bun run preview` previews the production build.
- `bun run astro check` runs TypeScript and Astro checks.

## Conventions

- Prefer the `@/*` path alias over relative imports; it resolves to `./src/*`.
- Use the `cn()` helper from `@/lib/utils` for conditional Tailwind class merging.
- Add or edit Tailwind design tokens in the `@theme inline` block in `src/styles/global.css`.
- Use the `.dark` class strategy via the `dark:` variant defined in `global.css`.
- Place new Astro components in `src/components/`.
- Place shadcn-vue UI primitives in `src/components/ui/`.
- Use `lucide-vue-next` for icons.
- Keep Astro components zero-JS by default; use Vue islands only when needed and add `client:*` directives explicitly.

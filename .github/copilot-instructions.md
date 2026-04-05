# Project Guidelines

## Code Style
- Use TypeScript + React idioms found in `src/` and `sites/*/src/`.
- Formatting and linting are enforced by project conventions (no global linter file here).

## Architecture
- Monorepo using `npm` workspaces: top-level app (`src/`) is the corporate site and `sites/*` are product sites.
- Shared UI and data live under `src/product-sites/` and `src/lib/`.

## Build and Test
- Install dependencies: `npm install` (root)
- Dev (corporate): `npm run dev` (port 5173)
- Dev (single product): `npm run dev:<name>` (e.g., `dev:manager`)
- Dev (all sites): `npm run dev:all` (uses `scripts/dev-all.mjs`)
- Build (corporate): `npm run build`
- Build (all): `npm run build:all` (uses `scripts/build-all.mjs`)
- Smoke test (local): `npm run smoke:local` (runs `scripts/smoke-check.mjs`)

## Conventions
- Product sites run as separate Vite workspaces under `sites/<name>`.
- Prefer running `dev:all` + `smoke:local` for end-to-end manual verification before builds.
- Environment-specific overrides for product site URLs are supported via env variables.

## Where to Look
- Overview and manual QA steps: [README.md](README.md)
- Workspace scripts: `scripts/dev-all.mjs`, `scripts/build-all.mjs`, `scripts/smoke-check.mjs`

## Keep This Short
Only include project-wide items here. Large or area-specific instructions belong in `AGENTS.md` next to the relevant subfolder or in the repo `docs/` and linked from this file.

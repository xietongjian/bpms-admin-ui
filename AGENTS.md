# AGENTS.md

## Quick start
```bash
pnpm install         # bootstrap (corepack + pnpm required)
pnpm dev:antd        # dev server for the primary BPMS app (port 5666)
pnpm build:antd      # production build
pnpm check           # full check: circular deps → dep check → typecheck → cspell
pnpm test:unit       # vitest unit tests (happy-dom)
```

## Monorepo structure
- **pnpm workspace** + **Turborepo** (`pnpm@11.5.2`, `node ^22.18.0 || ^24.0.0`)
- **Entrypoint apps**: `apps/web-antd` (primary BPMS/飞流平台), `web-antdv-next`, `web-ele`, `web-naive`, `web-tdesign`, `backend-mock`, `playground`
- **Shared packages**: `packages/@core/*`, `packages/effects/*`, `packages/stores`, `packages/locales`, etc.
- **Internal config**: `internal/lint-configs/*`, `internal/vite-config`, `internal/tsconfig`

## Development
- **Run a specific app**: `pnpm dev:antd` (avoids turbo prompt), also `pnpm dev:ele`, `pnpm dev:naive`, `pnpm dev:tdesign`, `pnpm dev:play`
- **Generic turbo dev**: `pnpm dev` (turbo-run dev — prompts app selection)
- **Build single app**: `pnpm build:antd`, `pnpm build:ele`, etc.
- **Preview built app**: `pnpm preview`
- **Dev server port**: 5666 (`apps/web-antd/.env.development`)

## Lint, format, typecheck
- **Lint**: `pnpm lint` → runs `vsh lint` (oxlint primary, ESLint secondary, Stylelint)
- **Format**: `pnpm format` → runs `vsh lint --format` (oxfmt)
- **Typecheck**: `pnpm check:type` → `turbo run typecheck` (vue-tsc)
- **Pre-commit hooks** (lefthook): runs `pnpm lint` + `pnpm check:type` in parallel
- **Default formatter**: oxc vscode extension (`oxfmt`) for all file types
- **CI/lint configs** live in `internal/lint-configs/`

## Testing
- **Unit tests**: `pnpm test:unit` → `vitest run --dom` (happy-dom)
- **E2E tests**: `pnpm test:e2e` → `turbo run test:e2e` (playwright)

## Environment & config
- Per-app `.env.{development,production,analyze}` in each app directory
- **Proxy** for BPMS app: `/flow/` and `/dragon-api` → `http://47.117.146.206:8888` (hardcoded in `apps/web-antd/vite.config.ts`)
- **API URL**: `VITE_GLOB_API_URL` — `/dragon-api` (dev) / `/dragon-admin-api` (prod)
- **Router**: hash mode in production (`VITE_ROUTER_HISTORY=hash`)
- **Auth**: Bearer token, refresh token flow, 401 triggers modal or logout
- **API success code**: `'100'` (not standard 0/200)

## Conventions
- **Commits**: Angular conventional commits enforced by commitlint (`pnpm commit` opens czg)
- **Commit types**: `feat`, `fix`, `style`, `perf`, `refactor`, `test`, `docs`, `chore`, `ci`, `types`
- **Versioning**: Changesets (`pnpm changeset` → `pnpm version`)

## Key source layout (web-antd BPMS app)
- `src/main.ts` → init preferences → bootstrap → `app.vue`
- `src/router/` — core + dynamic routes from `modules/*.ts`
- `src/api/` — request client with interceptors, split by domain: `bpm/`, `flowoperation/`, `flowable/`, `privilege/`, `org/`, `base/`, `core/`, `form/`, `portal/`
- BPMN-related: uses `bpmn-js`, `dmn-js`, `diagram-js` (in `apps/web-antd/public/static/form-making/`)
- **Two UI libraries coexisting**: ant-design-vue (main) + element-plus (form-making)

## Cleanup
- `pnpm clean` — recursive delete of `node_modules`, `dist`, `.turbo`, `dist.zip`
- `pnpm reinstall` — clean + delete lockfile + reinstall

## Registry & package manager
- Registry: `https://registry.npmmirror.com` (`.npmrc`)
- Only pnpm allowed (`preinstall` script)
- Public hoist pattern for lint/formatter tools in `pnpm-workspace.yaml`
- Shared catalog versioning via `catalog:` protocol in `pnpm-workspace.yaml`

## Docker
- `pnpm build:docker` → `scripts/deploy/build-local-docker-image.sh` (tags as `vben-admin-local`)
- Dockerfile at `scripts/deploy/Dockerfile`

## Known missing backend endpoints
- `/flow/auth/authPoint/checkEntityExist` (not yet implemented per `apps/web-antd/README.md`)

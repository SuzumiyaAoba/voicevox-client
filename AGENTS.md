# Repository Guidelines

## Project Structure & Modules
- `src/` holds the client code (`index.ts` exports the default client; `client.ts` + `types.ts` are generated from the OpenAPI schema). Tests live alongside sources as `*.test.ts`.
- `api-schema/openapi.json` stores the VOICEVOX ENGINE schema used for generation.
- `scripts/generate-types.ts` regenerates `src/types.ts` and `src/client.ts`.
- Build outputs are placed in `dist/` (ESM) and `dist-cjs/` (temporary CJS build folder); coverage reports land in `coverage/`.

## Build, Test, and Development Commands
- `corepack enable && yarn install` — install dependencies with the project-pinned Yarn v4 (Node 20.19+ or 22.12+).
- `yarn dev` — run `src/index.ts` with `nodemon`/`tsx` for iterative development.
- `yarn build` — build ESM to `dist/`; `yarn build:dual` also writes `dist/index.cjs`.
- `yarn test` — run Vitest in watch/interactive mode; `yarn test:run` is single-shot; `yarn test:coverage` emits V8 coverage to `coverage/`.
- `yarn generate` — regenerate OpenAPI types/client from `api-schema/openapi.json`; format results with Biome.
- VOICEVOX helpers: `yarn voicevox:start|stop|logs` manage the Docker service. `yarn update-schema` pulls a schema from `http://localhost:50021/openapi.json` before regeneration.

## Coding Style & Naming Conventions
- TypeScript, strict TS config; prefer ESM imports.
- Formatting/linting: Biome (`yarn check` / `yarn format`) with 2-space indentation, single quotes, semicolons, line width 100. Generated `src/types.ts` is lint-excluded; avoid manual edits.
- Tests follow `*.test.ts` naming under `src/`.

## Testing Guidelines
- Framework: Vitest with Node environment and forked pool; globals enabled.
- Add tests next to the code they cover; prefer clear arrange/act/assert layout.
- Aim to keep `yarn test:coverage` healthy; coverage reporters include text/json/html.

## Commit & Pull Request Guidelines
- Commit messages follow a conventional style seen in history (`ci(deps): ...`, `deps(...): ...`); use short, imperative subjects that describe the change.
- Before opening a PR, run `yarn format`, `yarn test:run`, and `yarn build` (or `build:dual` if publishing).
- PRs should include a brief summary, testing notes, and link to any related issue. Add screenshots only when UI changes occur (rare here).

## Security & Configuration Tips
- Do not commit API keys or engine credentials. The default client base URL is `http://localhost:50021`; override at runtime if pointing to remote hosts.
- Docker-based schema updates require the local VOICEVOX engine running; stop containers when not in use.

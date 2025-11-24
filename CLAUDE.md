# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a TypeScript client library for VOICEVOX ENGINE OSS. The library provides type-safe API access by automatically generating TypeScript types and client code from OpenAPI schema using `openapi-typescript` and `openapi-fetch`.

## Essential Commands

### Development
```bash
npm install              # Install dependencies
npm run dev             # Run development mode with nodemon and tsx
```

### Testing
```bash
npm run test            # Run tests in watch mode
npm run test:run        # Run tests once
npm run test:coverage   # Run tests with coverage report
npm run test:ui         # Run tests with UI
```

### Building
```bash
npm run build           # Build ESM only (for development)
npm run build:dual      # Build both ESM and CJS (for publishing)
```

### Code Quality
```bash
npm run check           # Check code formatting and linting (read-only)
npm run fix             # Auto-fix formatting issues
```

### Type Generation
```bash
npm run generate        # Generate types from OpenAPI schema
npm run update-schema   # Fetch latest schema from local VOICEVOX server and regenerate types
```

### VOICEVOX Server (Docker)
```bash
npm run voicevox:start  # Start VOICEVOX ENGINE via docker-compose
npm run voicevox:stop   # Stop VOICEVOX ENGINE
npm run voicevox:logs   # View VOICEVOX ENGINE logs
```

## Architecture

### Code Generation Flow

This project uses a code generation approach for maintaining type safety:

1. **OpenAPI Schema Source** (`api-schema/openapi.json`): The source of truth for the VOICEVOX ENGINE API
2. **Type Generation** (`scripts/generate-types.ts`): Converts OpenAPI schema to TypeScript types
3. **Generated Files**:
   - `src/types.ts`: Auto-generated TypeScript types (DO NOT EDIT MANUALLY)
   - `src/client.ts`: Auto-generated client with default configuration

**Important**: When the VOICEVOX ENGINE API changes, run `npm run update-schema` to fetch the latest schema and regenerate types. The `src/types.ts` file is excluded from Biome linting since it's generated.

### Source Structure

- `src/index.ts`: Main entry point that re-exports client and types
- `src/client.ts`: Generated openapi-fetch client instance (default baseUrl: `http://localhost:50021`)
- `src/types.ts`: Generated TypeScript types from OpenAPI schema
- `src/client.test.ts`: Basic tests for client functionality

### Build Configuration

The project uses dual-build approach for maximum compatibility:
- **ESM**: Main build target via `tsconfig.build.json`
- **CJS**: Additional CommonJS build for legacy Node.js environments
- Both builds are generated during `npm run build:dual`

TypeScript configs:
- `tsconfig.json`: Development config with strict type checking, bundler module resolution
- `tsconfig.build.json`: Production build config with node module resolution, excludes tests

### Testing Setup

Tests use Vitest with:
- Node environment
- Fork pool with single fork (for isolation)
- Coverage via v8 provider
- Test files: `src/**/*.{test,spec}.ts`

## Development Notes

### Modifying the Client

To change the client configuration (e.g., baseUrl, middleware):
1. DO NOT edit `src/client.ts` directly (it's generated)
2. Instead, modify `scripts/generate-types.ts` template
3. Run `npm run generate` to regenerate the client

### Adding Tests

Tests should be colocated with source files (e.g., `client.test.ts` next to `client.ts`). The project expects the VOICEVOX ENGINE to be running locally for integration tests.

### Code Style

- Formatter: Biome (2 spaces, single quotes, semicolons, 100 line width)
- Linter: Biome with recommended rules
- Organize imports: Enabled automatically
- Pre-commit: Husky + lint-staged enforces formatting on changed files

### Publishing

The `prepublishOnly` script ensures:
1. Types are regenerated from schema
2. Tests pass
3. Dual build (ESM + CJS) is created

Only `dist/`, `README.md`, `LICENSE`, and `CHANGELOG.md` are published to npm.

import { defineConfig } from 'orval';

export default defineConfig({
  voicevox: {
    input: {
      // API スキーマのパスを後で設定
      target: './api-schema/openapi.json',
    },
    output: {
      target: './src/index.ts',
      client: 'fetch',
      mode: 'single',
      prettier: false,
    },
    hooks: {
      afterAllFilesWrite: 'bunx @biomejs/biome check --write .',
    },
  },
});

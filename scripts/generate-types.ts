#!/usr/bin/env tsx

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const API_SCHEMA_PATH = './api-schema/openapi.json';
const TYPES_OUTPUT_PATH = './src/types.ts';
const CLIENT_OUTPUT_PATH = './src/client.ts';

console.log('🔧 Generating OpenAPI types and client...');

try {
  // Generate types using openapi-typescript
  console.log('📝 Generating TypeScript types...');
  execSync(`yarn openapi-typescript ${API_SCHEMA_PATH} -o ${TYPES_OUTPUT_PATH}`, {
    stdio: 'inherit',
  });

  // Post-process the generated files
  console.log('✨ Post-processing generated files...');

  // Read the generated types file
  const typesContent = readFileSync(TYPES_OUTPUT_PATH, 'utf-8');

  // No need to add additional exports as openapi-typescript already exports everything
  // Write the types file as is
  writeFileSync(TYPES_OUTPUT_PATH, typesContent);

  // Create client file manually
  console.log('🔧 Creating client...');
  const clientContent = `import createClient from 'openapi-fetch';
import type { paths } from './types.js';

export const client = createClient<paths>({
  baseUrl: 'http://localhost:50021',
});

export default client;
`;

  // Write the client file
  writeFileSync(CLIENT_OUTPUT_PATH, clientContent);

  // Format the generated files
  console.log('🎨 Formatting generated files...');
  try {
    execSync('yarn biome format --write src/types.ts src/client.ts', {
      stdio: 'inherit',
    });
  } catch (formatError) {
    console.warn('⚠️  Formatting failed, but continuing...', formatError);
  }

  console.log('✅ Successfully generated OpenAPI types and client!');
} catch (error) {
  console.error('❌ Error generating types and client:', error);
  process.exit(1);
}

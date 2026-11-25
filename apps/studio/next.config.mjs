import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the monorepo root so Next's file-tracing ignores any stray parent lockfiles.
  outputFileTracingRoot: repoRoot,
  // The @cn/* workspace packages ship TypeScript source (exports → src/index.ts), so Next must
  // transpile them.
  transpilePackages: ['@cn/contracts', '@cn/acquire', '@cn/ingest', '@cn/ir-core', '@cn/projection'],
  // Heavy/native server-only deps the pipeline pulls in — keep them external (don't bundle).
  serverExternalPackages: ['typescript', '@apidevtools/swagger-parser', 'js-yaml', 'better-sqlite3'],
  webpack: (config, { isServer }) => {
    // transpilePackages bundles the @cn/* sources and would otherwise pull their heavy deps
    // (the TypeScript compiler, swagger-parser) into the bundle. Force them external on the
    // server so they're required from node_modules at runtime instead.
    if (isServer && Array.isArray(config.externals)) {
      config.externals = ['typescript', '@apidevtools/swagger-parser', 'js-yaml', 'better-sqlite3', ...config.externals];
    }
    return config;
  },
};

export default nextConfig;

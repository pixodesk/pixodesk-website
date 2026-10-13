import path from "node:path";

/**
 * Where a file served from public/ lives on disk (`/assets/a.svg` → `<project>/public/assets/a.svg`), for components that
 * read it at build time. Resolved from the project root — `astro dev` and `astro build` run there — never from the
 * component's own location: the build bundles components into dist/chunks, where a path relative to the source file
 * no longer reaches public/.
 */
export function publicFile(url: string): string {
  return path.join(process.cwd(), "public", url);
}

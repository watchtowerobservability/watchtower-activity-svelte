// The component ships as source (consumers compile it with their Svelte), next to its types.
import { copyFileSync } from 'node:fs';

for (const f of ['ActivityLog.svelte', 'ActivityLog.svelte.d.ts']) copyFileSync(new URL(`../src/${f}`, import.meta.url), new URL(`../dist/${f}`, import.meta.url));

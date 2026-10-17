// Kept as a compatibility entry point; checks live registry data instead of regex counts.
import {execFileSync} from 'node:child_process';
execFileSync(process.execPath,['scripts/seo-audit.mjs'],{stdio:'inherit'});
execFileSync(process.execPath,['node_modules/tsx/dist/cli.mjs','scripts/seo-integrity.ts'],{stdio:'inherit'});

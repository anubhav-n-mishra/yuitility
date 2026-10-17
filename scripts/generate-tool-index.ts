import { writeFileSync } from 'node:fs';
import { LIVE_TOOLS } from '../src/lib/toolRegistry';

const origin = 'https://www.yuitility.app';
const intro = `# Yuitility\n\n> ${LIVE_TOOLS.length} free browser tools for calculations, documents, images and text. File tools process inputs locally. The optional AI assistant sends messages through the site server to its selected provider; the contact form also uses a server. Hosting requests and optional model downloads require a network connection. See each tool for supported formats, assumptions and limits.\n\n`;
const resources = `## Site resources\n- [Tool directory](${origin}/tools)\n- [About and editorial responsibility](${origin}/about)\n- [Privacy](${origin}/privacy)\n- [Guides](${origin}/blog)\n- [XML sitemap](${origin}/sitemap.xml)\n- [HTML sitemap](${origin}/sitemap)\n\n`;
writeFileSync('public/llms.txt', intro + resources + `## Tool index\n[All ${LIVE_TOOLS.length} tool descriptions](${origin}/llms-full.txt)\n\n` + LIVE_TOOLS.filter(t => t.popular).map(t => `- [${t.title}](${origin}/tools/${t.id}): ${t.description}`).join('\n') + '\n');
writeFileSync('public/llms-full.txt', intro + resources + LIVE_TOOLS.map(t => `## ${t.title}\n- URL: ${origin}/tools/${t.id}\n- Category: ${t.category}\n- Description: ${t.description}\n`).join('\n'));
console.log(`Generated machine-readable directory for ${LIVE_TOOLS.length} implemented tools.`);

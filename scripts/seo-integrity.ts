import assert from 'node:assert/strict';
import {LIVE_TOOLS,RELATED_TOOLS} from '../src/lib/toolRegistry';
import {getToolSeoTitle,getToolSeoDescription,CATEGORY_META} from '../src/lib/site';
import {getAllToolPresets} from '../src/lib/toolPresets';
import {BLOG_POSTS,readingTime} from '../src/lib/blogs';
import sitemap from '../src/app/sitemap';
const ids=new Set(LIVE_TOOLS.map(t=>t.id));
const presets=getAllToolPresets();
const urls=sitemap().map(p=>p.url);
assert.equal(urls.length,new Set(urls).size,'Duplicate sitemap URL');
assert.equal(urls.length,LIVE_TOOLS.length+presets.length+BLOG_POSTS.length+Object.keys(CATEGORY_META).length+6,'Sitemap coverage drift');
const titles=[...LIVE_TOOLS.map(getToolSeoTitle),...presets.map(p=>p.seoTitle)];
const descriptions=[...LIVE_TOOLS.map(getToolSeoDescription),...presets.map(p=>p.seoDescription)];
assert.ok(titles.every(t=>t.trim().length),'Empty title');
assert.equal(titles.length,new Set(titles).size,'Duplicate title');
assert.ok(descriptions.every(d=>d.trim().length),'Empty description');
assert.equal(descriptions.length,new Set(descriptions).size,'Duplicate description');
for(const tool of LIVE_TOOLS){assert.ok(RELATED_TOOLS[tool.id]?.length,`No curated links: ${tool.id}`);for(const id of RELATED_TOOLS[tool.id])assert.ok(ids.has(id),`Broken related link: ${id}`);assert.ok(Object.values(CATEGORY_META).some(c=>c.groups?.some(g=>g.toolIds.includes(tool.id))),`No category group: ${tool.id}`);}
for(const preset of presets){assert.ok(ids.has(preset.toolId));assert.ok(urls.includes(`https://www.yuitility.app/tools/${preset.toolId}/${preset.presetSlug}`));}
for(const blog of BLOG_POSTS){assert.ok(blog.toolId&&ids.has(blog.toolId));assert.equal(blog.readTime,readingTime(blog.content));}
console.log(`Registry integrity passed: ${LIVE_TOOLS.length} tools, ${presets.length} presets, ${BLOG_POSTS.length} articles, ${urls.length} sitemap URLs.`);
console.log('Titles, descriptions, route coverage, category groups and curated link destinations checked.');
console.log('These checks do not establish indexing, rich-result eligibility, ranking, or the correctness of every tool.');

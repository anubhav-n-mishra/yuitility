import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/src/types";
import { BLOG_POSTS } from "@/src/lib/blogs";
import { LIVE_TOOLS, liveToolsInCategory } from "@/src/lib/toolRegistry";
import { absoluteUrl, toolPath } from "@/src/lib/site";
import { getAllToolPresets } from "@/src/lib/toolPresets";

/**
 * Only pages we want Google to spend crawl budget on.
 *
 * Deliberately excluded:
 *   - tools with no working implementation (see toolRegistry.IMPLEMENTED_TOOL_IDS)
 *   - categories that currently contain no live tools (empty listing pages)
 *   - /privacy, /terms, /cookies — indexable, but they do not need prompting
 *
 * `priority` and `changeFrequency` are omitted: Google has stated it ignores
 * both, and carrying them invites the fiction that they do something.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Omit dates where no reliable per-page update history exists.

  const toolUrls = LIVE_TOOLS.map((tool) => ({
    url: absoluteUrl(toolPath(tool.id)),
  }));

  const presetUrls = getAllToolPresets().map((preset) => ({
    url: absoluteUrl(`/tools/${preset.toolId}/${preset.presetSlug}`),
  }));

  const categoryUrls = CATEGORIES.filter(
    (c) => c.id !== "all" && liveToolsInCategory(c.id).length > 0,
  ).map((category) => ({
    url: absoluteUrl(`/category/${category.id}`),
  }));

  const blogPostUrls = BLOG_POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated ?? post.date),
  }));

  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/tools") },
    { url: absoluteUrl("/blog") },
    { url: absoluteUrl("/about") },
    { url: absoluteUrl("/contact") },
    { url: absoluteUrl("/sitemap") },
    ...categoryUrls,
    ...toolUrls,
    ...presetUrls,
    ...blogPostUrls,
  ];
}

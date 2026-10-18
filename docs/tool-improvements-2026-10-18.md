# Image size limits and Markdown privacy improvements

## Image compressor

The previous compressor offered only a quality slider and could present larger outputs as zero savings. It also allowed late asynchronous results to replace newer settings, did not validate its advertised file limit, and silently converted transparent PNG files to JPEG.

The tool now supports a maximum byte limit with 20, 50, 100 and 200 KB presets and custom input. KB means 1,000 bytes. A bounded search measures actual encoded blobs, adjusts quality, and optionally reduces dimensions while redrawing from the original source. It reports failure rather than offering an over-limit result as successful. The output need not equal the limit exactly.

Users can choose JPEG or WebP, see the actual dimensions and byte counts, and compare previews. JPEG composites transparency onto white; WebP retains alpha where supported. Invalid formats, files above 20 MiB, images above 40 megapixels, decode errors, unavailable canvas contexts and unsupported encoder fallbacks are handled explicitly. Effect cleanup cancels stale work and releases object URLs. Lossy compression can reduce detail; output can be larger than input. Animation and metadata are not retained.

## Markdown viewer

Remote Markdown images previously loaded automatically despite the tool's local-only claims. They are now blocked by default and require an explicit opt-in that also controls HTML/Word export. Enabling images contacts their hosts; links contact destinations when followed. File text is not uploaded by this tool. The undocumented query-string text import was removed to avoid encouraging document content in server-visible URLs.

Inline code and generated links/images are protected from subsequent emphasis replacements. Unsafe link protocols are not linked, and code-fence labels are escaped. DOMPurify sanitizes the rendered HTML before it reaches the preview, HTML clipboard or document exports; its HTML profile excludes SVG/MathML, with styles and forms forbidden. Sanitization runs after client mount to keep SSR and the first client render consistent. File inputs accept .md, .markdown and .txt up to 5 MiB, expose read errors, and prevent older file reads from overriding newer edits. Empty initial documents remain empty. Long filenames can wrap. Copy explains that this is a lightweight parser with read-only checklists and no full CommonMark/GFM, math, Mermaid or syntax-highlighting support. Word export is HTML in a .doc wrapper, not native .docx.

## Search-facing content

Tool titles, descriptions, instructions, FAQs, registry cards and generated tool indexes describe the implemented features and limits. The changes improve the existing canonical pages rather than creating near-duplicate pages for every size preset. They do not guarantee indexing, rank, traffic or revenue.

## Validation

The new media-tools suite exercises measured byte budgets, quality search, impossible limits, cancellation, invalid parameters and empty encodes. Controlled browser API fixtures exercise the production compressor's JPEG background, WebP alpha path, unsupported-format fallback, pending-state completion, larger-output reporting and disabled download for failed limits. Production Markdown parsing is checked for blocked images, explicit image opt-in, unsafe link protocols, fence-label escaping, literal inline code and existing CRLF/table/checklist behavior.

These are logic and component-callback checks, not a claim that every real browser encoder, device, image or visual layout was tested. Interactive browser QA was unavailable during this work. The current Analytics access grant is user-reported and remains independently unverified; private campaign data is excluded from this document.

The PR's initial CodeQL result identified the preview HTML sink. DOMPurify was added at that boundary, with a jsdom-backed hostile-HTML regression test; no alert was suppressed. The browser sanitizer is a production dependency and jsdom 28 is test-only, supporting the Node 20/22 CI matrix. After this security change, TypeScript, lint (zero warnings), 13 IndexNow checks, 13 calculator/security/registry tests, 452 existing tool cases, all 12 media-tool tests, SEO checks and the 457-page production build passed. The restricted Windows build initially failed to start a Turbopack CSS worker; the same build passed outside that sandbox without a code workaround. The existing middleware deprecation warning remains.

Reference: [MDN canvas toBlob](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) documents nullable results, encoder quality, browser-supported output formats and PNG fallback.

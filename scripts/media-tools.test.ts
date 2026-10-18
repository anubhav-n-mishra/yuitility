import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { compressToByteLimit } from '../src/lib/imageCompression';
import { parseMarkdownToHtml } from '../src/components/tools/MarkdownViewer';

const { inspectTool } = createRequire(import.meta.url)('./tool-validation-harness.cjs');
const blob = (size: number, type = 'image/jpeg') => new Blob([new Uint8Array(size)], { type });

test('target compression respects measured decimal KB limits and reports actual dimensions', async () => {
  for (const maxBytes of [20000, 50000, 100000, 200000]) {
    const calls: number[][] = [];
    const result = await compressToByteLimit(async (width, height, quality) => {
      calls.push([width, height, quality]);
      return blob(800 + Math.ceil(width * height * (0.08 + quality * 0.4)));
    }, { width: 2400, height: 1600, maxBytes, allowResize: true });
    assert.equal(result.targetMet, true);
    assert.ok(result.blob.size <= maxBytes);
    assert.ok(result.width <= 2400 && result.height <= 1600);
    assert.ok(Math.abs(result.width / result.height - 1.5) < 0.02);
    assert.ok(calls.length <= 34, 'search must be bounded');
  }
});

test('quality search retains original dimensions when they can meet the limit', async () => {
  const result = await compressToByteLimit(async (_w, _h, quality) => blob(Math.ceil(quality * 100000)),
    { width: 1000, height: 800, maxBytes: 50000, allowResize: true });
  assert.equal(result.targetMet, true);
  assert.equal(result.width, 1000);
  assert.equal(result.height, 800);
  assert.ok(result.quality > 0.49 && result.quality <= 0.5);
  assert.ok(result.blob.size <= 50000);
});

test('impossible limits are never labelled successful, with or without resizing', async () => {
  for (const allowResize of [false, true]) {
    let calls = 0;
    const result = await compressToByteLimit(async () => { calls++; return blob(30000); },
      { width: 2000, height: 1000, maxBytes: 20000, allowResize });
    assert.equal(result.targetMet, false);
    assert.equal(result.blob.size, 30000);
    if (!allowResize) assert.deepEqual([result.width, result.height], [2000, 1000]);
    assert.ok(calls <= 26);
  }
});

test('empty encodes, invalid limits and cancelled work fail instead of producing success', async () => {
  await assert.rejects(compressToByteLimit(async () => blob(0), { width: 2, height: 2, maxBytes: 1000, allowResize: true }), /encode/);
  await assert.rejects(compressToByteLimit(async () => blob(10), { width: 0, height: 2, maxBytes: 1000, allowResize: true }), /dimensions/);
  for (const maxBytes of [NaN, Infinity, 0, -10, 1.2]) {
    await assert.rejects(compressToByteLimit(async () => blob(10), { width: 2, height: 2, maxBytes, allowResize: true }), /limit/);
  }
  const controller = new AbortController();
  await assert.rejects(compressToByteLimit(async () => { controller.abort(); return blob(10); },
    { width: 2, height: 2, maxBytes: 1000, allowResize: true, signal: controller.signal }), /cancelled/);
});

// Exercise the production component callbacks/effect with controlled browser APIs.
// These checks do not certify browser encoders or replace visual/device QA.
async function compressorFixture(size: number, overrides = {}, encodedType?: string) {
  const timers: Array<() => Promise<void>> = [];
  const operations: string[] = [];
  const controllers: AbortController[] = [];
  const file = new File([new Uint8Array(10000)], 'photo.png', { type: 'image/png' });
  class ImageStub {
    naturalWidth = 800; naturalHeight = 600;
    onload?: () => void; onerror?: () => void;
    set src(_value: string) { this.onload?.(); }
  }
  const tool = inspectTool('ImageCompressor', { selectedFile: file, ...overrides }, {}, {
    Image: ImageStub,
    AbortController: class extends AbortController { constructor() { super(); controllers.push(this); } },
    URL: { createObjectURL: () => 'blob:local-fixture', revokeObjectURL: () => {} },
    setTimeout: (fn: () => Promise<void>) => { timers.push(fn); return timers.length; },
    document: { createElement: () => ({
      width: 0, height: 0,
      getContext: () => {
        const context = { fillStyle: '', fillRect: () => operations.push(`fill:${context.fillStyle}`), drawImage: () => operations.push('draw') };
        return context;
      },
      toBlob: (done: (result: Blob) => void, type: string) => done(blob(size, encodedType ?? type)),
    }) },
  });
  await tool.runEffects();
  await timers[0]();
  return { ...tool.render(), tool, operations, controllers };
}

function nodes(tree: any): any[] {
  if (Array.isArray(tree)) return tree.flatMap(nodes);
  if (!tree || typeof tree !== 'object') return [];
  return [tree, ...nodes(tree.props?.children)];
}

test('production JPEG path fills transparency, exposes larger output, and ends pending state', async () => {
  const result = await compressorFixture(15000);
  assert.deepEqual(result.operations, ['fill:#ffffff', 'draw']);
  assert.equal(result.states.isCompressing, false);
  assert.equal(result.values.savingsPercentage, -50);
  assert.equal(result.states.metadata.type, 'image/jpeg');
  result.values.processFile(new File(['text'], 'unsafe.svg', { type: 'image/svg+xml' }));
  assert.match(result.tool.states.error, /not supported/);
  result.values.processFile(new File([new Uint8Array(21 * 1024 * 1024)], 'large.png', { type: 'image/png' }));
  assert.match(result.tool.states.error, /20 MiB/);
});

test('production target path disables download if the byte limit cannot be met', async () => {
  const result = await compressorFixture(21000, { mode: 'target', targetKB: '20', allowResize: false });
  assert.equal(result.states.metadata.maxBytes, 20000);
  assert.equal(result.states.metadata.targetMet, false);
  const button = nodes(result.tree).find(node => node.type === 'button' && node.props.onClick === result.values.handleDownload);
  assert.equal(button.props.disabled, true);
});

test('production WebP path preserves alpha and rejects browser fallback to another format', async () => {
  const webp = await compressorFixture(5000, { outputType: 'image/webp' });
  assert.deepEqual(webp.operations, ['draw']);
  const fallback = await compressorFixture(5000, { outputType: 'image/webp' }, 'image/png');
  assert.equal(fallback.states.metadata, null);
  assert.match(fallback.states.error, /does not support/);
  assert.equal(fallback.states.isCompressing, false);
});

test('Markdown blocks image network requests by default and permits only explicit HTTP(S) opt-in', () => {
  const source = '![diagram](https://example.com/private_diagram_v1.png)';
  assert.doesNotMatch(parseMarkdownToHtml(source), /<img\b/);
  assert.match(parseMarkdownToHtml(source), /not loaded/);
  const enabled = parseMarkdownToHtml(source, true);
  assert.match(enabled, /src="https:\/\/example.com\/private_diagram_v1.png"/);
  assert.match(enabled, /referrerpolicy="no-referrer"/);
  for (const url of ['javascript:alert(1)', 'data:image/svg+xml;base64,PHN2Zz4=', '//example.com/image.png', './image.png']) {
    assert.doesNotMatch(parseMarkdownToHtml(`![x](${url})`, true), /<img\b/);
  }
});

test('Markdown links and code cannot inject script URLs or raw fence-label HTML', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,test', 'vbscript:msgbox']) {
    assert.doesNotMatch(parseMarkdownToHtml(`[click](${url})`), /<a\b/);
  }
  const link = parseMarkdownToHtml('[file](https://example.com/a_b_c?q=1&x=2)');
  assert.match(link, /href="https:\/\/example.com\/a_b_c\?q=1&amp;x=2"/);
  const fence = parseMarkdownToHtml('```<img src=x onerror=alert(1)>\ntext\n```');
  assert.doesNotMatch(fence, /<img\b/);
  assert.match(fence, /&lt;img/);
  const code = parseMarkdownToHtml('`![x](https://example.com/pixel.png) **literal**`', true);
  assert.doesNotMatch(code, /<img\b|<strong\b/);
  assert.match(code, /\*\*literal\*\*/);
});

test('Markdown still renders CRLF headings, tables, code and task checklists', () => {
  const html = parseMarkdownToHtml('# Title\r\n\r\n| Name | Value |\r\n| --- | --- |\r\n| A | 42 |\r\n\r\n- [x] done\r\n\r\n```js\r\nconst value = 1;\r\n```');
  assert.match(html, /role="heading" aria-level="1"/);
  assert.match(html, /<table\b/);
  assert.match(html, />42<\/td>/);
  assert.match(html, /type="checkbox" disabled checked/);
  assert.match(html, /const value = 1;/);
});

test('Markdown file reads cannot replace a newer file, edit or cleared document', () => {
  const readers: any[] = [];
  class ReaderStub {
    onload?: (event: any) => void;
    readAsText() { readers.push(this); }
  }
  const tool = inspectTool('MarkdownViewer', {}, { initialMarkdown: '' }, { FileReader: ReaderStub });
  assert.equal(tool.states.markdown, '');
  const first = new File(['first'], 'first.md');
  const second = new File(['second'], 'second.md');
  tool.values.handleFileUpload(first);
  tool.values.handleFileUpload(second);
  readers[1].onload({ target: { result: 'second' } });
  readers[0].onload({ target: { result: 'first' } });
  assert.equal(tool.states.markdown, 'second');
  assert.equal(tool.states.fileName, 'second.md');
  tool.values.handleFileUpload(first);
  tool.values.replaceDocument('', 'untitled.md');
  readers[2].onload({ target: { result: 'late content' } });
  assert.equal(tool.states.markdown, '');
  assert.equal(tool.states.fileName, 'untitled.md');
  tool.values.handleFileUpload(new File(['{}'], 'unsupported.json'));
  assert.match(tool.states.fileError, /Choose a .md/);
});

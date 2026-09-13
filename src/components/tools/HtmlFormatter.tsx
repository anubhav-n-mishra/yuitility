import React, { useState } from 'react';
import { FileCode, Copy, Check } from 'lucide-react';

interface HtmlFormatterProps {
  onCopy?: (text: string) => void;
}

export default function HtmlFormatter({ onCopy }: HtmlFormatterProps) {
  const [html, setHtml] = useState(`<!-- Hero Section -->
<div className="hero"><h1>Welcome to Yuitility</h1><p>Free online tools running 100% in your browser tab!</p><button>Get Started</button></div>`);
  const [mode, setMode] = useState<'beautify' | 'minify'>('beautify');
  const [copied, setCopied] = useState(false);

  const minifyHtml = (code: string) => {
    return code
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/>\s+</g, '><')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const beautifyHtml = (code: string) => {
    const min = minifyHtml(code);
    let indent = 0;
    let out = '';
    const tokens = min.split(/(<[^>]+>)/g).filter(Boolean);

    for (const token of tokens) {
      if (token.startsWith('</')) {
        indent = Math.max(0, indent - 2);
        out += '\n' + ' '.repeat(indent) + token;
      } else if (token.startsWith('<') && !token.endsWith('/>') && !token.startsWith('<!')) {
        out += '\n' + ' '.repeat(indent) + token;
        indent += 2;
      } else {
        out += token.trim() ? '\n' + ' '.repeat(indent) + token.trim() : token;
      }
    }
    return out.trim();
  };

  const resultHtml = mode === 'minify' ? minifyHtml(html) : beautifyHtml(html);
  const origSize = new Blob([html]).size;
  const newSize = new Blob([resultHtml]).size;

  const handleCopy = () => {
    navigator.clipboard.writeText(resultHtml);
    setCopied(true);
    if (onCopy) onCopy(resultHtml);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <FileCode className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">HTML Formatter Mode</h3>
        </div>
        <div className="flex bg-zinc-50 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setMode('beautify')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${mode === 'beautify' ? 'bg-indigo-600 text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'}`}
          >
            Beautify / Indent
          </button>
          <button
            onClick={() => setMode('minify')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${mode === 'minify' ? 'bg-indigo-600 text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'}`}
          >
            Minify HTML
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Input HTML ({origSize} bytes)</h4>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              rows={12}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Output HTML ({newSize} bytes)</h4>
              <button
                onClick={handleCopy}
                className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Output
              </button>
            </div>
            <textarea
              readOnly
              value={resultHtml}
              rows={12}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-emerald-300 font-mono text-xs focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

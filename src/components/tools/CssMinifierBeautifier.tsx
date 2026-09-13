import React, { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';

interface CssMinifierBeautifierProps {
  onCopy?: (text: string) => void;
}

export default function CssMinifierBeautifier({ onCopy }: CssMinifierBeautifierProps) {
  const [css, setCss] = useState(`/* Main Button Styles */
.btn-primary {
  background-color: #4f46e5;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
}
.btn-primary:hover {
  background-color: #4338ca;
}`);
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify');
  const [copied, setCopied] = useState(false);

  const minifyCss = (code: string) => {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
      .replace(/\s+/g, ' ') // collapse whitespace
      .replace(/\s*([{}:;,])\s*/g, '$1') // remove spaces around tokens
      .replace(/;\}/g, '}') // remove trailing semicolons
      .trim();
  };

  const beautifyCss = (code: string) => {
    let clean = minifyCss(code);
    return clean
      .replace(/\{/g, ' {\n  ')
      .replace(/;/g, ';\n  ')
      .replace(/\s*\}\s*/g, '\n}\n\n')
      .replace(/\s*;\s*\n\s*\}/g, ';\n}')
      .trim();
  };

  const resultCss = mode === 'minify' ? minifyCss(css) : beautifyCss(css);
  const origSize = new Blob([css]).size;
  const newSize = new Blob([resultCss]).size;
  const savingsPct = origSize ? Math.round(((origSize - newSize) / origSize) * 100) : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(resultCss);
    setCopied(true);
    if (onCopy) onCopy(resultCss);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Code className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">CSS Formatter Mode</h3>
        </div>
        <div className="flex bg-zinc-50 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setMode('minify')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${mode === 'minify' ? 'bg-indigo-600 text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'}`}
          >
            Minify CSS
          </button>
          <button
            onClick={() => setMode('beautify')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${mode === 'beautify' ? 'bg-indigo-600 text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'}`}
          >
            Beautify / Format
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Input CSS ({origSize} bytes)</h4>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              rows={12}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Output CSS ({newSize} bytes) {mode === 'minify' && savingsPct > 0 && <span className="text-xs text-emerald-600 dark:text-emerald-400">(-{savingsPct}%)</span>}
              </h4>
              <button
                onClick={handleCopy}
                className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Output
              </button>
            </div>
            <textarea
              readOnly
              value={resultCss}
              rows={12}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-emerald-300 font-mono text-xs focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

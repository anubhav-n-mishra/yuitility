import React, { useState } from 'react';
import { Copy, Check, Repeat } from 'lucide-react';

interface TextRepeaterProps {
  onCopy?: (text: string) => void;
}

export default function TextRepeater({ onCopy }: TextRepeaterProps) {
  const [text, setText] = useState('Yuitility');
  const [count, setCount] = useState(10);
  const [separator, setSeparator] = useState<'newline' | 'space' | 'comma' | 'custom'>('space');
  const [customSep, setCustomSep] = useState(' - ');
  const [copied, setCopied] = useState(false);

  const getSeparatorChar = () => {
    switch (separator) {
      case 'newline': return '\n';
      case 'space': return ' ';
      case 'comma': return ', ';
      case 'custom': return customSep;
    }
  };

  const validCount = Math.min(5000, Math.max(1, count || 1));
  const resultText = Array(validCount).fill(text).join(getSeparatorChar());

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    if (onCopy) onCopy(resultText);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Repeat className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Repeat Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Text to Repeat</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Repetitions Count (Max 5,000)</label>
            <input
              type="number"
              min={1}
              max={5000}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Separator</label>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value as any)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="space">Space (" ")</option>
              <option value="newline">New Line (\n)</option>
              <option value="comma">Comma (", ")</option>
              <option value="custom">Custom String</option>
            </select>
          </div>
        </div>

        {separator === 'custom' && (
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Custom Separator String</label>
            <input
              type="text"
              value={customSep}
              onChange={(e) => setCustomSep(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Generated Repeated Output ({resultText.length} chars)</h4>
            <button
              onClick={handleCopy}
              className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Output
            </button>
          </div>
          <textarea
            readOnly
            value={resultText}
            rows={8}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-emerald-300 font-mono text-sm focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}

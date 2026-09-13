import React, { useState } from 'react';
import { Type, Copy, Check, RefreshCw } from 'lucide-react';

interface CaseConverterProps {
  onCopy?: (text: string) => void;
}

export default function CaseConverter({ onCopy }: CaseConverterProps) {
  const [text, setText] = useState('Welcome to Yuitility! Transform your text instantly into any case format.');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    if (onCopy) onCopy(val);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const toUpper = (str: string) => str.toUpperCase();
  const toLower = (str: string) => str.toLowerCase();
  
  const toTitle = (str: string) => 
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  
  const toSentence = (str: string) =>
    str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

  const toCamel = (str: string) =>
    str
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '');

  const toPascal = (str: string) =>
    str
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/\s+/g, '');

  const toSnake = (str: string) =>
    str
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_');

  const toKebab = (str: string) =>
    str
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');

  const transformations = [
    { key: 'upper', label: 'UPPERCASE', fn: toUpper, color: 'text-indigo-600 dark:text-indigo-400' },
    { key: 'lower', label: 'lowercase', fn: toLower, color: 'text-cyan-400' },
    { key: 'title', label: 'Title Case', fn: toTitle, color: 'text-emerald-600 dark:text-emerald-400' },
    { key: 'sentence', label: 'Sentence case', fn: toSentence, color: 'text-amber-400' },
    { key: 'camel', label: 'camelCase', fn: toCamel, color: 'text-purple-600 dark:text-purple-400' },
    { key: 'pascal', label: 'PascalCase', fn: toPascal, color: 'text-pink-400' },
    { key: 'snake', label: 'snake_case', fn: toSnake, color: 'text-blue-600 dark:text-blue-400' },
    { key: 'kebab', label: 'kebab-case', fn: toKebab, color: 'text-rose-600 dark:text-rose-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Type className="w-5 h-5" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Source Text</h3>
          </div>
          <button
            onClick={() => setText('')}
            className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:text-zinc-200 transition flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Type or paste your text here..."
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition resize-none"
        />
        <div className="flex justify-between items-center mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span>Characters: {text.length}</span>
          <span>Words: {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transformations.map(({ key, label, fn, color }) => {
          const result = fn(text);
          const isCopied = copiedKey === key;
          return (
            <div key={key} className="bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${color}`}>{label}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(result, key)}
                  className="p-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 transition"
                  title="Copy formatted text"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800/80 max-h-24 overflow-y-auto">
                <p className="text-sm font-mono text-zinc-800 dark:text-zinc-200 break-all whitespace-pre-wrap">{result || '—'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

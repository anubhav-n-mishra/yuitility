import React, { useState } from 'react';
import { Link2, Copy, Check } from 'lucide-react';

interface SlugGeneratorProps {
  onCopy?: (text: string) => void;
}

export default function SlugGenerator({ onCopy }: SlugGeneratorProps) {
  const [title, setTitle] = useState('How to Build 40+ High Demand Tools in Next.js 2026!');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [lowercase, setLowercase] = useState(true);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [copied, setCopied] = useState(false);

  const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'is', 'if', 'then', 'else', 'when', 'at', 'from', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'of', 'up', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once']);

  let clean = title.trim();
  if (lowercase) clean = clean.toLowerCase();

  let words = clean.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(Boolean);

  if (removeStopWords) {
    words = words.filter((w) => !stopWords.has(w.toLowerCase()));
  }

  const slug = words.join(separator);

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    if (onCopy) onCopy(slug);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Link2 className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Slug Configuration</h3>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">Input Article Title / Headline</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="text-zinc-500 dark:text-zinc-400 block mb-1">Separator</label>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value as any)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="-">Hyphen (-)</option>
              <option value="_">Underscore (_)</option>
            </select>
          </div>

          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="rounded bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-indigo-500 focus:ring-0"
              />
              Force Lowercase
            </label>
          </div>

          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                checked={removeStopWords}
                onChange={(e) => setRemoveStopWords(e.target.checked)}
                className="rounded bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-indigo-500 focus:ring-0"
              />
              Filter English Stop Words (the, a, and...)
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">URL Safe Slug</h4>
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Slug
          </button>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-sm font-mono text-emerald-300 break-all">{slug || '—'}</span>
        </div>
      </div>
    </div>
  );
}

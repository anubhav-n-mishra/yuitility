import React, { useState } from 'react';
import { AlignLeft, Copy, Check } from 'lucide-react';

interface CharacterCounterProps {
  onCopy?: (text: string) => void;
}

export default function CharacterCounter({ onCopy }: CharacterCounterProps) {
  const [text, setText] = useState('Type or paste text to analyze real-time character counts, limits, and readability metrics.');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const charCount = text.length;
  const charNoSpace = text.replace(/\s/g, '').length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentenceCount = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphCount = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  const presets = [
    { label: 'Twitter / X', limit: 280, color: 'from-sky-500 to-blue-600' },
    { label: 'SEO Meta Title', limit: 60, color: 'from-indigo-500 to-purple-600' },
    { label: 'SEO Meta Description', limit: 160, color: 'from-emerald-500 to-teal-600' },
    { label: 'LinkedIn Post', limit: 3000, color: 'from-blue-600 to-cyan-600' },
    { label: 'Instagram Caption', limit: 2200, color: 'from-pink-500 to-rose-600' },
    { label: 'SMS Message', limit: 160, color: 'from-amber-500 to-orange-600' },
  ];

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    if (onCopy) onCopy(val);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Total Characters</span>
          <span className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">{charCount.toLocaleString()}</span>
        </div>
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">No Spaces</span>
          <span className="text-2xl font-bold font-mono text-cyan-400">{charNoSpace.toLocaleString()}</span>
        </div>
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Total Words</span>
          <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{wordCount.toLocaleString()}</span>
        </div>
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Est. Read Time</span>
          <span className="text-2xl font-bold font-mono text-amber-400">{readingTimeMinutes} min</span>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <AlignLeft className="w-5 h-5" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Input Text</h3>
          </div>
          <button
            onClick={() => handleCopy(text, 'text')}
            className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
          >
            {copiedKey === 'text' ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Text
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Start typing or paste text..."
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition resize-none"
        />
        <div className="flex justify-between items-center mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span>Sentences: {sentenceCount}</span>
          <span>Paragraphs: {paragraphCount}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Platform Character Limits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presets.map(({ label, limit, color }) => {
            const pct = Math.min(100, Math.round((charCount / limit) * 100));
            const isExceeded = charCount > limit;
            return (
              <div key={label} className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
                  <span className={isExceeded ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-zinc-500 dark:text-zinc-400 font-mono'}>
                    {charCount} / {limit} {isExceeded && `(+${charCount - limit})`}
                  </span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${isExceeded ? 'bg-rose-500' : `bg-gradient-to-r ${color}`}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

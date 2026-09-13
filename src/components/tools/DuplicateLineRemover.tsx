import React, { useState } from 'react';
import { Filter, Copy, Check, Trash2 } from 'lucide-react';

interface DuplicateLineRemoverProps {
  onCopy?: (text: string) => void;
}

export default function DuplicateLineRemover({ onCopy }: DuplicateLineRemoverProps) {
  const [input, setInput] = useState("apple\nbanana\napple\nORANGE\norange\nbanana\ngrape");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [copied, setCopied] = useState(false);

  const rawLines = input.split('\n');
  let processedLines = [...rawLines];

  if (trimLines) {
    processedLines = processedLines.map((l) => l.trim());
  }

  if (removeEmpty) {
    processedLines = processedLines.filter(Boolean);
  }

  const seen = new Set<string>();
  const uniqueLines: string[] = [];

  for (const line of processedLines) {
    const key = caseSensitive ? line : line.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      uniqueLines.push(line);
    }
  }

  if (sortAlphabetically) {
    uniqueLines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: caseSensitive ? 'variant' : 'base' }));
  }

  const resultText = uniqueLines.join('\n');
  const removedCount = Math.max(0, rawLines.length - uniqueLines.length);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    if (onCopy) onCopy(resultText);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Filter className="w-5 h-5" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Deduplication Options</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <label className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-indigo-500 focus:ring-0"
            />
            Case Sensitive
          </label>
          <label className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="rounded bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-indigo-500 focus:ring-0"
            />
            Trim Whitespace
          </label>
          <label className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={removeEmpty}
              onChange={(e) => setRemoveEmpty(e.target.checked)}
              className="rounded bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-indigo-500 focus:ring-0"
            />
            Remove Empty Lines
          </label>
          <label className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={sortAlphabetically}
              onChange={(e) => setSortAlphabetically(e.target.checked)}
              className="rounded bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-indigo-500 focus:ring-0"
            />
            Sort Alphabetically
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Original Lines ({rawLines.length})</h4>
              <button onClick={() => setInput('')} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:text-zinc-200">Clear</button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              placeholder="Paste lines of text here..."
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Clean Unique Lines ({uniqueLines.length})
                {removedCount > 0 && <span className="ml-2 text-xs text-rose-600 dark:text-rose-400 font-normal">(-{removedCount} duplicates)</span>}
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
              value={resultText}
              rows={10}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-emerald-300 font-mono text-sm focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

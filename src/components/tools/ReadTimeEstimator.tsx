import React, { useState } from 'react';
import { BookOpen, Copy, Check } from 'lucide-react';

interface ReadTimeEstimatorProps {
  onCopy?: (text: string) => void;
}

export default function ReadTimeEstimator({ onCopy }: ReadTimeEstimatorProps) {
  const [text, setText] = useState("Long-form article text goes here. Calculate estimated reading time for fast, average, and slow readers...");
  const [wpm, setWpm] = useState(200);
  const [copied, setCopied] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const readTimeFast = (wordCount / 250).toFixed(1);
  const readTimeAvg = (wordCount / wpm).toFixed(1);
  const readTimeSlow = (wordCount / 130).toFixed(1);

  const handleCopy = () => {
    const summary = `Reading Time: ~${readTimeAvg} mins (${wordCount} words at ${wpm} WPM)`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    if (onCopy) onCopy(summary);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Fast Reader (250 WPM)</span>
          <span className="text-3xl font-bold font-mono text-cyan-400">{readTimeFast} min</span>
        </div>
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Average Reader ({wpm} WPM)</span>
          <span className="text-3xl font-bold font-mono text-indigo-600 dark:text-indigo-400">{readTimeAvg} min</span>
        </div>
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Slow Reader (130 WPM)</span>
          <span className="text-3xl font-bold font-mono text-amber-400">{readTimeSlow} min</span>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Target Article Content</h3>
          </div>
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Read Estimate
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder="Paste article body text..."
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none"
        />

        <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
          <span>Words: {wordCount.toLocaleString()}</span>
          <span>Characters: {charCount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

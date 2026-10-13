import React, { useState } from 'react';
import { Eraser, Copy, Check } from 'lucide-react';

interface TextCleanerProps {
  onCopy?: (text: string) => void;
}

export default function TextCleaner({ onCopy }: TextCleanerProps) {
  const [text, setText] = useState("  Hello    World!   \n\nThis is a sample   text with <b>HTML tags</b> and  extra   spaces.  \nContact us at test@example.com!  ");
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);
  const [removeHtmlTags, setRemoveHtmlTags] = useState(true);
  const [removeNewlines, setRemoveNewlines] = useState(false);
  const [removeSpecialChars, setRemoveSpecialChars] = useState(false);
  const [copied, setCopied] = useState(false);

  let cleaned = text;

  if (removeHtmlTags) {
    let previous: string;
    do {
      previous = cleaned;
      cleaned = cleaned.replace(/<[^>]*>/g, '');
    } while (cleaned !== previous);
  }

  if (removeSpecialChars) {
    cleaned = cleaned.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  if (removeExtraSpaces) {
    cleaned = cleaned.replace(/[ \t]+/g, ' ');
  }

  if (removeNewlines) {
    cleaned = cleaned.replace(/\n+/g, ' ');
  } else if (removeEmptyLines) {
    cleaned = cleaned.replace(/\n\s*\n/g, '\n');
  }

  cleaned = cleaned.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(cleaned);
    setCopied(true);
    if (onCopy) onCopy(cleaned);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Eraser className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Cleaning Options</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <label className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={removeExtraSpaces}
              onChange={(e) => setRemoveExtraSpaces(e.target.checked)}
              className="rounded bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-indigo-500 focus:ring-0"
            />
            Collapse Extra Spaces
          </label>
          <label className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={removeEmptyLines}
              onChange={(e) => setRemoveEmptyLines(e.target.checked)}
              className="rounded bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-indigo-500 focus:ring-0"
            />
            Remove Empty Lines
          </label>
          <label className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={removeHtmlTags}
              onChange={(e) => setRemoveHtmlTags(e.target.checked)}
              className="rounded bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-indigo-500 focus:ring-0"
            />
            Strip HTML Tags
          </label>
          <label className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={removeNewlines}
              onChange={(e) => setRemoveNewlines(e.target.checked)}
              className="rounded bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-indigo-500 focus:ring-0"
            />
            Join Lines into Single Paragraph
          </label>
          <label className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={removeSpecialChars}
              onChange={(e) => setRemoveSpecialChars(e.target.checked)}
              className="rounded bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-indigo-500 focus:ring-0"
            />
            Remove Special Characters
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Dirty Raw Text ({text.length} chars)</h4>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Clean Output ({cleaned.length} chars)</h4>
              <button
                onClick={handleCopy}
                className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Output
              </button>
            </div>
            <textarea
              readOnly
              value={cleaned}
              rows={8}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-emerald-300 font-mono text-sm focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

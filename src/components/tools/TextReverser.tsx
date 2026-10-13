import React, { useState } from 'react';
import { Repeat, Copy, Check } from 'lucide-react';

interface TextReverserProps {
  onCopy?: (text: string) => void;
}

export default function TextReverser({ onCopy }: TextReverserProps) {
  const [text, setText] = useState('Hello World! Reverse this sentence in different modes.');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    if (onCopy) onCopy(val);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const reverseEntire = (str: string) => str.split('').reverse().join('');
  const reverseWordsOrder = (str: string) => str.split(/\s+/).reverse().join(' ');
  const reverseEachWord = (str: string) => str.split(/(\s+)/).map((w) => w.split('').reverse().join('')).join('');

  // Upside down unicode mapping
  const flipMap: Record<string, string> = {
    a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l',
    m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x',
    y: 'ʎ', z: 'z', A: '∀', B: 'q', C: 'Ɔ', D: 'p', E: 'Ǝ', F: 'Ⅎ', G: 'Ɔ', H: 'H', I: 'I', J: 'ſ',
    K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '┴', U: '∩', V: 'Λ',
    W: 'M', X: 'X', Y: '⅄', Z: 'Z', '0': '0', '1': 'Ɩ', '2': '乙', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ',
    '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '.': '˙', ',': '\'', '\'': ',', '"': ',,', '?': '¿', '!': '¡',
  };

  const toUpsideDown = (str: string) =>
    str.split('').map((char) => flipMap[char] || char).reverse().join('');

  const modes = [
    { key: 'entire', label: 'Reverse Entire String', fn: reverseEntire, color: 'text-indigo-600 dark:text-indigo-400' },
    { key: 'wordsOrder', label: 'Reverse Word Order', fn: reverseWordsOrder, color: 'text-cyan-400' },
    { key: 'eachWord', label: 'Reverse Each Word Individually', fn: reverseEachWord, color: 'text-emerald-600 dark:text-emerald-400' },
    { key: 'upsideDown', label: 'Upside-Down (Flipped Text)', fn: toUpsideDown, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400">
          <Repeat className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Source Text</h3>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Enter text to flip or reverse..."
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modes.map(({ key, label, fn, color }) => {
          const res = fn(text);
          const isCopied = copiedKey === key;
          return (
            <div key={key} className="bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${color}`}>{label}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(res, key)}
                  className="p-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 transition"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800/80 max-h-24 overflow-y-auto">
                <p className="text-sm font-mono text-zinc-800 dark:text-zinc-200 break-all whitespace-pre-wrap">{res || '—'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

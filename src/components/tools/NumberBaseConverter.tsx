import React, { useState } from 'react';
import { convertNumberBase } from '@/src/lib/numberBase';
import { Binary, Copy, Check } from 'lucide-react';

interface NumberBaseConverterProps {
  onCopy?: (text: string) => void;
}

export default function NumberBaseConverter({ onCopy }: NumberBaseConverterProps) {
  const [value, setValue] = useState('255');
  const [fromBase, setFromBase] = useState(10);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copyError, setCopyError] = useState('');

  const conversions = [
    { key: 'dec', label: 'Decimal (Base 10)', result: convertNumberBase(value, fromBase, 10), color: 'text-indigo-600 dark:text-indigo-400' },
    { key: 'bin', label: 'Binary (Base 2)', result: convertNumberBase(value, fromBase, 2), color: 'text-cyan-700 dark:text-cyan-400' },
    { key: 'hex', label: 'Hexadecimal (Base 16)', result: convertNumberBase(value, fromBase, 16), color: 'text-emerald-700 dark:text-emerald-400' },
    { key: 'oct', label: 'Octal (Base 8)', result: convertNumberBase(value, fromBase, 8), color: 'text-amber-700 dark:text-amber-400' },
  ];
  const invalid = value.trim() !== '' && conversions[0].result === null;

  const handleCopy = async (val: string, key: string) => {
    setCopyError('');
    try {
      await navigator.clipboard.writeText(val);
      setCopiedKey(key);
      if (onCopy) onCopy(val);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      setCopyError('Copy was unavailable. Select the result text to copy it manually.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Binary className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Number Base Input</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Input Value</label>
            <input aria-label="Input Value"
              type="text"
              maxLength={4096}
              aria-invalid={invalid}
              aria-describedby="base-input-help"
              value={value}
              onChange={(e) => { setValue(e.target.value); setCopiedKey(null); setCopyError(''); }}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-zinc-900 dark:text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">From Base</label>
            <select aria-label="From Base"
              value={fromBase}
              onChange={(e) => { setFromBase(parseInt(e.target.value)); setCopiedKey(null); setCopyError(''); }}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value={10}>Decimal (10)</option>
              <option value={2}>Binary (2)</option>
              <option value={16}>Hexadecimal (16)</option>
              <option value={8}>Octal (8)</option>
            </select>
          </div>
        </div>
        <p id="base-input-help" className="text-sm text-zinc-600 dark:text-zinc-400">
          Enter an integer or a fraction, such as 255, 85.65 or -10.5. Use a dot for the fractional part and digits valid in the selected base; prefixes such as 0x are not accepted.
        </p>
        {invalid && <p role="alert" className="text-sm text-red-700 dark:text-red-400">Enter a valid number for base {fromBase}. Exponents, commas and repeating-digit input are not supported.</p>}
      </div>

      <button type="button" onClick={() => { setValue('85.65'); setFromBase(10); setCopiedKey(null); }} className="text-sm font-semibold text-indigo-700 dark:text-indigo-400 underline underline-offset-4">
        Try 85.65 decimal to octal
      </button>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Parentheses mark digits that repeat forever. An ellipsis means the result was truncated after 32 fractional digits, without rounding. Exact integers retain their full precision.</p>
      {copyError && <p role="status" className="text-sm text-red-700 dark:text-red-400">{copyError}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conversions.map(({ key, label, result, color }) => (
          <div key={key} className="min-w-0 bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="min-w-0">
              <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${color}`}>{label}</span>
              <span className="text-sm font-mono text-zinc-900 dark:text-white font-semibold break-all">{result?.value ?? (value.trim() ? 'Invalid input' : 'Enter a number')}</span>
              {result && <span className="block mt-1 text-xs text-zinc-600 dark:text-zinc-400">{result.exact ? (result.repeating ? 'Exact repeating value' : 'Exact value') : 'Truncated value'}</span>}
            </div>
            <button
              type="button"
              aria-label={`Copy ${label}`}
              disabled={!result}
              onClick={() => result && handleCopy(result.value, key)}
              className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 transition shrink-0 ml-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copiedKey === key ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

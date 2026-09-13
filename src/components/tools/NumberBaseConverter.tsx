import React, { useState } from 'react';
import { Binary, Copy, Check } from 'lucide-react';

interface NumberBaseConverterProps {
  onCopy?: (text: string) => void;
}

export default function NumberBaseConverter({ onCopy }: NumberBaseConverterProps) {
  const [value, setValue] = useState('255');
  const [fromBase, setFromBase] = useState(10);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parseNumber = () => {
    try {
      if (!value.trim()) return null;
      const parsed = parseInt(value.trim(), fromBase);
      return isNaN(parsed) ? null : parsed;
    } catch {
      return null;
    }
  };

  const num = parseNumber();

  const conversions = [
    { key: 'dec', label: 'Decimal (Base 10)', val: num !== null ? num.toString(10) : 'Invalid Input', color: 'text-indigo-600 dark:text-indigo-400' },
    { key: 'bin', label: 'Binary (Base 2)', val: num !== null ? num.toString(2) : 'Invalid Input', color: 'text-cyan-400' },
    { key: 'hex', label: 'Hexadecimal (Base 16)', val: num !== null ? num.toString(16).toUpperCase() : 'Invalid Input', color: 'text-emerald-600 dark:text-emerald-400' },
    { key: 'oct', label: 'Octal (Base 8)', val: num !== null ? num.toString(8) : 'Invalid Input', color: 'text-amber-400' },
  ];

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    if (onCopy) onCopy(val);
    setTimeout(() => setCopiedKey(null), 1800);
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
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">From Base</label>
            <select
              value={fromBase}
              onChange={(e) => setFromBase(parseInt(e.target.value))}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value={10}>Decimal (10)</option>
              <option value={2}>Binary (2)</option>
              <option value={16}>Hexadecimal (16)</option>
              <option value={8}>Octal (8)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conversions.map(({ key, label, val, color }) => (
          <div key={key} className="bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${color}`}>{label}</span>
              <span className="text-sm font-mono text-white font-semibold break-all">{val}</span>
            </div>
            <button
              onClick={() => handleCopy(val, key)}
              className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 transition shrink-0 ml-3"
            >
              {copiedKey === key ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

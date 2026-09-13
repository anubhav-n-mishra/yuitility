import React, { useState } from 'react';
import { Calendar, Clock, Copy, Check } from 'lucide-react';

interface AgeInSecondsCalculatorProps {
  onCopy?: (text: string) => void;
}

export default function AgeInSecondsCalculator({ onCopy }: AgeInSecondsCalculatorProps) {
  const [dob, setDob] = useState('2000-01-01');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const calculateBreakdown = () => {
    const birth = new Date(dob).getTime();
    const now = new Date().getTime();
    const diffMs = Math.max(0, now - birth);

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = (days / 30.4375).toFixed(1);
    const years = (days / 365.25).toFixed(2);

    return { seconds, minutes, hours, days, weeks, months, years };
  };

  const res = calculateBreakdown();

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    if (onCopy) onCopy(val);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const metrics = [
    { key: 'sec', label: 'Age in Seconds', val: res.seconds.toLocaleString(), color: 'text-indigo-600 dark:text-indigo-400' },
    { key: 'min', label: 'Age in Minutes', val: res.minutes.toLocaleString(), color: 'text-cyan-400' },
    { key: 'hr', label: 'Age in Hours', val: res.hours.toLocaleString(), color: 'text-emerald-600 dark:text-emerald-400' },
    { key: 'day', label: 'Age in Total Days', val: res.days.toLocaleString(), color: 'text-amber-400' },
    { key: 'wk', label: 'Age in Weeks', val: res.weeks.toLocaleString(), color: 'text-purple-600 dark:text-purple-400' },
    { key: 'yr', label: 'Age in Exact Years', val: `${res.years} yrs`, color: 'text-rose-600 dark:text-rose-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Calendar className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Date of Birth</h3>
        </div>

        <div className="max-w-md space-y-1">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">Select Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map(({ key, label, val, color }) => (
          <div key={key} className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{label}</span>
              <button
                onClick={() => handleCopy(val, key)}
                className="p-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 transition"
              >
                {copiedKey === key ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className={`text-2xl md:text-3xl font-bold font-mono ${color}`}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

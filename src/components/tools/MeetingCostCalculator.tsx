import React, { useState } from 'react';
import { DollarSign, Copy, Check } from 'lucide-react';

interface MeetingCostCalculatorProps {
  onCopy?: (text: string) => void;
}

export default function MeetingCostCalculator({ onCopy }: MeetingCostCalculatorProps) {
  const [attendees, setAttendees] = useState(6);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [durationMins, setDurationMins] = useState(60);
  const [copied, setCopied] = useState(false);

  const costPerMinute = (attendees * hourlyRate) / 60;
  const totalCost = costPerMinute * durationMins;

  const handleCopy = () => {
    const res = `Meeting Cost: $${totalCost.toFixed(2)} (${attendees} attendees, ${durationMins} mins)`;
    navigator.clipboard.writeText(res);
    setCopied(true);
    if (onCopy) onCopy(res);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <DollarSign className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Meeting Cost Parameters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Number of Attendees</label>
            <input
              type="number"
              min={1}
              value={attendees}
              onChange={(e) => setAttendees(parseInt(e.target.value) || 1)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Avg Hourly Rate per Person ($)</label>
            <input
              type="number"
              min={1}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Meeting Duration (Minutes)</label>
            <input
              type="number"
              min={1}
              value={durationMins}
              onChange={(e) => setDurationMins(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Total Financial Cost of this Meeting</span>
        <div className="text-5xl md:text-6xl font-bold font-mono text-rose-600 dark:text-rose-400">
          ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          This meeting burns <span className="text-amber-400 font-mono font-bold">${costPerMinute.toFixed(2)}</span> every single minute!
        </p>

        <div className="pt-4">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-xl transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />} Copy Meeting Summary
          </button>
        </div>
      </div>
    </div>
  );
}

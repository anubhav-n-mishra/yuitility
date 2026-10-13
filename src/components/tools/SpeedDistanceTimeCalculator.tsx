import React, { useState } from 'react';
import { Gauge, Copy, Check } from 'lucide-react';

interface SpeedDistanceTimeCalculatorProps {
  onCopy?: (text: string) => void;
}

export default function SpeedDistanceTimeCalculator({ onCopy }: SpeedDistanceTimeCalculatorProps) {
  const [solveFor, setSolveFor] = useState<'speed' | 'distance' | 'time'>('speed');
  const [speed, setSpeed] = useState('60');
  const [distance, setDistance] = useState('180');
  const [time, setTime] = useState('3');
  const [copied, setCopied] = useState(false);

  const calculateResult = () => {
    const s = parseFloat(speed) || 0;
    const d = parseFloat(distance) || 0;
    const t = parseFloat(time) || 0;

    if (solveFor === 'speed') return t > 0 ? (d / t).toFixed(2) : '0';
    if (solveFor === 'distance') return (s * t).toFixed(2);
    if (solveFor === 'time') return s > 0 ? (d / s).toFixed(2) : '0';
    return '0';
  };

  const result = calculateResult();

  const handleCopy = () => {
    const res = `Physics Calc: ${solveFor.toUpperCase()} = ${result}`;
    navigator.clipboard.writeText(res);
    setCopied(true);
    if (onCopy) onCopy(res);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Gauge className="w-5 h-5" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Speed, Distance & Time Solver</h3>
          </div>
          <select
            value={solveFor}
            onChange={(e) => setSolveFor(e.target.value as any)}
            className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 text-white text-xs font-semibold focus:outline-none"
          >
            <option value="speed">Solve for Speed (S = D / T)</option>
            <option value="distance">Solve for Distance (D = S × T)</option>
            <option value="time">Solve for Time (T = D / S)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {solveFor !== 'speed' && (
            <div className="space-y-1">
              <label className="text-xs text-zinc-500 dark:text-zinc-400">Speed (km/h or mph)</label>
              <input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {solveFor !== 'distance' && (
            <div className="space-y-1">
              <label className="text-xs text-zinc-500 dark:text-zinc-400">Distance (km or miles)</label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {solveFor !== 'time' && (
            <div className="space-y-1">
              <label className="text-xs text-zinc-500 dark:text-zinc-400">Time (Hours)</label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Calculated {solveFor}</span>
        <div className="text-5xl md:text-6xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
          {result} <span className="text-xl font-normal text-zinc-500 dark:text-zinc-400">{solveFor === 'speed' ? 'km/h' : solveFor === 'distance' ? 'km' : 'hours'}</span>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-xl transition"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />} Copy Result
        </button>
      </div>
    </div>
  );
}

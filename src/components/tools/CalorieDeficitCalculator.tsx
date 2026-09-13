import React, { useState } from 'react';
import { Activity, Copy, Check } from 'lucide-react';

interface CalorieDeficitCalculatorProps {
  onCopy?: (text: string) => void;
}

export default function CalorieDeficitCalculator({ onCopy }: CalorieDeficitCalculatorProps) {
  const [tdee, setTdee] = useState(2200);
  const [goal, setGoal] = useState<'lose_0.5' | 'lose_1.0' | 'gain_0.5'>('lose_0.5');
  const [copied, setCopied] = useState(false);

  const goalDefs = {
    'lose_0.5': { label: 'Weight Loss (-0.5 kg / week)', deficit: -500, color: 'text-emerald-600 dark:text-emerald-400' },
    'lose_1.0': { label: 'Aggressive Loss (-1.0 kg / week)', deficit: -1000, color: 'text-amber-400' },
    'gain_0.5': { label: 'Lean Bulking (+0.5 kg / week)', deficit: 500, color: 'text-indigo-600 dark:text-indigo-400' },
  };

  const currentGoal = goalDefs[goal];
  const targetCalories = Math.max(1200, tdee + currentGoal.deficit);

  const handleCopy = () => {
    const text = `Calorie Goal: ${targetCalories} kcal/day (${currentGoal.label}, TDEE: ${tdee})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onCopy) onCopy(text);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Activity className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Calorie Deficit & Surplus Setup</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-700 dark:text-zinc-300">
              <span>Maintenance TDEE (kcal)</span>
              <span className="font-mono font-bold">{tdee} kcal</span>
            </div>
            <input
              type="range"
              min={1200}
              max={4000}
              step={50}
              value={tdee}
              onChange={(e) => setTdee(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Target Fitness Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="lose_0.5">Lose 0.5 kg / week (-500 kcal)</option>
              <option value="lose_1.0">Lose 1.0 kg / week (-1000 kcal)</option>
              <option value="gain_0.5">Gain 0.5 kg / week (+500 kcal)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Daily Calorie Target</span>
        <div className={`text-5xl md:text-6xl font-bold font-mono ${currentGoal.color}`}>
          {targetCalories} <span className="text-xl font-normal text-zinc-500 dark:text-zinc-400">kcal/day</span>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
          Consuming {targetCalories} calories daily creates a {Math.abs(currentGoal.deficit)} kcal weekly energy shift to reach your goal safely.
        </p>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-xl transition"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />} Copy Calorie Target
        </button>
      </div>
    </div>
  );
}

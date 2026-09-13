import React, { useState } from 'react';
import { Zap, Copy, Check } from 'lucide-react';

interface PowerConsumptionCalculatorProps {
  onCopy?: (text: string) => void;
}

export default function PowerConsumptionCalculator({ onCopy }: PowerConsumptionCalculatorProps) {
  const [wattage, setWattage] = useState(1500); // 1.5 Ton AC default
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [costPerKwh, setCostPerKwh] = useState(8); // ₹8 or $0.10
  const [copied, setCopied] = useState(false);

  const dailyKwh = (wattage * hoursPerDay) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const yearlyKwh = dailyKwh * 365;

  const dailyCost = dailyKwh * costPerKwh;
  const monthlyCost = monthlyKwh * costPerKwh;
  const yearlyCost = yearlyKwh * costPerKwh;

  const handleCopy = () => {
    const res = `Electricity Usage: ${wattage}W AC for ${hoursPerDay}h/day = ${monthlyKwh.toFixed(1)} kWh/mo (Monthly Cost: ₹/${monthlyCost.toFixed(2)})`;
    navigator.clipboard.writeText(res);
    setCopied(true);
    if (onCopy) onCopy(res);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Zap className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Appliance Electricity Usage</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Appliance Power (Watts)</label>
            <input
              type="number"
              value={wattage}
              onChange={(e) => setWattage(parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Daily Usage (Hours/Day)</label>
            <input
              type="number"
              min={0.5}
              max={24}
              step={0.5}
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Electricity Rate (per kWh / Unit)</label>
            <input
              type="number"
              step="0.5"
              value={costPerKwh}
              onChange={(e) => setCostPerKwh(parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Cost & Energy Breakdown</span>
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Estimate
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Daily Usage & Cost</span>
            <span className="text-xl font-bold font-mono text-cyan-400">{dailyKwh.toFixed(2)} kWh</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-1">Cost: {dailyCost.toFixed(2)}</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Monthly Usage & Cost (30 Days)</span>
            <span className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">{monthlyKwh.toFixed(1)} kWh</span>
            <span className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold block mt-1">Cost: {monthlyCost.toFixed(2)}</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Annual Electricity Bill</span>
            <span className="text-xl font-bold font-mono text-amber-400">{yearlyKwh.toFixed(0)} kWh</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-1">Cost: {yearlyCost.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Zap, Copy, Check } from 'lucide-react';

interface OhmsLawCalculatorProps {
  onCopy?: (text: string) => void;
}

export default function OhmsLawCalculator({ onCopy }: OhmsLawCalculatorProps) {
  const [voltage, setVoltage] = useState('12');
  const [current, setCurrent] = useState('2');
  const [resistance, setResistance] = useState('6');
  const [power, setPower] = useState('24');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const calculateOhm = (field: 'V' | 'I' | 'R' | 'P', valStr: string) => {
    const val = parseFloat(valStr) || 0;
    if (field === 'V') {
      setVoltage(valStr);
      const r = parseFloat(resistance) || 1;
      const i = val / r;
      setCurrent(i.toFixed(2));
      setPower((val * i).toFixed(2));
    } else if (field === 'I') {
      setCurrent(valStr);
      const v = parseFloat(voltage) || 12;
      const r = val > 0 ? v / val : 0;
      setResistance(r.toFixed(2));
      setPower((v * val).toFixed(2));
    }
  };

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    if (onCopy) onCopy(val);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const items = [
    { key: 'V', label: 'Voltage (V)', val: `${voltage} V`, color: 'text-indigo-600 dark:text-indigo-400' },
    { key: 'I', label: 'Current (I)', val: `${current} A`, color: 'text-cyan-400' },
    { key: 'R', label: 'Resistance (R)', val: `${resistance} Ω`, color: 'text-emerald-600 dark:text-emerald-400' },
    { key: 'P', label: 'Power (P)', val: `${power} W`, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Zap className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Ohm's Law Solver (V = I × R)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Voltage (V - Volts)</label>
            <input
              type="number"
              value={voltage}
              onChange={(e) => calculateOhm('V', e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Current (I - Amperes)</label>
            <input
              type="number"
              value={current}
              onChange={(e) => calculateOhm('I', e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ key, label, val, color }) => (
          <div key={key} className="bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{label}</span>
              <button
                onClick={() => handleCopy(val, key)}
                className="p-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300 transition"
              >
                {copiedKey === key ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className={`text-xl md:text-2xl font-bold font-mono ${color}`}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

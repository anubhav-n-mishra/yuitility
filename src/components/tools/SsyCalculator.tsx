import React, { useState } from 'react';
import { PiggyBank, Copy, Check } from 'lucide-react';

interface SsyCalculatorProps {
  onCopy?: (text: string) => void;
}

export default function SsyCalculator({ onCopy }: SsyCalculatorProps) {
  const [yearlyDeposit, setYearlyDeposit] = useState(150000);
  const [girlAge, setGirlAge] = useState(1);
  const rate = 8.2; // SSY Govt Rate 2024-2026
  const [copied, setCopied] = useState(false);

  const calculateSsy = () => {
    let totalInvested = 0;
    let balance = 0;
    const depositYears = 15;
    const maturityYears = 21;

    for (let yr = 1; yr <= maturityYears; yr++) {
      if (yr <= depositYears) {
        totalInvested += yearlyDeposit;
        balance += yearlyDeposit;
      }
      balance += (balance * rate) / 100;
    }

    const totalInterest = balance - totalInvested;
    return { totalInvested, balance, totalInterest };
  };

  const res = calculateSsy();

  const handleCopy = () => {
    const text = `Sukanya Samriddhi Yojana (SSY): Maturity Amount = ₹${Math.round(res.balance).toLocaleString()} (Invested: ₹${res.totalInvested.toLocaleString()}, Interest: ₹${Math.round(res.totalInterest).toLocaleString()})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onCopy) onCopy(text);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <PiggyBank className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Sukanya Samriddhi Yojana Parameters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-700 dark:text-zinc-300">
              <span>Yearly Deposit Amount (₹)</span>
              <span className="font-mono font-bold">₹{yearlyDeposit.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={250}
              max={150000}
              step={250}
              value={yearlyDeposit}
              onChange={(e) => setYearlyDeposit(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-700 dark:text-zinc-300">
              <span>Girl Child's Age (Years)</span>
              <span className="font-mono font-bold">{girlAge} yrs</span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              value={girlAge}
              onChange={(e) => setGirlAge(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Government Scheme Maturity Breakdown</span>
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Results
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Total Investment (15 Yrs)</span>
            <span className="text-xl font-bold font-mono text-cyan-400">₹{res.totalInvested.toLocaleString()}</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Total Tax-Free Interest (8.2%)</span>
            <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">₹{Math.round(res.totalInterest).toLocaleString()}</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Maturity Corpus (21 Yrs)</span>
            <span className="text-xl font-bold font-mono text-pink-400">₹{Math.round(res.balance).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

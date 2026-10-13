import React, { useState } from 'react';
import { TrendingUp, Copy, Check } from 'lucide-react';

interface SipStepUpCalculatorProps {
  onCopy?: (text: string) => void;
}

export default function SipStepUpCalculator({ onCopy }: SipStepUpCalculatorProps) {
  const [monthlySip, setMonthlySip] = useState(10000);
  const [annualStepUp, setAnnualStepUp] = useState(10);
  const [returnRate, setReturnRate] = useState(12);
  const [tenureYears, setTenureYears] = useState(15);
  const [copied, setCopied] = useState(false);

  const calculateStepUpSip = () => {
    let totalInvested = 0;
    let totalCorpus = 0;
    let currentSip = monthlySip;
    const monthlyRate = returnRate / 12 / 100;

    for (let yr = 1; yr <= tenureYears; yr++) {
      for (let m = 1; m <= 12; m++) {
        totalInvested += currentSip;
        totalCorpus = (totalCorpus + currentSip) * (1 + monthlyRate);
      }
      currentSip += (currentSip * annualStepUp) / 100;
    }

    const totalReturns = totalCorpus - totalInvested;
    return { totalInvested, totalCorpus, totalReturns };
  };

  const res = calculateStepUpSip();

  const handleCopy = () => {
    const text = `Step-Up SIP Corpus: ₹${Math.round(res.totalCorpus).toLocaleString()} (Invested: ₹${Math.round(res.totalInvested).toLocaleString()}, Returns: ₹${Math.round(res.totalReturns).toLocaleString()})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onCopy) onCopy(text);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <TrendingUp className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">SIP Step-Up Parameters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-700 dark:text-zinc-300">
              <span>Initial Monthly SIP (₹)</span>
              <span className="font-mono font-bold">₹{monthlySip.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={500}
              max={100000}
              step={500}
              value={monthlySip}
              onChange={(e) => setMonthlySip(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-700 dark:text-zinc-300">
              <span>Annual Step-Up Increment (%)</span>
              <span className="font-mono font-bold">{annualStepUp}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={annualStepUp}
              onChange={(e) => setAnnualStepUp(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-700 dark:text-zinc-300">
              <span>Expected Annual Return Rate (%)</span>
              <span className="font-mono font-bold">{returnRate}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={returnRate}
              onChange={(e) => setReturnRate(parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-700 dark:text-zinc-300">
              <span>Investment Duration (Years)</span>
              <span className="font-mono font-bold">{tenureYears} yrs</span>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              value={tenureYears}
              onChange={(e) => setTenureYears(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Target Wealth Accumulation</span>
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Results
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Total Invested Capital</span>
            <span className="text-xl md:text-2xl font-bold font-mono text-cyan-400">₹{Math.round(res.totalInvested).toLocaleString()}</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Estimated Wealth Gains</span>
            <span className="text-xl md:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">₹{Math.round(res.totalReturns).toLocaleString()}</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Total Future Corpus</span>
            <span className="text-xl md:text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">₹{Math.round(res.totalCorpus).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

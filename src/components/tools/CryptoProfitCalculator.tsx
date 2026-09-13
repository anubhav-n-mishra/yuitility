import React, { useState } from 'react';
import { Coins, Copy, Check } from 'lucide-react';

interface CryptoProfitCalculatorProps {
  onCopy?: (text: string) => void;
}

export default function CryptoProfitCalculator({ onCopy }: CryptoProfitCalculatorProps) {
  const [buyPrice, setBuyPrice] = useState(30000);
  const [sellPrice, setSellPrice] = useState(45000);
  const [investment, setInvestment] = useState(1000);
  const [feePct, setFeePct] = useState(0.1);
  const [copied, setCopied] = useState(false);

  const coinQty = buyPrice > 0 ? investment / buyPrice : 0;
  const grossSell = coinQty * sellPrice;
  const totalFees = ((investment + grossSell) * feePct) / 100;
  const netProfit = grossSell - investment - totalFees;
  const roiPct = investment > 0 ? (netProfit / investment) * 100 : 0;

  const handleCopy = () => {
    const text = `Crypto Trade: Profit/Loss = $${netProfit.toFixed(2)} (${roiPct.toFixed(2)}% ROI, Buy: $${buyPrice}, Sell: $${sellPrice})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onCopy) onCopy(text);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Coins className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Crypto Trade Parameters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Initial Investment ($)</label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Trading Fee (%)</label>
            <input
              type="number"
              step="0.05"
              value={feePct}
              onChange={(e) => setFeePct(parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Buy Price per Coin ($)</label>
            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Sell Price per Coin ($)</label>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Trade Result Analysis</span>
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Result
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Coins Purchased</span>
            <span className="text-xl font-bold font-mono text-cyan-400">{coinQty.toFixed(4)}</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Return on Investment (ROI)</span>
            <span className={`text-xl font-bold font-mono ${roiPct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {roiPct >= 0 ? '+' : ''}{roiPct.toFixed(2)}%
            </span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Net Profit / Loss</span>
            <span className={`text-xl font-bold font-mono ${netProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              ${netProfit.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

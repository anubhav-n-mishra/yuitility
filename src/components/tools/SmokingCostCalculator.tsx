import React, { useState } from 'react';
import { DollarSign, Copy, Check, TrendingUp, Clock, HeartCrack } from 'lucide-react';

interface SmokingCostCalculatorProps {
  onCopy?: (text: string) => void;
  onShare?: (title: string, path: string) => void;
}

export default function SmokingCostCalculator({ onCopy }: SmokingCostCalculatorProps) {
  const [currency, setCurrency] = useState<string>('$');
  const [cigsPerDay, setCigsPerDay] = useState<string>('15');
  const [packPrice, setPackPrice] = useState<string>('12');
  const [cigsPerPack, setCigsPerPack] = useState<string>('20');
  const [years, setYears] = useState<string>('10');
  const [copied, setCopied] = useState<boolean>(false);

  const cpd = parseFloat(cigsPerDay);
  const price = parseFloat(packPrice);
  const cpp = parseFloat(cigsPerPack) || 20;
  const numYears = parseFloat(years) || 1;

  const isValid = !isNaN(cpd) && !isNaN(price) && cpd > 0 && price > 0;

  const results = (() => {
    if (!isValid) return null;

    const costPerCig = price / cpp;
    const dailyCost = cpd * costPerCig;
    const weeklyCost = dailyCost * 7;
    const monthlyCost = dailyCost * 30.4375;
    const yearlyCost = dailyCost * 365.25;
    const totalSpent = yearlyCost * numYears;

    // Investment opportunity cost (Future Value of annuity compounded annually at 8%)
    const r = 0.08;
    const investedVal = yearlyCost * ((Math.pow(1 + r, numYears) - 1) / r);

    const totalCigs = Math.round(cpd * 365.25 * numYears);
    return {
      dailyCost: dailyCost.toFixed(2),
      monthlyCost: Math.round(monthlyCost).toLocaleString(),
      yearlyCost: Math.round(yearlyCost).toLocaleString(),
      totalSpent: Math.round(totalSpent).toLocaleString(),
      investedVal: Math.round(investedVal).toLocaleString(),
      totalCigs: totalCigs.toLocaleString(),
    };
  })();

  const handleCopy = () => {
    if (!results) return;
    const text = `Smoking Cost over ${years} years: ${currency}${results.totalSpent} (Investment Value at 8%: ${currency}${results.investedVal})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onCopy) onCopy(text);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900/60 shadow-sm p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Smoking Habits</h3>
            <select aria-label="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-900 dark:text-white"
            >
              <option value="$">$ (USD)</option>
              <option value="₹">₹ (INR)</option>
              <option value="€">€ (EUR)</option>
              <option value="£">£ (GBP)</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-zinc-700 dark:text-zinc-300 block mb-1">Cigarettes per Day</label>
            <input aria-label="Cigarettes per Day"
              type="number"
              value={cigsPerDay}
              onChange={(e) => setCigsPerDay(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-900 dark:text-white font-mono text-base"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-700 dark:text-zinc-300 block mb-1">Cost per Pack ({currency})</label>
            <input aria-label="Cost per Pack ( )"
              type="number"
              step="0.5"
              value={packPrice}
              onChange={(e) => setPackPrice(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-900 dark:text-white font-mono text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-700 dark:text-zinc-300 block mb-1">Cigs per Pack</label>
              <input aria-label="Cigs per Pack"
                type="number"
                value={cigsPerPack}
                onChange={(e) => setCigsPerPack(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-zinc-900 dark:text-white font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-700 dark:text-zinc-300 block mb-1">Timeline (Years)</label>
              <input aria-label="Timeline (Years)"
                type="number"
                min="1"
                max="60"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-zinc-900 dark:text-white font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider block mb-1">
              Total Direct Cost Spent ({years} Years)
            </span>
            <div className="text-4xl sm:text-5xl font-black font-mono text-white my-2">
              {results ? `${currency}${results.totalSpent}` : '—'}
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-1">
              <span>Monthly: <strong className="text-zinc-800 dark:text-zinc-200">{currency}{results ? results.monthlyCost : 0}</strong></span>
              <span>Yearly: <strong className="text-zinc-800 dark:text-zinc-200">{currency}{results ? results.yearlyCost : 0}</strong></span>
            </div>
          </div>

          {results && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-500 block mb-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Hypothetical Investment
                </span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{currency}{results.investedVal}</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-500 block mt-0.5">8% compound growth</span>
              </div>

              <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-500 block mb-1">Cigarettes Inhaled</span>
                <span className="text-xl font-bold text-white">{results.totalCigs}</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-500 block mt-0.5">Total sticks smoked</span>
              </div>

              <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-500 block mb-1 flex items-center gap-1">
                  <HeartCrack className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Health effects
                </span>
                <span className="text-xl font-bold text-rose-600 dark:text-rose-400">Not predicted</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-500 block mt-0.5">Cost totals do not predict individual lifespan.</span>
              </div>
            </div>
          )}

          {results && (
            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Financial Impact'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

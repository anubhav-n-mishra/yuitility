import React, { useState } from 'react';
import { Activity, Copy, Check, ShieldAlert } from 'lucide-react';

interface WaistHipRatioCalculatorProps {
  onCopy?: (text: string) => void;
  onShare?: (title: string, path: string) => void;
}

export default function WaistHipRatioCalculator({ onCopy }: WaistHipRatioCalculatorProps) {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [waist, setWaist] = useState<string>('82');
  const [hip, setHip] = useState<string>('96');
  const [copied, setCopied] = useState<boolean>(false);

  const w = parseFloat(waist);
  const h = parseFloat(hip);

  const isValid = !isNaN(w) && !isNaN(h) && w > 0 && h > 0;

  const results = (() => {
    if (!isValid) return null;

    const ratio = w / h;

    let riskLevel = '';
    let riskColor = '';
    let bodyShape = '';

    if (gender === 'male') {
      if (ratio < 0.9) {
        riskLevel = 'Low Risk';
        riskColor = 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-950/40';
        bodyShape = 'Pear Shape (Lower visceral fat)';
      } else if (ratio < 1.0) {
        riskLevel = 'Moderate Risk';
        riskColor = 'text-amber-400 border-amber-500/30 bg-amber-950/40';
        bodyShape = 'Moderate Central Distribution';
      } else {
        riskLevel = 'High Risk (Abdominal Obesity)';
        riskColor = 'text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-950/40';
        bodyShape = 'Apple Shape (Elevated visceral fat)';
      }
    } else {
      if (ratio < 0.8) {
        riskLevel = 'Low Risk';
        riskColor = 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-950/40';
        bodyShape = 'Pear Shape (Lower visceral fat)';
      } else if (ratio < 0.85) {
        riskLevel = 'Moderate Risk';
        riskColor = 'text-amber-400 border-amber-500/30 bg-amber-950/40';
        bodyShape = 'Moderate Central Distribution';
      } else {
        riskLevel = 'High Risk (Abdominal Obesity)';
        riskColor = 'text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-950/40';
        bodyShape = 'Apple Shape (Elevated visceral fat)';
      }
    }

    return {
      ratio: ratio.toFixed(2),
      riskLevel,
      riskColor,
      bodyShape,
    };
  })();

  const handleCopy = () => {
    if (!results) return;
    const text = `Waist-to-Hip Ratio: ${results.ratio} (${results.riskLevel}, ${results.bodyShape})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onCopy) onCopy(text);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Unit & Gender Switchers */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900/60 shadow-sm p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setGender('male')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
              gender === 'male' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-white'
            }`}
          >
            Male
          </button>
          <button
            type="button"
            onClick={() => setGender('female')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
              gender === 'female' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-white'
            }`}
          >
            Female
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setUnit('metric')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              unit === 'metric' ? 'bg-zinc-200 dark:bg-zinc-700 text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'
            }`}
          >
            Metric (cm)
          </button>
          <button
            type="button"
            onClick={() => setUnit('imperial')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              unit === 'imperial' ? 'bg-zinc-200 dark:bg-zinc-700 text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'
            }`}
          >
            Imperial (inches)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Circumference Measurements</h3>

          <div>
            <label className="text-xs text-zinc-700 dark:text-zinc-300 block mb-1">
              Waist Circumference ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-2xl font-bold font-mono text-white focus:outline-none focus:border-indigo-500"
            />
            <span className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-1 block">
              Measure at the narrowest point, usually just above the belly button.
            </span>
          </div>

          <div>
            <label className="text-xs text-zinc-700 dark:text-zinc-300 block mb-1">
              Hip Circumference ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-2xl font-bold font-mono text-white focus:outline-none focus:border-indigo-500"
            />
            <span className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-1 block">
              Measure at the widest part of the buttocks.
            </span>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
              Waist-to-Hip Ratio (WHR)
            </span>
            <div className="text-5xl font-black font-mono text-white my-2">
              {results ? results.ratio : '—'}
            </div>

            {results && (
              <div className="space-y-3 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className={`p-3 rounded-xl border text-xs font-semibold ${results.riskColor}`}>
                  WHO Health Risk: {results.riskLevel}
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800/80 text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                  <span>Body Phenotype: </span>
                  <strong className="text-white">{results.bodyShape}</strong>
                </div>

                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {gender === 'male'
                    ? 'WHO standards for men: Normal is < 0.90; ≥ 1.0 indicates elevated cardiovascular risk.'
                    : 'WHO standards for women: Normal is < 0.80; ≥ 0.85 indicates elevated cardiovascular risk.'}
                </div>
              </div>
            )}
          </div>

          {results && (
            <button
              type="button"
              onClick={handleCopy}
              className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy WHR Assessment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

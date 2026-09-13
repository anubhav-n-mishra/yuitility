import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';

interface PasswordStrengthCheckerProps {
  onCopy?: (text: string) => void;
}

export default function PasswordStrengthChecker({ onCopy }: PasswordStrengthCheckerProps) {
  const [password, setPassword] = useState('P@ssw0rd2026!');
  const [showPassword, setShowPassword] = useState(false);

  const evaluateStrength = () => {
    let score = 0;
    if (!password) return { score: 0, label: 'Empty', color: 'bg-zinc-200 dark:bg-zinc-700', text: 'text-zinc-500 dark:text-zinc-400' };

    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 20;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[a-z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;

    if (score < 40) return { score, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' };
    if (score < 75) return { score, label: 'Moderate', color: 'bg-amber-500', text: 'text-amber-400' };
    return { score, label: 'Strong & Secure', color: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' };
  };

  const res = evaluateStrength();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Password Audit Input</h3>
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">🔒 Evaluated 100% locally</span>
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type or paste password..."
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 pr-10"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:text-zinc-200"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Security Rating</span>
          <span className={`text-sm font-bold ${res.text}`}>{res.label} ({res.score}%)</span>
        </div>

        <div className="w-full bg-zinc-50 dark:bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 p-0.5">
          <div className={`h-full rounded-full transition-all duration-300 ${res.color}`} style={{ width: `${res.score}%` }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className={`p-3 rounded-xl border ${password.length >= 12 ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>
            ✓ 12+ Characters
          </div>
          <div className={`p-3 rounded-xl border ${/[A-Z]/.test(password) ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>
            ✓ Uppercase Letter
          </div>
          <div className={`p-3 rounded-xl border ${/[0-9]/.test(password) ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>
            ✓ Numbers Included
          </div>
          <div className={`p-3 rounded-xl border ${/[^A-Za-z0-9]/.test(password) ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>
            ✓ Special Symbols
          </div>
        </div>
      </div>
    </div>
  );
}

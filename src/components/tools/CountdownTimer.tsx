import React, { useState, useEffect } from 'react';
import { Calendar, Timer, Copy, Check } from 'lucide-react';

interface CountdownTimerProps {
  onCopy?: (text: string) => void;
}

export default function CountdownTimer({ onCopy }: CountdownTimerProps) {
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 16);
  });
  const [eventName, setEventName] = useState('New Year / Big Launch');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    if (onCopy) onCopy(url);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Calendar className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Event Target Setup</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Event Title / Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Target Date & Time</label>
            <input
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Timer className="w-5 h-5" />
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">{eventName || 'Event Countdown'}</h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-4xl md:text-5xl font-bold font-mono text-indigo-600 dark:text-indigo-400">{timeLeft.days}</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-1 uppercase tracking-wider font-medium">Days</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-4xl md:text-5xl font-bold font-mono text-cyan-400">{timeLeft.hours}</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-1 uppercase tracking-wider font-medium">Hours</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-4xl md:text-5xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{timeLeft.minutes}</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-1 uppercase tracking-wider font-medium">Minutes</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-4xl md:text-5xl font-bold font-mono text-amber-400">{timeLeft.seconds}</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-1 uppercase tracking-wider font-medium">Seconds</span>
          </div>
        </div>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-xl transition"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />} Share Countdown Page
        </button>
      </div>
    </div>
  );
}

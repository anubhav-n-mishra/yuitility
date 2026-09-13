import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, Bell } from 'lucide-react';

interface PomodoroTimerProps {
  onCopy?: (text: string) => void;
}

export default function PomodoroTimer({ onCopy }: PomodoroTimerProps) {
  const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const modeDurations = {
    work: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  };

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'work') {
        setCompletedSessions((prev) => prev + 1);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const handleModeChange = (newMode: 'work' | 'short' | 'long') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(modeDurations[newMode]);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modeDurations[mode]);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const pct = Math.round(((modeDurations[mode] - timeLeft) / modeDurations[mode]) * 100);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center space-y-6">
        <div className="flex justify-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => handleModeChange('work')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${mode === 'work' ? 'bg-indigo-600 text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'}`}
          >
            Focus Work (25m)
          </button>
          <button
            onClick={() => handleModeChange('short')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${mode === 'short' ? 'bg-emerald-600 text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'}`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => handleModeChange('long')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${mode === 'long' ? 'bg-cyan-600 text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'}`}
          >
            Long Break (15m)
          </button>
        </div>

        <div className="relative py-8 flex flex-col items-center justify-center">
          <span className="text-6xl md:text-7xl font-bold font-mono text-white tracking-wider">
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-3 font-semibold">
            {mode === 'work' ? '🎯 Stay Focused' : '☕ Take a Rest'}
          </span>
        </div>

        <div className="w-full bg-zinc-50 dark:bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
          <div
            className={`h-full transition-all duration-500 ${mode === 'work' ? 'bg-indigo-500' : mode === 'short' ? 'bg-emerald-500' : 'bg-cyan-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex justify-center items-center gap-4 pt-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm transition flex items-center gap-2 shadow-lg ${
              isRunning ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause Timer' : 'Start Focus'}
          </button>
          <button
            onClick={resetTimer}
            className="p-3.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-2xl transition"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
          <span>Completed Pomodoros: <strong className="text-indigo-600 dark:text-indigo-400">{completedSessions}</strong></span>
          <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400"><Bell className="w-3.5 h-3.5" /> Client-Side Audio Alert</span>
        </div>
      </div>
    </div>
  );
}

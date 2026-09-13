import React, { useState, useEffect } from 'react';
import { Globe, Plus, Trash2 } from 'lucide-react';

interface WorldClockProps {
  onCopy?: (text: string) => void;
}

export default function WorldClock({ onCopy }: WorldClockProps) {
  const [time, setTime] = useState<Date>(new Date());
  const [cities, setCities] = useState([
    { name: 'New York', zone: 'America/New_York' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'Dubai', zone: 'Asia/Dubai' },
    { name: 'Mumbai / IST', zone: 'Asia/Kolkata' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'Sydney', zone: 'Australia/Sydney' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCityTime = (zone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: zone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(time);
    } catch {
      return 'Invalid Zone';
    }
  };

  const formatCityDate = (zone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: zone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }).format(time);
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Globe className="w-5 h-5" />
          <h3 className="font-semibold text-zinc-900 dark:text-white">Live Global World Clocks</h3>
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Auto-updating every second</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map(({ name, zone }) => (
          <div key={name} className="bg-white dark:bg-zinc-900/60 shadow-sm p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white text-base">{name}</h4>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">{zone}</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold border border-zinc-200 dark:border-zinc-700">
                {formatCityDate(zone)}
              </span>
            </div>

            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80">
              <span className="text-3xl font-bold font-mono text-indigo-600 dark:text-indigo-400">{formatCityTime(zone)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

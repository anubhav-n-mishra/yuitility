"use client";
import { useId } from 'react';

export function NumberField({ label, value, onChange, min = 0, max, step = 'any', hint }: {label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: string | number; hint?: string}) {
  const id = useId();
  return <div className="space-y-1.5 min-w-0"><label htmlFor={id} className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">{label}</label><input id={id} type="number" inputMode="decimal" min={min} max={max} step={step} value={Number.isFinite(value) ? value : ''} onChange={e => onChange(e.target.value === '' ? NaN : Number(e.target.value))} aria-describedby={hint ? `${id}-hint` : undefined} className="w-full min-h-11 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-zinc-950 dark:text-zinc-50 focus-visible:outline-2 focus-visible:outline-blue-600" />{hint && <p id={`${id}-hint`} className="text-xs text-zinc-600 dark:text-zinc-400">{hint}</p>}</div>;
}
export function ResultRow({label, value}: {label: string; value: string}) {return <div className="flex justify-between gap-4 py-2 border-b border-zinc-200 dark:border-zinc-800 text-sm"><dt className="text-zinc-600 dark:text-zinc-400">{label}</dt><dd className="font-semibold text-right tabular-nums break-words">{value}</dd></div>;}
export const inputPanel = 'space-y-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6';
export const resultPanel = 'space-y-4 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-zinc-900 p-5 sm:p-6 min-w-0';
export function ErrorNotice({children}: {children: React.ReactNode}) {return <p role="alert" className="rounded-xl border border-red-300 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200 p-4 text-sm">{children}</p>;}

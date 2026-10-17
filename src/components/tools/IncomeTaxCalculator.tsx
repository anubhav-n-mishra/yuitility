"use client";
import { useState } from 'react';
import { indiaSalaryTax, INDIA_TAX_YEAR, INDIA_TAX_SOURCE } from '@/src/lib/calculations';
import { formatCurrency } from '@/src/lib/currency';
import { NumberField, ResultRow, ErrorNotice, inputPanel, resultPanel } from './CalculatorFields';
export default function IncomeTaxCalculator() {
  const [gross, setGross] = useState(1500000);
  const [resident, setResident] = useState(true);
  const fmt = (n: number) => formatCurrency(n, 'INR');
  let result: ReturnType<typeof indiaSalaryTax> | undefined; let error = '';
  try { result = indiaSalaryTax(gross, resident); } catch(e) {error = (e as Error).message;}
  return <div className="space-y-6"><div><h2 className="text-xl font-bold">India salary income tax</h2><p className="text-sm text-zinc-600 dark:text-zinc-400">{INDIA_TAX_YEAR} · New regime · INR</p></div><div className="grid gap-6 md:grid-cols-2"><div className={inputPanel}>
  <NumberField label="Annual gross salary including bonus (₹)" value={gross} onChange={setGross} max={5000000} hint="Gross salary, not CTC. The ₹75,000 standard deduction is applied automatically." />
  <label className="flex items-center gap-3 text-sm"><input className="h-5 w-5" type="checkbox" checked={resident} onChange={e=>setResident(e.target.checked)}/>Resident individual eligible for Section 87A</label>
  <p className="text-sm text-zinc-600 dark:text-zinc-400">Salary-only income up to ₹50 lakh. Excludes special-rate income, surcharge, old-regime deductions and employer NPS. This is an estimate, not a tax return.</p><a className="underline text-sm text-blue-700 dark:text-blue-300" href={INDIA_TAX_SOURCE}>Official AY 2026–27 rules</a></div>
  <div className={resultPanel}>{error ? <ErrorNotice>{error}</ErrorNotice> : result && <><p className="text-sm font-semibold">Annual income tax including cess</p><p className="text-3xl font-bold">{fmt(result.tax)}</p><dl><ResultRow label="Standard deduction" value={fmt(result.deduction)} /><ResultRow label="Taxable income" value={fmt(result.taxable)} /><ResultRow label="Tax before rebate" value={fmt(result.beforeRebate)} /><ResultRow label="Section 87A rebate" value={fmt(result.rebate)} /><ResultRow label="Marginal relief" value={fmt(result.marginalRelief)} /><ResultRow label="Health and education cess (4%)" value={fmt(result.cess)} /><ResultRow label="Salary after income tax (before payroll deductions)" value={fmt(gross-result.tax)} /></dl></>}</div></div>
  {result && <div className="overflow-x-auto"><table className="w-full text-sm text-left"><caption className="text-left font-semibold mb-3">Slab-by-slab tax before rebate</caption><thead><tr><th className="p-2">Taxable income band</th><th className="p-2">Rate</th><th className="p-2 text-right">Tax</th></tr></thead><tbody>{result.slabs.map(s=><tr key={s.lower} className="border-t border-zinc-200 dark:border-zinc-800"><td className="p-2">{fmt(s.lower)} – {Number.isFinite(s.upper) ? fmt(s.upper) : 'above'}</td><td className="p-2">{s.rate*100}%</td><td className="p-2 text-right">{fmt(s.amount)}</td></tr>)}</tbody></table></div>}</div>;
}

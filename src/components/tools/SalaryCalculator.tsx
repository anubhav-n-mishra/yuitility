"use client";
import { useState } from 'react';
import { salaryBreakdown, INDIA_TAX_YEAR, INDIA_TAX_SOURCE } from '@/src/lib/calculations';
import { formatCurrency } from '@/src/lib/currency';
import { NumberField, ResultRow, ErrorNotice, inputPanel, resultPanel } from './CalculatorFields';
interface Props { onCopy?: (s: string) => void; onShare?: (t: string, p: string) => void; initialCurrency?: string; initialCtc?: number; initialBasicPercentage?: number; }
export default function SalaryCalculator({onCopy, initialCtc = 1200000, initialBasicPercentage = 50}: Props) {
  const [ctc, setCtc] = useState(initialCtc);
  const [basic, setBasic] = useState(initialBasicPercentage);
  const [bonus, setBonus] = useState(100000);
  const [pf, setPf] = useState(true);
  const [pt, setPt] = useState(2500);
  const [other, setOther] = useState(0);
  const [resident, setResident] = useState(true);
  const fmt = (n: number) => formatCurrency(n, 'INR');
  let result: ReturnType<typeof salaryBreakdown> | undefined;
  let error = '';
  try {
    if (![ctc,basic,bonus,pt,other].every(Number.isFinite) || Math.min(ctc,basic,bonus,pt,other) < 0 || basic > 100 || pt > 2500) throw new Error('Enter valid non-negative amounts, basic pay up to 100%, and annual professional tax up to ₹2,500.');
    result = salaryBreakdown(ctc,basic,bonus,pf,pt,other,resident);
    if (result.monthly < 0) {result = undefined; throw new Error('Deductions and bonus exceed the available regular salary. Check these amounts.');}
  } catch(e) { error = (e as Error).message; }
  return <div className="space-y-6"><div><h2 className="text-xl font-bold">India salary estimate</h2><p className="text-sm text-zinc-600 dark:text-zinc-400">{INDIA_TAX_YEAR} · New regime · INR</p></div>
    <div className="grid gap-6 lg:grid-cols-2"><div className={inputPanel}>
      <NumberField label="Annual CTC (₹)" value={ctc} onChange={setCtc} max={5000000} hint="Includes employer EPF and bonus; excludes other employer benefits from this simplified model." />
      <NumberField label="Basic salary (% of CTC)" value={basic} onChange={setBasic} max={100} />
      <NumberField label="Annual bonus included in CTC (₹)" value={bonus} onChange={setBonus} hint="Taxable. Paid separately from the regular monthly salary shown." />
      <label className="flex gap-3 text-sm items-center"><input type="checkbox" checked={pf} onChange={e=>setPf(e.target.checked)} className="h-5 w-5" /> Include employer and employee EPF, each 12% of basic capped at ₹1,800/month</label>
      <NumberField label="Annual professional tax (₹)" value={pt} onChange={setPt} max={2500} hint="State-dependent: enter 0 where not applicable. Deducted from pay, not the new-regime taxable base." />
      <NumberField label="Other monthly payroll deductions (₹)" value={other} onChange={setOther} />
      <label className="flex gap-3 text-sm items-center"><input type="checkbox" checked={resident} onChange={e=>setResident(e.target.checked)} className="h-5 w-5" /> Resident individual eligible for Section 87A rebate</label>
      <button className="min-h-11 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700" onClick={()=>{setCtc(initialCtc);setBasic(initialBasicPercentage);setBonus(100000);setPf(true);setPt(2500);setOther(0);setResident(true);}}>Reset this scenario</button>
    </div><div className={resultPanel}>{error ? <ErrorNotice>{error}</ErrorNotice> : result && <><p className="text-sm font-semibold">Regular monthly take-home</p><p className="text-3xl font-bold tabular-nums break-words">{fmt(result.monthly)}</p><p className="text-sm text-zinc-600 dark:text-zinc-400">Bonus is paid separately. Annual tax is spread equally over 12 months.</p><dl>
      <ResultRow label="Annual take-home including bonus" value={fmt(result.annualNet)} />
      <ResultRow label="Annual gross including bonus" value={fmt(result.gross)} />
      <ResultRow label="Employer EPF inside CTC" value={fmt(result.employerPF)} />
      <ResultRow label="Employee EPF per month" value={fmt(result.employeePF/12)} />
      <ResultRow label="Professional tax per month (average)" value={fmt(pt/12)} />
      <ResultRow label="Taxable salary after standard deduction" value={fmt(result.taxable)} />
      <ResultRow label="Rebate / marginal relief" value={fmt(result.rebate+result.marginalRelief)} />
      <ResultRow label="Annual income tax including 4% cess" value={fmt(result.tax)} />
      <ResultRow label="Monthly income tax" value={fmt(result.tax/12)} /></dl>
      {onCopy && <button className="min-h-11 px-4 rounded-xl bg-blue-700 text-white" onClick={()=>onCopy(`${INDIA_TAX_YEAR}, new regime. CTC ${fmt(ctc)}; regular monthly net ${fmt(result!.monthly)}; annual net including bonus ${fmt(result!.annualNet)}; annual tax ${fmt(result!.tax)}.`)}>Copy estimate</button>}</>}</div></div>
    <p className="text-sm text-zinc-600 dark:text-zinc-400">Salary-only estimate up to ₹50 lakh gross. No special-rate income, surcharge, employer NPS, gratuity or other benefits modeled. Employee EPF and bonus are not subtracted from taxable salary. Confirm the CTC structure with payroll. <a href={INDIA_TAX_SOURCE} target="_blank" rel="noreferrer" className="underline text-blue-700 dark:text-blue-300">Income Tax Department: AY 2026–27</a>.</p>
  </div>;
}

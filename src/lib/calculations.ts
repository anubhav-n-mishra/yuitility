/** Explicit, versioned models. Sources and limitations are displayed by their UIs. */
export const INDIA_TAX_YEAR = 'FY 2025–26 / AY 2026–27';
export const INDIA_TAX_SOURCE = 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1';
export const IRS_2026_SOURCE = 'https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500';

export function indiaSalaryTax(gross: number, resident = true) {
  if (!Number.isFinite(gross) || gross < 0 || gross > 5_000_000) throw new RangeError('Enter gross salary from ₹0 to ₹50 lakh. Surcharge cases are outside this model.');
  const deduction = Math.min(gross, 75_000);
  const taxable = Math.max(0, gross - deduction);
  const bands = [0, 400_000, 800_000, 1_200_000, 1_600_000, 2_000_000, 2_400_000];
  const rates = [0, .05, .10, .15, .20, .25, .30];
  const slabs = bands.map((lower, i) => ({lower, upper: bands[i + 1] ?? Infinity, rate: rates[i], amount: Math.max(0, Math.min(taxable, bands[i + 1] ?? Infinity) - lower) * rates[i]}));
  const beforeRebate = slabs.reduce((sum, slab) => sum + slab.amount, 0);
  const rebate = resident && taxable <= 1_200_000 ? beforeRebate : 0;
  // Section 87A marginal relief: income immediately above ₹12 lakh.
  const marginalRelief = resident && taxable > 1_200_000 ? Math.max(0, beforeRebate - (taxable - 1_200_000)) : 0;
  const afterRelief = beforeRebate - rebate - marginalRelief;
  const cess = afterRelief * .04;
  return { taxable, deduction, slabs, beforeRebate, rebate, marginalRelief, cess, tax: afterRelief + cess };
}

export function salaryBreakdown(ctc: number, basicPercent: number, bonus: number, pf: boolean, professionalTax: number, otherMonthly: number, resident = true) {
  const employerPF = pf ? Math.min(ctc * basicPercent / 100 * .12, 21_600) : 0;
  const gross = ctc - employerPF;
  if (bonus > gross) throw new RangeError('Bonus cannot exceed gross salary after employer EPF.');
  const tax = indiaSalaryTax(gross, resident);
  const annualNet = gross - employerPF - professionalTax - otherMonthly * 12 - tax.tax;
  return { ...tax, gross, employerPF, employeePF: employerPF, annualNet, monthly: (annualNet - bonus) / 12 };
}

export function payment(principal: number, monthlyRate: number, months: number) {
  if (months <= 0 || principal < 0 || monthlyRate < 0) throw new RangeError('Invalid loan inputs');
  return monthlyRate === 0 ? principal / months : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
}

export function vaFundingRate(downPercent: number, subsequent: boolean, exempt: boolean) {
  return exempt ? 0 : downPercent >= 10 ? .0125 : downPercent >= 5 ? .015 : subsequent ? .033 : .0215;
}

export function accumulation(balance: number, annualContribution: number, ratePercent: number, years: number) {
  const rate = ratePercent / 100;
  return balance * Math.pow(1 + rate, years) + annualContribution * (rate === 0 ? years : (Math.pow(1 + rate, years) - 1) / rate);
}

export function retirementTarget(monthlyExpenses: number, inflation: number, yearsToRetire: number, retirementYears: number, returnPercent: number) {
  const annual = monthlyExpenses * 12 * Math.pow(1 + inflation / 100, yearsToRetire);
  const real = (1 + returnPercent / 100) / (1 + inflation / 100) - 1;
  // Beginning-of-year spending; handles zero and negative real returns.
  return annual * (Math.abs(real) < 1e-10 ? retirementYears : (1 - Math.pow(1 + real, -retirementYears)) / real * (1 + real));
}

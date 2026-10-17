/** Reject partial tokens ("12abc"), blanks and non-finite numeric datasets. */
export function numericDataset(text: string): number[] {
  const tokens = text.trim().split(/[\s,;]+/).filter(Boolean);
  const values = tokens.map(Number);
  return values.every(Number.isFinite) ? values : [];
}

/** Exact arbitrary precision integer parsing, without parseInt's partial acceptance. */
export function integerInBase(text: string, base: number): bigint | null {
  const value = text.trim();
  if (!Number.isInteger(base) || base < 2 || base > 36 || !/^[+-]?[0-9a-z]+$/i.test(value) || value.length > 4096) return null;
  const negative = value.startsWith('-');
  let result = 0n;
  for (const char of value.replace(/^[+-]/, '').toLowerCase()) {
    const digit = '0123456789abcdefghijklmnopqrstuvwxyz'.indexOf(char);
    if (digit >= base) return null;
    result = result * BigInt(base) + BigInt(digit);
  }
  return negative ? -result : result;
}

/** Unique annual IRR for conventional flows; ambiguous sign changes are out of scope. */
export function conventionalIrr(outflow: number, inflows: number[]): number | null {
  if (!Number.isFinite(outflow) || outflow <= 0 || !inflows.every(v=>Number.isFinite(v)&&v>=0) || !inflows.some(v=>v>0)) return null;
  const npv = (rate: number) => inflows.reduce((value,cash,i)=>value+cash/Math.pow(1+rate,i+1),-outflow);
  let low = -0.999999999, high = 1;
  while (npv(high)>0 && high<1e12) high=high*2+1;
  if (npv(low)<0 || npv(high)>0) return null;
  for (let i=0;i<160;i++) {
    const middle=(low+high)/2;
    if(npv(middle)>0) low=middle; else high=middle;
  }
  return (low+high)/2*100;
}

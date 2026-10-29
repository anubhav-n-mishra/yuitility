import { integerInBase } from './numeric';

export type BaseConversion = {
  value: string;
  exact: boolean;
  repeating: boolean;
};

/** Convert a finite radix input using integer arithmetic, including its fraction. */
export function convertNumberBase(input: string, from: number, to: number, limit = 32): BaseConversion | null {
  const text = input.trim();
  if (text.length > 4096 || !Number.isInteger(from) || from < 2 || from > 36 ||
      !Number.isInteger(to) || to < 2 || to > 36 || !Number.isInteger(limit) || limit < 1 || limit > 256) return null;
  const match = /^([+-]?)([0-9a-z]*)(?:\.([0-9a-z]+))?$/i.exec(text);
  if (!match || (!match[2] && !match[3])) return null;
  const fraction = match[3] ?? '';
  const numerator = integerInBase((match[2] || '0') + fraction, from);
  if (numerator === null) return null;
  const denominator = BigInt(from) ** BigInt(fraction.length);
  const sign = match[1] === '-' && numerator !== 0n ? '-' : '';
  const whole = (numerator / denominator).toString(to).toUpperCase();
  let remainder = numerator % denominator;
  let digits = '';
  const seen = new Map<bigint, number>();
  while (remainder !== 0n) {
    const cycle = seen.get(remainder);
    if (cycle !== undefined) {
      return { value: `${sign}${whole}.${digits.slice(0, cycle)}(${digits.slice(cycle)})`, exact: true, repeating: true };
    }
    if (digits.length >= limit) {
      return { value: `${sign}${whole}.${digits}…`, exact: false, repeating: false };
    }
    seen.set(remainder, digits.length);
    remainder *= BigInt(to);
    digits += (remainder / denominator).toString(to).toUpperCase();
    remainder %= denominator;
  }
  return { value: `${sign}${whole}${digits ? '.' + digits : ''}`, exact: true, repeating: false };
}

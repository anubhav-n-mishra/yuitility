/** Uniform bounded CSPRNG draw via rejection sampling (no modulo bias). */
export function secureIndex(maximum: number): number {
  if(!Number.isInteger(maximum)||maximum<1||maximum>0x100000000) throw new RangeError('Invalid random range');
  const limit=Math.floor(0x100000000/maximum)*maximum;
  const word=new Uint32Array(1);
  do {crypto.getRandomValues(word);} while(word[0]>=limit);
  return word[0]%maximum;
}

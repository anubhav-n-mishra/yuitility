/** Bounded, strict 1-based page ranges. Invalid tokens reject the selection. */
export function pageSelection(text: string, maximum: number): number[] {
  if(!Number.isInteger(maximum)||maximum<1||text.length>10000)return [];
  const selected=new Set<number>();
  for(const raw of text.split(',')){
    const token=raw.trim();if(!token)continue;
    const match=/^(\d+)(?:\s*-\s*(\d+))?$/.exec(token);
    if(!match)return [];
    const first=Number(match[1]),last=Number(match[2]??match[1]);
    if(!Number.isSafeInteger(first)||!Number.isSafeInteger(last)||first<1||last<first||last>maximum)return [];
    for(let page=first;page<=last;page++)selected.add(page);
  }
  return [...selected].sort((a,b)=>a-b);
}

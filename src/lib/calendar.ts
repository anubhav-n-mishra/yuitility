export function calendarDate(value: string): Date {
  const date = new Date(value+'T00:00:00Z');
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(+date) && date.toISOString().slice(0,10)===value ? date : new Date(NaN);
}

/** Add calendar months, clamping to the last day instead of overflowing into March. */
export function addCalendarMonths(date: Date, months: number): Date {
  const result = new Date(date);
  const day = result.getUTCDate();
  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth()+months);
  const last = new Date(Date.UTC(result.getUTCFullYear(),result.getUTCMonth()+1,0)).getUTCDate();
  result.setUTCDate(Math.min(day,last));
  return result;
}

export function calendarDifference(start: Date, end: Date) {
  let months=(end.getUTCFullYear()-start.getUTCFullYear())*12+end.getUTCMonth()-start.getUTCMonth();
  if(addCalendarMonths(start,months)>end) months--;
  const anchor=addCalendarMonths(start,months);
  return {years:Math.floor(months/12),months:months%12,days:Math.round((+end-+anchor)/86400000)};
}

/** Resolve a wall-clock input independently of the device time zone.
 * DST gaps and repeated times are rejected, rather than silently choosing an instant.
 */
export function zonedWallTime(date: string, time: string, zone: string): Date {
  if(!/^\d{2}:\d{2}$/.test(time) || !Number.isFinite(+calendarDate(date))) return new Date(NaN);
  const [hour,minute]=time.split(':').map(Number);
  if(hour>23||minute>59) return new Date(NaN);
  const desired=+new Date(`${date}T${time}:00Z`);
  try {
    const formatter=new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
    const wall=(instant:number)=>{
      const p=Object.fromEntries(formatter.formatToParts(new Date(instant)).map(p=>[p.type,p.value]));
      return Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);
    };
    const offsets=new Set([-36,-12,0,12,36].map(h=>{const instant=desired+h*3600000;return wall(instant)-instant;}));
    const matches=[...offsets].map(offset=>desired-offset).filter(instant=>wall(instant)===desired);
    return matches.length===1 ? new Date(matches[0]) : new Date(NaN);
  }catch{return new Date(NaN);}
}

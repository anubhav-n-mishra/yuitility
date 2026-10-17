const assert=require('node:assert/strict');
module.exports=async({check,fixture,close,equal})=>{
  // Reproducible independent algebraic identities, not snapshots of defaults.
  let seed=0x71c2b8a9;
  const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};
  for(let index=0;index<40;index++){
    const a=Math.floor(random()*10000)-5000;
    let b=Math.floor(random()*1000)-500;if(!b)b=1;
    await check('ModCalculator',`seeded Euclidean division ${index}`,{dividend:a,divisor:b},v=>{const r=v.moduloResult;close(b*r.quotient+r.remainder,a);assert.ok(r.remainder>=0&&r.remainder<Math.abs(b));});
    const size=index%2?2:3;
    const matrix=Array.from({length:size},(_,r)=>Array.from({length:size},(_,c)=>r===c?10+Math.floor(random()*10):Math.floor(random()*5)));
    const identity=Array.from({length:size},(_,r)=>Array.from({length:size},(_,c)=>r===c?1:0));
    await check('MatrixCalculator',`matrix identity ${index}`,{size,matA:matrix,matB:identity},v=>equal(v.multMat,matrix));
    const values=Array.from({length:7},()=>Math.floor(random()*100));const shifted=values.map(v=>v+1000);
    await check('StandardDeviationCalculator',`translation invariance ${index}`,{inputData:shifted.join(',')},v=>{
      const pairwise=values.flatMap(a=>values.map(b=>(a-b)**2)).reduce((a,b)=>a+b,0)/(2*values.length**2);
      close(v.stats.popVariance,pairwise,1e-8);
    });
    const positive=Math.floor(random()*100000)+1;const final=positive*(1+(index-20)/100);
    await check('RoiCalculator',`gain/loss identity ${index}`,{initialInvestment:positive,finalValue:final},v=>close(v.stats.roiPercent,index-20,1e-8));
  }
  let fact=1n;
  for(let n=0;n<=40;n++){
    if(n>0)fact*=BigInt(n);
    await fixture('FactorialCalculator',{nVal:String(n)},{'result.exact':String(fact)});
  }
  for(const [expression,value]of [
    ['-2^2',-4],['2^3^2',512],['2π',2*Math.PI],['(3+2)!',120],['20%',.2],['1e-20',1e-20],['sin(π/2)',1],['pow(2,10)',1024],['0!',1],['cos(0)',1],['ln(e)',1],
  ])await check('ScientificCalculator','expression grammar '+expression,{display:expression,isRad:true},(v,t)=>{v.handleEquals();const actual=t.render().values.display;close(actual,value,Math.abs(value)*1e-11+1e-30);});
  for(const expression of ['1/0','sqrt(-1)','5.5!','(1+2','constructor(1)','171!'])await check('ScientificCalculator','undefined expression '+expression,{display:expression},(v,t)=>{v.handleEquals();equal(t.render().values.display,'Error');});
  for(const [category,from,to,value,expected]of [
    ['Data','Kilobyte','Byte','1',1000],['Data','Kibibyte','Byte','1',1024],['Data','Mebibyte','Kibibyte','1',1024],
    ['Weight','Pound','Gram','1',453.59237],['Length','Mile','Meter','1',1609.344],['Temperature','Kelvin','Celsius','273.15',0],['Temperature','Fahrenheit','Celsius','-40',-40],
  ])await check('UnitConverter',`exact unit vector ${from}/${to}`,{category,fromUnit:from,toUnit:to,inputValue:value},v=>close(v.result,expected,.000001));
  for(const [start,end,days]of [['2024-02-28','2024-03-01',2],['2023-02-28','2023-03-01',1],['2024-12-31','2025-01-01',1],['2000-02-28','2000-03-01',2],['1900-02-28','1900-03-01',1]])await check('DateDifferenceCalculator','Gregorian leap/boundary '+start,{startDate:start,endDate:end},v=>{equal(v.diffResult.totalDays,days);equal(v.diffResult.workingDays+v.diffResult.weekendDays,days);assert.ok(v.diffResult.days>=0);});
  for(const [date,time,zone,iso]of [['2026-01-01','12:00','Asia/Kolkata','2026-01-01T06:30:00.000Z'],['2026-07-01','12:00','America/New_York','2026-07-01T16:00:00.000Z'],['2026-01-01','12:00','America/New_York','2026-01-01T17:00:00.000Z'],['2026-01-01','12:00','Australia/Sydney','2026-01-01T01:00:00.000Z']])await check('TimeZoneConverter','zone offset vector '+zone+'/'+date,{selectedDate:date,selectedTime:time,baseTz:zone},v=>equal(v.baseDateTime.toISOString(),iso));
  await check('PdfSplitter','huge and partial ranges reject promptly',{},v=>{equal(v.parsePageRange('1-999999999999',3),[]);equal(v.parsePageRange('2abc',3),[]);});
  await check('OhmsLawCalculator','zero current has no finite inferred resistance',{voltage:'12'},(v,t)=>{v.calculateOhm('I','0');const r=t.render().values;equal(r.resistance,'Undefined');equal(r.power,'0.00');});
};

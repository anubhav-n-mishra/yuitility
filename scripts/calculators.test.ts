import test from 'node:test';
import assert from 'node:assert/strict';
import { indiaSalaryTax, salaryBreakdown, payment, vaFundingRate, accumulation, retirementTarget } from '../src/lib/calculations';
import { academicPercentage } from '../src/lib/academic';
import { encryptText, decryptText } from '../src/lib/textCrypto';
import { readJpegExif } from '../src/lib/exif';
import { jsonToCsv } from '../src/lib/csv';
import { BLOG_POSTS, readingTime } from '../src/lib/blogs';
import { LIVE_TOOLS, RELATED_TOOLS } from '../src/lib/toolRegistry';
import { getAllToolPresets } from '../src/lib/toolPresets';
import { CATEGORY_META } from '../src/lib/site';
import { convertNumberBase } from '../src/lib/numberBase';
import sitemap from '../src/app/sitemap';
import { POST as aiPost } from '../src/app/api/ai/route';
import { POST as contactPost } from '../src/app/api/contact/route';

const close = (actual:number, expected:number, tolerance=.001) => assert.ok(Math.abs(actual-expected)<tolerance, `${actual} != ${expected}`);

test('Radix fractions preserve exact finite and repeating values', () => {
  assert.deepEqual(convertNumberBase('85.65', 10, 8), {value:'125.5(1463)',exact:true,repeating:true});
  assert.deepEqual(convertNumberBase('-10.5', 10, 16), {value:'-A.8',exact:true,repeating:false});
  assert.equal(convertNumberBase('0.F', 16, 10)?.value, '0.9375');
  assert.equal(convertNumberBase('.1', 2, 10)?.value, '0.5');
  assert.equal(convertNumberBase('0.125', 10, 8)?.value, '0.1');
  assert.equal(convertNumberBase('-0.0', 10, 2)?.value, '0');
  assert.equal(convertNumberBase('0.1', 3, 10)?.value, '0.(3)');
});

test('Radix integer results retain precision above Number and 64-bit limits', () => {
  assert.equal(convertNumberBase('9007199254740993', 10, 16)?.value, '20000000000001');
  assert.equal(convertNumberBase('18446744073709551616', 10, 16)?.value, '10000000000000000');
  for (const base of [2, 8, 10, 16, 36]) {
    const original = '-123456789012345678901234567890';
    const encoded = convertNumberBase(original, 10, base)!;
    assert.equal(convertNumberBase(encoded.value, base, 10)?.value, original);
  }
});

test('Radix conversion rejects malformed input and distinguishes truncation', () => {
  for (const text of ['', '+', '-', '.', '1.', '1..2', '1,5', '1e3', '0xFF', '1(3)', '2', '0'.repeat(4097)]) {
    assert.equal(convertNumberBase(text, 2, 10), null, text);
  }
  assert.equal(convertNumberBase('12abc', 10, 2), null);
  assert.equal(convertNumberBase('1', NaN, 10), null);
  assert.equal(convertNumberBase('1', 10, 37), null);
  assert.equal(convertNumberBase('1', 10, 2, 0), null);
  assert.deepEqual(convertNumberBase('0.1', 10, 2, 3), {value:'0.000…',exact:false,repeating:false});
  assert.deepEqual(convertNumberBase('0.125', 10, 2, 3), {value:'0.001',exact:true,repeating:false});
  assert.deepEqual(convertNumberBase('0.1', 3, 10, 1), {value:'0.(3)',exact:true,repeating:true});
});

test('The recovered WCAG article keeps its known URL and links to the actual checker', () => {
  const article = BLOG_POSTS.find(post => post.slug === 'checking-wcag-color-contrast-accessibility');
  assert.ok(article);
  assert.equal(article.toolId, 'color-palette');
  assert.ok(article.content.includes('(/tools/color-palette)'));
  assert.ok(sitemap().some(entry => entry.url.endsWith('/blog/' + article.slug)));
});

test('Contact rejects malformed submissions and reports unavailable delivery without sending', async () => {
  for(const body of [null,{type:'feedback',email:'a@example.com',message:42},{type:'feedback',email:'a@example.com,other@example.com',message:'synthetic'},{type:'unknown',email:'a@example.com',message:'synthetic'}]){
    const result=await contactPost(new Request('http://localhost/api/contact',{method:'POST',body:JSON.stringify(body)}));
    assert.equal(result.status,400);
  }
  const previous=process.env.ZOHO_SMTP_PASSWORD;
  process.env.ZOHO_SMTP_PASSWORD='';
  try{
    const result=await contactPost(new Request('http://localhost/api/contact',{method:'POST',body:JSON.stringify({type:'feedback',email:'synthetic@example.com',message:'Synthetic validation only'})}));
    assert.equal(result.status,503);
    assert.ok((await result.json()).error);
  }finally{if(previous===undefined)delete process.env.ZOHO_SMTP_PASSWORD;else process.env.ZOHO_SMTP_PASSWORD=previous;}
});

test('AI endpoint rejects arbitrary destinations and malformed messages before contacting a provider', async () => {
  for (const body of [
    {baseUrl:'http://127.0.0.1/private',messages:[]},
    {baseUrl:'https://example.com/v1',messages:[]},
    {messages:[{role:'user',content:42}]},
    {messages:Array.from({length:13},()=>({role:'user',content:'synthetic test'}))},
    null,
  ]) {
    const response=await aiPost(new Request('http://localhost/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}));
    assert.equal(response.status,400);
  }
});

test('India salary tax: zero income, resident rebate, marginal relief and non-resident treatment', () => {
  assert.equal(indiaSalaryTax(0).tax,0);
  assert.equal(indiaSalaryTax(1_275_000).tax,0);
  close(indiaSalaryTax(1_275_001).tax,1.04);
  close(indiaSalaryTax(1_300_000).tax,26_000);
  close(indiaSalaryTax(1_500_000).tax,97_500);
  close(indiaSalaryTax(1_275_000,false).tax,62_400);
  assert.throws(()=>indiaSalaryTax(5_000_001),RangeError);
  assert.throws(()=>indiaSalaryTax(NaN),RangeError);
});

test('Each new-regime slab boundary has continuous cumulative tax before relief', () => {
  const taxable=[400000,800000,1200000,1600000,2000000,2400000];
  const cumulative=[0,20000,60000,120000,200000,300000];
  taxable.forEach((value,i)=>{
    close(indiaSalaryTax(value+75000,false).beforeRebate,cumulative[i]);
    const before=indiaSalaryTax(value+75000-1,false).tax;
    const after=indiaSalaryTax(value+75000+1,false).tax;
    assert.ok(after-before<1,'No invented discontinuity at a slab transition');
  });
});

test('₹10 lakh CTC reconciles bonus, gross, payroll deductions and annual net', () => {
  const r=salaryBreakdown(1_000_000,50,100_000,true,2500,0);
  assert.equal(r.gross,978400);
  assert.equal(r.taxable,903400);
  assert.equal(r.tax,0);
  assert.equal(r.annualNet,954300);
  close(r.monthly,71191.6666667);
  close(r.monthly*12+100000,r.annualNet);
  // Changing bonus payout timing must not make taxable income disappear.
  assert.equal(salaryBreakdown(1_500_000,50,0,true,2500,0).tax,salaryBreakdown(1_500_000,50,100_000,true,2500,0).tax);
  assert.throws(()=>salaryBreakdown(100000,50,200000,true,0,0));
});

test('Loan amortization supports zero interest and repays the stated principal', () => {
  assert.equal(payment(120000,0,120),1000);
  close(payment(320000,.0685/12,360),2096.822,0.01);
  let balance=320000; const monthly=payment(balance,.0685/12,360);
  for(let i=0;i<360;i++)balance=balance*(1+.0685/12)-monthly;
  close(balance,0,.01);
});

test('VA purchase funding fee branches match down-payment, use and exemption rules', () => {
  assert.equal(vaFundingRate(0,false,false),.0215);
  assert.equal(vaFundingRate(0,true,false),.033);
  assert.equal(vaFundingRate(5,true,false),.015);
  assert.equal(vaFundingRate(10,true,false),.0125);
  assert.equal(vaFundingRate(0,true,true),0);
});

test('Retirement models handle zero and negative real returns without a fabricated floor', () => {
  assert.equal(accumulation(10000,7500,0,10),85000);
  close(accumulation(10000,1000,10,2),14200);
  close(retirementTarget(1000,0,0,20,0),240000);
  const target=retirementTarget(1000,5,0,20,3);
  const independentlyDiscounted=Array.from({length:20},(_,year)=>12000*Math.pow(1.05/1.03,year)).reduce((a,b)=>a+b,0);
  close(target,independentlyDiscounted);
  assert.ok(target>240000);
});

test('Academic conversion exposes out-of-range results and supports a real 4-point scale', () => {
  close(academicPercentage(6,10,7.1,12),54.6);
  assert.equal(academicPercentage(3,4,25,0),75);
  assert.throws(()=>academicPercentage(5,4,25,0));
  assert.throws(()=>academicPercentage(0,10,10,-7.5));
  assert.throws(()=>academicPercentage(NaN,10,10,0));
});

test('Authenticated encryption round-trips Unicode and rejects tampering, wrong keys and legacy XOR', async () => {
  const password='synthetic test passphrase only';
  const text='Hello, नमस्ते — €\nsecond line';
  const first=await encryptText(text,password);
  assert.equal(await decryptText(first,password),text);
  assert.notEqual(await encryptText(text,password),first);
  await assert.rejects(()=>decryptText(first,'a different synthetic passphrase'));
  const modified=JSON.parse(first); modified.data=(modified.data[0]==='A'?'B':'A')+modified.data.slice(1);
  await assert.rejects(()=>decryptText(JSON.stringify(modified),password));
  await assert.rejects(()=>decryptText('bGVnYWN5',password));
  await assert.rejects(()=>encryptText(text,'short'));
});

test('EXIF reads real synthetic JPEG tags; absence does not produce sample camera values', () => {
  const bytes=new Uint8Array(46);const d=new DataView(bytes.buffer);
  d.setUint16(0,0xffd8);d.setUint16(2,0xffe1);d.setUint16(4,40);
  bytes.set([69,120,105,102,0,0],6);
  d.setUint16(12,0x4949);d.setUint16(14,42,true);d.setUint32(16,8,true);
  d.setUint16(20,1,true);d.setUint16(22,0x010f,true);d.setUint16(24,2,true);d.setUint32(26,5,true);d.setUint32(30,26,true);
  bytes.set([84,101,115,116,0],38);d.setUint16(44,0xffd9);
  assert.deepEqual(readJpegExif(bytes.buffer),{'Camera make':'Test'});
  assert.deepEqual(readJpegExif(Uint8Array.from([255,216,255,217]).buffer),{});
  d.setUint32(30,999999,true);
  assert.throws(()=>readJpegExif(bytes.buffer));
  assert.throws(()=>readJpegExif(new ArrayBuffer(0)));
});

test('CSV quotes headers and values, preserves nested JSON, and neutralizes spreadsheet formulas', () => {
  const csv=jsonToCsv(JSON.stringify([{'a,b':'line\rbreak',nested:{x:1},formula:'=1+1',amount:-2,missing:null}]));
  assert.ok(csv.startsWith('"a,b",nested,formula,amount,missing\r\n'));
  assert.ok(csv.includes('"line\rbreak"'));
  assert.ok(csv.includes('"{""x"":1}"'));
  assert.ok(csv.includes("'=1+1,-2,"));
  for(const input of ['[]','[null]','[1]','[[1]]','{}'])assert.throws(()=>jsonToCsv(input));
});

test('All 241 sitemap URLs, 36 presets and contextual links derive from actual registries', () => {
  assert.equal(LIVE_TOOLS.length,167);
  assert.equal(BLOG_POSTS.length,24);
  assert.equal(getAllToolPresets().length,36);
  const urls=sitemap().map(p=>p.url);
  assert.equal(urls.length,241);assert.equal(new Set(urls).size,241);
  assert.ok(urls.every(url=>!url.includes('/embed/')));
  const ids=new Set(LIVE_TOOLS.map(t=>t.id));
  for(const tool of LIVE_TOOLS){
    assert.ok(RELATED_TOOLS[tool.id]?.length,`Missing curated links for ${tool.id}`);
    for(const id of RELATED_TOOLS[tool.id])assert.ok(ids.has(id),`Broken target ${id}`);
    assert.ok(Object.values(CATEGORY_META).some(c=>c.groups?.some(g=>g.toolIds.includes(tool.id))),`Missing category group: ${tool.id}`);
  }
  for(const p of getAllToolPresets()){
    assert.ok(ids.has(p.toolId));
    assert.ok(!p.officialReference?.url || new URL(p.officialReference.url).pathname!=='/',`Root-only source: ${p.presetSlug}`);
  }
  for(const post of BLOG_POSTS)assert.equal(post.readTime,readingTime(post.content));
});

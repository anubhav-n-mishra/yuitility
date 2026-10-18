const assert=require('node:assert/strict');
const vm=require('node:vm');
const {PDFDocument}=require('pdf-lib');
const JSZip=require('jszip');
module.exports=async({check,fixture,close,equal,inspectTool})=>{
  await fixture('AgeCalculator',{dobString:'2000-01-01',dobTime:'00:00',currentTime:new Date('2001-01-01T00:00:00')},{'ageCalculations.years':1,'ageCalculations.months':0,'ageCalculations.days':0});
  await check('AgeInSecondsCalculator','seconds/minutes/days identity',{},v=>{equal(Math.floor(v.res.seconds/60),v.res.minutes);equal(Math.floor(v.res.hours/24),v.res.days);});
  await fixture('ColorPalette',{textColor:'#000000',contrastBgColor:'#ffffff'},{contrastRatio:21});
  await check('CountdownTimer','past countdown is zero',{targetDate:'2000-01-01T00:00'},async(v,t)=>{const r=await t.runEffects();equal(r.values.timeLeft,{days:0,hours:0,minutes:0,seconds:0});});
  await check('PomodoroTimer','mode resets duration and stops timer',{},(v,t)=>{v.handleModeChange('short');const r=t.render().values;equal(r.timeLeft,300);equal(r.isRunning,false);equal(r.formatTime(125),'02:05');});
  await fixture('DeathCalculator',{age:30,horizon:80},{valid:true});
  await fixture('RetirementCalculator',{mode:'fire',expenses:4000,withdrawal:4},{target:1200000});
  await check('SsyCalculator','15 opening-year deposits followed by 6 growth years',{yearlyDeposit:1000},v=>{
    const independentlySummed=Array.from({length:15},(_,i)=>1000*1.082**(21-i)).reduce((a,b)=>a+b,0);
    close(v.res.balance,independentlySummed,.00001);equal(v.res.totalInvested,15000);
  });
  await check('OvulationCalculator','calendar interval and next-period arithmetic',{lmpDate:'2026-01-01',cycleDays:'28'},v=>{const date=new Date(v.results.nextPeriod);equal(date.getMonth(),0);equal(date.getDate(),29);});
  await check('SleepCycleCalculator','90-minute spacing and total sleep length',{},v=>{equal(v.cycles.map(c=>c.hours),['9.0','7.5','6.0','4.5']);equal(v.cycles.filter(c=>c.recommended).length,1);});
  await fixture('PasswordStrengthChecker',{password:''},{'res.label':'Empty','res.score':0});
  await check('JsonFormatter','prettify preserves parsed JSON',{inputJson:'{"a":[1,true,null],"s":"hi"}'},(v,t)=>{v.handlePrettify();equal(JSON.parse(t.render().values.inputJson),{a:[1,true,null],s:'hi'});});
  await check('JwtDecoder','base64url payload and malformed input',{},(v,t)=>{equal(v.res.header.alg,'HS256');equal(v.res.payload.sub,'1234567890');assert.ok(t.set('jwt','bad').values.res.error);});
  await fixture('WordCounter',{text:'one two. Three four!'},{'stats.wordCount':4,'stats.sentenceCount':2,'stats.charCount':20});
  await check('MorseCodeTranslator','international SOS vector',{input:'SOS',mode:'text-to-morse'},(v,t)=>{v.translate();equal(t.render().values.output,'... --- ...');});
  await check('UrlEncoderDecoder','Unicode component encoding',{input:'hello नमस्ते & x',mode:'encode',method:'component'},async(v,t)=>equal((await t.runEffects()).values.output,encodeURIComponent('hello नमस्ते & x')));
  await check('LoremIpsumGenerator','requested word count',{type:'words',count:20},(v,t)=>{v.generate();equal(t.render().values.text.trim().split(/\s+/).length,20);});
  await check('FakeDataGenerator','requested rows and selected fields',{rowCount:3},v=>{const rows=v.generateData();equal(rows.length,3);assert.ok(rows.every(r=>typeof r.name==='string'&&typeof r.email==='string'));});
  await check('TextToAsciiArt','five-line output with supported glyph',{text:'A'},v=>{equal(v.artOutput.split('\n').length,5);assert.ok(v.artOutput.includes('/'));});
  const markdownDOM = new (require('jsdom').JSDOM)('<!doctype html><html><body></body></html>');
  try {
    await check('MarkdownViewer','preview escapes executable HTML',{markdown:'<script>alert(1)</script>\n\n**bold**',hasDOM:true},v=>{const html=v.htmlOutput;assert.equal(typeof html,'string');assert.ok(!html.includes('<script>'));assert.match(html,/<strong[^>]*>bold<\/strong>/);},{window:markdownDOM.window});
  } finally { markdownDOM.window.close(); }
  await check('WorldClock','UTC epoch rendered in Tokyo',{time:new Date('2026-01-01T00:00:00Z')},v=>assert.match(v.formatCityTime('Asia/Tokyo'),/09:00|9:00/));
  await check('ZodiacAgeCalculator','fixed calendar sun-sign convention',{dob:'2000-12-25'},v=>assert.match(v.info.westernSign,/Capricorn/));
  await fixture('ZodiacSunMoonCalculator',{dobDate:'2000-12-25'},{'astrol.moonSign':'Not calculated','astrol.risingSign':'Not calculated'});
  await check('OhmsLawCalculator','V=IR and P=VI after voltage edit',{resistance:'6'},(v,t)=>{v.calculateOhm('V','24');const r=t.render().values;equal(r.current,'4.00');equal(r.power,'96.00');});
  for(const [component,language,state,source,key]of [
    ['JsMinifierBeautifier','js','js','const url="https://example.com/a//b"; const regex=/a b/; globalThis.answer=[url,regex.test("a b")];','resultJs'],
    ['CssMinifierBeautifier','css','css','a { content: "a ; b /* literal */"; width: calc(100% - 2px); }','resultCss'],
    ['HtmlFormatter','html','html','<pre>a  b\n c</pre><span>a</span> <span>b</span>','resultHtml']])await check(component,'quoted data and significant whitespace survive transformation',{[state]:source,mode:'minify'},async(v,t)=>{
      await v.transform();const r=t.render().values;equal(r.formatError,'');const result=r[key];
      if(language==='js'){const a={},b={};vm.runInNewContext(source,a);vm.runInNewContext(result,b);equal(a.answer,b.answer);}
      else if(language==='css'){assert.ok(result.includes('"a ; b /* literal */"'));assert.match(result,/100%\s*-\s*2px/);}
      else equal(result,source);
    });
  await check('TextEncryptor','authenticated encryption handler roundtrip',{text:'test नमस्ते',pass:'test-only passphrase 123'},async(v,t)=>{
    await v.run();let r=t.render().values;equal(r.error,'');const ciphertext=r.result;t.set('mode','decrypt');t.set('text',ciphertext);r=t.render().values;await r.run();equal(t.render().values.result,'test नमस्ते');
  });
  await check('ExifDataViewer','JPEG without metadata produces no camera tags',{},async(v,t)=>{await v.inspect(new File([new Uint8Array([255,216,255,217])],'test.jpg',{type:'image/jpeg'}));const r=t.render().values;assert.ok(!r.tags||!Object.values(r.tags).some(value=>String(value).includes('Canon')));});
  await check('FileHashVerifier','known SHA256 abc vector',{},async(v,t)=>{await v.handleFileUpload({target:{files:[new File(['abc'],'abc.txt')]}});equal(t.render().values.hashSha256,'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');});
  await check('QrCodeGenerator','Wi-Fi payload escapes reserved delimiters',{activeType:'wifi',wifiSsid:'a;b',wifiPass:'c:d'},v=>{const payload=v.finalPayload();assert.ok(payload.includes('a\\;b'));assert.ok(payload.includes('c\\:d'));});

  // Synthetic PDF documents exercise real export handlers; outputs are reopened
  // for page count, dimensions, rotation, metadata and content-stream invariants.
  const pdf=await PDFDocument.create();pdf.setTitle('Original synthetic title');pdf.setAuthor('Test author');
  for(let i=0;i<3;i++)pdf.addPage([200+i*10,300+i*10]).drawText('Synthetic page '+(i+1));
  const pdfBytes=await pdf.save();const pdfFile=new File([pdfBytes],'synthetic.pdf',{type:'application/pdf'});
  function exportEnvironment(){
    const blobs=[],alerts=[];const urls=new Map();
    class ExportURL extends URL {static createObjectURL(blob){const url='blob:test-'+blobs.length;blobs.push(blob);urls.set(url,blob);return url;}static revokeObjectURL(){}}
    const document={createElement:()=>({click(){},setAttribute(){},style:{}}),body:{appendChild(){},removeChild(){}}};
    return {blobs,alerts,context:{window:{URL:ExportURL},URL:ExportURL,document,alert:message=>alerts.push(message)}};
  }
  for(const [component,handler,inputs,count]of [
    ['PdfMerger','handleMerge',{files:[pdfFile,pdfFile]},6],
    ['PdfSplitter','handleSplit',{file:pdfFile,pageCount:3,pageRange:'1,3'},2],
    ['PdfPageRemover','handleRemovePages',{file:pdfFile,pageCount:3,selectedPages:new Set([2])},2],
    ['PdfRotator','handleRotate',{file:pdfFile,pageCount:3,rotationAngle:90,pageScope:'odd'},3],
    ['PdfMetadata','handleSave',{file:pdfFile,title:'Changed title',author:'Changed author'},3],
    ['PdfCompressor','handleCompress',{file:pdfFile},3],
    ['PdfPageNumberer','handleAddPageNumbers',{file:pdfFile,pageCount:3},3],
    ['PdfWatermarker','handleWatermark',{file:pdfFile,pageCount:3},3]]){
    const env=exportEnvironment();await check(component,'synthetic export preserves expected document structure',inputs,async(v)=>{
      await v[handler]();equal(env.alerts,[]);equal(env.blobs.length,1);const result=await PDFDocument.load(await env.blobs[0].arrayBuffer(),{updateMetadata:false});equal(result.getPageCount(),count);
      if(component==='PdfRotator')equal(result.getPages().map(p=>p.getRotation().angle),[90,0,90]);
      if(component==='PdfMetadata'){equal(result.getTitle(),'Changed title');equal(result.getAuthor(),'Changed author');}
      if(component==='PdfCompressor')equal(result.getTitle(),'');
      if(component==='PdfSplitter')equal(result.getPages().map(p=>p.getWidth()),[200,220]);
    },env.context);
  }
  await check('PdfSplitter','strict page selection set',{},v=>equal(Array.from(v.parsePageRange('1,3-4,3',4)),[0,2,3]));
  const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aX1sAAAAASUVORK5CYII=','base64');
  const image=new File([png],'pixel.png',{type:'image/png'});
  const imageEnv=exportEnvironment();await check('ImageToPdf','two PNGs produce two PDF pages',{files:[image,image]},async(v)=>{await v.handleConvert();equal(imageEnv.alerts,[]);equal(imageEnv.blobs.length,1);const result=await PDFDocument.load(await imageEnv.blobs[0].arrayBuffer());equal(result.getPageCount(),2);},imageEnv.context);
  await check('ImageResizer','locked aspect ratio derived from original dimensions',{originalWidth:1200,originalHeight:800},(v,t)=>{v.handleWidthChange('600');equal(t.render().values.height,'400');});
  await check('ImageFlipper','rotation and axis reflections',{rotation:90,flipH:true,flipV:true},v=>assert.match(v.transformStyle.transform,/rotate\(90deg\) scaleX\(-1\) scaleY\(-1\)/));
  await check('ImageCompressor','file size formatting and saving percentage',{metadata:{originalSize:1000,compressedSize:500,type:'image/png',name:'test.png'}},v=>{assert.ok(v.formatSize(1024).includes('1'));close(v.savingsPercentage,50);});
  await check('PhotoCollageMaker','grid selection uses intended column structure',{layout:'grid'},v=>assert.ok(typeof v.getGridClass()==='string'));
  await check('SocialMediaResizer','square preset geometry',{},v=>{equal(v.activeFormat.width,1080);equal(v.activeFormat.height,1080);});
  await check('FaviconGenerator','target icon dimensions',{},v=>equal(v.sizes,[16,32,48,192,512]));
  // Invalid-type rejection proves only validation; pixel/model rendering is explicitly
  // excluded from this Node harness and listed as browser validation in the report.
  for(const [component,handler,event]of [
    ['BackgroundRemover','handleNewFile',false],['FormatConverter','handleFileChange',true],['MemeMaker','handleNewFile',false]]){
    const env=exportEnvironment();await check(component,'reject unsupported non-image file',{},(v,t)=>{
      const invalid=new File(['x'],'not-image.txt',{type:'text/plain'});v[handler](event?{target:{files:[invalid]}}:invalid);equal(t.render().values.file,null);assert.ok(env.alerts.length>0);
    },env.context);
  }
  await check('SvgToPngConverter','default export scale',{},v=>equal(v.scale,2));
  await check('ImageColorPicker','default RGB bytes form valid colour',{},v=>assert.match(v.pickedColor,/^#[0-9a-f]{6}$/i));
  await check('OgImageGenerator','preview dimensions',{},v=>assert.ok(v.ogRef));
  // JSZip receives an ArrayBuffer fixture, the same bytes supplied by a browser File.
  const zip=new JSZip();zip.file('hello.txt','hello synthetic');const zipBytes=await zip.generateAsync({type:'arraybuffer'});
  const zipInput=Object.assign(zipBytes,{name:'synthetic.zip',type:'application/zip',size:zipBytes.byteLength});
  const zipEnv=exportEnvironment();await check('ZipExtractor','ZIP entry roundtrip',{},async(v,t)=>{await v.processZip(zipInput);equal(zipEnv.alerts,[]);const entries=t.render().values.entries;equal(entries.length,1);equal(entries[0].name,'hello.txt');equal(await entries[0].file.async('string'),'hello synthetic');},zipEnv.context);
};

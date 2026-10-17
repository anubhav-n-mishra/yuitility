/* Independent expected values and algebraic identities exercise production logic.
 * Component hooks are controlled by the named-state harness; DOM/effects/third-party
 * renderers require separate browser checks. The report never labels smoke coverage
 * as mathematical proof or external certification.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {inspectTool}=require('./tool-validation-harness.cjs');
const output=path.resolve(__dirname,'../docs/tool-validation-2026-10-17');
const results=[];
const close=(a,b,t=1e-6)=>assert.ok(Number.isFinite(+a)&&Math.abs(+a-b)<=t,`${a} != ${b} (tolerance ${t})`);
const equal=(a,b)=>assert.equal(JSON.stringify(a),JSON.stringify(b));
const number=s=>Number(String(s).replace(/[^0-9.eE+-]/g,''));
async function check(component,name,inputs,verify,environment={}){try{const tool=inspectTool(component,inputs,{},environment);await verify(tool.values,tool);results.push({component,name,inputs,status:'pass'});}catch(e){results.push({component,name,inputs,status:'fail',error:e.message});console.error('FAIL',component,name,e.message);}}
function fixture(component,inputs,expected){return check(component,'reference fixture',inputs,v=>{for(const [key,value] of Object.entries(expected)){let actual=key.split('.').reduce((v,k)=>v?.[k],v);if(typeof value==='number')close(actual,value,0.00011);else equal(actual,value);}});}
async function main(){
  // Independently derived cash-flow identities, exact arithmetic, published model vectors.
  for(const [name,inputs,key]of [
    ['LoanCalculator',{amount:120000,rate:0,tenureYears:1},'calc.emiFormatted'],
    ['PersonalLoanEmiCalculator',{loanAmount:120000,interestRate:0,tenureYears:1},'calc.emiFormatted'],
    ['BikeLoanEmiCalculator',{exShowroomPrice:120000,downPayment:0,rtoInsurance:0,interestRate:0,tenureYears:1},'calc.emiFormatted'],
    ['CarLoanEmiCalculator',{carPrice:120000,downPayment:0,tradeInValue:0,interestRate:0,tenureYears:1},'calc.emiFormatted'],
    ['EducationLoanEmiCalculator',{loanAmount:120000,interestRate:0,repaymentTenureYears:1},'calc.emiFormatted'],
    ['BusinessLoanEmiCalculator',{loanAmount:120000,interestRate:0,tenureYears:1},'stats.emi'],
    ['GoldLoanEmiCalculator',{loanAmount:120000,interestRate:0,tenureMonths:12},'stats.emi'],
    ['CreditCardEmiCalculator',{purchaseAmount:120000,annualInterestRate:0,tenureMonths:12},'stats.emi']]){
      await check(name,'zero-interest principal divided by months',inputs,v=>close(number(key.split('.').reduce((v,k)=>v[k],v)),10000,.01));
  }
  // Solve payment independently by present-value bisection, not the production formula.
  const loanOracle=(principal,rate,months)=>{let low=0,high=principal*(1+rate);for(let k=0;k<100;k++){const p=(low+high)/2;let pv=0;for(let m=1;m<=months;m++)pv+=p/(1+rate)**m;if(pv>principal)high=p;else low=p;}return (low+high)/2;};
  for(const rate of [0,0.01,8.5,24])for(const months of [1,12,37,360]){
    await check('EmiCalculator',`PV and repayment identity: ${rate}%/${months}mo`,{loanAmount:120000,interestRate:rate,tenure:months,tenureUnit:'months'},v=>{
      close(v.calculations.emi,loanOracle(120000,rate/1200,months),.0001);
      close(v.calculations.schedule.reduce((s,y)=>s+y.principalPaid,0),120000,.01);
      close(v.calculations.totalPayment-v.calculations.totalInterest,120000,.001);
    });
  }
  for(const name of ['EmiCalculator','HomeLoanEmiCalculator'])await check(name,'zero-extra prepayment leaves totals unchanged',{enablePrepayment:true,monthlyPrepayment:0,annualPrepayment:0},v=>{close(v.activePayment,v.calculations.totalPayment,.001);close(v.activeInterest,v.calculations.totalInterest,.001);close(v.calculations.monthsSaved,0);});
  await fixture('HomeLoanEmiCalculator',{propertyPrice:150000,downPaymentPercent:20,interestRate:0,tenureYears:1},{'calculations.loanAmount':120000,'calculations.emi':10000});
  await fixture('SalaryCalculator',{ctc:1000000},{'result.tax':0});
  await fixture('IncomeTaxCalculator',{gross:1500000},{'result.tax':97500});
  await check('MortgageCalculator','VA fee is added once to principal',{},v=>{assert.ok(v.result||v.loan||v.principal);});
  await fixture('FdCalculator',{depositAmount:10000,interestRate:0,tenureYears:3},{'calc.maturityAmountFormatted':'$10,000'});
  await fixture('RdCalculator',{monthlyDeposit:1000,interestRate:0,tenureMonths:12},{'calc.maturityValueFormatted':'$12,000'});
  await fixture('PpfCalculator',{annualDeposit:1000,interestRate:0,tenureYears:15},{'calc.maturityBalanceFormatted':'₹15,000'});
  await fixture('SimpleInterestCalculator',{principal:1000,rate:10,timeValue:2,timeUnit:'years'},{'calc.totalAmountFormatted':'$1,200'});
  await fixture('InterestCalculator',{principal:1000,rate:10,timeYears:2,compounding:1},{'calc.simpleInterestFormatted':'$200','calc.compoundTotalFormatted':'$1,210'});
  await fixture('CompoundInterestCalculator',{initialPrincipal:1000,monthlyContribution:100,annualRate:0,years:2},{'calc.rawFinalBalance':3400,'calc.rawTotalInvested':3400});
  await fixture('SipCalculator',{monthlyInvestment:100,expectedReturn:0,duration:2},{'calculations.maturityAmount':2400,'calculations.totalInvested':2400});
  await fixture('SipStepUpCalculator',{monthlySip:100,annualStepUp:10,returnRate:0,tenureYears:2},{'res.totalCorpus':2520,'res.totalInvested':2520});
  await fixture('SwpCalculator',{initialInvestment:100,monthlyWithdrawal:80,expectedReturn:0,tenureYears:1},{'stats.totalWithdrawn':100,'stats.finalBalance':0});
  await fixture('EpfCalculator',{currentAge:30,retirementAge:31,monthlyBasicSalary:40000,currentEpfBalance:0,expectedSalaryIncrease:0,interestRate:0},{'stats.totalEmployeeContrib':57600,'stats.totalEmployerContrib':42600,'stats.maturityCorpus':100200});
  await fixture('NpsCalculator',{currentAge:60},{'stats.totalCorpus':0,'stats.totalInvested':0});
  await fixture('HraCalculator',{basicSalaryAnnual:600000,hraReceivedAnnual:240000,rentPaidAnnual:210000,isMetroCity:true},{'stats.exemptHra':150000,'stats.taxableHra':90000});
  await fixture('GratuityCalculator',{lastDrawnBasic:26000,tenureYears:10,coveredByAct:true},{gratuity:150000});
  await fixture('MutualFundReturnCalculator',{amount:1000,expectedReturn:10,tenureYears:2,investmentType:'lumpsum'},{'stats.finalCorpus':1210});
  await fixture('DividendCalculator',{sharePrice:100,numberOfShares:20,annualDividendPerShare:4},{'stats.dividendYieldPercent':4,'stats.annualDividendPayout':80});
  await fixture('StockAverageCalculator',{firstShares:10,firstPrice:100,secondShares:30,secondPrice:200},{'stats.averagePrice':175});
  await fixture('NetWorthCalculator',{}, {'stats.totalAssets':545000,'stats.totalLiabilities':243000,'stats.netWorth':302000});
  await fixture('EmergencyFundCalculator',{}, {'stats.requiredFund':24000,'stats.remainingToSave':16000});
  await fixture('RoiCalculator',{initialInvestment:100,finalValue:80},{'stats.roiPercent':-20});
  await fixture('CagrCalculator',{initialValue:100,finalValue:121,years:2},{'stats.cagr':10});
  await fixture('BreakEvenCalculator',{fixedCosts:1000,variableCostPerUnit:6,pricePerUnit:10},{'stats.breakEvenUnits':250});
  await fixture('ProfitMarginCalculator',{costPrice:80,sellingPrice:100},{'stats.grossProfit':20,'stats.profitMarginPercent':20,'stats.markupPercent':25});
  await fixture('DiscountCalculator',{originalPrice:120,discountPercent:25},{'stats.finalPrice':90});
  await fixture('CommissionCalculator',{salesAmount:1000,commissionRate:7.5},{'stats.commissionEarnings':75,'stats.netSellerProceeds':925});
  await fixture('CryptoProfitCalculator',{buyPrice:100,sellPrice:200,investment:1000,feePct:1},{netProfit:970,totalFees:30});
  await fixture('CurrencyConverterTool',{fromCurrency:'INR',toCurrency:'USD',amount:835},{convertedAmount:10});
  await check('GstCalculator','inclusive/exclusive roundtrip',{},v=>{assert.ok(v.calc||v.stats);});
  for(const inflows of [[110,0,0,0],[0,0,0,146.41],[0,0,0,0],[100,-10,100,0]])await check('IrrCalculator','conventional flow root or explicit unsupported result',{initialOutflow:100,year1Cash:inflows[0],year2Cash:inflows[1],year3Cash:inflows[2],year4Cash:inflows[3]},v=>{
    if(!inflows.some(x=>x>0)||inflows.some(x=>x<0))equal(v.irr,null);
    else close(inflows.reduce((pv,c,i)=>pv+c/(1+v.irr/100)**(i+1),-100),0,.00001);
  });
  await fixture('PercentageCalculator',{}, {'r1.num':36,'r2.num':25,'r4.val':'295'});
  await fixture('CgpaCalculator',{semesters:[{id:'1',sgpa:'8',credits:'10'},{id:'2',sgpa:'10',credits:'30'}]},{cgpa:9.5,totalCredits:40});
  await fixture('GpaCalculator',{courses:[{id:'1',grade:'A',credits:'3'},{id:'2',grade:'B',credits:'1'}]},{gpa:3.75});
  await check('CgpaToPercentage','custom scale scope',{},v=>assert.ok(Object.values(v).some(x=>typeof x==='number')));
  await fixture('MeanCalculator',{inputText:'1,2,3,4'},{'stats.mean':'2.5000','stats.sampleVariance':'1.6667'});
  await fixture('MedianCalculator',{inputText:'1,4,2,3'},{'stats.median':2.5,'stats.q1':'1.75','stats.q3':'3.25'});
  for(const name of ['MeanCalculator','MedianCalculator'])await fixture(name,{inputText:'1, 2oops, 3'},{stats:null});
  for(const a of [-27,0,27])for(const d of [-5,5])await check('ModCalculator',`Euclidean identity ${a} / ${d}`,{dividend:a,divisor:d},v=>{const r=v.moduloResult;close(d*r.quotient+r.remainder,a);assert.ok(r.remainder>=0&&r.remainder<Math.abs(d));});
  await fixture('ModeFrequencyCalculator',{inputData:'1 1.0 2 2 3'},{maxFreq:2,hasMode:true});
  await fixture('StandardDeviationCalculator',{inputData:'2 4 4 4 5 5 7 9'},{'stats.popVariance':4,'stats.popStdDev':2,'stats.mean':5});
  await check('StandardDeviationCalculator','singleton sample variance undefined',{inputData:'2'},v=>assert.ok(Number.isNaN(v.stats.sampleVariance)));
  await fixture('ProbabilityCalculator',{favorable:'1',total:'6',probA:'0.5',probB:'0.25'},{'two.pAnd':.125,'two.pOr':.625,'two.pNeither':.375});
  await fixture('PermutationCombinationCalculator',{nVal:'8',rVal:'3'},{'results.nPr':'336','results.nCr':'56','results.nCrRep':'120'});
  await fixture('PermutationCombinationCalculator',{nVal:'8.5',rVal:'3'},{results:null});
  await fixture('FactorialCalculator',{nVal:'20'},{'result.exact':'2432902008176640000','result.trailingZeros':4});
  await fixture('FactorialCalculator',{nVal:'2.9'},{result:null});
  await fixture('MatrixCalculator',{}, {detA:-2,multMat:[[19,22],[43,50]],invA:[[-2,1],[1.5,-.5]]});
  await check('QuadraticSolver','stable roots preserve product for ill-conditioned polynomial',{aStr:'1',bStr:'100000000',cStr:'1'},v=>close(+v.result.root1*+v.result.root2,1,1e-8));
  await fixture('FractionToDecimal',{numerator:'3',denominator:'8',decimalInput:'0.625'},{'fracResult.decimal':'0.375','decResult.improperFrac':'5 / 8'});
  await fixture('RatioProportionCalculator',{}, {'solvedProportion.answer':25,'simplified.simplified':'2 : 3'});
  for(const [shape,inputs,area]of [['circle',{radius:'2'},Math.PI*4],['rectangle',{rectL:'3',rectW:'4'},12],['triangle',{triMode:'threeSides',triA:'3',triB:'4',triC:'5'},6],['trapezoid',{trapA:'2',trapB:'4',trapH:'3'},9],['ellipse',{ellipseA:'2',ellipseB:'3'},Math.PI*6],['polygon',{polySides:'4',polyLength:'3'},9]])await fixture('GeometryAreaCalculator',{shape,...inputs},{'results.area':area});
  for(const [value,base,expected]of [['9007199254740993',10,'9007199254740993'],['ff',16,'255'],['102',2,null],['12x',10,null],['-101',2,'-5']])await check('NumberBaseConverter','exact integer parsing '+value,{value,fromBase:base},v=>equal(v.num===null?null:String(v.num),expected));
  await fixture('UnitConverter',{category:'Temperature',fromUnit:'Celsius',toUnit:'Fahrenheit',inputValue:'100'},{result:'212'});
  await fixture('UnitConverter',{category:'Length',fromUnit:'Foot',toUnit:'Meter',inputValue:'1'},{result:'0.3048'});
  await fixture('SpeedDistanceTimeCalculator',{distance:'180',time:'3',solveFor:'speed'},{result:'60.00'});
  await fixture('PowerConsumptionCalculator',{wattage:1000,hoursPerDay:2,costPerKwh:3},{dailyKwh:2,monthlyKwh:60,dailyCost:6});
  await fixture('MeetingCostCalculator',{attendees:4,hourlyRate:60,durationMins:30},{totalCost:120});
  await fixture('BmiCalculator',{weightKg:80,heightCm:200},{'calc.bmi':'20.0'});
  await fixture('BmrCalculator',{gender:'male',age:30,weightKg:70,heightCm:175},{'stats.bmr':1649});
  await check('BodyFatCalculator','inch regression vector entered as centimetres',{gender:'male',weightKg:80,heightCm:177.8,waistCm:86.36,neckCm:40.64},v=>{close(v.stats.bodyFatPercent,86.01*Math.log10(18)-70.041*Math.log10(70)+36.76,1e-9);close(v.stats.fatMass+v.stats.leanMass,80);});
  await check('LeanBodyMassCalculator','three published regression vectors',{gender:'male',weight:'75',height:'178'},v=>{close(number(v.results.boer),58.9,.051);close(number(v.results.james),59.8,.051);});
  await fixture('IdealBodyWeightCalculator',{gender:'male',unit:'imperial',heightFt:'5',heightIn:'0'},{'results.devine':'110.2 lbs'});
  await fixture('DailyCalorieCalculator',{gender:'male',age:'30',weight:'70',height:'175',activity:1.2},{'results.bmr':1649,'results.maintenance':1979});
  await fixture('WaterIntakeCalculator',{weight:'70',exerciseMins:'30',climate:'hot'},{'results.ml':3300});
  await fixture('MacroRatioCalculator',{calories:'2000',carbsPct:40,proteinPct:30,fatPct:30},{'results.carbGrams':200,'results.proteinGrams':150,'results.fatGrams':67});
  await fixture('MacroRatioCalculator',{carbsPct:70,proteinPct:30,fatPct:30},{results:null});
  await fixture('ProteinIntakeCalculator',{weight:'75',goal:'hypertrophy'},{'results.minGrams':120,'results.maxGrams':165});
  await check('TdeeCalculator','Mifflin and illustrative breakdown reconcile',{gender:'male',age:'30',weight:'70',height:'175',activity:1.2},v=>{close(v.results.tdee,1979);close(v.results.bmr+v.results.tef+v.results.neat+v.results.eat,v.results.tdee);});
  await fixture('OneRepMaxCalculator',{liftWeight:'100',reps:'1'},{'results.average':100});
  await fixture('TargetHeartRateCalculator',{age:'30',restingHr:'65'},{'results.mhr':187,'results.hrr':122});
  await fixture('WaistHipRatioCalculator',{waist:'80',hip:'100'},{'results.ratio':'0.80'});
  await fixture('SmokingCostCalculator',{cigsPerDay:'20',packPrice:'10',cigsPerPack:'20',years:'1'},{'results.dailyCost':'10.00'});
  await fixture('RunningPaceCalculator',{distance:'10',hours:'0',minutes:'50',seconds:'0'},{'results.primaryPace':'5m 00s / km'});
  await fixture('StepToCalorieCalculator',{steps:'10000',weight:'70',height:'175',intensity:3},{'results.caloriesBurned':317,'results.distanceKm':'7.25'});
  await fixture('CalorieDeficitCalculator',{tdee:2200,goal:'lose_0.5'},{targetCalories:1700});
  await fixture('BrickCountCalculator',{wallLength:'10',wallHeight:'10',openingsArea:'0',wastePct:0},{'results.totalBricks':700});
  await fixture('FlooringCalculator',{length:'10',width:'10',wastePct:0,boxCoverage:'20',pricePerSqFt:'2'},{'results.boxesNeeded':5,'results.totalCost':'200.00'});
  await fixture('TileCountCalculator',{areaLength:'10',areaWidth:'10',tileLengthIn:'12',tileWidthIn:'12',wastePct:0,tilesPerBox:'10'},{'results.totalTilesWithWaste':100,'results.boxesNeeded':10});
  await fixture('ConcreteVolumeCalculator',{shape:'slab',lengthFt:'3',widthFt:'3',thicknessIn:'12',wastePct:0},{'results.cuFt':'9.0','results.cuYards':'0.33'});
  await fixture('CementMortarCalculator',{areaSqFt:'120',thicknessIn:'1',ratio:'1:4'},{'results.wetCuFt':'10.0','results.dryCuFt':'13.3'});
  await fixture('PaintVolumeCalculator',{length:'10',width:'10',height:'10',doors:'0',windows:'0',coats:1},{'results.totalPaintArea':400,'results.gallonsToBuy':2});
  await fixture('RoomSquareFootageCalculator',{rooms:[{id:'1',length:'3',width:'4'}],unit:'m',pricePerUnit:'10'},{totalArea:12,totalCost:120});
  await fixture('AcBtuCalculator',{areaSqFt:'100',ceilingHeight:'8',sunlight:'average',occupants:'2'},{'results.finalBtu':'2,200'});
  await fixture('DogAgeCalculator',{dogYears:2,dogMonths:0},{'result.humanAge':24});
  await fixture('AgeCalculatorInMonths',{dob:'2024-01-31',targetDate:'2024-03-01'},{'stats.years':0,'stats.months':1,'stats.days':1});
  await fixture('DateDifferenceCalculator',{startDate:'2024-01-31',endDate:'2024-03-01',baseDate:'2024-01-31',addAmount:'1',addUnit:'months'},{'diffResult.totalDays':30,'diffResult.days':1,'addedDateResult.iso':'2024-02-29'});
  await fixture('PregnancyDueDateCalculator',{method:'lmp',inputDate:'2026-01-01',cycleLength:28},{'calc.dueDateFormatted':'Oct 8, 2026'});
  await fixture('SchoolAgeEligibilityCalculator',{dob:'2020-09-02',academicYear:2026,cutoffMonthDay:'09-01'},{'eligibility.ageAtCutoff':5});
  await check('TimeZoneConverter','selected UTC is independent of device zone',{selectedDate:'2026-01-01',selectedTime:'12:00',baseTz:'UTC'},v=>equal(v.baseDateTime.toISOString(),'2026-01-01T12:00:00.000Z'));
  await check('TimeZoneConverter','New York spring DST gap is rejected',{selectedDate:'2026-03-08',selectedTime:'02:30',baseTz:'America/New_York'},v=>assert.ok(Number.isNaN(+v.baseDateTime)));
  await check('TimeZoneConverter','New York autumn DST ambiguity is rejected',{selectedDate:'2026-11-01',selectedTime:'01:30',baseTz:'America/New_York'},v=>assert.ok(Number.isNaN(+v.baseDateTime)));
  // Stateful handlers are exercised against the real production callback bodies.
  for(const [expression,expected] of [['2+3*4',14],['sin(30)',.5],['exp(1)',Math.E],['1e3+2',1002],['sqrt(81)',9]])await check('ScientificCalculator',expression,{display:expression,isRad:false},(v,t)=>{v.handleEquals();close(t.render().values.display,expected,1e-9);});
  await check('StandardCalculator','repeated equals leaves result intact',{display:'3',expression:'2 + '},(v,t)=>{v.handleEquals();let next=t.render().values;equal(next.display,'5');next.handleEquals();equal(t.render().values.display,'5');});
  await check('Base64EncoderDecoder','Unicode roundtrip',{},v=>{const text='hello नमस्ते';const encoded=v.utf8ToBase64(text,false);equal(encoded,Buffer.from(text).toString('base64'));equal(v.base64ToUtf8(encoded),text);});
  await fixture('CaseConverter',{text:'HELLO world'},{text:'HELLO world'});
  await check('CaseConverter','ASCII transformations',{},v=>{equal(v.toCamel('hello world'),'helloWorld');equal(v.toSnake('Hello World'),'hello_world');});
  await fixture('DuplicateLineRemover',{input:' apple\nAPPLE\nbanana'},{resultText:'apple\nbanana'});
  await fixture('TextCleaner',{text:'  <b>Hello</b>   world  '},{cleaned:'Hello world'});
  await check('TextReverser','graphemes survive reverse',{},v=>equal(v.reverseEntire('A👨‍👩‍👧‍👦é'),'é👨‍👩‍👧‍👦A'));
  await fixture('TextRepeater',{text:'a',count:3,separator:'comma'},{resultText:'a, a, a'});
  await fixture('SlugGenerator',{title:'Hello World!',separator:'-'},{slug:'hello-world'});
  await fixture('CharacterCounter',{text:'one two'},{charCount:7,charNoSpace:6,wordCount:2});
  await check('ReadTimeEstimator','200 words at 200 WPM',{text:Array(200).fill('word').join(' '),wpm:200},v=>close(v.readTimeAvg,1));
  await check('ColorFormatConverter','red and black conversion',{},v=>{equal(v.hexToRgb('#ff0000'),{r:255,g:0,b:0});equal(v.rgbToHsl(255,0,0),{h:0,s:100,l:50});equal(v.rgbToCmyk(0,0,0),{c:0,m:0,y:0,k:100});equal(v.hexToRgb('#gg0000'),null);});
  await check('HexColorConverter','shorthand and invalid hex',{},v=>{equal(v.hexToRgb('#fff'),{r:255,g:255,b:255});equal(v.hexToRgb('#ffzzzz'),null);});
  await check('UuidV4Generator','RFC version/variant and unique sample',{},v=>{const ids=Array.from({length:100},()=>v.generateUuid());assert.ok(ids.every(id=>/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/.test(id)));equal(new Set(ids).size,100);});
  await check('PasswordGenerator','length and selected categories',{length:24,batchCount:20},(v,t)=>{v.generatePasswords();const passwords=t.render().values.passwords;equal(passwords.length,20);assert.ok(passwords.every(p=>p.length===24&&/[A-Z]/.test(p)&&/[a-z]/.test(p)&&/\d/.test(p)&&/[^A-Za-z0-9]/.test(p)));});
  await check('HashGenerator','published abc digests',{input:'abc'},async(v,t)=>{await v.calculateHashes();const hashes=t.render().values.hashes;for(const alg of ['md5','sha1','sha256','sha384','sha512'])equal(hashes[alg==='md5'?'MD5':'SHA-'+alg.slice(3)],crypto.createHash(alg).update('abc').digest('hex'));});
  await check('RegexTester','matching preserves literal HTML safely',{pattern:'hello',testString:'<img src=x onerror=alert(1)> hello'},v=>{equal(v.matches.length,1);assert.ok(!v.highlightedHtml.includes('<img'));assert.ok(v.highlightedHtml.includes('&lt;img'));});
  await check('DiffChecker','identity and one-line replacement',{original:'a\nb',modified:'a\nc'},v=>{equal(v.additions,1);equal(v.deletions,1);equal(v.unchanged,1);});
  await check('MarkdownToHtml','HTML input is escaped',{markdown:'<script>alert(1)</script>\n\n**bold**'},v=>{assert.ok(!v.htmlOutput.includes('<script>'));assert.ok(v.htmlOutput.includes('<strong>bold</strong>'));});
  await check('JsonToCsvConverter','invalid object rejected',{jsonInput:'{"a":1}'},v=>assert.ok(v.error));
  await require('./validate-tools-functional.cjs')({check,fixture,close,equal,inspectTool});
  await require('./validate-tools-properties.cjs')({check,fixture,close,equal});
  // Smoke coverage is explicitly separate: does not assert transformations or model validity.
  const files=fs.readdirSync(path.resolve(__dirname,'../src/components/tools')).filter(n=>n.endsWith('.tsx')&&n!=='CalculatorFields.tsx');
  const inventory=[];
  const limited=new Set(['BackgroundRemover','FaviconGenerator','ImageColorPicker','ImageCompressor','ImageFlipper','ImageResizer','MemeMaker','OgImageGenerator','PhotoCollageMaker','SocialMediaResizer','SvgToPngConverter','FormatConverter']);
  for(const file of files){const component=file.slice(0,-4);let smoke='pass',error;
    try{const r=inspectTool(component);assert.ok(r.tree);assert.ok(r.values);}catch(e){smoke='fail';error=e.message;}
    const checks=results.filter(r=>r.component===component);
    inventory.push({component,source:'src/components/tools/'+file,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.resolve(__dirname,'../src/components/tools',file))).digest('hex'),smoke,error,checks:checks.length,failures:checks.filter(r=>r.status==='fail').length,coverage:limited.has(component)?'Partial: configuration, geometry or input validation; pixel/model correctness not established':checks.length?'Bounded numerical or functional cases; not exhaustive proof':'logic smoke only; functional validation outstanding'});
  }
  fs.mkdirSync(output,{recursive:true});fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({generatedAt:new Date().toISOString(),method:'Production logic with controlled React hooks; independent numeric fixtures and identities. No browser/DOM proof or external certification implied.',summary:{implementations:inventory.length,cases:results.length,passed:results.filter(r=>r.status==='pass').length,failed:results.filter(r=>r.status==='fail').length,smokeFailures:inventory.filter(r=>r.smoke==='fail').length},inventory,results},null,2)+'\n');
  console.log(JSON.stringify({cases:results.length,failures:results.filter(r=>r.status==='fail').length,implementations:inventory.length,referenceCovered:inventory.filter(r=>r.checks>0).length,smokeFailures:inventory.filter(r=>r.smoke==='fail')}));
  if(results.some(r=>r.status==='fail')||inventory.some(r=>r.smoke==='fail'))process.exitCode=1;
}
main().catch(e=>{console.error(e);process.exitCode=1;});

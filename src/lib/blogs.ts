export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  readTime: string;
  author: string;
  content: string;
  toolId?: string;
  keywords: string[];
}

export function readingTime(content: string): string {
 const words = content.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[#*`|]/g, " ").trim().split(/\s+/).filter(Boolean).length;
 return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    "slug": "how-to-use-scientific-calculator-online",
    "title": "Scientific Calculator: Angles, Powers and Precision",
    "description": "Before entering a long expression in the Scientific Calculator, verify a few known values. In degree mode, sin(30) should be approximately 0.5. In radian mode, sin(π/6) should give the ",
    "date": "2026-08-01",
    "category": "Math & Calculators",
    "readTime": "4 min read",
    "author": "Team Yuitility",
    "toolId": "scientific-calculator",
    "keywords": [
      "scientific calculator online",
      "free scientific calculator",
      "trigonometry calculator",
      "logarithm calculator online"
    ],
    "content": "Before entering a long expression in the [Scientific Calculator](/tools/scientific-calculator), verify a few known values. In degree mode, sin(30) should be approximately 0.5. In radian mode, sin(π/6) should give the same value. A different answer may mean the angle mode is wrong.\n\n### Reproduce the operation order\nCompare 2 + 3 × 4 = 14 with (2 + 3) × 4 = 20. Use parentheses around a negative base: (-2)^2 is 4. A parser may interpret -2^2 as -(2^2). When notation is ambiguous, split the expression into explicit steps.\n\nCheck that log(100) means the base-10 logarithm and returns 2. ln denotes the natural logarithm. Keep the expression with the saved result so another person can reproduce it.\n\n### Read precision honestly\nJavaScript numbers have finite precision. Very large factorials overflow, and subtraction of nearly equal numbers can lose precision. Keep extra digits during intermediate steps and round only when justified by the input. A displayed last digit is not a proof of exactness. See [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).",
    "updated": "2026-10-13"
  },
  {
    "slug": "understanding-salary-take-home-pay-and-epf",
    "title": "CTC to Take-Home: A Worked FY 2025–26 Example",
    "description": "Cost to Company is an employer budget, not your bank credit. The India Salary Calculator models salary-only income under the new regime for FY 2025–26 / AY 2026–27. It does not automati",
    "date": "2026-07-28",
    "category": "Finance & Wealth",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "salary-calculator",
    "keywords": [
      "salary take home calculator",
      "in hand salary calculator",
      "epf deduction formula",
      "ctc to in hand calculator"
    ],
    "content": "Cost to Company is an employer budget, not your bank credit. The [India Salary Calculator](/tools/salary-calculator) models salary-only income under the new regime for FY 2025–26 / AY 2026–27. It does not automatically model every benefit in an offer letter.\n\n### Reproduce a ₹10 lakh example\nEnter ₹10,00,000 CTC, 50% basic pay, ₹1,00,000 included annual bonus, capped EPF and ₹2,500 annual professional tax. Keep other deductions at zero and resident rebate eligibility selected.\n\nEmployer EPF is capped at ₹21,600 per year in this scenario. Gross salary is therefore ₹9,78,400. The included bonus remains taxable. After the ₹75,000 standard deduction, taxable salary is ₹9,03,400. The eligible resident rebate reduces tax to zero at this level.\n\nEmployee EPF of ₹21,600 and professional tax of ₹2,500 are deducted from pay. Annual net including the bonus is ₹9,54,300. Because the ₹1,00,000 bonus is paid separately, regular monthly net is (₹9,54,300 − ₹1,00,000) / 12 = ₹71,191.67.\n\n### Three differences that change the answer\nA bonus included in CTC differs from a bonus on top of CTC; this calculator assumes it is included. Payroll deductions are not automatically tax deductions: employee EPF and professional tax reduce pay here but not the new-regime taxable base. Professional tax also varies by state; enter zero where it does not apply.\n\n### Check the scope\nAnnual tax is spread evenly across twelve months. Actual bonus withholding may happen in particular months. Employer insurance, gratuity, NPS, stock awards, special-rate income and surcharge are outside this model. Compare these with your offer and payroll statement.\n\nCheck the named year and regime against the [Income Tax Department guidance](https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1). A salary estimate is not a tax return.",
    "updated": "2026-10-13"
  },
  {
    "slug": "why-in-browser-pdf-tools-are-more-secure",
    "title": "Merge PDFs Locally: Verify the File and the Data Flow",
    "description": "The PDF Merger combines selected files in browser memory. This removes a file-processing upload step, but does not guarantee regulatory compliance or protect a compromised device.",
    "date": "2026-07-25",
    "category": "PDF Tools",
    "readTime": "6 min read",
    "author": "Team Yuitility",
    "toolId": "pdf-merger",
    "keywords": [
      "private pdf merger",
      "pdf editor offline",
      "merge pdf without upload",
      "secure pdf tools online"
    ],
    "content": "The [PDF Merger](/tools/pdf-merger) combines selected files in browser memory. This removes a file-processing upload step, but does not guarantee regulatory compliance or protect a compromised device.\n\n### Start with a reproducible sample\nCreate two small PDFs with visible labels A1, A2 and B1. Select them, arrange their order using the available controls and merge. Open the download in a separate viewer. Confirm three pages in the expected order, with selectable text where the original had selectable text.\n\nRepeat with your intended files after the sample behaves correctly. Keep the originals. Inspect rotation, page sizes, annotations, links and important form fields. Combining documents does not preserve the validity of signatures over the original file bytes.\n\n### Verify local processing\nOpen developer tools, select Network and operate the merger with sample files. Inspect outgoing request payloads. Requests for application code differ from uploading PDF content. The separate AI assistant and contact form send messages to servers: do not paste document contents into them as part of a privacy test.\n\n### Practical limits\nLarge documents consume device memory. Mobile browsers may terminate a tab before a desktop browser would. Try a smaller set if processing fails. Encrypted or malformed files may need a different workflow. There is no universal promise that every PDF feature survives a rewrite.\n\nThe application uses [pdf-lib](https://pdf-lib.js.org/docs/api/classes/pdfdocument) for document manipulation. Keep original files as a recovery copy and verify the exported document before distributing it. For size reduction, the [PDF Structure Optimizer](/tools/pdf-compressor) rewrites objects and removes metadata; it does not recompress embedded photographs.",
    "updated": "2026-10-13"
  },
  {
    "slug": "optimizing-web-images-webp-avif-jpg-conversion",
    "title": "Choose WebP, PNG or JPEG with a Real Comparison",
    "description": "Image compression depends on dimensions, format, quality and picture content. There is no universal “80% smaller with no loss” setting. Use the Image Compressor and Format Converter to ",
    "date": "2026-07-20",
    "category": "Image & Media",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "image-compressor",
    "keywords": [
      "image compressor online",
      "convert png to webp",
      "compress image without losing quality",
      "webp converter free"
    ],
    "content": "Image compression depends on dimensions, format, quality and picture content. There is no universal “80% smaller with no loss” setting. Use the [Image Compressor](/tools/image-compressor) and [Format Converter](/tools/format-converter) to compare outputs from your actual image.\n\n### A useful comparison workflow\n1. Keep an original and note its pixel dimensions and file size.\n2. Resize to the largest dimensions the destination needs, allowing for high-density displays where appropriate.\n3. Export a candidate. Inspect it at the intended display size and 100% zoom. Check small text, gradients, hair, sharp edges and transparent boundaries.\n4. Compare bytes using (original − output) / original × 100. Reducing 800,000 bytes to 320,000 bytes is a 60% reduction. This is an arithmetic example, not a universal benchmark.\n5. Open the final download in the application where it will be used.\n\n### Format choices\nJPEG is common for photographs without transparency. PNG supports lossless graphics and transparency but can be large for photographs. WebP supports lossy and lossless forms and is worth comparing. This converter exports WebP, PNG or JPEG, not GIF or AVIF. Canvas conversion creates a still image and does not preserve animation.\n\n### Quality settings have limits\nA quality setting is an encoder input, not a percentage of visual fidelity. Two formats or browsers may produce different files at the same setting. Repeated lossy recompression can accumulate artifacts; start from the original for each comparison.\n\nConsult the [MDN image format guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types) for format characteristics. Choose the measured file and visible result, not a promised PageSpeed score.",
    "updated": "2026-10-13"
  },
  {
    "slug": "how-to-calculate-home-loan-prepayment-savings",
    "title": "Home Loan Prepayment: Compare the Same Loan Twice",
    "description": "Prepayment reduces the balance on which future interest is charged. Savings depend on rate, timing, remaining term, fees and whether the lender reduces the payment or the term. A saving",
    "date": "2026-08-09",
    "category": "Finance & Wealth",
    "readTime": "6 min read",
    "author": "Team Yuitility",
    "toolId": "home-loan-emi-calculator",
    "keywords": [
      "home loan prepayment calculator",
      "how extra mortgage payments save interest",
      "reduce home loan tenure",
      "partial home loan prepayment"
    ],
    "content": "Prepayment reduces the balance on which future interest is charged. Savings depend on rate, timing, remaining term, fees and whether the lender reduces the payment or the term. A savings table without those assumptions cannot be reproduced.\n\n### First-month example\nFor principal 100,000 at 6% nominal annual interest, monthly interest is 500. If the payment is 1,000, only 500 reduces principal. An extra 2,000 principal payment leaves 97,500 instead of 99,500. With an unchanged rate, next-month interest becomes 487.50 instead of 497.50.\n\n### Compare like for like\nUse the [Home Loan EMI Calculator](/tools/home-loan-emi-calculator) for a baseline, then change only a supported prepayment assumption. Record the date, payment, rate and remaining term. Holding the payment fixed differs from recalculating it after prepayment.\n\nAn unchanged rate is an assumption, not a lender commitment. Include prepayment charges and verify the lender’s allocation rules. The month above explains the mechanism; it is not a quoted lifetime saving for an unspecified loan.",
    "updated": "2026-10-13"
  },
  {
    "slug": "step-up-sip-vs-regular-sip-wealth-comparison",
    "title": "Step-Up SIP: Separate Extra Deposits from Returns",
    "description": "A step-up SIP increases contributions over time. A larger final balance can reflect more money deposited, not only investment gains. Compare both in the Step-Up SIP Calculator.",
    "date": "2026-08-11",
    "category": "Finance & Wealth",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "sip-step-up-calculator",
    "keywords": [
      "step up sip calculator",
      "top up sip returns comparison",
      "annual sip increment wealth",
      "mutual fund step up sip vs regular sip"
    ],
    "content": "A step-up SIP increases contributions over time. A larger final balance can reflect more money deposited, not only investment gains. Compare both in the [Step-Up SIP Calculator](/tools/sip-step-up-calculator).\n\n### Check deposits first\nAt 5,000 per month, year-one contributions are 60,000. A 10% annual step-up makes year-two contributions 5,500 per month, or 66,000. The two-year total is 126,000 before growth, compared with 120,000 for an unchanged contribution.\n\nIf a projection reports a 10,000 advantage for the step-up scenario, 6,000 comes from extra contributions in this example. The rest may be modeled growth, depending on timing and return assumptions.\n\n### Keep scenarios comparable\nUse the same duration, return and contribution timing. Check when the annual increase begins. At 0% return, projected balance should equal total deposits; this is a useful verification case.\n\nA constant return smooths market variation and excludes fees and tax unless explicitly modeled. A projected target is not a guaranteed mutual-fund outcome. Review contribution affordability as well as the final balance.",
    "updated": "2026-10-13"
  },
  {
    "slug": "convert-json-to-csv-excel-developer-guide",
    "title": "JSON to CSV: Quoting, Nested Values and Import",
    "description": "The JSON to CSV Converter expects a non-empty array of objects. CSV has one cell at each row-and-column intersection; JSON can contain arrays and objects inside values. Decide how to re",
    "date": "2026-08-13",
    "category": "Developer & Text",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "json-to-csv-converter",
    "keywords": [
      "convert json to csv online",
      "json array to excel converter",
      "export json to csv browser",
      "json to csv parser free"
    ],
    "content": "The [JSON to CSV Converter](/tools/json-to-csv-converter) expects a non-empty array of objects. CSV has one cell at each row-and-column intersection; JSON can contain arrays and objects inside values. Decide how to represent those structures before exporting.\n\n### Reproduce a quoting test\nTry an object whose name field contains A, B, whose note includes quotation marks, and whose identifier is the string 0012. A comma-containing field needs quotes in comma-delimited CSV. Quotes inside a quoted field are doubled. The identifier must remain text when imported into a spreadsheet.\n\nThe converter uses the union of object keys as headers. A missing key or null produces an empty cell. Nested objects and arrays are serialized as JSON text inside a cell, not expanded into rows or columns. Flatten deliberately if your analysis needs separate columns.\n\n### Import instead of double-clicking\nUse the spreadsheet’s text import controls to choose delimiter and encoding. Import identifiers as text so leading zeroes survive and long numbers are not rounded. Cells beginning with formula characters are prefixed with an apostrophe for spreadsheet safety; this intentionally changes the raw cell value.\n\n### Verify the output\nCompare row counts, headers, a comma-containing value, a newline and a missing field. Keep the JSON alongside the CSV. CSV cannot preserve every JSON type without conventions, so a successful download does not prove semantic equivalence.\n\nQuoting conventions are described in [RFC 4180](https://www.rfc-editor.org/rfc/rfc4180). Spreadsheet behavior can still vary by application.",
    "updated": "2026-10-13"
  },
  {
    "slug": "how-pomodoro-technique-improves-coding-productivity",
    "title": "Try a Focus Timer Without Treating 25 Minutes as a Rule",
    "description": "A timer gives a task a visible boundary, but the duration should fit the work. Try the Pomodoro Timer with a specific outcome, such as writing one test or reviewing one function.",
    "date": "2026-08-15",
    "category": "Everyday Utilities",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "pomodoro-timer",
    "keywords": [
      "pomodoro technique for developers",
      "25 minute focus timer online",
      "boost coding productivity pomodoro",
      "free pomodoro interval timer"
    ],
    "content": "A timer gives a task a visible boundary, but the duration should fit the work. Try the [Pomodoro Timer](/tools/pomodoro-timer) with a specific outcome, such as writing one test or reviewing one function.\n\n### Run a small experiment\nChoose a task you can describe in one sentence. Remove distractions, start a 25-minute session if that length suits you, and note interruptions instead of switching tasks immediately. Afterwards, record what was completed and whether the timer helped. Take a break before choosing the next task.\n\nDeep debugging may suit a longer uninterrupted period; routine administration may suit shorter blocks. The timer does not establish one scientifically optimal duration for everyone.\n\n### Check browser behavior\nA background tab or sleeping device can throttle timers. Sound and notifications depend on browser settings and permissions. Test them before relying on the timer as an alarm.\n\nCompare completed work and interruption count across similar sessions, not just the number of cycles. Adjust or stop the technique if it increases stress or interrupts useful concentration.",
    "updated": "2026-10-13"
  },
  {
    "slug": "how-to-calculate-daily-calorie-deficit-for-fat-loss",
    "title": "Calorie Deficit Estimates: Know the Model’s Limits",
    "description": "A calorie calculator estimates energy needs from limited inputs. It does not measure metabolism, establish a safe intake or predict an exact weight change. Read the Calorie Deficit Calc",
    "date": "2026-08-17",
    "category": "Health & Lifestyle",
    "readTime": "6 min read",
    "author": "Team Yuitility",
    "toolId": "calorie-deficit-calculator",
    "keywords": [
      "calorie deficit calculator fat loss",
      "how to calculate TDEE for weight loss",
      "safe daily calorie deficit",
      "bmr and tdee calculator"
    ],
    "content": "A calorie calculator estimates energy needs from limited inputs. It does not measure metabolism, establish a safe intake or predict an exact weight change. Read the [Calorie Deficit Calculator](/tools/calorie-deficit-calculator) as an illustration.\n\n### Separate arithmetic from a recommendation\nIf estimated maintenance is 2,300 kcal, subtracting an illustrative 300 kcal gives 2,000 kcal. Both the maintenance figure and the chosen difference need scrutiny. This does not recommend that every person eat 2,000 kcal or use that difference.\n\nActivity categories are broad. People choosing the same category may expend different amounts of energy. Intake records also have measurement error, and short-term weight changes can reflect water and digestion rather than body fat.\n\n### Scope matters\nGeneric adult calculators do not replace individual care, especially for children, pregnancy, breastfeeding, eating-disorder history or conditions affecting nutrition. A low calculated result is not evidence of a safe target.\n\nSee the [NIDDK Body Weight Planner](https://www.niddk.nih.gov/health-information/weight-management/body-weight-planner) for model context and discuss personal targets with a qualified clinician or registered dietitian. Numerical precision on a screen is formatting, not proof of physiological precision.",
    "updated": "2026-10-13"
  },
  {
    "slug": "convert-svg-to-png-high-resolution-graphics",
    "title": "SVG to PNG: Dimensions, Fonts and Rendering Checks",
    "description": "SVG describes shapes; PNG stores pixels. The SVG to PNG Converter chooses a raster size for drawing those shapes when a destination needs a PNG.",
    "date": "2026-08-19",
    "category": "Image & Media",
    "readTime": "4 min read",
    "author": "Team Yuitility",
    "toolId": "svg-to-png-converter",
    "keywords": [
      "convert svg to png online",
      "svg to png transparent background",
      "vector to png high resolution",
      "svg converter client side"
    ],
    "content": "SVG describes shapes; PNG stores pixels. The [SVG to PNG Converter](/tools/svg-to-png-converter) chooses a raster size for drawing those shapes when a destination needs a PNG.\n\n### Choose dimensions deliberately\nA logo displayed at 600 CSS pixels wide might use a 1200-pixel image for a high-density display. Preserve aspect ratio: doubling a 600 × 300 image gives 1200 × 600, not 1200 × 300.\n\nAn SVG can reference fonts, images, filters or external resources. Missing fonts may render differently; external resources may fail. Inspect the export rather than assuming every valid SVG renders identically. An embedded raster image does not gain detail by enlarging the SVG wrapper.\n\n### Verify the download\nCheck output dimensions in another viewer. Inspect fine text and strokes at 100% zoom. For transparent output, inspect edges on both light and dark backgrounds. Retain the SVG as the editable source.\n\nSee the [SVG documentation](https://developer.mozilla.org/en-US/docs/Web/SVG) for vector-format behavior. A larger file is not automatically a better image.",
    "updated": "2026-10-13"
  },
  {
    "slug": "decoding-jwt-tokens-locally-browser-security",
    "title": "Decode JWT Claims Locally Without Trusting Them",
    "description": "Decoding and verification are different operations. The JWT Decoder displays readable token sections. It does not establish that the issuer signed the token, that the signature is valid",
    "date": "2026-08-21",
    "category": "Developer & Text",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "jwt-decoder",
    "keywords": [
      "decode jwt token online",
      "jwt payload viewer free",
      "jwt header claims parser",
      "private jwt decoder browser"
    ],
    "content": "Decoding and verification are different operations. The [JWT Decoder](/tools/jwt-decoder) displays readable token sections. It does not establish that the issuer signed the token, that the signature is valid or that your application should accept it.\n\n### Inspect the structure\nA common signed compact JWT has three dot-separated sections: header, payload and signature. Header and payload use base64url encoding. Encoding is not encryption; anyone with the token can generally read these sections. Never paste a real production bearer token into a public chat or issue report.\n\n### Work with a harmless example\nUse a synthetic payload such as {\"sub\":\"demo\",\"role\":\"reader\"}. Editing a payload can still leave readable JSON. That demonstrates why displayed claims are not proof of authenticity: acceptance requires verification with the correct key and algorithm.\n\n### Expiration is one check\nAn exp claim typically uses seconds since the Unix epoch. Convert seconds, not milliseconds. A future expiration does not establish the correct issuer, audience, signature or authorization. Clock tolerance and acceptance policies belong to the validating system.\n\nUse a maintained verification library in application code, restrict accepted algorithms and keys, and validate required claims. See [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519). The local decoder is an inspection aid, not an authentication decision.",
    "updated": "2026-10-13"
  },
  {
    "slug": "sukanya-samriddhi-yojana-ssy-tax-free-savings",
    "title": "SSY Projections: Check the Rate and Deposit Timing",
    "description": "A savings projection depends on deposits and the rates applied over time. The SSY Calculator is a scenario tool; a displayed default is not a promise of a constant future rate.",
    "date": "2026-08-23",
    "category": "Finance & Wealth",
    "readTime": "6 min read",
    "author": "Team Yuitility",
    "toolId": "ssy-calculator",
    "keywords": [
      "sukanya samriddhi yojana calculator",
      "ssy maturity interest calculation",
      "ssy tax exemption section 80C",
      "girl child financial planning ssy"
    ],
    "content": "A savings projection depends on deposits and the rates applied over time. The [SSY Calculator](/tools/ssy-calculator) is a scenario tool; a displayed default is not a promise of a constant future rate.\n\n### Separate deposits and interest\nTwelve monthly deposits of 5,000 total 60,000 in a year. Fifteen such years total 900,000 before interest. Actual contribution limits, eligibility and permitted deposit periods must be checked separately against current scheme documentation.\n\nDeposit dates matter when interest depends on a qualifying balance. Grouping deposits annually may differ from an account calculation using monthly balances. Read the timing assumptions before comparing a projection with a passbook.\n\n### Verify outside the calculator\nCheck current rates, account dates, contribution limits, withdrawal conditions and eligibility with the official account provider. Do not infer tax eligibility from a projected maturity amount.\n\nRun a lower-rate scenario as well as the default, and save the assumed rate and date with the result. This is a method for evaluating a projection, not current account-opening or tax advice.",
    "updated": "2026-10-13"
  },
  {
    "slug": "understanding-password-entropy-and-crack-times",
    "title": "Password Scores Are Estimates, Not Crack-Time Guarantees",
    "description": "The Password Strength Checker evaluates local heuristics. It cannot know an attacker’s resources, a service’s hashing settings, rate limits or whether a password has leaked.",
    "date": "2026-08-25",
    "category": "Developer & Text",
    "readTime": "6 min read",
    "author": "Team Yuitility",
    "toolId": "password-strength-checker",
    "keywords": [
      "password entropy calculator",
      "password crack time estimation",
      "how to measure password strength",
      "bits of entropy explained"
    ],
    "content": "The [Password Strength Checker](/tools/password-strength-checker) evaluates local heuristics. It cannot know an attacker’s resources, a service’s hashing settings, rate limits or whether a password has leaked.\n\n### Understand the entropy formula\nFor uniformly random independent characters from N symbols, length L has L × log2(N) bits of selection entropy. Sixteen characters chosen uniformly from 64 symbols give 96 bits. The same formula does not describe a human phrase merely because it contains several character classes.\n\nPredictable substitutions and appended years do not make a familiar word random. A tool can overstate strength when it counts the possible alphabet but ignores how the string was chosen.\n\n### Use the score appropriately\nTest invented strings, not a credential you depend on. Distinguish search-space size from a crack-time estimate, which requires a stated guessing rate and storage model.\n\nUse unique credentials, a trustworthy password manager and available multifactor authentication. A local score is feedback about a string, not a breach check or security certification. No password is made “uncrackable” by a green indicator.",
    "updated": "2026-10-13"
  },
  {
    "slug": "estimating-room-paint-volume-and-renovation-costs",
    "title": "Paint Quantity: Area, Coats and Coverage",
    "description": "The Paint Volume Calculator helps with area arithmetic. Product coverage and wall condition determine the real quantity required.",
    "date": "2026-08-27",
    "category": "Everyday Utilities",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "paint-volume-calculator",
    "keywords": [
      "paint volume calculator wall area",
      "how much paint for room square footage",
      "calculate paint gallons needed",
      "room wall paint cost estimator"
    ],
    "content": "The [Paint Volume Calculator](/tools/paint-volume-calculator) helps with area arithmetic. Product coverage and wall condition determine the real quantity required.\n\n### Work through one room\nA 4 m × 3 m room with 2.5 m walls has wall area 2 × (4 + 3) × 2.5 = 35 m² before openings. If doors and windows total 5 m², paintable area is 30 m². Two coats at an assumed 10 m² per litre per coat require 30 × 2 / 10 = 6 litres.\n\nAn explicit 10% allowance gives 6.6 litres. Round the purchase to available container sizes while keeping the allowance visible.\n\n### Check the inputs\nUse one unit system. Add the ceiling only if it will be painted, and calculate it separately if the product differs. Rough or unpainted walls can change coverage and preparation requirements. Start with manufacturer coverage, then account for the actual surface.\n\nPaint volume is not a complete renovation cost. Primer, repairs, labour and drying time need separate planning. Keep the measurements so the estimate can be checked before purchasing.",
    "updated": "2026-10-13"
  },
  {
    "slug": "understanding-crypto-trading-fees-and-break-even",
    "title": "Trading Fees: A Checkable Break-Even Example",
    "description": "Profit is net sale proceeds minus acquisition cost and fees. The Crypto Profit Calculator models a transaction; it neither forecasts prices nor calculates tax liability.",
    "date": "2026-08-29",
    "category": "Finance & Wealth",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "crypto-profit-calculator",
    "keywords": [
      "crypto profit calculator exchange fees",
      "calculate crypto break even sell price",
      "crypto trading maker taker fee impact",
      "net crypto roi calculator"
    ],
    "content": "Profit is net sale proceeds minus acquisition cost and fees. The [Crypto Profit Calculator](/tools/crypto-profit-calculator) models a transaction; it neither forecasts prices nor calculates tax liability.\n\n### Include both sides\nBuy one unit at 1,000 with a 1% fee paid in cash: cost is 1,010. Sell at 1,100 with a 1% fee deducted from proceeds: receive 1,089. Profit is 79, not the 100 price increase. Return on the 1,010 cost is approximately 7.82%.\n\nFor break-even price P, P × 0.99 = 1,010. Therefore P is approximately 1,020.20. Simply adding two percentage points gives only an approximation.\n\n### Check fee units\nFees may be paid in cash, the purchased asset or another token. These change the quantity or cost basis. Spread, slippage, network charges and conversion costs may be separate.\n\nSave quantities and fee assumptions with the result. Multiple lots or fees in another asset require more detailed accounting; this single-transaction example does not reproduce a complete trading history.",
    "updated": "2026-10-13"
  },
  {
    "slug": "how-to-strip-exif-metadata-from-photos-for-privacy",
    "title": "Inspect JPEG EXIF Without Inventing Missing Metadata",
    "description": "The JPEG EXIF Inspector reads supported tags from the selected JPEG. It does not guess a camera from a filename or insert example camera values when metadata is missing.",
    "date": "2026-08-31",
    "category": "Image & Media",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "exif-data-viewer",
    "keywords": [
      "strip EXIF metadata from photo",
      "remove GPS location from image",
      "view photo EXIF tags online",
      "private image metadata remover"
    ],
    "content": "The [JPEG EXIF Inspector](/tools/exif-data-viewer) reads supported tags from the selected JPEG. It does not guess a camera from a filename or insert example camera values when metadata is missing.\n\n### What is inspected\nThe parser checks a JPEG APP1 EXIF block and reads a bounded set of TIFF tags: camera make/model, orientation, selected timestamps, exposure, aperture, ISO, focal length, dimensions and GPS values. GPS may appear as degrees, minutes and seconds plus a hemisphere reference. A timestamp is camera-supplied data, not proof of when a picture was taken.\n\n### Compare two real files\nInspect an original JPEG from your camera and a copy exported by an editor. Compare the fields. Some exports preserve metadata; others remove or rewrite it. Do not assume every exporter behaves identically from one sample.\n\nA file can lack supported EXIF fields while containing XMP, thumbnails or manufacturer-specific metadata. This tool does not parse PNG, HEIC or WebP metadata. Filename and byte count are file properties, not camera EXIF.\n\n### Inspection is not removal\nOpening a JPEG does not change it or strip location data. Use an appropriate removal workflow and inspect the output independently before sharing. Also check for addresses, faces and other information visible in the pixels; removing metadata cannot remove those details.\n\nKeep the original while testing. This is a limited report about parsed fields, not a guarantee that an image is anonymous.",
    "updated": "2026-10-13"
  },
  {
    "slug": "how-to-clean-and-deduplicate-large-text-lists",
    "title": "Deduplicate Lines Without Losing Meaningful Differences",
    "description": "Duplicate removal depends on what “the same” means. Check the available comparison options in the Duplicate Line Remover before replacing a production list.",
    "date": "2026-09-02",
    "category": "Developer & Text",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "duplicate-line-remover",
    "keywords": [
      "remove duplicate lines online",
      "deduplicate text list free",
      "clean text smart quotes online",
      "strip blank lines from text"
    ],
    "content": "Duplicate removal depends on what “the same” means. Check the available comparison options in the [Duplicate Line Remover](/tools/duplicate-line-remover) before replacing a production list.\n\n### Test with four lines\nUse apple, Apple, apple with a trailing space, and a second exact apple. Exact comparison should distinguish capitalization and trailing space. Case-insensitive comparison may merge the first pair; trimming whitespace may merge another. The right policy depends on the data.\n\nPreserve order when the first occurrence matters. Sort only when sorted output is intended. Leading zeroes, case and punctuation can be significant in identifiers, so indiscriminate cleaning may corrupt them.\n\n### Verify the output\nKeep the original. Compare counts and inspect removed examples. Test blank lines and lines containing spaces, and check Windows versus Unix line endings if the list moves between systems.\n\nFor structured data with quoted fields or embedded newlines, use the format’s parser rather than treating each line as a record. Deduplication is safe only when the comparison policy matches the meaning of the records.",
    "updated": "2026-10-13"
  },
  {
    "slug": "calculating-appliance-electricity-power-consumption",
    "title": "Estimate Appliance Energy from Watts and Time",
    "description": "Power is a rate measured in watts; billed energy is commonly measured in kilowatt-hours. The Power Consumption Calculator makes a usage scenario explicit.",
    "date": "2026-09-04",
    "category": "Everyday Utilities",
    "readTime": "6 min read",
    "author": "Team Yuitility",
    "toolId": "power-consumption-calculator",
    "keywords": [
      "appliance electricity usage calculator",
      "convert Watts to kWh monthly cost",
      "calculate electric bill by appliance",
      "air conditioner power consumption kWh"
    ],
    "content": "Power is a rate measured in watts; billed energy is commonly measured in kilowatt-hours. The [Power Consumption Calculator](/tools/power-consumption-calculator) makes a usage scenario explicit.\n\n### Check the units\nA constant 100 W for 5 hours uses 100 / 1000 × 5 = 0.5 kWh. Repeated for 30 days, that is 15 kWh. At an illustrative 0.20 per kWh, the energy charge is 3.00 currency units, excluding fixed charges and other tariff components.\n\n### Maximum power is not average power\nA heater cycles, a refrigerator changes load and a laptop charger’s maximum rating does not equal average laptop consumption. Use measured energy over a representative period when possible, rather than assuming maximum draw whenever a device is plugged in.\n\nCheck flat, tiered or time-dependent rates and include standby use separately when relevant. Mixing W and kW creates a factor-of-1,000 error.\n\nThe estimate covers the modeled appliance. Other devices, taxes and service charges explain why it will not reproduce an entire household bill.",
    "updated": "2026-10-13"
  },
  {
    "slug": "how-to-open-and-view-md-files-online",
    "title": "Preview Markdown and Verify the Export",
    "description": "The Markdown Viewer provides local editing and preview. Markdown implementations differ; check the system where the document will ultimately be published.",
    "date": "2026-09-06",
    "category": "Developer & Text",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "markdown-viewer",
    "keywords": [
      "open md file online free",
      "markdown viewer browser",
      "convert md to pdf online",
      "github markdown viewer private"
    ],
    "content": "The [Markdown Viewer](/tools/markdown-viewer) provides local editing and preview. Markdown implementations differ; check the system where the document will ultimately be published.\n\n### Build a compatibility sample\nInclude a heading, emphasis, link, code fence, table and checklist. Preview it, export using available controls and inspect the downloaded document separately. Check page breaks, long code lines, tables and link destinations. A file opening successfully does not establish identical layout.\n\nFor a README, inspect the final repository rendering. Platform extensions, HTML handling and alerts may differ from this viewer.\n\n### Watch relative paths\nA path such as ./images/diagram.png is relative to the document location. A standalone preview may not have access to the repository file tree. A missing image can be a path issue rather than invalid Markdown.\n\nRetain the .md file as the source and treat PDF or Word output as delivery formats. The [CommonMark specification](https://spec.commonmark.org/0.31.2/) defines core syntax; platforms can add extensions. Test the features your actual document relies on.",
    "updated": "2026-10-13"
  },
  {
    "slug": "understanding-ohms-law-voltage-current-resistance",
    "title": "Ohm’s Law: An Example with Explicit Units",
    "description": "For an ideal resistive DC circuit, V = I × R. The Ohm’s Law Calculator solves the missing quantity, but does not establish that a real circuit is safe.",
    "date": "2026-09-08",
    "category": "Math & Calculators",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "ohms-law-calculator",
    "keywords": [
      "ohms law calculator voltage current",
      "calculate electrical power watts",
      "voltage resistance current formula",
      "electronics circuit calculator online"
    ],
    "content": "For an ideal resistive DC circuit, V = I × R. The [Ohm’s Law Calculator](/tools/ohms-law-calculator) solves the missing quantity, but does not establish that a real circuit is safe.\n\n### Verify two ways\nTwelve volts across 6 Ω gives 2 A. Power is V × I = 24 W. The equivalent I²R expression gives 2² × 6 = 24 W, providing an independent check.\n\nConvert 250 mA to 0.25 A before using base units. Similarly, 2 kΩ means 2,000 Ω. A unit error can produce a precise-looking answer that is wrong by a factor of 1,000.\n\n### Respect the boundary\nComponents have tolerances and operating limits. Nonlinear devices do not obey a fixed resistance in every condition. AC circuits may require impedance and phase, rather than resistance alone. Dividing nonzero voltage by zero resistance is undefined in this ideal calculation.\n\nUse component specifications and appropriate engineering checks before building hardware. This example demonstrates arithmetic; it is not wiring guidance or a substitute for electrical safety requirements.",
    "updated": "2026-10-13"
  },
  {
    "slug": "how-to-encrypt-sensitive-text-in-browser",
    "title": "Local Text Encryption: Save the Envelope and Protect the Key",
    "description": "The Text Encryptor uses Web Crypto AES-256-GCM. It derives a key with PBKDF2-SHA256, 600,000 iterations, a fresh 16-byte salt and a fresh 12-byte nonce for each encryption.",
    "date": "2026-09-10",
    "category": "Developer & Text",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "text-encryptor",
    "keywords": [
      "encrypt text online aes 256",
      "private text encryption browser",
      "secret message encryptor passphrase",
      "web crypto api client side encryption"
    ],
    "content": "The [Text Encryptor](/tools/text-encryptor) uses Web Crypto AES-256-GCM. It derives a key with PBKDF2-SHA256, 600,000 iterations, a fresh 16-byte salt and a fresh 12-byte nonce for each encryption.\n\n### Try a harmless round trip\nEnter a test message and a passphrase of at least twelve characters. Encrypt and save the complete JSON envelope. Switch to decrypt, paste the envelope and enter the same passphrase. The original Unicode text should return exactly. An incorrect passphrase or modified ciphertext should produce an error rather than plausible garbage.\n\n### What to save\nThe envelope includes version, algorithm identifiers, iteration count, salt, nonce and ciphertext. Keep these together. Salt and nonce are not passwords; the passphrase is the secret. Store it separately rather than sending it alongside the encrypted message through the same channel.\n\nRepeated encryption of identical input produces different envelopes because fresh randomness is used. That does not change the recovered plaintext.\n\n### Limits that still matter\nEncryption cannot protect text already exposed on a compromised device. Weak or reused passphrases remain vulnerable to guessing; the minimum length check is not a strength guarantee. There is no key-recovery service. Legacy XOR output from the previous implementation is not a v1 authenticated envelope.\n\nDo not paste messages or keys into the separate AI assistant. See [MDN Web Crypto documentation](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt) for authenticated encryption. This is a local utility, not an audited secret-management system.",
    "updated": "2026-10-13"
  },
  {
    "slug": "how-to-calculate-meeting-costs-and-improve-focus",
    "title": "Meeting Cost: Estimate Time, Then Assess Value",
    "description": "A meeting-cost estimate turns attendee time into an approximate labour cost. It does not prove a meeting is wasteful: useful coordination can avoid more work later. Use the Meeting Cost",
    "date": "2026-09-12",
    "category": "Everyday Utilities",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "meeting-cost-calculator",
    "keywords": [
      "calculate meeting cost per hour",
      "financial cost of corporate meetings",
      "meeting expense calculator live",
      "reduce meeting burnout productivity"
    ],
    "content": "A meeting-cost estimate turns attendee time into an approximate labour cost. It does not prove a meeting is wasteful: useful coordination can avoid more work later. Use the [Meeting Cost Calculator](/tools/meeting-cost-calculator) as one planning input.\n\n### Make units visible\nSix attendees at an assumed hourly cost of 40, meeting for 45 minutes, give 6 × 40 × 45 / 60 = 180 currency units. Repeated weekly for 50 weeks, that is an illustrative 9,000 annual time cost.\n\nWhen deriving hourly cost from salary, state the hours denominator. Salary divided by 2,080 assumes 40 hours for 52 weeks. Fully loaded cost may also include benefits and overhead; mixing it with salary-only rates makes comparisons misleading.\n\n### Compare alternatives fairly\nEstimate a shorter meeting, fewer attendees or asynchronous preparation while keeping necessary decision-makers involved. Record the intended outcome and whether it happened.\n\nPreparation, follow-up and opportunity costs are excluded unless entered explicitly. Removing a useful meeting can move costs elsewhere. Save the assumptions with the estimate instead of treating the number as a verdict.",
    "updated": "2026-10-13"
  },
  {
    "slug": "how-to-extract-colors-from-images-for-web-design",
    "title": "Sample Image Colors and Check Text Contrast",
    "description": "The Image Color Picker samples pixels for a palette. An attractive swatch does not automatically produce a readable text/background pair.",
    "date": "2026-09-14",
    "category": "Image & Media",
    "readTime": "5 min read",
    "author": "Team Yuitility",
    "toolId": "image-color-picker",
    "keywords": [
      "image color picker online eyedropper",
      "extract hex code from photo",
      "image color palette generator free",
      "wcag contrast color picker browser"
    ],
    "content": "The [Image Color Picker](/tools/image-color-picker) samples pixels for a palette. An attractive swatch does not automatically produce a readable text/background pair.\n\n### Sample deliberately\nCompare multiple pixels from a region, not one edge pixel. Anti-aliasing, compression, gradients and shadows can alter nearby values. Save the HEX or RGB value and source image so the sample is reproducible.\n\nFor brand assets, compare with the original design specification if available. Resizing and color management can make a screenshot sample differ from the intended source color.\n\n### Check the pair\nUse the [Color Palette tool](/tools/color-palette) to compare foreground and background. Evaluate actual text size, weight and interaction states. A pair suitable for a large heading may fail for small body text. Test light and dark themes separately and avoid using color as the only status indicator.\n\nThe [WCAG contrast criterion](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) explains text requirements. A passing color pair is one accessibility check, not certification of the whole interface.",
    "updated": "2026-10-13"
  }
].map(post => ({ ...post, readTime: readingTime(post.content) }));

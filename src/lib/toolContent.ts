import { FAQItem, Tool } from "@/src/types";

/**
 * Priority 1, Priority 2, and Tool Content Pack "How It Works" Descriptions
 */
const CUSTOM_HOW_IT_WORKS: Record<string, string> = {
  "dog-age-calculator":
    "Enter your dog's age and size/breed group. Our calculator converts it to human years using updated veterinary formulas — not the old \"multiply by 7\" myth. Small breeds age slower after year two; large breeds age faster. Results are instant and run entirely in your browser.",
  "death-calculator":
    "Enter your age, sex, and basic lifestyle factors (smoking, exercise, etc.). Our calculator estimates statistical life expectancy based on actuarial and public health data. This is a statistical estimate for informational and planning purposes only — not a medical prediction.",
  "education-loan-emi-calculator":
    "Enter your loan amount, interest rate, tenure, and moratorium period (the time during your course when repayment is paused). The calculator computes your EMI, total interest, and shows how moratorium interest gets added to your principal before repayment begins.",
  "salary-calculator":
    "Enter your annual CTC (Cost to Company). The calculator breaks it down into basic pay, HRA, allowances, EPF contribution, professional tax, and income tax deductions to show your actual monthly in-hand salary.",
  "mortgage-calculator":
    "Enter loan amount, interest rate, and tenure. The calculator computes your monthly EMI using the standard reducing-balance formula, and (for the PITI version) adds property tax, insurance, and HOA fees for a full monthly payment picture.",
  "home-loan-emi-calculator":
    "Enter loan amount, interest rate, and tenure. The calculator computes your monthly EMI using the standard reducing-balance formula, and adds property tax, insurance, and HOA fees for a full monthly payment picture.",
  "emi-calculator":
    "Enter your loan principal, annual interest rate, and tenure in months or years. The calculator uses the standard reducing-balance formula to show your monthly EMI, total interest payable, and total repayment amount.",
  "sip-calculator":
    "Enter your monthly investment amount, expected annual return rate, and investment duration. The calculator projects your total invested amount, estimated returns, and final corpus using compound growth.",
  "car-loan-emi-calculator":
    "Enter the vehicle's on-road price, down payment, interest rate, and tenure. The calculator computes your monthly EMI and total interest over the loan period.",
  "bike-loan-emi-calculator":
    "Enter the two-wheeler's on-road price, down payment amount, interest rate, and tenure to calculate your monthly EMI and total repayment.",
  "personal-loan-emi-calculator":
    "Enter your loan amount, interest rate, and tenure. The calculator shows your EMI, total interest, and total repayment, and can factor in processing fees for a true cost comparison.",
  "retirement-calculator":
    "Enter your current age, target retirement age, expected monthly expenses, and expected returns. The calculator projects your required retirement corpus, adjusted for inflation, and the monthly savings needed to reach it.",
  "fd-calculator":
    "Enter your deposit amount, interest rate, and tenure. The calculator computes your maturity value based on the compounding frequency (typically quarterly for Indian bank FDs).",
  "rd-calculator":
    "Enter your monthly deposit amount, interest rate, and tenure. The calculator computes your maturity value, accounting for the fact that each monthly deposit earns interest for a different duration.",
  "compound-interest-calculator":
    "Enter your principal, interest rate, compounding frequency, and duration. Optionally add regular monthly contributions to see how they affect total growth. The calculator shows your final amount and total interest earned.",
  "simple-interest-calculator":
    "Enter your principal, interest rate, and time period. The calculator computes interest using I = P × R × T, along with the total amount (principal + interest).",
  "ppf-calculator":
    "Enter your annual contribution amount and the calculator projects your PPF balance over the standard 15-year tenure, including compounded interest and applicable tax benefits.",
  "bmi-calculator":
    "Enter your height and weight. The calculator computes your Body Mass Index (weight in kg / height in meters squared) and shows which standard health category it falls into.",
  "json-formatter":
    "Paste your JSON data and the tool formats (pretty-prints) it with proper indentation, validates the syntax, and flags any errors like missing commas or mismatched brackets.",
  "password-generator":
    "Choose your desired password length and character types (uppercase, lowercase, numbers, symbols). The tool generates a cryptographically random password locally in your browser.",
  "qr-code-generator":
    "Enter the content you want encoded (URL, text, WiFi credentials, contact info) and the tool generates a scannable QR code, downloadable as PNG or SVG.",
  "word-counter":
    "Paste or type your text and the tool instantly shows word count, character count (with and without spaces), estimated reading time, and keyword density.",
  "image-compressor":
    "Upload a JPG, PNG, or WebP image and the tool reduces file size while preserving visual quality, processed entirely in your browser.",
  "background-remover":
    "Upload an image and the tool automatically detects and removes the background, producing a transparent PNG output you can use on any background.",
  "image-resizer":
    "Upload an image and specify your target width and height (or a percentage scale). The tool resizes the image while giving you control over aspect ratio locking.",
  "pdf-merger":
    "Upload multiple PDF files, reorder them as needed, and the tool combines them into a single PDF document, processed locally in your browser.",
  "pdf-splitter":
    "Upload a PDF and specify the page range(s) you want to extract, or split into individual pages. The tool outputs the selected pages as a new PDF.",
  "image-to-pdf":
    "Upload one or more images (JPG, PNG, WebP) and the tool converts them into a single PDF document, with each image becoming a page.",
  "gold-loan-emi-calculator":
    "Enter your gold loan amount, interest rate, and tenure in months. The calculator computes your monthly EMI, total interest, and full loan repayment amount using standard reducing-balance math processed 100% locally.",
  "business-loan-emi-calculator":
    "Enter your commercial loan amount, interest rate, and tenure in years. The calculator computes your monthly business EMI and total borrowing overhead locally in your browser with zero data uploads.",
  "swp-calculator":
    "Enter your initial mutual fund corpus, monthly withdrawal amount, expected return rate, and tenure. The calculator projects total cash payouts received and remaining balance using client-side compound interest math.",
  "epf-calculator":
    "Enter your basic monthly salary, current age, retirement age, and EPF interest rate. The calculator projects your total accumulated retirement provident fund wealth and annual interest growth locally.",
  "nps-calculator":
    "Enter your monthly contribution, current age, and expected return rate. The calculator projects total retirement wealth at age 60, along with the 60% tax-free lump sum payout and 40% annuity balance.",
  "gratuity-calculator":
    "Enter your last drawn basic salary and completed years of service (minimum 5 years). The calculator computes your lump sum gratuity benefit under the Payment of Gratuity Act 1972.",
  "hra-calculator":
    "Enter your basic salary, HRA received, annual rent paid, and city type (metro vs non-metro). The calculator applies Section 10(13A) rules to find your exact tax-exempt HRA and taxable portion.",
  "income-tax-calculator":
    "Enter your gross annual income and total tax deductions. The calculator estimates your progressive tax liability, effective tax rate, and net annual take-home pay instantly in your browser.",
  "gst-calculator":
    "Enter your transaction amount, GST rate (5%, 12%, 18%, 28%), and toggle inclusive vs exclusive tax calculation. The tool computes net price, total GST, CGST, and SGST breakdowns.",
  "credit-card-emi-calculator":
    "Enter your credit card balance, annual interest rate, tenure in months, and processing fee. The calculator computes your monthly card EMI and total borrowing cost.",
  "net-worth-calculator":
    "Enter all your cash, investments, real estate assets, and subtract mortgages, auto loans, and credit card liabilities. The calculator computes your true personal net worth instantly.",
  "emergency-fund-calculator":
    "Enter your monthly essential living expenses, target buffer (3-12 months), and current savings. The calculator shows your required safety net fund size and savings progress percentage.",
  "roi-calculator":
    "Enter your initial capital investment and final returned value. The calculator computes net profit or loss and percentage Return on Investment (ROI) instantly in browser.",
  "cagr-calculator":
    "Enter your starting investment value, final value, and number of years. The calculator computes the geometric mean Compound Annual Growth Rate (CAGR) and total percentage return.",
  "irr-calculator":
    "Enter your initial investment outflow and 4 years of expected cash inflows. The calculator calculates the Internal Rate of Return (IRR) using iterative Newton-Raphson approximation.",
  "break-even-calculator":
    "Enter your fixed overhead costs, variable cost per unit, and selling price per unit. The calculator computes the exact sales unit volume and revenue required to break even.",
  "profit-margin-calculator":
    "Enter your product cost price and selling price. The calculator computes gross profit, gross margin percentage, and markup percentage on cost instantly in browser.",
  "discount-calculator":
    "Enter the original item price and percentage discount off. The tool computes your final discounted sale price and total money saved with client-side calculations.",
  "commission-calculator":
    "Enter your total sales revenue and commission percentage rate. The calculator computes total commission earnings payout and net proceeds for the seller.",
  "currency-converter":
    "Enter the amount and select source and target currencies (USD, EUR, GBP, INR, AUD, CAD, JPY, AED, SGD). The converter calculates live foreign exchange values locally.",
  "mutual-fund-return-calculator":
    "Choose lump sum or monthly SIP mode, enter your investment amount, return rate, and tenure. The calculator projects total invested principal, wealth gain, and final maturity corpus.",
  "dividend-calculator":
    "Enter share price, number of shares owned, and annual dividend per share. The calculator computes total annual dividend income, monthly average payout, and dividend yield percentage.",
  "stock-average-calculator":
    "Enter the share quantity and buy price for your 1st and 2nd stock purchases. The calculator computes your weighted average cost per share and total capital invested.",
  "bmr-calculator":
    "Enter your sex, age, height, and weight. The calculator applies the Mifflin-St Jeor formula to compute your Basal Metabolic Rate (BMR) and daily TDEE maintenance calories.",
  "body-fat-calculator":
    "Enter your sex, height, weight, waist, neck, and hip measurements. The calculator uses US Navy formulas to estimate body fat percentage, fat mass, and lean body mass.",
  "color-palette":
    "Generate harmonious color schemes, extract palettes from images, or test contrast ratios. Copy HEX, RGB, and HSL values instantly for web design and frontend projects.",
  "pdf-watermark":
    "Upload a PDF document and add custom text or image watermarks. Adjust font size, opacity, rotation, and alignment with 100% browser-side privacy.",
  "pdf-metadata": "Upload a PDF file to view and edit title, author, subject, keywords, and creator metadata fields. Save updated PDF files instantly with no server upload.",
  "pdf-rotator":
    "Upload a PDF file and choose your desired rotation angle (90° clockwise, 180°, or 270° counter-clockwise). Select whether to rotate all pages, odd pages, even pages, or a custom page range. The tool rotates pages locally and exports your updated PDF instantly.",
  "pdf-page-numbers":
    "Upload a PDF document, select your preferred numbering format (e.g. 'Page 1 of N' or '1, 2, 3...'), choose placement (header or footer), font size, and color. The tool stamps page numbers client-side with zero data uploads.",
  "pdf-page-remover":
    "Upload any PDF document, select the specific pages you want to delete by clicking the interactive page badges or entering page ranges (e.g. 2, 4-6). The tool strips the unwanted pages and downloads your cleaned document instantly.",
  "format-converter":
    "Select image files and pick target output formats (WebP, PNG, JPEG, GIF). Client-side canvas encoding converts format types without external server processing.",
  "pdf-compressor":
    "Upload PDF files and choose compression preset levels. Client-side stream optimization reduces file megabytes while preserving document legibility.",
  "zip-extractor":
    "Select ZIP archives from your file system. The browser unpacks compressed files into accessible folders, letting you view and download files offline.",
  "unit-converter":
    "Choose measurement categories (length, mass, temperature, area, speed, volume) and enter values. Conversion formulas calculate accurate conversions instantly.",
  "meme-maker":
    "Upload images or select template graphics, type top and bottom text captions, adjust font styles, and export funny meme graphics directly from your browser.",
  "favicon-generator":
    "Upload logo graphics or design icon assets. The generator renders ICO, PNG, and SVG web app icon packages ready for deployment.",
  "og-image-generator":
    "Design 1200x630 Open Graph social media preview banners for blog posts and websites. Customize background gradients, headlines, tags, and export PNG cards.",
  "social-media-resizer":
    "Upload image graphics and select social media platform templates (Instagram posts/stories, Twitter banners, YouTube thumbnails, LinkedIn covers) for instant cropping.",
  "fake-data-generator":
    "Configure dataset parameters and row counts to generate realistic dummy names, emails, street addresses, phone numbers, and company profiles in JSON or CSV.",
  "photo-collage-maker":
    "Upload image photos, choose grid layout templates, adjust border spacing and background colors, and export high-resolution composite photo collages.",
  "age-calculator-in-months":
    "Enter your date of birth to calculate exact age converted into total months, weeks, days, hours, and minutes with live date math.",
  "pregnancy-due-date-calculator":
    "Enter your last menstrual period (LMP) date or conception date. Naegele's rule computes your estimated delivery date and key trimester milestones.",
  "zodiac-age-calculator":
    "Enter your birthdate to calculate your chronological age alongside astrological Western zodiac signs, birth elements, ruling planets, and modalities.",
  "school-age-eligibility-calculator":
    "Enter your child's date of birth and school district cutoff date to check entry eligibility for kindergarten, 1st grade, and preschool enrollment.",
  "median-calculator":
    "Paste numerical dataset values. The calculator sorts values in ascending order and identifies the exact central median value with step-by-step math explanations.",
  "mean-calculator":
    "Paste dataset numbers into the calculator. It computes the arithmetic mean ($\\\\bar{x} = \\\\frac{\\\\sum x}{n}$), total sum, and count instantly.",
  "mod-calculator":
    "Enter dividend integer A and divisor integer B. The calculator computes the modulo remainder ($A \\\\bmod B$) and quotient for programming and math.",
  "zodiac-sun-moon-calculator":
    "Enter your birth date, birth time, and location. Astronomical algorithms compute your Sun sign, Moon sign, and Rising sign (Ascendant) positions.",
  "loan-calculator":
    "Enter loan amount, interest rate, and repayment tenure. The calculator computes monthly payments, total interest payable, and total loan cost.",
  "interest-calculator":
    "Enter principal amount, interest rate, time period, and compounding frequency to compare simple vs compound interest earnings over time.",
  "age-calculator":
    "Enter your birth date to calculate exact age in years, months, and days down to the live second, plus zodiac details and next birthday countdown.",
  "markdown-viewer":
    "Drag-and-drop or upload any .md or .txt file to open it instantly, or paste Markdown text from your clipboard. The engine parses CommonMark and GitHub Flavored Markdown (GFM) directly in your browser memory, rendering real-time tables, task checklists, and code blocks with 1-click export to PDF, Word, or HTML.",
  "case-converter":
    "Paste text and select target casing (UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case). The converter parses words using regex tokenization and outputs transformed text 100% locally.",
  "character-counter":
    "Type or paste text into the input field. The analyzer computes character count, word count, sentence count, paragraph count, and estimated reading time continuously in browser memory.",
  "duplicate-line-remover":
    "Paste a list of text lines. The tool compares line strings, removes duplicate entries, trims extra whitespace, and outputs a deduplicated list with optional sorting.",
  "text-reverser":
    "Input text and choose reversal mode (by character, word, or line). The tool splits string arrays and reverses order instantly using client-side JavaScript.",
  "text-repeater":
    "Enter a target phrase, specify repetition count (up to 10,000), and pick custom separators like spaces or newlines to generate repeated text blocks instantly.",
  "slug-generator":
    "Enter article titles or headings. The generator converts accents to ASCII, strips special symbols, replaces spaces with hyphens, and formats clean lowercase URL slugs.",
  "text-to-ascii-art":
    "Type text to render retro ASCII banner art using classic block letter mapping. The ASCII font matrix processes characters locally into copyable monospace text.",
  "text-cleaner":
    "Paste raw text from web pages or documents. Select cleaning filters such as removing HTML tags, converting smart quotes, stripping double spaces, or normalizing line breaks.",
  "css-minifier-beautifier":
    "Paste CSS code into the editor. Select Minify to remove comments and whitespace for production or Beautify to format selectors and properties with clean indentation.",
  "js-minifier-beautifier":
    "Paste JavaScript or TypeScript snippet. Minify strips comments and white space safely; Beautify aligns brace structures and formats line indents locally in your tab.",
  "html-formatter":
    "Paste HTML markup. Beautify aligns nested DOM elements with consistent indentation; Minify collapses extra spacing for optimized web page delivery.",
  "json-to-csv-converter":
    "Paste a JSON array of objects. The parser extracts object keys as CSV header columns and formats values into downloadable CSV spreadsheet rows.",
  "color-format-converter":
    "Input color hex or RGB values. Mathematical color conversion formulas calculate HEX, RGB, HSL, HSV, and CMYK color codes alongside WCAG contrast ratios.",
  "pomodoro-timer":
    "Start the 25-minute Pomodoro timer for focused work followed by 5-minute break intervals. Tracks completed Pomodoro cycles and triggers browser audio alerts.",
  "countdown-timer":
    "Set target duration in hours, minutes, and seconds. The timer computes precise countdown intervals using system timestamps and plays audio alarms upon completion.",
  "world-clock":
    "Select global cities to compare current times. The clock queries browser time zone databases via Intl.DateTimeFormat to display live local times and business hour overlaps.",
  "number-base-converter":
    "Input a number in Binary, Octal, Decimal, or Hexadecimal. The converter evaluates positional radix formulas to display values across all bases simultaneously.",
  "jwt-decoder":
    "Paste a JSON Web Token. The decoder splits header, payload, and signature segments, decodes Base64Url strings, and displays formatted JSON claims privately.",
  "meeting-cost-calculator":
    "Enter attendee count and average hourly compensation. The calculator multiplies duration by hourly rate to measure total financial cost and live dollar burn rate.",
  "age-in-seconds-calculator":
    "Select your birth date and time. The calculator computes exact elapsed seconds between your birth timestamp and the current time, accounting for leap years.",
  "read-time-estimator":
    "Paste article text or script. Word count algorithms estimate silent reading duration (200 WPM) and spoken presentation duration (130 WPM).",
  "sip-step-up-calculator":
    "Enter initial monthly SIP, annual percentage or fixed step-up amount, expected returns, and tenure. Compares standard SIP vs step-up SIP wealth accumulation.",
  "ssy-calculator":
    "Enter annual contribution amount and girl child age. The calculator models 15 years of deposits and 21 years of compounded growth under government SSY rules.",
  "crypto-profit-calculator":
    "Enter buy price, sell price, coin quantity, and trading fees. The calculator computes gross profit, fee deductions, net ROI, and break-even price targets.",
  "calorie-deficit-calculator":
    "Enter age, sex, weight, height, and activity level. Calculates TDEE using Mifflin-St Jeor and subtracts target calorie deficit for safe weekly weight loss.",
  "ohms-law-calculator":
    "Enter any two circuit parameters (Voltage, Current, Resistance, or Power). The calculator solves remaining electrical parameters using V = I × R equations.",
  "power-consumption-calculator":
    "Enter appliance wattage, daily usage hours, and electricity rate per kWh. Computes daily and monthly kWh usage and total electric utility bill costs.",
  "speed-distance-time-calculator":
    "Select variable to solve (Speed, Distance, or Time) and enter known values. Calculates exact results using s = d / t physics formulas.",
  "image-color-picker":
    "Upload an image file. Click anywhere on the HTML5 Canvas image preview to sample pixel colors and extract exact HEX, RGB, and HSL codes.",
  "image-flipper":
    "Upload an image and click Horizontal or Vertical flip. HTML5 Canvas flips pixel coordinates instantly and exports high-quality PNG or JPEG images.",
  "svg-to-png-converter":
    "Upload SVG file or paste vector markup. Render vector curves onto HTML5 Canvas at custom scale factors (1x-4x) and export crisp PNG raster images.",
  "password-strength-checker":
    "Type a password to evaluate character set entropy (bits) and estimate brute-force cracking duration based on offline mathematical analysis.",
  "text-encryptor":
    "Enter text and passphrase. Web Crypto API uses PBKDF2 key derivation and AES-256-GCM encryption to encode messages into secure Base64 ciphertext.",
  "file-hash-verifier":
    "Select a local file. Web Crypto API streams binary file data into cryptographic hashing functions to calculate MD5, SHA-256, and SHA-512 checksums.",
  "exif-data-viewer":
    "Upload a JPEG image. The viewer parses binary EXIF metadata headers to display camera model, shutter speed, ISO, GPS coordinates, and creation date.",
};

/**
 * Helper to retrieve tailored "How It Works" text for any tool
 */
export function getToolHowItWorks(tool: Tool): string {
  if (CUSTOM_HOW_IT_WORKS[tool.id]) {
    return CUSTOM_HOW_IT_WORKS[tool.id];
  }
  return `Enter your input parameters or select your files. Our ${tool.title.toLowerCase()} processes your data instantly using standard browser algorithms. All operations run 100% locally on your device with no server uploads, no data storage, and no account registration required.`;
}

/**
 * Priority 1, Priority 2, and Content Pack FAQ Database
 */
const TOOL_FAQS_DB: Record<string, FAQItem[]> = {
  "case-converter": [
    {
      question: "What text case transformations are supported?",
      answer: "You can transform text into UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE with 1 click."
    },
    {
      question: "How does Title Case conversion work?",
      answer: "Title Case capitalizes the first letter of each major word while maintaining proper lowercase formatting for standard minor words unless at the beginning of a phrase."
    },
    {
      question: "Is my text uploaded or stored on any server?",
      answer: "No. All text string transformations execute 100% locally in browser memory without sending data to any external server."
    }
  ],
  "character-counter": [
    {
      question: "Does the character count include spaces?",
      answer: "The counter displays both total character count (including spaces) and net character count (excluding spaces) side-by-side."
    },
    {
      question: "What are character limits for popular social media platforms?",
      answer: "Twitter/X limit is 280 characters, LinkedIn post limit is 3,000 characters, Instagram caption limit is 2,200 characters, and SEO Meta Titles should be kept under 60 characters."
    },
    {
      question: "How is reading time calculated?",
      answer: "Estimated reading time is calculated based on an average adult reading speed of 200 words per minute."
    }
  ],
  "duplicate-line-remover": [
    {
      question: "Can I remove duplicate lines case-insensitively?",
      answer: "Yes, you can toggle case-sensitive matching on or off to combine duplicate lines regardless of uppercase or lowercase variations."
    },
    {
      question: "Does it sort the output list automatically?",
      answer: "You can choose to sort deduplicated lines alphabetically (A-Z or Z-A) or preserve the original line order of your input text."
    },
    {
      question: "Can it strip empty blank lines?",
      answer: "Yes, selecting the 'Remove Empty Lines' filter automatically cleans out blank lines and trailing spacing."
    }
  ],
  "text-reverser": [
    {
      question: "What modes of text reversal are available?",
      answer: "You can reverse individual character order (flip letters), reverse word sequence, or reverse line order top-to-bottom."
    },
    {
      question: "Does it handle emojis and special Unicode characters?",
      answer: "Yes, full Unicode code point splitting ensures emojis and multi-byte characters are reversed cleanly without breaking symbols."
    },
    {
      question: "Is there any text length limit?",
      answer: "No hard limits — client-side JavaScript reverses thousands of lines of text in milliseconds directly in device RAM."
    }
  ],
  "text-repeater": [
    {
      question: "How many times can I repeat a text block?",
      answer: "You can repeat any word, phrase, or line up to 10,000 times in a single click."
    },
    {
      question: "Can I add custom separators between repeated items?",
      answer: "Yes, choose separators including newlines, spaces, commas, hyphens, or enter custom delimiter characters."
    },
    {
      question: "Is the repeated text easy to copy?",
      answer: "Clicking the 'Copy' button instantly copies the full repeated string payload to your device clipboard."
    }
  ],
  "slug-generator": [
    {
      question: "What makes a URL slug SEO-friendly?",
      answer: "An SEO-friendly slug uses concise lowercase words separated by hyphens, removes special punctuation marks, and transliterates accented characters to standard ASCII."
    },
    {
      question: "How are non-English accented letters processed?",
      answer: "Accented characters like é, ü, and ñ are automatically normalized into clean ASCII equivalents (e, u, n)."
    },
    {
      question: "Does it strip common stop words?",
      answer: "You can toggle automatic stop word removal (a, an, the, and, or) to make URLs shorter and punchier for search engines."
    }
  ],
  "text-to-ascii-art": [
    {
      question: "Where can I paste generated ASCII art?",
      answer: "ASCII banners can be pasted in source code comments, GitHub README.md files, terminal startup scripts, and Discord messages."
    },
    {
      question: "Why does ASCII art look misaligned on mobile?",
      answer: "ASCII art relies on fixed-width monospace font alignment. Ensure your display uses a code block or `<pre>` tag for proper viewing."
    },
    {
      question: "Is text sent to a remote API?",
      answer: "No, ASCII character font matrix mapping is performed 100% client-side."
    }
  ],
  "text-cleaner": [
    {
      question: "Can I strip HTML tags from copy-pasted web content?",
      answer: "Yes, the cleaner removes all HTML tags (like `<p>`, `<div>`, `<a>`) while retaining raw unformatted plain text."
    },
    {
      question: "How does it fix smart curly quotes?",
      answer: "Word processor curly quotes (“”) and apostrophes (‘’) are converted to standard ASCII straight quotes (\" and ')."
    },
    {
      question: "Does it collapse consecutive multiple spaces?",
      answer: "Yes, double or multiple consecutive spaces are collapsed into single clean spaces across the text body."
    }
  ],
  "css-minifier-beautifier": [
    {
      question: "How much file size savings does CSS minification provide?",
      answer: "Minifying CSS typically reduces stylesheet file sizes by 15% to 40% by stripping comments, unneeded whitespace, and redundant line breaks."
    },
    {
      question: "Will beautifying break valid CSS syntax?",
      answer: "No, beautification reformats indentations and line breaks without altering selector logic, property rules, or media queries."
    },
    {
      question: "Is my proprietary CSS code kept private?",
      answer: "Yes, all CSS parsing and formatting runs entirely within your local browser tab."
    }
  ],
  "js-minifier-beautifier": [
    {
      question: "Is client-side JS minification safe for sensitive code?",
      answer: "Because processing happens entirely within your web browser sandbox, zero code bytes are uploaded to remote servers."
    },
    {
      question: "Does it format modern ECMAScript / ES6+ code?",
      answer: "Yes, arrow functions, async/await constructs, template literals, destructuring, and classes are supported."
    },
    {
      question: "Can I copy minified code directly into production assets?",
      answer: "Yes, 1-click copy exports valid minified JS output ready for distribution bundles."
    }
  ],
  "html-formatter": [
    {
      question: "What is the difference between formatting and minifying HTML?",
      answer: "Formatting adds clean indentation and line breaks for human readability. Minifying strips unnecessary whitespace to optimize network download speeds."
    },
    {
      question: "Does it alter text inside `<pre>` or `<script>` tags?",
      answer: "Content within `<pre>`, `<code>`, and `<script>` blocks is protected to prevent unintended code alteration."
    },
    {
      question: "Is HTML parsing client-side?",
      answer: "Yes, 100% browser-based DOM parser execution."
    }
  ],
  "json-to-csv-converter": [
    {
      question: "Can it convert nested JSON structures to CSV?",
      answer: "Nested object properties (e.g. `user.address.city`) are flattened into clear CSV header columns."
    },
    {
      question: "Can I convert a CSV file back to JSON?",
      answer: "Yes, bi-directional parsing allows uploading or pasting CSV content to generate JSON array objects."
    },
    {
      question: "Is financial or database JSON safe to convert here?",
      answer: "100% safe. Data parsing runs locally in your device RAM without network transmission."
    }
  ],
  "color-format-converter": [
    {
      question: "What color spaces does this converter support?",
      answer: "Converts between HEX, RGB, RGBA, HSL, HSLA, HSV, and CMYK for web and print graphics."
    },
    {
      question: "How is the WCAG contrast ratio checked?",
      answer: "The tool measures luminance contrast ratios against white and black backgrounds to ensure compliance with WCAG 2.1 AA/AAA accessibility standards."
    },
    {
      question: "Can I click to copy color codes?",
      answer: "Clicking any converted color format immediately copies the CSS value to your clipboard."
    }
  ],
  "pomodoro-timer": [
    {
      question: "What is the standard Pomodoro interval setup?",
      answer: "The classic setup consists of 25 minutes of focused work, followed by a 5-minute short break. After 4 work cycles, take a longer 15–30 minute break."
    },
    {
      question: "Can I customize work and break times?",
      answer: "Yes, you can adjust work duration, short break length, and long break intervals in timer settings."
    },
    {
      question: "Does the timer chime when running in a background tab?",
      answer: "Yes, Web Audio API sound notifications alert you when work or break intervals complete, even if switching tabs."
    }
  ],
  "countdown-timer": [
    {
      question: "How accurate is the online countdown timer?",
      answer: "The timer syncs against device hardware timestamps to prevent interval lag when switching browser tabs."
    },
    {
      question: "What happens when the timer reaches 00:00:00?",
      answer: "An audio alarm sounds and a visual completion message alerts you that time is up."
    },
    {
      question: "Can I set countdowns for hours, minutes, and seconds?",
      answer: "Yes, configure custom target durations for any length of time."
    }
  ],
  "world-clock": [
    {
      question: "How are global time zones updated for Daylight Saving Time (DST)?",
      answer: "The clock queries your browser's native `Intl.DateTimeFormat` database, which updates automatically for regional DST shifts."
    },
    {
      question: "Can I compare overlapping business hours across remote teams?",
      answer: "Yes, color-coded business hour indicators highlight standard working hours (9 AM - 5 PM) across cities."
    },
    {
      question: "Which major time zones are included?",
      answer: "Includes UTC, EST, PST, GMT, CET, IST, JST, AEST, and hundreds of searchable world cities."
    }
  ],
  "number-base-converter": [
    {
      question: "Which numerical bases can be converted?",
      answer: "Converts simultaneously across Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hexadecimal (Base 16)."
    },
    {
      question: "How large of a number can be converted?",
      answer: "Supports large 64-bit integer values without precision loss."
    },
    {
      question: "Why are base conversions useful in computer science?",
      answer: "Binary and hexadecimal representations are crucial for low-level memory addressing, bitwise operations, networking IP masks, and color codes."
    }
  ],
  "jwt-decoder": [
    {
      question: "Is it safe to decode production JSON Web Tokens here?",
      answer: "Yes! JWT decoding is performed 100% client-side in your web browser. Tokens are never transmitted over the internet or logged."
    },
    {
      question: "What parts of a JWT are decoded?",
      answer: "Splits and decodes the algorithm Header, JSON Claims Payload, and displays Signature verification details."
    },
    {
      question: "How are timestamp claims (exp, iat, nbf) presented?",
      answer: "Unix epoch timestamps are automatically converted into readable local date and time strings."
    }
  ],
  "meeting-cost-calculator": [
    {
      question: "How is total meeting cost calculated?",
      answer: "Formula: Total Cost = Attendee Count × (Average Hourly Rate / 60) × Meeting Duration in Minutes."
    },
    {
      question: "Can I run the calculator live during a video call?",
      answer: "Yes, start the live ticker to watch cumulative meeting cost accrue second-by-second on screen."
    },
    {
      question: "Why should teams track meeting costs?",
      answer: "Quantifying meeting costs fosters punctuality, tighter agendas, and eliminates low-value status meetings."
    }
  ],
  "age-in-seconds-calculator": [
    {
      question: "Does the calculation account for leap years?",
      answer: "Yes, exact UNIX epoch time subtraction factors in 366-day leap years precisely."
    },
    {
      question: "What additional age breakdowns are shown?",
      answer: "Displays your total age in seconds, minutes, hours, days, weeks, months, and estimated total heartbeats."
    },
    {
      question: "Does the second counter update live?",
      answer: "Yes, a real-time live ticker updates your age in seconds every second."
    }
  ],
  "read-time-estimator": [
    {
      question: "What WPM speeds are used for calculation?",
      answer: "Silent reading averages 200 words per minute (WPM); public speaking and presentation pace averages 130 WPM."
    },
    {
      question: "Can I adjust the WPM reading speed?",
      answer: "Yes, slide custom WPM values to calculate timings for fast readers or slow speech scripts."
    },
    {
      question: "Does reading time impact blog engagement?",
      answer: "Adding estimated read times to articles sets clear reader expectations and improves bounce rates."
    }
  ],
  "sip-step-up-calculator": [
    {
      question: "What is a SIP Step-Up (Top-Up)?",
      answer: "A SIP Step-Up automatically increases your monthly mutual fund investment by a fixed percentage (e.g. 10%) or dollar amount each year as your income grows."
    },
    {
      question: "How much more wealth does a step-up SIP accumulate?",
      answer: "Increasing contributions by 10% annually can increase your final maturity corpus by 70% to 100% over a 15-year tenure compared to a flat SIP."
    },
    {
      question: "Are returns compounded monthly?",
      answer: "Yes, compound growth is calculated monthly on the updated contribution amount for each yearly step-up phase."
    }
  ],
  "ssy-calculator": [
    {
      question: "What is the deposit rules and maturity timeline for SSY?",
      answer: "Under Sukanya Samriddhi Yojana, deposits are made for 15 years from account opening, and the scheme matures after 21 years."
    },
    {
      question: "What is the maximum yearly deposit in SSY?",
      answer: "The minimum annual deposit is ₹250 and maximum investment cap is ₹1.5 lakh per financial year."
    },
    {
      question: "Are SSY returns tax-free?",
      answer: "Yes, SSY enjoys EEE status — tax deduction under 80C on deposit, tax-free annual interest, and tax-free maturity proceeds."
    }
  ],
  "crypto-profit-calculator": [
    {
      question: "Does the calculator include trading exchange fees?",
      answer: "Yes, enter maker/taker percentage fees for buy and sell orders to compute true net profit or loss."
    },
    {
      question: "Can I calculate break-even sell price?",
      answer: "Yes, the tool computes the exact minimum sell price required to cover trading fees and avoid a loss."
    },
    {
      question: "Is my crypto portfolio data private?",
      answer: "100% private. All trade maths run locally in your tab memory without tracking."
    }
  ],
  "calorie-deficit-calculator": [
    {
      question: "How does a calorie deficit cause weight loss?",
      answer: "A calorie deficit occurs when you consume fewer calories than your body burns (TDEE), forcing your body to burn stored fat for energy."
    },
    {
      question: "What is a healthy daily calorie deficit?",
      answer: "A deficit of 300 to 500 calories per day is recommended for safe, sustainable fat loss of approximately 0.5 to 1 lb per week."
    },
    {
      question: "How is TDEE calculated?",
      answer: "TDEE (Total Daily Energy Expenditure) is calculated using the Mifflin-St Jeor formula for BMR multiplied by your physical activity factor."
    }
  ],
  "ohms-law-calculator": [
    {
      question: "What are the core formulas for Ohm's Law?",
      answer: "Voltage V = I × R, Current I = V / R, Resistance R = V / I, and Power P = V × I."
    },
    {
      question: "What electrical units are supported?",
      answer: "Calculates Volts (V), Amperes (A), Ohms (Ω), and Watts (W)."
    },
    {
      question: "How many values do I need to input?",
      answer: "Enter any two known values to compute the remaining electrical properties automatically."
    }
  ],
  "power-consumption-calculator": [
    {
      question: "How do I calculate appliance kWh consumption?",
      answer: "Formula: kWh = (Appliance Wattage × Hours Used Per Day × Days) / 1000."
    },
    {
      question: "How is monthly electricity bill estimated?",
      answer: "Multiply total monthly kWh consumed by your local electric utility rate per kWh."
    },
    {
      question: "Which appliances use the most electricity?",
      answer: "Air conditioners, water heaters, space heaters, clothes dryers, and refrigerators account for the highest kWh usage."
    }
  ],
  "speed-distance-time-calculator": [
    {
      question: "What is the speed, distance, time equation?",
      answer: "Speed = Distance / Time; Distance = Speed × Time; Time = Distance / Speed."
    },
    {
      question: "What unit conversions are available?",
      answer: "Supports kilometers, miles, meters, hours, minutes, seconds, km/h, and mph."
    },
    {
      question: "Can I use this for running pace or trip planning?",
      answer: "Yes, calculate travel duration, driving speeds, or running pace splits for races."
    }
  ],
  "image-color-picker": [
    {
      question: "Are uploaded images stored on a server?",
      answer: "No! Images are rendered locally on HTML5 Canvas in your browser. No images are uploaded to any server."
    },
    {
      question: "Which color formats can I extract?",
      answer: "Extract HEX, RGB, and HSL color codes with 1-click clipboard copying."
    },
    {
      question: "Can it extract dominant color palettes?",
      answer: "Yes, automatically extracts key accent colors from your image."
    }
  ],
  "image-flipper": [
    {
      question: "Does flipping an image lower picture quality?",
      answer: "No, HTML5 Canvas flips pixels at 100% full original image resolution."
    },
    {
      question: "Can I flip horizontally and vertically at the same time?",
      answer: "Yes, combine horizontal mirror flip and vertical flip."
    },
    {
      question: "What image formats can I save?",
      answer: "Export as PNG, JPEG, or WebP."
    }
  ],
  "svg-to-png-converter": [
    {
      question: "Can I convert SVG to PNG with a transparent background?",
      answer: "Yes, preserve vector transparency by keeping transparent background toggled on."
    },
    {
      question: "Can I scale up SVG vector resolution for high-DPI retina printing?",
      answer: "Yes, scale output to 2x, 3x, 4x or set custom high-pixel dimensions without quality degradation."
    },
    {
      question: "Are SVG files uploaded to a remote server?",
      answer: "No, SVG vectors render directly on client-side Canvas."
    }
  ],
  "password-strength-checker": [
    {
      question: "Is it safe to test passwords online here?",
      answer: "100% safe! Checking runs entirely inside your local browser tab memory using offline entropy formulas. Passwords are never sent over the network."
    },
    {
      question: "What is password entropy in bits?",
      answer: "Entropy measures mathematical unpredictability. Passwords above 60 bits are strong; above 80 bits are extremely secure."
    },
    {
      question: "How is crack time estimated?",
      answer: "Estimates time required for a high-speed GPU cluster performing billions of guesses per second to brute-force the password."
    }
  ],
  "text-encryptor": [
    {
      question: "What algorithm is used for encryption?",
      answer: "AES-256-GCM encryption with keys derived via PBKDF2 (100,000 iterations) using Web Crypto API."
    },
    {
      question: "Can anyone decrypt my text without the secret key?",
      answer: "No. Without your secret passphrase, AES-256-GCM ciphertext is mathematically unbreakable."
    },
    {
      question: "Where are keys stored?",
      answer: "Keys are generated ephemerally in browser RAM and are never saved or sent anywhere."
    }
  ],
  "file-hash-verifier": [
    {
      question: "Are large files uploaded to calculate hashes?",
      answer: "No! Files are read in local binary chunks using HTML5 FileReader API. ISOs or installers of any size are hashed locally."
    },
    {
      question: "Which hash functions are calculated?",
      answer: "Computes SHA-256, SHA-512, SHA-1, and MD5 checksums."
    },
    {
      question: "Why check file hash checksums?",
      answer: "Verifying checksums confirms that downloaded software has not been corrupted or altered."
    }
  ],
  "exif-data-viewer": [
    {
      question: "What EXIF tags are extracted from photos?",
      answer: "Camera make/model, shutter speed, aperture, ISO, focal length, creation timestamp, and GPS coordinates."
    },
    {
      question: "Can I strip EXIF metadata for privacy before sharing photos online?",
      answer: "Yes, click 'Strip EXIF Data' to export a clean copy of your photo with all location and camera metadata removed."
    },
    {
      question: "Are photos uploaded to view EXIF data?",
      answer: "No, EXIF headers are parsed locally in browser memory."
    }
  ],
  "markdown-viewer": [
    {
      question: "How do I open an MD file without installing special software?",
      answer: "You can open any .md file directly in your web browser by dragging and dropping it onto this page or clicking 'Open .md File'. Our in-browser file reader parses and renders the Markdown text into formatted HTML with styled headings, tables, and code blocks instantly without needing VS Code, Obsidian, or desktop apps.",
    },
    {
      question: "How do I convert or export Markdown (.md) to PDF?",
      answer: "Click the 'MD to PDF' button in the live preview toolbar. This opens your operating system's native print engine with print-optimized CSS that removes UI buttons, centers the typography, and renders headers, tables, and code blocks cleanly into a downloadable PDF document.",
    },
    {
      question: "Can I convert Markdown to Microsoft Word (.doc)?",
      answer: "Yes. Click the 'MD to Word' button to generate an immediate .doc file containing all parsed headings, tables, and formatted lists. You can open and edit this file directly in Microsoft Word, Google Docs, or LibreOffice.",
    },
    {
      question: "Which markdown formats and GitHub extensions are supported?",
      answer: "The viewer supports full GitHub Flavored Markdown (GFM) including headings (H1-H6), bold, italic, strikethrough, blockquotes, GitHub callout alerts (> [!NOTE], > [!TIP], > [!WARNING]), aligned data tables, interactive task checklists (- [x]), and syntax-highlighted code fences.",
    },
    {
      question: "Is my markdown file uploaded to any remote server?",
      answer: "No. The entire parsing and rendering process executes 100% locally in your web browser RAM using the HTML5 FileReader API. Your document content, filenames, and text never leave your computer or touch any external server.",
    },
  ],
  "dog-age-calculator": [
    {
      question: "Is the \"1 dog year = 7 human years\" rule accurate?",
      answer: "No. That rule is outdated. Dogs mature much faster in their first two years, then aging slows down — and the rate varies significantly by size. Small dogs (under 20 lbs) age slower in later years; large and giant breeds age faster.",
    },
    {
      question: "Does dog breed affect the calculation?",
      answer: "Yes, significantly. A 10-year-old Chihuahua and a 10-year-old Great Dane are at very different life stages. Larger breeds generally have shorter lifespans and hit \"senior\" status earlier.",
    },
    {
      question: "At what age is a dog considered a senior?",
      answer: "Small breeds are typically senior around 10-12 years old, medium breeds around 8-10, and large/giant breeds as early as 6-7 years old.",
    },
    {
      question: "How accurate is this calculator?",
      answer: "It uses current veterinary research-based formulas rather than the old linear multiplier, giving a much closer approximation of your dog's biological age. Individual health and genetics still play a role.",
    },
  ],

  "death-calculator": [
    {
      question: "Is this a real prediction of when I will die?",
      answer: "No. This tool provides a statistical life expectancy estimate based on population-level data (age, sex, lifestyle factors). It cannot predict individual outcomes and should not be used for medical or financial decisions without professional advice.",
    },
    {
      question: "What factors affect the estimate?",
      answer: "Common inputs include current age, biological sex, smoking status, exercise frequency, and sometimes BMI or family history — all of which are statistically linked to life expectancy trends.",
    },
    {
      question: "Why do calculators like this exist?",
      answer: "They're commonly used for insurance planning, retirement savings estimates, and general health awareness — helping people think about long-term financial and wellness planning.",
    },
    {
      question: "Can lifestyle changes improve my estimate?",
      answer: "Statistically, yes — quitting smoking, regular exercise, and maintaining a healthy weight are all associated with increased life expectancy in population studies.",
    },
  ],

  "education-loan-emi-calculator": [
    {
      question: "What is a moratorium period in an education loan?",
      answer: "It's the period during your course (plus usually 6-12 months after) when you're not required to make EMI payments. Interest still accrues during this time and is typically added to your principal — this calculator factors that in.",
    },
    {
      question: "Can I claim tax benefits on education loan interest?",
      answer: "Yes, in India, interest paid on education loans qualifies for a deduction under Section 80E, with no upper limit on the deduction amount, for up to 8 years or until the interest is fully repaid.",
    },
    {
      question: "Should I pay interest during the moratorium period if I can afford it?",
      answer: "Paying interest during the moratorium (simple interest, before it compounds into principal) can reduce your total loan cost significantly — many lenders offer a discount for this.",
    },
    {
      question: "How is the EMI calculated after the moratorium ends?",
      answer: "The accrued interest during the moratorium is added to the principal, and EMIs are then calculated on this new (higher) principal amount over the remaining tenure.",
    },
  ],

  "salary-calculator": [
    {
      question: "Why is my in-hand salary lower than my CTC divided by 12?",
      answer: "CTC includes components that don't reach your bank account directly — employer's EPF contribution, gratuity, insurance premiums — plus deductions like employee PF, professional tax, and TDS.",
    },
    {
      question: "Does this calculator account for the new vs old tax regime?",
      answer: "Yes, the calculation can be adjusted based on which tax regime you're under, since deductions and slab rates differ significantly between the two.",
    },
    {
      question: "What is EPF and why is it deducted?",
      answer: "Employee Provident Fund is a mandatory retirement savings deduction (typically 12% of basic pay), matched by an equal employer contribution, that builds a retirement corpus.",
    },
    {
      question: "Is my salary information private when using this tool?",
      answer: "Yes. All salary calculations execute 100% locally in your browser memory. Your CTC and tax figures are never transmitted to any external server or saved anywhere.",
    },
  ],

  "mortgage-calculator": [
    {
      question: "What does PITI stand for?",
      answer: "Principal, Interest, Taxes, and Insurance — the four components that typically make up a full monthly mortgage payment in the US.",
    },
    {
      question: "How does loan tenure affect total interest paid?",
      answer: "Longer tenures lower your monthly EMI but significantly increase total interest paid over the loan's life. Shorter tenures cost more per month but save substantially on total interest.",
    },
    {
      question: "Are there tax benefits on home loan interest?",
      answer: "In India, home loan interest is deductible under Section 24(b) (up to ₹2 lakh/year for self-occupied property) and principal repayment under Section 80C.",
    },
    {
      question: "Are my loan calculations saved on Yuitility?",
      answer: "No. All calculations run strictly in your browser memory. Your loan amount, interest rate, and property figures are 100% private and never uploaded to any server.",
    },
  ],

  "home-loan-emi-calculator": [
    {
      question: "What does PITI stand for?",
      answer: "Principal, Interest, Taxes, and Insurance — the four components that typically make up a full monthly mortgage payment in the US.",
    },
    {
      question: "How does loan tenure affect total interest paid?",
      answer: "Longer tenures lower your monthly EMI but significantly increase total interest paid over the loan's life. Shorter tenures cost more per month but save substantially on total interest.",
    },
    {
      question: "Are there tax benefits on home loan interest?",
      answer: "In India, home loan interest is deductible under Section 24(b) (up to ₹2 lakh/year for self-occupied property) and principal repayment under Section 80C.",
    },
    {
      question: "Are my loan calculations saved on Yuitility?",
      answer: "No. All calculations run strictly in your browser memory. Your loan amount, interest rate, and property figures are 100% private and never uploaded to any server.",
    },
  ],

  "emi-calculator": [
    {
      question: "How is EMI calculated?",
      answer: "EMI = [P x R x (1+R)^N] / [(1+R)^N - 1], where P is the principal, R is the monthly interest rate, and N is the number of monthly installments.",
    },
    {
      question: "Why does more interest get paid in the early months?",
      answer: "In a reducing-balance loan, interest is calculated on the outstanding principal. Early on, the outstanding balance is highest, so a larger share of each EMI goes toward interest rather than principal.",
    },
    {
      question: "Does prepayment reduce my EMI or my tenure?",
      answer: "Depends on the lender's policy — some reduce your tenure while keeping EMI the same, others reduce your EMI while keeping tenure the same. Check with your lender which option applies.",
    },
    {
      question: "Is a lower EMI always better?",
      answer: "Not necessarily — a lower EMI usually means a longer tenure, which increases total interest paid over the life of the loan.",
    },
  ],

  "sip-calculator": [
    {
      question: "What is a SIP?",
      answer: "A Systematic Investment Plan lets you invest a fixed amount regularly (usually monthly) into a mutual fund, rather than investing a lump sum at once.",
    },
    {
      question: "How accurate are SIP return projections?",
      answer: "Projections use an assumed constant annual return rate for simplicity, but actual mutual fund returns fluctuate year to year. Treat projections as an estimate, not a guarantee.",
    },
    {
      question: "Does SIP investing average out market volatility?",
      answer: "Yes — this is called rupee-cost averaging. Investing a fixed amount regularly means you buy more units when prices are low and fewer when prices are high, which can smooth out volatility over time.",
    },
    {
      question: "Why does the corpus grow faster in later years?",
      answer: "Compounding accelerates over time as returns are generated on both your contributions and previously accumulated returns, so the growth curve is not linear.",
    },
  ],

  "car-loan-emi-calculator": [
    {
      question: "Should I calculate EMI on ex-showroom or on-road price?",
      answer: "On-road price, since that includes registration, insurance, and other charges that most lenders finance as part of the loan amount.",
    },
    {
      question: "How much does a larger down payment save?",
      answer: "A larger down payment reduces the principal being financed, which lowers both your EMI and the total interest paid — often more significantly than people expect on higher-interest auto loans.",
    },
    {
      question: "What's a typical tenure for a car loan?",
      answer: "Commonly 3-7 years, though shorter tenures reduce total interest paid at the cost of a higher monthly EMI.",
    },
    {
      question: "Is my car loan calculation saved online?",
      answer: "No. All calculation figures execute 100% locally in your browser memory. Your loan details are never uploaded or tracked.",
    },
  ],

  "bike-loan-emi-calculator": [
    {
      question: "What's included in on-road price for a bike?",
      answer: "Ex-showroom price plus RTO registration, insurance, and sometimes accessories — financing based on on-road price avoids underestimating your actual loan need.",
    },
    {
      question: "Are bike loan interest rates higher than car loan rates?",
      answer: "Often yes, since two-wheelers depreciate faster and are considered slightly higher risk collateral by some lenders.",
    },
    {
      question: "What tenure is typical for bike loans?",
      answer: "Usually 1-4 years, shorter than car loans given the lower loan amounts involved.",
    },
    {
      question: "Does this bike loan calculator work for scooters?",
      answer: "Yes. It works for all two-wheelers including motorcycles, electric scooters, and mopeds.",
    },
  ],

  "personal-loan-emi-calculator": [
    {
      question: "Why are personal loan interest rates higher than secured loans?",
      answer: "Personal loans are unsecured (no collateral), so lenders charge higher rates to offset their higher risk compared to loans backed by property or vehicles.",
    },
    {
      question: "How do processing fees affect the real cost of a loan?",
      answer: "A 1-3% processing fee effectively raises your real borrowing cost above the stated interest rate — always compare the effective annual cost, not just the advertised rate, when choosing between lenders.",
    },
    {
      question: "Can I prepay a personal loan without penalty?",
      answer: "This varies by lender — many charge a prepayment penalty on personal loans, unlike some home loans where regulations limit such charges. Check your loan agreement.",
    },
    {
      question: "Is my personal financial data private?",
      answer: "Yes. Calculations run strictly in your browser memory with zero server uploads.",
    },
  ],

  "retirement-calculator": [
    {
      question: "Why does inflation matter so much in retirement planning?",
      answer: "Over 20-30 years, even moderate inflation significantly erodes purchasing power — expenses that feel comfortable today will cost substantially more by the time you retire, so plans need to account for this.",
    },
    {
      question: "How is the required corpus calculated?",
      answer: "Generally by estimating your annual post-retirement expenses (inflation-adjusted) and calculating the lump sum needed to sustain those withdrawals for your expected retirement duration, accounting for continued investment growth.",
    },
    {
      question: "What return rate should I assume?",
      answer: "This depends on your investment mix — conservative (largely debt) portfolios might assume 6-8%, while equity-heavy portfolios might assume higher long-term averages, though actual returns vary and are never guaranteed.",
    },
    {
      question: "Is my retirement goal stored anywhere?",
      answer: "No. All projections execute locally in your browser memory with zero server tracking.",
    },
  ],

  "fd-calculator": [
    {
      question: "How often does bank FD interest compound?",
      answer: "Most Indian banks compound FD interest quarterly, though this varies — check your specific bank's terms, since monthly vs quarterly compounding changes your maturity value.",
    },
    {
      question: "Is FD interest taxable?",
      answer: "Yes, in India, FD interest is added to your taxable income and taxed at your applicable slab rate, with TDS deducted by the bank if interest exceeds the threshold.",
    },
    {
      question: "What's the difference between cumulative and non-cumulative FDs?",
      answer: "Cumulative FDs reinvest interest and pay out the full amount at maturity; non-cumulative FDs pay interest periodically (monthly/quarterly) as income instead.",
    },
    {
      question: "Can I use this FD calculator for NRE/NRO fixed deposits?",
      answer: "Yes, it works for standard resident FDs as well as NRE and NRO fixed deposits.",
    },
  ],

  "rd-calculator": [
    {
      question: "Why is RD's effective return different from FD at the same rate?",
      answer: "Since RD deposits are made monthly rather than as a lump sum, each installment earns interest for a shorter period than the full tenure, resulting in a lower effective annualized return than an FD at the same stated rate.",
    },
    {
      question: "Can I withdraw an RD before maturity?",
      answer: "Most banks allow premature withdrawal, but usually with a penalty (reduced interest rate) — check your bank's specific terms.",
    },
    {
      question: "Is RD interest taxable?",
      answer: "Yes, similar to FD, RD interest is taxable as income at your applicable slab rate in India.",
    },
    {
      question: "Is my deposit data saved anywhere?",
      answer: "No. Calculations execute strictly client-side with zero data uploads.",
    },
  ],

  "compound-interest-calculator": [
    {
      question: "How does compounding frequency affect returns?",
      answer: "More frequent compounding (daily/monthly vs annual) results in slightly higher effective returns at the same nominal rate, since interest itself starts earning interest sooner.",
    },
    {
      question: "What's the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the original principal throughout the term. Compound interest is calculated on the principal plus previously accumulated interest, causing growth to accelerate over time.",
    },
    {
      question: "How much difference do regular contributions make?",
      answer: "Adding regular contributions on top of a lump sum can significantly increase the final corpus compared to a one-time deposit alone, especially over long durations, since each contribution has its own compounding runway.",
    },
    {
      question: "Is my investment growth data saved on your server?",
      answer: "No. Compound interest calculations run 100% in your browser memory.",
    },
  ],

  "simple-interest-calculator": [
    {
      question: "Where is simple interest actually used?",
      answer: "Less common in everyday lending than people assume — most consumer loans and deposits use compound interest. Simple interest typically appears in certain short-term loans, bonds, or as a simplified teaching example.",
    },
    {
      question: "How is simple interest different from compound interest?",
      answer: "Simple interest is calculated only on the original principal for the entire period, while compound interest also earns returns on previously accumulated interest.",
    },
    {
      question: "Does the time period need to be in years?",
      answer: "The formula works with any consistent time unit as long as the interest rate matches that unit — most commonly expressed as an annual rate with time in years.",
    },
    {
      question: "Is my calculation saved anywhere?",
      answer: "No. All simple interest calculations run 100% locally in browser memory.",
    },
  ],

  "ppf-calculator": [
    {
      question: "How is PPF interest calculated?",
      answer: "Interest is compounded annually but calculated monthly based on the lowest balance in your account between the 5th and last day of each month.",
    },
    {
      question: "Why does depositing before the 5th of the month matter?",
      answer: "Since interest is calculated on the lowest balance between the 5th and month-end, depositing before the 5th ensures that month's contribution earns interest starting that same month, rather than missing out.",
    },
    {
      question: "Is PPF interest and maturity amount taxable?",
      answer: "No — PPF falls under the EEE (Exempt-Exempt-Exempt) tax category in India, meaning contributions, interest earned, and maturity proceeds are all tax-free, subject to applicable limits.",
    },
    {
      question: "What is the maximum investment limit in PPF per year?",
      answer: "The maximum contribution allowed in a PPF account is ₹1.5 lakh per financial year.",
    },
  ],

  "bmi-calculator": [
    {
      question: "What are the standard BMI categories?",
      answer: "Generally: below 18.5 is underweight, 18.5-24.9 is normal weight, 25-29.9 is overweight, and 30+ is considered obese, though these thresholds are population-level guidelines, not individual diagnoses.",
    },
    {
      question: "Is BMI accurate for everyone?",
      answer: "No — BMI doesn't distinguish muscle mass from fat, so athletes or muscular individuals can register as \"overweight\" despite low body fat. It's a screening tool, not a precise individual health measure.",
    },
    {
      question: "What other measures complement BMI?",
      answer: "Waist circumference, body fat percentage, and waist-to-hip ratio are commonly used alongside BMI for a fuller picture of health risk.",
    },
    {
      question: "Is my weight data saved or tracked?",
      answer: "No. All calculations run strictly in your browser memory. Your measurements are 100% private.",
    },
  ],

  "json-formatter": [
    {
      question: "What common JSON errors does this catch?",
      answer: "Trailing commas, mismatched brackets/braces, unquoted keys, and invalid escape sequences are among the most common issues flagged.",
    },
    {
      question: "Is my data sent to a server?",
      answer: "No — formatting and validation run entirely in your browser, so nothing you paste is uploaded anywhere, which matters if you're working with API responses or config containing sensitive data.",
    },
    {
      question: "Can I minify JSON with this tool too?",
      answer: "Yes, most JSON formatters offer both a \"beautify\" (pretty-print) and \"minify\" (compact, whitespace-removed) option.",
    },
    {
      question: "Does it format large JSON files quickly?",
      answer: "Yes. The client-side parser formats large payloads in milliseconds directly in device RAM.",
    },
  ],

  "password-generator": [
    {
      question: "Is length or complexity more important for password strength?",
      answer: "Length generally matters more — a longer passphrase with moderate complexity is typically harder to crack than a short password stuffed with special characters.",
    },
    {
      question: "Is it safe to generate passwords online?",
      answer: "It's safe if the generation happens entirely client-side (in your browser) rather than being sent to and generated on a server — check that the tool you're using works this way.",
    },
    {
      question: "Should I use a different password for every account?",
      answer: "Yes — reusing passwords means a breach on one site can compromise your accounts elsewhere. A password manager paired with generated unique passwords is the standard recommendation.",
    },
    {
      question: "Does Yuitility store my generated passwords?",
      answer: "Never. Passwords are generated in your local browser tab memory using Web Crypto API.",
    },
  ],

  "qr-code-generator": [
    {
      question: "Should I download QR codes as PNG or SVG?",
      answer: "SVG for anything that will be printed or resized, since it stays sharp at any size. PNG is fine for fixed-size digital use like social media posts.",
    },
    {
      question: "Do QR codes expire?",
      answer: "Static QR codes (encoding the content directly) never expire. Dynamic QR codes (that redirect through a service) can expire if the underlying service is discontinued.",
    },
    {
      question: "How much data can a QR code hold?",
      answer: "Depends on the QR code version and error correction level, but typically up to a few thousand characters — more than enough for URLs, contact info, or short text.",
    },
    {
      question: "Is my QR code payload tracked?",
      answer: "No. The vector canvas renders locally on your device without server communication.",
    },
  ],

  "word-counter": [
    {
      question: "How is reading time calculated?",
      answer: "Typically based on an average reading speed (around 200-250 words per minute for adults), giving an estimate rather than an exact figure since actual reading speed varies by person and content complexity.",
    },
    {
      question: "Does hyphenated word count as one word or two?",
      answer: "This varies by tool and by the specific style guide you're following — worth checking if you're hitting a strict word count requirement for a submission.",
    },
    {
      question: "What is keyword density used for?",
      answer: "It shows how frequently specific words appear relative to total word count, often used in content/SEO writing to check if a target keyword is over- or under-used.",
    },
    {
      question: "Is my typed text saved or sent to a server?",
      answer: "No. Text parsing executes entirely within your browser memory window.",
    },
  ],

  "image-compressor": [
    {
      question: "Does compression reduce image quality?",
      answer: "Some compression is \"lossy\" (small quality tradeoff for major size reduction) while some is \"lossless\" (no quality loss, smaller size reduction) — most everyday use cases benefit from lossy compression since the difference is barely visible.",
    },
    {
      question: "Why does image compression matter for websites?",
      answer: "Large uncompressed images are one of the most common causes of slow page load times, which affects both user experience and search engine rankings.",
    },
    {
      question: "Is WebP better than JPG?",
      answer: "WebP typically achieves better compression than JPG at similar visual quality and is supported by all modern browsers, making it a good default for web use.",
    },
    {
      question: "Are my photos uploaded to a cloud server?",
      answer: "No. Compression runs 100% locally on your browser canvas.",
    },
  ],

  "background-remover": [
    {
      question: "What image types work best for background removal?",
      answer: "Clear subject-background contrast (like product photos or portraits with a plain background) tends to produce the cleanest results compared to busy or low-contrast backgrounds.",
    },
    {
      question: "What format is the output?",
      answer: "A transparent PNG, which preserves the removed-background area so you can layer the subject onto any new background.",
    },
    {
      question: "Can this be used for product photos?",
      answer: "Yes, it's commonly used for e-commerce listings — a clean transparent or white background on product photos often performs better for conversions than a busy original background.",
    },
    {
      question: "Is my photo sent to an AI cloud server?",
      answer: "No. Background removal models run directly in your local browser WebAssembly environment.",
    },
  ],

  "image-resizer": [
    {
      question: "Should I lock the aspect ratio when resizing?",
      answer: "Generally yes, unless you specifically want to stretch/distort the image — locking aspect ratio prevents unwanted warping.",
    },
    {
      question: "Does resizing reduce file size too?",
      answer: "Often yes, since fewer pixels typically means a smaller file, though for maximum size reduction pairing resize with compression is more effective.",
    },
    {
      question: "What are common social media image dimensions?",
      answer: "These vary by platform and post type (feed post vs story vs banner) — worth checking current platform specs since they change occasionally, rather than assuming universal dimensions.",
    },
    {
      question: "Are my images uploaded during resizing?",
      answer: "No. Resizing is performed 100% locally using HTML5 canvas elements.",
    },
  ],

  "pdf-merger": [
    {
      question: "Can I reorder pages before merging?",
      answer: "Yes, most PDF mergers let you drag-and-drop to set the final page order before combining, which avoids having to redo the merge if the order comes out wrong.",
    },
    {
      question: "Does merging affect the original files?",
      answer: "No, merging creates a new combined file — your original individual PDFs remain unchanged.",
    },
    {
      question: "Is there a limit to how many PDFs I can merge?",
      answer: "This depends on the tool, though most browser-based mergers can comfortably handle a reasonable number of files without issue for typical use cases.",
    },
    {
      question: "Are my PDF documents uploaded to cloud servers?",
      answer: "No. PDF merging executes 100% in your browser memory.",
    },
  ],

  "pdf-splitter": [
    {
      question: "Can I extract just one page from a larger document?",
      answer: "Yes, specifying a single-page range extracts just that page as its own PDF.",
    },
    {
      question: "Does splitting affect the original PDF?",
      answer: "No, splitting creates new file(s) from the selected ranges — the original document is untouched.",
    },
    {
      question: "Why would I split a PDF instead of screenshotting a page?",
      answer: "Splitting preserves the original quality, text selectability, and any embedded data, whereas a screenshot is a flattened image that loses text searchability and can look blurry.",
    },
    {
      question: "Is my document uploaded anywhere?",
      answer: "No. Page extraction is executed locally on your computer.",
    },
  ],

  "image-to-pdf": [
    {
      question: "Can I combine multiple images into one PDF?",
      answer: "Yes, uploading several images typically creates a multi-page PDF with each image as its own page, in the order uploaded.",
    },
    {
      question: "Does image quality get preserved in the PDF?",
      answer: "Generally yes, though very large images may be compressed somewhat to keep the resulting PDF file size reasonable.",
    },
    {
      question: "Why convert images to PDF instead of just sharing the images?",
      answer: "PDFs are a more universal format for documents (forms, scanned pages, receipts) and keep multiple pages together as one file, which is easier to share, print, or submit than separate image files.",
    },
    {
      question: "Are my photos sent to a server during PDF creation?",
      answer: "No. PDF assembly runs 100% locally in your browser tab.",
    },
  ],

  "pdf-rotator": [
    {
      question: "Can I rotate only specific pages in my PDF?",
      answer: "Yes. You can rotate all pages simultaneously, only odd-numbered pages, only even-numbered pages, or enter custom page ranges (such as 1, 3, 5-7).",
    },
    {
      question: "Does rotating pages degrade text or vector graphics quality?",
      answer: "No. The PDF rotation operation modifies the internal page viewport angle metadata without re-encoding or compressing images, preserving 100% original quality.",
    },
    {
      question: "Can I save the rotated PDF permanently?",
      answer: "Yes. When you download the file, the rotation is permanently encoded into the PDF specification, so it displays in the correct orientation in Adobe Acrobat and all viewers.",
    },
    {
      question: "Are my confidential files uploaded to a remote server?",
      answer: "No. All PDF rotation subroutines execute locally inside your browser tab using WebAssembly. No data leaves your device.",
    },
  ],

  "pdf-page-numbers": [
    {
      question: "Can I skip numbering the first page (cover sheet)?",
      answer: "Yes. Check the 'Skip First Page (Cover)' toggle to leave the title or cover page blank and start numbering from the second page onward.",
    },
    {
      question: "What page number formats are supported?",
      answer: "You can format page numbers as 'Page 1 of N', standard numbers '1, 2, 3...', 'Page 1', or bracketed '- 1 -'.",
    },
    {
      question: "Can I choose where page numbers appear on the document?",
      answer: "Yes. You can position page numbers in the bottom-center, bottom-right, bottom-left, top-right, or top-center of each page.",
    },
    {
      question: "Does adding page numbers upload my file to external servers?",
      answer: "No. PDF text rendering runs 100% client-side using pdf-lib in your browser memory. Your documents remain strictly private.",
    },
  ],

  "pdf-page-remover": [
    {
      question: "Can I delete multiple non-consecutive pages from a PDF?",
      answer: "Yes. You can click on individual page badges or type comma-separated numbers and ranges (e.g. '2, 4-6, 9') to remove multiple pages at once.",
    },
    {
      question: "Does deleting pages alter or damage my original file?",
      answer: "No. Your original file remains untouched. The tool creates and downloads a completely new, sanitized PDF document with the selected pages removed.",
    },
    {
      question: "Is there a limit on how many pages I can remove?",
      answer: "You can delete as many pages as you want, provided at least one page remains in the final document to produce a valid PDF file.",
    },
    {
      question: "Is my document secure while removing pages?",
      answer: "Yes. All page copying and document creation occurs locally in your browser memory with zero network uploads.",
    },
  ],
};

/**
 * Retrieve 4 high-quality, tailored FAQs for any tool
 */
export function getToolFaqs(tool: Tool): FAQItem[] {
  if (TOOL_FAQS_DB[tool.id]) {
    // Strip em-dashes and en-dashes from hand-written db
    return TOOL_FAQS_DB[tool.id].map(item => ({
      question: item.question.replace(/—|–/g, "-"),
      answer: item.answer.replace(/—|–/g, "-")
    }));
  }

  const toolName = tool.title;
  const nameLower = toolName.toLowerCase();
  const cat = tool.category;

  if (cat === "finance") {
    return [
      {
        question: `How does the ${toolName} calculate results?`,
        answer: `The ${nameLower} computes exact results instantly using verified mathematical interest formulas and amortization models as you adjust the sliders or input fields.`
      },
      {
        question: `Does using this ${nameLower} require sharing my financial data?`,
        answer: `No. All calculations run strictly inside your local browser memory. Yuitility does not transmit, log, or store your assets, inputs, or personal information.`
      },
      {
        question: `Is the ${toolName} compatible with multiple currencies?`,
        answer: `Yes. You can work with USD, EUR, GBP, INR, or any local currency format because the calculations are purely numerical. We support direct numeric entry for all fields.`
      },
      {
        question: `Can I export results from this ${nameLower} tool?`,
        answer: `Yes. Once the calculations are computed, you can copy the values directly or copy the breakdown table to your clipboard for your spreadsheets.`
      }
    ];
  }

  if (cat === "pdf") {
    return [
      {
        question: `Is it safe to upload confidential files to this ${toolName}?`,
        answer: `Yes, 100% safe. You are not uploading anything. This ${nameLower} runs entirely client-side using JavaScript, meaning files are read and processed locally in your browser.`
      },
      {
        question: `Will this ${nameLower} compress or modify the original PDF?`,
        answer: `No. The tool processes a copy of your document locally and generates a new download link. Your original file remains untouched on your hard drive.`
      },
      {
        question: `Are there file size or count limits on this free ${nameLower}?`,
        answer: `No. Since processing runs locally on your computer, there are no artificial server caps on file size. Your device's memory is the only limit.`
      },
      {
        question: `Do I need to sign up or pay to export my document?`,
        answer: `No registration is required. You can compile and download your document instantly without signing up, without watermarks, and without paying fees.`
      }
    ];
  }

  if (cat === "developer") {
    return [
      {
        question: `Is this ${toolName} safe for credentials or proprietary code?`,
        answer: `Yes. Because this is a client-side utility, all formatting, key generation, and encoding happen locally. No data is sent over the network to external servers.`
      },
      {
        question: `Can I use the ${nameLower} offline?`,
        answer: `Yes. Once you load this page, you can disconnect from the internet and continue using the ${nameLower} features because all code runs in your local tab.`
      },
      {
        question: `How does this tool handle formatting errors?`,
        answer: `The developer compiler parses inputs instantly and shows inline syntax errors or warnings to help you locate and fix bugs in your syntax.`
      },
      {
        question: `Is there any API usage limit for this ${toolName}?`,
        answer: `There are no limits because it does not make API calls. You can run as many operations as you need directly on your machine.`
      }
    ];
  }

  if (cat === "media" || cat === "utility" || cat === "conversion") {
    return [
      {
        question: `Will my images or files have watermarks after using this ${toolName}?`,
        answer: `No. All outputs are exported in high resolution without watermarks, branding, or modifications. You own 100% of your generated assets.`
      },
      {
        question: `Does this ${nameLower} send media files to a server?`,
        answer: `No files are ever uploaded. Processing is executed in your browser via HTML5 canvas and WebAssembly, keeping your photos and documents completely private.`
      },
      {
        question: `What formats are supported by this ${toolName}?`,
        answer: `It supports all standard web formats. You can input standard files and export them to WebP, PNG, JPEG, or GIF formats depending on your needs.`
      },
      {
        question: `Can I process multiple files in batch?`,
        answer: `Yes. You can input multiple assets, configure the parameters, and process them sequentially directly inside your browser tab.`
      }
    ];
  }

  if (cat === "health") {
    return [
      {
        question: `How accurate is the ${toolName}?`,
        answer: `The ${nameLower} uses standard health and fitness formulas (such as Mifflin-St Jeor or US Navy methods) to estimate values. These are statistical estimates, not medical diagnoses.`
      },
      {
        question: `Does this health calculator save my weight or measurements?`,
        answer: `No. Your age, height, weight, and other biological metrics are calculated locally. No data is tracked or uploaded to any medical database.`
      },
      {
        question: `Is the ${toolName} free for personal planning?`,
        answer: `Yes. Yuitility health tools are completely free, ad-free, and require no account registration or subscriptions.`
      },
      {
        question: `Should I use these results as professional medical advice?`,
        answer: `No. These results are for educational purposes. Consult a physician or certified fitness coach before starting any diet, training, or health plan.`
      }
    ];
  }

  if (cat === "math" || cat === "education") {
    return [
      {
        question: `Does this ${toolName} show step-by-step mathematical calculations?`,
        answer: `Yes. The tool parses values and evaluates the formulas showing mathematical steps and equations to help you understand the solution.`
      },
      {
        question: `Is the mathematical precision guaranteed?`,
        answer: `Yes. The calculator uses JavaScript double-precision floating-point arithmetic and custom rounding algorithms to ensure decimal accuracy for homework and engineering.`
      },
      {
        question: `Are there limits to how many calculations I can run?`,
        answer: `No. Because all calculations compile locally in your browser, you can perform unlimited math operations without throttling.`
      },
      {
        question: `Can I use this ${nameLower} offline in a classroom?`,
        answer: `Yes. Simply keep the tab open in your browser, and you can calculate results offline without an active internet connection.`
      }
    ];
  }

  // Fallback for general categories
  return [
    {
      question: `What is the primary function of this ${toolName}?`,
      answer: `The ${nameLower} executes calculations, transforms text, or compiles documents locally in your browser tab without external servers.`
    },
    {
      question: `Is my personal data safe with this ${toolName}?`,
      answer: `Yes. Because all execution is client-side, your files, keys, and values are never sent to external servers, protecting your data privacy.`
    },
    {
      question: `Do I need to install any browser plugins to use this?`,
      answer: `No. The utility is built using HTML5 and vanilla JavaScript, running natively in all modern mobile and desktop browsers.`
    },
    {
      question: `Is this ${toolName} free forever?`,
      answer: `Yes. All tools on Yuitility are 100% free with no hidden charges, trial limits, or account requirements.`
    }
  ];
}

/**
 * True when this tool has FAQs written specifically for it (as opposed to the
 * category-level fallback set).
 *
 * Only hand-written FAQs are emitted as FAQPage structured data. The fallback
 * sets are near-identical across ~100 pages; marking them up as distinct FAQs
 * would be templated markup dressed as unique content, which is exactly the
 * pattern Google's structured-data guidelines call out. They still render as
 * visible page content, they just do not claim to be an FAQ entity.
 */
export function hasHandWrittenFaqs(tool: Tool): boolean {
  return Boolean(TOOL_FAQS_DB[tool.id]);
}

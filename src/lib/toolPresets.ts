import { FAQItem } from "../types";

export interface ToolPreset {
  toolId: string;
  presetSlug: string;
  seoTitle: string; // Must be <= 60 chars
  seoDescription: string; // Must be 70-190 chars
  h1: string;
  subtitle: string;
  badge: string;
  category: string;
  presetParams: Record<string, any>;
  faqs: FAQItem[];
  officialReference?: {
    title: string;
    authority: string;
    citation: string;
    url?: string;
  };
}

export const TOOL_PRESETS: ToolPreset[] = [
  {
    "toolId": "cgpa-to-percentage-calculator",
    "presetSlug": "vtu",
    "category": "math",
    "seoTitle": "VTU CGPA to Percentage Calculator: (CGPA−0.75)×10",
    "seoDescription": "VTU formula scenario: Applies (CGPA − 0.75) × 10. Check your course regulation; this tool does not certify marks.",
    "h1": "VTU CGPA to Percentage Calculator",
    "subtitle": "Applies (CGPA − 0.75) × 10. Confirm your course, cohort and regulation before using the conversion.",
    "badge": "Formula scenario — verify your regulation",
    "presetParams": {
      "initialUniversity": "vtu",
      "initialCgpa": 8
    },
    "faqs": [
      {
        "question": "Which formula does this scenario apply?",
        "answer": "This scenario uses (CGPA − 0.75) × 10. It is an arithmetic example, not confirmation that the formula applies to every course or cohort at this institution."
      },
      {
        "question": "Can I use this result for an application?",
        "answer": "Use the rule required by your transcript, examination office or application. This tool cannot certify marks or determine pass, distinction or admission eligibility. If your regulation gives a different rule, select Custom formula."
      }
    ]
  },
  {
    "toolId": "cgpa-to-percentage-calculator",
    "presetSlug": "anna-university",
    "category": "math",
    "seoTitle": "Anna University CGPA to Percentage Calculator: ×10",
    "seoDescription": "Anna University formula scenario: Applies CGPA × 10. Check your course regulation; this tool does not certify marks.",
    "h1": "Anna University CGPA to Percentage Calculator",
    "subtitle": "Applies CGPA × 10. Confirm your course, cohort and regulation before using the conversion.",
    "badge": "Formula scenario — verify your regulation",
    "presetParams": {
      "initialUniversity": "anna",
      "initialCgpa": 8
    },
    "faqs": [
      {
        "question": "Which formula does this scenario apply?",
        "answer": "This scenario uses CGPA × 10. It is an arithmetic example, not confirmation that the formula applies to every course or cohort at this institution."
      },
      {
        "question": "Can I use this result for an application?",
        "answer": "Use the rule required by your transcript, examination office or application. This tool cannot certify marks or determine pass, distinction or admission eligibility. If your regulation gives a different rule, select Custom formula."
      }
    ]
  },
  {
    "toolId": "cgpa-to-percentage-calculator",
    "presetSlug": "mumbai-university",
    "category": "math",
    "seoTitle": "Mumbai University CGPA to Percentage: 7.1×CGPA+12",
    "seoDescription": "Mumbai University formula scenario: Applies 7.1 × CGPA + 12. Check your course regulation; this tool does not certify marks.",
    "h1": "Mumbai University CGPA to Percentage Calculator",
    "subtitle": "Applies 7.1 × CGPA + 12. Confirm your course, cohort and regulation before using the conversion.",
    "badge": "Formula scenario — verify your regulation",
    "presetParams": {
      "initialUniversity": "mumbai",
      "initialCgpa": 8
    },
    "faqs": [
      {
        "question": "Which formula does this scenario apply?",
        "answer": "This scenario uses 7.1 × CGPA + 12. It is an arithmetic example, not confirmation that the formula applies to every course or cohort at this institution."
      },
      {
        "question": "Can I use this result for an application?",
        "answer": "Use the rule required by your transcript, examination office or application. This tool cannot certify marks or determine pass, distinction or admission eligibility. If your regulation gives a different rule, select Custom formula."
      }
    ]
  },
  {
    "toolId": "cgpa-to-percentage-calculator",
    "presetSlug": "ktu",
    "category": "math",
    "seoTitle": "KTU CGPA to Percentage Calculator: (CGPA−0.5)×10",
    "seoDescription": "KTU Kerala formula scenario: Applies (CGPA − 0.5) × 10. Check your course regulation; this tool does not certify marks.",
    "h1": "KTU Kerala CGPA to Percentage Calculator",
    "subtitle": "Applies (CGPA − 0.5) × 10. Confirm your course, cohort and regulation before using the conversion.",
    "badge": "Formula scenario — verify your regulation",
    "presetParams": {
      "initialUniversity": "ktu",
      "initialCgpa": 8
    },
    "faqs": [
      {
        "question": "Which formula does this scenario apply?",
        "answer": "This scenario uses (CGPA − 0.5) × 10. It is an arithmetic example, not confirmation that the formula applies to every course or cohort at this institution."
      },
      {
        "question": "Can I use this result for an application?",
        "answer": "Use the rule required by your transcript, examination office or application. This tool cannot certify marks or determine pass, distinction or admission eligibility. If your regulation gives a different rule, select Custom formula."
      }
    ]
  },
  {
    "toolId": "cgpa-to-percentage-calculator",
    "presetSlug": "cbse",
    "category": "math",
    "seoTitle": "CBSE CGPA to Percentage Calculator: Official ×9.5",
    "seoDescription": "CBSE & Delhi University formula scenario: Applies CGPA × 9.5. Check your course regulation; this tool does not certify marks.",
    "h1": "CBSE & Delhi University CGPA to Percentage Calculator",
    "subtitle": "Applies CGPA × 9.5. Confirm your course, cohort and regulation before using the conversion.",
    "badge": "Formula scenario — verify your regulation",
    "presetParams": {
      "initialUniversity": "cbse",
      "initialCgpa": 8.4
    },
    "faqs": [
      {
        "question": "Which formula does this scenario apply?",
        "answer": "This scenario uses CGPA × 9.5. It is an arithmetic example, not confirmation that the formula applies to every course or cohort at this institution."
      },
      {
        "question": "Can I use this result for an application?",
        "answer": "Use the rule required by your transcript, examination office or application. This tool cannot certify marks or determine pass, distinction or admission eligibility. If your regulation gives a different rule, select Custom formula."
      }
    ]
  },
  {
    "toolId": "cgpa-to-percentage-calculator",
    "presetSlug": "sppu",
    "category": "math",
    "seoTitle": "SPPU Pune CGPA to Percentage Calculator: (CGPA−0.75)×10",
    "seoDescription": "SPPU Pune formula scenario: Applies (CGPA − 0.75) × 10. Check your course regulation; this tool does not certify marks.",
    "h1": "SPPU Pune CGPA to Percentage Calculator",
    "subtitle": "Applies (CGPA − 0.75) × 10. Confirm your course, cohort and regulation before using the conversion.",
    "badge": "Formula scenario — verify your regulation",
    "presetParams": {
      "initialUniversity": "sppu",
      "initialCgpa": 8
    },
    "faqs": [
      {
        "question": "Which formula does this scenario apply?",
        "answer": "This scenario uses (CGPA − 0.75) × 10. It is an arithmetic example, not confirmation that the formula applies to every course or cohort at this institution."
      },
      {
        "question": "Can I use this result for an application?",
        "answer": "Use the rule required by your transcript, examination office or application. This tool cannot certify marks or determine pass, distinction or admission eligibility. If your regulation gives a different rule, select Custom formula."
      }
    ]
  },
  {
    "toolId": "cgpa-to-percentage-calculator",
    "presetSlug": "gtu",
    "category": "math",
    "seoTitle": "GTU CGPA to Percentage Calculator: (CGPA−0.5)×10",
    "seoDescription": "GTU CGPA & CPI to Percentage Calculator formula scenario: Applies (CGPA − 0.5) × 10. Check your course regulation; this tool does not certify marks.",
    "h1": "GTU CGPA & CPI to Percentage Calculator",
    "subtitle": "Applies (CGPA − 0.5) × 10. Confirm your course, cohort and regulation before using the conversion.",
    "badge": "Formula scenario — verify your regulation",
    "presetParams": {
      "initialUniversity": "gtu",
      "initialCgpa": 7.8
    },
    "faqs": [
      {
        "question": "Which formula does this scenario apply?",
        "answer": "This scenario uses (CGPA − 0.5) × 10. It is an arithmetic example, not confirmation that the formula applies to every course or cohort at this institution."
      },
      {
        "question": "Can I use this result for an application?",
        "answer": "Use the rule required by your transcript, examination office or application. This tool cannot certify marks or determine pass, distinction or admission eligibility. If your regulation gives a different rule, select Custom formula."
      }
    ]
  },
  {
    "toolId": "cgpa-to-percentage-calculator",
    "presetSlug": "aktu",
    "category": "math",
    "seoTitle": "AKTU CGPA to Percentage Calculator: Official ×10",
    "seoDescription": "AKTU / UPTU formula scenario: Applies CGPA × 10. Check your course regulation; this tool does not certify marks.",
    "h1": "AKTU / UPTU CGPA to Percentage Calculator",
    "subtitle": "Applies CGPA × 10. Confirm your course, cohort and regulation before using the conversion.",
    "badge": "Formula scenario — verify your regulation",
    "presetParams": {
      "initialUniversity": "aktu",
      "initialCgpa": 8.2
    },
    "faqs": [
      {
        "question": "Which formula does this scenario apply?",
        "answer": "This scenario uses CGPA × 10. It is an arithmetic example, not confirmation that the formula applies to every course or cohort at this institution."
      },
      {
        "question": "Can I use this result for an application?",
        "answer": "Use the rule required by your transcript, examination office or application. This tool cannot certify marks or determine pass, distinction or admission eligibility. If your regulation gives a different rule, select Custom formula."
      }
    ]
  },
  {
    "toolId": "home-loan-emi-calculator",
    "presetSlug": "sbi-bank",
    "category": "finance",
    "seoTitle": "SBI Home Loan EMI Calculator: Compare Rates & Slabs",
    "seoDescription": "Calculate State Bank of India (SBI) home loan monthly EMI, illustrative interest rates (8.50% p.a.), tax savings under Sec 24b, and partial prepayment payoff schedules.",
    "h1": "SBI Home Loan EMI Calculator",
    "subtitle": "State Bank of India (SBI) Benchmark: 8.50% p.a. External Benchmark Lending Rate (EBLR)",
    "badge": "SBI EBLR Benchmark (Scenario)",
    "presetParams": {
      "initialInterestRate": 8.5,
      "initialPropertyPrice": 6000000,
      "lenderName": "SBI Home Loan",
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "What is the current SBI home loan interest rate in 2026?",
        "answer": "SBI home loan interest rates start from 8.50% p.a. for borrowers with a CIBIL score of 750 and above, linked to the RBI Repo Rate (EBLR)."
      },
      {
        "question": "Can I prepay my SBI home loan without penalties?",
        "answer": "Yes, under RBI guidelines, SBI charges zero prepayment or foreclosure penalties on floating-rate individual home loans."
      }
    ]
  },
  {
    "toolId": "home-loan-emi-calculator",
    "presetSlug": "hdfc-bank",
    "category": "finance",
    "seoTitle": "HDFC Home Loan EMI Calculator: Rates, EMI & Tax",
    "seoDescription": "Calculate HDFC Bank home loan EMIs, 8.70% benchmark rate schedules, processing fees, and Section 24b tax deductions with full year-by-year amortization schedules.",
    "h1": "HDFC Bank Home Loan EMI Calculator",
    "subtitle": "HDFC Bank Benchmark Rate: 8.70% p.a. Retail Prime Lending Rate (RPLR)",
    "badge": "HDFC Bank Benchmark (Scenario)",
    "presetParams": {
      "initialInterestRate": 8.7,
      "initialPropertyPrice": 6000000,
      "lenderName": "HDFC Bank",
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "What is the minimum down payment required by HDFC Bank?",
        "answer": "HDFC Bank finances up to 80% of property cost for loans between ₹30 Lakhs and ₹75 Lakhs, meaning a minimum 20% down payment is required."
      }
    ]
  },
  {
    "toolId": "home-loan-emi-calculator",
    "presetSlug": "icici-bank",
    "category": "finance",
    "seoTitle": "ICICI Home Loan EMI Calculator: 8.75% Rate & EMI",
    "seoDescription": "Calculate ICICI Bank home loan EMI at 8.75% interest. View monthly installment breakdowns, prepayment interest cuts, and Section 24 tax relief.",
    "h1": "ICICI Bank Home Loan EMI Calculator",
    "subtitle": "ICICI Bank Benchmark Rate: 8.75% p.a. I-EBLR Lending Rate",
    "badge": "ICICI Bank Benchmark (Scenario)",
    "presetParams": {
      "initialInterestRate": 8.75,
      "initialPropertyPrice": 6000000,
      "lenderName": "ICICI Bank",
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "What is ICICI Bank I-EBLR rate?",
        "answer": "I-EBLR is ICICI Bank's External Benchmark Lending Rate pegged directly to the RBI repo rate. Home loan rates adjust automatically when repo rate changes."
      }
    ]
  },
  {
    "toolId": "home-loan-emi-calculator",
    "presetSlug": "bank-of-baroda",
    "category": "finance",
    "seoTitle": "Bank of Baroda Home Loan EMI Calculator: 8.40%",
    "seoDescription": "Calculate Bank of Baroda (BoB) home loan EMIs at competitive 8.40% interest rates. Model 20-year and 30-year repayments with zero prepayment penalty.",
    "h1": "Bank of Baroda Home Loan EMI Calculator",
    "subtitle": "Bank of Baroda Baroda Home Loan Benchmark: 8.40% p.a. BRLLR",
    "badge": "Bank of Baroda Benchmark (Scenario)",
    "presetParams": {
      "initialInterestRate": 8.4,
      "initialPropertyPrice": 6000000,
      "lenderName": "Bank of Baroda",
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "Why is Bank of Baroda home loan interest rate among the lowest?",
        "answer": "Public sector banks like Bank of Baroda offer lower markups over the RBI repo rate (BRLLR) for high CIBIL score borrowers."
      }
    ]
  },
  {
    "toolId": "home-loan-emi-calculator",
    "presetSlug": "30-lakhs",
    "category": "finance",
    "seoTitle": "30 Lakh Home Loan EMI: Monthly Payment & Schedule",
    "seoDescription": "Calculate 30 Lakh home loan monthly EMI at 8.5% interest across 10, 20, and 30 years. Compare total interest, tax savings, and prepayment payoff dates.",
    "h1": "₹30 Lakh Home Loan EMI Calculator",
    "subtitle": "Complete repayment schedule, interest cost, and tax deductions for a ₹30,00,000 housing loan",
    "badge": "₹30 Lakh Principal Preset",
    "presetParams": {
      "initialPropertyPrice": 3750000,
      "initialInterestRate": 8.5,
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "What is the monthly EMI for a 30 Lakh home loan for 20 years?",
        "answer": "At 8.5% interest, the monthly EMI for a ₹30 Lakh home loan for 20 years is ₹26,035. Total interest paid over 20 years is ₹32,48,328."
      }
    ]
  },
  {
    "toolId": "home-loan-emi-calculator",
    "presetSlug": "50-lakhs",
    "category": "finance",
    "seoTitle": "50 Lakh Home Loan EMI: Monthly Cost & Interest",
    "seoDescription": "Calculate monthly EMI for a 50 Lakh home loan at 8.5% p.a. for 20 years (₹43,391/mo). View total interest cost, amortization schedule, and prepayment impact.",
    "h1": "₹50 Lakh Home Loan EMI Calculator",
    "subtitle": "Complete repayment schedule, interest cost, and tax deductions for a ₹50,00,000 housing loan",
    "badge": "₹50 Lakh Principal Preset",
    "presetParams": {
      "initialPropertyPrice": 6250000,
      "initialInterestRate": 8.5,
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "What is the EMI for 50 Lakh home loan for 20 years?",
        "answer": "At 8.5% interest, your monthly EMI for ₹50 Lakhs for 20 years is ₹43,391. Total amount payable is ₹1,04,13,879, of which ₹54,13,879 is interest."
      }
    ]
  },
  {
    "toolId": "home-loan-emi-calculator",
    "presetSlug": "1-crore",
    "category": "finance",
    "seoTitle": "1 Crore Home Loan EMI: Monthly Cost & Schedule",
    "seoDescription": "Calculate 1 Crore home loan monthly EMI at 8.5% (₹86,782/mo for 20 yrs). Analyze tax deduction limits under Section 24b and partial prepayment savings.",
    "h1": "₹1 Crore Home Loan EMI Calculator",
    "subtitle": "Complete repayment schedule, interest cost, and tax deductions for a ₹1,00,00,000 luxury home loan",
    "badge": "₹1 Crore Principal Preset",
    "presetParams": {
      "initialPropertyPrice": 12500000,
      "initialInterestRate": 8.5,
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "What is the monthly EMI for a 1 Crore home loan for 20 years?",
        "answer": "At 8.5% interest, the EMI for ₹1 Crore for 20 years is ₹86,782/month. Total interest payable is ₹1.08 Crore."
      }
    ]
  },
  {
    "toolId": "sip-calculator",
    "presetSlug": "5000-per-month",
    "category": "finance",
    "seoTitle": "5000 Per Month SIP: 10, 15 & 20 Year Wealth Returns",
    "seoDescription": "Forecast ₹5,000 monthly SIP returns at 12% annual CAGR over 10, 15, and 20 years. Model inflation purchasing power and annual step-up contribution growth.",
    "h1": "₹5,000 Monthly SIP Calculator",
    "subtitle": "Discover how a disciplined ₹5,000/month mutual fund investment compounds into wealth over 15 to 20 years",
    "badge": "₹5,000/Month Preset",
    "presetParams": {
      "initialMonthlyInvestment": 5000,
      "initialDuration": 15,
      "initialExpectedReturn": 12,
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "How much will ₹5,000 monthly SIP grow to in 15 years?",
        "answer": "At an expected 12% annual return, investing ₹5,000 per month for 15 years (total investment ₹9 Lakhs) grows to approximately ₹25,22,880."
      }
    ]
  },
  {
    "toolId": "sip-calculator",
    "presetSlug": "10000-per-month",
    "category": "finance",
    "seoTitle": "10000 Per Month SIP: 15 & 20 Year Wealth Forecast",
    "seoDescription": "Calculate maturity wealth for a ₹10,000 monthly SIP at 12% return. See how a 10% annual step-up turns your investment into over ₹1.5 Crore.",
    "h1": "₹10,000 Monthly SIP Calculator",
    "subtitle": "Forecast compound wealth and inflation purchasing power for ₹10,000 monthly mutual fund investments",
    "badge": "₹10,000/Month Preset",
    "presetParams": {
      "initialMonthlyInvestment": 10000,
      "initialDuration": 15,
      "initialExpectedReturn": 12,
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "How much wealth does ₹10,000 monthly SIP create in 20 years?",
        "answer": "At 12% CAGR, ₹10,000 per month for 20 years yields approximately ₹99,91,479 (~₹1 Crore) on an invested capital of ₹24 Lakhs."
      }
    ]
  },
  {
    "toolId": "sip-calculator",
    "presetSlug": "1-crore-target",
    "category": "finance",
    "seoTitle": "1 Crore SIP Calculator: Monthly Target & Tenure",
    "seoDescription": "Calculate estimated monthly SIP investment required to reach ₹1 Crore corpus in 10, 15, or 20 years at 12% expected mutual fund returns with inflation metrics.",
    "h1": "₹1 Crore Target SIP Calculator",
    "subtitle": "Find the estimated monthly SIP contribution needed to achieve your ₹1,00,00,000 financial freedom goal",
    "badge": "₹1 Crore Goal Preset",
    "presetParams": {
      "initialMonthlyInvestment": 20000,
      "initialDuration": 15,
      "initialExpectedReturn": 12,
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "How much should I invest monthly to get 1 Crore in 15 years?",
        "answer": "At a 12% annual CAGR, you need to invest approximately ₹19,820 per month to accumulate a ₹1 Crore corpus in 15 years."
      }
    ]
  },
  {
    "toolId": "salary-calculator",
    "presetSlug": "6-lakhs-ctc",
    "category": "finance",
    "seoTitle": "6 LPA In-Hand Salary: Monthly Take Home & EPF",
    "seoDescription": "Calculate in-hand take-home monthly salary for ₹6 Lakhs CTC under New Tax Regime FY 2025-26. See employee EPF, professional tax, and zero income tax benefit.",
    "h1": "₹6 LPA In-Hand Salary Calculator",
    "subtitle": "Detailed monthly gross, EPF deductions, and take-home pay for an annual CTC of ₹6,00,000 · India new regime, FY 2025–26 / AY 2026–27",
    "badge": "₹6 LPA CTC Preset",
    "presetParams": {
      "initialCtc": 600000,
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "How is tax calculated in this salary scenario?",
        "answer": "The model uses FY 2025–26 new-regime salary slabs, the ₹75,000 standard deduction, eligible resident rebate up to ₹12 lakh taxable income, marginal relief and 4% cess. Bonus remains taxable; employee EPF and professional tax reduce pay but not this taxable base."
      },
      {
        "question": "Does monthly take-home include the annual bonus?",
        "answer": "No. Regular monthly take-home excludes the bonus, which is assumed to be paid separately. Annual take-home includes it. Annual tax is spread across 12 months; actual payroll timing and CTC benefits can differ."
      }
    ],
    "officialReference": {
      "title": "Salaried individuals: AY 2026–27",
      "authority": "Income Tax Department",
      "citation": "New-regime slabs and Section 87A",
      "url": "https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1"
    }
  },
  {
    "toolId": "salary-calculator",
    "presetSlug": "10-lakhs-ctc",
    "category": "finance",
    "seoTitle": "10 LPA In-Hand Salary: Monthly Pay & Tax Breakdown",
    "seoDescription": "Calculate monthly in-hand take home salary for 10 Lakhs CTC under New Tax Regime. Breaks down basic pay, EPF, professional tax, and net bank credit.",
    "h1": "₹10 LPA In-Hand Salary Calculator",
    "subtitle": "Detailed monthly gross, EPF deductions, and tax liability for an annual CTC of ₹10,00,000 · India new regime, FY 2025–26 / AY 2026–27",
    "badge": "₹10 LPA CTC Preset",
    "presetParams": {
      "initialCtc": 1000000,
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "How is tax calculated in this salary scenario?",
        "answer": "The model uses FY 2025–26 new-regime salary slabs, the ₹75,000 standard deduction, eligible resident rebate up to ₹12 lakh taxable income, marginal relief and 4% cess. Bonus remains taxable; employee EPF and professional tax reduce pay but not this taxable base."
      },
      {
        "question": "Does monthly take-home include the annual bonus?",
        "answer": "No. Regular monthly take-home excludes the bonus, which is assumed to be paid separately. Annual take-home includes it. Annual tax is spread across 12 months; actual payroll timing and CTC benefits can differ."
      }
    ],
    "officialReference": {
      "title": "Salaried individuals: AY 2026–27",
      "authority": "Income Tax Department",
      "citation": "New-regime slabs and Section 87A",
      "url": "https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1"
    }
  },
  {
    "toolId": "salary-calculator",
    "presetSlug": "15-lakhs-ctc",
    "category": "finance",
    "seoTitle": "15 LPA In-Hand Salary: Monthly Take-Home & Taxes",
    "seoDescription": "Calculate in-hand monthly salary for 15 Lakhs CTC in India. Detailed breakdown of ₹75,000 standard deduction, slab taxes under New Regime, and EPF.",
    "h1": "₹15 LPA In-Hand Salary Calculator",
    "subtitle": "Detailed monthly gross, EPF deductions, and tax liability for an annual CTC of ₹15,00,000 · India new regime, FY 2025–26 / AY 2026–27",
    "badge": "₹15 LPA CTC Preset",
    "presetParams": {
      "initialCtc": 1500000,
      "initialCurrency": "INR"
    },
    "faqs": [
      {
        "question": "How is tax calculated in this salary scenario?",
        "answer": "The model uses FY 2025–26 new-regime salary slabs, the ₹75,000 standard deduction, eligible resident rebate up to ₹12 lakh taxable income, marginal relief and 4% cess. Bonus remains taxable; employee EPF and professional tax reduce pay but not this taxable base."
      },
      {
        "question": "Does monthly take-home include the annual bonus?",
        "answer": "No. Regular monthly take-home excludes the bonus, which is assumed to be paid separately. Annual take-home includes it. Annual tax is spread across 12 months; actual payroll timing and CTC benefits can differ."
      }
    ],
    "officialReference": {
      "title": "Salaried individuals: AY 2026–27",
      "authority": "Income Tax Department",
      "citation": "New-regime slabs and Section 87A",
      "url": "https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1"
    }
  },
  {
    "toolId": "mortgage-calculator",
    "presetSlug": "30-year-fixed",
    "category": "finance",
    "seoTitle": "30-Year Fixed Mortgage Payment Calculator",
    "seoDescription": "30-Year Fixed Mortgage Calculator: estimate payments with editable rates and lender-quoted premiums. Review costs and a repayment schedule; eligibility is not assessed.",
    "h1": "30-Year Fixed Mortgage Calculator",
    "subtitle": "Estimate fixed-rate payments using your lender rate and quoted costs. Defaults are illustrative, not current rates or an approval.",
    "badge": "Editable fixed-rate scenario",
    "presetParams": {
      "initialHomePrice": 425000,
      "initialDownPaymentPercent": 20,
      "initialInterestRate": 6.85,
      "initialLoanTermYears": 30,
      "initialPropertyTaxAnnual": 4800,
      "initialHomeInsuranceAnnual": 1400,
      "initialHoaFeesMonthly": 100,
      "initialCurrency": "USD",
      "initialProgram": "conventional"
    },
    "faqs": [
      {
        "question": "Are the default rates current lender offers?",
        "answer": "No. They are editable examples. Enter a dated lender quote and its fees. The schedule assumes an unchanged rate for the full repayment period and is not a loan approval."
      },
      {
        "question": "How is mortgage insurance handled?",
        "answer": "For a conventional loan, enter a lender-quoted monthly PMI amount if applicable. The UK model does not add US-style PMI. The initial monthly total includes entered housing costs; the schedule shows principal and interest only."
      }
    ]
  },
  {
    "toolId": "mortgage-calculator",
    "presetSlug": "15-year-fixed",
    "category": "finance",
    "seoTitle": "15-Year Fixed Mortgage Calculator: Rates & Payoff",
    "seoDescription": "15-Year Fixed Mortgage Calculator: estimate payments with editable rates and lender-quoted premiums. Review costs and a repayment schedule; eligibility is not assessed.",
    "h1": "15-Year Fixed Mortgage Calculator",
    "subtitle": "Estimate fixed-rate payments using your lender rate and quoted costs. Defaults are illustrative, not current rates or an approval.",
    "badge": "Editable fixed-rate scenario",
    "presetParams": {
      "initialHomePrice": 425000,
      "initialDownPaymentPercent": 20,
      "initialInterestRate": 6.15,
      "initialLoanTermYears": 15,
      "initialPropertyTaxAnnual": 4800,
      "initialHomeInsuranceAnnual": 1400,
      "initialHoaFeesMonthly": 100,
      "initialCurrency": "USD",
      "initialProgram": "conventional"
    },
    "faqs": [
      {
        "question": "Are the default rates current lender offers?",
        "answer": "No. They are editable examples. Enter a dated lender quote and its fees. The schedule assumes an unchanged rate for the full repayment period and is not a loan approval."
      },
      {
        "question": "How is mortgage insurance handled?",
        "answer": "For a conventional loan, enter a lender-quoted monthly PMI amount if applicable. The UK model does not add US-style PMI. The initial monthly total includes entered housing costs; the schedule shows principal and interest only."
      }
    ]
  },
  {
    "toolId": "mortgage-calculator",
    "presetSlug": "fha-loan",
    "category": "finance",
    "seoTitle": "FHA Payment Scenario with Quoted Insurance",
    "seoDescription": "FHA Mortgage Payment Scenario: estimate payments with editable rates and lender-quoted premiums. Review costs and a repayment schedule; eligibility is not assessed.",
    "h1": "FHA Mortgage Payment Scenario",
    "subtitle": "Estimate fixed-rate payments using your lender rate and quoted costs. Defaults are illustrative, not current rates or an approval.",
    "badge": "Editable fixed-rate scenario",
    "presetParams": {
      "initialHomePrice": 350000,
      "initialDownPaymentPercent": 3.5,
      "initialInterestRate": 6.5,
      "initialLoanTermYears": 30,
      "initialPropertyTaxAnnual": 3800,
      "initialHomeInsuranceAnnual": 1200,
      "initialHoaFeesMonthly": 0,
      "initialCurrency": "USD",
      "initialProgram": "fha"
    },
    "faqs": [
      {
        "question": "Are the default rates current lender offers?",
        "answer": "No. They are editable examples. Enter a dated lender quote and its fees. The schedule assumes an unchanged rate for the full repayment period and is not a loan approval."
      },
      {
        "question": "How are FHA premiums entered?",
        "answer": "Enter the upfront fee and the initial monthly MIP quoted by your lender. They default to zero until entered. This calculator does not determine FHA eligibility, premium tiers or changing MIP over the loan term."
      }
    ]
  },
  {
    "toolId": "mortgage-calculator",
    "presetSlug": "va-loan",
    "category": "finance",
    "seoTitle": "VA Loan Calculator: 0% Down Military Mortgage & Fees",
    "seoDescription": "VA Home Loan Mortgage Calculator: estimate payments with editable rates and lender-quoted premiums. Review costs and a repayment schedule; eligibility is not assessed.",
    "h1": "VA Home Loan Mortgage Calculator",
    "subtitle": "Estimate fixed-rate payments using your lender rate and quoted costs. Defaults are illustrative, not current rates or an approval.",
    "badge": "Editable fixed-rate scenario",
    "presetParams": {
      "initialHomePrice": 400000,
      "initialDownPaymentPercent": 0,
      "initialInterestRate": 6.35,
      "initialLoanTermYears": 30,
      "initialPropertyTaxAnnual": 4200,
      "initialHomeInsuranceAnnual": 1300,
      "initialHoaFeesMonthly": 0,
      "initialCurrency": "USD",
      "initialProgram": "va"
    },
    "faqs": [
      {
        "question": "Are the default rates current lender offers?",
        "answer": "No. They are editable examples. Enter a dated lender quote and its fees. The schedule assumes an unchanged rate for the full repayment period and is not a loan approval."
      },
      {
        "question": "Does this VA estimate charge PMI?",
        "answer": "No. Monthly mortgage insurance is zero. The funding fee depends on down payment, first or subsequent use, and exemption status. You can finance the fee or pay it upfront. Confirm exemption and eligibility with your lender."
      }
    ],
    "officialReference": {
      "title": "VA funding fee and closing costs",
      "authority": "US Department of Veterans Affairs",
      "citation": "Purchase-loan funding-fee table",
      "url": "https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/"
    }
  },
  {
    "toolId": "mortgage-calculator",
    "presetSlug": "canada-cmhc",
    "category": "finance",
    "seoTitle": "Canada Mortgage Payment Scenario",
    "seoDescription": "Canada Mortgage Payment Scenario: estimate payments with editable rates and lender-quoted premiums. Review costs and a repayment schedule; eligibility is not assessed.",
    "h1": "Canada Mortgage Payment Scenario",
    "subtitle": "Estimate fixed-rate payments using your lender rate and quoted costs. Defaults are illustrative, not current rates or an approval.",
    "badge": "Editable fixed-rate scenario",
    "presetParams": {
      "initialHomePrice": 650000,
      "initialDownPaymentPercent": 10,
      "initialInterestRate": 4.85,
      "initialLoanTermYears": 25,
      "initialPropertyTaxAnnual": 5200,
      "initialHomeInsuranceAnnual": 1500,
      "initialHoaFeesMonthly": 0,
      "initialCurrency": "CAD",
      "initialProgram": "canada"
    },
    "faqs": [
      {
        "question": "Are the default rates current lender offers?",
        "answer": "No. They are editable examples. Enter a dated lender quote and its fees. The schedule assumes an unchanged rate for the full repayment period and is not a loan approval."
      },
      {
        "question": "Are CMHC insurance and the stress test calculated automatically?",
        "answer": "No. Enter the upfront premium quoted by your lender. Fixed-rate interest uses semi-annual compounding converted to a monthly rate. Eligibility, provincial premium taxes, stress testing and renewal rates are outside this scenario."
      }
    ]
  },
  {
    "toolId": "mortgage-calculator",
    "presetSlug": "uk-repayment",
    "category": "finance",
    "seoTitle": "UK Mortgage Repayment Calculator",
    "seoDescription": "UK Mortgage Repayment Calculator: estimate payments with editable rates and lender-quoted premiums. Review costs and a repayment schedule; eligibility is not assessed.",
    "h1": "UK Mortgage Repayment Calculator",
    "subtitle": "Estimate fixed-rate payments using your lender rate and quoted costs. Defaults are illustrative, not current rates or an approval.",
    "badge": "Editable fixed-rate scenario",
    "presetParams": {
      "initialHomePrice": 320000,
      "initialDownPaymentPercent": 15,
      "initialInterestRate": 4.75,
      "initialLoanTermYears": 25,
      "initialPropertyTaxAnnual": 1800,
      "initialHomeInsuranceAnnual": 400,
      "initialHoaFeesMonthly": 0,
      "initialCurrency": "GBP",
      "initialProgram": "uk"
    },
    "faqs": [
      {
        "question": "Are the default rates current lender offers?",
        "answer": "No. They are editable examples. Enter a dated lender quote and its fees. The schedule assumes an unchanged rate for the full repayment period and is not a loan approval."
      },
      {
        "question": "How is mortgage insurance handled?",
        "answer": "For a conventional loan, enter a lender-quoted monthly PMI amount if applicable. The UK model does not add US-style PMI. The initial monthly total includes entered housing costs; the schedule shows principal and interest only."
      }
    ]
  },
  {
    "toolId": "retirement-calculator",
    "presetSlug": "401k-growth",
    "category": "finance",
    "seoTitle": "401(k) Calculator: Employer Match & Retirement Growth",
    "seoDescription": "Project 401(k) savings with annual contributions, employer matching and salary growth. Uses 2026 age-based contribution limits held flat for future scenarios.",
    "h1": "401(k) Retirement Growth Calculator",
    "subtitle": "Model annual contributions and employer matching at an assumed return; future limits and returns are not guaranteed.",
    "badge": "2026 contribution scenario",
    "presetParams": {
      "initialCurrentAge": 28,
      "initialRetirementAge": 65,
      "initialCurrentSavings": 45000,
      "initialMonthlyExpenses": 4500,
      "initialExpectedReturn": 9,
      "initialInflationRate": 3,
      "initialCurrency": "USD",
      "initialMode": "401k"
    },
    "faqs": [
      {
        "question": "Which contribution limits are used?",
        "answer": "The 2026 employee limit is $24,500. The general age-50 catch-up is $8,000; ages 60–63 may use $11,250. This scenario holds these limits flat in future years and does not determine plan eligibility or tax treatment."
      }
    ],
    "officialReference": {
      "title": "2026 retirement contribution limits",
      "authority": "Internal Revenue Service",
      "citation": "2026 cost-of-living adjustments",
      "url": "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500"
    }
  },
  {
    "toolId": "retirement-calculator",
    "presetSlug": "roth-ira",
    "category": "finance",
    "seoTitle": "Roth IRA Contribution Growth Scenario",
    "seoDescription": "Project Roth IRA contribution growth with an editable annual return. Uses the 2026 $7,500 base limit; eligibility and withdrawal tax treatment are not determined.",
    "h1": "Roth IRA Compound Growth Calculator",
    "subtitle": "Annual contribution growth in nominal dollars. Confirm income eligibility, compensation and qualified withdrawal rules separately.",
    "badge": "2026 IRA contribution scenario",
    "presetParams": {
      "initialCurrentAge": 25,
      "initialRetirementAge": 65,
      "initialCurrentSavings": 15000,
      "initialMonthlyExpenses": 4000,
      "initialExpectedReturn": 10,
      "initialInflationRate": 2.8,
      "initialCurrency": "USD",
      "initialMode": "roth"
    },
    "faqs": [
      {
        "question": "Which IRA limit is used?",
        "answer": "The 2026 base contribution limit is $7,500, with a $1,100 age-50 catch-up. The limit covers contributions across traditional and Roth IRAs. This model assumes eligibility and holds limits flat for future years."
      }
    ],
    "officialReference": {
      "title": "2026 retirement contribution limits",
      "authority": "Internal Revenue Service",
      "citation": "2026 cost-of-living adjustments",
      "url": "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500"
    }
  },
  {
    "toolId": "retirement-calculator",
    "presetSlug": "fire-movement",
    "category": "finance",
    "seoTitle": "FIRE Calculator: Financial Independence & 4% Rule",
    "seoDescription": "Calculate a FIRE target from annual spending and an adjustable withdrawal rate. At 4% the target is 25 times expenses; portfolio survival is not guaranteed.",
    "h1": "FIRE Movement Retirement Calculator",
    "subtitle": "Divide annual spending by an assumed withdrawal rate. At 4%, the target is 25 times spending in today’s money.",
    "badge": "Withdrawal-rate scenario",
    "presetParams": {
      "initialCurrentAge": 30,
      "initialRetirementAge": 45,
      "initialCurrentSavings": 120000,
      "initialMonthlyExpenses": 5000,
      "initialExpectedReturn": 9,
      "initialInflationRate": 3,
      "initialCurrency": "USD",
      "initialMode": "fire"
    },
    "faqs": [
      {
        "question": "What does a 4% FIRE target mean?",
        "answer": "Annual spending divided by 0.04 equals 25 times annual spending. For $60,000 per year, that is $1,500,000 in today’s money. This arithmetic is not a guarantee of safe withdrawals, investment returns or portfolio survival."
      }
    ]
  },
  {
    "toolId": "compound-interest-calculator",
    "presetSlug": "sp500-index",
    "category": "finance",
    "seoTitle": "S&P 500 Return Calculator: 10% Historical CAGR Return",
    "seoDescription": "Calculate long-term wealth growth investing in the S&P 500 index at its historical 10% annualized return with monthly dollar-cost averaging.",
    "h1": "S&P 500 Index Compound Return Calculator",
    "subtitle": "Simulate dollar-cost averaging into low-cost index funds (VOO / SPY) with reinvested dividends",
    "badge": "S&P 500 10% Historical CAGR",
    "presetParams": {
      "initialPrincipal": 10000,
      "initialMonthlyContribution": 500,
      "initialAnnualRate": 10,
      "initialYears": 20,
      "initialCurrency": "USD"
    },
    "faqs": [
      {
        "question": "What is the historical average return of the S&P 500?",
        "answer": "Over the last 90+ years, the S&P 500 index has generated an annualized nominal compound return of approximately 10.2% with dividends reinvested (roughly 7% adjusted for inflation)."
      }
    ]
  },
  {
    "toolId": "compound-interest-calculator",
    "presetSlug": "500-a-month",
    "category": "finance",
    "seoTitle": "$500 a Month Investment Calculator: 10, 20 & 30 Years",
    "seoDescription": "Calculate how much $500 invested monthly grows to in 10, 20, and 30 years at 8%, 10%, and 12% compound returns. Real wealth breakdown with charts.",
    "h1": "$500 a Month Investment Calculator",
    "subtitle": "Discover how a consistent $500 monthly investment compounds into over $1,000,000 in index funds",
    "badge": "$500/Month DCA Strategy",
    "presetParams": {
      "initialPrincipal": 1000,
      "initialMonthlyContribution": 500,
      "initialAnnualRate": 10,
      "initialYears": 25,
      "initialCurrency": "USD"
    },
    "faqs": [
      {
        "question": "How much will $500 a month be in 25 years at 10% interest?",
        "answer": "Investing $500 per month for 25 years at 10% annual return yields approximately $669,450 on a total out-of-pocket investment of just $151,000. In 30 years, it crosses $1,130,000."
      }
    ]
  },
  {
    "toolId": "car-loan-emi-calculator",
    "presetSlug": "60-month-auto-loan",
    "category": "finance",
    "seoTitle": "60-Month Car Loan Calculator: Payment & 6.8% APR",
    "seoDescription": "Calculate 60-month (5-year) new and used car monthly loan payments with trade-in value, down payment, and illustrative US average 6.8% auto loan interest rates.",
    "h1": "60-Month Auto Loan Payment Calculator",
    "subtitle": "Model the most common US auto financing term with trade-in deduction and illustrative bank APRs",
    "badge": "US 60-Month Benchmark (6.8% APR)",
    "presetParams": {
      "initialCarPrice": 35000,
      "initialDownPayment": 5000,
      "initialTradeInValue": 3000,
      "initialInterestRate": 6.8,
      "initialTenureYears": 5,
      "initialCurrency": "USD"
    },
    "officialReference": {
      "title": "Federal Reserve Consumer Credit Report (G.19)",
      "authority": "Federal Reserve Board",
      "citation": "Commercial Bank Interest Rates on 60-Month Auto Loans",
      "url": "https://www.federalreserve.gov/releases/g19/"
    },
    "faqs": [
      {
        "question": "What is the average monthly payment for a $35,000 car for 60 months?",
        "answer": "With $5,000 down payment and $3,000 trade-in ($27,000 loan amount) at 6.8% APR, the monthly payment is approximately $532. Total interest paid over 5 years is roughly $4,923."
      }
    ]
  },
  {
    "toolId": "markdown-viewer",
    "presetSlug": "github-readme",
    "category": "developer",
    "seoTitle": "GitHub README.md Viewer & Editor (Free Online)",
    "seoDescription": "Preview and edit your GitHub README.md online with live split-screen preview, badge rendering, tables, code blocks, and instant copy. 100% private in-browser.",
    "h1": "GitHub README.md Viewer & Editor",
    "subtitle": "Real-time GitHub Flavored Markdown (GFM) preview, shields.io badges, installation blocks, and contributing guidelines",
    "badge": "GitHub README Specification",
    "presetParams": {
      "templateKey": "readme",
      "initialFileName": "README.md",
      "initialMarkdown": "# 🚀 Project Title\n\n[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()\n[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)]()\n\nA modern, fast, and privacy-first web application built with TypeScript and React.\n\n---\n\n## ✨ Features\n- ⚡ **Zero Latency**: Executes entirely client-side inside the browser.\n- 🔒 **Privacy-First**: No remote server uploads, tracking, or external database queries.\n- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile screens.\n- 🛠️ **Export Capabilities**: 1-click download to Markdown (.md), PDF, Word (.doc), and HTML.\n\n---\n\n## 📦 Installation\n\nClone the repository and install dependencies using your favorite package manager:\n\n```bash\ngit clone https://github.com/username/project-name.git\ncd project-name\nnpm install\n```\n\n---\n\n## 🚀 Quick Start\n\nStart the local development server:\n\n```bash\nnpm run dev\n```\n\nOpen [http://localhost:3000](http://localhost:3000) in your browser to view the application.\n\n---\n\n## 📑 API Reference\n\n| Endpoint | Method | Description | Auth Required |\n| :--- | :--- | :--- | :---: |\n| `/api/status` | `GET` | Returns service health status | ❌ No |\n| `/api/convert` | `POST` | Client-side format processing | ❌ No |\n\n---\n\n## 🤝 Contributing\n\nContributions, issues, and feature requests are welcome! Feel free to check the [issues page]().\n\n1. Fork the Project\n2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)\n3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)\n4. Push to the Branch (`git push origin feature/AmazingFeature`)\n5. Open a Pull Request\n\n---\n\n## 📝 License\n\nDistributed under the MIT License. See `LICENSE` for more information.\n"
    },
    "officialReference": {
      "title": "GitHub Docs - About READMEs",
      "authority": "GitHub Documentation",
      "citation": "GitHub Standard Repository Documentation Guide",
      "url": "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes"
    },
    "faqs": [
      {
        "question": "How do I preview a GitHub README.md before pushing to GitHub?",
        "answer": "Paste your README markdown into the editor or upload your README.md file. This viewer provides a local Markdown preview for headings, tables, checklists and code fences. Rendering can differ from GitHub; verify the final document on its destination platform."
      },
      {
        "question": "Can I export my GitHub README as a PDF or Word document?",
        "answer": "Yes. Click 'MD to PDF' or 'MD to Word' in the top action ribbon to compile a clean, formatted document for executive reports, grant proposals, or client documentation."
      },
      {
        "question": "Does this preview tool upload my proprietary code or README to any server?",
        "answer": "No. Everything runs strictly in your local browser memory via JavaScript. No repository code, documentation, or metadata is ever transmitted over the network."
      }
    ]
  },
  {
    "toolId": "markdown-viewer",
    "presetSlug": "changelog",
    "category": "developer",
    "seoTitle": "Keep a Changelog Viewer & Editor (CHANGELOG.md)",
    "seoDescription": "Preview and edit CHANGELOG.md files adhering to Keep a Changelog standards. Live GFM preview with version release tags, checklists, and instant PDF/Word export.",
    "h1": "Keep a Changelog Viewer & Editor",
    "subtitle": "Standardized release notes viewer adhering to KeepAChangelog.com and SemVer 2.0.0 guidelines with instant export",
    "badge": "KeepAChangelog Spec v1.1.0",
    "presetParams": {
      "templateKey": "changelog",
      "initialFileName": "CHANGELOG.md",
      "initialMarkdown": "# 📋 Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n---\n\n## [Unreleased]\n### Added\n- Real-time client-side split-screen markdown preview.\n- 1-click export to Word (.doc) and PDF formats.\n\n---\n\n## [1.2.0] - 2026-09-06\n### Added\n- Support for GitHub Flavored Markdown (GFM) callout alerts: `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`.\n- Full table alignments support (left, center, right).\n- Task checklists with interactive checkboxes.\n\n### Changed\n- Improved memory efficiency when parsing large files (>5MB).\n- Optimized typography contrast for dark mode viewing.\n\n### Fixed\n- Fixed unclosed code fence indentation issue on Windows line endings (`\\r\\n`).\n- Resolved table border overflow on mobile viewport widths.\n\n---\n\n## [1.0.0] - 2026-08-01\n### Added\n- Initial public release of Yuitility Markdown File Viewer.\n- Drag-and-drop local file reader supporting `.md`, `.markdown`, and `.txt`.\n- Real-time word count, character metrics, and estimated reading time.\n"
    },
    "officialReference": {
      "title": "Keep a Changelog Standard (v1.1.0)",
      "authority": "Keep a Changelog Initiative",
      "citation": "Standardized Release History Conventions for Software Projects",
      "url": "https://keepachangelog.com/en/1.1.0/"
    },
    "faqs": [
      {
        "question": "What categories should a CHANGELOG.md include?",
        "answer": "According to Keep a Changelog standards, each release should organize changes under: Added (new features), Changed (modifications), Deprecated (soon-to-be removed), Removed (eliminated features), Fixed (bug resolutions), and Security (vulnerability patches)."
      },
      {
        "question": "How do I format version headers in Markdown?",
        "answer": "Use level-2 headings with square brackets for version numbers and release dates: ## [1.2.0] - 2026-09-06. The top section should always remain ## [Unreleased] for upcoming changes."
      }
    ]
  },
  {
    "toolId": "markdown-viewer",
    "presetSlug": "documentation",
    "category": "developer",
    "seoTitle": "Markdown Documentation Viewer & Editor (DOCS.md)",
    "seoDescription": "Preview technical documentation and API docs in Markdown. Features live split-screen view, parameter tables, GFM alert callouts, and instant PDF export.",
    "h1": "Technical Markdown Documentation Viewer",
    "subtitle": "Interactive developer documentation viewer with API endpoint grids, request/response syntax blocks, and alert callouts",
    "badge": "Technical Docs & API Spec",
    "presetParams": {
      "templateKey": "docs",
      "initialFileName": "DOCS.md",
      "initialMarkdown": "# 📘 Architecture & Technical Specification\n\nThis document details the system design, algorithmic data flow, and runtime security model of the client-side Markdown engine.\n\n> [!IMPORTANT]\n> All document transformations execute strictly inside the browser thread using web standards (HTML5 FileReader, Web Crypto, and DOM APIs). No user data is ever transmitted across the network.\n\n---\n\n## 🏗️ Architecture Pipeline\n\n1. **File Input / Clipboard Intake**: Reads binary blob or string via `FileReader.readAsText()`.\n2. **Tokenizer & Block Parser**: Deconstructs lines into block-level elements (Headings, Code Fences, Blockquotes, Tables, Lists).\n3. **Inline Formatter**: Applies regex passes for bold, italic, inline code, links, images, and strikethroughs.\n4. **HTML Sanitization & Rendering**: Converts AST tokens into clean, styled HTML5 elements.\n5. **DOM Injection**: Updates the split-pane live preview container synchronously.\n\n---\n\n## ⚙️ Supported Block Elements\n\n| Syntax Token | HTML Output | Description |\n| :--- | :--- | :--- |\n| `# Heading 1` | `<h1>` | Top-level document header |\n| `| col | col |` | `<table>` | GFM formatted data grid |\n| `- [x] task` | `<input type=\"checkbox\">` | Interactive task status |\n| ```lang` | `<pre><code>` | Syntax-highlighted code block |\n| `> [!TIP]` | `<blockquote class=\"tip\">` | Callout notification alert |\n\n---\n\n## 🔒 Security & Privacy Guarantees\n- **No Cookies / Local Storage of Document Content**: Uploaded files exist only in volatile browser RAM.\n- **Zero Third-Party Telemetry**: Document text is never inspected, tokenized, or logged.\n"
    },
    "faqs": [
      {
        "question": "How can I share technical documentation written in Markdown with non-technical stakeholders?",
        "answer": "Use the 'MD to PDF' or 'MD to Word' export buttons. This compiles your Markdown documentation, tables, and code snippets into standard .pdf and .doc files that clients, managers, and non-developers can read without any Markdown reader."
      },
      {
        "question": "How do I write callout boxes for warnings or tips in Markdown?",
        "answer": "Use GitHub-style alert callouts: > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], or > [!CAUTION]. The viewer styles each with thematic colors, borders, and icons."
      }
    ]
  }
];

export function getAllToolPresets(): ToolPreset[] {
  return TOOL_PRESETS;
}

export function getPresetsForTool(toolId: string): ToolPreset[] {
  return TOOL_PRESETS.filter((p) => p.toolId === toolId);
}

export function getPreset(toolId: string, presetSlug: string): ToolPreset | undefined {
  return TOOL_PRESETS.find((p) => p.toolId === toolId && p.presetSlug === presetSlug);
}

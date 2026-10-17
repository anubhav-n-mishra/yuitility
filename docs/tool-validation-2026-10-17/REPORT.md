# Tool validation report — 17 October 2026

## Result and scope

**452 automated checks passed across all 167 implementations.** The separate existing suite also passed 13 IndexNow checks and 13 calculator/API/content test cases: **478 checks in total**, plus SEO integrity checks. Every tool has a recorded check and loading smoke check. See the [per-tool register](TOOL-REGISTER.md) and [machine-readable results](results.json).

This is reproducible engineering validation with independently derived expected values and algebraic identities. It is **not an external independent mathematical certificate, formal proof for every possible input, clinical validation, institutional approval or certification of AI image quality**. The same engineering agent implemented fixes and authored these checks; no external reviewer signed them. Twelve image/media implementations have explicitly partial coverage. Do not advertise the entire catalog as “mathematically certified.”

The checks use production component logic, not a second calculator substituted for it. A TypeScript transform supplies named React input states and captures computed values and callbacks. The harness replaces UI hooks and browser globals; it does not reproduce the React scheduler, browser rendering or every event. Separately recorded browser checks cover selected real interactions. Registry tests continue to require all 167 live tools, 36 presets and 240 indexed URLs.

## Independent references and checks

- Loan payments: a present-value bisection oracle, repayment principal sums and cash-flow reconciliation, across 0–24% rates and 1–360 month terms. Zero-interest cases exercise the separate loan products. Zero-extra prepayment must equal the standard schedule.
- Investing: principal/contribution identities at zero return; step-up deposit totals; SWP cannot withdraw more than available assets; conventional annual IRR must make discounted NPV zero. Mixed-sign streams are explicitly unsupported because uniqueness is not established.
- Arithmetic: exact BigInt factorial recurrence, strict integer-base vectors beyond JavaScript's safe-integer range, Euclidean division identities for negative divisors, matrix identity multiplication at both sizes, and standard-deviation translation invariance using an independent pairwise-distance oracle.
- Expressions: precedence, right-associative powers, unary minus, implicit multiplication, constants, scientific notation, postfix percentage/factorial, degree/radian trigonometry and rejection of undefined expressions.
- Units/dates: exact international-unit constants, decimal versus binary data units, Gregorian leap-century boundaries, end-of-month clamping, winter/summer zone offsets, nonexistent DST times and ambiguous repeated times.
- Health/construction: numerical examples check the stated empirical formula or material estimate. These do not establish clinical accuracy, suitability for an individual, building-code compliance or contractor quantities.
- Text/security: Unicode encoding/encryption round trips, known hash digests, password structure and cryptographic randomness, literal HTML escaping, CSV rejection/quoting, strict parsing, formatter string preservation and Wi-Fi payload escaping.
- Files: real PDF export callbacks process synthetic documents. Exported PDFs are reopened for page counts, page widths, rotations, metadata and successful structure parsing. PNG-to-PDF and ZIP entry round trips run against synthetic files. These checks use the existing PDF library to reopen output, so they are not independent PDF-conformance certification.

Inputs, assertions and tolerances are reviewable in [validate-tools.cjs](../../scripts/validate-tools.cjs), [functional checks](../../scripts/validate-tools-functional.cjs), [property checks](../../scripts/validate-tools-properties.cjs) and [calculator/API tests](../../scripts/calculators.test.ts). The harness is [here](../../scripts/tool-validation-harness.cjs). Source fingerprints in the results and [helper manifest](source-manifest.json) identify the tested code.

## Defects corrected in this pass

| Area | Correction |
|---|---|
| Body fat | Convert centimetres to inches before applying the inch-based circumference regression; invalid dimensions no longer become an invented 2% result. Displayed as an adult estimate. |
| EPF | Full-basic employer contribution less capped EPS, instead of a fixed 3.67% at every salary. Monthly opening-balance interest is accumulated and credited annually. Zero remaining years does not invent another year. Assumptions are visible. |
| SWP | Final withdrawal is capped at available funds. The previous implementation could report withdrawals exceeding the corpus. |
| IRR | Replace unconstrained Newton iteration and fabricated 0% fallback with a bounded conventional-flow solver and explicit unsupported result. |
| Loans/deposits/SIP | Handle zero interest/return; preserve standard totals when the prepayment switch is on with zero extras. |
| Arithmetic | Correct negative-divisor quotient; reject partial/decimal factorial inputs; preserve zero combinatorial values; use stable quadratic roots; retain exact integer-base values. |
| Statistics | Reject partially numeric datasets; sample variance/standard deviation require two observations; normalize numeric mode tokens and allow tied repeated modes. |
| Calendar/timezones | Clamp month arithmetic; remove negative day remainders at month ends; interpret a time in the chosen zone, independently of the device zone; reject DST gaps/repeats. |
| Units | Exact mile/pound/ounce constants and explicit decimal/binary data units. |
| Expressions | Replace JavaScript `Function` evaluation and unsafe string substitution with a bounded arithmetic parser. Preserve tiny and large finite results. |
| Passwords | Cryptographic, unbiased random draws and Fisher–Yates shuffle replace `Math.random`; remove “unbreakable/military grade” claims. Pool-size calculations are upper bounds. |
| Formatters | Parser-backed JavaScript/CSS transformation preserves strings, URLs and syntax. HTML offers formatting and conservative preservation instead of destructive whitespace compression. |
| QR/JWT/regex | Escape Wi-Fi delimiters; decode JWT JSON as UTF-8; escape highlighted input so pasted HTML cannot execute. |
| Assumptions | Fixed FX rates labeled illustrative; SSY rate editable and timing disclosed; unsupported Moon/rising outputs removed; academic standing and individual lifespan are not invented. |
| Other numeric outputs | Require macro percentages to sum to 100; normalize rounded pace seconds; reconcile the illustrative TDEE breakdown; retain sub-five-foot formula slopes; reject non-image converter inputs and bound PDF page ranges. |
| Contact | Reject malformed input, escape message markup and report missing/failed delivery truthfully instead of returning fake success. No real email was sent during validation. |
| Dependencies | Updated vulnerable compatible dependencies, including Next.js 16.4.2, and upgraded Nodemailer to its patched release. Final npm advisory report contains zero known vulnerabilities. This is a point-in-time advisory scan, not proof of absence of vulnerabilities. |

Primary references consulted for scope include [EPFO contribution rates](https://www.epfindia.gov.in/site_docs/PDFs/MiscPDFs/ContributionRate.pdf), [India Post savings schemes](https://www.indiapost.gov.in/banking-services/savings), the [National Academies discussion of military circumference models](https://www.ncbi.nlm.nih.gov/books/NBK235939/) and [NIDDK's weight-planning guidance](https://www.niddk.nih.gov/bwp). Versioned income-tax, IRS and VA sources remain linked from the relevant calculators. A source reference does not expand the tested population or product scope.

## Release verification

- `npm test`: 478 checks passed, plus SEO registry checks; no skipped test cases in the calculator suite.
- `npm run lint`: passed with no warnings.
- `npm run build`: **default Turbopack production build passed** on Next.js 16.4.2, including TypeScript and 457 generated static pages. This supersedes the earlier Webpack-only environmental limitation.
- [Final HTTP crawl](http-checks.json): 240/240 indexed pages return 200, expected canonicals and one H1, parseable structured data, no duplicate titles/descriptions/canonicals, no broken referenced scripts, two working fonts, 23 RSS entries, correct embed framing/noindex and a real 404 for an unknown tool.
- [Dependency audit](dependency-audit.json): zero reported advisories at verification time. Automatic approval review initially blocked the scan; after inspection established that all dependency entries came from the public npm registry, the scan was approved and completed. No approval remains pending.
- Browser: corrected body-fat reference vector displayed **15.5%** for male, 80 kg, height 177.8 cm, waist 86.36 cm and neck 40.64 cm; minification preserved a URL containing `//` and double spaces inside a quoted string; real PNG resize export preserved expected dimensions and sample colours.
- [Image export check](image-export-check.json): a synthetic red/blue 120×80 image exported at 60×40, with independent Pillow checks confirming the red/blue interior samples. This is one image path, not exhaustive media coverage.

The browser's native date/time automation did not reliably commit edits to the timezone form, so a browser DST-warning result is **not claimed**. The pure production timezone resolver passes explicit gap/repeat and offset fixtures. Selected browser checks showed no console errors; no claim is made that every tool was interactively exercised in every browser.

Initial Standard Calculator script gzip bytes in the current Turbopack build are 323,354 versus the original audit's 952,795 (66.1% lower). Different bundlers and dependency versions affect this comparison. It is not a Lighthouse or Core Web Vitals score.

## What remains outside this validation

Image/media checks vary from actual exported pixels to configuration, geometry and unsupported-type rejection; the register marks the partial cases. AI background-removal quality, every canvas renderer, all file encodings, large/corrupt/adversarial files, accessibility across all routes and all browser engines have not been exhaustively validated.

Financial tools remain estimates under their displayed tax-year/product/rate/timing assumptions. Official benefit eligibility, institution-specific academic regulations, medical outcomes, market prices, astronomical ephemerides and future investment returns cannot be certified by passing these tests. Input fixtures and bounded property sweeps do not prove numerical accuracy over arbitrary magnitudes or every unsupported input.

The release is pushed as a reviewable GitHub branch. Production deployment and post-deployment field checks are separate. The existing middleware filename deprecation remains a maintenance warning; it did not fail the build or the crawl.

Run again with:

```sh
npm ci
npm test
npm run lint
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
python scripts/verify-local-site.py --out docs/tool-validation-2026-10-17
```

[Corrected body-fat calculator screenshot](body-fat-browser.png)

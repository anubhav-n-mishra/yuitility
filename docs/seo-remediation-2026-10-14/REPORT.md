# Yuitility SEO and product remediation

**Verified:** 14 October 2026. **State:** implemented in the local working tree; not deployed or committed. The original [audit and evidence](../seo-audit-2026-10-13/REPORT.md) remain intact.

## Assessment

The most serious defects were product credibility problems: incorrect financial models, unsupported institutional claims, fabricated EXIF output and XOR encryption described as AES. These have been replaced with working, explicitly scoped implementations. Crawlability, content consistency, embeds and shared usability have also been repaired.

This closes the identified implementation defects within the documented scope. It does not certify every formula in all 167 tools, establish university acceptance, measure ranking gains, or prove sitewide WCAG compliance. Production still serves the previous release until these changes are deployed.

## Original findings and resolution

| Audit | Implementation and practical limit |
|---|---|
| 01 — Salary tax | Shared, versioned India FY 2025–26 / AY 2026–27 salary-only model: ₹75,000 deduction, new-regime slabs, resident rebate and marginal relief, cess and separate payroll deductions. Bonus remains taxable; monthly regular pay excludes separately paid bonus. Gross above ₹50 lakh is rejected because surcharge is not modeled. |
| 02 — Mortgage presets | Actual program selection and preset propagation. VA funding fee, exemption and no PMI; Canadian nominal semiannual compounding; quoted-premium inputs for FHA/Canada; zero-interest support and repayment CSV. Eligibility, lender quotes and stress tests are not invented. |
| 03 — Income tax | Replaced generic percentage calculation with the same tested salary-tax engine and a visible slab breakdown. Currency switching cannot masquerade as jurisdiction switching. |
| 04 — Retirement | Separate inflation-adjusted target, 401(k), Roth IRA and FIRE modes. Matching and salary growth modeled; 2026 contribution limits and catch-ups corrected and held flat in future projections. Zero/negative real returns handled. FIRE shows only spending and withdrawal rate. Eligibility and investment outcomes are not promised. |
| 05 — Academic conversion | One formula source, consistent Mumbai example, real 4-point linear option and editable custom scale. Unsupported pass/class/distinction labels removed. Named presets are formula scenarios; course/cohort applicability is unverified. |
| 06 — Authority | Removed blanket “official,” verified and institutional-acceptance language and unsupported circular references. Removed irrelevant root-domain citations; retained precise sources where supported. About identifies the existing maintainer, without fabricating specialist reviewers. |
| 07 — Privacy | Local-file claims now distinguish AI/contact server processing and hosting activity. Chat discloses transmission before sending. Provider keys remain in memory; legacy local-storage key handling removed. Policy, footer, homepage and README aligned. |
| 08 — Embeds | Dedicated preset embed routes preserve configuration and full-view links. Embed-only framing permission; ordinary pages retain same-origin protection. Cross-origin VA iframe tested. |
| 09 — Journal | Rewrote all 23 articles with useful workflows, examples, limitations and relevant references. Read times derive from article length. No minimum-word-count or ranking claim. |
| 10 — JavaScript | Tool implementations load through dynamic component boundaries while explanatory content remains server rendered. Standard Calculator initially referenced gzip script bytes fell from 952,795 to 296,535 (68.9%). |
| 11 — Fonts | Asset paths bypass lowercasing; duplicate font declarations removed in favor of the existing local-font loader. Both CSS-referenced font files return 200. |
| 12 — RSS | XML escaping repaired, including channel fields. Generated feed parses with 23 items. |
| 13 — Robots | Embeds remain out of the sitemap and declare noindex; robots no longer prevents crawlers reading that directive. |
| 14 — Capability copy | Removed generic fallback FAQs and fake fallback-tool behavior; corrected format-conversion, PDF optimization, hashing and other affected descriptions. Metadata and explanatory copy match the rewritten tools' scope. |
| 15 — Longevity | Replaced unsupported actuarial/death prediction with a user-chosen planning-age time horizon. No claim to predict life expectancy. |
| 16 — Structured data/freshness | Removed unsupported tool freshness dates, blanket sitemap baseline dates and unverified organization founding date. Preserved actual article dates; regenerated machine-readable tool directories from the live registry. |
| 17 — Linking | Added contextual related links and category placement for the 35 missing curated entries. Registry checks cover all 167 tools, 36 presets and their destinations. Footer exposes the site directory. |
| 18 — UX | One storage notice; assistant avoids notice overlap and embeds. Labels added across hundreds of controls; unreadable light-theme inputs repaired. Native modal dialogs provide focus containment, Escape and focus return. Search URL hydration, clearing, empty state, theme hydration, mobile controls and truthful local-rating copy repaired. |

## Additional defects fixed

- **Encryption:** replaced XOR with Web Crypto AES-256-GCM and PBKDF2-SHA256 (600,000 iterations, random salt and IV). Versioned output authenticates content and rejects incorrect keys/tampering. Legacy XOR output is intentionally incompatible and identified as such in the UI.
- **EXIF:** replaced invented camera/location values with a bounded JPEG APP1/TIFF parser. Unsupported or absent metadata is reported honestly. This is not an EXIF remover or a universal image-format parser.
- **CSV:** validates arrays of objects, combines headers, quotes headers/values, serializes nested JSON and neutralizes spreadsheet formula prefixes in strings.
- **File hashes/password feedback:** SHA-256 algorithm and size limit are explicit, file-selection races handled, stale results cleared, and heuristic password feedback no longer claims certification or breach checking.
- **AI route:** provider allowlist, request limits, timeout and redirect restrictions; truthful errors when credentials/provider responses are unavailable. Local directory fallback is identified as a fallback, not an AI-generated answer.
- **UI honesty:** removed notification settings with no delivery behavior, unsupported response-time promises and universal offline availability claims.

## Verification

| Check | Result |
|---|---|
| `npm test` | Passed: 13 IndexNow checks, 12 calculator/security/content test cases, and SEO audit. |
| Lint | Passed: 291 files, no warnings. |
| `npm run build -- --webpack` | Passed compilation, TypeScript and generation of 457 static pages. |
| Production-preview HTTP crawl | 240/240 sitemap pages return 200; expected canonical, title, description, one H1 and parseable JSON-LD on every page; no duplicate titles/descriptions/canonicals. |
| Referenced scripts | 27 unique initial script assets across the crawl; all return 200. |
| Feed/fonts/404 | RSS has 23 parseable items; both referenced font assets load; nonexistent tool returns 404. |
| Embed policy | Base and preset embed routes return 200 with noindex and framing permission, without SAMEORIGIN. VA preset also rendered from a separate localhost port. |
| Browser | Search query hydration and clear/no-results flow; modal Escape/focus return; VA fee/exemption; 401(k)/Roth caps; FIRE inputs; Mumbai conversion; Unicode encrypt/decrypt; settings; light/dark themes; 390px mobile and 1280px desktop salary layout. No console warnings/errors in the final fresh verification tab. |

Selected numerical browser checks:

- ₹10 lakh CTC, ₹1 lakh included bonus, capped EPF and ₹2,500 professional tax: ₹71,192 regular monthly take-home (rounded), ₹9,54,300 annual net, ₹0 income tax.
- $400,000 VA purchase, zero down, first use: $8,600 funded fee and $408,600 principal. Exemption removes the fee; no PMI.
- Age 59 to 61, zero return, $45,000 starting 401(k), $60,000 requested annual contribution, $100,000 salary and 50% match up to 6%: $71,500 employee plus $6,000 employer contributions, $122,500 ending balance. Corresponding Roth scenario: $17,200 contributions, $62,200 balance.
- FIRE at $4,000 monthly spending and 4% withdrawal assumption: $1,200,000 target; only two numeric inputs.
- Mumbai scenario at CGPA 6: 54.60%, with matching explanatory formula and applicability caveat.

Evidence: [HTTP summary](http-checks.json), [page-level crawl](pages.json), [cross-origin fixture](embed-test.html), [desktop screenshot](salary-desktop.png), [mobile screenshot](salary-mobile.png). Repeat crawl with `python scripts/verify-local-site.py` after starting a production build on port 3100. The script uses the preserved original audit parser.

[Updated salary calculator, desktop light theme](salary-desktop.png)

## Release limits and remaining external checks

The successful build used Webpack. The default Turbopack build encountered a process/sandbox failure in this environment and is not recorded as passing. Next.js still reports the existing deprecated middleware-file convention; migration is maintenance work, not a crawl failure observed here.

The 68.9% script reduction compares cold gzip response bodies of initially referenced scripts. It excludes later lazy-loaded resources and is not a Core Web Vitals or Lighthouse result. No fresh production Lighthouse, field-data, GSC, ranking or backlink assessment is claimed.

Deploy this release before rechecking production headers, canonical redirects, fonts, indexing and real-user performance. Confirm production AI/contact configuration and provider handling separately; no real customer messages or credentials were sent during testing. Financial models retain stated tax-year/product boundaries; university formulas need the user's applicable regulation before official use. Broader mathematical and specialist review of the remaining catalog remains separate from this remediation.

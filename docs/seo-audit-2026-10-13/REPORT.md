# Yuitility: deep SEO audit

**Audit date:** 13 October 2026, Asia/Kolkata  
**Production:** https://www.yuitility.app  
**Repository:** `F:\yutiliti-master`, commit `c8390f6c3f004454cea0ca766da294807a31eb59`  
**Scope:** production HTTP crawl, browser interaction, mobile and desktop Lighthouse, source review, content inventory, official-source fact checks, and a focused competitor comparison. Report only; application code and production settings were not changed.

## Verdict

**The site is easy to crawl and too easy to distrust.** It has a competent technical foundation, but several search landing pages promise calculations that their software does not perform. Some publish demonstrably wrong financial information under “official” and “verified” labels. Fixing that is considerably more important than publishing another preset, adding schema, or shaving five characters off a title.

The strongest asset is useful browser-based tooling with an understandable privacy benefit. The weakest asset is the editorial process surrounding it: reusable copy, generic calculators relabeled for regulated products, citations that lead to institution homepages, and automated checks that can pass while the product gives a wrong answer.

**I would pause expansion of financial, academic, and health landing pages until their claims and outputs have been audited.** This is a recommendation about readiness and user trust, not a claim that Google has penalized the site. No current Search Console account, manual-action report, traffic export, backlink dataset, or ranking tracker was available for this audit.

## What was actually checked

| Coverage | Result |
|---|---|
| Production sitemap | All **240 URLs** fetched: 167 tool pages, 36 presets, 23 articles, 8 categories, 6 other pages |
| Sitemap responses | **240/240 HTTP 200**; no redirects within the sitemap |
| Metadata and headings | No missing or duplicate titles/descriptions; one H1 per page; canonical present on every page; no accidental `noindex` |
| Additional URLs | **176 requests**: discovered internal destinations, robots, RSS, manifest, and two intentionally nonexistent routes; 174 returned 200, both nonexistent routes correctly returned 404 |
| Assets in first-pass HTML | **207 unique script/image/social-image URLs**, all returned 200; subsequent CSS/font investigation found two broken font destinations |
| Structured data | JSON parsed on all sitemap pages; schema semantics and selected Google eligibility requirements reviewed separately |
| Browser | Homepage, search query behavior, Mumbai university preset, VA mortgage preset, salary preset, JSON formatter; portrait layout checked at actual reported width 390px |
| Functional examples | Mumbai CGPA=6; default VA mortgage; ₹10 lakh salary preset; synthetic JSON formatted successfully |
| Performance | Fresh PageSpeed Insights runs for homepage and Standard Calculator; mobile and calculator desktop results recorded below |
| Source checks | `npm run seo:audit` passed; separate `comprehensive-seo-review.mjs` reported 16/18 passes, 2 failures |
| Content inventory | All 23 article bodies and all 36 preset definitions counted; deep-content and FAQ coverage measured |

The HTML crawler does not execute JavaScript. The browser sample does. This was not a functional test of all 167 tools, a formal accessibility audit, or an exhaustive check of every outbound destination. A 200 response proves delivery, not indexing, usefulness, or mathematical correctness.

The root canonical omits the final `/`; the crawl summary records the string difference. **That is not a substantive canonical defect.** Existing robots/canonical choices also cannot tell us which canonical Google has actually selected.

## Findings, ranked by repair priority

Severity here means consequence and urgency: **Critical** = materially misleading core output; **High** = major trust, intent, or distribution failure; **Medium** = concrete technical/content weakness; **Low** = cleanup. It is not a prediction of ranking loss.

| ID | Severity | Finding | Evidence |
|---|---|---|---|
| 01 | Critical | India salary calculator uses outdated rules under a newer tax-year label | Live browser + code + Income Tax Department |
| 02 | Critical | VA/FHA/Canadian mortgage presets share an unsuitable generic engine | Live VA output + code + VA source |
| 03 | Critical | Income Tax Calculator has no identified tax system and internally inconsistent brackets | Live HTML + code arithmetic |
| 04 | High | 401(k), Roth IRA, and FIRE promises do not match the retirement engine | Live HTML + code + IRS |
| 05 | High | University results contradict the page's own rules | Browser reproduction + code |
| 06 | High | “Official” citations and blanket acceptance claims manufacture an appearance of verification | Production text + preset definitions |
| 07 | High | Privacy positioning omits the server-backed assistant | Production claims + client/server code |
| 08 | High | Public embed distribution is blocked by response headers | Live headers + config + published snippets |
| 09 | High | Articles provide little depth and misrepresent reading time | Complete source inventory + rendered articles |
| 10 | Medium | Tool routes load a large shared JavaScript bundle | Live resource sizes + Lighthouse + static imports |
| 11 | Medium | Path normalization breaks both custom font URLs | Live redirects/404s + middleware |
| 12 | Medium | RSS is not valid XML | Downloaded feed + XML parser + route source |
| 13 | Medium | Embed crawl blocking prevents reliable discovery of `noindex` | Live robots + embed metadata |
| 14 | Medium | Product copy and generic content promise unsupported capabilities | Rendered tools + implementations |
| 15 | Medium | Health “actuarial” claim lacks an identifiable model | Rendered text + computation source |
| 16 | Medium | Dates, search schema, and rich-result assumptions need correction | Live JSON-LD + browser + current Google docs |
| 17 | Medium | Internal links exist, but contextual curation trails expansion | Registry + legacy checker + crawl graph |
| 18 | Low/Medium | Duplicate overlays, accessibility issues, and local-only feedback weaken UX | Browser + Lighthouse + code |

### 01 — India salary: wrong tax-year behavior

**Live reproduction:** open [₹10 LPA preset](https://www.yuitility.app/tools/salary-calculator/10-lakhs-ctc). With its default ₹10,00,000 CTC, ₹1,00,000 bonus, 50% basic salary and capped EPF, the UI reports **₹2,421 monthly income tax** and **₹68,771 monthly take-home**. It labels the notes **FY 2025–26** and says the rebate threshold is ₹7 lakh.

The implementation uses the older ₹3L/₹7L/₹10L/₹12L/₹15L slab boundaries. Official AY 2026–27 guidance instead lists new-regime boundaries starting at ₹4 lakh and a rebate for eligible resident individuals up to ₹12 lakh of total income. For an eligible resident with only ordinary salary income at this example's level, the positive tax estimate is inconsistent with that guidance. This is a product-verification example, not a personalized tax calculation. [Income Tax Department guidance](https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1)

**Code:** [SalaryCalculator.tsx:46](F:/yutiliti-master/src/components/tools/SalaryCalculator.tsx:46). The taxable-base calculation also subtracts the annual bonus, employee PF and professional tax while labeling the result a new-regime calculation. Those assumptions require correction and explicit treatment, not merely a refreshed year label. The base India salary route defaults to USD, which makes its jurisdiction even less clear. The deep-content worked example repeats outdated tax arithmetic.

**Fix:** use a versioned Indian payroll/tax engine with explicit FY/AY, residence/eligibility assumptions, a truthful bonus treatment, and payroll-vs-tax deductions separated. Add authoritative test cases and boundary tests, then update the base page, all three salary presets, their FAQs and worked examples together. Estimated effort: **2–4 days plus qualified review**. Do not update the prose alone.

### 02 — Mortgage presets advertise different products but run the same formula

**Live reproduction:** [VA preset](https://www.yuitility.app/tools/mortgage-calculator/va-loan), unchanged defaults: $400,000 home, 0% down, 6.35%, 30 years. The page explicitly says no PMI, yet the result includes **“PMI (<20% Down) $250”** and a **$3,197** monthly total. The VA confirms its purchase loans do not require PMI or MIP. [VA purchase-loan guidance](https://www.va.gov/housing-assistance/home-loans/loan-types/purchase-loan/)

**Root cause:** [MortgageCalculator.tsx:83](F:/yutiliti-master/src/components/tools/MortgageCalculator.tsx:83) charges a hardcoded annual 0.75% PMI whenever down payment is below 20%. It receives no loan-program parameter. Consequently:

- VA applies conventional-style PMI and does not implement the funding-fee logic promised by its title.
- FHA changes default inputs but has no FHA upfront/annual MIP engine.
- Canada promises CMHC tiers and a qualifying stress test but uses the same PMI calculation. Its own FAQ describes capitalizing a 3.10% premium at 10% down, which this code does not do.
- UK also inherits the US-style PMI behavior and generic tax/insurance defaults.

**Fix:** implement and test program/jurisdiction-specific engines, or narrow/remove the unsupported promises and consolidate the pages into the honest generic tool. Preserve useful content and inspect GSC before deciding redirects or indexation changes. Estimated effort: **3–7 days** for properly scoped specialized models. The exact work depends on which products you choose to support.

### 03 — The income-tax page is not a defensible tax calculator

[Live page](https://www.yuitility.app/tools/income-tax-calculator) promises slab-by-slab working but offers neither a country/year/regime selection nor a visible slab breakdown. Changing currency only changes formatting. Defaults produce **$9,600 tax on $73,000 taxable income**, with no named tax system supporting that result.

[IncomeTaxCalculator.tsx:17](F:/yutiliti-master/src/components/tools/IncomeTaxCalculator.tsx:17) calls the brackets “simplified” in a source comment. Even as an illustrative progressive system, it is inconsistent: at exactly 50,000 taxable income the formula gives 3,000; at 50,001 it gives 5,000.20. A one-unit income increase causes a 2,000.20 tax jump because the next bracket starts with the wrong cumulative base.

**Fix:** replace this with a named, dated, tested jurisdictional calculation; alternatively label it an educational fictional-bracket simulator and remove real income-tax claims. Estimated effort: **2–4 days**, depending on scope. Currency is not a tax jurisdiction.

### 04 — Retirement presets overpromise, and the 2026 limits are wrong

[401(k) preset](https://www.yuitility.app/tools/retirement-calculator/401k-growth) promises employer matching, salary raises and contribution limits. The shared [RetirementCalculator.tsx:72](F:/yutiliti-master/src/components/tools/RetirementCalculator.tsx:72) instead derives a required savings amount from expenses, age, return and inflation. It has no employee contribution, salary, match schedule or annual-limit model.

The [Roth IRA preset](https://www.yuitility.app/tools/retirement-calculator/roth-ira) likewise does not model a specified annual contribution stream or eligibility. The FIRE preset advertises expenses ×25, but calls the same finite-annuity corpus calculation. Different defaults do not implement these different financial products.

Published 2026 limits are also incorrect: the site says **$23,500** for 401(k), **$7,500** for the general age-50 catch-up, and **$7,000** for IRA. The IRS announcement gives **$24,500**, **$8,000**, and **$7,500**, respectively, for 2026; special age-based rules require their own treatment. [IRS 2026 limits](https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500)

**Code/content:** [toolPresets.ts:808](F:/yutiliti-master/src/lib/toolPresets.ts:808). **Fix:** correct sourced limits immediately, then implement genuine product-specific inputs/calculations or consolidate into an explicitly generic retirement estimator. **1–2 hours for the factual copy correction; several days for functional parity.**

### 05 — University presets contradict their own explanatory text

At [Mumbai preset](https://www.yuitility.app/tools/cgpa-to-percentage-calculator/mumbai-university), enter CGPA **6**. The result is **54.60%**, from `7.1 × 6 + 12`. The same page's FAQ says values below 7 should use `7.4 × CGPA + 12`, which would give **56.40%**. This proves an internal contradiction; it does not independently establish which rule applies to every Mumbai course or cohort.

There is another internal mismatch: the VTU FAQ says 7.75 CGPA/70% can be First Class with Distinction, whereas the shared classifier only awards its distinction label at **75%**. Anna's FAQ specifies 8.5 CGPA and academic-history conditions, while the shared classifier also uses the generic 75% cutoff. [CgpaToPercentage.tsx:67](F:/yutiliti-master/src/components/tools/CgpaToPercentage.tsx:67), [classification:159](F:/yutiliti-master/src/components/tools/CgpaToPercentage.tsx:159)

**Fix:** identify exact university, program, regulation and cohort; retrieve the actual applicable circular; encode its formula and classification conditions in one source shared by UI and explanatory copy. Remove generic pass/distinction decisions where the inputs cannot establish eligibility. **2–4 days plus source verification.**

### 06 — Authority language is doing work that evidence should do

Of 24 presets with an `officialReference`, **18 link only to the authority's domain root**. Several university circular identifiers disagree between the badge, reference panel and shared calculator. A link to `irs.gov` or `mu.ac.in` does not substantiate a particular limit or formula.

The shared preset template asserts that every referenced calculator applies the authority's exact formula and that results are accepted for job applications, university admissions and statutory reporting. It displays that language even on a VA mortgage page. [PresetToolClient.tsx:418](F:/yutiliti-master/src/app/tools/[slug]/[preset]/PresetToolClient.tsx:418)

This is not credible expertise. It is a reusable claim of expertise, and several adjacent calculations disprove it. All 23 articles use a team byline; the sampled About page does not establish a named finance/health reviewer or explain verification responsibility. A team byline is valid, but it does not supply missing subject expertise.

**Fix:** replace root links with exact source documents and effective dates; distinguish assumed rates from observed rates; replace blanket acceptance language with accurate scope and limits. Publish real author/reviewer identities only where those people actually did the work. **Half a day for template cleanup; ongoing review per subject.**

### 07 — The privacy promise is broader than the implementation

The homepage, footer, privacy policy and assistant positioning repeatedly imply all processing is local. The assistant client [posts messages to `/api/ai`](F:/yutiliti-master/src/components/AiChatbot.tsx:113); the [server route:23](F:/yutiliti-master/src/app/api/ai/route.ts:23) can forward those messages to NVIDIA or a configured provider. Even without a provider key, the request reaches Yuitility's server. This observation does **not** show that ordinary calculator inputs or uploaded files are secretly transmitted.

The privacy page describes an architecture without backend processing but does not explain this assistant exception. This damages the site's main differentiator and users' ability to understand it.

**Fix:** precisely scope the local-processing claim to the actual local tools; disclose chat transmission and configured providers before use; align the privacy policy and assistant text. Confirm production data handling separately. **Half a day to a day**, without changing tool processing.

### 08 — Cross-site embeds are blocked

The site promotes embedding nearly every tool and offers backlink-bearing snippets. Production `/embed/standard-calculator` returns **`X-Frame-Options: SAMEORIGIN`**, applied globally by [next.config.ts:38](F:/yutiliti-master/next.config.ts:38). An iframe on another origin cannot display that document under this policy. CORS headers do not override frame restrictions.

Preset snippets introduce another problem: a Mumbai or VA preset embeds `/embed/{base-tool-id}` with no preset parameters. Even if the frame policy is corrected, the advertised specialized widget opens the base calculator's defaults. [PresetToolClient.tsx:64](F:/yutiliti-master/src/app/tools/[slug]/[preset]/PresetToolClient.tsx:64)

**Fix:** define an intentional framing policy for embed routes while preserving protection on normal pages; make presets preserve their configuration; test from a different origin. **Half a day.** This repairs a broken distribution channel; it does not guarantee backlinks or ranking gains.

### 09 — The journal looks much deeper than it is

All **23 article bodies contain 78–289 whitespace-delimited source words**, with a median of **133**. They are advertised as **4–6 minute reads**. None contains an external citation link in its article source. Navigation and footer text inflate whole-page word counts, which is why counting the full HTML body would conceal the problem.

Examples: the image-format article contains 78 words and says 5 minutes; the privacy article contains 106 words and says 6 minutes. The live [image article](https://www.yuitility.app/blog/optimizing-web-images-webp-avif-jpg-conversion) introduces AVIF and broad size-saving claims without a measured comparison or a usable end-to-end workflow.

There is no minimum Google word-count requirement. The failure is **unfulfilled intent**, not being below an arbitrary 300-word threshold. A short answer can be excellent; these articles are usually introductions marketed as guides.

**Fix:** choose a small set of useful guides and supply actual examples, screenshots/results, limitations and primary references. Calculate read time from content. Merge weak articles into relevant tool pages when they add no distinct value, preserving redirects where appropriate after checking GSC. **Half a day to a day per substantial guide.** [blogs.ts:13](F:/yutiliti-master/src/lib/blogs.ts:13)

### 10 — Simple tools inherit expensive JavaScript

The public HTML for both Standard Calculator and Word Counter references **20 script URLs**, totaling **952,795 gzip response-body bytes** in this audit's resource fetches. A single common chunk is **648,170 bytes**. This is a cold-fetch sum of referenced scripts, not a full browser network trace and not including every runtime-loaded resource.

[ToolPageClient.tsx:18](F:/yutiliti-master/src/components/ToolPageClient.tsx:18) statically imports the entire tool catalog, including PDF, media and other expensive implementations. That provides a direct explanation for basic tools carrying unrelated code. Lighthouse independently flags **450 KiB of unused JavaScript**, including about **396.5 KiB** estimated unused in the largest shared chunk.

**Fix:** split tool implementations at the route/component boundary; preserve server-rendered explanatory content; defer large libraries until the corresponding operation needs them. Verify with a production bundle and cold mobile run, not development-server timing. **1–2 days.**

| Fresh lab run | Performance | Accessibility | Best practices | Basic SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Homepage, mobile | 100 | 97 | 96 | 100 | 1.0s | 1.8s | 20ms | 0.001 |
| Standard Calculator, mobile | 87 | 91 | 96 | 100 | 1.0s | 2.7s | 360ms | 0.001 |
| Standard Calculator, desktop | 81 | 91 | 96 | 100 | 0.3s | 0.4s | 410ms | 0.001 |

Runs were captured around **07:19–07:20 IST on 13 October**, Lighthouse 13.5.0; mobile used emulated Moto G Power and Slow 4G. These are single lab observations. PSI reported **“No Data”** for field experience. TBT is not INP; this audit cannot declare a sitewide Core Web Vitals pass/fail.

[Homepage report](https://pagespeed.web.dev/analysis/https-www-yuitility-app/qp1svw4bau?form_factor=mobile) · [Calculator mobile report](https://pagespeed.web.dev/analysis/https-www-yuitility-app-tools-standard-calculator/06q61a9w8y?form_factor=mobile) · [Calculator desktop report](https://pagespeed.web.dev/analysis/https-www-yuitility-app-tools-standard-calculator/06q61a9w8y?form_factor=desktop)

### 11 — SEO URL normalization breaks fonts

Production `/fonts/Inter-Medium.woff` redirects 301 to `/fonts/inter-medium.woff`, which returns 404. `/fonts/SpaceGrotesk-Bold.woff` likewise ends at a lowercase 404. Lighthouse explicitly logs the Inter failure.

[middleware.ts:27](F:/yutiliti-master/src/middleware.ts:27) lowercases matching paths. Its asset exclusion list omits font extensions. [globals.css:3](F:/yutiliti-master/src/app/globals.css:3) requests mixed-case filenames, while `next/font/local` also introduces separate font declarations. Do not assume the duplicate font systems guarantee the intended font is used.

**Fix:** exclude all relevant static font assets from page normalization, or consistently rename the actual files and references; simplify to one font-loading strategy. Verify no font redirects/404s and check computed fonts. **1–2 hours.**

### 12 — RSS returns 200 but cannot be parsed

The downloaded [RSS feed](https://www.yuitility.app/rss.xml) fails Python's XML parser at **line 6, column 74**. Channel description interpolates `SITE_DESCRIPTION` without XML escaping; the literal `&` in “calculators & code” makes the document invalid. Item descriptions are escaped, which makes this easy to overlook. [rss.xml/route.ts:22](F:/yutiliti-master/src/app/rss.xml/route.ts:22)

**Fix:** escape every interpolated XML text value or use an XML serializer, then parse the generated feed in a meaningful regression check. **Under an hour.** This affects syndication and feed consumers, not ordinary page indexability.

### 13 — Embed robots directives work against each other

Production robots disallows `/embed/`, while embed HTML declares `noindex, follow`. A crawler blocked from the URL cannot reliably read that `noindex`; a disallow alone is not an indexing-removal directive. [robots.ts:14](F:/yutiliti-master/src/app/robots.ts:14), [embed metadata:34](F:/yutiliti-master/src/app/embed/[slug]/page.tsx:34). [Google technical requirements](https://developers.google.com/search/docs/essentials/technical)

**Fix:** if exclusion from search is the requirement, permit crawling so the `noindex` can be seen, while keeping embeds out of sitemaps. Confirm with URL Inspection. **Under an hour plus recrawl time.** No evidence here establishes that embeds are currently indexed.

### 14 — Repeated copy is inaccurate in ways that hurt search intent

- Image Format Converter's title and instructions advertise GIF output. Its export selector implements only WebP, PNG and JPEG. GIF input support does not establish GIF output support. [FormatConverter.tsx:195](F:/yutiliti-master/src/components/tools/FormatConverter.tsx:195)
- PDF Compressor's instructions tell users to select compression preset levels; the UI has one optimization action. The code removes metadata and saves with object streams; it does not implement adjustable image recompression. It does candidly warn that image-heavy PDFs may not shrink much. [PdfCompressor.tsx:52](F:/yutiliti-master/src/components/tools/PdfCompressor.tsx:52)
- **97/167 tools** use category-level fallback FAQs. Some claim direct numeric entry, clipboard exports or compiler error handling that must be checked against each actual component.
- Only **31/167 tools** have the dedicated deep-content module. This is coverage, not a judgment that the other 136 must acquire padding.
- The JSON page repeats essentially the same DevTools privacy-verification instructions twice. Its functional formatter did successfully prettify the synthetic JSON used in this audit.

**Fix:** make a capability-to-copy checklist for each prioritized tool. Delete unsupported claims and redundant sections; write tool-specific examples where they help the task. **1–3 hours per priority tool**, beyond any missing implementation.

### 15 — “Actuarial” longevity claims exceed the visible model

The [longevity page](https://www.yuitility.app/tools/death-calculator) says its estimate is based on actuarial/public-health data. The implementation starts at 76/81 by sex, applies fixed lifestyle additions/subtractions, and forces the predicted age to at least current age +1. No named dataset, population, year, age-conditional survival table or validation is present in the inspected implementation. [DeathCalculator.tsx:19](F:/yutiliti-master/src/components/tools/DeathCalculator.tsx:19)

The page **does** include “not a medical prediction” and other limitations, which is good. Those disclaimers do not substantiate the underlying actuarial claim.

**Fix:** present it honestly as an illustrative quiz, or implement a documented and reviewed population model with appropriately limited interpretation. **Copy: 1–2 hours; defensible model: substantial subject-specific work.**

### 16 — Schema and freshness are over-engineered and under-verified

The crawl found **203 SoftwareApplication**, **203 WebPage**, **106 FAQPage**, and **23 BlogPosting** entities. There were no JSON parse errors or fabricated aggregate ratings in the inspected production graphs. That is a real improvement over the historical issues described in the repository.

Remaining issues:

- Every tool/preset claims publication on **1 January 2024** and modification on **1 September 2026**. The sitemap gives most pages **6 September 2026**. These are hardcoded template dates, not demonstrated per-page histories. Use real material-update dates or omit unsupported values. [tool page:191](F:/yutiliti-master/src/app/tools/[slug]/page.tsx:191), [sitemap.ts:22](F:/yutiliti-master/src/app/sitemap.ts:22). [Google guidance on `lastmod`](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping)
- Sitewide SearchAction advertises `/?q=...`; browser navigation to `/?q=json` leaves the search input empty and displays the unfiltered catalog. Implement that behavior or remove the unsupported action. [layout.tsx:163](F:/yutiliti-master/src/app/layout.tsx:163)
- Do not budget work on FAQ markup to earn Google FAQ rich results. Google's current changelog says that feature stopped appearing **7 May 2026**; the sitelinks search box was retired earlier. Useful visible FAQs can remain. The same changelog clarifies that `llms.txt` is not needed for Google Search and does not improve its visibility/rankings. [Google documentation updates](https://developers.google.com/search/updates)
- SoftwareApplication JSON-LD without a genuine rating/review does not meet Google's documented app-rich-result requirements. That is an eligibility limitation, not a reason to invent ratings or remove otherwise useful semantic data. [Google software app requirements](https://developers.google.com/search/docs/appearance/structured-data/software-app)

**Fix:** clean unsupported statements and dates, distinguish syntax from eligibility, and validate representative templates using Google's tools. **Half a day.** A formal Rich Results Test was not run in this audit.

### 17 — Discoverability is good; editorial linking is weaker

All tool/preset/article/category sitemap URLs have incoming links within the crawled graph. Homepage pagination is client-side, but a crawlable `/tools` directory and category hubs expose the catalog. Do not misdiagnose that as all later-page tools being orphaned.

The legacy checker identifies **35 tools without curated related-tool entries or named subcluster placement**. The current runtime supplies category fallback links, so these are **not 35 linkless or orphaned pages**. They are 35 places where contextual relevance was not deliberately maintained. The JSON Formatter's sampled related list includes Password Generator and QR Code Generator while a JSON-to-CSV tool exists.

The HTML `/sitemap` page itself has no incoming link found in the sitemap-page graph. It is still present in XML and directly accessible; severity is low. A link in a footer would make the HTML directory discoverable to actual users.

**Fix:** curate useful next-step links for priority workflows and put added tools into meaningful hub groups. **Half a day to a day.** There is no magic ranking threshold of three related links.

### 18 — Small UX issues reinforce the quality gap

The first homepage accessibility snapshot contained **two cookie banners**, matching one mount in [layout.tsx:205](F:/yutiliti-master/src/app/layout.tsx:205) and another in [page.tsx:852](F:/yutiliti-master/src/app/page.tsx:852). They overlap; a screenshot also showed the assistant control overlapping the acceptance area. Later snapshots varied with banner state, so this is a first-visit duplication finding, not a claim that two banners are permanently visible.

Lighthouse flags contrast on both tested pages and an unlabeled form element on the calculator. The manually checked 390px pages did not show document-level horizontal overflow. That limited pass does not certify every control or route.

The star widgets say feedback helps improve accuracy, but the inspected handlers only save the choice in the visitor's localStorage. There is no feedback submission in those handlers. Keep that local-only choice if intended, but describe it truthfully or build a disclosed feedback mechanism. Do not repurpose local ratings as aggregate review schema. [ToolPageClient.tsx:659](F:/yutiliti-master/src/components/ToolPageClient.tsx:659)

**Fix:** mount one banner, resolve floating-control collisions, fix actual failing labels/contrast, and make rating copy honest. **Half a day.** These are usability/accessibility and trust findings, not individually proven ranking penalties.

## Search strategy and competitor reality

The proposition spans finance, healthcare, education, PDFs, images, code and everyday calculations. That breadth increases the amount of correctness and maintenance you must demonstrate. The current evidence supports concentrating on a few reliable workflows before expanding.

This comparison is based on current public product pages, **not measured rankings, search volumes, domain authority, backlink counts or conversion data**:

| Dimension | Yuitility | Reference competitor | Implication |
|---|---|---|---|
| Mortgage intent | Generic engine reused for programs it does not implement | Calculator.net explicitly scopes its mortgage calculator mainly to US users and provides extra-payment/cost-increase options | Win with an honest, tested niche rather than relabeling an engine. [Calculator.net](https://www.calculator.net/mortgage-calculator.html) |
| PDF compression control | Metadata/object-stream optimization; no quality presets despite instructions | PDF24 exposes DPI/image-quality and other controls; explains server processing and image-vs-text limitations | Local processing is a real distinction, but it does not replace compression capability. [PDF24](https://tools.pdf24.org/en/compress-pdf) |
| Compression task clarity | One action with partly contradictory supporting copy | iLovePDF clearly offers three compression levels and their quality tradeoffs | Match the words to the available controls. [iLovePDF](https://www.ilovepdf.com/compress_pdf) |
| Proof and authority | Short guides, generic acceptance claims, institutional root links | The inspected comparison pages explain scope and practical options | Show measured results, exact assumptions and useful examples. Do not imitate competitors' unsourced claims. |

**Keyword opportunities below are editorial hypotheses.** Current position, search volume and numeric difficulty are **unknown for every row**. “Priority” means suitability to the current product and repair dependencies, not a fabricated keyword score. Most opportunities should improve existing URLs rather than create another near-duplicate page.

| Query/task | Intent | Existing destination | Priority | Concrete content or product requirement |
|---|---|---|---|---|
| merge PDF without uploading | Use a tool | `/tools/pdf-merger` | High | Synthetic-file workflow, limits, verifiable local processing |
| split PDF locally in browser | Use a tool | `/tools/pdf-splitter` | High | Page-range examples and failure cases |
| remove PDF metadata offline | Use a tool | `/tools/pdf-metadata` | High | Before/after metadata example and offline prerequisites |
| format JSON without uploading | Use a tool | `/tools/json-formatter` | High | Sensitive-data workflow, large-input limits, error examples |
| decode JWT locally | Use/explain | `/tools/jwt-decoder` | High | Explicit decoding-vs-signature-verification distinction |
| compare file SHA256 in browser | Verify file | `/tools/file-hash-verifier` | High | Reproducible test vector, algorithm and file-size limits |
| inspect photo EXIF locally | Inspect data | `/tools/exif-data-viewer` | High | Sample metadata, supported formats, removal capability limits |
| open markdown file in browser | View/edit | `/tools/markdown-viewer` | High | Rendering compatibility examples and export behavior |
| convert SVG to high resolution PNG | Convert image | `/tools/svg-to-png-converter` | High | Dimensions, scaling, transparency and font edge cases |
| JSON to CSV nested objects | Convert/explain | `/tools/json-to-csv-converter` | Medium | Nested-array behavior, quoting and encoding examples |
| compress image with preview | Optimize image | `/tools/image-compressor` | Medium | Measured file-size/visual comparison with downloadable samples |
| PDF compression without upload limitations | Learn/compare | Existing PDF guide + compressor | Medium | Explain object optimization versus image recompression honestly |
| 10 LPA in-hand salary FY 2025-26 | Financial estimate | Existing ₹10L preset | After repair | Correct year-specific payroll/tax model and assumptions |
| Mumbai CGPA conversion by regulation | Academic conversion | Existing Mumbai preset | After repair | Actual applicable circular and course/cohort-specific cases |
| VA loan payment without PMI | Financial estimate | Existing VA preset | After repair | Correct VA costs and program logic; do not acquire traffic to a wrong result |

The best content gaps are proof-oriented: “what stays on device and what does not,” a reproducible file-tool benchmark, detailed transformation edge cases, and a published calculator verification methodology. Build one strong guide for each workflow and link it from its tool and hub. **More near-identical preset pages are not the missing strategy.** Google advises prioritizing helpful original content; large-scale pages without user value can create quality/policy risks, but this audit does not establish a spam enforcement action. [Google people-first/AI optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

## Recommended repair sequence

| Order | Work | Expected impact | Effort | Dependency / acceptance condition |
|---|---|---|---|---|
| 1 | Stop publishing new unsupported financial/academic presets; scope the existing promises | High: prevents expanding known trust failures | Immediate editorial decision | Keep a list of affected URLs; do not bulk-delete blindly |
| 2 | Repair salary and income-tax logic, then specialized mortgage/retirement models or their claims | High: corrects the core result | Several days per family | Official sources, defined year/program, representative and boundary cases |
| 3 | Resolve university formula/classification contradictions | High | 2–4 days | Exact program/cohort sources; UI, FAQ and schema agree |
| 4 | Correct privacy and authority/acceptance copy | High | 0.5–1 day initially | Claims match actual data flows and actual review |
| 5 | Fix font normalization, RSS escaping, one cookie banner, and unsupported GIF/preset wording | Medium; practical quick wins | Roughly 1 day combined | Fonts 200, feed parses, one banner, controls match descriptions |
| 6 | Repair cross-origin embedding and preset state; align robots/noindex | Medium–High for distribution | 0.5–1 day | Real external-origin embed works and keeps preset values |
| 7 | Split shared tool JavaScript | Medium–High for tool experience | 1–2 days | Reduced initial/unused JS on basic tools; production Lighthouse comparison |
| 8 | Rework 5–8 priority pages/guides and curate their links | High long-term potential | 1–2 weeks | Useful examples, original evidence, exact sources and task completion |
| 9 | Repair dates/search action; update stale catalogs and title priorities | Low–Medium | 0.5 day | Truthful metadata and working behavior; avoid cosmetic score chasing |
| 10 | Establish an SEO measurement baseline | Required to evaluate outcomes | 1–2 hours after access | GSC indexing/canonical/queries and grouped performance baseline |

These are planning estimates, not quotes or ranking guarantees. Correct outputs and clear claims are the first release criteria. After each focused batch, inspect the affected production URLs, request recrawl where appropriate, and evaluate comparable query/page cohorts over time.

## What is working — preserve it

- Correctly served, self-canonical indexable sitemap pages; two unknown routes return true 404s.
- Useful server-rendered content and crawlable links despite client components.
- Complete tool directory and category hubs; no base tool or preset orphans in the collected graph.
- Unique titles and descriptions across all 240 sitemap pages.
- No fabricated aggregate ratings in the inspected production schema.
- Homepage mobile lab performance is excellent in the measured run.
- File-tool privacy differentiation can be compelling when stated precisely.

Do not “fix” the site by adding keyword meta tags, forcing a word count, generating more FAQ schema, publishing fake reviews, or adding hreflang without genuine localized alternatives.

## Lower-priority cleanup and important limits

**Titles:** 56 rendered titles exceed 60 characters. This is a review list, not 56 automatic ranking defects: Google title display depends on width and may rewrite titles. Several issues are about inaccurate promises rather than length. Prioritize those. The full list is in `summary.json`.

**Redirects:** sampled HTTP apex → HTTPS apex → HTTPS www takes two hops (308 then 301). HTTPS apex, trailing-slash and `/html-sitemap` normalization work. Consolidate the two-hop case when convenient; this is not a sitewide indexing emergency.

**Stale catalogs:** README, package description and `llms.txt` still say 132 tools while production has 167. Update them from a single registry if maintained. The old “comprehensive” script actually passes its llms parity check because both stale files say 132, and estimates 204 sitemap pages despite 240 live URLs. It does not validate the 36 preset routes in that count. “All SEO checks passed” is not a quality certificate.

**Historical assertions:** `SEO_GROWTH_AUDIT.md` contains older GSC-derived numbers and a narrative that Google tested and rejected pages. The underlying export was not analyzed in this run. A traffic decline and average position alone do not prove that causal story or a penalty. Historical placeholder/fake-review descriptions should not be presented as current defects when the present production evidence differs.

**Unavailable:** current GSC index coverage/Google-selected canonicals/manual actions, organic conversions, backlink quality, market-specific rankings, full field Core Web Vitals, full external-link validation, full functional coverage, and a formal Rich Results Test. A `site:` web search returned no results in the available search service; that is insufficient evidence to declare the site deindexed.

For the next measurement step, obtain GSC Performance by page/query/country/device for the latest 3 months and preceding comparable period, Page Indexing exclusions, URL Inspection samples from each template, Manual Actions, and Core Web Vitals. That will tell us which of these verified defects overlap actual search visibility problems.

## Evidence package and reproduction

All files are alongside this report:

- `url-inventory.csv` — sortable sitemap URL/status/title/description/canonical inventory.
- `crawl.json` — detailed production HTML extraction, links, schemas, headers and sizes.
- `summary.json` — duplicates, H1 checks, title-review list and internal-link graph counts.
- `extra-pages.json` — additional internal requests and expected 404 probes.
- `resources.json` — sampled public asset responses and gzip body sizes.
- `redirects-and-fonts.json`, `font-followup.json` — redirect and font failures.
- `content-inventory.json` — article-body lengths, FAQ/deep-content coverage and preset references.
- `static-audit.txt`, `legacy-review.txt` — outputs of both existing repository audit scripts.
- `browser-observations.json` — recorded browser examples and lab results.
- `production-html.zip` — raw public response bodies captured during the crawl.
- `crawl.py`, `check_resources.py` — read-only crawler and resource checker, four concurrent workers.

To rerun the main crawl, refresh `sitemap.xml` first, then execute `python docs/seo-audit-2026-10-13/crawl.py` followed by `python docs/seo-audit-2026-10-13/check_resources.py` from the repository root. These are supplementary audit scripts, not additions to the application build.

<div align="center">

# Yuitility

**167 browser tools for calculations, text, images and PDFs.**
*File processing happens on your device. Optional AI chat and contact messages use servers. No sign-up required.*

[![Yuitility CI](https://github.com/anubhav-n-mishra/yuitility/actions/workflows/ci.yml/badge.svg)](https://github.com/anubhav-n-mishra/yuitility/actions/workflows/ci.yml)
[![CodeQL](https://github.com/anubhav-n-mishra/yuitility/actions/workflows/codeql.yml/badge.svg)](https://github.com/anubhav-n-mishra/yuitility/actions/workflows/codeql.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-Source--Available-amber.svg)](LICENSE)
[![Live Site](https://img.shields.io/badge/Production-yuitility.app-emerald?logo=google-chrome)](https://www.yuitility.app)

[**Explore Live Tools**](https://www.yuitility.app/tools) • [**Architecture**](docs/architecture.md) • [**Threat Model**](docs/security/threat-model.md) • [**Contributing**](CONTRIBUTING.md) • [**Changelog**](CHANGELOG.md)

</div>

---

## Why Yuitility??

Most web calculators, image converters, and PDF tools suffer from two major flaws:
1. **Privacy Exposure**: They force you to upload sensitive files (tax forms, salary slips, private contracts, client images) to unknown cloud servers just to merge a page or resize a photo.
2. **Friction and Bloat**: They clutter the screen with aggressive ads, paywalls, slow round-trips, and artificial rate limits.

**Yuitility solves this fundamentally through browser engineering.**
File tools use Canvas, Web Workers, WebAssembly, Web Crypto and in-memory streams to process files locally. Optional AI chat sends messages through the server to the selected provider; contact forms also use the server. Hosting requests and external resource downloads remain network activity.

---

## Features and Capabilities

* **Local file processing**: Uploaded tool files are processed in browser memory. Downloads are saved by the browser; preferences may persist locally.
* **Browser calculations**: Calculators run locally after their code loads. Some tools need additional libraries, models or external data.
* **167+ Interactive Tools**:
  * **Developer Utilities**: JSON Formatter & Validator, Base64 En/Decoder, JWT Inspector, Regex Tester, Hash Generator, QR Code Engine, Fake Data Generator.
  * **PDF Suite**: Merge, Split, Compress, Rotate, Watermark, Image to PDF, Metadata Editor (powered by in-memory `pdf-lib`).
  * **Media & Image Tools**: In-browser AI Background Remover, Image Compressor, Resizer, Format Converter (PNG/JPEG/WebP), Meme Maker, Photo Collage Grid.
  * **Financial Engines**: Home Loan EMI with Prepayment & Tax Savings, SIP Compound Forecaster with Step-Up inflation models, Salary / Take-Home Estimator.
  * **Academic Conversions**: CGPA formula scenarios and custom scales. Institutional applicability must be checked against the user's actual course and regulations.
  * **Math, Lifestyle & Converters**: Scientific Calculator, Unit Converter, Unix Timestamp Engine, Time Zone Calculator, BMI / Body Metric Analyzers.
* **PWA caching**: Previously loaded tools may work offline. Uncached code, models, external data and AI chat require a connection.
* **Embeddable Widgets**: Distraction-free, responsive iframe widgets (`/embed/[slug]`) for documentation and developer blogs.

---

## Architecture and Tech Stack

```
User Input ──> In-Memory File Buffer ──> WebAssembly / Web Workers ──> Instant DOM / Canvas / Blob Output
                                              │
                                     (Zero Server Hops)
```

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with statically generated content pages and server API routes.
* **Language**: [TypeScript 5.8](https://www.typescriptlang.org/) configured with strict type-safety.
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with high-contrast Dark Mode support.
* **Core Libraries**: `pdf-lib`, `@imgly/background-removal`, `framer-motion`, `lucide-react`.
* **CI/CD & Security**: GitHub Actions (Node 20 & 22 matrix), GitHub CodeQL SAST, Dependabot.
* **SEO checks**: Registry integrity, metadata and internal-link checks, plus a production-preview HTTP crawl. These checks do not establish rankings, accessibility certification or the correctness of every tool.

For full architectural blueprints, see [docs/architecture.md](docs/architecture.md).

---

## Quick Start and Local Development

### Prerequisites
* **Node.js**: `v20.x` or `v22.x` (LTS recommended)
* **npm**: `v10.x` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anubhav-n-mishra/yuitility.git
   cd yuitility
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development**:
   ```bash
   npm run dev
   ```
   Open your browser to [http://localhost:3000](http://localhost:3000).

---

## Quality Gates and NPM Scripts

All code must pass strict verification gates prior to merge:

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the local Turbopack development server on port 3000. |
| `npm run typecheck` | Strict TypeScript compilation check via `tsc --noEmit`. |
| `npm run lint` | Fast static syntax, security marker, emoji prohibition, and path leakage linter. |
| `npm test` | Runs unit tests (batching, deduplication) and static SEO audits. |
| `npm run build` | Compiles optimized production bundle across all 350+ static routes. |
| `npm run verify` | Runs all gates in sequence: `typecheck` $\rightarrow$ `lint` $\rightarrow$ `test` $\rightarrow$ `build`. |
| `npm run seo:audit` | Enforces SEO title lengths, description bounds, and FAQ schema. |

---

## Security and Privacy

We treat user security as a primary invariant. Please refer to our [Security Policy (SECURITY.md)](SECURITY.md) and [Security Threat Model](docs/security/threat-model.md) for details on our trust boundaries and responsible vulnerability disclosure process.

---

## Contributing

We welcome community contributions, bug fixes, UI improvements, and new client-side tools!

1. Please read our [Contribution Guidelines (CONTRIBUTING.md)](CONTRIBUTING.md) and [Code of Conduct (CODE_OF_CONDUCT.md)](CODE_OF_CONDUCT.md).
2. Follow our tutorial on [Adding a New Tool](docs/contributing/adding-a-tool.md).
3. Ensure `npm run verify` passes with zero errors before opening a Pull Request.

---

## License and Terms

This repository is **Source-Available** under the [Yuitility License](LICENSE).
* **You are welcome to**: View, clone, study, fork, and test this software locally, and submit Pull Requests or bug reports back to this repository.
* **You may NOT**: Deploy, host, distribute, or operate public or commercial replicas or competing services using this code or its assets.

Copyright (c) 2026 Anubhav Mishra. All rights reserved.

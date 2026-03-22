<div align="center">
  <img src="public/logo.png" alt="BuildBeaver logo" width="80" />
  <h1>BuildBeaver</h1>
  <p>A guided web app that helps users start a business in Canada — from idea to launch.</p>
</div>

---

## Overview

BuildBeaver walks users through a 6-step business setup roadmap, providing clear guidance and copy-ready form outputs for key registration steps.

## User Flow

1. **Landing** — Brief intro and "Get Started" prompt
2. **Intake** — User enters business type, location, and name
3. **Roadmap** — Checklist overview of all 6 steps
4. **Step Pages** — Detailed guidance per step, with an interactive Form Assistant on registration steps

## Steps

| # | Step | Type |
|---|------|------|
| 1 | Choose Business Structure | Informational |
| 2 | Register Business | Form Assistant |
| 3 | Get Business Number (CRA) | Form Assistant |
| 4 | Open Business Bank Account | Informational |
| 5 | Licenses & Permits | Checklist |
| 6 | Basic Accounting Setup | Informational |

The Form Assistant prefills fields using intake data, generates structured output, and includes a one-click copy feature.

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- React state only — no database or authentication

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

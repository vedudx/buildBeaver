Build a web app called "BuildBeaver".

## Goal
Help users start a business in Canada from start to finish in a simple, guided way.

The app should:
1. Ask a few questions about the business
2. Show a step-by-step roadmap (steps 1–6)
3. Provide guidance for each step
4. Include a "Form Assistant" for key steps that generates copy-ready answers

This is a hackathon MVP and must be simple, fast, and demo-ready.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- No database (use React state only)
- Simple API routes (optional for formatting)
- No authentication

---

## Core Steps (must include all 6)

1. Choose Business Structure
2. Register Business
3. Get Business Number (CRA)
4. Open Business Bank Account
5. Licenses & Permits
6. Basic Accounting Setup

---

## Scope Rules (IMPORTANT)

- Only 2 steps are interactive:
  - Register Business
  - Get Business Number
- All other steps are informational
- No external scraping or APIs
- Use hardcoded data

---

## User Flow

### 1. Landing Page (/)
- Title: "BuildBeaver"
- Subtitle: "Start your business from idea to launch"
- Button: "Get Started"

---

### 2. Intake Page (/intake)

Form inputs:
- Business Type (dropdown: bakery)
- Location (dropdown: British Columbia)
- Business Name (text input)

On submit → go to /roadmap

---

### 3. Roadmap Page (/roadmap)

Display checklist of steps:

[1] Choose Business Structure
[2] Register Business
[3] Get Business Number
[4] Open Bank Account
[5] Licenses & Permits
[6] Basic Accounting

Each step is clickable → goes to /step/[id]

---

### 4. Step Page (/step/[id])

Split layout:

LEFT:
- Title
- Short explanation
- Bullet points
- Optional link (e.g., CRA site)

RIGHT:
- If step is "form" → show Form Assistant
- If step is "info" → show static content

---

## Step Types

### Info Steps:
- structure
- bank_account
- accounting

These only display text guidance.

---

### Semi Step:
- licenses

Show explanation + checklist (no form needed)

---

### Form Steps (IMPORTANT)

#### Step: Register Business
Fields:
- business_name
- ownership_type (dropdown: sole proprietorship, corporation)
- address

#### Step: Get Business Number
Fields:
- business_name
- ownership_type
- address
- start_date

---

## Form Assistant Behavior

1. Show input fields
2. User fills them
3. On submit → generate structured output

Example output:

Business Name: Vedant Bakery Inc.
Ownership Type: Sole Proprietorship
Address: Vancouver, BC
Start Date: March 2026

---

## Features for Form Assistant

- Prefilled inputs (use intake data if available)
- "Generate Answers" button
- Display formatted output
- "Copy All" button
- Copy-to-clipboard functionality

---

## Data Structure (hardcoded)

Create a config like:

const steps = [
  {
    id: "structure",
    type: "info",
    title: "Choose Business Structure",
    description: "Decide between sole proprietorship or corporation..."
  },
  {
    id: "register",
    type: "form",
    title: "Register Business",
    fields: ["business_name", "ownership_type", "address"]
  },
  {
    id: "bn",
    type: "form",
    title: "Get Business Number",
    fields: ["business_name", "ownership_type", "address", "start_date"]
  }
]

---

## UI Requirements

- Clean modern UI (Stripe / Linear style)
- Tailwind styling
- Card-based layout
- Responsive
- Clear spacing and typography

---

## Nice UX Touches

- Checklist style roadmap
- Highlight current step
- Show completion state (optional)
- Loading state on "Generate"

---

## What NOT to build

- No database
- No authentication
- No real form submission to government
- No scraping

---

## Goal

Generate a working MVP with:
- full flow: intake → roadmap → step
- 2 working form assistants
- clean UI
- demo-ready experience

Focus on simplicity, clarity, and usability.

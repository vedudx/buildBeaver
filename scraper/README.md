# BuildBeaver – BC Permit Requirement Extractor

API-first approach to extracting business permit requirements for British Columbia.
Follows the "Build Canada" Sovereign Move: check official APIs before falling back to scraping.

## Data Sources (Priority Order)

1. **OrgBook BC API** – Verified business credentials
2. **BC Data Catalogue API** – Open data search for permits, licenses, energy
3. **BC Registries API Gateway** – Business name registration requirements
4. **Playwright Scraper** (fallback) – Agentic browser scraping of BC portal pages

## Setup

```bash
cd scraper
npm install
npx playwright install chromium          # browser binary
npx playwright install-deps chromium     # system libs (needs sudo)
```

## Usage

```bash
# Auto mode: APIs first, Playwright supplemental
npm start

# API-only (no browser needed)
npm run api

# Scrape-only (Playwright)
npm run scrape

# Custom options
npx tsx src/index.ts \
  --mode=auto \
  --business=bakery \
  --lang=en \
  --output=./output/requirements.json \
  --url=https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences
```

### CLI Flags

| Flag          | Default                         | Description                        |
|---------------|----------------------------------|------------------------------------|
| `--mode`      | `auto`                          | `api`, `scrape`, or `auto`         |
| `--business`  | `bakery`                        | Business type to search for        |
| `--lang`      | `en`                            | Language (`en` or `fr`)            |
| `--output`    | `./output/requirements.json`    | Output file path                   |
| `--url`       | *(BC permits page)*             | Specific URL to scrape             |
| `--headed`    | `false`                         | Show browser window                |

## Output Format

```json
{
  "_meta": { "tool": "BuildBeaver Permit Extractor", "strategy": "api-first" },
  "totalRequirements": 7,
  "results": [
    {
      "source": "bc-data-catalogue",
      "requirements": [
        {
          "id": "bcdc-...",
          "title": "...",
          "description": "...",
          "authority": "...",
          "category": "provincial",
          "links": ["..."]
        }
      ]
    }
  ]
}
```

## Playwright Scraper Features

- **Agentic approach**: auto-detects page structure (card grid, accordion, table, list)
- **Bilingual toggle**: detects and clicks EN/FR language switcher (GC WET pattern)
- **Network idle wait**: waits for all XHR/fetch to complete before extraction
- **Graceful degradation**: falls back to simpler strategies if page structure is unusual

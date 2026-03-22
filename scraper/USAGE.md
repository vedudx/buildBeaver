# Scraper Usage Guide

## 1. Install dependencies

```bash
cd /home/stephan/git/buildBeaver/scraper
npm install
```

## 2. API-only mode (no browser needed)

```bash
npm run api
```

Hits OrgBook BC, BC Data Catalogue, and BC Registries.
Output lands in `output/requirements.json`.

## 3. Full auto mode (APIs + Playwright scraping)

First install Playwright system libraries (one-time, needs sudo):

```bash
npx playwright install chromium
sudo npx playwright install-deps chromium
```

Then run:

```bash
npm start
```

Runs all 3 APIs first, then Playwright scrapes the BC permits portal to supplement.

## 4. Scrape a specific BC government URL

```bash
npx tsx src/index.ts --url=https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences
```

## 5. CLI flags

| Flag          | Default                       | What it does                        |
|---------------|-------------------------------|-------------------------------------|
| `--mode`      | `auto`                        | `api`, `scrape`, or `auto`          |
| `--business`  | `bakery`                      | Business type to search for         |
| `--lang`      | `en`                          | Language: `en` or `fr`              |
| `--output`    | `./output/requirements.json`  | Output file path                    |
| `--url`       | *(BC permits page)*           | Specific URL to scrape              |
| `--headed`    | false                         | Show the browser window             |

## 6. Read the output

```bash
cat output/requirements.json
```

Each entry contains:
- `title` – permit/requirement name
- `description` – what it is
- `authority` – who issues it
- `category` – provincial / municipal / federal / etc.
- `links` – official URLs
- `estimatedCost` – if known
- `estimatedTimeline` – if known

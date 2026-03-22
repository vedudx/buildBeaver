import { chromium, type Page, type Browser, type BrowserContext } from "playwright";
import type { ScraperConfig, ExtractionResult, PermitRequirement } from "./types.js";

const DEFAULT_TARGET_URLS = [
  "https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences",
  "https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/starting-a-business",
  "https://smallbusinessbc.ca/resources/",
];

function log(msg: string) {
  console.log(`[Playwright] ${msg}`);
}

// ---------------------------------------------------------------------------
// Agentic Playwright scraper
// ---------------------------------------------------------------------------
export async function scrapePermitRequirements(
  config: ScraperConfig
): Promise<ExtractionResult> {
  const targetUrl = config.targetUrl ?? DEFAULT_TARGET_URLS[0];
  log(`Launching browser (headless=${config.headless})...`);

  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({ headless: config.headless });
    const context = await browser.newContext({
      locale: config.language === "fr" ? "fr-CA" : "en-CA",
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    });

    const page = await context.newPage();
    page.setDefaultTimeout(config.timeout);

    const allRequirements: PermitRequirement[] = [];

    for (const url of config.targetUrl ? [config.targetUrl] : DEFAULT_TARGET_URLS) {
      log(`Navigating to ${url}...`);
      const requirements = await agentExtractFromPage(page, url, config);
      allRequirements.push(...requirements);
    }

    await context.close();

    return {
      source: "playwright-scrape",
      sourceUrl: targetUrl,
      extractedAt: new Date().toISOString(),
      language: config.language,
      businessType: config.businessType,
      province: config.province,
      requirements: deduplicateByTitle(allRequirements),
    };
  } finally {
    if (browser) await browser.close();
  }
}

// ---------------------------------------------------------------------------
// Agent loop: navigate, detect page structure, adapt extraction strategy
// ---------------------------------------------------------------------------
async function agentExtractFromPage(
  page: Page,
  url: string,
  config: ScraperConfig
): Promise<PermitRequirement[]> {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: config.timeout });
  } catch {
    log(`Navigation timeout for ${url}, proceeding with partial load...`);
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: config.timeout });
    } catch {
      log(`Could not load ${url}, skipping.`);
      return [];
    }
  }

  log("Page loaded. Waiting for network idle...");
  await waitForStability(page);

  await handleBilingualToggle(page, config.language);

  await waitForStability(page);

  const strategy = await detectPageStructure(page);
  log(`Detected page strategy: ${strategy}`);

  switch (strategy) {
    case "card-grid":
      return extractCardGrid(page, config);
    case "accordion":
      return extractAccordion(page, config);
    case "table":
      return extractTable(page, config);
    case "list":
      return extractList(page, config);
    default:
      return extractGeneric(page, config);
  }
}

// ---------------------------------------------------------------------------
// Bilingual toggle handler
// ---------------------------------------------------------------------------
async function handleBilingualToggle(page: Page, targetLang: "en" | "fr") {
  const langSelectors = [
    `a[lang="${targetLang}"]`,
    `button[lang="${targetLang}"]`,
    `a[hreflang="${targetLang}"]`,
    `#wb-lng a`,              // GC Web Experience Toolkit pattern
    `.language-toggle a`,
    `[data-lang="${targetLang}"]`,
    `a:has-text("${targetLang === "fr" ? "Français" : "English"}")`,
  ];

  for (const selector of langSelectors) {
    const toggle = page.locator(selector).first();
    if (await toggle.isVisible({ timeout: 2_000 }).catch(() => false)) {
      log(`Found bilingual toggle: ${selector} – clicking...`);
      await toggle.click();
      await page.waitForLoadState("networkidle").catch(() => {});
      return;
    }
  }

  log("No bilingual toggle detected (single-language page).");
}

// ---------------------------------------------------------------------------
// Detect page structure to choose extraction strategy
// ---------------------------------------------------------------------------
type PageStrategy = "card-grid" | "accordion" | "table" | "list" | "generic";

async function detectPageStructure(page: Page): Promise<PageStrategy> {
  const checks: [PageStrategy, string][] = [
    ["card-grid", ".card, .permit-card, [class*='card'], [class*='Card'], .tile, [class*='tile']"],
    ["accordion", "details, .accordion, [class*='accordion'], [class*='Accordion'], [data-toggle='collapse']"],
    ["table", "table.table, table[class*='permit'], main table"],
    ["list", "ul.list-group, ol li a, main ul li, .content ul li"],
  ];

  for (const [strategy, selector] of checks) {
    const count = await page.locator(selector).count();
    if (count >= 2) return strategy;
  }

  return "generic";
}

// ---------------------------------------------------------------------------
// Extraction strategies
// ---------------------------------------------------------------------------
async function extractCardGrid(page: Page, config: ScraperConfig): Promise<PermitRequirement[]> {
  log("Extracting from card-grid layout...");
  return page.evaluate((businessType: string) => {
    const cards = document.querySelectorAll(
      ".card, .permit-card, [class*='card'], .tile, [class*='tile']"
    );
    const results: PermitRequirement[] = [];

    cards.forEach((card, i) => {
      const title =
        card.querySelector("h2, h3, h4, .card-title, [class*='title']")?.textContent?.trim() ?? "";
      const desc =
        card.querySelector("p, .card-text, .card-body, [class*='description']")?.textContent?.trim() ?? "";
      const link = card.querySelector("a")?.getAttribute("href") ?? "";
      const authority =
        card.querySelector("[class*='authority'], [class*='issuer'], small")?.textContent?.trim() ??
        "Government of British Columbia";

      if (!title) return;

      results.push({
        id: `scrape-card-${i}`,
        title,
        description: desc.slice(0, 500),
        authority,
        category: "provincial",
        applicableTo: [businessType],
        conditions: [],
        links: link ? [link.startsWith("http") ? link : `https://www2.gov.bc.ca${link}`] : [],
      });
    });
    return results;
  }, config.businessType);
}

async function extractAccordion(page: Page, config: ScraperConfig): Promise<PermitRequirement[]> {
  log("Extracting from accordion layout...");

  const detailsElements = page.locator("details, [data-toggle='collapse']");
  const count = await detailsElements.count();

  for (let i = 0; i < count; i++) {
    const el = detailsElements.nth(i);
    const tagName = await el.evaluate((node) => node.tagName.toLowerCase());
    if (tagName === "details") {
      await el.evaluate((node) => node.setAttribute("open", ""));
    } else {
      await el.click().catch(() => {});
    }
  }
  await waitForStability(page);

  return page.evaluate((businessType: string) => {
    const sections = document.querySelectorAll(
      "details, .accordion-item, [class*='accordion']"
    );
    const results: PermitRequirement[] = [];

    sections.forEach((section, i) => {
      const title =
        section.querySelector("summary, .accordion-header, h3, h4")?.textContent?.trim() ?? "";
      const body =
        section.querySelector(".accordion-body, .accordion-content, p, div:not(summary)")
          ?.textContent?.trim() ?? "";
      const links = Array.from(section.querySelectorAll("a[href]")).map(
        (a) => (a as HTMLAnchorElement).href
      );

      if (!title) return;

      results.push({
        id: `scrape-accordion-${i}`,
        title,
        description: body.slice(0, 500),
        authority: "Government of British Columbia",
        category: "provincial",
        applicableTo: [businessType],
        conditions: [],
        links,
      });
    });
    return results;
  }, config.businessType);
}

async function extractTable(page: Page, config: ScraperConfig): Promise<PermitRequirement[]> {
  log("Extracting from table layout...");
  return page.evaluate((businessType: string) => {
    const tables = document.querySelectorAll("table");
    const results: PermitRequirement[] = [];

    tables.forEach((table) => {
      const headers = Array.from(table.querySelectorAll("thead th, thead td")).map(
        (th) => th.textContent?.trim().toLowerCase() ?? ""
      );
      const rows = table.querySelectorAll("tbody tr");

      rows.forEach((row, i) => {
        const cells = Array.from(row.querySelectorAll("td"));
        if (cells.length < 2) return;

        const titleIdx = headers.findIndex(
          (h) => h.includes("permit") || h.includes("license") || h.includes("name") || h.includes("requirement")
        );
        const descIdx = headers.findIndex(
          (h) => h.includes("description") || h.includes("detail") || h.includes("note")
        );

        const title = cells[titleIdx >= 0 ? titleIdx : 0]?.textContent?.trim() ?? "";
        const desc = cells[descIdx >= 0 ? descIdx : 1]?.textContent?.trim() ?? "";
        const links = Array.from(row.querySelectorAll("a[href]")).map(
          (a) => (a as HTMLAnchorElement).href
        );

        if (!title) return;

        results.push({
          id: `scrape-table-${i}`,
          title,
          description: desc.slice(0, 500),
          authority: "Government of British Columbia",
          category: "provincial",
          applicableTo: [businessType],
          conditions: [],
          links,
        });
      });
    });
    return results;
  }, config.businessType);
}

async function extractList(page: Page, config: ScraperConfig): Promise<PermitRequirement[]> {
  log("Extracting from list layout...");
  return page.evaluate((businessType: string) => {
    const items = document.querySelectorAll("main ul li, main ol li, .content ul li, .content ol li");
    const results: PermitRequirement[] = [];

    items.forEach((item, i) => {
      const text = item.textContent?.trim() ?? "";
      if (!text || text.length < 10) return;

      const anchor = item.querySelector("a");
      const title = anchor?.textContent?.trim() ?? text.split(/[.:\n]/)[0].trim();
      const href = anchor?.getAttribute("href") ?? "";

      results.push({
        id: `scrape-list-${i}`,
        title: title.slice(0, 200),
        description: text.slice(0, 500),
        authority: "Government of British Columbia",
        category: "provincial",
        applicableTo: [businessType],
        conditions: [],
        links: href
          ? [href.startsWith("http") ? href : `https://www2.gov.bc.ca${href}`]
          : [],
      });
    });
    return results;
  }, config.businessType);
}

async function extractGeneric(page: Page, config: ScraperConfig): Promise<PermitRequirement[]> {
  log("Falling back to generic extraction (headings + following content)...");
  return page.evaluate((businessType: string) => {
    const headings = document.querySelectorAll("main h2, main h3, .content h2, .content h3, article h2, article h3");
    const results: PermitRequirement[] = [];

    headings.forEach((heading, i) => {
      const title = heading.textContent?.trim() ?? "";
      if (!title) return;

      let desc = "";
      let sibling = heading.nextElementSibling;
      while (sibling && !["H1", "H2", "H3"].includes(sibling.tagName)) {
        desc += (sibling.textContent?.trim() ?? "") + " ";
        sibling = sibling.nextElementSibling;
      }

      const links = Array.from(
        heading.parentElement?.querySelectorAll("a[href]") ?? []
      ).map((a) => (a as HTMLAnchorElement).href);

      results.push({
        id: `scrape-generic-${i}`,
        title,
        description: desc.trim().slice(0, 500),
        authority: "Government of British Columbia",
        category: "provincial",
        applicableTo: [businessType],
        conditions: [],
        links: [...new Set(links)],
      });
    });
    return results;
  }, config.businessType);
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
async function waitForStability(page: Page) {
  try {
    await page.waitForLoadState("networkidle", { timeout: 10_000 });
  } catch {
    // Best-effort; continue with what we have
  }
  await page.waitForTimeout(1_000);
}

function deduplicateByTitle(items: PermitRequirement[]): PermitRequirement[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.title.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { parseArgs } from "node:util";
import type { ScraperConfig, ExtractionResult } from "./types.js";
import { DEFAULT_CONFIG } from "./types.js";
import {
  queryOrgBook,
  queryBCDataCatalogue,
  queryBCRegistries,
} from "./api-clients.js";
import { scrapePermitRequirements } from "./scraper.js";

function banner() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  BuildBeaver – BC Permit Requirement Extractor              ║
║  API-First Sovereign Approach                               ║
║                                                             ║
║  Priority: OrgBook API → BC Data Catalogue → BC Registries  ║
║  Fallback: Playwright Agentic Scraper                       ║
╚══════════════════════════════════════════════════════════════╝
`);
}

function parseCliArgs(): Partial<ScraperConfig> {
  const { values } = parseArgs({
    options: {
      mode: { type: "string", default: "auto" },
      url: { type: "string" },
      business: { type: "string", default: "bakery" },
      lang: { type: "string", default: "en" },
      output: { type: "string", default: "./output/requirements.json" },
      headed: { type: "boolean", default: false },
    },
    strict: false,
  });

  return {
    mode: (values.mode as ScraperConfig["mode"]) ?? "auto",
    targetUrl: values.url as string | undefined,
    businessType: (values.business as string) ?? "bakery",
    language: (values.lang as "en" | "fr") ?? "en",
    outputPath: (values.output as string) ?? "./output/requirements.json",
    headless: !values.headed,
  };
}

async function writeOutput(results: ExtractionResult[], outputPath: string) {
  const absPath = resolve(outputPath);
  await mkdir(dirname(absPath), { recursive: true });

  const envelope = {
    _meta: {
      tool: "BuildBeaver Permit Extractor",
      version: "1.0.0",
      strategy: "api-first",
      generatedAt: new Date().toISOString(),
    },
    sources: results.map((r) => ({
      source: r.source,
      url: r.sourceUrl,
      count: r.requirements.length,
    })),
    totalRequirements: results.reduce((n, r) => n + r.requirements.length, 0),
    results,
  };

  await writeFile(absPath, JSON.stringify(envelope, null, 2), "utf-8");
  console.log(`\n[Output] Wrote ${envelope.totalRequirements} requirement(s) to ${absPath}`);
}

// ---------------------------------------------------------------------------
// Main orchestrator
// ---------------------------------------------------------------------------
async function main() {
  banner();
  const cliOverrides = parseCliArgs();
  const config: ScraperConfig = { ...DEFAULT_CONFIG, ...cliOverrides };

  console.log(`Config: mode=${config.mode}, business=${config.businessType}, lang=${config.language}`);
  console.log(`        headless=${config.headless}, output=${config.outputPath}`);
  if (config.targetUrl) console.log(`        targetUrl=${config.targetUrl}`);
  console.log();

  const collected: ExtractionResult[] = [];

  // ---- Phase 1: API-first (Sovereign approach) ----
  if (config.mode === "api" || config.mode === "auto") {
    console.log("═══ Phase 1: Official BC APIs ═══\n");

    const apiCalls = [
      { name: "OrgBook BC", fn: () => queryOrgBook(config) },
      { name: "BC Data Catalogue", fn: () => queryBCDataCatalogue(config) },
      { name: "BC Registries Gateway", fn: () => queryBCRegistries(config) },
    ];

    for (const { name, fn } of apiCalls) {
      console.log(`--- ${name} ---`);
      try {
        const result = await fn();
        if (result && result.requirements.length > 0) {
          collected.push(result);
          console.log(`  ✓ ${result.requirements.length} requirement(s) found\n`);
        } else {
          console.log(`  ○ No results\n`);
        }
      } catch (err) {
        console.log(`  ✗ Error: ${(err as Error).message}\n`);
      }
    }
  }

  // ---- Phase 2: Playwright scraper fallback ----
  if (config.mode === "scrape" || (config.mode === "auto" && collected.length === 0)) {
    console.log("═══ Phase 2: Playwright Agentic Scraper ═══\n");

    if (config.mode === "auto") {
      console.log("APIs returned limited data. Falling back to Playwright scraping...\n");
    }

    try {
      const scrapeResult = await scrapePermitRequirements(config);
      if (scrapeResult.requirements.length > 0) {
        collected.push(scrapeResult);
        console.log(`  ✓ ${scrapeResult.requirements.length} requirement(s) scraped\n`);
      } else {
        console.log("  ○ No requirements extracted from page(s)\n");
      }
    } catch (err) {
      console.error(`  ✗ Scraper error: ${(err as Error).message}\n`);
    }
  }

  // Even in auto mode, if APIs got results, still run scraper to supplement
  if (config.mode === "auto" && collected.length > 0 && !collected.some((r) => r.source === "playwright-scrape")) {
    console.log("═══ Phase 2 (Supplemental): Playwright Agentic Scraper ═══\n");
    console.log("Running scraper to supplement API data...\n");

    try {
      const scrapeResult = await scrapePermitRequirements(config);
      if (scrapeResult.requirements.length > 0) {
        collected.push(scrapeResult);
        console.log(`  ✓ ${scrapeResult.requirements.length} additional requirement(s) scraped\n`);
      }
    } catch (err) {
      console.log(`  ○ Supplemental scrape skipped: ${(err as Error).message}\n`);
    }
  }

  // ---- Write output ----
  if (collected.length > 0) {
    await writeOutput(collected, config.outputPath);
  } else {
    console.log("\n⚠ No requirements found from any source.");
    process.exit(1);
  }

  // ---- Summary ----
  console.log("\n═══ Summary ═══");
  for (const r of collected) {
    console.log(`  ${r.source}: ${r.requirements.length} requirement(s)`);
  }
  const total = collected.reduce((n, r) => n + r.requirements.length, 0);
  console.log(`  Total: ${total} requirement(s)\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

/**
 * Reference implementation for partner wiring — read and copy patterns from here.
 *
 * This file is NOT copied on publish. The fixture pack ships a minimal stub at
 * `partner/binding.js` (written on publish from `scripts/fixture-pack-binding.stub.js`). Implement that file using the
 * patterns below.
 *
 * Contract (see ../PARTNER.md):
 * - `runChecker(app)` — harness has already opened the fixture as `app.activeDocument`
 * - `normalizeToIssues(raw)` — return `[{ checkId, type }]` rows for fixture matching
 *
 * Canonical `checkId` strings: ../fixtureCheckIds.js
 *
 * @type {Pick<import("../testConfig.js").FixtureHarnessConfig, "runChecker" | "normalizeToIssues">}
 */

// ---------------------------------------------------------------------------
// 1. Import your checker (uncomment and adjust the path)
// ---------------------------------------------------------------------------
// import { runYourChecker } from "../../../yourChecker.js";

// ---------------------------------------------------------------------------
// 2. Checker entry — called once per fixture
// ---------------------------------------------------------------------------

/**
 * @param {any} application InDesign Application (`app.activeDocument` is the fixture)
 * @returns {Promise<unknown>}
 */
async function runYourCheckerEntry(application) {
  void application;

  throw new Error(
    "partner/binding.js: implement runChecker — import your checker and return its native result (see PARTNER.md)",
  );

  // Typical implementation:
  // return runYourChecker(application);
}

// ---------------------------------------------------------------------------
// 3. Normalization — map your native result to harness rows
// ---------------------------------------------------------------------------

/**
 * Pattern A: checker already returns a flat `[{ checkId, type }, …]` array.
 * @param {unknown} raw
 * @returns {Array<{ checkId: string; type: string }>}
 */
function normalizeFlatIssueRows(raw) {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.filter(
    (row) =>
      row &&
      typeof row === "object" &&
      typeof row.checkId === "string" &&
      row.checkId.length > 0 &&
      typeof row.type === "string" &&
      row.type.length > 0,
  );
}

/**
 * Pattern B: checker returns `{ byCategory: [{ issues: [...] }] }`.
 * Each nested issue must already include `checkId` and `type`.
 * @param {unknown} raw
 * @returns {Array<{ checkId: string; type: string }>}
 */
function normalizeByCategoryIssues(raw) {
  if (!raw || typeof raw !== "object" || !Array.isArray(raw.byCategory)) {
    return [];
  }

  return raw.byCategory.flatMap((category) =>
    category && typeof category === "object" && Array.isArray(category.issues)
      ? category.issues
      : [],
  ).filter(
    (row) =>
      row &&
      typeof row === "object" &&
      typeof row.checkId === "string" &&
      row.checkId.length > 0 &&
      typeof row.type === "string" &&
      row.type.length > 0,
  );
}

/**
 * Pattern C: map your field names onto the harness contract.
 * @param {unknown} raw
 * @returns {Array<{ checkId: string; type: string }>}
 */
function normalizeYourCheckerResult(raw) {
  // Pick the pattern that matches your checker output and delete the others.

  // return normalizeFlatIssueRows(raw);
  // return normalizeByCategoryIssues(raw);

  // return (raw?.issues ?? []).map((issue) => ({
  //   checkId: issue.ruleId,
  //   type: mapSeverity(issue.severity),
  // }));

  void raw;
  return [];
}

/**
 * Example severity mapper — adapt or remove if your checker already uses
 * `"error" | "warning" | "info"`.
 * @param {string} severity
 * @returns {"error" | "warning" | "info"}
 */
function mapSeverity(severity) {
  const normalized = String(severity).toLowerCase();

  if (normalized === "error" || normalized === "fail" || normalized === "critical") {
    return "error";
  }

  if (normalized === "warning" || normalized === "warn") {
    return "warning";
  }

  return "info";
}

// ---------------------------------------------------------------------------
// 4. Export — keep these property names; wire your functions above
// ---------------------------------------------------------------------------

export const partnerHarnessBindings = {
  runChecker: (app) => runYourCheckerEntry(app),
  normalizeToIssues: (raw) => normalizeYourCheckerResult(raw),
};

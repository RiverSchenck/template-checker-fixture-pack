/**
 * This example shows how I actually implemented the binding when I tested for.
 * my tests.
 *
 * Contract (see ../PARTNER.md):
 * - `runChecker(app)` — harness has already opened the fixture as `app.activeDocument`
 * - `normalizeToIssues(raw)` — return `[{ checkId, type }]` rows for fixture matching
 *
 * Canonical `checkId` strings: ../fixtureCheckIds.js
 *
 * @type {Pick<import("../testConfig.js").FixtureHarnessConfig, "runChecker" | "normalizeToIssues">}
 */

import { runTemplateChecks } from "../../../engine/runTemplateChecks.js";

function flattenByCategoryIssues(raw) {
  if (!raw || typeof raw !== "object" || !Array.isArray(raw.byCategory)) {
    return [];
  }

  return raw.byCategory.flatMap((category) =>
    category && typeof category === "object" && Array.isArray(category.issues)
      ? category.issues
      : [],
  );
}

async function runYourCheckerEntry(application) {
  return runTemplateChecks(application);
}

function normalizeYourCheckerResult(raw) {
  return flattenByCategoryIssues(raw);
}

export const partnerHarnessBindings = {
  runChecker: (app) => runYourCheckerEntry(app),
  normalizeToIssues: (raw) => normalizeYourCheckerResult(raw),
};

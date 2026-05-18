/**
 * Minimal partner wiring — no imports from outside `testing/`.
 * Copy or merge into `partner/binding.js` and implement (see ../PARTNER.md).
 *
 * @type {Pick<import("../../testConfig.js").FixtureHarnessConfig, "runChecker" | "normalizeToIssues">}
 */
export const partnerHarnessBindings = {
  async runChecker(app) {
    void app;
    throw new Error(
      "Implement partner/binding.js: runChecker (see PARTNER.md)",
    );
  },
  normalizeToIssues() {
    return [];
  },
};

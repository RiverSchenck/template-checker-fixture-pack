/**
 * Minimal partner stub — publish source for `partner/binding.js` in the fixture-pack repo.
 * Maintained here (not under `partner/`) so the partner folder is only files partners edit.
 *
 * @type {Pick<import("../testConfig.js").FixtureHarnessConfig, "runChecker" | "normalizeToIssues">}
 */
export const partnerHarnessBindings = {
  async runChecker(app) {
    void app;
    throw new Error(
      "Implement partner/binding.js: runChecker (see PARTNER.md and partner/examples/binding.example.js)",
    );
  },
  normalizeToIssues() {
    return [];
  },
};

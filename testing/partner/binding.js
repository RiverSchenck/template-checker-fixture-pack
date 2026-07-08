/**
 * Minimal partner stub — implement this file to wire your checker into the fixture harness.
 * See PARTNER.md and partner/examples/binding.example.js for patterns and helpers.
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

/**
 * @typedef {{ checkId: string; type: "error"|"warning"|"info" }} IssueExpectation
 */

/**
 * @typedef {Object} FailTestCase
 * @property {string} folderName
 * @property {IssueExpectation[]} expected
 */

/**
 * @typedef {Object} PassTestCase
 * @property {string} folderName
 */

/**
 * One fixture suite: folders + expectations (used with {@link FixtureHarnessConfig}).
 *
 * @typedef {Object} FixtureSuiteConfig
 * @property {string} name
 * @property {string} srcFolder
 * @property {FailTestCase[]} failTests
 * @property {PassTestCase[]} passTests
 * @property {string[]} [issueScopeCheckIds] Required when the suite has only `passTests` (no fail cases with expectations); otherwise optional (derived from the union of `checkId` values in fail test `expected` rows).
 */

/**
 * Partner / host integration: one full checker run + normalization + all suites.
 *
 * @typedef {Object} FixtureHarnessConfig
 * @property {(app: any) => Promise<unknown>} runChecker
 * @property {(raw: unknown) => unknown[]} normalizeToIssues
 * @property {FixtureSuiteConfig[]} suites
 */

export {};

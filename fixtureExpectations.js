/**
 * Build multiset expectations for fixture fail tests.
 *
 * @param {string} checkId
 * @param {number} count
 * @param {"error"|"warning"|"info"} type
 * @returns {import("./testConfig.js").IssueExpectation[]}
 */
export function expectIssues(checkId, count, type) {
    return Array.from({ length: count }, () => ({ checkId, type }));
}

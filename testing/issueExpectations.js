/**
 * Multiset matching for fixture tests: each expected row consumes one issue
 * with the same checkId and the same type.
 *
 * @param {unknown} issue
 * @param {import("./testConfig.js").IssueExpectation} exp
 */
export function issueMatchesExpectation(issue, exp) {
    if (!issue || typeof issue !== "object") {
        return false;
    }
    if (exp.type == null || exp.type === "") {
        return false;
    }
    const i = /** @type {{ checkId?: string; type?: string }} */ (issue);
    if (i.checkId !== exp.checkId) {
        return false;
    }
    return i.type === exp.type;
}

/**
 * @param {unknown[]} issues
 * @param {import("./testConfig.js").IssueExpectation[]} expected
 */
export function multisetMatchesIssues(issues, expected) {
    if (!Array.isArray(issues) || !Array.isArray(expected)) {
        return false;
    }
    if (issues.length !== expected.length) {
        return false;
    }
    const pool = issues.slice();
    for (const exp of expected) {
        const idx = pool.findIndex((i) => issueMatchesExpectation(i, exp));
        if (idx === -1) {
            return false;
        }
        pool.splice(idx, 1);
    }
    return pool.length === 0;
}

/**
 * @param {unknown} issue
 * @returns {string}
 */
export function formatIssueForLog(issue) {
    if (!issue || typeof issue !== "object") {
        return String(issue);
    }
    const i = /** @type {{ checkId?: string; type?: string }} */ (issue);
    const id = i.checkId != null ? String(i.checkId) : "(no checkId)";
    const t = i.type != null ? String(i.type) : "(no type)";
    return `${id} [${t}]`;
}

/**
 * Collapse duplicate fixture log lines into `label (×n)` so large multisets stay readable.
 *
 * @param {string[]} labels
 * @returns {string}
 */
export function summarizeLabelsForLog(labels) {
    if (!Array.isArray(labels)) {
        return String(labels);
    }
    if (labels.length === 0) {
        return "(none)";
    }
    /** @type {Map<string, number>} */
    const counts = new Map();
    for (const label of labels) {
        const key = String(label);
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const entries = [...counts.entries()].sort((a, b) => {
        const byCount = b[1] - a[1];
        if (byCount !== 0) {
            return byCount;
        }
        return a[0].localeCompare(b[0]);
    });
    return entries.map(([label, n]) => (n === 1 ? label : `${label} (×${n})`)).join(", ");
}

/**
 * @typedef {import("./testConfig.js").FixtureSuiteConfig} FixtureSuiteConfig
 */

/**
 * Resolves which `checkId` values belong to a harness suite for scoped assertions.
 *
 * @param {FixtureSuiteConfig} suite
 * @returns {{ ok: true; scope: Set<string> } | { ok: false; error: string }}
 */
export function deriveIssueScopeCheckIds(suite) {
    if (suite.issueScopeCheckIds != null) {
        if (suite.issueScopeCheckIds.length === 0) {
            return {
                ok: false,
                error: "issueScopeCheckIds was set but is empty; omit the field or list at least one checkId."
            };
        }
        return { ok: true, scope: new Set(suite.issueScopeCheckIds.map(String)) };
    }

    const ids = new Set();
    for (const ft of suite.failTests ?? []) {
        for (const e of ft.expected ?? []) {
            if (e && e.checkId != null) {
                ids.add(String(e.checkId));
            }
        }
    }

    if (ids.size > 0) {
        return { ok: true, scope: ids };
    }

    const failLen = suite.failTests?.length ?? 0;
    if (failLen > 0) {
        return {
            ok: false,
            error: "Suite has fail tests but no checkIds in expected rows; set issueScopeCheckIds or fix expectations."
        };
    }

    const passLen = suite.passTests?.length ?? 0;
    if (passLen > 0) {
        return {
            ok: false,
            error:
                "Suite has only pass tests; set issueScopeCheckIds so the harness knows which checkIds must be clean."
        };
    }

    return { ok: true, scope: new Set() };
}

/**
 * @param {unknown[]} issues
 * @param {Set<string>} scope
 * @returns {unknown[]}
 */
export function filterIssuesToScope(issues, scope) {
    if (!Array.isArray(issues)) {
        return [];
    }
    if (scope.size === 0) {
        return [];
    }
    return issues.filter((issue) => {
        if (!issue || typeof issue !== "object") {
            return false;
        }
        const row = /** @type {{ checkId?: string }} */ (issue);
        const id = row.checkId;
        return id != null && scope.has(String(id));
    });
}

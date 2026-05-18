import { resolveInDesignApp } from "./resolveInDesignApp.js";
import { FIXTURE_HARNESS } from "./fixtureHarness.config.js";
import { TestManager } from "./testManager.js";

/**
 * @typedef {{ app?: any }} FixtureRunOptions
 * Optional `app`: InDesign Application. When omitted, uses {@link resolveInDesignApp}.
 */

/**
 * @param {FixtureRunOptions} [options]
 * @returns {any | null}
 */
function resolveHarnessApp(options) {
    if (options?.app != null) {
        return options.app;
    }
    return resolveInDesignApp();
}

/**
 * All suite definitions on the default harness (same order as {@link FIXTURE_HARNESS}).
 *
 * @type {import("./testConfig.js").FixtureSuiteConfig[]}
 */
export const FIXTURE_TEST_SUITES = FIXTURE_HARNESS.suites;

/**
 * Runs every suite in {@link FIXTURE_HARNESS} against `.indd` trees under the fixture root.
 *
 * @param {FixtureRunOptions} [options] Pass `{ app }` if you already have the InDesign Application.
 * @returns {Promise<{ ok: boolean; message: string; summary: { totalSuccessCount: number; totalTests: number; totalFailed: number; totalSkipped: number; allFailedTests: unknown[]; allSkippedTests: unknown[] } }>}
 */
export async function runFixtureTestSuite(options = {}) {
    const app = resolveHarnessApp(options);
    if (!app) {
        const msg = "Fixture tests: InDesign app is not available.";
        console.warn(msg);
        return {
            ok: false,
            message: msg,
            summary: {
                totalSuccessCount: 0,
                totalTests: 0,
                totalFailed: 0,
                totalSkipped: 0,
                allFailedTests: [],
                allSkippedTests: []
            }
        };
    }

    const manager = new TestManager(app);
    const summary = await manager.runAllTests(FIXTURE_HARNESS);

    const ok = summary.totalFailed === 0;
    const message = ok
        ? `Fixture tests finished: ${summary.totalSuccessCount}/${summary.totalTests} passed, ${summary.totalSkipped} skipped.`
        : `Fixture tests finished: ${summary.totalFailed} failed, ${summary.totalSkipped} skipped (see console).`;

    if (ok) {
        console.log(message);
    } else {
        console.error(message);
    }

    return { ok, message, summary };
}

/**
 * Runs one suite from a harness (same runner as the full suite).
 *
 * @param {import("./testConfig.js").FixtureHarnessConfig} harness
 * @param {import("./testConfig.js").FixtureSuiteConfig} suite
 * @param {FixtureRunOptions} [options] Pass `{ app }` if you already have the InDesign Application.
 * @returns {Promise<{ ok: boolean; message: string }>}
 */
export async function runSingleSuite(harness, suite, options = {}) {
    const app = resolveHarnessApp(options);
    if (!app) {
        const msg = "Fixture tests: InDesign app is not available.";
        console.warn(msg);
        return { ok: false, message: msg };
    }

    const manager = new TestManager(app);
    const { successCount, failedTests, skippedTests } = await manager.runSuite(harness, suite);
    const totalTests = suite.failTests.length + suite.passTests.length;
    const totalFailed = failedTests.length;
    const totalSkipped = skippedTests.length;
    const ok = totalFailed === 0;
    const message = ok
        ? `${suite.name}: ${successCount}/${totalTests} passed, ${totalSkipped} skipped.`
        : `${suite.name}: ${totalFailed} failed, ${totalSkipped} skipped (see console).`;

    if (ok) {
        console.log(message);
    } else {
        console.error(message);
    }

    return { ok, message };
}

import { getSavedFixtureRootFolder } from "./fixtureRootPersistence.js";
import { formatIssueForLog, multisetMatchesIssues, summarizeLabelsForLog } from "./issueExpectations.js";
import { deriveIssueScopeCheckIds, filterIssuesToScope } from "./issueScope.js";

/**
 * @typedef {import("./testConfig.js").FixtureHarnessConfig} FixtureHarnessConfig
 * @typedef {import("./testConfig.js").FixtureSuiteConfig} FixtureSuiteConfig
 * @typedef {import("./testConfig.js").FailTestCase} FailTestCase
 * @typedef {import("./testConfig.js").PassTestCase} PassTestCase
 */

/**
 * @typedef {Object} TestFailure
 * @property {string} testSuite
 * @property {string} name
 * @property {string[]} expected
 * @property {string[]} received
 */

/**
 * @typedef {Object} TestSkip
 * @property {string} testSuite
 * @property {string} name
 * @property {string} reason
 */

/**
 * Decode URI-style segments (`%20` → space) so folder names match the real filesystem.
 *
 * @param {string} segment
 */
function normalizePathSegment(segment) {
    if (segment == null || segment === "") {
        return segment;
    }
    if (!segment.includes("%")) {
        return segment;
    }
    try {
        return decodeURIComponent(segment);
    } catch {
        return segment;
    }
}

/**
 * @param {any} rootFolder UXP folder (e.g. plugin data root)
 * @param {string} relativePath slash-separated path under root
 * @returns {Promise<any | null>}
 */
async function getFolderByRelativePath(rootFolder, relativePath) {
    const segments = relativePath.split("/").filter((s) => s.length > 0);
    let current = rootFolder;
    for (const raw of segments) {
        const name = normalizePathSegment(raw);
        const entry = await current.getEntry(name);
        if (!entry) {
            return null;
        }
        current = entry;
    }
    return current;
}

/**
 * @param {any} rootFolder
 * @param {string} normalizedPath
 * @returns {Promise<any | null>}
 */
async function tryDirectFolderEntry(rootFolder, normalizedPath) {
    try {
        const entry = await rootFolder.getEntry(normalizedPath);
        if (entry && entry.isFolder) {
            return entry;
        }
    } catch {
        /* not found or not a folder */
    }
    return null;
}

/**
 * @param {any} rootFolder
 * @param {string} normalizedPath
 * @returns {Promise<any | null>}
 */
async function tryWalkToFolder(rootFolder, normalizedPath) {
    try {
        const entry = await getFolderByRelativePath(rootFolder, normalizedPath);
        if (entry && entry.isFolder) {
            return entry;
        }
    } catch {
        /* missing segment */
    }
    return null;
}

/**
 * Apply {@link normalizePathSegment} to each slash-separated part (fixes `%20` in folder names).
 *
 * @param {string} relativePath
 */
function normalizeFullRelativePath(relativePath) {
    return relativePath
        .split("/")
        .filter((s) => s.length > 0)
        .map((s) => normalizePathSegment(s))
        .join("/");
}

function getIndesignScriptingConstants() {
    try {
        const id = require("indesign");
        return {
            UserInteractionLevels: id.UserInteractionLevels,
            SaveOptions: id.SaveOptions
        };
    } catch {
        return { UserInteractionLevels: null, SaveOptions: null };
    }
}

export class TestManager {
    constructor(app) {
        this.app = app;
        this.fsProvider = require("uxp").storage.localFileSystem;
        /** Log fixture-root hint at most once per TestManager instance. */
        this._fixtureRootHintLogged = false;
    }

    /**
     * Runs every suite in a {@link FixtureHarnessConfig}.
     *
     * @param {FixtureHarnessConfig} harness
     * @returns {Promise<{ totalSuccessCount: number; totalTests: number; totalFailed: number; totalSkipped: number; allFailedTests: TestFailure[]; allSkippedTests: TestSkip[] }>}
     */
    async runAllTests(harness) {
        let totalSuccessCount = 0;
        let totalFailed = 0;
        let totalSkipped = 0;
        /** @type {TestFailure[]} */
        const allFailedTests = [];
        /** @type {TestSkip[]} */
        const allSkippedTests = [];

        for (const suite of harness.suites) {
            const { successCount, failedTests, skippedTests } = await this.runSuite(harness, suite);

            totalSuccessCount += successCount;
            totalFailed += failedTests.length;
            totalSkipped += skippedTests.length;

            failedTests.forEach((t) => allFailedTests.push(t));
            skippedTests.forEach((t) => allSkippedTests.push(t));
        }

        const totalTests = harness.suites.reduce(
            (sum, suite) => sum + suite.failTests.length + suite.passTests.length,
            0
        );

        if (harness.suites.length > 1) {
            console.log("\n");
            console.log(
                "\x1b[1m\x1b[33m" +
                    "=========================== EXECUTIVE SUMMARY ===========================" +
                    "\x1b[0m"
            );

            console.log(`\n\x1b[32m✅ ${totalSuccessCount}/${totalTests} tests passed successfully.\x1b[0m`);

            if (totalFailed > 0) {
                console.error(`\x1b[31m❌ ${totalFailed}/${totalTests} tests failed across all test suites.\x1b[0m`);
                allFailedTests.forEach((test, index) => {
                    console.error(
                        `\x1b[31m${index + 1}. ${test.name} (Test Suite: ${test.testSuite})\n   Expected: ${summarizeLabelsForLog(test.expected)}\n   Received: ${summarizeLabelsForLog(test.received)}\x1b[0m`
                    );
                });
            }

            if (totalSkipped > 0) {
                console.warn(
                    `\x1b[33m⚠️ ${totalSkipped}/${totalTests} tests were skipped across all test suites.\x1b[0m`
                );
                allSkippedTests.forEach((test, index) =>
                    console.warn(
                        `\x1b[33m${index + 1}. ${test.name} (Test Suite: ${test.testSuite}): ${test.reason}\x1b[0m`
                    )
                );
            }
        }

        return {
            totalSuccessCount,
            totalTests,
            totalFailed,
            totalSkipped,
            allFailedTests,
            allSkippedTests
        };
    }

    /**
     * @param {FixtureHarnessConfig} harness
     * @param {FixtureSuiteConfig} suite
     */
    async runSuite(harness, suite) {
        console.log(`\x1b[35mRunning test suite: ${suite.name}\x1b[0m`);

        let successCount = 0;
        /** @type {TestFailure[]} */
        const failedTests = [];
        /** @type {TestSkip[]} */
        const skippedTests = [];

        const runTestSuite = async (tests, isFailTest) => {
            for (const test of tests) {
                const result = await this.runFixtureCase(harness, suite, test, isFailTest);
                if (result.success) {
                    successCount++;
                } else if (result.skip) {
                    skippedTests.push({
                        testSuite: suite.name,
                        name: test.folderName,
                        reason: result.reason || "skipped"
                    });
                } else {
                    failedTests.push({
                        testSuite: suite.name,
                        name: test.folderName,
                        expected: isFailTest ? result.expectedLabels ?? [] : [],
                        received: result.received ?? []
                    });
                }
            }
        };

        await runTestSuite(suite.failTests, true);
        await runTestSuite(suite.passTests, false);

        const totalTests = suite.failTests.length + suite.passTests.length;
        console.log(`\n\x1b[32m✅ PASSED: ${successCount}/${totalTests}\x1b[0m`);

        if (failedTests.length > 0) {
            console.error(`\x1b[31m❌ FAILED: ${failedTests.length}/${totalTests}\x1b[0m`);
            failedTests.forEach((test, index) => {
                console.error(
                    `\x1b[31m${index + 1}. ${test.name}\n   Expected: ${summarizeLabelsForLog(test.expected)}\n   Received: ${summarizeLabelsForLog(test.received)}\x1b[0m`
                );
            });
        }

        if (skippedTests.length > 0) {
            console.warn(`\x1b[33m⚠️ SKIPPED: ${skippedTests.length}/${totalTests}\x1b[0m`);
            skippedTests.forEach((test, index) =>
                console.warn(`\x1b[33m${index + 1}. ${test.name}: ${test.reason}\x1b[0m`)
            );
        }

        return { successCount, failedTests, skippedTests };
    }

    /**
     * @param {FixtureHarnessConfig} harness
     * @param {FixtureSuiteConfig} suite
     * @param {FailTestCase|PassTestCase} test
     * @param {boolean} isFailTest
     */
    async runFixtureCase(harness, suite, test, isFailTest) {
        const subfolder = isFailTest ? "fail_data" : "pass_data";
        const folderPath = `${suite.srcFolder}/${subfolder}/${test.folderName}`;

        const scopeResult = deriveIssueScopeCheckIds(suite);
        if (!scopeResult.ok) {
            return {
                success: false,
                skip: true,
                reason: scopeResult.error
            };
        }

        /** @type {any} */
        let doc = null;

        try {
            const testFolder = await this.getTestFolder(folderPath);
            if (!testFolder) {
                return { success: false, skip: true, reason: `Test folder not found: ${folderPath}` };
            }

            const fileResult = await this.getInddFile(testFolder);
            if (!fileResult.success || !fileResult.data) {
                return { success: false, skip: true, reason: fileResult.reason };
            }
            const inddFile = fileResult.data;

            const documentResult = await this.loadDocument(inddFile);
            if (!documentResult.success || !documentResult.data) {
                return { success: false, skip: true, reason: documentResult.reason };
            }
            doc = documentResult.data;

            try {
                const raw = await harness.runChecker(this.app);
                const allIssues = harness.normalizeToIssues(raw);

                if (!Array.isArray(allIssues)) {
                    return {
                        success: false,
                        received: [`(invalid normalizeToIssues result) ${String(allIssues)}`],
                        expectedLabels: []
                    };
                }

                const issues = filterIssuesToScope(allIssues, scopeResult.scope);

                if (isFailTest) {
                    const exp = /** @type {FailTestCase} */ (test).expected;
                    const invalid =
                        !Array.isArray(exp) ||
                        exp.some(
                            (e) =>
                                !e ||
                                typeof e !== "object" ||
                                typeof e.checkId !== "string" ||
                                e.checkId.length === 0 ||
                                typeof e.type !== "string" ||
                                e.type.length === 0
                        );
                    if (invalid) {
                        return {
                            success: false,
                            received: [
                                "Fixture failTests[].expected: each row must include non-empty checkId and type (error|warning|info)."
                            ],
                            expectedLabels: []
                        };
                    }
                }

                const expectedLabels =
                    isFailTest && "expected" in test && Array.isArray(test.expected)
                        ? test.expected.map((e) => `${e.checkId} [${e.type}]`)
                        : [];

                if (isFailTest) {
                    const exp = /** @type {FailTestCase} */ (test).expected;
                    const ok = multisetMatchesIssues(issues, exp);
                    if (ok) {
                        return { success: true };
                    }
                    return {
                        success: false,
                        expectedLabels,
                        received: issues.map((i) => formatIssueForLog(i))
                    };
                }

                if (issues.length === 0) {
                    return { success: true };
                }
                return {
                    success: false,
                    received: issues.map((i) => formatIssueForLog(i))
                };
            } catch (error) {
                return {
                    success: false,
                    received: [`Error while running checks: ${String(error)}`],
                    expectedLabels: []
                };
            }
        } catch (error) {
            return { success: false, skip: true, reason: `Error in test '${test.folderName}': ${String(error)}` };
        } finally {
            if (doc) {
                const closeResult = await this.closeDocument(doc);
                if (!closeResult.success) {
                    console.error("Fixture test: close document failed", closeResult.reason);
                }
            }
        }
    }

    /** @param {string} relativePath */
    async getTestFolder(relativePath) {
        const normalizedPath = normalizeFullRelativePath(relativePath);

        /** @type {{ label: string; folder: any }[]} */
        const roots = [];

        try {
            const savedRoot = await getSavedFixtureRootFolder(this.fsProvider);
            if (savedRoot) {
                roots.push({ label: "saved fixture root (folder containing unit/)", folder: savedRoot });
            }
        } catch (err) {
            console.warn("Fixture tests: could not resolve saved fixture root token", err);
        }

        try {
            const dataFolder = await this.fsProvider.getDataFolder();
            if (dataFolder) {
                roots.push({ label: "plugin data (getDataFolder)", folder: dataFolder });
            }
        } catch (err) {
            console.warn("Fixture tests: getDataFolder() failed", err);
        }

        try {
            if (typeof this.fsProvider.getPluginFolder === "function") {
                const pluginFolder = await this.fsProvider.getPluginFolder();
                if (pluginFolder) {
                    roots.push({ label: "plugin install (getPluginFolder)", folder: pluginFolder });
                }
            }
        } catch (err) {
            console.warn("Fixture tests: getPluginFolder() failed", err);
        }

        for (const { label, folder } of roots) {
            const direct = await tryDirectFolderEntry(folder, normalizedPath);
            if (direct) {
                return direct;
            }
            const walked = await tryWalkToFolder(folder, normalizedPath);
            if (walked) {
                return walked;
            }
        }

        if (!this._fixtureRootHintLogged) {
            this._fixtureRootHintLogged = true;
            console.warn(
                "Fixture tests: could not resolve path `" +
                    normalizedPath +
                    "`. Tried: " +
                    roots.map((r) => r.label).join(", ") +
                    ". Use “Choose fixture folder…” in the panel (parent of `unit/`), copy `unit/` into plugin data or next to the plugin manifest, then reload."
            );
            for (const { label, folder } of roots) {
                try {
                    const entries = await folder.getEntries();
                    const names = entries.map((e) => e.name).slice(0, 40);
                    console.warn(`Fixture tests: first entries under ${label}:`, names.join(", ") || "(empty)");
                } catch (e) {
                    console.warn(`Fixture tests: could not list ${label}`, e);
                }
            }
        }

        console.error(`Test folder not found or is not a folder: ${relativePath}`);
        return null;
    }

    /** @param {any} folder */
    async getInddFile(folder) {
        try {
            const entries = await folder.getEntries();
            const inddFiles = entries.filter((entry) => entry.isFile && entry.name.endsWith(".indd"));

            if (inddFiles.length === 0) {
                return {
                    success: false,
                    reason: `No .indd files found in folder: ${folder.nativePath}`
                };
            }

            if (inddFiles.length > 1) {
                return {
                    success: false,
                    reason: `Multiple .indd files found in folder: ${folder.nativePath}`
                };
            }

            return { success: true, data: inddFiles[0] };
        } catch (error) {
            return { success: false, reason: `Error finding .indd file: ${String(error)}` };
        }
    }

    /** @param {any} file */
    async loadDocument(file) {
        const { UserInteractionLevels } = getIndesignScriptingConstants();
        try {
            if (!this.app || !this.app.scriptPreferences) {
                return { success: false, reason: "InDesign app or scriptPreferences is undefined." };
            }

            if (UserInteractionLevels && UserInteractionLevels.NEVER_INTERACT != null) {
                this.app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
            }

            let doc;
            try {
                doc = this.app.open(file);
            } catch (openError) {
                return { success: false, reason: `Error opening document: ${String(openError)}` };
            }

            if (!doc) {
                return { success: false, reason: `Failed to open document: ${file.name}` };
            }

            return { success: true, data: doc };
        } catch (error) {
            return { success: false, reason: `Unexpected error: ${String(error)}` };
        } finally {
            if (this.app?.scriptPreferences) {
                const u = getIndesignScriptingConstants().UserInteractionLevels;
                if (u && u.INTERACT_WITH_ALL != null) {
                    this.app.scriptPreferences.userInteractionLevel = u.INTERACT_WITH_ALL;
                }
            }
        }
    }

    /** @param {any} doc */
    async closeDocument(doc) {
        const { SaveOptions } = getIndesignScriptingConstants();
        try {
            if (!doc || !doc.close) {
                return { success: false, reason: "Document is not valid or already closed." };
            }
            const saveOpt = SaveOptions && SaveOptions.NO != null ? SaveOptions.NO : undefined;
            if (saveOpt !== undefined) {
                doc.close(saveOpt);
            } else {
                doc.close();
            }
            return { success: true };
        } catch (error) {
            return { success: false, reason: `Error closing document: ${error && error.message ? error.message : String(error)}` };
        }
    }
}

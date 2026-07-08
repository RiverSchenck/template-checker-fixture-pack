import { HYPHENATION_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/** @type {import("../testConfig.js").FixtureSuiteConfig} */
export const hyphenationTestConfig = {
    name: "Hyphenation Checks",
    srcFolder: "unit/hyphenation_check",
    failTests: [
        {
            folderName: "Hyph style inheritance",
            expected: expectIssues(HYPHENATION_CHECK_ID, 1, "warning")
        },
        {
            folderName: "Inherited Hyphenation",
            expected: expectIssues(HYPHENATION_CHECK_ID, 3, "warning")
        },
        {
            folderName: "Test-Basic-File-Template w HYP",
            expected: expectIssues(HYPHENATION_CHECK_ID, 1, "warning")
        },
        {
            folderName: "The Harbour club_amsterdam-zuid_ENG map",
            expected: expectIssues(HYPHENATION_CHECK_ID, 7, "warning")
        }
    ],
    passTests: [
        { folderName: "Blank" },
        { folderName: "Flyer_TextHeavy4 Folder margin only" },
        { folderName: "Image Transformation Folder" },
        { folderName: "No Hyph" },
        { folderName: "Test-Basic-File-Template Folder" }
    ]
};

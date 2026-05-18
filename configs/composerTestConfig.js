import { COMPOSER_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/** @type {import("../testConfig.js").FixtureSuiteConfig} */
export const composerTestConfig = {
    name: "Composer Checks",
    srcFolder: "unit/composer_check",
    failTests: [
        {
            folderName: "1023_SEMCO_OTHER_3984112_Overview_FS_TEMP_RES_PRINT",
            expected: expectIssues(COMPOSER_CHECK_ID, 6, "warning")
        },
        {
            folderName: "composer test",
            expected: expectIssues(COMPOSER_CHECK_ID, 1, "warning")
        },
        {
            folderName: "composers",
            expected: expectIssues(COMPOSER_CHECK_ID, 2, "warning")
        },
        {
            folderName: "The Harbour club_amsterdam-zuid_ENG map",
            expected: expectIssues(COMPOSER_CHECK_ID, 9, "warning")
        }
    ],
    passTests: [
        { folderName: "Blank" },
        { folderName: "Harbour Club Fixed Folder" },
        { folderName: "Image Transformation Folder" },
        { folderName: "SEMCO1 Fixed" }
    ]
};

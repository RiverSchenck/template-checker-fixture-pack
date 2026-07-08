import { KERNING_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/** @type {import("../testConfig.js").FixtureSuiteConfig} */
export const parKerningTestConfig = {
    name: "Paragraph kerning checks",
    srcFolder: "unit/par_kerning_check",
    failTests: [
        { folderName: "Hyph style inheritance", expected: expectIssues(KERNING_CHECK_ID, 1, "error") },
        { folderName: "Inherited Hyphenation", expected: expectIssues(KERNING_CHECK_ID, 3, "error") },
        {
            folderName: "Test-Basic-File-Template w HYP",
            expected: expectIssues(KERNING_CHECK_ID, 2, "error")
        },
        {
            folderName: "The Harbour club_amsterdam-zuid_ENG map",
            expected: expectIssues(KERNING_CHECK_ID, 5, "error")
        }
    ],
    passTests: [
        { folderName: "1023_SEMCO_OTHER_3984112_Overview_FS_TEMP_RES_PRINT" },
        { folderName: "Blank" },
        { folderName: "Image Transformation Folder" },
        { folderName: "VOITH SINGLE" }
    ]
};

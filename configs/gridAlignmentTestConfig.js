import { GRID_ALIGNMENT_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/** @type {import("../testConfig.js").FixtureSuiteConfig} */
export const gridAlignmentTestConfig = {
    name: "Grid Alignment Checks",
    srcFolder: "unit/grid_alignment_check",
    failTests: [
        { folderName: "1 grid alignment", expected: expectIssues(GRID_ALIGNMENT_CHECK_ID, 1, "error") },
        { folderName: "2 grid alignment", expected: expectIssues(GRID_ALIGNMENT_CHECK_ID, 2, "error") },
        {
            folderName: "The Harbour club_amsterdam-zuid_ENG Folder",
            expected: expectIssues(GRID_ALIGNMENT_CHECK_ID, 4, "error")
        },
        { folderName: "3 grid alignment", expected: expectIssues(GRID_ALIGNMENT_CHECK_ID, 3, "error") }
    ],
    passTests: [
        { folderName: "Blank" },
        { folderName: "1023_SEMCO_OTHER_3984112_Overview_FS_TEMP_RES_PRINT" },
        { folderName: "Image Transformation Folder" },
        { folderName: "The Harbour club_amsterdam-zuid_ENG map" }
    ]
};

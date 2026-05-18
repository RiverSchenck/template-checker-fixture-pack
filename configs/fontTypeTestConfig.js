import { FONT_TYPE_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const fontTypeTestConfig = {
  name: "Font Type Checks",
  srcFolder: "unit/font_type_check",
  failTests: [
    {
      folderName: "1023_SEMCO_OTHER_3984112_Overview_FS_TEMP_RES_PRINT",
      expected: expectIssues(FONT_TYPE_CHECK_ID, 1, "error"),
    },
    {
      folderName: "TTC Font Template",
      expected: expectIssues(FONT_TYPE_CHECK_ID, 1, "error"),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Mixed paragraph styles" },
    { folderName: "Test-Basic-File-Template w HYP" },
    { folderName: "The Harbour club_amsterdam-zuid_ENG map" },
    { folderName: "VOITH_7 overrides" },
  ],
};

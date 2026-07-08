import { VARIABLE_FONT_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const variableFontTestConfig = {
  name: "Variable Font Checks",
  srcFolder: "unit/variable_font_check",
  failTests: [
    {
      folderName: "2 var fonts",
      expected: expectIssues(VARIABLE_FONT_CHECK_ID, 2, "error"),
    },
    {
      folderName: "3 variable fonts with multiple weights Folder",
      expected: expectIssues(VARIABLE_FONT_CHECK_ID, 3, "error"),
    },
    {
      folderName: "4 var fonts Folder",
      expected: expectIssues(VARIABLE_FONT_CHECK_ID, 4, "error"),
    },
    {
      folderName: "Variable Font Example",
      expected: expectIssues(VARIABLE_FONT_CHECK_ID, 1, "error"),
    },
  ],
  passTests: [
    { folderName: "1023_SEMCO_OTHER_3984112_Overview_FS_TEMP_RES_PRINT" },
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "VOITH SINGLE" },
  ],
};

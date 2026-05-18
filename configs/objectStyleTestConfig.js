import { OBJECT_STYLE_APPLIED_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const objectStyleTestConfig = {
  name: "Object Style Checks",
  srcFolder: "unit/object_style_check",
  failTests: [
    {
      folderName: "2 obj style Folder",
      expected: expectIssues(OBJECT_STYLE_APPLIED_CHECK_ID, 2, "error"),
    },
    {
      folderName: "3 obj styles",
      expected: expectIssues(OBJECT_STYLE_APPLIED_CHECK_ID, 3, "error"),
    },
    {
      folderName: "1023_SEMCO_OTHER_3984112_Overview_FS_TEMP_RES_PRINT Folder",
      expected: expectIssues(OBJECT_STYLE_APPLIED_CHECK_ID, 3, "error"),
    },
    {
      folderName: "The Harbour club_amsterdam-zuid_ENG Folder",
      expected: expectIssues(OBJECT_STYLE_APPLIED_CHECK_ID, 3, "error"),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "1023_SEMCO_OTHER_3984112_Overview_FS_TEMP_RES_PRINT" },
    { folderName: "The Harbour club_amsterdam-zuid_ENG map" },
  ],
};

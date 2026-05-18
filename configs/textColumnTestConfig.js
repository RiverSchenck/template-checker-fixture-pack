import { TEXT_COLUMNS_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const textColumnTestConfig = {
  name: "Text Column Checks",
  srcFolder: "unit/text_columns_check",
  failTests: [
    {
      folderName: "1 column",
      expected: expectIssues(TEXT_COLUMNS_CHECK_ID, 1, "error"),
    },
    {
      folderName: "2 column error",
      expected: expectIssues(TEXT_COLUMNS_CHECK_ID, 2, "error"),
    },
    {
      folderName: "4 column",
      expected: expectIssues(TEXT_COLUMNS_CHECK_ID, 4, "error"),
    },
    {
      folderName: "columns Folder",
      expected: expectIssues(TEXT_COLUMNS_CHECK_ID, 3, "error"),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "The Harbour club_amsterdam-zuid_ENG map" },
    { folderName: "VOITH_7 overrides" },
  ],
};

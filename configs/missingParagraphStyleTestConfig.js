import { MISSING_PARAGRAPH_STYLE_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const missingParagraphStyleTestConfig = {
  name: "Missing paragraph style checks",
  srcFolder: "unit/par_check",
  failTests: [
    {
      folderName: "4_no_par_style",
      expected: expectIssues(MISSING_PARAGRAPH_STYLE_CHECK_ID, 4, "error"),
    },
    {
      folderName: "No Document Fonts folder",
      expected: expectIssues(MISSING_PARAGRAPH_STYLE_CHECK_ID, 3, "error"),
    },
    {
      folderName: "The Harbour club missing 1 style",
      expected: expectIssues(MISSING_PARAGRAPH_STYLE_CHECK_ID, 1, "error"),
    },
    {
      folderName: "Variable Font Example",
      expected: expectIssues(MISSING_PARAGRAPH_STYLE_CHECK_ID, 3, "error"),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "All_par_style" },
    { folderName: "Test-Basic-File_with_styles" },
    { folderName: "The Harbour club_amsterdam-zuid_ENG map" },
  ],
};

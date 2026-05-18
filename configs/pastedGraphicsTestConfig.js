import { PASTED_GRAPHIC_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const pastedGraphicsTestConfig = {
  name: "Pasted Graphic Checks",
  srcFolder: "unit/pasted_graphics_check",
  failTests: [
    {
      folderName: "A4 Template v1",
      expected: expectIssues(PASTED_GRAPHIC_CHECK_ID, 1, "error"),
    },
    {
      folderName: "Employer Brand_Pullup Banner_Design 1_ Folder",
      expected: expectIssues(PASTED_GRAPHIC_CHECK_ID, 4, "error"),
    },
    {
      folderName: "NewEmployeeFolder1",
      expected: expectIssues(PASTED_GRAPHIC_CHECK_ID, 1, "error"),
    },
    {
      folderName: "Tietoevry_General News_Template Folder2",
      expected: expectIssues(PASTED_GRAPHIC_CHECK_ID, 1, "error"),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "qr code and 1 missing image Folder" },
    { folderName: "VOITH SINGLE" },
  ],
};

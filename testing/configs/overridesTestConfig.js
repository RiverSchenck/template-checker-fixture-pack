import { PARAGRAPH_OVERRIDE_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const overridesTestConfig = {
  name: "Overrides Checks",
  srcFolder: "unit/overrides_check",
  failTests: [
    {
      folderName: "6 overrides",
      expected: expectIssues(PARAGRAPH_OVERRIDE_CHECK_ID, 3, "warning"),
    },
    {
      folderName: "has overrides",
      expected: expectIssues(PARAGRAPH_OVERRIDE_CHECK_ID, 1, "warning"),
    },
    {
      folderName: "VOITH_7 overrides",
      expected: expectIssues(PARAGRAPH_OVERRIDE_CHECK_ID, 7, "warning"),
    },
    {
      folderName: "with overrides",
      expected: expectIssues(PARAGRAPH_OVERRIDE_CHECK_ID, 9, "warning"),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "Flyer_TextHeavy4 Folder" },
    { folderName: "The Harbour club_amsterdam-zuid_ENG map" },
  ],
};

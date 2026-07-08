import { CHARACTER_KERNING_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const charKerningTestConfig = {
  name: "Character kerning checks",
  srcFolder: "unit/char_kerning_check",
  failTests: [
    {
      folderName: "Hyph style inheritance",
      expected: expectIssues(CHARACTER_KERNING_CHECK_ID, 2, "error"),
    },
    {
      folderName: "Inherited Hyphenation",
      expected: expectIssues(CHARACTER_KERNING_CHECK_ID, 1, "error"),
    },
    {
      folderName: "Test-Basic-File-Template w HYP",
      expected: expectIssues(CHARACTER_KERNING_CHECK_ID, 2, "error"),
    },
    {
      folderName: "The Harbour club_amsterdam-zuid_ENG map",
      expected: expectIssues(CHARACTER_KERNING_CHECK_ID, 1, "error"),
    },
  ],
  passTests: [
    { folderName: "1023_SEMCO_OTHER_3984112_Overview_FS_TEMP_RES_PRINT" },
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "VOITH SINGLE" },
  ],
};

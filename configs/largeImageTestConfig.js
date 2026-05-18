import { LARGE_IMAGE_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const largeImageTestConfig = {
  name: "Large Image Checks",
  srcFolder: "unit/large_image_check",
  failTests: [
    {
      folderName: "2 large images 1 small with same name Folder",
      expected: expectIssues(LARGE_IMAGE_CHECK_ID, 3, "info"),
    },
    {
      folderName: "1023_SEMCO_OTHER_3984112_Overview_FS_TEMP_RES_PRINT",
      expected: expectIssues(LARGE_IMAGE_CHECK_ID, 1, "info"),
    },
    {
      folderName: "Carpeta TEMPLATE_1SLOGAN_OFFLINE_380260MM",
      expected: expectIssues(LARGE_IMAGE_CHECK_ID, 3, "info"),
    },
    {
      folderName: "Large image used",
      expected: expectIssues(LARGE_IMAGE_CHECK_ID, 1, "info"),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "Employer Brand_Pullup Banner_Design 1_ Folder" },
    { folderName: "VOITH SINGLE" },
  ],
};

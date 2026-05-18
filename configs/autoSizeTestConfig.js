import { AUTO_SIZE_TEXT_FRAME_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const autoSizeTestConfig = {
  name: "Auto Size Checks",
  srcFolder: "unit/auto_size_textbox_check",
  failTests: [
    {
      folderName: "4 auto size error",
      expected: expectIssues(AUTO_SIZE_TEXT_FRAME_CHECK_ID, 5, "error"),
    },
    {
      folderName: "Auto Size Middle",
      expected: expectIssues(AUTO_SIZE_TEXT_FRAME_CHECK_ID, 5, "error"),
    },
    {
      folderName: "Auto Size Text Boxes",
      expected: expectIssues(AUTO_SIZE_TEXT_FRAME_CHECK_ID, 1, "error"),
    },
    {
      folderName: "H&W auto-size corners Folder",
      expected: expectIssues(AUTO_SIZE_TEXT_FRAME_CHECK_ID, 4, "error"),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "Auto Size Text box- Height Only top Down" },
    { folderName: "lots of auto size Folder" },
  ],
};

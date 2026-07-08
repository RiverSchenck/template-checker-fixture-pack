import { LINKED_TEXT_FRAME_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const linkedFrameTestConfig = {
  name: "Linked Frame Checks",
  srcFolder: "unit/linked_text_frame_check",
  failTests: [
    {
      folderName: "1 linked frame",
      expected: expectIssues(LINKED_TEXT_FRAME_CHECK_ID, 1, "error"),
    },
    {
      folderName: "2 linked",
      expected: expectIssues(LINKED_TEXT_FRAME_CHECK_ID, 1, "error"),
    },
    {
      folderName: "3 linked text boxes",
      expected: expectIssues(LINKED_TEXT_FRAME_CHECK_ID, 1, "error"),
    },
    {
      folderName: "5 linked frames",
      expected: expectIssues(LINKED_TEXT_FRAME_CHECK_ID, 2, "error"),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "Auto Size Text box- Height Only top Down" },
    { folderName: "lots of auto size Folder" },
  ],
};

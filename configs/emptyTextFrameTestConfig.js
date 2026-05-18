import {
  EMPTY_TEXT_FRAME_CHECK_ID,
} from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const emptyTextFrameTestConfig = {
  name: "Empty Text Frame Checks",
  srcFolder: "unit/empty_text_frame_check",
  failTests: [
    {
      folderName: "1 column",
      expected: expectIssues(
        EMPTY_TEXT_FRAME_CHECK_ID,
        1,
        "info",
      ),
    },
    {
      folderName: "2 column error",
      expected: expectIssues(
        EMPTY_TEXT_FRAME_CHECK_ID,
        2,
        "info",
      ),
    },
    {
      folderName: "4 column",
      expected: expectIssues(
        EMPTY_TEXT_FRAME_CHECK_ID,
        4,
        "info",
      ),
    },
    {
      folderName: "columns Folder",
      expected: expectIssues(
        EMPTY_TEXT_FRAME_CHECK_ID,
        3,
        "info",
      ),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "The Harbour club_amsterdam-zuid_ENG map" },
    { folderName: "VOITH_7 overrides" },
  ],
};

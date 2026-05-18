import {
  EMBEDDED_IMAGE_CHECK_ID,
} from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const embeddedImageTestConfig = {
  name: "Embedded Image Checks",
  srcFolder: "unit/embedded_image_check",
  failTests: [
    {
      folderName: "3 embedded Folder",
      expected: expectIssues(
        EMBEDDED_IMAGE_CHECK_ID,
        3,
        "error",
      ),
    },
    {
      folderName: "3 embedded images",
      expected: expectIssues(
        EMBEDDED_IMAGE_CHECK_ID,
        3,
        "error",
      ),
    },
    {
      folderName: "4 embedded",
      expected: expectIssues(
        EMBEDDED_IMAGE_CHECK_ID,
        4,
        "error",
      ),
    },
    {
      folderName: "qr code and 1 missing image Folder",
      expected: expectIssues(
        EMBEDDED_IMAGE_CHECK_ID,
        1,
        "error",
      ),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "Employer Brand_Pullup Banner_Design 1_ Folder" },
    { folderName: "VOITH SINGLE" },
  ],
};

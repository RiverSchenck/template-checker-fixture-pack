import { PLACED_IMAGE_TRANSFORMATION_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const placedImageTransformationsTestConfig = {
  name: "Placed image transformation checks",
  srcFolder: "unit/placed_image_transformations_check",
  failTests: [
    {
      folderName: "4 auto size error",
      expected: [
        ...expectIssues(PLACED_IMAGE_TRANSFORMATION_CHECK_ID, 1, "error"),
      ],
    },
    {
      folderName: "Auto Size Middle",
      expected: [
        ...expectIssues(PLACED_IMAGE_TRANSFORMATION_CHECK_ID, 1, "warning"),
        ...expectIssues(PLACED_IMAGE_TRANSFORMATION_CHECK_ID, 1, "error"),
      ],
    },
    {
      folderName: "Auto Size Text Boxes",
      expected: expectIssues(
        PLACED_IMAGE_TRANSFORMATION_CHECK_ID,
        1,
        "warning",
      ),
    },
    {
      folderName: "H&W auto-size corners Folder",
      expected: expectIssues(
        PLACED_IMAGE_TRANSFORMATION_CHECK_ID,
        2,
        "warning",
      ),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "Auto Size Text box- Height Only top Down" },
    { folderName: "lots of auto size Folder" },
  ],
};

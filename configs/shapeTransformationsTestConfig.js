import { SHAPE_TRANSFORMATION_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * Same folder names and expectations as `textFrameTransformationsTestConfig.js`, under
 * `unit/shape_transformation_check/` (duplicate the same `.indd` trees there).
 *
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const shapeTransformationsTestConfig = {
  name: "Shape transformation checks",
  srcFolder: "unit/shape_transformations_check",
  failTests: [
    {
      folderName: "4 auto size error",
      expected: [...expectIssues(SHAPE_TRANSFORMATION_CHECK_ID, 1, "warning")],
    },
    {
      folderName: "Auto Size Middle",
      expected: [
        ...expectIssues(SHAPE_TRANSFORMATION_CHECK_ID, 1, "warning"),
        ...expectIssues(SHAPE_TRANSFORMATION_CHECK_ID, 1, "error"),
      ],
    },
    {
      folderName: "Auto Size Text Boxes",
      expected: expectIssues(SHAPE_TRANSFORMATION_CHECK_ID, 1, "warning"),
    },
    {
      folderName: "H&W auto-size corners Folder",
      expected: expectIssues(SHAPE_TRANSFORMATION_CHECK_ID, 2, "warning"),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Image Transformation Folder" },
    { folderName: "Auto Size Text box- Height Only top Down" },
    { folderName: "lots of auto size Folder" },
  ],
};

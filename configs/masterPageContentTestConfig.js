import { MASTER_PAGE_CONTENT_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const masterPageContentTestConfig = {
  name: "Master Page Checks",
  srcFolder: "unit/masterpage_check",
  failTests: [
    {
      folderName: "Container on masterpage",
      expected: expectIssues(MASTER_PAGE_CONTENT_CHECK_ID, 1, "error"),
    },
    {
      folderName: "Line on masterpage",
      expected: expectIssues(MASTER_PAGE_CONTENT_CHECK_ID, 1, "error"),
    },
    {
      folderName: "Master Page",
      expected: expectIssues(MASTER_PAGE_CONTENT_CHECK_ID, 1, "error"),
    },
    {
      folderName: "MasterPage with image",
      expected: expectIssues(MASTER_PAGE_CONTENT_CHECK_ID, 1, "error"),
    },
    {
      folderName: "A4 Template v1",
      expected: expectIssues(MASTER_PAGE_CONTENT_CHECK_ID, 3, "error"),
    },
  ],
  passTests: [
    { folderName: "Blank" },
    { folderName: "Embedded Image" },
    { folderName: "Employer Brand_Pullup Banner_Design 1" },
    { folderName: "Missing two fonts" },
  ],
};

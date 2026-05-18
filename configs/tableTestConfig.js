import { TABLE_CHECK_ID } from "../fixtureCheckIds.js";
import { expectIssues } from "../fixtureExpectations.js";

/**
 * @type {import("../testConfig.js").FixtureSuiteConfig}
 */
export const tableTestConfig = {
  name: "Table Checks",
  srcFolder: "unit/table_check",
  failTests: [
    {
      folderName: "2 tables",
      expected: expectIssues(TABLE_CHECK_ID, 1, "error"),
    },
    {
      folderName: "2 tables (table in table)",
      expected: expectIssues(TABLE_CHECK_ID, 1, "error"),
    },
    {
      folderName: "6 tables Folder",
      expected: expectIssues(TABLE_CHECK_ID, 6, "error"),
    },
    {
      folderName: "Table",
      expected: expectIssues(TABLE_CHECK_ID, 1, "error"),
    },
  ],
  passTests: [
    { folderName: "All_par_style" },
    { folderName: "Blank" },
    { folderName: "Test-Basic-File_with_styles" },
    { folderName: "The Harbour club_amsterdam-zuid_ENG map" },
  ],
};

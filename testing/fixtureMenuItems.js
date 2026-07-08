import { autoSizeTestConfig } from "./configs/autoSizeTestConfig.js";
import { charKerningTestConfig } from "./configs/charKerningTestConfig.js";
import { composerTestConfig } from "./configs/composerTestConfig.js";
import { embeddedImageTestConfig } from "./configs/embeddedImageTestConfig.js";
import { pastedGraphicsTestConfig } from "./configs/pastedGraphicsTestConfig.js";
import { largeImageTestConfig } from "./configs/largeImageTestConfig.js";
import { imageFrameTransformationsTestConfig } from "./configs/imageFrameTransformationsTestConfig.js";
import { placedImageTransformationsTestConfig } from "./configs/placedImageTransformationsTestConfig.js";
import { textFrameTransformationsTestConfig } from "./configs/textFrameTransformationsTestConfig.js";
import { shapeTransformationsTestConfig } from "./configs/shapeTransformationsTestConfig.js";
import { emptyTextFrameTestConfig } from "./configs/emptyTextFrameTestConfig.js";
import { fillTintTestConfig } from "./configs/fillTintTestConfig.js";
import { fontTypeTestConfig } from "./configs/fontTypeTestConfig.js";
import { variableFontTestConfig } from "./configs/variableFontTestConfig.js";
import { gridAlignmentTestConfig } from "./configs/gridAlignmentTestConfig.js";
import { hyphenationTestConfig } from "./configs/hyphenationTestConfig.js";
import { linkedFrameTestConfig } from "./configs/linkedFrameTestConfig.js";
import { masterPageContentTestConfig } from "./configs/masterPageContentTestConfig.js";
import { missingParagraphStyleTestConfig } from "./configs/missingParagraphStyleTestConfig.js";
import { objectStyleTestConfig } from "./configs/objectStyleTestConfig.js";
import { overridesTestConfig } from "./configs/overridesTestConfig.js";
import { parKerningTestConfig } from "./configs/parKerningTestConfig.js";
import { tableTestConfig } from "./configs/tableTestConfig.js";
import { textColumnTestConfig } from "./configs/textColumnTestConfig.js";
import { textWrapTestConfig } from "./configs/textWrapTestConfig.js";
import {
  AUTO_SIZE_TEXT_FRAME_CHECK_ID,
  CHARACTER_KERNING_CHECK_ID,
  COMPOSER_CHECK_ID,
  EMBEDDED_IMAGE_CHECK_ID,
  EMPTY_TEXT_FRAME_CHECK_ID,
  FILL_TINT_CHECK_ID,
  FONT_TYPE_CHECK_ID,
  GRID_ALIGNMENT_CHECK_ID,
  HYPHENATION_CHECK_ID,
  IMAGE_FRAME_TRANSFORMATION_CHECK_ID,
  KERNING_CHECK_ID,
  LARGE_IMAGE_CHECK_ID,
  LINKED_TEXT_FRAME_CHECK_ID,
  MASTER_PAGE_CONTENT_CHECK_ID,
  MISSING_PARAGRAPH_STYLE_CHECK_ID,
  OBJECT_STYLE_APPLIED_CHECK_ID,
  PARAGRAPH_OVERRIDE_CHECK_ID,
  PASTED_GRAPHIC_CHECK_ID,
  PLACED_IMAGE_TRANSFORMATION_CHECK_ID,
  SHAPE_TRANSFORMATION_CHECK_ID,
  TABLE_CHECK_ID,
  TEXT_COLUMNS_CHECK_ID,
  TEXT_FRAME_TRANSFORMATION_CHECK_ID,
  TEXT_WRAP_CHECK_ID,
  VARIABLE_FONT_CHECK_ID,
} from "./fixtureCheckIds.js";
import {
  chooseAndSaveFixtureRootFolder,
  clearSavedFixtureRootFolder,
} from "./fixtureRootPersistence.js";
import { FIXTURE_HARNESS } from "./fixtureHarness.config.js";
import { runFixtureTestSuite, runSingleSuite } from "./runFixtureTestSuite.js";

function logFixtureRootResult(r) {
  if (r.ok) {
    console.log("Fixture tests:", r.message);
  } else {
    console.warn("Fixture tests:", r.message);
  }
}

/**
 * @param {string} id
 * @param {string} label
 * @param {import("./testConfig.js").FixtureSuiteConfig} config
 * @param {string} errorLabel
 */
function suiteMenuItem(id, label, config, errorLabel) {
  return {
    id,
    label,
    oninvoke() {
      runSingleSuite(FIXTURE_HARNESS, config).catch((err) => {
        console.error(`Fixture tests: ${errorLabel} failed`, err);
      });
    },
  };
}

/** Per-suite entries grouped by checker category (order matches `CATEGORY_CONFIG`). */
const FIXTURE_SUITE_GROUPS = [
  [
    suiteMenuItem("fixtureHyphenation", HYPHENATION_CHECK_ID, hyphenationTestConfig, "hyphenation"),
    suiteMenuItem("fixtureComposer", COMPOSER_CHECK_ID, composerTestConfig, "composer"),
    suiteMenuItem("fixtureKerning", KERNING_CHECK_ID, parKerningTestConfig, "paragraph kerning"),
    suiteMenuItem("fixtureGridAlignment", GRID_ALIGNMENT_CHECK_ID, gridAlignmentTestConfig, "grid alignment"),
    suiteMenuItem("fixtureFillTint", FILL_TINT_CHECK_ID, fillTintTestConfig, "fill tint"),
  ],
  [
    suiteMenuItem("fixtureCharKerning", CHARACTER_KERNING_CHECK_ID, charKerningTestConfig, "character kerning"),
  ],
  [
    suiteMenuItem(
      "fixtureMissingParagraphStyle",
      MISSING_PARAGRAPH_STYLE_CHECK_ID,
      missingParagraphStyleTestConfig,
      "missing paragraph style",
    ),
    suiteMenuItem(
      "fixtureObjectStyle",
      OBJECT_STYLE_APPLIED_CHECK_ID,
      objectStyleTestConfig,
      "object style applied",
    ),
    suiteMenuItem(
      "fixtureParagraphOverrides",
      PARAGRAPH_OVERRIDE_CHECK_ID,
      overridesTestConfig,
      "paragraph overrides",
    ),
    suiteMenuItem("fixtureTextWrap", TEXT_WRAP_CHECK_ID, textWrapTestConfig, "text wrap"),
  ],
  [
    suiteMenuItem("fixtureAutoSize", AUTO_SIZE_TEXT_FRAME_CHECK_ID, autoSizeTestConfig, "auto-size text frame"),
    suiteMenuItem("fixtureTextColumns", TEXT_COLUMNS_CHECK_ID, textColumnTestConfig, "text columns"),
    suiteMenuItem("fixtureTable", TABLE_CHECK_ID, tableTestConfig, "table"),
    suiteMenuItem(
      "fixtureThreadedTextFrames",
      LINKED_TEXT_FRAME_CHECK_ID,
      linkedFrameTestConfig,
      "threaded / linked text frames",
    ),
    suiteMenuItem("fixtureEmptyTextFrame", EMPTY_TEXT_FRAME_CHECK_ID, emptyTextFrameTestConfig, "empty text frame"),
  ],
  [
    suiteMenuItem(
      "fixtureImageFrameTransformations",
      IMAGE_FRAME_TRANSFORMATION_CHECK_ID,
      imageFrameTransformationsTestConfig,
      "image frame transformations",
    ),
    suiteMenuItem(
      "fixturePlacedImageTransformations",
      PLACED_IMAGE_TRANSFORMATION_CHECK_ID,
      placedImageTransformationsTestConfig,
      "placed image transformations",
    ),
    suiteMenuItem(
      "fixtureTextFrameTransformations",
      TEXT_FRAME_TRANSFORMATION_CHECK_ID,
      textFrameTransformationsTestConfig,
      "text frame transformations",
    ),
    suiteMenuItem(
      "fixtureShapeTransformations",
      SHAPE_TRANSFORMATION_CHECK_ID,
      shapeTransformationsTestConfig,
      "shape transformations",
    ),
  ],
  [
    suiteMenuItem("fixtureEmbeddedImage", EMBEDDED_IMAGE_CHECK_ID, embeddedImageTestConfig, "embedded image"),
    suiteMenuItem("fixturePastedGraphics", PASTED_GRAPHIC_CHECK_ID, pastedGraphicsTestConfig, "pasted graphics"),
    suiteMenuItem("fixtureLargeImage", LARGE_IMAGE_CHECK_ID, largeImageTestConfig, "large image"),
  ],
  [
    suiteMenuItem("fixtureFontType", FONT_TYPE_CHECK_ID, fontTypeTestConfig, "font type"),
    suiteMenuItem("fixtureVariableFont", VARIABLE_FONT_CHECK_ID, variableFontTestConfig, "variable font"),
  ],
  [
    suiteMenuItem(
      "fixtureMasterPageContent",
      MASTER_PAGE_CONTENT_CHECK_ID,
      masterPageContentTestConfig,
      "master page content",
    ),
  ],
];

/** Flat list of per-suite entries (order matches `FIXTURE_SUITE_GROUPS`). */
const FIXTURE_SUITE_ENTRIES = FIXTURE_SUITE_GROUPS.flat();

/**
 * Panel flyout menu entries for fixture suites and fixture root helpers.
 * Each entry is `{ id, label, oninvoke }` for the default panel controller.
 * Per-suite labels use each rule’s `checkId`.
 *
 * @type {{ id: string; label: string; oninvoke: () => void }[]}
 */
export const fixtureMenuItems = [
  {
    id: "fixtureAll",
    label: "All fixture tests",
    oninvoke() {
      runFixtureTestSuite().catch((err) => {
        console.error("Fixture tests: run failed", err);
      });
    },
  },
  ...FIXTURE_SUITE_ENTRIES,
  {
    id: "chooseFixtureRoot",
    label: "Choose fixture folder (parent of unit/)...",
    oninvoke() {
      chooseAndSaveFixtureRootFolder().then(logFixtureRootResult);
    },
  },
  {
    id: "clearFixtureRoot",
    label: "Clear saved fixture folder",
    oninvoke() {
      clearSavedFixtureRootFolder();
      console.log(
        "Fixture tests: Cleared saved fixture root. Next run uses plugin data, then plugin install.",
      );
    },
  },
];

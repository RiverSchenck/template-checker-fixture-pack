/**
 * Full fixture harness for this plugin: partner checker wiring + host suites.
 * Partners: edit only [`./partner/binding.js`](./partner/binding.js).
 * @see ./PARTNER.md
 */

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
import { partnerHarnessBindings } from "./partner/binding.js";

/**
 * @type {import("./testConfig.js").FixtureHarnessConfig}
 */
export const FIXTURE_HARNESS = {
    ...partnerHarnessBindings,
    suites: [
        hyphenationTestConfig,
        composerTestConfig,
        missingParagraphStyleTestConfig,
        objectStyleTestConfig,
        overridesTestConfig,
        parKerningTestConfig,
        charKerningTestConfig,
        fontTypeTestConfig,
        variableFontTestConfig,
        gridAlignmentTestConfig,
        fillTintTestConfig,
        autoSizeTestConfig,
        textColumnTestConfig,
        tableTestConfig,
        linkedFrameTestConfig,
        textWrapTestConfig,
        masterPageContentTestConfig,
        emptyTextFrameTestConfig,
        embeddedImageTestConfig,
        pastedGraphicsTestConfig,
        largeImageTestConfig,
        imageFrameTransformationsTestConfig,
        placedImageTransformationsTestConfig,
        textFrameTransformationsTestConfig,
        shapeTransformationsTestConfig
    ]
};

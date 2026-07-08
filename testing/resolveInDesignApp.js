/**
 * Resolves the InDesign Application from `require("indesign")`.
 * Lives inside `testing/` so partners who receive **only** this folder do not need `checker/utils/`.
 * Keep in sync with `checker/utils/resolveInDesignApp.js` in the reference monorepo if both exist.
 */
export function resolveInDesignApp() {
  try {
    const mod = require("indesign");
    if (mod == null) {
      return null;
    }
    if (mod.app != null && typeof mod.app === "object") {
      return mod.app;
    }
    if (mod.default != null) {
      const d = mod.default;
      if (d.app != null && typeof d.app === "object") {
        return d.app;
      }
      if (typeof d.activeDocument !== "undefined") {
        return d;
      }
    }
    if (typeof mod.activeDocument !== "undefined") {
      return mod;
    }
    return null;
  } catch (err) {
    console.warn("Fixture harness: could not load indesign module", err);
    return null;
  }
}

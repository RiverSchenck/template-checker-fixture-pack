/** localStorage key for UXP persistent token (folder that directly contains `unit/`). */
export const FIXTURE_ROOT_TOKEN_STORAGE_KEY = "templateChecker.fixtureRootPersistentToken";

/**
 * @param {any} fsProvider `require("uxp").storage.localFileSystem`
 * @returns {Promise<any | null>} Folder entry or null
 */
export async function getSavedFixtureRootFolder(fsProvider) {
    if (typeof localStorage === "undefined") {
        return null;
    }
    const token = localStorage.getItem(FIXTURE_ROOT_TOKEN_STORAGE_KEY);
    if (!token || token.length === 0) {
        return null;
    }
    try {
        const entry = await fsProvider.getEntryForPersistentToken(token);
        if (entry && entry.isFolder) {
            return entry;
        }
    } catch {
        /* token revoked, moved, or expired */
    }
    return null;
}

/**
 * Opens a folder picker. Save the folder that **contains** your `unit` directory
 * (i.e. parent of `unit`, not the `unit` folder itself).
 *
 * @returns {Promise<{ ok: boolean; message: string }>}
 */
export async function chooseAndSaveFixtureRootFolder() {
    const fsProvider = require("uxp").storage.localFileSystem;
    const folder = await fsProvider.getFolder();
    if (!folder) {
        return { ok: false, message: "No folder selected." };
    }
    try {
        const hasUnit = await folder.getEntry("unit");
        if (!hasUnit || !hasUnit.isFolder) {
            return {
                ok: false,
                message:
                    "That folder must contain a `unit` subfolder. Pick the parent of `unit`, then try again."
            };
        }
    } catch {
        return {
            ok: false,
            message:
                "That folder must contain a `unit` subfolder. Pick the parent of `unit`, then try again."
        };
    }

    const token = await fsProvider.createPersistentToken(folder);
    if (typeof localStorage !== "undefined") {
        localStorage.setItem(FIXTURE_ROOT_TOKEN_STORAGE_KEY, token);
    }

    const label = folder.nativePath || folder.name || "folder";
    return {
        ok: true,
        message: `Fixture root saved (${label}). Run fixture tests again.`
    };
}

/** Remove saved fixture root so only plugin data / install are used. */
export function clearSavedFixtureRootFolder() {
    if (typeof localStorage !== "undefined") {
        localStorage.removeItem(FIXTURE_ROOT_TOKEN_STORAGE_KEY);
    }
}

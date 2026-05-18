# Fixture Contract Test Pack

This `testing/` folder lets you run our `.indd` fixture tests against your checker. It opens fixture documents, runs your code, normalizes your results, and compares them with the expected rows in `configs/`.

You should only need to edit `partner/binding.js` and wire the runner into your plugin entrypoint.

## 1. Add The Folder

Copy this folder into your repo.

Keep the harness imports inside `testing/`. The only file that should import your app code is `partner/binding.js`.

## 2. Wire Your Checker

Start from `partner/binding.example.js`, then update `partner/binding.js`:

```js
export const partnerHarnessBindings = {
  runChecker: (app) => runYourChecker(app),
  normalizeToIssues: (raw) => convertYourResultToIssueRows(raw),
};
```

`runChecker(app)` receives the InDesign Application. The harness opens each fixture first, so the fixture is available as `app.activeDocument`.

`normalizeToIssues(raw)` receives whatever `runChecker` returned. Return a plain array:

```js
[{ checkId: "paragraph-style-hyphenation", type: "error" }];
```

Use these `checkId` values (same set as the comment on `partner/binding.js` in this repo). In this repo they are centralized in [`fixtureCheckIds.js`](../fixtureCheckIds.js); keep your copy aligned with whatever `checkId` strings your checker emits.

- `paragraph-style-hyphenation`
- `paragraph-style-composer`
- `paragraph-style-kerning`
- `character-style-kerning`
- `paragraph-style-grid-alignment`
- `paragraph-style-fill-tint`
- `formatting-missing-paragraph-style`
- `formatting-object-style-applied`
- `formatting-paragraph-overrides`
- `text-frame-auto-size`
- `text-frame-text-columns`
- `text-frame-table`
- `text-frame-linked-frame`
- `formatting-text-wrap`
- `general-system-master-page-content`
- `text-frame-empty-text-frame`
- `font-type-disallowed`
- `font-variable-disallowed`
- `image-embedded-disallowed`
- `image-pasted-graphics`
- `image-large-link`
- `transformations-image-frame`
- `transformations-placed-image`
- `transformations-text-frame`
- `transformations-shape` (optional `transformKind` on each issue)

## 3. Add The Test UI

Use `partner/examples/example.index.jsx` as the entrypoint example for your `src/index.jsx`.

It shows three pieces to copy into your existing `entrypoints.setup`:

- `fixtureMenuItems` for panel flyout actions (grouped by checker category with `"-"` separators)
- `partner/examples/example.PanelController.jsx` for passing those items to UXP (or merge its logic into your panel controller)
- `runFixtureTestSuite()` for the `runFixtureTests` command

Pass `fixtureMenuItems` as `menuItems` on the panel object UXP receives from your controller. Add the `runFixtureTests` command under `commands` so InDesign can run the full fixture suite from the plugin command entrypoint.

### Flyout menu separators

`fixtureMenuItems` is an array of menu objects and the string `"-"` (category dividers). If you normalize `menuItems` before `entrypoints.setup`, **leave `"-"` as the string** — UXP treats that as a separator. Mapping a separator to `{ label: "-" }` omits `id` and fails at load with `'id' should be defined in menuItem object`.

In `invokeMenu`, skip separator entries when resolving handlers (see `example.PanelController.jsx`).

## 4. Update Your Manifest

Use `partner/examples/example.manifest.json` as the manifest example. Keep your existing plugin id, name, icons, and panel details, but make sure these pieces are present.

Add the `runFixtureTests` command to your `entrypoints` array. The `id` must match the command name in `entrypoints.setup`:

```json
{
  "type": "command",
  "id": "runFixtureTests",
  "label": {
    "default": "Run template fixture tests"
  }
}
```

The fixture folder picker also needs local file system permission under `requiredPermissions`:

```json
{
  "localFileSystem": "fullAccess"
}
```

## 5. Fixture Layout

When prompted, choose the **`Plugin_testing`** folder (parent of `unit/`). If you received the fixture-pack repository, use its `Plugin_testing/` directory at the repo root.

Each suite expects:

```text
unit/<suite>/fail_data/<case>/<file>.indd
unit/<suite>/pass_data/<case>/<file>.indd
```

Fail fixtures must produce the expected issues. Pass fixtures should produce no in-scope issues.

## Notes

- You normally do not need to edit `fixtureHarness.config.js`, `configs/`, or the runner.
- `fixtureMenuItems` includes all-suite, per-check suite entries (by category), choose fixture folder, and clear fixture folder actions.
- Runtime requirements: InDesign Application and UXP local file system access.

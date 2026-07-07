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
- `transformations-shape`

## 3. Add The Test UI

Use `partner/examples/example.index.jsx` as a template for **`src/index.jsx`** (import paths are relative to `src/`, not to the `examples/` folder).

Copy the imports and `entrypoints.setup` block into your entrypoint. It shows two pieces to wire up:

- `fixtureMenuItems` — flyout entries (`{ id, label, oninvoke }` only)
- your plugin’s default `PanelController` (Adobe React starter) — pass `menuItems: fixtureMenuItems` in the constructor

Wire it like the example: construct your panel controller with `menuItems: fixtureMenuItems`, then pass that controller instance to `entrypoints.setup` under `panels`. UXP reads `panel.menuItems` from the controller; you do not pass `fixtureMenuItems` directly into `entrypoints.setup`.

### Flyout menu shape

`fixtureMenuItems` is an array of `{ id, label, oninvoke }` — one per fixture suite, plus “All fixture tests” and fixture-folder helpers. Use the default panel controller unchanged; it maps entries for UXP and calls `oninvoke` from `invokeMenu(id)`.

## 4. Update Your Manifest

Use `partner/examples/example.manifest.json` as the manifest example. Keep your existing plugin id, name, icons, and panel entrypoint details.

The fixture folder picker needs local file system permission under `requiredPermissions`:

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
- `fixtureMenuItems` includes all-suite, per-check suite entries (category order preserved, no flyout separators), choose fixture folder, and clear fixture folder actions.
- Runtime requirements: InDesign Application and UXP local file system access.

# Template checker fixture pack

Contract tests for InDesign template checkers: `.indd` fixtures, expected issues, and a UXP harness.

**Version:** see [`FIXTURE_PACK_VERSION`](./FIXTURE_PACK_VERSION).

## Quick start

1. Copy this repository into your plugin at `src/checker/testing/` (or your equivalent path).
2. Follow [`partner/PARTNER.md`](./partner/PARTNER.md): implement `partner/binding.js`, wire the panel menu and manifest, and point the harness at your `unit/` fixture tree.

## Fixtures

This repository includes [`Plugin_testing/`](./Plugin_testing/) (parent of `unit/`). When running tests in InDesign, choose that folder in the fixture picker, or copy `Plugin_testing/` next to your plugin. Layout is described in `partner/PARTNER.md`.

Large linked images use **Git LFS** (`*.tiff`). After clone, run `git lfs pull` if fixtures are missing.

## Changelog

Releases are tagged `vX.Y.Z` on this repository and match `FIXTURE_PACK_VERSION`.

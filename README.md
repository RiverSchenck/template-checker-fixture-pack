# Template checker fixture pack

Contract tests for InDesign template checkers: `.indd` fixtures, expected issues, and a UXP harness.

**Version:** see [`FIXTURE_PACK_VERSION`](./testing/FIXTURE_PACK_VERSION).

## Quick start

1. Copy the [`testing/`](./testing/) folder into your plugin at `src/checker/testing/` (or your equivalent path).
2. Follow [`testing/partner/PARTNER.md`](./testing/partner/PARTNER.md): implement `partner/binding.js`, wire the panel menu and manifest, and point the harness at your `unit/` fixture tree.

## Fixtures

This repository includes [`Plugin_test_packages/`](./Plugin_test_packages/) (parent of `unit/`). When running tests in InDesign, choose that folder in the fixture picker, or copy `Plugin_test_packages/` next to your plugin. Layout is described in `testing/partner/PARTNER.md`.

## Changelog

Releases are tagged `vX.Y.Z` on this repository and match `FIXTURE_PACK_VERSION`.

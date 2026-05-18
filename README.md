# Template checker fixture pack

Contract tests for InDesign template checkers: `.indd` fixtures, expected issues, and a UXP harness.

**Version:** see [`FIXTURE_PACK_VERSION`](./FIXTURE_PACK_VERSION).

## Quick start

1. Copy this repository into your plugin at `src/checker/testing/` (or your equivalent path).
2. Follow [`partner/PARTNER.md`](./partner/PARTNER.md): implement `partner/binding.js`, wire the panel menu and manifest, and point the harness at your `unit/` fixture tree.

## Fixtures

This repository does **not** include `.indd` files. You need a **Plugin Testing** folder (parent of `unit/`) with the layout described in `PARTNER.md`.

## Changelog

Releases are tagged `vX.Y.Z` on this repository and match `FIXTURE_PACK_VERSION`.

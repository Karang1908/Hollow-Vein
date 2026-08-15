# HOLLOW VEIN — repo facts

A 3D multiplayer game. Read `GameDocs/` before writing code — the design is fully specified there.

## What it is

Two modes, one city, one story:

- **Story Mode** — 4-player role-locked co-op campaign, 12 instanced seasons, PvE
- **Open World** — persistent 16–24 player Meridian City, team-select (Crew vs Dominion), heists, heat, vehicle garage

**Reference targets:** *GTA V* structurally (open city, missions launched from world markers), *Jailbreak* (Badimo, Roblox) for construction, vehicle feel and heist design, Hollow Vein's own story narratively.

We match a design language. No Jailbreak assets, geometry, or map data enter this project.

## Docs — read in this order

| File | What |
|---|---|
| `GameDocs/hollow-vein-design-bible.md` | Map, 4 roles, mechanics, season-by-season, full story |
| `GameDocs/hollow-vein-art-direction.md` | **Read before any material/light/mesh code.** Palette, poly budgets, material recipes, lighting rig |
| `GameDocs/hollow-vein-open-world.md` | The two modes, districts, vehicles, heat, heists, living world |
| `GameDocs/hollow-vein-technical-architecture.md` | Stack, monorepo layout, authority model, build order |
| `GameDocs/season-00-master-timeline.md` | Difficulty rules, points, how to read season files |
| `GameDocs/season-*.md` | Per-season timelines, seasons 1–12 |
| `Season1/season-01-FULL-PRODUCTION-SPEC.md` | Season 1 implementation-ready: geometry, dialogue, cutscenes |

## Stack

TypeScript everywhere. Babylon.js + Havok · Colyseus · Vite · Zustand · React (screens only) · pnpm monorepo · **Electron** desktop wrapper.

**Electron is deliberate — do not "optimize" it to Tauri.** Tauri uses the OS webview (WKWebView on macOS, WebView2 on Windows): two graphics stacks, different WebGL2/WebGPU support, unpinnable macOS webview version. For a Babylon title that is a correctness problem, not a size one. Electron bundles one known Chromium so what we test is what ships. Rationale in the architecture doc §1.1.

Electron security: `contextIsolation` on, `nodeIntegration` off, narrow preload bridge, never load remote code into the renderer.

## Authority model

**The client owns where it is; the server owns what it earned.** Vehicle and on-foot position are client-simulated and server-validated (24 server-simulated Havok vehicles is not affordable and would feel worse). Damage, arrests, cash, Shards, heat, heist state, AI decisions and mission branching are strictly server-authoritative. Full table in the architecture doc §5.1.

## Art direction, in one line

Jailbreak's construction, Hollow Vein's palette. Low-poly, lighting-driven, poly budget spent almost entirely on vehicles; desaturated rain-slick night city where the Vein's black-gold is the only saturated colour in frame. Concrete numbers in the art direction doc — use them, don't reinvent them.

## Git conventions

- **Author:** `Karang1908 <70532241+Karang1908@users.noreply.github.com>` — set repo-locally. The global config (`karan190806`) is the pre-rename noreply and does **not** attribute to the account; don't let it leak in.
- **Commit file by file** — one file per commit. Owner's explicit preference.
- Remote: `https://github.com/Karang1908/Hollow-Vein.git`

## Status

Design docs complete. No code yet. Start at architecture doc §6 build order, step 1.

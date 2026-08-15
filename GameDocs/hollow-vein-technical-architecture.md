# HOLLOW VEIN — TECHNICAL ARCHITECTURE
### Stack, Project Layout, and Build Order for an All-Code (Claude Code) Build
### Revision 2 — Electron wrapper, two-mode structure, open-world layer

> **Changed in revision 2:** desktop wrapper is **Electron, not Tauri** (§1.1); the game is now **two modes** sharing one world (§1.2); the authority model splits by domain rather than being uniformly server-authoritative (§5); vehicles move up the build order (§6); an asset pipeline section exists at all (§4).

---

## 1. STACK DECISION

| Layer | Choice | Why |
|---|---|---|
| **Rendering engine** | **Babylon.js** | More batteries-included than Three.js — built-in physics integration (Havok), GUI system, asset containers, node materials, scene inspector. Fewer third-party libraries to hand-wire, which matters when an agent assembles the stack solo. |
| **Physics** | **Havok** (Babylon's official plugin) | Free, fast, first-party. Handles vehicle dynamics, ragdolls and destructible cover well. |
| **Multiplayer/netcode** | **Colyseus** (Node.js, TypeScript) | Room-based authoritative-server framework. Schema-driven state sync, predictable to read and write. Handles both the persistent city room and instanced mission rooms. |
| **Language** | **TypeScript**, client and server | Shared types via a shared package — catches whole classes of netcode bugs at compile time. |
| **Desktop wrapper** | **Electron** | See §1.1. |
| **Build tooling** | **Vite** | Fast, TypeScript-native, well-supported by Babylon and Electron. |
| **State management (client)** | **Zustand** | Lightweight, plain TypeScript, no React-scale boilerplate for game state. |
| **UI overlay** | Babylon GUI for in-world elements; **React** for menus, garage, map, lobby | HUD stays co-located with the render loop; screens stay easy to reason about. |

### 1.1 Why Electron, not Tauri

The original doc chose Tauri for binary size. That was the wrong trade for this project, and the reason is graphics, not size.

Tauri uses the operating system's webview — **WKWebView on macOS, WebView2 on Windows**. For a Babylon.js title that means two different graphics stacks, with different WebGL2 and WebGPU support levels, different shader compilation quirks, and a macOS webview whose version you cannot pin because it ships with the OS. A shader that compiles on your machine may not on a player's, and you would not find out until they filed the bug.

Electron bundles a known Chromium. One graphics stack, version-pinned, identical on Windows and macOS. What we test is what every player runs.

For a 3D game this is a correctness property, not a polish one. The ~100MB of extra binary is a real cost and an acceptable one.

**Consequences to respect:** never load remote code into the renderer; keep `contextIsolation` on and `nodeIntegration` off; talk to the main process over a narrow, explicit preload bridge. Electron's security model is only as good as its configuration.

### 1.2 Two modes, one world

The game presents two modes at the main menu, sharing one city, one asset set, one vehicle roster, and one story. Full design in `hollow-vein-open-world.md`.

| | **Story Mode** | **Open World** |
|---|---|---|
| Players | 4, role-locked | 16–24 per shard, team-selected |
| Structure | Instanced missions | Persistent city shard |
| Opposition | AI (the season files as written) | Player teams (Crew / Dominion) + AI Vein |
| Content | The 12 seasons | Heists, heat, garage, economy |
| Room type | `MissionRoom` and subclasses | `CityRoom` |

Story Mode completions write permanent world state that Open World reads. The modes are not independent products; they are two views of one city.

---

## 2. MONOREPO LAYOUT

```
hollow-vein/
├── packages/
│   ├── client/                  # Babylon.js game client (web + wrapped for desktop)
│   │   ├── src/
│   │   │   ├── core/            # Engine bootstrap, render loop, scene manager
│   │   │   ├── systems/         # See §3 — one folder per system
│   │   │   ├── entities/        # Player, enemy, vehicle, aircraft classes
│   │   │   ├── world/           # District streaming, procedural city generation, LOD
│   │   │   ├── modes/           # story/ and openworld/ — mode-specific orchestration
│   │   │   ├── ui/              # HUD (Babylon GUI) + React screens
│   │   │   ├── netcode/         # Prediction, reconciliation, room client
│   │   │   └── main.ts
│   │   └── vite.config.ts
│   │
│   ├── server/                  # Colyseus authoritative server
│   │   ├── src/
│   │   │   ├── rooms/           # See §5
│   │   │   ├── systems/         # Authoritative combat, AI, economy, heat
│   │   │   ├── sim/             # Infestation simulation, world-state ticker
│   │   │   ├── schema/          # Colyseus @Schema state definitions
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── shared/                  # Types, constants, protocol shared by client+server
│   │   ├── src/
│   │   │   ├── types/           # Entity, weapon, enemy, vehicle, mission defs
│   │   │   ├── constants/       # Speeds, damage tables, meter thresholds, payouts
│   │   │   └── protocol/        # Message/event contract
│   │   └── package.json
│   │
│   └── desktop/                 # Electron wrapper
│       ├── src/
│       │   ├── main.ts          # Main process — window, lifecycle, updater
│       │   └── preload.ts       # Narrow contextBridge surface
│       └── electron-builder.yml
│
├── tools/                       # Build scripts, asset pipeline, CI
├── GameDocs/                    # Design bible, season files, art direction, this doc
├── pnpm-workspace.yaml
└── package.json
```

**Why a monorepo:** client and server share entity types, damage math, economy constants and meter logic. Duplicating those across two repos is a guaranteed desync-bug generator. One shared package, imported by both, keeps them honest.

---

## 3. CLIENT `systems/`

Each system is self-contained with a small public interface, so it can be built and tested independently of the others:

```
systems/
├── movement/          # Walk/run/sprint/crouch/prone/climb/swim state machine
├── camera/            # Third-person follow, ADS, vehicle and aircraft cam modes
├── vehicles/          # Ground vehicle dynamics, driving input, nitro, drift, damage
├── aircraft/          # Simplified flight model, takeoff/landing
├── combat/            # Weapon handling, ballistics, hit detection, melee, throwables
├── ai/                # Enemy state machine (idle→suspicious→alert→combat→search)
├── heat/              # Open World only — Dominion wanted level, pursuit, arrest
├── interaction/       # Hacking, lockpicking, reviving, drilling, crafting
├── meters/            # Oxygen / light / noise / Vein-Exposure
├── inventory/         # Loadout, attachments, gear, carried-cash capacity
├── progression/       # Skill trees, XP, unlocks, respec, garage ownership
├── audio/             # Spatial audio, adaptive music layers
└── mission/           # Objective tracking, checkpoints, branching state
```

Each exposes a testable interface (e.g. `MovementSystem.update(dt, input): MovementState`) so unit tests run headlessly in CI without the render loop — important for an agent-driven workflow where nobody is watching the screen.

---

## 4. ASSET PIPELINE

The original doc had no answer here, and it was the project's single largest risk: a photoreal target requires an art department that an all-code build does not have.

Adopting Jailbreak's construction (see `hollow-vein-art-direction.md`) removes most of that risk, because that look is **numbers in code** rather than authored bitmaps — flat materials, chamfered boxes, colour blocking, one strong light.

| Asset class | Source |
|---|---|
| Background buildings, roads, street props | **Procedurally generated in code** from a district ruleset. Boxes, chamfers, palette colours, instanced props. |
| Landmarks (Bank, Workshop, PD HQ) | Hand-assembled from a modular kit, still code-placed |
| Vehicles | CC0 libraries (Quaternius, Kenney) to start; commissioned or hand-modelled later. The one place real authored detail belongs. |
| Characters | CC0 base meshes + **Mixamo** rigs and animation clips |
| Materials | Authored in code as PBR parameter sets — see art direction §2 |
| VFX | Babylon particle systems and node materials, code-authored |
| Audio | CC0 / licensed libraries; VO deferred to text-first, subtitles always |

Everything is glTF/GLB, loaded via Babylon `AssetContainer`, streamed per district.

---

## 5. SERVER `rooms/` AND THE AUTHORITY MODEL

```
rooms/
├── CityRoom.ts            # Open World — persistent shard, 16-24 players, team state,
│                          #   heat, heists, infestation sim, ambient AI
├── MissionRoom.ts         # Base — 4-player role-locked instanced session
├── HeistRoom.ts           # Season 1 — branching paths, container-crack event
├── BossRoom.ts            # Boss fights — phase state machine
├── SiegeRoom.ts           # Season 11 wave defense — spawn director, lane state
└── HubRoom.ts             # Talia's Workshop — loadout, garage, crafting, mission board
```

### 5.1 Authority splits by domain

The original doc said the server is authoritative for everything. With 24 players driving physics-simulated vehicles in a persistent world, that is not affordable on the target hosting — and it is not how driving games are built.

| Domain | Authority | Rationale |
|---|---|---|
| **Own vehicle physics** | Client, server-validated | Standard for driving games. You simulate your own car; the server sanity-checks position deltas, speed ceilings and teleports. Server-simulating 24 Havok vehicles at tick rate is not viable and would feel worse anyway. |
| **Player position on foot** | Client, server-validated | Same reasoning, tighter bounds. |
| **Damage & death** | **Server** | Cheat-critical. |
| **Arrests** | **Server** | PvP-critical: validates proximity, channel duration, interruption. |
| **Cash, Shards, payouts** | **Server** | The entire economy. Never trust a client here. |
| **Heat level & pursuit state** | **Server** | Drives AI spawning; must be consistent for everyone. |
| **Heist state machines** | **Server** | Step order, timers, cooldowns. |
| **Infestation simulation** | **Server** | One world state, ticked server-side. |
| **AI decisions** | **Server** | Consistent view for all clients. |
| **Mission branching** | **Server** | Narrative state must not be client-forgeable. |

Rule of thumb: **the client owns where it is; the server owns what it earned.**

### 5.2 PvP hardening (Open World only)
Human opponents mean the arrest, damage and payout paths need server validation plus rate limiting. Story Mode does not carry this burden, which is one more reason the two modes are separate room types rather than one flexible room.

---

## 6. BUILD ORDER

Sequenced by what unblocks what, so there is a working, testable slice at every step.

1. **Engine bootstrap** — empty Babylon scene, render loop, Vite dev server. Proves the toolchain.
2. **Electron shell** — the client running in a packaged window, `contextIsolation` on. Done early, not last: doing it now means never debugging a browser/Electron divergence later.
3. **Movement system** — walk/run/crouch/prone/climb/swim on a flat test level, single-player. The most-touched system in the game; get the feel right early.
4. **Vehicle system** — driving, nitro, drift, damage, instant spawn. *Moved up from step 8.* Driving is this game's connective tissue and its highest-risk feel problem; nothing else can be judged until you can drive.
5. **Netcode skeleton** — Colyseus server, `CityRoom`, position sync for several dummy players. Prove multiplayer before building on it.
6. **Procedural district generator** — one district generated from a ruleset, streamed, lit per the art direction. The first time it looks like the game.
7. **Combat system** — weapon handling, ballistics, one dummy target.
8. **AI state machine** — idle→alert→combat on that target.
9. **Heat system** — Dominion pursuit, arrest, escape-into-infestation. The Open World loop's spine.
10. **First heist** — Meridian Central Bank, end to end, with cash payout and cooldown. **First true milestone: a playable Open World slice.**
11. **Mission/checkpoint system** — objective tracking and save state.
12. **Season 1 vertical slice** — the Bank map reused, three branching paths, in-engine cutscenes. **Second milestone: a playable Story Mode slice.**
13. **Interaction systems** — hacking, lockpicking, reviving, drilling.
14. **Meters** — oxygen, light, noise, Vein-Exposure.
15. **Remaining districts + infestation sim** — the full 2km² map, living.
16. **Seasons 2–3**, now that the systems layer is proven.
17. **Aircraft** — deferred until Season 11 content needs it.
18. **Progression, garage, crafting** — once there is enough content to need them.
19. **Seasons 4–12** — mostly content authoring on a proven systems layer.

Two playable milestones (steps 10 and 12) rather than one is deliberate: each mode gets an independently shippable slice, and either can be demoed without the other being finished.

---

## 7. HOSTING & DEPLOYMENT (Oracle Cloud Free Tier)

**VM:** Oracle's **Ampere A1 (ARM) Always-Free shape** — up to 4 OCPU / 24GB RAM, free indefinitely. Enough for the whole stack at GDGoC scale. It is **ARM64**, so native Node dependencies need ARM64 builds; Node, Postgres and Redis all publish official ARM64 images, so this is a non-issue in practice.

**Stack (Docker Compose):**
```
nginx            → serves the static client build, terminates TLS, reverse-proxies
                    /api → api-server, /colyseus (wss) → colyseus-server
colyseus-server   → authoritative game server
api-server        → REST API for auth, leaderboard, code redemption
postgres          → accounts, leaderboard, garage, world state, secret codes
redis             → session/matchmaking/shard state
```

**Capacity note:** one A1 shape realistically supports a handful of concurrent `CityRoom` shards plus mission instances. Shard population is a tuned constant, not a fixed law — start at 16 and measure. This is the honest reason Open World targets 16–24 players rather than Jailbreak's ~30.

**TLS & domain:** Certbot (Let's Encrypt) with auto-renewal; Nginx terminating HTTPS and passing `Upgrade`/`Connection` headers so Colyseus works over `wss://`.

**Resilience:** Cloudflare free tier in front for static caching and basic DDoS absorption; `pg_dump` to Oracle Object Storage (20GB free) on cron; Uptime Kuma in the same Compose stack for a status page.

**Deploy:** GitHub Actions builds client + server, SSHs to the VM, `docker compose up -d`.

---

## 8. BACKEND SERVICES & DATA LAYER

**Database:** Postgres via **Prisma** (TypeScript-native, migrations-as-code).

**Core schema:**
```
users               (id, username, password_hash, created_at, account_level, cash, shards)
garage_vehicles     (id, user_id, vehicle_type, customization_json, acquired_at)
world_state         (id, user_id, season_progress, district_infestation_json, flags_json)
leaderboard_entries (id, user_id, season_id, score_type, value, achieved_at)
secret_codes        (id, code, reward_type, reward_payload, max_uses, uses_remaining,
                     expires_at, created_by, event_name)
redeemed_codes      (id, user_id, code_id, redeemed_at)
```

**Auth:** username + password, hashed with argon2. JWT on login, checked by both the REST API *and* Colyseus's `onAuth` hook — so the game server always knows which account holds a seat, not just which client claims to.

**Economy integrity:** the server owns all cash and Shard mutations and writes them directly. Clients never post balances. This closes the obvious cheat vector.

**Secret codes (GDGoC events):** organizers generate codes tagged to an event with expiry and max redemptions; a redemption endpoint validates, applies the reward, and logs it to block reuse. Rate-limit auth and redemption endpoints — a public free-tier box is exactly what gets brute-forced if this is skipped.

---

## 9. CUTSCENES & INTERACTIVE ELEMENTS

**No pre-rendered video.** Bandwidth and file size on a free-tier VM make streamed video a poor fit, and it breaks visual consistency with the live engine. Instead: **in-engine cutscenes** — Babylon Animation Groups driving scripted camera rigs, using the same models and shaders as gameplay. Zero extra hosting cost, and cutscenes stay interactive.

- **Interactive mid-cutscene beats (QTE):** the Season 1 container-crack moment is the normal input system under a cutscene-mode flag — movement disabled, specific prompted inputs still listened for. No separate tech.
- **Branching dialogue:** a lightweight JSON dialogue-tree format, with choices validated server-side wherever they affect mission state.
- **Cutscene gallery:** skippable on replay, logged per account for a profile collection alongside Photo Mode.

---

## 10. WHERE TO START

1. Read this doc, `hollow-vein-art-direction.md`, and `hollow-vein-open-world.md` before writing code.
2. Scaffold §2's monorepo with a working `pnpm install` and dev-server boot — nothing functional, just proof the toolchain is wired.
3. In parallel (does not block gameplay work): Docker Compose, Nginx, Certbot, and the Prisma schema — de-risking hosting and data early rather than bolting them on later.
4. Then work the §6 build order one step at a time, with a working build and a played-not-just-compiled check after each.

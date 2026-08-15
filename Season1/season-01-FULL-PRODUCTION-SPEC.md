# SEASON 1 — "FIRST CONTACT"
## FULL PRODUCTION SPEC — Scenes, Cutscenes, Dialogue, Level Geometry
### Revision 2 — reconciled against the design bible, art direction, and the two-mode structure

**Runtime target:** ~60 min | **Points:** 500 base (+300 clean, +100/200 speed under 45/35 min)
**Room type:** `HeistRoom extends MissionRoom` — Story Mode, 4 players, role-locked

Squad callsigns: **Anvil** (Breacher) · **Wisp** (Infiltrator) · **Mercy** (Sentinel) · **Echo** (Analyst)

---

## 0. WHAT CHANGED IN REVISION 2

Revision 1 predated the design-bible reconciliation, the art direction, and the two-mode split. Four hard conflicts with the bible are corrected here, and three bible-mandated mechanics that were missing have been added.

| # | Issue | Bible authority | Fix |
|---|---|---|---|
| 1 | Echo (Analyst) looped the camera feed on Path B | *"Infiltrator … the only role that can hack terminals, cameras"* (Part 2); S1 role breakdown: *"Infiltrator = access & cameras"* | **Wisp** handles all camera work. Echo **reads** monitors for patrol timing — overwatch, not hacking. |
| 2 | No camera beat on Path A | *"Break In path: … Infiltrator disables one camera loop"* (Part 4) | Camera loop moved to Path A, where the bible places it. |
| 3 | No driving anywhere in the season | S1 mechanics taught: *"…driving to the extraction point"* | Service Tunnel now exits to street level; the crew drives the Overpass to the Docks. |
| 4 | No lockpicking anywhere in the season | S1 mechanics taught: *"lockpicking vs. breaching"* | The first door is a dual-path padlock: Wisp picks it or Anvil pries it. |
| 5 | Breacher's kit implied charges/shotgun | *"starts with a pistol and a crowbar in S1"* (Part 2) | All Anvil force actions in S1 are **crowbar** work. No charges, no shotgun. |
| 6 | Vault QTE had no player agency | — | The QTE now determines *who* gets infected, not merely which NPC happened to stand closest. See §10. |
| 7 | Asset list assumed photoreal | `hollow-vein-art-direction.md` | Rebuilt against the poly budgets, palette, and material recipes. See §15. |

---

# 1. LEVEL GEOGRAPHY

## 1.0 This level is built once and used twice

The Meridian Central Bank is **also the Open World's `Meridian Central Bank` heist site** (`hollow-vein-open-world.md` §5). Same geometry, same vault, same service tunnel. Story Mode dresses it with scripted NPCs, cutscene camera rigs, and the container; Open World strips those and runs the repeatable robbery loop on a 10-minute cooldown.

Build it once, to Open World's standard, and Season 1 is the tutorial for a loop players will run hundreds of times. Nothing in this spec may bake story state into the geometry — the container, the rival crew and the cutscene rigs are all spawned, never modelled in place.

## 1.1 Zone Map
```
[EXTERIOR PLAZA] ──┬── [LOADING DOCK ALLEY] ── (Break In entry)
                    ├── [MAIN LOBBY DOORS] ──── (Inside Job entry)
                    └── [SIDE STREET] ───────── (Standoff entry)
                              │
                    [MAIN LOBBY] ── [SECURITY OFFICE]
                              │
                    [STAFF CORRIDOR]
                              │
                    [VAULT STAIRWELL]
                              │
                    [VAULT ANTECHAMBER] ── (all 3 paths converge here)
                              │
                    [VAULT CHAMBER] ── (the container)
                              │
                    [SERVICE TUNNEL]
                              │
                    [BACK STREET] ── (crew van — driving begins)
                              │
                    [THE OVERPASS] ── (drive west→south)
                              │
                    [OLD DOCKS — EXTRACTION POINT]
```

## 1.2 Room-by-Room Detail

**Exterior Plaza** — open street-level area, **wet asphalt under light rain**. This is the game's first frame and it is deliberately the art direction's money shot: `--asphalt-wet` road with roughness ~0.15 under SSR, sodium streetlights smearing vertically across it, the bank's neoclassical facade lit warm against a `--sky-night-horizon` gradient. Streetlights, parked cars (locked in Story Mode, drivable in Open World), a newsstand prop. Shared spawn point; the squad picks their path from here.

**Loading Dock Alley** *(Break In entry)* — narrow service alley, dumpsters, a **chained side door with a physical padlock** (the season's first dual-path), one security camera on a slow sweep, dim sodium lighting.

**Main Lobby Doors** *(Inside Job entry)* — grand entrance, revolving door, a staff-only side door Wisp badges through with the planted ID.

**Side Street** *(Standoff entry)* — a delivery van blocking the street; through its windows, the rival crew already inside with hostages. Team stages here.

**Main Lobby** — high-ceilinged hall, teller counters (6), rope queue lines, a wall of world clocks, 2 patrolling guards, 3 cameras. The level's signature establishing shot: tall volume, hard sodium light through high windows, long shadows from the `CascadedShadowGenerator`. Geometry stays cheap — the drama is entirely in the lighting.

**Security Office** — small room off the lobby, bank of CCTV monitors (emissive, `--interior-warm`), one seated guard, a breaker panel (Wisp's camera-loop point).

**Staff Corridor** — narrow, fluorescent, lockers, break room through a window. Connects lobby to vault stairwell.

**Vault Stairwell** — descending spiral, motion-sensor lights flicking on as the squad passes (cheap, effective tension beat — pooled `PointLight`s triggered by proximity). Reinforced door at the bottom.

**Vault Antechamber** — where all three paths reconverge. Circular, vault door dead center, **security terminal (hack point) and manual crank (force point) visible side by side** — the dual-path choice is telegraphed environmentally before any UI opens.

**Vault Chamber** — the payoff room. Rows of safety-deposit boxes and, centered at the back, the sealed government container: different material to everything around it, faint hairline seams, a stenciled ID plate. Where The Crack happens.

**Service Tunnel** — old maintenance tunnel, exposed pipes, flickering emergency lighting. First hint of the storm-drain aesthetic Season 2 commits to. **Shorter than revision 1** — it now exits up to street level rather than running all the way to the harbor.

**Back Street** — the crew van waits here (Tier S Utility, 4 seats). Rain, sodium light, a clear run onto the Overpass ramp.

**The Overpass** — elevated ring road, ~70 seconds of driving west then south. Teaches the Overpass Network as the map's spine before the player ever sees Open World.

**Old Docks — Extraction Point** — harbor air, cargo cranes silhouetted against the night, a motorboat idling at the pier. Final shot.

---

# 2. FULL SCENE FLOW (time-coded to `season-01-first-contact.md`)

| Time | Phase | Content | Checkpoint |
|---|---|---|---|
| 0:00–0:05 | Briefing | **Cutscene 01** → Path Selection | — |
| 0:05–0:20 | Approach | Path A / B / C gameplay | ✅ before bank interior · ✅ pre-firefight *(Path C only)* |
| 0:20–0:35 | Vault Access | Convergence → vault puzzle | ✅ before vault door |
| 0:35–0:45 | The Crack | **Cutscene 02** (interactive) | ✅ before extraction |
| 0:45–1:00 | Extraction | Tunnel → drive → docks → **Cutscene 03** | Season end |

Checkpoints follow the master timeline's Checkpoint Rule (before every puzzle and every medium-tier-or-higher encounter). The Path C firefight checkpoint is additional to the season file's list because that branch is the only medium-tier encounter in the approach phase.

---

# 3. CUTSCENE 01 — "Cold Open" (~90 sec, skippable on replay)

**Setting:** a nondescript hideout — a converted apartment, blueprints pinned to a corkboard. **Not Talia's Workshop:** per the bible, Talia's is the team's hub only from Season 3 onward, and Talia is not met properly until Season 10. Nobody in this room knows that name yet.

**Camera:** static wide on the corkboard, slow push-in. Cuts to over-the-shoulder as each callsign speaks. Final shot: exterior window, rain, skyline — hold, then cut to gameplay.

> **ECHO** *(V.O., over the blueprint shot)*: Tip came in an hour ago. Anonymous. Central Bank's holding something that isn't supposed to exist on a civilian ledger.
>
> **ANVIL**: Define "isn't supposed to exist."
>
> **ECHO**: Container, government routing code, moved in under a cargo manifest three weeks ago. Whoever moved it didn't want it moved anywhere official.
>
> **WISP**: So we're stealing government property nobody admits is missing. Great. Love that for us.
>
> **MERCY**: If it's already off the books, nobody's coming to get it back cleanly either way. In or out?
>
> *(beat)*
>
> **ANVIL**: In. How do we get to it?

**[PATH SELECTION UI TRIGGERS HERE]**

---

# 4. PLAZA WALK-IN & PATH SELECTION (interactive, Exterior Plaza)

## 4.0 The walk-in — movement, camera, weapon basics

Before any marker is selectable, the squad walks the length of the plaza. This is the season's movement tutorial and it is deliberately unannounced — no modal, no lesson screen, just prompts fading in on the HUD as each verb first becomes useful. Per the season file, it is in-engine and skippable on replay.

| Prompt | Teaches | Bible mechanic |
|---|---|---|
| *"[W/A/S/D] to move · [Shift] to sprint"* | Walk / jog / sprint, and that **sprinting drains the shared stamina meter** | "walk/run/crouch" |
| *"[Mouse] to look"* | Third-person follow camera | Movement/camera prompts |
| *"[C] to crouch"* — triggered by a low barrier between the squad and the markers | Crouch reduces noise and hitbox | "walk/run/crouch" |
| *"[1/2] to swap · [RMB] to aim"* — on reaching the staging point | Equip/holster has an animation cost; ADS slows movement and tightens accuracy | "basic weapon handling" |

Weapons are drawn but **no enemy is present** — this is a weapon *check*, not a firefight. The squad is casing a bank, not storming it, and the first live-fire moment is deliberately withheld (Path C's firefight, or the tunnel stragglers on every other path).

Crouch is then genuinely required later: past the dock guard on Path A, and behind the counter line on Path B. A verb taught in the plaza and used within four minutes is a verb the player keeps.

## 4.1 Path selection

Three glowing waypoint markers on the HUD map, one per entry, each with a one-line flavor tag:

- **Break In** — *"Force the loading dock. Fast, loud, physical."*
- **Inside Job** — *"Use the planted ID. Slow, quiet, precise."*
- **Standoff** — *"A rival crew beat us to it. Improvise."*

Radial-menu vote: any player proposes, 3/4 agreement commits, otherwise party leader's pick after a 15-second timer. Never blocks progress. Per the bible, the choice is tonal only in Season 1 — no difficulty delta. This season teaches; it doesn't test.

---

# 5. PATH A — "Break In" (Loading Dock Alley → Lobby → Staff Corridor)

**Beat 1 — the first door, and the game's first lesson (0:05–0:09).**
The side door is chained with a physical padlock. Both solutions are present and equally valid:

- **Wisp picks it** — lockpick minigame, ~12 sec, quiet. The dock guard stays Idle.
- **Anvil pries it** — **crowbar** strength-meter, ~8 sec, loud. The dock guard escalates to Suspicious and walks their patrol toward the noise.

This is the Dual-Path Puzzle Rule made visible in the first sixty seconds of the game, and it teaches *lockpicking vs. breaching* exactly as the bible specifies for Season 1. Neither is punished; they simply cost different things. Struggle Assist after 3 failures on either.

**Bark (Anvil, on pry):** *"Anyone home?"*
**Bark (Wisp, on pick):** *"Old lock. Somebody's been cutting the maintenance budget."*

**Beat 2 — the dock interior (0:09–0:13).** Crates, one guard. The crate rows are chest height, so **crouch is the first genuine use of the verb taught in the plaza** — moving upright here puts the squad in the guard's sight cone. Tutorial prompt: *"Hold [E] near an unaware enemy"* — Wisp is fastest at stealth finishers, but any role can avoid line-of-sight entirely. Both resolutions are clean.

**Beat 3 — the camera loop (0:13–0:16).** A single camera covers the corridor to the lobby. **Wisp loops it** at the junction box — the season's first hacking-shaped interaction, single-stage, ~10 sec, teaching the UI shape the vault hack will reuse. The monitor visibly flickers to a 30-seconds-ago frame: the player *sees* the loop take.

> Per the bible, the camera loop belongs to Break In and belongs to Infiltrator. Revision 1 had it on the wrong path and the wrong role.

**Beat 4 — crossing the lobby (0:16–0:20).** **Echo marks the two lobby guards' patrol routes** with a scan pulse (tutorial: *"Press [Q] to mark enemies"*) — overwatch and timing calls, the Analyst's actual bible role. **Mercy** holds the rear and calls the gap. Squad crosses on Echo's count into the Staff Corridor.

**Enemies:** 1 dock guard (Idle/Suspicious), 2 lobby guards (avoidable on Echo's marked gap).

---

# 6. PATH B — "Inside Job" (Lobby Doors → Security Office → Staff Corridor)

**Beat 1 (0:05–0:09).** **Wisp** badges through the staff-only side door with the planted ID. No minigame, instant — deliberately teaching that some interactions are simply *free* when the setup was done properly. The squad walks in through the front of a working bank.

**Bark (Wisp):** *"ID's holding. Nobody's even looking twice."*

**Beat 2 — the security office (0:09–0:15).** One seated guard, low awareness, who must be avoided or quietly subdued.

- **Echo reads the monitor wall** — no hacking. They watch live feeds and call patrol timing, which is precisely the bible's *"Analyst watches camera feeds for patrol timing."* Tutorial prompt teaches reading a feed and calling a gap.
- **Wisp** stands ready at the breaker panel; if the squad is spotted, they loop the feed as a recovery action (~10 sec) rather than as the default plan.

Splitting it this way gives both roles a real job on this path without violating Infiltrator's exclusive claim on camera hardware.

**Beat 3 (0:15–0:20).** On Echo's calls the squad moves openly across the lobby — no stealth required if the timing was read correctly — into the Staff Corridor. If a call is missed and a guard turns, **crouching behind the teller counter line** breaks line of sight and resets the patrol to Suspicious rather than Alert: the recovery, not the plan. **Anvil and Mercy** wait on the signal and move together, the bible's *"Breacher/Sentinel wait for the signal to move"* — teaching patience and timing over force.

**Enemies:** 1 seated security guard (avoid or subdue). Lobby guards are never engaged if Echo's timing calls are followed.

---

# 7. PATH C — "Standoff" (Side Street → Lobby → Staff Corridor)

**Beat 1 — the negotiation (0:05–0:12).** Squad stages behind the delivery van. Through its windows: a rival crew (3 NPCs) holding 2 hostages at the teller counter. **Mercy** opens the branching-dialogue UI — the Sentinel's *crowd control/negotiation* role per the bible, and the system's first appearance.

**Dialogue options (Mercy's player):**
1. *"We're not here for you. Walk away and nobody else gets hurt."* — de-escalate
2. *"You've got thirty seconds before this gets loud."* — pressure
3. *(say nothing, signal the squad to flank)* — skip to combat

**Branch outcomes:**
- **De-escalate** — the leader argues, then stands down and leaves. No combat. Fastest, quietest.
- **Pressure** — the leader calls the bluff. Brief 3-enemy firefight; hostages drop to cover automatically (scripted safe).
- **Flank** — same firefight, but **Anvil and Wisp** are already in position, granting a surprise-attack bonus on the opening exchange. This is the bible's *"Breacher and Infiltrator flank."*

✅ **Checkpoint before the firefight** on the Pressure/Flank branches — the only medium-tier encounter in the approach phase.

**Bark (crew leader, Pressure/Flank):** *"You really don't know whose job this is, do you?"*

**Beat 2 (0:12–0:20).** Resolved, the squad moves through a lobby now empty of guards — the commotion drew them off, a small piece of environmental logic that rewards paying attention — into the Staff Corridor.

**Enemies:** 3 rival crew (only engaged on Pressure/Flank).

---

# 8. CONVERGENCE — Vault Antechamber (0:20)

All three paths funnel into the corridor to the Vault Stairwell, then down. A banter bark plays regardless of route, reuniting the tone:

**Bark (Echo):** *"Structural scan's clean. Vault door dead ahead."*

The squad sees the terminal and the manual crank **side by side**. No forced-choice UI — just clear environmental readability. ✅ Checkpoint here.

---

# 9. VAULT PUZZLE — Dual-Path Mechanic Spec (0:20–0:35)

### Path A: Hack (Wisp lead)
Three-stage terminal minigame:
1. **Bypass firewall** — timed reflex-pattern match, ~20 sec
2. **Align the cipher wheels** — rotation logic puzzle, ~30 sec
3. **Hold the stabilizer** — timing-hold while the lock releases, ~15 sec

~90 sec clean. **Struggle Assist:** after 3 failed attempts on any single stage, the correct next input pulses visually. Interruptible by patrols, per the bible's hacking rules.

### Path B: Force (Anvil lead)
Manual crank — alternating mash/hold strength-meter, ~2 min, **crowbar and shoulder, no charges** (Season 1 Breacher carries a pistol and a crowbar and nothing heavier). No fail state: it always succeeds eventually, it is simply slower and louder.

Forcing draws **+1 extra guard patrol** into the Antechamber mid-crank — **Mercy and Echo** hold them off while Anvil finishes, which is the first time the season asks the squad to defend a teammate mid-channel. It rehearses the Sentinel's revive-under-fire fantasy without the stakes.

### Mixing is explicitly supported
Wisp starts the hack, gets interrupted or downed, Anvil switches to force without restarting from zero — partial hack progress carries over as a reduced-duration force sequence. A missing or downed teammate never blocks the vault, per the Dual-Path Puzzle Rule.

---

# 10. CUTSCENE 02 — "The Crack" (interactive, ~45 sec)

**Camera:** third-person over the shoulder of whichever role completed the vault. Slow-motion as the door swings and the container comes into view.

> **ANVIL** *(or Wisp, depending on path)*: That's... not a bank container.
>
> **ECHO**: Pull the manifest tag. I want to know what agency—
>
> *(the lock mechanism sparks; something inside is fighting the seal)*
>
> **MERCY**: Everyone back up. Back up now.

### The interactive beat — improved from revision 1

Revision 1's QTE had no consequence: success and failure produced identical outcomes and the infection landed on whoever happened to be standing closest. That is agency in appearance only, and this is the most important single moment in the campaign's setup.

**Revised:** the prompt is *"Hold [E] to shove the container clear."* The crack is still inevitable — that is not negotiable, it is the premise of the entire game — but the player now decides **who it lands on**:

| Input | Outcome |
|---|---|
| **Held successfully** (2.5 sec window, generous) | The container is shoved away from the nearest civilian. The crack takes **the nearest non-civilian** — a guard, or a rival crew member on Path C. |
| **Missed or released** | The container stays put. The crack takes **whoever is nearest**, civilian or not. |

Teammates are never permanently harmed — always an NPC, per the bible. The identity is written to `crackedNPCIdentity` and becomes the person the team hunts in Season 2, so a player's split-second reaction in the first hour determines who they are chasing in the second season. Same inevitability, real agency, zero narrative branching cost.

**VFX:** a hairline crack of black-gold light spiders across the seam — the Vein shader's `spread` uniform animating 0→0.3 over ~1.2 sec, emissive `--vein-gold` at intensity 4.0 against the near-black substrate. Brief flash. The NPC recoils; a faint black-gold line now runs across their skin.

**Bark (Echo):** *"...Everyone still breathing?"*
**Bark (the newly-infected NPC, quiet, unsettled):** *"...Yeah. Yeah, I'm fine."* — they are visibly not fine. First horror beat of the campaign.

The infected NPC bolts for the Service Tunnel and is gone. Alarms trigger. Transition to gameplay. ✅ Checkpoint.

---

# 11. EXTRACTION — Tunnel → Drive → Docks (0:45–1:00)

**Beat 1 — the Service Tunnel (0:45–0:50).** Exposed pipes, flickering emergency lighting, 2–3 stragglers (guards, or rival crew depending on path). Standard tier, light. The infected NPC's black-gold handprints are smeared along the wall at intervals — environmental storytelling, and a first look at the shader players will come to dread.

**Beat 2 — the drive (0:50–0:57).** *Bible-mandated and absent from revision 1: S1's taught mechanics explicitly include "driving to the extraction point."*

The tunnel exits up into the **Back Street**, where the crew van waits. All four board — Anvil or whoever reaches the driver's seat first — and the squad drives the **Overpass** west then south to the Old Docks. ~70 seconds.

This beat is doing more work than it looks:
- It teaches arcade driving, the passenger system, and the Overpass as the city's spine
- It is the player's first sight of Meridian at scale — rain-slick ring road, sodium light, the skyline they will spend twelve seasons in
- It is the on-ramp to Open World, where this exact van and this exact road are the connective tissue of the whole mode

Light pursuit (2 security vehicles) is **optional and losable by simply driving well** — no fail state, no forced combat. Extraction always succeeds.

**Beat 3 — the docks (0:57–1:00).** Cranes against the night sky, motorboat idling. Brief optional skirmish if pursuit wasn't shaken. Squad boards.

**Bark (Mercy, boarding):** *"Whatever that thing back there is, it's not our problem anymore."*
**Bark (Echo, checking a scanner, quiet):** *"...I don't think we get to decide that."*

---

# 12. CUTSCENE 03 — Debrief / Ending (~40 sec)

**Camera:** boat pulling away, skyline receding. Cut to a final shot of the storm drain grate where the infected NPC disappeared — water trickling past, something faintly gold beneath the surface.

**Season-end card:** *"SEASON 1 COMPLETE — FIRST CONTACT"* with points tally, unlocks, and a "Continue to Season 2" prompt.

---

# 13. NPC & ENEMY ROSTER

| NPC | Type | Behavior | Paths |
|---|---|---|---|
| Dock Guard | Human, baton | Idle patrol, short sight radius | Break In |
| Lobby Guards ×2 | Human, sidearm | Patrol loop, Suspicious→Alert escalation | All (avoidable) |
| Security Office Guard | Human, seated | Stationary, low awareness | Inside Job |
| Rival Crew ×3 | Human, sidearms | Guarding hostages, dialogue-reactive | Standoff |
| Hostages ×2 | Non-combatant | Auto-cover on combat trigger | Standoff |
| Antechamber Patrol | Human, sidearm | Spawns only on the Force vault path | All |
| Tunnel Stragglers ×2–3 | Human, sidearm | Standard tier, light | All |
| Pursuit Vehicles ×2 | Vehicle | Optional chase, losable | All |
| Newly-Infected NPC | Human → Vein-marked | Scripted flee post-Crack | Identity set by §10 QTE |

No armored enemies, no Vein creatures. The first Thrall is a Season 2 sighting, and the rival crew is deliberately the only "boss-adjacent" fight in Season 1 so that tonal shift lands.

---

# 14. FULL DIALOGUE / BARK SCRIPT

```
[COLD_OPEN_01] ECHO:  "Tip came in an hour ago. Anonymous. Central Bank's holding
                       something that isn't supposed to exist on a civilian ledger."
[COLD_OPEN_02] ANVIL: "Define 'isn't supposed to exist.'"
[COLD_OPEN_03] ECHO:  "Container, government routing code, moved in under a cargo
                       manifest three weeks ago. Whoever moved it didn't want it
                       moved anywhere official."
[COLD_OPEN_04] WISP:  "So we're stealing government property nobody admits is
                       missing. Great. Love that for us."
[COLD_OPEN_05] MERCY: "If it's already off the books, nobody's coming to get it
                       back cleanly either way. In or out?"
[COLD_OPEN_06] ANVIL: "In. How do we get to it?"

[PATH_A_01_PRY]  ANVIL: "Anyone home?"
[PATH_A_01_PICK] WISP:  "Old lock. Somebody's been cutting the maintenance budget."
[PATH_A_02]      WISP:  "Camera's looping. You've got thirty seconds of yesterday."
[PATH_A_03]      ECHO:  "Two guards, and a gap between them. On my count."

[PATH_B_01] WISP:  "ID's holding. Nobody's even looking twice."
[PATH_B_02] ECHO:  "I've got the whole floor on these monitors. Hold... hold... move."
[PATH_B_03] MERCY: "Walking through the front door. Never gets less strange."

[PATH_C_01_DE-ESCALATE] MERCY: "We're not here for you. Walk away and nobody else
                                gets hurt."
[PATH_C_01_PRESSURE]    MERCY: "You've got thirty seconds before this gets loud."
[PATH_C_02]        CREW_LEADER: "You really don't know whose job this is, do you?"
[PATH_C_03_STOOD_DOWN]  WISP:  "They knew something we don't. That's the part I
                                don't like."

[CONVERGENCE_01] ECHO: "Structural scan's clean. Vault door dead ahead."

[VAULT_HACK_01]  WISP:  "Give me ninety seconds and don't let anyone breathe on me."
[VAULT_FORCE_01] ANVIL: "Crowbar and patience. Buy me both."
[VAULT_FORCE_02] MERCY: "Company on the stairs. Keep cranking."

[CRACK_01] ANVIL_OR_WISP: "That's... not a bank container."
[CRACK_02] ECHO:          "Pull the manifest tag. I want to know what agency—"
[CRACK_03] MERCY:         "Everyone back up. Back up now."
[CRACK_04] ECHO:          "...Everyone still breathing?"
[CRACK_05] INFECTED_NPC:  "...Yeah. Yeah, I'm fine."

[TUNNEL_01]  ECHO:  "There's handprints down here. They're still warm."
[DRIVE_01]   ANVIL: "Everybody in. Docks, now."
[DRIVE_02]   WISP:  "Take the overpass, it's clear all the way south."

[EXTRACTION_01] MERCY: "Whatever that thing back there is, it's not our problem
                        anymore."
[EXTRACTION_02] ECHO:  "...I don't think we get to decide that."
```

---

# 15. ART DIRECTION & ASSET LIST

Rebuilt against `hollow-vein-art-direction.md`. Revision 1's list assumed photoreal assets (marble, a modelled chandelier); this one assumes the actual pipeline — procedural geometry, flat materials, lighting doing the work.

### Environment — mostly procedural
| Asset | Budget | Source |
|---|---|---|
| Bank facade + plaza | 4–6k tris | Landmark, hand-assembled from the modular kit |
| Lobby interior | 6–8k tris | Landmark. Counters/ropes/clocks instanced. **The chandelier is an emissive card, not geometry.** |
| Security office, staff corridor, stairwell | 1–2k each | Kit pieces |
| Vault antechamber + chamber | 3–4k | Landmark; deposit-box walls are one tiling instanced panel |
| Service tunnel | 800 tris | Kit, reused wholesale by Season 2 |
| Back street + Overpass segment | Procedural | District generator — background buildings at 150–600 tris |
| Docks (crane, pier) | 2–3k | Kit, shared with S5/S11 |
| **The container** *(hero prop)* | 2k | The only bespoke prop in the season. It earns it. |

### Characters
4 player roles at 6–10k (reused campaign-wide), guards at 2–3k with 2 variants, rival crew at 2–3k, hostages reuse the pedestrian base mesh, infected-NPC variant = guard mesh + Vein shader. Mixamo rigs throughout.

### Vehicles
Crew van (Tier S Utility, 4 seats, 5–7k tris — the season's only hero vehicle) and 2 pursuit sedans (3–6k). All three come straight from the Open World roster; none is Season-1-specific.

### Materials — all code-authored PBR
Wet asphalt (`--asphalt-wet`, roughness 0.15, SSR) · bank stone (`--concrete-light`, roughness 0.85) · vault steel (metallic 1.0, roughness 0.3) · CCTV monitors and the chandelier (emissive `--interior-warm`) · alarm state (emissive `--emergency-red`, pulsing) · **the Vein** (node material, `--vein-black` substrate, emissive `--vein-gold` at 4.0, `spread` uniform driven by the QTE).

### Lighting
Night, wet — the signature state. `DirectionalLight` key at `--moon-cyan` 0.4, hemispheric fill 0.15, pooled sodium `PointLight`s on the plaza and back street. Interiors go warm to contrast the street. Alarm state after the Crack swaps the lobby and stairwell pool to `--emergency-red` — one variable change, total mood shift, near-zero cost.

### VFX
Dust/debris on pry · camera-loop screen glitch · hack success/fail flash · **black-gold crack spread** (the hero effect) · container light burst · skin-crack decal · rain particles + wet-surface ripple · headlight cones and tyre spray on the drive.

### Audio
All barks above · ambient rain · lobby reverb · alarm klaxon · crowbar/lockpick foley · van engine + tyre noise on wet road · boat engine · tunnel drip · adaptive layers: Stealth / Alert / Combat / Cutscene-tension.

### UI
Path-selection radial · dialogue-choice UI · 3-stage hack minigame · crank strength-meter · lockpick minigame · QTE prompt · enemy-mark reticle · season-end summary card. Bone-white on near-black, high contrast, per art direction §7.

---

# 16. DIFFICULTY TIERS

**Standard** is described throughout and is the target experience. Per the master timeline, harder tiers are multipliers on these same encounters, never redesigns:

| Tier | Changes |
|---|---|
| **Hardened** | ×1.5 enemy damage, +1 lobby guard, camera sweep 25% faster, hack stage timers −20% |
| **Nightmare** | ×2 enemy damage, guards start Suspicious, no Struggle Assist on the vault, pursuit is mandatory |

Adaptive Encounter Scaling (−15% after 2 full-squad wipes) applies to the Path C firefight and the Force-path antechamber patrol — the season's only two encounters that can wipe a squad.

---

# 17. TECHNICAL IMPLEMENTATION NOTES

**Room:** `HeistRoom extends MissionRoom` (architecture doc §5).

**Server-authoritative state flags:**
```ts
chosenPath           : 'BreakIn' | 'InsideJob' | 'Standoff'
standoffDialogue     : 'DeEscalate' | 'Pressure' | 'Flank' | null
firstDoorMethod      : 'Pick' | 'Pry' | null      // Path A only
vaultMethod          : 'Hack' | 'Force' | 'Mixed'
crackQTEResult       : 'Held' | 'Missed'
crackedNPCIdentity   : string                      // read by Season 2 on session start
```

**Authority** (architecture doc §5.1): the van's physics is client-simulated and server-validated like any vehicle. Everything narrative — dialogue outcomes, vault progress, the QTE resolution, `crackedNPCIdentity` — is strictly server-authoritative. A client must never be able to choose who gets infected by editing memory.

**Struggle Assist:** implement as a generic server-side `failedAttempts` counter keyed by interactable ID, not per-puzzle bespoke code. Every subsequent season reuses it. Applies here to the padlock, the camera loop, and all three hack stages.

**Checkpoints:** after path selection · before the Path C firefight · before the Vault Antechamber · before Extraction · at mission end.

**Cutscenes:** all three in-engine via Babylon Animation Groups on scripted camera rigs. Cutscene 02 uses the cutscene-mode-with-live-input-listener pattern (architecture doc §9) — movement disabled, the QTE prompt still listening.

**Dialogue:** the Standoff branch uses the JSON dialogue-tree format, validated server-side since it changes enemy spawn state.

**World-state writes on completion** (`hollow-vein-open-world.md` §6.2): Season 1 clear cordons the Crater and opens the Undercity in that account's Open World. The bank's Open World heist variant unlocks at the same moment — the player has just been taught it.

---

# 18. WHAT SEASON 1 IS ACTUALLY TEACHING

Every beat is a tutorial that never announces itself as one. Listed here so nothing gets cut in production without someone knowing what it cost:

| Beat | Teaches | Paid off in |
|---|---|---|
| Path selection | Choices are group decisions | S4, S5, S9 live branches |
| Padlock (pick vs pry) | **Dual-Path Puzzle Rule** | Every puzzle in the campaign |
| Stealth takedown | Unaware enemies are an opportunity | S3, S6 |
| Camera loop | Infiltrator owns electronic access | S3 terminals, S9 Choir tech |
| Enemy marking | Analyst owns information | S2 sonar, S7 weak points |
| Monitor reading | Overwatch is a job, not a spectator seat | S3, S8 cross-site support |
| Negotiation | Sentinel controls people, not just health | S4 civilians |
| Vault dual-path | Two roles, one problem, either works | Every season |
| Defending a channel | Protect the teammate mid-action | S11 revives, S12 Channel |
| **The Crack QTE** | Your reflexes have consequences you'll meet later | S2's hunt |
| The drive | The city is one continuous place | Open World entirely |

The last row is the one that matters most for the two-mode structure: a player finishing Season 1 has already driven the Overpass, robbed the Central Bank, and escaped a pursuit. They are ready for Open World without a second tutorial.

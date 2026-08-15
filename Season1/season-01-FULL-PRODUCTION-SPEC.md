# SEASON 1 — "FIRST CONTACT"
## FULL PRODUCTION SPEC — Scenes, Cutscenes, Dialogue, Level Geometry
### For direct implementation by Claude Code

**Runtime target:** ~60 min | **Points:** 500 base (+300 clean, +100/200 speed <45/35 min)

Squad callsigns used throughout this doc: **Anvil** (Breacher) · **Wisp** (Infiltrator) · **Mercy** (Sentinel) · **Echo** (Analyst)

---

# 1. LEVEL GEOGRAPHY

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
                    [SERVICE TUNNEL] ── (extraction route)
                              │
                    [OLD DOCKS — EXTRACTION POINT]
```

## 1.2 Room-by-Room Detail

**Exterior Plaza** — open street-level area, wet asphalt (light rain, sets tone), Meridian Central Bank's neoclassical facade dominates the skyline. Streetlights, parked cars (drivable in free-roam later, locked here), a newsstand prop. This is the shared spawn point — squad picks their path from here.

**Loading Dock Alley** (Break In entry) — narrow service alley, dumpsters, a chained side door (breach point), one security camera on a slow sweep, dim sodium lighting.

**Main Lobby Doors** (Inside Job entry) — grand marble entrance, revolving door, a staff-only side door Wisp can badge through using the planted ID.

**Side Street** (Standoff entry) — a delivery van blocking the street, visible through its windows: the rival crew already inside with hostages. Team stages here before entering.

**Main Lobby** — high-ceilinged marble hall, teller counters (6), velvet rope queue lines, a wall of analog clocks (world clocks — nice ambient detail), 2 patrolling guards, 3 visible cameras. Central chandelier. This is the level's signature "AAA establishing shot" room.

**Security Office** — small side room off the lobby, bank of CCTV monitors, one guard seated, a breaker panel (camera-loop point for Wisp).

**Staff Corridor** — narrow, fluorescent-lit, lockers, a break room visible through a window, connects lobby to the vault stairwell.

**Vault Stairwell** — descending spiral stairs, motion-sensor lights that flick on as the squad passes (subtle tension beat), reinforced door at the bottom.

**Vault Antechamber** — where all three paths reconverge. Circular room, vault door dead center, security terminal (hack point) and manual crank mechanism (force point) both visible side-by-side — visually telegraphs the dual-path choice to players before they even open the puzzle UI.

**Vault Chamber** — the payoff room. Rows of safety-deposit boxes, and centered at the back: the sealed government container, out of place among the ordinary bank stock — different material, faint hairline seams, a stenciled ID plate. This is where The Crack happens.

**Service Tunnel** — old maintenance tunnel connecting the vault level to the harbor, exposed pipes, flickering emergency lighting — first hint of the storm-drain aesthetic Season 2 will fully commit to.

**Old Docks — Extraction Point** — open harbor air, cargo cranes silhouetted against a night sky, a motorboat idling at the pier. Final shot of the level.

---

# 2. FULL SCENE FLOW

```
CUTSCENE 01: Cold Open (hideout briefing)
    ↓
INTERACTIVE: Path Selection (Exterior Plaza)
    ↓
PATH A / B / C (gameplay, ~15 min)
    ↓
CONVERGENCE: Vault Antechamber
    ↓
GAMEPLAY: Vault Puzzle (hack or force)
    ↓
CUTSCENE 02: The Crack (interactive QTE cutscene)
    ↓
GAMEPLAY: Extraction (Service Tunnel → Docks)
    ↓
CUTSCENE 03: Debrief / Ending
```

---

# 3. CUTSCENE 01 — "Cold Open" (0:00, ~90 sec, skippable on replay)

**Setting:** Talia's Workshop doesn't exist yet narratively — this is a nondescript hideout, a converted apartment with blueprints pinned to a corkboard.

**Camera:** Static wide shot on the corkboard as the scene opens, slow push-in. Cuts to over-the-shoulder shots as each callsign speaks. Final shot: exterior window, rain, city skyline — camera holds, then cuts to gameplay.

**Script:**

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

# 4. PATH SELECTION (interactive, Exterior Plaza)

UI: three glowing waypoint markers appear on the HUD map, one per entry point, each with a one-line flavor tag:
- **Break In** — "Force the loading dock. Fast, loud, physical."
- **Inside Job** — "Use the planted ID. Slow, quiet, precise."
- **Standoff** — "A rival crew beat us to it. Improvise."

Squad votes/majority-picks via a quick radial menu (any player can propose, needs 3/4 agreement or defaults to whoever's the party leader after a 15-second timer — never blocks progress). Choice is purely tonal/flavor per Season 1 design (see master timeline) — no difficulty delta.

---

# 5. PATH A — "Break In" (Loading Dock Alley → Lobby → Staff Corridor)

**Beat 1 (0:00–0:05 of path):** Squad stacks at the chained side door. **Anvil** interacts — breach mini-game (see Section 9 sibling mechanic, simplified tutorial version: hold interact, timed strength meter, always succeeds, ~8 sec). Door bursts open. Camera does a quick shake + dust VFX.

**Bark (Anvil):** *"Anyone home?"*

**Beat 2 (0:05–0:10):** Loading dock interior — crates, a sleepy guard NPC (Idle state). **Wisp** can stealth-takedown (tutorial prompt appears: "Hold [E] near an unaware enemy") or the squad can just avoid line-of-sight.

**Beat 3 (0:10–0:15):** Corridor into the Lobby's edge — **Echo** tags the two lobby guards' patrol routes via a scan pulse (tutorial prompt: "Press [Q] to mark enemies"). Squad crosses the lobby floor along the patrol gap Echo identifies, into the Staff Corridor.

**Enemies:** 1 dock guard (Idle/Suspicious only), 2 lobby guards (avoidable via marked patrol gap).

---

# 6. PATH B — "Inside Job" (Lobby Doors → Security Office → Staff Corridor)

**Beat 1:** **Wisp** approaches the staff-only side door, badges through with the planted ID (tutorial prompt: "Press [E] to use disguise/ID" — no minigame, instant, teaches that some interactions are simply free when properly set up).

**Bark (Wisp):** *"ID's holding. Nobody's even looking twice."*

**Beat 2:** Squad enters through Security Office. **Echo** loops the camera feed (tutorial hacking-lite prompt, single-stage, ~10 sec, teaches the hack-UI shape used later for the real vault hack). Screen flickers to a looped 30-second-ago frame — visual confirmation for the player that the loop is active.

**Beat 3:** With cameras looped, squad walks openly through the lobby (no stealth required this path) into the Staff Corridor.

**Enemies:** none directly engaged if the loop holds; 1 seated security guard in the office who must be avoided or quietly subdued before looping the feed.

---

# 7. PATH C — "Standoff" (Side Street → delivery van → Lobby → Staff Corridor)

**Beat 1:** Squad stages behind the delivery van. Through its windows: a rival crew (3 NPCs) holding 2 hostage NPCs at the teller counter. **Mercy** initiates a dialogue-choice sequence (first appearance of the branching-dialogue UI):

**Dialogue options presented to Mercy's player:**
1. *"We're not here for you. Walk away and nobody else gets hurt."* (de-escalate)
2. *"You've got thirty seconds before this gets loud."* (pressure)
3. *(say nothing, signal the squad to flank)* (skip to combat)

**Branch outcomes:**
- **De-escalate:** rival crew leader argues briefly, then stands down and leaves (no combat) — fastest, quietest resolution.
- **Pressure:** crew leader calls the bluff, brief 3-enemy firefight ensues, hostages drop to cover automatically (scripted safe).
- **Flank:** same firefight, but squad gets a surprise-attack damage bonus on the opening exchange.

**Bark (rival crew leader, if Pressure/Flank chosen):** *"You really don't know whose job this is, do you?"*

**Beat 2:** Once resolved, squad moves through the lobby (now empty of guards — the commotion drew them off, a nice bit of environmental logic) into the Staff Corridor.

**Enemies:** 3 rival crew members (only engaged on Pressure/Flank branches).

---

# 8. CONVERGENCE — Vault Antechamber

All three paths funnel into the same corridor leading to the Vault Stairwell, then down into the Antechamber. Brief unscripted banter bark plays regardless of path, reuniting the tone:

**Bark (Echo):** *"Structural scan's clean. Vault door dead ahead."*

Squad sees both the terminal (hack point) and manual crank mechanism (force point) simultaneously — no forced choice UI here, just clear environmental readability.

---

# 9. VAULT PUZZLE — Dual-Path Mechanic Spec

## Path A: Hack (Wisp lead)
- 3-stage terminal minigame: (1) bypass firewall — timed reflex-pattern match, ~20 sec; (2) rotate cipher wheels to align a code — logic puzzle, ~30 sec; (3) hold a stabilizing input while the lock releases — timing-hold, ~15 sec.
- **Struggle Assist:** after 3 failed attempts on any single stage, the correct next input pulses visually.
- Total: ~90 sec clean.

## Path B: Force (Anvil lead)
- Manual crank: a strength-meter mini-game, alternating button-mash/hold inputs, ~2 min, always succeeds eventually (no fail state, just takes longer and is louder).
- Forcing draws **+1 extra guard patrol** to the Antechamber mid-crank — Mercy/Echo hold them off while Anvil finishes.

Either path is fully valid; **mixing is supported** — e.g., Wisp starts the hack, gets interrupted/downed, Anvil switches to force without restarting from zero (partial-progress carries over as a reduced-time force sequence).

---

# 10. CUTSCENE 02 — "The Crack" (interactive QTE cutscene, ~45 sec)

**Camera:** third-person over the shoulder of whichever role completed the vault (hack or force), slow-motion kicks in as the vault door swings open, revealing the container.

**Script:**

> **ANVIL** *(or Wisp, depending on path)*: That's... not a bank container.
>
> **ECHO**: Pull the manifest tag. I want to know what agency—
>
> *(the container's lock mechanism sparks; something inside is fighting the seal)*
>
> **MERCY**: Everyone back up. Back up now.

**[INTERACTIVE PROMPT]:** a QTE prompt appears ("Hold [E] to secure the container" or equivalent) on whichever NPC is nearest — this is the **player-caused** crack moment. Timing window is generous (2.5 sec) — success or a "failed" input both lead to the same crack outcome (the crack is inevitable; this QTE exists for agency/immersion, not for a pass/fail branch), it's simply a matter of *which* NPC ends up nearest.

**VFX:** a hairline crack of black-gold light spiders across the container's seam. A brief flash. The nearest NPC recoils, a faint black-gold line now visible across their skin.

**Bark (Echo):** *"...Everyone still breathing?"*

**Bark (the newly-infected NPC, quiet, unsettled):** *"...Yeah. Yeah, I'm fine."* *(they are visibly not fine — first horror beat of the whole campaign)*

The infected NPC bolts toward the Service Tunnel and vanishes. Squad has no time to process — alarms trigger, transition to Extraction gameplay.

---

# 11. EXTRACTION — Service Tunnel → Old Docks

**Beat 1:** Squad moves through the Service Tunnel — light guard/rival-crew stragglers depending on earlier path (2–3 enemies, Standard tier), first flickering-light ambiance foreshadowing Season 2's tunnels.

**Beat 2:** Emerge at the Old Docks. Motorboat waiting. Brief optional combat if pursuit wasn't fully lost (not required — extraction always succeeds, pursuit just adds a skippable skirmish).

**Bark (Mercy, boarding the boat):** *"Whatever that thing back there is, it's not our problem anymore."*

**Bark (Echo, checking a scanner, quiet):** *"...I don't think we get to decide that."*

---

# 12. CUTSCENE 03 — Debrief / Ending (~40 sec)

**Camera:** boat pulling away from the dock, city skyline receding, cuts to a final shot of the storm drain grate where the infected NPC disappeared — water trickling past it, something faintly glowing beneath the surface.

**On-screen text (season-end card, standard for all seasons):** *"SEASON 1 COMPLETE — FIRST CONTACT"* with points tally, unlock notifications, and a "Continue to Season 2" prompt.

---

# 13. NPC & ENEMY ROSTER (Season 1-specific)

| NPC | Type | Behavior | Notes |
|---|---|---|---|
| Dock Guard | Human, unarmed/baton | Idle patrol, short sight radius | Break In path only |
| Lobby Guards ×2 | Human, sidearm | Patrol loop, standard Suspicious→Alert escalation | All paths (avoidable) |
| Security Office Guard | Human, seated | Stationary, low awareness | Inside Job path only |
| Rival Crew ×3 | Human, sidearms | Guarding hostages, dialogue-reactive | Standoff path only |
| Hostages ×2 | Human, non-combatant | Scripted safe (auto-cover on combat trigger) | Standoff path only |
| Newly-Infected NPC | Human → Vein-marked | Scripted flee behavior post-Crack | Identity determined by nearest-player logic |

---

# 14. FULL DIALOGUE/BARK SCRIPT (implementation-ready list)

```
[COLD_OPEN_01] ECHO: "Tip came in an hour ago. Anonymous. Central Bank's holding something that isn't supposed to exist on a civilian ledger."
[COLD_OPEN_02] ANVIL: "Define 'isn't supposed to exist.'"
[COLD_OPEN_03] ECHO: "Container, government routing code, moved in under a cargo manifest three weeks ago. Whoever moved it didn't want it moved anywhere official."
[COLD_OPEN_04] WISP: "So we're stealing government property nobody admits is missing. Great. Love that for us."
[COLD_OPEN_05] MERCY: "If it's already off the books, nobody's coming to get it back cleanly either way. In or out?"
[COLD_OPEN_06] ANVIL: "In. How do we get to it?"

[PATH_A_01] ANVIL: "Anyone home?"
[PATH_B_01] WISP: "ID's holding. Nobody's even looking twice."
[PATH_C_01_DE-ESCALATE] MERCY: "We're not here for you. Walk away and nobody else gets hurt."
[PATH_C_01_PRESSURE] MERCY: "You've got thirty seconds before this gets loud."
[PATH_C_02] CREW_LEADER: "You really don't know whose job this is, do you?"

[CONVERGENCE_01] ECHO: "Structural scan's clean. Vault door dead ahead."

[CRACK_01] ANVIL_OR_WISP: "That's... not a bank container."
[CRACK_02] ECHO: "Pull the manifest tag. I want to know what agency—"
[CRACK_03] MERCY: "Everyone back up. Back up now."
[CRACK_04] ECHO: "...Everyone still breathing?"
[CRACK_05] INFECTED_NPC: "...Yeah. Yeah, I'm fine."

[EXTRACTION_01] MERCY: "Whatever that thing back there is, it's not our problem anymore."
[EXTRACTION_02] ECHO: "...I don't think we get to decide that."
```

---

# 15. ASSET LIST (for Claude Code / asset pipeline planning)

**Environment models:** bank exterior facade, lobby interior kit (counters, ropes, chandelier, clocks), security office kit, staff corridor kit (lockers, break room), vault stairwell, vault antechamber (terminal + crank props), vault chamber (deposit box walls, the container hero prop), service tunnel kit, docks kit (crane, pier, boat).

**Character models:** 4 player role models (Anvil/Wisp/Mercy/Echo — reused every season), dock guard, lobby guard ×2 variants, rival crew ×3, hostage ×2, infected-NPC variant (post-crack skin with black-gold crack shader).

**Animations:** walk/run/sprint/crouch/prone cycles (shared engine-wide), breach kick, stealth takedown, hack-terminal idle pose, crank-turn loop, QTE "secure container" reach animation, infected-NPC flee cycle.

**VFX:** dust/debris (breach), camera-loop screen glitch, terminal hack success/fail flash, black-gold crack spread shader, container-crack light burst, black-gold skin-crack decal (infected NPC).

**Audio:** all bark lines above (VO), ambient rain (exterior), lobby ambient (echoing footsteps, distant chatter), alarm klaxon (post-Crack), boat engine, tunnel drip/hum ambience, adaptive music layers: Stealth / Alert / Combat / Cutscene-tension stems.

**UI:** path-selection radial menu, dialogue-choice UI (Standoff path), hack-terminal minigame UI (3-stage), crank strength-meter UI, QTE prompt, season-end summary card.

---

# 16. TECHNICAL IMPLEMENTATION NOTES

- **Colyseus room type:** `HeistRoom extends MissionRoom` (per the architecture doc's `rooms/HeistRoom.ts`).
- **State machine flags to track server-side:** `chosenPath` (enum: BreakIn/InsideJob/Standoff), `standoffDialogueChoice` (enum, Standoff only), `vaultMethod` (enum: Hack/Force/Mixed), `crackedNPCIdentity` (string ref, determined by proximity logic at QTE resolution) — this last flag is read by Season 2's room on session start to determine which NPC the team is hunting.
- **Checkpoints (server-authoritative save points):** after path selection, before Vault Antechamber, before Extraction, at mission end — matches the master timeline's checkpoint rule.
- **Struggle Assist triggers:** implement as a generic reusable server-side counter (`failedAttempts` per interactable ID) rather than per-puzzle bespoke code, since this same system is reused in every subsequent season file.
- **Dialogue system:** Standoff path's 3-option choice should use the branching-dialogue JSON format defined in the architecture doc's Section 8, validated server-side since the outcome affects enemy spawn state.
- **Cutscene playback:** all 3 cutscenes are in-engine (Babylon Animation Groups + scripted camera rig per the architecture doc's Section 8 approach) — no video assets. Cutscene 02 specifically needs the "cutscene mode with a live input listener" pattern described there.

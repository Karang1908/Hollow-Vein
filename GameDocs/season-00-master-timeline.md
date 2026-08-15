# HOLLOW VEIN — MASTER TIMELINE & DIFFICULTY BIBLE
### File 0 of 14 — read this before any individual season file

---

## 1. DIFFICULTY TARGET: "MEDIUM-HARD, NEVER UNSOLVABLE"

Every season in this document is tuned to the same standard:

> A coordinated 4-player team, communicating but not hardcore/speedrun-tier, should clear a season on **Standard** difficulty on their first real attempt within roughly the target runtime ±20%, dying and retrying individual encounters along the way — but never fully hard-walled.

### Global fail-safe systems (apply to every season unless a file says otherwise)

1. **Struggle Assist** — after **3 failed attempts** at any single puzzle, hack, or lock, the environment nudges the next correct action (a highlighted conduit, an audio tell, a subtle UI hint). This never *skips* the puzzle, only removes total-blank-wall situations.
2. **Adaptive Encounter Scaling** — after **2 full-squad wipes** in the same combat encounter, enemy count/aggression quietly scales down ~15%; if the team then clears clean, it scales back up for the next encounter. Keeps tension without ever hard-walling a squad.
3. **Checkpoint Rule** — a checkpoint sits immediately before every puzzle, every medium-tier-or-higher encounter, and every boss phase transition. No wipe ever costs more than one beat of replay.
4. **Dual-Path Puzzle Rule** — every puzzle/lock has at least two valid solutions tied to different roles (e.g., Infiltrator hacks it fast and quiet, or Breacher forces it loud and slow) — a missing or downed teammate never fully blocks progress, just makes it slower/louder.
5. **Boss Mercy Toggle** — after **3 full wipes** on any boss, an opt-in "Assist Mode" becomes available (further damage/health reduction). Using it is flagged separately on the leaderboard so clean clears stay meaningful without punishing struggling teams.
6. **Difficulty tiers** — every season file below describes **Standard** tier (the target experience). **Hardened** and **Nightmare** (used in replay/grind loops) are density/damage multipliers layered on top of the same encounters — not full redesigns — so the underlying timeline in each file stays the single source of truth.

---

## 2. LEADERBOARD POINTS FRAMEWORK

- **Base clear points per season** = `500 × season number` (so later, harder seasons are worth proportionally more — Season 1 = 500, Season 12 = 6,000).
- **Clean Clear bonus** (no full-squad wipe across the whole season) = `+300`.
- **Speed bonus** = tiered (`+100` / `+200` / `+300`) for clearing under set time thresholds noted per season file.
- **Hard-mode multiplier** = `×1.5` (Hardened) / `×2` (Nightmare) applied to the base + bonuses.
- **Secret event codes** (GDGoC workshops) generally grant fixed bonus badges/cosmetics rather than points, keeping the main leaderboard skill-driven rather than attendance-driven — see individual season files for any season-specific code hooks.

---

## 3. SEASON FILE INDEX

| # | File | Title | Target Runtime | Structure |
|---|---|---|---|---|
| 1 | `season-01-first-contact.md` | First Contact | ~60 min | Branching heist, tutorial |
| 2 | `season-02-broodling.md` | Broodling | 2–3 hrs | Linear descent + boss |
| 3 | `season-03-buried-files.md` | Buried Files | 2–3 hrs | Parallel-pair infiltration |
| 4 | `season-04-quarantine.md` | Quarantine | 2–3 hrs | Live-branch evacuation |
| 5 | `season-05-competing-interests.md` | Competing Interests | 2–3 hrs | Full squad-split (2+2) |
| 6 | `season-06-hive-beneath.md` | The Hive Beneath | 2–3 hrs | Sustained stealth |
| 7 | `season-07-queens-wake.md` | Queen's Wake | 2–3 hrs | Mid-boss, rotating mechanic |
| 8 | `season-08-awakening-rite.md` | The Awakening Rite | 2–3 hrs | Full 1v1 solo split |
| 9 | `season-09-signal.md` | Signal | 2–3 hrs | Puzzle-combat hybrid |
| 10 | `season-10-dig-in.md` | Dig In | 2–3 hrs | Strategic prep/build |
| 11 | `season-11-siege.md` | Siege | 2–3 hrs | Wave-defense + aircraft |
| 12 | `season-12-origin.md` | Origin | 3+ hrs | Multi-phase finale boss |

Files 13–14 are `hollow-vein-full-story.md` (narrative/world reference — already delivered) and `hollow-vein-technical-architecture.md` (stack/hosting/infra reference — already delivered), both re-included in the final file set for completeness.

---

## 4. HOW TO READ EACH SEASON FILE

Every season file follows the same structure so they're consistent for both a human designer and Claude Code to parse:

- **Header** — runtime target, structure type, points value
- **Pre-Mission** — lobby/role-lock state, briefing
- **Timeline Table** — time-coded phases: objective, role focus, difficulty notes, checkpoint markers
- **Puzzle/Hack Detail** — the dual-path solution for each significant puzzle
- **Encounter Detail** — enemy composition and Standard-tier density
- **Boss Detail** (if applicable) — phase-by-phase timing and mechanics
- **Branch Points** — live choices and their consequences
- **Fragment/Loot Placement** — what drops, when, where
- **Post-Mission** — debrief, points awarded, unlocks

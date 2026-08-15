# HOLLOW VEIN — GAME MODES & THE OPEN WORLD
### Meridian City as a persistent, drivable, living map
### File 16 — the GTA-V + Jailbreak layer alongside the season campaign

---

## 0. TWO MODES

The player picks at the main menu. These are two different games sharing one city, one asset set, one vehicle roster, and one story.

```
                    ┌──────────────────┐
                    │   HOLLOW VEIN    │
                    └────────┬─────────┘
                             │
             ┌───────────────┴───────────────┐
             │                               │
      ┌──────▼───────┐              ┌────────▼────────┐
      │  STORY MODE  │              │   OPEN WORLD    │
      └──────────────┘              └─────────────────┘
       4 players, instanced          16-24 players, persistent shard
       Role-locked co-op             Choose a team: CREW or DOMINION
       12 seasons, PvE               GTA V + Jailbreak, PvP + AI Vein
       The campaign docs             Heists, heat, garage, economy
       (files 1-12) as written       Story delivered as world state
```

- **STORY MODE** is the campaign exactly as the twelve season files describe it: four role-locked players, instanced missions, AI opposition, the full narrative arc from the bank job to Kryptex. Nothing in files 1–12 is discarded.
- **OPEN WORLD** is the GTA V + Jailbreak game: a persistent Meridian, team selection, the heist economy, the vehicle garage, and Dominion hunting you for real.

They share progression where it makes sense (see §8) and share every asset. Building one builds most of the other, which is the main reason this two-mode split is affordable at all.

---

## 1. OPEN WORLD — THE SHAPE

> **GTA V structurally. Jailbreak mechanically. Hollow Vein narratively.**

One persistent city, drivable end to end. On joining, you pick a side:

### 🔵 CREW
The player fantasy of Jailbreak's criminal team, and of the four protagonists before the campaign ever finds them. You rob Meridian, you outrun Dominion, you fund yourself.
- Run heists on cooldown, carry the score out, bank it
- Buy and customize vehicles with the proceeds
- Harvest Vein Shards from infested districts — dangerous, lucrative
- Lose by being arrested (you drop a share of carried cash, not your bank)

### 🔴 DOMINION
The private military contractor from the story docs, now playable. Not police in a civic sense — a corporation enforcing a cordon it was never given the authority to enforce, which is a far more interesting thing to play than a cop.
- Pursue and arrest Crew players carrying stolen goods
- Patrol vehicles with sirens, spike strips, roadblocks, helicopters
- Guard heist sites; response scales with the target's value
- Earn contracts and payroll — Dominion's own currency track and vehicle roster

### 🟡 THE VEIN — the third faction, always AI
Hostile to both teams, always. Infested districts are a genuine no-man's-land. This is what stops Open World from being a straight cops-and-robbers reskin: there is a third thing in the city that does not care which side you picked, and it is winning.

### Team balance
AI Dominion patrols backfill whenever the player Dominion roster is thin, so a Crew player never has an empty city to rob and Open World stays playable at any population. Conversely, a Dominion-heavy shard sees increased AI Vein activity to keep pressure on both sides. Team switching is allowed at a cooldown.

---

## 2. THE MAP

Roughly **2km × 2km**, about 90 seconds corner-to-corner in a fast car. Closer to Jailbreak's scale than GTA's, which is the right call — a dense, fully authored map beats a large empty one, and every district here has to carry named story content as well.

```
                        [ THE CRATER ]
                       cordoned, N-E edge
                              |
        [ AIRFIELD ] ---------+
             |                |
             |          [ DOMINION COMPOUND ]
             |                |
   [ PD HQ & ]--- [ MERIDIAN CENTRAL ] ---- [ OLD DOCKS ]
   [ ARCHIVE ]      towers, the Bank          & HARBOR
        |                |                        |
        +----------- [ LOWFEN ] -----------------+
                    tenements, cult
                          |
                  [ TALIA'S WORKSHOP ]
                          |
      ==================================================
       [ THE UNDERCITY ]  — beneath the entire map
      ==================================================

   THE OVERPASS NETWORK rings all of it, elevated,
   with spurs down into every district. It is the
   ring road: fastest route anywhere, most exposed.
```

### District roles

| District | Open-world identity | Season content |
|---|---|---|
| **Meridian Central** | Downtown. Towers, the Bank, the Museum, Gilded Row. Densest traffic, heaviest Dominion presence. The heist hub. | S1, S8 |
| **Lowfen** | Tenements, alleys, fire escapes, rooftop routes. Low Dominion presence, high cult presence. Bike country. | S4, S8 |
| **Old Docks & Harbor** | Cranes, container stacks, open water. Boats, long sight-lines, jump ramps. | S1, S5, S11 |
| **Dominion Compound** | Dominion's home turf and spawn point. Crew trespass spikes heat instantly. Best gear, worst odds. | S5, S11 |
| **PD HQ & Black-Site** | Government complex. The highest-security heist in the game. | S3 |
| **Airfield** | Decommissioned municipal strip. Hangars, control tower. Where aircraft live. | S11, S12 |
| **The Crater** | Cordoned since S1. Highest infestation, highest Shard yield, no Dominion presence at all. Endgame zone. | S9, S10, S12 |
| **The Undercity** | Tunnel network under the whole map. A second, parallel road system — and the primary escape route from heat. | S2, S6, S7 |
| **The Overpass** | Elevated ring road. Fastest travel, total exposure, no cover from air units. | All |

**Talia's Workshop** is the Crew hub — garage, loadout, forge, mission board. The **Dominion Compound** is the mirror-image hub for the other team.

---

## 3. VEHICLES — THE CENTREPIECE

Jailbreak's vehicle system is the reason people play it, and we take it close to wholesale.

### 3.1 Instant spawn
Summon any owned vehicle from anywhere, no loading, no garage trip. It materialises over ~0.4s. This is Jailbreak's single best quality-of-life decision and it must be in from the first playable build — it sets the pace of the entire game.

### 3.2 Roster tiers

| Tier | Class | Examples | Feel |
|---|---|---|---|
| 0 | Starter | Beater sedan, work van | Free. Slow, tanky, forgiving. |
| 1 | Street | Hatchbacks, compacts, scooters | Cheap, honest, fun to throw around |
| 2 | Performance | Muscle, sport coupes, sportbikes | The sweet spot most play in |
| 3 | Exotic | Supercars | Fast, fragile, expensive |
| 4 | Hyper | Hypercars | Endgame. Genuinely hard to drive well. |
| S | Utility | Crew van (4 seats), tow, flatbed | Mission-enabling, not fast |
| S | Off-road | Dirtbike, buggy, 4×4 | Ignores roads — the Crater, Lowfen alleys |
| S | Marine | Jetski, speedboat, tug | Harbor, flooded Undercity |
| S | Air | Helicopter, light plane | Endgame unlock both teams |
| D | **Dominion-only** | Patrol interceptor, riot truck, spotter heli | Sirens, spike strips, ram bars |

Four visible stats, Jailbreak-style: **Speed · Acceleration · Handling · Durability.** On the purchase screen, honest, no hidden modifiers.

### 3.3 Handling
Arcade, drift-capable, forgiving. Not a sim.
- Grip falls off predictably past a slip-angle threshold, so drifts are *intentional and holdable* rather than accidental
- Nitro: limited charge, ~20s recharge, FOV punch and speed lines (art direction §6)
- Collisions deform visibly and degrade function — smoking engines lose top speed, blown tyres pull steering
- Any vehicle seats passengers. Four in one car is the intended way to travel together.

### 3.4 Customization
Paint (metallic/matte/pearl), rims, tyre profile, wraps and liveries, spoiler, window tint, nitro flame colour, engine tune. Cosmetic and light-stat only. **No pay-to-win** — a GDGoC showcase project, per the original live-ops principle.

---

## 4. HEAT & ARREST — THE CREW/DOMINION LOOP

GTA's five-star wanted system, driven by player Dominion where present and AI Dominion otherwise.

| Heat | Response |
|---|---|
| ★ | One patrol investigates. Losable by driving away. |
| ★★ | Two units actively pursuing. Radio chatter on the HUD. |
| ★★★ | Roadblocks on the Overpass, spike strips |
| ★★★★ | **Dominion Enforcers** — the armored infantry from S3 — plus a spotter helicopter |
| ★★★★★ | District lockdown. Heavy units, air support, no clean ground exit. |

**Arrest:** a Dominion player who reaches a Crew player on foot cuffs them (a short channel, interruptible by that player's teammates — so rescues are real). Arrested Crew respawn at the Workshop and drop a share of *carried* cash, never banked cash. Dominion is paid a bounty scaled to what the target was carrying, so chasing a loaded Crew player out of the Bank matters more than picking off empty-handed stragglers.

### 4.1 The escape mechanic — the good bit

> **Dominion does not follow you into a high-infestation zone.**

Run into the Undercity, the Crater, or a quarantined Lowfen block and pursuit breaks at the boundary. AI Dominion refuses outright; player Dominion *can* follow, but takes Vein-Exposure and loses backup doing it. Heat drains fast in there. Something else starts hunting you.

You escape the police by driving into the monsters. That one rule makes the three factions interact, gives infestation mechanical weight beyond flavour, creates a real decision under pressure, and is entirely native to the story. It is the thing this design has that neither reference game does.

---

## 5. HEISTS

Jailbreak's robbery roster mapped onto Meridian's real locations. Each is a multi-step physical interaction on a cooldown, scaling with crew size, built on the same interaction systems the campaign needs anyway (breach, hack, lockpick, drill).

| Heist | District | Steps | Payout | Cooldown |
|---|---|---|---|---|
| **Gilded Row Jewelers** | Central | Smash cases, grab, run | Low | 5 min |
| **Meridian Central Bank** | Central | Laser grid → vault drill → cash bags | Medium | 10 min |
| **Meridian Museum** | Central | Pressure plates → case bypass → artifact | Medium | 12 min |
| **Harbor Cargo Ship** | Docks | Crane container puzzle → cut → haul | Medium-high | 15 min |
| **Overpass Convoy** | Overpass | Hijack an armored transport *at speed* | High | 20 min |
| **Dominion Supply Drop** | Airborne | Parachute onto a flying transport | High | 25 min |
| **The Black-Site Archive** | PD HQ | Hardest in the game. Full stealth or full assault. | Highest | 30 min |

Carry capacity is limited, so big scores need the crew van or multiple trips — Jailbreak's bag-capacity tension, which is what makes escaping feel earned rather than automatic. Every heist start pings Dominion with a location, so a robbery is always an invitation to a chase.

**Story Mode's Season 1 is the tutorial for this entire loop.** The campaign opens with a bank heist; Open World *is* bank heists. The reference game's signature activity and this story's opening scene were already the same thing.

---

## 6. THE LIVING WORLD

The thing neither Jailbreak nor GTA does, and the strongest argument for this structure.

### 6.1 Infestation simulation
Every district carries an **infestation value, 0–100**, drifting upward over real time and spreading along the Undercity between adjacent districts.

| Infestation | Effect |
|---|---|
| 0–25 | Clean. Normal traffic and pedestrians. Full Dominion patrols. |
| 26–50 | Vein growth on walls, fewer pedestrians, Thralls at night |
| 51–75 | Streets abandoned, ambient horror audio, Crawlers, Dominion thinning |
| 76–100 | **Quarantined.** No traffic, no Dominion, heavy Vein presence, highest Shard yield. |

Both teams can push it back by clearing nodes — the one thing Crew and Dominion are quietly on the same side about. The world visibly rots and recovers via the Vein shader's `spread` uniform (art direction §2.7) rather than by swapping geometry, so it is nearly free to render.

### 6.2 Story Mode rewrites the Open World
Campaign completions set permanent world state on the player's account. This is what ties the two modes together:

- **S1** — the Crater gets cordoned; the Undercity opens
- **S4** — Lowfen quarantine becomes permanent world state
- **S6** — the deep Undercity opens as a drivable tunnel network
- **S7** — the citywide blackout. **Meridian's streetlights go out and stay out**, permanently changing how the map looks and plays at night
- **S10** — fortified districts gain visible barricades and reduced infestation drift
- **S11** — the Airfield opens; aircraft enter Open World
- **S12** — the Crater's deepest layer opens

A player who finishes the campaign returns to an Open World their own story visibly wrecked. Jailbreak's map is static, GTA's barely moves; ours is a record of what the player did. It also gives Open World players a concrete reason to play Story Mode, and vice versa.

### 6.3 Ambient life
Traffic and pedestrian AI, density-scaled per district and per infestation level, pooled and aggressively despawned outside a radius. Empty streets in a quarantined district are not a technical shortcut — they are the point, and they cost least exactly where the horror is highest.

---

## 7. SESSION MODEL

**16–24 players per Open World shard**, split across teams with AI backfill. Not Jailbreak's ~30 — see the technical architecture doc for why authoritative simulation on the target hosting caps out lower, and why it does not hurt this design.

- Talia's Workshop is the Crew social hub; the Compound is Dominion's
- A Crew of four can launch a **Story Mode** season from the Workshop mission board, which instances to a private 4-player room
- Matchmaking fills empty campaign roles, per the original lobby design

---

## 8. PROGRESSION & THE TWO ECONOMIES

| Currency | Earned in | Spends on |
|---|---|---|
| **Cash** | Open World heists (Crew), bounties (Dominion) | Vehicles, customization, gear, cosmetics |
| **Vein Shards** | Infested zones (Open World) + season missions (Story) | The Starbreaker |

Cash cannot buy Shards. That keeps the heist loop honest on its own terms without letting players buy through the story — and it retroactively fixes Season 10's weakest beat. "Talia reveals not enough Shards exist yet" stops being an apology for grind and becomes the moment the campaign hands you to the Open World with a real reason to be there.

Shared across both modes: account level, garage, cosmetics, role skill trees. Season progress and world state are Story-Mode-driven. The 12-season structure doubles as the battle-pass spine, fed by contracts; rewards cosmetic only. GDGoC secret codes grant badges and cosmetics, never power.

---

## 9. WHAT THIS CHANGES ELSEWHERE

Flagged here; the technical architecture doc remains the single source of truth on all of it:

1. **Room architecture** — a persistent `CityRoom` (16–24 players, long-lived, team state) now sits alongside the instanced `MissionRoom` hierarchy. Players move between them without a client restart.
2. **Authority model** — full server authority over 24 players' vehicle physics is not affordable on the target hosting. Vehicles move to client-authoritative-with-validation, the standard approach for driving games. Cash, Shards, heat, arrests, heist state and mission state stay strictly server-authoritative — everything a cheater would want to touch.
3. **PvP hardening** — Open World has human opponents, so arrests, damage and payouts need server validation and rate limiting. Story Mode does not carry this burden.
4. **Build order** — vehicles were step 8. In a game where driving is the connective tissue, they move to immediately after movement. You cannot judge whether this game feels good until you can drive around it.
5. **Streaming** — a 2km² world needs district-level asset streaming and LOD, which a mission-instance design did not.

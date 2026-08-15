# HOLLOW VEIN — ART DIRECTION BIBLE
### Reference target: *Jailbreak* (Badimo) construction · Hollow Vein palette
### File 15 — read before writing any material, light, or mesh code

---

## 0. THE ONE-LINE BRIEF

> Build it the way Jailbreak is built. Light it the way Hollow Vein reads.

Jailbreak looks expensive despite being extremely cheap to render, and it is worth understanding *why* before copying it. It is not high-fidelity. It is **high-clarity**: simple geometry, flat materials, one strong light, and every last polygon spent on the thing the player is actually looking at — the car. We take that construction wholesale and swap the palette from bright-and-friendly to rain-slick-and-dreadful.

We are matching a **design language**, not copying assets. No Jailbreak geometry, textures, or map data enters this project — all of it is Roblox-locked and owned by Badimo regardless. What we take is the approach.

---

## 1. THE CORE INSIGHT: ASYMMETRIC POLY BUDGET

This is the single most important rule in this document.

Jailbreak's environment is *startlingly* cheap. Buildings are boxes with chamfered edges and flat colour. Roads are planes with painted markings. There are almost no normal maps in the world geometry. Then you look at a car and it has modelled wheel spokes, real body panel seams, chrome trim, glass, and emissive light strips.

That asymmetry is the entire trick. The player's eye is on the vehicle 80% of the time, so the vehicle gets 80% of the budget.

| Asset class | Triangle budget | Notes |
|---|---|---|
| **Hero vehicle** (garage-purchasable) | 8,000–15,000 | Modelled wheels, panel seams, glass, emissive strips, chrome |
| **Standard vehicle** (traffic, Dominion patrol) | 3,000–6,000 | Shared wheel mesh, simplified interior |
| **Player character** (4 roles) | 6,000–10,000 | Seen constantly in third person; gets real budget |
| **Enemy / NPC** | 2,000–5,000 | Thralls, guards, pedestrians |
| **Landmark / enterable building** | 2,000–8,000 | Bank, Workshop, PD HQ — places the player goes inside |
| **Background building** | 150–600 | Boxes with chamfers and colour. That is genuinely all. |
| **Street prop** | 50–400 | Lights, hydrants, bins, newsstands — instanced, never unique |

**Corollary:** if a building is not enterable and not a landmark, it is a coloured box. Do not model window frames. Paint them.

---

## 2. MATERIAL RECIPES

The look is **material-driven, not texture-driven**. Very little of what is on screen is a bitmap. This is what keeps it cheap, keeps it coherent, and — critically for an all-code build — keeps it *generatable*, because a material is a handful of numbers and a texture is an art department.

All materials are Babylon `PBRMaterial` on the metallic/roughness workflow.

### 2.1 Environment — concrete, asphalt, brick
```
metallic       0.0
roughness      0.75 – 0.95
albedo         flat colour from the palette in §3
normal map     none (chamfer the geometry instead)
```
Colour blocking does the work. Adjacent surfaces must differ in *value*, not just hue, or the silhouette dissolves at night.

### 2.2 Wet asphalt — the money shot
Rain-slick roads are the highest-impact, lowest-cost thing in this entire art direction. A wet street turns every streetlight and headlight into a vertical smear of colour, which means our mostly-black city is never actually empty.
```
metallic       0.1
roughness      0.12 – 0.25   (puddle mask modulates this)
albedo         --asphalt-wet
reflection     SSRRenderingPipeline
```
Use Babylon's `SSRRenderingPipeline` for screen-space reflections on road surfaces. A tiled puddle mask driving roughness gives variation for nearly free. If SSR proves too expensive on low-end targets, fall back to a planar `MirrorTexture` on flat road sections only, at half resolution.

### 2.3 Vehicle paint
```
metallic          0.0
roughness         0.25 – 0.4
clearCoat.isEnabled     true
clearCoat.intensity     1.0
clearCoat.roughness     0.04
```
Babylon's clear-coat layer is what makes car paint read as car paint rather than plastic. Non-negotiable on hero vehicles.

### 2.4 Chrome / trim
```
metallic       1.0
roughness      0.05 – 0.15
albedo         near-white
```

### 2.5 Glass
```
alpha              0.25
metallic           0.0
roughness          0.05
indexOfRefraction  1.45
```
Windshields get a subtle emissive fresnel rim at night so vehicles stay readable in silhouette.

### 2.6 Emissive light sources
Every streetlight, headlight, neon sign, and HUD element is emissive and feeds bloom. In a desaturated dark city, **emissives are the composition**. Intensity 1.5–4.0 depending on distance from camera.

### 2.7 The Vein — the hero shader
The infection is the only fully saturated thing in the game and needs a bespoke `NodeMaterial`:
- **Substrate:** near-black, roughness 0.6, faintly organic
- **Veining:** animated emissive gold flowing along UV channels or a flow map, intensity 2.0–4.0, pulsing on a slow sine (~0.4 Hz) so it reads as *breathing*
- **Fresnel rim:** gold rim light on grazing angles — makes it glow from within
- **Spread:** a scalar uniform 0→1 driving how far the veining has propagated, so the same material animates infection spreading across a surface at runtime. This one uniform is what lets the open world visibly rot over a campaign (see the open-world doc, §Living World).

---

## 3. PALETTE

The rule: **the world is desaturated, the Vein is not.** Nothing in Meridian competes with the infection for colour. That is what makes it read instantly, and it is why we can get away with such simple geometry — the eye is being directed by colour, not by detail.

```
/* Ground & structure */
--asphalt-wet        #0E1114
--concrete           #2A2E33
--concrete-light     #3D434A
--brick-lowfen       #3A2E2A
--steel-industrial   #33383D

/* Light */
--sodium             #FF9A3C   /* streetlight key — Meridian's signature */
--sodium-dim         #C4702A
--moon-cyan          #5FA8C7   /* cold fill, opposes sodium */
--interior-warm      #FFD9A0
--emergency-red      #D93B3B

/* Sky */
--sky-night-top      #070A0F
--sky-night-horizon  #141C26
--sky-dusk-horizon   #2E2419

/* THE VEIN — the only saturated family in the game */
--vein-black         #0A0806
--vein-gold          #FFC24B   /* emissive */
--vein-gold-deep     #A86B1E
--vein-bloom         #FFE9B0   /* bloom tint only */

/* Factions */
--dominion-red       #D93B3B   /* used sparingly — patrol lights, insignia */
--choir-cyan         #7FE3E0   /* alien tech; cold, clean, non-organic */

/* UI */
--hud-bone           #E8E4DA
--hud-dim            #8A8578
```

**Sodium orange versus moon cyan is the city's core contrast.** Warm pools of streetlight against cold blue shadow. It is a proven, extremely legible night-city scheme and it costs nothing. The Vein's gold sits *near* the sodium hue but is far more saturated and emissive — so infected areas feel like the streetlights have gone wrong, which is a much better horror beat than introducing an unrelated colour.

---

## 4. LIGHTING RIG

One strong key, one cheap fill, and emissives doing the heavy lifting. Same rig everywhere; only the values change.

```
DirectionalLight   "key"    — moon or sun, casts CSM shadows
HemisphericLight   "fill"   — 0.15–0.3 intensity, tinted --moon-cyan
PointLight pool    "street" — pooled, distance-culled, tinted --sodium
```

- **Shadows:** `CascadedShadowGenerator`, 2048 maps, 3 cascades, `stabilizeCascades = true`. Shadows are what sell low-poly geometry as solid — do not skip them to save frames.
- **Street light pool:** never instantiate a real light per lamp post. Maintain a pool of ~16 `PointLight`s reassigned to the nearest lamps each frame. The rest are emissive geometry with bloom only, which is visually indistinguishable past ~25m.
- **Headlights:** `SpotLight`, two per vehicle, shadow-casting only on the local player's vehicle.

### Post-processing stack (`DefaultRenderingPipeline`)
```
bloom              enabled, threshold 0.75, weight 0.35, kernel 48
tonemapping        ACES
imageProcessing    contrast 1.15, exposure 1.0
vignette           subtle, strengthens with Vein-Exposure meter
FXAA               on (TAA later if ghosting is acceptable)
chromaticAberration  very subtle, ramps up under high Vein-Exposure
```
Plus `SSAO2RenderingPipeline` at half resolution. AO is what gives box-buildings weight where they meet the ground.

**Diegetic post:** the vignette and chromatic aberration ramping with the Vein-Exposure meter means the player *sees* their corruption rising without reading a number. Free storytelling from a system we are building anyway.

---

## 5. TIME OF DAY

Full day/night cycle, but weighted. Meridian's default and signature state is **night, wet**. Daytime exists so night lands harder, and so the map is readable while learning it.

| State | Key light | Fill | Notes |
|---|---|---|---|
| Overcast day | white, 2.0 | 0.35 cyan | Flat, drab, readable. Learning state. |
| Golden hour | `--sodium`, 3.0, low angle | 0.25 warm | The prettiest state. Long shadows down the avenues. |
| **Night, wet** (signature) | `--moon-cyan`, 0.4 | 0.15 | Streetlights and headlights carry the frame. SSR at full strength. |
| Blackout (S7) | none | 0.03 | Only the carried light source and emissives. Genuinely dark. |

The Season 7 citywide blackout is already in the story docs and becomes a *world state* here, not a level: the whole open world goes dark. That is the kind of thing this architecture gets for free and Jailbreak's static map cannot do at all.

---

## 6. JUICE — THE FEEL LAYER

Jailbreak feels good to play for reasons that have nothing to do with the renderer, and skipping these would miss the reference entirely.

- **Instant vehicle spawn.** Summon from the garage wherever you stand, no loading, materialise-in over ~0.4s with a Vein-gold shimmer. Jailbreak's single best quality-of-life decision.
- **Nitro:** FOV punch 75°→88° over 0.2s, radial speed lines, a low audio whoosh, exhaust flame. Release snaps FOV back over 0.5s with slight overshoot.
- **Impact:** screen shake scaled to collision impulse, spark particles, a brief 0.05s hitstop on heavy hits.
- **Drift:** tyre smoke, dark surface streaks that persist ~20s, a rising audio squeal tied to slip angle.
- **Cash tick-up:** counters roll rather than snapping. Big, bone-white, confident numerals.
- **Camera:** slight FOV widening with speed, subtle lag on the follow cam, tilt into turns. The camera is a character.

---

## 7. UI

Big, confident, high-contrast — Jailbreak's UI is legible on a phone screen at arm's length and ours should hold the same bar. Bone-white on near-black, generous weight, minimal chrome.

- **In-world 3D elements** (objective markers, interaction prompts, waypoints): Babylon GUI, depth-aware
- **Screens** (garage, map, loadout, battle pass): React layer over the canvas
- **Diegetic where cheap:** the heat meter is Dominion scanner static bleeding into the HUD edge; Vein-Exposure is the vignette, not a bar

---

## 8. PERFORMANCE TARGETS

Electron bundles Chromium, so we control the graphics stack exactly — the same code path on every machine.

| Target | Spec |
|---|---|
| **Minimum** | 1080p / 60fps on Apple M1 or Intel Iris Xe |
| **Recommended** | 1440p / 120fps on a discrete GPU |
| Draw calls | < 1,200 per frame |
| Triangles on screen | < 2.5M |

Techniques, in priority order: thin instances for all repeated props, 3 LOD levels on buildings, aggressive frustum and distance culling, texture atlasing per district, `freezeActiveMeshes()` on static world geometry, and a hard cap on simultaneous shadow-casting lights (4).

---

## 9. WHY THIS DIRECTION DE-RISKS THE PROJECT

Worth stating explicitly, because it reverses the biggest problem flagged in the original review of these docs.

The original architecture implied a photoreal AAA look — a bank lobby with a chandelier, rigged characters, VFX, VO. That is a full art department, and an all-code build cannot produce it.

This direction is different in kind. Flat materials, chamfered boxes, colour blocking and one strong light are all **numbers in code**. A district of background buildings is a procedural generator, not a modelling task. The poly budget concentrates real authored detail into a vehicle roster — a bounded, well-understood problem with excellent CC0 sources (Quaternius, Kenney) and a clear upgrade path to commissioned models later.

Adopting Jailbreak's construction did not just set a visual target. It made the project buildable.

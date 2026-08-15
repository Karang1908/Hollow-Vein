/**
 * Meridian's colour system — the single source of truth for every material,
 * light and UI element in the game.
 *
 * Transcribed from `GameDocs/hollow-vein-art-direction.md` §3. The governing
 * rule: the world is desaturated, the Vein is not. Nothing in Meridian competes
 * with the infection for colour, which is what lets the eye be directed by
 * colour rather than by geometric detail — and is why the environment can stay
 * as cheap as it does.
 *
 * Values are sRGB hex. Convert to linear at the point of use (Babylon's
 * `Color3.FromHexString` handles this via the scene's image processing).
 */

/** Ground & structure — flat, high-roughness, near-zero metallic. */
export const GROUND = {
  asphaltWet: '#0E1114',
  concrete: '#2A2E33',
  concreteLight: '#3D434A',
  brickLowfen: '#3A2E2A',
  steelIndustrial: '#33383D',
} as const;

/**
 * Light sources. Sodium orange against moon cyan is Meridian's core contrast —
 * warm pools of streetlight in cold blue shadow. Proven, legible, and free.
 */
export const LIGHT = {
  /** Streetlight key. Meridian's signature colour. */
  sodium: '#FF9A3C',
  sodiumDim: '#C4702A',
  /** Cold fill, deliberately opposing sodium. */
  moonCyan: '#5FA8C7',
  interiorWarm: '#FFD9A0',
  emergencyRed: '#D93B3B',
} as const;

export const SKY = {
  nightTop: '#070A0F',
  nightHorizon: '#141C26',
  duskHorizon: '#2E2419',
} as const;

/**
 * THE VEIN — the only saturated family in the game.
 *
 * The gold sits near the sodium hue but is far more saturated and emissive, so
 * infected areas read as streetlights that have gone wrong. That is a better
 * horror beat than introducing an unrelated colour would be.
 */
export const VEIN = {
  black: '#0A0806',
  /** Emissive. Intensity 2.0-4.0 depending on distance from camera. */
  gold: '#FFC24B',
  goldDeep: '#A86B1E',
  /** Bloom tint only — never an albedo. */
  bloom: '#FFE9B0',
} as const;

/** Faction accents. Used sparingly — insignia, patrol lights, tech glow. */
export const FACTION = {
  dominionRed: '#D93B3B',
  /** Alien tech: cold, clean, conspicuously non-organic. */
  choirCyan: '#7FE3E0',
} as const;

/** UI. Bone-white on near-black, high contrast, generous weight. */
export const HUD = {
  bone: '#E8E4DA',
  dim: '#8A8578',
} as const;

/**
 * Flat lookup over every colour in the system.
 *
 * Grouped members are re-keyed with their group prefix rather than spread bare:
 * `SKY.nightTop` and `HUD.bone` are clear in context, but a flat `nightTop` or
 * `bone` is not. Every key here is unambiguous on its own.
 */
export const PALETTE = {
  ...GROUND,
  ...LIGHT,
  ...FACTION,
  skyNightTop: SKY.nightTop,
  skyNightHorizon: SKY.nightHorizon,
  skyDuskHorizon: SKY.duskHorizon,
  veinBlack: VEIN.black,
  veinGold: VEIN.gold,
  veinGoldDeep: VEIN.goldDeep,
  veinBloom: VEIN.bloom,
  hudBone: HUD.bone,
  hudDim: HUD.dim,
} as const;

export type PaletteKey = keyof typeof PALETTE;

<h1 align="center">HOLLOW VEIN</h1>

<p align="center">
  <em>A meteorite that isn't a meteorite lands outside Meridian City.<br>
  A routine bank heist cracks it open.</em>
</p>

---

A 3D multiplayer game built on Babylon.js and Colyseus, wrapped in Electron.

## Two modes, one city

**Story Mode** — a four-player, role-locked co-op campaign across twelve seasons. Four specialists (Breacher, Infiltrator, Sentinel, Analyst) chase a spreading half-intelligent infection through the underside of a city, from an off-the-books bank job to the thing waiting at the bottom of the crater. Every puzzle has at least two solutions tied to different roles, so a downed teammate makes things slower and louder — never impossible.

**Open World** — a persistent Meridian you can drive end to end. Pick a side: run heists as the **Crew**, or hunt them as **Dominion Dynamics**. Buy and customize vehicles, outrun a five-star pursuit, and harvest Vein Shards from quarantined districts. Dominion won't follow you into an infested zone — which means escaping the law usually involves driving toward something worse.

The campaign permanently rewrites the open world. Finish Season 7 and Meridian's streetlights go out for good.

## Design targets

*GTA V* for structure. *Jailbreak* (Badimo) for construction, vehicle feel, and heist design. The look is Jailbreak's — low-poly, lighting-driven, with the polygon budget spent almost entirely on vehicles — lit as a desaturated, rain-slick night city where the infection's black-gold is the only fully saturated colour on screen.

## Stack

TypeScript · [Babylon.js](https://www.babylonjs.com/) + Havok · [Colyseus](https://colyseus.io/) · Vite · React · Electron · pnpm monorepo · Postgres + Prisma

## Documentation

The full design lives in [`GameDocs/`](./GameDocs) — design bible, art direction, open-world systems, technical architecture, and a file per season. [`Season1/`](./Season1) holds an implementation-ready production spec for the opening season.

## Status

🚧 **Pre-alpha.** Design complete, implementation beginning. See the build order in the [technical architecture doc](./GameDocs/hollow-vein-technical-architecture.md#6-build-order).

---

<p align="center"><sub>Built for the GDGoC community.</sub></p>

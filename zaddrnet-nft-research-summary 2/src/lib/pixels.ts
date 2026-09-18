/* ------------------------------------------------------------------
   ZADDR pixel-face engine — deterministic, mirrored, trait-driven.
   A face you can see. An owner you can't.
------------------------------------------------------------------- */

export interface Trait {
  name: string;
  pts: number;
}

export interface Avatar {
  seed: number;
  id: string;
  N: number;
  grid: Uint8Array; // N*N — 255 = empty, otherwise palette index
  palette: string[];
  traits: Trait[];
  score: number;
  tier: string;
}

const N = 10;
const EMPTY = 255;

/* palette indices */
const P_BASE = 0;
const P_SHADE = 1;
const P_EYE = 2;
const P_HAIR = 3;
const P_ACCENT = 4;
const P_DARK = 5;

function mulberry(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Skin {
  name: string;
  weight: number;
  pts: number;
  base: string;
  shade: string;
  eye: string;
  hair: string[];
}

const SKINS: Skin[] = [
  { name: "", weight: 26, pts: 0, base: "#e8b98a", shade: "#c08b58", eye: "#1c1915", hair: ["#241d16", "#4a3220", "#d8c08a", "#7a4a26"] },
  { name: "", weight: 20, pts: 0, base: "#f0d5b5", shade: "#c9a67c", eye: "#191612", hair: ["#1b1712", "#c8b06a", "#8a3b22", "#e5dcc6"] },
  { name: "", weight: 16, pts: 0, base: "#a9764f", shade: "#7d5232", eye: "#14110e", hair: ["#151210", "#2e2015", "#c98d3a"] },
  { name: "ORCHARD GOLD", weight: 9, pts: 16, base: "#f4b728", shade: "#c18c12", eye: "#100e06", hair: ["#17150c", "#6b5410", "#ffe9a3"] },
  { name: "ZERO-KNOW GREEN", weight: 8, pts: 14, base: "#46ff9c", shade: "#1ec96e", eye: "#06130c", hair: ["#0c1f15", "#9dffd0", "#123524"] },
  { name: "VOID VIOLET", weight: 5, pts: 12, base: "#8f7bff", shade: "#5f4bd6", eye: "#0d0a1f", hair: ["#171236", "#d9d2ff", "#332a80"] },
  { name: "GHOST PROTOCOL", weight: 4, pts: 22, base: "#e6e6e6", shade: "#a3a3a3", eye: "#0a0a0a", hair: ["#0f0f0f", "#3d3d3d", "#ffffff"] },
];

const ACCENTS = ["#f4b728", "#f4b728", "#46ff9c", "#ffd764", "#5ad1ff"];

function pickSkin(r: () => number): Skin {
  const total = SKINS.reduce((s, k) => s + k.weight, 0);
  let x = r() * total;
  for (const k of SKINS) {
    x -= k.weight;
    if (x < 0) return k;
  }
  return SKINS[0];
}

export function generateAvatar(seed: number): Avatar {
  const r = mulberry(seed);
  const grid = new Uint8Array(N * N).fill(EMPTY);
  const traits: Trait[] = [];

  const skin = pickSkin(r);
  const hair = skin.hair[Math.floor(r() * skin.hair.length)];
  const accent = ACCENTS[Math.floor(r() * ACCENTS.length)];
  const palette = [skin.base, skin.shade, skin.eye, hair, accent, "#0b0a07", "#f5f2e8"];

  if (skin.name) traits.push({ name: skin.name, pts: skin.pts });

  /* head profile — half-width per row, mirrored around 4.5 */
  const base = [2, 4, 5, 5, 5, 5, 5, 4, 3, 2];
  const hw = base.map((b) =>
    Math.max(2, Math.min(5, b + (r() < 0.38 ? (r() < 0.5 ? -1 : 1) : 0)))
  );
  hw[0] = Math.min(hw[0], 3);
  hw[9] = Math.min(hw[9], 3);

  const hairRows = 1 + (r() < 0.6 ? 1 : 0) + (r() < 0.2 ? 1 : 0);

  for (let row = 0; row < N; row++) {
    const lo = 5 - hw[row];
    const hi = 4 + hw[row];
    for (let c = lo; c <= hi; c++) {
      let v: number = P_BASE;
      if (row < hairRows) {
        v = r() < 0.82 ? P_HAIR : row === 0 ? EMPTY : P_BASE;
      } else {
        if (r() < 0.16) v = P_SHADE;
        if ((c === lo || c === hi) && r() < 0.5) v = P_SHADE;
      }
      grid[row * N + c] = v;
    }
  }

  /* eyes */
  const er = 3 + (r() < 0.45 ? 1 : 0);
  const ec = r() < 0.5 ? 3 : 2;
  const wide = r() < 0.45;
  const setEye = (row: number) => {
    grid[row * N + ec] = P_EYE;
    grid[row * N + 9 - ec] = P_EYE;
  };
  setEye(er);
  if (wide && er + 1 < 9) setEye(er + 1);
  if (wide) traits.push({ name: "DEEP SET", pts: 4 });

  /* shades band / visor */
  const rolled = r();
  if (rolled < 0.13) {
    for (let c = 5 - hw[er]; c <= 4 + hw[er]; c++) grid[er * N + c] = P_DARK;
    if (wide && er + 1 < 9)
      for (let c = 5 - hw[er + 1]; c <= 4 + hw[er + 1]; c++) grid[(er + 1) * N + c] = P_DARK;
    traits.push({ name: "BLACKOUT SHADES", pts: 10 });
  } else if (rolled < 0.22) {
    for (let c = 5 - hw[er]; c <= 4 + hw[er]; c++) grid[er * N + c] = P_ACCENT;
    if (er + 1 < 9)
      for (let c = 5 - hw[er + 1]; c <= 4 + hw[er + 1]; c++) grid[(er + 1) * N + c] = P_ACCENT;
    traits.push({ name: "SECTOR VISOR", pts: 16 });
  }

  /* mouth */
  const mw = r() < 0.5 ? 1 : 2;
  for (let c = 5 - mw; c <= 4 + mw; c++) {
    const i = 7 * N + c;
    if (grid[i] !== EMPTY) grid[i] = P_DARK;
  }

  /* beard */
  if (r() < 0.14) {
    for (let row = 6; row <= 8; row++)
      for (let c = 5 - hw[row]; c <= 4 + hw[row]; c++)
        if (grid[row * N + c] !== EMPTY && r() < 0.55) grid[row * N + c] = P_HAIR;
    traits.push({ name: "BURNER BEARD", pts: 6 });
  }

  /* headset */
  if (r() < 0.12) {
    for (let row = 3; row <= 6; row++) {
      grid[row * N + (5 - hw[row])] = P_ACCENT;
      grid[row * N + (4 + hw[row])] = P_ACCENT;
    }
    grid[7 * N + (5 - hw[7] + 1)] = P_ACCENT;
    traits.push({ name: "COMMS HEADSET", pts: 12 });
  }

  /* crown */
  if (r() < 0.05) {
    for (let c = 0; c < N; c++) if (grid[c] !== EMPTY) grid[c] = P_ACCENT;
    traits.push({ name: "ORCHARD CROWN", pts: 26 });
  }

  /* earring */
  if (r() < 0.1) {
    grid[6 * N + (4 + hw[6])] = P_ACCENT;
    traits.push({ name: "GOLD LOOP", pts: 6 });
  }

  const score = 8 + traits.reduce((s, t) => s + t.pts, 0);
  const tier =
    score >= 48 ? "1/1 CIPHER" :
    score >= 34 ? "LEGENDARY" :
    score >= 24 ? "RARE" :
    score >= 16 ? "OPERATOR" : "COMMON FACE";

  const id = "0x" + (seed >>> 0).toString(16).toUpperCase().padStart(8, "0");
  return { seed, id, N, grid, palette, traits, score, tier };
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 0xffffffff);
}

export function drawAvatar(
  ctx: CanvasRenderingContext2D,
  av: Avatar,
  cell: number,
  ox = 0,
  oy = 0
): void {
  for (let y = 0; y < av.N; y++) {
    for (let x = 0; x < av.N; x++) {
      const v = av.grid[y * av.N + x];
      if (v === EMPTY) continue;
      ctx.fillStyle = av.palette[v];
      ctx.fillRect(ox + x * cell, oy + y * cell, cell, cell);
    }
  }
}

/** prerender an avatar onto its own tile canvas (for the hero wall) */
export function makeTile(av: Avatar, size: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const cell = Math.max(1, Math.floor(size / av.N));
  const off = Math.floor((size - cell * av.N) / 2);
  drawAvatar(ctx, av, cell, off, off);
  return c;
}

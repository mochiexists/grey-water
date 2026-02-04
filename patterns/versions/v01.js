// Grey Water — v0.1 groove pass (Strudel)
// 160 BPM (Chicago time) — laundromat-coded, Prism-coded.
//
// Goals:
// - More footwork, less "fast house"
// - Keep the vacuum on the last 16th (the room inhales before reset)
// - Give snare + clap different frequency homes
// - Keep percussive elements dry; room lives in hum + vacuum
//
// Notes:
// - Still using built-in drums: bd, sd, cp, hh
// - v1 will swap in real laundromat field recordings

let BPM = 160;

// --- low room hum (approx 60Hz vibe) ---
// (Pitch isn't literal Hz; this reads as "power grid" in context.)
let hum = note("d1")
  .s("sine")
  .lpf(90)
  .gain(0.18)
  .room(0.7);

// --- footwork kick grid ---
// More gaps + a couple doubles; less 4-on-the-floor implication.
let kicks = s("bd")
  .struct("x ~ x [~ x]  ~ x ~ [x x]  x ~ ~ x  ~ [x x] ~ ~")
  .gain(0.95);

// --- snare/clap ---
// Snare lives 800–2k-ish; clap is brighter + drier.
let snare = s("sd")
  .struct("~ ~ ~ ~  x ~ ~ ~  ~ ~ x ~  ~ ~ ~ ~")
  .gain(0.52)
  .hpf(800);

let claps = s("cp")
  .struct("~ ~ x ~  ~ ~ ~ ~  ~ x ~ ~  ~ ~ ~ ~")
  .gain(0.28)
  .hpf(2600);

// One intentional stacked moment (snare+clap together)
let stackHit = stack(
  s("sd").struct("~ ~ ~ ~  ~ ~ ~ ~  ~ ~ ~ ~  ~ ~ x ~").gain(0.45).hpf(900),
  s("cp").struct("~ ~ ~ ~  ~ ~ ~ ~  ~ ~ ~ ~  ~ ~ x ~").gain(0.25).hpf(3200)
);

// --- hats: jittery + panned ---
let hats = s("hh*8")
  .struct("x x ~ x  x ~ x x")
  .gain(0.33)
  .hpf(4500)
  .pan(sine.range(-0.25, 0.25).slow(2));

// --- coin/click texture (placeholder until real samples) ---
let clicks = s("cp")
  .struct("~ ~ ~ x  ~ ~ x ~  ~ ~ ~ ~  x ~ ~ ~")
  .gain(0.07)
  .hpf(3200)
  .delay(0.25)
  .delaytime(0.125)
  .delayfeedback(0.22);

// --- vacuum moment ---
// Bright, held tone on the last 16th: inhale → reset.
let vacuum = note("c5")
  .s("sine")
  .attack(0.02).decay(0.6).sustain(0.2).release(0.3)
  .gain(0.18)
  .struct("~ ~ ~ ~  ~ ~ ~ ~  ~ ~ ~ ~  ~ ~ ~ x")
  .room(0.95);

let p = stack(
  hum,
  kicks,
  snare,
  claps,
  stackHit,
  hats,
  clicks,
  vacuum,
);

// Visualizer (if available): punchcard for the running pattern
if (p._punchcard) p = p._punchcard("grey-water");

p.cpm(BPM/4)

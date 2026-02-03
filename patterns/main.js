// Grey Water — first footwork sketch (Strudel)
// 160 BPM (Chicago time) — laundromat-coded, Prism-coded.
//
// Goal for v0:
// - Get a *footwork-feeling* drum grid immediately (no external samples yet)
// - Put the 60Hz room hum under it
// - Make a "vacuum" moment (528Hz-ish) that snaps back into the drop
//
// Notes:
// - This uses Strudel's built-in drum names: bd, sd, cp, hh.
// - We’ll swap in real laundromat field recordings next.

const BPM = 160;

// --- low room hum (approx 60Hz vibe) ---
// (Strudel note pitch isn’t literal Hz, but this reads as "power hum" in context.)
const hum = note("d1")
  .s("sine")
  .lpf(90)
  .gain(0.18)
  .room(0.6);

// --- footwork kick grid ---
// 16-step pattern with syncopation + doubles.
const kicks = s("bd")
  .struct("x ~ x x ~ x ~ [x x]  x ~ x ~  x [~ x] ~")
  .gain(0.95);

// --- snare/clap: sparse, speaks in the gaps ---
const snare = s("sd")
  .struct("~ ~ ~ ~  x ~ ~ ~  ~ ~ x ~  ~ ~ ~ ~")
  .gain(0.55)
  .hpf(800);

const claps = s("cp")
  .struct("~ ~ x ~  ~ ~ ~ ~  ~ x ~ ~  ~ ~ ~ ~")
  .gain(0.35)
  .hpf(1200)
  .room(0.4);

// --- hats: jittery + panned ---
const hats = s("hh*8")
  .struct("x x x ~ x ~ x x")
  .gain(0.35)
  .hpf(4000)
  .pan(sine.range(-0.25, 0.25).slow(2));

// --- coin/click texture (placeholder until real samples) ---
const clicks = s("cp")
  .struct("~ ~ ~ x  ~ ~ x ~  ~ ~ ~ ~  x ~ ~ ~")
  .gain(0.08)
  .hpf(3000)
  .delay(0.3)
  .delaytime(0.125)
  .delayfeedback(0.25);

// --- vacuum moment ---
// A bright, held tone that feels like the room inhales.
const vacuum = note("c5")
  .s("sine")
  .attack(0.02).decay(0.6).sustain(0.2).release(0.3)
  .gain(0.18)
  .struct("~ ~ ~ ~  ~ ~ ~ ~  ~ ~ ~ ~  ~ ~ ~ x")
  .room(0.9);

stack(
  hum,
  kicks,
  snare,
  claps,
  hats,
  clicks,
  vacuum,
)
// Strudel uses cycles-per-minute; 4 beats per bar ⇒ cpm = bpm/4
.cpm(BPM/4)

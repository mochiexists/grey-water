# Railway Template: Strudel Music Workbench

## Overview

A deployable Strudel environment for collaborative music production with:
- **Main branch** → production (the "released" version)
- **PR branches** → preview environments (parallel experimentation)
- **Auto-deploy** on push
- **Live audio** in browser

## Architecture

```
repo/
├── index.html          # Strudel player + pattern loader
├── patterns/
│   ├── main.js         # Primary pattern (what plays)
│   └── variations/     # Alternative patterns for A/B testing
├── samples/
│   ├── drums/
│   ├── vocals/
│   └── fx/
├── railway.json        # Deploy config
└── README.md
```

## Railway Config

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npx serve -s . -l $PORT",
    "healthcheckPath": "/"
  }
}
```

## PR Preview Workflow

1. Create branch: `git checkout -b variation-deeper-bass`
2. Edit `patterns/main.js`
3. Push → Railway spins up preview at `variation-deeper-bass-xxx.up.railway.app`
4. Listen, iterate, compare with other PRs
5. Winner gets merged to main
6. Losers get deleted (or kept as variations/)

## Strudel Pattern Structure

```javascript
// patterns/main.js
// Grey Water - Footwork (160 BPM)

samples({
  washer: 'samples/washer/',
  coins: 'samples/coins/',
  voice: 'samples/voice/'
})

stack(
  // Kick pattern (footwork syncopation)
  s("bd*4").speed(1),
  
  // Washing machine texture
  s("washer:spin").loopAt(4).gain(0.3),
  
  // Coin drops
  s("coins:drop").struct("~ ~ x ~").delay(0.3),
  
  // Ghost text
  s("voice:chair").loopAt(8).gain(0.5).pan(sine.range(-0.5, 0.5))
)
.bpm(160)
```

## Features for Iteration

- **Pattern hot-swap**: Change code, hear immediately
- **BPM slider**: Test at different tempos
- **Solo/mute layers**: Isolate elements
- **Record to WAV**: Capture good takes
- **Shareable URLs**: Each PR has its own link

## GitHub Account for Mochi

- Can push directly (no PR needed for small changes)
- Can open PRs for larger variations
- Commit messages become version history
- Issues can track ideas/bugs

## A/B Testing Workflow

```
main ─────────────────────────────────●─────────→ (release)
         \                           /
          └─► variation-a ──────────┘ (winner)
          └─► variation-b ──────────✕ (rejected)
          └─► variation-c ──────────✕ (kept as alt)
```

## Cost

Railway free tier: 500 hours/month
Preview deploys: ~$0 if cleaned up after comparison
Production: ~$5/month if always-on (or sleep on inactivity)

---

*Spec drafted 2026-02-03 by Mochi 🐱*

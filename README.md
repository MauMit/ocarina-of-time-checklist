# Ocarina of Time Checklist

A single-page tracker for every collectible in *The Legend of Zelda: Ocarina of Time*. Check things off as you collect them.

**Live site:** https://maumit.github.io/ocarina-of-time-checklist/

## What's tracked (243 items)

| Category | Count |
| --- | --- |
| Pieces of Heart + Heart Containers | 36 + 8 |
| Gold Skulltulas | 100 |
| Songs (incl. Scarecrow's Song) | 13 |
| Upgrades (bag expansions, wallets, strength, scales, Great Fairy gifts) | 21 |
| Bottles (incl. the remake's new fifth) | 5 |
| Items | 19 |
| Equipment | 10 |
| Quest status (Stones, Medallions, Echo Gem, Gerudo Pass, Epona) | 12 |
| Trading sequences | 19 |

Each entry has a hint plus tags for the age needed, night-only, and the key item it requires.

## Features

- Heart meter that fills by quarters as you collect Pieces of Heart
- Gold Skulltula token counter with House of Skulltula reward milestones
- Search across every category, Child/Adult filter, hide-collected toggle
- Progress is saved in your browser, or synced across devices with Google sign-in once Firebase is configured

Built for the 2026 Switch 2 remake and checked against IGN's remake guides (the # on Heart Pieces and Gold Skulltulas matches their numbering). The child mask trade and the 40- and 100-token Skulltula rewards still follow the original game.

It's one static `index.html` with no build step. Open it locally or host it anywhere.

## Cross-device sync (Google sign-in)

Sync is off until `firebase-config.js` has a config. To turn it on:

1. Create a free project at https://console.firebase.google.com (Analytics not needed).
2. **Authentication → Sign-in method:** enable **Google**.
3. **Authentication → Settings → Authorized domains:** add `maumit.github.io`.
4. **Firestore Database:** create a database (production mode), then paste `firestore.rules` into the **Rules** tab and publish.
5. **Project settings → Your apps:** add a **Web** app and copy its `firebaseConfig` into `firebase-config.js`.

Each user's progress is stored at `progress/{uid}` and only that user can read or write it. Ticks made before signing in are merged into the account the first time you sign in on that device.

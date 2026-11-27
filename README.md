# Oceanwide Christmas Party 2026 · Raffle and Judges' Scoresheet

This folder is a ready-to-host website with two pages:

| Page | Address after hosting |
|---|---|
| Start page with both links | `your-site/` |
| The Grand Raffle | `your-site/raffle/` |
| Judges' Scoresheet | `your-site/judging/` |

Nobody needs a Claude account to open these pages.

## Two ways to run them

**1. One device only (no setup).** Leave `ow-config.js` as it is. Each page saves its data in the browser of the device it runs on.
- Raffle: fine as it is. Load the names and prizes on the raffle laptop and run the draw from that same laptop and browser.
- Scoresheet: the judges pass one phone or tablet around.

**2. Synced across devices (about 10 minutes of setup).** Judges score on their own phones and you see the results live on yours. Uses Firebase, a free Google service.

## Step 1. Put the site online

Pick one of these:

- **Netlify Drop (easiest):** sign in at netlify.com (free), open https://app.netlify.com/drop and drag this whole folder onto the page. You get a link like `https://something.netlify.app`. Rename the site in Site settings if you want a nicer name. To update later, drag the folder again under the site's Deploys tab.
- **GitHub Pages:** create a repository, upload all the files keeping the folders, then go to Settings → Pages → Deploy from a branch → `main` / root. The link is `https://username.github.io/repository-name/`.
- **Vercel:** in this folder run `npx vercel` and follow the prompts.

## Step 2 (only for sync). Set up Firebase

1. Open https://console.firebase.google.com and click **Create a project**. Name it, for example, `oceanwide-xmas`. Google Analytics is not needed.
2. In the left menu open **Build → Firestore Database → Create database**. Pick the Singapore location (`asia-southeast1`) and start in **production mode**.
3. Open the **Rules** tab, replace everything with the rules below and click **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{col}/{doc} {
      allow read, write: if col in ['people', 'prizes', 'winners', 'config', 'scores']
        && request.time < timestamp.date(2026, 12, 20);
    }
  }
}
```

   These rules let the two pages read and write until December 20, 2026, then lock the data automatically.

4. Click the gear icon → **Project settings** → **Your apps** → the web icon `</>`. Register an app (any nickname, no hosting needed) and copy the `firebaseConfig` values it shows.
5. Open `ow-config.js` in a text editor and replace `null` with your config, like the example in the file:

```
window.OW_FIREBASE = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  appId: "..."
};
```

6. Change `OW_ADMIN_PIN` to your own PIN.
7. Upload the folder again (Step 1).

When sync is on, the top of each page says **Live**.

## Organizer PIN

With sync on, judges and viewers can't change the setup or run the draw. Tap **Organizer login** at the bottom left of the page and enter the PIN to unlock the organizer controls on that device.

The PIN hides the controls but is not real security: anyone who has the link and knows how could still change data until December 20. Only share the links with the people who need them.

## Before the event

- The hosted pages start empty. They don't share data with the versions on claude.ai, so add the participants, prizes, groups and judges again.
- Do a full test run with real phones on the venue Wi-Fi, then use **Clear all scores** on the scoresheet.
- Keep a copy of this folder on the raffle laptop. If the internet drops, open `raffle/index.html` straight from the folder in Chrome. It runs in one-device mode (enter the names on that laptop beforehand); fonts fall back to similar ones without internet.

## Files

| File | What it is |
|---|---|
| `index.html` | Start page with links to both pages |
| `raffle/index.html` | The Grand Raffle |
| `judging/index.html` | Judges' Scoresheet |
| `ow-config.js` | Your settings: Firebase config and organizer PIN |
| `ow-backend.js` | Connects the pages to Firebase. Do not edit. |

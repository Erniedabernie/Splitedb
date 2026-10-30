# Splitedb

A two-person expense tab for a short stretch of time, such as a trip. Add what each person paid, choose how it splits, and one ring shows who paid, whose share it was and who owes whom. Totals are in HK$; US$ and Indonesian rupiah convert at the tab's own rate.

## Install on iPhone

1. Open the GitHub Pages link in Safari.
2. Share → Add to Home Screen. The coin icon (a silver and blue ring with EDB in the middle) should appear in the preview before you tap Add.
3. Open it from the Home Screen. After the first open it works with no signal.

## Your data

Entries are saved on the phone, inside the app. Nothing is sent to GitHub or anywhere else, so this repository holds only the app's code.

Use **Settings → Back up** now and then (and before deleting the app or changing phone). It saves a small `.json` file you can keep in Files, Notes or a message to yourself. **Restore from backup** brings it back on any device.

## Files

| File | What it is |
|---|---|
| `index.html` | The app |
| `edb-brand.css` | EDB design system v2.0.0 |
| `manifest.webmanifest`, `*.png` | Home-screen name and icons |
| `sw.js` | Offline support |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

© Ernest Tung · EDB v2.0.0

# Popat ❤️ Chaklii — Mobile Premiere Edition

A phone-first, single-page cinematic story with 19 numbered scenes, interactive choices, a relationship counter, memory cards, a final keepsake letter, generated ambient sound, and mobile-safe navigation.

## What was improved

- All 19 numbered scenes are preserved.
- Long scenes scroll properly instead of being cut off or skipped.
- The bottom button becomes a reader control: it scrolls through long content before moving to the next scene.
- Swipe navigation remains available at the top/bottom of each scene.
- Phone safe-area support for iPhone/Android browser chrome and notches.
- Better mobile typography, tap targets, scene transitions, card depth, and final-letter readability.
- No missing MP3 dependency: soft ambience and touch sounds are generated in the browser after the viewer taps Enter.
- The developer-facing memory placeholder instructions were removed from the movie.
- The repeated long letter was replaced by a shorter promise in Scene 13 and one stronger final keepsake letter in Scene 18.
- Web-app manifest/icon included for Add to Home Screen behavior on supported phones.

## Optional: add your own photos

Put five JPG photos in this folder using these exact filenames:

- `assets/images/memories/01.jpg`
- `assets/images/memories/02.jpg`
- `assets/images/memories/03.jpg`
- `assets/images/memories/04.jpg`
- `assets/images/memories/05.jpg`

If a photo is missing, the movie automatically shows a finished-looking memory placeholder instead of a broken image.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload the **contents of this folder** so `index.html`, `style.css`, `script.js`, `manifest.webmanifest`, and `assets/` appear at the repository root.
3. Commit the files to the `main` branch.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select `main` and `/ (root)`, then save.
7. GitHub will publish a URL similar to `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.
8. Send that single URL. It opens directly in Safari/Chrome on a phone.

### Important privacy note

GitHub Pages sites are publicly available on the internet. Do not include private photos, sensitive messages, addresses, phone numbers, or anything you would not want publicly accessible.

## Phone viewing

- Open the link in Safari or Chrome.
- Tap **Enter Our Story** to enable the generated ambience.
- Swipe up/left to advance once a scene is fully read.
- Long scenes can be scrolled normally.
- The bottom **Keep Reading / Continue** button prevents accidental skipping.
- On supported phones, the page can be added to the Home Screen for a more app-like presentation.

## Main files

- `index.html` — all scene structure and story copy
- `style.css` — visual design and mobile layout
- `script.js` — interactions, navigation, animations, counter, sound
- `manifest.webmanifest` — installable web-app metadata
- `assets/icon.svg` — app/site icon

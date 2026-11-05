# Fix Paint — Offline Android App

This repository contains the Fix Paint app packaged for Android with Capacitor, plus offline support for browser/PWA use.

## What works offline
- The app's HTML, CSS and JavaScript are bundled inside the APK.
- The Google Fonts network dependency was removed; the app uses installed system fonts.
- The browser version caches its app shell with a service worker after the first online visit.
- Image editing happens locally in the browser/app; selected images are not uploaded to a server.

## Build the APK on GitHub
1. Create a new GitHub repository.
2. Upload **all files and folders** from this project (keep the `.github/workflows/build-apk.yml` path).
3. Open the repository's **Actions** tab.
4. Select **Build Fix Paint APK**, then choose **Run workflow** (or wait for the push build).
5. Open the completed workflow run. Under **Artifacts**, download **Fix-Paint-APK**.
6. Extract the downloaded ZIP; it contains `app-debug.apk`.

The APK is an unsigned debug build suitable for testing and personal installation. Android may ask you to allow installation from the browser/file manager. Only install APKs from repositories you trust.

## Run as an offline web app
Deploy the contents of the `www` folder to GitHub Pages (Settings → Pages → deploy from branch/folder, choose the repository root or `/docs` after placing `www` contents there). Open the HTTPS site once while online, then use the browser's **Add to Home screen / Install** option. After the first successful cache, it can open offline.

## Local build (optional)
Requires Node.js 20+, Java 21 and Android SDK:
```bash
npm install
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```
APK output: `android/app/build/outputs/apk/debug/app-debug.apk`


## Android image saving fix

The Save button now writes PNG images using the native Capacitor Filesystem plugin. Saved images are placed in the Android Documents/FixPaint folder. The GitHub Actions workflow bundles the local save module before syncing/building the Android app.

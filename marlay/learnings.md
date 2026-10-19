# Marlay — Technical Reference

## Google Calendar API integration

- The Home tab's "What's Next" card and the Calendar tab's embed both
  read from a single public Google Calendar (Tabitha's rehearsal
  calendar), ID stored in `data/config.js` as
  `STUDIO.rehearsalCalendar.id`.
- The API key (`STUDIO.rehearsalCalendar.apiKey`) was created via gcloud,
  not the Cloud Console UI — the console's guided credential wizard
  only offered OAuth or Service Account, no plain API key option, as
  of September 2026.
- Setup commands used, for reference if the key ever needs to be
  recreated or a second one added:

  ```
  gcloud services enable calendar-json.googleapis.com --project=marlay-calendar
  gcloud services api-keys create --project=marlay-calendar \
    --display-name="Marlay calendar (GitHub Pages)" \
    --api-target=service=calendar-json.googleapis.com \
    --allowed-referrers="https://rglassberg-cmyk.github.io/*"
  ```

- The key is restricted two ways: to the Calendar API only, and to
  requests from rglassberg-cmyk.github.io only. It's still visible in
  the page's public source, since this is a static site with no
  backend — that's expected and normal for a client-side read-only
  key. The restrictions, not secrecy, are what keep it safe.
- The Google Cloud project (`marlay-calendar`) is under
  beccaglassberg@gmail.com, not rglassberg@saracademy.org — intentional,
  since this is Lhasa/personal work, not SAR work.

## Date handling

- Every date in this codebase (`season.js`, calendar event parsing) must
  use explicit `{year, month, day}` values or `new Date(year, month, day)`
  — never `new Date("YYYY-MM-DD")`, which parses as UTC and silently
  shifts by a day in US timezones.

## Config-driven structure

- Everything specific to Tate Academy lives in `data/config.js`, not
  hardcoded into `index.html` or `styles.css`. Marlay is meant to be
  reusable for a future second studio client without a rewrite, so
  nothing Tate-specific should leak into the markup itself.

## Parent login (built 2026-10-19, off until launch)

- Firebase Auth in the `marlay-calendar` project (personal Gmail): Google sign-in plus
  emailed sign-in links. Web app "Marlay"; its browser key is restricted to
  identitytoolkit + securetoken and to the github.io, firebaseapp.com and localhost:8765
  referrers.
- The Auth service itself has to be turned on in the Firebase console (Authentication →
  Get started). The API route (`identityPlatform:initializeAuth`) upgrades to Identity
  Platform and refuses without billing.
- `auth.js` only signs people in. Access is the sheet script's call: `doPost` checks the
  ID token with `accounts:lookup` (sending the site as Referer, since the key is
  referrer-restricted) and looks the email up in the Dances sheet's "Parents" tab.
- Launch = `LOGIN_REQUIRED = true` in Code.gs (push + new deployment version) and
  `STUDIO.auth.required: true` in config.js. Until then, `?login=1` tries it out.
- If gcloud errors with "Unable to read file .../adc.token", another session left
  `auth/access_token_file` set; prefix commands with `CLOUDSDK_AUTH_ACCESS_TOKEN_FILE=""`.

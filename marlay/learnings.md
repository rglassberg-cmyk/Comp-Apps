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

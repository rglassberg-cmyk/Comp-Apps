# Marlay — Audit Memo (2026-09-25)

## Fixed

- **Calendar API call verified via curl — the code is correct, the calendar is not.** The exact URL the JS builds was curled with the GitHub Pages referer: it returns **404 Not Found**. The same key, same referer, against Google's public US-holidays calendar returns **200 with real events**, and without a referer it returns 403 — so the key, the API-only restriction, and the referer restriction all work. The Tate calendar's public iCal feed (`/calendar/ical/<id>/public/basic.ics`) also returns 404, and its embed page reports a permission error. Root cause: the calendar's **"Make available to public"** setting is off. This can't be fixed in code — see Flagged. The response-parsing logic in `computeWhatsNext` was run against the real 200 response and produces the correct local dates and titles.
- `index.html` — hero studio name, hero season label, and `<title>` were hardcoded "Tate Academy" / "2026–2027 Season"; now populated from `STUDIO` like the header subtitle already was.
- `index.html` — `--ink` is now set from `STUDIO.colors.ink` alongside `--pink` and `--pink-dark`; previously the config value was unused.
- `styles.css` — `--pink-tint` / `--pink-tint-strong` were hardcoded `rgba(213,22,77,…)` of the Tate pink and wouldn't follow a config swap; now `color-mix()` off `--pink`.
- `index.html` `computeWhatsNext` — a multi-day competition in progress dropped off "What's next" on day 2 because the filter compared `startDate` to today. Now filters on `endDate` (falls back to `startDate`), and `relativeDayLabel` shows "Happening now" when the start is in the past. Verified with fixed dates across day-before / day 1 / day 2 / last day / day-after.
- `index.html` `computeWhatsNext` — event `summary` and `location` from the external calendar were injected via `innerHTML`; anyone with edit rights to the calendar could inject markup. Now built with `textContent`.
- Date audit: no `new Date("YYYY-MM-DD")` anywhere. `season.js` uses `{year, month, day}` throughout; the all-day event path splits the string into an explicit constructor; timed events use `new Date(ev.start.dateTime)`, which is correct because the API returns an offset-bearing ISO string. Nothing else needed changing.

## Flagged

- **The rehearsal calendar must be made public in Google Calendar settings** ("Make available to public" under Access permissions for `910dc5…@group.calendar.google.com`). Until then both the Calendar tab embed and the What's Next card fail silently; only the calendar owner can change this.
- `season.js` `bookingInfo` contains confirmation numbers and the personal names they're booked under, in a **public** repo served on a public site. They're currently only rendered when `hotel` is null (so today none of the personal ones display), but they're one branch change from showing and already visible in source. Deciding what belongs in the public data file vs. somewhere private needs the studio owner.
- `manifest.json` name and `theme_color` are hardcoded Tate values. A static manifest can't read `config.js`; making it config-driven means a build step or per-studio manifest copies, which is a structural decision.
- Meet the Team placeholder copy and the hero "TA" initials are Tate-specific but were left alone per instructions; both would need to move to config for a real studio swap.
- `dancers.js` documents `ageGroup` tokens "matching the age-group tokens in styles.css", but this stylesheet has no age-group classes — the comment is inherited from the per-competition sites. Harmless until dancers are added, then someone will look for styles that don't exist.

## Architectural observations

- **`booked` and `hotel` are two sources of truth for one fact.** Every `booked: true` has a hotel object and every `booked: false` has `hotel: null`; `statusPill` reads one and `openComp` reads the other. As entries get edited mid-season they will diverge. One should be derived from the other.
- **The referer restriction means local development never gets calendar data.** Any localhost or `file://` load hits 403 and the card silently falls back to competitions-only, so a broken parsing change won't be noticed until it's on GitHub Pages. Worth knowing before the next calendar change.
- **`dances: []` is documented as driving the "coming soon" state, but nothing reads it** — the detail page's coming-soon block is unconditional. When the first competition's schedule arrives there is no rendering path for `dances`, no defined shape for a dance entry, and `DANCERS[].routines` references a `competitionSlug` / `danceId` shape that `season.js` doesn't define. Agreeing that shape before the first real PDF lands will avoid retrofitting both files.
- **Everything is one inline script in `index.html`.** Fine at ~350 lines, but the per-competition views (dance order, personal schedule, places to eat) will each be as large as the current file. Splitting view rendering out before those land is cheaper than after.

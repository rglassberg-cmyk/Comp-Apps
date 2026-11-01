// STUDIO CONFIG
// Everything specific to Tate Academy lives here, not in index.html or styles.css.
// A future second studio on Marlay would get its own copy of this file — nothing
// in the page markup itself should ever say "Tate" directly.

const STUDIO = {
  name: "Tate Academy",
  homeCity: "Teaneck, NJ",
  // Starting point for road-trip guides on each competition's Weekend Info view.
  homeAddress: "Tate Academy, Teaneck, NJ",

  // Full-color logo with wordmark, shown on the About view.
  logo: "assets/tate-logo-full.png",
  // This season's team photo, shown full width on the Home hero (it's very wide, so the
  // hero shows it uncropped), the white dancer shown next to the studio name, and the
  // small pink mark pinned top-right on every view.
  heroPhoto: { src: "assets/team-2026-27.jpg", alt: "The Tate Academy competition team, 2026–2027" },
  heroLogoLight: "assets/dancer-white.png",
  markIcon: "assets/dancer-mark.png",

  // Brand
  colors: {
    primary: "#d5164d",
    primaryDark: "#9a1039",
    ink: "#1a1b1d"
  },

  // Footer / attribution — matches the convention used on the per-competition sites.
  builtBy: {
    label: "Built by Lhasa LLC",
    url: "https://lhasa.app"
  },

  // External studio links shown at the top of the menu drawer.
  resourceLinks: {
    community: { label: "Parent WhatsApp Group", url: "https://chat.whatsapp.com/Da33bYtJvhy0Q6tWQdX3h0?mode=gi_t" },
    bookPrivate: { label: "Book a Private Lesson", url: "https://calendly.com/tatedanceacademy" },
    instagram: { label: "Instagram", url: "https://www.instagram.com/thetateacademy/" }
  },

  // Reused across every competition's Weekend Info tab and the Suggest Updates tab.
  suggestUpdatesFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSefWNQmR1zrbsQm2bZhKqnckJ7aAL-YDBaPKBkqjuaB26NAIQ/viewform?embedded=true",

  // Public Google Calendar for the rehearsal schedule (from Tabitha). Sharing is
  // already set to public, so a plain embed works with no auth. The API key below
  // is restricted (Calendar API only, GitHub Pages referrer only) via gcloud — see
  // learnings.md for how it was created. It's necessarily visible in page source
  // since this is a static site; the restrictions are the real protection, not secrecy.
  // Dances and roster, read live from the private "Dances Info" Google Sheet through its
  // Apps Script web app (marlay/apps-script/Code.gs). Returns display names only.
  // The studio's groups, youngest first, exactly as the Roster tab's Group column spells
  // them. "By dancer" and Meet the Dancers list groups in this order, with dancers
  // alphabetical inside each group.
  groups: ["Petite", "Mini", "Junior", "Teen", "Advanced"],

  dancesFeedUrl: "https://script.google.com/macros/s/AKfycbyxeqhpq0YDmnZo0Y24ZAduFN-k_rnYmtoMrUWH_wkOxUDtRUakscBwoGIQTCWqFkjVyQ/exec",

  // Parent login. Firebase Auth lives in the marlay-calendar Google Cloud project (personal
  // Gmail). Like the calendar key, this web key is meant to be in page source; it's
  // restricted to the sign-in APIs and to this site's referrers. Who gets in is decided by
  // the sheet script's "Parents" tab, not here. `required: true` (on since 2026-10-21)
  // makes everyone sign in; false would reopen the site (and the script's LOGIN_REQUIRED too).
  auth: {
    required: true,
    // Google's own sign-in button (Google Identity Services). Public by design; it only
    // works on the sites listed as "Authorized JavaScript origins" for this client in
    // Google Cloud (marlay-calendar > APIs & Services > Credentials).
    googleClientId: "940664518510-vvm04qnvq2lmc6a6g1a2u593336mhnmo.apps.googleusercontent.com",
    firebase: {
      apiKey: "AIzaSyBf8cV-7y0GsSgXkibEqrI5fXMMGBffJ80",
      authDomain: "marlay-calendar.firebaseapp.com",
      projectId: "marlay-calendar",
      appId: "1:940664518510:web:408a61e7172b6063e3b37f"
    }
  },

  rehearsalCalendar: {
    id: "910dc55878656b0b832ca864e5e613c6d7389270d15e4d1c956eaa9185a4dc42@group.calendar.google.com",
    timezone: "America/New_York",
    apiKey: "AIzaSyAsdCuPTiwBx2KMA_Y62AGMwf4gjEwKmno"
  },

  season: {
    label: "2026–2027 Season"
  },

  // Last season's team photo, shown on the About view.
  aboutPhoto: {
    src: "assets/team-nationals-2026.jpg",
    alt: "The Tate Academy team at Nationals, 2026",
    caption: "Last season's team at Nationals, 2026"
  },

  // Descriptive sentence on the About view (opened from the menu drawer).
  aboutBlurb: "One place for everything Tate, so 'wait, when's Tremaine again?' never has to be a group text."
};

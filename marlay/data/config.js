// STUDIO CONFIG
// Everything specific to Tate Academy lives here, not in index.html or styles.css.
// A future second studio on Marlay would get its own copy of this file — nothing
// in the page markup itself should ever say "Tate" directly.

const STUDIO = {
  name: "Tate Academy",
  homeCity: "Teaneck, NJ",
  // Starting point for road-trip guides on each competition's Weekend Info view.
  homeAddress: "Tate Academy, Teaneck, NJ",

  // Full logo with wordmark, shown in the Home hero.
  logo: "assets/tate-logo-full.png",

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
  rehearsalCalendar: {
    id: "910dc55878656b0b832ca864e5e613c6d7389270d15e4d1c956eaa9185a4dc42@group.calendar.google.com",
    timezone: "America/New_York",
    apiKey: "AIzaSyAsdCuPTiwBx2KMA_Y62AGMwf4gjEwKmno"
  },

  season: {
    label: "2026–2027 Season"
  },

  // Descriptive sentence on the About view (opened from the menu drawer).
  aboutBlurb: "One place for everything Tate, so 'wait, when's Tremaine again?' never has to be a group text."
};

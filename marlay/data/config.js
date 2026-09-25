// STUDIO CONFIG
// Everything specific to Tate Academy lives here, not in index.html or styles.css.
// A future second studio on Marlay would get its own copy of this file — nothing
// in the page markup itself should ever say "Tate" directly.

const STUDIO = {
  name: "Tate Academy",
  homeCity: "Teaneck, NJ",
  // Starting point for road-trip guides on each competition's Weekend Info view.
  homeAddress: "Tate Academy, Teaneck, NJ",

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

  // Reused across every competition's Weekend Info tab and the Suggest Updates tab.
  suggestUpdatesFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSefWNQmR1zrbsQm2bZhKqnckJ7aAL-YDBaPKBkqjuaB26NAIQ/viewform?embedded=true",

  season: {
    label: "2026–2027 Season"
  }
};

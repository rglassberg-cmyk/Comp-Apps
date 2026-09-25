// SEASON DATA — 2026–2027
//
// One object per competition. Add a new one here when a competition is confirmed —
// nothing else in the codebase needs to change for a new entry to show up on the
// Season Overview and get its own detail page.
//
// Date fields use the {year, month, day} shape (month is 0-indexed: 0 = Jan) rather
// than date strings — see the date-bug note in the tate-comp-sites reference. Every
// competition here is still awaiting its "At a Glance" schedule PDF, so `dances` is
// an empty array for all of them; that's what drives the "coming soon" state on each
// competition's detail page.
//
// This file is served publicly as part of the deployed site — don't put confirmation
// numbers, personal names, or anything else in bookingInfo that isn't meant for every
// visitor to read. It's only rendered when hotel is null (see openComp() in index.html).

const SEASON = [
  {
    slug: "tremaine-boston",
    name: "Tremaine",
    type: "convention", // "convention" | "competition" — convention rooms are also 1-1 with the hotel/venue here
    location: "Boston, MA",
    dateLabel: "Jan 8–10, 2027",
    startDate: { year: 2027, month: 0, day: 8 },
    endDate: { year: 2027, month: 0, day: 10 },
    venue: {
      name: "The Westin Copley Place Boston",
      address: "10 Huntington Ave, Boston, MA 02116",
      phone: "(617) 262-9600"
    },
    hotel: {
      name: "The Westin Copley Place Boston",
      address: "10 Huntington Ave, Boston, MA 02116",
      onSite: true
    },
    booked: true,
    bookingInfo: "",
    officialUrl: "https://www.tremainedance.com/",
    driving: { distanceMi: 212, duration: "about 3.5 hours", route: "I-95 N through Connecticut and Rhode Island into Boston" },
    hotelSuggestions: [
      { name: "Boston Marriott Copley Place", address: "110 Huntington Ave, Boston, MA 02116", note: "Connected to the same Copley Place complex" },
      { name: "The Lenox Hotel", address: "61 Exeter St, Boston, MA 02116", note: "Boutique option, short walk away" }
    ],
    dances: []
  },
  {
    slug: "imagine-freehold",
    name: "Imagine",
    type: "competition",
    location: "Freehold, NJ",
    dateLabel: "Feb 26–28, 2027",
    startDate: { year: 2027, month: 1, day: 26 },
    endDate: { year: 2027, month: 1, day: 28 },
    venue: {
      name: "iPlay America",
      address: "110 Schanck Rd, Freehold, NJ 07728"
    },
    hotel: null,
    booked: false,
    bookingInfo: "",
    officialUrl: "https://www.imaginedancechallenge.com/",
    driving: { distanceMi: 52, duration: "about 1 hour 15 minutes", route: "Garden State Parkway South" },
    hotelSuggestions: [
      { name: "Radisson Hotel Freehold", address: "50 Gibson Pl, Freehold, NJ 07728", note: "About 1 mile from the venue" }
    ],
    dances: []
  },
  {
    slug: "showstoppers-ct",
    name: "Showstoppers",
    type: "competition",
    location: "Mashantucket, CT",
    dateLabel: "Mar 5–7, 2027",
    startDate: { year: 2027, month: 2, day: 5 },
    endDate: { year: 2027, month: 2, day: 7 },
    venue: {
      name: "Foxwoods Resort Casino",
      address: "350 Trolley Line Blvd, Mashantucket, CT 06338"
    },
    hotel: null,
    booked: false,
    bookingInfo: "Showstopper Travel books the official hotel block at the venue — on-site if booked there",
    officialUrl: "https://www.goshowstopper.com/",
    driving: { distanceMi: 165, duration: "about 2 hours 40 minutes", route: "I-95 N to Exit 92 in CT, then Route 2 West about 8 miles" },
    hotelSuggestions: [],
    hotelNote: "Foxwoods is the venue and the hotel — it has several towers (Grand Pequot Tower, Great Cedar Hotel, Fox Tower). Book directly through Foxwoods rather than looking elsewhere.",
    dances: []
  },
  {
    slug: "deviate-ac",
    name: "Deviate",
    type: "convention",
    location: "Atlantic City, NJ",
    dateLabel: "Apr 2–4, 2027",
    startDate: { year: 2027, month: 3, day: 2 },
    endDate: { year: 2027, month: 3, day: 4 },
    venue: {
      name: "Harrah's Resort Atlantic City",
      address: "777 Harrah's Blvd, Atlantic City, NJ 08401",
      phone: "(609) 441-5000"
    },
    hotel: {
      name: "Harrah's Resort Atlantic City",
      address: "777 Harrah's Blvd, Atlantic City, NJ 08401",
      onSite: true
    },
    booked: true,
    bookingInfo: "",
    officialUrl: "https://deviatedance.com/",
    driving: { distanceMi: 133, duration: "about 2.5 hours", route: "Garden State Parkway South to the Atlantic City Expressway" },
    hotelSuggestions: [
      { name: "Golden Nugget Atlantic City", address: "600 Huron Ave, Atlantic City, NJ 08401", note: "Marina District, close to Harrah's" },
      { name: "Borgata Hotel Casino & Spa", address: "1 Borgata Way, Atlantic City, NJ 08401", note: "Marina District, close to Harrah's" }
    ],
    dances: []
  },
  {
    slug: "starpower-meadowlands",
    name: "Starpower",
    type: "competition",
    location: "Secaucus, NJ (Meadowlands)",
    dateLabel: "May 7–9, 2027",
    startDate: { year: 2027, month: 4, day: 7 },
    endDate: { year: 2027, month: 4, day: 9 },
    venue: {
      name: "Meadowlands Exposition Center",
      address: "355 Plaza Drive, Secaucus, NJ 07094"
    },
    hotel: {
      name: "Hyatt Place Secaucus/Meadowlands",
      address: "575 Park Plaza Drive, Secaucus, NJ 07094",
      phone: "(201) 422-9480",
      onSite: false,
      distanceNote: "~5 min drive — same Harmon Meadow complex as the venue"
    },
    booked: true,
    bookingInfo: "",
    officialUrl: "https://www.starpowertalent.com/",
    driving: { distanceMi: 10, duration: "about 15-20 minutes", route: "NJ-3 E" },
    hotelSuggestions: [
      { name: "Courtyard by Marriott Secaucus Meadowlands", address: "455 Harmon Meadow Blvd, Secaucus, NJ 07094", note: "Short walk from the venue" },
      { name: "Best Western Plus Meadowlands", address: "250 Harmon Meadow Blvd, Secaucus, NJ 07094", note: "Short walk from the venue" }
    ],
    dances: []
  },
  {
    slug: "nationals-tba",
    name: "Nationals",
    type: "competition",
    location: "TBA",
    dateLabel: "Dates TBA",
    startDate: null,
    endDate: null,
    venue: null,
    hotel: null,
    booked: false,
    bookingInfo: "",
    dances: []
  }
];

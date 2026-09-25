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

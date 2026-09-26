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
    placesToEat: [
      { name: "Legal Sea Foods", cuisine: "Seafood", walkable: true, distanceNote: "Connected via walkway inside Copley Place", website: "https://www.legalseafoods.com/", notes: "Casual, family-friendly, a Boston classic" },
      { name: "The Capital Grille", cuisine: "Steakhouse", walkable: true, distanceNote: "About a 10 min walk", address: "359 Newbury St, Boston, MA 02115", website: "https://www.thecapitalgrille.com/", notes: "Upscale, good for a celebratory dinner" },
      { name: "Atlantic Fish Co.", cuisine: "Seafood", walkable: true, distanceNote: "About a 10 min walk", address: "761 Boylston St, Boston, MA 02116", website: "https://www.atlanticfishco.com/" }
    ],
    thingsToDo: [
      { name: "Boston Public Library", desc: "Historic library right on Copley Square, stunning architecture", walkable: true, distanceNote: "About a 2 min walk", free: true, website: "https://www.bpl.org/" },
      { name: "Prudential Center Skywalk Observatory", desc: "City views from the 50th floor", walkable: true, distanceNote: "About a 5 min walk", website: "https://prudentialcenter.com/skywalk-observatory/" },
      { name: "Newbury Street", desc: "Boston's premier shopping street", walkable: true, distanceNote: "About a 10 min walk", free: true }
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
    placesToEat: [
      { name: "The Bistro at iPlay America", cuisine: "American", walkable: true, distanceNote: "On-site at the venue", notes: "Family-friendly" },
      { name: "Game Time Bar & Grill", cuisine: "American / Boardwalk-style", walkable: true, distanceNote: "On-site at the venue" }
    ],
    thingsToDo: [
      { name: "iPlay America itself", desc: "Go-karts, laser tag, arcade, Topgolf Swing Suite, 4D theater — always free to enter, pay per activity", walkable: true, distanceNote: "It's the venue", free: true, website: "https://www.iplayamerica.com/" },
      { name: "Freehold Raceway Mall", desc: "Shopping and more dining options", walkable: false, distanceNote: "About a 10 min drive" }
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
    bookingInfo: "",
    officialUrl: "https://www.goshowstopper.com/",
    driving: { distanceMi: 165, duration: "about 2 hours 40 minutes", route: "I-95 N to Exit 92 in CT, then Route 2 West about 8 miles" },
    hotelSuggestions: [],
    hotelNote: "Showstopper Travel books the official hotel block at the venue. Foxwoods is the venue and the hotel — it has several towers (Grand Pequot Tower, Great Cedar Hotel, Fox Tower). Book directly through Foxwoods rather than looking elsewhere.",
    placesToEat: [
      { name: "Hard Rock Cafe Foxwoods", cuisine: "American", walkable: true, distanceNote: "On-site at the resort", website: "https://cafe.hardrock.com/foxwoods/" },
      { name: "Guy Fieri's Kitchen", cuisine: "American", walkable: true, distanceNote: "On-site at the resort" }
    ],
    thingsToDo: [
      { name: "Tanger Outlets Foxwoods", desc: "70+ stores", walkable: true, distanceNote: "On-site at the resort" },
      { name: "Mashantucket Pequot Museum", desc: "Cultural exhibits, largest Native American museum in the world", walkable: false, distanceNote: "About 5 min away by car or shuttle" }
    ],
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
    placesToEat: [
      { name: "Bobby's Burgers by Bobby Flay", cuisine: "Burgers", walkable: true, distanceNote: "At Harrah's" },
      { name: "Gordon Ramsay Steak", cuisine: "Steakhouse", walkable: true, distanceNote: "At Harrah's", notes: "Special-occasion, reservations recommended" },
      { name: "McCormick & Schmick's", cuisine: "Seafood", walkable: true, distanceNote: "Short walk from Harrah's", website: "https://www.mccormickandschmicks.com/location/mccormick-schmicks-atlantic-city-nj/" }
    ],
    thingsToDo: [
      { name: "Steel Pier Amusement Park", desc: "Boardwalk rides and games", walkable: false, distanceNote: "About a 10 min drive", website: "https://www.steelpier.com/" },
      { name: "Tanger Outlets The Walk", desc: "Shopping", walkable: false, distanceNote: "About a 10 min drive" }
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
    placesToEat: [
      { name: "Outback Steakhouse", cuisine: "Steakhouse", walkable: true, distanceNote: "About a 4 min walk, connected to the Courtyard by Marriott", address: "455 Harmon Meadow Blvd, Secaucus, NJ 07094", website: "https://locations.outback.com/new-jersey/secaucus" },
      { name: "Houlihan's", cuisine: "American", walkable: true, distanceNote: "About a 6 min walk", address: "700 Plaza Dr, Secaucus, NJ 07094" },
      { name: "Carnegie Diner & Cafe", cuisine: "Diner", walkable: false, distanceNote: "Short drive" }
    ],
    thingsToDo: [
      { name: "American Dream", desc: "Nickelodeon Universe, LEGOLAND, DreamWorks Water Park, and more", walkable: false, distanceNote: "About a 10 min drive", website: "https://www.americandream.com/" }
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

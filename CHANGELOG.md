# Comp-Apps Changelog

## 2026-02-10 - Complete Site Rebuild for Deviate DC

### Overview
Complete rebuild of the competition app for **Tate Academy Company** attending **Deviate (The Process)** in Washington DC, February 13-15, 2026.

---

### New Features

#### 1. Convention Schedule Tab
- Full schedule for Thursday through Sunday
- **Age group filtering** (Junior, PreTeen, Teen, Senior)
- **Add to Calendar buttons** for each class
- "Add All to Calendar" button for entire days
- Color-coded age group labels
- Room/location information

**Schedule Includes:**
- Thursday: Travel/Check-in
- Friday: Classes + Competition starts 9 AM
- Saturday: Classes + Competition continues
- Sunday: Workshops + Awards

#### 2. Dance Order Tab
Complete Friday competition schedule with 34 performances:

**Solos:**
- Bella (Raspberry Beret) - Junior Jazz - 9:00 AM
- Anaya (Le Freak) - Junior Jazz - 9:08 AM
- Liana (Wings) - 9:16 AM
- Ella B (Slow It Down) - 10:00 AM
- Carly (Other Side) - Teen Contemporary - 2:16 PM
- Robbie (When I Go) - PreTeen Contemporary - 2:19 PM
- Zoe (I Dreamed A Dream) - PreTeen Lyrical - 2:43 PM
- Eden (River) - PreTeen Lyrical - 2:46 PM
- Lula (Winner Takes It All) - Senior Contemporary - 4:20 PM
- Chloe (These Arms Of Mine) - Senior Contemporary - 4:26 PM
- Alina (Out There) - Senior Contemporary - 4:42 PM
- Liam (Tennessee Whiskey) - Senior Contemporary - 5:57 PM
- Ella G. (Dreams) - Senior Jazz - 7:48 PM
- Talia G. (Foolish Games) - Senior Lyrical - 8:16 PM
- Talya B. (One More Second) - Senior Lyrical - 8:22 PM
- Riley (Lose Yourself) - Senior Hip Hop - 8:35 PM

**Groups/Lines/Productions:**
- Work Me, Just Like A River Does, Fly, White Rabbit, Know About Me, The Way, What The World Need Now, Hairspray, Corps, Dead & Done, Cry To Me, End Of Love, Golden Years, Cellophane, Kendrick

**Awards:**
- 1:00 PM - Awards 6-12
- 9:40 PM - Awards 13+

#### 3. Places to Eat Tab
**Walking Distance Restaurants (near Marriott Wardman Park):**
| Restaurant | Type | Distance | Price |
|------------|------|----------|-------|
| Open City | American/Brunch | 0.1 mi | $$ |
| Petits Plats | French | 0.2 mi | $$ |
| Nanny O'Brien's | Irish Pub | 0.3 mi | $$ |
| Bindaas | Indian Street Food | 0.3 mi | $$ |
| Diner | American/Diner | 0.4 mi | $ |
| Amsterdam Falafelshop | Middle Eastern | 0.4 mi | $ |
| Mintwood Place | American | 0.5 mi | $$$ |

**Delivery Options:**
- Domino's Pizza (DoorDash, UberEats)
- Chipotle (DoorDash, UberEats, Chipotle App)
- Sweetgreen (DoorDash, Sweetgreen App)
- CAVA (DoorDash, UberEats, CAVA App)
- Chick-fil-A (DoorDash, UberEats, CFA App)
- Panera Bread (DoorDash, Panera App)
- Wawa (DoorDash, Wawa App)

**Interactive Map:**
- Leaflet map showing hotel and all walkable restaurants
- Clickable markers with details

#### 4. Things to Do Tab
**Nearby Activities:**
| Attraction | Distance | Highlights |
|------------|----------|------------|
| National Zoo | 0.3 mi | FREE! Pandas, elephants |
| Rock Creek Park | 0.2 mi | Walking trails |
| Adams Morgan | 0.5 mi | Shops, murals, restaurants |
| Smithsonian Museums | 2.5 mi | All FREE! Metro accessible |
| Georgetown | 2 mi | Shopping, Georgetown Cupcake |
| DC Monuments | 3 mi | Lincoln, Washington Monument |
| Dupont Circle | 1.2 mi | Bookshops, farmers market |
| National Cathedral | 1 mi | Gothic cathedral, gardens |

**Interactive Map:**
- Shows hotel and all attractions
- Custom markers with activity icons

---

### Technical Details

**Venue Information:**
- Hotel: Marriott Wardman Park
- Address: 2660 Woodley Rd NW, Washington, DC 20008
- Coordinates: 38.9296, -77.0536

**Libraries Used:**
- Tailwind CSS (via CDN)
- Leaflet v1.9.4 (maps)
- Google Fonts (Outfit)

**Color Scheme:**
- Primary: Violet/Purple gradient
- Junior: Yellow
- PreTeen: Blue
- Teen: Green
- Senior: Pink

**New Data Structures:**
- `eventInfo` - Venue and event details
- `conventionSchedule` - Class schedule by day
- `danceOrder` - Competition performance order
- `placesToEat` - Walkable and delivery restaurants
- `nearbyActivities` - Things to do nearby

---

### Files Modified
- `index.html` - Complete rebuild
- `CHANGELOG.md` - Updated documentation

---

## Previous Updates

### 2026-02-10 - Tremaine NYC Updates (Archived)
*Previous version was for Tremaine Weekend in NYC. See git history for details.*

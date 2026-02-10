# Comp-Apps Changelog

## 2026-02-10 - Dance Schedule Update

### Summary
Updated the Tremaine Weekend Hub app with the official competition schedule, revised Saturday morning plans, and added an interactive walking map.

---

### Changes Made

#### 1. Talia's Solo Time Updated
- **Before:** 8:30 PM
- **After:** 9:14 PM
- **Details:** "Foolish Games" - Senior Lyrical Solo (9:14-9:17 PM)

#### 2. Carly's Solo Added to Saturday Evening
- **Time:** 9:00 PM
- **Details:** "Other Side" - Teen Contemporary Solo (9:00-9:03 PM)
- Added all Saturday evening group dances to the schedule

#### 3. New "Dance Order" Tab
Complete competition schedule for both days:

**Friday 1/30/2026:**
| # | Dance | Dancer | Style | Type | Time |
|---|-------|--------|-------|------|------|
| 1 | That's Life | Robbie | Jazz | Solo | 7:49 PM |
| 2 | Tennessee Whiskey | Liam | Contemporary | Solo | 8:38 PM |
| 3 | Out There | Alina | Contemporary | Solo | 8:41 PM |
| 4 | Winner Takes It All | Lula | Contemporary | Solo | 8:44 PM |
| 5 | These Arms of Mine | Chloe | Contemporary | Solo | 8:46 PM |
| 6 | Lose Yourself | Riley | Hip Hop | Solo | 9:00 PM |
| 7 | **Foolish Games** | **Talia** | Lyrical | Solo | **9:14 PM** |
| 8 | One More Moment | Talya | Lyrical | Solo | 9:17 PM |
| 9 | Dreams | Ella | Jazz | Solo | 9:22 PM |

**Saturday 1/31/2026:**
| # | Dance | Dancer | Style | Type | Time |
|---|-------|--------|-------|------|------|
| 1 | Cry to Me | - | Jazz | Group | 8:15 PM |
| 2 | End of Love | - | Lyrical | Line | 8:41 PM |
| 3 | **Other Side** | **Carly** | Contemporary | Solo | **9:00 PM** |
| 4 | Dead One | - | Contemporary | Group | 9:15 PM |
| 5 | Kendrick | - | Hip Hop | Group | 9:29 PM |
| 6 | Cellophane | - | Lyrical | Group | 9:54 PM |
| 7 | Golden Years | - | Jazz | Production | 10:13 PM |

#### 4. Saturday Morning Schedule Updated
Changed wake-up time from 7:45 AM to 9:00 AM for Becca and Aviva.

**New Schedule:**
| Time | Activity |
|------|----------|
| 9:00 AM | Wake Up & Get Ready |
| 9:30 AM | Coffee & Planning |
| 10:00 AM | Bryant Park Stroll |
| 10:45 AM | Warm-Up Stop (Library/Grand Central) |
| 11:30 AM | 5th Ave Window Shop |
| 12:30 PM | Lunch Pickup |

#### 5. Interactive Walking Map Added
Added a Leaflet-based interactive map to the Saturday AM tab showing the walking route:

**Stops:**
1. Hotel (Start)
2. Joe Coffee
3. Bryant Park
4. NY Public Library
5. Grand Central
6. St. Patrick's Cathedral
7. 5th Ave Shops
8. Sweetgreen (Lunch)

**Features:**
- Numbered markers for each stop
- Clickable popups with stop details
- Dashed route line connecting all stops
- Legend showing all stops with icons

#### 6. Saturday Time Chart Updated
Adjusted the doughnut chart to reflect new timing:
- Moms Walk: 4 hours (was 5.25)
- Chill Zone: 4 hours
- Competition: 5 hours (was 4)
- Sleep/Other: 11 hours (was 10.75)

---

### Technical Details

**Libraries Added:**
- Leaflet v1.9.4 (CSS & JS) for interactive mapping

**New Data Structures:**
- `walkingStops` - Array of map stop coordinates and details
- `danceOrder` - Object containing Friday and Saturday dance schedules

**New Functions:**
- `renderWalkingMap()` - Generates the map container HTML
- `initWalkingMap()` - Initializes the Leaflet map with markers and route
- `renderDanceOrder()` - Renders the dance schedule tables

**New Tab:**
- "Dance Order" tab added to navigation

---

### Files Modified
- `index.html` - All changes in single file (HTML, CSS, JavaScript)

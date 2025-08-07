## Overview
Acolyte Index is a React-based, Electron-wrapped Dota 2 hero tracker designed with a moody, glowding "wraith" theme. It allows you to launch a transparent overlay, browse the Dota 2 hero pool, fetch live stats via the OpenDota API, display essential data for each hero such as roles, win rates, pro pick rates, a calculated KDA, and move speeds, fetch live player stats via a STEAM32 ID, and display essential player data for each selected hero.

## Project Setup
1. Clone the repository:
   ```
   git clone https://github.com/musedwraith/AcolyteIndex
   cd AcolyteIndex
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the app in Electron to view the overlay (transparent background, always-on-top, frameless window):
   ```
   npm run electron-start
   ```
4. Optionally, preview the app in a regular browser using:
   ```
   npm start
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## File Structure
- **public/index.html** – Root HTML file for React mounting.
- **scr/componets/HeroList.js** - Scrollable list of Dota 2 heroes with filter/search.
- **scr/componets/HeroDetails.js** - Stats and protrait display for selected hero.
- **scr/componets/PlayerLookup.js** - Steam32 ID search and stats.
- **scr/componets/RoleFilters.js** - Role-based checkbox filters.
- **scr/componets/RankFilter.js** - Dropdown filter for ranks.
- **src/App.js** – Main application logic; fetches data and renders UI.
- **src/AppStyles.css** – Custom purple/pink theme styles; glowing and responsive.
- **src/index.js** – React entry point that renders App.
- **electron/main.js** - Electron main process (creates transparent window).
- **electron/preload.js** - Optional preload scripts for contextBridge.
- **package.json** - Project mainfest with Electron and React.
- **README.md** - Project documentation


GENERAL LAYOUT: 
```
[ left panel ]---[ right top panel                                ]
-----------------[================================================]
-----------------[ right left-most panel | right right-most panel ]
```

DETAILED LAYOUT:
```
[ hero-list ]....[ player search input           ]
.................[===============================]
.................[ hero details | player details ]
```

TO-DO:
```
[ hero list ]----[ player search input           ]
---------------------------------------------------
[ hero details---| player details         ]
-----------------|  - All-time Hero Stats
-----------------|  - Patch Stats
-----------------|  - Recent Matches
```

## Current Functionality
1. Browse Dota 2 heroes, display stat information on the hero based on the patch, and search for a player's public Dota 2 stats for that hero.
2. The left panel displays hero names in alphabetical order in a scrollable list, a larger hero portrait, role list, pro-level stats (win rate, pick count, ban count), and a dynamic KDA based on patch information. For KDA, it uses a basic formula to approximate a dynamic KDA number since OpenDota doesn't provide direct kills/deaths. Heroes can be filtered by selecting their role or using a search box to type in their name.
3. The top of the right panel is the player search box that uses Steam32 IDs.
4. The left most of the right panel dynamically populates with the hero information: the hero portrait, the hero name, hero roles, which patch the information was obtained from, their win rate, pro pick count, pro ban count, KDA based on the patch, and movement speed.
5. The right most of the right panel populates with the player information after searching using the player serach box. It displays the player's portrait, the player's name, MMR estimate, all time stats of: number of games, number of wins, number of losses, and win rate, the patch stats of: games, wins, losses, and winrate.
6. Run a transparent, always-on-top Electron overlay with a glowing UI styled to match the "wraith" branding. Which includes glowing and pulsing effects for hero and player cards.
7. Top bar is able to be dragged to easily move the transparent window.

## Future Enhancements
- Deploy for live sharing. (Netlify?)
- Implement **“Mark for Ritual” tracking** so users can mark heroes they’re practicing and add personal notes.
- Add meta data: builds, counters.
- Meta tier list based on OpenDota win rates for each patch.
- Track my own Dota matches (so I can see how bad I actually play xd) - match history
- Add a streamer overlay to show the pool live.
- Add to Twitch
- Add to Discord?
- Build paths, starting items, early game and core items, talents, neutral items, and situational item suggestions, overlay OverWolf DotaPlus app
- Recordings like OverWolf Outplayed
- Keys to open and hide the overlay
- Correct the positioning of the hero and player panels
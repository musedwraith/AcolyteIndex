## Overview
Acolyte Index is a React-based Dota 2 hero tracker designed with a dark, ethereal "wraith" theme. It allows you to browse the Dota 2 hero pool, fetch live stats via the OpenDota API, and display essential data for each hero such as roles, win rates, pro pick rates, and move speeds.

## Project Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/musedwraith/AcolyteIndex
   cd AcolyteIndex
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## File Structure
- **src/App.js** – Main application logic; fetches data and renders UI.
- **src/AppStyles.css** – Custom purple/pink theme styles.
- **src/index.js** – React entry point that renders App.
- **public/index.html** – Root HTML file for React mounting.

## Current Functionality
1. Browse Dota 2 heroes in a themed dropdown.
2. Select a hero to display stats dynamically.
3. Clean, glowing theme aligned with "wraith" branding.

## Future Enhancements
- Add **glowing and pulsing hover effects** for dropdown and hero cards.
- Deploy for live sharing. (Netlify?)
- Implement **“Mark for Ritual” tracking** so users can mark heroes they’re practicing and add personal notes.
- Add more stats: win rate, pick rate, ban rate, KDA (by patch).
- Add meta data: roles, builds, counters.
- Change dropdown to list on the left side, and populate information on the right side.
- Void version: win rate, pick rate, hero role, basic statas.
- Filter by rank.
- Meta teir list based on OpenDota win rates for each patch.
- Track my own Dota matches (so I can see how bad I actually play xd).
- Add a streamer overlay to show the pool live.
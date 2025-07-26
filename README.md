## Overview
Acolyte Index is a React-based Dota 2 hero tracker designed with a dark, ethereal "wraith" theme. It allows you to browse the Dota 2 hero pool, fetch live stats via the OpenDota API, and display essential data for each hero such as roles, win rates, pro pick rates, and move speeds.

## Project Setup
1. Clone the repository:
   ```bash
   git clone <your-repo-URL>
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
- Deploy for live sharing.
- Implement **“Mark for Ritual” tracking** so users can mark heroes they’re practicing and add personal notes.
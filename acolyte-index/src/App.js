import React, { useEffect, useState } from "react";
import "./AppStyles.css";

export default function App() {
  const [heroes, setHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://api.opendota.com/api/heroes")
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, []);

  const fetchHeroStats = async (heroId) => {
    setLoading(true);
    const res = await fetch("https://api.opendota.com/api/heroStats");
    const data = await res.json();
    const hero = data.find((h) => h.id === parseInt(heroId));
    setSelectedHero(hero);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Acolyte Index</h1>
      <select onChange={(e) => fetchHeroStats(e.target.value)}>
        <option value="">Select a Hero</option>
        {heroes.map((hero) => (
          <option key={hero.id} value={hero.id}>
            {hero.localized_name}
          </option>
        ))}
      </select>

      {loading && <p>Consulting the Ancients...</p>}

      {selectedHero && !loading && (
        <div className="hero-card">
          <h2>{selectedHero.localized_name}</h2>
          <p>Roles: {selectedHero.roles?.join(", ")}</p>
          <p>Win Rate: {((selectedHero.pro_win / selectedHero.pro_pick) * 100 || 0).toFixed(2)}%</p>
          <p>Pro Pick Rate: {selectedHero.pro_pick || 0}</p>
          <p>Move Speed: {selectedHero.move_speed}</p>
        </div>
      )}
    </div>
  );
}
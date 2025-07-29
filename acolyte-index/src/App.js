import React, { useEffect, useState } from "react";
import "./AppStyles.css";

export default function App() {
  const [heroes, setHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPatch, setCurrentPatch] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [playerLoading, setPlayerLoading] = useState(false);
  const [patchHeroStats, setPatchHeroStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);

  // Fetch heroes and patch
  useEffect(() => {
    fetch("https://api.opendota.com/api/heroes")
      .then((res) => res.json())
      .then((data) => {
        const sortedHeroes = data.sort((a, b) =>
          a.localized_name.localeCompare(b.localized_name)
        );
        setHeroes(sortedHeroes);
      });

    fetch("https://api.opendota.com/api/constants/patch")
      .then((res) => res.json())
      .then((data) => {
        const patches = Object.values(data);
        const latestPatch = patches[patches.length - 1];
        setCurrentPatch(latestPatch.name);
      });
  }, []);

  const handleRoleChange = (role) => {
  setSelectedRoles((prev) =>
    prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
  );
};

const filteredHeroes = heroes.filter((hero) => {
  const matchesName = hero.localized_name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesRole =
    selectedRoles.length === 0 ||
    (hero.roles && selectedRoles.every((role) => hero.roles.includes(role)));

  return matchesName && matchesRole;
});

  // Fetch hero stats
  const fetchHeroStats = async (heroId) => {
    setLoading(true);
    const res = await fetch("https://api.opendota.com/api/heroStats");
    const data = await res.json();
    const hero = data.find((h) => h.id === parseInt(heroId));

    const matchupsRes = await fetch(
      `https://api.opendota.com/api/heroes/${heroId}/matchups`
    );
    const matchups = await matchupsRes.json();
    const totalWins = matchups.reduce((acc, m) => acc + (m.wins || 0), 0);
    const totalGames = matchups.reduce((acc, m) => acc + (m.games_played || 0), 0);
    const totalLosses = totalGames - totalWins;
    const kda = totalLosses > 0 ? (totalWins * 3) / totalLosses : totalWins * 3;

    hero.kda = kda;
    setSelectedHero(hero);
    setPatchHeroStats(null);

    if (playerData) {
      fetchPatchHeroStats(playerId, heroId);
    }

    setLoading(false);
  };

  // Fetch player info and hero stats
  const fetchPlayerInfo = async () => {
    if (!playerId) return;
    setPlayerLoading(true);

    try {
      const res = await fetch(`https://api.opendota.com/api/players/${playerId}`);
      const profileData = await res.json();

      const wlRes = await fetch(`https://api.opendota.com/api/players/${playerId}/wl`);
      const wlData = await wlRes.json();

      const heroStatsRes = await fetch(
        `https://api.opendota.com/api/players/${playerId}/heroes`
      );
      const heroStats = await heroStatsRes.json();

      setPlayerData({ ...profileData, wl: wlData, heroes: heroStats });

      if (selectedHero) {
        fetchPatchHeroStats(playerId, selectedHero.id);
      }
    } catch (error) {
      console.error("Failed to fetch player data:", error);
      setPlayerData(null);
    }

    setPlayerLoading(false);
  };

  // Fetch patch-specific hero stats
  const fetchPatchHeroStats = async (playerId, heroId) => {
    try {
      const matchesRes = await fetch(
        `https://api.opendota.com/api/players/${playerId}/matches?hero_id=${heroId}`
      );
      const matches = await matchesRes.json();

      if (!matches.length) {
        setPatchHeroStats(null);
        return;
      }

      const wins = matches.filter((m) =>
        m.player_slot < 128 ? m.radiant_win : !m.radiant_win
      ).length;
      const losses = matches.length - wins;
      const winRate = ((wins / matches.length) * 100).toFixed(2);

      setPatchHeroStats({
        games: matches.length,
        wins,
        losses,
        winRate,
      });
    } catch (error) {
      console.error("Failed to fetch patch hero stats:", error);
      setPatchHeroStats(null);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="app-title">Acolyte Index</div>

      <div className="page-container">
        {/* Left Column: Hero List */}
        <div className="hero-list">
          <h2>Heroes</h2>

          {/* Search Box */}
          <input
            type="text"
            className="search-box"
            placeholder="Search heroes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Role Filters */}
          <div className="role-filters">
            {["Carry", "Support", "Durable", "Disabler", "Initiator", "Nuker", "Escape", "Pusher"].map(
              (role) => (
                <label key={role}>
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role)}
                    onChange={() => handleRoleChange(role)}
                  />
                  {role}
                </label>
              )
            )}
          </div>

          {/* Filtered List */}
          <ul>
            {filteredHeroes.map((hero) => {
              const heroName = hero.name.replace("npc_dota_hero_", "");
              const imgUrl = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`;
              return (
                <li
                  key={hero.id}
                  onClick={() => fetchHeroStats(hero.id)}
                  className={selectedHero?.id === hero.id ? "active" : ""}
                >
                  <img src={imgUrl} alt={hero.localized_name} className="hero-icon" />
                  <span>{hero.localized_name}</span>
                </li>
              );
            })}
          </ul>
        </div>


        {/* Right Section */}
        <div className="right-section">
          {/* Player Search Row */}
          <div className="player-section">
            <h2>Player Lookup</h2>
            <div className="player-search-group">
              <input
                type="text"
                placeholder="Enter Steam32 ID"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
              />
              <button onClick={fetchPlayerInfo}>Fetch Player</button>
            </div>
            {playerLoading && <p>Fetching player data...</p>}
          </div>

          {/* Bottom Row: Hero + Player Info */}
          <div className="bottom-row">
            {/* Hero Card */}
            <div className="hero-details">
              {loading && <p>Consulting the Ancients...</p>}
              {!loading && selectedHero && (
                <>
                  <img
                    src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${selectedHero.name.replace(
                      "npc_dota_hero_",
                      ""
                    )}.png`}
                    alt={selectedHero.localized_name}
                    className="hero-large"
                  />
                  <h2>{selectedHero.localized_name}</h2>
                  <small>Stats from Pro Matches (Patch {currentPatch || "Loading..."})</small>
                  <p>Roles: {selectedHero.roles?.join(", ")}</p>

                  {/* Divider after Roles */}
                  <hr className="divider" />

                  <p>
                    Win Rate:{" "}
                    {(
                      (selectedHero.pro_win / selectedHero.pro_pick) * 100 || 0
                    ).toFixed(2)}%
                  </p>
                  <p>Pro Pick Count: {selectedHero.pro_pick || 0}</p>
                  <p>Pro Ban Count: {selectedHero.pro_ban || 0}</p>
                  <p>
                    KDA (Patch Avg):{" "}
                    {selectedHero.kda ? selectedHero.kda.toFixed(2) : "N/A"}
                  </p>
                  <p>Move Speed: {selectedHero.move_speed}</p>
                </>
              )}
              {!loading && !selectedHero && <p>Select a hero to see details.</p>}
            </div>

            {/* Player Info Card */}
            <div className="player-info-wrapper">
              {playerData && (
                <>
                  <img
                    src={playerData.profile?.avatarfull}
                    alt="Player Avatar"
                  />
                  <h3>{playerData.profile?.personaname || "Unknown Player"}</h3>
                  <p>MMR Estimate: {playerData.mmr_estimate?.estimate || "N/A"}</p>

                  {selectedHero && playerData.heroes && (
                    <div className="player-hero-stats">
                      {(() => {
                        const heroStats = playerData.heroes.find(
                          (h) => parseInt(h.hero_id) === parseInt(selectedHero.id)
                        );
                        if (!heroStats) {
                          return (
                            <p>
                              {playerData.profile?.personaname} has no games on{" "}
                              {selectedHero.localized_name}.
                            </p>
                          );
                        }
                        const winrate = ((heroStats.win / heroStats.games) * 100).toFixed(2);
                        return (
                          <>
                            <h4>
                              {playerData.profile?.personaname}'s {selectedHero.localized_name} Stats
                            </h4>
                            <div className="stats-section">
                              <h5>All-Time:</h5>
                              <p>Games: {heroStats.games}</p>
                              <p>Wins: {heroStats.win}</p>
                              <p>Losses: {heroStats.games - heroStats.win}</p>
                              <p>Win Rate: {winrate}%</p>
                            </div>

                            {/* Divider between All-Time and Patch */}
                            <hr className="divider" />

                            {patchHeroStats ? (
                              <div className="stats-section">
                                <h5>Patch {currentPatch || "Latest"}:</h5>
                                <p>Games: {patchHeroStats.games}</p>
                                <p>Wins: {patchHeroStats.wins}</p>
                                <p>Losses: {patchHeroStats.losses}</p>
                                <p>Win Rate: {patchHeroStats.winRate}%</p>
                              </div>
                            ) : (
                              <p>No games recorded for this patch.</p>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </>
              )}
              {!playerData && <p>No player selected.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

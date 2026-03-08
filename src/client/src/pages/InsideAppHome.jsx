import { useState, useEffect } from "react";
import "../App.css";
import "./AppPages.css";
import BottomNav from "../BottomNav";
import CharacterCanvas from "../components/CharacterCanvas";
import { useAuth } from "../context/AuthContext";
import { getCharacterCanvasProps } from "../data/characterOptions";
import cleanOverlay from "../assets/hygiene/clean.png";
import stinkyOverlay from "../assets/hygiene/stinky.png";

function InsideAppHome() {
  const { user, token } = useAuth();
  const [spendingHealth, setSpendingHealth] = useState(null);

  const displayHealth = spendingHealth ?? 100;
  const isOverBudget = displayHealth < 70;
  const overlayImage = isOverBudget ? stinkyOverlay : cleanOverlay;

  useEffect(() => {
    if (!token) return;
    async function syncThenFetchHealth() {
      try {
        await fetch("/api/plaid/sync-transactions", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch { /* ignore sync errors */ }
      try {
        const res = await fetch("/api/health", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && typeof data.health === "number") {
          setSpendingHealth(data.health);
        } else {
          setSpendingHealth(100);
        }
      } catch {
        setSpendingHealth(100);
      }
    }
    syncThenFetchHealth();
  }, [token]);

  const characterProps = getCharacterCanvasProps(user?.character);

  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section"></div>

        <div className="inside-app-content dashboard-content">

          <h1 className="dashboard-title">{user?.name ? `${user.name}'s buddy` : "buddy"}</h1>

          <div className="dashboard-card dashboard-character-card">

          <div className="character-wrapper">
            <CharacterCanvas {...characterProps} />
            <img src={overlayImage} alt="Character cleanliness overlay" className="character-overlay" />
          </div>

            <p className="dashboard-stat-title">Buddy's Health</p>

            <div className="dashboard-progress-bar">
              <div
                className="dashboard-progress-fill"
                style={{ width: `${displayHealth}%` }}
              />
            </div>

            <p className="dashboard-muted">
              {displayHealth}% healthy spending this month
            </p>

          </div>

        </div>

        <BottomNav />

      </div>
    </div>
  );
}

export default InsideAppHome;
import { useState, useEffect } from "react";
import "../App.css";
import "./AppPages.css";
import BottomNav from "../BottomNav";
import CharacterCanvas from "../components/CharacterCanvas";
import { useAuth } from "../context/AuthContext";
import { getCharacterCanvasProps } from "../data/characterOptions";

function InsideAppHome() {
  const { user, token } = useAuth();
  const [spendingHealth, setSpendingHealth] = useState(null);

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
  const displayHealth = spendingHealth ?? 100;

  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section"></div>

        <div className="inside-app-content dashboard-content">

          <h1 className="dashboard-title">Home</h1>

          <div className="dashboard-card dashboard-character-card">

            <CharacterCanvas {...characterProps} />

            <p className="dashboard-stat-title">Character Health</p>

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
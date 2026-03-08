import { useState, useEffect } from "react";
import "../App.css";
import "./AppPages.css";
import BottomNav from "../BottomNav";
import { useAuth } from "../context/AuthContext";

function Leaderboard() {
  const { token } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    async function fetchLeaderboard() {
      try {
        const res = await fetch("/api/leaderboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setLeaderboard(data.leaderboard || []);
        } else {
          setError(data.error || "Failed to load leaderboard");
        }
      } catch {
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, [token]);

  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section"></div>

        <div className="cc-card">
          <h1 className="dashboard-title">Leaderboard</h1>

          {loading ? (
            <p className="friends-placeholder">Loading...</p>
          ) : error ? (
            <p className="friends-message friends-message-error">{error}</p>
          ) : leaderboard.length === 0 ? (
            <p className="friends-placeholder">
              Add friends to see them on the leaderboard!
            </p>
          ) : (
            leaderboard.map((entry, index) => (
              <div className="leaderboard-card" key={entry.userId}>
                <div className="leaderboard-row">
                  <div className="leaderboard-info">
                    <p className="leaderboard-rank">
                      {index + 1}. {entry.name} {entry.isUser ? "(You)" : ""}
                    </p>
                    <div className="leaderboard-progress-wrap">
                      <div className="dashboard-progress-bar">
                        <div
                          className="dashboard-progress-fill"
                          style={{ width: `${entry.health}%` }}
                        />
                      </div>
                      <p className="leaderboard-detail">
                        {entry.health}% healthy spending this month
                      </p>
                    </div>
                  </div>
                  <div className="leaderboard-score-circle">{entry.health}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default Leaderboard;

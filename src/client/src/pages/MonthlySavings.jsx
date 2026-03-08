import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { GOAL_CATEGORIES } from "../data/goalCategories";
import BottomNav from "../BottomNav";
import "../App.css";
import "./AppPages.css";
import "./Goals.css";

function MonthlySavings() {
  const { token } = useAuth();
  const [goals, setGoals] = useState(null);
  const [actualsByCategory, setActualsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setGoals({});
      setActualsByCategory({});
      setLoading(false);
      return;
    }
    async function syncThenFetchGoals() {
      try {
        await fetch("/api/plaid/sync-transactions", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch { /* ignore sync errors */ }
      try {
        const res = await fetch("/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setGoals(data.goals || {});
          setActualsByCategory(data.actualsByCategory || {});
        } else {
          setError(data.error || "Failed to load goals");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    syncThenFetchGoals();
  }, [token]);

  const formatDisplay = (v) => {
    const n = parseFloat(v);
    if (Number.isNaN(n)) return "$0.00";
    return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section" />

        <div className="main-content login-content goals-content inside-app-content">
          <h1 className="login-title">Monthly Savings Plan</h1>
          <p className="login-subtitle">
            Your current budget and spending limits.
          </p>

          {loading && <p className="goals-loading">Loading goals…</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && (
            <>
              <div className="goals-total-area">
                <span className="goals-total-label">Total Budget</span>
                <span className="goals-total-value">
                  {formatDisplay(
                    GOAL_CATEGORIES.reduce(
                      (sum, { id }) => sum + (actualsByCategory?.[id] ?? 0),
                      0
                    )
                  )}{" "}
                  /{" "}
                  {formatDisplay(
                    GOAL_CATEGORIES.reduce(
                      (sum, { id }) => sum + (goals?.[id] ?? 0),
                      0
                    )
                  )}
                </span>
              </div>

              {GOAL_CATEGORIES.map(({ id, label }) => {
                const goal = goals?.[id] ?? 0;
                const actual = actualsByCategory?.[id] ?? 0;
                const displayValue = `${formatDisplay(actual)} / ${formatDisplay(goal)}`;
                return (
                  <div key={id} className="form-group">
                    <label className="goals-label" htmlFor={id}>
                      {label}
                    </label>
                    <input
                      id={id}
                      type="text"
                      className="input-field goals-currency-input"
                      value={displayValue}
                      readOnly
                      aria-label={label}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default MonthlySavings;

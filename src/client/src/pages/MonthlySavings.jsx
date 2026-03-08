import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { GOAL_CATEGORIES } from "../data/goalCategories";
import "../App.css";
import "./Goals.css";

function MonthlySavings() {
  const { token } = useAuth();
  const [goals, setGoals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setGoals({});
      setLoading(false);
      return;
    }
    async function fetchGoals() {
      try {
        const res = await fetch("/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setGoals(data.goals || {});
        } else {
          setError(data.error || "Failed to load goals");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchGoals();
  }, [token]);

  const formatDisplay = (v) => {
    const n = parseFloat(v);
    if (Number.isNaN(n)) return "$0.00";
    return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="app">
      <div className="phone-container">
        <div className="top-section login-top-section" />

        <div className="main-content login-content goals-content">
          <h1 className="login-title">Monthly Savings Plan</h1>
          <p className="login-subtitle">
            Your current budget and spending limits.
          </p>

          {loading && <p className="goals-loading">Loading goals…</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && (
            <>
              {GOAL_CATEGORIES.map(({ id, label }) => (
                <div key={id} className="form-group">
                  <label className="goals-label" htmlFor={id}>
                    {label}
                  </label>
                  <input
                    id={id}
                    type="text"
                    className="input-field goals-currency-input"
                    value={formatDisplay(goals?.[id] ?? 0)}
                    readOnly
                    aria-label={label}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MonthlySavings;

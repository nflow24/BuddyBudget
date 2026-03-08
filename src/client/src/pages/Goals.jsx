import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GOAL_CATEGORIES } from "../data/goalCategories";
import "../App.css";
import "./Goals.css";

function Goals() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [values, setValues] = useState(
    Object.fromEntries(GOAL_CATEGORIES.map((f) => [f.id, f.default]))
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (id, raw) => {
    const digits = raw.replace(/\D/g, "");
    const cents = digits.slice(-2);
    const whole = digits.slice(0, -2) || "0";
    const formatted = `${whole}.${cents.padStart(2, "0")}`;
    setValues((prev) => ({ ...prev, [id]: formatted }));
  };

  const formatDisplay = (v) => {
    const n = parseFloat(v);
    if (Number.isNaN(n)) return "$0.00";
    return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseAmount = (v) => {
    const n = parseFloat(String(v || "0").replace(/,/g, ""));
    return Number.isNaN(n) ? 0 : n;
  };

  const handleNext = async () => {
    setError(null);
    setSaving(true);
    try {
      const goals = {};
      for (const { id } of GOAL_CATEGORIES) {
        goals[id] = parseAmount(values[id]);
      }
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ goals }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save goals");
        setSaving(false);
        return;
      }
      navigate("/connect-bank");
    } catch (err) {
      setError("Network error. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="app">
      <div className="phone-container">
        <div className="top-section" />

        <div className="main-content login-content goals-content">
          <h1 className="login-title">Step 2: Set Your Monthly Goals</h1>
          <p className="login-subtitle">
            Enter your budget and spending limits below.
          </p>

          {error && <p className="error-text">{error}</p>}

          {GOAL_CATEGORIES.map(({ id, label }) => (
            <div key={id} className="form-group">
              <label className="goals-label" htmlFor={id}>
                {label}
              </label>
              <input
                id={id}
                type="text"
                className="input-field goals-currency-input"
                value={formatDisplay(values[id])}
                onChange={(e) => handleChange(id, e.target.value)}
                inputMode="decimal"
                aria-label={label}
              />
            </div>
          ))}

          <div className="goals-total-area">
            <span className="goals-total-label">Total Budget</span>
            <span className="goals-total-value">
              {formatDisplay(
                GOAL_CATEGORIES.reduce(
                  (sum, { id }) => sum + parseAmount(values[id]),
                  0
                )
              )}
            </span>
          </div>

          <button
            type="button"
            className="login-btn goals-next-btn"
            onClick={handleNext}
            disabled={saving}
            aria-label="Next"
          >
            {saving ? "Saving…" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Goals;


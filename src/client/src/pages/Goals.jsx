import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./Goals.css";

const CURRENCY_FIELDS = [
  { id: "budget", label: "What is your budget for the month?", default: "500.00" },
  { id: "save", label: "How much do you want to save?", default: "200.00" },
  { id: "groceries", label: "How much do you want to spend on groceries?", default: "250.00" },
  { id: "entertainment", label: "How much do you want to spend on entertainment?", default: "50.00" },
];

function Goals() {
  const navigate = useNavigate();
  const [values, setValues] = useState(
    Object.fromEntries(CURRENCY_FIELDS.map((f) => [f.id, f.default]))
  );

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

  return (
    <div className="app">
      <div className="phone-container">
        <div className="top-section login-top-section">
        </div>

        <div className="main-content login-content goals-content">
          <h1 className="login-title">Step 2: Set Your Monthly Goals</h1>
          <p className="login-subtitle">Enter your budget and spending limits below.</p>

          {CURRENCY_FIELDS.map(({ id, label }) => (
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

          <button type="button" className="login-btn goals-next-btn" onClick={() => navigate("/connect-bank")} aria-label="Next">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Goals;


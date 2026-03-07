import { useState } from "react";
import "../App.css";
import "./Goals.css";
import './CharacterCustomization.css';
//import { useNavigate } from "react-router-dom";

const CURRENCY_FIELDS = [
  { id: "budget", label: "Budget for the month:", default: "500.00" },
  { id: "save", label: "Savings Goal:", default: "200.00" },
  { id: "groceries", label: "Groceries Limit:", default: "250.00" },
  { id: "entertainment", label: "Entertainment Limit:", default: "50.00" },
  { id: "transportation", label: "Transportation Limit:", default: "50.00" },
];

function MonthlySavings() {
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
        {/* Green top section */}
        <div className="cc-top-section"></div>
        {/* White card overlapping green */}
        <div className="cc-card">
          <h1 className="cc-title">
            Monthly Savings Plan
          </h1>

          <div className="goals-body">
            {CURRENCY_FIELDS.map(({ id, label, default: def }) => (
              <div key={id} className="goals-field">
                <label className="goals-label" htmlFor={id}>
                  {label}
                </label>
                <input
                  id={id}
                  type="text"
                  className="goals-input"
                  value={formatDisplay(values[id])}
                  onChange={(e) => handleChange(id, e.target.value)}
                  inputMode="decimal"
                  aria-label={label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlySavings;
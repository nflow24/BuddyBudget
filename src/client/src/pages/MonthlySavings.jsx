import "../App.css";
import "./CharacterCustomization.css";
import "./Goals.css";

const CURRENCY_FIELDS = [
  { id: "budget", label: "This Month's Budget Goals", default: "500.00" },
  { id: "save", label: "Savings", default: "200.00" },
  { id: "groceries", label: "Groceries", default: "250.00" },
  { id: "entertainment", label: "Entertainment", default: "50.00" },
];

function MonthlySavings() {
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
          <h1 className="login-title">Monthly Savings Plan</h1>
          <p className="login-subtitle">Your current budget and spending limits.</p>

          {CURRENCY_FIELDS.map(({ id, label, default: def }) => (
            <div key={id} className="form-group">
              <label className="goals-label" htmlFor={id}>
                {label}
              </label>
              <input
                id={id}
                type="text"
                className="input-field goals-currency-input"
                value={formatDisplay(def)}
                readOnly
                aria-label={label}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MonthlySavings;

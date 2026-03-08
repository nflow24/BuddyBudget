import "../App.css";
import "./AppPages.css";
import BottomNav from "../BottomNav";

function Money() {
  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section"></div>

        <div className="inside-app-content dashboard-content">
          <h1 className="dashboard-title">Money</h1>

          <div className="dashboard-card">
            <p className="dashboard-stat-title">This Month's Spending</p>
            <p className="dashboard-stat-line">• Groceries: $198 / $250</p>
            <p className="dashboard-stat-line">• Entertainment: $42 / $50</p>
            <p className="dashboard-stat-line">• Transportation: $65 / $100</p>
            <p className="dashboard-stat-line">• Rent: $900 / $900</p>
          </div>

          <div className="dashboard-card">
            <p className="dashboard-stat-title">Overall Summary</p>
            <p className="dashboard-stat-line">• Total Budget: $500.00</p>
            <p className="dashboard-stat-line">• Total Spent: $372.00</p>
            <p className="dashboard-stat-line">• Saved So Far: $128.00</p>
          </div>

          <div className="dashboard-card">
            <p className="dashboard-stat-title">Spending Health</p>

            <div className="dashboard-progress-bar">
              <div
                className="dashboard-progress-fill"
                style={{ width: "74%" }}
              />
            </div>

            <p className="dashboard-muted">
              74% on track with your spending goals
            </p>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default Money;
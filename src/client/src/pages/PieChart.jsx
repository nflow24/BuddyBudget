import "../App.css";
import "./AppPages.css";
import BottomNav from "../BottomNav";

function PieChart() {
  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section" />

        <div className="inside-app-content dashboard-content">
          <h1 className="dashboard-title">Monthly Spendings</h1>
          {/* Pie chart and legend placeholder - teammates will implement */}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default PieChart;

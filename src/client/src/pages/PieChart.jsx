import "../App.css";
import "./AppPages.css";
import "./CharacterCustomization.css";
import BottomNav from "../BottomNav";
import SpendingPieChart from "../components/SpendingPieChart";

function PieChart() {
  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="cc-top-section" />
        <div className="cc-card">
          <div className="inside-app-content dashboard-content">
            <h1 className="dashboard-title">Monthly Spendings</h1>
            <SpendingPieChart />
          </div>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default PieChart;

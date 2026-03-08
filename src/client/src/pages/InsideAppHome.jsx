import "../App.css";
import "./AppPages.css";
import BottomNav from "../BottomNav";
import CharacterCanvas from "../components/CharacterCanvas";
import { useAuth } from "../context/AuthContext";
import { getCharacterCanvasProps } from "../data/characterOptions";

function InsideAppHome() {
  const { user } = useAuth();
  const spendingHealth = 72;
  const characterProps = getCharacterCanvasProps(user?.character);

  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section"></div>

        <div className="inside-app-content dashboard-content">

          <h1 className="dashboard-title">Home</h1>

          <div className="dashboard-card dashboard-character-card">

            <CharacterCanvas {...characterProps} />

            <p className="dashboard-stat-title">Character Health</p>

            <div className="dashboard-progress-bar">
              <div
                className="dashboard-progress-fill"
                style={{ width: `${spendingHealth}%` }}
              />
            </div>

            <p className="dashboard-muted">
              {spendingHealth}% healthy spending this month
            </p>

          </div>

        </div>

        <BottomNav />

      </div>
    </div>
  );
}

export default InsideAppHome;
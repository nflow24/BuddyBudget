import "../App.css";
import "./AppPages.css";
import BottomNav from "../BottomNav";

function Leaderboard() {
  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section" />

        <div className="inside-app-content dashboard-content leaderboard-content">
          <h1 className="dashboard-title">March Leaderboard</h1>

          <div className="leaderboard-entry">
            <div className="leaderboard-header">
              <span className="leaderboard-rank">1st</span>
              <span className="leaderboard-name">Nate</span>
              <span className="leaderboard-trophies">🏆🏆🏆</span>
            </div>
            <div className="leaderboard-bar leaderboard-bar-1" />
            <ul className="leaderboard-stats">
              <li>Goal 120% Completed</li>
              <li>32% Under Budget</li>
              <li>25% of Money Saved</li>
            </ul>
          </div>

          <div className="leaderboard-entry">
            <div className="leaderboard-header">
              <span className="leaderboard-rank">2nd</span>
              <span className="leaderboard-name">Sam</span>
              <span className="leaderboard-trophies">🏆</span>
            </div>
            <div className="leaderboard-bar leaderboard-bar-2" />
            <ul className="leaderboard-stats">
              <li>Goal 87% Completed</li>
              <li>2% Over Budget</li>
              <li>12% of Money Saved</li>
            </ul>
          </div>

          <div className="leaderboard-entry">
            <div className="leaderboard-header">
              <span className="leaderboard-rank">3rd</span>
              <span className="leaderboard-name">John</span>
              <span className="leaderboard-trophies" />
            </div>
            <div className="leaderboard-bar leaderboard-bar-3" />
            <ul className="leaderboard-stats">
              <li>Goal 56% Completed</li>
              <li>18% Over Budget</li>
              <li>5% of Money Saved</li>
            </ul>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default Leaderboard;

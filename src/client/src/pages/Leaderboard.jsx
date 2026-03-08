import "../App.css";
import "./AppPages.css";
import BottomNav from "../BottomNav";
import { useAppData } from "../context/AppDataContext";

function Leaderboard() {
  const { userData } = useAppData();

  const rankedFriends = [...userData.friends].sort((a, b) => {
    const scoreA = a.goalCompleted + a.moneySaved - a.overBudget;
    const scoreB = b.goalCompleted + b.moneySaved - b.overBudget;
    return scoreB - scoreA;
  });

  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section"></div>

        <div className="inside-app-content dashboard-content">
          <h1 className="dashboard-title">Leaderboard</h1>

          {rankedFriends.map((friend, index) => {
            const score = friend.goalCompleted + friend.moneySaved - friend.overBudget;

            return (
              <div className="leaderboard-card" key={friend.code}>
                <div className="leaderboard-row">
                  <div>
                    <p className="leaderboard-rank">
                      {index + 1}. {friend.name} {friend.isUser ? "(You)" : ""}
                    </p>
                    <p className="leaderboard-detail">
                      Goal {friend.goalCompleted}% completed
                    </p>
                    <p className="leaderboard-detail">
                      {friend.moneySaved}% of money saved
                    </p>
                    {friend.overBudget > 0 ? (
                      <p className="leaderboard-detail">
                        {friend.overBudget}% over budget
                      </p>
                    ) : (
                      <p className="leaderboard-detail">
                        On track with budget
                      </p>
                    )}
                  </div>

                  <div className="leaderboard-score-circle">
                    {score}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default Leaderboard;
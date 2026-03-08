import "../App.css";
import "./AppPages.css";
import BottomNav from "../BottomNav";

function Friends() {
  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section" />

        <div className="inside-app-content dashboard-content friends-content">
          <h2 className="friends-section-title">Your Friends:</h2>
          <ul className="friends-list">
            <li>1. Sam (you)</li>
            <li>2. Nate</li>
            <li>3. John</li>
          </ul>

          <h2 className="friends-section-title">Add Your Friend to Compete</h2>
          <p className="friends-label">Enter E-Mail:</p>
          <input
            type="email"
            placeholder=""
            className="input-field friends-email-input"
            disabled
          />
          <button type="button" className="login-btn friends-invite-btn" disabled>
            Send Invitation
          </button>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default Friends;

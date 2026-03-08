import { useState } from "react";
import "../App.css";
import "./AppPages.css";
import BottomNav from "../BottomNav";

function Friends() {
  const [email, setEmail] = useState("");
  const [friends, setFriends] = useState([]);
  const [message, setMessage] = useState("");

  const handleInvite = () => {
    if (!email.trim()) {
      setMessage("Please enter an email.");
      return;
    }

    const namePart = email.split("@")[0]?.trim();
    const formattedName =
      namePart.length > 0
        ? namePart.charAt(0).toUpperCase() + namePart.slice(1)
        : "New Friend";

    if (friends.some((friend) => friend.toLowerCase() === formattedName.toLowerCase())) {
      setMessage("Friend already added.");
      return;
    }

    setFriends((prev) => [...prev, formattedName]);
    setMessage(`Invitation sent to ${email}`);
    setEmail("");
  };

  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section"></div>

        <div className="inside-app-content dashboard-content">
          <div className="friends-card">
            <h1 className="friends-title">Your Friends:</h1>

            <div className="friends-list">
              {friends.length === 0 ? (
                <p className="friends-placeholder">Make your first friend!</p>
              ) : (
                friends.map((friend, index) => (
                  <p key={friend} className="friends-list-item">
                    {index + 1}. {friend}
                  </p>
                ))
              )}
            </div>

            <h2 className="friends-subtitle">
              Add Your Friends to BuddyBudget and See Who Saves the Most!
            </h2>

            <input
              id="friend-email"
              type="email"
              placeholder="Enter their name"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="friends-button" onClick={handleInvite}>
              Send Invitation
            </button>

            {message && <p className="friends-message">{message}</p>}
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default Friends;

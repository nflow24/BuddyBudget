import { useState, useEffect } from "react";
import "../App.css";
import "./AppPages.css";
import BottomNav from "../BottomNav";
import { useAuth } from "../context/AuthContext";

function Friends() {
  const { token } = useAuth();
  const [email, setEmail] = useState("");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" | "error"

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    async function fetchFriends() {
      try {
        const res = await fetch("/api/friends", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setFriends(data.friends || []);
        }
      } catch {
        setMessage("Failed to load friends");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    }
    fetchFriends();
  }, [token]);

  const handleInvite = async () => {
    if (!email.trim()) {
      setMessage("Please enter an email.");
      setMessageType("error");
      return;
    }

    if (!token) {
      setMessage("Please sign in to add friends.");
      setMessageType("error");
      return;
    }

    setAdding(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("/api/friends/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setFriends((prev) => [...prev, data.friend]);
        setMessage(`Friend added! ${data.friend.name} is now on your list.`);
        setMessageType("success");
        setEmail("");
      } else {
        setMessage(data.error || "Failed to add friend");
        setMessageType("error");
      }
    } catch {
      setMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section"></div>

        <div className="inside-app-content dashboard-content">
          <div className="friends-card">
            <h1 className="friends-title">Your Friends:</h1>

            <div className="friends-list">
              {loading ? (
                <p className="friends-placeholder">Loading...</p>
              ) : friends.length === 0 ? (
                <p className="friends-placeholder">Make your first friend!</p>
              ) : (
                friends.map((friend, index) => (
                  <p key={friend._id} className="friends-list-item">
                    {index + 1}. {friend.name}
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
              placeholder="Enter their email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={adding}
            />

            <button
              className="friends-button"
              onClick={handleInvite}
              disabled={adding}
            >
              {adding ? "Adding..." : "Add Friend"}
            </button>

            {message && (
              <p
                className={`friends-message ${
                  messageType === "error" ? "friends-message-error" : ""
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default Friends;

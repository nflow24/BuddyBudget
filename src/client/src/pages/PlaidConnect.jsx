import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaidLink } from "react-plaid-link";
import { useAuth } from "../context/AuthContext";
import "../App.css";
import "./PlaidConnect.css";

function PlaidConnect() {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [linkToken, setLinkToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchLinkToken() {
      try {
        const res = await fetch("/api/plaid/create-link-token", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setLinkToken(data.link_token);
        } else {
          setError(data.error || "Failed to load Plaid");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchLinkToken();
  }, [token, navigate]);

  const onSuccess = useCallback(
    async (publicToken) => {
      try {
        const res = await fetch("/api/plaid/exchange-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ public_token: publicToken }),
        });
        const data = await res.json();
        if (res.ok) {
          setConnected(true);
          setError(null);
          setTimeout(() => navigate("/home"), 1500);
        } else {
          setError(data.error || "Failed to connect bank");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      }
    },
    [token]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  if (!user) {
    return null;
  }

  return (
    <div className="app">
      <div className="phone-container">
        <div className="top-section" />

        <div className="main-content plaid-content">
          <h1 className="plaid-title">Step 3: Connect to your bank</h1>
          <p className="plaid-subtitle">
            Securely link your bank account to track spending and reach your goals.
          </p>

          {loading && <p className="plaid-loading">Loading...</p>}

          {error && <p className="error-text">{error}</p>}

          {connected && (
            <p className="plaid-success">Your bank account has been connected successfully!</p>
          )}

          {!loading && linkToken && !connected && (
            <button
              className="plaid-connect-btn"
              onClick={() => open()}
              disabled={!ready}
            >
              Connect Your Bank
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaidConnect;

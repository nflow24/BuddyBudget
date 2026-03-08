import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CharacterCanvas from "../components/CharacterCanvas";
import "../App.css";
import "./CharacterCustomization.css";

function CustomizationReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, updateUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const characterData = location.state;

  if (!characterData) {
    return (
      <div className="app">
        <div className="phone-container">
          <div className="top-section" />
          <div className="cc-card">
            <h1 className="cc-title">No character found</h1>
            <button
              className="get-started-btn"
              onClick={() => navigate("/customize")}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const {
    skinTone,
    hairStyle,
    shirtStyle,
    pantsStyle,
    shoeStyle,
  } = characterData;

  const handleSaveAndContinue = async () => {
    if (!token) {
      setError("Please sign in to continue.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/me/character", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          skin: skinTone?.value,
          hair: hairStyle?.value,
          shirt: shirtStyle?.value,
          pants: pantsStyle?.value,
          shoes: shoeStyle?.value,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        updateUser(data.user);
        navigate("/goals");
      } else {
        setError(data.error || "Failed to save character");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app">
      <div className="phone-container">
        <div className="top-section" />

        <div className="cc-card">
          <h1 className="cc-title review-title">
            Looks great!
            <br />
            Ready to move on?
          </h1>

          <CharacterCanvas
            skinToneSrc={skinTone.asset}
            hairStyleSrc={hairStyle.asset}
            hairTop={hairStyle.top}
            hairWidth={hairStyle.width}
            shirtSrc={shirtStyle.asset}
            shirtTop={shirtStyle.top}
            shirtWidth={shirtStyle.width}
            pantsSrc={pantsStyle.asset}
            pantsTop={pantsStyle.top}
            pantsWidth={pantsStyle.width}
            shoeSrc={shoeStyle.asset}
            shoeTop={shoeStyle.top}
            shoeWidth={shoeStyle.width}
          />

          {error && <p className="error-text">{error}</p>}

          <div className="review-buttons">
            <button
              className="review-btn"
              onClick={handleSaveAndContinue}
              disabled={saving}
            >
              {saving ? "Saving..." : "Yes, continue! →"}
            </button>

            <button
              className="review-btn secondary"
              onClick={() => navigate("/customize", { state: characterData })}
              disabled={saving}
            >
              ← No, go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizationReview;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CharacterCanvas from "../components/CharacterCanvas";
import "../App.css";
import "./CharacterCustomization.css";

function CustomizationReview() {
  const navigate = useNavigate();
  const location = useLocation();

  const characterData = location.state;

  if (!characterData) {
    return (
      <div className="app">
        <div className="phone-container">
          <div className="cc-top-section"></div>
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

  return (
    <div className="app">
      <div className="phone-container">
        <div className="cc-top-section"></div>

        <div className="cc-card review-card">
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

          <div className="review-buttons">
            <button
            className="review-btn"
            onClick={() => navigate('/goals')}
            >
            Yes, continue! →
            </button>

            <button
              className="review-btn secondary"
              onClick={() => navigate("/customize", { state: characterData })}
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
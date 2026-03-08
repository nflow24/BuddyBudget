import React, { useState } from 'react';
import CharacterCanvas from '../components/CharacterCanvas';
import Selector from '../components/Selector';
import {
  skinToneOptions,
  hairStyleOptionsWithPreview,
  shirtOptionsWithPreview,
  pantsOptionsWithPreview,
  shoeOptionsWithPreview,
} from '../data/characterOptions';
import './CharacterCustomization.css';
import { useNavigate, useLocation } from 'react-router-dom';

const CharacterCustomization = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const savedCharacter = location.state;

  const [skinTone, setSkinTone] = useState(skinToneOptions[0]);
  const [hairStyle, setHairStyle] = useState(hairStyleOptionsWithPreview[0]);
  const [shirtStyle, setShirtStyle] = useState(shirtOptionsWithPreview[0]);
  const [pantsStyle, setPantsStyle] = useState(pantsOptionsWithPreview[0]);
  const [shoeStyle, setShoeStyle] = useState(shoeOptionsWithPreview[0]);

  const handleSkinToneSelect = (value) => {
    const selected = skinToneOptions.find(opt => opt.value === value);
    if (selected) setSkinTone(selected);
  };

  const handleHairStyleSelect = (value) => {
    const selected = hairStyleOptionsWithPreview.find(opt => opt.value === value);
    if (selected) setHairStyle(selected);
  };

  const handleShirtSelect = (value) => {
    const selected = shirtOptionsWithPreview.find(opt => opt.value === value);
    if (selected) setShirtStyle(selected);
  };

  const handlePantsSelect = (value) => {
    const selected = pantsOptionsWithPreview.find(opt => opt.value === value);
    if (selected) setPantsStyle(selected);
  };

  const handleShoeSelect = (value) => {
    const selected = shoeOptionsWithPreview.find(opt => opt.value === value);
    if (selected) setShoeStyle(selected);
  };

const handleFinishCustomization = () => {
  navigate('/customize/review', {
    state: {
      skinTone,
      hairStyle,
      shirtStyle,
      pantsStyle,
      shoeStyle,
    },
  });
};

  return (
    <div className="app">
      <div className="phone-container">
        {/* Green top section */}
        <div className="cc-top-section"></div>

        {/* White card overlapping green */}
        <div className="cc-card">
          <h1 className="cc-title">
            Step 1: Customize<br />your character
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

          <Selector
            title="Skin Tone"
            type="color"
            options={skinToneOptions}
            selectedValue={skinTone.value}
            onSelect={handleSkinToneSelect}
          />

          <Selector
            title="Hair"
            type="image"
            options={hairStyleOptionsWithPreview}
            selectedValue={hairStyle.value}
            onSelect={handleHairStyleSelect}
          />

          <Selector
            title="Shirt"
            type="image"
            options={shirtOptionsWithPreview}
            selectedValue={shirtStyle.value}
            onSelect={handleShirtSelect}
          />

          <Selector
            title="Pants"
            type="image"
            options={pantsOptionsWithPreview}
            selectedValue={pantsStyle.value}
            onSelect={handlePantsSelect}
          />

          <Selector
            title="Shoes"
            type="image"
            options={shoeOptionsWithPreview}
            selectedValue={shoeStyle.value}
            onSelect={handleShoeSelect}
          />

          <button
            className="finish-customization-btn"
            onClick={handleFinishCustomization}
          >
            Finish Customization →
          </button>

        </div>
      </div>
    </div>
  );
};

export default CharacterCustomization;

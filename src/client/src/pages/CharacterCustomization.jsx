import React, { useState } from 'react';
import CharacterCanvas from '../components/CharacterCanvas';
import Selector from '../components/Selector';
import './CharacterCustomization.css';

// Import Assets
import PaleSkin from '../assets/character/PaleSkin.png';
import LightSkin from '../assets/character/LightSkin.png';
import TanSkin from '../assets/character/TanSkin.png';
import DarkSkin from '../assets/character/DarkSkin.png';

import Hair1 from '../assets/character/hair1.png';
import Hair2 from '../assets/character/hair2.png';
import Hair3 from '../assets/character/hair3.png';
import Hair4 from '../assets/character/hair4.png';
import Hair5 from '../assets/character/hair5.png';
import Hair6 from '../assets/character/hair6.png';
import Hair7 from '../assets/character/hair7.png';

const skinToneOptions = [
  { value: 'pale', color: '#FDF1E3', asset: PaleSkin, label: 'Pale Skin' },
  { value: 'light', color: '#F5D5B5', asset: LightSkin, label: 'Light Skin' },
  { value: 'tan', color: '#E8B48A', asset: TanSkin, label: 'Tan Skin' },
  { value: 'dark', color: '#8B5E3C', asset: DarkSkin, label: 'Dark Skin' },
];

const hairStyleOptions = [
  { value: 'hair1', previewImg: Hair1, asset: Hair1, label: 'Hair Style 1', top: 20, width: 115 },
  { value: 'hair2', previewImg: Hair2, asset: Hair2, label: 'Hair Style 2' },
  { value: 'hair3', previewImg: Hair3, asset: Hair3, label: 'Hair Style 3', top: 30 },
  { value: 'hair4', previewImg: Hair4, asset: Hair4, label: 'Hair Style 4', top: 30, width: 100 },
  { value: 'hair5', previewImg: Hair5, asset: Hair5, label: 'Hair Style 5', top: 25, width: 95 },
  { value: 'hair6', previewImg: Hair6, asset: Hair6, label: 'Hair Style 6', top: 35, width: 85 },
  { value: 'hair7', previewImg: Hair7, asset: Hair7, label: 'Hair Style 7', top: 40, width: 110 },
];

const CharacterCustomization = () => {
  const [skinTone, setSkinTone] = useState(skinToneOptions[0]);
  const [hairStyle, setHairStyle] = useState(hairStyleOptions[0]);

  const handleSkinToneSelect = (value) => {
    const selected = skinToneOptions.find(opt => opt.value === value);
    if (selected) setSkinTone(selected);
  };

  const handleHairStyleSelect = (value) => {
    const selected = hairStyleOptions.find(opt => opt.value === value);
    if (selected) setHairStyle(selected);
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
            options={hairStyleOptions}
            selectedValue={hairStyle.value}
            onSelect={handleHairStyleSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterCustomization;

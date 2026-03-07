import React, { useState } from 'react';
import CharacterCanvas from '../components/CharacterCanvas';
import Selector from '../components/Selector';
import './CharacterCustomization.css';

// Import Assets

//Skin tones
import PaleSkin from '../assets/character/PaleSkin.png';
import LightSkin from '../assets/character/LightSkin.png';
import TanSkin from '../assets/character/TanSkin.png';
import DarkSkin from '../assets/character/DarkSkin.png';

// Face
import Face1 from '../assets/character/face.png';

// Hair
import Hair1 from '../assets/character/hair1.png';
import Hair2 from '../assets/character/hair2.png';
import Hair3 from '../assets/character/hair3.png';
import Hair4 from '../assets/character/hair4.png';
import Hair5 from '../assets/character/hair5.png';
import Hair6 from '../assets/character/hair6.png';
import Hair7 from '../assets/character/hair7.png';

// Shirts
import Shirt1 from '../assets/character/blue_shirt.png';
import Shirt2 from '../assets/character/money_shirt.png';

// Pants
import Pants1 from '../assets/character/jeans.png';
import Pants2 from '../assets/character/light_jeans.png';
import Pants3 from '../assets/character/pink_shorts.png';
import Pants4 from '../assets/character/skirt.png';

// Shoes
import Shoe1 from '../assets/character/shoes.png';

const skinToneOptions = [
  { value: 'light', color: '#FDF1E3', asset: LightSkin, label: 'Light Skin' },
  { value: 'pale', color: '#F5D5B5', asset: PaleSkin, label: 'Pale Skin' },
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
  { value: 'hair7', previewImg: Hair7, asset: Hair7, label: 'Hair Style 7', top: 35, width: 110 },
];

const shirtOptions = [
  { value: 'blue shirt', previewImg: Shirt1, asset: Shirt1, label: 'Blue Shirt', top: 130, width: 63 },
  { value: 'money shirt', previewImg: Shirt2, asset: Shirt2, label: 'Money Shirt', top: 130, width: 63 },
];

const pantsOptions = [
  { value: 'jeans', previewImg: Pants1, asset: Pants1, label: 'Jeans', top: 180, width: 55 },
  { value: 'light jeans', previewImg: Pants2, asset: Pants2, label: 'Light Jeans', top: 180, width: 40 },
  { value: 'pink shorts', previewImg: Pants3, asset: Pants3, label: 'Pink Shorts', top: 180, width: 60 },
  { value: 'skirt', previewImg: Pants4, asset: Pants4, label: 'Skirt', top: 180, width: 63 },
];

const shoeOption = [
  { value: 'shoes', previewImg: Shoe1, asset: Shoe1, label: 'Shoes', top: 260, width: 66 },
];

const CharacterCustomization = () => {
  const [skinTone, setSkinTone] = useState(skinToneOptions[0]);
  const [hairStyle, setHairStyle] = useState(hairStyleOptions[0]);
  const [shirtStyle, setShirtStyle] = useState(shirtOptions[0]);
  const [pantsStyle, setPantsStyle] = useState(pantsOptions[0]);
  const [shoeStyle, setShoeStyle] = useState(shoeOption[0]);

  const handleSkinToneSelect = (value) => {
    const selected = skinToneOptions.find(opt => opt.value === value);
    if (selected) setSkinTone(selected);
  };

  const handleHairStyleSelect = (value) => {
    const selected = hairStyleOptions.find(opt => opt.value === value);
    if (selected) setHairStyle(selected);
  };

  const handleShirtSelect = (value) => {
    const selected = shirtOptions.find(opt => opt.value === value);
    if (selected) setShirtStyle(selected);
  };

  const handlePantsSelect = (value) => {
    const selected = pantsOptions.find(opt => opt.value === value);
    if (selected) setPantsStyle(selected);
  };

  const handleShoeSelect = (value) => {
    const selected = shoeOption.find(opt => opt.value === value);
    if (selected) setShoeStyle(selected);
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
            options={hairStyleOptions}
            selectedValue={hairStyle.value}
            onSelect={handleHairStyleSelect}
          />

          <Selector
            title="Shirt"
            type="image"
            options={shirtOptions}
            selectedValue={shirtStyle.value}
            onSelect={handleShirtSelect}
          />

          <Selector
            title="Pants"
            type="image"
            options={pantsOptions}
            selectedValue={pantsStyle.value}
            onSelect={handlePantsSelect}
          />

          <Selector
            title="Shoes"
            type="image"
            options={shoeOption}
            selectedValue={shoeStyle.value}
            onSelect={handleShoeSelect}
          />

        </div>
      </div>
    </div>
  );
};

export default CharacterCustomization;

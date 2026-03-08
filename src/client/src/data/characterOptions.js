// Skin tones
import PaleSkin from '../assets/character/PaleSkin.png';
import LightSkin from '../assets/character/LightSkin.png';
import TanSkin from '../assets/character/TanSkin.png';
import DarkSkin from '../assets/character/DarkSkin.png';

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

export const skinToneOptions = [
  { value: 'light', color: '#FDF1E3', asset: LightSkin, label: 'Light Skin' },
  { value: 'pale', color: '#F5D5B5', asset: PaleSkin, label: 'Pale Skin' },
  { value: 'tan', color: '#E8B48A', asset: TanSkin, label: 'Tan Skin' },
  { value: 'dark', color: '#8B5E3C', asset: DarkSkin, label: 'Dark Skin' },
];

export const hairStyleOptions = [
  { value: 'hair1', asset: Hair1, label: 'Hair Style 1', top: 20, width: 115 },
  { value: 'hair2', asset: Hair2, label: 'Hair Style 2', top: 0,  width: 105 },
  { value: 'hair3', asset: Hair3, label: 'Hair Style 3', top: 35, width: 120},
  { value: 'hair4', asset: Hair4, label: 'Hair Style 4', top: 30, width: 100 },
  { value: 'hair5', asset: Hair5, label: 'Hair Style 5', top: 25, width: 95 },
  { value: 'hair6', asset: Hair6, label: 'Hair Style 6', top: 35, width: 85 },
  { value: 'hair7', asset: Hair7, label: 'Hair Style 7', top: 35, width: 110 },
];

export const shirtOptions = [
  { value: 'blue shirt', asset: Shirt1, label: 'Blue Shirt', top: 130, width: 63 },
  { value: 'money shirt', asset: Shirt2, label: 'Money Shirt', top: 130, width: 63 },
];

export const pantsOptions = [
  { value: 'jeans', asset: Pants1, label: 'Jeans', top: 180, width: 55 },
  { value: 'light jeans', asset: Pants2, label: 'Light Jeans', top: 180, width: 40 },
  { value: 'pink shorts', asset: Pants3, label: 'Pink Shorts', top: 180, width: 60 },
  { value: 'skirt', asset: Pants4, label: 'Skirt', top: 180, width: 63 },
];

export const shoeOptions = [
  { value: 'shoes', asset: Shoe1, label: 'Shoes', top: 260, width: 66 },
];

// For Selector we need previewImg on image options
export const hairStyleOptionsWithPreview = hairStyleOptions.map((opt, i) => ({
  ...opt,
  previewImg: [Hair1, Hair2, Hair3, Hair4, Hair5, Hair6, Hair7][i],
}));
export const shirtOptionsWithPreview = shirtOptions.map((opt, i) => ({
  ...opt,
  previewImg: [Shirt1, Shirt2][i],
}));
export const pantsOptionsWithPreview = pantsOptions.map((opt, i) => ({
  ...opt,
  previewImg: [Pants1, Pants2, Pants3, Pants4][i],
}));
export const shoeOptionsWithPreview = shoeOptions.map((opt) => ({
  ...opt,
  previewImg: Shoe1,
}));

/**
 * Convert server character payload { skin, hair, shirt, pants, shoes } into
 * props for CharacterCanvas. Uses first option as default when value is missing.
 */
export function getCharacterCanvasProps(character) {
  if (!character || typeof character !== 'object') {
    character = {};
  }
  const skin = skinToneOptions.find((o) => o.value === character.skin) || skinToneOptions[0];
  const hair = hairStyleOptions.find((o) => o.value === character.hair) || hairStyleOptions[0];
  const shirt = shirtOptions.find((o) => o.value === character.shirt) || shirtOptions[0];
  const pants = pantsOptions.find((o) => o.value === character.pants) || pantsOptions[0];
  const shoes = shoeOptions.find((o) => o.value === character.shoes) || shoeOptions[0];

  return {
    skinToneSrc: skin.asset,
    hairStyleSrc: hair.asset,
    hairTop: hair.top,
    hairWidth: hair.width,
    shirtSrc: shirt.asset,
    shirtTop: shirt.top,
    shirtWidth: shirt.width,
    pantsSrc: pants.asset,
    pantsTop: pants.top,
    pantsWidth: pants.width,
    shoeSrc: shoes.asset,
    shoeTop: shoes.top,
    shoeWidth: shoes.width,
  };
}

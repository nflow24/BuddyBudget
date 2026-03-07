import React from 'react';
import './CharacterCanvas.css';
import Face from '../assets/character/face.png';

const CharacterCanvas = ({
  skinToneSrc,
  hairStyleSrc,
  hairTop,
  hairWidth,
  shirtSrc,
  shirtTop,
  shirtWidth,
  pantsSrc,
  pantsTop,
  pantsWidth,
  shoeSrc,
  shoeTop,
  shoeWidth
}) => {
  return (
    <div className="character-canvas">

      {/* Face */}
      <img
        src={Face}
        alt="Character Face"
        className="character-face"
      />

      {/* Base body */}
      {skinToneSrc && (
        <img
          src={skinToneSrc}
          alt="Character Body"
          className="character-body"
        />
      )}


      {/* Pants layer */}
      {pantsSrc && (
        <img
          src={pantsSrc}
          alt="Character Pants"
          className="character-pants"
          style={{
            ...(pantsTop !== undefined && { top: `${pantsTop}px` }),
            ...(pantsWidth !== undefined && { maxWidth: `${pantsWidth}px` })
          }}
        />
      )}

      {/* Shoes layer */}
      {shoeSrc && (
        <img
          src={shoeSrc}
          alt="Character Shoes"
          className="character-shoes"
          style={{
            ...(shoeTop !== undefined && { top: `${shoeTop}px` }),
            ...(shoeWidth !== undefined && { maxWidth: `${shoeWidth}px` }),
          }}
        />
      )}

      {/* Shirt layer */}
      {shirtSrc && (
        <img
          src={shirtSrc}
          alt="Character Shirt"
          className="character-shirt"
          style={{
            ...(shirtTop !== undefined && { top: `${shirtTop}px` }),
            ...(shirtWidth !== undefined && { maxWidth: `${shirtWidth}px` })
          }}
        />
      )}

      {/* Hair layer */}
      {hairStyleSrc && (
        <img
          src={hairStyleSrc}
          alt="Character Hair"
          className="character-hair"
          style={{
            ...(hairTop !== undefined && { top: `${hairTop}px` }),
            ...(hairWidth !== undefined && { maxWidth: `${hairWidth}px` })
          }}
        />
      )}
    </div>
  );
};

export default CharacterCanvas;
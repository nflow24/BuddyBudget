import React from 'react';
import './CharacterCanvas.css';

const CharacterCanvas = ({ skinToneSrc, hairStyleSrc, hairTop, hairWidth }) => {
  return (
    <div className="character-canvas">
      {/* Hair overlay — positioned at top of character */}
      {hairStyleSrc && (
        <img
          src={hairStyleSrc}
          alt="Character Hair"
          className="character-hair"
          style={{
            ...(hairTop !== undefined && { top: `${hairTop}px` }),
            ...(hairWidth !== undefined && { maxWidth: `${hairWidth}px` }),
          }}
        />
      )}
      {/* Base body */}
      {skinToneSrc && (
        <img
          src={skinToneSrc}
          alt="Character Body"
          className="character-body"
        />
      )}
    </div>
  );
};

export default CharacterCanvas;

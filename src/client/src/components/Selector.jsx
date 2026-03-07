import React from 'react';
import './Selector.css';

const Selector = ({ title, options, selectedValue, onSelect, type }) => {
  return (
    <div className="selector-group">
      <span className="selector-label">{title}</span>

      <div className="selector-options">
        {options.map((option, index) => {
          const isSelected = selectedValue === option.value;

          if (type === 'color') {
            return (
              <button
                key={index}
                className={`color-btn ${isSelected ? 'selected' : ''}`}
                style={{ backgroundColor: option.color }}
                onClick={() => onSelect(option.value)}
                aria-label={`Select ${option.label}`}
              />
            );
          }

          if (type === 'image') {
            return (
              <button
                key={index}
                className={`image-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelect(option.value)}
                aria-label={`Select ${option.label}`}
              >
                <img src={option.previewImg} alt={option.label} />
              </button>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default Selector;

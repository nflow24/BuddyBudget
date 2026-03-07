import React from 'react';

const Header = ({ username }) => {
  return (
    <header style={{
      width: '100%',
      padding: '24px 20px',
      display: 'flex',
      alignItems: 'flex-start',
      backgroundColor: 'var(--primary-green)',
    }}>
      <div style={{
        backgroundColor: '#008C41', // slightly darker green for the badge
        color: 'white',
        padding: '6px 12px',
        borderRadius: '6px',
        fontWeight: '600',
        fontSize: '14px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {username}
      </div>
    </header>
  );
};

export default Header;

// ResponsiveLayout.jsx
import React from 'react';

export default function ResponsiveLayout({ children }) {
  return (
    <div style={layoutStyle}>
      <div style={containerStyle}>
        {children}
      </div>
    </div>
  );
}

const layoutStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '1rem',
  minHeight: '100vh',
  backgroundColor: '#f8f9fa'
};

const containerStyle = {
  width: '100%',
  maxWidth: '600px',
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
};

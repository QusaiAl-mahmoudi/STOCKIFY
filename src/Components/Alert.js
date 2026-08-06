
import React from 'react';

function Alert({ message, bg }) {
  if (!message) return null;

  return (
    <div
      style={{
        display: 'block',
        padding: '10px',
        borderRadius: '8px',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: bg || '#ef4444',
        marginBottom: '15px'
      }}
    >
      {message}
    </div>
  );
}

export default Alert;


import React from 'react';

function PageHeader({ title, subtitle }) {
  return (
    <div className="head text-center mb-25">
      <h2 className="font-bold" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '5px' }}>
        {title}
      </h2>
      {subtitle && <p style={{ opacity: 0.7, fontSize: '1rem' }}>{subtitle}</p>}
    </div>
  );
}

export default PageHeader;

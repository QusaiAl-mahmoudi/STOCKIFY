import React from 'react';

function StatCard({ title, value, iconClass }) {
  return (
    <div className="stat-card">
      <div className="stat-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
      <i className={`${iconClass} stat-icon`}></i>
    </div>
  );
}

export default StatCard;



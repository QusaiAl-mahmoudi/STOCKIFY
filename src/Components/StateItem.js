import React from "react";

function StatItem({ value, label }) {
  return (
    <div className="stat-item">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

export default StatItem;

import React from "react";

function StateItem({ value, label }) {
  return (
    <div className="stat-item">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

export default StateItem;

import React from "react";

function Badge({ text, type = "default", style = {} }) {
  const getBgColor = () => {
    if (type === "danger") return "#ef4444";
    if (type === "warning") return "#f59e0b";
    return undefined;
  };

  const backgroundColor = getBgColor();

  return (
    <span
      className={`badge ${type !== "default" ? `badge-${type}` : ""}`}
      style={{
        padding: "4px 8px",
        borderRadius: "4px",
        color: backgroundColor ? "#fff" : undefined,
        backgroundColor: backgroundColor,
        fontSize: "0.85rem",
        ...style,
      }}
    >
      {text}
    </span>
  );
}

export default Badge;

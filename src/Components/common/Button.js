import React from "react";

function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  style = {},
  ...props
}) {
  // تحديد الفئة بناءً على نوع الزر
  const variantClass = variant === "danger" ? "btn-danger" : "";

  return (
    <button
      className={`btn ${variantClass} ${className}`.trim()}
      onClick={onClick}
      style={{ cursor: "pointer", ...style }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

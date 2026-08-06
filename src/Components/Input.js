import React from "react";

function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  readOnly = false,
  style = {},
  ...props
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      style={
        readOnly ? { opacity: 0.7, cursor: "not-allowed", ...style } : style
      }
      {...props}
    />
  );
}

export default Input;

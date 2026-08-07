import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// إضافة أيقونات Solid للمكتبة
library.add(fas);

function Icon({ name, className = "", style = {} }) {
  if (!name) return null;

  // تحويل الصيغ مثل "fas fa-box-open" أو "fa-box-open" إلى اسم الأيقونة فقط "box-open"
  const iconName = name.replace("fas", "").replace("fa-", "").trim();

  return (
    <FontAwesomeIcon
      icon={["fas", iconName]}
      className={className}
      style={style}
    />
  );
}

export default Icon;

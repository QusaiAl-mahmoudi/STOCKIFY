import React, { useState, useEffect } from "react";
import Icon from "./Icon";

function Navbar({ currentPage, setCurrentPage }) {
  const [isDark, setIsDark] = useState(() => {
    const savedMode = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return savedMode === "dark" || (!savedMode && prefersDark);
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prevMode) => !prevMode);
  };

  return (
    <header>
      <div className="header_container">
        <div className="logo">
          STOCKIFY
          <span>
            <Icon name="box-open" />
          </span>
        </div>

        <nav className="navbar">
          <button
            type="button"
            className={`nav_link ${currentPage === "home" ? "active" : ""}`}
            onClick={() => setCurrentPage("home")}
          >
            <Icon name="home" /> الرئيسي
          </button>

          <button
            type="button"
            className={`nav_link ${currentPage === "management" ? "active" : ""}`}
            onClick={() => setCurrentPage("management")}
          >
            <Icon name="tasks" /> الإدارة
          </button>

          <button
            type="button"
            className={`nav_link ${currentPage === "stores" ? "active" : ""}`}
            onClick={() => setCurrentPage("stores")}
          >
            <Icon name="warehouse" /> المخازن
          </button>

          <button
            type="button"
            className={`nav_link ${currentPage === "sales" ? "active" : ""}`}
            onClick={() => setCurrentPage("sales")}
          >
            <Icon name="chart-line" /> المبيعات
          </button>
        </nav>

        <div className="header_Action">
          <button
            id="dark-mode-toggle"
            className="dark-mode-btn"
            title="تغيير المظهر"
            onClick={toggleDarkMode}
          >
            <Icon name={isDark ? "sun" : "moon"} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

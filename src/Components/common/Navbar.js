import React, { useContext } from "react";
import Icon from "./Icon";
import { ThemeContext } from "../../context/ThemeContext";

function Navbar({ currentPage, setCurrentPage }) {
  const { isDark, toggleTheme } = useContext(ThemeContext);

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
            onClick={toggleTheme}
          >
            <Icon name={isDark ? "sun" : "moon"} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

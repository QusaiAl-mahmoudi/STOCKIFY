import React, { useState } from "react";
import "./Styles/main.css";
import StoresPage from "./pages/StoresPage";
import SalesPage from "./pages/SalesPage";
import ManagementPage from "./pages/ManagementPage";
import HomePage from "./pages/HomePage";
import Navbar from "./Components/common/Navbar";

import { ThemeProvider } from "./context/ThemeContext";
import { StockProvider } from "./context/StockContext";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <ThemeProvider>
      <StockProvider>
        <div className="app-container">
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

          <main className="main-content">
            {currentPage === "stores" && <StoresPage />}
            {currentPage === "sales" && <SalesPage />}
            {currentPage === "management" && <ManagementPage />}
            {currentPage === "home" && (
              <HomePage setCurrentPage={setCurrentPage} />
            )}
          </main>
        </div>
      </StockProvider>
    </ThemeProvider>
  );
}

export default App;

import React, { useState } from "react";
import "./style.css";
import StoresPage from "./pages/StoresPage";
import SalesPage from "./pages/SalesPage";
import ManagementPage from "./pages/ManagementPage.js";
import HomePage from "./pages/HomePage";
import Navbar from "./Components/Navbar";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  return (
    <div className="app-container">
      {/*    
      <Router>
      
        <Routes>
           <Route path="/" element={<HomePage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/management" element={<ManagementPage />} />
        
        </Routes>
       
      </Router> */}

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="main-content">
        {currentPage === "stores" && <StoresPage />}
        {currentPage === "sales" && <SalesPage />}
        {currentPage === "management" && <ManagementPage />}
        {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
      </main>
    </div>
  );
}

export default App;

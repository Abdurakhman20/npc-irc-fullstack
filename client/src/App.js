import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Tables from "./pages/Tables";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const openSidebarHandler = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="grid-container">
      <Header openSidebar={openSidebarHandler} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSidebar={openSidebarHandler}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/tables" element={<Tables />} />
      </Routes>
    </div>
  );
}

export default App;

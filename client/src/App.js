import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

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
      <Main />
    </div>
  );
}

export default App;

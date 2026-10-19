import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Flights from "./pages/Flights";
import Aircraft from "./pages/Aircraft";
import Disruptions from "./pages/Disruptions";
import Reallocation from "./pages/Reallocation";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Flights":
        return <Flights />;

      case "Aircraft":
        return <Aircraft />;

      case "Disruptions":
        return <Disruptions />;

      case "Reallocation":
        return <Reallocation />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main-area">
        <Navbar activePage={activePage} />

        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
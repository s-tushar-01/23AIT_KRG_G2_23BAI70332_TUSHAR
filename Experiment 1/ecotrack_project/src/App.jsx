import React from "react";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";

const App = () => {
  return (
    <div>
      <Header title="EcoTrack – Environmental Impact Tracker" />
      <main className="app-container">
        <Dashboard />
        <Logs />
      </main>
    </div>
  );
};

export default App;

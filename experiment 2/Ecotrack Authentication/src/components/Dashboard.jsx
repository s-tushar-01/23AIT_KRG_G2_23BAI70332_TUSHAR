import React from "react";
import logs from "../data/logs";
import "./style.css";

const Dashboard = () => {
  const total = logs.reduce((s,l)=>s+l.carbon,0);
  const high = logs.filter(l=>l.carbon>4);
  const low = logs.filter(l=>l.carbon<4);

  return (
    <div className="app">
      <header className="header">
        EcoTrack – Environmental Impact Tracker
      </header>

      <div className="dashboard">
        <h1>Dashboard</h1>
        <p className="subtitle">Total Carbon Footprint</p>
        <div className="total">{total} kg</div>

        <div className="grid">
          <div className="card">
            <h3>All Activities</h3>
            {logs.map(l=>(
              <p key={l.id}>{l.activity} → {l.carbon} kg</p>
            ))}
          </div>

          <div className="card">
            <h3>High Carbon Emissions (&gt; 4 kg)</h3>
            {high.map(l=>(
              <p className="high" key={l.id}>{l.activity} → {l.carbon} kg</p>
            ))}
          </div>
        </div>

        <div className="card lowcard">
          <h3>Low Carbon (&lt; 4 kgs)</h3>
          {low.map(l=>(
            <p className="low" key={l.id}>{l.activity} → {l.carbon} kg</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

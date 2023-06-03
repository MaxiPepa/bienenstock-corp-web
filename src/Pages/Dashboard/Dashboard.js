import { Activity } from "Components";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="area-header">
        <h2 className="area-title">Dashboard</h2>
      </div>
      <hr className="division-horizontal-hr" />
      <div className="dashboard-container">
        <div className="dashboard-cards">
          <div className="dashboard-card"></div>
        </div>
        <Activity />
      </div>
    </>
  );
};

export default Dashboard;

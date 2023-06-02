import { useContext, useEffect, useState } from "react";

import { APIContext } from "../../Assets/Contexts";

import "./Dashboard.css";

const Dashboard = () => {
  const { get } = useContext(APIContext);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    get("log/getLogs").then((data) => {
      console.log(data);
      setLogs(data);
    });
  }, [get]);

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
        <div className="activities-container"></div>
      </div>
    </>
  );
};

export default Dashboard;

import React from "react";
import { useState } from "react";

import Sidebar from "../../Components/Sidebar/Sidebar";
import Main from "../../Components/Main/Main";

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="dashboard">
      <Sidebar isVisible={isVisible} />
      <Main isVisible={isVisible} setIsVisible={setIsVisible} />
    </div>
  );
};

export default Dashboard;

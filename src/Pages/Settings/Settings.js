import React from "react";

import "./Settings.css";

const Settings = () => {
  return (
    <div>
      <h2 className="area-title">Settings</h2>
      <div className="basic-details-container">
        <h3>Basic information</h3>
        <div className="basic-details">
          <div className="basic-details-img">
            <button>change me!</button>
          </div>
          <div className="basic-details-inputs-container">
            <div className="basic-details-input">
              <label>Full Name</label>
              <input type="text" />
            </div>
            <div className="basic-details-input">
              <label>Email Adress</label>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

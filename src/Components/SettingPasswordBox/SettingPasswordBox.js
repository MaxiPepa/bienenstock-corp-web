import { useState } from "react";

import "./SettingPasswordBox.css";
import icons from "../../Assets/Icons";

const SettingPasswordBox = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <div className="settings-container">
        <h3 className="area-subtitle">Password Settings</h3>
        <div className="password-settings">
          <div className="input-content">
            <label>Insert Current Password</label>
            <input
              className="input"
              type="text"
              placeholder="**********"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="input-content">
            <label>Insert New Password</label>
            <input
              className="input"
              type="text"
              placeholder="**********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="input-content">
            <label>Confirm Password</label>
            <input
              className="input"
              type="text"
              placeholder="**********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="button-content">
          <button type="button" className="modal-button-add">
            {<icons.ChangeCircleIcon />}
            <span>Change Password</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingPasswordBox;

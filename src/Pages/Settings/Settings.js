import components from "../../Assets/Components";

import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-area">
      <h2 className="area-title">Settings</h2>
      <hr className="division-horizontal-hr" />
      <div className="general-settings-container">
        <components.SettingInfoBox />
        <components.SettingPasswordBox />
      </div>
    </div>
  );
};

export default Settings;

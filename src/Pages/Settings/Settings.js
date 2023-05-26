import { SettingInfoBox, SettingPasswordBox } from "../../Assets/Components";

import "./Settings.css";

const Settings = () => {
  return (
    <div className="area-container">
      <h2 className="area-title">Settings</h2>
      <hr className="division-horizontal-hr" />
      <div className="general-settings-container">
        <SettingInfoBox />
        <SettingPasswordBox />
      </div>
    </div>
  );
};

export default Settings;

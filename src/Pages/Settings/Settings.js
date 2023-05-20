import SettingInfoBox from "../../Components/SettingInfoBox/SettingInfoBox";
import SettingPasswordBox from "../../Components/SettingPasswordBox/SettingPasswordBox";

import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-area">
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

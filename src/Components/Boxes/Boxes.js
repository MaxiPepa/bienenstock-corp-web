import { useContext } from "react";
import { NAVIGATIONSLINKS } from "Assets/Constants";

import BoxItem from "./BoxItem/BoxItem";
import { UserContext } from "Contexts";
import { BackupTableRoundedIcon, BuildRoundedIcon } from "Assets/Icons";

import "./Boxes.css";

const Boxes = () => {
  const { userData } = useContext(UserContext);
  return (
    <div className="dashboard-boxes">
      <div className="boxes-container">
        <BoxItem
          quantity="10"
          title="Total Products"
          icon={<BackupTableRoundedIcon />}
          color={"#d94233"}
          navigation={"/dashboard/products"}
        />
        {NAVIGATIONSLINKS.map((box, index) => {
          return box.roles.includes(userData.userType) ? (
            <BoxItem
              key={index}
              quantity="10"
              title={box.dashboardItemName}
              icon={box.icon}
              color={box.color}
              navigation={box.navigation}
            />
          ) : null;
        })}
        <BoxItem
          title="Settings"
          icon={<BuildRoundedIcon />}
          color={"#515151"}
          navigation={"/settings"}
        />
      </div>
    </div>
  );
};

export default Boxes;

import { NAVIGATIONSLINKS } from "Assets/Constants";

import BoxItem from "./BoxItem/BoxItem";
import {
  BackupTableRoundedIcon,
  ShoppingCartRoundedIcon,
  BuildRoundedIcon,
} from "Assets/Icons";

import "./Boxes.css";

const Boxes = () => {
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
        {NAVIGATIONSLINKS.map((item, index) => {
          return (
            <BoxItem
              key={index}
              quantity="10"
              title={item.dashboardItemName}
              icon={item.icon}
              color={item.color}
              navigation={item.navigation}
            />
          );
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

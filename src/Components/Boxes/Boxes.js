import { useContext, useState, useEffect } from "react";
import { NAVIGATIONSLINKS, ROLES } from "Assets/Constants";

import BoxItem from "./BoxItem/BoxItem";
import { UserContext, APIContext } from "Contexts";
import { BackupTableRoundedIcon, BuildRoundedIcon } from "Assets/Icons";

import "./Boxes.css";

const Boxes = () => {
  const { userData } = useContext(UserContext);
  const { get } = useContext(APIContext);

  const [companyStats, setCompanyStats] = useState({});

  useEffect(() => {
    get("report/getCompanyStats").then((data) => {
      setCompanyStats(data);
    });
  }, [get]);

  const getQuantity = (roles) => {
    switch (roles[0]) {
      case ROLES.ADMIN:
        return companyStats.totalUsers;
      case ROLES.BUYER:
        return companyStats.totalPurchases;
      case ROLES.SELLER:
        return companyStats.totalSales;
      case ROLES.DEPOSITOR:
        return companyStats.totalPendingProducts;
      case ROLES.ANALYST:
        return companyStats.totalReports;
      default:
        return 0;
    }
  };

  return (
    <div className="dashboard-boxes">
      <div className="boxes-container">
        <BoxItem
          quantity={companyStats.totalProducts}
          title="Total Products"
          icon={<BackupTableRoundedIcon />}
          color={"#d94233"}
          navigation={"/dashboard/products"}
        />
        {NAVIGATIONSLINKS.map((box, index) => {
          return box.roles.includes(userData.userType) ? (
            <BoxItem
              key={index}
              quantity={getQuantity(box.roles)}
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

import icons from "./Icons";

export let USER = {
  name: "Gaston Garnero",
  email: "gastongarnero@gmail.com",
  role: "Seller",
  bool: false,
};

export const NAVLINKS = [
  {
    roles: "All",
    navigation: "/dashboard",
    aditionalFunction: "hideSidebar",
    icon: <icons.DashboardIcon />,
    navItemName: "Dashboard",
  },
  {
    roles: "All",
    navigation: "/dashboard/products",
    aditionalFunction: "hideSidebar",
    icon: <icons.BackupTableRoundedIcon />,
    navItemName: "Products",
  },
  {
    roles: "Buyer",
    navigation: "/dashboard/purchansing-area",
    aditionalFunction: "hideSidebar",
    icon: <icons.ShoppingCartRoundedIcon />,
    navItemName: "Purchansing",
  },
  {
    roles: "Seller",
    navigation: "/dashboard/sales-area",
    aditionalFunction: "hideSidebar",
    icon: <icons.ReceiptRoundedIcon />,
    navItemName: "Sales",
  },
  {
    roles: "Depositor",
    navigation: "/dashboard/storage-area",
    aditionalFunction: "hideSidebar",
    icon: <icons.ArchiveRoundedIcon />,
    navItemName: "Storage",
  },
  {
    roles: "Analyst",
    navigation: "/dashboard/reports-area",
    aditionalFunction: "hideSidebar",
    icon: <icons.LeaderboardRoundedIcon />,
    navItemName: "Reports",
  },
  {
    roles: "All",
    navigation: "/settings",
    aditionalFunction: "hideSidebar",
    icon: <icons.BuildRoundedIcon />,
    navItemName: "Settings",
  },
  {
    roles: "All",
    navigation: "/login",
    aditionalFunction: "hideSidebar",
    icon: <icons.ExitToAppIcon />,
    navItemName: "Logout",
  },
];

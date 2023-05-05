import icons from "./Icons";

export const ROLES = {
  ADMIN: "Admin",
  BUYER: "Buyer",
  SELLER: "Seller",
  DEPOSITOR: "Depositor",
  ANALYST: "Analyst",
};

export const USER = {
  name: "Gaston Garnero",
  email: "gastongarnero@gmail.com",
  role: ROLES.BUYER,
  bool: true,
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
    roles: ROLES.BUYER,
    navigation: "/dashboard/purchases-area",
    aditionalFunction: "hideSidebar",
    icon: <icons.ShoppingCartRoundedIcon />,
    navItemName: "Purchases",
  },
  {
    roles: ROLES.SELLER,
    navigation: "/dashboard/sales-area",
    aditionalFunction: "hideSidebar",
    icon: <icons.ReceiptRoundedIcon />,
    navItemName: "Sales",
  },
  {
    roles: ROLES.DEPOSITOR,
    navigation: "/dashboard/storage-area",
    aditionalFunction: "hideSidebar",
    icon: <icons.ArchiveRoundedIcon />,
    navItemName: "Storage",
  },
  {
    roles: ROLES.ANALYST,
    navigation: "/dashboard/reports-area",
    aditionalFunction: "hideSidebar",
    icon: <icons.LeaderboardRoundedIcon />,
    navItemName: "Reports",
  },
  {
    roles: ROLES.ADMIN,
    navigation: "/admin-menu",
    aditionalFunction: "hideSidebar",
    icon: <icons.GroupIcon />,
    navItemName: "Admin Menu",
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

export const APIURL = {
  local: "https://localhost:7040/",
};

export const THEADUSER = [
  "ProductId",
  "Name",
  "Description",
  "Price",
  "ExpirationDate",
  "EnterDate",
  "Quantity",
];

export const THEADPRODUCTS = [
  "UserId",
  "Name",
  "LastName",
  "Email",
  "UserType",
];

export const THEADPURCHASESHISTORY = [
  "Comprador",
  "Producto",
  "Cantidad",
  "Precio",
  "Fecha de compra",
  "Proveedor",
  "Estado de ingreso",
];

export const TBODYPURCHASEHISTORYPROVISIONAL = [
  {
    Name: "Gaston Garnero",
    Product: "Coca Cola",
    Quantity: "200",
    Price: "100",
    Date: "29/12/2020",
    Provider: "Coca Cola Companie",
    Status: "Pendiente",
  },
  {
    Name: "Lucas Mule",
    Product: "Laptop Gamer",
    Quantity: "30",
    Price: "700",
    Date: "15/12/2020",
    Provider: "CompraGamer",
    Status: "Pendiente",
  },
  {
    Name: "Gaston Garnero",
    Product: "Zapatillas re chetas",
    Quantity: "50",
    Price: "70",
    Date: "08/12/2020",
    Provider: "Nike",
    Status: "Pendiente",
  },
  {
    Name: "Lucas Mule",
    Product: "Coca Cola",
    Quantity: "200",
    Price: "100",
    Date: "29/12/2020",
    Provider: "Coca Cola Companie",
    Status: "Pendiente",
  },
  {
    Name: "Gaston Garnero",
    Product: "Coca Cola",
    Quantity: "200",
    Price: "100",
    Date: "29/12/2020",
    Provider: "Coca Cola Companie",
    Status: "Pendiente",
  },
  {
    Name: "Lucas Mule",
    Product: "Laptop Gamer",
    Quantity: "30",
    Price: "700",
    Date: "15/12/2020",
    Provider: "CompraGamer",
    Status: "Pendiente",
  },
  {
    Name: "Gaston Garnero",
    Product: "Zapatillas re chetas",
    Quantity: "50",
    Price: "70",
    Date: "08/12/2020",
    Provider: "Nike",
    Status: "Pendiente",
  },
  {
    Name: "Lucas Mule",
    Product: "Coca Cola",
    Quantity: "200",
    Price: "100",
    Date: "29/12/2020",
    Provider: "Coca Cola Companie",
    Status: "Pendiente",
  },
];

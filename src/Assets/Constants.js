import icons from "./Icons";

export const ROLES = {
  ADMIN: "Admin",
  BUYER: "Buyer",
  SELLER: "Seller",
  DEPOSITOR: "Depositor",
  ANALYST: "Analyst",
};

export const NAVLINKS = [
  {
    roles: [ROLES.BUYER, ROLES.ADMIN],
    navigation: "/dashboard/purchases-area",
    icon: <icons.ShoppingCartRoundedIcon />,
    navItemName: "Purchases",
  },
  {
    roles: [ROLES.SELLER, ROLES.ADMIN],
    navigation: "/dashboard/sales-area",
    icon: <icons.ReceiptRoundedIcon />,
    navItemName: "Sales",
  },
  {
    roles: [ROLES.DEPOSITOR, ROLES.ADMIN],
    navigation: "/dashboard/storage-area",
    icon: <icons.ArchiveRoundedIcon />,
    navItemName: "Storage",
  },
  {
    roles: [ROLES.ANALYST, ROLES.ADMIN],
    navigation: "/dashboard/reports-area",
    icon: <icons.LeaderboardRoundedIcon />,
    navItemName: "Reports",
  },
  {
    roles: [ROLES.ADMIN],
    navigation: "/admin-menu",
    icon: <icons.GroupIcon />,
    navItemName: "Admin Menu",
  },
];

export const APIURL = {
  local: "https://localhost:7040/",
};

export const COOKIENAME = {
  session: "bienenstockSessionToken",
};

export const THEADPRODUCTS = [
  "ProductId",
  "Name",
  "Description",
  "Price",
  "ExpirationDate",
  "EnterDate",
  "Quantity",
];

export const THEADUSER = ["Full Name", "Email", "UserType"];

export const THEADPURCHASESHISTORY = [
  "PurchaseId",
  "Buyer",
  "Supplier",
  "Total Price",
  "Purchase date",
  "Income status",
  "Details",
];

export const TBODYPURCHASEHISTORY = [
  {
    id: "#00465",
    Name: "Gaston Garnero",
    Supplier: "Coca Cola company",
    TotalPrice: "1000",
    Date: "29/11/2020",
    Status: "Pending",
  },
  {
    id: "#00266",
    Name: "Lucas Mule",
    Supplier: "Nike",
    TotalPrice: "600",
    Date: "15/11/2020",
    Status: "Pending",
  },
  {
    id: "#00698",
    Name: "Gaston Garnero",
    Supplier: "CompraGamer",
    TotalPrice: "150000",
    Date: "07/11/2020",
    Status: "Delivered",
  },
  {
    id: "#00247",
    Name: "Maxi Bortoli",
    Supplier: "Toyota",
    TotalPrice: "15000",
    Date: "27/10/2020",
    Status: "Pending",
  },
  {
    id: "#00783",
    Name: "Gaston Garnero",
    Supplier: "Adidas",
    TotalPrice: "1000",
    Date: "23/10/2020",
    Status: "Delivered",
  },
];

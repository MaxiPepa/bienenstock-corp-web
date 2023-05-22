import {
  ShoppingCartRoundedIcon,
  ReceiptRoundedIcon,
  ArchiveRoundedIcon,
  LeaderboardRoundedIcon,
  GroupIcon,
} from "./Icons";

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
    icon: <ShoppingCartRoundedIcon />,
    navItemName: "Purchases",
  },
  {
    roles: [ROLES.SELLER, ROLES.ADMIN],
    navigation: "/dashboard/sales-area",
    icon: <ReceiptRoundedIcon />,
    navItemName: "Sales",
  },
  {
    roles: [ROLES.DEPOSITOR, ROLES.ADMIN],
    navigation: "/dashboard/storage-area",
    icon: <ArchiveRoundedIcon />,
    navItemName: "Storage",
  },
  {
    roles: [ROLES.ANALYST, ROLES.ADMIN],
    navigation: "/dashboard/reports-area",
    icon: <LeaderboardRoundedIcon />,
    navItemName: "Reports",
  },
  {
    roles: [ROLES.ADMIN],
    navigation: "/admin-menu",
    icon: <GroupIcon />,
    navItemName: "Admin Menu",
  },
];

export const APIURL = {
  local: "https://localhost:7040/",
};

export const COOKIENAME = {
  session: "bienenstockSessionToken",
};

export const EMAILREGEX = /\S+@\S+\.\S+/;

export const PASSWORDREGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/;

export const arrayPurchaseProductInputs = [
  {
    labelName: "Product code: ",
    styles: "input toUppercase",
    type: "text",
    maxLength: 10,
    placeholder: "XXXXXXXXXX",
    formData: "productCode",
  },
  {
    labelName: "Product name: ",
    styles: "input",
    type: "text",
    maxLength: 50,
    placeholder: "Laptop, tablet, phone...",
    formData: "name",
  },
  {
    labelName: "Product Quantity: ",
    styles: "input",
    type: "number",
    min: 1,
    placeholder: "XXX",
    formData: "quantity",
  },
  {
    labelName: "Product unit price: ",
    styles: "input",
    type: "number",
    step: 0.01,
    min: 0.01,
    placeholder: "$X.XXX,XX",
    formData: "unitPrice",
  },
];

export const arrayPurchaseAditionalInputs = [
  {
    labelName: "Supplier: ",
    styles: "input",
    type: "text",
    maxLength: 100,
    placeholder: "Fravega, Musimundo, Garbarino...",
    formData: "supplier",
  },
  {
    labelName: "Purchase date: ",
    styles: "input",
    type: "datetime-local",
    placeholder: "dd/mm/aaaa",
    formData: "purchaseDate",
  },
];

export const arrayPasswordInputs = [
  {
    labelName: "Current password: ",
    styles: "input",
    type: "password",
    placeholder: "********",
    formData: "password",
  },
  {
    labelName: "New password: ",
    styles: "input",
    type: "password",
    placeholder: "********",
    formData: "newPassword",
  },
  {
    labelName: "Confirm new password: ",
    styles: "input",
    type: "password",
    placeholder: "********",
    formData: "confirmPassword",
  },
];

export const arrayUsersInputs = [
  {
    labelName: "Name: ",
    styles: "input",
    type: "text",
    placeholder: "John",
    formData: "name",
  },
  {
    labelName: "Last name: ",
    styles: "input",
    type: "text",
    placeholder: "Doe",
    formData: "lastName",
  },
  {
    labelName: "Email: ",
    styles: "input",
    type: "email",
    placeholder: "Example@Xmail.com",
    formData: "email",
  },
  {
    labelName: "Password: ",
    styles: "input",
    type: "password",
    placeholder: "********",
    formData: "password",
  },
];

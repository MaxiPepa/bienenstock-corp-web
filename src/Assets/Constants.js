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
  ALL: ["Admin", "Buyer", "Seller", "Depositor", "Analyst"],
};

export const NAVIGATIONSLINKS = [
  {
    roles: [ROLES.ADMIN],
    navigation: "/admin-menu",
    icon: <GroupIcon />,
    navItemName: "Admin Menu",
    dashboardItemName: "Total Users",
    color: "#aa33d9",
  },
  {
    roles: [ROLES.BUYER, ROLES.ADMIN],
    navigation: "/purchases-area",
    icon: <ShoppingCartRoundedIcon />,
    navItemName: "Purchases",
    dashboardItemName: "Completed Purchases",
    color: "#00b8e9",
  },
  {
    roles: [ROLES.SELLER, ROLES.ADMIN],
    navigation: "/sales-area",
    icon: <ReceiptRoundedIcon />,
    navItemName: "Sales",
    dashboardItemName: "Completed Sales",
    color: "#019c52",
  },
  {
    roles: [ROLES.DEPOSITOR, ROLES.ADMIN],
    navigation: "/storage-area",
    icon: <ArchiveRoundedIcon />,
    navItemName: "Storage",
    dashboardItemName: "Pending Transactions",
    color: "#f0911a",
  },
  {
    roles: [ROLES.ANALYST, ROLES.ADMIN],
    navigation: "/reports-area",
    icon: <LeaderboardRoundedIcon />,
    navItemName: "Reports",
    dashboardItemName: "Total Reports",
    color: "#0064e9",
  },
];

export const APIURL = {
  local: "https://localhost:7040/",
};

export const EMAILREGEX = /\S+@\S+\.\S+/;

export const PASSWORDREGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/;

export const arrayPurchaseProductInputs = [
  {
    labelName: "Product code: ",
    styles: "input toUppercase",
    type: "text",
    maxLength: "10",
    placeholder: "XXXXXXXXXX",
    formData: "productCode",
  },
  {
    labelName: "Product name: ",
    styles: "input",
    type: "text",
    maxLength: "50",
    placeholder: "Laptop, tablet, phone...",
    formData: "name",
  },
  {
    labelName: "Product Quantity: ",
    styles: "input",
    type: "number",
    step: "1",
    min: "1",
    placeholder: "XXX",
    formData: "quantity",
  },
  {
    labelName: "Product unit price: ",
    styles: "input",
    type: "number",
    step: "0.01",
    min: "0.01",
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
    formData: "sectionDate",
  },
];

export const arraySaleAditionalInputs = [
  {
    labelName: "Sale date: ",
    styles: "input",
    type: "datetime-local",
    placeholder: "dd/mm/aaaa",
    formData: "saleDate",
  },
  {
    labelName: "Business Name: ",
    styles: "input",
    type: "text",
    placeholder: "John Doe",
    formData: "businessName",
  },
  {
    labelName: "Address: ",
    styles: "input",
    type: "text",
    placeholder: "Wall Street 123",
    formData: "address",
  },
  {
    labelName: "Identifier: ",
    styles: "input",
    type: "number",
    placeholder: "99.999.999",
    formData: "identifier",
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
    maxLength: 50,
    placeholder: "John",
    formData: "name",
  },
  {
    labelName: "Last name: ",
    styles: "input",
    type: "text",
    maxLength: 50,
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

export const arrayModifyUsersInputs = [
  {
    labelName: "Name: ",
    styles: "input",
    type: "text",
    maxLength: 50,
    placeholder: "John",
    formData: "name",
  },
  {
    labelName: "Last name: ",
    styles: "input",
    type: "text",
    maxLength: 50,
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
];

export const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "2px solid black" : "1px solid black",
    boxShadow: "none",
    "&:hover": {
      border: state.isFocused ? "2px solid black" : "1px solid black",
    },
    fontSize: "1rem",
    fontWeight: 600,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "black",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: "black",
    width: state.isFocused || state.isOpen ? "2px" : "1px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "#141414",
    backgroundColor: state.isSelected ? "gray" : "white",
    "&:hover": {
      backgroundColor: "#141414",
      color: "white",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
    fontSize: "1rem",
    fontWeight: 600,
  }),
};

export const paymentTypeTranslator = (type) => {
  switch (type) {
    case "cash":
      return "Efectivo";
    case "creditCard":
      return "Tarjeta de Crédito";
    case "currentAccount":
      return "Cuenta Corriente";
    case "paycheck":
      return "Cheque";
    default:
      break;
  }
};

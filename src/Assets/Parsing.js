import { ROLES } from "../Assets/Constants";

import { Button } from "./Components";
import {
  VisibilityIcon,
  RemoveShoppingCartRoundedIcon,
  CheckCircleOutlineRoundedIcon,
} from "./Icons";

export const parsingDate = (isoString) => {
  const date = new Date(isoString);

  const dd = date.getDate().toString().padStart(2, "0");
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const yy = date.getFullYear().toString();
  const hs = date.getHours().toString().padStart(2, "0");
  const ms = date.getMinutes().toString().padStart(2, "0");

  const formatedDate = `${dd}/${mm}/${yy} ${hs}:${ms}`;
  return formatedDate;
};

export const parsingEachFirstLetterToUppercase = (string) => {
  const stringSplitted = string.split(" ");
  const stringSplittedUppercase = stringSplitted.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  const stringJoined = stringSplittedUppercase.join(" ");
  return stringJoined;
};

export const purchaseHistoryTableContent = (
  purchaseHistory,
  openPurchaseHistoryCartModal,
  userData
) => {
  return purchaseHistory.map((item, index) => {
    const { products, ...newObj } = item;

    return {
      ...newObj,
      Details: (
        <Button
          styles={"table-buttons details-icon"}
          buttonFunction={() => {
            openPurchaseHistoryCartModal(index);
          }}
          buttonIcon={<VisibilityIcon />}
        />
      ),
      Cancel:
        item.pending === "Pending" && userData.userType === ROLES.BUYER ? (
          <Button
            styles={"table-buttons cancel-icon"}
            buttonFunction={() => {
              console.log("cancel purchase ", index);
            }}
            buttonIcon={<RemoveShoppingCartRoundedIcon />}
          />
        ) : null,
    };
  });
};

export const purchaseEntryTableContent = (
  pendingEntry,
  confirmEntryProduct,
  userData
) => {
  return pendingEntry.map((item, index) => {
    const { products, pending, ...newObj } = item;

    return {
      ...newObj,
      Details:
        userData.userType === ROLES.DEPOSITOR ? (
          <Button
            styles={"entry-product-button"}
            buttonFunction={() => {
              confirmEntryProduct(index);
            }}
            buttonIcon={<CheckCircleOutlineRoundedIcon />}
          />
        ) : null,
    };
  });
};

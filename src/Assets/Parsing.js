import icons from "./Icons";
import components from "./Components";

export const parsingDate = (isoString) => {
  const fecha = new Date(isoString);

  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const año = fecha.getFullYear().toString();
  const horas = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");

  const fechaFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}`;
  return fechaFormateada;
};

export const purchaseHistoryTableContent = (
  purchaseHistory,
  openPurchaseHistoryCartModal,
  userData,
  ROLES
) => {
  return purchaseHistory.map((item, index) => {
    const { products, ...newObj } = item;

    return {
      ...newObj,
      Details: (
        <components.Button
          styles={"table-buttons details-icon"}
          buttonFunction={() => {
            openPurchaseHistoryCartModal(index);
          }}
          buttonIcon={<icons.VisibilityIcon />}
        />
      ),
      Cancel:
        item.pending === "Pending" && userData.userType === ROLES.BUYER ? (
          <components.Button
            styles={"table-buttons cancel-icon"}
            buttonFunction={() => {
              console.log("cancel purchase ", index);
            }}
            buttonIcon={<icons.RemoveShoppingCartRoundedIcon />}
          />
        ) : null,
    };
  });
};

export const parsingEachFirstLetterToUppercase = (string) => {
  const stringSplitted = string.split(" ");
  const stringSplittedUppercase = stringSplitted.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  const stringJoined = stringSplittedUppercase.join(" ");
  return stringJoined;
};

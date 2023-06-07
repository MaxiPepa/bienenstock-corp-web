import { useContext } from "react";
import { ROLES } from "Assets/Constants";

import { Button, ExpirationInput } from "Components";
import { StatesContext } from "Contexts";
import { CheckCircleOutlineRoundedIcon } from "Assets/Icons";

const ConfirmPurchaseButton = ({
  setProductsById,
  products,
  register,
  setCurrentPurchaseId,
  resetField,
  role,
}) => {
  const { setShowModal } = useContext(StatesContext);

  const confirmEntryProduct = () => {
    setProductsById(
      products.map((p) => ({
        productId: p.productId,
        productCode: "#" + p.productCode,
        name: p.name,
        quantity: p.quantity,
        unitPrice: "$" + p.unitPrice,
        expiration: role === ROLES.DEPOSITOR && (
          <ExpirationInput
            register={register}
            expirationKey={p.productId.toString()}
            resetField={resetField}
          />
        ),
      }))
    );
    setShowModal(true);
    setCurrentPurchaseId();
  };

  return (
    <>
      <Button
        styles={
          role === ROLES.BUYER
            ? "table-button-style confirm-style"
            : "table-button-style info-style"
        }
        buttonFunction={confirmEntryProduct}
        buttonIcon={<CheckCircleOutlineRoundedIcon />}
      />
    </>
  );
};

export default ConfirmPurchaseButton;

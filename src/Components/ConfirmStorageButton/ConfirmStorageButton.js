import { useContext } from "react";
import { ROLES } from "Assets/Constants";

import { Button, ExpirationInput } from "Components";
import { StatesContext } from "Contexts";
import { CheckCircleOutlineRoundedIcon, VisibilityIcon } from "Assets/Icons";

const ConfirmStorageButton = ({
  setProductsById,
  products,
  register,
  setCurrentId,
  setCurrentDate,
  resetField,
  role,
  showExpiration,
  setSectionModal,
}) => {
  const { setShowModal } = useContext(StatesContext);

  const confirmStorageProduct = () => {
    setProductsById(
      products.map((p) => ({
        expiration: role === ROLES.DEPOSITOR && showExpiration && (
          <ExpirationInput
            register={register}
            expirationKey={p.productId.toString()}
            resetField={resetField}
          />
        ),
        productId: p.productId,
        productCode: "#" + p.productCode,
        name: p.name,
        quantity: p.quantity,
        unitPrice: "$" + p.unitPrice,
      }))
    );
    setShowModal(true);
    setSectionModal(true);
    setCurrentId();
    setCurrentDate();
  };

  return (
    <>
      <Button
        styles={
          role === ROLES.DEPOSITOR
            ? "table-button-style confirm-style"
            : "table-button-style info-style"
        }
        buttonFunction={confirmStorageProduct}
        buttonIcon={
          role === ROLES.DEPOSITOR ? (
            <CheckCircleOutlineRoundedIcon />
          ) : (
            <VisibilityIcon />
          )
        }
      />
    </>
  );
};

export default ConfirmStorageButton;

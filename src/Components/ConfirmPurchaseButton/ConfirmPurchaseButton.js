import { useContext } from "react";

import { Button, ExpirationInput } from "../../Assets/Components";
import { StatesContext } from "../../Assets/Contexts";
import { CheckCircleOutlineRoundedIcon } from "../../Assets/Icons";

const ConfirmPurchaseButton = ({
  setCartByIndex,
  products,
  register,
  setCurrentPurchaseId,
  resetField,
}) => {
  const { setShowModal } = useContext(StatesContext);

  const confirmEntryProduct = () => {
    setCartByIndex(
      products.map((p) => ({
        productId: p.productId,
        productCode: "#" + p.productCode,
        name: p.name,
        quantity: p.quantity,
        unitPrice: "$" + p.unitPrice,
        expiration: (
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
        styles={"entry-product-button"}
        buttonFunction={confirmEntryProduct}
        buttonIcon={<CheckCircleOutlineRoundedIcon />}
      />
    </>
  );
};

export default ConfirmPurchaseButton;

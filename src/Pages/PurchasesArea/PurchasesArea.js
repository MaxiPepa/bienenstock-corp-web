import { useContext } from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";

import {
  ROLES,
  THEADPURCHASESHISTORY,
  TBODYPURCHASEHISTORY,
} from "../../Assets/Constants";
import StatesContext from "../../Contexts/StatesContext";
import UserContext from "../../Contexts/UserContext";
import { usePurchaseInputs } from "../../Hooks/InputsLists/usePurchaseInputs";

import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import Input from "../../Components/Input/Input";
import Table from "../../Components/Tables/Table";

import icons from "../../Assets/Icons";
import "./PurchasesArea.css";

const PurchansingArea = () => {
  const { userData } = useContext(UserContext);
  useRedirect(userData.userType, ROLES.BUYER);

  const { setShowModal, showModal } = useContext(StatesContext);
  const {
    arrayPurchaseProductInputs,
    arrayPurchaseAditionalInputs,
    addToCartHandler,
    finishPurchaseHandler,
    cartList,
  } = usePurchaseInputs();

  const modalStatusHandler = () => {
    setShowModal(!showModal);
  };

  const updatedTBODYPURCHASEHISTORY = TBODYPURCHASEHISTORY.map((entry) => ({
    ...entry,
    Details: (
      <Button
        styles={"details-table-button"}
        buttonFunction={modalStatusHandler}
        buttonIcon={<icons.VisibilityIcon />}
      />
    ),
  }));

  return (
    <div className="purchase-area">
      <div className="purchase-header">
        <h2 className="area-title">Purchases Area</h2>
        {userData.userType === ROLES.BUYER ? (
          <Button
            styles="purchase-button"
            buttonFunction={modalStatusHandler}
            buttonIcon={<icons.AddRoundedIcon />}
            buttonText="New Purchase"
          />
        ) : null}
      </div>
      <hr className="division-horizontal-hr" />
      <h3 className="area-subtitle">Purchases History</h3>
      <Table
        content={updatedTBODYPURCHASEHISTORY}
        thead={THEADPURCHASESHISTORY}
      />
      <Modal modalTitle="New Purchase">
        <div className="left-content">
          <h3>Product</h3>
          <div className="inputs-content">
            {arrayPurchaseProductInputs.map((input, index) => (
              <Input
                key={index}
                labelName={input.labelName}
                styles={input.styles}
                type={input.type}
                step={input.step}
                min={input.min}
                max={input.max}
                placeholder={input.placeholder}
                value={input.value}
                inputFunction={input.inputFunction}
              />
            ))}
            <div className="button-content">
              <Button
                styles="modal-button-add"
                buttonFunction={addToCartHandler}
                buttonIcon={<icons.ShoppingCartRoundedIcon />}
                buttonText="Add to cart"
              />
            </div>
          </div>
        </div>
        <div className="right-content">
          <h3>Additional Information</h3>
          {arrayPurchaseAditionalInputs.map((input, index) => (
            <Input
              key={index}
              labelName={input.labelName}
              styles={input.styles}
              type={input.type}
              placeholder={input.placeholder}
              value={input.value}
              inputFunction={input.inputFunction}
            />
          ))}
          <div className="button-content">
            <Button
              styles="modal-button-add"
              buttonFunction={finishPurchaseHandler}
              buttonIcon={<icons.AddRoundedIcon />}
              buttonText="Finish Purchase"
            />
          </div>
        </div>
        {cartList.length === 0 ? null : (
          <>
            <hr className="division-horizontal-hr" />
            <div className="cart-content">
              <h3>Cart</h3>
              <div className="cart-table">
                {cartList.length === 0 ? (
                  <p>No se han cargado productos</p>
                ) : (
                  <Table
                    content={cartList}
                    thead={["Product", "Quantity", "Price"]}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default PurchansingArea;

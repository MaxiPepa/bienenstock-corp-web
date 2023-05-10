import { useContext } from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import {
  ROLES,
  THEADPURCHASESHISTORY,
  TBODYPURCHASEHISTORY,
} from "../../Assets/Constants";
import StatesContext from "../../Contexts/StatesContext";
import UserContext from "../../Contexts/UserContext";

import Table from "../../Components/Tables/Table";
import Button from "../../Components/Button/Button";

import "./StorageArea.css";
import icons from "../../Assets/Icons";
import Modal from "../../Components/Modal/Modal";
import { useStoreInputs } from "../../Hooks/InputsLists/useStoreInputs";
import Input from "../../Components/Input/Input";

const StorageArea = () => {
  const { userData } = useContext(UserContext);
  useRedirect(userData.userType, ROLES.DEPOSITOR);

  const { setShowModal, showExpiration, setShowExpiration } =
    useContext(StatesContext);

  const {
    arrayStorageInputs,
    addProductsHandler,
    inputProductName,
    setInputProductName,
    setInputProductQuantity,
    setInputProductPrice,
    expirationDate,
    setExpirationDate,
  } = useStoreInputs();

  const aceptProduct = (pendingProduct) => {
    setInputProductName(pendingProduct.Product);
    setInputProductQuantity(pendingProduct.Quantity);
    setInputProductPrice(pendingProduct.Price);
    setShowModal(true);
  };

  const updatedTBODYPURCHASEHISTORY = TBODYPURCHASEHISTORY.map((entry) => ({
    ...entry,
    Status: (
      <Button
        styles={"pending-table-button"}
        buttonFunction={() => aceptProduct(entry)}
        buttonIcon={<icons.TaskAltRoundedIcon />}
      />
    ),
  }));

  const clickButtonHandler = (response) => {
    setShowExpiration(response);
  };

  return (
    <div>
      <h2 className="area-title">StorageArea</h2>
      <section>
        <h3 className="area-subtitle">Pending product entry</h3>
        <Table
          thead={THEADPURCHASESHISTORY}
          content={updatedTBODYPURCHASEHISTORY}
        />
        <Modal modalTitle="Entry Product">
          {showExpiration === null ? (
            <div className="expiration-container">
              <h3>
                ¿El producto {inputProductName} tiene fecha de vencimiento?
              </h3>
              <div className="expiration-buttons-container">
                <Button
                  styles="expiration-button expiration-yes"
                  buttonFunction={() => clickButtonHandler(true)}
                  buttonText="Si"
                />
                <Button
                  styles="expiration-button expiration-no"
                  buttonFunction={() => clickButtonHandler(false)}
                  buttonText="No"
                />
              </div>
            </div>
          ) : null}
          {(showExpiration === true || showExpiration === false) &&
            arrayStorageInputs.map((input, index) => (
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
          {showExpiration === true && (
            <Input
              labelName="Expiration Date: "
              styles="input"
              type="date"
              placeholder="xx/xx/xxxx"
              value={expirationDate}
              inputFunction={setExpirationDate}
            />
          )}
          {(showExpiration === true || showExpiration === false) && (
            <Button
              styles="modal-button-add"
              buttonFunction={addProductsHandler}
              buttonIcon={<icons.ShoppingCartRoundedIcon />}
              buttonText="Add Purchase"
            />
          )}
        </Modal>
      </section>
      <section>
        <h3 className="area-subtitle">Pending products release</h3>
      </section>
    </div>
  );
};

export default StorageArea;

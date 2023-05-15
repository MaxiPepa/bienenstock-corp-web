import { useContext } from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";

import {
  ROLES,
  THEADPURCHASESHISTORY,
  TBODYPURCHASEHISTORY,
} from "../../Assets/Constants";
import StatesContext from "../../Contexts/StatesContext";
import UserContext from "../../Contexts/UserContext";

import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import Table from "../../Components/Tables/Table";

import icons from "../../Assets/Icons";
import "./PurchasesArea.css";
import CartList from "../../Components/CartList/CartList";
import AditionalInfoForm from "../../Components/PurchasesForms/AditionalInfoForm";
import ProductForm from "../../Components/PurchasesForms/ProductForm";

const PurchansingArea = () => {
  const { userData } = useContext(UserContext);
  useRedirect(userData.userType, ROLES.BUYER);

  const { functionModal } = useContext(StatesContext);

  const updatedTBODYPURCHASEHISTORY = TBODYPURCHASEHISTORY.map((entry) => ({
    ...entry,
    Details: (
      <Button
        styles={"details-table-button"}
        buttonFunction={functionModal}
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
            buttonFunction={functionModal}
            buttonIcon={<icons.AddRoundedIcon />}
            buttonText="New Purchase"
          />
        ) : null}
      </div>
      <hr className="division-horizontal-hr" />
      <h3 className="area-subtitle">Purchases History</h3>
      <Table
        thead={THEADPURCHASESHISTORY}
        content={updatedTBODYPURCHASEHISTORY}
      />
      <Modal modalTitle="New Purchase">
        <div className="left-content">
          <h3>Product</h3>
          <ProductForm />
        </div>
        <div className="right-content">
          <h3>Additional Information</h3>
          <AditionalInfoForm />
        </div>
        <CartList />
      </Modal>
    </div>
  );
};

export default PurchansingArea;

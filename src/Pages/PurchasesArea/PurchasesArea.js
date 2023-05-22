import { useContext, useState, useEffect } from "react";

import { ROLES } from "../../Assets/Constants";
import { parsingDate, purchaseHistoryTableContent } from "../../Assets/Parsing";

import "./PurchasesArea.css";
import { AddRoundedIcon } from "../../Assets/Icons";
import {
  Button,
  Table,
  Modal,
  ProductForm,
  AditionalInfoForm,
  CartList,
} from "../../Assets/Components";
import { APIContext, StatesContext, UserContext } from "../../Assets/Contexts";
import { useRedirect } from "../../Assets/Hooks";

const PurchansingArea = () => {
  const { get } = useContext(APIContext);
  const { setShowModal } = useContext(StatesContext);
  const { userData } = useContext(UserContext);

  useRedirect(userData.userType, ROLES.BUYER);

  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [showInputsModal, setShowInputsModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const [cartByIndex, setCartByIndex] = useState([]);

  useEffect(() => {
    get("purchase/getPurchases").then((data) => {
      setPurchaseHistory(
        data.purchases.map((r) => ({
          purchaseId: "#" + r.purchaseId,
          userFullName: r.userFullName,
          supplier: r.supplier,
          totalPrice: "$" + r.totalPrice,
          date: parsingDate(r.date),
          pending: r.pending ? "Pending" : "Delivered",
          products: r.products.map((p) => ({
            productCode: "#" + p.productCode,
            name: p.name,
            quantity: p.quantity,
            unitPrice: "$" + p.unitPrice,
          })),
        }))
      );
    });
  }, [get]);

  const openInputsModal = () => {
    setShowModal(true);
    setShowCartModal(false);
    setShowInputsModal(true);
  };

  const openPurchaseHistoryCartModal = (index) => {
    const productObj = purchaseHistory[index].products;
    setCartByIndex(productObj);
    setShowModal(true);
    setShowInputsModal(false);
    setShowCartModal(true);
  };

  const purchaseHistoryDataTable = purchaseHistoryTableContent(
    purchaseHistory,
    openPurchaseHistoryCartModal,
    userData,
    ROLES
  );

  return (
    <div className="purchase-area">
      <div className="purchase-header">
        <h2 className="area-title">Purchases Area</h2>
        {userData.userType === ROLES.BUYER ? (
          <Button
            styles="purchase-button"
            buttonFunction={openInputsModal}
            buttonIcon={<AddRoundedIcon />}
            buttonText="New Purchase"
          />
        ) : null}
      </div>
      <hr className="division-horizontal-hr" />
      <h3 className="area-subtitle">Purchases History</h3>
      <Table
        thead={[
          "ID",
          "Buyer",
          "Supplier",
          "Total Price",
          "Purchase date",
          "Income status",
          "Details",
          userData.userType === ROLES.BUYER ? "Cancel" : null,
        ]}
        content={purchaseHistoryDataTable}
      />
      <Modal
        modalTitle={showInputsModal ? "New Purchase" : "Purchase Details"}
        setShowCartModal={setShowCartModal}
        setShowInputsModal={setShowInputsModal}
        setCartData={setCartData}
      >
        {showInputsModal ? (
          <>
            <div className="left-content">
              <h3>Product</h3>
              <ProductForm setCartData={setCartData} />
            </div>
            <div className="right-content">
              <h3>Additional Information</h3>
              <AditionalInfoForm
                cartData={cartData}
                setCartData={setCartData}
              />
            </div>
            <CartList cartData={cartData} />
          </>
        ) : null}
        {showCartModal ? (
          <Table
            thead={["Product Code", "Product", "Quantity", "Price"]}
            content={cartByIndex}
          />
        ) : null}
      </Modal>
    </div>
  );
};

export default PurchansingArea;

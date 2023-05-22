import { useContext, useState, useEffect } from "react";

import { ROLES } from "../../Assets/Constants";
import { parsingDate, purchaseHistoryTableContent } from "../../Assets/Parsing";

import "./PurchasesArea.css";
import icons from "../../Assets/Icons";
import components from "../../Assets/Components";
import contexts from "../../Assets/Contexts";
import hooks from "../../Assets/Hooks";

const PurchansingArea = () => {
  const { userData } = useContext(contexts.UserContext);
  hooks.useRedirect(userData.userType, ROLES.BUYER);

  const { get } = useContext(contexts.APIContext);
  const { setShowModal } = useContext(contexts.StatesContext);

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
          <components.Button
            styles="purchase-button"
            buttonFunction={openInputsModal}
            buttonIcon={<icons.AddRoundedIcon />}
            buttonText="New Purchase"
          />
        ) : null}
      </div>
      <hr className="division-horizontal-hr" />
      <h3 className="area-subtitle">Purchases History</h3>
      <components.Table
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
      <components.Modal
        modalTitle={showInputsModal ? "New Purchase" : "Purchase Details"}
        setShowCartModal={setShowCartModal}
        setShowInputsModal={setShowInputsModal}
        setCartData={setCartData}
      >
        {showInputsModal ? (
          <>
            <div className="left-content">
              <h3>Product</h3>
              <components.ProductForm setCartData={setCartData} />
            </div>
            <div className="right-content">
              <h3>Additional Information</h3>
              <components.AditionalInfoForm
                cartData={cartData}
                setCartData={setCartData}
              />
            </div>
            <components.CartList cartData={cartData} />
          </>
        ) : null}
        {showCartModal ? (
          <components.Table
            thead={["Product Code", "Product", "Quantity", "Price"]}
            content={cartByIndex}
          />
        ) : null}
      </components.Modal>
    </div>
  );
};

export default PurchansingArea;

import { useContext, useState, useEffect, useCallback } from "react";

import { ROLES } from "../../Assets/Constants";
import { parsingDate } from "../../Assets/Parsing";

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
import {
  AddRoundedIcon,
  VisibilityIcon,
  RemoveShoppingCartRoundedIcon,
} from "../../Assets/Icons";

import "./PurchasesArea.css";

const PurchansingArea = () => {
  const { get } = useContext(APIContext);
  const { setShowModal } = useContext(StatesContext);
  const { userData } = useContext(UserContext);

  useRedirect(userData.userType, ROLES.BUYER);

  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [showInputsModal, setShowInputsModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const [productsDetails, setProductsDetails] = useState([]);

  const openPurchaseHistoryCartModal = useCallback(
    (products) => {
      setProductsDetails(products);
      setShowModal(true);
      setShowInputsModal(false);
      setShowCartModal(true);
    },
    [setShowModal]
  );

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
          details: (
            <Button
              styles={"table-buttons details-icon"}
              buttonFunction={() => {
                openPurchaseHistoryCartModal(r.products);
              }}
              buttonIcon={<VisibilityIcon />}
            />
          ),
          cancel:
            r.pending && userData.userType === ROLES.BUYER ? (
              <Button
                styles={"table-buttons cancel-icon"}
                buttonFunction={() => {
                  console.log("cancel purchase ", r.purchaseId);
                }}
                buttonIcon={<RemoveShoppingCartRoundedIcon />}
              />
            ) : null,
        }))
      );
    });
  }, [get, openPurchaseHistoryCartModal, userData.userType]);

  const openInputsModal = () => {
    setShowModal(true);
    setShowCartModal(false);
    setShowInputsModal(true);
  };

  return (
    <div className="area-container">
      <div className="area-header">
        <h2 className="area-title">Purchases Area</h2>
        {userData.userType === ROLES.BUYER ? (
          <Button
            styles="area-button"
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
        mapKeys={[
          "purchaseId",
          "userFullName",
          "supplier",
          "totalPrice",
          "date",
          "pending",
          "details",
          "cancel",
        ]}
        content={purchaseHistory}
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
            thead={["Product Code", "Product", "Quantity", "Unit Price"]}
            mapKeys={["productCode", "name", "quantity", "unitPrice"]}
            content={productsDetails}
          />
        ) : null}
      </Modal>
    </div>
  );
};

export default PurchansingArea;

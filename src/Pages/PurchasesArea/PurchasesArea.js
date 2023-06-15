import { useContext, useState, useEffect, useCallback } from "react";

import { ROLES } from "Assets/Constants";
import { parsingDateTime } from "Assets/Parsing";

import {
  Button,
  Table,
  Modal,
  ProductForm,
  AditionalInfoForm,
  CartList,
  ConfirmationForm,
} from "Components";
import {
  APIContext,
  StatesContext,
  UserContext,
  ReaderContext,
} from "Contexts";
import {
  AddRoundedIcon,
  VisibilityIcon,
  RemoveShoppingCartRoundedIcon,
  CheckIcon,
  ClearIcon,
  PendingActionsRoundedIcon,
} from "Assets/Icons";

import "./PurchasesArea.css";

const PurchansingArea = () => {
  const { get, post } = useContext(APIContext);
  const { setShowModal, setAlert } = useContext(StatesContext);
  const { userData } = useContext(UserContext);
  const { startPageConnection, stopPageConnection } = useContext(ReaderContext);

  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [showInputsModal, setShowInputsModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cancelPurchaseId, setCancelPurchaseId] = useState();
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

  const openConfirmationModal = useCallback(
    (userId) => {
      setCancelPurchaseId(userId);
      setShowModal(true);
    },
    [setShowModal]
  );

  const getPurchaseHistory = useCallback(() => {
    get("purchase/getPurchases").then((data) => {
      setPurchaseHistory(
        data.purchases.map((r) => ({
          purchaseId: "#" + r.purchaseId,
          userFullName: r.userFullName,
          supplier: r.supplier,
          totalPrice: "$ " + r.totalPrice,
          date: parsingDateTime(r.date),
          status: r.pending ? (
            <div className="icon-container">
              <PendingActionsRoundedIcon className="pending-icon status-icon" />
              <div className="tooltip">Pending</div>
            </div>
          ) : r.cancelled ? (
            <div className="icon-container">
              <ClearIcon className="nodispatched-icon status-icon" />
              <div className="tooltip">Canceled</div>
            </div>
          ) : (
            <div className="icon-container">
              <CheckIcon className="check-icon status-icon" />
              <div className="tooltip">Completed</div>
            </div>
          ),
          products: r.products.map((p) => ({
            productCode: "#" + p.productCode,
            name: p.name,
            quantity: p.quantity,
            unitPrice: "$ " + p.unitPrice,
          })),
          details: (
            <Button
              styles={"table-button-style info-style"}
              buttonFunction={() => {
                openPurchaseHistoryCartModal(r.products);
              }}
              buttonIcon={<VisibilityIcon />}
            />
          ),
          cancel:
            r.pending && userData.userType === ROLES.BUYER ? (
              <Button
                styles={"table-button-style cancel-style"}
                buttonFunction={() => {
                  openConfirmationModal(r.purchaseId);
                }}
                buttonIcon={<RemoveShoppingCartRoundedIcon />}
              />
            ) : null,
        }))
      );
    });
  }, [get, openConfirmationModal, openPurchaseHistoryCartModal, userData]);

  useEffect(() => {
    getPurchaseHistory();
    startPageConnection(getPurchaseHistory, "page", "buyHub", "PurchaseUpdate");
  }, [getPurchaseHistory, startPageConnection]);

  useEffect(() => {
    return () => {
      stopPageConnection();
    };
  }, [stopPageConnection]);

  const openInputsModal = () => {
    setShowModal(true);
    setShowCartModal(false);
    setShowInputsModal(true);
  };

  const cancelPurchase = () => {
    const rq = {
      purchaseId: cancelPurchaseId,
    };
    post("purchase/cancelPurchase", rq).then((rs) => {
      setAlert({
        show: true,
        message: rs.message,
        type: rs.success ? "success" : "error",
      });
    });
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
          "status",
          "details",
          "cancel",
        ]}
        content={purchaseHistory}
        entity="purchases"
      />
      <Modal
        modalTitle={
          showInputsModal
            ? "New Purchase"
            : showCartModal
            ? "Purchase Details"
            : "Cancel Purchase"
        }
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
                setShowInputsModal={setShowInputsModal}
              />
            </div>
            <CartList cartData={cartData} />
          </>
        ) : showCartModal ? (
          <Table
            thead={["Product Code", "Product", "Quantity", "Unit Price"]}
            mapKeys={["productCode", "name", "quantity", "unitPrice"]}
            content={productsDetails}
            entity="products"
          />
        ) : (
          <ConfirmationForm onConfirm={cancelPurchase} />
        )}
      </Modal>
    </div>
  );
};

export default PurchansingArea;

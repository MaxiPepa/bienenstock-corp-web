import { useCallback, useContext, useEffect, useState } from "react";

import { ROLES } from "Assets/Constants";
import { parsingDate } from "Assets/Parsing";

import {
  Button,
  Table,
  Modal,
  CartList,
  ConfirmationForm,
  SaleProductForm,
  SaleAditionalInfoForm,
} from "Components";
import { APIContext, StatesContext, UserContext } from "Contexts";
import { useRedirect } from "Hooks";

import {
  AddRoundedIcon,
  CheckIcon,
  ClearIcon,
  VisibilityIcon,
  RemoveShoppingCartRoundedIcon,
} from "Assets/Icons";

import "./SalesArea.css";

const SalesArea = () => {
  const { get, post } = useContext(APIContext);
  const { setShowModal, setAlert } = useContext(StatesContext);
  const { userData } = useContext(UserContext);

  useRedirect(userData.userType, ROLES.SELLER);

  const [saleHistory, setSaleHistory] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [showInputsModal, setShowInputsModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cancelSaleId, setCancelSaleId] = useState();
  const [postData, setPostData] = useState([]);

  const [productsDetails, setProductsDetails] = useState([]);

  const openSaleHistoryCartModal = useCallback(
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
      setCancelSaleId(userId);
      setShowModal(true);
    },
    [setShowModal]
  );

  useEffect(() => {
    get("sale/getSales").then((data) => {
      setSaleHistory(
        data.sales.map((r) => ({
          saleId: "#" + r.saleId,
          userFullName: r.userFullName,
          totalPrice: "$" + r.totalPrice,
          date: parsingDate(r.date),
          products: r.products.map((p) => ({
            productCode: "#" + p.productCode,
            name: p.name,
            quantity: p.quantity,
            unitPrice: "$" + p.unitPrice,
          })),
          dispatched: r.dispatched ? (
            <CheckIcon className="check-icon" />
          ) : (
            <ClearIcon className="nodispatched-icon" />
          ),
          dispatchDate: r.dispatched ? parsingDate(r.dispatchDate) : "-",
          details: (
            <Button
              styles={"table-buttons details-icon"}
              buttonFunction={() => {
                openSaleHistoryCartModal(r.products);
              }}
              buttonIcon={<VisibilityIcon />}
            />
          ),
          cancel:
            !r.dispatched &&
            userData.userType === ROLES.SELLER &&
            !r.cancelled ? (
              <Button
                styles={"table-buttons cancel-icon"}
                buttonFunction={() => {
                  openConfirmationModal(r.saleId);
                }}
                buttonIcon={<RemoveShoppingCartRoundedIcon />}
              />
            ) : r.cancelled ? (
              <span className="saleCancelled">SALE CANCELLED</span>
            ) : null,
        }))
      );
    });
  }, [get, openSaleHistoryCartModal, openConfirmationModal, userData.userType]);

  const openInputsModal = () => {
    setShowModal(true);
    setShowCartModal(false);
    setShowInputsModal(true);
  };

  const cancelSale = () => {
    const rq = {
      saleId: cancelSaleId,
    };
    post("Sale/CancelSale", rq).then((rs) => {
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
        <h2 className="area-title">Sales Area</h2>
        {userData.userType === ROLES.SELLER ? (
          <Button
            styles="area-button"
            buttonFunction={openInputsModal}
            buttonIcon={<AddRoundedIcon />}
            buttonText="New Sale"
          />
        ) : null}
      </div>
      <hr className="division-horizontal-hr" />
      <h3 className="area-subtitle">Sales History</h3>
      <Table
        thead={[
          "ID",
          "Seller",
          "Total Price",
          "Sale Date",
          "Dispatched",
          "DispatchDate",
          "Details",
          userData.userType === ROLES.SELLER ? "Cancel" : null,
        ]}
        mapKeys={[
          "saleId",
          "userFullName",
          "totalPrice",
          "date",
          "dispatched",
          "dispatchDate",
          "details",
          "cancel",
        ]}
        content={saleHistory}
        entity={"sales"}
      />
      <Modal
        modalTitle={showInputsModal ? "New Sale" : "Sale Details"}
        setShowCartModal={setShowCartModal}
        setShowInputsModal={setShowInputsModal}
        setCartData={setCartData}
        setPostData={setPostData}
      >
        {showInputsModal ? (
          <>
            <div className="left-content">
              <h3>Product</h3>
              <SaleProductForm
                setCartData={setCartData}
                setPostData={setPostData}
              />
            </div>
            <div className="right-content">
              <h3>Additional Information</h3>
              <SaleAditionalInfoForm
                postData={postData}
                setPostData={setPostData}
                setCartData={setCartData}
              />
            </div>
            <CartList cartData={cartData} />
          </>
        ) : showCartModal ? (
          <Table
            thead={["Product Code", "Product", "Quantity", "Price"]}
            mapKeys={["productCode", "name", "quantity", "unitPrice"]}
            content={productsDetails}
            entity={"products"}
          />
        ) : (
          <ConfirmationForm functionFather={cancelSale} />
        )}
      </Modal>
    </div>
  );
};

export default SalesArea;

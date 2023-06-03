import { useContext, useEffect, useState } from "react";

import { ROLES } from "Assets/Constants";
import { parsingDate } from "Assets/Parsing";

import {
  Button,
  Table,
  Modal,
  AditionalInfoForm,
  CartList,
  SaleProductForm,
} from "Components";
import { APIContext, StatesContext, UserContext } from "Contexts";
import { useRedirect } from "Hooks";

import { AddRoundedIcon } from "Assets/Icons";

import "./SalesArea.css"

const SalesArea = () => {
  const { get } = useContext(APIContext);
  const { setShowModal } = useContext(StatesContext);
  const { userData } = useContext(UserContext);

  useRedirect(userData.userType, ROLES.SELLER);

  const [saleHistory, setSaleHistory] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [showInputsModal, setShowInputsModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const [cartByIndex, setCartByIndex] = useState([]);

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
            <ClearIcon className="cancel-icon" />
          ),
          dispatchDate: r.dispatched ? parsingDate(r.dispatchDate) : "-",
          Details: (
            <Button
              styles={"table-buttons details-icon"}
              buttonFunction={() => {
                openSaleHistoryCartModal(r.products);
              }}
              buttonIcon={<VisibilityIcon />}
            />
          ),
          Cancel:
            !r.dispatched && userData.userType === ROLES.SELLER ? (
              <Button
                styles={"table-buttons cancel-icon"}
                buttonFunction={() => {
                  console.log("cancel Sale ", r.saleId);
                }}
                buttonIcon={<RemoveShoppingCartRoundedIcon />}
              />
            ) : null,
        }))
      );
    });
  }, [get, openSaleHistoryCartModal, userData.userType]);

  const openInputsModal = () => {
    setShowModal(true);
    setShowCartModal(false);
    setShowInputsModal(true);
  };

  const openSaleHistoryCartModal = (index) => {
    const productObj = saleHistory[index].products;
    setCartByIndex(productObj);
    setShowModal(true);
    setShowInputsModal(false);
    setShowCartModal(true);
  };

  const saleHistoryDataTable = saleHistoryTableContent(
    saleHistory,
    openSaleHistoryCartModal,
    userData,
    ROLES
  );

  return (
    <div className="sales-area">
      <div className="sales-header">
        <h2 className="area-title">Sales Area</h2>
        {userData.userType === ROLES.SELLER ? (
          <Button
            styles="sales-button"
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
        content={saleHistoryDataTable}
      />
      <Modal
        modalTitle={showInputsModal ? "New Sale" : "Sale Details"}
        setShowCartModal={setShowCartModal}
        setShowInputsModal={setShowInputsModal}
        setCartData={setCartData}
      >
        {showInputsModal ? (
          <>
            <div className="left-content">
              <h3>Product</h3>
              <SaleProductForm setCartData={setCartData} />
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

export default SalesArea;

import { useContext, useState, useEffect } from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";

import { ROLES, THEADPURCHASESHISTORY } from "../../Assets/Constants";
import { parsingDate } from "../../Assets/Parsing";
import UserContext from "../../Contexts/UserContext";
import StatesContext from "../../Contexts/StatesContext";
import APIContext from "../../Contexts/APIContext";

import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import Table from "../../Components/Tables/Table";
import CartList from "../../Components/CartList/CartList";
import AditionalInfoForm from "../../Components/PurchasesForms/AditionalInfoForm";
import ProductForm from "../../Components/PurchasesForms/ProductForm";

import icons from "../../Assets/Icons";
import "./PurchasesArea.css";

const PurchansingArea = () => {
  const { userData } = useContext(UserContext);
  useRedirect(userData.userType, ROLES.BUYER);

  const { get } = useContext(APIContext);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const { setShowModal } = useContext(StatesContext);
  const [cartData, setCartData] = useState([]);
  const [showInputsModal, setShowInputsModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const [cartByIndex, setCartByIndex] = useState([]);

  useEffect(() => {
    const getPurchaseHistory = async () => {
      await get("purchase/getPurchases").then((data) => {
        console.log(data);
        setPurchaseHistory(
          data.purchases.map((r) => ({
            purchaseId: "#" + r.purchaseId,
            userFullName: r.userFullName,
            supplier: r.supplier,
            totalPrice: "$" + r.totalPrice,
            date: parsingDate(r.date),
            pending: r.pending ? "Pending" : "Delivered",
            products: r.products.map((p) => ({
              productCode: p.productCode,
              name: p.name,
              quantity: p.quantity,
              unitPrice: p.unitPrice,
            })),
          }))
        );
      });
    };
    getPurchaseHistory();
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

  const updatedData = purchaseHistory.map((item) => {
    const { products, ...newObj } = item;
    return newObj;
  });

  const updatedDataWithDetails = updatedData.map((item, index) => ({
    ...item,
    Details: (
      <Button
        styles={"details-table-button"}
        buttonFunction={() => {
          openPurchaseHistoryCartModal(index);
        }}
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
            buttonFunction={openInputsModal}
            buttonIcon={<icons.AddRoundedIcon />}
            buttonText="New Purchase"
          />
        ) : null}
      </div>
      <hr className="division-horizontal-hr" />
      <h3 className="area-subtitle">Purchases History</h3>
      <Table thead={THEADPURCHASESHISTORY} content={updatedDataWithDetails} />
      <Modal
        modalTitle="New Purchase"
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

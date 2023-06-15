import { useCallback, useContext, useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";

import { ROLES } from "Assets/Constants";
import { parsingDateTime } from "Assets/Parsing";

import {
  Button,
  Table,
  Modal,
  CartList,
  ConfirmationForm,
  SaleProductForm,
  SaleAditionalInfoForm,
  Invoice,
} from "Components";
import {
  APIContext,
  StatesContext,
  UserContext,
  ReaderContext,
} from "Contexts";

import {
  AddRoundedIcon,
  CheckIcon,
  ClearIcon,
  PendingActionsRoundedIcon,
  VisibilityIcon,
  RemoveShoppingCartRoundedIcon,
  PictureAsPdfRoundedIcon,
} from "Assets/Icons";

import "./SalesArea.css";

const SalesArea = () => {
  const { get, post } = useContext(APIContext);
  const { setShowModal, setAlert } = useContext(StatesContext);
  const { userData } = useContext(UserContext);
  const { startPageConnection, stopPageConnection } = useContext(ReaderContext);

  const [saleHistory, setSaleHistory] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [showInputsModal, setShowInputsModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [cancelSaleId, setCancelSaleId] = useState();
  const [productsDetails, setProductsDetails] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);

  const openSaleHistoryCartModal = useCallback(
    (products) => {
      setProductsDetails(products);
      setShowModal(true);
      setShowInputsModal(false);
      setShowPdfModal(false);
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

  const openPdfInvoiceModal = useCallback((objetInvoiceData) => {
    setInvoiceData(objetInvoiceData);
    setShowModal(true);
    setShowPdfModal(true);
    setShowCartModal(false);
    setShowInputsModal(false);
  },[setShowModal]);

  const getSaleHistory = useCallback(() => {
    get("sale/getSales").then((data) => {
      setSaleHistory(
        data.sales.map((r) => ({
          saleId: "#" + r.saleId,
          userFullName: r.userFullName,
          totalPrice: "$" + r.totalPrice,
          date: parsingDateTime(r.date),
          products: r.products.map((p) => ({
            productCode: "#" + p.productCode,
            name: p.name,
            quantity: p.quantity,
            unitPrice: "$" + p.unitPrice,
          })),
          status: r.dispatched ? (
            <div className="icon-container">
              <CheckIcon className="check-icon status-icon" />
              <div className="tooltip">Completed</div>
            </div>
          ) : r.cancelled ? (
            <div className="icon-container">
              <ClearIcon className="nodispatched-icon status-icon" />
              <div className="tooltip">Canceled</div>
            </div>
          ) : (
            <div className="icon-container">
              <PendingActionsRoundedIcon className="pending-icon status-icon" />
              <div className="tooltip">Pending</div>
            </div>
          ),
          dispatchDate: r.dispatched ? parsingDateTime(r.dispatchDate) : "-",
          details: (
            <Button
              styles={"table-button-style info-style"}
              buttonFunction={() => {
                openSaleHistoryCartModal(r.products);
              }}
              buttonIcon={<VisibilityIcon />}
            />
          ),
          cancel: !r.dispatched &&
            userData.userType === ROLES.SELLER &&
            !r.cancelled && (
              <Button
                styles={"table-button-style cancel-style"}
                buttonFunction={() => {
                  openConfirmationModal(r.saleId);
                }}
                buttonIcon={<RemoveShoppingCartRoundedIcon />}
              />
            ),
          invoice:
            userData.userType === ROLES.SELLER ? (
              <Button
                buttonIcon={<PictureAsPdfRoundedIcon />}
                styles={"table-button-style invoice-style"}
                buttonFunction={() => {
                  openPdfInvoiceModal(r);
                }}
              />
            ) : null,
        }))
      );
    });
  }, [
    get,
    openSaleHistoryCartModal,
    openConfirmationModal,
    openPdfInvoiceModal,
    userData.userType,
  ]);

  useEffect(() => {
    getSaleHistory();
    startPageConnection(getSaleHistory, "page", "saleHub", "SaleUpdate");
  }, [getSaleHistory, startPageConnection]);

  useEffect(() => {
    return () => {
      stopPageConnection();
    };
  }, [stopPageConnection]);

  const openInputsModal = () => {
    setShowModal(true);
    setShowCartModal(false);
    setShowInputsModal(true);
    setShowPdfModal(false);
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
          "Dispatch Status",
          "DispatchDate",
          "Details",
          userData.userType === ROLES.SELLER ? "Cancel" : null,
          userData.userType === ROLES.SELLER ? "Invoice" : null,
        ]}
        mapKeys={[
          "saleId",
          "userFullName",
          "totalPrice",
          "date",
          "status",
          "dispatchDate",
          "details",
          "cancel",
          "invoice",
        ]}
        content={saleHistory}
        entity={"sales"}
      />
      <Modal
        modalTitle={
          showInputsModal
            ? "New Sale"
            : showCartModal
            ? "Sale Details"
            : "Invoice"
        }
        setShowCartModal={setShowCartModal}
        setShowInputsModal={setShowInputsModal}
        setCartData={setCartData}
        setShowPdfModal={setShowPdfModal}
      >
        {showInputsModal ? (
          <>
            <div className="left-content">
              <h3>Product</h3>
              <SaleProductForm setCartData={setCartData} />
            </div>
            <div className="right-content">
              <h3>Information Invoice</h3>
              <SaleAditionalInfoForm
                cartData={cartData}
                setCartData={setCartData}
                setShowInputsModal={setShowInputsModal}
              />
            </div>
            <CartList cartData={cartData} />
          </>
        ) : showCartModal ? (
          <Table
            thead={["Product Code", "Product", "Quantity", "Price"]}
            mapKeys={["productCode", "name", "quantity", "unitPrice"]}
            content={productsDetails}
            idTable={"cart-purchase-table"}
            entity={"products"}
          />
        ) : showPdfModal ? (
          <>
            <PDFViewer width={"100%"} height={"1000"}>
              <Invoice data={invoiceData} />
            </PDFViewer>
          </>
        ) : (
          <ConfirmationForm onConfirm={cancelSale} />
        )}
      </Modal>
    </div>
  );
};

export default SalesArea;

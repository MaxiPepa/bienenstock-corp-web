import { useContext, useEffect, useState } from "react";
import { ROLES } from "../../Assets/Constants";
import { parsingDate, purchaseEntryTableContent } from "../../Assets/Parsing";

import { Modal, Table } from "../../Assets/Components";
import { UserContext, APIContext, StatesContext } from "../../Assets/Contexts";
import { useRedirect } from "../../Assets/Hooks";

import "./StorageArea.css";

const StorageArea = () => {
  const { userData } = useContext(UserContext);
  const { get } = useContext(APIContext);
  const { setShowModal } = useContext(StatesContext);

  useRedirect(userData.userType, ROLES.DEPOSITOR);

  const [pendingEntry, setPendingEntry] = useState([]);
  const [cartByIndex, setCartByIndex] = useState([]);
  const [expiration, setExpiration] = useState([]);
  const [expirationDate, setExpirationDate] = useState([]);

  useEffect(() => {
    get("purchase/getPurchases").then((data) => {
      setPendingEntry(
        data.purchases.map((r) =>
          r.pending
            ? {
                purchaseId: "#" + r.purchaseId,
                userFullName: r.userFullName,
                supplier: r.supplier,
                totalPrice: "$" + r.totalPrice,
                date: parsingDate(r.date),
                pending: "Pending",
                products: r.products.map((p) => ({
                  productCode: "#" + p.productCode,
                  name: p.name,
                  quantity: p.quantity,
                  unitPrice: "$" + p.unitPrice,
                })),
              }
            : null
        )
      );
    });
  }, [get]);

  const cartByIndexWithExpiration = (cart) => {
    const falseArray = Array(cart.length).fill(false);
    setExpiration(falseArray);
    console.log(cart.length);

    return cart.map((p, index) => ({
      ...p,
      expiration: (
        <input
          type="checkbox"
          className="expiration-checkbox"
          checked={expiration[index]}
        />
      ),
    }));
  };

  const confirmEntryProduct = (index) => {
    setCartByIndex(cartByIndexWithExpiration(pendingEntry[index].products));
    setShowModal(true);
  };

  const purchaseEntryDataTable = purchaseEntryTableContent(
    pendingEntry,
    confirmEntryProduct
  );

  return (
    <div className="storage-area">
      <div className="storage-header">
        <h2 className="area-title">StorageArea</h2>
      </div>
      <hr className="division-horizontal-hr" />
      <>
        <h3 className="area-subtitle">Pending products entry</h3>
        <Table
          thead={[
            "ID",
            "Buyer",
            "Supplier",
            "Total Price",
            "Purchase Date",
            "Confirm Entry",
          ]}
          content={purchaseEntryDataTable}
        />
      </>
      <section>
        <h3 className="area-subtitle">Pending products release</h3>
      </section>
      <Modal modalTitle="Confirm Products Entry">
        <Table
          thead={[
            "Product Code",
            "Name",
            "Quantity",
            "Unit Price",
            "Expiration?",
          ]}
          content={cartByIndex}
        />
      </Modal>
    </div>
  );
};

export default StorageArea;

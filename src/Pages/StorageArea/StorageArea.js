import { useContext, useEffect, useState } from "react";
import { ROLES } from "../../Assets/Constants";
import { parsingDate, purchaseEntryTableContent } from "../../Assets/Parsing";

import { Modal, Table, ExpirationsForm } from "../../Assets/Components";
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
  const [currentPurchaseId, setCurrectPurchaseId] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    get("purchase/getPurchases").then((data) => {
      setPendingEntry(
        data.purchases
          .map((r) =>
            r.pending
              ? {
                  purchaseId: "#" + r.purchaseId,
                  userFullName: r.userFullName,
                  supplier: r.supplier,
                  totalPrice: "$" + r.totalPrice,
                  date: parsingDate(r.date),
                  pending: "Pending",
                  products: r.products.map((p) => ({
                    productId: p.productId,
                    productCode: "#" + p.productCode,
                    name: p.name,
                    quantity: p.quantity,
                    unitPrice: "$" + p.unitPrice,
                  })),
                }
              : null
          )
          .filter((item) => item !== null)
      );
    });
  }, [get]);

  const cartByIndexWithExpiration = (cart) => {
    const falseArray = Array(cart.length).fill(false);
    setExpiration(falseArray);

    return cart.map(({ productId, ...p }, index) => ({
      ...p,
      expiration: (
        <input
          type="checkbox"
          className="expiration-checkbox"
          checked={expiration[index]}
          onChange={(e) => {
            const checked = e.target.checked;
            setExpiration((prevExpiration) => {
              const newExpiration = [...prevExpiration];
              newExpiration[index] = checked;
              return newExpiration;
            });
          }}
        />
      ),
    }));
  };

  const confirmEntryProduct = (index) => {
    setCartByIndex(cartByIndexWithExpiration(pendingEntry[index].products));
    setCurrectPurchaseId(parseInt(pendingEntry[index].purchaseId.substring(1)));
    setProducts(pendingEntry[index].products);
    setShowModal(true);
  };

  const purchaseEntryDataTable = purchaseEntryTableContent(
    pendingEntry,
    confirmEntryProduct,
    userData
  );

  return (
    <div className="area-container">
      <div className="area-header">
        <h2 className="area-title">StorageArea</h2>
      </div>
      <hr className="division-horizontal-hr" />
      <section>
        <h3 className="area-subtitle">Pending products entry</h3>
        <Table
          thead={[
            "ID",
            "Buyer",
            "Supplier",
            "Total Price",
            "Purchase Date",
            userData.userType === ROLES.DEPOSITOR ? "Confirm Entry" : null,
          ]}
          content={purchaseEntryDataTable}
        />
      </section>
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
        <ExpirationsForm
          expiration={expiration}
          currentPurchaseId={currentPurchaseId}
          products={products}
        />
      </Modal>
    </div>
  );
};

export default StorageArea;

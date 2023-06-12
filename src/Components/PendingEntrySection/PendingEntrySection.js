import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ROLES } from "Assets/Constants";
import { parsingDate } from "Assets/Parsing";

import { Table, ConfirmPurchaseButton, Modal } from "Components";
import { UserContext, APIContext, StatesContext } from "Contexts";
import { useStorageValidations } from "Hooks";
import { AddRoundedIcon } from "Assets/Icons";

const PendingEntrySection = ({ reload }) => {
  const { register, handleSubmit, resetField } = useForm();

  const { userData } = useContext(UserContext);
  const { get, post } = useContext(APIContext);
  const { setAlert, setShowModal } = useContext(StatesContext);

  const { validateDate, validateEmpty } = useStorageValidations();

  const [pendingEntry, setPendingEntry] = useState([]);
  const [productsById, setProductsById] = useState([]);
  const [currentPurchaseId, setCurrentPurchaseId] = useState();

  useEffect(() => {
    get("purchase/getPurchases", { pending: true }).then((data) => {
      setPendingEntry(
        data.purchases.map((r) => ({
          purchaseId: "#" + r.purchaseId,
          userFullName: r.userFullName,
          supplier: r.supplier,
          totalPrice: "$" + r.totalPrice,
          date: parsingDate(r.date),
          pending: "Pending",
          confirmButton: (
            <ConfirmPurchaseButton
              products={r.products}
              setProductsById={setProductsById}
              register={register}
              setCurrentPurchaseId={() => setCurrentPurchaseId(r.purchaseId)}
              resetField={resetField}
              role={userData.userType}
            />
          ),
        }))
      );
    });
  }, [get, register, reload, resetField, userData.userType]);

  const onSubmit = (data) => {
    if (!validateEmpty(Object.values(data).filter((x) => x !== undefined))) {
      setAlert({
        show: true,
        type: "error",
        message: "Please complete all the fields.",
      });
    } else if (
      !validateDate(Object.values(data).filter((x) => x !== undefined))
    ) {
      setAlert({
        show: true,
        type: "error",
        message:
          "The expiration dates cannot be less than or equal to the current date.",
      });
    } else {
      const rq = {
        purchaseId: currentPurchaseId,
        enterDate: new Date().toISOString(),
        expirationDates: Object.entries(data)
          .filter(([key, value]) => value !== undefined)
          .map(([key, value]) => ({
            productId: parseInt(key),
            expirationDate: new Date(value).toISOString(),
          })),
      };

      post("purchase/completePurchase", rq).then((res) => {
        setAlert({
          show: true,
          message: res.message,
          type: res.success ? "success" : "error",
        });

        setShowModal(false);
      });
    }
  };

  return (
    <section>
      <h3 className="area-subtitle">Pending products entry</h3>

      <Table
        thead={[
          "ID",
          "Buyer",
          "Supplier",
          "Total Price",
          "Purchase Date",
          userData.userType === ROLES.DEPOSITOR ? "Confirm Entry" : "Details",
        ]}
        mapKeys={[
          "purchaseId",
          "userFullName",
          "supplier",
          "totalPrice",
          "date",
          "confirmButton",
        ]}
        content={pendingEntry}
        entity="pending products entry"
      />

      <Modal modalTitle="Confirm Products Entry">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table
            thead={[
              "Product Code",
              "Name",
              "Quantity",
              "Unit Price",
              userData.userType === ROLES.DEPOSITOR && "Expiration",
            ]}
            mapKeys={[
              "productCode",
              "name",
              "quantity",
              "unitPrice",
              userData.userType === ROLES.DEPOSITOR && "expiration",
            ]}
            content={productsById}
          />
          {userData.userType === ROLES.DEPOSITOR && (
            <div className="button-content">
              <button type="submit" className="modal-button-add">
                {<AddRoundedIcon />}
                <span>Add to Stock</span>
              </button>
            </div>
          )}
        </form>
      </Modal>
    </section>
  );
};

export default PendingEntrySection;

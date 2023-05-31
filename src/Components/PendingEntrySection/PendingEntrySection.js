import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ROLES } from "../../Assets/Constants";
import { parsingDate } from "../../Assets/Parsing";

import { Table, ConfirmPurchaseButton, Modal } from "../../Assets/Components";
import { UserContext, APIContext, StatesContext } from "../../Assets/Contexts";
import { useStorageValidations } from "../../Assets/Hooks";
import { AddRoundedIcon } from "../../Assets/Icons";

const PendingEntrySection = () => {
  const { register, handleSubmit, resetField } = useForm();

  const { userData } = useContext(UserContext);
  const { get, post } = useContext(APIContext);
  const { setAlert, setShowModal } = useContext(StatesContext);

  const { validateDate, validateEmpty } = useStorageValidations();

  const [pendingEntry, setPendingEntry] = useState([]);
  const [cartByIndex, setCartByIndex] = useState([]);
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
              setCartByIndex={setCartByIndex}
              register={register}
              setCurrentPurchaseId={() => setCurrentPurchaseId(r.purchaseId)}
              resetField={resetField}
            />
          ),
        }))
      );
    });
  }, [get, register, resetField]);

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
        products: Object.values(data).filter((x) => x !== undefined),
      };

      console.log(rq);

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
          userData.userType === ROLES.DEPOSITOR && "Confirm Entry",
        ]}
        mapKeys={[
          "purchaseId",
          "userFullName",
          "supplier",
          "totalPrice",
          "date",
          userData.userType === ROLES.DEPOSITOR && "confirmButton",
        ]}
        content={pendingEntry}
      />
      <Modal modalTitle="Confirm Products Entry">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table
            thead={[
              "Product Code",
              "Name",
              "Quantity",
              "Unit Price",
              "Expiration",
            ]}
            mapKeys={[
              "productCode",
              "name",
              "quantity",
              "unitPrice",
              "expiration",
            ]}
            content={cartByIndex}
          />
          <div className="button-content">
            <button type="submit" className="modal-button-add">
              {<AddRoundedIcon />}
              <span>Add to Stock</span>
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default PendingEntrySection;

import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { parsingDate } from "Assets/Parsing";
import { ROLES } from "Assets/Constants";

import { Table, Modal, ConfirmStorageButton } from "Components";
import { APIContext, UserContext, StatesContext } from "Contexts";
import { useProductsValidation } from "Hooks";
import { LocalShippingRoundedIcon } from "Assets/Icons";

import "./PendingDispatchSection.css";

const PendingDispatchSection = ({ reload }) => {
  const { get, post } = useContext(APIContext);
  const { userData } = useContext(UserContext);
  const { setAlert, setShowModal } = useContext(StatesContext);
  const { requiredValidations, errorMessages } = useProductsValidation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const [pendingDispatch, setPendingDispatch] = useState([]);
  const [productsById, setProductsById] = useState([]);
  const [currentSaleId, setCurrentSaleId] = useState();
  const [dispatchModal, setDispatchModal] = useState(false);

  useEffect(() => {
    get("sale/getSales", { pendingDispatch: true }).then((data) => {
      setPendingDispatch(
        data.sales.map((r) => ({
          saleId: "#" + r.saleId,
          userFullName: r.userFullName,
          totalPrice: "$" + r.totalPrice,
          date: parsingDate(r.date),
          confirmButton: (
            <ConfirmStorageButton
              products={r.products}
              setProductsById={setProductsById}
              setCurrentId={() => setCurrentSaleId(r.saleId)}
              role={userData.userType}
              setSectionModal={setDispatchModal}
            />
          ),
        }))
      );
    });
  }, [get, userData.userType, reload]);

  const onSubmit = (data) => {
    post("sale/dispatchSale", {
      saleId: currentSaleId,
      dispatchDate: data.sectionDate,
    }).then((res) => {
      setAlert({
        show: true,
        message: res.message,
        type: res.success ? "success" : "error",
      });
      setDispatchModal(false);
      setShowModal(false);
    });
  };

  return (
    <section>
      <h3 className="area-subtitle">Pending products dispatch</h3>
      <Table
        thead={[
          "ID",
          "Seller",
          "Total Price",
          "Sale Date",
          userData.userType === ROLES.DEPOSITOR
            ? "Confirm Dispatch"
            : "Details",
        ]}
        mapKeys={[
          "saleId",
          "userFullName",
          "totalPrice",
          "date",
          "confirmButton",
        ]}
        content={pendingDispatch}
        entity="pending products entry"
      />

      {dispatchModal && (
        <Modal
          modalTitle="Confirm Products Dispatch"
          setDispatchModal={setDispatchModal}
          reset={() => {
            resetField("sectionDate");
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Table
              thead={["Product Code", "Name", "Quantity", "Unit Price"]}
              mapKeys={["productCode", "name", "quantity", "unitPrice"]}
              content={productsById}
              entity="product"
            />

            {userData.userType === ROLES.DEPOSITOR && (
              <div className="button-content">
                <div className="dispatch-date-input">
                  <div className="input-content">
                    <label>Dispatch Date:</label>
                    <input
                      className="input"
                      type="datetime-local"
                      placeholder="dd/mm/aaaa"
                      {...register(
                        "sectionDate",
                        requiredValidations("sectionDate")
                      )}
                    />
                  </div>
                  {errors.sectionDate && (
                    <span className="error-input-message">
                      {errorMessages(errors["sectionDate"])}
                    </span>
                  )}
                </div>
                <button type="submit" className="modal-button-add">
                  {<LocalShippingRoundedIcon />}
                  <span>Dispatch Sale</span>
                </button>
              </div>
            )}
          </form>
        </Modal>
      )}
    </section>
  );
};

export default PendingDispatchSection;
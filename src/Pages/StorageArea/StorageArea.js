import React, { useContext, useState } from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import {
  USER,
  ROLES,
  THEADPURCHASESHISTORY,
  TBODYPENDINGENTRY,
} from "../../Assets/Constants";
import StatesContext from "../../Contexts/StatesContext";

import Table from "../../Components/Tables/Table";
import Button from "../../Components/Button/Button";

import "./StorageArea.css";
import icons from "../../Assets/Icons";
import Modal from "../../Components/Modal/Modal";

const StorageArea = () => {
  useRedirect(USER.role, ROLES.DEPOSITOR);

  const { setShowModal } = useContext(StatesContext);
  const [entryProduct, setEntryProduct] = useState();

  const aceptProduct = (pendingProduct) => {
    console.log("aceptado el producto id ", pendingProduct);
    setEntryProduct(pendingProduct);
    setShowModal(true);
  };

  const updatedTBODYPENDINGENTRY = TBODYPENDINGENTRY.map((entry) => ({
    ...entry,
    Status: (
      <Button
        styles={"pending-table-button"}
        buttonFunction={() => aceptProduct(entry)}
        buttonIcon={<icons.TaskAltRoundedIcon />}
      />
    ),
  }));

  return (
    <div>
      <h2>StorageArea</h2>
      <section>
        <h3>Pending product entry</h3>
        <Table
          thead={THEADPURCHASESHISTORY}
          content={updatedTBODYPENDINGENTRY}
        />
      </section>
      <section>
        <h3>Pending products release</h3>
      </section>
      <Modal modalTitle="Entry Product">
        <h3>Product: {JSON.stringify(entryProduct)}</h3>
      </Modal>
    </div>
  );
};

export default StorageArea;

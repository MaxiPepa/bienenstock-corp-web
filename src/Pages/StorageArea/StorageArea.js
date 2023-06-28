import { useEffect, useState, useContext } from "react";

import { PendingEntrySection, PendingDispatchSection } from "Components";
import { ReaderContext } from "Contexts";

import "./StorageArea.css";

const StorageArea = () => {
  const { startPageConnection, stopPageConnection } = useContext(ReaderContext);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    startPageConnection(
      () => setReload(!reload),
      "page",
      "depositHub",
      "DepositUpdate"
    );
  }, [reload, startPageConnection]);

  useEffect(() => {
    return () => {
      stopPageConnection();
    };
  }, [stopPageConnection]);

  return (
    <div className="area-container">
      <div className="area-header">
        <h2 className="area-title">Storage Area</h2>
      </div>
      <hr className="division-horizontal-hr" />
      <PendingEntrySection reload={reload} />
      <PendingDispatchSection reload={reload} />
    </div>
  );
};

export default StorageArea;

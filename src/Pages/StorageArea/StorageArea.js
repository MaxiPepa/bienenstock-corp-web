import { useEffect, useState } from "react";
import * as Reader from "Assets/Reader";

import { PendingEntrySection, PendingDispatchSection } from "Components";

import "./StorageArea.css";

const StorageArea = () => {
  const [reload, setReload] = useState(false);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    setConnection(
      Reader.listen(
        () => setReload(!reload),
        "page",
        "depositHub",
        "DepositUpdate"
      )
    );
  }, [reload]);

  useEffect(() => {
    return () => {
      Reader.stop(connection);
    };
  }, [connection]);

  return (
    <div className="area-container">
      <div className="area-header">
        <h2 className="area-title">StorageArea</h2>
      </div>
      <hr className="division-horizontal-hr" />
      <PendingEntrySection reload={reload} />
      <PendingDispatchSection reload={reload} />
    </div>
  );
};

export default StorageArea;

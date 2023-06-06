import { useContext, useEffect, useState } from "react";
import * as Reader from "Assets/Reader";

import { ROLES } from "Assets/Constants";

import { PendingEntrySection } from "Components";
import { UserContext } from "Contexts";
import { useRedirect } from "Hooks";

import "./StorageArea.css";

const StorageArea = () => {
  const { userData } = useContext(UserContext);

  useRedirect(userData.userType, ROLES.DEPOSITOR);

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
      <PendingEntrySection reload={reload} setReload={setReload} />
      <section>
        <h3 className="area-subtitle">Pending products dispatch</h3>
      </section>
    </div>
  );
};

export default StorageArea;

import { useCallback, useContext, useEffect, useState } from "react";

import { APIContext, ReaderContext } from "Contexts";
import { parsingDateTime } from "Assets/Parsing";
import ActivityItem from "./ActivityItem/ActivityItem";

import "./Activity.css";

const Activity = () => {
  const { get } = useContext(APIContext);
  const { startPageConnection, stopPageConnection } = useContext(ReaderContext);

  const [logs, setLogs] = useState([]);

  const getLogs = useCallback(() => {
    get("log/getLogs").then((data) => {
      setLogs(
        data.logs.map((r) => {
          return {
            logId: r.logId,
            name: r.userFullName,
            description: r.description,
            date: parsingDateTime(r.date),
            avatar: r.userAvatar,
          };
        })
      );
    });
  }, [get]);

  useEffect(() => {
    getLogs();
    startPageConnection(getLogs, "page", "logHub", "LogUpdate");
  }, [getLogs, startPageConnection]);

  useEffect(() => {
    return () => {
      stopPageConnection();
    };
  }, [stopPageConnection]);

  return (
    <div className="activities-container">
      <h2 className="area-subtitle">Activity</h2>
      <div className="activities">
        {logs.length > 0 ? (
          logs.map((log) => {
            return (
              <div key={log.logId} className="activity-container">
                <ActivityItem
                  name={log.name}
                  description={log.description}
                  date={log.date}
                  avatar={log.avatar}
                />
              </div>
            );
          })
        ) : (
          <h3 className="no-activities">No recent activities</h3>
        )}
      </div>
    </div>
  );
};

export default Activity;

import { useCallback, useContext, useEffect, useState } from "react";
import * as Reader from "Assets/Reader";

import { APIContext } from "Contexts";
import { parsingDate } from "Assets/Parsing";
import ActivityItem from "./ActivityItem/ActivityItem";

import "./Activity.css";

const Activity = () => {
  const { get } = useContext(APIContext);

  const [connection, setConnection] = useState(null);
  const [logs, setLogs] = useState([]);

  const getLogs = useCallback(() => {
    get("log/getLogs").then((data) => {
      setLogs(
        data.logs.map((r) => {
          return {
            logId: r.logId,
            name: r.userFullName,
            description: r.description,
            date: parsingDate(r.date),
            avatar: r.userAvatar,
          };
        })
      );
    });
  }, [get]);

  useEffect(() => {
    getLogs();
    setConnection(Reader.listen(getLogs, "log", "logHub", "LogUpdate"));
  }, [getLogs]);

  useEffect(() => {
    return () => {
      Reader.stop(connection);
    };
  }, [connection]);

  return (
    <div className="activities-container">
      <h2 className="area-subtitle">Activity</h2>
      <div className="activities">
        {logs.map((log) => {
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
        })}
      </div>
    </div>
  );
};

export default Activity;

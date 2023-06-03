import { useContext, useEffect, useState } from "react";

import { APIContext } from "Contexts";
import { parsingDate } from "Assets/Parsing";
import ActivityItem from "./ActivityItem/ActivityItem";

import "./Activity.css";

const Activity = () => {
  const { get } = useContext(APIContext);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
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

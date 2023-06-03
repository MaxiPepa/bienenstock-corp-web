import { AccountCircleSharpIcon } from "Assets/Icons";

import "./ActivityItem.css";

const ActivityItem = ({ avatar, name, description, date }) => {
  return (
    <div className="activity-item">
      <div className="user-img">
        {avatar ? (
          <div className="activity-img-avatar">
            <img src={avatar} alt="user avatar" />
          </div>
        ) : (
          <AccountCircleSharpIcon />
        )}
      </div>
      <div className="activity-item-text">
        <div className="activity-item-info">
          <p className="activity-info-name">{name}</p>
          <p className="activity-info-description">- {description}</p>
        </div>
        <div className="activity-item-date">
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;

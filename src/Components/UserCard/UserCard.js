import { useContext } from "react";

import { UserContext } from "Contexts";
import { AccountCircleSharpIcon } from "Assets/Icons";

import "./UserCard.css";

const UserCard = () => {
  const { userData } = useContext(UserContext);
  return (
    <>
      <div className="user-card">
        <div className="user-card-img">
          {userData.avatar ? (
            <div className="user-card-img-avatar">
              <img src={userData.avatar} alt="user avatar" />
            </div>
          ) : (
            <AccountCircleSharpIcon />
          )}
        </div>
        <div className="user-profile">
          <p>{userData.fullName}</p>
          <span>{userData.userType}</span>
        </div>
      </div>
    </>
  );
};

export default UserCard;

import { useContext } from "react";

import { UserContext } from "../../Assets/Contexts";
import { AccountCircleSharpIcon } from "../../Assets/Icons";

import "./UserCard.css";

const UserCard = () => {
  const { userData } = useContext(UserContext);
  return (
    <>
      <div className="user-card">
        {userData.avatar ? (
          <img src={userData.avatar} alt="user avatar" />
        ) : (
          <AccountCircleSharpIcon />
        )}
        <div className="user-profile">
          <p>{userData.fullName}</p>
          <span>{userData.userType}</span>
        </div>
      </div>
    </>
  );
};

export default UserCard;

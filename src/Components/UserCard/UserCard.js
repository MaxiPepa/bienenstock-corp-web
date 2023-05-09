import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";

import "./UserCard.css";
import icons from "../../Assets/Icons";

const UserCard = () => {
  const { userData } = useContext(UserContext);
  return (
    <>
      <div className="user-card">
        {userData.avatar !== null ? (
          <img src={userData.Avatar} alt="user avatar" />
        ) : (
          <icons.AccountCircleSharpIcon />
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

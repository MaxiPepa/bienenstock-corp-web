import { useContext } from "react";
import contexts from "../../Assets/Contexts";

import "./UserCard.css";
import icons from "../../Assets/Icons";

const UserCard = () => {
  const { userData } = useContext(contexts.UserContext);
  return (
    <>
      <div className="user-card">
        {userData.avatar ? (
          <img src={userData.avatar} alt="user avatar" />
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

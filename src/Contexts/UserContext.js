import { useState, createContext, useEffect, useContext } from "react";
import APIContext from "./APIContext";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { getToken, get } = useContext(APIContext);

  const [userData, setUserData] = useState({
    avatar: null,
    email: null,
    fullName: null,
    userType: null,
  });

  useEffect(() => {
    if (getToken()) {
      get("authentication/getLoggedUser").then((res) => {
        if (res.success) {
          setUserData({
            userId: res.userId,
            avatar: res.avatar,
            fullName: res.fullName,
            email: res.email,
            userType: res.userType,
          });
        }
      });
    }
  }, [getToken, get]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;

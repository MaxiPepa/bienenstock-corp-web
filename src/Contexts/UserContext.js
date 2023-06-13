import { useState, createContext, useEffect, useContext } from "react";
import APIContext from "./APIContext";
import Cookies from "universal-cookie";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { get } = useContext(APIContext);

  const [userData, setUserData] = useState({
    avatar: null,
    email: null,
    fullName: null,
    userType: null,
    userId: null,
  });

  useEffect(() => {
    const cookies = new Cookies();

    if (cookies.get("login_cookie")) {
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
  }, [get]);

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

import { useState, createContext, useEffect, useContext } from "react";
import APIContext from "./APIContext";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { getToken, post } = useContext(APIContext);

  const [userData, setUserData] = useState({
    avatar: null,
    email: null,
    fullName: null,
    userType: null,
  });

  useEffect(() => {
    if (getToken()) {
      const getUserData = async () => {
        await post("authentication/getLoggedUser", {}).then((res) => {
          if (res.success) {
            setUserData({
              avatar: res.avatar,
              fullName: res.fullName,
              email: res.email,
              userType: res.userType,
            });
          }
        });
      };
      getUserData();
    }
  }, [getToken, post]);

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

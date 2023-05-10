import { APIURL, COOKIENAME } from "../Assets/Constants";
import { createContext } from "react";
import Cookies from "universal-cookie";

const APIContext = createContext();

const APIProvider = ({ children }) => {
  const getToken = () => {
    return new Cookies().get(COOKIENAME.session);
  };

  const login = async (userData) => {
    return await fetch(APIURL.local + "authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const get = async (url) => {
    return await fetch(APIURL.local + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const post = async (url, request) => {
    return await fetch(APIURL.local + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  return (
    <APIContext.Provider
      value={{
        login,
        get,
        post,
        getToken,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export { APIProvider };
export default APIContext;

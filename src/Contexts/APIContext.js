import { useContext } from "react";
import { APIURL, COOKIENAME } from "../Assets/Constants";
import { createContext } from "react";
import Cookies from "universal-cookie";

import StatesContext from "./StatesContext";

const APIContext = createContext();

const APIProvider = ({ children }) => {
  const { setAlert, setShowLoader } = useContext(StatesContext);
  const errorAlert = (error) => {
    setShowLoader(false);
    setAlert({
      show: true,
      type: "error",
      message: error,
    });
  };

  const successHandler = (res) => {
    setShowLoader(false);
    return res.json();
  };

  const getToken = () => {
    return new Cookies().get(COOKIENAME.session);
  };

  const login = async (userData) => {
    setShowLoader(true);
    return await fetch(APIURL.local + "authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => successHandler(res))
      .catch((err) => errorAlert(err));
  };

  const get = async (url) => {
    setShowLoader(true);
    return await fetch(APIURL.local + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => successHandler(res))
      .catch((err) => errorAlert(err));
  };

  const post = async (url, request) => {
    setShowLoader(true);
    return await fetch(APIURL.local + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(request),
    })
      .then((res) => successHandler(res))
      .catch((err) => errorAlert(err));
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

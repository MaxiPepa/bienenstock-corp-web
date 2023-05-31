import { useContext, useCallback } from "react";
import { APIURL, COOKIENAME } from "../Assets/Constants";
import { createContext } from "react";
import Cookies from "universal-cookie";

import StatesContext from "./StatesContext";

const APIContext = createContext();

const APIProvider = ({ children }) => {
  const { setAlert, setShowLoader } = useContext(StatesContext);
  const errorAlert = useCallback(
    (error) => {
      setShowLoader(false);
      setAlert({
        show: true,
        type: "error",
        message: error,
      });
    },
    [setAlert, setShowLoader]
  );

  const successHandler = useCallback(
    (res) => {
      setShowLoader(false);
      return res.json();
    },
    [setShowLoader]
  );

  const getToken = useCallback(() => {
    return new Cookies().get(COOKIENAME.session);
  }, []);

  const login = useCallback(
    async (userData) => {
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
    },
    [errorAlert, setShowLoader, successHandler]
  );

  const get = useCallback(
    async (url, request = {}) => {
      setShowLoader(true);
      return await fetch(
        `${APIURL.local}${url}?${new URLSearchParams(request)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
        .then((res) => successHandler(res))
        .catch((err) => errorAlert(err));
    },
    [errorAlert, getToken, setShowLoader, successHandler]
  );

  const post = useCallback(
    async (url, request) => {
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
    },
    [errorAlert, getToken, setShowLoader, successHandler]
  );

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

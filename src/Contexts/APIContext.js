import { useContext, useCallback } from "react";
import { APIURL } from "Assets/Constants";
import { createContext } from "react";

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

  const get = useCallback(
    async (url, request = {}, useLoader = true) => {
      if (useLoader === true) {
        setShowLoader(true);
      }
      return await fetch(
        `${APIURL.local}${url}?${new URLSearchParams(request)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )
        .then((res) => successHandler(res))
        .catch((err) => errorAlert(err));
    },
    [errorAlert, setShowLoader, successHandler]
  );

  const post = useCallback(
    async (url, request, useLoader = true) => {
      if (useLoader === true) {
        setShowLoader(true);
      }
      return await fetch(APIURL.local + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(request),
      })
        .then((res) => successHandler(res))
        .catch((err) => errorAlert(err));
    },
    [errorAlert, setShowLoader, successHandler]
  );

  return (
    <APIContext.Provider
      value={{
        get,
        post,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export { APIProvider };
export default APIContext;

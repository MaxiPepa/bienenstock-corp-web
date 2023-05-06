import { APIURL } from "../../Assets/Constants";
//import { useContext } from "react";
//import UserContext from "../../Contexts/UserContext";

class API {
  login = async (userData) => {
    return await fetch(APIURL.local + "autentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .catch((err) => err);
  };

  get = async (url) => {
    //const { userData } = useContext(UserContext);
    return await fetch(APIURL.local + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => err);
  };

  post = async (url, request) => {
    return await fetch(APIURL.local + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .catch((err) => err);
  };
}

export default API;

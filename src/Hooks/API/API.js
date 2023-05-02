import { APIURL } from "../../Assets/Constants";


class API {

  get = async (url) => {

    return await fetch(APIURL.local+url)
      .then((res) => res.json() )
      .catch((err) => err );

  } 

  post = () => {}


}


export default API;
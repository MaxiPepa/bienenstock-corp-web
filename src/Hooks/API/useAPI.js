import { APIURL } from "../../Assets/Constants";

const useAPI = async (url) => {

  const response = await fetch(APIURL.local+url)
    .then((res) => res.json())
    .catch((err) => err );

  console.log(response);
  return { response };

};

export default useAPI;

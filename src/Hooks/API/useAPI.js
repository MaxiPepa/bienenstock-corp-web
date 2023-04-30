import { useState, useEffect } from "react";

const useAPI = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [url]);

  return { data, error, isLoading };
};

export default useAPI;

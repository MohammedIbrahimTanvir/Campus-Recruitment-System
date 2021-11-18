import React from "react";
import * as SecureStore from "expo-secure-store";

export default function useFetch(url) {
  //data after fetching
  const [data, setData] = React.useState(null);
  //checking request status
  const [loading, setLoading] = React.useState(true);
  //getting error status
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    async function fetchingData() {
      const authToken = await SecureStore.getItemAsync("authToken");
      if (authToken) {
        fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          redirect: "follow",
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false);
          })
          .catch((err) => setErr(err));
      } else setLoading(false);
    }
    fetchingData();
  }, [url]);
  return { data, loading, err };
}

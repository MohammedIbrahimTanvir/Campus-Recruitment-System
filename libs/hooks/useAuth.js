import React from "react";
import { AuthContext } from "../context/Auth";
import * as SecureStore from "expo-secure-store";
// function useAuth() {
//   const [err, setErr] = React.useState(null);
//   const { dispatchSignIn, dispatchLoading } = React.useContext(AuthContext);
//   async function save(key, value) {
//     await SecureStore.setItemAsync(key, value);
//   }
//   const handleLogIn = (url, body) => {
//     dispatchLoading(true);
//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify(body),
//       headers: {
//         "Content-type": "application/json",
//       },
//       redirect: "follow",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         save("authToken", data.token);
//         console.log(data.token);
//         dispatchSignIn(data.token);
//         dispatchLoading(false);
//       })
//       .catch((err) => setErr(err));
//   };

//   return { err, handleLogIn };
// }

// export default useAuth;
async function saveValue(key, value) {
  // console.log("SecureStore key ", key);
  // console.log("SecureStore value ", value);
  await SecureStore.setItemAsync(key, value);
}

const handleLogIn = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
      redirect: "follow",
    });
    const responseJson = await response.json();
    // console.log("From UseAuth ", responseJson);
    return responseJson;
  } catch (err) {
    // console.log("From UseAuth ", err.response.data);
  }
};

export { handleLogIn, saveValue };

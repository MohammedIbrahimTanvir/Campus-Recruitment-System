import React, { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { useAuth } from "../hooks";
import * as SecureStore from "expo-secure-store";
import { LoginContext } from "../../App";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../reudx/redux/actions/LoginAction";

export default function useSignOut() {
  const { dispatchSignOut } = React.useContext(AuthContext);
  const [logType, setLogType] = useContext(LoginContext);
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    dispatch(
      LoginAction({ loggedIn: false, userInfo: "", logType: "", token: "" })
    );
  };
  return { handleSignOut };
}

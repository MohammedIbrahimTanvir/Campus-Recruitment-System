import React from "react";
import { View } from "react-native";
import { SignInForm } from "../../components/auth";
import { handleLogIn } from "../../libs/hooks/useAuth";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../reudx/redux/actions/LoginAction";

const AlumniSignIn = () => {
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    handleLogIn(
      "https://iiuc-campus-recuitement-system.herokuapp.com/alumni/login",
      data
    ).then((res) =>
      dispatch(
        LoginAction({
          loggedIn: true,
          userInfo: res.alumni,
          logType: "Alumni",
          token: res.token,
        })
      )
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SignInForm onSubmit={onSubmit} url={"Alumni Sign Up"} />
    </View>
  );
};

export default AlumniSignIn;

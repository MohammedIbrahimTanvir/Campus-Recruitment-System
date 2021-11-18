import React from "react";
import { View } from "react-native";
import { SignInForm } from "../../components/auth";
import { handleLogIn } from "../../libs/hooks/useAuth";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../reudx/redux/actions/LoginAction";

const CompanySignIn = () => {
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    handleLogIn(
      "https://iiuc-campus-recuitement-system.herokuapp.com/company/login",
      data
    ).then((res) => {
      console.log(res);
      dispatch(
        LoginAction({
          loggedIn: true,
          userInfo: res.company,
          logType: "Company",
          token: res.token,
        })
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <SignInForm onSubmit={onSubmit} url={"Company Sign Up"} />
    </View>
  );
};

export default CompanySignIn;

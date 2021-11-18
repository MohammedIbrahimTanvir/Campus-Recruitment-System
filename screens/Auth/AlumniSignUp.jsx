import React from "react";
import { View, Text } from "react-native";
import { SignUpForm } from "../../components/auth";
import { handleLogIn } from "../../libs/hooks/useAuth";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../reudx/redux/actions/LoginAction";

const AlumniSignUp = () => {
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    handleLogIn(
      "https://iiuc-campus-recuitement-system.herokuapp.com/temporary/alumni/signup",
      data
    ).then(
      (res) => {
        console.log(res);
      }
      // dispatch(
      //   LoginAction({
      //     loggedIn: true,
      //     userInfo: res.alumni,
      //     logType: "Alumni",
      //     token: res.token,
      //   })
      // )
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SignUpForm onSubmit={onSubmit} />
    </View>
  );
};

export default AlumniSignUp;

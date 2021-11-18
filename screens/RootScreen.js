import * as React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StudentMainScreen from "./Student/MainScreen";
import AlumniMainScreen from "./Alumni/MainScreen";
import CompanyMainScreen from "./Company/MainScreen";
import StudentProfileById from "./Company/StudentProfileById";
import * as SecureStore from "expo-secure-store";
import {
  AlumniSignIn,
  AlumniSignUp,
  CompanySignIn,
  CompanySignUp,
  SignInHome,
  StudentSignIn,
  StudentSignUp,
} from "./Auth";

import { useSelector } from "react-redux";
import SinglePostPage from "../components/Student/StudentPost/SinglePostPage";
import SingleAlumniPostPage from "../components/Student/AlumniPosts/SingleAlumniPostPage";
import SingleStudentPost from "../components/Alumni/StudentPost/SingleStudentPost";
import SingleAlumniPost from "../components/Alumni/AlumniPost/SingleAlumniPost";
import { AppliedUsers } from "./Company/AppliedUsers";

function RootScreen() {
  const Stack = createStackNavigator();
  const state = useSelector((state) => state.AuthReducer);
  const [logType, setLogType] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(null);
  React.useEffect(() => {
    if (state.loggedIn === true) {
      setLoggedIn(true);
      setLogType(state.logType);
    } else {
      setLoggedIn(false);
    }
  }, [state]);

  // console.log("Before Logged in ", loggedIn, state);
  return (
    <Stack.Navigator>
      {logType == "Student" && loggedIn && (
        <>
          <Stack.Screen
            name="Home"
            component={StudentMainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SinglePostPage"
            component={SinglePostPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingleAlumniPostPage"
            component={SingleAlumniPostPage}
            options={{ headerShown: false }}
          />
        </>
      )}
      {logType == "Alumni" && loggedIn && (
        <>
          <Stack.Screen
            name="Home"
            component={AlumniMainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingleStudentPost"
            component={SingleStudentPost}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingleAlumniPost"
            component={SingleAlumniPost}
            options={{ headerShown: false }}
          />
        </>
      )}
      {logType == "Company" && loggedIn && (
        <>
          <Stack.Screen
            name="Home"
            component={CompanyMainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StudentProfileById"
            component={StudentProfileById}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AppliedUsers"
            component={AppliedUsers}
            options={{ headerShown: false }}
          />
        </>
      )}
      {!loggedIn && (
        <>
          <Stack.Screen name="Sign In" component={SignInHome} />
          <Stack.Screen name="Alumni Sign In" component={AlumniSignIn} />
          <Stack.Screen name="Alumni Sign Up" component={AlumniSignUp} />
          <Stack.Screen name="Company Sign In" component={CompanySignIn} />
          <Stack.Screen name="Company Sign Up" component={CompanySignUp} />
          <Stack.Screen name="Student Sign In" component={StudentSignIn} />
          <Stack.Screen name="Student Sign Up" component={StudentSignUp} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootScreen;

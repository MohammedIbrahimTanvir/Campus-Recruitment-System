import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Profile from "./CompanyProfileScreen";
import { EditProfile } from "./EditProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { IntroEdit } from "./IntroEdit";
import { AddProfilePic } from "./AddProfilePic";

export const ProfileNavigator = ({ navigation }) => {
  const ProfileStack = createStackNavigator();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: () => (
            <Icon
              onPress={() => navigation.openDrawer()}
              name="menu"
              style={{ paddingLeft: 10, zIndex: 1 }}
              color="black"
              size={22}
            />
          ),
        }}
      />
      <ProfileStack.Screen name="Edit Profile" component={EditProfile} />
      <ProfileStack.Screen name="Intro" component={IntroEdit} />
      <ProfileStack.Screen name="AddProfilePic" component={AddProfilePic} />
    </ProfileStack.Navigator>
  );
};

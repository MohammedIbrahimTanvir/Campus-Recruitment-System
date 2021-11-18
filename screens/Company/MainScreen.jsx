import * as React from "react";
// import { View, Text, Button } from "react-native";
import { useSignOut } from "../../libs/hooks";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

// import { useNavigation } from "@react-navigation/core";
// import CompanyProfileScreen from "./CompanyProfileScreen";
import { CreateJobPost } from "../../components/Company";
import { MyJobPosts } from "./MyJobPosts";
import { ProfileNavigator } from "./ProfileNavigator";
import { AdminPostScreen } from "./AdminPostScreen";
import { SearchByName } from "./SearchByName";
import { SearchBySkills } from "./SearchBySkills";
// import  StudentProfileById  from "./StudentProfileById";

function CustomDrawerContent(props) {
  const { handleSignOut } = useSignOut();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <DrawerItem label="Sign Out" onPress={handleSignOut} />
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();

export default function MainScreen() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Profile" component={ProfileNavigator} />
      <Drawer.Screen name="My Job Posts" component={MyJobPosts} />
      <Drawer.Screen name="Admin Posts" component={AdminPostScreen} />
      <Drawer.Screen name="Create Job Post" component={CreateJobPost} />
      <Drawer.Screen name="Search Student By Name" component={SearchByName} />
      {/* <Drawer.Screen name="StudentProfileById" component={StudentProfileById} /> */}
      <Drawer.Screen
        name="Search Student By Skill"
        component={SearchBySkills}
      />
    </Drawer.Navigator>
  );
}

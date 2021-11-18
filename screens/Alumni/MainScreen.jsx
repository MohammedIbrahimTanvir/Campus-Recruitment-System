import * as React from "react";
import { View, Text, Button } from "react-native";
import { useSignOut } from "../../libs/hooks";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { useNavigation } from "@react-navigation/core";
import AlumniProfileScreen from "./AlumniProfileScreen";
import { WriteBlog } from "../../components/Alumni";
import { StudentsPostScreen } from "./StudentsPostScreen";
import { AlumniPostScreen } from "./AlumniPostScreen";
import { ProfileNavigator } from "./ProfileNavigator";
import { AdminPostScreen } from "./AdminPostScreen";

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
      <Drawer.Screen name="Students Posts" component={StudentsPostScreen} />
      <Drawer.Screen name="Alumni Posts" component={AlumniPostScreen} />
      <Drawer.Screen name="Admin Posts" component={AdminPostScreen} />
      <Drawer.Screen name="Write Blog" component={WriteBlog} />
    </Drawer.Navigator>
  );
}

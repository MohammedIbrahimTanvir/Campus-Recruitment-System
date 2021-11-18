import React from "react";
import { View } from "react-native";
import { WriteBlog } from "../../components/Alumni/";
import { AuthContext } from "../../libs/context/Auth";

export default function WriteBlogScreen() {
  return (
    <View>
      <WriteBlog />
    </View>
  );
}

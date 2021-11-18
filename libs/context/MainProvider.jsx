import React from "react";
import { View } from "react-native";
import AuthProvider from "./Auth";

export default function MainProvider(props) {
  return <AuthProvider>{props.children}</AuthProvider>;
}

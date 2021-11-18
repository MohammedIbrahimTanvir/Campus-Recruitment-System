import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

export const SafeArea = ({ children }) => {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar ? StatusBar.currentHeight : 0,
  },
});

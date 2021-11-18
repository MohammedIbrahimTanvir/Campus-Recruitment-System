import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const CustomButton = ({ icon = "heart", size = 16, quantity = 2 }) => {
  return (
    <TouchableOpacity style={styles.container}>
      {icon === "heart" ? (
        <AntDesign
          style={{ marginRight: 10 }}
          name={icon}
          size={size}
          color="black"
        />
      ) : (
        <Foundation style={{ marginRight: 10 }} name="comment" size={size} color="black" />
      )}
      <Text>{quantity}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    flex: 1,
    alignItems: "center",
    borderColor: "lightgray",
    justifyContent: "center",
    padding: 5,
    borderRadius: 4,
  },
});

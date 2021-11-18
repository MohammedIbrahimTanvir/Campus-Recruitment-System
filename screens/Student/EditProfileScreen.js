import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { View, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { BASEURL } from "../../helper/helper";
import { useSelector } from "react-redux";

export const EditProfile = ({ navigation }) => {
  const authInfo = useSelector((state) => state.AuthReducer);
  //console.log("Read from StudentProfile Screen", authInfo);

  const options = [
    {
      id: "1",
      title: "Intro",
      navigate: "Intro",
    },
    {
      id: "2",
      title: "Experiences",
      navigate: "Experiences",
    },
    {
      id: "3",
      title: "Education",
      navigate: "Education",
    },
    {
      id: "4",
      title: "AddProfilePic",
      navigate: "AddProfilePic",
    },
  ];

  return (
    <View>
      <FlatList
        data={options}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => navigation.navigate(item.navigate)}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

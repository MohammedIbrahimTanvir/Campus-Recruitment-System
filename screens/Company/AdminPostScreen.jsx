import React, { useState, useEffect } from "react";
import Animated from "react-native-reanimated";
import {
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { getAdminPosts } from "./apicalls/company";
import { View } from "native-base";
import SingleAdminPost from "../../components/SingleAdminPost";

export const AdminPostScreen = () => {
  const authInfo = useSelector((state) => state.AuthReducer);

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const [adminPosts, setAdminPosts] = useState({});

  useEffect(() => {
    getAdminPosts()
      .then((data) => setAdminPosts(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(adminPosts);
  return (
    <View style={styles.container}>
      <FlatList
        data={adminPosts}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => <SingleAdminPost itemData={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar && StatusBar.currentHeight,
    justifyContent: "center",
  },
});

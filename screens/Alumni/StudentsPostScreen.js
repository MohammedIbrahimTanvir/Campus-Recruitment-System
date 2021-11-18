import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { GET_ALL_USER_POSTS_API_ALUMNI } from "../../helper/helper";

import { useSelector } from "react-redux";
import StudentBlog from "../../components/Alumni/StudentPost/StudentBlog";

export const StudentsPostScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const authToken = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    setLoading(true);
    GET_ALL_USER_POSTS_API_ALUMNI(authToken?.token).then((res) => {
      console.log(res.blogs);
      setPosts(res.blogs);
      setLoading(false);
    });
  }, [authToken]);

  return (
    <View style={styles.container}>
      {loading === true ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(i) => i._id}
          renderItem={({ item }) => (
            <StudentBlog itemData={item} authToken={authToken} />
          )}
        />
      )}
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

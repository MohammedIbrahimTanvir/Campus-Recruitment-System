import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { GET_ALL_ALUMNI_POSTS_API } from "../../helper/helper";
import { useSelector } from "react-redux";
import SingleAlumniPost from "../../components/Student/AlumniPosts/SingleAlumniPost";

export const AlumniPostScreen = () => {
  const [alumniPosts, setAlumniPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const authToken = useSelector((state) => state.AuthReducer.token);
  useEffect(() => {
    setLoading(true);
    GET_ALL_ALUMNI_POSTS_API(authToken).then((res) => {
      setAlumniPosts(res.blogs);
      setLoading(false);
    });
  }, [authToken]);

  return (
    <View style={styles.container}>
      {loading === true ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={alumniPosts}
          keyExtractor={(i) => i._id}
          renderItem={({ item }) => <SingleAlumniPost itemData={item} />}
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

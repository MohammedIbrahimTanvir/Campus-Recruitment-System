import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { GET_ALL_JOB_POSTS_API } from "../../helper/helper";
import { useSelector } from "react-redux";
import SingleJobPost from "../../components/Student/JobPosts/SingleJobPost";

export const JobPostScreen = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const authToken = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    setLoading(true);
    GET_ALL_JOB_POSTS_API(authToken?.token).then((res) => {
      // console.log("Result", res);
      setJobPosts(res);
      setLoading(false);
    });
  }, [authToken?.token]);
  // console.log("JobPostScreen ", jobPosts);
  return (
    <View style={styles.container}>
      {loading === true ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={jobPosts}
          keyExtractor={(i) => i._id}
          renderItem={({ item }) => (
            <SingleJobPost itemData={item} authToken={authToken} />
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

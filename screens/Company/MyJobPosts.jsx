import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  ScrollView,
  // FlatList,
} from "react-native";
import { GET_MY_JOB_POSTS_API } from "../../helper/helper";
import { useSelector } from "react-redux";
import SingleJobPost from "../../components/Company/MyPosts/SingleJobPost";

export const MyJobPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const authToken = useSelector((state) => state.AuthReducer.token);
  useEffect(() => {
    setLoading(true);
    GET_MY_JOB_POSTS_API(authToken).then((res) => {
      console.log("My Job Posts ", res);
      setPosts(res);
      setLoading(false);
    });
  }, [authToken]);

  return (
    <ScrollView>
      {loading === true ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        // <FlatList
        //   data={posts}
        //   keyExtractor={(i) => i._id}
        //   renderItem={({ item }) => <SingleJobPost itemData={item} />}
        // />
        <SingleJobPost itemData={posts} />
      )}
    </ScrollView>
  );
};
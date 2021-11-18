import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";

import { COMMENT_BLOG_API, getCommentsById } from "../../../helper/helper";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Input } from "react-native-elements";
import { Stack, Text } from "native-base";

var Buffer = require("buffer/").Buffer;

const SinglePostPage = ({ route }) => {
  const { itemData } = route.params;
  const { title, description, image } = itemData;
  const [comment, setComment] = useState("");
  //console.log(itemData);
  let imageUrl = new Buffer.from(image.data).toString("base64");
  imageUrl = `data:image/jpg;base64,${imageUrl}`;
  const d = new Date(itemData.createdAt);

  const authToken = useSelector((state) => state.AuthReducer);

  const [comments, setComments] = useState([]);
  const getAllComments = () => {
    getCommentsById(
      authToken?.token,
      `/blog/user/${itemData?._id}/allComments/user`
    )
      .then((data) => setComments(data?.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllComments();
  }, [itemData]);

  console.log(comments);

  const handleComment = () => {
    if (comment === "") {
      Alert.alert("Comment Empty", "Comment can't be empty", [
        { text: "Close", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      COMMENT_BLOG_API(authToken?.token, itemData._id, comment)
        .then((res) => {
          console.log(res);
          Alert.alert("Comment Posted", "Comment has been Posted", [
            { text: "Close", onPress: () => console.log("OK Pressed") },
          ]);
          getAllComments();
        })
        .catch(() => {
          Alert.alert("Comment Post", "Comment post failed!", [
            { text: "Close", onPress: () => console.log("OK Pressed") },
          ]);
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.date}>
        {d.toLocaleDateString()} {d.toLocaleTimeString()}
      </Text>
      <Text style={styles.author}>{itemData.Author.name}</Text>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.des}>{description}</Text>
      <View style={styles.containerrow}>
        <View
          style={{
            flex: 0.7,
          }}
        >
          {/* <TextInput
            multiline
            numberOfLines={5}
            value={comment}
            editable
            onChange={(e) => setComment(e)}
          /> */}
          <Input
            placeholder="Write your comment here"
            value={comment}
            onChangeText={(e) => setComment(e)}
            multiline
            numberOfLines={5}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Comment" onPress={handleComment} />
        </View>
      </View>
      {comments?.map((comment, index) => (
        <>
          <Stack
            background="white"
            borderRadius="lg"
            padding="4"
            marginBottom="2"
            key={index}
          >
            <Stack>
              <Text fontWeight="600" fontSize="md">
                {comment?.comment}
              </Text>
              <Text fontSize="xs" color="blue.500" fontWeight="300">
                by {comment?.userCommentMaker?.name}
                {comment?.alumniCommentMaker?.name}
              </Text>
            </Stack>
          </Stack>
        </>
      ))}
    </ScrollView>
  );
};

export default SinglePostPage;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 10,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  date: {
    color: "grey",
    paddingTop: 10,
    paddingLeft: 10,
    opacity: 0.7,
    fontSize: 10,
  },
  author: {
    color: "#000",
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  title: {
    color: "#000",
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  des: {
    color: "grey",
    padding: 10,
    fontSize: 16,
    fontWeight: "300",
  },
  containerrow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
  buttonContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#000",
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: "300",
    paddingBottom: 3,
  },
});

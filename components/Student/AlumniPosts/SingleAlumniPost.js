import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import { Ionicons, Foundation } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/core";
import { lovePost } from "../../../screens/Student/apicalls/student";
var Buffer = require("buffer/").Buffer;

const SingleAlumniPost = ({ itemData, authToken }) => {
  const { title, description, image } = itemData;
  const navigation = useNavigation();
  const [love, setLove] = useState(false);

  let imageUrl = new Buffer.from(image.data).toString("base64");
  imageUrl = `data:image/jpg;base64,${imageUrl}`;
  const d = new Date(itemData.createdAt);

  const handleReact = (post_id) => {
    console.log(post_id);

    setLove(true);

    lovePost(authToken?.token, `/blog/alumni/${post_id}/react`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAlreadyComment = (commentlist) => {
    // console.log(commentlist)

    let heart;

    commentlist?.map((comment) => {
      if (comment?.user === authToken?.userInfo?._id) {
        // console.log(authToken?.userInfo?._id)
        // console.log("hey");
        heart = true;
      }
    });

    return heart;
    // setDidIComment()
  };

  return (
    <View style={styles.container}>
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
        <View style={styles.containericons}>
          <Foundation
            onPress={() =>
              navigation.navigate("SingleAlumniPostPage", { itemData })
            }
            name="comment"
            size={25}
            color="black"
          />
        </View>
        <View style={styles.containericons}>
          <Ionicons
            name="heart"
            size={25}
            onPress={() =>
              handleAlreadyComment(itemData?.React) === undefined &&
              love === false
                ? handleReact(itemData?._id)
                : null
            }
            color={
              handleAlreadyComment(itemData?.React) || love ? "red" : "#D7DDDA"
            }
          />
          {console.log(handleAlreadyComment(itemData?.React))}

          <Text style={styles.buttonText}>{itemData?.React?.length}</Text>
        </View>
      </View>
    </View>
  );
};

export default SingleAlumniPost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 5,
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
  containericons: {
    flex: 1,
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
